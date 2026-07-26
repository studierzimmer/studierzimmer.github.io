import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Sky, useGLTF } from "@react-three/drei";
import { SkeletonUtils, Water } from "three-stdlib";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { Character3D } from "@/types/characters3d";

const keys: Record<string, boolean> = {};

if (typeof window !== "undefined") {
  window.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
  });
  window.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
  });
}

const playerRef = { current: null as THREE.Group | null };
const PLAYER_GROUND_Y = 15;
const PLAYER_SCALE = 10;
const JUMP_VELOCITY = 38;
const JUMP_GRAVITY = 95;
const SEA_LEVEL_Y = 0;
// Edit this value to move the underwater floor up or down.
const SEA_FLOOR_Y = -174;
const PLAYER_MAX_Y = 960;
const OCEAN_SIZE = 120000;
const SKY_DISTANCE = 48000;
const CAMERA_FAR = 90000;
const RIPPLE_TEXTURE_SIZE = 128;
const RIPPLE_WORLD_SIZE = 900;
const MAX_SURFACE_PULSES = 10;
const COLLISION_CELL_SIZE = 12;
const COLLISION_SURFACE_RADIUS = 4.5;
const MAX_COLLISION_SAMPLES = 16000;
const FIXED_SUN_POSITION: [number, number, number] = [500, 200, -300];
const FIXED_WATER_SUN_DIRECTION = new THREE.Vector3(500, 150, -1000).normalize();
const FIXED_SUN_COLOR = "#fff4d6";
const FIXED_BACKGROUND_COLOR = "#0b1e3a";
const FIXED_WATER_COLOR = "#0a2a6a";
const PLAYER_SESSION_KEY = "gstudios:ocean-player-transform";
const causticsTimeUniform = { value: 0 };
type LoadedCharacterAsset = {
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
};

const characterAssetCache = new Map<string, LoadedCharacterAsset>();

type ActiveCharacter = {
  id: string;
  scene: THREE.Group;
  animations: THREE.AnimationClip[];
  modelScale: number;
  cameraDistance: number;
  localCenter: THREE.Vector3;
  collisionRadius: number;
  renderedHeight: number;
  renderedMinY: number;
  renderedMaxY: number;
  renderedWidth: number;
  renderedLength: number;
};

type SurfacePulseKind = "click" | "dive" | "rise";

type SurfacePulse = {
  id: number;
  x: number;
  z: number;
  startedAt: number;
  duration: number;
  radius: number;
  strength: number;
  kind: SurfacePulseKind;
};

const surfacePulses: SurfacePulse[] = [];
let nextSurfacePulseId = 1;

function currentPulseTime() {
  return performance.now() / 1000;
}

function addSurfacePulse(
  x: number,
  z: number,
  options: {
    duration: number;
    radius: number;
    strength: number;
    kind: SurfacePulseKind;
  }
) {
  const now = currentPulseTime();
  surfacePulses.push({
    id: nextSurfacePulseId,
    x,
    z,
    startedAt: now,
    ...options,
  });
  nextSurfacePulseId += 1;

  while (surfacePulses.length > MAX_SURFACE_PULSES) {
    surfacePulses.shift();
  }
  for (let index = surfacePulses.length - 1; index >= 0; index -= 1) {
    const pulse = surfacePulses[index];
    if (now - pulse.startedAt > pulse.duration + 0.25) {
      surfacePulses.splice(index, 1);
    }
  }
}

function readPlayerSessionTransform() {
  const fallback = {
    position: [0, PLAYER_GROUND_Y, 0] as [number, number, number],
    rotationY: Math.PI,
    rotationZ: 0,
  };

  try {
    const stored = window.sessionStorage.getItem(PLAYER_SESSION_KEY);
    if (!stored) return fallback;
    const parsed = JSON.parse(stored) as {
      position?: unknown;
      rotationY?: unknown;
      rotationZ?: unknown;
    };
    if (
      !Array.isArray(parsed.position) ||
      parsed.position.length !== 3 ||
      !parsed.position.every(
        (value) => typeof value === "number" && Number.isFinite(value)
      ) ||
      typeof parsed.rotationY !== "number" ||
      !Number.isFinite(parsed.rotationY)
    ) {
      return fallback;
    }

    return {
      position: [
        Number(parsed.position[0]),
        THREE.MathUtils.clamp(
          Number(parsed.position[1]),
          SEA_FLOOR_Y + 8,
          PLAYER_MAX_Y
        ),
        Number(parsed.position[2]),
      ] as [number, number, number],
      rotationY: Number(parsed.rotationY),
      rotationZ:
        typeof parsed.rotationZ === "number" &&
        Number.isFinite(parsed.rotationZ)
          ? Number(parsed.rotationZ)
          : 0,
    };
  } catch {
    return fallback;
  }
}

function writePlayerSessionTransform(player: THREE.Object3D | null) {
  if (!player) return;

  try {
    window.sessionStorage.setItem(
      PLAYER_SESSION_KEY,
      JSON.stringify({
        position: player.position.toArray(),
        rotationY: player.rotation.y,
        rotationZ: player.rotation.z,
      })
    );
  } catch {
    // Storage can be unavailable in strict private-browser modes.
  }
}

function useCausticsTexture() {
  const texture = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL}caustics.png`
  );

  useMemo(() => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.NoColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return texture;
}

function addUnderwaterCaustics(
  material: THREE.MeshStandardMaterial,
  causticsMap: THREE.Texture,
  options: {
    includeRipple?: boolean;
    baseLight?: number;
    causticsStrength?: number;
    lightTint?: [number, number, number];
  } = {}
) {
  if (material.userData.hasUnderwaterCaustics) return;

  const includeRipple = options.includeRipple ?? true;
  const baseLight = options.baseLight ?? 0.045;
  const causticsStrength = options.causticsStrength ?? 0.86;
  const lightTint = options.lightTint ?? [0.46, 0.82, 1];
  const previousCompile = material.onBeforeCompile.bind(material);
  const previousCacheKey = material.customProgramCacheKey.bind(material);

  material.onBeforeCompile = (shader, renderer) => {
    previousCompile(shader, renderer);
    shader.uniforms.causticsMap = { value: causticsMap };
    shader.uniforms.causticsTime = causticsTimeUniform;
    shader.uniforms.causticsRippleSampler = { value: rippleField.texture };
    shader.uniforms.causticsRippleCenter = { value: rippleField.center };
    shader.uniforms.causticsRippleWorldSize = { value: RIPPLE_WORLD_SIZE };
    shader.uniforms.causticsRippleTexel = {
      value: new THREE.Vector2(
        1 / RIPPLE_TEXTURE_SIZE,
        1 / RIPPLE_TEXTURE_SIZE
      ),
    };
    shader.vertexShader = `varying vec3 vCausticsWorldPosition;\n${shader.vertexShader}`
      .replace(
        "#include <worldpos_vertex>",
        `#include <worldpos_vertex>
        vCausticsWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`
      );
    shader.fragmentShader = `
      uniform sampler2D causticsMap;
      uniform float causticsTime;
      uniform sampler2D causticsRippleSampler;
      uniform vec2 causticsRippleCenter;
      uniform float causticsRippleWorldSize;
      uniform vec2 causticsRippleTexel;
      varying vec3 vCausticsWorldPosition;
      ${shader.fragmentShader}`.replace(
      "#include <lights_fragment_end>",
      `#include <lights_fragment_end>
      float submerged = 1.0 - smoothstep(-0.35, 1.5, vCausticsWorldPosition.y);
      vec2 causticsWarp = vec2(
        sin(vCausticsWorldPosition.x * 0.021 + causticsTime * 0.52) +
          sin(vCausticsWorldPosition.z * 0.013 - causticsTime * 0.31),
        cos(vCausticsWorldPosition.z * 0.019 - causticsTime * 0.46) +
          cos(vCausticsWorldPosition.x * 0.011 + causticsTime * 0.27)
      ) * 0.018;
      vec2 causticsUvA = vCausticsWorldPosition.xz * 0.0065 + causticsWarp +
        vec2(causticsTime * 0.018, -causticsTime * 0.012);
      mat2 causticsRotation = mat2(0.819, -0.574, 0.574, 0.819);
      vec2 causticsUvB = causticsRotation *
          (vCausticsWorldPosition.xz * 0.00475 - causticsWarp * 0.74) +
        vec2(-causticsTime * 0.011, causticsTime * 0.016);
      float causticsA = texture2D(causticsMap, causticsUvA).r;
      float causticsB = texture2D(causticsMap, causticsUvB).r;
      float movingCaustics = pow(
        clamp(causticsA * 0.76 + causticsB * 0.4 - 0.035, 0.0, 1.0),
        1.18
      );
      ${
        includeRipple
          ? `vec2 causticsRippleUv =
        (vCausticsWorldPosition.xz - causticsRippleCenter) /
          causticsRippleWorldSize + 0.5;
      vec2 causticsRippleEdge =
        smoothstep(vec2(0.0), vec2(0.1), causticsRippleUv) *
        smoothstep(vec2(0.0), vec2(0.1), vec2(1.0) - causticsRippleUv);
      float causticsRippleMask = causticsRippleEdge.x * causticsRippleEdge.y;
      float causticsRippleX =
        texture2D(causticsRippleSampler, causticsRippleUv +
          vec2(causticsRippleTexel.x, 0.0)).r -
        texture2D(causticsRippleSampler, causticsRippleUv -
          vec2(causticsRippleTexel.x, 0.0)).r;
      float causticsRippleY =
        texture2D(causticsRippleSampler, causticsRippleUv +
          vec2(0.0, causticsRippleTexel.y)).r -
        texture2D(causticsRippleSampler, causticsRippleUv -
          vec2(0.0, causticsRippleTexel.y)).r;
      float rippleCaustics = smoothstep(0.012, 0.12,
        length(vec2(causticsRippleX, causticsRippleY))) * causticsRippleMask;`
          : "float rippleCaustics = 0.0;"
      }
      movingCaustics = clamp(movingCaustics + rippleCaustics * 0.75, 0.0, 1.0);
      vec3 underwaterFill = diffuseColor.rgb * vec3(
        ${lightTint[0].toFixed(4)},
        ${lightTint[1].toFixed(4)},
        ${lightTint[2].toFixed(4)}
      );
      reflectedLight.indirectDiffuse += underwaterFill * submerged *
        (${baseLight.toFixed(4)} + movingCaustics * ${causticsStrength.toFixed(4)});`
    );
  };
  material.customProgramCacheKey = () =>
    `${previousCacheKey()}-underwater-caustics-v4-${includeRipple ? "ripple" : "fine"}-${baseLight}-${causticsStrength}`;
  material.userData.hasUnderwaterCaustics = true;
  material.needsUpdate = true;
}

class SurfaceSampleCollider {
  private readonly cells = new Map<string, THREE.Vector3[]>();
  private ready = false;

  build(root: THREE.Object3D) {
    this.clear();
    root.updateWorldMatrix(true, true);

    let totalVertices = 0;
    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const positions = child.geometry.getAttribute("position");
      if (positions) totalVertices += positions.count;
    });
    const stride = Math.max(
      1,
      Math.ceil(totalVertices / MAX_COLLISION_SAMPLES)
    );
    const point = new THREE.Vector3();

    root.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const positions = child.geometry.getAttribute("position");
      if (!positions) return;

      for (let index = 0; index < positions.count; index += stride) {
        point.fromBufferAttribute(positions, index);
        if (child instanceof THREE.SkinnedMesh) {
          child.applyBoneTransform(index, point);
        }
        point.applyMatrix4(child.matrixWorld);
        const key = this.keyFor(point.x, point.y, point.z);
        const samples = this.cells.get(key) ?? [];
        samples.push(point.clone());
        this.cells.set(key, samples);
      }
    });

    this.ready = this.cells.size > 0;
  }

  resolve(position: THREE.Vector3, playerRadius: number) {
    if (!this.ready) return false;
    const contactDistance = playerRadius + COLLISION_SURFACE_RADIUS;
    const range = Math.ceil(contactDistance / COLLISION_CELL_SIZE);
    let collided = false;

    for (let iteration = 0; iteration < 2; iteration += 1) {
      const cellX = Math.floor(position.x / COLLISION_CELL_SIZE);
      const cellY = Math.floor(position.y / COLLISION_CELL_SIZE);
      const cellZ = Math.floor(position.z / COLLISION_CELL_SIZE);

      for (let x = cellX - range; x <= cellX + range; x += 1) {
        for (let y = cellY - range; y <= cellY + range; y += 1) {
          for (let z = cellZ - range; z <= cellZ + range; z += 1) {
            const samples = this.cells.get(`${x}:${y}:${z}`);
            if (!samples) continue;

            for (const sample of samples) {
              const distanceSquared = position.distanceToSquared(sample);
              if (distanceSquared >= contactDistance ** 2) continue;
              const distance = Math.sqrt(distanceSquared);
              if (distance > 0.0001) {
                position.addScaledVector(
                  position.clone().sub(sample).divideScalar(distance),
                  contactDistance - distance
                );
              } else {
                position.y += contactDistance;
              }
              collided = true;
            }
          }
        }
      }
    }

    return collided;
  }

  clear() {
    this.cells.clear();
    this.ready = false;
  }

  private keyFor(x: number, y: number, z: number) {
    return `${Math.floor(x / COLLISION_CELL_SIZE)}:${Math.floor(
      y / COLLISION_CELL_SIZE
    )}:${Math.floor(z / COLLISION_CELL_SIZE)}`;
  }
}

const islandSurfaceCollider = new SurfaceSampleCollider();

class RippleField {
  readonly center = new THREE.Vector2();
  readonly texture: THREE.DataTexture;
  private height = new Float32Array(RIPPLE_TEXTURE_SIZE ** 2);
  private velocity = new Float32Array(RIPPLE_TEXTURE_SIZE ** 2);
  private nextHeight = new Float32Array(RIPPLE_TEXTURE_SIZE ** 2);
  private nextVelocity = new Float32Array(RIPPLE_TEXTURE_SIZE ** 2);
  private pixels = new Uint8Array(RIPPLE_TEXTURE_SIZE ** 2 * 4);
  private accumulator = 0;

  constructor() {
    for (let index = 0; index < this.pixels.length; index += 4) {
      this.pixels[index] = 128;
      this.pixels[index + 1] = 128;
      this.pixels[index + 2] = 128;
      this.pixels[index + 3] = 255;
    }

    this.texture = new THREE.DataTexture(
      this.pixels,
      RIPPLE_TEXTURE_SIZE,
      RIPPLE_TEXTURE_SIZE,
      THREE.RGBAFormat,
      THREE.UnsignedByteType
    );
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.wrapS = this.texture.wrapT = THREE.ClampToEdgeWrapping;
    this.texture.colorSpace = THREE.NoColorSpace;
    this.texture.needsUpdate = true;
  }

  moveWindowTo(x: number, z: number) {
    if ((this.center.x - x) ** 2 + (this.center.y - z) ** 2 < 180 ** 2) {
      return;
    }

    const pixelWorldSize =
      RIPPLE_WORLD_SIZE / (RIPPLE_TEXTURE_SIZE - 1);
    const shiftX = Math.round((x - this.center.x) / pixelWorldSize);
    const shiftZ = Math.round((z - this.center.y) / pixelWorldSize);

    this.nextHeight.fill(0);
    this.nextVelocity.fill(0);

    for (let targetZ = 0; targetZ < RIPPLE_TEXTURE_SIZE; targetZ += 1) {
      const sourceZ = targetZ + shiftZ;
      if (sourceZ < 0 || sourceZ >= RIPPLE_TEXTURE_SIZE) continue;

      for (let targetX = 0; targetX < RIPPLE_TEXTURE_SIZE; targetX += 1) {
        const sourceX = targetX + shiftX;
        if (sourceX < 0 || sourceX >= RIPPLE_TEXTURE_SIZE) continue;

        const targetIndex = targetZ * RIPPLE_TEXTURE_SIZE + targetX;
        const sourceIndex = sourceZ * RIPPLE_TEXTURE_SIZE + sourceX;
        this.nextHeight[targetIndex] = this.height[sourceIndex];
        this.nextVelocity[targetIndex] = this.velocity[sourceIndex];
      }
    }

    this.height.set(this.nextHeight);
    this.velocity.set(this.nextVelocity);
    this.nextHeight.fill(0);
    this.nextVelocity.fill(0);
    this.center.x += shiftX * pixelWorldSize;
    this.center.y += shiftZ * pixelWorldSize;
    this.encodeTexture();
  }

  addRipple(x: number, z: number, strength = 0.8, radius = 20) {
    const u = (x - this.center.x) / RIPPLE_WORLD_SIZE + 0.5;
    const v = (z - this.center.y) / RIPPLE_WORLD_SIZE + 0.5;
    if (u <= 0 || u >= 1 || v <= 0 || v >= 1) return;

    const centerX = u * (RIPPLE_TEXTURE_SIZE - 1);
    const centerY = v * (RIPPLE_TEXTURE_SIZE - 1);
    const radiusPixels = Math.max(
      2,
      (radius / RIPPLE_WORLD_SIZE) * RIPPLE_TEXTURE_SIZE
    );
    const range = Math.ceil(radiusPixels * 2.4);
    const minX = Math.max(1, Math.floor(centerX - range));
    const maxX = Math.min(RIPPLE_TEXTURE_SIZE - 2, Math.ceil(centerX + range));
    const minY = Math.max(1, Math.floor(centerY - range));
    const maxY = Math.min(RIPPLE_TEXTURE_SIZE - 2, Math.ceil(centerY + range));

    for (let py = minY; py <= maxY; py += 1) {
      for (let px = minX; px <= maxX; px += 1) {
        const distanceSquared =
          (px - centerX) ** 2 + (py - centerY) ** 2;
        const impulse = Math.exp(
          -distanceSquared / (radiusPixels * radiusPixels * 0.72)
        );
        this.velocity[py * RIPPLE_TEXTURE_SIZE + px] += strength * impulse;
      }
    }
  }

  displaceSphere(
    oldCenter: THREE.Vector3,
    newCenter: THREE.Vector3,
    radius: number
  ) {
    if (radius <= 0.001) return;

    const worldMinX = Math.min(oldCenter.x, newCenter.x) - radius;
    const worldMaxX = Math.max(oldCenter.x, newCenter.x) + radius;
    const worldMinZ = Math.min(oldCenter.z, newCenter.z) - radius;
    const worldMaxZ = Math.max(oldCenter.z, newCenter.z) + radius;
    const toPixelX = (worldX: number) =>
      ((worldX - this.center.x) / RIPPLE_WORLD_SIZE + 0.5) *
      (RIPPLE_TEXTURE_SIZE - 1);
    const toPixelZ = (worldZ: number) =>
      ((worldZ - this.center.y) / RIPPLE_WORLD_SIZE + 0.5) *
      (RIPPLE_TEXTURE_SIZE - 1);
    const minX = Math.max(1, Math.floor(toPixelX(worldMinX)));
    const maxX = Math.min(
      RIPPLE_TEXTURE_SIZE - 2,
      Math.ceil(toPixelX(worldMaxX))
    );
    const minZ = Math.max(1, Math.floor(toPixelZ(worldMinZ)));
    const maxZ = Math.min(
      RIPPLE_TEXTURE_SIZE - 2,
      Math.ceil(toPixelZ(worldMaxZ))
    );
    if (minX > maxX || minZ > maxZ) return;

    const radiusSquared = radius * radius;
    const submergedColumn = (
      worldX: number,
      worldZ: number,
      sphereCenter: THREE.Vector3
    ) => {
      const horizontalDistanceSquared =
        (worldX - sphereCenter.x) ** 2 +
        (worldZ - sphereCenter.z) ** 2;
      if (horizontalDistanceSquared >= radiusSquared) return 0;

      const halfColumn = Math.sqrt(
        radiusSquared - horizontalDistanceSquared
      );
      const bottom = sphereCenter.y - halfColumn;
      const top = sphereCenter.y + halfColumn;
      return THREE.MathUtils.clamp(
        SEA_LEVEL_Y - bottom,
        0,
        top - bottom
      );
    };

    for (let pz = minZ; pz <= maxZ; pz += 1) {
      const worldZ =
        this.center.y +
        (pz / (RIPPLE_TEXTURE_SIZE - 1) - 0.5) * RIPPLE_WORLD_SIZE;
      for (let px = minX; px <= maxX; px += 1) {
        const worldX =
          this.center.x +
          (px / (RIPPLE_TEXTURE_SIZE - 1) - 0.5) * RIPPLE_WORLD_SIZE;
        const oldVolume = submergedColumn(worldX, worldZ, oldCenter);
        const newVolume = submergedColumn(worldX, worldZ, newCenter);
        const displacement = (oldVolume - newVolume) / radius;
        if (Math.abs(displacement) < 0.00001) continue;

        const index = pz * RIPPLE_TEXTURE_SIZE + px;
        this.height[index] += THREE.MathUtils.clamp(
          displacement * 0.58,
          -0.48,
          0.48
        );
        this.velocity[index] += THREE.MathUtils.clamp(
          displacement * 0.1,
          -0.08,
          0.08
        );
      }
    }
  }

  step(delta: number) {
    this.accumulator += Math.min(delta, 0.05);
    const fixedStep = 1 / 30;
    let changed = false;

    while (this.accumulator >= fixedStep) {
      for (let y = 1; y < RIPPLE_TEXTURE_SIZE - 1; y += 1) {
        for (let x = 1; x < RIPPLE_TEXTURE_SIZE - 1; x += 1) {
          const index = y * RIPPLE_TEXTURE_SIZE + x;
          const laplacian =
            this.height[index - 1] +
            this.height[index + 1] +
            this.height[index - RIPPLE_TEXTURE_SIZE] +
            this.height[index + RIPPLE_TEXTURE_SIZE] -
            this.height[index] * 4;
          const nextVelocity =
            (this.velocity[index] + laplacian * 0.22) * 0.986;
          this.nextVelocity[index] = nextVelocity;
          this.nextHeight[index] =
            (this.height[index] + nextVelocity * 0.78) * 0.998;
        }
      }

      [this.height, this.nextHeight] = [this.nextHeight, this.height];
      [this.velocity, this.nextVelocity] = [
        this.nextVelocity,
        this.velocity,
      ];
      this.nextHeight.fill(0);
      this.nextVelocity.fill(0);
      this.accumulator -= fixedStep;
      changed = true;
    }

    if (changed) this.encodeTexture();
  }

  dispose() {
    this.texture.dispose();
  }

  private encodeTexture() {
    for (let index = 0; index < this.height.length; index += 1) {
      const encoded = Math.round(
        THREE.MathUtils.clamp(128 + this.height[index] * 42, 0, 255)
      );
      const pixelIndex = index * 4;
      this.pixels[pixelIndex] = encoded;
      this.pixels[pixelIndex + 1] = encoded;
      this.pixels[pixelIndex + 2] = encoded;
      this.pixels[pixelIndex + 3] = 255;
    }
    this.texture.needsUpdate = true;
  }
}

const rippleField = new RippleField();

function lerpAngle(a: number, b: number, amount: number) {
  let difference = b - a;
  while (difference < -Math.PI) difference += Math.PI * 2;
  while (difference > Math.PI) difference -= Math.PI * 2;
  return a + difference * amount;
}

function Ocean() {
  const ref = useRef<Water | null>(null);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL}waternormals.jpeg`
  );

  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geometry = useMemo(() => new THREE.PlaneGeometry(OCEAN_SIZE, OCEAN_SIZE), []);
  const water = useMemo(
    () => {
      const ocean = new Water(geometry, {
        textureWidth: 512,
        textureHeight: 512,
        clipBias: 0.003,
        waterNormals,
        sunDirection: FIXED_WATER_SUN_DIRECTION.clone(),
        sunColor: new THREE.Color("#fff2cc"),
        waterColor: new THREE.Color(FIXED_WATER_COLOR),
        distortionScale: 10.7,
        alpha: 0.955,
        fog: false,
      });
      const material = ocean.material as THREE.ShaderMaterial;

      material.transparent = true;
      material.depthTest = true;
      material.depthWrite = false;
      material.uniforms.rippleSampler = { value: rippleField.texture };
      material.uniforms.rippleCenter = { value: rippleField.center };
      material.uniforms.rippleWorldSize = { value: RIPPLE_WORLD_SIZE };
      material.uniforms.rippleTexel = {
        value: new THREE.Vector2(
          1 / RIPPLE_TEXTURE_SIZE,
          1 / RIPPLE_TEXTURE_SIZE
        ),
      };
      material.uniforms.surfacePulseTime = { value: currentPulseTime() };
      material.uniforms.surfacePulseCenters = {
        value: Array.from(
          { length: MAX_SURFACE_PULSES },
          () => new THREE.Vector2()
        ),
      };
      material.uniforms.surfacePulseStarts = {
        value: new Float32Array(MAX_SURFACE_PULSES).fill(-1000),
      };
      material.uniforms.surfacePulseDurations = {
        value: new Float32Array(MAX_SURFACE_PULSES).fill(1),
      };
      material.uniforms.surfacePulseRadii = {
        value: new Float32Array(MAX_SURFACE_PULSES),
      };
      material.uniforms.surfacePulseStrengths = {
        value: new Float32Array(MAX_SURFACE_PULSES),
      };
      material.fragmentShader = material.fragmentShader
        .replace(
          "uniform vec3 waterColor;",
          `uniform vec3 waterColor;
          uniform sampler2D rippleSampler;
          uniform vec2 rippleCenter;
          uniform float rippleWorldSize;
          uniform vec2 rippleTexel;
          uniform float surfacePulseTime;
          uniform vec2 surfacePulseCenters[${MAX_SURFACE_PULSES}];
          uniform float surfacePulseStarts[${MAX_SURFACE_PULSES}];
          uniform float surfacePulseDurations[${MAX_SURFACE_PULSES}];
          uniform float surfacePulseRadii[${MAX_SURFACE_PULSES}];
          uniform float surfacePulseStrengths[${MAX_SURFACE_PULSES}];

          float rippleHeight(vec2 uv) {
            return texture2D(rippleSampler, uv).r * 2.0 - 1.0;
          }`
        )
        .replace(
          "vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );",
          `vec3 surfaceNormal = normalize( noise.xzy * vec3( 1.5, 1.0, 1.5 ) );
          vec2 rippleUv = (worldPosition.xz - rippleCenter) / rippleWorldSize + 0.5;
          vec2 rippleEdge = smoothstep(vec2(0.0), vec2(0.08), rippleUv) *
            smoothstep(vec2(0.0), vec2(0.08), vec2(1.0) - rippleUv);
          float rippleMask = rippleEdge.x * rippleEdge.y;
          float rippleLeft = rippleHeight(rippleUv - vec2(rippleTexel.x, 0.0));
          float rippleRight = rippleHeight(rippleUv + vec2(rippleTexel.x, 0.0));
          float rippleDown = rippleHeight(rippleUv - vec2(0.0, rippleTexel.y));
          float rippleUp = rippleHeight(rippleUv + vec2(0.0, rippleTexel.y));
          vec2 rippleSlope = vec2(rippleLeft - rippleRight, rippleDown - rippleUp);
          surfaceNormal = normalize(surfaceNormal + vec3(rippleSlope.x, 0.0, rippleSlope.y) * rippleMask * 2.6);

          vec2 independentPulseSlope = vec2(0.0);
          for (int pulseIndex = 0; pulseIndex < ${MAX_SURFACE_PULSES}; pulseIndex++) {
            float pulseAge = surfacePulseTime - surfacePulseStarts[pulseIndex];
            float pulseDuration = max(surfacePulseDurations[pulseIndex], 0.001);
            float pulseProgress = clamp(pulseAge / pulseDuration, 0.0, 1.0);
            float pulseActive =
              step(0.0, pulseAge) * (1.0 - step(pulseDuration, pulseAge));
            vec2 fromPulse = worldPosition.xz - surfacePulseCenters[pulseIndex];
            float pulseDistance = max(length(fromPulse), 0.001);
            float pulseRadius = surfacePulseRadii[pulseIndex] *
              (0.08 + pulseProgress * 0.92);
            float pulseWidth = mix(
              max(3.2, surfacePulseRadii[pulseIndex] * 0.11),
              max(5.5, surfacePulseRadii[pulseIndex] * 0.19),
              pulseProgress
            );
            float pulseBand = exp(
              -pow((pulseDistance - pulseRadius) / pulseWidth, 2.0)
            );
            float pulseFade = pow(1.0 - pulseProgress, 1.55);
            independentPulseSlope += normalize(fromPulse) * pulseBand *
              pulseFade * surfacePulseStrengths[pulseIndex] * pulseActive;
          }
          surfaceNormal = normalize(
            surfaceNormal +
            vec3(independentPulseSlope.x, 0.0, independentPulseSlope.y) * 0.72
          );`
        );
      material.needsUpdate = true;
      ocean.renderOrder = 2;
      return ocean;
    },
    [geometry, waterNormals]
  );

  water.material.uniforms.waterColor.value.convertSRGBToLinear();

  useEffect(() => {
    return () => {
      geometry.dispose();
      water.material.dispose();
    };
  }, [geometry, water]);

  useFrame((_, delta) => {
    rippleField.step(delta);
    if (ref.current) {
      const material = ref.current.material as THREE.ShaderMaterial;
      material.uniforms.time.value += delta;
      material.uniforms.rippleCenter.value.copy(rippleField.center);
      const now = currentPulseTime();
      material.uniforms.surfacePulseTime.value = now;
      const centers = material.uniforms.surfacePulseCenters
        .value as THREE.Vector2[];
      const starts = material.uniforms.surfacePulseStarts
        .value as Float32Array;
      const durations = material.uniforms.surfacePulseDurations
        .value as Float32Array;
      const radii = material.uniforms.surfacePulseRadii
        .value as Float32Array;
      const strengths = material.uniforms.surfacePulseStrengths
        .value as Float32Array;
      for (let index = 0; index < MAX_SURFACE_PULSES; index += 1) {
        const pulse = surfacePulses[index];
        if (!pulse) {
          starts[index] = -1000;
          durations[index] = 1;
          radii[index] = 0;
          strengths[index] = 0;
          continue;
        }
        centers[index].set(pulse.x, pulse.z);
        starts[index] = pulse.startedAt;
        durations[index] = pulse.duration;
        radii[index] = pulse.radius;
        strengths[index] = pulse.strength;
      }
    }
  });

  return <primitive object={water} ref={ref} rotation-x={-Math.PI / 2} />;
}

const MAX_WAKE_PARTICLES = 120;

function CharacterSurfaceWake() {
  const spawnAccumulator = useRef(0);
  const rippleAccumulator = useRef(0);
  const nextParticle = useRef(0);
  const particles = useRef(
    Array.from({ length: MAX_WAKE_PARTICLES }, () => ({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      life: 0,
      totalLife: 1,
      size: 1,
    }))
  );
  const geometry = useMemo(() => {
    const wakeGeometry = new THREE.BufferGeometry();
    wakeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array(MAX_WAKE_PARTICLES * 3),
        3
      )
    );
    wakeGeometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(new Float32Array(MAX_WAKE_PARTICLES), 1)
    );
    wakeGeometry.setAttribute(
      "aAlpha",
      new THREE.BufferAttribute(new Float32Array(MAX_WAKE_PARTICLES), 1)
    );
    return wakeGeometry;
  }, []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        depthTest: true,
        toneMapped: false,
        uniforms: {},
        vertexShader: `
          attribute float aSize;
          attribute float aAlpha;
          varying float vAlpha;
          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = clamp(
              aSize * (220.0 / max(1.0, -viewPosition.z)),
              1.5,
              20.0
            );
            vAlpha = aAlpha;
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          void main() {
            vec2 point = gl_PointCoord - 0.5;
            float distanceToCenter = length(point);
            float foam = 1.0 - smoothstep(0.28, 0.5, distanceToCenter);
            float rim = smoothstep(0.06, 0.34, distanceToCenter) *
              (1.0 - smoothstep(0.34, 0.5, distanceToCenter));
            float alpha = (foam * 0.72 + rim * 0.42) * vAlpha;
            if (alpha < 0.01) discard;
            gl_FragColor = vec4(
              mix(vec3(0.68, 0.88, 0.96), vec3(1.0), foam),
              alpha
            );
          }
        `,
      }),
    []
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame((_, delta) => {
    const player = playerRef.current;
    const positionAttribute = geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const sizeAttribute = geometry.getAttribute(
      "aSize"
    ) as THREE.BufferAttribute;
    const alphaAttribute = geometry.getAttribute(
      "aAlpha"
    ) as THREE.BufferAttribute;

    for (let index = 0; index < particles.current.length; index += 1) {
      const particle = particles.current[index];
      if (particle.life > 0) {
        particle.life -= delta;
        particle.position.addScaledVector(particle.velocity, delta);
        particle.velocity.y -= delta * 7.5;
        const progress = THREE.MathUtils.clamp(
          particle.life / particle.totalLife,
          0,
          1
        );
        positionAttribute.setXYZ(
          index,
          particle.position.x,
          particle.position.y,
          particle.position.z
        );
        sizeAttribute.setX(index, particle.size * (1.18 - progress * 0.18));
        alphaAttribute.setX(
          index,
          Math.sin(progress * Math.PI) * 0.82
        );
      } else {
        alphaAttribute.setX(index, 0);
      }
    }

    if (player) {
      const minimumY =
        player.position.y + Number(player.userData.renderedMinY ?? 0);
      const maximumY =
        player.position.y + Number(player.userData.renderedMaxY ?? 0);
      const speed = Number(player.userData.speed) || 0;
      const touchesWater =
        minimumY < SEA_LEVEL_Y + 4 && maximumY > SEA_LEVEL_Y - 4;
      const isShip = String(player.userData.characterId ?? "").includes(
        "pirate-sailing-ship"
      );
      const heading = new THREE.Vector3(
        Number(player.userData.headingX) || 0,
        0,
        Number(player.userData.headingZ) || 1
      ).normalize();
      const right = new THREE.Vector3(heading.z, 0, -heading.x);
      const halfWidth = THREE.MathUtils.clamp(
        Number(player.userData.renderedWidth) * (isShip ? 0.34 : 0.18),
        2.5,
        isShip ? 18 : 8
      );
      const halfLength = THREE.MathUtils.clamp(
        Number(player.userData.renderedLength) * (isShip ? 0.38 : 0.18),
        3,
        isShip ? 42 : 10
      );

      if (touchesWater && speed > 1.2) {
        spawnAccumulator.current += delta * Math.min(speed / 26, 2.4);
        const spawnInterval = isShip ? 0.022 : 0.055;
        while (spawnAccumulator.current >= spawnInterval) {
          spawnAccumulator.current -= spawnInterval;
          const particle =
            particles.current[
              nextParticle.current % particles.current.length
            ];
          nextParticle.current += 1;
          const side = Math.random() < 0.5 ? -1 : 1;
          const fromBow = isShip && Math.random() < 0.68;
          const longitudinal = fromBow
            ? halfLength * (0.32 + Math.random() * 0.12)
            : -halfLength * (0.2 + Math.random() * 0.22);
          const lateral =
            side *
            halfWidth *
            (fromBow ? 0.42 + Math.random() * 0.28 : Math.random() * 0.72);
          particle.position
            .copy(player.position)
            .addScaledVector(heading, longitudinal)
            .addScaledVector(right, lateral);
          particle.position.y = SEA_LEVEL_Y + 0.3 + Math.random() * 0.55;
          particle.velocity
            .copy(right)
            .multiplyScalar(side * (2.5 + Math.random() * (isShip ? 8 : 4)))
            .addScaledVector(heading, fromBow ? -4 : -7)
            .add(
              new THREE.Vector3(
                (Math.random() - 0.5) * 2,
                3.5 + Math.random() * (isShip ? 7.5 : 4),
                (Math.random() - 0.5) * 2
              )
            );
          particle.totalLife = isShip
            ? 0.55 + Math.random() * 0.55
            : 0.4 + Math.random() * 0.35;
          particle.life = particle.totalLife;
          particle.size = isShip
            ? 4.5 + Math.random() * 6
            : 3 + Math.random() * 4;
        }

        rippleAccumulator.current += delta;
        if (rippleAccumulator.current >= (isShip ? 0.09 : 0.16)) {
          rippleAccumulator.current = 0;
          const stern = player.position
            .clone()
            .addScaledVector(heading, -halfLength * 0.34);
          rippleField.addRipple(
            stern.x,
            stern.z,
            isShip ? 0.2 : 0.1,
            isShip ? Math.max(9, halfWidth * 0.8) : 6
          );
          if (isShip) {
            for (const side of [-1, 1]) {
              const wakePoint = stern
                .clone()
                .addScaledVector(right, side * halfWidth * 0.48)
                .addScaledVector(heading, -halfLength * 0.12);
              rippleField.addRipple(
                wakePoint.x,
                wakePoint.z,
                0.14,
                Math.max(7, halfWidth * 0.46)
              );
            }
          }
        }
      } else {
        spawnAccumulator.current = 0;
        rippleAccumulator.current = 0;
      }
    }

    positionAttribute.needsUpdate = true;
    sizeAttribute.needsUpdate = true;
    alphaAttribute.needsUpdate = true;
  });

  return (
    <points
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={4}
    />
  );
}

function SeaFloor() {
  const causticsMap = useCausticsTexture();
  const material = useMemo(() => {
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: "#315057",
      roughness: 0.96,
      metalness: 0,
      side: THREE.DoubleSide,
    });
    addUnderwaterCaustics(floorMaterial, causticsMap);
    return floorMaterial;
  }, [causticsMap]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    causticsTimeUniform.value = state.clock.elapsedTime;
  });

  return (
    <mesh
      rotation-x={-Math.PI / 2}
      position-y={SEA_FLOOR_Y}
      renderOrder={0}
      receiveShadow
    >
      <planeGeometry args={[OCEAN_SIZE, OCEAN_SIZE]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function RisingBubbleFields() {
  const visibility = useRef(0);
  const cellSize = 260;
  const cellRadius = 4;
  const renderRange = cellSize * (cellRadius + 0.55);
  const bubbleSlots = useMemo(
    () =>
      Array.from(
        { length: (cellRadius * 2 + 1) ** 2 * 3 },
        (_, index) => {
          const cellIndex = Math.floor(index / 3);
          return {
            relativeCellX:
              (cellIndex % (cellRadius * 2 + 1)) - cellRadius,
            relativeCellZ:
              Math.floor(cellIndex / (cellRadius * 2 + 1)) - cellRadius,
            memberIndex: index % 3,
          };
        }
      ),
    []
  );
  const geometry = useMemo(() => {
    const bubbleGeometry = new THREE.BufferGeometry();
    bubbleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(bubbleSlots.length * 3), 3)
    );
    bubbleGeometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(new Float32Array(bubbleSlots.length), 1)
    );
    bubbleGeometry.setAttribute(
      "aAlpha",
      new THREE.BufferAttribute(new Float32Array(bubbleSlots.length), 1)
    );
    return bubbleGeometry;
  }, [bubbleSlots.length]);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        toneMapped: false,
        uniforms: {
          visibility: { value: 0 },
        },
        vertexShader: `
          attribute float aSize;
          attribute float aAlpha;
          varying float vAlpha;

          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * viewPosition;
            gl_PointSize = clamp(
              aSize * (250.0 / max(1.0, -viewPosition.z)),
              2.0,
              34.0
            );
            vAlpha = aAlpha;
          }
        `,
        fragmentShader: `
          uniform float visibility;
          varying float vAlpha;

          void main() {
            vec2 point = gl_PointCoord - 0.5;
            float distanceToCenter = length(point);
            float outer = 1.0 - smoothstep(0.42, 0.5, distanceToCenter);
            float inner = 1.0 - smoothstep(0.29, 0.39, distanceToCenter);
            float ring = max(0.0, outer - inner * 0.88);
            float glint = 1.0 - smoothstep(
              0.035,
              0.12,
              distance(point, vec2(-0.18, 0.18))
            );
            float alpha = (ring * 0.78 + glint * 0.42) * vAlpha * visibility;
            if (alpha < 0.008) discard;
            gl_FragColor = vec4(vec3(0.76, 0.94, 1.0), alpha);
          }
        `,
      }),
    []
  );

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material]
  );

  useFrame(({ camera, clock }, delta) => {
    visibility.current = THREE.MathUtils.damp(
      visibility.current,
      camera.position.y < SEA_LEVEL_Y - 0.45 ? 1 : 0,
      5.2,
      delta
    );
    material.uniforms.visibility.value = visibility.current;

    const positions = geometry.getAttribute(
      "position"
    ) as THREE.BufferAttribute;
    const sizes = geometry.getAttribute("aSize") as THREE.BufferAttribute;
    const alphas = geometry.getAttribute("aAlpha") as THREE.BufferAttribute;
    const elapsed = clock.elapsedTime;
    const travelHeight = SEA_LEVEL_Y - SEA_FLOOR_Y - 7;
    const playerPosition = playerRef.current?.position ?? camera.position;
    const centerCellX = Math.floor(playerPosition.x / cellSize);
    const centerCellZ = Math.floor(playerPosition.z / cellSize);
    const stableHash = (x: number, z: number, salt: number) => {
      const raw =
        Math.sin(x * 127.1 + z * 311.7 + salt * 74.7) * 43758.5453;
      return raw - Math.floor(raw);
    };

    bubbleSlots.forEach((slot, index) => {
      const cellX = centerCellX + slot.relativeCellX;
      const cellZ = centerCellZ + slot.relativeCellZ;
      const memberCount = stableHash(cellX, cellZ, 1) > 0.48 ? 3 : 2;
      if (slot.memberIndex >= memberCount) {
        alphas.setX(index, 0);
        return;
      }

      const ventX =
        (cellX + 0.14 + stableHash(cellX, cellZ, 2) * 0.72) * cellSize;
      const ventZ =
        (cellZ + 0.14 + stableHash(cellX, cellZ, 3) * 0.72) * cellSize;
      const angle =
        stableHash(cellX, cellZ, 4) * Math.PI * 2 +
        slot.memberIndex * 2.1;
      const baseX = ventX + Math.cos(angle) * (3 + slot.memberIndex * 2);
      const baseZ = ventZ + Math.sin(angle) * (3 + slot.memberIndex * 2);
      const phase =
        (stableHash(cellX, cellZ, 5 + slot.memberIndex) +
          slot.memberIndex * 0.07) %
        1;
      const duration =
        16 + stableHash(cellX, cellZ, 9 + slot.memberIndex) * 10;
      const size =
        4.8 + stableHash(cellX, cellZ, 13 + slot.memberIndex) * 3.2;
      const drift =
        2.2 + stableHash(cellX, cellZ, 17 + slot.memberIndex) * 2.4;
      const progress = (elapsed / duration + phase) % 1;
      const sway =
        Math.sin(elapsed * 0.72 + angle + progress * Math.PI * 3) *
        drift;
      const crossSway =
        Math.cos(elapsed * 0.51 + angle * 1.4) * drift * 0.55;
      const fadeIn = THREE.MathUtils.smoothstep(progress, 0, 0.08);
      const fadeOut =
        1 - THREE.MathUtils.smoothstep(progress, 0.8, 0.985);
      const distance = Math.hypot(
        baseX - playerPosition.x,
        baseZ - playerPosition.z
      );
      const rangeFade =
        1 -
        THREE.MathUtils.smoothstep(
          distance,
          renderRange * 0.72,
          renderRange
        );

      positions.setXYZ(
        index,
        baseX + sway,
        SEA_FLOOR_Y + 4 + progress * travelHeight,
        baseZ + crossSway
      );
      sizes.setX(index, size * (0.82 + progress * 0.48));
      alphas.setX(index, fadeIn * fadeOut * rangeFade * 0.82);
    });

    positions.needsUpdate = true;
    sizes.needsUpdate = true;
    alphas.needsUpdate = true;
  });

  return (
    <points
      geometry={geometry}
      material={material}
      frustumCulled={false}
      renderOrder={5}
    />
  );
}

function UnderwaterSurface() {
  const ref = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  const waterNormals = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL}waternormals.jpeg`
  );
  useMemo(() => {
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    waterNormals.colorSpace = THREE.NoColorSpace;
    waterNormals.needsUpdate = true;
  }, [waterNormals]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          normalSampler: { value: waterNormals },
          rippleSampler: { value: rippleField.texture },
          rippleCenter: { value: rippleField.center },
          rippleWorldSize: { value: RIPPLE_WORLD_SIZE },
        },
        vertexShader: `
          uniform float time;
          varying vec3 vWorldPosition;
          varying float vWaveHeight;
          void main() {
            vec4 baseWorld = modelMatrix * vec4(position, 1.0);
            vec2 wavePosition = baseWorld.xz;
            float waveHeight =
              sin(wavePosition.x * 0.031 + time * 0.72) * 0.52 +
              sin(wavePosition.y * 0.023 - time * 0.51) * 0.36 +
              sin((wavePosition.x + wavePosition.y) * 0.016 + time * 0.39) * 0.24;
            vec3 displaced = position;
            displaced.z += waveHeight;
            vec4 world = modelMatrix * vec4(displaced, 1.0);
            vWorldPosition = world.xyz;
            vWaveHeight = waveHeight;
            gl_Position = projectionMatrix * viewMatrix * world;
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform sampler2D normalSampler;
          uniform sampler2D rippleSampler;
          uniform vec2 rippleCenter;
          uniform float rippleWorldSize;
          varying vec3 vWorldPosition;
          varying float vWaveHeight;

          vec4 getWaterNoise(vec2 position) {
            vec2 uv0 = position / 103.0 + vec2(time / 17.0, time / 29.0);
            vec2 uv1 = position / 107.0 - vec2(time / -19.0, time / 31.0);
            vec2 uv2 = position / vec2(8907.0, 9803.0) +
              vec2(time / 101.0, time / 97.0);
            vec2 uv3 = position / vec2(1091.0, 1027.0) -
              vec2(time / 109.0, time / -113.0);
            return (texture2D(normalSampler, uv0) +
              texture2D(normalSampler, uv1) +
              texture2D(normalSampler, uv2) +
              texture2D(normalSampler, uv3)) * 0.5 - 1.0;
          }

          void main() {
            vec2 uv = (vWorldPosition.xz - rippleCenter) / rippleWorldSize + 0.5;
            float ripple = texture2D(rippleSampler, uv).r * 2.0 - 1.0;
            vec4 noise = getWaterNoise(vWorldPosition.xz);
            vec3 surfaceNormal = normalize(noise.xzy * vec3(1.5, 1.0, 1.5));
            surfaceNormal = normalize(surfaceNormal + vec3(ripple, 0.0, ripple) * 0.42);
            vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
            float fresnel = pow(1.0 - abs(dot(viewDirection, surfaceNormal)), 2.4);
            float movingLight = clamp(surfaceNormal.y * 0.48 + 0.52, 0.0, 1.0);
            vec3 color = mix(
              vec3(0.025, 0.17, 0.28),
              vec3(0.19, 0.53, 0.66),
              movingLight * 0.68 + vWaveHeight * 0.06
            );
            gl_FragColor = vec4(color, 0.4 + fresnel * 0.3);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }
        `,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
        depthTest: true,
      }),
    [waterNormals]
  );

  useEffect(() => () => material.dispose(), [material]);
  useFrame((state) => {
    material.uniforms.time.value = state.clock.elapsedTime;
    material.uniforms.rippleCenter.value.copy(rippleField.center);
    if (ref.current) {
      ref.current.position.x = camera.position.x;
      ref.current.position.z = camera.position.z;
      ref.current.visible = camera.position.y < SEA_LEVEL_Y - 0.35;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation-x={-Math.PI / 2}
      position-y={SEA_LEVEL_Y - 0.22}
      renderOrder={3}
      frustumCulled={false}
    >
      <planeGeometry args={[16000, 16000, 128, 128]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function OceanInteractionController() {
  const { camera } = useThree();

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const waterPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const hit = new THREE.Vector3();

    const addDroplet = (event: PointerEvent) => {
      const host = document.getElementById("global-sky-ocean-bg");
      if (host?.getAttribute("data-explore") !== "1") return;
      if (!event.isPrimary || event.button > 0) return;
      if (
        event.target instanceof Element &&
        event.target.closest(
          "button, input, textarea, select, a, [role='button'], [data-ocean-control]"
        )
      ) {
        return;
      }

      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(pointer, camera);
      if (!raycaster.ray.intersectPlane(waterPlane, hit)) return;
      rippleField.addRipple(hit.x, hit.z, -1.05, 22);
      addSurfacePulse(hit.x, hit.z, {
        duration: 2.7,
        radius: 82,
        strength: 0.72,
        kind: "click",
      });
    };

    window.addEventListener("pointerdown", addDroplet, { passive: true });
    return () => window.removeEventListener("pointerdown", addDroplet);
  }, [camera]);

  return null;
}

function UnderwaterController() {
  const { camera, scene } = useThree();
  const underwaterAmount = useRef(0);
  const wasUnderwater = useRef<boolean | null>(null);
  const aboveColor = useMemo(
    () => new THREE.Color(FIXED_BACKGROUND_COLOR),
    []
  );
  const belowColor = useMemo(() => new THREE.Color("#04395a"), []);
  const mixedColor = useMemo(() => new THREE.Color(), []);
  const fog = useMemo(() => new THREE.FogExp2("#0a5273", 0), []);

  useFrame((_, delta) => {
    const underwater = camera.position.y < SEA_LEVEL_Y - 0.45;
    underwaterAmount.current = THREE.MathUtils.damp(
      underwaterAmount.current,
      underwater ? 1 : 0,
      4.8,
      delta
    );
    const amount = underwaterAmount.current;
    mixedColor.lerpColors(aboveColor, belowColor, amount);
    scene.background = mixedColor;
    fog.density = amount * 0.0028;
    scene.fog = amount > 0.003 ? fog : null;

    if (wasUnderwater.current === null) {
      wasUnderwater.current = underwater;
    } else if (underwater !== wasUnderwater.current) {
      wasUnderwater.current = underwater;
      window.dispatchEvent(
        new CustomEvent("ocean-surface-cross", { detail: { underwater } })
      );
    }
  });

  useEffect(
    () => () => {
      scene.fog = null;
      scene.background = aboveColor;
    },
    [aboveColor, scene]
  );

  return null;
}

function UnderwaterFillLight() {
  const ref = useRef<THREE.HemisphereLight>(null);
  const { camera } = useThree();

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.intensity = THREE.MathUtils.damp(
      ref.current.intensity,
      camera.position.y < SEA_LEVEL_Y - 0.45 ? 0.24 : 0,
      4.2,
      delta
    );
  });

  return (
    <hemisphereLight
      ref={ref}
      color="#65c9f1"
      groundColor="#041b2b"
      intensity={0}
    />
  );
}

function AtmosphereSky() {
  const ref = useRef<THREE.Mesh>(null);
  const opacity = useRef(1);
  const { camera } = useThree();

  useEffect(() => {
    const material = ref.current?.material as THREE.ShaderMaterial | undefined;
    if (!material) return;
    material.transparent = true;
    material.depthWrite = false;
    material.needsUpdate = true;
  }, []);

  useFrame((_, delta) => {
    const material = ref.current?.material as THREE.ShaderMaterial | undefined;
    if (!material) return;
    opacity.current = THREE.MathUtils.damp(
      opacity.current,
      camera.position.y < SEA_LEVEL_Y - 0.45 ? 0 : 1,
      4.8,
      delta
    );
    material.opacity = opacity.current;
    ref.current!.visible = opacity.current > 0.004;
  });

  return (
    <Sky
      ref={ref}
      distance={SKY_DISTANCE}
      sunPosition={FIXED_SUN_POSITION}
      turbidity={0.6}
      rayleigh={0.6}
      mieCoefficient={0.001}
      mieDirectionalG={0.85}
    />
  );
}

function Island() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}island.gltf`);
  const causticsMap = useCausticsTexture();
  const stableIsland = useMemo(() => {
    const clone = scene.clone(true);
    clone.scale.setScalar(100);
    clone.position.set(0, -5, -300);

    clone.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;

      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      const stableMaterials = materials.map((sourceMaterial) => {
        const material = sourceMaterial.clone();
        if (material instanceof THREE.MeshStandardMaterial) {
          material.roughness = Math.max(material.roughness, 0.82);
          material.metalness = Math.min(material.metalness, 0.02);
          material.envMapIntensity = 0.08;
          addUnderwaterCaustics(material, causticsMap);
        }
        material.needsUpdate = true;
        return material;
      });

      child.material = Array.isArray(child.material)
        ? stableMaterials
        : stableMaterials[0];
      child.castShadow = true;
      child.receiveShadow = true;
    });

    return clone;
  }, [causticsMap, scene]);

  useLayoutEffect(() => {
    islandSurfaceCollider.build(stableIsland);
    return () => islandSurfaceCollider.clear();
  }, [stableIsland]);

  useEffect(() => {
    return () => {
      stableIsland.traverse((child) => {
        if (!(child instanceof THREE.Mesh)) return;
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((material) => material.dispose());
      });
    };
  }, [stableIsland]);

  return <primitive object={stableIsland} />;
}

function prepareCharacter(
  character: Pick<
    Character3D,
    "id" | "model_scale" | "camera_distance"
  >,
  sourceScene: THREE.Group,
  animations: THREE.AnimationClip[],
  causticsMap: THREE.Texture
): ActiveCharacter {
  const clone = SkeletonUtils.clone(sourceScene) as THREE.Group;

  clone.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;

    const originalMaterials = Array.isArray(child.material)
      ? child.material
      : [child.material];
    const clonedMaterials = originalMaterials.map((material) => {
      const nextMaterial = material.clone();
      if (nextMaterial instanceof THREE.MeshStandardMaterial) {
        addUnderwaterCaustics(nextMaterial, causticsMap, {
          includeRipple: false,
          baseLight: 0,
          causticsStrength: 0.78,
          lightTint: [1, 0.98, 0.9],
        });
      }
      nextMaterial.needsUpdate = true;
      return nextMaterial;
    });

    child.material = Array.isArray(child.material)
      ? clonedMaterials
      : clonedMaterials[0];
    child.castShadow = true;
    child.receiveShadow = true;
    child.frustumCulled = true;
  });

  clone.updateWorldMatrix(true, true);
  const bounds = new THREE.Box3().setFromObject(clone);
  const scale = THREE.MathUtils.clamp(
    Number(character.model_scale) || PLAYER_SCALE,
    0.05,
    100
  );
  const cameraDistance = THREE.MathUtils.clamp(
    Number(character.camera_distance) || 70,
    10,
    500
  );
  const size = bounds.isEmpty()
    ? new THREE.Vector3(1, 1.3, 1)
    : bounds.getSize(new THREE.Vector3());
  const center = bounds.isEmpty()
    ? new THREE.Vector3(0, 0.65, 0)
    : bounds.getCenter(new THREE.Vector3());
  const renderedSize = size.multiplyScalar(scale);

  return {
    id: character.id,
    scene: clone,
    animations,
    modelScale: scale,
    cameraDistance,
    localCenter: center.multiplyScalar(scale),
    collisionRadius: THREE.MathUtils.clamp(
      Math.max(renderedSize.x, renderedSize.z) * 0.42,
      4,
      25
    ),
    renderedHeight: Math.max(1, renderedSize.y),
    renderedMinY: bounds.isEmpty() ? 0 : bounds.min.y * scale,
    renderedMaxY: bounds.isEmpty() ? scale : bounds.max.y * scale,
    renderedWidth: Math.max(1, renderedSize.x),
    renderedLength: Math.max(1, renderedSize.z),
  };
}

function publishCharacterLoading(
  characterId: string,
  percent: number,
  options: { ready?: boolean; error?: string } = {}
) {
  window.dispatchEvent(
    new CustomEvent("ocean-character-loading", {
      detail: {
        id: characterId,
        percent: Math.round(THREE.MathUtils.clamp(percent, 0, 100)),
        ready: options.ready ?? false,
        error: options.error,
      },
    })
  );
}

function Player() {
  const group = useRef<THREE.Group>(null!);
  const { camera } = useThree();
  const wolfyUrl = `${import.meta.env.BASE_URL}wolfy.glb`;
  const { scene, animations } = useGLTF(wolfyUrl);
  const causticsMap = useCausticsTexture();
  const initialCharacter = useMemo(
    () =>
      prepareCharacter(
        {
          id: "bundled:wolfy",
          model_scale: PLAYER_SCALE,
          camera_distance: 70,
        },
        scene,
        animations,
        causticsMap
      ),
    [animations, causticsMap, scene]
  );
  const [activeCharacter, setActiveCharacter] =
    useState<ActiveCharacter>(initialCharacter);
  const activeCharacterRef = useRef(activeCharacter);
  const loadGenerationRef = useRef(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const propellerActionRef = useRef<THREE.AnimationAction | null>(null);
  const propellerRateRef = useRef(0.42);
  const sailMeshesRef = useRef<THREE.Mesh[]>([]);
  const sailInflationRef = useRef(0.14);
  const flagMeshesRef = useRef<THREE.Mesh[]>([]);
  const flagTrailRef = useRef(0.18);
  const flagPhaseRef = useRef(0);
  const engineTelemetryElapsed = useRef(0);
  const initialTransform = useMemo(() => readPlayerSessionTransform(), []);
  const initialRoll =
    Math.round(initialTransform.rotationZ / (Math.PI / 2)) *
    (Math.PI / 2);
  const initiallyGrounded =
    Math.abs(initialTransform.position[1] - PLAYER_GROUND_Y) < 0.1;
  const joystick = useRef(new THREE.Vector3());
  const verticalControl = useRef(0);
  const rollTarget = useRef(initialRoll);
  const touchSprint = useRef(false);
  const sprintBlend = useRef(0);
  const persistenceElapsed = useRef(0);
  const velocity = useRef(new THREE.Vector3());
  const verticalVelocity = useRef(0);
  const jumpReturnY = useRef(initialTransform.position[1]);
  const grounded = useRef(initiallyGrounded);
  const freeVerticalMovement = useRef(!initiallyGrounded);
  const jumping = useRef(false);
  const exploreEnabled = useRef(false);
  const facing = useRef(new THREE.Vector3(0, 0, 1));
  const previousHeight = useRef(initialTransform.position[1]);
  const previousWaterSphereCenter = useRef<THREE.Vector3 | null>(null);
  const waterDisplacementElapsed = useRef(0);
  const waterSphereCenter = useRef(new THREE.Vector3());
  const waterSphereOffset = useRef(new THREE.Vector3());
  const waterProxy = useMemo(
    () => ({
      localCenter: activeCharacter.localCenter,
      radius: activeCharacter.collisionRadius,
    }),
    [activeCharacter]
  );

  useEffect(() => {
    activeCharacterRef.current = activeCharacter;
    previousWaterSphereCenter.current = null;
    window.dispatchEvent(
      new CustomEvent("ocean-active-character-change", {
        detail: { id: activeCharacter.id },
      })
    );

    if (group.current) {
      group.current.userData.cameraDistance = activeCharacter.cameraDistance;
      group.current.userData.cameraHeight = THREE.MathUtils.clamp(
        activeCharacter.renderedHeight * 0.55,
        6,
        activeCharacter.cameraDistance * 0.68
      );
      group.current.userData.lookHeight = THREE.MathUtils.clamp(
        activeCharacter.renderedHeight * 0.32,
        4,
        activeCharacter.cameraDistance * 0.42
      );
      group.current.userData.collisionRadius = activeCharacter.collisionRadius;
      group.current.userData.characterId = activeCharacter.id;
      group.current.userData.renderedMinY = activeCharacter.renderedMinY;
      group.current.userData.renderedMaxY = activeCharacter.renderedMaxY;
      group.current.userData.renderedWidth = activeCharacter.renderedWidth;
      group.current.userData.renderedLength = activeCharacter.renderedLength;
    }

    const mixer = new THREE.AnimationMixer(activeCharacter.scene);
    sailMeshesRef.current = [];
    flagMeshesRef.current = [];
    activeCharacter.scene.traverse((object) => {
      if (
        object instanceof THREE.Mesh &&
        /sail/i.test(object.name) &&
        object.morphTargetInfluences?.length
      ) {
        object.morphTargetInfluences[0] = sailInflationRef.current;
        sailMeshesRef.current.push(object);
      }
      if (
        object instanceof THREE.Mesh &&
        /pirate_flag/i.test(object.name) &&
        object.morphTargetInfluences?.length
      ) {
        object.morphTargetInfluences[0] = flagTrailRef.current;
        if (object.morphTargetInfluences.length > 1) {
          object.morphTargetInfluences[1] = 0.2;
        }
        flagMeshesRef.current.push(object);
      }
    });
    activeCharacter.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
      action.enabled = true;
      action.play();
      if (/propeller/i.test(clip.name)) {
        action.timeScale = propellerRateRef.current;
        propellerActionRef.current = action;
      }
    });
    mixerRef.current = mixer;

    return () => {
      mixer.stopAllAction();
      mixer.uncacheRoot(activeCharacter.scene);
      if (mixerRef.current === mixer) mixerRef.current = null;
      if (propellerActionRef.current?.getMixer() === mixer) {
        propellerActionRef.current = null;
      }
      sailMeshesRef.current = [];
      flagMeshesRef.current = [];
    };
  }, [activeCharacter]);

  useEffect(() => {
    characterAssetCache.set(wolfyUrl, { scene, animations });

    const selectCharacter = (event: Event) => {
      const character = (
        event as CustomEvent<{ character: Character3D }>
      ).detail?.character;
      if (!character?.public_url) return;

      const generation = loadGenerationRef.current + 1;
      loadGenerationRef.current = generation;
      publishCharacterLoading(character.id, 0);

      const activate = (gltf: LoadedCharacterAsset) => {
        if (loadGenerationRef.current !== generation) return;
        const prepared = prepareCharacter(
          character,
          gltf.scene,
          gltf.animations,
          causticsMap
        );

        window.requestAnimationFrame(() => {
          if (loadGenerationRef.current !== generation) return;
          setActiveCharacter(prepared);
          window.requestAnimationFrame(() => {
            if (loadGenerationRef.current !== generation) return;
            publishCharacterLoading(character.id, 100, { ready: true });
          });
        });
      };

      const cached = characterAssetCache.get(character.public_url);
      if (cached) {
        publishCharacterLoading(character.id, 94);
        activate(cached);
        return;
      }

      const loader = new GLTFLoader();
      loader.load(
        character.public_url,
        (gltf) => {
          characterAssetCache.set(character.public_url, gltf);
          publishCharacterLoading(character.id, 94);
          activate(gltf);
        },
        (progress) => {
          if (loadGenerationRef.current !== generation) return;
          const percent =
            progress.total > 0
              ? (progress.loaded / progress.total) * 92
              : Math.min(88, 12 + Math.log10(progress.loaded + 1) * 12);
          publishCharacterLoading(character.id, percent);
        },
        (error) => {
          if (loadGenerationRef.current !== generation) return;
          publishCharacterLoading(character.id, 0, {
            error:
              error instanceof Error
                ? error.message
                : "Unable to load this character.",
          });
        }
      );
    };

    window.addEventListener("ocean-character-select", selectCharacter);
    window.dispatchEvent(new CustomEvent("ocean-character-player-ready"));
    return () => {
      window.removeEventListener("ocean-character-select", selectCharacter);
      loadGenerationRef.current += 1;
    };
  }, [animations, causticsMap, scene, wolfyUrl]);

  useEffect(() => {
    const playerGroup = group.current;
    playerRef.current = playerGroup;

    const joy = (event: Event) => {
      const { x, z } = (event as CustomEvent<{ x: number; z: number }>).detail;
      joystick.current.set(x, 0, z);
    };
    const jump = () => {
      if (jumping.current) return;
      if (!grounded.current && !freeVerticalMovement.current) return;
      jumping.current = true;
      freeVerticalMovement.current = false;
      grounded.current = false;
      jumpReturnY.current = group.current.position.y;
      verticalVelocity.current = JUMP_VELOCITY;
    };
    const moveVertically = (event: Event) => {
      const { y } = (event as CustomEvent<{ y: number }>).detail;
      verticalControl.current = THREE.MathUtils.clamp(y, -1, 1);
      if (Math.abs(verticalControl.current) > 0.01) {
        jumping.current = false;
        freeVerticalMovement.current = true;
        grounded.current = false;
      }
    };
    const rollByQuarterTurn = (direction: number) => {
      const currentQuarter = Math.round(
        rollTarget.current / (Math.PI / 2)
      );
      rollTarget.current =
        (currentQuarter + Math.sign(direction)) * (Math.PI / 2);
    };
    const roll = (event: Event) => {
      rollByQuarterTurn(
        (event as CustomEvent<{ direction: number }>).detail.direction
      );
    };
    const rollWithKeyboard = (event: KeyboardEvent) => {
      if (event.repeat) return;
      const key = event.key.toLowerCase();
      if (key !== "z" && key !== "x") return;
      event.preventDefault();
      rollByQuarterTurn(key === "z" ? -1 : 1);
    };
    const setSprint = (event: Event) => {
      touchSprint.current = (
        event as CustomEvent<{ active: boolean }>
      ).detail.active;
    };
    const setExploreMode = (event: Event) => {
      exploreEnabled.current = (
        event as CustomEvent<{ enabled: boolean }>
      ).detail.enabled;
      if (!exploreEnabled.current) {
        joystick.current.set(0, 0, 0);
        verticalControl.current = 0;
        jumping.current = false;
        const atGround =
          Math.abs(group.current.position.y - PLAYER_GROUND_Y) < 0.1;
        grounded.current = atGround;
        freeVerticalMovement.current = !atGround;
        touchSprint.current = false;
        sprintBlend.current = 0;
        writePlayerSessionTransform(group.current);
      }
    };

    window.addEventListener("explore-joystick", joy);
    window.addEventListener("explore-jump", jump);
    window.addEventListener("explore-vertical", moveVertically);
    window.addEventListener("explore-roll-step", roll);
    window.addEventListener("keydown", rollWithKeyboard);
    window.addEventListener("explore-sprint", setSprint);
    window.addEventListener("explore-mode", setExploreMode);
    exploreEnabled.current =
      document
        .getElementById("global-sky-ocean-bg")
        ?.getAttribute("data-explore") === "1";

    return () => {
      window.removeEventListener("explore-joystick", joy);
      window.removeEventListener("explore-jump", jump);
      window.removeEventListener("explore-vertical", moveVertically);
      window.removeEventListener("explore-roll-step", roll);
      window.removeEventListener("keydown", rollWithKeyboard);
      window.removeEventListener("explore-sprint", setSprint);
      window.removeEventListener("explore-mode", setExploreMode);
      writePlayerSessionTransform(playerGroup);
      if (playerRef.current === playerGroup) {
        playerRef.current = null;
      }
    };
  }, []);

  useFrame((state, delta) => {
    mixerRef.current?.update(Math.min(delta, 0.05));
    if (!group.current || !exploreEnabled.current) return;

    const input = new THREE.Vector3(
      joystick.current.x +
        (keys.arrowright || keys.d ? 1 : 0) -
        (keys.arrowleft || keys.a ? 1 : 0),
      0,
      joystick.current.z +
        (keys.arrowup || keys.w ? 1 : 0) -
        (keys.arrowdown || keys.s ? 1 : 0)
    );

    if (input.lengthSq() < 0.01) input.set(0, 0, 0);

    const sprintRequested =
      Boolean(keys.shift) || touchSprint.current;
    sprintBlend.current = THREE.MathUtils.damp(
      sprintBlend.current,
      sprintRequested ? 1 : 0,
      sprintRequested ? 5.5 : 3.8,
      delta
    );

    const cameraForward = new THREE.Vector3();
    camera.getWorldDirection(cameraForward);
    cameraForward.y = 0;
    cameraForward.normalize();
    const cameraRight = new THREE.Vector3()
      .crossVectors(cameraForward, new THREE.Vector3(0, 1, 0))
      .normalize();
    const move = new THREE.Vector3()
      .addScaledVector(cameraForward, input.z)
      .addScaledVector(cameraRight, input.x);

    if (move.lengthSq() > 0.0001) move.normalize();
    const isCessna =
      activeCharacterRef.current.id.includes("cessna-aircraft");
    const maximumMovementSpeed = isCessna ? 906.25 : 265;
    const movementSpeed = isCessna
      ? 125 * (1 + sprintBlend.current * 6.25)
      : 100 * (1 + sprintBlend.current * 1.65);
    velocity.current.lerp(move.multiplyScalar(movementSpeed), delta * 6);
    const movementThrottle = THREE.MathUtils.clamp(
      velocity.current.length() / maximumMovementSpeed,
      0,
      1
    );
    const targetPropellerRate = 0.42 + movementThrottle * 1.75;
    propellerRateRef.current = THREE.MathUtils.damp(
      propellerRateRef.current,
      targetPropellerRate,
      targetPropellerRate > propellerRateRef.current ? 3.2 : 2.1,
      delta
    );
    if (propellerActionRef.current) {
      propellerActionRef.current.timeScale = propellerRateRef.current;
    }
    const targetSailInflation = 0.14 + movementThrottle * 0.86;
    sailInflationRef.current = THREE.MathUtils.damp(
      sailInflationRef.current,
      targetSailInflation,
      targetSailInflation > sailInflationRef.current ? 2.25 : 1.35,
      delta
    );
    sailMeshesRef.current.forEach((sail) => {
      if (sail.morphTargetInfluences) {
        sail.morphTargetInfluences[0] = sailInflationRef.current;
      }
    });
    const targetFlagTrail = 0.18 + movementThrottle * 0.82;
    flagTrailRef.current = THREE.MathUtils.damp(
      flagTrailRef.current,
      targetFlagTrail,
      targetFlagTrail > flagTrailRef.current ? 3.1 : 1.9,
      delta
    );
    flagPhaseRef.current += delta * (2.4 + movementThrottle * 11.5);
    const flagFlutter = THREE.MathUtils.clamp(
      0.2 +
        movementThrottle * 0.34 +
        Math.sin(flagPhaseRef.current) * (0.08 + movementThrottle * 0.2),
      0.06,
      0.82
    );
    flagMeshesRef.current.forEach((flag) => {
      if (flag.morphTargetInfluences) {
        flag.morphTargetInfluences[0] = flagTrailRef.current;
        if (flag.morphTargetInfluences.length > 1) {
          flag.morphTargetInfluences[1] = flagFlutter;
        }
      }
    });
    engineTelemetryElapsed.current += delta;
    if (engineTelemetryElapsed.current >= 0.08) {
      engineTelemetryElapsed.current = 0;
      window.dispatchEvent(
        new CustomEvent("ocean-aircraft-throttle", {
          detail: { throttle: movementThrottle },
        })
      );
    }

    const nextPosition = group.current.position
      .clone()
      .addScaledVector(velocity.current, delta);
    const keyboardVertical =
      (keys.e ? 1 : 0) - (keys.q ? 1 : 0);
    const verticalInput = THREE.MathUtils.clamp(
      keyboardVertical + verticalControl.current,
      -1,
      1
    );
    const rollDifference = rollTarget.current - group.current.rotation.z;
    if (Math.abs(rollDifference) > 0.0001) {
      group.current.rotation.z +=
        rollDifference * (1 - Math.exp(-delta * 9.5));
    } else {
      group.current.rotation.z = rollTarget.current;
    }
    if (Math.abs(verticalInput) > 0.01) {
      jumping.current = false;
      freeVerticalMovement.current = true;
      grounded.current = false;
    }

    if (jumping.current) {
      verticalVelocity.current -= JUMP_GRAVITY * Math.min(delta, 0.05);
    } else if (freeVerticalMovement.current) {
      const verticalSpeed = isCessna
        ? 72 * (1 + sprintBlend.current * 4.4)
        : 58 * (1 + sprintBlend.current * 1.2);
      verticalVelocity.current = THREE.MathUtils.damp(
        verticalVelocity.current,
        verticalInput * verticalSpeed,
        verticalInput === 0 ? 7.5 : 6,
        delta
      );
    } else {
      verticalVelocity.current -= JUMP_GRAVITY * Math.min(delta, 0.05);
    }
    nextPosition.y += verticalVelocity.current * Math.min(delta, 0.05);

    const landingHeight = jumping.current
      ? jumpReturnY.current
      : PLAYER_GROUND_Y;
    if (!freeVerticalMovement.current && nextPosition.y <= landingHeight) {
      nextPosition.y = landingHeight;
      verticalVelocity.current = 0;
      grounded.current = true;
      jumping.current = false;
      freeVerticalMovement.current =
        Math.abs(landingHeight - PLAYER_GROUND_Y) >= 0.1;
    }
    const renderedMinY = Number(group.current.userData.renderedMinY) || 0;
    const characterFloorY = Math.max(
      SEA_FLOOR_Y + 8,
      SEA_FLOOR_Y + 1.4 - Math.min(0, renderedMinY)
    );
    nextPosition.y = THREE.MathUtils.clamp(
      nextPosition.y,
      characterFloorY,
      PLAYER_MAX_Y
    );
    if (
      nextPosition.y === characterFloorY ||
      nextPosition.y === PLAYER_MAX_Y
    ) {
      verticalVelocity.current = 0;
    }

    if (
      islandSurfaceCollider.resolve(
        nextPosition,
        group.current.userData.collisionRadius ?? 5
      )
    ) {
      velocity.current.multiplyScalar(0.2);
      verticalVelocity.current *= 0.2;
    }

    group.current.position.copy(nextPosition);
    rippleField.moveWindowTo(nextPosition.x, nextPosition.z);

    waterSphereOffset.current
      .copy(waterProxy.localCenter)
      .applyQuaternion(group.current.quaternion);
    waterSphereCenter.current
      .copy(nextPosition)
      .add(waterSphereOffset.current);
    waterDisplacementElapsed.current += delta;
    const touchesSurface =
      Math.abs(waterSphereCenter.current.y - SEA_LEVEL_Y) <
      waterProxy.radius * 1.18;
    if (!previousWaterSphereCenter.current) {
      previousWaterSphereCenter.current = waterSphereCenter.current.clone();
    } else if (!touchesSurface) {
      previousWaterSphereCenter.current.copy(waterSphereCenter.current);
      waterDisplacementElapsed.current = 0;
    } else if (waterDisplacementElapsed.current >= 1 / 30) {
      const movedDistance = previousWaterSphereCenter.current.distanceTo(
        waterSphereCenter.current
      );
      if (movedDistance > 0.035) {
        rippleField.displaceSphere(
          previousWaterSphereCenter.current,
          waterSphereCenter.current,
          Math.min(waterProxy.radius, 11)
        );
      }
      previousWaterSphereCenter.current.copy(waterSphereCenter.current);
      waterDisplacementElapsed.current = 0;
    }

    const crossedSurface =
      (previousHeight.current > SEA_LEVEL_Y &&
        waterSphereCenter.current.y <= SEA_LEVEL_Y) ||
      (previousHeight.current < SEA_LEVEL_Y &&
        waterSphereCenter.current.y >= SEA_LEVEL_Y);
    if (crossedSurface) {
      const rising = waterSphereCenter.current.y > previousHeight.current;
      const impactRadius = Math.max(34, waterProxy.radius * 2.8);
      rippleField.addRipple(
        waterSphereCenter.current.x,
        waterSphereCenter.current.z,
        rising ? 0.46 : -2.05,
        rising ? waterProxy.radius * 1.6 : impactRadius
      );
      addSurfacePulse(
        waterSphereCenter.current.x,
        waterSphereCenter.current.z,
        {
          duration: rising ? 2.2 : 3.5,
          radius: rising ? impactRadius * 1.55 : impactRadius * 3.3,
          strength: rising ? 0.58 : 1.55,
          kind: rising ? "rise" : "dive",
        }
      );
      window.dispatchEvent(
        new CustomEvent("ocean-player-splash", {
          detail: {
            submerging: !rising,
            speed: Math.abs(verticalVelocity.current),
          },
        })
      );
      if (!rising && !jumping.current) {
        verticalVelocity.current = Math.min(
          verticalVelocity.current,
          -72
        );
      }
    }
    previousHeight.current = waterSphereCenter.current.y;

    if (input.lengthSq() > 0.01) {
      const targetDirection = move.clone();
      if (input.z < -0.2) targetDirection.copy(cameraForward);
      facing.current.lerp(targetDirection, 0.15).normalize();
      const angle = Math.atan2(facing.current.x, facing.current.z);
      group.current.rotation.y = lerpAngle(group.current.rotation.y, angle, 0.15);
    }

    group.current.userData.joyX = joystick.current.x;
    group.current.userData.speed = velocity.current.length();
    group.current.userData.headingX = Math.sin(group.current.rotation.y);
    group.current.userData.headingZ = Math.cos(group.current.rotation.y);
    persistenceElapsed.current += delta;
    if (persistenceElapsed.current >= 0.45) {
      persistenceElapsed.current = 0;
      writePlayerSessionTransform(group.current);
    }
  });

  return (
    <group
      ref={group}
      position={initialTransform.position}
      rotation={[0, initialTransform.rotationY, initialRoll]}
    >
      <primitive
        key={activeCharacter.id}
        object={activeCharacter.scene}
        scale={activeCharacter.modelScale}
      />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const cameraAngle = useRef(0);
  const blend = useRef(0);
  const explore = useRef(false);
  const cameraDistance = useRef(70);
  const cameraHeight = useRef(22);
  const lookHeight = useRef(6);

  useEffect(() => {
    const handler = (event: Event) => {
      explore.current = (
        event as CustomEvent<{ enabled: boolean }>
      ).detail.enabled;
    };
    window.addEventListener("explore-mode", handler);
    return () => window.removeEventListener("explore-mode", handler);
  }, []);

  useFrame((_, delta) => {
    const player = playerRef.current;
    if (!player) return;

    blend.current += delta * (explore.current ? 1 : -1);
    blend.current = THREE.MathUtils.clamp(blend.current, 0, 1);
    const ease = blend.current * blend.current * (3 - 2 * blend.current);
    const keyX =
      (keys.arrowright || keys.d ? 1 : 0) -
      (keys.arrowleft || keys.a ? 1 : 0);
    const strafe = keyX + (player.userData?.joyX ?? 0);

    if (Math.abs(strafe) > 0.05) cameraAngle.current -= strafe * delta * 2.5;

    cameraDistance.current = THREE.MathUtils.damp(
      cameraDistance.current,
      Number(player.userData?.cameraDistance) || 70,
      3.5,
      delta
    );
    cameraHeight.current = THREE.MathUtils.damp(
      cameraHeight.current,
      Number(player.userData?.cameraHeight) || 22,
      3.5,
      delta
    );
    lookHeight.current = THREE.MathUtils.damp(
      lookHeight.current,
      Number(player.userData?.lookHeight) || 6,
      3.5,
      delta
    );

    const offset = new THREE.Vector3(
      0,
      cameraHeight.current,
      cameraDistance.current
    );
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraAngle.current);
    const followPosition = player.position.clone().add(offset);
    const introPosition = new THREE.Vector3(0, 20, 100).add(
      new THREE.Vector3(Math.sin(blend.current * Math.PI) * 20, 0, 0)
    );
    const finalPosition = introPosition.lerp(followPosition, ease);

    camera.position.lerp(finalPosition, 0.12);

    const introLook = new THREE.Vector3(0, 5, 0);
    const followLook = player.position.clone();
    followLook.y += lookHeight.current;
    camera.lookAt(introLook.lerp(followLook, ease));
  });

  return null;
}

function OceanSoundscape() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const desiredActiveRef = useRef(false);

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}Ocean.mp3`);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;

    audioRef.current = audio;
    let fadeFrame = 0;

    const fadeTo = (target: number, duration = 2000) => {
      if (!audioRef.current) return;

      window.cancelAnimationFrame(fadeFrame);
      const element = audioRef.current;
      const startVolume = element.volume;
      const start = performance.now();

      const animate = (time: number) => {
        const t = THREE.MathUtils.clamp((time - start) / duration, 0, 1);
        element.volume = THREE.MathUtils.clamp(
          startVolume + (target - startVolume) * t,
          0,
          1
        );

        if (t < 1) {
          fadeFrame = window.requestAnimationFrame(animate);
        } else if (target === 0) {
          element.pause();
          element.currentTime = 0;
        }
      };

      fadeFrame = window.requestAnimationFrame(animate);
    };

    const activate = async () => {
      desiredActiveRef.current = true;

      try {
        if (audio.paused) {
          await audio.play();
        }

        fadeTo(0.14, 2400);
      } catch {
        // Browser will retry after first user interaction.
      }
    };

    const deactivate = () => {
      desiredActiveRef.current = false;
      fadeTo(0, 1800);
    };

    const handleAudioState = (
      event: Event
    ) => {
      const active = (event as CustomEvent<{ active: boolean }>).detail.active;

      if (active) {
        void activate();
      } else {
        deactivate();
      }
    };

    const unlock = () => {
      if (desiredActiveRef.current) {
        void activate();
      }
    };

    window.addEventListener("skyocean-audio", handleAudioState);
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);

    if (
      document
        .getElementById("global-sky-ocean-bg")
        ?.getAttribute("data-audio-active") === "1"
    ) {
      void activate();
    }

    return () => {
      window.removeEventListener("skyocean-audio", handleAudioState);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.cancelAnimationFrame(fadeFrame);

      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
}

function AircraftEngineSound() {
  useEffect(() => {
    const audioContext = new AudioContext();
    const engineGain = audioContext.createGain();
    engineGain.gain.value = 0;
    engineGain.connect(audioContext.destination);
    const bufferPromise = fetch(
      `${import.meta.env.BASE_URL}cessna-engine.wav`
    )
      .then((response) => response.arrayBuffer())
      .then((buffer) => audioContext.decodeAudioData(buffer));
    let source: AudioBufferSourceNode | null = null;
    let currentCharacterId = "";
    let throttle = 0;
    let exploreActive =
      document
        .getElementById("global-sky-ocean-bg")
        ?.getAttribute("data-explore") === "1";

    const ensureSource = async () => {
      if (source) return;
      const buffer = await bufferPromise;
      if (audioContext.state === "closed") return;
      source = audioContext.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.playbackRate.value = 0.82;
      source.connect(engineGain);
      source.start();
    };

    const update = async () => {
      const shouldPlay =
        exploreActive && currentCharacterId.includes("cessna-aircraft");
      const now = audioContext.currentTime;
      engineGain.gain.cancelScheduledValues(now);
      engineGain.gain.setValueAtTime(engineGain.gain.value, now);

      if (shouldPlay) {
        if (audioContext.state === "suspended") {
          await audioContext.resume();
        }
        await ensureSource();
        engineGain.gain.linearRampToValueAtTime(
          0.2 + throttle * 0.07,
          now + 0.7
        );
      } else {
        engineGain.gain.linearRampToValueAtTime(0, now + 0.55);
      }
    };

    const onCharacter = (event: Event) => {
      currentCharacterId = (
        event as CustomEvent<{ id: string }>
      ).detail.id;
      void update();
    };
    const onExplore = (event: Event) => {
      exploreActive = (
        event as CustomEvent<{ enabled: boolean }>
      ).detail.enabled;
      void update();
    };
    const onThrottle = (event: Event) => {
      throttle = THREE.MathUtils.clamp(
        (event as CustomEvent<{ throttle: number }>).detail.throttle,
        0,
        1
      );
      if (!source) return;
      const now = audioContext.currentTime;
      source.playbackRate.cancelScheduledValues(now);
      source.playbackRate.setTargetAtTime(
        0.82 + throttle * 0.52,
        now,
        throttle > 0.45 ? 0.16 : 0.28
      );
      if (exploreActive && currentCharacterId.includes("cessna-aircraft")) {
        engineGain.gain.cancelScheduledValues(now);
        engineGain.gain.setTargetAtTime(
          0.2 + throttle * 0.07,
          now,
          0.22
        );
      }
    };
    const unlock = () => {
      void update();
    };

    window.addEventListener("ocean-active-character-change", onCharacter);
    window.addEventListener("explore-mode", onExplore);
    window.addEventListener("ocean-aircraft-throttle", onThrottle);
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("keydown", unlock);

    return () => {
      window.removeEventListener("ocean-active-character-change", onCharacter);
      window.removeEventListener("explore-mode", onExplore);
      window.removeEventListener("ocean-aircraft-throttle", onThrottle);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      source?.stop();
      source?.disconnect();
      engineGain.disconnect();
      void audioContext.close();
    };
  }, []);

  return null;
}

function SurfaceCrossingSound() {
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}bubble.mp3`);
    audio.preload = "auto";
    audio.volume = 0.24;
    let audioContext: AudioContext | null = null;

    const playCrossing = (event: Event) => {
      const underwater = (
        event as CustomEvent<{ underwater: boolean }>
      ).detail.underwater;
      audio.pause();
      audio.currentTime = 0;
      audio.playbackRate = underwater ? 0.9 : 1.08;
      void audio.play().catch(() => {
        // It will be available after the browser receives a user gesture.
      });
    };

    const playHeavyBlop = (event: Event) => {
      const { submerging, speed } = (
        event as CustomEvent<{
          submerging: boolean;
          speed: number;
        }>
      ).detail;
      if (!submerging) return;

      audioContext ??= new AudioContext();
      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }

      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const impact = THREE.MathUtils.clamp(speed / 70, 0.7, 1.35);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(168 * impact, now);
      oscillator.frequency.exponentialRampToValueAtTime(54, now + 0.38);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.16 * impact, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.44);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.46);
    };

    window.addEventListener("ocean-surface-cross", playCrossing);
    window.addEventListener("ocean-player-splash", playHeavyBlop);
    return () => {
      window.removeEventListener("ocean-surface-cross", playCrossing);
      window.removeEventListener("ocean-player-splash", playHeavyBlop);
      audio.pause();
      audio.src = "";
      if (audioContext) {
        void audioContext.close();
      }
    };
  }, []);

  return null;
}

export default function SkyOceanBackground() {
  return (
    <>
      <OceanSoundscape />
      <AircraftEngineSound />
      <SurfaceCrossingSound />
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 20, 100],
          fov: 55,
          near: 0.1,
          far: CAMERA_FAR,
        }}
        gl={{
          antialias: true,
          toneMapping: THREE.CineonToneMapping,
          toneMappingExposure: 0.8,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <color attach="background" args={[FIXED_BACKGROUND_COLOR]} />
        <directionalLight
          position={FIXED_SUN_POSITION}
          intensity={1}
          color={FIXED_SUN_COLOR}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={10}
          shadow-camera-far={1800}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
        />
        <ambientLight intensity={0.35} color="#ffffff" />
        <UnderwaterFillLight />

        <AtmosphereSky />

        <Suspense fallback={null}>
          <SeaFloor />
          <RisingBubbleFields />
          <Ocean />
          <CharacterSurfaceWake />
          <UnderwaterSurface />
          <Island />
          <Player />
        </Suspense>

        <CameraRig />
        <OceanInteractionController />
        <UnderwaterController />
      </Canvas>
    </>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}wolfy.glb`);
useGLTF.preload(`${import.meta.env.BASE_URL}island.gltf`);
