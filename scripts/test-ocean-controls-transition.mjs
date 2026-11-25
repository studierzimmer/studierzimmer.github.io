// Real controls coordinator/hook with a deterministic animation and camera
// clock. No WebGL, browser, audio, network, credentials or remote writes.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const read = (name) => fs.readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
function compile(source, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS } }).outputText, { exports, ...globals });
  return exports;
}
const coordinatorSource = read("src/components/ocean/oceanControlsTransition.ts");
const { createOceanControlsTransition } = compile(coordinatorSource);
const flush = async () => { for (let index = 0; index < 12; index++) await Promise.resolve(); };
function deferred() { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; }
function fixture({ acknowledge = true, immediate = false } = {}) {
  const calls = [], animations = [], timers = new Map();
  let timerId = 0, allowed = true, machine;
  machine = createOceanControlsTransition({
    animate(visible) { const animation = { visible, ...deferred() }; animations.push(animation); if (immediate) animation.resolve(true); return animation.promise; },
    reset() { calls.push("reset"); }, releaseInputs() { calls.push("release"); },
    canReturn: () => allowed,
    returnCamera() { calls.push("camera"); if (acknowledge) machine.cameraState({ detached: true, returning: true }); },
    requestCameraState() { calls.push("state"); machine.cameraState({ detached: true, returning: acknowledge }); },
    onPhase: (phase) => calls.push(phase),
    schedule(callback, delay) { timers.set(++timerId, { callback, delay }); return timerId; },
    clearTimer: (id) => timers.delete(id),
  });
  return { machine, calls, animations, timers, disallow() { allowed = false; }, tick() { const pending = [...timers.values()]; timers.clear(); pending.forEach(({ callback }) => callback()); } };
}
{
  const f = fixture(), pending = f.machine.begin();
  assert.deepEqual(f.calls, ["release", "hiding"]);
  assert.equal(f.machine.getPhase(), "hiding");
  await f.machine.begin(); assert.equal(f.animations.length, 1, "a repeated click never starts another choreography");
  await flush(); assert.equal(f.calls.includes("camera"), false, "camera waits for actual scale-out completion, not a blind duration");
  f.animations[0].resolve(true); await pending;
  assert.equal(f.machine.getPhase(), "returning"); assert.equal(f.calls.filter((call) => call === "camera").length, 1);
  assert.equal(f.animations.length, 1, "both controls remain hidden while the real camera is returning");
  f.machine.cameraState({ detached: false, returning: false }); await flush();
  assert.equal(f.machine.getPhase(), "showing"); assert.equal(f.animations[1].visible, true);
  f.animations[1].resolve(true); await flush();
  assert.equal(f.machine.getPhase(), "visible"); assert.equal(f.timers.size, 0);
}
{
  const f = fixture(); const pending = f.machine.begin(); f.animations[0].resolve(true); await pending;
  f.machine.cameraState({ detached: true, returning: false }); await flush();
  assert.equal(f.machine.getPhase(), "showing", "manual orbit interruption restores controls even though the camera stays detached");
  f.animations[1].resolve(true); await flush(); assert.equal(f.machine.getPhase(), "visible");
}
for (const dispose of [false, true]) {
  const f = fixture(), pending = f.machine.begin();
  if (dispose) f.machine.dispose(); else f.machine.cancel();
  const count = f.calls.length;
  f.animations[0].resolve(true); await pending; f.tick(); await flush();
  assert.equal(f.calls.includes("camera"), false, "route exit/unmount during scale-out cannot send a stale camera command");
  assert.equal(f.calls.length, count); assert.equal(f.timers.size, 0);
}
{
  const f = fixture(); const pending = f.machine.begin(); f.disallow(); f.animations[0].resolve(true); await flush();
  assert.equal(f.calls.includes("camera"), false, "editing or a reattached camera cancels the delayed command");
  f.animations[1].resolve(true); await pending; assert.equal(f.machine.getPhase(), "visible");
}
for (const acknowledge of [false, true]) {
  const f = fixture({ acknowledge }); const pending = f.machine.begin(); f.animations[0].resolve(true); await pending;
  assert.equal([...f.timers.values()][0].delay, acknowledge ? 6000 : 1000);
  f.tick(); await flush(); assert.equal(f.machine.getPhase(), "showing", "an ignored/stalled command cannot hide controls forever");
  f.animations[1].resolve(true); await flush(); assert.equal(f.machine.getPhase(), "visible");
}
{
  const f = fixture({ immediate: true }); await f.machine.begin();
  assert.equal(f.machine.getPhase(), "returning");
  f.machine.cameraState({ detached: false, returning: false }); await flush();
  assert.equal(f.machine.getPhase(), "visible", "reduced-motion immediate animations still await the actual camera completion");
}

class Events {
  listeners = new Map();
  addEventListener(name, callback) { if (!this.listeners.has(name)) this.listeners.set(name, new Set()); this.listeners.get(name).add(callback); }
  removeEventListener(name, callback) { this.listeners.get(name)?.delete(callback); }
  dispatchEvent(event) { [...(this.listeners.get(event.type) ?? [])].forEach((callback) => callback(event)); }
  fire(type, details = {}) { this.dispatchEvent({ type, ...details }); }
  count() { return [...this.listeners.values()].reduce((sum, entries) => sum + entries.size, 0); }
}
class CustomEventStub { constructor(type, options) { this.type = type; this.detail = options?.detail; } }

// Exercise the real animation hook: two independently positioned groups must
// BOTH finish, inert blocks stale contacts, and only inner scale is animated.
function hookFixture(reduced = false) {
  const effects = [], states = [], animations = [], timers = new Map(), commands = [];
  const window = new Events(), document = Object.assign(new Events(), { hidden: false });
  let nextTimer = 0;
  window.setTimeout = (callback) => { timers.set(++nextTimer, callback); return nextTimer; };
  window.clearTimeout = (id) => timers.delete(id);
  window.addEventListener("ocean-camera-return", () => { commands.push("return"); window.fire("ocean-camera-state", { detail: { detached: true, returning: true } }); });
  const hook = compile(read("src/components/ocean/useOceanControlsTransition.ts"), {
    window, document, CustomEvent: CustomEventStub,
    require: (name) => name === "react" ? { useRef: (current) => ({ current }), useState: (initial) => [initial, (next) => states.push(next)], useEffect: (effect) => effects.push(effect), useCallback: (callback) => callback } : { createOceanControlsTransition },
  }).useOceanControlsTransition;
  const api = hook({ enabled: true, reduced, detached: true, releaseInputs: () => commands.push("release") });
  const node = () => ({ style: {}, inert: false, animate(frames, options) {
    const pending = deferred(); let settled = false;
    const animation = { frames, options, finished: pending.promise, complete() { settled = true; pending.resolve(); }, cancel() { if (!settled) { settled = true; pending.reject(new Error("cancelled")); } } };
    animations.push(animation); return animation;
  } });
  api.tools.current = node(); api.movement.current = node();
  const cleanup = effects[0](); effects[1]();
  return { api, cleanup, animations, window, document, states, commands, timers };
}
{
  const f = hookFixture(); f.api.begin();
  assert.equal(f.animations.length, 2); assert.equal(f.api.tools.current.inert, true); assert.equal(f.api.movement.current.inert, true);
  for (const animation of f.animations) assert.ok(animation.frames.every((frame) => Object.keys(frame).every((key) => key === "scale" || key === "offset")), "no opacity/position/transform change can affect the Ocean or fixed control positioning");
  f.animations[0].complete(); await flush(); assert.deepEqual(f.commands, ["release"]);
  f.animations[1].complete(); await flush(); assert.deepEqual(f.commands, ["release", "return"]);
  assert.equal(f.api.tools.current.style.scale, "0"); assert.equal(f.api.movement.current.style.scale, "0");
  f.window.fire("ocean-camera-state", { detail: { detached: false, returning: false } }); await flush();
  assert.equal(f.animations.length, 4); f.animations[2].complete(); await flush(); assert.equal(f.api.tools.current.inert, true);
  f.animations[3].complete(); await flush();
  assert.equal(f.api.tools.current.inert, false); assert.equal(f.api.movement.current.inert, false);
  assert.equal(f.api.tools.current.style.scale, "1"); assert.equal(f.api.movement.current.style.scale, "1");
  f.cleanup(); assert.equal(f.timers.size, 0); assert.equal(f.document.count(), 0);
}
for (const event of ["portfolio:ocean-exit", "blur", "visibilitychange", "unmount"]) {
  const f = hookFixture(); f.api.begin();
  if (event === "unmount") f.cleanup();
  else if (event === "visibilitychange") { f.document.hidden = true; f.document.fire(event); }
  else f.window.fire(event);
  await flush(); assert.equal(f.commands.includes("return"), false, `${event} invalidates pending scale-out completion`);
  assert.equal(f.api.tools.current.inert, false); assert.equal(f.api.movement.current.style.scale, "1");
  if (event !== "unmount") f.cleanup();
  assert.equal(f.timers.size, 0); assert.equal(f.document.count(), 0);
}
{
  const f = hookFixture(true); f.api.begin(); await flush();
  assert.equal(f.animations.length, 0); assert.equal(f.commands.at(-1), "return");
  f.window.fire("ocean-camera-state", { detail: { detached: true, returning: false } }); await flush();
  assert.equal(f.api.tools.current.inert, false); f.cleanup();
}

// Releasing held input must not toggle exploration (and therefore cannot
// accidentally start the historical camera intro or pause the world).
{
  const window = new Events(), document = Object.assign(new Events(), { hidden: false });
  const movement = compile(read("src/components/ocean/oceanMovement.ts"), { window, document, CustomEvent: CustomEventStub });
  const keys = {}, sprints = [];
  window.addEventListener("explore-sprint", (event) => sprints.push(event.detail.active));
  const releaseKeys = movement.bindOceanMovementKeys(keys, () => true, { window, document });
  const releaseTouch = movement.bindOceanTouchSprint(() => true, { window, document });
  window.fire("keydown", { code: "KeyW", key: "W", shiftKey: true });
  assert.equal(keys.w, true); assert.equal(keys.shift, true);
  window.fire("explore-joystick-contact", { detail: { active: true, pointerId: 1 } });
  window.fire("pointerdown", { pointerType: "touch", pointerId: 2, preventDefault() {}, stopPropagation() {} });
  assert.equal(sprints.at(-1), true);
  window.fire("ocean-controls-release");
  assert.ok(Object.values(keys).every((value) => value === false)); assert.equal(sprints.at(-1), false);
  window.fire("keydown", { code: "KeyW", key: "W", shiftKey: true, repeat: true });
  assert.equal(keys.w, false); assert.equal(keys.shift, false, "an OS repeat cannot re-arm released hidden inputs");
  window.fire("keyup", { code: "KeyW", key: "w", shiftKey: false });
  window.fire("keydown", { code: "KeyW", key: "w", shiftKey: false, repeat: false });
  assert.equal(keys.w, true, "a fresh physical keypress works after the released contact ends");
  window.fire("pointerdown", { pointerType: "touch", pointerId: 2, preventDefault() {}, stopPropagation() {} });
  assert.equal(sprints.at(-1), false, "the old second finger cannot revive sprint without a new joystick contact");
  releaseKeys(); releaseTouch();
}
const css = read("src/styles/ocean-page.css");
assert.match(css, /\.ocean-movement \{[^}]*position:fixed;[^}]*transform:translateX\(-50%\)/);
assert.match(css, /\.ocean-movement-inner \{[^}]*grid-column:1 \/ -1;[^}]*grid-template-columns:inherit/);
assert.doesNotMatch(read("src/components/ocean/useOceanControlsTransition.ts"), /skyocean-|explore-mode|ocean-aperture|activateOceanWorld/);
console.log("PASS: two-group elastic completion ordering, real camera completion/interruption, ignored-command fallback, reduced motion, stale-command cleanup, released keyboard/touch contacts, unchanged scene/intro/fixed positioning (no browser/network/WebGL).");
