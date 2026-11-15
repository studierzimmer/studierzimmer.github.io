import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";
import * as THREE from "three";
const source = fs.readFileSync(new URL("../src/components/SkyOceanBackground.tsx", import.meta.url), "utf8");
const ast = ts.createSourceFile("Sky.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const controller = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "UnderwaterController");
const scene = new THREE.Scene(); const originalFog = scene.fog; const camera = { position: new THREE.Vector3(0, 4, 0) };
const effects = [], layout = [], events = []; let frame;
vm.runInNewContext(ts.transpileModule(`${controller.getText(ast)}\nUnderwaterController();`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText, {
  THREE, SEA_LEVEL_Y: 0, FIXED_BACKGROUND_COLOR: "#ffffff",
  useThree: () => ({ scene, camera }), useRef: (current) => ({ current }), useMemo: (fn) => fn(),
  useEffect: (fn) => effects.push(fn), useLayoutEffect: (fn) => layout.push(fn), useFrame: (fn) => { frame = fn; },
  window: { dispatchEvent: (event) => events.push(event) }, CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
  document: { getElementById: () => ({ setAttribute() {} }) },
});
const cleanup = layout.map((fn) => fn()); effects.forEach((fn) => fn());
const fog = scene.fog; assert.ok(fog?.isFogExp2); assert.equal(fog.density, 0);
for (const height of [4, -2, 4, -2, 4]) {
  camera.position.y = height;
  for (let i = 0; i < 120; i++) { frame({}, 1 / 60); assert.equal(scene.fog, fog, "Crossings never toggle the useFog shader variant"); }
  assert.ok(fog.density >= 0 && fog.density <= .0028);
}
assert.equal(events.filter((event) => event.type === "ocean-surface-cross").length, 4);
cleanup.forEach((fn) => fn?.()); assert.equal(scene.fog, originalFog);
assert.match(source, /gl\.compileAsync\(ref\.current, camera, scene\)/);
const ocean = fs.readFileSync(new URL("../src/pages/OceanPage.tsx", import.meta.url), "utf8");
assert.doesNotMatch(ocean, />chiudi<\/button>/);
assert.match(ocean, /\[data-ocean-panel\], \[data-ocean-panel-toggle\]/);
const css = fs.readFileSync(new URL("../src/styles/ocean-page.css", import.meta.url), "utf8");
assert.match(css, /grid-template-columns:minmax\(0,1fr\) minmax\(0,1fr\) 96px minmax\(0,1fr\) minmax\(0,1fr\)/);
console.log("PASS: fog identity/density and crossing events stay stable, underwater material is prewarmed, popovers dismiss without close buttons, and joystick has a symmetric center column (no browser/network).");
