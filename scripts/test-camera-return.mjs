import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import * as THREE from "three";
const source = fs.readFileSync(new URL("../src/components/artworks/cameraReturn.ts", import.meta.url), "utf8");
const exports = {};
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports, require: (id) => { assert.equal(id, "three"); return THREE; } });
function fixture(position = [0, 0, .05], target = [0, 0, 0], reduced = false) {
  const camera = new THREE.PerspectiveCamera(32, 1, .01, 10000);
  camera.position.set(...position); camera.zoom = 2;
  const controls = { target: new THREE.Vector3(...target), enabled: true, enableDamping: true, autoRotate: false, update: () => camera.lookAt(controls.target) };
  const busy = [];
  const controller = exports.createCameraReturn(camera, controls, [0, 0, 8], (value) => busy.push(value), () => reduced);
  return { camera, controls, busy, controller };
}
for (const [position, target] of [[[0, 0, .05], [0, 0, 0]], [[0, 0, -8], [0, 0, 0]], [[500, 80, 9000], [2, -4, 3]]]) {
  const f = fixture(position, target);
  const start = f.camera.position.clone();
  const promise = f.controller.restore();
  assert.equal(f.controller.restore(), promise, "Concurrent commands share the same camera return");
  assert.deepEqual(f.camera.position.toArray(), start.toArray(), "No initial snap");
  assert.equal(f.controls.enabled, false);
  let completed = false; promise.then(() => { completed = true; });
  for (let i = 0; i < 10; i++) f.controller.tick(1 / 60);
  assert.equal(completed, false, "Commands cannot start after only a partial return");
  for (let i = 0; i < 100; i++) {
    f.controller.tick(1 / 60);
    assert.ok(f.camera.position.distanceTo(f.controls.target) > .00001, "Orbit return never passes through its own target");
    assert.ok(f.camera.position.toArray().every(Number.isFinite));
  }
  assert.equal(await promise, true);
  assert.ok(f.camera.position.distanceTo(new THREE.Vector3(0, 0, 8)) < 1e-9);
  assert.equal(f.controls.target.length(), 0); assert.equal(f.camera.zoom, 1);
  assert.equal(f.controls.enabled, true); assert.equal(f.controls.enableDamping, true);
  assert.deepEqual(f.busy, [true, false]);
}
{
  const f = fixture(); const pending = f.controller.restore();
  f.controller.tick(.1); // Frame gaps are clamped; hidden time does not fast-forward.
  f.controller.cancel(); const canceledPose = f.camera.position.clone();
  assert.equal(await pending, false); f.controller.tick(100);
  assert.equal(f.camera.position.distanceTo(canceledPose), 0);
  assert.equal(f.controls.enabled, true);
  f.controller.dispose(); assert.equal(await f.controller.restore(), false);
}
{
  const f = fixture([0, 0, .1], [0, 0, 0], true);
  assert.equal(await f.controller.restore(), true);
  assert.deepEqual(f.camera.position.toArray(), [0, 0, 8]);
}
const watch = fs.readFileSync(new URL("../src/pages/WatchStudio.tsx", import.meta.url), "utf8");
assert.match(watch, /portfolio:before-exit/);
assert.match(watch, /cameraReturnRef\.current\?\.restore\(\)/);
assert.match(watch, /if \(complete && mounted.current && epoch === commandEpoch.current\) selectRestoredModel/);
assert.match(watch, /watch-model-drawer \{ opacity:1; transform:translate3d\(0,104%,0\)/);
assert.doesNotMatch(watch, /\.watch-info-drawer,\.watch-model-drawer \{ opacity:1; transform:scale/);
console.log("PASS: elastic camera return is non-snapping, shared, cancellable, shortest-orbit/log-radius safe, reduced-motion aware and completes before dependent model commands (no browser/network).");
