// Exercise the actual local controller/readiness functions with a fake R3F
// clock. No WebGL, model downloads, credentials, or external writes are used.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/pages/WatchStudio.tsx", import.meta.url), "utf8");
const ast = ts.createSourceFile("WatchStudio.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const names = ["isWatchDocumentVisible", "setWatchFrameloop", "useWatchDocumentRendering", "SceneReadySignal"];
const functions = ast.statements.filter((node) => ts.isFunctionDeclaration(node) && names.includes(node.name?.text));
assert.equal(functions.length, names.length);
const js = ts.transpileModule(`${functions.map((node) => node.getText(ast)).join("\n")}\nexports.test = { ${names.join(",")} };`, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const listeners = new Map();
const document = { hidden: false, visibilityState: "visible", addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: (name) => listeners.delete(name) };
let effects = [];
let updates = [];
let frame;
const exported = {};
vm.runInNewContext(js, {
  exports: exported, document,
  useRef: (current) => ({ current }),
  useState: (initial) => [typeof initial === "function" ? initial() : initial, (value) => updates.push(value)],
  useLayoutEffect: (callback) => effects.push(callback), useEffect: (callback) => effects.push(callback),
  useCallback: (callback) => callback, useFrame: (callback) => { frame = callback; },
});
const { isWatchDocumentVisible, setWatchFrameloop, useWatchDocumentRendering, SceneReadySignal } = exported.test;
function root(mode = "always", time = 47.25) {
  const calls = []; let invalidations = 0;
  const state = { frameloop: mode, clock: { elapsedTime: time },
    get: () => state,
    // Match the installed R3F behavior: mode changes reset the clock to zero.
    setFrameloop(next) { calls.push(next); state.frameloop = next; state.clock.elapsedTime = 0; },
    invalidate() { invalidations++; },
  };
  return { state, calls, get invalidations() { return invalidations; } };
}

assert.equal(isWatchDocumentVisible(), true);
document.hidden = true;
assert.equal(isWatchDocumentVisible(), false);
document.hidden = false; document.visibilityState = "hidden";
assert.equal(isWatchDocumentVisible(), false);
document.visibilityState = "visible";
{
  const fixture = root(); const elapsed = { current: 0 };
  setWatchFrameloop(fixture.state, false, elapsed);
  assert.equal(fixture.state.frameloop, "never");
  assert.equal(fixture.state.clock.elapsedTime, 47.25);
  assert.equal(elapsed.current, 47.25);
  setWatchFrameloop(fixture.state, false, elapsed);
  assert.equal(fixture.calls.length, 1, "repeated visibility notifications do not reset the clock");
  setWatchFrameloop(fixture.state, true, elapsed);
  assert.equal(fixture.state.clock.elapsedTime, 47.25, "resume restores the exact clip phase, excluding hidden time");
  assert.equal(fixture.invalidations, 1, "resume schedules a fresh visible frame");
  setWatchFrameloop(null, false, elapsed);
}
{
  effects = []; updates = [];
  const controller = useWatchDocumentRendering();
  assert.equal(controller.active, true, "a visible document warms up even when the model stage starts outside/scale-zero");
  const cleanup = effects[0](); const fixture = root();
  controller.onCreated(fixture.state);
  assert.equal(fixture.state.frameloop, "always");
  document.hidden = true; document.visibilityState = "hidden"; listeners.get("visibilitychange")();
  assert.equal(fixture.state.frameloop, "never"); assert.equal(updates.at(-1), false);
  document.hidden = false; document.visibilityState = "visible"; listeners.get("visibilitychange")();
  assert.equal(fixture.state.frameloop, "always"); assert.equal(updates.at(-1), true);
  assert.equal(fixture.state.clock.elapsedTime, 47.25);
  cleanup();
  assert.equal(listeners.size, 0); assert.equal(fixture.state.frameloop, "never");
}
{
  document.hidden = true; document.visibilityState = "hidden"; effects = [];
  const controller = useWatchDocumentRendering(); const fixture = root("never", 0);
  assert.equal(controller.active, false, "a background-tab initial load starts stopped");
  const cleanup = effects[0](); controller.onCreated(fixture.state);
  assert.equal(fixture.calls.length, 0);
  document.hidden = false; document.visibilityState = "visible"; listeners.get("visibilitychange")();
  assert.equal(fixture.state.frameloop, "always"); assert.equal(fixture.invalidations, 1);
  cleanup();
}
{
  effects = []; const reports = []; const fixture = root(); const elapsed = { current: 0 };
  SceneReadySignal({ ready: true, readinessKey: "full-original-model", onReady: (key) => reports.push(key) });
  effects.forEach((effect) => effect());
  const render = () => { if (fixture.state.frameloop === "always") frame(); };
  for (let index = 0; index < 3; index++) render();
  setWatchFrameloop(fixture.state, false, elapsed);
  for (let index = 0; index < 100; index++) render();
  assert.equal(reports.length, 0, "hidden time never counts as warmup frames");
  setWatchFrameloop(fixture.state, true, elapsed);
  render(); render(); assert.equal(reports.length, 0);
  render(); assert.deepEqual(reports, ["full-original-model"], "existing readiness still requires exactly six rendered frames");
  render(); assert.equal(reports.length, 1);
}
assert.equal((source.match(/<Canvas\b/g) ?? []).length, 1, "WatchStudio has only its main canvas; no extra orientation canvas is imported");
assert.match(source, /frameloop=\{documentRendering\.active \? "always" : "never"\}/);
assert.match(source, /dpr=\{\[1, 1\.5\]\}/);
assert.match(source, /resize=\{\{ offsetSize: true \}\}/);
assert.match(source, /shadows=\{sceneMode !== "pen"\}/);
assert.doesNotMatch(functions.map((node) => node.getText(ast)).slice(0, 3).join("\n"), /modelMotion|IntersectionObserver|getBoundingClientRect/);
console.log("PASS: WatchStudio document-only pause, preserved clock phase, idempotent resume/invalidation, cleanup, hidden initial load, unchanged six-frame warmup and render-quality settings (fully mocked, no network).");
