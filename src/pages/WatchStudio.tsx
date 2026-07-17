import React, {
  Component,
  ReactNode,
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  EffectComposer,
  HueSaturation,
  N8AO,
} from "@react-three/postprocessing";
import {
  ContactShadows,
  Environment,
  Html,
  OrbitControls,
  useEnvironment,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import {
  BackSide,
  AnimationMixer,
  Box3,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  LoopRepeat,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MOUSE,
  Sphere,
  TOUCH,
  Vector3,
} from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { SkeletonUtils, STLLoader } from "three-stdlib";
import AdminThreeDModelManager from "@/components/admin/AdminThreeDModelManager";
import { useAdminSession } from "@/hooks/useAdminSession";
import { listPublishedThreeDModels } from "@/services/threeDModelRepository";
import type { ThreeDModel } from "@/types/threeDModels";

interface WatchStudioProps {
  onBack: () => void;
}

const DEFAULT_WATCH_URL = `${import.meta.env.BASE_URL}models/watch-v1.glb`;
const STUDIO_ENVIRONMENT_URL = `${import.meta.env.BASE_URL}studio.hdr`;
const MODEL_DISPLAY_RADIUS = 1.8;
const CAMERA_POSITION: [number, number, number] = [0, 0, 8];
const DEFAULT_STL_PLASTER_COLOR = "#EEEAE1";

type RenderMode = "pbr" | "arctic" | "pen";
type ModelMotion = "outside" | "entering" | "visible" | "leaving";

const MODEL_SHRINK_DURATION = 700;
const MODEL_GROW_DURATION = 940;
const MODEL_CATALOG_CACHE_DURATION = 12 * 60 * 1000;

const RENDER_MODES: Array<{ id: RenderMode; label: string }> = [
  { id: "pbr", label: "PBR" },
  { id: "arctic", label: "ARCTIC" },
  { id: "pen", label: "PEN" },
];

const RENDER_BACKGROUNDS: Record<RenderMode, string> = {
  pbr: "#ffffff",
  arctic: "#ffffff",
  pen: "#ffffff",
};

const DEFAULT_MODEL: ThreeDModel = {
  id: "local-watch-fallback",
  name: "Tag Heuer Monaco x Gulf",
  description: "Built-in local watch model",
  file_name: "watch-v1.glb",
  storage_path: "models/watch-v1.glb",
  source_file_name: null,
  source_storage_path: null,
  source_format: null,
  hdri_file_name: null,
  hdri_storage_path: null,
  is_published: true,
  is_featured: true,
  sort_order: 0,
  plaster_color: DEFAULT_STL_PLASTER_COLOR,
  created_at: "",
  updated_at: "",
  public_url: DEFAULT_WATCH_URL,
  hdri_public_url: null,
};

let publicModelCatalogCache: {
  expiresAt: number;
  models: ThreeDModel[];
} | null = null;
let publicModelCatalogRequest: Promise<ThreeDModel[]> | null = null;

async function loadPublicModelCatalog(
  forceRefresh = false
): Promise<ThreeDModel[]> {
  const now = Date.now();

  if (forceRefresh) {
    publicModelCatalogCache = null;
    publicModelCatalogRequest = null;
  } else if (
    publicModelCatalogCache &&
    publicModelCatalogCache.expiresAt > now
  ) {
    return publicModelCatalogCache.models;
  } else if (publicModelCatalogRequest) {
    return publicModelCatalogRequest;
  }

  const request = listPublishedThreeDModels().then((models) => {
    publicModelCatalogCache = {
      expiresAt: Date.now() + MODEL_CATALOG_CACHE_DURATION,
      models,
    };

    return models;
  });

  publicModelCatalogRequest = request;

  try {
    return await request;
  } finally {
    if (publicModelCatalogRequest === request) {
      publicModelCatalogRequest = null;
    }
  }
}

function availableModels(remoteModels: ThreeDModel[]): ThreeDModel[] {
  return remoteModels.length > 0 ? remoteModels : [DEFAULT_MODEL];
}

const watchStudioStyles = `
.watch-studio {
  opacity: 0;
  filter: blur(24px);
  transition:
    opacity 900ms ease,
    filter 1100ms cubic-bezier(0.22, 1, 0.36, 1),
    background-color 760ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-studio.is-visible {
  opacity: 1;
  filter: blur(0);
}

.watch-studio.is-leaving {
  opacity: 0;
  filter: blur(24px);
  pointer-events: none;
}

.watch-studio-canvas {
  touch-action: none;
}

.watch-studio-piece {
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}

.watch-studio-piece.is-outside {
  transform: scale(0);
  opacity: 0;
  pointer-events: none;
}

.watch-studio-piece.is-entering {
  animation: elastic-center-scale 900ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
  animation-delay: var(--watch-delay, 0ms);
}

.watch-studio-piece.is-visible {
  transform: scale(1);
  opacity: 1;
}

.watch-studio-piece.is-leaving {
  animation: elastic-center-scale 760ms cubic-bezier(0.22, 0.88, 0.3, 1) reverse both;
  animation-delay: var(--watch-exit-delay, 0ms);
}

.watch-model-stage {
  transform-origin: 50% 50%;
  will-change: transform, opacity, filter;
  backface-visibility: hidden;
}

.watch-model-stage.is-outside {
  transform: scale(1);
  opacity: 0;
  pointer-events: none;
}

.watch-model-stage.is-entering {
  animation: elastic-center-scale 940ms cubic-bezier(0.22, 0.88, 0.3, 1) both;
}

.watch-model-stage.is-visible {
  transform: scale(1);
  opacity: 1;
}

.watch-model-stage.is-leaving {
  animation: elastic-center-scale 700ms cubic-bezier(0.22, 0.88, 0.3, 1) reverse both;
  pointer-events: none;
}

.watch-model-balloon {
  transform: scale(0);
  transform-origin: 36px 0;
  opacity: 0;
  filter: blur(10px);
  pointer-events: none;
  transition:
    transform 520ms cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 300ms ease,
    filter 420ms ease;
}

.watch-model-balloon.is-open {
  transform: scale(1);
  opacity: 1;
  filter: blur(0);
  pointer-events: auto;
}

.watch-model-list-item {
  transform-origin: 50% 50%;
  transform: scale(0);
  opacity: 0;
  transition:
    transform 520ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 260ms ease;
  transition-delay: calc(var(--model-index, 0) * 45ms);
}

.watch-model-balloon.is-open .watch-model-list-item {
  transform: scale(1);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .watch-studio,
  .watch-studio-piece,
  .watch-model-stage,
  .watch-model-balloon,
  .watch-model-list-item {
    transition-duration: 1ms;
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
  }
}
`;

function LoadingModel({ label = "..." }: { label?: string }) {
  return (
    <Html center>
      <div className="whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-[11px] tracking-[0.16em] text-black/55 backdrop-blur-md">
        {label}
      </div>
    </Html>
  );
}

function ModelLoadingOverlay({
  catalogReady,
  geometryReady,
  complete,
  onCompleted,
}: {
  catalogReady: boolean;
  geometryReady: boolean;
  complete: boolean;
  onCompleted: () => void;
}) {
  const { active, progress } = useProgress();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const completedRef = useRef(false);

  useEffect(() => {
    const target = complete
      ? 100
      : !catalogReady
        ? 8
        : active
          ? Math.min(92, 12 + progress * 0.8)
          : geometryReady
            ? 97
            : 88;
    let animationFrame = 0;
    let cancelled = false;

    const advance = () => {
      setDisplayedProgress((current) => {
        const nonRegressiveTarget = Math.max(current, target);
        const difference = nonRegressiveTarget - current;

        if (Math.abs(difference) < 0.05) return nonRegressiveTarget;

        return Math.min(
          complete ? 100 : 99,
          current +
            Math.max(
              complete ? 0.35 : 0.08,
              difference * (complete ? 0.28 : 0.12)
            )
        );
      });

      if (!cancelled) animationFrame = window.requestAnimationFrame(advance);
    };

    animationFrame = window.requestAnimationFrame(advance);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
    };
  }, [active, catalogReady, complete, geometryReady, progress]);

  useEffect(() => {
    if (!complete || displayedProgress < 100 || completedRef.current) return;

    completedRef.current = true;
    onCompleted();

    const fadeTimeout = window.setTimeout(() => setExiting(true), 120);
    const hideTimeout = window.setTimeout(() => setVisible(false), 680);

    return () => {
      window.clearTimeout(fadeTimeout);
      window.clearTimeout(hideTimeout);
    };
  }, [complete, displayedProgress, onCompleted]);

  if (!visible) return null;

  const roundedProgress = Math.min(100, Math.max(0, Math.round(displayedProgress)));

  return (
    <div
      data-model-loading-overlay="true"
      className={`pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-white px-8 transition-opacity duration-500 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-[260px] bg-white px-5 py-4 text-black">
        <div className="mb-3 flex items-center justify-between text-[10px] tracking-[0.14em]">
          <span>...</span>
          <span className="tabular-nums">{roundedProgress}%</span>
        </div>
        <div
          className="h-[3px] w-full overflow-hidden bg-black/10"
          role="progressbar"
          aria-label="Loading 3D model"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={roundedProgress}
        >
          <div
            className="h-full origin-left bg-black transition-[width] duration-150 ease-out"
            style={{ width: `${displayedProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

class ModelErrorBoundary extends Component<
  { children: ReactNode; resetKey: string; onError?: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  componentDidUpdate(previous: { resetKey: string }) {
    if (previous.resetKey !== this.props.resetKey && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    return this.state.failed ? (
      <LoadingModel label="MODEL COULD NOT LOAD" />
    ) : (
      this.props.children
    );
  }
}

function createOverrideMaterial(mode: Exclude<RenderMode, "pbr">): Material {
  if (mode === "pen") {
    return new MeshBasicMaterial({
      color: "#ffffff",
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });
  }

  return new MeshPhysicalMaterial({
    color: "#ffffff",
    roughness: 0.68,
    metalness: 0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.58,
    sheen: 0.06,
    sheenColor: "#ffffff",
    envMapIntensity: 0,
  });
}

function clonePbrMaterial(material: Material) {
  const clone = material.clone();

  if (clone instanceof MeshStandardMaterial) {
    clone.envMapIntensity = 1.45;
  }

  clone.needsUpdate = true;
  return clone;
}

function isStlModel(model: ThreeDModel): boolean {
  return /\.stl$/i.test(model.file_name) || /\.stl$/i.test(model.storage_path);
}

function environmentUrlFor(model: ThreeDModel): string {
  const signedUrl = model.hdri_public_url;

  if (!signedUrl) return STUDIO_ENVIRONMENT_URL;

  const sourceName =
    model.hdri_file_name ??
    model.hdri_storage_path ??
    signedUrl.split("?", 1)[0];
  const extension = sourceName.match(/\.(hdr|exr)$/i)?.[1]?.toLowerCase();

  // Drei infers the loader from the last dot in the complete URL. Supabase
  // signed tokens contain dots of their own, so provide a harmless fragment
  // with the real extension. URL fragments are not sent to storage.
  return extension ? `${signedUrl}#environment.${extension}` : signedUrl;
}

function preloadThreeDModelAssets(model: ThreeDModel): void {
  if (isStlModel(model)) {
    useLoader.preload(STLLoader, model.public_url);
  } else {
    useGLTF.preload(model.public_url);
  }

  useEnvironment.preload({ files: environmentUrlFor(model) });
}

export async function preloadWatchStudioExperience(): Promise<void> {
  try {
    const models = availableModels(await loadPublicModelCatalog());
    const featuredModel =
      models.find((model) => model.is_featured) ?? models[0];

    preloadThreeDModelAssets(featuredModel);
  } catch {
    preloadThreeDModelAssets(DEFAULT_MODEL);
  }
}

function createStlMaterial(mode: RenderMode, plasterColor: string): Material {
  if (mode !== "pbr") return createOverrideMaterial(mode);

  return new MeshPhysicalMaterial({
    color: /^#[\dA-F]{6}$/i.test(plasterColor)
      ? plasterColor
      : DEFAULT_STL_PLASTER_COLOR,
    roughness: 0.86,
    metalness: 0,
    clearcoat: 0.08,
    clearcoatRoughness: 0.72,
    sheen: 0.08,
    sheenColor: "#ffffff",
    envMapIntensity: 1.05,
  });
}

function FittedModel({
  model,
  mode,
  onReady,
}: {
  model: ThreeDModel;
  mode: RenderMode;
  onReady: (modelId: string) => void;
}) {
  const { scene, animations } = useGLTF(model.public_url);

  const normalizedModel = useMemo(() => {
    const clone = SkeletonUtils.clone(scene);
    const overrideMaterial =
      mode === "pbr" ? null : createOverrideMaterial(mode);
    const disposableMaterials = new Set<Material>();
    const disposableGeometries: EdgesGeometry[] = [];
    const creaseLineMaterial =
      mode === "pen"
        ? new LineBasicMaterial({ color: "#050505", toneMapped: false })
        : null;

    clone.traverse((object) => {
      if (!(object instanceof Mesh)) return;

      if (mode === "pbr") {
        const sourceMaterials = Array.isArray(object.material)
          ? object.material
          : [object.material];
        const pbrMaterials = sourceMaterials.map((material) => {
          const pbrMaterial = clonePbrMaterial(material);
          disposableMaterials.add(pbrMaterial);
          return pbrMaterial;
        });

        object.material = Array.isArray(object.material)
          ? pbrMaterials
          : pbrMaterials[0];
      } else if (overrideMaterial) {
        object.material = overrideMaterial;
      }

      object.castShadow = mode !== "pen";
      object.receiveShadow = mode !== "pen";

      if (creaseLineMaterial) {
        const edgeGeometry = new EdgesGeometry(object.geometry, 18);
        const edges = new LineSegments(edgeGeometry, creaseLineMaterial);
        edges.renderOrder = 4;
        object.add(edges);
        disposableGeometries.push(edgeGeometry);
      }
    });

    clone.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(clone, true);

    if (bounds.isEmpty()) {
      return {
        object: clone,
        position: new Vector3(),
        scale: 1,
        overrideMaterial,
        disposableMaterials,
        creaseLineMaterial,
        disposableGeometries,
      };
    }

    const sphere = bounds.getBoundingSphere(new Sphere());
    const scale =
      Number.isFinite(sphere.radius) && sphere.radius > 0
        ? MODEL_DISPLAY_RADIUS / sphere.radius
        : 1;

    return {
      object: clone,
      position: sphere.center.clone().multiplyScalar(-scale),
      scale,
      overrideMaterial,
      disposableMaterials,
      creaseLineMaterial,
      disposableGeometries,
    };
  }, [mode, scene]);

  const animationMixer = useMemo(
    () => new AnimationMixer(normalizedModel.object),
    [normalizedModel.object]
  );

  useEffect(() => {
    if (animations.length === 0) return;

    const actions = animations.map((clip) => {
      const action = animationMixer.clipAction(clip);
      action.reset();
      action.enabled = true;
      action.paused = false;
      action.clampWhenFinished = false;
      action.setLoop(LoopRepeat, Infinity);
      action.setEffectiveTimeScale(1);
      action.setEffectiveWeight(1);
      action.play();
      return action;
    });

    return () => {
      actions.forEach((action) => action.stop());
      animationMixer.stopAllAction();
      animations.forEach((clip) => animationMixer.uncacheClip(clip));
      animationMixer.uncacheRoot(normalizedModel.object);
    };
  }, [animationMixer, animations, normalizedModel.object]);

  useFrame((_, delta) => {
    if (animations.length > 0) animationMixer.update(delta);
  });

  useEffect(() => {
    return () => {
      normalizedModel.overrideMaterial?.dispose();
      normalizedModel.disposableMaterials.forEach((material) => material.dispose());
      normalizedModel.creaseLineMaterial?.dispose();
      normalizedModel.disposableGeometries.forEach((geometry) => geometry.dispose());
    };
  }, [normalizedModel]);

  useLayoutEffect(() => {
    onReady(model.id);
  }, [model.id, normalizedModel, onReady]);

  return (
    <group position={normalizedModel.position} scale={normalizedModel.scale}>
      <primitive object={normalizedModel.object} />
    </group>
  );
}

function FittedStlModel({
  model,
  mode,
  onReady,
}: {
  model: ThreeDModel;
  mode: RenderMode;
  onReady: (modelId: string) => void;
}) {
  const sourceGeometry = useLoader(STLLoader, model.public_url);

  const normalizedModel = useMemo(() => {
    const geometry = sourceGeometry.clone();
    geometry.computeVertexNormals();
    geometry.computeBoundingSphere();

    const sphere = geometry.boundingSphere ?? new Sphere(new Vector3(), 1);
    const scale =
      Number.isFinite(sphere.radius) && sphere.radius > 0
        ? MODEL_DISPLAY_RADIUS / sphere.radius
        : 1;
    geometry.translate(-sphere.center.x, -sphere.center.y, -sphere.center.z);
    geometry.computeBoundingSphere();

    const material = createStlMaterial(
      mode,
      model.plaster_color ?? DEFAULT_STL_PLASTER_COLOR
    );
    const edgeGeometry =
      mode === "pen" ? new EdgesGeometry(geometry, 12) : null;
    const edgeMaterial =
      mode === "pen"
        ? new LineBasicMaterial({
            color: "#050505",
            toneMapped: false,
            depthWrite: false,
          })
        : null;
    const silhouetteMaterial =
      mode === "pen"
        ? new MeshBasicMaterial({
            color: "#050505",
            side: BackSide,
            toneMapped: false,
            depthWrite: false,
          })
        : null;

    return {
      geometry,
      material,
      edgeGeometry,
      edgeMaterial,
      silhouetteMaterial,
      scale,
    };
  }, [mode, model.plaster_color, sourceGeometry]);

  useEffect(() => {
    return () => {
      normalizedModel.geometry.dispose();
      normalizedModel.material.dispose();
      normalizedModel.edgeGeometry?.dispose();
      normalizedModel.edgeMaterial?.dispose();
      normalizedModel.silhouetteMaterial?.dispose();
    };
  }, [normalizedModel]);

  useLayoutEffect(() => {
    onReady(model.id);
  }, [model.id, normalizedModel, onReady]);

  return (
    <group scale={normalizedModel.scale}>
      {normalizedModel.silhouetteMaterial && (
        <mesh
          geometry={normalizedModel.geometry}
          material={normalizedModel.silhouetteMaterial}
          scale={1.003}
          renderOrder={1}
        />
      )}
      <mesh
        geometry={normalizedModel.geometry}
        material={normalizedModel.material}
        castShadow={mode !== "pen"}
        receiveShadow={mode !== "pen"}
        renderOrder={2}
      />
      {normalizedModel.edgeGeometry && normalizedModel.edgeMaterial && (
        <lineSegments
          geometry={normalizedModel.edgeGeometry}
          material={normalizedModel.edgeMaterial}
          scale={1.001}
          renderOrder={4}
        />
      )}
    </group>
  );
}

function ModelAsset({
  model,
  mode,
  onReady,
}: {
  model: ThreeDModel;
  mode: RenderMode;
  onReady: (modelId: string) => void;
}) {
  return isStlModel(model) ? (
    <FittedStlModel model={model} mode={mode} onReady={onReady} />
  ) : (
    <FittedModel model={model} mode={mode} onReady={onReady} />
  );
}

function ModelCommitReady({
  modelId,
  onReady,
}: {
  modelId: string;
  onReady: (modelId: string) => void;
}) {
  useLayoutEffect(() => {
    onReady(modelId);
  }, [modelId, onReady]);

  return null;
}

function ResetModelCamera({
  modelKey,
  controlsRef,
}: {
  modelKey: string;
  controlsRef: React.RefObject<OrbitControlsImpl>;
}) {
  const camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    camera.position.set(...CAMERA_POSITION);
    camera.up.set(0, 1, 0);
    camera.zoom = 1;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    const controls = controlsRef.current;
    if (controls) {
      controls.target.set(0, 0, 0);
      controls.update();
      controls.saveState();
    }
  }, [camera, controlsRef, modelKey]);

  return null;
}

function SceneReadySignal({
  ready,
  readinessKey,
  onReady,
}: {
  ready: boolean;
  readinessKey: string;
  onReady: (readinessKey: string) => void;
}) {
  const renderedFramesRef = useRef(0);
  const reportedRef = useRef(false);

  useEffect(() => {
    renderedFramesRef.current = 0;
    reportedRef.current = false;
  }, [readinessKey]);

  useFrame(() => {
    if (!ready) {
      renderedFramesRef.current = 0;
      return;
    }

    if (reportedRef.current) return;

    renderedFramesRef.current += 1;

    if (renderedFramesRef.current < 6) return;

    reportedRef.current = true;
    onReady(readinessKey);
  });

  return null;
}

export default function WatchStudio({ onBack }: WatchStudioProps) {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [catalogReady, setCatalogReady] = useState(false);
  const [models, setModels] = useState<ThreeDModel[]>([DEFAULT_MODEL]);
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL.id);
  const [renderMode, setRenderMode] = useState<RenderMode>("pbr");
  const [managerOpen, setManagerOpen] = useState(false);
  const [modelListOpen, setModelListOpen] = useState(false);
  const [modelMotion, setModelMotion] = useState<ModelMotion>("outside");
  const [modelGeometryReady, setModelGeometryReady] = useState(false);
  const [modelSceneReady, setModelSceneReady] = useState(false);
  const [modelLoadError, setModelLoadError] = useState(false);
  const [modelListNotice, setModelListNotice] = useState<string | null>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const pendingModelIdRef = useRef<string | null>(null);
  const modelSwitchTimerRef = useRef<number | null>(null);
  const modelVisibleTimerRef = useRef<number | null>(null);
  const loadingProgress = useProgress();
  const { loading: authLoading, user, isAdmin } = useAdminSession();

  const selectedModel =
    models.find((model) => model.id === selectedModelId) ?? models[0] ?? DEFAULT_MODEL;
  const selectedModelIsStl = isStlModel(selectedModel);
  const selectedEnvironmentUrl = environmentUrlFor(selectedModel);
  const modelReadinessKey = `${selectedModel.public_url}|${selectedEnvironmentUrl}`;
  const sceneMode = renderMode;

  const loadModels = useCallback(async (forceRefresh = false) => {
    setModelGeometryReady(false);
    setModelSceneReady(false);
    setModelLoadError(false);
    setModelMotion("outside");

    try {
      const remoteModels = await loadPublicModelCatalog(forceRefresh);
      const nextModels = availableModels(remoteModels);
      setModels(nextModels);
      setSelectedModelId((current) =>
        nextModels.some((model) => model.id === current)
          ? current
          : nextModels.find((model) => model.is_featured)?.id ?? nextModels[0].id
      );
      setModelListNotice(null);
      setCatalogReady(true);
    } catch {
      setModels([DEFAULT_MODEL]);
      setSelectedModelId(DEFAULT_MODEL.id);
      setModelListNotice("Using the built-in watch until the Supabase 3D table is ready.");
      setCatalogReady(true);
    }
  }, []);

  useEffect(() => {
    void loadModels();
  }, [loadModels]);

  useEffect(() => {
    if (!isAdmin) setManagerOpen(false);
  }, [isAdmin]);

  useEffect(() => {
    if (managerOpen) setModelListOpen(false);
  }, [managerOpen]);

  useEffect(() => {
    return () => {
      if (modelSwitchTimerRef.current) {
        window.clearTimeout(modelSwitchTimerRef.current);
      }
      if (modelVisibleTimerRef.current) {
        window.clearTimeout(modelVisibleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setEntered(true));
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, []);

  const pieceClass = leaving
    ? "is-leaving"
    : entered
      ? "is-entering"
      : "is-visible";

  const modelMotionClass = `is-${modelMotion}`;

  const modelAssetsComplete =
    catalogReady &&
    (modelLoadError || modelSceneReady);

  const trackedAssetsReady =
    catalogReady &&
    modelGeometryReady &&
    !loadingProgress.active &&
    (loadingProgress.progress >= 99.9 ||
      loadingProgress.total === 0 ||
      loadingProgress.loaded >= loadingProgress.total);

  const handleModelGeometryReady = useCallback(
    (modelId: string) => {
      if (modelId === selectedModel.id) {
        setModelGeometryReady(true);
      }
    },
    [selectedModel.id]
  );

  const handleSceneReady = useCallback(
    (readinessKey: string) => {
      if (readinessKey === modelReadinessKey) {
        setModelSceneReady(true);
      }
    },
    [modelReadinessKey]
  );

  const handleModelFullyLoaded = useCallback(() => {
    setModelMotion((current) =>
      current === "outside" ? "entering" : current
    );

    if (modelVisibleTimerRef.current) {
      window.clearTimeout(modelVisibleTimerRef.current);
    }

    modelVisibleTimerRef.current = window.setTimeout(() => {
      setModelMotion((current) =>
        current === "entering" ? "visible" : current
      );
      modelVisibleTimerRef.current = null;
    }, MODEL_GROW_DURATION);
  }, []);

  const handleModelSelect = useCallback(
    (modelId: string) => {
      setModelListOpen(false);

      if (modelId === selectedModel.id && modelMotion !== "leaving") return;

      pendingModelIdRef.current = modelId;

      const commitSelection = () => {
        const nextModelId = pendingModelIdRef.current;
        pendingModelIdRef.current = null;
        modelSwitchTimerRef.current = null;

        if (!nextModelId) return;

        setModelGeometryReady(false);
        setModelSceneReady(false);
        setModelLoadError(false);
        setModelMotion("outside");
        setSelectedModelId(nextModelId);
      };

      if (modelMotion === "leaving") return;

      if (modelVisibleTimerRef.current) {
        window.clearTimeout(modelVisibleTimerRef.current);
        modelVisibleTimerRef.current = null;
      }

      if (modelMotion === "outside") {
        commitSelection();
        return;
      }

      setModelMotion("leaving");
      modelSwitchTimerRef.current = window.setTimeout(
        commitSelection,
        MODEL_SHRINK_DURATION
      );
    },
    [modelMotion, selectedModel.id]
  );

  const handleBack = () => {
    if (leaving) return;
    setModelListOpen(false);
    setModelMotion("leaving");
    setLeaving(true);
    window.setTimeout(onBack, 900);
  };

  return (
    <div
      className={`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${
        leaving ? "is-leaving" : entered ? "is-visible" : ""
      }`}
      style={{ backgroundColor: RENDER_BACKGROUNDS[sceneMode] }}
    >
      <style>{watchStudioStyles}</style>
      <ModelLoadingOverlay
        key={`${selectedModel.public_url}-${selectedEnvironmentUrl}`}
        catalogReady={catalogReady}
        geometryReady={modelGeometryReady}
        complete={modelAssetsComplete}
        onCompleted={handleModelFullyLoaded}
      />

      <div className="fixed left-4 top-4 z-40 flex items-center gap-2 sm:left-6 sm:top-6">
        <div
          className={`watch-studio-piece ${pieceClass}`}
          style={{ "--watch-delay": "0ms", "--watch-exit-delay": "240ms" } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={handleBack}
            className="flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95"
          >
            ← BACK TO BOOK
          </button>
        </div>

        <div
          className={`watch-studio-piece ${pieceClass}`}
          style={{ "--watch-delay": "70ms", "--watch-exit-delay": "180ms" } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => setModelListOpen((open) => !open)}
            aria-expanded={modelListOpen}
            aria-controls="watch-model-library"
            className="flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95"
          >
            MODELS
          </button>
        </div>
      </div>

      {modelListOpen && !managerOpen && (
        <button
          type="button"
          aria-label="Close model list"
          className="fixed inset-0 z-[31] cursor-default bg-transparent"
          onClick={() => setModelListOpen(false)}
        />
      )}

      <aside
        id="watch-model-library"
        aria-hidden={!modelListOpen || managerOpen}
        className={`watch-model-balloon fixed left-4 top-[76px] z-[35] flex max-h-[72vh] w-[min(88vw,390px)] flex-col overflow-hidden rounded-[34px] border border-black/25 bg-white/95 p-5 shadow-[0_18px_65px_rgba(0,0,0,0.16)] backdrop-blur-xl sm:left-6 sm:top-[82px] ${
          modelListOpen && !managerOpen ? "is-open" : ""
        }`}
      >
        <div className="mb-4 flex items-start justify-between gap-5">
          <div>
            <p className="text-[12px] tracking-[0.18em] text-black/45">3D LIBRARY</p>
            <h1 className="mt-1 text-[22px] font-light">CHOOSE A MODEL</h1>
          </div>
          <button
            type="button"
            onClick={() => setModelListOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/25 bg-transparent text-[18px]"
            aria-label="Close model list"
          >
            ×
          </button>
        </div>

        <div className="min-h-0 overflow-y-auto border-t border-black/15">
          {models.map((model, index) => {
            const selected = model.id === selectedModel.id;

            return (
              <button
                key={model.id}
                type="button"
                onClick={() => handleModelSelect(model.id)}
                onPointerEnter={() => preloadThreeDModelAssets(model)}
                onFocus={() => preloadThreeDModelAssets(model)}
                className={`watch-model-list-item grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-black/15 px-1 py-4 text-left transition-colors hover:bg-black/[0.035] ${
                  selected ? "text-black" : "text-black/65"
                }`}
                style={{ "--model-index": index } as React.CSSProperties}
              >
                <span className="min-w-0">
                  <span className="block truncate text-[16px]">{model.name}</span>
                  {model.description && (
                    <span className="mt-1 block truncate text-[12px] text-black/50">
                      {model.description}
                    </span>
                  )}
                </span>
                <span className="text-[14px]">
                  {model.is_featured ? "*" : selected ? ">" : ""}
                </span>
              </button>
            );
          })}
        </div>

        <p className="relative mt-3 text-[11px] text-black/40">* Featured</p>
      </aside>

      {!authLoading && user && isAdmin && (
        <div
          className={`watch-studio-piece fixed right-4 top-4 z-20 sm:right-6 sm:top-6 ${pieceClass}`}
          style={{ "--watch-delay": "80ms", "--watch-exit-delay": "180ms" } as React.CSSProperties}
        >
          <button
            type="button"
            onClick={() => setManagerOpen((open) => !open)}
            className="flex h-12 items-center justify-center rounded-none border border-black/25 bg-transparent px-5 text-[12px] transition-transform hover:scale-105 active:scale-95"
          >
            {managerOpen ? "CLOSE MANAGER" : "MANAGE MODELS"}
          </button>
        </div>
      )}

      <div
        className={`watch-model-stage watch-studio-canvas absolute inset-0 ${modelMotionClass}`}
      >
        <Canvas
          shadows={sceneMode !== "pen"}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance" }}
          camera={{ position: CAMERA_POSITION, fov: 32, near: 0.01, far: 10000 }}
        >
          <ambientLight
            intensity={
              sceneMode === "pen" ? 2.4 : sceneMode === "arctic" ? 1.45 : 0.62
            }
          />
          <directionalLight
            position={[7, 10, 8]}
            intensity={sceneMode === "pbr" ? 2.25 : sceneMode === "arctic" ? 1.35 : 2.1}
            castShadow={sceneMode !== "pen"}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <directionalLight
            position={[-8, 2, -5]}
            intensity={sceneMode === "pbr" ? 0.9 : sceneMode === "arctic" ? 0.48 : 0.75}
          />

          <OrbitControls
            key={selectedModel.public_url}
            ref={controlsRef}
            makeDefault
            enabled={!managerOpen && modelMotion === "visible"}
            enableDamping
            dampingFactor={0.075}
            enablePan
            enableRotate
            enableZoom
            rotateSpeed={0.65}
            zoomSpeed={0.8}
            panSpeed={0.75}
            screenSpacePanning
            minDistance={0.01}
            maxDistance={10000}
            mouseButtons={{
              LEFT: MOUSE.ROTATE,
              MIDDLE: MOUSE.DOLLY,
              RIGHT: MOUSE.PAN,
            }}
            touches={{
              ONE: TOUCH.ROTATE,
              TWO: TOUCH.DOLLY_PAN,
            }}
          />

          <ResetModelCamera
            modelKey={selectedModel.public_url}
            controlsRef={controlsRef}
          />

          <SceneReadySignal
            ready={trackedAssetsReady}
            readinessKey={modelReadinessKey}
            onReady={handleSceneReady}
          />

          <ModelErrorBoundary
            resetKey={selectedModel.public_url}
            onError={() => setModelLoadError(true)}
          >
            <Suspense fallback={null}>
              {catalogReady && (
                <>
                  <ModelAsset
                    key={`${selectedModel.public_url}-${sceneMode}`}
                    model={selectedModel}
                    mode={sceneMode}
                    onReady={handleModelGeometryReady}
                  />
                  <ModelCommitReady
                    modelId={selectedModel.id}
                    onReady={handleModelGeometryReady}
                  />
                </>
              )}
            </Suspense>
          </ModelErrorBoundary>

          {sceneMode === "pbr" && (
            <Suspense fallback={null}>
              <Environment
                key={selectedEnvironmentUrl}
                files={selectedEnvironmentUrl}
              />
            </Suspense>
          )}
          {sceneMode !== "pen" && (
            <ContactShadows
              position={[0, -1.9, 0]}
              scale={6}
              opacity={sceneMode === "arctic" ? 0.14 : 0.28}
              blur={2.5}
              far={4}
              resolution={512}
              frames={1}
            />
          )}
          {sceneMode === "arctic" && (
            <EffectComposer multisampling={0} resolutionScale={0.75}>
              <HueSaturation saturation={-1} />
              <N8AO
                halfRes
                quality="performance"
                aoRadius={0.22}
                distanceFalloff={0.75}
                intensity={0.42}
                color="#d6d6d6"
              />
            </EffectComposer>
          )}
          {selectedModelIsStl && sceneMode === "pbr" && (
            <EffectComposer multisampling={0} resolutionScale={0.75}>
              <N8AO
                halfRes
                quality="performance"
                aoRadius={0.2}
                distanceFalloff={0.8}
                intensity={0.9}
                color="#555555"
              />
            </EffectComposer>
          )}
        </Canvas>
      </div>

      {!managerOpen && (
        <aside className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4 sm:bottom-6">
          <div className="pointer-events-auto flex w-full max-w-4xl flex-col items-center gap-3">
            <div
              className={`watch-studio-piece max-w-full text-center ${modelMotionClass}`}
              style={{ "--watch-delay": "70ms", "--watch-exit-delay": "120ms" } as React.CSSProperties}
            >
              <p className="max-w-[78vw] truncate text-[12px] tracking-[0.08em] text-black">
                {selectedModel.is_featured ? "FEATURED — " : ""}
                {selectedModel.name.toUpperCase()}
              </p>
            </div>

            {selectedModel.description && (
              <div
                className={`watch-studio-piece max-w-[min(78vw,620px)] text-center ${modelMotionClass}`}
                style={{ "--watch-delay": "140ms", "--watch-exit-delay": "60ms" } as React.CSSProperties}
              >
                <p className="truncate text-[10px] tracking-[0.04em] text-black/50">
                  {selectedModel.description}
                </p>
              </div>
            )}

            <nav
              className={`watch-studio-piece flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] tracking-[0.12em] text-black ${modelMotionClass}`}
              style={{ "--watch-delay": "210ms", "--watch-exit-delay": "0ms" } as React.CSSProperties}
              aria-label="3D renderer style"
            >
              {RENDER_MODES.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setRenderMode(mode.id)}
                  aria-pressed={renderMode === mode.id}
                  className={`py-1 outline-none transition-opacity focus-visible:underline focus-visible:underline-offset-4 ${
                    renderMode === mode.id
                      ? "underline decoration-1 underline-offset-4 opacity-100"
                      : "opacity-45 hover:opacity-100"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </nav>

            {modelListNotice && (
              <div className="text-center text-[9px] text-black/45">{modelListNotice}</div>
            )}
          </div>
        </aside>
      )}

      {managerOpen && isAdmin && (
        <section className="fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]">
          <AdminThreeDModelManager
            onModelsChanged={() => void loadModels(true)}
          />
        </section>
      )}
    </div>
  );
}
