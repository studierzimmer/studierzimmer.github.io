import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = resolve(
  projectRoot,
  "node_modules/occt-import-js/dist"
);
const outputDirectory = resolve(projectRoot, "public/occt-import-js");
const runtimeFiles = [
  "occt-import-js.js",
  "occt-import-js.wasm",
  "occt-import-js-worker.js",
];

await mkdir(outputDirectory, { recursive: true });
await Promise.all(
  runtimeFiles.map((fileName) =>
    copyFile(
      resolve(sourceDirectory, fileName),
      resolve(outputDirectory, fileName)
    )
  )
);
