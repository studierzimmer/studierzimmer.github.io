import * as THREE from "three";

interface Props {
  scene: THREE.Scene;
  camera: THREE.Camera;
  getPlayer?: () => THREE.Object3D | null;
}

/** Camera only: the original Player retains every movement/animation solver. */
export function createCharacterCamera({ scene, camera, getPlayer }: Props) {
  let player: THREE.Object3D | null = null;
  let characterId: string | null = null;
  let initialized = false;
  let detached = false;
  let returning = false;
  let returnTime = 0;
  let yaw = 0, pitch = Math.atan(16 / 70), distance = 70;
  const panOffset = new THREE.Vector3(), target = new THREE.Vector3();
  const goal = new THREE.Vector3(), right = new THREE.Vector3(), ownPosition = new THREE.Vector3();
  const worldRotation = new THREE.Quaternion(), heading = new THREE.Vector3();
  const returnFrom = { yaw: 0, pitch: 0, distance: 70, pan: new THREE.Vector3() };
  const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;
  const preferredDistance = (current: THREE.Object3D) => THREE.MathUtils.clamp(Number(current.userData.cameraDistance) || 70, 16, 600);
  const preferredPitch = (current: THREE.Object3D) => Math.atan(((Number(current.userData.cameraHeight) || 22) - (Number(current.userData.lookHeight) || 6)) / preferredDistance(current));
  const behindYaw = (current: THREE.Object3D) => {
    current.getWorldQuaternion(worldRotation);
    heading.set(0, 0, 1).applyQuaternion(worldRotation);
    return Math.atan2(heading.x, heading.z) + Math.PI;
  };
  const shortestAngle = (from: number, to: number) => THREE.MathUtils.euclideanModulo(to - from + Math.PI, Math.PI * 2) - Math.PI;
  const beginManual = () => { detached = true; returning = false; };
  const findPlayer = () => {
    if (getPlayer) player = getPlayer();
    else if (!player?.parent) {
      player = null;
      scene.traverse((object) => {
        if (!player && typeof object.userData.characterId === "string" && Number(object.userData.cameraDistance) > 0) player = object;
      });
    }
    if (player && characterId !== player.userData.characterId) {
      characterId = player.userData.characterId;
      yaw = behindYaw(player); distance = preferredDistance(player); panOffset.set(0, 0, 0);
      pitch = preferredPitch(player); detached = false; returning = false;
    }
    return player;
  };
  return {
    update(delta: number, movement: { x?: number } = {}) {
      const current = findPlayer(); if (!current) return false;
      const dt = THREE.MathUtils.clamp(finite(delta), 0, .05);
      if (!initialized) { ownPosition.copy(camera.position); initialized = true; }
      if (returning) {
        returnTime += dt;
        const t = Math.min(1, returnTime / 1.2);
        // A small damped spring restores orbit/pan/zoom together. Its target is
        // recomputed from the current figure, so neither a moving avatar nor a
        // changed heading is sent back to its entry/world origin.
        const ease = t === 1 ? 1 : 1 - Math.exp(-8 * t) * (Math.cos(10 * t) + .8 * Math.sin(10 * t));
        yaw = returnFrom.yaw + shortestAngle(returnFrom.yaw, behindYaw(current)) * ease;
        pitch = THREE.MathUtils.lerp(returnFrom.pitch, preferredPitch(current), ease);
        distance = Math.exp(THREE.MathUtils.lerp(Math.log(returnFrom.distance), Math.log(preferredDistance(current)), ease));
        panOffset.copy(returnFrom.pan).multiplyScalar(1 - ease);
        if (t === 1) { returning = false; detached = false; }
      } else yaw -= finite(movement.x ?? 0) * dt * 1.6;
      current.getWorldPosition(target); target.add(panOffset); target.y += Number(current.userData.lookHeight) || 6;
      goal.set(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)).multiplyScalar(distance).add(target);
      // An independent pose prevents the old entry camera from fighting orbit.
      ownPosition.lerp(goal, 1 - Math.exp(-dt * 7.5));
      camera.position.copy(ownPosition); camera.lookAt(target); camera.updateMatrixWorld();
      return true;
    },
    orbit(dx: number, dy: number) {
      findPlayer(); if (!finite(dx) && !finite(dy)) return;
      beginManual(); yaw -= finite(dx) * .004;
      pitch = THREE.MathUtils.clamp(pitch + finite(dy) * .003, -1.15, 1.25);
    },
    pan(dx: number, dy: number) {
      findPlayer(); if (!finite(dx) && !finite(dy)) return;
      beginManual();
      right.setFromMatrixColumn(camera.matrixWorld, 0);
      panOffset.addScaledVector(right, -finite(dx) * distance * .001); panOffset.y += finite(dy) * distance * .001;
    },
    zoom(delta: number) { findPlayer(); if (!finite(delta)) return; beginManual(); distance = THREE.MathUtils.clamp(distance * Math.exp(THREE.MathUtils.clamp(finite(delta) * .001, -4, 4)), 16, 600); },
    reset() {
      const current = findPlayer(); if (!current) return;
      if (returning) return;
      returnFrom.yaw = yaw; returnFrom.pitch = pitch; returnFrom.distance = distance; returnFrom.pan.copy(panOffset);
      returnTime = 0; returning = true;
    },
    getState: () => ({ detached, returning }),
    // Keep angles/zoom between visits and hidden-tab pauses, but adopt the
    // current entry pose before retaking camera ownership: never jump back.
    resume() { initialized = false; },
  };
}
