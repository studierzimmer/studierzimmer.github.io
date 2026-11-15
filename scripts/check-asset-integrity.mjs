import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { basename, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const workspace = fileURLToPath(new URL("../", import.meta.url));
const raster = /\.(?:jpe?g|png|gif|webp|avif)$/i;
const publicMedia = /\.(?:jpe?g|png|gif|webp|avif|glb|gltf|bin|hdr)$/i;
const omittedPublic = new Set(["favicon.jpg", "images.jpeg", "island.glb", "islandold.glb"]);
async function files(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)]));
  return nested.flat();
}
async function exists(path) { try { return (await stat(path)).isFile(); } catch { return false; } }
async function digest(path) { return createHash("sha256").update(await readFile(path)).digest("hex"); }

export async function verifyAssetIntegrity(outputDirectory = resolve(workspace, "dist")) {
  const output = resolve(outputDirectory);
  const emitted = await files(join(output, "assets"));
  let checked = 0;
  for (const directory of ["src/img", "src/Portrait"]) {
    for (const source of (await files(resolve(workspace, directory))).filter((file) => raster.test(file))) {
      const extension = extname(source);
      const stem = basename(source, extension);
      const copies = emitted.filter((file) => basename(file).startsWith(`${stem}-`) && extname(file).toLowerCase() === extension.toLowerCase());
      if (!copies.length) continue; // Tree-shaken assets need not be shipped.
      const originalHash = await digest(source);
      for (const copy of copies) {
        if (await digest(copy) !== originalHash) throw new Error(`Asset modified during deployment: ${relative(workspace, source)}`);
        checked += 1;
      }
    }
  }
  const publicRoot = resolve(workspace, "public");
  for (const source of (await files(publicRoot)).filter((file) => publicMedia.test(file))) {
    const path = relative(publicRoot, source);
    if (omittedPublic.has(path)) continue;
    const copy = join(output, path);
    if (!await exists(copy)) throw new Error(`Public media missing from deployment: ${path}`);
    if (await digest(copy) !== await digest(source)) throw new Error(`Public media modified during deployment: ${path}`);
    checked += 1;
  }
  if (!checked) throw new Error("No emitted media verified; run the production build first.");
  console.log(`PASS: ${checked} emitted images/models match their original SHA-256 bytes; no downsampling or recompression.`);
  return checked;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await verifyAssetIntegrity(process.argv[2] ? resolve(process.argv[2]) : undefined);
}
