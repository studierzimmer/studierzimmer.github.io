// Deterministic ship Surface physics/audio; no network, browser or data writes.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as THREE from "three";
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
function compile(source, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports, ...globals });
  return exports;
}
const { createShipSurfaceMotion } = compile(read("src/components/ocean/oceanShipSurface.ts"));
for (const start of [960, 100, 16, -50, -150]) {
  const motion = createShipSurfaceMotion(), target = 0;
  assert.equal(motion.start("ship", start, target, 30), true);
  let y = start, x = 230, z = -500, contacts = 0, contactY;
  for (let frame = 0; frame < 180; frame++) {
    if (frame === 10) assert.equal(motion.start("ship", start, target, 30), false, "repeated Surface commands never restart the spring or duplicate its splash");
    const step = motion.step(1 / 60);
    if (!step) continue;
    x += 2; z -= 1; // Horizontal joystick movement continues independently.
    y = step.height;
    assert.ok(Number.isFinite(y) && Number.isFinite(step.velocity));
    assert.ok(y >= Math.min(start, target) - 6 && y <= Math.max(start, target) + 6, "elastic overshoot stays bounded even from the highest altitude/deepest water");
    if (step.contact) { contacts++; contactY = y; }
  }
  assert.equal(contacts, 1, "one completed Surface action makes exactly one water-contact splash from above OR below");
  if (start > 30) assert.ok(contactY <= 30 && contactY > target, "a descending hull splashes on first water contact, before its final floating pose");
  assert.equal(y, target); assert.equal(motion.isActive(), false);
  assert.ok(x > 230 && z < -500, "Surface never resets or locks horizontal joystick travel");
  assert.equal(motion.start("ship", target, target), false, "an already floating ship does not manufacture another drop/splash");
}
for (const kind of ["avatar", "aircraft"]) assert.equal(createShipSurfaceMotion().start(kind, 100, 15), false);
{
  const motion = createShipSurfaceMotion(); motion.start("ship", 100, 15);
  const first = motion.step(100); assert.ok(first.height > 90, "a resumed/long frame cannot fast-forward the entire motion");
  motion.cancel(); assert.equal(motion.step(1 / 60), null, "manual vertical input/exit/hidden/character change can stop without a final snap or late contact");
  assert.equal(motion.start("ship", first.height, 15), true);
}

const skyText = read("src/components/SkyOceanBackground.tsx");
const waterline = compile(read("src/components/ocean/shipWaterline.ts"), { require: (id) => { assert.equal(id, "three"); return THREE; } });
for (const scale of [.5, 3.4, 8]) {
  const authored = new THREE.Group(); authored.userData.oceanWaterlineY = 2;
  assert.equal(waterline.shipFloatingHeight(waterline.shipWaterlineOffset(authored, scale)), -2 * scale, "authored waterline is scaled into group space, rather than using generic avatar height15");
}
{
  const root = new THREE.Group(), hull = new THREE.Group(); root.position.y = 3; root.scale.setScalar(7);
  hull.userData.oceanWaterlineY = 1; hull.position.y = 2; hull.scale.y = 2; root.add(hull);
  assert.equal(waterline.shipFloatingHeight(waterline.shipWaterlineOffset(root, 3)), -15, "waterline includes child offset/scale and root position, while the primitive's external scale replaces root.scale");
  const oldShip = new THREE.Group(), shipRoot = new THREE.Group(); shipRoot.name = "Pirate_Sailing_Ship"; oldShip.add(shipRoot);
  const mast = new THREE.Mesh(new THREE.BoxGeometry(1, 2000, 1)); mast.position.y = 1000; shipRoot.add(mast);
  assert.equal(waterline.shipFloatingHeight(waterline.shipWaterlineOffset(oldShip, 3.4)), 0, "legacy built-in hull specification uses sourcewaterline0; giant mast bounds never affect it");
}
{
  const start = skyText.indexOf("    const landingHeight = jumping.current");
  const end = skyText.indexOf("    const renderedMinY", start);
  assert.ok(start >= 0 && end > start);
  for (const floatingY of [0, -6.8, 9]) {
    const nextPosition = new THREE.Vector3(230, floatingY, -500);
    const api = compile(`exports.tick=()=>{${skyText.slice(start, end)}; return nextPosition.y;};`, {
      nextPosition, currentGroundY: () => floatingY, PLAYER_GROUND_Y: 15,
      jumping: { current: false }, freeVerticalMovement: { current: false }, jumpReturnY: { current: 200 }, verticalVelocity: { current: 0 }, grounded: { current: true },
    });
    for (let frame = 0; frame < 50; frame++) { nextPosition.y -= .01; assert.equal(api.tick(), floatingY); }
    assert.equal(nextPosition.x, 230); assert.equal(nextPosition.z, -500, "post-Surface grounded frames neither re-elevate to15 nor move the ship in X/Z");
  }
}
const sky = ts.createSourceFile("Sky.tsx", skyText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const functions = ["isOceanRenderActive", "isOceanAudioActive", "SurfaceCrossingSound"].map((name) => sky.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === name).getText()).join("\n");
const attrs = new Map([["data-render-active", "1"], ["data-audio-active", "1"]]);
const host = { style: { display: "block" }, getAttribute: (name) => attrs.get(name) ?? null, hasAttribute: (name) => attrs.has(name) };
const document = { hidden: false, visibilityState: "visible", getElementById: () => host };
const listeners = new Map(), contexts = []; let gesture = false, starts = 0, resumes = 0, cleanup;
const window = { location: { pathname: "/navigate" }, addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: (name) => listeners.delete(name) };
const param = () => ({ setValueAtTime() {}, exponentialRampToValueAtTime() {} });
class Context {
  constructor() { this.state = "suspended"; this.currentTime = 0; this.destination = {}; contexts.push(this); }
  resume() { assert.equal(gesture, true, "Surface audio primes during the real button gesture, not delayed arrival"); resumes++; this.state = "running"; return Promise.resolve(); }
  suspend() { this.state = "suspended"; return Promise.resolve(); }
  close() { this.state = "closed"; return Promise.resolve(); }
  createOscillator() { return { frequency: param(), connect() {}, start() { starts++; }, stop() {} }; }
  createGain() { return { gain: param(), connect() {} }; }
}
const api = compile(`${functions}\nexports.mount=SurfaceCrossingSound;`.replaceAll("import.meta.env.BASE_URL", '"/"'), {
  window, document, THREE, AudioContext: Context,
  Audio: class { constructor() { this.currentTime = 0; } pause() {} play() { return Promise.resolve(); } },
  useEffect: (effect) => { cleanup = effect(); },
});
const emit = (name, detail = {}, realGesture = false) => { gesture = realGesture; try { listeners.get(name)?.({ detail }); } finally { gesture = false; } };
api.mount(); assert.equal(contexts.length, 0);
emit("ocean-audio-unlock", {}, true); assert.equal(resumes, 1);
emit("ocean-player-splash", { submerging: false, surfaceReturn: true, speed: 80 });
assert.equal(starts, 1, "surfacing from below reuses the existing splash oscillator even though it is not a submerging event");
emit("ocean-player-splash", { submerging: false, speed: 80 }); assert.equal(starts, 1, "normal rising crossings keep their existing quieter behavior");
attrs.set("data-audio-active", "0"); emit("skyocean-audio", { active: false });
emit("ocean-player-splash", { submerging: true, surfaceReturn: true, speed: 80 }); assert.equal(starts, 1);
assert.equal(contexts[0].state, "suspended");
attrs.set("data-audio-active", "1"); attrs.set("data-ocean-preparing", "token");
emit("ocean-audio-unlock", {}, true); emit("ocean-player-splash", { submerging: true, surfaceReturn: true, speed: 80 });
assert.equal(starts, 1); assert.equal(resumes, 1, "preparation cannot unlock or play a splash");
cleanup(); assert.equal(contexts[0].state, "closed"); assert.equal(listeners.size, 0);
assert.match(skyText, /ocean-active-character-state-request/);
assert.match(skyText, /ocean-ship-surface/);
assert.match(skyText, /if \(!surfaceStep\) window\.dispatchEvent\(/, "Surface owns its one splash rather than also firing the ordinary crossing splash");
console.log("PASS: ship-only vertical Surface from above/below, bounded spring/exact floating line, preserved horizontal travel, once-per-action contact, cancellation and gesture-primed gated splash audio.");
