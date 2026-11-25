// Real normalizers/repository/component code with memory-only storage, auth,
// JSX and hook shims. No browser, credentials, network, SQL or disk writes.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const read = (name) => fs.readFileSync(new URL(`../${name}`, import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));
function compile(source, dependencies = {}, extras = {}) {
  const exports = {};
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(js, { exports, URL, Map, Set, AbortController, console, ...extras, require: (id) => {
    if (Object.hasOwn(dependencies, id)) return dependencies[id];
    if (id.endsWith(".css")) return {};
    throw new Error(`Unexpected dependency: ${id}`);
  } });
  return exports;
}
const labels = compile(read("src/types/oceanText.ts"));
const environment = compile(read("src/types/oceanEnvironment.ts"));
const menu = compile(read("src/lib/siteMenu.ts"));
const modelViews = compile(read("src/lib/modelViewModes.ts"));
const artworkOrder = compile(read("src/lib/artworkOrder.ts"));
const keys = ["exit", "start", "about", "figure", "music", "loadingFigures", "figuresUnavailable"];
assert.deepEqual(Object.keys(labels.DEFAULT_OCEAN_LABELS), keys);
assert.equal(labels.DEFAULT_OCEAN_LABELS.exit, "Exit");
assert.equal(labels.DEFAULT_OCEAN_LABELS.start, "start");
assert.equal(labels.DEFAULT_OCEAN_LABELS.about, "about");
for (const invalid of [undefined, null, 42, "labels", [], ["Exit"]]) assert.deepEqual(plain(labels.normalizeOceanLabels(invalid)), plain(labels.DEFAULT_OCEAN_LABELS));
const blank = Object.fromEntries(keys.map((key) => [key, ""]));
assert.deepEqual(plain(labels.normalizeOceanLabels(blank)), blank, "empty text is intentional, never restored by truthy fallback");
const custom = { exit: "Ritorna", start: "Andiamo", about: "Note", figure: "Figure", music: "Suono", loadingFigures: "Attendi…", figuresUnavailable: "Catalogo momentaneamente assente" };
const snapshot = JSON.stringify(custom);
assert.deepEqual(plain(labels.normalizeOceanLabels(custom)), custom); assert.equal(JSON.stringify(custom), snapshot);
assert.equal(labels.normalizeOceanLabels({ about: "  testo ☺︎  " }).about, "  testo ☺︎  ", "plain text/whitespace/Unicode survive editing");
assert.equal(labels.normalizeOceanLabels({ exit: 1 }).exit, "Exit");
assert.equal("unknown" in labels.normalizeOceanLabels({ unknown: "discard" }), false);
assert.equal(labels.normalizeOceanLabels(Object.create({ exit: "inherited" })).exit, "Exit", "inherited content cannot override stored keys");
assert.equal(labels.normalizeOceanLabels({ about: "<img src=x onerror=alert(1)>" }).about, "<img src=x onerror=alert(1)>", "markup remains plain text, not executable HTML");
const adminSource = read("src/components/admin/AdminSiteSettings.tsx"), adminAST = ts.createSourceFile("AdminSiteSettings.tsx", adminSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let adminFields, adminUpdate;
function findAdminFields(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(adminAST) === "oceanLabelFields") adminFields = node.initializer;
  if (ts.isVariableDeclaration(node) && node.name.getText(adminAST) === "updateOceanLabel") adminUpdate = node.initializer;
  ts.forEachChild(node, findAdminFields);
}
findAdminFields(adminAST); assert.ok(adminFields); assert.ok(adminUpdate);
let stagedDraft = { bio_text: "Non modificare BIO", ocean_labels: custom }, dirty = false;
const adminScope = { normalizeOceanLabels: labels.normalizeOceanLabels, setDraft: (update) => { stagedDraft = update(stagedDraft); }, setDirty: (value) => { dirty = value; }, setFeedback() {}, setFailure() {} };
vm.runInNewContext(ts.transpileModule(`globalThis.fields=${adminFields.getText(adminAST)};globalThis.change=${adminUpdate.getText(adminAST)};`, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText, adminScope);
assert.deepEqual(Array.from(adminScope.fields, (field) => field.key), keys, "all visitor labels/status messages have dedicated backend fields");
adminScope.change("music", ""); assert.equal(stagedDraft.ocean_labels.music, ""); assert.equal(stagedDraft.ocean_labels.exit, custom.exit); assert.equal(stagedDraft.bio_text, "Non modificare BIO"); assert.equal(dirty, true);

function repository(mode) {
  const records = new Map(), events = [], calls = [];
  const state = { admin: true, rpcError: null, row: null, writeError: null };
  const supabase = {
    async rpc(name) { calls.push(["rpc", name]); return { data: state.admin, error: state.rpcError }; },
    from(table) {
      calls.push(["from", table]);
      const chain = {
        select() { return chain; }, eq() { return chain; }, abortSignal() { return chain; },
        async maybeSingle() { return { data: state.row ? { data: plain(state.row) } : null, error: null }; },
        async upsert(payload) {
          calls.push(["upsert", plain(payload)]);
          if (!state.writeError) state.row = plain(payload.data);
          return { error: state.writeError };
        },
      };
      return chain;
    },
  };
  const database = {
    transaction(store) {
      const transaction = {
        objectStore() { return {
          get(key) { const request = {}; queueMicrotask(() => { request.result = records.get(`${store}:${key}`); request.onsuccess?.(); }); return request; },
          put(value, key) { records.set(`${store}:${key}`, plain(value)); queueMicrotask(() => transaction.oncomplete?.()); },
        }; },
      };
      return transaction;
    },
  };
  const indexedDB = { open() { const request = {}; queueMicrotask(() => { request.result = database; request.onsuccess?.(); }); return request; } };
  const source = read("src/services/siteContentRepository.ts").replaceAll("import.meta.env.VITE_SITE_CONTENT_MODE", JSON.stringify(mode)).replaceAll("import.meta.env.DEV", "false");
  const api = compile(`${source}\nexport { normalizeSettings };`, {
    "@/lib/supabase": { supabase }, "@/lib/siteMenu": menu, "@/lib/modelViewModes": modelViews, "@/lib/artworkOrder": artworkOrder, "@/types/oceanEnvironment": environment, "@/types/oceanText": labels,
  }, { indexedDB, queueMicrotask, window: { location: { hostname: "127.0.0.1", protocol: "http:" }, setTimeout, clearTimeout, dispatchEvent: (event) => events.push(event) }, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } } });
  return { api, state, calls, records, events };
}
for (const mode of ["local", "remote"]) {
  const f = repository(mode), api = f.api;
  const original = { ...api.DEFAULT_SITE_SETTINGS, bio_text: "BIO da conservare", ocean_title: "", ocean_subtitle: "", ocean_about: "", ocean_labels: custom, gallery_row_gap: { artworks: 128, jewelry: 48 }, gallery_item_order: { artworks: ["same-year-second", "same-year-first", "hidden-original-id"], jewelry: ["original-jewelry-id"] }, model_view_modes: { "original-model-id": ["arctic", "pen"] } };
  await api.saveSiteSettings(original);
  const reloaded = await api.getSiteSettings();
  assert.deepEqual(plain(reloaded.gallery_item_order), original.gallery_item_order, "manual per-gallery ordering persists in the existing settings JSON, not in product rows");
  assert.ok(f.calls.filter((call) => call[0] === "from").every((call) => call[1] === "site_settings"), "saving presentation order never writes artwork, book, model or storage records");
  assert.deepEqual(plain(reloaded.ocean_labels), custom); assert.equal(reloaded.ocean_title, ""); assert.equal(reloaded.ocean_subtitle, ""); assert.equal(reloaded.ocean_about, "");
  assert.equal(reloaded.bio_text, "BIO da conservare");
  assert.deepEqual(plain(reloaded.menu_items), plain(original.menu_items), "new labels never reset other menus/content");
  if (mode === "local") {
    assert.equal(f.calls.length, 0, "local draft save/reload never contacts Supabase");
    assert.equal(f.records.has("drafts:settings:main"), true);
  } else {
    const write = f.calls.find((call) => call[0] === "upsert")[1];
    assert.deepEqual(Object.keys(write).sort(), ["data", "id"]); assert.equal(write.id, "main");
    assert.deepEqual(write.data.ocean_labels, custom, "all new data stays inside existing site_settings JSONB, not new SQL columns");
    assert.equal(f.calls[0][0], "rpc"); assert.equal(f.calls[0][1], "is_admin");
  }
  await api.saveSiteSettings({ ...reloaded, ocean_labels: blank });
  assert.deepEqual(plain((await api.getSiteSettings()).ocean_labels), blank);
  assert.equal(f.events.every((event) => event.type === "studierzimmer:site-content-change"), true);
  assert.deepEqual(plain(api.normalizeSettings({}).ocean_labels), plain(labels.DEFAULT_OCEAN_LABELS), "old CMS rows require no migration");
}
for (const denied of [{ admin: false }, { admin: true, rpcError: { message: "Access denied" } }]) {
  const f = repository("remote"); Object.assign(f.state, denied);
  await assert.rejects(() => f.api.saveSiteSettings({ ...f.api.DEFAULT_SITE_SETTINGS, ocean_labels: custom }), /amministratore|Access denied/);
  assert.equal(f.calls.some((call) => call[0] === "from"), false); assert.equal(f.events.length, 0, "denied saves cannot publish a success event");
}
{
  const f = repository("remote"); f.state.writeError = { code: "42501", message: "row-level security denied" };
  await assert.rejects(() => f.api.saveSiteSettings(f.api.DEFAULT_SITE_SETTINGS), /row-level security/);
  assert.equal(f.state.row, null);
}

const jsx = (type, props) => ({ type, props: props || {} });
const runtime = { jsx, jsxs: jsx, Fragment: "Fragment" };
const inline = compile(read("src/components/ocean/OceanInlineText.tsx"), { "react/jsx-runtime": runtime }).default;
const walk = (tree) => {
  const result = [];
  const visit = (node) => { if (!node || typeof node !== "object") return; result.push(node); const children = node.props?.children; (Array.isArray(children) ? children : [children]).forEach(visit); };
  visit(tree); return result;
};
for (const multiline of [false, true]) {
  const changes = [], tree = inline({ value: "Parola", label: "Testo", action: true, multiline, onChange: (value) => changes.push(value) });
  const nodes = walk(tree), field = nodes.find((node) => node.type === (multiline ? "textarea" : "input"));
  assert.ok(field); assert.equal(field.props.value, "Parola"); assert.equal(nodes.some((node) => node.type === "button"), false, "editing an action renders no live navigation button");
  field.props.onChange({ target: { value: "  Nuovo ☺︎  " } }); field.props.onChange({ target: { value: "" } });
  assert.deepEqual(changes, ["  Nuovo ☺︎  ", ""]);
  assert.equal(nodes.some((node) => Object.hasOwn(node.props || {}, "dangerouslySetInnerHTML")), false);
  assert.equal(nodes.some((node) => node.props?.contentEditable), false);
  const disabled = walk(inline({ value: "Salvataggio", label: "Testo", multiline, disabled: true, onChange() {} })).find((node) => node.type === (multiline ? "textarea" : "input"));
  assert.equal(disabled.props.disabled, true);
}

// Render the actual page with native-state/hook shims. The world loader and
// every effect are inert, so this checks reachable editor fields after Start
// without mounting WebGL, sending events or navigating the real application.
const pageSource = read("src/pages/OceanPage.tsx"), pageAST = ts.createSourceFile("OceanPage.tsx", pageSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const stateNames = [];
function findStates(node) {
  if (ts.isVariableDeclaration(node) && ts.isArrayBindingPattern(node.name) && ts.isCallExpression(node.initializer) && node.initializer.expression.getText(pageAST) === "useState") stateNames.push(node.name.elements[0].getText(pageAST));
  ts.forEachChild(node, findStates);
}
findStates(pageAST);
let stateIndex = 0, editing = true, saving = false, stateOverrides = {}, updates = [], navigations = [];
let pageEffects = [], controlsOptions;
const controlsActions = [];
const uiEvents = [], windowListeners = new Map(), documentListeners = new Map();
const pageDocument = { hidden: false, getElementById: () => null, addEventListener: (name, callback) => documentListeners.set(name, callback), removeEventListener: (name) => documentListeners.delete(name) };
const config = { ...repository("local").api.DEFAULT_SITE_SETTINGS, ocean_title: "TITOLO", ocean_subtitle: "SOTTOTITOLO", ocean_about: "TESTO", ocean_labels: custom };
const react = {
  useMemo: (factory) => factory(), useCallback: (callback) => callback, useRef: (current) => ({ current }), useEffect(callback) { pageEffects.push(callback); }, useLayoutEffect() {}, useId: () => "mock-id",
  useState(initial) { const name = stateNames[stateIndex++]; return [Object.hasOwn(stateOverrides, name) ? stateOverrides[name] : typeof initial === "function" ? initial() : initial, () => {}]; },
};
const control = () => null;
const page = compile(pageSource, {
  react, "react/jsx-runtime": runtime, "react-dom/client": { createRoot() { throw new Error("No world creation in text tests"); } },
  "react-router-dom": { useNavigate: () => (to) => navigations.push(to) },
  "framer-motion": { AnimatePresence: "AnimatePresence", useReducedMotion: () => false, motion: new Proxy({}, { get: (_, name) => `motion.${String(name)}` }) },
  "@/components/SkyOceanBackground": { __esModule: true, default: control, preloadOceanAssets() {} },
  "@/components/ocean/oceanWorldHost": { activateOceanWorld() {}, prepareOceanWorld: async () => true, cancelOceanWorldPreparation() {}, updateOceanWorldEnvironment() {} },
  "@/components/SiteEditControl": { __esModule: true, default: control, useInlineSiteEditing: () => ({ editing, saving, isAdmin: true, settings: config, draft: config, update: (patch) => updates.push(patch) }) },
  "@/components/ocean/OceanEnvironmentEditor": { __esModule: true, default: control },
  "@/components/ocean/OceanInlineText": { __esModule: true, default: inline },
  "@/components/ocean/useOceanControlsTransition": { useOceanControlsTransition(options) {
    controlsOptions = options;
    return { tools: { current: null }, movement: { current: null }, phase: "visible", busy: () => false, begin: () => controlsActions.push("begin") };
  } },
  "@/services/characterRepository": { listPublishedCharacters() { throw new Error("No catalogue/network calls in text tests"); } },
  "@/types/oceanEnvironment": environment, "@/types/oceanText": labels,
}, { document: pageDocument, window: { dispatchEvent: (event) => uiEvents.push(event), addEventListener: (name, callback) => windowListeners.set(name, callback), removeEventListener: (name) => windowListeners.delete(name) }, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } }, setTimeout: () => 1, clearTimeout() {} }).default;
function render(overrides = {}) { stateIndex = 0; pageEffects = []; stateOverrides = { ready: true, started: true, ...overrides }; return walk(page()); }
const nodes = render(), fields = nodes.filter((node) => node.type === inline);
for (const value of ["TITOLO", "SOTTOTITOLO", custom.exit, custom.figure]) assert.ok(fields.some((node) => node.props.value === value), `${value} remains editable after Start`);
assert.equal(fields.some((node) => ["TESTO", custom.about, custom.music].includes(node.props.value)), false, "removed About/Music UI has no reachable editor actions");
assert.equal(config.ocean_about, "TESTO"); assert.equal(config.ocean_labels.music, custom.music, "retiring public controls never deletes their saved backend fields");
for (const field of fields) assert.equal(field.props.disabled, false);
assert.equal(nodes.some((node) => node.type === "button" && [custom.exit, custom.figure, custom.music].includes(node.props.children)), false, "live navigation actions cannot fire while editing their labels");
assert.equal(nodes.some((node) => String(node.props?.className).split(" ").includes("ocean-movement")), false, "editing text cannot accidentally move/jump the character");
const exitField = fields.find((node) => node.props.value === custom.exit);
exitField.props.onChange(""); assert.equal(updates.at(-1).ocean_labels.exit, ""); assert.equal(navigations.length, 0);
saving = true; assert.ok(render().filter((node) => node.type === inline).every((node) => node.props.disabled)); saving = false;
editing = false;
assert.ok(render({ started: true, figuresOpen: true, characters: [], characterError: null }).some((node) => node.type === "p" && node.props.children === custom.loadingFigures), "figure loading uses editable CMS message");
assert.ok(render({ started: true, figuresOpen: true, characters: [], characterError: "offline" }).some((node) => node.type === "p" && node.props.children === custom.figuresUnavailable), "figure errors use editable CMS message rather than hardcoded exception text");
const visitor = render({ started: false });
assert.equal(visitor.some((node) => node.type === inline), false, "visitors never receive editable fields");
assert.ok(visitor.some((node) => node.type === "button" && node.props.children === custom.start));
assert.equal(visitor.some((node) => [custom.about, custom.music].includes(node.props?.children)), false, "visitors only see the remaining intro actions");
const detached = render({ started: true, cameraState: { detached: true, returning: false } });
assert.ok(detached.some((node) => node.props?.["aria-label"] === "Riporta la camera dietro la figura"));
assert.equal(render({ started: false, cameraState: { detached: true, returning: false } }).some((node) => node.props?.["aria-label"] === "Riporta la camera dietro la figura"), false, "camera reset belongs only to active exploration");
assert.equal(render({ started: true, cameraState: { detached: false, returning: false } }).some((node) => node.props?.["aria-label"] === "Riporta la camera dietro la figura"), false);
assert.equal(render({ started: true, cameraState: { detached: true, returning: true } }).find((node) => node.props?.["aria-label"] === "Riporta la camera dietro la figura").props.disabled, true);
render({ started: true, cameraState: { detached: true, returning: false } }).find((node) => node.props?.["aria-label"] === "Riporta la camera dietro la figura").props.onClick();
assert.equal(controlsActions.at(-1), "begin", "Re-Center begins the controls choreography rather than moving the camera before scale-out");
{
  const returning = render({ started: true, cameraState: { detached: true, returning: false } });
  const button = returning.find((node) => node.props?.["aria-label"] === "Riporta la camera dietro la figura");
  assert.equal(button.props.initial.scale, 0); assert.equal(button.props.animate.scale, 1); assert.equal(button.props.exit.scale, 0);
  assert.equal(button.props.transition.type, "spring");
  assert.ok(returning.some((node) => node.props?.className === "ocean-tools-inner ocean-controls-scale"));
  assert.ok(returning.some((node) => node.props?.className === "ocean-movement-inner ocean-controls-scale"));
  const joystick = returning.find((node) => node.props?.className === "ocean-joystick");
  const released = [];
  const target = { setPointerCapture() {}, hasPointerCapture: () => true, releasePointerCapture: (id) => released.push(id) };
  joystick.props.onPointerDown({ pointerId: 71, clientX: 10, clientY: 10, currentTarget: target, preventDefault() {} });
  const before = uiEvents.length;
  controlsOptions.releaseInputs();
  assert.deepEqual(released, [71], "recentring releases a held UI capture before hiding its controls");
  assert.deepEqual(uiEvents.slice(before).map((event) => event.type), ["explore-joystick-contact", "explore-joystick", "explore-vertical", "explore-sprint", "ocean-controls-release"]);
  const after = uiEvents.length;
  joystick.props.onPointerUp({ pointerId: 71 });
  assert.equal(uiEvents.length, after, "releasing a hidden old contact cannot leave movement held or trigger a jump");
}
for (const kind of ["avatar", "aircraft"]) assert.equal(render({ started: true, activeCharacterKind: kind }).some((node) => node.type === "button" && node.props.children === "Surface"), false, `Surface is never shown for ${kind}`);
assert.equal(render({ started: false, activeCharacterKind: "ship" }).some((node) => node.type === "button" && node.props.children === "Surface"), false, "Surface is not an intro action");
{
  const ship = render({ started: true, activeCharacterKind: "ship" });
  const surface = ship.find((node) => node.type === "button" && node.props.children === "Surface");
  assert.ok(surface); const before = uiEvents.length;
  surface.props.onClick();
  assert.deepEqual(uiEvents.slice(before).map((event) => event.type), ["ocean-audio-unlock", "ocean-ship-surface"], "Surface unlocks audio in the actual gesture before requesting the ship action");
  const sync = pageEffects.find((effect) => /ocean-active-character-state-request/.test(String(effect)));
  const cleanup = sync();
  assert.equal(uiEvents.at(-1).type, "ocean-active-character-state-request", "a retained world's real character state is requested after subscribing");
  assert.ok(windowListeners.has("ocean-active-character-change")); cleanup();
  assert.equal(windowListeners.has("ocean-active-character-change"), false);
  editing = true; assert.equal(render({ started: true, activeCharacterKind: "ship" }).some((node) => node.type === "button" && node.props.children === "Surface"), false, "editing cannot launch the surface action"); editing = false;
}
render({ started: false }).find((node) => node.type === "button" && node.props.children === custom.start).props.onClick();
assert.ok(uiEvents.some((event) => event.type === "ocean-audio-unlock"), "Start unlocks audio synchronously inside the real click rather than a later timer");
{
  const joystick = render({ started: true }).find((node) => node.props?.className === "ocean-joystick");
  const pointer = (pointerId) => ({ pointerId, clientX: 20, clientY: 20, preventDefault() {}, currentTarget: { setPointerCapture() {} } });
  const contacts = () => uiEvents.filter((event) => event.type === "explore-joystick-contact");
  const releaseEffect = pageEffects.find((effect) => /window\.addEventListener\("blur", release\)/.test(String(effect)));
  const cleanup = releaseEffect();
  joystick.props.onPointerDown(pointer(11));
  assert.deepEqual(plain(contacts().at(-1).detail), { active: true, pointerId: 11 }, "touch contact exists even while joystick x/z are zero");
  const count = contacts().length;
  joystick.props.onPointerDown(pointer(22)); joystick.props.onPointerUp(pointer(22));
  assert.equal(contacts().length, count, "a second pointer cannot steal/release the held joystick");
  joystick.props.onLostPointerCapture(pointer(11)); assert.equal(contacts().at(-1).detail.active, false);
  joystick.props.onPointerDown(pointer(33)); windowListeners.get("blur")(); assert.equal(contacts().at(-1).detail.active, false);
  joystick.props.onPointerDown(pointer(44)); pageDocument.hidden = true; documentListeners.get("visibilitychange")(); assert.equal(contacts().at(-1).detail.active, false); pageDocument.hidden = false;
  joystick.props.onPointerDown(pointer(55)); cleanup(); assert.equal(contacts().at(-1).detail.active, false, "unmount clears held-touch sprint ownership");
}
console.log("PASS: editable Ocean labels/defaults/intentional empty text; existing JSONB local+remote mock persistence with unchanged admin/RLS failures; native controlled plain-text editing without navigation; reachable fields after Start and disabled save state (no real writes/network/WebGL).");
