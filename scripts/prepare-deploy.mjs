import { readdir, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const outputDirectory = resolve(process.cwd(), "dist");
const unusedPublicArtifacts = [
  ".DS_Store",
  "favicon.jpg",
  "images.jpeg",
  "island.glb",
  "islandold.glb",
];

await Promise.all(
  unusedPublicArtifacts.map((fileName) =>
    rm(resolve(outputDirectory, fileName), { force: true })
  )
);

const assetDirectory = resolve(outputDirectory, "assets");
const jpegAssets = (await readdir(assetDirectory)).filter((fileName) =>
  /\.jpe?g$/i.test(fileName)
);

async function optimizeJpeg(fileName) {
  const sourcePath = resolve(assetDirectory, fileName);
  const temporaryPath = `${sourcePath}.optimized`;
  const metadata = await sharp(sourcePath).metadata();
  let pipeline = sharp(sourcePath).rotate();

  if (metadata.width && metadata.width > 1800) {
    pipeline = pipeline.resize({ width: 1800, withoutEnlargement: true });
  }

  await pipeline
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(temporaryPath);
  await rename(temporaryPath, sourcePath);
}

for (let index = 0; index < jpegAssets.length; index += 4) {
  await Promise.all(jpegAssets.slice(index, index + 4).map(optimizeJpeg));
}

await writeFile(resolve(outputDirectory, ".nojekyll"), "");
