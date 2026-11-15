// Deterministic, credential-free gallery scheduling and model-capability tests.
// No browser, network, real asset processing, or Supabase writes are performed.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import ts from "typescript";

function compile(path, require, extra = "", globals = {}) {
  const source = fs.readFileSync(new URL(path, import.meta.url), "utf8");
  const js = ts.transpileModule(source.replaceAll("import.meta.env.BASE_URL", JSON.stringify("/")), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exported = {};
  vm.runInNewContext(`${js}\n${extra}`, { exports: exported, require, console, ...globals });
  return exported;
}

function repository() {
  let now = 0;
  let session = null;
  let listener;
  let sessionError = null;
  const plans = [];
  const responses = [];
  const signs = [];
  const queries = [];
  let converterImports = 0;
  const conversions = [];
  const rows = [
    { id: "one", storage_path: "one/original.glb", file_name: "original.glb", hdri_storage_path: "one/original.hdr", is_published: true },
    { id: "two", storage_path: "two/original.stl", file_name: "original.stl", hdri_storage_path: null, is_published: true },
    { id: "private", storage_path: "private/original.glb", file_name: "original.glb", hdri_storage_path: null, is_published: false },
  ];
  const supabase = {
    auth: {
      onAuthStateChange(callback) { listener = callback; },
      async getSession() { return { data: { session }, error: sessionError }; },
    },
    storage: { from(bucket) {
      assert.equal(bucket, "models-3d");
      return { createSignedUrl(path, lifetime) {
        signs.push({ path, lifetime, token: session?.access_token ?? null });
        return plans.shift() ?? Promise.resolve({ data: { signedUrl: `https://assets.example/${path}?original=1&signature=${signs.length}` }, error: null });
      } };
    } },
    from(table) {
      assert.equal(table, "models_3d");
      const filters = [];
      const query = { columns: "", filters };
      const chain = {
        select(columns) { query.columns = columns; return chain; },
        eq(field, value) { filters.push(["eq", field, value]); return chain; },
        in(field, values) { filters.push(["in", field, Array.from(values)]); return chain; },
        order() { return chain; },
        then(resolve, reject) {
          queries.push(query);
          const data = rows.filter((row) => filters.every(([operation, field, value]) => operation === "eq" ? row[field] === value : value.includes(row[field])));
          return Promise.resolve(responses.shift() ?? { data, error: null }).then(resolve, reject);
        },
      };
      return chain;
    },
  };
  const api = compile("../src/services/threeDModelRepository.ts", (id) => {
    if (id === "@/lib/supabase") return { supabase, MODEL_BUCKET: "models-3d" };
    if (id === "@/services/stepModelConverter") {
      converterImports++;
      return { async convertStepToGlb(file, onProgress) { conversions.push({ file, onProgress }); return { name: "converted-full-detail.glb", size: file.size }; } };
    }
    throw new Error(`Unexpected dependency: ${id}`);
  }, "exports.test = { prepareModelFiles };", { Date: class extends Date { static now() { return now; } } });
  return { api, signs, queries, plans, responses, rows, conversions, get converterImports() { return converterImports; },
    setTime(value) { now = value; },
    setSession(token) { session = token ? { access_token: token } : null; listener("TOKEN_REFRESHED", session); },
    failSession(error) { sessionError = error; },
  };
}

{
  const fixture = repository();
  const { api, signs, queries } = fixture;
  assert.equal((await api.listPublishedThreeDModelsByIds([])).length, 0);
  assert.equal(queries.length, 0, "an empty gallery does not query/authenticate the model catalogue");
  const first = await api.listPublishedThreeDModelsByIds(["one", "one", " private "]);
  assert.equal(first.length, 1, "gallery lookup never returns unpublished rows");
  assert.equal(first[0].id, "one");
  assert.equal(first[0].hdri_public_url, null, "thumbnail lookup does not sign unused custom HDRIs");
  assert.deepEqual(queries[0].filters, [["eq", "is_published", true], ["in", "id", ["one", "private"]]]);
  assert.equal(signs.length, 1);
  assert.equal(signs[0].path, "one/original.glb", "signed path remains the full original model");
  assert.equal(signs[0].lifetime, 900);
  assert.equal(fixture.converterImports, 0, "public metadata reads do not evaluate CAD conversion/Three exporters");
  const repeat = await api.listPublishedThreeDModelsByIds(["one"]);
  assert.equal(repeat[0].public_url, first[0].public_url, "the exact signed URL stays stable inside its lifetime");
  assert.equal(signs.length, 1);
  fixture.setTime(869999);
  await api.listPublishedThreeDModelsByIds(["one"]);
  assert.equal(signs.length, 1);
  fixture.setTime(870001);
  const renewed = await api.listPublishedThreeDModelsByIds(["one"]);
  assert.equal(signs.length, 2, "signed capability refreshes before server expiry");
  assert.notEqual(renewed[0].public_url, first[0].public_url);
  const full = await api.listPublishedThreeDModels();
  assert.equal(full.length, 2, "existing WatchStudio catalogue API stays complete");
  assert.ok(full.find((row) => row.id === "one").hdri_public_url, "existing API retains custom HDRIs");
  assert.ok(signs.some(({ path }) => path === "one/original.hdr"));
  assert.equal(fixture.converterImports, 0, "existing full catalogue metadata stays CAD-free too");
  fixture.setSession("owner-token");
  const admin = await api.listAllThreeDModelsForAdmin();
  assert.ok(admin.some((row) => row.id === "private"), "admin API retains unpublished models under its own session");
  const count = signs.length;
  fixture.setSession(null);
  await api.listPublishedThreeDModelsByIds(["one", "private"]);
  assert.equal(signs.length, count + 1, "logout cannot reuse even a previously cached public signed capability");
  assert.equal(signs.at(-1).token, null);
  fixture.setSession("new-role-token");
  await api.listPublishedThreeDModelsByIds(["one"]);
  assert.equal(signs.at(-1).token, "new-role-token", "token/role changes invalidate cached capabilities");
  fixture.failSession({ message: "session invalid" });
  await assert.rejects(() => api.listPublishedThreeDModelsByIds(["one"]), /session invalid/);
}
{
  const fixture = repository();
  const callback = () => {};
  for (const name of ["original.glb", "original.GLB", "original.stl", "original.STL"]) {
    const file = { name, size: 123456 };
    const prepared = await fixture.api.test.prepareModelFiles(file, callback);
    assert.equal(prepared.previewFile, file, "GLB/STL uploads keep the exact full-quality source file");
    assert.equal(prepared.sourceFile, null);
    assert.equal(fixture.converterImports, 0, "GLB/STL uploads do not load the STEP converter");
  }
  for (const name of ["original.step", "original.STEP", "original.stp", "original.StP"]) {
    const file = { name, size: 123456 };
    const prepared = await fixture.api.test.prepareModelFiles(file, callback);
    assert.equal(prepared.sourceFile, file, "original STEP source remains stored unchanged");
    assert.equal(prepared.sourceFormat, "step");
    assert.equal(fixture.conversions.at(-1).file, file);
    assert.equal(fixture.conversions.at(-1).onProgress, callback);
  }
  const imports = fixture.converterImports;
  await assert.rejects(() => fixture.api.test.prepareModelFiles({ name: "wrong.obj", size: 1 }), /Choose a/);
  await assert.rejects(() => fixture.api.test.prepareModelFiles({ name: "large.step", size: 101 * 1024 * 1024 }), /larger than 100 MB/);
  assert.equal(fixture.converterImports, imports, "validation still precedes converter loading");
}

const flush = async () => { for (let index = 0; index < 12; index++) await Promise.resolve(); };
{
  const fixture = repository();
  let resolve;
  fixture.plans.push(new Promise((done) => { resolve = done; }));
  const first = fixture.api.listPublishedThreeDModelsByIds(["one"]);
  const second = fixture.api.listPublishedThreeDModelsByIds(["one"]);
  await flush();
  assert.equal(fixture.signs.length, 1, "concurrent thumbnail reads deduplicate authorization requests");
  resolve({ data: { signedUrl: "https://assets.example/one/original.glb?shared=1" }, error: null });
  const results = await Promise.all([first, second]);
  assert.equal(results[0][0].public_url, results[1][0].public_url);
}
{
  const fixture = repository();
  fixture.setSession("owner-token");
  let resolve;
  fixture.plans.push(new Promise((done) => { resolve = done; }));
  const oldRequest = fixture.api.listAllThreeDModelsForAdmin();
  const rejected = assert.rejects(oldRequest, /session changed/);
  await flush();
  fixture.setSession(null);
  resolve({ data: { signedUrl: "https://assets.example/one/original.glb?old-owner-capability=1" }, error: null });
  await rejected;
  const fresh = await fixture.api.listPublishedThreeDModelsByIds(["one"]);
  assert.doesNotMatch(fresh[0].public_url, /old-owner-capability/);
}
{
  const fixture = repository();
  fixture.plans.push(Promise.resolve({ data: null, error: { message: "RLS denied" } }));
  await assert.rejects(() => fixture.api.listPublishedThreeDModelsByIds(["one"]), /RLS denied/);
  await fixture.api.listPublishedThreeDModelsByIds(["one"]);
  assert.equal(fixture.signs.length, 2, "failed authorization is not cached");
  fixture.responses.push({ data: null, error: { message: "column is_watch does not exist" } });
  await fixture.api.listPublishedThreeDModelsByIds(["two"]);
  assert.ok(fixture.queries.slice(-2).every(({ filters }) => filters.some(([kind, field, ids]) => kind === "in" && field === "id" && ids[0] === "two")), "legacy schema retry retains exact ID/publication filters");
}

const harness = {
  effects: [], refs: [], states: {}, updates: [], index: 0,
  reset({ refs = [], states = {} } = {}) { this.effects = []; this.refs = [...refs]; this.states = states; this.updates = []; this.index = 0; },
};
const react = {
  Component: class {}, Suspense: "Suspense", lazy: () => "LazyModelPreview",
  useRef: (initial) => harness.refs.shift() ?? { current: initial },
  useState(initial) { const index = harness.index++; return [Object.hasOwn(harness.states, index) ? harness.states[index] : typeof initial === "function" ? initial() : initial, (value) => harness.updates.push({ index, value })]; },
  useEffect: (callback) => harness.effects.push(callback), useLayoutEffect: (callback) => harness.effects.push(callback),
  useMemo: (callback) => callback(), useCallback: (callback) => callback,
};
const jsx = { jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
const listeners = new Map();
const document = { hidden: false, addEventListener: (name, callback) => listeners.set(name, callback), removeEventListener: (name) => listeners.delete(name) };
let frameCallback;
function componentRequire(id) {
  if (id === "react") return react;
  if (id === "react/jsx-runtime") return jsx;
  if (id === "react-router-dom") return {};
  if (id === "framer-motion") return { LayoutGroup: "LayoutGroup", motion: new Proxy({}, { get: (_, name) => `motion.${String(name)}` }), useReducedMotion: () => false };
  if (id === "@/components/SiteEditControl") return { useInlineSiteEditing: () => ({ registerFields: () => () => {} }) };
  if (id === "@react-three/fiber") return { Canvas: "Canvas", useFrame: (callback) => { frameCallback = callback; } };
  if (id === "@react-three/drei") return {};
  if (id === "three" || id === "three-stdlib" || id.endsWith(".css") || id.startsWith("@/")) return {};
  throw new Error(`Unexpected dependency: ${id}`);
}
const gallery = compile("../src/pages/Artworks.tsx", componentRequire, "exports.test = { Preview, Card, useDocumentVisible, firstVisibleImageId };", { document }).test;
const models = compile("../src/components/artworks/ArtworkModelPreview.tsx", componentRequire, "exports.test = { MovingModel };" );
const image = { id: "photo", kind: "image", title: "Full detail", description: "", media_url: "https://assets.example/photo-original.png?original=1&token=untouched", poster_url: null };
const base = { item: image, active: true, animate: true, documentVisible: true, priority: false, detail: false, onDimensions() {} };

{
  const cards = [
    { dataset: { artworkId: "above" }, getBoundingClientRect: () => ({ top: -900, bottom: -50 }) },
    { dataset: { artworkId: "visible" }, getBoundingClientRect: () => ({ top: 145, bottom: 500 }) },
    { dataset: { artworkId: "below" }, getBoundingClientRect: () => ({ top: 1000, bottom: 1400 }) },
  ];
  assert.equal(gallery.firstVisibleImageId({ getBoundingClientRect: () => ({ top: 0, bottom: 844 }), querySelectorAll: () => cards }), "visible", "priority follows the actually visible image, including restored scroll");
  const images = cards.map((_, index) => { harness.reset(); return gallery.Preview({ ...base, priority: index === 1 }); });
  assert.equal(images.filter(({ props }) => props.loading === "eager" && props.fetchpriority === "high").length, 1);
  assert.ok(images.every(({ props }) => props.src === image.media_url && props.decoding === "async"), "full source URLs/bytes are never resized or rewritten");
}
for (const scenario of [
  { active: false, detail: false, documentVisible: true, preload: "none", plays: 0 },
  { active: true, detail: false, documentVisible: true, preload: "metadata", plays: 0 },
  { active: true, detail: true, documentVisible: true, preload: "metadata", plays: 1 },
  { active: true, detail: true, documentVisible: false, preload: "metadata", plays: 0 },
]) {
  let plays = 0; let pauses = 0;
  harness.reset({ refs: [{ current: { play: () => { plays++; return Promise.resolve(); }, pause: () => { pauses++; } } }] });
  const video = gallery.Preview({ ...base, ...scenario, item: { ...image, kind: "video" } });
  harness.effects.forEach((effect) => effect());
  assert.equal(video.type, "video", "the same video element type is retained in grid and detail");
  assert.equal(video.props.src, image.media_url);
  assert.equal(video.props.preload, scenario.preload);
  assert.equal(plays, scenario.plays);
  assert.equal(pauses, scenario.plays ? 0 : 1);
}
function find(node, predicate) {
  if (!node || typeof node !== "object") return null;
  if (predicate(node)) return node;
  const children = node.props?.children;
  return (Array.isArray(children) ? children : [children]).map((child) => find(child, predicate)).find(Boolean) ?? null;
}
for (const [changes, shouldAnimate] of [
  [{}, true], [{ documentVisible: false }, false], [{ detailOpen: true }, false],
  [{ detailOpen: true, selected: true }, true], [{ reducedMotion: true }, false],
]) {
  harness.reset({ states: { 0: true } });
  const card = gallery.Card({ item: image, order: 0, reducedMotion: false, documentVisible: true, priority: false, selected: false, centered: false, detailOpen: false, editing: false, ...changes });
  const preview = find(card, ({ type }) => type === gallery.Preview);
  assert.equal(preview.props.animate, shouldAnimate, `model render scheduling: ${JSON.stringify(changes)}`);
}
{
  harness.reset();
  assert.equal(gallery.useDocumentVisible(), true);
  const cleanup = harness.effects[0]();
  document.hidden = true; listeners.get("visibilitychange")();
  assert.equal(harness.updates.at(-1).value, false);
  document.hidden = false; listeners.get("visibilitychange")();
  assert.equal(harness.updates.at(-1).value, true);
  cleanup(); assert.equal(listeners.size, 0);
}
for (const motion of [true, false]) {
  harness.reset();
  const tree = models.default({ model: { id: "one" }, motion });
  const canvas = find(tree, ({ type }) => type === "Canvas");
  assert.equal(canvas.props.frameloop, motion ? "always" : "demand");
  assert.deepEqual(Array.from(canvas.props.dpr), [1, 1.4], "preview pixel quality is unchanged");
  assert.equal(canvas.props.gl.antialias, true);
  assert.equal(canvas.props.resize.offsetSize, true, "scale-zero initialization protection remains enabled");
}
{
  const group = { rotation: { y: 0, z: 0 }, position: { y: 0 } };
  const groupRef = { current: group }; const elapsedRef = { current: 0 };
  const render = (motion) => { harness.reset({ refs: [groupRef, elapsedRef] }); models.test.MovingModel({ model: { file_name: "original.glb", storage_path: "one/original.glb" }, motion }); };
  render(true); frameCallback({}, 1 / 60);
  const before = group.rotation.y;
  render(false); frameCallback({}, 5);
  assert.equal(group.rotation.y, before, "hidden preview pose does not change");
  render(true); frameCallback({}, 5);
  assert.ok(group.rotation.y > before && group.rotation.y - before <= .010001, "resume preserves pose without fast-forwarding a hidden interval");
}
// Check source isolation even without a production build. Dynamic imports are
// deliberately excluded: image-only galleries must never execute these paths.
const project = fileURLToPath(new URL("../", import.meta.url));
const parse = (file, code) => ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, file.endsWith(".js") ? ts.ScriptKind.JS : ts.ScriptKind.TSX);
function staticSourceClosure(entry) {
  const files = new Set(); const packages = new Set();
  const visit = (file) => {
    if (files.has(file)) return;
    files.add(file);
    for (const statement of parse(file, fs.readFileSync(file, "utf8")).statements) {
      if ((!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) || statement.isTypeOnly || statement.importClause?.isTypeOnly) continue;
      const bindings = statement.importClause?.namedBindings;
      if (!statement.importClause?.name && bindings && ts.isNamedImports(bindings) && bindings.elements.every((element) => element.isTypeOnly)) continue;
      const specifier = statement.moduleSpecifier?.text;
      if (!specifier) continue;
      if (!specifier.startsWith(".") && !specifier.startsWith("@/")) { packages.add(specifier); continue; }
      const base = specifier.startsWith("@/") ? path.join(project, "src", specifier.slice(2)) : path.resolve(path.dirname(file), specifier);
      const target = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile() && /\.tsx?$/.test(candidate));
      if (target) visit(target);
    }
  };
  visit(path.join(project, entry));
  return { files, packages };
}
for (const entry of ["src/pages/Artworks.tsx", "src/services/threeDModelRepository.ts"]) {
  const closure = staticSourceClosure(entry);
  const unwantedPackages = [...closure.packages].filter((name) => /^(?:three(?:\/|$)|three-stdlib|@react-three\/|postprocessing(?:\/|$))/.test(name));
  assert.deepEqual(unwantedPackages, [], `${entry} statically pulls 3D/CAD packages`);
  assert.ok(![...closure.files].some((file) => /stepModelConverter\.ts$/.test(file)), `${entry} must not evaluate the CAD converter`);
}
if (process.argv.some((argument) => argument === "--built" || argument.startsWith("--built="))) {
  const requested = process.argv.find((argument) => argument.startsWith("--built="))?.slice("--built=".length);
  const output = requested ? path.resolve(project, requested) : path.join(project, "dist");
  const assets = path.join(output, "assets");
  const entries = fs.readdirSync(assets).filter((name) => /^Artworks-[\w-]+\.js$/.test(name));
  assert.equal(entries.length, 1, `expected exactly one production Artworks chunk in ${assets}`);
  const builtClosure = (entry) => {
    const files = new Set();
    const visit = (file) => {
      if (files.has(file)) return;
      files.add(file);
      for (const statement of parse(file, fs.readFileSync(file, "utf8")).statements) {
        if ((!ts.isImportDeclaration(statement) && !ts.isExportDeclaration(statement)) || !statement.moduleSpecifier) continue;
        const specifier = statement.moduleSpecifier.text;
        if (specifier.startsWith(".") && specifier.endsWith(".js")) visit(path.resolve(path.dirname(file), specifier));
      }
    };
    visit(path.join(assets, entry));
    return files;
  };
  const closure = builtClosure(entries[0]);
  const forbidden = /^(?:three-|react-three-|postprocessing-|stepModelConverter-|ArtworkModelPreview-|WatchStudio-|SkyOceanBackground-|OceanPage-)/;
  const unwanted = [...closure].map((file) => path.basename(file)).filter((name) => forbidden.test(name));
  assert.deepEqual(unwanted, [], `production image-only gallery still imports lazy 3D/CAD chunks: ${unwanted.join(", ")}`);
  for (const metadata of fs.readdirSync(assets).filter((name) => /^threeDModelRepository-[\w-]+\.js$/.test(name))) {
    const unwantedMetadata = [...builtClosure(metadata)].map((file) => path.basename(file)).filter((name) => forbidden.test(name));
    assert.deepEqual(unwantedMetadata, [], "public model metadata must not statically import CAD/exporter chunks");
  }
  const bytes = [...closure].reduce((total, file) => total + fs.statSync(file).size, 0);
  console.log(`PASS: production image-only gallery static closure excludes Three/R3F/postprocessing/CAD (${closure.size} JS chunks, ${bytes} raw bytes).`);
}
console.log("PASS: original gallery URLs/quality, visible-image priority, video/model scheduling, exact-ID lookup, signed URL auth/expiry cache, original GLB/STL/STEP handling and CAD-free static imports (fully mocked, no network).");
