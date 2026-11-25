// Actual Three/three-stdlib materials, mocked GPU calls. No browser, network,
// asset rewriting, remote writes or main-scene animation side effects.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import assert from "node:assert/strict";
import vm from "node:vm";
import ts from "typescript";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (name) => fs.readFileSync(path.join(root, name), "utf8");
const source = read("src/components/ocean/originalWaterAdapter.ts");
const threeUrl = pathToFileURL(path.join(root, "node_modules/three/build/three.module.js")).href;
const THREE = await import(threeUrl);
const { Water } = await import(pathToFileURL(path.join(root, "node_modules/three-stdlib/objects/Water.js")).href);
const compiled = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext }, reportDiagnostics: true });
assert.equal(compiled.diagnostics.length, 0);
const moduleSource = compiled.outputText.replace(/from (['"])three\1/, `from '${threeUrl}'`);
const { createOriginalWaterAdapter } = await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString("base64")}`);

const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
for (const radius of [60, 180, 600]) {
  assert.equal(1 - smooth(radius * .2, radius, 0), 1);
  assert.equal(1 - smooth(radius * .2, radius, radius), 0);
  assert.equal(smooth(radius * .35, radius * 2.5, radius * .35), 0);
  assert.equal(smooth(radius * .35, radius * 2.5, radius * 2.5), 1);
}
assert.match(source, /labNearRadius \* \.2, labNearRadius/);
assert.match(source, /labNearRadius \* \.35, labNearRadius \* 2\.5/);
assert.doesNotMatch(source, /requestAnimationFrame|Object\.hasOwn|\.at\(/);
assert.doesNotMatch(source, /material\.vertexShader\s*=|mesh\.geometry\s*=/);

function fixture({ initialShadowAuto = true, failCapture = false } = {}) {
  const scene = new THREE.Scene();
  const geometry = new THREE.PlaneGeometry(120000, 120000);
  const normals = new THREE.Texture();
  const water = new Water(geometry, { waterNormals: normals, alpha: .955, waterColor: "#0a2a6a", distortionScale: 10.7 });
  water.material.uniforms.rippleSampler = { value: new THREE.Texture() };
  water.material.fragmentShader += "\n// existing source ripple-field shader injection\n";
  water.material.transparent = true; water.material.depthWrite = false;
  scene.add(water);
  const skyMaterial = new THREE.ShaderMaterial({ uniforms: { sunPosition: { value: new THREE.Vector3(500, 200, -300) }, turbidity: { value: .6 }, rayleigh: { value: .6 } } });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 4, 4), skyMaterial);
  const modelLight = new THREE.DirectionalLight("#fff4d6", 1);
  scene.add(sky, modelLight);
  const state = { target: { original: true }, viewport: [3, 7, 1280, 720], scissor: [9, 4, 640, 360], scissorTest: true, width: 1280, height: 720, captures: 0, ownedDisposals: 0, sourceDisposals: 0 };
  const originalTarget = state.target;
  let captureTarget;
  const gl = {
    extensions: { has: () => false }, capabilities: { maxSamples: 4 },
    xr: { enabled: true }, shadowMap: { autoUpdate: initialShadowAuto },
    getDrawingBufferSize: (value) => value.set(state.width, state.height),
    getRenderTarget: () => state.target,
    setRenderTarget: (value) => {
      state.target = value;
      if (value?.isRenderTarget && captureTarget !== value) {
        captureTarget = value;
        value.addEventListener("dispose", () => state.ownedDisposals++);
      }
    },
    getViewport: (value) => value.fromArray(state.viewport),
    getScissor: (value) => value.fromArray(state.scissor),
    getScissorTest: () => state.scissorTest,
    setViewport: (value) => { state.viewport = value.toArray(); },
    setScissor: (value) => { state.scissor = value.toArray(); },
    setScissorTest: (value) => { state.scissorTest = value; },
    clear() {},
    render() {
      state.captures++;
      assert.equal(water.visible, false, "capture excludes original water and its reflection recursion");
      assert.equal(gl.shadowMap.autoUpdate, false, "extra capture reuses original shadow map instead of drawing it twice");
      assert.equal(gl.xr.enabled, false);
      if (failCapture) throw new Error("GPU capture failed");
    },
  };
  const material = water.material;
  const original = { fragment: material.fragmentShader, vertex: material.vertexShader, mirror: material.uniforms.mirrorSampler.value, waterSun: material.uniforms.sunDirection.value.clone(), skySun: skyMaterial.uniforms.sunPosition.value.clone(), lightColor: modelLight.color.clone() };
  [material, geometry, normals, original.mirror.renderTarget].forEach((resource) => resource.addEventListener("dispose", () => state.sourceDisposals++));
  const adapter = createOriginalWaterAdapter({ scene, gl });
  const camera = new THREE.PerspectiveCamera(55, 1, .1, 90000);
  camera.position.set(0, 20, 100);
  return { scene, skyMaterial, modelLight, water, material, original, geometry, state, gl, adapter, camera, originalTarget, get target() { return captureTarget; } };
}

for (const initialShadowAuto of [false, true]) {
  for (const failCapture of [false, true]) {
    const f = fixture({ initialShadowAuto, failCapture });
    const update = () => f.adapter.update(f.camera, 1, {});
    if (failCapture) assert.throws(update, /GPU capture failed/); else update();
    assert.equal(f.state.target, f.originalTarget);
    assert.equal(f.gl.shadowMap.autoUpdate, initialShadowAuto);
    assert.equal(f.gl.xr.enabled, true); assert.equal(f.water.visible, true);
    assert.deepEqual(f.state.viewport, [3, 7, 1280, 720]);
    assert.deepEqual(f.state.scissor, [9, 4, 640, 360]); assert.equal(f.state.scissorTest, true);
    assert.equal(f.water.material, f.material); assert.equal(f.water.geometry, f.geometry);
    assert.equal(f.material.vertexShader, f.original.vertex);
    assert.equal(f.material.uniforms.mirrorSampler.value, f.original.mirror);
    assert.equal(f.material.uniforms.alpha.value, .955);
    assert.equal(f.material.uniforms.distortionScale.value, 10.7);
    assert.equal(f.material.transparent, true); assert.equal(f.material.depthWrite, false);
    const noise = (shader) => shader.slice(shader.indexOf("vec4 getNoise"), shader.indexOf("void sunLight"));
    assert.equal(noise(f.material.fragmentShader), noise(f.original.fragment), "original normal samples/timings/swizzle are byte-identical");
    assert.match(f.material.fragmentShader, /float rf0 = 0\.3;/);
    assert.match(f.material.fragmentShader, /getShadowMask\(\)/);
    assert.match(f.material.fragmentShader, /existing source ripple-field shader injection/);
    assert.equal(f.material.uniforms.labNearRadius.value, 180);
    assert.equal(f.material.uniforms.labDeepColor.value.getHexString(), "04060b");
    assert.equal(f.material.uniforms.labShallowColor.value.getHexString(), "0e545d");
    assert.equal(f.target.width, 1280); assert.equal(f.target.height, 720); assert.equal(f.target.samples, 4);
    assert.equal(f.modelLight.intensity, 1); assert.deepEqual(f.modelLight.color.toArray(), f.original.lightColor.toArray());
    if (!failCapture) {
      f.state.width = 390; f.state.height = 844;
      f.adapter.update(f.camera, 2, { nearRadius: 600, waterClarity: 1, sunElevation: 45, sunAzimuth: 200 });
      assert.equal(f.target.width, 390); assert.equal(f.material.uniforms.labResolution.value.y, 844);
      assert.equal(f.material.uniforms.labNearRadius.value, 600);
      assert.equal(f.modelLight.intensity, 1, "sun control must not change model lights");
      const count = f.state.captures;
      f.camera.position.y = -4;
      f.adapter.update(f.camera, 3, { nearRadius: NaN, waterColor: "invalid" });
      assert.equal(f.state.captures, count, "underwater never performs or applies new above-water capture");
      assert.equal(f.material.uniforms.labAbove.value, 0);
      assert.equal(f.material.uniforms.labNearRadius.value, 180);
      assert.equal(f.material.uniforms.labDeepColor.value.getHexString(), "04060b");
      assert.equal(f.scene.children.find((object) => object.name === "Ocean — small visible sun").visible, false);
    }
    const beforeDispose = f.state.ownedDisposals;
    f.adapter.dispose(); f.adapter.dispose();
    assert.equal(f.state.ownedDisposals, beforeDispose + 1);
    assert.equal(f.state.sourceDisposals, 0, "adapter does not free original geometry/material/normal/reflection assets");
    assert.equal(f.material.fragmentShader, f.original.fragment);
    assert.equal(f.material.vertexShader, f.original.vertex);
    assert.equal(f.material.uniforms.labSceneColor, undefined);
    assert.deepEqual(f.material.uniforms.sunDirection.value.toArray(), f.original.waterSun.toArray());
    assert.deepEqual(f.skyMaterial.uniforms.sunPosition.value.toArray(), f.original.skySun.toArray());
    const count = f.state.captures; f.adapter.update(f.camera, 4, {}); assert.equal(f.state.captures, count);
  }
}
// Saved settings must be published after the separate world host exists, not
// lost on the first visit and then switched in at the end of the aperture.
const pageSource = read("src/pages/OceanPage.tsx");
const pageAST = ts.createSourceFile("OceanPage.tsx", pageSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const effects = [];
function collectEffects(node) {
  if (ts.isCallExpression(node) && node.expression.getText(pageAST) === "useEffect") effects.push(node.getText(pageAST));
  ts.forEachChild(node, collectEffects);
}
collectEffects(pageAST);
const hostEffect = effects.findIndex((effect) => effect.includes("activateOceanWorld(entryEnvironment.current)"));
const publishEffect = effects.findIndex((effect) => effect.includes('setAttribute("data-ocean-environment"'));
const apertureEffect = effects.findIndex((effect) => effect.includes("element.animate(oceanRevealFrames"));
assert.ok(hostEffect >= 0 && publishEffect > hostEffect && apertureEffect > publishEffect, "prepared world activation precedes saved settings publication, which precedes the unchanged aperture animation");
const hostSource = read("src/components/ocean/oceanWorldHost.tsx");
assert.ok(hostSource.indexOf("updateOceanWorldEnvironment(environment);") < hostSource.indexOf("createRoot(host)"), "saved environment is installed before even creating the world root");
assert.match(hostSource, /oceanEnvironmentState\.current = normalized;[\s\S]*host\.setAttribute\("data-ocean-environment"/, "both original floor and water uniform readers see saved values before their first frame");
const routeCss = read("src/styles/portfolio.css"), oceanCss = read("src/styles/ocean-page.css");
const rule = (css, selector) => [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find((entry) => entry[1].split(",").map((part) => part.trim()).includes(selector))?.[2] ?? "";
for (const selector of ["#root[data-ocean-surface]", ".route-stage.is-ocean-surface", ".route-stage.is-ocean-surface > .public-display"]) assert.match(rule(routeCss, selector), /pointer-events:\s*none/, `${selector} cannot shield the separate world canvas from native pointer gestures`);
assert.match(rule(routeCss, ".route-stage.is-ocean-surface .privacy-consent-panel"), /pointer-events:\s*auto/, "a new visitor can still make a privacy choice above the world");
for (const selector of [".ocean-page button", ".ocean-page input", ".ocean-page textarea", ".ocean-page select", ".ocean-page .site-inline-controls"]) assert.match(rule(oceanCss, selector), /pointer-events:\s*auto/, `${selector} stays interactive despite transparent page ancestors`);
const appSource = read("src/App.tsx"), appAST = ts.createSourceFile("App.tsx", appSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let displayEffect;
function findDisplayEffect(node) {
  if (ts.isCallExpression(node) && node.expression.getText(appAST) === "useLayoutEffect" && node.arguments[0]?.getText(appAST).includes('toggleAttribute("data-ocean-surface"')) displayEffect = node.arguments[0];
  ts.forEachChild(node, findDisplayEffect);
}
findDisplayEffect(appAST); assert.ok(displayEffect);
const attributes = new Map(), worldAttributes = new Map(), worldHost = { style: {}, setAttribute: (key, value) => worldAttributes.set(key, value) };
const displayScope = {
  showsOceanBackground: true,
  document: { getElementById: (id) => id === "root" ? { toggleAttribute: (name, enabled) => enabled ? attributes.set(name, "") : attributes.delete(name), removeAttribute: (name) => attributes.delete(name) } : worldHost },
  window: { dispatchEvent() {} }, CustomEvent: class { constructor(name, options) { this.type = name; this.detail = options.detail; } },
};
const displayJs = ts.transpileModule(`globalThis.mount = ${displayEffect.getText(appAST)};`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText;
vm.runInNewContext(displayJs, displayScope);
const clearDisplayedOcean = displayScope.mount(); assert.equal(attributes.has("data-ocean-surface"), true); assert.equal(worldHost.style.display, "block");
clearDisplayedOcean(); assert.equal(attributes.has("data-ocean-surface"), false, "effect cleanup restores app pointer ownership");
displayScope.showsOceanBackground = false; displayScope.mount();
assert.equal(attributes.has("data-ocean-surface"), false); assert.equal(worldHost.style.display, "none"); assert.equal(worldAttributes.get("data-explore"), "0");
const environmentSource = read("src/types/oceanEnvironment.ts");
const environmentJs = ts.transpileModule(environmentSource, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } }).outputText;
const { normalizeOceanEnvironment, DEFAULT_OCEAN_ENVIRONMENT } = await import(`data:text/javascript;base64,${Buffer.from(environmentJs).toString("base64")}`);
assert.deepEqual(normalizeOceanEnvironment(undefined), DEFAULT_OCEAN_ENVIRONMENT, "existing JSON rows without environment settings use approved defaults");
assert.equal(DEFAULT_OCEAN_ENVIRONMENT.waterColor, "#04060B"); assert.equal(DEFAULT_OCEAN_ENVIRONMENT.shallowColor, "#0E545D");
const invalid = normalizeOceanEnvironment({ waterColor: "javascript:invalid", waterClarity: Infinity, nearRadius: 99999, floorGlowColor: "#abcdef", floorGlowStrength: -2, floorGlowRadius: 9999, unwantedKey: "discard" });
assert.equal(invalid.waterColor, DEFAULT_OCEAN_ENVIRONMENT.waterColor); assert.equal(invalid.waterClarity, DEFAULT_OCEAN_ENVIRONMENT.waterClarity);
assert.equal(invalid.nearRadius, 600); assert.equal(invalid.floorGlowColor, "#abcdef"); assert.equal(invalid.floorGlowStrength, 0); assert.equal(invalid.floorGlowRadius, 400);
assert.equal("unwantedKey" in invalid, false);
assert.match(read("src/services/siteContentRepository.ts"), /ocean_environment:\s*normalizeOceanEnvironment\(input\.ocean_environment\)/, "existing JSON persistence explicitly retains normalized environment settings");

// Execute the actual SeaFloor component with real Three materials and tiny
// hook/JSX shims. Only the caustics dependency is stubbed; the glow extension,
// frame uniform updates and cleanup are the production component's own code.
const worldSource = read("src/components/SkyOceanBackground.tsx");
const worldAST = ts.createSourceFile("SkyOceanBackground.tsx", worldSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let floorNode;
ts.forEachChild(worldAST, (node) => { if (ts.isFunctionDeclaration(node) && node.name?.text === "SeaFloor") floorNode = node; });
assert.ok(floorNode);
let floorFrame;
const floorCleanups = [], floorPlayer = new THREE.Group();
floorPlayer.position.set(12, 15, -37);
const environmentState = { current: normalizeOceanEnvironment() }, phase = { value: 0 };
const floorScope = {
  THREE, PLAYER_GROUND_Y: 15, SEA_FLOOR_Y: -174, OCEAN_SIZE: 120000,
  playerRef: { current: floorPlayer }, oceanEnvironmentState: environmentState, causticsTimeUniform: phase,
  useMemo: (factory) => factory(), useCausticsTexture: () => null,
  useEffect: (factory) => floorCleanups.push(factory()), useFrame: (callback) => { floorFrame = callback; },
  React: { createElement: (type, props, ...children) => ({ type, props, children }) },
  addUnderwaterCaustics: (material) => { material.onBeforeCompile = (shader) => { shader.fragmentShader = "varying vec3 vCausticsWorldPosition;\n" + shader.fragmentShader; }; },
};
const floorJs = ts.transpileModule(floorNode.getText(worldAST), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React } }).outputText;
vm.runInNewContext(floorJs + "\nglobalThis.floor = SeaFloor();", floorScope);
const floorTree = floorScope.floor;
assert.equal(floorTree.props["position-y"], -174); assert.equal(floorTree.props.receiveShadow, true);
assert.deepEqual(Array.from(floorTree.children[0].props.args), [120000, 120000]);
const floorMaterial = floorTree.children[1].props.object;
assert.equal(floorMaterial.color.getHexString(), "315057", "the whole original floor stays cool blue-grey, not yellow");
const floorProgram = { uniforms: {}, fragmentShader: "void main(){\n#include <emissivemap_fragment>\n}" };
floorMaterial.onBeforeCompile(floorProgram, {});
assert.match(floorProgram.fragmentShader, /vCausticsWorldPosition\.xz - oceanGlowPlayer\.xz/);
assert.match(floorProgram.fragmentShader, /exp\(-dot\(floorFromPlayer, floorFromPlayer\)/);
assert.match(floorProgram.fragmentShader, /totalEmissiveRadiance \+= oceanGlowColor/);
const version = floorMaterial.version;
floorFrame({ clock: { elapsedTime: 12 } });
assert.equal(phase.value, 12); assert.deepEqual(floorProgram.uniforms.oceanGlowPlayer.value.toArray(), [12, 15, -37]);
const playerUniform = floorProgram.uniforms.oceanGlowPlayer;
floorPlayer.position.set(560, -166, 600);
environmentState.current = normalizeOceanEnvironment({ floorGlowColor: "#abcdef", floorGlowStrength: 1.25, floorGlowRadius: 240 });
floorFrame({ clock: { elapsedTime: 13 } });
assert.equal(floorProgram.uniforms.oceanGlowPlayer, playerUniform); assert.deepEqual(playerUniform.value.toArray(), [560, -166, 600]);
assert.equal(floorProgram.uniforms.oceanGlowColor.value.getHexString(), "abcdef"); assert.equal(floorProgram.uniforms.oceanGlowStrength.value, 1.25); assert.equal(floorProgram.uniforms.oceanGlowRadius.value, 240);
assert.equal(floorMaterial.version, version, "moving the player/changing settings only updates uniforms, never recompiles the floor");
for (const radius of [40, 150, 400]) {
  const falloff = (distance) => Math.exp(-distance * distance / (radius * radius) * 2.5);
  assert.equal(falloff(0), 1); assert.ok(falloff(radius) < .083); assert.ok(falloff(radius * 2) < .00005, "glow rapidly vanishes away from the player instead of recoloring the whole floor");
}
floorCleanups.forEach((cleanup) => cleanup?.());
console.log("PASS: main Ocean original material/microdetail/Fresnel/shadows/reflections; full-res capture and failure restoration; saved-settings host order/default normalization; three-layer canvas passthrough with privacy/editor exceptions; original cool floor with stable player-local uniform-only glow (mock GPU, no browser/network).");
