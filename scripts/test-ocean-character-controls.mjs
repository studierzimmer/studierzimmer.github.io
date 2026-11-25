// Actual movement/camera/audio source under deterministic local mocks. No GPU,
// browser, network, credentials, assets or persisted data are changed.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as THREE from "three";
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
function compile(source, globals = {}) {
  const exports = {};
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(output, { exports, require: (id) => { assert.equal(id, "three"); return THREE; }, ...globals });
  return exports;
}
function bus(extra = {}) {
  const listeners = new Map();
  return { ...extra,
    addEventListener(name, listener) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(listener); },
    removeEventListener(name, listener) { listeners.get(name)?.delete(listener); },
    emit(name, event = {}) { for (const listener of [...(listeners.get(name) ?? [])]) listener(event); },
    dispatchEvent(event) { this.emit(event.type, event); return true; },
    count: () => [...listeners.values()].reduce((sum, set) => sum + set.size, 0),
  };
}
const movement = compile(read("src/components/ocean/oceanMovement.ts"), { CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } } });
for (const kind of ["avatar", "aircraft", "ship"]) for (const vertical of [false, true]) {
  const originalBase = vertical ? (kind === "aircraft" ? 72 : 58) : (kind === "aircraft" ? 125 : 100);
  assert.equal(movement.oceanMovementSpeed(kind, 0, vertical) / originalBase, kind === "avatar" ? 1 : 3, "vehicles cruise at 3× their original profile; the ordinary avatar keeps its base speed");
  assert.equal(movement.oceanMovementSpeed(kind, 1, vertical) / originalBase, kind === "avatar" ? 3 : 6, "Shift/second-touch boosts the avatar to 3× and vehicles to 6×, never 18×");
  assert.equal(movement.oceanMovementSpeed(kind, 99, vertical), movement.oceanMovementSpeed(kind, 1, vertical));
  assert.ok(Number.isFinite(movement.oceanMovementSpeed(kind, NaN, vertical)));
}
assert.equal(movement.oceanMovementKind("bundled:cessna-aircraft"), "aircraft");
assert.equal(movement.oceanMovementKind("bundled:pirate-sailing-ship"), "ship");
assert.equal(movement.oceanMovementKind("bundled:wolfy"), "avatar");
assert.equal(movement.oceanMovementKind({ id: "e7280621-9eee-4009-8369-4f7c30fed0b2", bundled_path: "cessna-aircraft.glb", name: "My renamed plane" }), "aircraft", "database UUIDs and editable labels never erase the stable Cessna asset identity");
assert.equal(movement.oceanMovementKind({ id: "8f982294-79a7-4b5b-bbec-0e35b5b22df6", file_name: "pirate-sailing-ship.glb", name: "Renamed boat" }), "ship");
assert.equal(movement.oceanMovementSpeed("aircraft", 0) / movement.oceanMovementSpeed("aircraft", 1), .5, "aircraft cruise and boost retain distinct half/full-scale engine telemetry");
{
  const keys = {}, window = bus(), document = bus({ hidden: false }); let active = true;
  const cleanup = movement.bindOceanMovementKeys(keys, () => active, { window, document });
  const key = (name, code, extra = {}) => ({ key: name, code, preventDefault() {}, ...extra });
  window.emit("keydown", key("Shift", "ShiftLeft", { shiftKey: true }));
  window.emit("keydown", key("W", "KeyW", { shiftKey: true }));
  assert.equal(keys.shift, true); assert.equal(keys.w, true, "physical movement codes survive uppercase Shift input");
  window.emit("keydown", key("Shift", "ShiftRight", { shiftKey: true }));
  window.emit("keyup", key("Shift", "ShiftLeft", { shiftKey: true }));
  assert.equal(keys.shift, true, "releasing one Shift leaves a still-held second Shift active");
  window.emit("keyup", key("Shift", "ShiftRight", { shiftKey: false })); assert.equal(keys.shift, false);
  document.emit("focusin", { target: { closest: () => ({}) } }); assert.equal(keys.w, false, "focusing an editor clears previously held movement");
  window.emit("keydown", key("W", "KeyW", { target: { closest: () => ({}) } })); assert.equal(keys.w, false);
  window.emit("keydown", key("w", "KeyW")); window.emit("blur"); assert.equal(keys.w, false);
  window.emit("keydown", key("w", "KeyW")); document.hidden = true; document.emit("visibilitychange"); assert.equal(keys.w, false);
  document.hidden = false; active = false; window.emit("keydown", key("Shift", "ShiftLeft")); assert.equal(keys.shift, false, "Home/preparation/inactive controls cannot arm sprint");
  active = true; window.emit("keydown", key("w", "KeyW")); window.emit("explore-mode", { detail: { enabled: false } }); assert.equal(keys.w, false);
  cleanup(); assert.equal(window.count() + document.count(), 0);
}
{
  const window = bus(), document = bus({ hidden: false }), sprint = []; let active = true;
  const capture = (event) => sprint.push(event.detail.active);
  window.addEventListener("explore-sprint", capture);
  const cleanup = movement.bindOceanTouchSprint(() => active, { window, document });
  const contact = (active, pointerId = 1) => window.emit("explore-joystick-contact", { detail: { active, pointerId } });
  const point = (pointerId, interactive = false) => ({ pointerType: "touch", pointerId, defaultPrevented: false, stopped: false, target: { closest: () => interactive ? {} : null }, preventDefault() { this.defaultPrevented = true; }, stopPropagation() { this.stopped = true; } });
  window.emit("pointerdown", point(2)); assert.deepEqual(sprint, [], "a lone touch never sprints");
  contact(true); // Contact counts even while the joystick is centered at x/z0.
  window.emit("pointerdown", point(2, true)); assert.deepEqual(sprint, [], "pressing a visible UI control cannot trigger second-finger sprint");
  const second = point(2); window.emit("pointerdown", second);
  assert.deepEqual(sprint, [true]); assert.equal(second.defaultPrevented, true); assert.equal(second.stopped, true, "second touch is consumed during capture before camera orbit/pinch");
  window.emit("pointerup", point(2)); assert.deepEqual(sprint, [true, false], "releasing the acceleration finger restores normal cruise while joystick stays held");
  window.emit("pointerdown", point(3)); window.emit("pointercancel", point(3)); assert.deepEqual(sprint.slice(-2), [true, false]);
  window.emit("pointerdown", point(4)); contact(false); assert.equal(sprint.at(-1), false, "releasing/lost capture of the joystick clears acceleration even with the other finger still down");
  contact(true); window.emit("pointerdown", point(5)); window.emit("blur"); assert.equal(sprint.at(-1), false);
  contact(true); window.emit("pointerdown", point(6)); document.hidden = true; document.emit("visibilitychange"); assert.equal(sprint.at(-1), false);
  document.hidden = false; contact(true); window.emit("pointerdown", point(7)); window.emit("explore-mode", { detail: { enabled: false } }); assert.equal(sprint.at(-1), false);
  active = false; contact(true); window.emit("pointerdown", point(8)); assert.equal(sprint.at(-1), false, "inactive/preparation/Home contacts cannot sprint");
  active = true; contact(true); window.emit("pointerdown", point(9)); cleanup(); assert.equal(sprint.at(-1), false);
  window.removeEventListener("explore-sprint", capture); assert.equal(window.count() + document.count(), 0);
}
{
  const { createCharacterCamera } = compile(read("src/components/ocean/characterCamera.ts"));
  const scene = new THREE.Scene(), player = new THREE.Group(), camera = new THREE.PerspectiveCamera(55, 1, .1, 90000);
  player.position.set(250, 60, -500); player.rotation.y = Math.PI;
  Object.assign(player.userData, { characterId: "bundled:cessna-aircraft", cameraDistance: 90, cameraHeight: 30, lookHeight: 8 });
  scene.add(player); camera.position.set(250, 90, -410);
  const controller = createCharacterCamera({ scene, camera, getPlayer: () => player });
  const tick = () => { const position = player.position.clone(), rotation = player.quaternion.clone(); controller.update(1 / 60); assert.ok(player.position.equals(position) && player.quaternion.equals(rotation), "camera commands never move or rotate the avatar"); };
  for (let index = 0; index < 180; index++) tick();
  assert.equal(controller.getState().detached, false);
  controller.orbit(230, -75); controller.pan(180, 70); controller.zoom(420);
  for (let index = 0; index < 90; index++) tick();
  assert.equal(controller.getState().detached, true);
  const startPosition = camera.position.clone(), startRotation = camera.quaternion.clone();
  controller.reset();
  assert.ok(camera.position.equals(startPosition) && camera.quaternion.equals(startRotation), "return begins without a position or viewing-target snap");
  assert.equal(controller.getState().returning, true);
  for (let index = 0; index < 60; index++) { player.position.x += 2; player.rotation.y += .004; tick(); }
  for (let index = 0; index < 180; index++) tick();
  assert.equal(controller.getState().returning, false); assert.equal(controller.getState().detached, false);
  const relative = camera.position.clone().sub(player.position).setY(0).normalize();
  const behind = new THREE.Vector3(0, 0, -1).applyQuaternion(player.quaternion).setY(0).normalize();
  assert.ok(relative.dot(behind) > .99999, "the endpoint is behind the CURRENT avatar heading/location, not the initial world pose");
  assert.ok(camera.position.distanceTo(player.position) < 120);
  controller.orbit(30, 0); controller.reset(); tick(); controller.pan(5, 0);
  assert.equal(controller.getState().returning, false, "a fresh camera gesture safely interrupts a return");
  assert.equal(controller.getState().detached, true);
}

const sky = ts.createSourceFile("SkyOceanBackground.tsx", read("src/components/SkyOceanBackground.tsx"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
{
  const prepare = sky.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "prepareCharacter").getText();
  const waterline = compile(read("src/components/ocean/shipWaterline.ts"));
  const api = compile(`${prepare}\nexports.prepare=prepareCharacter;`, { THREE, SkeletonUtils: { clone: (scene) => scene.clone(true) }, oceanMovementKind: movement.oceanMovementKind, shipWaterlineOffset: waterline.shipWaterlineOffset, PLAYER_SCALE: 10 });
  for (const [path, kind] of [["cessna-aircraft.glb", "aircraft"], ["pirate-sailing-ship.glb", "ship"]]) {
    const original = { id: "e7280621-9eee-4009-8369-4f7c30fed0b2", bundled_path: path, file_name: path, public_url: `/assets/${path}`, name: "Owner's renamed label", model_scale: 3.6, camera_distance: 100 };
    const prepared = api.prepare(original, new THREE.Group(), [], new THREE.Texture());
    assert.equal(prepared.id, original.id, "preparing a registered figure never rewrites its persistent UUID");
    assert.equal(prepared.kind, kind, "the active Player carries stable asset classification into movement/audio/ship wake");
    assert.equal(prepared.waterlineOffset?.y ?? null, kind === "ship" ? 0 : null);
  }
}
const functions = ["isOceanRenderActive", "isOceanAudioActive", "AircraftEngineSound"].map((name) => sky.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === name).getText()).join("\n");
const flush = async () => { for (let index = 0; index < 16; index++) await Promise.resolve(); };
const attrs = new Map([["data-render-active", "1"], ["data-audio-active", "0"], ["data-explore", "0"], ["data-ocean-preparing", "foreground-token"]]);
const host = { style: { display: "block" }, getAttribute: (name) => attrs.get(name) ?? null, hasAttribute: (name) => attrs.has(name) };
const document = { hidden: false, visibilityState: "visible", getElementById: () => host };
const window = bus({ location: { pathname: "/navigate" } });
const contexts = [], sources = [], gains = [], resumes = []; let gesture = false, fetches = 0, cleanup;
const param = () => ({ value: 0, cancelScheduledValues() {}, setValueAtTime(value) { this.value = value; }, setTargetAtTime(value) { this.value = value; } });
class AudioContextStub {
  constructor() { this.state = "suspended"; this.currentTime = 0; this.destination = {}; this.unlocked = false; contexts.push(this); }
  createGain() { const gain = { gain: param(), connect() {}, disconnect() {} }; gains.push(gain); return gain; }
  resume() { resumes.push(gesture); if (!gesture && !this.unlocked) return Promise.reject(new Error("gesture required")); this.unlocked = true; this.state = "running"; return Promise.resolve(); }
  suspend() { this.state = "suspended"; return Promise.resolve(); }
  close() { this.state = "closed"; return Promise.resolve(); }
  decodeAudioData() { return Promise.resolve({}); }
  createBufferSource() { const source = { playbackRate: param(), connect() {}, disconnect() {}, starts: 0, stops: 0, start() { this.starts++; }, stop() { this.stops++; } }; sources.push(source); return source; }
}
const api = compile(`${functions}\nexports.mount=AircraftEngineSound;`.replaceAll("import.meta.env.BASE_URL", '"/"').replaceAll("import.meta.env.DEV", "false"), {
  window, document, AudioContext: AudioContextStub, playerRef: { current: { userData: { characterId: "bundled:wolfy" } } },
  useEffect: (effect) => { cleanup = effect(); },
  fetch: async (url) => { assert.equal(url, "/cessna-engine.wav"); fetches++; return { ok: true, arrayBuffer: async () => new ArrayBuffer(0) }; },
});
const emit = (name, detail = {}, userGesture = false) => { gesture = userGesture; try { window.emit(name, { detail }); } finally { gesture = false; } };
api.mount(); emit("ocean-audio-unlock", {}, true); emit("pointerdown", {}, true); await flush();
assert.equal(contexts.length, 0); assert.equal(fetches, 0, "hidden first-frame preparation never creates/loads an engine sound");
attrs.delete("data-ocean-preparing"); attrs.set("data-audio-active", "1"); emit("skyocean-audio", { active: true });
emit("ocean-audio-unlock", {}, true);
assert.deepEqual(resumes, [true], "Start resumes synchronously inside its gesture even with Wolfy selected");
await flush(); assert.equal(fetches, 0);
attrs.set("data-explore", "1"); emit("explore-mode", { enabled: true }); emit("ocean-active-character-change", { id: "e7280621-9eee-4009-8369-4f7c30fed0b2", kind: "aircraft" }); await flush();
assert.equal(fetches, 1); assert.equal(sources.length, 1); assert.equal(sources[0].starts, 1); assert.equal(sources[0].loop, true);
const idlePitch = sources[0].playbackRate.value, idleVolume = gains[0].gain.value;
assert.ok(idleVolume > 0, "a selected stationary Cessna has audible idle rather than requiring motion to start");
emit("ocean-aircraft-throttle", { throttle: 1 });
assert.ok(sources[0].playbackRate.value > idlePitch && gains[0].gain.value > idleVolume, "movement/sprint smoothly targets higher pitch and volume");
emit("ocean-aircraft-throttle", { throttle: 0 }); assert.equal(sources[0].playbackRate.value, idlePitch);
emit("ocean-aircraft-throttle", { throttle: NaN }); assert.ok(Number.isFinite(sources[0].playbackRate.value));
emit("ocean-active-character-change", { id: "8f982294-79a7-4b5b-bbec-0e35b5b22df6", kind: "ship" }); await flush();
assert.equal(gains[0].gain.value, 0, "a registered ship has vehicle speed but no aircraft engine sound");
emit("ocean-active-character-change", { id: "e7280621-9eee-4009-8369-4f7c30fed0b2", kind: "aircraft" }); await flush();
assert.ok(gains[0].gain.value > 0); assert.equal(sources.length, 1);
document.hidden = true; emit("skyocean-activity", { active: false }); await flush();
assert.equal(gains[0].gain.value, 0); assert.equal(contexts[0].state, "suspended");
document.hidden = false; emit("skyocean-activity", { active: true }); emit("explore-mode", { enabled: true }); await flush();
assert.equal(fetches, 1); assert.equal(sources.length, 1, "visibility resume reuses the source instead of stacking loops");
window.location.pathname = "/"; emit("skyocean-activity", { active: true }); emit("pointerdown", {}, true); await flush();
assert.equal(gains[0].gain.value, 0); assert.equal(contexts[0].state, "suspended", "no engine can continue outside Navigate even when a stale host remains rendered");
cleanup(); assert.equal(sources[0].stops, 1); assert.equal(contexts[0].state, "closed"); assert.equal(window.count(), 0);
const cameraHook = read("src/components/ocean/useOceanCharacterCamera.ts");
assert.match(cameraHook, /ocean-camera-return/); assert.match(cameraHook, /ocean-camera-state/); assert.match(cameraHook, /data-ocean-preparing/);
const page = read("src/pages/OceanPage.tsx");
assert.match(page, /ocean-audio-unlock/); assert.match(page, /useOceanControlsTransition/);
assert.match(read("src/components/ocean/useOceanControlsTransition.ts"), /ocean-camera-return/, "camera commands remain connected through the controls' completion-driven choreography");
console.log("PASS: avatar1→3×/vehicles3→6× speeds, held-joystick second-finger sprint/releases, current-avatar elastic camera return, gesture-unlocked Cessna idle/throttle and silent inactive routes (no browser/network).");
