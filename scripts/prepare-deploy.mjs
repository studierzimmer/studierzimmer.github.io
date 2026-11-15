import { rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { verifyAssetIntegrity } from "./check-asset-integrity.mjs";

const outputDirectory = fileURLToPath(new URL("../dist/", import.meta.url));
const unusedPublicArtifacts = [
  ".DS_Store",
  "favicon.jpg",
  "images.jpeg",
  "island.glb",
  "islandold.glb",
];

// Vite does not always remove hidden directories from a previous output.
// Never let stale repository metadata or ignore rules leak into a deployment.
await rm(resolve(outputDirectory, ".git"), { recursive: true, force: true });

await Promise.all(
  unusedPublicArtifacts.map((fileName) =>
    rm(resolve(outputDirectory, fileName), { force: true })
  )
);

// Never resize, rotate, recompress or otherwise rewrite portfolio originals.
// Speed is handled by loading/scheduling and HTTP compression, not detail loss.
await verifyAssetIntegrity(outputDirectory);

await writeFile(resolve(outputDirectory, ".nojekyll"), "");
