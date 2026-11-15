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
  let yaw = 0, pitch = Math.atan(16 / 70), distance = 70;
  const panOffset = new THREE.Vector3(), target = new THREE.Vector3();
  const goal = new THREE.Vector3(), right = new THREE.Vector3(), ownPosition = new THREE.Vector3();
  const finite = (value: number, fallback = 0) => Number.isFinite(value) ? value : fallback;
  const preferredDistance = (current: THREE.Object3D) => THREE.MathUtils.clamp(Number(current.userData.cameraDistance) || 70, 16, 600);
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
      yaw = 0; distance = preferredDistance(player); panOffset.set(0, 0, 0);
      pitch = Math.atan(((Number(player.userData.cameraHeight) || 22) - (Number(player.userData.lookHeight) || 6)) / distance);
    }
    return player;
  };
  return {
    update(delta: number, movement: { x?: number } = {}) {
      const current = findPlayer(); if (!current) return false;
      const dt = THREE.MathUtils.clamp(finite(delta), 0, .05);
      if (!initialized) { ownPosition.copy(camera.position); initialized = true; }
      yaw -= finite(movement.x ?? 0) * dt * 1.6;
      current.getWorldPosition(target); target.add(panOffset); target.y += Number(current.userData.lookHeight) || 6;
      goal.set(Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)).multiplyScalar(distance).add(target);
      // An independent pose prevents the old entry camera from fighting orbit.
      ownPosition.lerp(goal, 1 - Math.exp(-dt * 7.5));
      camera.position.copy(ownPosition); camera.lookAt(target); camera.updateMatrixWorld();
      return true;
    },
    orbit(dx: number, dy: number) {
      findPlayer(); yaw -= finite(dx) * .004;
      pitch = THREE.MathUtils.clamp(pitch + finite(dy) * .003, -1.15, 1.25);
    },
    pan(dx: number, dy: number) {
      right.setFromMatrixColumn(camera.matrixWorld, 0);
      panOffset.addScaledVector(right, -finite(dx) * distance * .001); panOffset.y += finite(dy) * distance * .001;
    },
    zoom(delta: number) { distance = THREE.MathUtils.clamp(distance * Math.exp(THREE.MathUtils.clamp(finite(delta) * .001, -4, 4)), 16, 600); },
    reset() {
      const current = findPlayer(); if (!current) return;
      yaw = 0; distance = preferredDistance(current); panOffset.set(0, 0, 0);
      pitch = Math.atan(((Number(current.userData.cameraHeight) || 22) - (Number(current.userData.lookHeight) || 6)) / distance);
    },
    // Keep angles/zoom between visits and hidden-tab pauses, but adopt the
    // current entry pose before retaking camera ownership: never jump back.
    resume() { initialized = false; },
  };
}
