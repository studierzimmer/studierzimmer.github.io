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
  Object3D,
  Quaternion,
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
import ScrambleText from "@/components/navigation/ScrambleText";

interface WatchStudioProps {
  onBack: () => void;
  onNavigate: () => void;
  onLogin: () => void;
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
const NAV_IDLE_DELAY = 1400;
const NAV_REVEAL_THRESHOLD = 44;

const RENDER_MODES: Array<{ id: RenderMode; label: string }> = [
  { id: "pbr", label: "RENDER" },
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
  is_watch: false,
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

.watch-primary-nav-shell {
  position: fixed;
  left: max(12px, env(safe-area-inset-left));
  top: max(12px, env(safe-area-inset-top));
  z-index: 280;
  transform: translate3d(0, 0, 0);
  transition: transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1);
  will-change: transform;
}

.watch-primary-nav-shell.is-hidden {
  transform: translate3d(calc(-100% - 18px), 0, 0);
}

.watch-primary-nav {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: clamp(34px, 5vw, 48px);
  align-items: start;
  gap: clamp(1px, 0.6vw, 7px);
  max-width: calc(100vw - 24px - env(safe-area-inset-left));
}

.watch-primary-nav-column {
  position: relative;
  width: 100%;
  height: clamp(96px, 16dvh, 138px);
  border: 0;
  outline: none;
  padding: 0;
  background: transparent;
  overflow: visible;
}

.watch-primary-nav-column > span {
  position: absolute;
  left: auto;
  right: 50%;
  top: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  transform: rotate(-90deg);
  transform-origin: 100% 50%;
  color: rgb(0 0 0 / 0.42);
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 400;
  letter-spacing: 0.08em;
  transition:
    color 480ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-primary-nav-column:hover > span,
.watch-primary-nav-column:focus-visible > span {
  color: rgb(0 0 0 / 0.72);
  transform: rotate(-90deg) scale(1.08);
}

.watch-primary-nav-column:focus-visible > span {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.watch-primary-nav-column.is-active > span {
  color: black;
  text-decoration: none;
}

.watch-info-toggle {
  position: fixed;
  right: max(16px, env(safe-area-inset-right));
  top: max(18px, env(safe-area-inset-top));
  z-index: 285;
  border: 0;
  padding: 8px 0;
  background: transparent;
  color: rgb(0 0 0 / 0.44);
  font-size: clamp(11px, 1.5vw, 13px);
  font-weight: 400;
  letter-spacing: 0.08em;
  transition:
    color 240ms ease,
    opacity 420ms ease,
    transform 640ms cubic-bezier(0.22, 0.88, 0.3, 1);
}

.watch-info-toggle:hover,
.watch-info-toggle:focus-visible,
.watch-info-toggle.is-active {
  color: black;
}

.watch-info-toggle.is-nav-hidden {
  opacity: 0;
  pointer-events: none;
  transform: translate3d(130%, 0, 0);
}

.watch-info-toggle.is-panel-open {
  opacity: 0;
  pointer-events: none;
  transform: translate3d(130%, 0, 0);
}

.watch-nav-reveal-tab {
  --watch-tab-drag: 0px;
  position: fixed;
  left: 0;
  top: max(20px, env(safe-area-inset-top));
  z-index: 290;
  display: flex;
  width: 34px;
  height: 62px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 0 18px 18px 0;
  padding: 0 4px 0 0;
  background: rgb(207 207 207 / 0.96);
  color: rgb(0 0 0 / 0.66);
  box-shadow: 0 10px 32px rgb(0 0 0 / 0.08);
  opacity: 0;
  pointer-events: none;
  touch-action: none;
  transform: translate3d(calc(var(--watch-tab-drag) - 38px), 0, 0);
  transition:
    transform 600ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 260ms ease;
  will-change: transform;
}

.watch-nav-reveal-tab.is-visible {
  opacity: 1;
  pointer-events: auto;
  transform: translate3d(calc(var(--watch-tab-drag) - 5px), 0, 0);
}

.watch-nav-reveal-tab.is-dragging {
  transition: opacity 260ms ease;
}

.watch-nav-reveal-tab > span {
  display: block;
  font-size: 17px;
  font-weight: 400;
  line-height: 1;
  transition: transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-nav-reveal-tab:hover > span,
.watch-nav-reveal-tab:focus-visible > span {
  transform: translateX(3px);
}

@media (max-width: 380px), (max-height: 700px) {
  .watch-primary-nav-shell {
    top: max(8px, env(safe-area-inset-top));
    left: max(7px, env(safe-area-inset-left));
  }

  .watch-primary-nav {
    grid-auto-columns: 31px;
    gap: 0;
    max-width: calc(100vw - 14px);
  }

  .watch-primary-nav-column {
    height: clamp(76px, 20dvh, 104px);
  }

  .watch-info-toggle {
    right: max(10px, env(safe-area-inset-right));
    top: max(8px, env(safe-area-inset-top));
  }

  .watch-nav-reveal-tab {
    top: max(10px, env(safe-area-inset-top));
    height: 54px;
  }
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

.watch-model-drawer {
  left: 0;
  right: 0;
  bottom: 0;
  height: min(72dvh, 720px);
  transform: translate3d(0, 104%, 0);
  opacity: 0;
  background: rgb(207 207 207);
  pointer-events: none;
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 360ms ease;
  will-change: transform, opacity;
}

.watch-model-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  pointer-events: auto;
}

.watch-model-list-item {
  display: flex;
  min-height: clamp(100px, 17dvh, 160px);
  width: 100%;
  align-items: center;
  justify-content: center;
  border: 0;
  padding: clamp(22px, 4vw, 46px);
  background: transparent;
  text-align: center;
  transform-origin: 50% 50%;
  transform: scale(0);
  opacity: 0;
  transition:
    transform 520ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 260ms ease;
  transition-delay: calc(var(--model-index, 0) * 55ms);
}

.watch-model-drawer.is-open .watch-model-list-item {
  transform: scale(1);
  opacity: 1;
}

.watch-model-list-item > span {
  width: min(680px, 88vw);
}

.watch-model-list-item:hover > span,
.watch-model-list-item:focus-visible > span {
  transform: scale(1.025);
}

.watch-model-list-item > span {
  transition:
    color 240ms ease,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-info-drawer {
  top: 0;
  right: 0;
  bottom: 0;
  width: min(460px, calc(100vw - 18px));
  transform: translate3d(104%, 0, 0);
  opacity: 0;
  background: rgb(207 207 207);
  pointer-events: none;
  transition:
    transform 720ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 360ms ease;
  will-change: transform, opacity;
}

.watch-info-drawer.is-open {
  transform: translate3d(0, 0, 0);
  opacity: 1;
  pointer-events: auto;
}

.watch-info-piece {
  transform-origin: 50% 50%;
  transform: scale(0.72);
  opacity: 0;
  transition:
    transform 560ms cubic-bezier(0.22, 0.88, 0.3, 1),
    opacity 280ms ease;
  transition-delay: var(--info-delay, 0ms);
}

.watch-info-drawer.is-open .watch-info-piece {
  transform: scale(1);
  opacity: 1;
}

.watch-render-option {
  border: 0;
  padding: 8px 0;
  background: transparent;
  color: rgb(0 0 0 / 0.42);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.12em;
  transition:
    color 220ms ease,
    transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
}

.watch-render-option:hover,
.watch-render-option:focus-visible {
  color: rgb(0 0 0 / 0.76);
  transform: scale(1.06);
}

.watch-render-option.is-active {
  color: black;
}

@media (prefers-reduced-motion: reduce) {
  .watch-studio,
  .watch-studio-piece,
  .watch-model-stage,
  .watch-primary-nav-shell,
  .watch-info-toggle,
  .watch-nav-reveal-tab,
  .watch-model-drawer,
  .watch-model-list-item,
  .watch-info-drawer,
  .watch-info-piece {
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

const WATCH_PIVOT_NAMES = {
  hour: "hourshand_pivot",
  minute: "minuteshand_pivot",
  second: "secondshand_pivot",
} as const;
const WATCH_LOCAL_AXIS = new Vector3(0, 0, 1);
const WATCH_TURN = Math.PI * 2;
const watchRotation = new Quaternion();

interface WatchPivot {
  object: Object3D;
  baseQuaternion: Quaternion;
}

interface WatchPivots {
  hour: WatchPivot;
  minute: WatchPivot;
  second: WatchPivot;
}

function findNamedObject(root: Object3D, expectedName: string): Object3D | null {
  let match: Object3D | null = null;

  root.traverse((object) => {
    if (!match && object.name.trim().toLowerCase() === expectedName) {
      match = object;
    }
  });

  return match;
}

function createWatchPivots(root: Object3D): WatchPivots | null {
  const hour = findNamedObject(root, WATCH_PIVOT_NAMES.hour);
  const minute = findNamedObject(root, WATCH_PIVOT_NAMES.minute);
  const second = findNamedObject(root, WATCH_PIVOT_NAMES.second);

  if (!hour || !minute || !second) return null;

  return {
    hour: { object: hour, baseQuaternion: hour.quaternion.clone() },
    minute: { object: minute, baseQuaternion: minute.quaternion.clone() },
    second: { object: second, baseQuaternion: second.quaternion.clone() },
  };
}

function applyWatchPivotRotation(pivot: WatchPivot, angle: number): void {
  watchRotation.setFromAxisAngle(WATCH_LOCAL_AXIS, angle);
  pivot.object.quaternion.copy(pivot.baseQuaternion).multiply(watchRotation);
}

function applyLocalTimeToWatch(pivots: WatchPivots, date: Date): void {
  const seconds = date.getSeconds() + date.getMilliseconds() / 1000;
  const minutes = date.getMinutes() + seconds / 60;
  const hours = (date.getHours() % 12) + minutes / 60;

  applyWatchPivotRotation(pivots.second, -(seconds / 60) * WATCH_TURN);
  applyWatchPivotRotation(pivots.minute, -(minutes / 60) * WATCH_TURN);
  applyWatchPivotRotation(pivots.hour, -(hours / 12) * WATCH_TURN);
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
    const watchPivots = model.is_watch ? createWatchPivots(clone) : null;
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
        watchPivots,
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
      watchPivots,
      position: sphere.center.clone().multiplyScalar(-scale),
      scale,
      overrideMaterial,
      disposableMaterials,
      creaseLineMaterial,
      disposableGeometries,
    };
  }, [mode, model.is_watch, scene]);

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
    if (normalizedModel.watchPivots) {
      applyLocalTimeToWatch(normalizedModel.watchPivots, new Date());
    }
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

export default function WatchStudio({
  onBack,
  onNavigate,
  onLogin,
}: WatchStudioProps) {
  const [entered, setEntered] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [catalogReady, setCatalogReady] = useState(false);
  const [models, setModels] = useState<ThreeDModel[]>([DEFAULT_MODEL]);
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_MODEL.id);
  const [renderMode, setRenderMode] = useState<RenderMode>("pbr");
  const [managerOpen, setManagerOpen] = useState(false);
  const [modelListOpen, setModelListOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [initialNavAutoHideDone, setInitialNavAutoHideDone] = useState(false);
  const [navRevealDrag, setNavRevealDrag] = useState(0);
  const [navRevealDragging, setNavRevealDragging] = useState(false);
  const [navTransitionTarget, setNavTransitionTarget] = useState<
    "library" | "other" | null
  >(null);
  const [activeNavId, setActiveNavId] = useState("models");
  const [modelMotion, setModelMotion] = useState<ModelMotion>("outside");
  const [modelGeometryReady, setModelGeometryReady] = useState(false);
  const [modelSceneReady, setModelSceneReady] = useState(false);
  const [modelLoadError, setModelLoadError] = useState(false);
  const [modelListNotice, setModelListNotice] = useState<string | null>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const pendingModelIdRef = useRef<string | null>(null);
  const modelSwitchTimerRef = useRef<number | null>(null);
  const modelVisibleTimerRef = useRef<number | null>(null);
  const navIdleTimerRef = useRef<number | null>(null);
  const navRevealDragRef = useRef<{
    pointerId: number;
    startX: number;
  } | null>(null);
  const modelTapRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);
  const loadingProgress = useProgress();
  const { isAdmin } = useAdminSession();

  const selectedModel =
    models.find((model) => model.id === selectedModelId) ?? models[0] ?? DEFAULT_MODEL;
  const selectedModelIsStl = isStlModel(selectedModel);
  const selectedEnvironmentUrl = environmentUrlFor(selectedModel);
  const modelReadinessKey = `${selectedModel.public_url}|${selectedEnvironmentUrl}`;
  const sceneMode = renderMode;
  const canAutoHideNav =
    entered &&
    !leaving &&
    modelMotion === "visible" &&
    !managerOpen &&
    !modelListOpen &&
    !infoOpen &&
    !initialNavAutoHideDone;

  const clearNavIdleTimer = useCallback(() => {
    if (navIdleTimerRef.current) {
      window.clearTimeout(navIdleTimerRef.current);
      navIdleTimerRef.current = null;
    }
  }, []);

  const scheduleNavAutoHide = useCallback(() => {
    clearNavIdleTimer();

    if (!canAutoHideNav) {
      return;
    }

    navIdleTimerRef.current = window.setTimeout(() => {
      setNavRevealDrag(0);
      setInitialNavAutoHideDone(true);
      setNavHidden(true);
      navIdleTimerRef.current = null;
    }, NAV_IDLE_DELAY);
  }, [canAutoHideNav, clearNavIdleTimer]);

  const revealNavigation = useCallback(() => {
    setNavRevealDrag(0);
    setNavRevealDragging(false);
    setNavHidden(false);
    clearNavIdleTimer();
  }, [clearNavIdleTimer]);

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
    if (managerOpen) {
      setModelListOpen(false);
      setInfoOpen(false);
    }
  }, [managerOpen]);

  useEffect(() => {
    if (modelListOpen) setInfoOpen(false);
  }, [modelListOpen]);

  useEffect(() => {
    scheduleNavAutoHide();

    return clearNavIdleTimer;
  }, [clearNavIdleTimer, scheduleNavAutoHide]);

  useEffect(() => {
    if (!infoOpen) return;

    const closeFromOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (
        target.closest("[data-watch-info-panel]") ||
        target.closest("[data-watch-info-toggle]")
      ) {
        return;
      }

      setInfoOpen(false);
    };

    document.addEventListener("pointerdown", closeFromOutside, true);
    return () => {
      document.removeEventListener("pointerdown", closeFromOutside, true);
    };
  }, [infoOpen]);

  useEffect(() => {
    const moveRevealTab = (event: PointerEvent) => {
      const drag = navRevealDragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const distance = Math.min(
        120,
        Math.max(0, event.clientX - drag.startX)
      );

      if (distance >= NAV_REVEAL_THRESHOLD) {
        navRevealDragRef.current = null;
        revealNavigation();
        return;
      }

      setNavRevealDrag(distance);
    };

    const finishRevealTab = (event: PointerEvent) => {
      const drag = navRevealDragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;

      const distance = Math.min(
        120,
        Math.max(0, event.clientX - drag.startX)
      );
      navRevealDragRef.current = null;
      setNavRevealDragging(false);

      if (distance >= NAV_REVEAL_THRESHOLD || distance < 6) {
        revealNavigation();
        return;
      }

      setNavRevealDrag(0);
    };

    const cancelRevealTab = (event: PointerEvent) => {
      const drag = navRevealDragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      navRevealDragRef.current = null;
      setNavRevealDragging(false);
      setNavRevealDrag(0);
    };

    window.addEventListener("pointermove", moveRevealTab);
    window.addEventListener("pointerup", finishRevealTab);
    window.addEventListener("pointercancel", cancelRevealTab);

    return () => {
      window.removeEventListener("pointermove", moveRevealTab);
      window.removeEventListener("pointerup", finishRevealTab);
      window.removeEventListener("pointercancel", cancelRevealTab);
    };
  }, [revealNavigation]);

  useEffect(() => {
    return () => {
      if (modelSwitchTimerRef.current) {
        window.clearTimeout(modelSwitchTimerRef.current);
      }
      if (modelVisibleTimerRef.current) {
        window.clearTimeout(modelVisibleTimerRef.current);
      }
      clearNavIdleTimer();
    };
  }, [clearNavIdleTimer]);

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

  const leaveTo = (
    destination: () => void,
    target: "library" | "other" = "other"
  ) => {
    if (leaving) return;
    setInfoOpen(false);
    setModelListOpen(false);
    setManagerOpen(false);
    setNavHidden(false);
    setNavTransitionTarget(target);
    setModelMotion("leaving");
    setLeaving(true);
    window.setTimeout(destination, 900);
  };

  const handleBack = () => {
    window.sessionStorage.setItem(
      "gstudios:nav-continuity",
      "models-to-library"
    );
    setActiveNavId("library");
    leaveTo(onBack, "library");
  };

  const handleInfoToggle = () => {
    setNavHidden(false);
    setManagerOpen(false);
    setModelListOpen(false);
    setInfoOpen((open) => !open);
  };

  const handleNavRevealPointerDown = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (!navHidden) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    navRevealDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
    };
    setNavRevealDragging(true);
  };

  const handleModelPointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (
      event.button !== 0 ||
      managerOpen ||
      modelListOpen ||
      infoOpen ||
      modelMotion !== "visible"
    ) {
      modelTapRef.current = null;
      return;
    }

    modelTapRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
  };

  const handleModelPointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const tap = modelTapRef.current;
    if (!tap || tap.pointerId !== event.pointerId) return;

    if (
      Math.hypot(
        event.clientX - tap.startX,
        event.clientY - tap.startY
      ) > 7
    ) {
      modelTapRef.current = null;
    }
  };

  const handleModelPointerUp = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const tap = modelTapRef.current;
    modelTapRef.current = null;

    if (!tap || tap.pointerId !== event.pointerId || navHidden) return;

    clearNavIdleTimer();
    setInitialNavAutoHideDone(true);
    setNavHidden(true);
  };

  const primaryNavItems = [
    {
      id: "navigate",
      label: "NAVIGATE",
      action: () => leaveTo(onNavigate),
      event: "navigation_click",
      type: "navigation",
      active: false,
    },
    {
      id: "library",
      label: "LIBRARY",
      action: handleBack,
      event: "navigation_click",
      type: "navigation",
      active: false,
    },
    {
      id: "login",
      label: "LOGIN",
      action: () => leaveTo(onLogin),
      event: "navigation_click",
      type: "navigation",
      active: false,
    },
    {
      id: "models",
      label: "MODELS",
      action: () => {
        const viewerAlreadyClear =
          !managerOpen && !modelListOpen && !infoOpen;
        setManagerOpen(false);
        setModelListOpen(false);
        setActiveNavId("models");
        if (viewerAlreadyClear) {
          clearNavIdleTimer();
          setNavHidden(true);
        }
      },
      event: "navigation_click",
      type: "model",
      active: activeNavId === "models" && !managerOpen && !modelListOpen,
    },
    {
      id: "3d-library",
      label: "3D LIBRARY",
      action: () => {
        setManagerOpen(false);
        setModelListOpen((open) => !open);
      },
      event: "navigation_click",
      type: "model",
      active: modelListOpen && !managerOpen,
    },
    ...(isAdmin
      ? [
          {
            id: "manage",
            label: "MANAGE MODELS",
            action: () => {
              setModelListOpen(false);
              setManagerOpen((open) => !open);
            },
            event: "navigation_click",
            type: "interface",
            active: managerOpen,
          },
        ]
      : []),
  ];

  return (
    <>
      <style>{watchStudioStyles}</style>

      <div
        className={`watch-primary-nav-shell ${navHidden ? "is-hidden" : ""}`}
        aria-hidden={navHidden}
      >
        <div className="watch-primary-nav">
          {primaryNavItems.map((item, index) => {
            const staysInLibrary =
              item.id === "navigate" ||
              item.id === "library" ||
              item.id === "login" ||
              item.id === "models";
            const itemMotion =
              leaving &&
              (navTransitionTarget !== "library" || !staysInLibrary)
                ? "is-leaving"
                : "is-visible";

            return (
              <div
                key={item.id}
                className={`watch-studio-piece ${itemMotion}`}
                style={
                  {
                    "--watch-delay": `${index * 70}ms`,
                    "--watch-exit-delay": `${
                      (primaryNavItems.length - index - 1) * 60
                    }ms`,
                  } as React.CSSProperties
                }
              >
                <button
                  type="button"
                  onClick={() => {
                    setInfoOpen(false);
                    item.action();
                  }}
                  disabled={leaving}
                  tabIndex={navHidden ? -1 : undefined}
                  aria-expanded={
                    item.id === "3d-library"
                      ? modelListOpen
                      : item.id === "manage"
                        ? managerOpen
                        : undefined
                  }
                  aria-controls={
                    item.id === "3d-library"
                      ? "watch-model-library"
                      : item.id === "manage"
                        ? "watch-model-manager"
                        : undefined
                  }
                  data-analytics-event={item.event}
                  data-analytics-type={item.type}
                  data-analytics-id={item.id}
                  className={`watch-primary-nav-column disabled:pointer-events-none ${
                    item.active ? "is-active" : ""
                  }`}
                >
                  <span>
                    {item.id === "login" ? (
                      <ScrambleText text="LOGIN" />
                    ) : (
                      item.label
                    )}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        data-watch-info-toggle
        onClick={handleInfoToggle}
        disabled={leaving}
        tabIndex={navHidden ? -1 : undefined}
        aria-expanded={infoOpen}
        aria-controls="watch-model-info"
        className={`watch-info-toggle ${
          infoOpen ? "is-active is-panel-open" : ""
        } ${navHidden ? "is-nav-hidden" : ""}`}
      >
        INFO
      </button>

      <button
        type="button"
        aria-label="Reveal navigation"
        aria-hidden={!navHidden}
        tabIndex={navHidden ? 0 : -1}
        onClick={(event) => {
          if (event.detail === 0) revealNavigation();
        }}
        onPointerDown={handleNavRevealPointerDown}
        className={`watch-nav-reveal-tab ${
          navHidden ? "is-visible" : ""
        } ${navRevealDragging ? "is-dragging" : ""}`}
        style={
          {
            "--watch-tab-drag": `${navRevealDrag}px`,
          } as React.CSSProperties
        }
      >
        <span aria-hidden="true">→</span>
      </button>

      <div
        className={`watch-studio fixed inset-0 z-[200] overflow-hidden text-black ${
          leaving ? "is-leaving" : entered ? "is-visible" : ""
        }`}
        style={{ backgroundColor: RENDER_BACKGROUNDS[sceneMode] }}
      >
      <ModelLoadingOverlay
        key={`${selectedModel.public_url}-${selectedEnvironmentUrl}`}
        catalogReady={catalogReady}
        geometryReady={modelGeometryReady}
        complete={modelAssetsComplete}
        onCompleted={handleModelFullyLoaded}
      />

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
        className={`watch-model-drawer fixed z-[65] flex flex-col overflow-hidden ${
          modelListOpen && !managerOpen ? "is-open" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setModelListOpen(false)}
          className="absolute right-5 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-8"
          aria-label="Close model list"
        >
          ×
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {models.map((model, index) => {
            const selected = model.id === selectedModel.id;

            return (
              <button
                key={model.id}
                type="button"
                onClick={() => handleModelSelect(model.id)}
                onPointerEnter={() => preloadThreeDModelAssets(model)}
                onFocus={() => preloadThreeDModelAssets(model)}
                className={`watch-model-list-item ${
                  selected ? "text-black" : "text-black/52"
                }`}
                style={{ "--model-index": index } as React.CSSProperties}
              >
                <span className="min-w-0">
                  <span className="block text-[clamp(18px,2.8vw,30px)] leading-tight">
                    {model.name}
                  </span>
                  {model.description && (
                    <span className="mx-auto mt-2 block max-w-[58ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52">
                      {model.description}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

      </aside>

      <aside
        id="watch-model-info"
        data-watch-info-panel
        aria-hidden={!infoOpen}
        className={`watch-info-drawer fixed z-[75] flex flex-col overflow-hidden ${
          infoOpen ? "is-open" : ""
        }`}
      >
        <button
          type="button"
          onClick={() => setInfoOpen(false)}
          className="absolute right-14 top-4 z-10 border-0 bg-transparent px-2 py-1 text-[16px] transition-transform hover:scale-110 active:scale-95 sm:right-16"
          aria-label="Close model information"
        >
          ×
        </button>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-8 py-20 text-center sm:px-12">
          <div
            className="watch-info-piece w-full"
            style={{ "--info-delay": "80ms" } as React.CSSProperties}
          >
            <p className="text-[clamp(19px,3vw,31px)] leading-tight text-black">
              {selectedModel.name}
            </p>
          </div>

          {selectedModel.description && (
            <div
              className="watch-info-piece mt-4 w-full"
              style={{ "--info-delay": "145ms" } as React.CSSProperties}
            >
              <p className="mx-auto max-w-[38ch] text-[clamp(11px,1.4vw,15px)] leading-relaxed text-black/52">
                {selectedModel.description}
              </p>
            </div>
          )}

          <nav
            className="watch-info-piece mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
            style={{ "--info-delay": "210ms" } as React.CSSProperties}
            aria-label="3D renderer style"
          >
            {RENDER_MODES.map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setRenderMode(mode.id)}
                aria-pressed={renderMode === mode.id}
                className={`watch-render-option ${
                  renderMode === mode.id ? "is-active" : ""
                }`}
              >
                {mode.label}
              </button>
            ))}
          </nav>

          {modelListNotice && (
            <div
              className="watch-info-piece mt-7 text-[9px] leading-relaxed text-black/45"
              style={{ "--info-delay": "275ms" } as React.CSSProperties}
            >
              {modelListNotice}
            </div>
          )}
        </div>
      </aside>

      <div
        className={`watch-model-stage watch-studio-canvas absolute inset-0 ${modelMotionClass}`}
        onPointerDown={handleModelPointerDown}
        onPointerMove={handleModelPointerMove}
        onPointerUp={handleModelPointerUp}
        onPointerCancel={() => {
          modelTapRef.current = null;
        }}
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
              scale={10}
              opacity={sceneMode === "arctic" ? 0.12 : 0.24}
              blur={3.25}
              far={5}
              resolution={512}
              smooth
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

      {managerOpen && isAdmin && (
        <section
          id="watch-model-manager"
          className="fixed inset-x-3 bottom-3 top-20 z-30 flex overflow-hidden rounded-[28px] border border-black/20 bg-white/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:bottom-5 sm:right-5 sm:top-20 sm:w-[min(760px,calc(100vw-40px))]"
        >
          <AdminThreeDModelManager
            onModelsChanged={() => void loadModels(true)}
          />
        </section>
      )}
      </div>
    </>
  );
}
