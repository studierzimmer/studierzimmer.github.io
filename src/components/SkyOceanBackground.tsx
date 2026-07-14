// SkyOceanBackground.tsx
import * as THREE from 'three'
import React, { Suspense, useRef, useMemo, useEffect } from 'react'
import { Canvas, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Sky, useGLTF, Environment } from '@react-three/drei'
import { Water } from 'three-stdlib'

/* ===========================
   KEYBOARD INPUT
=========================== */
const keys: Record<string, boolean> = {}
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => (keys[e.key.toLowerCase()] = true))
  window.addEventListener('keyup', (e) => (keys[e.key.toLowerCase()] = false))
}

const playerRef = { current: null as THREE.Group | null }
const islandCollider = {
  center: new THREE.Vector3(0, 0, -300),
  radius: 60 // 🔥 tweak based on island size
}
const PLAYER_GROUND_Y = 15
const JUMP_VELOCITY = 38
const JUMP_GRAVITY = 95

/* ===========================
   UTILS
=========================== */
function lerpAngle(a: number, b: number, t: number) {
  let diff = b - a
  while (diff < -Math.PI) diff += Math.PI * 2
  while (diff > Math.PI) diff -= Math.PI * 2
  return a + diff * t
}

/* ===========================
   OCEAN
=========================== */
function Ocean() {
  const ref = useRef<Water | null>(null)

  const waterNormals = useLoader(THREE.TextureLoader, '/waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping

  const geom = useMemo(() => {
    return new THREE.PlaneGeometry(10000, 10000)
  }, [])

  const water = useMemo(() => {
    const sun = new THREE.Vector3(500, 150, -1000).normalize()

    return new Water(geom, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: sun,
      sunColor: 0xfff2cc,
      waterColor: 0x0a2a6a, // 🔥 deep blue
      distortionScale: 10.7,
      fog: false,
    })
  }, [geom, waterNormals])

  water.material.uniforms.waterColor.value.convertSRGBToLinear()

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.material.uniforms.time.value += delta
    }
  })

  return <primitive object={water} ref={ref} rotation-x={-Math.PI / 2} />
}

/* ===========================
   🌴 GLTF ISLAND
=========================== */
function Island() {
  const { scene } = useGLTF('/island.gltf')

  return (
    <primitive
      object={scene}
      scale={100}
      position={[0, -5, -300]}
    />
  )
}

/* ===========================
   PLAYER
=========================== */
function Player() {
  const group = useRef<THREE.Group>(null!)
  const { camera } = useThree()
  const { scene } = useGLTF('/wolfy.glb')
useEffect(() => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material = child.material.clone()

      child.material.roughness = 0.2
      child.material.metalness = 0.1

      // 🔥 ensures correct shading
      child.material.envMapIntensity = 1.2
    }
  })
}, [scene])

  const joystick = useRef(new THREE.Vector3())
  const velocity = useRef(new THREE.Vector3())
  const verticalVelocity = useRef(0)
  const grounded = useRef(true)
  const facing = useRef(new THREE.Vector3(0, 0, 1))

  useEffect(() => {
    playerRef.current = group.current

    const joy = (event: Event) => {
      const { x, z } = (event as CustomEvent<{ x: number; z: number }>).detail
      joystick.current.set(x, 0, z)
    }
    const jump = () => {
      if (!grounded.current) return

      grounded.current = false
      verticalVelocity.current = JUMP_VELOCITY
    }

    window.addEventListener('explore-joystick', joy)
    window.addEventListener('explore-jump', jump)

    return () => {
      window.removeEventListener('explore-joystick', joy)
      window.removeEventListener('explore-jump', jump)
    }
  }, [])

  useFrame((_, delta) => {
  if (!group.current) return

  const input = new THREE.Vector3(
    joystick.current.x + (keys['arrowright'] || keys['d'] ? 1 : 0) - (keys['arrowleft'] || keys['a'] ? 1 : 0),
    0,
    joystick.current.z + (keys['arrowup'] || keys['w'] ? 1 : 0) - (keys['arrowdown'] || keys['s'] ? 1 : 0)
  )

  if (input.lengthSq() < 0.01) input.set(0, 0, 0)

  const camForward = new THREE.Vector3()
  camera.getWorldDirection(camForward)
  camForward.y = 0
  camForward.normalize()

  const camRight = new THREE.Vector3()
    .crossVectors(camForward, new THREE.Vector3(0, 1, 0))
    .normalize()

  const move = new THREE.Vector3()
    .addScaledVector(camForward, input.z)
    .addScaledVector(camRight, input.x)

  if (move.lengthSq() > 0.0001) move.normalize()

  const speed = 100
  velocity.current.lerp(move.multiplyScalar(speed), delta * 6)

  /* ===========================
     🚫 COLLISION CHECK
  =========================== */

  const nextPos = group.current.position.clone().addScaledVector(velocity.current, delta)

  verticalVelocity.current -= JUMP_GRAVITY * Math.min(delta, 0.05)
  nextPos.y += verticalVelocity.current * Math.min(delta, 0.05)

  if (nextPos.y <= PLAYER_GROUND_Y) {
    nextPos.y = PLAYER_GROUND_Y
    verticalVelocity.current = 0
    grounded.current = true
  }

  const dist = nextPos.distanceTo(islandCollider.center)

  const playerRadius = 2

  if (dist < islandCollider.radius + playerRadius) {
    // 🔥 PUSH PLAYER OUT
    const pushDir = nextPos.clone().sub(islandCollider.center).normalize()

    nextPos.copy(
      islandCollider.center.clone().add(
        pushDir.multiplyScalar(islandCollider.radius + playerRadius)
      )
    )

    // 🔥 stop velocity toward island
    velocity.current.multiplyScalar(0.2)
  }

  group.current.position.copy(nextPos)

  /* ===========================
     ROTATION
  =========================== */

  if (input.lengthSq() > 0.01) {
    const targetDir = move.clone()

    if (input.z < -0.2) {
      targetDir.copy(camForward)
    }

    facing.current.lerp(targetDir, 0.15).normalize()

    const angle = Math.atan2(facing.current.x, facing.current.z)

    group.current.rotation.y = lerpAngle(
      group.current.rotation.y,
      angle,
      0.15
    )
  }

  group.current.userData.joyX = joystick.current.x
})

  return (
    <primitive
      ref={group}
      object={scene}
      scale={10}
      position={[0, 15, 0]}
      rotation={[0, Math.PI, 0]}
    />
  )
}

/* ===========================
   CAMERA
=========================== */
function CameraRig() {
  const { camera } = useThree()

  const camAngle = useRef(0)
  const blend = useRef(0)
  const explore = useRef(false)

  useEffect(() => {
    const handler = (event: Event) => {
      explore.current = (
        event as CustomEvent<{ enabled: boolean }>
      ).detail.enabled
    }
    window.addEventListener('explore-mode', handler)
    return () => window.removeEventListener('explore-mode', handler)
  }, [])

  useFrame((_, delta) => {
  const player = playerRef.current
  if (!player) return

  /* 🔥 SAFE USERDATA ACCESS */
  const userData = player.userData || {}

  /* ===========================
     INTRO / GAME BLEND
  =========================== */
  blend.current += delta * (explore.current ? 1 : -1)
  blend.current = THREE.MathUtils.clamp(blend.current, 0, 1)

  const t = blend.current
  const ease = t * t * (3 - 2 * t)

  /* ===========================
     INPUT
  =========================== */
  const keyX =
    (keys['arrowright'] || keys['d'] ? 1 : 0) -
    (keys['arrowleft'] || keys['a'] ? 1 : 0)

  const joyX = userData.joyX ?? 0
  const strafe = keyX + joyX

  /* ===========================
     CAMERA ROTATION (RPG STYLE)
  =========================== */
  if (Math.abs(strafe) > 0.05) {
    camAngle.current -= strafe * delta * 2.5
  }

  /* ===========================
     FOLLOW CAMERA
  =========================== */
  const offset = new THREE.Vector3(0, 22, 70)
  offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), camAngle.current)

  const groundedPlayerPosition = player.position.clone()
  groundedPlayerPosition.y = PLAYER_GROUND_Y

  const followPos = groundedPlayerPosition.add(offset)

  /* ===========================
     INTRO CAMERA
  =========================== */
  const introPos = new THREE.Vector3(0, 20, 100)

  const sideOffset = new THREE.Vector3(
    Math.sin(t * Math.PI) * 20,
    0,
    0
  )

  const animatedIntro = introPos.clone().add(sideOffset)

  /* ===========================
     FINAL POSITION
  =========================== */
  const finalPos = animatedIntro.lerp(followPos, ease)

  camera.position.lerp(finalPos, 0.12)

  /* ===========================
     LOOK TARGET
  =========================== */
  const introLook = new THREE.Vector3(0, 5, 0)

  const followLook = player.position.clone()
  followLook.y += 6

  const finalLook = introLook.lerp(followLook, ease)

  camera.lookAt(finalLook)
})

  return null
}

/* ===========================
   MAIN
=========================== */
export default function SkyOceanBackground() {
  return (
    <Canvas
  camera={{ position: [0, 20, 100], fov: 55 }}
gl={{
  antialias: true,
  toneMapping: THREE.CineonToneMapping,
  toneMappingExposure: 0.8,
  outputColorSpace: THREE.SRGBColorSpace
}}
>
  <color attach="background" args={['#0b1e3a']} />
  {/* ☀️ SUN LIGHT (CRITICAL) */}
  <directionalLight
  position={[500, 200, -300]}
  intensity={1.0}
  color="#fff4d6"
/>

  {/* fill light */}
  <ambientLight intensity={0.35} />

  <Suspense fallback={null}>
    <Ocean />
    <Island />
    <Player />
  </Suspense>

  <CameraRig />


  {/* 🌤 SKY = MIDDAY BLUE */}
  <Sky
    distance={1000}
    sunPosition={[500, 200, -300]}
    turbidity={0.6}      // 🔥 clean air
    rayleigh={0.6}       // 🔥 natural blue (NOT sunset)
    mieCoefficient={0.001}
    mieDirectionalG={0.85}
  />
</Canvas>
  )
}

useGLTF.preload('/wolfy.glb')
useGLTF.preload('/island.gltf')
