import { OCEAN_BOOT_ASSETS, oceanBootAssetUrl } from "@/lib/oceanBootAssets";

type OceanModule = typeof import("@/pages/OceanPage");
export interface OceanPreloadSnapshot {
  status: "idle" | "loading" | "assets-ready" | "ready" | "error";
  percent: number;
  error: string | null;
  phase?: "assets" | "world";
}
type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
type IdleWindow = Window & { requestIdleCallback?: (callback: () => void) => number; cancelIdleCallback?: (id: number) => void };

let snapshot: OceanPreloadSnapshot = { status: "idle", percent: 0, error: null };
const subscribers = new Set<() => void>();
const permissions = new Set<() => void>();
const downloaded = new Set<string>();
const loadedBytes = new Map<string, number>();
const downloads = new Map<string, Promise<void>>();
const failedDownloads = new Set<string>();
const totalBytes = OCEAN_BOOT_ASSETS.reduce((sum, asset) => sum + asset.bytes, 0);
let intent = false;
let attempt: Promise<void> | null = null;
let modulePromise: Promise<OceanModule> | null = null;
let preparedModule: OceanModule | null = null;
let resolvePrepared: ((module: OceanModule) => void) | null = null;
let preparedPromise: Promise<OceanModule> | null = null;
let assetsReady = false;
let environment: unknown;
let environmentReady = false;
let preparingWorld: OceanModule | null = null;

export const getOceanPreloadSnapshot = () => snapshot;
export function subscribeOceanPreload(listener: () => void): () => void {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

function publish(next: OceanPreloadSnapshot): void {
  if (next.status === snapshot.status && next.percent === snapshot.percent && next.error === snapshot.error && next.phase === snapshot.phase) return;
  snapshot = next;
  subscribers.forEach((listener) => listener());
}

function networkProgress(): number {
  const bytes = OCEAN_BOOT_ASSETS.reduce((sum, asset) => sum + Math.min(asset.bytes, loadedBytes.get(asset.path) ?? 0), 0);
  // Download completion is not parsed-cache readiness. Never report 100 early.
  return Math.min(99, Math.floor(bytes / totalBytes * 100));
}

function reportProgress(): void {
  if (snapshot.status === "loading") publish({ ...snapshot, percent: Math.max(snapshot.percent, networkProgress()) });
}

function connection(): Connection | undefined {
  return typeof navigator === "undefined" ? undefined : (navigator as Navigator & { connection?: Connection }).connection;
}

export function canWarmOceanInBackground(): boolean {
  const network = connection();
  return typeof document !== "undefined" && !document.hidden && document.visibilityState !== "hidden"
    && !network?.saveData && !["slow-2g", "2g", "3g"].includes(network?.effectiveType ?? "");
}

export function setOceanPreloadIntent(active: boolean): void {
  intent = active;
  if (!active) preparingWorld?.cancelOceanEntryWorld();
  permissions.forEach((wake) => wake());
}

export function setOceanPreloadEnvironment(value: unknown): void {
  environment = value;
  environmentReady = true;
  preparingWorld?.updatePreparedOceanEnvironment(value);
  permissions.forEach((wake) => wake());
}

function waitForWorldPermission(): Promise<boolean> {
  if (!intent) return Promise.resolve(false);
  if (environmentReady && !document.hidden && document.visibilityState !== "hidden") return Promise.resolve(true);
  return new Promise((resolve) => {
    const wake = () => {
      if (intent && (!environmentReady || document.hidden || document.visibilityState === "hidden")) return;
      permissions.delete(wake); document.removeEventListener("visibilitychange", wake);
      resolve(intent);
    };
    permissions.add(wake); document.addEventListener("visibilitychange", wake);
  });
}

function waitForPermission(signal: AbortSignal): Promise<void> {
  if (signal.aborted || intent || canWarmOceanInBackground()) return Promise.resolve();
  return new Promise((resolve) => {
    const network = connection();
    const wake = () => {
      if (!signal.aborted && !intent && !canWarmOceanInBackground()) return;
      permissions.delete(wake);
      document.removeEventListener("visibilitychange", wake);
      network?.removeEventListener("change", wake);
      signal.removeEventListener("abort", wake);
      resolve();
    };
    permissions.add(wake);
    document.addEventListener("visibilitychange", wake);
    network?.addEventListener("change", wake);
    signal.addEventListener("abort", wake, { once: true });
  });
}

function download(asset: typeof OCEAN_BOOT_ASSETS[number]): Promise<void> {
  if (downloaded.has(asset.path)) return Promise.resolve();
  const previous = downloads.get(asset.path);
  if (previous) return previous;
  const pending = (async () => {
    const response = await fetch(oceanBootAssetUrl(asset.path), {
      credentials: "same-origin", cache: failedDownloads.has(asset.path) ? "reload" : "force-cache",
      priority: intent ? "high" : "low",
    });
    if (!response.ok) throw new Error(`Ocean: ${asset.path} (${response.status})`);
    let bytes = 0;
    if (response.body?.getReader) {
      const reader = response.body.getReader();
      try {
        while (true) {
          const chunk = await reader.read();
          if (chunk.done) break;
          bytes += chunk.value.byteLength;
          loadedBytes.set(asset.path, bytes);
          reportProgress();
        }
      } finally { reader.releaseLock(); }
    } else {
      bytes = (await response.arrayBuffer()).byteLength;
    }
    // The manifest uses uncompressed source bytes, not Content-Length (which
    // can describe gzip on GitHub). A stale/HTML response is not readiness.
    if (bytes !== asset.bytes) throw new Error(`Ocean: file incompleto o non aggiornato (${asset.path}).`);
    loadedBytes.set(asset.path, bytes);
    downloaded.add(asset.path);
    failedDownloads.delete(asset.path);
    reportProgress();
  })().catch((error) => {
    failedDownloads.add(asset.path);
    loadedBytes.delete(asset.path);
    throw error;
  }).finally(() => { if (downloads.get(asset.path) === pending) downloads.delete(asset.path); });
  downloads.set(asset.path, pending);
  return pending;
}

function oceanModule(): Promise<OceanModule> {
  if (!modulePromise) {
    modulePromise = import("@/pages/OceanPage").catch((error) => { modulePromise = null; throw error; });
  }
  return modulePromise;
}

/** Same work is shared by idle Home warmup, click intent and React.lazy. */
export function preloadOceanExperience(options: { intent?: boolean } = {}): Promise<void> {
  if (options.intent) setOceanPreloadIntent(true);
  if (snapshot.status === "ready") return Promise.resolve();
  if (assetsReady && !intent) return Promise.resolve();
  if (attempt) return attempt;
  publish({ status: "loading", percent: networkProgress(), error: null, phase: assetsReady ? "world" : "assets" });
  const permission = new AbortController();
  const pending = (async () => {
    let next = 0;
    const worker = async () => {
      while (!permission.signal.aborted) {
        await waitForPermission(permission.signal);
        if (permission.signal.aborted) return;
        const asset = OCEAN_BOOT_ASSETS[next++];
        if (!asset) return;
        await download(asset);
      }
    };
    const [module] = await Promise.all([oceanModule(), assetsReady ? Promise.resolve() : Promise.all([worker(), worker()])]);
    if (!assetsReady) {
      await waitForPermission(permission.signal);
      await module.preloadOceanExperience();
      assetsReady = true;
    }
    let allowed = await waitForWorldPermission();
    while (allowed && intent && (document.hidden || document.visibilityState === "hidden")) allowed = await waitForWorldPermission();
    // A permission promise can resolve just before the same task cancels the
    // route. Its old boolean must never mount Canvas after intent was cleared.
    if (!allowed || !intent) {
      publish({ status: "assets-ready", percent: 99, error: null, phase: "world" });
      return;
    }
    publish({ status: "loading", percent: 99, error: null, phase: "world" });
    preparingWorld = module;
    const worldReady = await module.prepareOceanEntryWorld(environment);
    preparingWorld = null;
    if (!worldReady || !intent) {
      publish({ status: "assets-ready", percent: 99, error: null, phase: "world" });
      return;
    }
    preparedModule = module;
    publish({ status: "ready", percent: 100, error: null, phase: "world" });
    resolvePrepared?.(module);
    resolvePrepared = null;
  })().catch((error) => {
    permission.abort();
    preparingWorld?.cancelOceanEntryWorld(); preparingWorld = null;
    publish({ status: "error", percent: Math.min(99, snapshot.percent), error: error instanceof Error ? error.message : "Connessione non disponibile." });
    throw error;
  }).finally(() => { if (attempt === pending) attempt = null; });
  attempt = pending;
  return pending;
}

/** A failed attempt leaves Suspense recoverable; Retry settles this same wait. */
export function loadPreparedOceanPage(): Promise<OceanModule> {
  if (preparedModule && snapshot.status === "ready") return Promise.resolve(preparedModule);
  if (!preparedPromise) preparedPromise = new Promise((resolve) => { resolvePrepared = resolve; });
  void preloadOceanExperience({ intent: true }).catch(() => undefined);
  return preparedPromise;
}

/** Wait for the actual menu animations, then use an idle slot, never the splash. */
export function scheduleOceanPreload(menu: HTMLElement | null): () => void {
  let cancelled = false;
  let idle: number | null = null;
  let fallback: number | null = null;
  const browser = window as IdleWindow;
  const animations = menu?.getAnimations?.({ subtree: true }).filter((animation) => animation.effect?.getTiming().iterations !== Infinity) ?? [];
  void Promise.all(animations.map((animation) => animation.finished.catch(() => undefined))).then(() => {
    if (cancelled || !canWarmOceanInBackground() || snapshot.status === "ready") return;
    const begin = () => { if (!cancelled && canWarmOceanInBackground()) void preloadOceanExperience().catch(() => undefined); };
    if (browser.requestIdleCallback) idle = browser.requestIdleCallback(begin);
    else fallback = window.setTimeout(begin, 0);
  });
  return () => {
    cancelled = true;
    if (idle !== null) browser.cancelIdleCallback?.(idle);
    if (fallback !== null) window.clearTimeout(fallback);
  };
}
