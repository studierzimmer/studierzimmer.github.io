import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Cloud, Clouds, Sky, useGLTF } from "@react-three/drei";
import { SkeletonUtils, Water } from "three-stdlib";

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
const PLAYER_MAX_Y = 320;
const OCEAN_SIZE = 120000;
const SKY_DISTANCE = 48000;
const CAMERA_FAR = 90000;
const RIPPLE_TEXTURE_SIZE = 128;
const RIPPLE_WORLD_SIZE = 900;
const COLLISION_CELL_SIZE = 12;
const COLLISION_SURFACE_RADIUS = 4.5;
const MAX_COLLISION_SAMPLES = 16000;
const FIXED_SUN_POSITION: [number, number, number] = [500, 200, -300];
const FIXED_WATER_SUN_DIRECTION = new THREE.Vector3(500, 150, -1000).normalize();
const FIXED_SUN_COLOR = "#fff4d6";
const FIXED_BACKGROUND_COLOR = "#0b1e3a";
const FIXED_WATER_COLOR = "#0a2a6a";
const causticsTimeUniform = { value: 0 };

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
  causticsMap: THREE.Texture
) {
  if (material.userData.hasUnderwaterCaustics) return;

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
      vec2 causticsRippleUv =
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
        length(vec2(causticsRippleX, causticsRippleY))) * causticsRippleMask;
      movingCaustics = clamp(movingCaustics + rippleCaustics * 0.75, 0.0, 1.0);
      vec3 underwaterFill = diffuseColor.rgb * vec3(0.72, 0.9, 1.0);
      reflectedLight.indirectDiffuse += underwaterFill * submerged *
        (0.14 + movingCaustics * 0.72);`
    );
  };
  material.customProgramCacheKey = () =>
    `${previousCacheKey()}-underwater-caustics-v2`;
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

    this.center.set(x, z);
    this.height.fill(0);
    this.velocity.fill(0);
    this.nextHeight.fill(0);
    this.nextVelocity.fill(0);
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
      material.uniforms.rippleSampler = { value: rippleField.texture };
      material.uniforms.rippleCenter = { value: rippleField.center };
      material.uniforms.rippleWorldSize = { value: RIPPLE_WORLD_SIZE };
      material.uniforms.rippleTexel = {
        value: new THREE.Vector2(
          1 / RIPPLE_TEXTURE_SIZE,
          1 / RIPPLE_TEXTURE_SIZE
        ),
      };
      material.fragmentShader = material.fragmentShader
        .replace(
          "uniform vec3 waterColor;",
          `uniform vec3 waterColor;
          uniform sampler2D rippleSampler;
          uniform vec2 rippleCenter;
          uniform float rippleWorldSize;
          uniform vec2 rippleTexel;

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
          surfaceNormal = normalize(surfaceNormal + vec3(rippleSlope.x, 0.0, rippleSlope.y) * rippleMask * 2.6);`
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
    }
  });

  return <primitive object={water} ref={ref} rotation-x={-Math.PI / 2} />;
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
      ref.current.visible = camera.position.y < SEA_LEVEL_Y + 1;
    }
  });

  return (
    <mesh
      ref={ref}
      rotation-x={-Math.PI / 2}
      position-y={SEA_LEVEL_Y - 0.08}
      renderOrder={3}
      frustumCulled={false}
    >
      <planeGeometry args={[6000, 6000, 128, 128]} />
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
      rippleField.addRipple(hit.x, hit.z, -0.95, 24);
    };

    window.addEventListener("pointerdown", addDroplet, { passive: true });
    return () => window.removeEventListener("pointerdown", addDroplet);
  }, [camera]);

  return null;
}

function MovingClouds() {
  const group = useRef<THREE.Group>(null);
  const warmLight = useRef<THREE.PointLight>(null);
  const coolLight = useRef<THREE.PointLight>(null);
  const warm = useMemo(() => new THREE.Color("#ffd992"), []);
  const cool = useMemo(() => new THREE.Color("#8bc9ff"), []);
  const mixed = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    group.current?.traverse((child) => {
      child.castShadow = false;
      child.receiveShadow = false;
    });
  }, []);

  useFrame(({ camera, clock }, delta) => {
    if (group.current) {
      group.current.position.x = THREE.MathUtils.damp(
        group.current.position.x,
        camera.position.x + Math.sin(clock.elapsedTime * 0.025) * 70,
        0.35,
        delta
      );
      group.current.position.z = THREE.MathUtils.damp(
        group.current.position.z,
        camera.position.z + Math.cos(clock.elapsedTime * 0.02) * 55,
        0.35,
        delta
      );
    }

    const phase = 0.5 + Math.sin(clock.elapsedTime * 0.42) * 0.5;
    mixed.lerpColors(warm, cool, phase);
    if (warmLight.current) {
      warmLight.current.color.copy(mixed);
      warmLight.current.intensity = 1.4 + Math.sin(clock.elapsedTime * 0.8) * 0.28;
    }
    if (coolLight.current) {
      coolLight.current.color.copy(mixed).lerp(cool, 0.3);
      coolLight.current.intensity = 1.05 + Math.cos(clock.elapsedTime * 0.65) * 0.22;
    }
  });

  return (
    <group ref={group}>
      <Clouds
        texture={`${import.meta.env.BASE_URL}cloud-white.png`}
        material={THREE.MeshBasicMaterial}
        limit={96}
        frustumCulled={false}
      >
        <Cloud
          seed={2}
          segments={14}
          bounds={[105, 18, 38]}
          position={[-330, 230, -720]}
          volume={108}
          opacity={0.93}
          growth={5}
          speed={0.06}
          fade={1500}
          color="#ffffff"
        />
        <Cloud
          seed={7}
          segments={13}
          bounds={[94, 16, 34]}
          position={[330, 210, -820]}
          volume={98}
          opacity={0.9}
          growth={4.6}
          speed={0.05}
          fade={1500}
          color="#ffffff"
        />
        <Cloud
          seed={11}
          segments={10}
          bounds={[78, 14, 29]}
          position={[620, 260, -650]}
          volume={86}
          opacity={0.86}
          growth={3.8}
          speed={0.045}
          fade={1500}
          color="#ffffff"
        />
        <Cloud
          seed={17}
          segments={9}
          bounds={[72, 13, 27]}
          position={[-650, 275, -600]}
          volume={82}
          opacity={0.84}
          growth={3.5}
          speed={0.04}
          fade={1500}
          color="#ffffff"
        />
        <Cloud
          seed={23}
          segments={9}
          bounds={[80, 14, 30]}
          position={[50, 300, -1050]}
          volume={90}
          opacity={0.84}
          growth={3.6}
          speed={0.045}
          fade={1600}
          color="#ffffff"
        />
        <Cloud
          seed={29}
          segments={8}
          bounds={[76, 13, 28]}
          position={[-420, 235, 620]}
          volume={88}
          opacity={0.86}
          growth={3.5}
          speed={0.042}
          fade={1600}
          color="#ffffff"
        />
        <Cloud
          seed={31}
          segments={8}
          bounds={[80, 14, 29]}
          position={[440, 220, 720]}
          volume={92}
          opacity={0.86}
          growth={3.6}
          speed={0.044}
          fade={1600}
          color="#ffffff"
        />
        <Cloud
          seed={37}
          segments={8}
          bounds={[72, 12, 26]}
          position={[820, 255, 100]}
          volume={84}
          opacity={0.84}
          growth={3.3}
          speed={0.04}
          fade={1600}
          color="#ffffff"
        />
        <Cloud
          seed={41}
          segments={8}
          bounds={[74, 13, 27]}
          position={[-850, 270, 60]}
          volume={86}
          opacity={0.84}
          growth={3.4}
          speed={0.041}
          fade={1600}
          color="#ffffff"
        />
      </Clouds>
      <pointLight
        ref={warmLight}
        position={[-330, 228, -720]}
        distance={310}
        decay={2}
        castShadow={false}
      />
      <pointLight
        ref={coolLight}
        position={[330, 208, -820]}
        distance={290}
        decay={2}
        castShadow={false}
      />
    </group>
  );
}

function UnderwaterController() {
  const { camera, scene } = useThree();
  const underwaterAmount = useRef(0);
  const wasUnderwater = useRef<boolean | null>(null);
  const aboveColor = useMemo(
    () => new THREE.Color(FIXED_BACKGROUND_COLOR),
    []
  );
  const belowColor = useMemo(() => new THREE.Color("#06283f"), []);
  const mixedColor = useMemo(() => new THREE.Color(), []);
  const fog = useMemo(() => new THREE.FogExp2("#0a3854", 0), []);

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
    fog.density = amount * 0.0042;
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
      camera.position.y < SEA_LEVEL_Y - 0.45 ? 0.62 : 0,
      4.2,
      delta
    );
  });

  return (
    <hemisphereLight
      ref={ref}
      color="#d9f7ff"
      groundColor="#12364a"
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

function Player() {
  const group = useRef<THREE.Group>(null!);
  const { camera } = useThree();
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}wolfy.glb`);
  const causticsMap = useCausticsTexture();
  const playerScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const joystick = useRef(new THREE.Vector3());
  const verticalControl = useRef(0);
  const velocity = useRef(new THREE.Vector3());
  const verticalVelocity = useRef(0);
  const grounded = useRef(true);
  const freeVerticalMovement = useRef(false);
  const exploreEnabled = useRef(false);
  const facing = useRef(new THREE.Vector3(0, 0, 1));
  const previousHeight = useRef(PLAYER_GROUND_Y);
  const previousWaterSphereCenter = useRef<THREE.Vector3 | null>(null);
  const waterSphereCenter = useRef(new THREE.Vector3());
  const waterSphereOffset = useRef(new THREE.Vector3());
  const waterSphereUp = useRef(new THREE.Vector3(0, 1, 0));
  const waterProxy = useMemo(() => {
    playerScene.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(playerScene);
    if (bounds.isEmpty()) {
      return { localCenter: new THREE.Vector3(0, 0.65, 0), radius: 6.5 };
    }

    const size = bounds.getSize(new THREE.Vector3()).multiplyScalar(PLAYER_SCALE);
    const localCenter = bounds
      .getCenter(new THREE.Vector3())
      .multiplyScalar(PLAYER_SCALE);
    const horizontalRadius = Math.max(size.x, size.z) * 0.5;
    const torsoRadius = size.y * 0.32;
    return {
      localCenter,
      radius: THREE.MathUtils.clamp(
        Math.max(horizontalRadius, torsoRadius),
        5,
        14
      ),
    };
  }, [playerScene]);

  useEffect(() => {
    playerScene.traverse((child) => {
      if (
        child instanceof THREE.Mesh &&
        child.material instanceof THREE.MeshStandardMaterial
      ) {
        child.material = child.material.clone();
        child.material.roughness = 0.42;
        child.material.metalness = 0.05;
        child.material.envMapIntensity = 0.35;
        addUnderwaterCaustics(child.material, causticsMap);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [causticsMap, playerScene]);

  useEffect(() => {
    playerRef.current = group.current;

    const joy = (event: Event) => {
      const { x, z } = (event as CustomEvent<{ x: number; z: number }>).detail;
      joystick.current.set(x, 0, z);
    };
    const jump = () => {
      if (!grounded.current && !freeVerticalMovement.current) return;
      grounded.current = false;
      verticalVelocity.current = JUMP_VELOCITY;
    };
    const moveVertically = (event: Event) => {
      const { y } = (event as CustomEvent<{ y: number }>).detail;
      verticalControl.current = THREE.MathUtils.clamp(y, -1, 1);
      if (Math.abs(verticalControl.current) > 0.01) {
        freeVerticalMovement.current = true;
        grounded.current = false;
      }
    };
    const setExploreMode = (event: Event) => {
      exploreEnabled.current = (
        event as CustomEvent<{ enabled: boolean }>
      ).detail.enabled;
      if (!exploreEnabled.current) {
        joystick.current.set(0, 0, 0);
        verticalControl.current = 0;
      }
    };

    window.addEventListener("explore-joystick", joy);
    window.addEventListener("explore-jump", jump);
    window.addEventListener("explore-vertical", moveVertically);
    window.addEventListener("explore-mode", setExploreMode);
    exploreEnabled.current =
      document
        .getElementById("global-sky-ocean-bg")
        ?.getAttribute("data-explore") === "1";

    return () => {
      window.removeEventListener("explore-joystick", joy);
      window.removeEventListener("explore-jump", jump);
      window.removeEventListener("explore-vertical", moveVertically);
      window.removeEventListener("explore-mode", setExploreMode);
    };
  }, []);

  useFrame((state, delta) => {
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
    velocity.current.lerp(move.multiplyScalar(100), delta * 6);

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
    if (Math.abs(verticalInput) > 0.01) {
      freeVerticalMovement.current = true;
      grounded.current = false;
    }

    if (freeVerticalMovement.current) {
      verticalVelocity.current = THREE.MathUtils.damp(
        verticalVelocity.current,
        verticalInput * 58,
        verticalInput === 0 ? 7.5 : 6,
        delta
      );
    } else {
      verticalVelocity.current -= JUMP_GRAVITY * Math.min(delta, 0.05);
    }
    nextPosition.y += verticalVelocity.current * Math.min(delta, 0.05);

    if (!freeVerticalMovement.current && nextPosition.y <= PLAYER_GROUND_Y) {
      nextPosition.y = PLAYER_GROUND_Y;
      verticalVelocity.current = 0;
      grounded.current = true;
    }
    nextPosition.y = THREE.MathUtils.clamp(
      nextPosition.y,
      SEA_FLOOR_Y + 8,
      PLAYER_MAX_Y
    );
    if (
      nextPosition.y === SEA_FLOOR_Y + 8 ||
      nextPosition.y === PLAYER_MAX_Y
    ) {
      verticalVelocity.current = 0;
    }

    if (islandSurfaceCollider.resolve(nextPosition, 5)) {
      velocity.current.multiplyScalar(0.2);
      verticalVelocity.current *= 0.2;
    }

    group.current.position.copy(nextPosition);
    rippleField.moveWindowTo(nextPosition.x, nextPosition.z);

    waterSphereOffset.current
      .copy(waterProxy.localCenter)
      .applyAxisAngle(waterSphereUp.current, group.current.rotation.y);
    waterSphereCenter.current
      .copy(nextPosition)
      .add(waterSphereOffset.current);
    if (previousWaterSphereCenter.current) {
      rippleField.displaceSphere(
        previousWaterSphereCenter.current,
        waterSphereCenter.current,
        waterProxy.radius
      );
    } else {
      previousWaterSphereCenter.current = waterSphereCenter.current.clone();
    }

    const crossedSurface =
      (previousHeight.current > SEA_LEVEL_Y &&
        waterSphereCenter.current.y <= SEA_LEVEL_Y) ||
      (previousHeight.current < SEA_LEVEL_Y &&
        waterSphereCenter.current.y >= SEA_LEVEL_Y);
    if (crossedSurface) {
      const rising = waterSphereCenter.current.y > previousHeight.current;
      rippleField.addRipple(
        waterSphereCenter.current.x,
        waterSphereCenter.current.z,
        rising ? 0.38 : -1.25,
        rising ? waterProxy.radius * 1.45 : Math.max(30, waterProxy.radius * 2.4)
      );
    }
    previousHeight.current = waterSphereCenter.current.y;
    previousWaterSphereCenter.current.copy(waterSphereCenter.current);

    if (input.lengthSq() > 0.01) {
      const targetDirection = move.clone();
      if (input.z < -0.2) targetDirection.copy(cameraForward);
      facing.current.lerp(targetDirection, 0.15).normalize();
      const angle = Math.atan2(facing.current.x, facing.current.z);
      group.current.rotation.y = lerpAngle(group.current.rotation.y, angle, 0.15);
    }

    group.current.userData.joyX = joystick.current.x;
  });

  return (
    <primitive
      ref={group}
      object={playerScene}
      scale={PLAYER_SCALE}
      position={[0, 15, 0]}
      rotation={[0, Math.PI, 0]}
    />
  );
}

function CameraRig() {
  const { camera } = useThree();
  const cameraAngle = useRef(0);
  const blend = useRef(0);
  const explore = useRef(false);

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

    const offset = new THREE.Vector3(0, 22, 70);
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), cameraAngle.current);
    const followPosition = player.position.clone().add(offset);
    const introPosition = new THREE.Vector3(0, 20, 100).add(
      new THREE.Vector3(Math.sin(blend.current * Math.PI) * 20, 0, 0)
    );
    const finalPosition = introPosition.lerp(followPosition, ease);

    camera.position.lerp(finalPosition, 0.12);

    const introLook = new THREE.Vector3(0, 5, 0);
    const followLook = player.position.clone();
    followLook.y += 6;
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

    const fadeTo = (target: number, duration = 2000) => {
      if (!audioRef.current) return;

      const element = audioRef.current;
      const startVolume = element.volume;
      const start = performance.now();

      const animate = (time: number) => {
        const t = Math.min((time - start) / duration, 1);
        element.volume = startVolume + (target - startVolume) * t;

        if (t < 1) {
          requestAnimationFrame(animate);
        } else if (target === 0) {
          element.pause();
          element.currentTime = 0;
        }
      };

      requestAnimationFrame(animate);
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

      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
}

function SurfaceCrossingSound() {
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}bubble.mp3`);
    audio.preload = "auto";
    audio.volume = 0.24;

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

    window.addEventListener("ocean-surface-cross", playCrossing);
    return () => {
      window.removeEventListener("ocean-surface-cross", playCrossing);
      audio.pause();
      audio.src = "";
    };
  }, []);

  return null;
}

export default function SkyOceanBackground() {
  return (
    <>
      <OceanSoundscape />
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
          <Ocean />
          <UnderwaterSurface />
          <MovingClouds />
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
