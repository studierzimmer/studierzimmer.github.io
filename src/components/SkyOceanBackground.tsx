import * as THREE from "three";
import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Sky, useGLTF } from "@react-three/drei";
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
const islandCollider = {
  center: new THREE.Vector3(0, 0, -300),
  radius: 60,
};
const PLAYER_GROUND_Y = 15;
const JUMP_VELOCITY = 38;
const JUMP_GRAVITY = 95;
const FIXED_SUN_POSITION: [number, number, number] = [500, 200, -300];
const FIXED_WATER_SUN_DIRECTION = new THREE.Vector3(500, 150, -1000).normalize();
const FIXED_SUN_COLOR = "#fff4d6";
const FIXED_BACKGROUND_COLOR = "#0b1e3a";
const FIXED_WATER_COLOR = "#0a2a6a";

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

  const geometry = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
  const water = useMemo(
    () =>
      new Water(geometry, {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals,
        sunDirection: FIXED_WATER_SUN_DIRECTION.clone(),
        sunColor: new THREE.Color("#fff2cc"),
        waterColor: new THREE.Color(FIXED_WATER_COLOR),
        distortionScale: 10.7,
        fog: false,
      }),
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
    if (ref.current) ref.current.material.uniforms.time.value += delta;
  });

  return <primitive object={water} ref={ref} rotation-x={-Math.PI / 2} />;
}

function Island() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}island.gltf`);
  const stableIsland = useMemo(() => {
    const clone = scene.clone(true);

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
  }, [scene]);

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

  return (
    <primitive object={stableIsland} scale={100} position={[0, -5, -300]} />
  );
}

function Player() {
  const group = useRef<THREE.Group>(null!);
  const { camera } = useThree();
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}wolfy.glb`);
  const playerScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const joystick = useRef(new THREE.Vector3());
  const velocity = useRef(new THREE.Vector3());
  const verticalVelocity = useRef(0);
  const grounded = useRef(true);
  const facing = useRef(new THREE.Vector3(0, 0, 1));

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
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [playerScene]);

  useEffect(() => {
    playerRef.current = group.current;

    const joy = (event: Event) => {
      const { x, z } = (event as CustomEvent<{ x: number; z: number }>).detail;
      joystick.current.set(x, 0, z);
    };
    const jump = () => {
      if (!grounded.current) return;
      grounded.current = false;
      verticalVelocity.current = JUMP_VELOCITY;
    };

    window.addEventListener("explore-joystick", joy);
    window.addEventListener("explore-jump", jump);

    return () => {
      window.removeEventListener("explore-joystick", joy);
      window.removeEventListener("explore-jump", jump);
    };
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;

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
    verticalVelocity.current -= JUMP_GRAVITY * Math.min(delta, 0.05);
    nextPosition.y += verticalVelocity.current * Math.min(delta, 0.05);

    if (nextPosition.y <= PLAYER_GROUND_Y) {
      nextPosition.y = PLAYER_GROUND_Y;
      verticalVelocity.current = 0;
      grounded.current = true;
    }

    const distance = nextPosition.distanceTo(islandCollider.center);
    if (distance < islandCollider.radius + 2) {
      const pushDirection = nextPosition
        .clone()
        .sub(islandCollider.center)
        .normalize();
      nextPosition.copy(
        islandCollider.center
          .clone()
          .add(pushDirection.multiplyScalar(islandCollider.radius + 2))
      );
      velocity.current.multiplyScalar(0.2);
    }

    group.current.position.copy(nextPosition);

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
      scale={10}
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
    const groundedPosition = player.position.clone();
    groundedPosition.y = PLAYER_GROUND_Y;
    const followPosition = groundedPosition.add(offset);
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

export default function SkyOceanBackground() {
  return (
    <>
      <OceanSoundscape />
      <Canvas
        shadows
        camera={{ position: [0, 20, 100], fov: 55 }}
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

        <Suspense fallback={null}>
          <Ocean />
          <Island />
          <Player />
        </Suspense>

        <CameraRig />
        <Sky
          distance={1000}
          sunPosition={FIXED_SUN_POSITION}
          turbidity={0.6}
          rayleigh={0.6}
          mieCoefficient={0.001}
          mieDirectionalG={0.85}
        />
      </Canvas>
    </>
  );
}

useGLTF.preload(`${import.meta.env.BASE_URL}wolfy.glb`);
useGLTF.preload(`${import.meta.env.BASE_URL}island.gltf`);
