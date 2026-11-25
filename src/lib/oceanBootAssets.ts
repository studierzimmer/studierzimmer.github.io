/** Original, same-origin files required by the first Ocean scene (no audio). */
export const OCEAN_BOOT_ASSETS = [
  { path: "wolfy.glb", bytes: 17941804 },
  { path: "island.gltf", bytes: 397420 },
  { path: "island.bin", bytes: 1901044 },
  { path: "waternormals.jpeg", bytes: 212079 },
  { path: "caustics.png", bytes: 147543 },
] as const;

export function oceanBootAssetUrl(path: string): string {
  return `${import.meta.env.BASE_URL}${path}`;
}
