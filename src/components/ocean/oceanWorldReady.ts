export const OCEAN_WORLD_FRAME_EVENT = "ocean-world-frame-ready";

/** Called by the last committed child of the critical scene Suspense boundary. */
export function setOceanCriticalSceneMounted(mounted: boolean): void {
  const host = document.getElementById("global-sky-ocean-bg");
  if (host) host.setAttribute("data-ocean-scene-mounted", mounted ? "1" : "0");
}

/** Called ONLY after the owned main-camera gl.render has actually returned. */
export function confirmOceanWorldFrame(): void {
  const host = document.getElementById("global-sky-ocean-bg");
  const token = host?.getAttribute("data-ocean-preparing");
  if (!host || !token || document.hidden || document.visibilityState === "hidden"
    || host.style.display === "none" || host.getAttribute("data-render-active") !== "1"
    || host.getAttribute("data-ocean-scene-mounted") !== "1") return;
  window.dispatchEvent(new CustomEvent(OCEAN_WORLD_FRAME_EVENT, { detail: { token } }));
}
