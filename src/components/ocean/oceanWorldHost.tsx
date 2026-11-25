import { Component, Suspense, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import SkyOceanBackground from "@/components/SkyOceanBackground";
import { oceanEnvironmentState } from "./OceanEnvironmentController";
import { normalizeOceanEnvironment, OCEAN_ENVIRONMENT_EVENT } from "@/types/oceanEnvironment";
import { OCEAN_WORLD_FRAME_EVENT } from "./oceanWorldReady";

type OceanWindow = Window & { __GLOBAL_SKY_OCEAN_BG_ROOT__?: Root };
let generation = 0;
let preparation: { token: string; resolve: (ready: boolean) => void; reject: (error: Error) => void; cleanup: () => void } | null = null;
let failedRoot = false;

function signal(name: string, detail: unknown): void { window.dispatchEvent(new CustomEvent(name, { detail })); }
function pause(host: HTMLElement): void {
  host.setAttribute("data-render-active", "0");
  host.setAttribute("data-audio-active", "0");
  host.setAttribute("data-explore", "0");
  host.style.visibility = "hidden";
  host.style.display = "none";
  signal("skyocean-audio", { active: false });
  signal("explore-mode", { enabled: false });
  signal("skyocean-render", { active: false });
}

class WorldBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) {
    failedRoot = true;
    const current = preparation;
    preparation = null;
    current?.cleanup();
    const host = document.getElementById("global-sky-ocean-bg");
    if (host) { host.removeAttribute("data-ocean-preparing"); pause(host); }
    current?.reject(error);
  }
  render() { return this.state.failed ? null : this.props.children; }
}

export function updateOceanWorldEnvironment(environment?: unknown): void {
  const host = document.getElementById("global-sky-ocean-bg");
  if (!host) return;
  const normalized = normalizeOceanEnvironment(environment);
  oceanEnvironmentState.current = normalized;
  host.setAttribute("data-ocean-environment", JSON.stringify(normalized));
  signal(OCEAN_ENVIRONMENT_EVENT, undefined);
}

function ensureHost(environment?: unknown): HTMLElement {
  const global = window as OceanWindow;
  let host = document.getElementById("global-sky-ocean-bg");
  if (!host) {
    host = document.createElement("div");
    host.id = "global-sky-ocean-bg";
    Object.assign(host.style, { position: "fixed", inset: "0", zIndex: "0", pointerEvents: "none", visibility: "hidden", display: "block" });
    document.body.prepend(host);
  }
  // The original materials/floor read this state during their first callbacks.
  // Publish saved values BEFORE creating/rendering any part of the world.
  updateOceanWorldEnvironment(environment);
  if (!global.__GLOBAL_SKY_OCEAN_BG_ROOT__) global.__GLOBAL_SKY_OCEAN_BG_ROOT__ = createRoot(host);
  return host;
}

/** No caller reaches this from background asset-only preparation. */
export function prepareOceanWorld(environment?: unknown): Promise<boolean> {
  const host = ensureHost(environment);
  if (host.getAttribute("data-ocean-world-ready") === "1" && !failedRoot) return Promise.resolve(true);
  if (preparation) return new Promise((resolve, reject) => {
    const previousResolve = preparation!.resolve, previousReject = preparation!.reject;
    preparation!.resolve = (ready) => { previousResolve(ready); resolve(ready); };
    preparation!.reject = (error) => { previousReject(error); reject(error); };
  });
  const token = String(++generation);
  const result = new Promise<boolean>((resolve, reject) => {
    const complete = (event: Event) => {
      if ((event as CustomEvent<{ token: string }>).detail.token !== token || preparation?.token !== token
        || host.getAttribute("data-ocean-preparing") !== token) return;
      const current = preparation;
      preparation = null;
      current.cleanup();
      host.setAttribute("data-ocean-world-ready", "1");
      host.removeAttribute("data-ocean-preparing");
      pause(host);
      current.resolve(true);
    };
    const contextLost = () => {
      host.setAttribute("data-ocean-world-ready", "0");
      const current = preparation;
      if (!current || current.token !== token) return;
      preparation = null; current.cleanup(); host.removeAttribute("data-ocean-preparing"); pause(host);
      current.reject(new Error("Il contesto grafico non è disponibile. Riprova o ricarica la pagina."));
    };
    window.addEventListener(OCEAN_WORLD_FRAME_EVENT, complete);
    host.addEventListener("webglcontextlost", contextLost, true);
    preparation = { token, resolve, reject, cleanup: () => { window.removeEventListener(OCEAN_WORLD_FRAME_EVENT, complete); host.removeEventListener("webglcontextlost", contextLost, true); } };
  });
  host.setAttribute("data-ocean-preparing", token);
  host.setAttribute("data-render-active", "1");
  host.setAttribute("data-audio-active", "0");
  host.setAttribute("data-explore", "0");
  host.style.display = "block";
  host.style.visibility = "hidden";
  if (host.getAttribute("data-ocean-root-mounted") !== "1" || failedRoot) {
    failedRoot = false;
    host.setAttribute("data-ocean-root-mounted", "1");
    (window as OceanWindow).__GLOBAL_SKY_OCEAN_BG_ROOT__!.render(<WorldBoundary key={token}><Suspense fallback={null}><SkyOceanBackground /></Suspense></WorldBoundary>);
  }
  signal("skyocean-render", { active: true });
  return result;
}

/** A cancelled loading entry keeps caches/context but never keeps running. */
export function cancelOceanWorldPreparation(): void {
  const current = preparation;
  if (!current) return; // Never interrupt the displayed Ocean's reverse exit.
  preparation = null;
  current.cleanup();
  const host = document.getElementById("global-sky-ocean-bg");
  if (host) { host.removeAttribute("data-ocean-preparing"); pause(host); }
  current.resolve(false);
}

/** Called by the actual route only, after its first complete frame is cached. */
export function activateOceanWorld(environment?: unknown): HTMLElement {
  const host = ensureHost(environment);
  host.removeAttribute("data-ocean-preparing");
  host.style.display = "block";
  host.style.visibility = "visible";
  host.setAttribute("data-render-active", "1");
  host.setAttribute("data-audio-active", "1");
  return host;
}
