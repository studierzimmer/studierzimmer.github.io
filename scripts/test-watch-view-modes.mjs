// Actual helper, editor and Watch boundary code with memory-only hooks/services.
// No browser, WebGL, uploads, credentials, Supabase requests or database writes.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));
function compile(source, dependencies = {}, globals = {}) {
  const exports = {};
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(js, { exports, Object, Error, console, ...globals, require: (id) => {
    if (id.endsWith(".css")) return {};
    if (Object.hasOwn(dependencies, id)) return dependencies[id];
    throw new Error(`Unexpected dependency: ${id}`);
  } });
  return exports;
}
const helpers = compile(read("src/lib/modelViewModes.ts"));
for (const value of [undefined, null, false, 42, "render", []]) assert.deepEqual(plain(helpers.normalizeModelViewModes(value)), {});
const normalized = helpers.normalizeModelViewModes({ legacy: undefined, empty: [], invalid: ["pbr", "unknown"], selected: ["pen", "pen", "arctic"], one: ["render"], "": ["pen"] });
for (const key of ["legacy", "empty", "invalid"]) assert.deepEqual(plain(normalized[key]), ["render", "arctic", "pen"]);
assert.deepEqual(plain(normalized.selected), ["arctic", "pen"]);
assert.deepEqual(plain(normalized.one), ["render"]);
assert.equal(Object.hasOwn(normalized, ""), false);
assert.deepEqual(plain(helpers.modelViewModesFor("unconfigured", {})), ["render", "arctic", "pen"], "all existing models retain every view by default");
assert.deepEqual(plain(helpers.modelViewModesFor("inherited", Object.create({ inherited: ["pen"] }))), ["render", "arctic", "pen"]);
assert.equal(Object.getPrototypeOf(helpers.normalizeModelViewModes(JSON.parse('{"__proto__":["pen"]}'))), Object.prototype);

const watchSource = read("src/pages/WatchStudio.tsx");
const watchAST = ts.createSourceFile("WatchStudio.tsx", watchSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const declarations = new Map();
const effects = [];
function inspect(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) declarations.set(node.name.text, node.initializer);
  if (ts.isCallExpression(node) && node.expression.getText(watchAST) === "useEffect") effects.push(node.arguments[0]);
  ts.forEachChild(node, inspect);
}
inspect(watchAST);
const boundaryNames = ["RENDER_MODES", "allowedViewModes", "availableRenderModes", "sceneMode"];
const boundary = boundaryNames.map((name) => `const ${name}=${declarations.get(name).getText(watchAST)};`).join("\n");
for (const [allowed, previous, expected] of [
  [["render"], "pen", "pbr"], [["arctic"], "pbr", "arctic"], [["pen"], "arctic", "pen"], [["arctic", "pen"], "pen", "pen"], [undefined, "pbr", "pbr"],
]) {
  const result = compile(`${boundary}\nexports.result={sceneMode, ids:availableRenderModes.map(mode=>mode.id)};`, {}, { modelViewModesFor: helpers.modelViewModesFor, selectedModel: { id: "fixture-model" }, settings: { model_view_modes: allowed ? { "fixture-model": allowed } : {} }, renderMode: previous }).result;
  assert.equal(result.sceneMode, expected, "a model switch derives a permitted mode immediately, without a forbidden first frame");
  if (allowed?.length === 1) assert.equal(result.ids.length, 1);
}
const style = declarations.get("watchStudioStyles").text;
const infoRules = [...style.matchAll(/\.watch-info-(?:drawer|piece)[^{]*\{([^}]*)\}/g)].map((match) => match[1]);
assert.ok(infoRules.length >= 3);
assert.ok(infoRules.some((rule) => /translate3d\(-104%, 0, 0\)/.test(rule)));
assert.ok(infoRules.some((rule) => /translate3d\(0, 0, 0\)/.test(rule)));
assert.ok(infoRules.every((rule) => !/scale\(|opacity:\s*0/.test(rule)), "info panel and content only translate; no growth or dissolves");

let infoOpen = false;
const toggle = compile(`const toggle=${declarations.get("handleInfoToggle").getText(watchAST)};exports.toggle=toggle;`, {}, {
  setNavHidden() {}, setManagerOpen() {}, setModelListOpen() {}, setInfoOpen(value) { infoOpen = typeof value === "function" ? value(infoOpen) : value; },
}).toggle;
toggle(); assert.equal(infoOpen, true); toggle(); assert.equal(infoOpen, false, "a repeated info click closes the panel");
const outsideEffect = effects.find((effect) => effect.getText(watchAST).includes("const closeFromOutside"));
const listeners = new Map();
class Element { constructor(marker) { this.marker = marker; } closest(selector) { return selector === this.marker ? this : null; } }
const outside = compile(`exports.effect=${outsideEffect.getText(watchAST)};`, {}, { infoOpen: true, Element,
  setInfoOpen(value) { infoOpen = value; }, document: { addEventListener(name, callback) { listeners.set(name, callback); }, removeEventListener(name) { listeners.delete(name); } },
}).effect;
infoOpen = true;
const cleanup = outside();
listeners.get("pointerdown")({ target: new Element("[data-watch-info-toggle]") }); assert.equal(infoOpen, true, "capture-phase outside handler cannot close first and reopen the toggle");
listeners.get("pointerdown")({ target: new Element("[data-watch-info-panel]") }); assert.equal(infoOpen, true);
listeners.get("pointerdown")({ target: new Element("elsewhere") }); assert.equal(infoOpen, false);
cleanup(); assert.equal(listeners.size, 0);
assert.match(watchSource, />List<\/button>/);
assert.doesNotMatch(watchSource, />Index<\/button>/);

const jsx = (type, props) => ({ type, props: props ?? {} });
const nodes = (tree) => { const result = []; const visit = (node) => { if (Array.isArray(node)) return node.forEach(visit); if (!node || typeof node !== "object") return; result.push(node); visit(node.props?.children); }; visit(tree); return result; };
const text = (node) => typeof node === "string" ? node : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";
const adminSource = read("src/components/admin/AdminThreeDModelManager.tsx");
const adminAST = ts.createSourceFile("AdminThreeDModelManager.tsx", adminSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const stateNames = [];
function states(node) { if (ts.isVariableDeclaration(node) && ts.isArrayBindingPattern(node.name) && ts.isCallExpression(node.initializer) && node.initializer.expression.getText(adminAST) === "useState") stateNames.push(node.name.elements[0].getText(adminAST)); ts.forEachChild(node, states); }
states(adminAST);
const model = { id: "model-original", name: "Original", description: "Existing description", is_published: true, is_featured: false, is_watch: true, sort_order: 10, file_name: "original.glb", storage_path: "private/original.glb", public_url: "https://example.test/original.glb?unchanged", source_storage_path: "private/original.step", hdri_storage_path: "private/original.hdr" };
const currentSettings = { bio_text: "initial", ocean_title: "Original ocean", model_categories: { [model.id]: "horlogerie" }, model_view_modes: {} };
const latestSettings = { ...currentSettings, bio_text: "concurrently saved BIO", model_categories: { ...currentSettings.model_categories, "other-model": "models" }, model_view_modes: { "other-model": ["pen"] }, unknown_existing: { preserve: true } };
const values = new Map(Object.entries({ models: [model], selectedId: model.id, loading: false, editName: model.name, editDescription: model.description, editPublished: true, editFeatured: false, editWatch: true, editSortOrder: 10 }));
const refs = [], saves = [], metadata = [], calls = [];
let stateIndex = 0, refIndex = 0;
let settingsError = null;
const react = { useCallback: (fn) => fn, useMemo: (fn) => fn(), useEffect() {}, useRef(value) { const index = refIndex++; return refs[index] ?? (refs[index] = { current: value }); }, useState(initial) { const name = stateNames[stateIndex++]; if (!values.has(name)) values.set(name, typeof initial === "function" ? initial() : initial); return [values.get(name), (next) => values.set(name, typeof next === "function" ? next(values.get(name)) : next)]; } };
const admin = compile(adminSource, {
  react, "react/jsx-runtime": { jsx, jsxs: jsx }, "@/lib/modelViewModes": helpers, "@/lib/modelCategories": { modelCategoryFor: () => "horlogerie" },
  "@/hooks/useSiteContent": { useSiteContent: () => ({ settings: currentSettings, loading: false, async saveSettings(value) { calls.push("settings-write"); saves.push(plain(value)); } }) },
  "@/services/siteContentRepository": { async getSiteSettings() { calls.push("fresh-read"); return plain(latestSettings); }, getSiteContentStatus: () => ({ error: settingsError }) },
  "@/components/admin/BookBackgroundColorPicker": { default: () => null, hexToRgb: () => null, rgbToHex: () => "#EEEAE1" },
  "@/services/threeDModelRepository": {
    async updateThreeDModel(id, patch) { metadata.push([id, plain(patch)]); }, async listAllThreeDModelsForAdmin() { return [model]; },
    async setFeaturedThreeDModel() { throw new Error("Unexpected featured mutation"); },
  },
}).default;
const render = () => { stateIndex = 0; refIndex = 0; return nodes(admin({})); };
const fields = () => nodes(render().find((node) => node.props.className === "admin-model-view-modes"));
const checkbox = (label) => fields().find((node) => node.type === "label" && text(node) === label).props.children[0];
checkbox("Render").props.onChange({ target: { checked: false } });
checkbox("Arctic").props.onChange({ target: { checked: false } });
assert.deepEqual(plain(values.get("editViewModes")), ["pen"]);
assert.equal(checkbox("Pen").props.disabled, true, "last remaining view cannot be removed");
checkbox("Pen").props.onChange({ target: { checked: false } });
assert.deepEqual(plain(values.get("editViewModes")), ["pen"], "minimum-one guard also protects synthetic events");
assert.equal(saves.length, 0, "changing checkboxes only stages the model draft");
const form = render().find((node) => node.type === "form" && node.props.className === "admin-editor-form");
await form.props.onSubmit({ preventDefault() {} });
assert.deepEqual(calls, ["fresh-read", "settings-write"]);
assert.deepEqual(saves[0], { ...latestSettings, model_view_modes: { ...latestSettings.model_view_modes, [model.id]: ["pen"] } }, "only this model's mode entry changes; fresh unrelated settings and other-model choices survive");
assert.equal(metadata.length, 1); assert.equal(metadata[0][0], model.id);
assert.equal(Object.hasOwn(metadata[0][1], "storage_path"), false);
assert.equal(Object.hasOwn(metadata[0][1], "public_url"), false);
assert.equal(model.storage_path, "private/original.glb");
assert.equal(model.source_storage_path, "private/original.step");
assert.equal(model.hdri_storage_path, "private/original.hdr");
checkbox("Arctic").props.onChange({ target: { checked: true } });
settingsError = "fixture unavailable";
await render().find((node) => node.type === "form" && node.props.className === "admin-editor-form").props.onSubmit({ preventDefault() {} });
assert.equal(saves.length, 1, "fallback defaults on read failure can never overwrite existing site JSON");
assert.equal(metadata.length, 1, "failed prerequisite read aborts before any model mutation");
assert.deepEqual(plain(values.get("editViewModes")), ["arctic", "pen"], "failed save retains the staged owner choices for retry");
assert.match(values.get("error"), /fixture unavailable/);
console.log("PASS: legacy/default + minimum-one model views, immediate public mode filtering/PBR mapping, staged owner save with fresh JSON merge and original assets preserved; left-only info slide, repeat/outside toggle and listener cleanup; List label. Mocked only, no external writes.");
