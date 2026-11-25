// Isolated Ocean preparation/progress regressions. No browser/network/DB writes.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const compile = (source, require, globals = {}, extra = "") => {
  const exported = {};
  vm.runInNewContext(`${ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText}\n${extra}`, { exports: exported, require, console, Promise, AbortController, queueMicrotask, ...globals });
  return exported;
};
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
const flush = async (count = 80) => { for (let i = 0; i < count; i++) await Promise.resolve(); };
const assets = compile(read("src/lib/oceanBootAssets.ts").replaceAll("import.meta.env.BASE_URL", '"/portfolio/"'), () => { throw new Error("Asset metadata must be dependency-free"); });
const manifest = Array.from(assets.OCEAN_BOOT_ASSETS);
for (const asset of manifest) {
  assert.equal(fs.statSync(new URL(`../public/${asset.path}`, import.meta.url)).size, asset.bytes, `honest progress requires current original bytes for ${asset.path}`);
  assert.equal(assets.oceanBootAssetUrl(asset.path), `/portfolio/${asset.path}`);
}
assert.equal(manifest.length, 5);
assert.ok(manifest.some((asset) => asset.path === "island.bin"), "external glTF buffers must be prepared too");
assert.ok(manifest.every((asset) => !/\.mp3|pirate|cessna/i.test(asset.path)), "background preparation never downloads audio or alternate figures");

class Events {
  listeners = new Map();
  addEventListener(name, callback) { if (!this.listeners.has(name)) this.listeners.set(name, new Set()); this.listeners.get(name).add(callback); }
  removeEventListener(name, callback) { this.listeners.get(name)?.delete(callback); }
  fire(name, event = { type: name }) { this.listeners.get(name)?.forEach((callback) => callback(event)); }
  dispatchEvent(event) { this.fire(event.type, event); return true; }
}
function store({ parse = deferred(), world = deferred(), environmentAvailable = true, effectiveType = "4g", saveData = false, fail = new Set(), chunkGate = null } = {}) {
  const document = Object.assign(new Events(), { hidden: false, visibilityState: "visible" });
  const connection = Object.assign(new Events(), { effectiveType, saveData });
  const idle = new Map(); let idleId = 0, inFlight = 0, maximum = 0, preparations = 0;
  const requests = [], states = [];
  const window = { requestIdleCallback(callback) { idle.set(++idleId, callback); return idleId; }, cancelIdleCallback(id) { idle.delete(id); }, setTimeout, clearTimeout };
  const worlds = [world], worldCalls = [];
  let activeWorld = null;
  const module = { default: "OceanPage", preloadOceanExperience() { preparations++; return parse.promise; },
    prepareOceanEntryWorld(environment) { worldCalls.push(environment); activeWorld = worlds.at(-1); return activeWorld.promise; },
    cancelOceanEntryWorld() { activeWorld?.resolve(false); }, updatePreparedOceanEnvironment() {},
  };
  const api = compile(read("src/lib/oceanPreload.ts"), (id) => {
    if (id === "@/lib/oceanBootAssets") return assets;
    if (id === "@/pages/OceanPage") return module;
    throw new Error(`Unexpected preload dependency: ${id}`);
  }, {
    document, navigator: { connection }, window,
    fetch: async (url, options) => {
      const asset = manifest.find((candidate) => url === assets.oceanBootAssetUrl(candidate.path));
      assert.ok(asset, `only exact original boot assets may load: ${url}`);
      requests.push({ path: asset.path, options });
      inFlight++; maximum = Math.max(maximum, inFlight);
      let part = 0;
      return { ok: true, status: 200, body: { getReader: () => ({
        async read() {
          if (chunkGate) await chunkGate.promise;
          if (fail.has(asset.path)) { inFlight--; throw new Error("Temporary network failure"); }
          part++;
          if (part === 3) { inFlight--; return { done: true }; }
          return { done: false, value: { byteLength: part === 1 ? Math.floor(asset.bytes / 2) : asset.bytes - Math.floor(asset.bytes / 2) } };
        }, releaseLock() {},
      }) } };
    },
  });
  api.subscribeOceanPreload(() => states.push({ ...api.getOceanPreloadSnapshot() }));
  if (environmentAvailable) api.setOceanPreloadEnvironment({ waterColor: "#saved-before-first-frame" });
  return { api, parse, world, worldCalls, nextWorld() { const next = deferred(); worlds.push(next); return next; }, document, connection, requests, states, idle, fail, module, get maximum() { return maximum; }, get preparations() { return preparations; } };
}

{
  const f = store();
  const pending = f.api.loadPreparedOceanPage();
  assert.equal(f.api.loadPreparedOceanPage(), pending, "repeated clicks/React.lazy share one pending readiness wait");
  await flush();
  assert.equal(f.requests.length, manifest.length);
  assert.ok(f.requests.every((request) => request.options.priority === "high"), "explicit entry starts foreground-priority assets");
  assert.equal(f.maximum, 2, "network concurrency stays bounded on mobile");
  assert.equal(f.preparations, 1);
  assert.equal(f.api.getOceanPreloadSnapshot().percent, 99, "all bytes are still not parsed renderer-cache readiness");
  assert.equal(f.api.getOceanPreloadSnapshot().status, "loading");
  let resolved = false; pending.then(() => { resolved = true; }); await flush(); assert.equal(resolved, false);
  const progressing = f.states.filter((state) => state.status === "loading").map((state) => state.percent);
  assert.ok(progressing.every((percent, index) => percent < 100 && (!index || percent >= progressing[index - 1])));
  f.parse.resolve();
  await flush(); assert.equal(f.api.getOceanPreloadSnapshot().percent, 99, "parsed assets still do not certify a complete GPU world frame");
  assert.equal(f.worldCalls.length, 1);
  assert.equal(f.worldCalls[0].waterColor, "#saved-before-first-frame");
  f.world.resolve(true);
  assert.equal(await pending, f.module);
  assert.equal(f.api.getOceanPreloadSnapshot().percent, 100);
  assert.equal(f.api.getOceanPreloadSnapshot().status, "ready");
  const requestCount = f.requests.length;
  assert.equal(await f.api.loadPreparedOceanPage(), f.module);
  await f.api.preloadOceanExperience({ intent: true });
  assert.equal(f.requests.length, requestCount, "a prepared return makes no fetches or new parsing work");
  assert.equal(f.preparations, 1);
}
{
  const f = store({ fail: new Set(["wolfy.glb"]) });
  let settled = false;
  const route = f.api.loadPreparedOceanPage(); route.then(() => { settled = true; });
  await flush();
  assert.equal(f.api.getOceanPreloadSnapshot().status, "error");
  assert.equal(settled, false, "recoverable failures never poison React.lazy with a cached rejection");
  assert.ok(f.api.getOceanPreloadSnapshot().percent < 100);
  f.fail.clear();
  const retry = f.api.preloadOceanExperience({ intent: true });
  await flush();
  const retryRequest = f.requests.filter((request) => request.path === "wolfy.glb");
  assert.equal(retryRequest.length, 2);
  assert.equal(retryRequest[1].options.cache, "reload", "a failed/stale asset can retry without changing its source URL");
  f.parse.resolve(); await flush(); f.world.resolve(true); await retry; await route;
  assert.equal(settled, true);
  assert.equal(f.api.getOceanPreloadSnapshot().status, "ready");
}
for (const policy of [{ saveData: true }, { effectiveType: "slow-2g" }, { effectiveType: "2g" }, { effectiveType: "3g" }]) {
  const f = store(policy);
  assert.equal(f.api.canWarmOceanInBackground(), false);
  f.api.scheduleOceanPreload({ getAnimations: () => [] }); await flush();
  assert.equal(f.idle.size, 0); assert.equal(f.requests.length, 0, "data-saving/slow links do not download Ocean speculatively");
  const entry = f.api.preloadOceanExperience({ intent: true }); await flush();
  assert.equal(f.requests.length, manifest.length, "an explicit Ocean request overrides the speculative download policy");
  f.parse.resolve(); await flush(); f.world.resolve(true); await entry;
}
{
  const f = store(); const animation = deferred();
  const cancel = f.api.scheduleOceanPreload({ getAnimations: () => [{ effect: { getTiming: () => ({ iterations: 1 }) }, finished: animation.promise }] });
  await flush(); assert.equal(f.idle.size, 0);
  animation.resolve(); await flush(); assert.equal(f.idle.size, 1, "Home waits for actual menu entry animations before requesting idle work");
  cancel(); assert.equal(f.idle.size, 0); assert.equal(f.requests.length, 0, "leaving Home cancels work that has not begun");
  f.document.hidden = true; assert.equal(f.api.canWarmOceanInBackground(), false);
}
{
  const gate = deferred(); const f = store({ chunkGate: gate });
  f.api.scheduleOceanPreload({ getAnimations: () => [] }); await flush();
  [...f.idle.values()][0](); await flush();
  const starts = f.requests.length; assert.equal(starts, 2);
  assert.ok(f.requests.every((request) => request.options.priority === "low"), "speculative work cannot outrank the menu or other requested page assets");
  const entered = f.api.loadPreparedOceanPage(); f.api.setOceanPreloadIntent(false);
  gate.resolve(); await flush();
  assert.equal(f.requests.length, manifest.length, "cancelled navigation reuses healthy shared downloads rather than discarding them");
  f.parse.resolve(); await flush();
  assert.equal(f.api.getOceanPreloadSnapshot().status, "assets-ready");
  assert.equal(f.worldCalls.length, 0, "cancelled intent never mounts a world after background parsing finishes");
  const resumed = f.api.loadPreparedOceanPage(); await flush(); f.world.resolve(true); await resumed; await entered;
}
{
  const gate = deferred(); const f = store({ chunkGate: gate });
  const background = f.api.preloadOceanExperience(); await flush();
  assert.equal(f.requests.length, 2);
  f.document.hidden = true; f.document.visibilityState = "hidden";
  gate.resolve(); await flush();
  assert.equal(f.requests.length, 2, "a hidden background page finishes healthy transfers but starts no more assets");
  const foreground = f.api.preloadOceanExperience({ intent: true });
  assert.equal(foreground, background, "explicit intent resumes the same paused background attempt");
  await flush(); assert.equal(f.requests.length, manifest.length);
  f.document.hidden = false; f.document.visibilityState = "visible"; f.document.fire("visibilitychange");
  f.parse.resolve(); await flush(); f.world.resolve(true); await foreground;
}
{
  const f = store(); const background = f.api.preloadOceanExperience(); await flush(); f.parse.resolve(); await background;
  assert.equal(f.api.getOceanPreloadSnapshot().status, "assets-ready");
  assert.equal(f.api.getOceanPreloadSnapshot().percent, 99);
  assert.equal(f.worldCalls.length, 0, "idle cache readiness must never create Canvas/world/audio");
  const route = f.api.loadPreparedOceanPage(); await flush(); assert.equal(f.worldCalls.length, 1);
  f.api.setOceanPreloadIntent(false); await flush();
  assert.equal(f.api.getOceanPreloadSnapshot().status, "assets-ready", "cancelled GPU preparation cannot publish100 or resolve the route");
  const next = f.nextWorld(); const resumed = f.api.loadPreparedOceanPage(); await flush(); next.resolve(true); await route; await resumed;
  assert.equal(f.api.getOceanPreloadSnapshot().status, "ready");
}
{
  const f = store({ environmentAvailable: false }); const route = f.api.loadPreparedOceanPage(); await flush(); f.parse.resolve(); await flush();
  assert.equal(f.worldCalls.length, 0, "GPU preparation waits for saved settings to settle even when downloads are already cached");
  f.api.setOceanPreloadEnvironment({ waterColor: "#123456" }); await flush(); assert.equal(f.worldCalls[0].waterColor, "#123456");
  f.world.resolve(true); await route;
}
{
  const f = store({ environmentAvailable: false });
  f.api.loadPreparedOceanPage(); await flush(); f.parse.resolve(); await flush();
  f.api.setOceanPreloadEnvironment({ waterColor: "#123456" });
  f.api.setOceanPreloadIntent(false); // Cancel before the permission continuation.
  await flush();
  assert.equal(f.worldCalls.length, 0, "a stale true permission cannot mount Canvas after the same task cancels entry");
  assert.equal(f.api.getOceanPreloadSnapshot().status, "assets-ready");
}

// Real retained-host ownership and token-bound post-main-render signal.
{
  const window = new Events(), calls = [], environmentState = { current: null };
  let host = null;
  const document = { hidden: false, visibilityState: "visible", getElementById: () => host, createElement: () => Object.assign(new Events(), {
    style: {}, attributes: new Map(),
    setAttribute(name, value) { this.attributes.set(name, value); },
    getAttribute(name) { return this.attributes.get(name) ?? null; },
    removeAttribute(name) { this.attributes.delete(name); },
  }), body: { prepend: (element) => { host = element; } } };
  const CustomEvent = class { constructor(type, options) { this.type = type; this.detail = options?.detail; } };
  const ready = compile(read("src/components/ocean/oceanWorldReady.ts"), () => { throw new Error("Frame proof must remain lightweight"); }, { document, window, CustomEvent });
  const owner = compile(read("src/components/ocean/oceanWorldHost.tsx"), (id) => {
    if (id === "react") return { Component: class {}, Suspense: "Suspense" };
    if (id === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }) };
    if (id === "react-dom/client") return { createRoot: () => { calls.push("root"); return { render(tree) { assert.equal(JSON.parse(host.getAttribute("data-ocean-environment")).waterColor, "#saved"); assert.equal(environmentState.current.waterColor, "#saved"); calls.push(tree); } }; } };
    if (id === "@/components/SkyOceanBackground") return { default: "OriginalSky" };
    if (id === "./OceanEnvironmentController") return { oceanEnvironmentState: environmentState };
    if (id === "@/types/oceanEnvironment") return { normalizeOceanEnvironment: (value) => ({ waterColor: "default", ...value }), OCEAN_ENVIRONMENT_EVENT: "settings-ready" };
    if (id === "./oceanWorldReady") return ready;
    throw new Error(`Unexpected world host dependency: ${id}`);
  }, { document, window, CustomEvent });
  const first = owner.prepareOceanWorld({ waterColor: "#saved" });
  assert.equal(host.style.display, "block"); assert.equal(host.style.visibility, "hidden");
  assert.equal(host.getAttribute("data-audio-active"), "0"); assert.equal(host.getAttribute("data-explore"), "0");
  const staleToken = host.getAttribute("data-ocean-preparing");
  ready.confirmOceanWorldFrame(); assert.equal(host.getAttribute("data-ocean-world-ready"), null, "placeholder/partial Suspense frames are not complete scenes");
  owner.cancelOceanWorldPreparation(); assert.equal(await first, false);
  assert.equal(host.getAttribute("data-render-active"), "0"); assert.equal(host.style.display, "none");
  window.dispatchEvent(new CustomEvent(ready.OCEAN_WORLD_FRAME_EVENT, { detail: { token: staleToken } }));
  assert.equal(host.getAttribute("data-ocean-world-ready"), null, "cancelled generations cannot certify a later world");
  const next = owner.prepareOceanWorld({ waterColor: "#saved" });
  ready.setOceanCriticalSceneMounted(true);
  document.hidden = true; ready.confirmOceanWorldFrame(); assert.equal(host.getAttribute("data-ocean-world-ready"), null);
  document.hidden = false; ready.confirmOceanWorldFrame(); assert.equal(await next, true);
  assert.equal(host.getAttribute("data-ocean-world-ready"), "1"); assert.equal(host.getAttribute("data-render-active"), "0", "first complete frame is held/paused until the actual intro route activates it");
  assert.equal(calls.filter((call) => call === "root").length, 1, "cancel/resume retains one world context/root");
  owner.activateOceanWorld({ waterColor: "#saved" }); owner.cancelOceanWorldPreparation();
  assert.equal(host.style.visibility, "visible"); assert.equal(host.getAttribute("data-render-active"), "1");
  assert.equal(host.getAttribute("data-audio-active"), "1", "only actual Ocean activation permits ambience");
}
{
  const controller = read("src/components/ocean/OceanEnvironmentController.tsx");
  assert.match(controller, /const frame = gl\.info\.render\.frame;\s*gl\.render\(scene, camera\);\s*if \(gl\.info\.render\.frame > frame && !gl\.getContext\(\)\.isContextLost\(\)\) confirmOceanWorldFrame\(\)/, "only this root's actual successful final render certifies GPU readiness");
  const sky = read("src/components/SkyOceanBackground.tsx");
  assert.match(sky, /<Player\s*\/>\s*\{!laboratory && <OceanCriticalSceneMarker\s*\/>\}\s*<\/Suspense>/, "the scene marker belongs inside/after every critical suspense child, never the blue placeholder");
}

// Exercise the real asset-only primer with mocked React/render-cache hooks.
{
  const calls = [], effects = [], roots = [];
  const TextureLoader = class TextureLoader {};
  const useGLTF = (url) => { calls.push(["gltf-read", url]); return {}; };
  useGLTF.preload = (url) => calls.push(["gltf-preload", url]); useGLTF.clear = (url) => calls.push(["gltf-clear", url]);
  const useLoader = (loader, url) => { assert.equal(loader, TextureLoader); calls.push(["texture-read", url]); return {}; };
  useLoader.preload = (loader, url) => { assert.equal(loader, TextureLoader); calls.push(["texture-preload", url]); };
  useLoader.clear = (loader, url) => calls.push(["texture-clear", url]);
  const primer = compile(read("src/components/ocean/OceanAssetPreloader.tsx"), (id) => {
    if (id === "react") return { Component: class {}, Suspense: "Suspense", useEffect: (callback) => effects.push(callback) };
    if (id === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }) };
    if (id === "react-dom/client") return { createRoot: (container) => { assert.equal(container.kind, "fragment"); const root = { render: (tree) => { root.tree = tree; }, unmount: () => calls.push(["unmount"]) }; roots.push(root); return root; } };
    if (id === "@react-three/drei") return { useGLTF };
    if (id === "@react-three/fiber") return { useLoader };
    if (id === "three") return { TextureLoader };
    if (id === "@/lib/oceanBootAssets") return assets;
    throw new Error(`Asset primer may not import world/audio/input: ${id}`);
  }, { document: { createDocumentFragment: () => ({ kind: "fragment" }) } });
  const pending = primer.prepareOceanAssetCache(); assert.equal(primer.prepareOceanAssetCache(), pending);
  roots[0].tree.props.onError(new Error("Temporary model decoder failure"));
  await assert.rejects(pending, /Temporary model decoder failure/);
  assert.equal(calls.filter(([name]) => name === "gltf-clear").length, 2);
  assert.equal(calls.filter(([name]) => name === "texture-clear").length, 2, "only Ocean cache keys are cleared after a failed primer");
  const retry = primer.prepareOceanAssetCache();
  const boundary = roots[1].tree, ready = boundary.props.children.props.children;
  assert.equal(ready.type(ready.props), null);
  effects.shift()(); await retry;
  assert.equal(calls.filter(([name]) => name === "gltf-read").length, 2);
  assert.equal(calls.filter(([name]) => name === "texture-read").length, 2);
  assert.equal(calls.filter(([name]) => name === "unmount").length, 2, "both success and failure unmount their detached root exactly once");
  assert.equal(roots.length, 2);
}

// Overlay geometry stays outside route transforms; warm entries render nothing.
{
  let current = { status: "ready", percent: 100, error: null }; const portals = [], effectCallbacks = [];
  const overlay = compile(read("src/components/ocean/OceanLoadingOverlay.tsx"), (id) => {
    if (id === "react") return { useSyncExternalStore: () => current, useState: (initial) => [initial, () => {}], useEffect: (callback) => effectCallbacks.push(callback) };
    if (id === "react/jsx-runtime") return { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
    if (id === "react-dom") return { createPortal: (tree, host) => { portals.push({ tree, host }); return tree; } };
    if (id === "framer-motion") return { useReducedMotion: () => true };
    if (id === "@/components/SiteEditControl") return { useInlineSiteEditing: () => ({ settings: { menu_background_color: "#fff", menu_color: "#000", menu_font_family: "Original font" } }) };
    if (id === "@/lib/oceanPreload") return { subscribeOceanPreload() {}, getOceanPreloadSnapshot() {}, preloadOceanExperience: async () => {} };
    if (id.endsWith(".css")) return {};
    throw new Error(`Unexpected overlay import: ${id}`);
  }, { document: { body: { kind: "body" } } });
  assert.equal(overlay.default({ active: true, onCancel() {} }), null);
  assert.equal(portals.length, 0, "already-ready normal entry has no loading flash at all");
  current = { status: "loading", percent: 42, error: null };
  assert.equal(overlay.default({ active: false, onCancel() {} }), null, "background work never shows loading UI");
  const tree = overlay.default({ active: true, onCancel() {} });
  assert.equal(portals[0].host.kind, "body");
  const panel = tree.type(tree.props);
  const meter = panel.props.children[0], dots = meter.props.children[1];
  assert.equal(meter.props["aria-valuenow"], 42);
  assert.equal(dots.props.children.length, 3);
  assert.ok(dots.props.children.every((dot) => dot.props.children === "."));
}
const css = read("src/components/ocean/ocean-loading.css");
assert.match(css, /\.ocean-loading-overlay\s*\{[^}]*position:fixed;\s*inset:0/);
assert.match(css, /\.ocean-loading-meter\s*\{[^}]*left:50%;\s*top:50%;\s*transform:translate\(-50%,-50%\)/);
assert.match(css, /span:nth-child\(2\),\s*\.ocean-loading-dots\s*>\s*span:nth-child\(3\)\s*\{\s*animation:/);
assert.doesNotMatch(css, /opacity|filter:|animation:.*fade/i);
assert.match(css, /prefers-reduced-motion:reduce/);

console.log("PASS: exact original bytes, bounded/idle cache warming, parser AND complete-main-frame gated100, saved-env-before-render, recoverable lazy retry, cancellation/token/root retention, no backgroundCanvas, renderer-cache cleanup and centered conditional dots; no network/DB/browser.");
