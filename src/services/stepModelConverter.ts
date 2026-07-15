import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshStandardMaterial,
  Uint32BufferAttribute,
  type Material,
} from "three";
import { GLTFExporter } from "three-stdlib";

export interface ModelProcessingProgress {
  percent: number;
  label: string;
}

export type ModelProcessingCallback = (
  progress: ModelProcessingProgress
) => void;

interface OcctAttribute {
  array: ArrayLike<number>;
}

interface OcctFace {
  first: number;
  last: number;
  color: [number, number, number] | null;
}

interface OcctMesh {
  name?: string;
  color?: [number, number, number];
  attributes: {
    position: OcctAttribute;
    normal?: OcctAttribute;
  };
  index: OcctAttribute;
  brep_faces?: OcctFace[];
}

interface OcctImportResult {
  success: boolean;
  meshes?: OcctMesh[];
}

const DEFAULT_STEP_COLOR: [number, number, number] = [0.78, 0.78, 0.75];

function clampColorChannel(value: number): number {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0.8));
}

function colorKey(color: [number, number, number]): string {
  return color.map((channel) => clampColorChannel(channel).toFixed(5)).join(":");
}

function createCadMaterial(color: [number, number, number]): MeshStandardMaterial {
  const materialColor = new Color().setRGB(
    clampColorChannel(color[0]),
    clampColorChannel(color[1]),
    clampColorChannel(color[2])
  );

  return new MeshStandardMaterial({
    color: materialColor,
    roughness: 0.58,
    metalness: 0,
  });
}

function buildMesh(source: OcctMesh, meshIndex: number): Mesh {
  const bufferGeometry = new BufferGeometry();
  bufferGeometry.setAttribute(
    "position",
    new Float32BufferAttribute(Array.from(source.attributes.position.array), 3)
  );

  if (source.attributes.normal) {
    bufferGeometry.setAttribute(
      "normal",
      new Float32BufferAttribute(Array.from(source.attributes.normal.array), 3)
    );
  } else {
    bufferGeometry.computeVertexNormals();
  }

  bufferGeometry.setIndex(
    new Uint32BufferAttribute(Array.from(source.index.array), 1)
  );
  bufferGeometry.name = source.name || `STEP mesh ${meshIndex + 1}`;

  const baseColor = source.color ?? DEFAULT_STEP_COLOR;
  const materials: MeshStandardMaterial[] = [createCadMaterial(baseColor)];
  const materialIndices = new Map<string, number>([[colorKey(baseColor), 0]]);

  const materialIndexFor = (faceColor: OcctFace["color"]): number => {
    if (!faceColor) return 0;

    const key = colorKey(faceColor);
    const existing = materialIndices.get(key);
    if (existing !== undefined) return existing;

    const nextIndex = materials.length;
    materials.push(createCadMaterial(faceColor));
    materialIndices.set(key, nextIndex);
    return nextIndex;
  };

  const triangleCount = Math.floor(source.index.array.length / 3);
  const faces = [...(source.brep_faces ?? [])].sort(
    (left, right) => left.first - right.first
  );

  if (faces.length > 0) {
    let nextTriangle = 0;

    faces.forEach((face) => {
      const first = Math.max(nextTriangle, Math.min(triangleCount, face.first));
      const lastExclusive = Math.max(
        first,
        Math.min(triangleCount, face.last + 1)
      );

      if (first > nextTriangle) {
        bufferGeometry.addGroup(nextTriangle * 3, (first - nextTriangle) * 3, 0);
      }

      if (lastExclusive > first) {
        bufferGeometry.addGroup(
          first * 3,
          (lastExclusive - first) * 3,
          materialIndexFor(face.color)
        );
      }

      nextTriangle = Math.max(nextTriangle, lastExclusive);
    });

    if (nextTriangle < triangleCount) {
      bufferGeometry.addGroup(
        nextTriangle * 3,
        (triangleCount - nextTriangle) * 3,
        0
      );
    }
  }

  const mesh = new Mesh(
    bufferGeometry,
    materials.length === 1 ? materials[0] : materials
  );
  mesh.name = source.name || `STEP mesh ${meshIndex + 1}`;
  return mesh;
}

function readStepInWorker(file: File): Promise<OcctImportResult> {
  return file.arrayBuffer().then(
    (buffer) =>
      new Promise<OcctImportResult>((resolve, reject) => {
        const workerUrl = new URL(
          `${import.meta.env.BASE_URL}occt-import-js/occt-import-js-worker.js`,
          window.location.href
        );
        const worker = new Worker(workerUrl);

        worker.onmessage = (event: MessageEvent<OcctImportResult>) => {
          worker.terminate();
          resolve(event.data);
        };
        worker.onerror = (event) => {
          worker.terminate();
          reject(new Error(event.message || "OpenCascade could not read this STEP file."));
        };

        const bytes = new Uint8Array(buffer);
        worker.postMessage(
          {
            format: "step",
            buffer: bytes,
            params: {
              linearUnit: "millimeter",
              linearDeflectionType: "bounding_box_ratio",
              linearDeflection: 0.001,
              angularDeflection: 0.35,
            },
          },
          [bytes.buffer]
        );
      })
  );
}

export function isStepFile(file: File): boolean {
  return /\.(?:step|stp)$/i.test(file.name);
}

export async function convertStepToGlb(
  file: File,
  onProgress?: ModelProcessingCallback
): Promise<File> {
  onProgress?.({ percent: 8, label: "READING STEP" });
  const result = await readStepInWorker(file);

  if (!result.success || !result.meshes?.length) {
    throw new Error("OpenCascade could not find any displayable geometry in this STEP file.");
  }

  onProgress?.({ percent: 62, label: "BUILDING CAD MESH" });
  const modelGroup = new Group();
  modelGroup.name = file.name.replace(/\.(?:step|stp)$/i, "");
  result.meshes.forEach((mesh, index) => modelGroup.add(buildMesh(mesh, index)));

  // STEP commonly uses Z-up; the public Three.js viewer uses Y-up.
  modelGroup.rotation.x = -Math.PI / 2;
  modelGroup.updateMatrixWorld(true);

  onProgress?.({ percent: 76, label: "EXPORTING GLB PREVIEW" });

  try {
    const exported = await new GLTFExporter().parseAsync(modelGroup, {
      binary: true,
      onlyVisible: true,
    });

    if (!(exported instanceof ArrayBuffer)) {
      throw new Error("The STEP preview was not exported as a binary GLB.");
    }

    const previewName = file.name.replace(/\.(?:step|stp)$/i, "") + ".glb";
    onProgress?.({ percent: 82, label: "GLB PREVIEW READY" });
    return new File([exported], previewName, { type: "model/gltf-binary" });
  } finally {
    modelGroup.traverse((object) => {
      if (!(object instanceof Mesh)) return;
      object.geometry.dispose();
      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];
      materials.forEach((material: Material) => material.dispose());
    });
  }
}
