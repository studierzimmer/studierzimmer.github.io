import * as THREE from "three";

/** Authored calm-water point in the Player group's coordinates, after the
 * primitive's external model scale and any authored node/root transforms. */
export function shipWaterlineOffset(root: THREE.Object3D, modelScale: number): THREE.Vector3 {
  root.updateWorldMatrix(true, true);
  let author: THREE.Object3D | null = null;
  root.traverse((node) => {
    if (!author && typeof node.userData.oceanWaterlineY === "number" && Number.isFinite(node.userData.oceanWaterlineY)) author = node;
  });
  // The original bundled ship generator also authored the waterline at Y=0.
  // Use that hull specification for older GLBs, never the mast/sail bounding box.
  author ??= root.getObjectByName("Pirate_Sailing_Ship") ?? root;
  const authoredY = Number.isFinite(author.userData.oceanWaterlineY) ? Number(author.userData.oceanWaterlineY) : 0;
  const point = new THREE.Vector3(0, authoredY, 0);
  for (let node: THREE.Object3D | null = author; node && node !== root; node = node.parent) point.applyMatrix4(node.matrix);
  // R3F's primitive scale replaces root.scale; preserve its position/rotation.
  return point.multiplyScalar(modelScale).applyQuaternion(root.quaternion).add(root.position);
}

export function shipFloatingHeight(offset: THREE.Vector3, rotation?: THREE.Quaternion, seaLevel = 0): number {
  if (!rotation) return seaLevel - offset.y;
  return seaLevel - offset.clone().applyQuaternion(rotation).y;
}
