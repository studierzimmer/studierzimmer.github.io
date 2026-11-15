import { PageFlip } from "page-flip";
import packageText from "page-flip/package.json?raw";
import { createBookFrameScheduler } from "./bookFrameScheduler";

// Instance-local integration with StPageFlip 2.0.7 (MIT, © 2020 Nodlik).
// Its renderer is assigned before loadFromHTML calls start(). Intercepting that
// assignment avoids ever starting its otherwise uncancellable global RAF loop.
// No dependency files or browser/global APIs are patched.
const SUPPORTED_VERSION = "2.0.7";
type NativeEvent = { data: unknown; object: NativeBookEngine };
type NativeUI = { clear: () => void; destroy: () => void; update: () => void; removeHandlers?: () => void };
interface Renderer {
  start: () => void;
  update: () => void;
  render: (time: number) => void;
  startAnimation: (...args: unknown[]) => void;
  timer: number;
  animation: { startedAt: number } | null;
}
export interface NativeBookEngine {
  on: (name: string, callback: (event: NativeEvent) => void) => unknown;
  off: (name: string) => unknown;
  loadFromHTML: (pages: HTMLElement[]) => void;
  updateFromHtml: (pages: HTMLElement[]) => void;
  getUI: () => NativeUI;
  getState: () => "read" | "user_fold" | "fold_corner" | "flipping";
  getCurrentPageIndex: () => number;
  getOrientation: () => "portrait" | "landscape";
  getBoundsRect: () => { pageWidth: number };
  flipNext: () => void;
  flipPrev: () => void;
}

export function createOwnedBookEngine(
  root: HTMLElement,
  settings: Record<string, unknown>,
  pages: HTMLElement[],
  onEvent: (name: string, event: NativeEvent) => void,
  Engine = PageFlip
) {
  const version = (JSON.parse(packageText) as { version: string }).version;
  if (version !== SUPPORTED_VERSION) throw new Error(`Book engine ${version} needs a lifecycle compatibility review (expected ${SUPPORTED_VERSION}).`);
  const engine = new Engine(root, settings) as NativeBookEngine;
  let disposed = false;
  let renderer: Renderer | null = null;
  let scheduler: ReturnType<typeof createBookFrameScheduler> | null = null;
  let hiddenAt: number | null = null;
  let pendingUIUpdate = false;
  let pendingPages: HTMLElement[] | null = null;
  let flushUI: (() => void) | null = null;
  Object.defineProperty(engine, "render", {
    configurable: true,
    get: () => renderer,
    set: (value: Renderer) => {
      if (!value || typeof value.render !== "function" || typeof value.startAnimation !== "function" || typeof value.update !== "function" || typeof value.timer !== "number" || !("animation" in value)) {
        throw new Error("Unsupported PageFlip renderer lifecycle; refusing an unmanaged animation loop.");
      }
      renderer = value;
      const draw = value.render.bind(value);
      const startAnimation = value.startAnimation.bind(value);
      let lastDrawTime = 0;
      scheduler = createBookFrameScheduler({
        request: (callback) => window.requestAnimationFrame(callback),
        cancel: (id) => window.cancelAnimationFrame(id),
        connected: () => root.isConnected,
        busy: () => value.animation !== null || engine.getState() !== "read",
        draw: (time) => {
          // RAF uses the frame's timestamp, which may be slightly older than a
          // performance.now() sampled by an input handler in that same frame.
          // Native 2.0.7 does not guard a negative animation-frame index.
          const drawTime = Math.max(time, lastDrawTime, value.animation?.startedAt ?? 0);
          lastDrawTime = drawTime;
          draw(drawTime);
          // Native changeState is emitted just before its state field changes.
          // Flush deferred layout only after the complete native frame returns.
          if (engine.getState() === "read") {
            flushUI?.();
            if (pendingPages) { const next = pendingPages; pendingPages = null; engine.updateFromHtml(next); }
          }
        },
      });
      value.start = () => { value.update(); scheduler?.wake(); };
      value.startAnimation = (...args) => {
        // Native animations use the last frame's clock; refresh it after sleep.
        value.timer = performance.now();
        startAnimation(...args);
        scheduler?.wake();
      };
    },
  });
  const events = ["flip", "changeOrientation", "changeState", "init", "update"];
  events.forEach((name) => engine.on(name, (event) => {
    if (disposed) return;
    scheduler?.wake();
    onEvent(name, event);
  }));
  const visibility = () => {
    if (document.hidden) {
      hiddenAt = performance.now();
      scheduler?.pause(true);
    } else {
      if (hiddenAt !== null && renderer?.animation) renderer.animation.startedAt += performance.now() - hiddenAt;
      hiddenAt = null;
      scheduler?.pause(false);
    }
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    scheduler?.dispose();
    document.removeEventListener("visibilitychange", visibility);
    events.forEach((name) => engine.off(name));
    const ui = engine.getUI();
    ui?.removeHandlers?.();
    ui?.clear(); // Restore React-owned pages before removing native wrappers.
    ui?.destroy(); // Native destroy() would also remove React's root element.
  };
  try {
    engine.loadFromHTML(pages);
    const ui = engine.getUI();
    const updateUI = ui.update.bind(ui);
    ui.update = () => {
      if (disposed) return;
      if (engine.getState() !== "read") { pendingUIUpdate = true; return; }
      pendingUIUpdate = false;
      updateUI(); scheduler?.wake();
    };
    flushUI = () => { if (pendingUIUpdate) ui.update(); };
    document.addEventListener("visibilitychange", visibility);
    if (document.hidden) visibility();
  } catch (error) {
    dispose();
    throw error;
  }
  return { engine, dispose, wake: () => scheduler?.wake(), update: (nextPages: HTMLElement[]) => {
    if (disposed) return;
    if (engine.getState() !== "read") pendingPages = nextPages;
    else engine.updateFromHtml(nextPages);
    scheduler?.wake();
  } };
}
