// Read-only GLB geometry checks. No GPU, browser, network, asset generation or DB.
// Optional: --baseline=artifacts/performance/pirate-sailing-ship-before-galleon-20261125.glb
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const option = (name) => process.argv.find((value) => value.startsWith(`${name}=`))?.slice(name.length + 1);
const assetPath = path.resolve(root, option("--asset") || "public/pirate-sailing-ship.glb");
const baselinePath = option("--baseline");
const sha = (value) => crypto.createHash("sha256").update(value).digest("hex");
const identity = () => [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 };
const componentReaders = {
  5120: [1, (buffer, offset) => buffer.readInt8(offset)],
  5121: [1, (buffer, offset) => buffer.readUInt8(offset)],
  5122: [2, (buffer, offset) => buffer.readInt16LE(offset)],
  5123: [2, (buffer, offset) => buffer.readUInt16LE(offset)],
  5125: [4, (buffer, offset) => buffer.readUInt32LE(offset)],
  5126: [4, (buffer, offset) => buffer.readFloatLE(offset)],
};
const emptyBounds = () => ({ min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] });
function extend(bounds, point) { point.forEach((value, axis) => { bounds.min[axis] = Math.min(bounds.min[axis], value); bounds.max[axis] = Math.max(bounds.max[axis], value); }); }
const size = (bounds) => bounds.max.map((value, axis) => value - bounds.min[axis]);
function multiply(first, second) {
  const result = Array(16).fill(0);
  for (let column = 0; column < 4; column++) for (let row = 0; row < 4; row++) for (let index = 0; index < 4; index++) result[column * 4 + row] += first[index * 4 + row] * second[column * 4 + index];
  return result;
}
function nodeMatrix(node) {
  if (node.matrix) return node.matrix;
  const [x, y, z, w] = node.rotation || [0, 0, 0, 1];
  const [sx, sy, sz] = node.scale || [1, 1, 1];
  const [tx, ty, tz] = node.translation || [0, 0, 0];
  return [
    (1 - 2 * (y * y + z * z)) * sx, 2 * (x * y + z * w) * sx, 2 * (x * z - y * w) * sx, 0,
    2 * (x * y - z * w) * sy, (1 - 2 * (x * x + z * z)) * sy, 2 * (y * z + x * w) * sy, 0,
    2 * (x * z + y * w) * sz, 2 * (y * z - x * w) * sz, (1 - 2 * (x * x + y * y)) * sz, 0,
    tx, ty, tz, 1,
  ];
}
function transform(point, matrix) {
  const [x, y, z] = point;
  return [matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12], matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13], matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]];
}
function parseGlb(file) {
  const binary = fs.readFileSync(file);
  assert.equal(binary.readUInt32LE(0), 0x46546c67, "asset is a GLB container");
  assert.equal(binary.readUInt32LE(4), 2); assert.equal(binary.readUInt32LE(8), binary.length);
  let json, payload;
  for (let offset = 12; offset < binary.length;) {
    const length = binary.readUInt32LE(offset), type = binary.readUInt32LE(offset + 4);
    assert.ok(offset + 8 + length <= binary.length);
    const chunk = binary.subarray(offset + 8, offset + 8 + length);
    if (type === 0x4e4f534a) json = JSON.parse(chunk.toString("utf8"));
    if (type === 0x004e4942) payload = chunk;
    offset += 8 + length;
  }
  assert.ok(json && payload); assert.equal(json.asset.version, "2.0");
  assert.ok((json.buffers || []).every((buffer) => !buffer.uri), "geometry remains self-contained; no remote mesh dependencies");
  assert.ok((json.images || []).every((image) => image.bufferView !== undefined && !image.uri), "original ship textures remain embedded");
  const cache = new Map();
  const accessor = (index) => {
    if (cache.has(index)) return cache.get(index);
    const definition = json.accessors[index], view = json.bufferViews[definition.bufferView];
    assert.ok(!definition.sparse, "sparse data must not silently escape integrity checks");
    assert.ok(view && view.buffer === 0);
    const [bytes, read] = componentReaders[definition.componentType] || [];
    const width = components[definition.type];
    assert.ok(bytes && width);
    const stride = view.byteStride || bytes * width;
    const start = (view.byteOffset || 0) + (definition.byteOffset || 0);
    const values = [], packed = Buffer.alloc(definition.count * width * bytes);
    for (let row = 0; row < definition.count; row++) for (let column = 0; column < width; column++) {
      const offset = start + row * stride + column * bytes;
      assert.ok(offset + bytes <= payload.length);
      values.push(read(payload, offset));
      payload.copy(packed, (row * width + column) * bytes, offset, offset + bytes);
    }
    const result = { ...definition, width, values, packed };
    cache.set(index, result); return result;
  };
  const bounds = emptyBounds(), nodes = [];
  let triangles = 0;
  const visit = (index, parent) => {
    const node = json.nodes[index], world = multiply(parent, nodeMatrix(node));
    assert.ok(world.every(Number.isFinite));
    const localBounds = emptyBounds(), worldBounds = emptyBounds();
    if (node.mesh !== undefined) {
      const mesh = json.meshes[node.mesh];
      for (const primitive of mesh.primitives) {
        assert.equal(primitive.mode ?? 4, 4, "the bundled character uses explicit triangle meshes");
        const positions = accessor(primitive.attributes.POSITION);
        assert.equal(positions.type, "VEC3"); assert.equal(positions.componentType, 5126);
        assert.ok(positions.values.every(Number.isFinite), `${node.name}: finite original positions`);
        const normal = accessor(primitive.attributes.NORMAL);
        assert.equal(normal.count, positions.count); assert.equal(normal.width, 3);
        for (let vertex = 0; vertex < positions.count; vertex++) {
          const point = positions.values.slice(vertex * 3, vertex * 3 + 3);
          extend(localBounds, point); extend(worldBounds, transform(point, world));
          const length = Math.hypot(...normal.values.slice(vertex * 3, vertex * 3 + 3));
          assert.ok(Number.isFinite(length) && Math.abs(length - 1) < .002, `${node.name}: valid unit surface normals`);
        }
        const indices = primitive.indices === undefined ? Array.from({ length: positions.count }, (_, value) => value) : accessor(primitive.indices).values;
        assert.equal(indices.length % 3, 0);
        assert.ok(indices.every((value) => Number.isInteger(value) && value >= 0 && value < positions.count), `${node.name}: indices stay in bounds`);
        triangles += indices.length / 3;
        for (const target of primitive.targets || []) for (const targetIndex of Object.values(target)) assert.ok(accessor(targetIndex).values.every(Number.isFinite), `${node.name}: finite morph offsets`);
      }
      extend(bounds, worldBounds.min); extend(bounds, worldBounds.max);
      nodes.push({ node, mesh, world, bounds: worldBounds, localBounds });
    }
    for (const child of node.children || []) visit(child, world);
  };
  const scene = json.scenes[json.scene ?? 0];
  for (const index of scene.nodes) visit(index, identity());
  return { file, binary, json, payload, accessor, bounds, nodes, scene, triangles, hash: sha(binary) };
}

function meshFingerprint(asset, entry) {
  const fingerprint = (index) => {
    const accessor = asset.accessor(index);
    return { type: accessor.type, componentType: accessor.componentType, count: accessor.count, normalized: Boolean(accessor.normalized), sha256: sha(accessor.packed) };
  };
  return {
    transform: entry.world,
    weights: entry.node.weights || entry.mesh.weights || [], targetNames: entry.mesh.extras?.targetNames || [],
    primitives: entry.mesh.primitives.map((primitive) => ({
      attributes: Object.fromEntries(Object.keys(primitive.attributes).sort().map((key) => [key, fingerprint(primitive.attributes[key])])),
      indices: primitive.indices === undefined ? null : fingerprint(primitive.indices),
      targets: (primitive.targets || []).map((target) => Object.fromEntries(Object.keys(target).sort().map((key) => [key, fingerprint(target[key])]))),
    })),
  };
}

function closedSolid(asset, entry) {
  const edges = new Map();
  let volume = 0, triangles = 0;
  const key = (position) => position.map((value) => Math.round(value * 100000)).join(",");
  for (const primitive of entry.mesh.primitives) {
    const positions = asset.accessor(primitive.attributes.POSITION).values;
    const indices = primitive.indices === undefined ? Array.from({ length: positions.length / 3 }, (_, index) => index) : asset.accessor(primitive.indices).values;
    for (let offset = 0; offset < indices.length; offset += 3) {
      const points = indices.slice(offset, offset + 3).map((index) => positions.slice(index * 3, index * 3 + 3));
      const keys = points.map(key);
      assert.equal(new Set(keys).size, 3, `${entry.node.name}: no collapsed solid triangles`);
      for (let side = 0; side < 3; side++) {
        const first = keys[side], second = keys[(side + 1) % 3];
        const edge = first < second ? `${first}|${second}` : `${second}|${first}`;
        const value = edges.get(edge) || { count: 0, winding: 0 };
        value.count++; value.winding += first < second ? 1 : -1; edges.set(edge, value);
      }
      const [a, b, c] = points;
      volume += (a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0])) / 6;
      triangles++;
    }
  }
  assert.ok(edges.size > 0 && [...edges.values()].every((edge) => edge.count === 2 && edge.winding === 0), `${entry.node.name}: a closed, consistently wound manifold, not an open/double-sided board`);
  assert.ok(volume > .0001, `${entry.node.name}: positive outward solid volume`);
  return { triangles, volume };
}

const asset = parseGlb(assetPath);
const byName = new Map(asset.nodes.map((entry) => [entry.node.name, entry]));
const castles = ["Integrated_Quarterdeck_Castle", "Raised_Poop_Castle", "Raised_Forecastle"];
const required = ["Hull", "Sculpted_Keel", "Stem_Timber", "Sternpost_Timber", "Sternpost_Rudder", ...castles.flatMap((name) => [name, `${name}_Deck`])];
for (const name of required) assert.ok(byName.has(name), `galleon construction includes ${name}`);
assert.ok(!byName.has("Tapered_Stern_Cabin") && !byName.has("Stern_Cabin_Roof"), "integrated raised decks replace the old standalone toy cabin/roof");
assert.ok(asset.nodes.every((entry) => !/^Stern_Window_/.test(entry.node.name)), "old round stern-window discs/rings are not left over the new rectangular gallery");
assert.ok(asset.nodes.filter((entry) => /^Stern_Rectangular_Window_.*_Glass$/.test(entry.node.name)).length >= 4, "the raised stern has a rectangular glazed gallery");
const hull = byName.get("Hull"), keel = byName.get("Sculpted_Keel"), rudder = byName.get("Sternpost_Rudder");
const solids = Object.fromEntries(required.map((name) => [name, closedSolid(asset, byName.get(name))]));
const rootNode = asset.json.nodes.find((node) => node.name === "Pirate_Sailing_Ship");
assert.ok(rootNode, "the existing actor root name is preserved");
assert.deepEqual(nodeMatrix(rootNode), identity(), "the model's world origin/scale is never rebaked");
const waterline = asset.scene.extras?.oceanWaterlineY;
assert.ok(typeof waterline === "number" && Number.isFinite(waterline), "the loaded GLTF scene exposes a finite authored hull waterline");
assert.equal(rootNode.extras?.oceanWaterlineY, waterline, "the root node carries the same inspectable waterline metadata");
const mainDeck = byName.get("Main_Deck"); assert.ok(mainDeck);
assert.ok(waterline > keel.bounds.min[1] + .25 && waterline < mainDeck.bounds.min[1] - .25, "the authored waterline lies between the submerged keel and the main deck");
assert.ok(hull.bounds.min[1] < waterline - .5 && hull.bounds.max[1] > waterline + .8, "both opera viva and opera morta remain substantial on opposite sides of the true waterline");
assert.ok(keel.bounds.min[1] <= hull.bounds.min[1] - .12, "a visible structural keel projects below the bilges");
assert.ok(size(keel.bounds)[2] >= 13 && size(keel.bounds)[0] >= .15 && size(keel.bounds)[0] < 1, "the keel is a long timber, not a broad flat floor");
assert.ok(rudder.bounds.min[1] < waterline - 1 && size(rudder.bounds)[2] > .4 && size(rudder.bounds)[0] < 1, "the stern carries a thin, substantial submerged rudder blade");
const hinges = asset.nodes.filter((entry) => /(?:rudder.*hinge|hinge.*rudder|pintle|gudgeon)/i.test(entry.node.name));
assert.ok(hinges.length >= 3, "the rudder is visibly secured to the sternpost by at least three fittings");
const hullYLevels = new Set(hull.mesh.primitives.flatMap((primitive) => {
  const values = asset.accessor(primitive.attributes.POSITION).values;
  return Array.from({ length: values.length / 3 }, (_, index) => values[index * 3 + 1]).filter((y) => y < waterline).map((y) => Math.round(y * 100));
}));
assert.ok(hullYLevels.size >= 15, "the underwater body has a rounded, shaped section rather than a flat toy board");
const midship = new Map();
for (const primitive of hull.mesh.primitives) {
  const values = asset.accessor(primitive.attributes.POSITION).values;
  for (let index = 0; index < values.length; index += 3) {
    const point = values.slice(index, index + 3);
    if (Math.abs(point[2]) > 1) continue;
    const station = Math.round(point[2] * 10000);
    if (!midship.has(station)) midship.set(station, []);
    midship.get(station).push(point);
  }
}
assert.ok(midship.size > 0, "the same solid Hull supplies inspectable midship sections");
for (const points of midship.values()) {
  const bottom = Math.min(...points.map((point) => point[1])), top = Math.max(...points.map((point) => point[1]));
  const depth = top - bottom;
  const maximumBeam = Math.max(...points.map((point) => Math.abs(point[0])));
  const gunwaleBeam = Math.max(...points.filter((point) => point[1] >= top - depth * .04).map((point) => Math.abs(point[0])));
  const floorBeam = Math.max(...points.filter((point) => point[1] <= bottom + depth * .06).map((point) => Math.abs(point[0])));
  assert.ok(maximumBeam > gunwaleBeam * 1.03, "midship has genuine tumblehome: the fullest bilge is at least 3% wider than the top gunwale");
  assert.ok(points.some((point) => Math.abs(point[0]) >= maximumBeam * .999 && point[1] < top - depth * .1), "the maximum beam lies below the upper sides, not at the rim");
  assert.ok(floorBeam < maximumBeam * .65, "the underwater floor narrows substantially into the keel rather than forming a broad flat board");
  assert.ok(new Set(points.map((point) => Math.round(point[1] * 10000))).size >= 8, "the actual midship bilge has multiple curved levels, independently of longitudinal sampling density");
}

const sailNames = ["Fore_Lower_Sail", "Fore_Upper_Sail", "Main_Lower_Sail", "Main_Upper_Sail", "Mizzen_Sail"];
for (const name of sailNames) {
  const sail = byName.get(name); assert.ok(sail);
  assert.deepEqual(sail.mesh.extras?.targetNames, ["Wind_Fill"]);
  assert.ok(sail.mesh.primitives.every((primitive) => primitive.targets?.length === 1), `${name}: inflation morph survives`);
}
const flag = byName.get("Small_Pirate_Flag"); assert.ok(flag);
assert.deepEqual(flag.mesh.extras?.targetNames, ["Wind_Trail", "Wind_Flutter"]);
assert.ok(flag.mesh.primitives.every((primitive) => primitive.targets?.length === 2), "both flag wind morphs survive");
const repository = fs.readFileSync(path.join(root, "src/services/characterRepository.ts"), "utf8");
const version = repository.match(/const PIRATE_SHIP_ASSET_VERSION = "([^"]+)"/)?.[1];
assert.ok(version && version !== "20260726-15", "the intentionally replaced GLB receives a fresh bundled URL version");
assert.match(repository, /bundled_path: "pirate-sailing-ship\.glb",\s*model_scale: 3\.4,\s*camera_distance: 105/, "authored actor scale/camera defaults and original asset path are preserved");

let protectedCount = 0;
if (baselinePath) {
  const baseline = parseGlb(path.resolve(root, baselinePath));
  const before = new Map(baseline.nodes.map((entry) => [entry.node.name, entry]));
  assert.notEqual(asset.hash, baseline.hash, "the galleon revision actually changes the old asset");
  for (const entry of baseline.nodes.filter((entry) => /mast|sail|pirate_flag/i.test(entry.node.name))) {
    assert.ok(byName.has(entry.node.name), `existing animated/rigged node ${entry.node.name} survives`);
    assert.deepEqual(meshFingerprint(asset, byName.get(entry.node.name)), meshFingerprint(baseline, entry), `${entry.node.name}: original geometry, node pose and morph buffers remain byte-identical`);
    protectedCount++;
  }
  const flagImage = (document) => {
    const entry = document.nodes.find((candidate) => candidate.node.name === "Small_Pirate_Flag");
    const material = document.json.materials[entry.mesh.primitives[0].material];
    const texture = document.json.textures[material.pbrMetallicRoughness.baseColorTexture.index];
    const image = document.json.images[texture.source], view = document.json.bufferViews[image.bufferView];
    return sha(document.payload.subarray(view.byteOffset || 0, (view.byteOffset || 0) + view.byteLength));
  };
  assert.equal(flagImage(asset), flagImage(baseline), "no new flag graphic or recompression is introduced");
  for (let axis = 0; axis < 3; axis++) {
    assert.ok(Math.abs(asset.bounds.min[axis] - baseline.bounds.min[axis]) < .015, "the revised hull preserves the original actor minimum envelope");
    assert.ok(Math.abs(asset.bounds.max[axis] - baseline.bounds.max[axis]) < .015, "the revised hull preserves the original actor maximum envelope");
  }
  assert.ok(asset.binary.length < baseline.binary.length * 1.4, "the mobile ship asset does not grow without a bounded geometry budget");
  assert.equal(before.has("Hull"), true);
}
console.log(`PASS: finite/unit-normal GLB, ${required.length} closed structural solids, rounded submerged hull + keel/stern rudder/hinges, consistent authored waterline ${waterline}, existing sail/flag morphs and actor scale/cache version${baselinePath ? `; ${protectedCount} mast/sail/flag payloads and full actor envelope unchanged vs backup` : ""}. ${asset.binary.length} bytes, ${asset.triangles} triangles, SHA-256 ${asset.hash}.`);
console.log(`Solid volumes: ${Object.entries(solids).map(([name, result]) => `${name}=${result.volume.toFixed(3)}`).join(", ")}`);
