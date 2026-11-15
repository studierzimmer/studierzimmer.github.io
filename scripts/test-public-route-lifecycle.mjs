// Deterministic import/lifecycle tests: no browser, WebGL, network or assets are
// changed. Runtime helpers use a stub of the same R3F root-store contract.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import React from "react";

const project = fileURLToPath(new URL("../", import.meta.url));
const read = (name) => fs.readFileSync(path.join(project, name), "utf8");
const ast = (name, text = read(name)) => ts.createSourceFile(name, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const visited = new Set();
const packages = new Set();
function localModule(specifier, from) {
  const base = specifier.startsWith("@/") ? path.join(project, "src", specifier.slice(2)) : path.resolve(path.dirname(from), specifier);
  return [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile() && /\.tsx?$/.test(candidate));
}
function visit(file) {
  if (visited.has(file)) return;
  visited.add(file);
  const source = fs.readFileSync(file, "utf8");
  for (const statement of ast(file, source).statements) {
    if (!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) continue;
    if (statement.isTypeOnly || statement.importClause?.isTypeOnly) continue;
    const bindings = statement.importClause?.namedBindings;
    if (!statement.importClause?.name && bindings && ts.isNamedImports(bindings) && bindings.elements.every((element) => element.isTypeOnly)) continue;
    const specifier = statement.moduleSpecifier?.text;
    if (!specifier) continue;
    if (!specifier.startsWith(".") && !specifier.startsWith("@/")) { packages.add(specifier); continue; }
    const next = localModule(specifier, file);
    if (next) visit(next);
  }
}
visit(path.join(project, "src/App.tsx"));
assert.ok(![...packages].some((name) => /^(?:three(?:\/|$)|three-stdlib|@react-three\/|react-pageflip|page-flip)/.test(name)), `Home imports heavy packages: ${[...packages].join(", ")}`);
assert.ok(![...visited].some((name) => /(?:SkyOceanBackground|OceanPage|PublicBookLibrary|FoldingBookViewer|LoadingLogoProgress)\.tsx$/.test(name)), "3D/book/progress modules stay outside the Home static closure");
const app = read("src/App.tsx");
assert.match(app, /PublicBookLibrary = lazy\(/);
assert.match(app, /Index = lazy\(loadOceanPage\)/);
assert.match(app, /if \(destination\.pathname === "\/navigate"\)/);
const display = ast("src/App.tsx").statements.find((statement) => ts.isVariableStatement(statement) && statement.declarationList.declarations.some((declaration) => declaration.name.getText() === "DisplayedViewport"));
assert.match(display.getText(), /useLayoutEffect\(/, "resume follows displayed location before paint, not requested destination");
assert.match(display.getText(), /data-render-active/);
assert.match(display.getText(), /skyocean-render/);

const skySource = ast("src/components/SkyOceanBackground.tsx");
const helpers = ["isOceanRenderActive", "setOceanFrameloop"].map((name) => skySource.statements.find((statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === name)?.getText()).join("\n");
assert.ok(helpers.includes("function isOceanRenderActive") && helpers.includes("function setOceanFrameloop"));
assert.ok(!skySource.statements.some((statement) => ts.isExpressionStatement(statement) && /useGLTF\.preload/.test(statement.getText())), "GLTF preloads never run at module evaluation");
const attrs = new Map([["data-render-active", "1"]]);
const host = { style: { display: "block" }, getAttribute: (name) => attrs.get(name) ?? null };
const doc = { hidden: false, visibilityState: "visible", getElementById: () => host };
const exported = {};
vm.runInNewContext(ts.transpileModule(`${helpers}\nexports.active = isOceanRenderActive; exports.loop = setOceanFrameloop;`, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText, { exports: exported, document: doc });
assert.equal(exported.active(), true);
// Requested URL changes do not affect rendering while the outgoing ocean is
// still displayed and its aperture has not finished reversing.
assert.equal(exported.active(), true);
host.style.display = "none";
assert.equal(exported.active(), false);
host.style.display = "block";
attrs.set("data-render-active", "0");
assert.equal(exported.active(), false);
attrs.set("data-render-active", "1");
doc.hidden = true;
assert.equal(exported.active(), false);
doc.hidden = false;
doc.visibilityState = "hidden";
assert.equal(exported.active(), false);
doc.visibilityState = "visible";
assert.equal(exported.active(), true);

const clock = { elapsedTime: 12.5 };
const savedTime = { current: 0 };
let invalidations = 0;
let frames = 0;
let state;
const get = () => state;
const setFrameloop = (mode) => { clock.elapsedTime = 0; state = { ...state, frameloop: mode }; };
state = { clock, frameloop: "always", get, setFrameloop, invalidate: () => invalidations++ };
const staleSnapshot = state;
const tick = () => { if (state.frameloop === "always") { frames++; clock.elapsedTime += 1 / 60; } };
exported.loop(staleSnapshot, false, savedTime);
assert.equal(state.frameloop, "never");
for (let index = 0; index < 120; index++) tick();
assert.equal(frames, 0, "inactive roots run neither useFrame subscribers nor renders");
assert.equal(clock.elapsedTime, 12.5);
exported.loop(staleSnapshot, true, savedTime);
assert.equal(state.frameloop, "always", "resume reads the current store, not stale onCreated state");
assert.equal(clock.elapsedTime, 12.5, "resume preserves shader phase without counting hidden time");
assert.equal(invalidations, 1, "resume explicitly schedules the first missing frame");
tick();
assert.equal(frames, 1);
exported.loop(staleSnapshot, true, savedTime);
assert.equal(invalidations, 1, "duplicate visibility events do not restart the clock/loop");
exported.loop(null, false, savedTime);
exported.loop(staleSnapshot, false, savedTime);
exported.loop(staleSnapshot, true, savedTime);
tick();
assert.equal(frames, 2, "repeated exits and re-entries keep rendering");
assert.match(read("src/components/SkyOceanBackground.tsx"), /frameloop=\{active \? "always" : "never"\}/);
assert.match(read("src/components/SkyOceanBackground.tsx"), /document\.addEventListener\("visibilitychange", sync\)/);
assert.doesNotMatch(read("src/pages/OceanPage.tsx"), /\.unmount\(/, "navigation retains the world/context/assets");
assert.match(read("src/pages/OceanPage.tsx"), /duration: 3000, delay: 1500/, "ocean intro retains the historical 3s reveal plus 1.5s anticipation");
assert.match(read("src/pages/OceanPage.tsx"), /layout="position"/, "About layout animation remains intact");

// The aircraft sound keeps its decoded buffer/source, but never fetches for
// the default figure and suspends immediately while the ocean is inactive.
const engine = skySource.statements.find((statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === "AircraftEngineSound").getText();
const audioListeners = new Map();
const audioEffects = [];
const contexts = [];
let engineFetches = 0;
let sourceStarts = 0;
let sourceStops = 0;
const parameter = () => ({ value: 0, cancelScheduledValues() {}, setValueAtTime(value) { this.value = value; }, linearRampToValueAtTime(value) { this.value = value; }, setTargetAtTime(value) { this.value = value; } });
class AudioContextStub {
  constructor() { this.state = "running"; this.currentTime = 0; this.destination = {}; contexts.push(this); }
  createGain() { return { gain: parameter(), connect() {}, disconnect() {} }; }
  decodeAudioData() { return Promise.resolve({}); }
  createBufferSource() { return { playbackRate: parameter(), connect() {}, disconnect() {}, start() { sourceStarts++; }, stop() { sourceStops++; } }; }
  async suspend() { this.state = "suspended"; }
  async resume() { this.state = "running"; }
  async close() { this.state = "closed"; }
}
const audio = {};
vm.runInNewContext(ts.transpileModule(`${helpers}\n${engine}\nexports.mount = AircraftEngineSound;`.replaceAll("import.meta.env.BASE_URL", '"/"'), { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText, {
  exports: audio,
  document: doc,
  useEffect: (effect) => audioEffects.push(effect),
  AudioContext: AudioContextStub,
  fetch: async (url) => { assert.equal(url, "/cessna-engine.wav"); engineFetches++; return { arrayBuffer: async () => new ArrayBuffer(0) }; },
  window: { addEventListener: (name, callback) => audioListeners.set(name, callback), removeEventListener: (name) => audioListeners.delete(name) },
});
const emitAudio = (name, detail) => audioListeners.get(name)?.({ detail });
const flushAudio = async () => { for (let index = 0; index < 12; index++) await Promise.resolve(); };
audio.mount();
const disposeAudio = audioEffects[0]();
assert.equal(engineFetches, 0);
emitAudio("ocean-active-character-change", { id: "bundled:wolfy" });
emitAudio("explore-mode", { enabled: true });
await flushAudio();
assert.equal(engineFetches, 0, "the default full-quality figure does not fetch an aircraft sound");
emitAudio("ocean-active-character-change", { id: "bundled:cessna-aircraft" });
await flushAudio();
assert.equal(engineFetches, 1);
assert.equal(sourceStarts, 1);
doc.hidden = true;
emitAudio("skyocean-activity", { active: false });
emitAudio("explore-mode", { enabled: false });
await flushAudio();
assert.equal(contexts[0].state, "suspended");
doc.hidden = false;
emitAudio("skyocean-activity", { active: true });
emitAudio("explore-mode", { enabled: true });
await flushAudio();
assert.equal(contexts[0].state, "running");
assert.equal(engineFetches, 1, "resume reuses the full-quality decoded sound");
assert.equal(sourceStarts, 1, "resume does not stack/restart engine sources");
disposeAudio();
assert.equal(sourceStops, 1);
assert.equal(contexts[0].state, "closed");
assert.equal(audioListeners.size, 0);

const logo = read("src/components/LoadingLogo.tsx");
assert.doesNotMatch(logo, /from ["']@react-three\//);
assert.match(logo, /const ENTRY_DELAY = 100/);
assert.match(logo, /const ALLOW_EXIT_DELAY = 500/);
assert.match(logo, /const EXIT_ANIM_DURATION = 400/);
assert.match(read("src/pages/PortfolioHome.tsx"), /autoCompleteAfter=\{1900\}/);
function progressEffects(showProgress, progress) {
  let stateIndex = 0;
  const effects = [];
  let rafCount = 0;
  let timerCount = 0;
  let nextId = 0;
  const queue = new Map();
  const hooks = { ...React, useState: (initial) => { const index = stateIndex++; return [index === 8 ? progress : typeof initial === "function" ? initial() : initial, () => {}]; }, useRef: (value) => ({ current: value }), useCallback: (fn) => fn, useEffect: (effect) => effects.push(effect) };
  const result = {};
  vm.runInNewContext(ts.transpileModule(logo, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText, {
    exports: result,
    require: (name) => name === "react" ? { __esModule: true, default: hooks, ...hooks } : { __esModule: true, default: "/original-logo.gif" },
    requestAnimationFrame: (callback) => { rafCount++; const id = ++nextId; queue.set(id, callback); return id; },
    cancelAnimationFrame: (id) => queue.delete(id),
    window: { setTimeout: () => { timerCount++; return 1; }, clearTimeout: () => {} },
  });
  const rendered = result.default({ showProgress, onComplete: () => {} });
  const findImage = (node) => {
    if (!node || typeof node !== "object") return null;
    if (Array.isArray(node)) return node.map(findImage).find(Boolean) ?? null;
    return node.type === "img" ? node : findImage(node.props?.children);
  };
  const cleanup = effects[0]();
  let iterations = 0;
  while (queue.size && iterations++ < 1000) {
    const pending = [...queue];
    queue.clear();
    pending.forEach(([, callback]) => callback());
  }
  cleanup?.();
  return { rafCount, timerCount, remaining: queue.size, iterations, image: findImage(rendered)?.props };
}
const homeSplash = progressEffects(false, 100);
assert.equal(homeSplash.rafCount, 0, "Home splash schedules no progress RAF");
assert.equal(homeSplash.timerCount, 0);
assert.equal(homeSplash.image.fetchpriority, "high", "native lowercase attribute supports installed React18 without unknown-prop warnings");
assert.equal(homeSplash.image.fetchPriority, undefined);
assert.equal(homeSplash.image.decoding, "async");
assert.equal(progressEffects(true, 0).rafCount, 0, "stable progress does not spin an idle RAF");
const completed = progressEffects(true, 100);
assert.ok(completed.rafCount > 0 && completed.iterations < 1000);
assert.equal(completed.remaining, 0, "progress RAF terminates on its target");
assert.equal(completed.timerCount, 1, "100% schedules one hide timer, not one per frame");
if (process.argv.includes("--built")) {
  // Source isolation alone cannot detect a bundler accidentally placing its
  // dynamic-import runtime helper inside a manually grouped 3D chunk.
  const output = path.join(project, "dist");
  const html = fs.readFileSync(path.join(output, "index.html"), "utf8");
  const initial = [...html.matchAll(/(?:src|href)="([^" ]+\.js)"/g)].map((match) => path.join(output, match[1].replace(/^\//, "")));
  const built = new Set();
  const visitChunk = (file) => {
    if (built.has(file)) return;
    built.add(file);
    const source = fs.readFileSync(file, "utf8");
    for (const statement of ast(file, source).statements) {
      if ((!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) || !statement.moduleSpecifier) continue;
      const specifier = statement.moduleSpecifier.text;
      if (specifier.startsWith(".") && specifier.endsWith(".js")) visitChunk(path.resolve(path.dirname(file), specifier));
    }
  };
  initial.forEach(visitChunk);
  const unwanted = [...built].filter((file) => /^(?:three-|react-three-|postprocessing-|OceanPage-|PublicBookLibrary-|LoadingLogoProgress-)/.test(path.basename(file)));
  assert.deepEqual(unwanted, [], `production Home still imports lazy-only chunks: ${unwanted.map((file) => path.basename(file)).join(", ")}`);
  const bytes = [...built].reduce((total, file) => total + fs.statSync(file).size, 0);
  console.log(`PASS: built Home static closure excludes 3D/books (${built.size} JS chunks, ${bytes} raw bytes).`);
}
console.log("PASS: Home import isolation, intent-only preloads, hidden-ocean pause/resume and first-frame recovery, retained world/audio, historical Ocean intro timing, and finite/disabled splash RAF.");
