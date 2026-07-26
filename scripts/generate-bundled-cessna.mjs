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
    const context = {
      fillStyle: "#000000",
      translate() {},
      scale() {},
      fillRect: () => {
        const color =
          context.fillStyle === "#00ffff"
            ? [0, 255, 255, 255]
            : [0, 0, 0, 255];
        this.pixels = Buffer.alloc(this.width * this.height * 4);
        for (let index = 0; index < this.pixels.length; index += 4) {
          this.pixels[index] = color[0];
          this.pixels[index + 1] = color[1];
          this.pixels[index + 2] = color[2];
          this.pixels[index + 3] = color[3];
        }
      },
      drawImage: (image) => {
        const source = image?.data ?? image?.pixels;
        if (source) this.pixels = Buffer.from(source);
      },
      getImageData: () =>
        new NodeImageData(
          new Uint8ClampedArray(
            this.pixels ?? Buffer.alloc(this.width * this.height * 4, 255)
          ),
          this.width,
          this.height
        ),
      putImageData: (imageData) => {
        this.pixels = Buffer.from(imageData.data);
      },
    };
    return context;
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
globalThis.HTMLCanvasElement ??= NodeCanvas;
globalThis.document ??= {
  createElement: () => new NodeCanvas(),
  createElementNS: () => new NodeCanvas(),
};

const scene = new THREE.Scene();
scene.name = "Studierzimmer_Cessna";
const aircraft = new THREE.Group();
aircraft.name = "Cessna_Aircraft";
scene.add(aircraft);

function createSurfaceMap(name, size, pixelAt, colorSpace) {
  const data = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const pixel = pixelAt(x / size, y / size);
      const index = (y * size + x) * 4;
      data[index] = pixel[0];
      data[index + 1] = pixel[1];
      data[index + 2] = pixel[2];
      data[index + 3] = pixel[3] ?? 255;
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
  texture.colorSpace = colorSpace;
  texture.needsUpdate = true;
  return texture;
}

const panelHeight = (u, v) => {
  const seamU = Math.abs(((u * 5 + 0.5) % 1) - 0.5);
  const seamV = Math.abs(((v * 6 + 0.5) % 1) - 0.5);
  const seam =
    -Math.exp(-seamU * seamU * 1400) * 0.6 -
    Math.exp(-seamV * seamV * 1400) * 0.52;
  const rivetGridU = Math.abs(((u * 40 + 0.5) % 1) - 0.5);
  const rivetGridV = Math.abs(((v * 48 + 0.5) % 1) - 0.5);
  const rivet =
    Math.exp(-(rivetGridU ** 2 + rivetGridV ** 2) * 900) * 0.42;
  return seam + rivet + Math.sin(u * 110 + v * 17) * 0.018;
};

const surfaceNormal = createSurfaceMap(
  "Aircraft_Panel_Rivet_Normal",
  256,
  (u, v) => {
    const step = 1 / 256;
    const normal = new THREE.Vector3(
      (panelHeight(u - step, v) - panelHeight(u + step, v)) * 3.6,
      (panelHeight(u, v - step) - panelHeight(u, v + step)) * 3.6,
      1
    ).normalize();
    return [
      Math.round((normal.x * 0.5 + 0.5) * 255),
      Math.round((normal.y * 0.5 + 0.5) * 255),
      Math.round((normal.z * 0.5 + 0.5) * 255),
      255,
    ];
  },
  THREE.NoColorSpace
);
surfaceNormal.repeat.set(2, 2);

const surfaceRoughness = createSurfaceMap(
  "Aircraft_Paint_Roughness",
  192,
  (u, v) => {
    const subtle =
      118 +
      Math.sin(u * Math.PI * 37) * 7 +
      Math.sin(v * Math.PI * 29) * 5;
    const value = Math.round(THREE.MathUtils.clamp(subtle, 90, 145));
    return [value, value, value, 255];
  },
  THREE.NoColorSpace
);
surfaceRoughness.repeat.set(2, 2);

const materials = {
  white: new THREE.MeshPhysicalMaterial({
    name: "Aircraft_White_Paint",
    color: 0xf4f5f2,
    roughness: 0.3,
    metalness: 0.08,
    clearcoat: 0.72,
    clearcoatRoughness: 0.2,
    normalMap: surfaceNormal,
    normalScale: new THREE.Vector2(0.32, 0.32),
    roughnessMap: surfaceRoughness,
  }),
  red: new THREE.MeshPhysicalMaterial({
    name: "Aircraft_Red_Accent",
    color: 0x9f1e1b,
    roughness: 0.32,
    metalness: 0.08,
    clearcoat: 0.68,
    normalMap: surfaceNormal,
    normalScale: new THREE.Vector2(0.26, 0.26),
    roughnessMap: surfaceRoughness,
  }),
  dark: new THREE.MeshStandardMaterial({
    name: "Aircraft_Dark_Details",
    color: 0x17191b,
    roughness: 0.48,
    metalness: 0.35,
  }),
  glass: new THREE.MeshPhysicalMaterial({
    name: "Cockpit_Glass",
    color: 0x263944,
    roughness: 0.08,
    metalness: 0.02,
    transmission: 0.3,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide,
  }),
  rubber: new THREE.MeshStandardMaterial({
    name: "Landing_Gear_Rubber",
    color: 0x111111,
    roughness: 0.92,
  }),
  metal: new THREE.MeshStandardMaterial({
    name: "Aircraft_Brushed_Metal",
    color: 0x92999d,
    roughness: 0.3,
    metalness: 0.82,
  }),
  lightRed: new THREE.MeshStandardMaterial({
    name: "Navigation_Light_Red",
    color: 0xff2a20,
    emissive: 0xff1a12,
    emissiveIntensity: 1.5,
  }),
  lightGreen: new THREE.MeshStandardMaterial({
    name: "Navigation_Light_Green",
    color: 0x25ff7b,
    emissive: 0x13db62,
    emissiveIntensity: 1.5,
  }),
  propellerBlur: new THREE.MeshBasicMaterial({
    name: "Propeller_Motion_Blur",
    color: 0x1b1d1f,
    transparent: true,
    opacity: 0.075,
    depthWrite: false,
    side: THREE.DoubleSide,
  }),
};

function fuselageGeometry() {
  const radialSegments = 24;
  const stations = [
    { z: -7.7, width: 0.12, height: 0.16, y: 0.25 },
    { z: -6.9, width: 0.54, height: 0.65, y: 0.2 },
    { z: -5.2, width: 0.84, height: 0.82, y: 0.15 },
    { z: -3.2, width: 1.16, height: 1.18, y: 0.1 },
    { z: -0.8, width: 1.44, height: 1.5, y: 0.05 },
    { z: 1.6, width: 1.46, height: 1.55, y: 0 },
    { z: 3.8, width: 1.28, height: 1.35, y: -0.02 },
    { z: 5.7, width: 0.98, height: 1.02, y: -0.05 },
    { z: 7, width: 0.58, height: 0.62, y: -0.02 },
    { z: 7.65, width: 0.16, height: 0.18, y: 0 },
  ];
  const positions = [];
  const uvs = [];
  const indices = [];

  stations.forEach((station, stationIndex) => {
    for (let index = 0; index < radialSegments; index += 1) {
      const angle = (index / radialSegments) * Math.PI * 2;
      positions.push(
        Math.cos(angle) * station.width,
        station.y + Math.sin(angle) * station.height,
        station.z
      );
      uvs.push(
        stationIndex / (stations.length - 1),
        index / radialSegments
      );
    }
  });

  for (let station = 0; station < stations.length - 1; station += 1) {
    for (let index = 0; index < radialSegments; index += 1) {
      const next = (index + 1) % radialSegments;
      const a = station * radialSegments + index;
      const b = station * radialSegments + next;
      const d = (station + 1) * radialSegments + index;
      const c = (station + 1) * radialSegments + next;
      indices.push(a, b, d, b, c, d);
    }
  }

  const rearCenter = positions.length / 3;
  positions.push(0, stations[0].y, stations[0].z);
  uvs.push(0, 0.5);
  const frontCenter = positions.length / 3;
  const frontStation = stations[stations.length - 1];
  positions.push(0, frontStation.y, frontStation.z);
  uvs.push(1, 0.5);
  for (let index = 0; index < radialSegments; index += 1) {
    const next = (index + 1) % radialSegments;
    indices.push(rearCenter, next, index);
    const frontOffset = (stations.length - 1) * radialSegments;
    indices.push(
      frontCenter,
      frontOffset + index,
      frontOffset + next
    );
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function extrudedPlanform(name, points, thickness, y, material) {
  const shape = new THREE.Shape();
  shape.moveTo(points[0][0], points[0][1]);
  points.slice(1).forEach(([x, z]) => shape.lineTo(x, z));
  shape.closePath();
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 2,
    bevelSize: 0.055,
    bevelThickness: 0.04,
  });
  geometry.rotateX(Math.PI / 2);
  geometry.computeVertexNormals();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.position.y = y + thickness * 0.5;
  aircraft.add(mesh);
  return mesh;
}

function addCylinderBetween(name, start, end, radius, material, segments = 10) {
  const direction = end.clone().sub(start);
  const mesh = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius, direction.length(), segments),
    material
  );
  mesh.name = name;
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    direction.normalize()
  );
  aircraft.add(mesh);
  return mesh;
}

const fuselage = new THREE.Mesh(fuselageGeometry(), materials.white);
fuselage.name = "Closed_Fuselage";
aircraft.add(fuselage);

const forwardWindscreen = new THREE.Mesh(
  new THREE.BoxGeometry(1.85, 0.86, 0.08),
  materials.glass
);
forwardWindscreen.name = "Forward_Windscreen";
forwardWindscreen.position.set(0, 0.65, 2.58);
forwardWindscreen.rotation.x = -0.16;
aircraft.add(forwardWindscreen);

extrudedPlanform(
  "Main_Wing",
  [
    [-9.2, 1.3],
    [-1.1, 2.1],
    [1.1, 2.1],
    [9.2, 1.3],
    [8.35, -1.15],
    [1.1, -0.35],
    [-1.1, -0.35],
    [-8.35, -1.15],
  ],
  0.24,
  1.3,
  materials.white
);

for (const side of [-1, 1]) {
  const flap = new THREE.Mesh(
    new THREE.BoxGeometry(3.1, 0.12, 0.72),
    materials.white
  );
  flap.name = `${side < 0 ? "Port" : "Starboard"}_Flap`;
  flap.position.set(side * 2.8, 1.36, -0.72);
  flap.rotation.y = side * 0.018;
  aircraft.add(flap);

  const aileron = new THREE.Mesh(
    new THREE.BoxGeometry(3.25, 0.1, 0.62),
    materials.white
  );
  aileron.name = `${side < 0 ? "Port" : "Starboard"}_Aileron`;
  aileron.position.set(side * 6.45, 1.34, -0.84);
  aileron.rotation.y = side * 0.035;
  aircraft.add(aileron);

  const controlSeam = new THREE.Mesh(
    new THREE.BoxGeometry(7.05, 0.035, 0.055),
    materials.dark
  );
  controlSeam.name = `${
    side < 0 ? "Port" : "Starboard"
  }_Trailing_Edge_Seam`;
  controlSeam.position.set(side * 4.8, 1.43, -1.05);
  aircraft.add(controlSeam);
}

extrudedPlanform(
  "Tailplane",
  [
    [-3.55, -5.2],
    [-0.35, -4.2],
    [0.35, -4.2],
    [3.55, -5.2],
    [3.05, -6.35],
    [0.35, -5.85],
    [-0.35, -5.85],
    [-3.05, -6.35],
  ],
  0.15,
  0.5,
  materials.white
);

const finShape = new THREE.Shape();
finShape.moveTo(-6.7, 0);
finShape.lineTo(-3.55, 0.15);
finShape.lineTo(-5.15, 3.05);
finShape.lineTo(-6.7, 2.25);
finShape.closePath();
const finGeometry = new THREE.ExtrudeGeometry(finShape, {
  depth: 0.16,
  bevelEnabled: true,
  bevelSize: 0.035,
  bevelThickness: 0.025,
});
finGeometry.rotateY(-Math.PI / 2);
const fin = new THREE.Mesh(finGeometry, materials.white);
fin.name = "Vertical_Stabilizer";
fin.position.x = 0.08;
fin.position.y = 0.25;
aircraft.add(fin);

for (const side of [-1, 1]) {
  const window = new THREE.Mesh(
    new THREE.BoxGeometry(1.48, 0.88, 1.7),
    materials.glass
  );
  window.name = `${side < 0 ? "Port" : "Starboard"}_Cockpit_Window`;
  window.position.set(side * 1.03, 0.62, 1.65);
  aircraft.add(window);

  const doorLine = new THREE.Mesh(
    new THREE.BoxGeometry(0.035, 1.25, 1.9),
    materials.red
  );
  doorLine.name = `${side < 0 ? "Port" : "Starboard"}_Livery_Stripe`;
  doorLine.position.set(side * 1.34, -0.2, 0);
  aircraft.add(doorLine);

  addCylinderBetween(
    `${side < 0 ? "Port" : "Starboard"}_Wing_Strut`,
    new THREE.Vector3(side * 1.1, -0.45, 0.75),
    new THREE.Vector3(side * 5.9, 1.27, 0.2),
    0.075,
    materials.metal,
    8
  );

  addCylinderBetween(
    `${side < 0 ? "Port" : "Starboard"}_Landing_Strut`,
    new THREE.Vector3(side * 0.82, -0.82, 1.2),
    new THREE.Vector3(side * 2.05, -2.05, 0.7),
    0.075,
    materials.metal,
    8
  );

  const wheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.52, 0.52, 0.25, 24),
    materials.rubber
  );
  wheel.name = `${side < 0 ? "Port" : "Starboard"}_Main_Wheel`;
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(side * 2.1, -2.1, 0.72);
  aircraft.add(wheel);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18, 0.18, 0.28, 18),
    materials.metal
  );
  hub.name = `${wheel.name}_Hub`;
  hub.rotation.z = Math.PI / 2;
  hub.position.copy(wheel.position);
  aircraft.add(hub);
}

addCylinderBetween(
  "Nose_Gear_Strut",
  new THREE.Vector3(0, -0.45, 5.3),
  new THREE.Vector3(0, -1.65, 5.65),
  0.07,
  materials.metal,
  8
);
const noseWheel = new THREE.Mesh(
  new THREE.CylinderGeometry(0.34, 0.34, 0.2, 20),
  materials.rubber
);
noseWheel.name = "Nose_Wheel";
noseWheel.rotation.z = Math.PI / 2;
noseWheel.position.set(0, -1.72, 5.68);
aircraft.add(noseWheel);

const cowling = new THREE.Mesh(
  new THREE.CylinderGeometry(0.76, 1.02, 1.6, 28),
  materials.red
);
cowling.name = "Engine_Cowling";
cowling.rotation.x = Math.PI / 2;
cowling.position.set(0, -0.02, 6.8);
aircraft.add(cowling);

for (const x of [-0.42, 0.42]) {
  const intake = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.16, 0.3, 4, 12),
    materials.dark
  );
  intake.name = x < 0 ? "Port_Engine_Intake" : "Starboard_Engine_Intake";
  intake.rotation.x = Math.PI / 2;
  intake.position.set(x, -0.37, 7.45);
  aircraft.add(intake);
}

addCylinderBetween(
  "Engine_Exhaust",
  new THREE.Vector3(-0.72, -0.55, 6.5),
  new THREE.Vector3(-0.82, -0.74, 6.05),
  0.09,
  materials.dark,
  10
);

const propeller = new THREE.Group();
propeller.name = "Propeller_Rotor";
propeller.position.set(0, 0, 7.72);
aircraft.add(propeller);

const spinner = new THREE.Mesh(
  new THREE.ConeGeometry(0.42, 0.82, 24),
  materials.metal
);
spinner.name = "Propeller_Spinner";
spinner.rotation.x = Math.PI / 2;
spinner.position.z = 0.18;
propeller.add(spinner);

const propellerBlur = new THREE.Mesh(
  new THREE.CircleGeometry(3.55, 48),
  materials.propellerBlur
);
propellerBlur.name = "Propeller_Blur_Disc";
propellerBlur.position.z = -0.025;
propeller.add(propellerBlur);

for (let bladeIndex = 0; bladeIndex < 3; bladeIndex += 1) {
  const angle = (bladeIndex / 3) * Math.PI * 2;
  const blade = new THREE.Mesh(
    new THREE.BoxGeometry(0.24, 2.55, 0.09, 2, 8, 1),
    materials.dark
  );
  blade.name = `Propeller_Blade_${bladeIndex + 1}`;
  blade.position.set(
    Math.sin(angle) * 1.18,
    Math.cos(angle) * 1.18,
    0
  );
  blade.rotation.z = -angle;
  propeller.add(blade);
}

const navigationLights = [];
for (const [x, material, name] of [
  [-9.12, materials.lightRed, "Port"],
  [9.12, materials.lightGreen, "Starboard"],
]) {
  const light = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 12, 8),
    material
  );
  light.name = `${name}_Navigation_Light`;
  light.position.set(x, 1.3, 1.25);
  aircraft.add(light);
  navigationLights.push(light);
}

const tailStripe = new THREE.Mesh(
  new THREE.BoxGeometry(1.45, 0.13, 2.4),
  materials.red
);
tailStripe.name = "Tail_Livery_Stripe";
tailStripe.position.set(0, 0.28, -5);
aircraft.add(tailStripe);

addCylinderBetween(
  "Roof_Antenna",
  new THREE.Vector3(0, 1.47, -0.35),
  new THREE.Vector3(0, 2.45, -0.7),
  0.035,
  materials.dark,
  7
);

for (const z of [-3.4, -1.7, 0.2, 2.15, 4.05]) {
  const panelBand = new THREE.Mesh(
    new THREE.TorusGeometry(
      Math.max(0.38, 1.35 - Math.abs(z - 0.3) * 0.11),
      0.014,
      5,
      32
    ),
    materials.dark
  );
  panelBand.name = `Fuselage_Panel_Band_${String(z).replace(".", "_")}`;
  panelBand.position.set(0, 0.02, z);
  aircraft.add(panelBand);
}

aircraft.traverse((object) => {
  if (object instanceof THREE.Mesh) {
    object.castShadow = true;
    object.receiveShadow = true;
  }
});

const times = [0, 0.045, 0.09, 0.135, 0.18];
const quaternionValues = [];
for (let index = 0; index < times.length; index += 1) {
  const angle = (index / (times.length - 1)) * Math.PI * 2;
  const quaternion = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(0, 0, 1),
    angle
  );
  quaternionValues.push(
    quaternion.x,
    quaternion.y,
    quaternion.z,
    quaternion.w
  );
}
const propellerTrack = new THREE.QuaternionKeyframeTrack(
  "Propeller_Rotor.quaternion",
  times,
  quaternionValues
);
const propellerClip = new THREE.AnimationClip(
  "Engine_Propeller_Loop",
  0.18,
  [propellerTrack]
);

const blinkTimes = [0, 0.6, 0.9];
const blinkTracks = navigationLights.map((light) => {
  return new THREE.VectorKeyframeTrack(
    `${light.name}.scale`,
    blinkTimes,
    [1, 0, 0].flatMap((value) => [value, value, value]),
    THREE.InterpolateDiscrete
  );
});
const navigationLightClip = new THREE.AnimationClip(
  "Navigation_Lights_Loop",
  0.9,
  blinkTracks
);

const exporter = new GLTFExporter();
const binary = await exporter.parseAsync(scene, {
  binary: true,
  onlyVisible: true,
  trs: false,
  animations: [propellerClip, navigationLightClip],
});
const modelDestination = resolve("public/cessna-aircraft.glb");
await writeFile(modelDestination, Buffer.from(binary));

const sampleRate = 22050;
const duration = 4;
const samples = sampleRate * duration;
const pcm = Buffer.alloc(samples * 2);
for (let index = 0; index < samples; index += 1) {
  const time = index / sampleRate;
  const modulation = 0.84 + Math.sin(time * Math.PI * 2 * 9) * 0.1;
  const signal =
    Math.sin(time * Math.PI * 2 * 76) * 0.42 +
    Math.sin(time * Math.PI * 2 * 152) * 0.22 +
    Math.sin(time * Math.PI * 2 * 228) * 0.12 +
    Math.sin(time * Math.PI * 2 * 456) * 0.055 +
    Math.sin(time * Math.PI * 2 * 613) * 0.028;
  pcm.writeInt16LE(
    Math.round(THREE.MathUtils.clamp(signal * modulation, -1, 1) * 22000),
    index * 2
  );
}

const wavHeader = Buffer.alloc(44);
wavHeader.write("RIFF", 0);
wavHeader.writeUInt32LE(36 + pcm.length, 4);
wavHeader.write("WAVE", 8);
wavHeader.write("fmt ", 12);
wavHeader.writeUInt32LE(16, 16);
wavHeader.writeUInt16LE(1, 20);
wavHeader.writeUInt16LE(1, 22);
wavHeader.writeUInt32LE(sampleRate, 24);
wavHeader.writeUInt32LE(sampleRate * 2, 28);
wavHeader.writeUInt16LE(2, 32);
wavHeader.writeUInt16LE(16, 34);
wavHeader.write("data", 36);
wavHeader.writeUInt32LE(pcm.length, 40);
const soundDestination = resolve("public/cessna-engine.wav");
await writeFile(soundDestination, Buffer.concat([wavHeader, pcm]));

process.stdout.write(`${modelDestination}\n${soundDestination}\n`);
