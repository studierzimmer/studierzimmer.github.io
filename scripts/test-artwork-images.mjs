// Credential-free image-stack regressions. Every storage/auth/database write is
// an in-memory mock; this script never opens a browser or contacts Supabase.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { Blob } from "node:buffer";
import { webcrypto } from "node:crypto";
import ts from "typescript";

function compile(file, require = (id) => { throw new Error(`Unexpected dependency: ${id}`); }, globals = {}, transform = (source) => source, extra = "") {
  const source = transform(fs.readFileSync(new URL(file, import.meta.url), "utf8"));
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exported = {};
  vm.runInNewContext(`${js}\n${extra}`, { exports: exported, require, console, URL, AbortController, Error, crypto: webcrypto, ...globals });
  return exported;
}

const imageHelpers = compile("../src/lib/artworkImages.ts");
class FileFixture extends Blob {
  constructor(chunks, name, options) { super(chunks, options); this.name = name; }
}
const sources = (item) => Array.from(imageHelpers.artworkImageSources(item));
const primary = "https://assets.example/Original%20Cover.PNG?token=a%2Fb&width=8192&original=1";
const second = "https://assets.example/detail.tif?signature=UNTOUCHED&download=0";
const third = "/artworks/third-original.avif?revision=3";
const image = {
  id: "legacy-artwork", title: "Original title", description: "Original description\nWith its line break.", year: 2024,
  kind: "image", media_url: primary, poster_url: null, model_id: null,
  is_fashion: true, is_published: true, is_featured_in: false, sort_order: 30, external_url: null,
};
assert.deepEqual(sources(image), [primary], "legacy image items keep their single original image");
assert.deepEqual(sources({ ...image, additional_images: [] }), [primary], "an empty optional list changes no legacy behavior");
const extras = Object.freeze([`  ${second}  `, third, primary, second, "", "  ", null, 42, "javascript:alert(1)", "data:image/png,abc", "//other.example/unsafe.png"]);
const stacked = Object.freeze({ ...image, additional_images: extras });
assert.deepEqual(sources(stacked), [primary, second, third], "the cover stays first, extras preserve order and duplicates/unsafe entries are removed");
assert.equal(extras[0], `  ${second}  `, "normalization never mutates saved arrays");
assert.deepEqual(sources({ ...image, media_url: "/cover.png", additional_images: ["blob:original-file", "local-asset:stored-original", "/detail.png"] }), ["/cover.png", "blob:original-file", "local-asset:stored-original", "/detail.png"]);
for (const kind of ["video", "model"]) {
  assert.deepEqual(sources({ ...stacked, kind }), [], `${kind} does not inherit the image carousel`);
}

function memoryDatabase() {
  const stores = new Map([["drafts", new Map([["artworks", []]])], ["assets", new Map()]]);
  const database = {
    objectStoreNames: { contains: (name) => stores.has(name) },
    createObjectStore(name) { stores.set(name, new Map()); },
    transaction(name) {
      const transaction = {
        oncomplete: null,
        objectStore() {
          return {
            get(key) {
              const request = {};
              queueMicrotask(() => { request.result = structuredClone(stores.get(name).get(key)); request.onsuccess?.(); });
              return request;
            },
            put(value, key) {
              stores.get(name).set(key, structuredClone(value));
              queueMicrotask(() => transaction.oncomplete?.());
            },
          };
        },
      };
      return transaction;
    },
  };
  return {
    stores,
    indexedDB: { open() { const request = {}; queueMicrotask(() => { request.result = database; request.onupgradeneeded?.(); request.onsuccess?.(); }); return request; } },
  };
}

function repository({ mode = "local", memory = memoryDatabase(), rows = [], responses = [] } = {}) {
  const calls = { auth: 0, upserts: [], selects: 0, uploads: 0, events: [], blobs: new Map() };
  let blobCounter = 0;
  class MockURL extends URL {
    static createObjectURL(blob) {
      const url = `blob:mock-original-${++blobCounter}`;
      calls.blobs.set(url, blob);
      return url;
    }
  }
  const supabase = {
    async rpc(name) { assert.equal(name, "is_admin"); assert.equal(mode, "remote", "local drafts never authenticate for a remote write"); calls.auth++; return { data: true, error: null }; },
    storage: { from() { return { upload() { calls.uploads++; throw new Error("A test attempted a remote upload"); } }; } },
    from(table) {
      assert.equal(table, "artworks");
      const chain = {
        select() { calls.selects++; return chain; }, order() { return chain; }, eq() { return chain; }, abortSignal() { return chain; },
        then(resolve, reject) { return Promise.resolve({ data: rows, error: null }).then(resolve, reject); },
        async upsert(value) { assert.equal(mode, "remote", "local drafts never mutate remote rows"); calls.upserts.push(structuredClone(value)); return responses.shift() ?? { error: null }; },
        delete() { throw new Error("A test attempted a remote deletion"); },
      };
      return chain;
    },
  };
  const api = compile("../src/services/siteContentRepository.ts", (id) => {
    if (id === "@/lib/supabase") return { supabase };
    if (id === "@/lib/artworkImages") return imageHelpers;
    if (id === "@/lib/siteMenu") return { orderedMenuDefaults: (defaults) => defaults };
    if (id === "@/types/oceanEnvironment") return { normalizeOceanEnvironment: (value) => value ?? {} };
    if (id === "@/types/oceanText") return { normalizeOceanLabels: (value) => value ?? {} };
    throw new Error(`Unexpected repository dependency: ${id}`);
  }, {
    indexedDB: memory.indexedDB, URL: MockURL,
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
    window: { location: { hostname: "localhost", protocol: "http:" }, setTimeout, clearTimeout, dispatchEvent: (event) => calls.events.push(event) },
  }, (source) => source.replaceAll("import.meta.env.VITE_SITE_CONTENT_MODE", JSON.stringify(mode)).replaceAll("import.meta.env.DEV", "false"));
  return { api, calls, memory };
}

{
  const fixture = repository();
  const saved = await fixture.api.saveArtworkItem({ ...image, additional_images: [second, third, primary, second] });
  assert.deepEqual(sources(saved), [primary, second, third]);
  assert.equal(saved.media_url, primary, "saving never resizes, encodes or strips original signed query strings");
  for (const key of ["title", "description", "year", "kind", "poster_url", "model_id", "is_fashion", "is_published", "sort_order"]) assert.equal(saved[key], image[key], `${key} is not changed by extras`);
  const reloaded = (await fixture.api.listArtworkItems(true))[0];
  assert.deepEqual(sources(reloaded), [primary, second, third], "ordered extras survive local save/reload");
  assert.equal(fixture.calls.auth, 0); assert.equal(fixture.calls.uploads, 0); assert.equal(fixture.calls.upserts.length, 0);
}
{
  const fixture = repository();
  const cover = new FileFixture([new Uint8Array([1, 255, 10, 0, 99])], "cover-original.png", { type: "image/png" });
  const detail = new FileFixture([new Uint8Array([5, 4, 3, 2, 1])], "detail-original.png", { type: "image/png" });
  const coverUrl = await fixture.api.uploadArtworkAsset(cover);
  const detailUrl = await fixture.api.uploadArtworkAsset(detail);
  await fixture.api.saveArtworkItem({ ...image, media_url: coverUrl, additional_images: [detailUrl, coverUrl] });
  const stored = fixture.memory.stores.get("drafts").get("artworks")[0];
  assert.match(stored.media_url, /^local-asset:/);
  assert.equal(stored.additional_images.length, 1, "a cover duplicated among extras is stored only once");
  assert.match(stored.additional_images[0], /^local-asset:/, "extra blobs persist stable references, never temporary object URLs");
  const originalReference = stored.additional_images[0];
  const fresh = repository({ memory: fixture.memory });
  const reloaded = (await fresh.api.listArtworkItems(true))[0];
  const reloadedSources = sources(reloaded);
  assert.equal(reloadedSources.length, 2);
  assert.deepEqual(Buffer.from(await fresh.calls.blobs.get(reloadedSources[0]).arrayBuffer()), Buffer.from(await cover.arrayBuffer()), "cover bytes are unchanged across a fresh module/browser lifecycle");
  assert.deepEqual(Buffer.from(await fresh.calls.blobs.get(reloadedSources[1]).arrayBuffer()), Buffer.from(await detail.arrayBuffer()), "extra image bytes retain original resolution/data");
  await fresh.api.saveArtworkItem({ ...reloaded, title: "An unrelated title edit" });
  const resaved = fixture.memory.stores.get("drafts").get("artworks")[0];
  assert.equal(resaved.additional_images[0], originalReference, "editing another field does not replace or lose the stored image reference");
  assert.equal(fresh.calls.auth, 0); assert.equal(fresh.calls.uploads, 0);
  await assert.rejects(() => fresh.api.saveArtworkItem({ ...image, additional_images: ["blob:unowned-preview"] }), /Ricarica|temporanea/, "unowned temporary URLs cannot silently become broken persisted images");
}
for (const kind of ["video", "model"]) {
  const fixture = repository();
  const item = { ...image, kind, media_url: kind === "model" ? "" : "https://assets.example/original-film.mp4?original=1", poster_url: "/original-poster.png", model_id: kind === "model" ? "original-model-id" : null, additional_images: [second] };
  await fixture.api.saveArtworkItem(item);
  const saved = (await fixture.api.listArtworkItems(true))[0];
  assert.deepEqual(sources(saved), [], `${kind} remains owned by its existing viewer`);
  assert.equal(saved.media_url, item.media_url); assert.equal(saved.poster_url, item.poster_url); assert.equal(saved.model_id, item.model_id);
  assert.deepEqual(Array.from(saved.additional_images), [second], "changing media kind does not silently discard dormant saved extras");
}
{
  const fixture = repository({ mode: "remote" });
  await fixture.api.saveArtworkItem({ ...image, additional_images: [second, third] });
  assert.deepEqual(fixture.calls.upserts[0].additional_images, [second, third]);
  await fixture.api.saveArtworkItem({ ...image, additional_images: [] });
  assert.deepEqual(fixture.calls.upserts[1].additional_images, [], "an explicit empty list clears previously saved remote extras");
}
for (const schemaError of [
  { code: "PGRST204", message: "Could not find the 'additional_images' column of 'artworks' in the schema cache" },
  { code: "42703", message: 'column "additional_images" does not exist' },
]) {
  const legacy = repository({ mode: "remote", responses: [{ error: schemaError }, { error: null }] });
  await legacy.api.saveArtworkItem(image);
  assert.equal(legacy.calls.upserts.length, 2, "a one-image item remains editable before the optional column migration");
  assert.equal(Object.hasOwn(legacy.calls.upserts[1], "additional_images"), false);
  assert.equal(legacy.calls.upserts[1].media_url, primary);
  const stack = repository({ mode: "remote", responses: [{ error: schemaError }] });
  await assert.rejects(() => stack.api.saveArtworkItem({ ...image, additional_images: [second] }), /migration|migrazione|script|SQL/i);
  assert.equal(stack.calls.upserts.length, 1, "a missing column never produces a falsely successful save that drops extras");
}
{
  const fixture = repository({ mode: "remote", responses: [{ error: { code: "42501", message: "RLS denied additional_images" } }] });
  await assert.rejects(() => fixture.api.saveArtworkItem(image), /RLS denied/);
  assert.equal(fixture.calls.upserts.length, 1, "auth/RLS/network failures never trigger a schema-compatibility write retry");
}
{
  const fixture = repository();
  const legacy = await fixture.api.saveArtworkItem(image);
  assert.equal(legacy.is_jewelry, false, "older artwork records default to an unselected Jewelry flag");
  const jewelry = { ...image, id: "jewelry-work", is_jewelry: true, additional_images: [second, third] };
  await fixture.api.saveArtworkItem(jewelry);
  const fresh = repository({ memory: fixture.memory });
  const reloaded = (await fresh.api.listArtworkItems(true)).find((item) => item.id === jewelry.id);
  assert.equal(reloaded.is_jewelry, true);
  assert.deepEqual(sources(reloaded), [primary, second, third]);
  await fresh.api.saveArtworkItem({ ...reloaded, description: "Updated copy only" });
  const unchangedFlag = (await fresh.api.listArtworkItems(true)).find((item) => item.id === jewelry.id);
  assert.equal(unchangedFlag.is_jewelry, true, "unrelated metadata/image edits never drop Jewelry categorization");
  await fresh.api.saveArtworkItem({ ...unchangedFlag, is_jewelry: false });
  assert.equal((await fresh.api.listArtworkItems(true)).find((item) => item.id === jewelry.id).is_jewelry, false, "the owner can explicitly clear Jewelry without deleting media");
}
{
  const fixture = repository({ mode: "remote", rows: [image, { ...image, id: "remote-jewelry", is_jewelry: true, additional_images: [second] }] });
  const loaded = await fixture.api.listArtworkItems(true);
  assert.equal(loaded[0].is_jewelry, false); assert.equal(loaded[1].is_jewelry, true, "online records normalize both legacy and categorized works");
  assert.equal(fixture.calls.upserts.length, 0, "reading the category never migrates or mutates remote records");
  await fixture.api.saveArtworkItem({ ...image, is_jewelry: true });
  await fixture.api.saveArtworkItem({ ...image, is_jewelry: false });
  assert.equal(fixture.calls.upserts[0].is_jewelry, true);
  assert.equal(fixture.calls.upserts[1].is_jewelry, false, "an explicit false clears the flag on an upgraded schema");
}
for (const missingFlag of [
  { code: "PGRST204", message: "Could not find the 'is_jewelry' column of 'artworks' in the schema cache" },
  { code: "42703", message: 'column "is_jewelry" does not exist' },
]) {
  const legacy = repository({ mode: "remote", responses: [{ error: missingFlag }, { error: null }] });
  await legacy.api.saveArtworkItem(image);
  assert.equal(legacy.calls.upserts.length, 2);
  assert.equal(legacy.calls.upserts[0].is_jewelry, false);
  assert.equal(Object.hasOwn(legacy.calls.upserts[1], "is_jewelry"), false, "only absent legacy false flags may be omitted for compatibility");
  assert.equal(legacy.calls.upserts[1].media_url, primary);
  const flagged = repository({ mode: "remote", responses: [{ error: missingFlag }] });
  await assert.rejects(() => flagged.api.saveArtworkItem({ ...image, is_jewelry: true }), /migration|migrazione|script|SQL/i);
  assert.equal(flagged.calls.upserts.length, 1, "a true Jewelry flag cannot be silently lost on an old schema");
}
{
  const missingImages = { code: "PGRST204", message: "Could not find the 'additional_images' column" };
  const missingJewelry = { code: "PGRST204", message: "Could not find the 'is_jewelry' column" };
  for (const errors of [[missingImages, missingJewelry], [missingJewelry, missingImages]]) {
    const legacy = repository({ mode: "remote", responses: [...errors.map((error) => ({ error })), { error: null }] });
    await legacy.api.saveArtworkItem(image);
    assert.equal(legacy.calls.upserts.length, 3, "the two optional legacy fields may fail in either server-reported order");
    assert.equal(Object.hasOwn(legacy.calls.upserts[2], "additional_images"), false);
    assert.equal(Object.hasOwn(legacy.calls.upserts[2], "is_jewelry"), false);
    assert.equal(legacy.calls.upserts[2].media_url, primary);
  }
  const bounded = repository({ mode: "remote", responses: [{ error: missingJewelry }, { error: missingJewelry }] });
  await assert.rejects(() => bounded.api.saveArtworkItem(image), /is_jewelry/);
  assert.equal(bounded.calls.upserts.length, 2, "repeated schema errors do not create an unbounded write retry");
  const flagged = repository({ mode: "remote", responses: [{ error: missingImages }, { error: missingJewelry }] });
  await assert.rejects(() => flagged.api.saveArtworkItem({ ...image, is_jewelry: true }), /migration|migrazione|script|SQL/i);
  assert.equal(flagged.calls.upserts.length, 2, "legacy image compatibility cannot swallow a later missing true Jewelry flag");
}

function nodes(node, predicate) {
  const found = [];
  const visit = (item) => {
    if (Array.isArray(item)) return item.forEach(visit);
    if (!item || typeof item !== "object") return;
    if (predicate(item)) found.push(item);
    visit(item.props?.children);
  };
  visit(node);
  return found;
}
const nodeText = (node) => typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(nodeText).join("") : node?.props ? nodeText(node.props.children) : "";
const flush = async () => { for (let index = 0; index < 24; index++) await Promise.resolve(); };
const jsx = { jsx: (type, props, key) => ({ type, props, key }), jsxs: (type, props, key) => ({ type, props, key }) };

function hookHarness() {
  const states = [], refs = [], effects = [], memos = [];
  let stateIndex = 0, refIndex = 0, effectIndex = 0, memoIndex = 0, pending = [];
  const changed = (before, after) => !before || !after || before.length !== after.length || after.some((value, index) => !Object.is(value, before[index]));
  const effect = (callback, dependencies) => {
    const index = effectIndex++;
    const previous = effects[index];
    if (!previous || changed(previous.dependencies, dependencies)) {
      pending.push(() => { previous?.cleanup?.(); effects[index] = { dependencies, cleanup: callback() }; });
    }
  };
  const memo = (callback, dependencies) => {
    const index = memoIndex++;
    if (!memos[index] || changed(memos[index].dependencies, dependencies)) memos[index] = { value: callback(), dependencies };
    return memos[index].value;
  };
  const react = {
    Component: class {}, Suspense: "Suspense", lazy: () => "LazyPreview",
    useState(initial) {
      const index = stateIndex++;
      if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial;
      return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value; }];
    },
    useRef(initial) { const index = refIndex++; return refs[index] ??= { current: initial }; },
    useEffect: effect, useLayoutEffect: effect, useMemo: memo, useCallback: (callback, dependencies) => memo(() => callback, dependencies),
  };
  return {
    react, refs, states,
    render(callback) { stateIndex = refIndex = effectIndex = memoIndex = 0; pending = []; const tree = callback(); pending.forEach((run) => run()); return tree; },
    unmount() { effects.forEach((entry) => entry?.cleanup?.()); },
  };
}

function imageFieldsFixture(initial = { media_url: "", additional_images: [] }) {
  const harness = hookHarness();
  let value = initial;
  const calls = { uploads: [], patches: [], busy: [] }, plans = [];
  const urlFor = (file) => `https://assets.example/${file.name}?original=1&token=UNTOUCHED`;
  const api = compile("../src/components/artworks/ArtworkImageFields.tsx", (id) => {
    if (id === "react") return harness.react;
    if (id === "react/jsx-runtime") return jsx;
    if (id === "@/lib/artworkImages") return imageHelpers;
    if (id === "@/services/siteContentRepository") return { async uploadArtworkAsset(file) {
      calls.uploads.push(file);
      const next = plans.shift();
      if (next instanceof Error) throw next;
      return next ?? urlFor(file);
    } };
    if (id.endsWith(".css")) return {};
    throw new Error(`Unexpected image field dependency: ${id}`);
  });
  const render = (changes = {}) => harness.render(() => api.default({ value, onChange: (patch) => { calls.patches.push(patch); value = { ...value, ...patch }; }, onBusyChange: (busy) => calls.busy.push(busy), ...changes }));
  const upload = (tree, files) => { const input = { files, value: "previous-selection" }; nodes(tree, (node) => node.type === "input" && node.props.type === "file")[0].props.onChange({ currentTarget: input }); return input; };
  return { render, upload, calls, plans, urlFor, unmount: () => harness.unmount(), get value() { return value; } };
}

{
  const fixture = imageFieldsFixture();
  const first = new FileFixture(["original cover bytes"], "cover.PNG", { type: "image/png" });
  const next = new FileFixture(["original second bytes"], "detail.webp", { type: "image/webp" });
  const input = fixture.upload(fixture.render(), [first, next]);
  assert.equal(input.value, "", "the same file can be chosen again after an upload attempt");
  await flush();
  assert.equal(fixture.calls.uploads[0], first); assert.equal(fixture.calls.uploads[1], next, "uploads receive the original File objects in selection order");
  assert.equal(fixture.value.media_url, fixture.urlFor(first));
  assert.deepEqual(Array.from(fixture.value.additional_images), [fixture.urlFor(next)]);
  assert.deepEqual(fixture.calls.busy, [true, false], "parent save controls are locked for the whole upload batch");
  assert.ok(fixture.calls.patches.every((patch) => Object.keys(patch).sort().join() === "additional_images,media_url"), "the shared field only stages image fields, never saves artwork metadata");
  let tree = fixture.render();
  nodes(tree, (node) => node.props?.["aria-label"] === "Sposta immagine 2 prima")[0].props.onClick();
  assert.equal(fixture.value.media_url, fixture.urlFor(next), "moving an extra to the front makes it the cover");
  tree = fixture.render();
  nodes(tree, (node) => node.props?.["aria-label"] === "Rimuovi immagine 1 dalla bozza")[0].props.onClick();
  assert.equal(fixture.value.media_url, fixture.urlFor(first), "removing the cover promotes the first remaining original");
  assert.deepEqual(Array.from(fixture.value.additional_images), []);
  tree = fixture.render();
  nodes(tree, (node) => node.props?.["aria-label"] === "Rimuovi immagine 1 dalla bozza")[0].props.onClick();
  assert.equal(fixture.value.media_url, "");
  assert.equal(fixture.calls.uploads.length, 2, "reordering and removing images perform no asset writes or storage deletion");
}
{
  const fixture = imageFieldsFixture({ media_url: primary, additional_images: [] });
  const good = new FileFixture(["good"], "valid-one.png", { type: "image/png" });
  const failed = new FileFixture(["retry"], "valid-two.png", { type: "image/png" });
  const after = new FileFixture(["after failure"], "valid-three.png", { type: "image/png" });
  const invalid = new FileFixture(["not an image"], "document.pdf", { type: "application/pdf" });
  fixture.plans.push(fixture.urlFor(good), new Error("Upload interrupted"), fixture.urlFor(after));
  fixture.upload(fixture.render(), [good, failed, invalid, after]);
  await flush();
  assert.deepEqual(Array.from(fixture.value.additional_images), [fixture.urlFor(good), fixture.urlFor(after)], "successful originals survive partial upload failures in selection order");
  assert.equal(fixture.calls.uploads.length, 3, "unsupported files fail before storage upload");
  const alert = nodes(fixture.render(), (node) => node.props?.role === "alert")[0];
  assert.match(nodeText(alert), /valid-two\.png/); assert.match(nodeText(alert), /document\.pdf/);
  fixture.upload(fixture.render(), [failed]);
  await flush();
  assert.deepEqual(Array.from(fixture.value.additional_images), [fixture.urlFor(good), fixture.urlFor(after), fixture.urlFor(failed)], "a retry appends the failed original without losing prior success");
  assert.equal(nodes(fixture.render(), (node) => node.props?.role === "alert").length, 0);
}
{
  const fixture = imageFieldsFixture({ media_url: primary, additional_images: [second] });
  let resolveUpload;
  fixture.plans.push(new Promise((resolve) => { resolveUpload = resolve; }));
  const pending = new FileFixture(["pending"], "pending.png", { type: "image/png" });
  fixture.upload(fixture.render(), [pending]);
  const locked = fixture.render();
  assert.equal(nodes(locked, (node) => node.type === "input" && node.props.type === "file")[0].props.disabled, true);
  assert.ok(nodes(locked, (node) => node.type === "button").every((button) => button.props.disabled), "ordering/removal stay locked while originals are in flight");
  fixture.upload(locked, [pending]);
  assert.equal(fixture.calls.uploads.length, 1, "duplicate change events cannot start a second concurrent upload");
  fixture.unmount();
  resolveUpload("https://assets.example/completed-after-close.png");
  await flush();
  assert.equal(fixture.calls.patches.length, 0, "closing/unmounting the editor cancels late draft commits");
  assert.equal(fixture.calls.busy.at(-1), false, "closing an editor releases the parent's busy lock");
}
{
  const fixture = imageFieldsFixture({ media_url: primary, additional_images: [second] });
  fixture.upload(fixture.render({ disabled: true }), [new FileFixture(["ignored"], "disabled.png", { type: "image/png" })]);
  await flush();
  assert.equal(fixture.calls.uploads.length, 0, "parent-disabled controls cannot upload from a stale synthetic event");
}
{
  const harness = hookHarness();
  const calls = { saves: [], deletes: [], confirms: 0 };
  const items = [{ ...image, is_jewelry: true }, { ...image, id: "another-work", title: "Another work", sort_order: 40 }];
  const manager = compile("../src/components/admin/AdminArtworkManager.tsx", (id) => {
    if (id === "react") return harness.react;
    if (id === "react/jsx-runtime") return jsx;
    if (id === "@/components/artworks/ArtworkImageFields") return { default: "ArtworkImageFields" };
    if (id === "@/hooks/useSiteContent") return { useArtworks: () => ({ items, loading: false, error: null }) };
    if (id === "@/services/siteContentRepository") return {
      async saveArtworkItem(item) { calls.saves.push(item); return item; },
      async deleteArtworkItem(id) { calls.deletes.push(id); },
      async uploadArtworkAsset() { throw new Error("Images must use the shared original-file field"); },
    };
    if (id === "@/services/threeDModelRepository") return { listAllThreeDModelsForAdmin: async () => [] };
    if (id.endsWith(".css")) return {};
    throw new Error(`Unexpected admin manager dependency: ${id}`);
  }, { window: { confirm: () => { calls.confirms++; return true; }, requestAnimationFrame: (callback) => callback() } });
  const render = () => harness.render(() => manager.default({}));
  let tree = render();
  nodes(tree, (node) => node.props?.className === "admin-artwork-select")[0].props.onClick();
  tree = render();
  const fields = nodes(tree, (node) => node.type === "ArtworkImageFields")[0];
  fields.props.onChange({ media_url: primary, additional_images: [second, third] });
  tree = render();
  nodes(tree, (node) => node.type === "ArtworkImageFields")[0].props.onBusyChange(true);
  nodes(tree, (node) => node.type === "form")[0].props.onSubmit({ preventDefault() {} });
  nodes(tree, (node) => node.props?.className === "admin-artwork-select")[1].props.onClick();
  nodes(tree, (node) => node.type === "button" && nodeText(node) === "+ NUOVO CONTENUTO")[0].props.onClick();
  nodes(tree, (node) => node.props?.["aria-label"] === `Delete ${image.title}`)[0].props.onClick();
  await flush();
  assert.equal(calls.saves.length, 0); assert.equal(calls.deletes.length, 0); assert.equal(calls.confirms, 0, "in-flight image uploads synchronously block saving, selection/reset and deletion before React rerenders");
  tree = render();
  assert.equal(nodes(tree, (node) => node.type === "fieldset")[0].props.disabled, true, "all form actions inherit the upload lock");
  assert.equal(nodes(tree, (node) => node.type === "input" && node.props.name === "artwork-title")[0].props.value, image.title);
  nodes(tree, (node) => node.type === "ArtworkImageFields")[0].props.onBusyChange(false);
  tree = render();
  nodes(tree, (node) => node.type === "form")[0].props.onSubmit({ preventDefault() {} });
  await flush();
  assert.equal(calls.saves.length, 1);
  assert.deepEqual(Array.from(calls.saves[0].additional_images), [second, third]);
  assert.equal(calls.saves[0].is_jewelry, true, "admin image edits preserve the saved Jewelry flag");
  for (const key of ["title", "description", "year", "kind", "poster_url", "model_id", "is_fashion", "is_published", "sort_order"]) assert.equal(calls.saves[0][key], image[key], `admin image staging preserves ${key}`);
  tree = render();
  assert.equal(nodes(tree, (node) => node.type === "label" && nodeText(node) === "Fashion").length, 0, "the retired standalone Fashion control is absent without deleting legacy item data");
  const jewelryLabel = nodes(tree, (node) => node.type === "label" && nodeText(node) === "Fashion and Jewelry")[0];
  const jewelryInput = nodes(jewelryLabel, (node) => node.type === "input" && node.props.type === "checkbox")[0];
  assert.equal(jewelryInput.props.checked, true);
  jewelryInput.props.onChange({ target: { checked: false } });
  tree = render(); nodes(tree, (node) => node.type === "form")[0].props.onSubmit({ preventDefault() {} });
  await flush();
  assert.equal(calls.saves[1].is_jewelry, false, "the admin Jewelry checkbox stages and explicitly saves deselection");
  assert.deepEqual(Array.from(calls.saves[1].additional_images), [second, third]);
}

function carouselFixture(changes = {}) {
  const harness = hookHarness();
  let listener, position = 0, now = 1000;
  const calls = { animations: [], stops: 0 };
  const x = { get: () => position, set: (value) => { position = value; listener?.(value); } };
  const primaryNode = { type: "img", props: { src: primary, "data-persistent-cover": true } };
  let props = { images: [primary, second, third, "/original-four.png", "/original-five.png"], children: primaryNode, title: "Original title", open: false, active: false, reducedMotion: false, width: 240, height: 180, viewportWidth: 390, ...changes };
  const api = compile("../src/components/artworks/ArtworkImageCarousel.tsx", (id) => {
    if (id === "react") return harness.react;
    if (id === "react/jsx-runtime") return jsx;
    if (id === "framer-motion") return {
      motion: new Proxy({}, { get: (_, name) => `motion.${String(name)}` }),
      useMotionValue: () => x,
      useMotionValueEvent(value, event, callback) { assert.equal(value, x); assert.equal(event, "change"); listener = callback; },
      animate(value, target, options) { assert.equal(value, x); calls.animations.push({ target, options }); value.set(target); return { stop: () => { calls.stops++; } }; },
    };
    if (id.endsWith(".css")) return {};
    throw new Error(`Unexpected carousel dependency: ${id}`);
  }, { Date: class extends Date { static now() { return now; } } });
  return {
    calls, x, primaryNode, unmount: () => harness.unmount(), advanceTime: (milliseconds) => { now += milliseconds; },
    render(changed = {}) { props = { ...props, ...changed }; return harness.render(() => api.default(props)); },
  };
}
const ribbon = (tree) => nodes(tree, (node) => node.props?.className === "artwork-image-ribbon")[0];
const sheets = (tree) => nodes(tree, (node) => node.props?.["data-image-index"] !== undefined);
const carouselRoot = (tree) => nodes(tree, (node) => node.props?.role === "group")[0];
const counter = (tree) => nodeText(nodes(tree, (node) => node.props?.["aria-live"] === "polite")[0]);
function keyEvent(key) {
  return { key, prevented: 0, stopped: 0, preventDefault() { this.prevented++; }, stopPropagation() { this.stopped++; } };
}
{
  const fixture = carouselFixture();
  let tree = fixture.render();
  assert.equal(carouselRoot(tree).props.tabIndex, -1);
  assert.equal(ribbon(tree).props.drag, false, "a closed cover remains owned by the artwork selection handler");
  assert.equal(nodes(tree, (node) => node.type === "img").length, 1, "offscreen stacks do not request every original");
  const closedKey = keyEvent("ArrowRight"); carouselRoot(tree).props.onKeyDown(closedKey);
  assert.equal(closedKey.prevented, 0, "a closed stack does not hijack gallery keyboard input");
  tree = fixture.render({ active: true }); tree = fixture.render();
  assert.deepEqual(nodes(tree, (node) => node.type === "img").map((node) => node.props.src), [primary, second, third], "nearby closed stacks warm only two extras and keep original URLs");
  assert.ok(sheets(tree).slice(1).every((sheet) => sheet.props.animate.y > 0 && sheet.props.animate.x < 0), "extra sheets visibly stack behind the cover");
  const firstCover = nodes(tree, (node) => node.props?.["data-persistent-cover"])[0];
  assert.equal(firstCover, fixture.primaryNode);
  tree = fixture.render({ open: true }); tree = fixture.render();
  assert.equal(carouselRoot(tree).props.tabIndex, 0);
  assert.equal(ribbon(tree).props.drag, "x");
  assert.equal(counter(tree), "1 / 5");
  assert.equal(nodes(tree, (node) => node.props?.["data-persistent-cover"])[0], firstCover, "opening does not replace or duplicate the primary Preview node");
  assert.ok(sheets(tree).every((sheet) => sheet.props.animate.y === 0 && sheet.props.animate.rotate === 0), "opening unfolds into a single horizontal row");
  assert.ok(sheets(tree).every((sheet, index, all) => index === 0 || sheet.props.animate.x > all[index - 1].props.animate.x));
  const right = keyEvent("ArrowRight"); carouselRoot(tree).props.onKeyDown(right); tree = fixture.render();
  assert.equal(counter(tree), "2 / 5"); assert.equal(right.prevented, 1); assert.equal(right.stopped, 1, "carousel keys never bubble into parent selection/close handlers");
  const end = keyEvent("End"); carouselRoot(tree).props.onKeyDown(end); tree = fixture.render(); tree = fixture.render();
  assert.equal(counter(tree), "5 / 5");
  assert.equal(nodes(tree, (node) => node.props?.["aria-label"] === "Immagine successiva")[0].props.disabled, true);
  assert.ok(nodes(tree, (node) => node.type === "img").some((node) => node.props.src === "/original-five.png"), "keyboard selection loads the current original, not a thumbnail derivative");
  const home = keyEvent("Home"); carouselRoot(tree).props.onKeyDown(home); tree = fixture.render();
  assert.equal(counter(tree), "1 / 5");
  const escape = keyEvent("Escape"); carouselRoot(tree).props.onKeyDown(escape);
  assert.equal(escape.prevented, 0); assert.equal(escape.stopped, 0, "Escape remains owned by the gallery close handler");
  const warmed = nodes(tree, (node) => node.type === "img").map((node) => node.props.src);
  tree = fixture.render({ open: false, active: false }); tree = fixture.render();
  assert.equal(fixture.x.get(), 0);
  assert.deepEqual(nodes(tree, (node) => node.type === "img").map((node) => node.props.src), warmed, "closing retains warmed image nodes for the refolding transition");
  assert.equal(nodes(tree, (node) => node.props?.["data-persistent-cover"])[0], firstCover);
  assert.ok(sheets(tree).every((sheet) => !Object.hasOwn(sheet.props.animate, "opacity") && !Object.hasOwn(sheet.props.style, "opacity") && sheet.props.initial === false), "neither opening nor closing fades the original images");
  assert.ok(nodes(tree, (node) => node.type === "img").every((node) => !node.props.srcSet && !node.props.srcset), "the component never substitutes lower-resolution source variants");
}
{
  const fixture = carouselFixture({ active: true, open: true });
  let tree = fixture.render(); tree = fixture.render();
  ribbon(tree).props.onDragStart();
  fixture.x.set(-235);
  const during = keyEvent("click"); carouselRoot(tree).props.onClickCapture(during);
  assert.equal(during.stopped, 1, "an active swipe cannot trigger parent image-close click behavior");
  ribbon(tree).props.onDragEnd({}, { velocity: { x: -140 } });
  tree = fixture.render();
  assert.equal(counter(tree), "2 / 5", "swipe projection snaps to the nearest original image");
  const release = keyEvent("click"); carouselRoot(tree).props.onClickCapture(release);
  assert.equal(release.stopped, 1); assert.equal(release.prevented, 1, "a swipe's synthetic click never closes the artwork on finger release");
  fixture.advanceTime(251);
  const nextClick = keyEvent("click"); carouselRoot(tree).props.onClickCapture(nextClick);
  assert.equal(nextClick.stopped, 0, "a later deliberate image click is restored");
  const stops = fixture.calls.stops;
  fixture.unmount();
  assert.ok(fixture.calls.stops > stops, "leaving the gallery cancels in-flight ribbon animation");
}
{
  const fixture = carouselFixture({ active: true, open: true });
  let tree = fixture.render(); tree = fixture.render();
  ribbon(tree).props.onDragStart(); fixture.x.set(-180);
  tree = fixture.render({ open: false }); tree = fixture.render();
  assert.equal(fixture.x.get(), 0, "closing during a cancelled drag returns the folded stack to its original cover position");
  const closedClick = keyEvent("click"); carouselRoot(tree).props.onClickCapture(closedClick);
  assert.equal(closedClick.stopped, 0, "an interrupted drag cannot leave an infinite click-suppression lock");
  ribbon(tree).props.onDragEnd({}, { velocity: { x: -2000 } });
  assert.equal(fixture.x.get(), 0, "a late drag-end cannot move a deck after closing");
  tree = fixture.render({ open: true }); tree = fixture.render();
  assert.equal(counter(tree), "1 / 5", "reopening after close starts from the cover");
}
{
  const fixture = carouselFixture({ active: true, open: true, reducedMotion: true });
  let tree = fixture.render(); tree = fixture.render();
  carouselRoot(tree).props.onKeyDown(keyEvent("End")); tree = fixture.render();
  assert.equal(counter(tree), "5 / 5", "reduced-motion mode keeps the complete carousel usable");
  assert.ok(fixture.calls.animations.every((animation) => animation.options.duration === 0));
  assert.ok(sheets(tree).every((sheet) => sheet.props.transition.duration === 0), "reduced-motion removes both unfolding and snapping animation");
}

function galleryFixture({ editing = false } = {}) {
  const harness = hookHarness(), navigations = [], scrollReads = [], layoutEffects = [];
  const items = [
    { ...image, id: "jewelry-image", is_jewelry: true },
    { ...image, id: "jewelry-video", kind: "video", is_jewelry: true },
    { ...image, id: "jewelry-model", kind: "model", is_jewelry: true, model_id: "jewelry-model-original-id" },
    { ...image, id: "fashion-only", is_fashion: true, is_jewelry: false },
    { ...image, id: "legacy-uncategorized", is_fashion: false },
    { ...image, id: "featured-only", is_featured_in: true, is_jewelry: false },
    { ...image, id: "jewelry-featured", is_jewelry: true, is_featured_in: true },
  ];
  const settings = { menu_items: [{ id: "artworks", label: "ARTWORKS" }, { id: "jewelry", label: "Fashion and Jewelry" }, { id: "fashion", label: "FASHION" }] };
  const inline = { editing, draft: settings };
  const api = compile("../src/pages/Artworks.tsx", (id) => {
    if (id === "react") return { ...harness.react, useEffect() {}, useLayoutEffect(callback) { layoutEffects.push(callback); } };
    if (id === "react/jsx-runtime") return jsx;
    if (id === "framer-motion") return { LayoutGroup: "LayoutGroup", motion: new Proxy({}, { get: (_, name) => `motion.${String(name)}` }), useReducedMotion: () => false };
    if (id === "react-router-dom") return { useNavigate: () => (url, options) => navigations.push({ url, options }) };
    if (id === "@/hooks/useSiteContent") return { useArtworks: () => ({ items, loading: false, error: null, reload() {} }), useSiteContent: () => ({ settings }) };
    if (id === "@/components/SiteEditControl") return { default: "SiteEditControl", useInlineSiteEditing: () => inline };
    if (id === "@/lib/artworkImages") return imageHelpers;
    if (id === "@/services/siteContentRepository") return { saveArtworkItem() { throw new Error("Public gallery contract tests cannot save"); }, uploadArtworkAsset() { throw new Error("Public gallery contract tests cannot upload"); } };
    if (id.startsWith("@/components/")) return { default: id };
    if (id.endsWith(".css")) return {};
    throw new Error(`Unexpected gallery dependency: ${id}`);
  }, { document: { hidden: false }, sessionStorage: { getItem: (key) => { scrollReads.push(key); return "96"; } } }, (source) => source, "exports.test = { GalleryView };");
  return { api, items, navigations, scrollReads, runLayoutEffect: (index) => layoutEffects[index](), render: (props) => { layoutEffects.length = 0; return harness.render(() => api.test.GalleryView(props)); } };
}
{
  const fixture = galleryFixture();
  const jewelry = fixture.api.default({ jewelryOnly: true });
  assert.equal(jewelry.key, "jewelry"); assert.equal(jewelry.props.jewelryOnly, true);
  assert.notEqual(jewelry.key, fixture.api.default({}).key, "entering Jewelry remounts its gallery lifecycle and selected-media state");
  const tree = fixture.render({ jewelryOnly: true });
  const cards = nodes(tree, (node) => node.props?.item);
  assert.deepEqual(cards.map((node) => node.props.item.id), ["jewelry-image", "jewelry-video", "jewelry-model", "jewelry-featured"], "Jewelry selects only explicitly flagged artwork records across all supported media");
  assert.equal(nodes(tree, (node) => node.props?.section === "jewelry")[0].props.title, "Fashion and Jewelry", "the owner-renamed section label remains typed text");
  cards.find((node) => node.props.item.kind === "model").props.onModelReady();
  assert.equal(fixture.navigations[0].url, "/3d?model=jewelry-model-original-id");
  assert.equal(fixture.navigations[0].options.state.returnTo, "/fashionandjewelry", "the existing single-model viewer is given the canonical Fashion and Jewelry return destination");
  const scroll = { scrollTop: 0 };
  nodes(tree, (node) => node.props?.className?.startsWith("artworks-scroll"))[0].props.ref(scroll);
  fixture.render({ jewelryOnly: true });
  fixture.runLayoutEffect(0);
  assert.deepEqual(fixture.scrollReads, ["studierzimmer:artwork-scroll:/jewelry"], "changing the public URL retains the owner's existing Jewelry scroll memory");
  assert.equal(scroll.scrollTop, 96);
}
{
  const fixture = galleryFixture();
  const before = JSON.stringify(fixture.items);
  const artworkCards = nodes(fixture.render({}), (node) => node.props?.item);
  assert.deepEqual(artworkCards.map((node) => node.props.item.id), ["fashion-only", "legacy-uncategorized"], "base Artworks excludes every Jewelry-flagged item and retains old Fashion/non-Jewelry works");
  assert.ok(artworkCards.every((node) => !node.props.item.is_jewelry && !node.props.item.is_featured_in));
  assert.equal(JSON.stringify(fixture.items), before, "gallery exclusivity is a presentation filter, never a data or legacy-flag migration");
  const featured = galleryFixture();
  assert.deepEqual(nodes(featured.render({ featuredOnly: true }), (node) => node.props?.item).map((node) => node.props.item.id), ["featured-only", "jewelry-featured"], "Featured In selection remains governed by its existing flag");
}
{
  const fixture = galleryFixture({ editing: true });
  let tree = fixture.render({ jewelryOnly: true });
  nodes(tree, (node) => node.type === "button" && node.props.className?.includes("artwork-add-inline"))[0].props.onClick();
  tree = fixture.render({ jewelryOnly: true });
  const added = nodes(tree, (node) => node.props?.item).map((node) => node.props.item).find((item) => !fixture.items.some((saved) => item.id === saved.id));
  assert.equal(added.is_jewelry, true, "adding inline from Jewelry creates a Jewelry draft");
  assert.equal(added.is_published, false); assert.equal(added.kind, "image"); assert.equal(added.media_url, "", "new drafts do not fabricate published media");
}
{
  const appSource = fs.readFileSync(new URL("../src/App.tsx", import.meta.url), "utf8");
  const ast = ts.createSourceFile("App.tsx", appSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const routes = new Map();
  const visit = (node) => {
    if (ts.isJsxSelfClosingElement(node) && node.tagName.getText(ast) === "Route") {
      const attributes = node.attributes.properties;
      const route = attributes.find((attribute) => attribute.name?.getText(ast) === "path")?.initializer?.text;
      const element = attributes.find((attribute) => attribute.name?.getText(ast) === "element")?.initializer?.expression;
      if (route) routes.set(route, element);
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  const jewelry = routes.get("/fashionandjewelry");
  assert.equal(jewelry.tagName.getText(ast), "Artworks");
  assert.ok(jewelry.attributes.properties.some((attribute) => attribute.name?.getText(ast) === "jewelryOnly"), "the Jewelry route opts into the artwork gallery contract");
  for (const alias of ["/fashion", "/jewelry"]) {
    const retired = routes.get(alias);
    assert.equal(retired.tagName.getText(ast), "Navigate", `${alias} redirects instead of exposing a duplicate standalone gallery`);
    assert.equal(retired.attributes.properties.find((attribute) => attribute.name?.getText(ast) === "to")?.initializer?.text, "/fashionandjewelry");
    assert.ok(retired.attributes.properties.some((attribute) => attribute.name?.getText(ast) === "replace"), "legacy redirects do not trap the browser Back button");
  }
  const horlogerie = routes.get("/horlogerie");
  assert.equal(horlogerie.tagName.getText(ast), "WatchRoute");
  assert.equal(horlogerie.attributes.properties.find((attribute) => attribute.name?.getText(ast) === "category")?.initializer?.text, "horlogerie", "Horlogerie retains the existing categorized 3D library");
  const navigations = [];
  let requestedReturn = "/fashionandjewelry";
  const app = compile("../src/App.tsx", (id) => {
    if (id === "react") return hookHarness().react;
    if (id === "react/jsx-runtime") return jsx;
    if (id === "@tanstack/react-query") return { QueryClient: class {} };
    if (id === "react-router-dom") return { useNavigate: () => (url) => navigations.push(url), useLocation: () => ({ search: "?model=jewelry-model-original-id", state: { returnTo: requestedReturn } }) };
    // Every remaining import is an inert component/provider, never a real service.
    return {};
  }, { URLSearchParams }, (source) => source, "exports.test = { WatchRoute };");
  for (const destination of ["/fashionandjewelry", "/jewelry", "/fashion"]) {
    requestedReturn = destination;
    const studio = app.test.WatchRoute({});
    assert.equal(studio.props.initialModelId, "jewelry-model-original-id");
    studio.props.onBack();
    assert.equal(navigations.at(-1), destination, "the existing 3D viewer honors canonical and previously saved legacy return routes");
  }
}

console.log("PASS: original artwork stacks, persistence/schema fallback, upload lifecycle and no-fade carousel interaction; Jewelry normalization/flag safety, admin control, gallery selection/drafts and 3D route return (all storage/network mocked).");
