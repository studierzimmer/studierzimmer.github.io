import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

class NodeFileReader {
  result = null;
  onload = null;
  onloadend = null;
  onerror = null;

  readAsArrayBuffer(blob) {
    blob
      .arrayBuffer()
      .then((buffer) => {
        this.result = buffer;
        this.onload?.({ target: this });
        this.onloadend?.({ target: this });
      })
      .catch((error) => this.onerror?.(error));
  }

  readAsDataURL(blob) {
    blob
      .arrayBuffer()
      .then((buffer) => {
        const base64 = Buffer.from(buffer).toString("base64");
        this.result = `data:${blob.type};base64,${base64}`;
        this.onload?.({ target: this });
        this.onloadend?.({ target: this });
      })
      .catch((error) => this.onerror?.(error));
  }
}

globalThis.FileReader ??= NodeFileReader;

class NodeImageData {
  constructor(data, width, height) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
}

class NodeCanvas {
  width = 1;
  height = 1;
  pixels = null;

  getContext() {
    return {
      translate() {},
      scale() {},
      putImageData: (imageData) => {
        this.pixels = Buffer.from(imageData.data);
      },
    };
  }

  toBlob(callback, mimeType = "image/png") {
    const pixels =
      this.pixels ?? Buffer.alloc(this.width * this.height * 4, 255);
    sharp(pixels, {
      raw: {
        width: this.width,
        height: this.height,
        channels: 4,
      },
    })
      .png({ compressionLevel: 9 })
      .toBuffer()
      .then((buffer) => callback(new Blob([buffer], { type: mimeType })));
  }
}

globalThis.ImageData ??= NodeImageData;
globalThis.document ??= {
  createElement: () => new NodeCanvas(),
  createElementNS: () => new NodeCanvas(),
};

const OCEAN_WATERLINE_Y = -1.35;
const scene = new THREE.Scene();
scene.name = "Studierzimmer_Pirate_Sailing_Ship";
// Authored hull waterline, before the owner's external model_scale is applied.
scene.userData.oceanWaterlineY = OCEAN_WATERLINE_Y;

const ship = new THREE.Group();
ship.name = "Pirate_Sailing_Ship";
ship.userData.oceanWaterlineY = OCEAN_WATERLINE_Y;
scene.add(ship);

function createNormalTexture(name, size, heightAt, repeatX, repeatY, strength) {
  const data = new Uint8Array(size * size * 4);
  const sampleStep = 1 / size;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const u = x / size;
      const v = y / size;
      const left = heightAt(u - sampleStep, v);
      const right = heightAt(u + sampleStep, v);
      const down = heightAt(u, v - sampleStep);
      const up = heightAt(u, v + sampleStep);
      const normal = new THREE.Vector3(
        (left - right) * strength,
        (down - up) * strength,
        1
      ).normalize();
      const index = (y * size + x) * 4;
      data[index] = Math.round((normal.x * 0.5 + 0.5) * 255);
      data[index + 1] = Math.round((normal.y * 0.5 + 0.5) * 255);
      data[index + 2] = Math.round((normal.z * 0.5 + 0.5) * 255);
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );
  texture.name = name;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.colorSpace = THREE.NoColorSpace;
  texture.needsUpdate = true;
  return texture;
}

const woodHeight = (u, v) => {
  const grain =
    Math.sin(u * Math.PI * 42 + Math.sin(v * Math.PI * 5) * 1.4) * 0.17 +
    Math.sin(u * Math.PI * 93 + v * 8.7) * 0.055 +
    Math.sin(u * Math.PI * 17 - v * 13.1) * 0.09;
  const plankDistance = Math.abs(((v * 7 + 0.5) % 1) - 0.5);
  const plankJoint = Math.exp(-plankDistance * plankDistance * 850) * -0.68;
  return grain + plankJoint;
};

const sailHeight = (u, v) =>
  Math.sin(u * Math.PI * 72) * 0.11 +
  Math.sin(v * Math.PI * 78) * 0.11 +
  Math.sin((u + v) * Math.PI * 31) * 0.035;

const hullNormal = createNormalTexture(
  "Hull_Plank_Normal",
  256,
  woodHeight,
  2.5,
  3.5,
  5.8
);
const detailWoodNormal = hullNormal.clone();
detailWoodNormal.name = "Detail_Wood_Normal";
detailWoodNormal.repeat.set(3.5, 3.5);
const deckNormal = hullNormal.clone();
deckNormal.name = "Deck_Plank_Normal";
deckNormal.repeat.set(5, 8);
const sailNormal = createNormalTexture(
  "Sail_Weave_Normal",
  192,
  sailHeight,
  4,
  4,
  3.2
);

function distanceToSegment(x, y, ax, ay, bx, by) {
  const abX = bx - ax;
  const abY = by - ay;
  const amount = THREE.MathUtils.clamp(
    ((x - ax) * abX + (y - ay) * abY) / (abX * abX + abY * abY),
    0,
    1
  );
  return Math.hypot(x - (ax + abX * amount), y - (ay + abY * amount));
}

function createJollyRogerTexture() {
  const width = 256;
  const height = 128;
  const data = new Uint8Array(width * height * 4);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const u = x / (width - 1);
      const v = y / (height - 1);
      const boneA = distanceToSegment(u, v, 0.27, 0.22, 0.79, 0.75);
      const boneB = distanceToSegment(u, v, 0.27, 0.75, 0.79, 0.22);
      const boneEnds = [
        [0.27, 0.22],
        [0.79, 0.75],
        [0.27, 0.75],
        [0.79, 0.22],
      ].some(([endX, endY]) => Math.hypot(u - endX, v - endY) < 0.055);
      const skull =
        ((u - 0.53) / 0.19) ** 2 + ((v - 0.59) / 0.24) ** 2 < 1;
      const jaw = u > 0.41 && u < 0.65 && v > 0.35 && v < 0.53;
      const eye =
        Math.hypot(u - 0.47, v - 0.63) < 0.044 ||
        Math.hypot(u - 0.59, v - 0.63) < 0.044;
      const nose =
        v > 0.52 &&
        v < 0.59 &&
        Math.abs(u - 0.53) < (v - 0.52) * 0.43;
      const tooth =
        jaw &&
        (Math.abs(u - 0.455) < 0.009 ||
          Math.abs(u - 0.5) < 0.009 ||
          Math.abs(u - 0.545) < 0.009 ||
          Math.abs(u - 0.59) < 0.009);
      const isWhite =
        boneA < 0.025 ||
        boneB < 0.025 ||
        boneEnds ||
        ((skull || jaw) && !eye && !nose && !tooth);
      const color = isWhite ? 244 : 18;
      const index = (y * width + x) * 4;
      data[index] = color;
      data[index + 1] = color;
      data[index + 2] = isWhite ? 236 : color;
      data[index + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.UnsignedByteType
  );
  texture.name = "Jolly_Roger_Double_Sided";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

const jollyRogerTexture = createJollyRogerTexture();

const materials = {
  hull: new THREE.MeshPhysicalMaterial({
    name: "Hull_Warm_Wood",
    color: 0x5b4633,
    roughness: 0.74,
    metalness: 0.02,
    clearcoat: 0.07,
    clearcoatRoughness: 0.82,
    normalMap: hullNormal,
    normalScale: new THREE.Vector2(0.26, 0.32),
    side: THREE.FrontSide,
  }),
  lowerHull: new THREE.MeshPhysicalMaterial({
    name: "Lower_Hull_Carene",
    color: 0x484033,
    roughness: 0.83,
    metalness: 0.015,
    clearcoat: 0.035,
    clearcoatRoughness: 0.9,
    normalMap: hullNormal,
    normalScale: new THREE.Vector2(0.22, 0.28),
    side: THREE.FrontSide,
  }),
  darkWood: new THREE.MeshPhysicalMaterial({
    name: "Dark_Wood",
    color: 0x29231e,
    roughness: 0.64,
    clearcoat: 0.12,
    normalMap: detailWoodNormal,
    normalScale: new THREE.Vector2(0.44, 0.44),
  }),
  deck: new THREE.MeshPhysicalMaterial({
    name: "Deck_Wood",
    color: 0x705d49,
    roughness: 0.62,
    clearcoat: 0.14,
    normalMap: deckNormal,
    normalScale: new THREE.Vector2(0.58, 0.58),
    side: THREE.DoubleSide,
  }),
  brass: new THREE.MeshStandardMaterial({
    name: "Brass_Details",
    color: 0xa77b36,
    roughness: 0.36,
    metalness: 0.62,
  }),
  iron: new THREE.MeshStandardMaterial({
    name: "Aged_Iron_Fittings", color: 0x272925, roughness: 0.8, metalness: 0.48,
  }),
  sail: new THREE.MeshPhysicalMaterial({
    name: "Warm_White_Sails",
    color: 0xfffcf2,
    roughness: 0.84,
    metalness: 0,
    side: THREE.DoubleSide,
    normalMap: sailNormal,
    normalScale: new THREE.Vector2(0.5, 0.5),
    transmission: 0,
    transparent: false,
    opacity: 1,
    depthWrite: true,
    sheen: 0.48,
    sheenColor: new THREE.Color(0xfff8df),
    sheenRoughness: 0.9,
    emissive: new THREE.Color(0x17150f),
    emissiveIntensity: 0.1,
  }),
  sailEdge: new THREE.MeshStandardMaterial({
    name: "Sail_Seams",
    color: 0xc9bda6,
    roughness: 0.92,
  }),
  rope: new THREE.MeshStandardMaterial({
    name: "Rigging_Rope",
    color: 0x4b4038,
    roughness: 0.95,
  }),
  flag: new THREE.MeshStandardMaterial({
    name: "Pirate_Flag_Black",
    color: 0xffffff,
    roughness: 0.86,
    side: THREE.DoubleSide,
    map: jollyRogerTexture,
  }),
  glass: new THREE.MeshPhysicalMaterial({
    name: "Cabin_Glass",
    color: 0x4f7180,
    roughness: 0.16,
    metalness: 0.06,
    transmission: 0.18,
    transparent: true,
    opacity: 0.86,
  }),
};

const HULL_STATIONS = [
  { z: -9.8, width: 2.28, sheer: 1.48, depth: 3.02 },
  { z: -9.1, width: 2.86, sheer: 1.34, depth: 3.28 },
  { z: -7.5, width: 3.36, sheer: 1.17, depth: 3.55 },
  { z: -5.2, width: 3.7, sheer: 1.02, depth: 3.78 },
  { z: -2.3, width: 3.92, sheer: 0.88, depth: 3.92 },
  { z: 0.8, width: 3.86, sheer: 0.88, depth: 3.85 },
  { z: 3.6, width: 3.55, sheer: 1.04, depth: 3.58 },
  { z: 5.9, width: 3.06, sheer: 1.27, depth: 3.23 },
  { z: 7.7, width: 2.38, sheer: 1.53, depth: 2.82 },
  { z: 9.1, width: 1.5, sheer: 1.83, depth: 2.3 },
  { z: 10.15, width: 0.65, sheer: 2.08, depth: 1.82 },
  { z: 10.8, width: 0.08, sheer: 2.3, depth: 1.28 },
];

function stationValue(z, key) {
  let index = 0;
  while (index < HULL_STATIONS.length - 2 && z > HULL_STATIONS[index + 1].z) index += 1;
  const first = HULL_STATIONS[index], second = HULL_STATIONS[index + 1];
  const before = HULL_STATIONS[Math.max(0, index - 1)], after = HULL_STATIONS[Math.min(HULL_STATIONS.length - 1, index + 2)];
  const length = second.z - first.z, t = THREE.MathUtils.clamp((z - first.z) / length, 0, 1);
  const firstSlope = (second[key] - before[key]) / (second.z - before.z);
  const secondSlope = (after[key] - first[key]) / (after.z - first.z);
  return (2 * t ** 3 - 3 * t ** 2 + 1) * first[key] + (t ** 3 - 2 * t ** 2 + t) * length * firstSlope
    + (-2 * t ** 3 + 3 * t ** 2) * second[key] + (t ** 3 - t ** 2) * length * secondSlope;
}

function sampledStation(z) {
  const sheer = stationValue(z, "sheer");
  return { z, width: Math.max(.035, stationValue(z, "width")), top: Math.max(1.32, sheer), bottom: sheer - stationValue(z, "depth") + .27 };
}

const HULL_SAMPLES = Array.from({ length: 97 }, (_, index) => sampledStation(THREE.MathUtils.lerp(HULL_STATIONS[0].z, HULL_STATIONS.at(-1).z, index / 96)));
// Full bilges, a fine rising floor, and genuine tumblehome above the waterline.
// Unlike an ellipse, the greatest beam lies below the narrowed upper sides.
const SECTION = [
  [0, .94, 1], [.14, 1, .88], [.28, 1.025, .74], [.45, 1.01, .52],
  [.62, .88, .31], [.78, .61, .14], [.9, .31, .045], [1, 0, 0],
];

function sectionValue(amount, column) {
  let index = 0;
  while (index < SECTION.length - 2 && amount > SECTION[index + 1][0]) index += 1;
  const first = SECTION[index], second = SECTION[index + 1];
  const before = SECTION[Math.max(0, index - 1)], after = SECTION[Math.min(SECTION.length - 1, index + 2)];
  const length = second[0] - first[0], t = THREE.MathUtils.clamp((amount - first[0]) / length, 0, 1);
  const slope0 = (second[column] - before[column]) / (second[0] - before[0]);
  const slope1 = (after[column] - first[column]) / (after[0] - first[0]);
  const value = (2 * t ** 3 - 3 * t ** 2 + 1) * first[column] + (t ** 3 - 2 * t ** 2 + t) * length * slope0
    + (-2 * t ** 3 + 3 * t ** 2) * second[column] + (t ** 3 - t ** 2) * length * slope1;
  return THREE.MathUtils.clamp(value, Math.min(first[column], second[column]), Math.max(first[column], second[column]));
}

function hullPoint(station, fraction) {
  const side = fraction <= .5 ? -1 : 1;
  const amount = fraction <= .5 ? fraction * 2 : (1 - fraction) * 2;
  return new THREE.Vector3(side * station.width * sectionValue(amount, 1), THREE.MathUtils.lerp(station.bottom, station.top, sectionValue(amount, 2)), station.z);
}

function halfBeamAtHeight(z, y) {
  const station = sampledStation(z);
  let low = 0, high = 1;
  for (let step = 0; step < 24; step += 1) {
    const amount = (low + high) / 2;
    if (THREE.MathUtils.lerp(station.bottom, station.top, sectionValue(amount, 2)) > y) low = amount;
    else high = amount;
  }
  return station.width * sectionValue((low + high) / 2, 1);
}

function hullGeometry() {
  const crossSegments = 56, ringSize = crossSegments + 1;
  const positions = [], uvs = [], upper = [], lower = [];
  HULL_SAMPLES.forEach((station, stationIndex) => {
    for (let index = 0; index <= crossSegments; index += 1) {
      positions.push(...hullPoint(station, index / crossSegments).toArray());
      uvs.push(stationIndex / (HULL_SAMPLES.length - 1), index / crossSegments);
    }
  });
  const triangle = (a, b, c) => {
    const y = (positions[a * 3 + 1] + positions[b * 3 + 1] + positions[c * 3 + 1]) / 3;
    (y < OCEAN_WATERLINE_Y ? lower : upper).push(a, b, c);
  };
  for (let stationIndex = 0; stationIndex < HULL_SAMPLES.length - 1; stationIndex += 1) {
    for (let index = 0; index < crossSegments; index += 1) {
      const a = stationIndex * ringSize + index, b = a + 1, d = (stationIndex + 1) * ringSize + index, c = d + 1;
      triangle(a, b, d); triangle(b, c, d);
    }
    // Seal the upper edge as well as both ends: the hull is a solid volume,
    // not an open bowl covered by another transparent/double-sided skin.
    const a = stationIndex * ringSize, b = a + crossSegments, c = b + ringSize, d = a + ringSize;
    triangle(a, d, b); triangle(b, d, c);
  }
  for (const stationIndex of [0, HULL_SAMPLES.length - 1]) {
    const station = HULL_SAMPLES[stationIndex], center = positions.length / 3;
    positions.push(0, (station.top + station.bottom) / 2, station.z); uvs.push(stationIndex === 0 ? 0 : 1, .5);
    for (let index = 0; index <= crossSegments; index += 1) {
      const a = stationIndex * ringSize + index, b = stationIndex * ringSize + (index + 1) % ringSize;
      if (stationIndex === 0) triangle(center, b, a); else triangle(center, a, b);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex([...upper, ...lower]);
  geometry.addGroup(0, upper.length, 0); geometry.addGroup(upper.length, lower.length, 1);
  geometry.computeVertexNormals(); geometry.normalizeNormals();
  return geometry;
}

function addHullStrake(name, side, depthFraction, material, radius = 0.032) {
  const points = HULL_SAMPLES.filter((_, index) => index > 2 && index < 94 && index % 4 === 0).map((station) => {
    const point = hullPoint(station, side < 0 ? depthFraction : 1 - depthFraction);
    point.x += Math.sign(point.x) * .012;
    return point;
  });
  addTubeCurve(name, points, radius, material);
}

function addHullLine(name, side, yOffset, material, radius = 0.055) {
  const points = HULL_SAMPLES.filter((_, index) => index > 2 && index < 94 && index % 4 === 0).map((station) => {
    const y = station.top + yOffset;
    return new THREE.Vector3(side * (halfBeamAtHeight(station.z, y) + radius * .45), y, station.z);
  });
  const curve = new THREE.CatmullRomCurve3(points);
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 80, radius, 6, false),
    material
  );
  mesh.name = name;
  ship.add(mesh);
}

function deckShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-HULL_SAMPLES[0].width * .94, HULL_SAMPLES[0].z);
  HULL_SAMPLES.slice(1).forEach((station) => shape.lineTo(-station.width * .94, station.z));
  [...HULL_SAMPLES].reverse().forEach((station) => shape.lineTo(station.width * .94, station.z));
  shape.closePath();
  return shape;
}

function horizontalDeckGeometry() {
  const geometry = new THREE.ExtrudeGeometry(deckShape(), {
    depth: 0.32,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.075,
    bevelThickness: 0.06,
    curveSegments: 48,
  });
  // ShapeGeometry's Y axis becomes the ship's +Z axis. This keeps the
  // pointed bow aligned with the movement direction instead of the stern.
  geometry.rotateX(Math.PI / 2);
  const points = geometry.getAttribute("position");
  for (let index = 0; index < points.count; index += 1) points.setY(index, points.getY(index) + sampledStation(points.getZ(index)).top - 1.32);
  geometry.computeVertexNormals();
  return geometry;
}

function sternTransomGeometry() {
  const station = HULL_SAMPLES[0];
  const shape = new THREE.Shape();
  shape.moveTo(-station.width * .94, station.top);
  for (let index = 1; index <= 32; index += 1) {
    const amount = index / 32;
    const point = hullPoint(station, amount);
    shape.lineTo(point.x, point.y);
  }
  shape.lineTo(-station.width * .94, station.top);
  shape.closePath();

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.24,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.035,
    bevelThickness: 0.035,
    curveSegments: 32,
  });
  geometry.computeVertexNormals();
  geometry.normalizeNormals();
  return geometry;
}

function castleLoftGeometry(sections) {
  const vertices = [], indices = [], uvs = [];
  sections.forEach((section, index) => {
    vertices.push(-section.baseWidth, section.bottom, section.z, -section.topWidth, section.top, section.z,
      section.topWidth, section.top, section.z, section.baseWidth, section.bottom, section.z);
    for (let side = 0; side < 4; side += 1) uvs.push(index / (sections.length - 1), side / 3);
  });
  for (let station = 0; station < sections.length - 1; station += 1) for (let edge = 0; edge < 4; edge += 1) {
    const a = station * 4 + edge, b = station * 4 + (edge + 1) % 4, d = (station + 1) * 4 + edge, c = (station + 1) * 4 + (edge + 1) % 4;
    indices.push(a, b, d, b, c, d);
  }
  for (const station of [0, sections.length - 1]) {
    const section = sections[station], center = vertices.length / 3;
    vertices.push(0, (section.bottom + section.top) / 2, section.z); uvs.push(station === 0 ? 0 : 1, .5);
    for (let edge = 0; edge < 4; edge += 1) {
      const a = station * 4 + edge, b = station * 4 + (edge + 1) % 4;
      if (station === 0) indices.push(center, b, a); else indices.push(center, a, b);
    }
  }
  let volume = 0;
  for (let index = 0; index < indices.length; index += 3) {
    const a = new THREE.Vector3().fromArray(vertices, indices[index] * 3), b = new THREE.Vector3().fromArray(vertices, indices[index + 1] * 3), c = new THREE.Vector3().fromArray(vertices, indices[index + 2] * 3);
    volume += a.dot(b.cross(c)) / 6;
  }
  if (volume < 0) for (let index = 0; index < indices.length; index += 3) [indices[index + 1], indices[index + 2]] = [indices[index + 2], indices[index + 1]];
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.normalizeNormals();
  return geometry;
}

function addCylinderBetween(
  name,
  start,
  end,
  radius,
  material,
  radialSegments = 8
) {
  const direction = end.clone().sub(start);
  const length = direction.length();
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, length, radialSegments),
    material
  );
  mesh.name = name;
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );
  ship.add(mesh);
  return mesh;
}

function addTubeCurve(name, points, radius, material) {
  const curve = new THREE.CatmullRomCurve3(points);
  const mesh = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 32, radius, 5, false),
    material
  );
  mesh.name = name;
  ship.add(mesh);
  return mesh;
}

function addBox(name, size, position, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = name;
  mesh.position.set(...position);
  ship.add(mesh);
  return mesh;
}

function addCrowsNest(name, mastZ, y, radius = 0.9) {
  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius * 1.12, 0.28, 18),
    materials.darkWood
  );
  platform.name = `${name}_Platform`;
  platform.position.set(0, y, mastZ);
  ship.add(platform);

  const rim = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.055, 7, 24),
    materials.darkWood
  );
  rim.name = `${name}_Rail`;
  rim.rotation.x = Math.PI / 2;
  rim.position.set(0, y + 0.52, mastZ);
  ship.add(rim);

  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2;
    addCylinderBetween(
      `${name}_Post_${index + 1}`,
      new THREE.Vector3(
        Math.cos(angle) * radius,
        y + 0.12,
        mastZ + Math.sin(angle) * radius
      ),
      new THREE.Vector3(
        Math.cos(angle) * radius,
        y + 0.52,
        mastZ + Math.sin(angle) * radius
      ),
      0.025,
      materials.rope,
      5
    );
  }
}

function addRatlines(name, mastZ, topY, side) {
  const topPoints = [];
  const bottomPoints = [];
  for (let strand = 0; strand < 5; strand += 1) {
    const across = strand / 4 - 0.5;
    const top = new THREE.Vector3(
      side * (0.22 + Math.abs(across) * 0.08),
      topY,
      mastZ + across * 0.72
    );
    const bottom = new THREE.Vector3(
      side * 3.18,
      1.65,
      mastZ - 1.45 + strand * 0.74
    );
    topPoints.push(top);
    bottomPoints.push(bottom);
    addCylinderBetween(
      `${name}_Shroud_${strand + 1}`,
      top,
      bottom,
      0.025,
      materials.rope,
      5
    );
  }

  for (let rung = 1; rung <= 12; rung += 1) {
    const amount = rung / 13;
    const points = topPoints.map((top, index) =>
      top.clone().lerp(bottomPoints[index], amount)
    );
    for (let strand = 0; strand < points.length - 1; strand += 1) {
      addCylinderBetween(
        `${name}_Ratline_${rung}_${strand + 1}`,
        points[strand],
        points[strand + 1],
        0.012,
        materials.rope,
        4
      );
    }
  }
}

function addSail(name, width, height, position, mastZ, yTop) {
  const columns = 22;
  const rows = 16;
  const vertices = [];
  const inflatedDeltas = [];
  const indices = [];

  for (let row = 0; row <= rows; row += 1) {
    const v = row / rows;
    const rowWidth = width * (0.99 - v * 0.2);
    for (let column = 0; column <= columns; column += 1) {
      const u = column / columns;
      const x = (u - 0.5) * rowWidth;
      const footCurve =
        Math.pow(1 - v, 6) *
        Math.sin(u * Math.PI) *
        height *
        0.17;
      const tautY = (v - 0.5) * height + footCurve;
      const fullBelly =
        Math.sin(u * Math.PI) *
        Math.sin(Math.pow(v, 0.82) * Math.PI) *
        Math.min(width, height) *
        0.44;
      const windTwist = (u - 0.5) * (1 - v) * 0.22;
      const windDirection = 1;
      const restingBelly =
        fullBelly * 0.055 +
        Math.sin(v * Math.PI * 4 + u * 2.7) *
          Math.sin(u * Math.PI) *
          0.12;
      const clothEnvelope = Math.sin(u * Math.PI) * Math.sin(v * Math.PI);
      const restingX =
        x * (0.945 - clothEnvelope * 0.025) +
        Math.sin(v * Math.PI * 3.2 + u * 4.1) * clothEnvelope * 0.055;
      const inflatedX =
        x * (1.105 + Math.sin(v * Math.PI) * 0.045);
      const restingY =
        tautY -
        Math.sin(u * Math.PI) *
          (0.35 + Math.sin(v * Math.PI) * 0.65) *
          height *
          0.055 +
        Math.sin(u * Math.PI * 3 + v * 4.4) * clothEnvelope * 0.035;
      const inflatedY =
        tautY +
        Math.sin(u * Math.PI) *
          Math.sin(v * Math.PI) *
          height *
          0.022;
      const restingZ = (restingBelly + windTwist * 0.3) * windDirection;
      const inflatedZ = (fullBelly + windTwist) * windDirection;
      vertices.push(restingX, restingY, restingZ);
      inflatedDeltas.push(
        inflatedX - restingX,
        inflatedY - restingY,
        inflatedZ - restingZ
      );
    }
  }

  const rowSize = columns + 1;
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const a = row * rowSize + column;
      const b = a + 1;
      const d = (row + 1) * rowSize + column;
      const c = d + 1;
      indices.push(a, b, d, b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.morphAttributes.position = [
    new THREE.Float32BufferAttribute(inflatedDeltas, 3),
  ];
  geometry.morphTargetsRelative = true;
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  const sail = new THREE.Mesh(geometry, materials.sail);
  sail.name = name;
  sail.position.set(position, yTop - height * 0.5, mastZ + 0.1);
  sail.morphTargetInfluences = [0.14];
  sail.morphTargetDictionary = { Wind_Fill: 0 };
  ship.add(sail);

  const topWidth = width * 0.79;
  const bottomLeft = new THREE.Vector3(
    position - width * 0.49,
    yTop - height,
    mastZ + 0.1
  );
  const bottomRight = new THREE.Vector3(
    position + width * 0.49,
    yTop - height,
    mastZ + 0.1
  );
  const topLeft = new THREE.Vector3(
    position - topWidth * 0.5,
    yTop,
    mastZ + 0.1
  );
  const topRight = new THREE.Vector3(
    position + topWidth * 0.5,
    yTop,
    mastZ + 0.1
  );
  addCylinderBetween(
    `${name}_port_edge`,
    bottomLeft,
    topLeft,
    0.045,
    materials.sailEdge,
    5
  );
  addCylinderBetween(
    `${name}_starboard_edge`,
    bottomRight,
    topRight,
    0.045,
    materials.sailEdge,
    5
  );
  addTubeCurve(
    `${name}_foot_edge`,
    [
      bottomLeft,
      new THREE.Vector3(
        position - width * 0.25,
        yTop - height + height * 0.125,
        mastZ + 0.3
      ),
      new THREE.Vector3(
        position,
        yTop - height + height * 0.17,
        mastZ + 0.38
      ),
      new THREE.Vector3(
        position + width * 0.25,
        yTop - height + height * 0.125,
        mastZ + 0.3
      ),
      bottomRight,
    ],
    0.035,
    materials.sailEdge
  );

  for (const seam of [-0.24, 0, 0.24]) {
    const seamU = seam + 0.5;
    const seamFootY =
      yTop -
      height +
      Math.sin(seamU * Math.PI) * height * 0.17 +
      0.08;
    addCylinderBetween(
      `${name}_seam_${String(seam).replace(".", "_")}`,
      new THREE.Vector3(
        position + seam * width,
        seamFootY,
        mastZ + 0.2
      ),
      new THREE.Vector3(
        position + seam * topWidth,
        yTop - 0.08,
        mastZ + 0.08
      ),
      0.018,
      materials.sailEdge,
      5
    );
  }

  addCylinderBetween(
    `${name}_yard`,
    new THREE.Vector3(position - width * 0.57, yTop + 0.1, mastZ),
    new THREE.Vector3(position + width * 0.57, yTop + 0.1, mastZ),
    0.11,
    materials.darkWood
  );
  addCylinderBetween(
    `${name}_foot_yard`,
    new THREE.Vector3(
      position - width * 0.49,
      yTop - height + 0.06,
      mastZ + 0.12
    ),
    new THREE.Vector3(
      position + width * 0.49,
      yTop - height + 0.06,
      mastZ + 0.12
    ),
    0.055,
    materials.darkWood,
    8
  );
  for (const side of [-1, 1]) {
    addCylinderBetween(
      `${name}_${side < 0 ? "Port" : "Starboard"}_Clew_Line`,
      new THREE.Vector3(
        position + side * width * 0.48,
        yTop - height + 0.06,
        mastZ + 0.15
      ),
      new THREE.Vector3(
        side * Math.min(width * 0.24, 3.15),
        1.72,
        mastZ - 1.15
      ),
      0.018,
      materials.rope,
      4
    );
    addCylinderBetween(
      `${name}_${side < 0 ? "Port" : "Starboard"}_Yard_Brace`,
      new THREE.Vector3(
        position + side * width * 0.56,
        yTop + 0.1,
        mastZ
      ),
      new THREE.Vector3(
        side * 2.75,
        Math.max(2.1, yTop - height * 0.72),
        mastZ - 2.1
      ),
      0.016,
      materials.rope,
      4
    );
  }
}

function timberGeometry(profile, thickness, exactBottom = null) {
  const shape = new THREE.Shape();
  shape.moveTo(-profile[0][0], profile[0][1]);
  profile.slice(1).forEach(([z, y]) => shape.lineTo(-z, y));
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, { depth: thickness, bevelEnabled: true, bevelSize: .018, bevelThickness: .012, bevelSegments: 2, curveSegments: 24 });
  geometry.rotateY(Math.PI / 2); geometry.translate(-thickness / 2, 0, 0);
  if (exactBottom !== null) { geometry.computeBoundingBox(); geometry.translate(0, exactBottom - geometry.boundingBox.min.y, 0); }
  geometry.computeVertexNormals(); geometry.normalizeNormals();
  return geometry;
}

const hull = new THREE.Mesh(hullGeometry(), [materials.hull, materials.lowerHull]);
hull.name = "Hull";
ship.add(hull);

const sternTransom = new THREE.Mesh(sternTransomGeometry(), materials.hull);
sternTransom.name = "Closed_Stern_Transom";
sternTransom.position.z = HULL_STATIONS[0].z - 0.12;
ship.add(sternTransom);

const deck = new THREE.Mesh(horizontalDeckGeometry(), materials.deck);
deck.name = "Main_Deck";
deck.position.y = 1.32;
ship.add(deck);

// A second, uninterrupted top skin ensures that the whole hull reads as a
// closed wooden volume even at grazing angles and through the waterline.
const deckTopGeometry = new THREE.ShapeGeometry(deckShape(), 64);
deckTopGeometry.rotateX(Math.PI / 2);
const deckTopVertices = deckTopGeometry.getAttribute("position");
for (let index = 0; index < deckTopVertices.count; index += 1) deckTopVertices.setY(index, deckTopVertices.getY(index) + sampledStation(deckTopVertices.getZ(index)).top - 1.32);
const deckTopIndex = deckTopGeometry.getIndex();
if (deckTopIndex) {
  for (let index = 0; index < deckTopIndex.count; index += 3) {
    const second = deckTopIndex.getX(index + 1);
    deckTopIndex.setX(index + 1, deckTopIndex.getX(index + 2));
    deckTopIndex.setX(index + 2, second);
  }
  deckTopIndex.needsUpdate = true;
}
deckTopGeometry.computeVertexNormals();
deckTopGeometry.normalizeNormals();
const deckTop = new THREE.Mesh(deckTopGeometry, materials.deck);
deckTop.name = "Continuous_Upper_Deck";
deckTop.position.y = 1.39;
ship.add(deckTop);

for (const side of [-1, 1]) {
  addHullLine(
    side < 0 ? "Port_Gunwale" : "Starboard_Gunwale",
    side,
    0.18,
    materials.darkWood,
    0.105
  );
  addHullLine(
    side < 0 ? "Port_Gold_Line" : "Starboard_Gold_Line",
    side,
    -0.66,
    materials.brass,
    0.04
  );
  for (const [index, depth] of [0.095, 0.16, 0.23, 0.3, 0.37].entries()) {
    addHullStrake(
      `${side < 0 ? "Port" : "Starboard"}_Hull_Plank_Seam_${index + 1}`,
      side,
      depth,
      index === 2 ? materials.brass : materials.darkWood,
      index === 2 ? 0.028 : 0.022
    );
  }
}

// A longitudinal oak-like timber backbone, with a flat keel, rising forefoot
// and raked sternpost. It is a solid profiled timber, never a round tube/board.
const keelProfile = [-8.55, -7.5, -5.2, -2.3, .8, 3.6, 5.9, 7.7, 8.25].map((z) => [z, sampledStation(z).bottom + .12]);
keelProfile.push([8.25, -1.8], [7.7, -2.25], [5.9, -2.92], [3.6, -3.34], [.8, -3.36], [-2.3, -3.36], [-5.2, -3.36], [-7.5, -3.08], [-8.55, -2.48]);
const keel = new THREE.Mesh(timberGeometry(keelProfile, .34, -3.3773207664489746), materials.lowerHull);
keel.name = "Sculpted_Keel"; ship.add(keel);

const stem = new THREE.Mesh(timberGeometry([
  [7.6, -1.75], [8.15, -1.45], [8.7, -.89], [9.25, -.18], [9.8, .83], [10.45, 2.2],
  [10.8, 2.64], [11.03, 2.58], [10.67, 1.46], [10.18, .27], [9.55, -.96], [8.7, -1.92], [7.8, -2.35],
], .36), materials.hull);
stem.name = "Stem_Timber"; ship.add(stem);

const sternpost = new THREE.Mesh(timberGeometry([[-9.53, 1.7], [-8.36, -2.93], [-8.64, -3.12], [-9.8, 1.66]], .32), materials.lowerHull);
sternpost.name = "Sternpost_Timber"; ship.add(sternpost);

const rudder = new THREE.Mesh(timberGeometry([[-9.8, 1.1], [-8.62, -3.1], [-9.53, -3.22], [-9.87, -2.72], [-9.91, .7]], .2), materials.darkWood);
rudder.name = "Sternpost_Rudder"; ship.add(rudder);
for (const [index, y] of [-2.5, -1.05, .5].entries()) {
  const z = THREE.MathUtils.lerp(-8.62, -9.8, (y + 3.1) / 4.2);
  addBox(`Rudder_Gudgeon_${index + 1}`, [.5, .105, .37], [0, y, z + .08], materials.iron);
  addCylinderBetween(`Rudder_Pintle_${index + 1}`, new THREE.Vector3(0, y - .16, z), new THREE.Vector3(0, y + .16, z), .065, materials.iron, 8);
}

for (const x of [-2.5, -1.65, -0.82, 0, 0.82, 1.65, 2.5]) {
  addCylinderBetween(
    `Deck_Plank_Line_${String(x).replace(".", "_")}`,
    new THREE.Vector3(x * 0.72, 1.275, -8.2),
    new THREE.Vector3(x * 0.38, 1.275, 8.55),
    0.018,
    materials.darkWood,
    5
  );
}

function interpolateCastle(sections, z, key) {
  let index = 0;
  while (index < sections.length - 2 && z > sections[index + 1].z) index += 1;
  const first = sections[index], second = sections[index + 1];
  return THREE.MathUtils.lerp(first[key], second[key], THREE.MathUtils.clamp((z - first.z) / (second.z - first.z), 0, 1));
}

const quarterdeckSections = [[-9.78, 3.82], [-9.1, 3.78], [-8.1, 3.58], [-6.5, 3.16], [-5.35, 2.78], [-4.9, 2.62]].map(([z, top]) => {
  const station = sampledStation(z), baseWidth = station.width * .94 + .025;
  return { z, top, bottom: station.top - .07, baseWidth, topWidth: baseWidth * .9 };
});
const poopSections = [[-9.8, 5.06], [-9.2, 4.99], [-8.25, 4.82], [-7.15, 4.56]].map(([z, top]) => {
  const baseWidth = interpolateCastle(quarterdeckSections, z, "topWidth") - .02;
  return { z, top, bottom: interpolateCastle(quarterdeckSections, z, "top") - .045, baseWidth, topWidth: baseWidth * .88 };
});
const forecastleSections = [[5.35, 2.28], [6.7, 2.54], [8.1, 2.84], [9.4, 3.06], [10.45, 3.14]].map(([z, top]) => {
  const station = sampledStation(z), baseWidth = station.width * .94 + .015;
  return { z, top, bottom: station.top - .05, baseWidth, topWidth: baseWidth * .89 };
});
for (const [name, sections] of [["Integrated_Quarterdeck_Castle", quarterdeckSections], ["Raised_Poop_Castle", poopSections], ["Raised_Forecastle", forecastleSections]]) {
  const body = new THREE.Mesh(castleLoftGeometry(sections), materials.hull); body.name = name; ship.add(body);
  const deckSections = sections.map((section) => ({ ...section, bottom: section.top - .045, top: section.top + .035, baseWidth: section.topWidth + .035, topWidth: section.topWidth + .035 }));
  const deck = new THREE.Mesh(castleLoftGeometry(deckSections), materials.deck); deck.name = `${name}_Deck`; ship.add(deck);
  for (const side of [-1, 1]) {
    addTubeCurve(`${name}_${side < 0 ? "Port" : "Starboard"}_Timber_Cap`, sections.map((section) => new THREE.Vector3(side * section.topWidth, section.top + .13, section.z)), .055, materials.darkWood);
  }
}
for (let step = 0; step < 6; step += 1) addBox(`Quarterdeck_Stair_${step + 1}`, [1.35, .18, .32], [0, 1.41 + step * .205, -3.35 - step * .27], materials.deck);
for (let step = 0; step < 5; step += 1) addBox(`Poop_Stair_${step + 1}`, [1.15, .17, .25], [.7, 3.2 + step * .25, -6.04 - step * .23], materials.deck);

for (const y of [2.76, 4.42]) for (const [index, x] of [-1.17, -.39, .39, 1.17].entries()) {
  const prefix = `Stern_Rectangular_Window_${y}_${index + 1}`;
  addBox(`${prefix}_Recess`, [.59, .58, .055], [x, y, -9.875], materials.darkWood);
  addBox(`${prefix}_Glass`, [.43, .42, .025], [x, y, -9.913], materials.glass);
  addBox(`${prefix}_Mullion`, [.035, .43, .035], [x, y, -9.93], materials.darkWood);
}
addBox("Stern_Gallery_Ledge", [4.15, .10, .48], [0, 3.82, -9.65], materials.deck);

function upperDeckAt(z) {
  if (z <= -7.15) return interpolateCastle(poopSections, z, "top");
  if (z <= -4.9) return interpolateCastle(quarterdeckSections, z, "top");
  if (z >= 5.35) return interpolateCastle(forecastleSections, z, "top");
  return sampledStation(z).top;
}

for (const side of [-1, 1]) {
  const railPoints = [
    new THREE.Vector3(2.25 * side, upperDeckAt(-8.8) + .62, -8.8),
    new THREE.Vector3(3.25 * side, upperDeckAt(-5.1) + .62, -5.1),
    new THREE.Vector3(3.4 * side, upperDeckAt(-.5) + .62, -.5),
    new THREE.Vector3(3.0 * side, upperDeckAt(5.2) + .62, 5.2),
    new THREE.Vector3(1.3 * side, upperDeckAt(8.85) + .62, 8.85),
  ];
  addTubeCurve(
    side < 0 ? "Port_Upper_Rail" : "Starboard_Upper_Rail",
    railPoints,
    0.07,
    materials.darkWood
  );
  for (let z = -7.5; z <= 7.5; z += 1.5) {
    const taper = Math.max(0.8, 1 - Math.max(0, z - 4) * 0.08);
    const x = side * (3.25 - Math.max(0, Math.abs(z) - 5) * 0.22) * taper;
    addCylinderBetween(
      `${side < 0 ? "Port" : "Starboard"}_Rail_Post_${z}`,
      new THREE.Vector3(x, upperDeckAt(z) + .04, z),
      new THREE.Vector3(x, upperDeckAt(z) + .62, z),
      0.035,
      materials.darkWood,
      5
    );
  }
}

for (let index = -2; index <= 2; index += 1) {
  const z = index * 2.35;
  const beam = halfBeamAtHeight(z, .32);
  for (const side of [-1, 1]) {
    const gunPort = new THREE.Mesh(
      new THREE.BoxGeometry(0.13, 0.52, 0.62),
      materials.darkWood
    );
    gunPort.name = `${
      side < 0 ? "Port" : "Starboard"
    }_Gun_Port_${index + 3}`;
    gunPort.position.set(side * (beam + .035), 0.32, z);
    ship.add(gunPort);
    const prefix = `${side < 0 ? "Port" : "Starboard"}_Gun_${index + 3}`;
    for (const offset of [-.29, .29]) addBox(`${prefix}_Vertical_Frame_${offset}`, [.10, .57, .055], [side * (beam + .07), .32, z + offset], materials.hull);
    for (const offset of [-.26, .26]) addBox(`${prefix}_Horizontal_Frame_${offset}`, [.10, .055, .64], [side * (beam + .07), .32 + offset, z], materials.hull);
    const lid = new THREE.Group(); lid.name = `${prefix}_Hinged_Wood_Lid`; lid.position.set(side * (beam + .07), .60, z); lid.rotation.z = side * 1.1;
    const panel = new THREE.Mesh(new THREE.BoxGeometry(.055, .48, .58), materials.hull); panel.name = `${prefix}_Lid_Panel`; panel.position.y = -.24; lid.add(panel); ship.add(lid);
    addCylinderBetween(`${prefix}_Iron_Hinge`, new THREE.Vector3(side * (beam + .075), .60, z - .29), new THREE.Vector3(side * (beam + .075), .60, z + .29), .032, materials.iron, 6);
    const muzzle = new THREE.Mesh(new THREE.CircleGeometry(.089, 12), materials.iron); muzzle.name = `${prefix}_Dark_Muzzle`; muzzle.rotation.y = side * Math.PI / 2; muzzle.position.set(side * (beam + .31), .32, z); ship.add(muzzle);
  }
  addCylinderBetween(
    `Port_Cannon_${index + 3}`,
    new THREE.Vector3(-beam + .4, 0.32, z),
    new THREE.Vector3(-beam - .30, 0.32, z),
    0.13,
    materials.brass,
    10
  );
  addCylinderBetween(
    `Starboard_Cannon_${index + 3}`,
    new THREE.Vector3(beam - .4, 0.32, z),
    new THREE.Vector3(beam + .30, 0.32, z),
    0.13,
    materials.brass,
    10
  );
}

for (const [index, z] of [-5.1, -3.85].entries()) {
  const barrel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.46, 0.5, 0.96, 18, 3),
    materials.darkWood
  );
  barrel.name = `Deck_Barrel_${index + 1}`;
  barrel.position.set(index === 0 ? -1.75 : 1.65, 1.68, z);
  ship.add(barrel);
  for (const y of [-0.3, 0.3]) {
    const hoop = new THREE.Mesh(
      new THREE.TorusGeometry(0.49, 0.035, 7, 20),
      materials.brass
    );
    hoop.name = `Deck_Barrel_${index + 1}_Hoop_${y > 0 ? "Top" : "Bottom"}`;
    hoop.rotation.x = Math.PI / 2;
    hoop.position.set(barrel.position.x, barrel.position.y + y, z);
    ship.add(hoop);
  }
}

const capstan = new THREE.Mesh(
  new THREE.CylinderGeometry(0.34, 0.43, 1.1, 12),
  materials.darkWood
);
capstan.name = "Deck_Capstan";
capstan.position.set(0, 1.72, 1.65);
ship.add(capstan);
for (const angle of [0, Math.PI / 2]) {
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 2.2, 7),
    materials.darkWood
  );
  handle.name = `Capstan_Handle_${angle === 0 ? "Longitudinal" : "Lateral"}`;
  handle.position.set(0, 2.22, 1.65);
  handle.rotation.z = Math.PI / 2;
  handle.rotation.y = angle;
  ship.add(handle);
}

const helm = new THREE.Mesh(
  new THREE.TorusGeometry(0.62, 0.07, 8, 28),
  materials.darkWood
);
helm.name = "Ship_Helm";
helm.position.set(0, 2.45, -4.15);
ship.add(helm);
for (let index = 0; index < 8; index += 1) {
  const angle = (index / 8) * Math.PI * 2;
  addCylinderBetween(
    `Helm_Spoke_${index + 1}`,
    new THREE.Vector3(
      Math.cos(angle) * 0.12,
      2.45 + Math.sin(angle) * 0.12,
      -4.15
    ),
    new THREE.Vector3(
      Math.cos(angle) * 0.78,
      2.45 + Math.sin(angle) * 0.78,
      -4.15
    ),
    0.025,
    materials.darkWood,
    6
  );
}

const mastDefinitions = [
  { name: "Fore", z: 4.3, height: 14.5 },
  { name: "Main", z: -0.7, height: 18.5 },
  { name: "Mizzen", z: -5.4, height: 13.2 },
];

mastDefinitions.forEach(({ name, z, height }) => {
  addCylinderBetween(
    `${name}_Mast`,
    new THREE.Vector3(0, 1.45, z),
    new THREE.Vector3(0, height, z),
    0.19,
    materials.darkWood,
    10
  );

  if (name !== "Mizzen") {
    addSail(
      `${name}_Lower_Sail`,
      name === "Main" ? 12.8 : 11.2,
      5.35,
      0,
      z,
      11
    );
    addSail(
      `${name}_Upper_Sail`,
      name === "Main" ? 9.2 : 8,
      3.85,
      0,
      z,
      16
    );
  } else {
    addSail("Mizzen_Sail", 9, 5.25, 0, z, 10.2);
  }

  const nestY =
    name === "Main" ? 12.25 : name === "Fore" ? 10.45 : 8.85;
  addCrowsNest(`${name}_Crows_Nest`, z, nestY, name === "Main" ? 1.02 : 0.86);
  addRatlines(`${name}_Port`, z, nestY + 0.15, -1);
  addRatlines(`${name}_Starboard`, z, nestY + 0.15, 1);

  addCylinderBetween(
    `${name}_Port_Stay`,
    new THREE.Vector3(0, height - 0.4, z),
    new THREE.Vector3(-3.25, 1.7, z - 1.6),
    0.035,
    materials.rope,
    5
  );
  addCylinderBetween(
    `${name}_Starboard_Stay`,
    new THREE.Vector3(0, height - 0.4, z),
    new THREE.Vector3(3.25, 1.7, z - 1.6),
    0.035,
    materials.rope,
    5
  );
});

for (let index = 0; index < mastDefinitions.length - 1; index += 1) {
  const from = mastDefinitions[index];
  const to = mastDefinitions[index + 1];
  addCylinderBetween(
    `${from.name}_to_${to.name}_Top_Stay`,
    new THREE.Vector3(0, from.height - 0.55, from.z),
    new THREE.Vector3(0, to.height - 0.55, to.z),
    0.025,
    materials.rope,
    5
  );
  addCylinderBetween(
    `${from.name}_to_${to.name}_Mid_Stay`,
    new THREE.Vector3(0, from.height * 0.66, from.z),
    new THREE.Vector3(0, to.height * 0.66, to.z),
    0.018,
    materials.rope,
    4
  );
}

addCylinderBetween(
  "Foremast_Headstay",
  new THREE.Vector3(0, 14, 4.3),
  new THREE.Vector3(0, 3.95, 14.1),
  0.03,
  materials.rope,
  5
);
addCylinderBetween(
  "Mizzen_Backstay",
  new THREE.Vector3(0, 12.7, -5.4),
  new THREE.Vector3(0, 2.2, -9.35),
  0.028,
  materials.rope,
  5
);

addCylinderBetween(
  "Bowsprit",
  new THREE.Vector3(0, 2, 8.4),
  new THREE.Vector3(0, 4.2, 14.4),
  0.18,
  materials.darkWood,
  10
);

for (const x of [-2.8, 2.8]) {
  addCylinderBetween(
    x < 0 ? "Port_Main_Rigging" : "Starboard_Main_Rigging",
    new THREE.Vector3(0, 17.4, -0.7),
    new THREE.Vector3(x, 1.7, -5.3),
    0.04,
    materials.rope,
    5
  );
}

const flagColumns = 14;
const flagRows = 8;
const flagWidth = 2.9;
const flagHeight = 1.48;
const flagVertices = [];
const flagTrailDeltas = [];
const flagFlutterDeltas = [];
const flagUvs = [];
const flagIndices = [];
const tornEdge = [0.88, 0.98, 0.79, 0.94, 0.72, 1, 0.82, 0.95, 0.76];

for (let row = 0; row <= flagRows; row += 1) {
  const v = row / flagRows;
  for (let column = 0; column <= flagColumns; column += 1) {
    const u = column / flagColumns;
    const edgeScale = THREE.MathUtils.lerp(
      1,
      tornEdge[row],
      Math.pow(u, 7)
    );
    const restingX = u * flagWidth * 0.55 * edgeScale;
    const y = (v - 0.5) * flagHeight;
    const restingZ =
      -u * flagWidth * 0.18 * edgeScale +
      Math.sin(u * Math.PI * 1.8 + v * 0.8) * u * 0.025;
    const trailedX = u * flagWidth * 0.08 * edgeScale;
    const trailedZ = -u * flagWidth * 1.02 * edgeScale;
    const flutterEnvelope = u * Math.sin(v * Math.PI);
    const flutterWave = Math.sin(u * Math.PI * 3.7 + v * 1.7);

    flagVertices.push(restingX, y, restingZ);
    flagTrailDeltas.push(
      trailedX - restingX,
      0,
      trailedZ - restingZ
    );
    flagFlutterDeltas.push(
      flutterWave * flutterEnvelope * 0.32,
      Math.sin(u * Math.PI * 2.6 + v * 3.2) * flutterEnvelope * 0.055,
      flutterWave * flutterEnvelope * 0.11
    );
    flagUvs.push(u, v);
  }
}

const flagRowSize = flagColumns + 1;
for (let row = 0; row < flagRows; row += 1) {
  for (let column = 0; column < flagColumns; column += 1) {
    const a = row * flagRowSize + column;
    const b = a + 1;
    const d = (row + 1) * flagRowSize + column;
    const c = d + 1;
    flagIndices.push(a, b, d, b, c, d);
  }
}

const flagGeometry = new THREE.BufferGeometry();
flagGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(flagVertices, 3)
);
flagGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(flagUvs, 2));
flagGeometry.morphAttributes.position = [
  new THREE.Float32BufferAttribute(flagTrailDeltas, 3),
  new THREE.Float32BufferAttribute(flagFlutterDeltas, 3),
];
flagGeometry.morphTargetsRelative = true;
flagGeometry.setIndex(flagIndices);
flagGeometry.computeVertexNormals();
const flag = new THREE.Mesh(flagGeometry, materials.flag);
flag.name = "Small_Pirate_Flag";
flag.position.set(0, 17.45, -0.65);
flag.morphTargetInfluences = [0.18, 0.2];
flag.morphTargetDictionary = { Wind_Trail: 0, Wind_Flutter: 1 };
ship.add(flag);

ship.traverse((object) => {
  if (object instanceof THREE.Mesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});

const exporter = new GLTFExporter();
const binary = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  trs: false,
});

const destination = resolve("public/pirate-sailing-ship.glb");
await writeFile(destination, Buffer.from(binary));
process.stdout.write(`${destination}\n`);
