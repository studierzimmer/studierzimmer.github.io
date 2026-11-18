// Execute the real repository, hook/store and Home source with isolated mocks.
// No browser, credentials, network, media access or persistence writes.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));
const forbidden = (action) => { throw new Error(`Presence checks must never ${action}`); };
function compile(source, require = (id) => forbidden(`import ${id}`), globals = {}) {
  const exports = {};
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(output, { exports, require, Map, Set, URL, AbortController, console, ...globals });
  return exports;
}
const helpers = Object.fromEntries([
  ["@/lib/siteMenu", "src/lib/siteMenu.ts"],
  ["@/lib/modelViewModes", "src/lib/modelViewModes.ts"],
  ["@/lib/artworkOrder", "src/lib/artworkOrder.ts"],
  ["@/types/oceanEnvironment", "src/types/oceanEnvironment.ts"],
  ["@/types/oceanText", "src/types/oceanText.ts"],
].map(([name, path]) => [name, compile(read(path))]));
const eventName = "studierzimmer:site-content-change";
const microtasks = async () => { for (let index = 0; index < 8; index++) await Promise.resolve(); };
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};
function events() {
  const listeners = new Map();
  return {
    setTimeout, clearTimeout,
    location: { hostname: "portfolio.example", protocol: "https:" },
    addEventListener(name, listener) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(listener); },
    removeEventListener(name, listener) { listeners.get(name)?.delete(listener); },
    emit(kind) { for (const listener of [...(listeners.get(eventName) ?? [])]) listener({ type: eventName, detail: { kind } }); },
    listenerCount: () => listeners.get(eventName)?.size ?? 0,
  };
}

function repositoryFixture({ local = false, draft, localError, data = [], error = null } = {}) {
  const calls = [], draftReads = [], window = events();
  const idb = {
    open() {
      const request = {};
      queueMicrotask(() => {
        if (localError) { request.error = localError; request.onerror(); return; }
        request.result = {
          transaction(store, mode) {
            assert.equal(store, "drafts", "presence reads only metadata, never the assets store");
            assert.equal(mode, "readonly", "presence must never create or rewrite saved drafts");
            return { objectStore: () => ({ get(key) {
              draftReads.push(key);
              const operation = {};
              queueMicrotask(() => { operation.result = draft; operation.onsuccess(); });
              return operation;
            } }) };
          },
        };
        request.onsuccess();
      });
      return request;
    },
  };
  const query = {
    select(value) { calls.push(["select", value]); return this; },
    eq(name, value) { calls.push(["eq", name, value]); return this; },
    limit(value) { calls.push(["limit", value]); return this; },
    abortSignal(signal) { assert.ok(signal instanceof AbortSignal); calls.push(["abortSignal"]); return this; },
    then(resolve, reject) { return Promise.resolve({ data, error }).then(resolve, reject); },
  };
  const supabase = {
    from(table) { calls.push(["from", table]); return query; },
    get storage() { return forbidden("access Storage or download an asset"); },
    rpc: () => forbidden("call an RPC"), auth: {},
  };
  const source = read("src/services/siteContentRepository.ts")
    .replaceAll("import.meta.env.VITE_SITE_CONTENT_MODE", JSON.stringify(local ? "local" : "remote"))
    .replaceAll("import.meta.env.DEV", "false");
  class MetadataOnlyURL extends URL {
    static createObjectURL() { return forbidden("resolve a Blob URL"); }
  }
  const api = compile(source, (id) => {
    if (id === "@/lib/supabase") return { supabase };
    if (helpers[id]) return helpers[id];
    return forbidden(`import ${id}`);
  }, { window, indexedDB: idb, URL: MetadataOnlyURL });
  return { api, calls, draftReads };
}

const artwork = (id, extra = {}) => Object.freeze({ id, title: `Original ${id}`, year: 2026, kind: "image", media_url: "local-asset:missing-on-purpose", poster_url: "local-asset:another-missing-file", additional_images: ["local-asset:missing-extra"], is_published: false, is_featured_in: false, ...extra });
for (const [draft, expected] of [
  [[], false],
  [[artwork("ordinary", { is_published: true })], false],
  [[artwork("unpublished", { is_featured_in: true })], false],
  [[artwork("other", { is_published: true }), artwork("article", { is_published: true, is_featured_in: true })], true],
]) {
  const frozen = Object.freeze(draft), before = plain(frozen);
  const fixture = repositoryFixture({ local: true, draft: frozen, data: [{ id: "remote-article-must-not-override-local-draft" }] });
  const beforeStatus = plain(fixture.api.getSiteContentStatus("artworks"));
  assert.equal(await fixture.api.hasPublishedFeaturedArtwork(), expected);
  assert.deepEqual(fixture.calls, [], "an existing local draft, including [], is authoritative without remote reads");
  assert.deepEqual(fixture.draftReads, ["artworks"]);
  assert.deepEqual(plain(frozen), before, "presence never rewrites catalogue rows or media references");
  assert.deepEqual(plain(fixture.api.getSiteContentStatus("artworks")), beforeStatus, "presence does not overwrite the full catalogue's status");
}
for (const [data, expected] of [[[], false], [[{ id: "published-article" }], true]]) {
  const fixture = repositoryFixture({ data });
  assert.equal(await fixture.api.hasPublishedFeaturedArtwork(), expected);
  assert.deepEqual(fixture.calls, [["from", "artworks"], ["select", "id"], ["eq", "is_published", true], ["eq", "is_featured_in", true], ["limit", 1], ["abortSignal"]], "Home requests only one matching id, with no media, ordering, signing, auth or writes");
  assert.deepEqual(fixture.draftReads, [], "remote mode does not open local draft storage");
}
{
  const fixture = repositoryFixture({ local: true, draft: undefined, data: [{ id: "remote-fallback" }] });
  assert.equal(await fixture.api.hasPublishedFeaturedArtwork(), true, "local mode falls back to published remote metadata only when no draft exists");
  assert.equal(fixture.calls.filter(([name]) => name === "from").length, 1);
}
for (const options of [
  { error: { message: "Failed to fetch", code: "NETWORK_ERROR" } },
  { error: { message: "column artworks.is_featured_in does not exist", code: "42703" } },
  { local: true, localError: new Error("IndexedDB unavailable") },
  { local: true, draft: { broken: true } },
]) {
  const fixture = repositoryFixture(options);
  await assert.rejects(fixture.api.hasPublishedFeaturedArtwork(), () => true, "an unavailable API/storage is not a successful empty catalogue; the hook decides fail-open behavior");
}

function hookFixture() {
  const window = events(), requests = [];
  let activeSubscribe, unsubscribe, effectDependencies;
  const repository = {
    DEFAULT_SITE_SETTINGS: {}, SITE_CONTENT_EVENT: eventName,
    hasPublishedFeaturedArtwork() { const request = deferred(); requests.push(request); return request.promise; },
    getSiteContentStatus: () => forbidden("borrow or overwrite full catalogue status"),
    getSiteSettings: () => forbidden("load settings from the presence hook"),
    listArtworkItems: () => forbidden("download the catalogue from the presence hook"),
    saveSiteSettings: () => forbidden("save settings from the presence hook"),
  };
  const react = {
    useCallback: (callback) => callback,
    useEffect(callback, dependencies) {
      if (!effectDependencies || dependencies.some((value, index) => value !== effectDependencies[index])) {
        effectDependencies = dependencies;
        callback();
      }
    },
    useSyncExternalStore(subscribe, getSnapshot) {
      if (subscribe !== activeSubscribe) { unsubscribe?.(); activeSubscribe = subscribe; unsubscribe = subscribe(() => {}); }
      return getSnapshot();
    },
  };
  const api = compile(`${read("src/hooks/useSiteContent.ts")}\nexport { createFeaturedPresenceStore };`, (id) => {
    if (id === "react") return react;
    if (id === "@/services/siteContentRepository") return repository;
    return forbidden(`import ${id}`);
  }, { window });
  return { api, window, requests, render: (enabled = true) => api.usePublishedFeaturedAvailability(enabled), unmount() { unsubscribe?.(); unsubscribe = activeSubscribe = effectDependencies = undefined; } };
}
{
  const fixture = hookFixture();
  assert.equal(fixture.render(false), null);
  assert.equal(fixture.requests.length, 0, "editing/explicitly hidden menu entries trigger no presence query");
  assert.equal(fixture.window.listenerCount(), 0);
  assert.equal(fixture.render(true), null, "initial unknown stays behind Home's loading gate");
  assert.equal(fixture.requests.length, 1);
  fixture.render(true);
  assert.equal(fixture.requests.length, 1, "rerenders share the pending cached read");
  fixture.requests[0].resolve(false); await microtasks();
  assert.equal(fixture.render(true), false);
  fixture.window.emit("settings");
  assert.equal(fixture.requests.length, 1, "unrelated typography/logo settings events never reload presence");
  fixture.window.emit("artworks");
  assert.equal(fixture.requests.length, 2);
  assert.equal(fixture.render(true), false, "revalidation retains the known boolean, never resetting menu/splash to unknown");
  fixture.requests[1].resolve(true); await microtasks();
  assert.equal(fixture.render(true), true, "publishing the first article reveals the menu in the same app");
  fixture.window.emit("artworks");
  fixture.requests[2].resolve(false); await microtasks();
  assert.equal(fixture.render(true), false, "unpublishing/deleting the last article hides it again");
  fixture.window.emit("artworks");
  fixture.requests[3].reject(new Error("API outage")); await microtasks();
  assert.equal(fixture.render(true), true, "an outage after an earlier empty result fails open instead of incorrectly hiding real articles");
  fixture.unmount();
  assert.equal(fixture.window.listenerCount(), 0, "the last subscriber removes its artwork listener");
  fixture.window.emit("artworks");
  assert.equal(fixture.requests.length, 4, "an unmounted Home does not keep requesting data");
  assert.equal(fixture.render(true), true, "returning Home retains its previous resolved value during the fresh read");
  assert.equal(fixture.requests.length, 5);
  fixture.requests[4].resolve(false); await microtasks();
  assert.equal(fixture.render(true), false);
  fixture.render(false);
  assert.equal(fixture.window.listenerCount(), 0, "switching to editing disables subscriptions as well as querying");
  fixture.unmount();
}
{
  const fixture = hookFixture(), store = fixture.api.createFeaturedPresenceStore();
  let notifications = 0;
  const first = store.subscribe(() => { notifications++; }), second = store.subscribe(() => { notifications++; });
  assert.equal(fixture.window.listenerCount(), 1, "multiple consumers share one artwork event listener");
  store.ensureLoaded(); store.ensureLoaded();
  assert.equal(fixture.requests.length, 1);
  fixture.window.emit("artworks");
  fixture.requests[0].resolve(false); await microtasks();
  assert.equal(fixture.requests.length, 2, "a publication event arriving during initial loading schedules a fresh read");
  fixture.requests[1].resolve(true); await microtasks();
  assert.equal(store.getSnapshot(), true, "the stale initial response cannot swallow the publication update");
  assert.equal(notifications, 4);
  first(); assert.equal(fixture.window.listenerCount(), 1);
  second(); assert.equal(fixture.window.listenerCount(), 0);
}
{
  const fixture = hookFixture();
  assert.equal(fixture.render(true), null);
  fixture.requests[0].reject(new Error("Initial API outage")); await microtasks();
  assert.equal(fixture.render(true), true, "an initial failure also fails open and releases Home's unknown gate");
  fixture.unmount();
}

const jsx = { jsx: (type, props, key) => ({ type, props, key }), jsxs: (type, props, key) => ({ type, props, key }) };
function nodes(node, predicate) {
  const found = [];
  const visit = (item) => { if (Array.isArray(item)) return item.forEach(visit); if (!item || typeof item !== "object") return; if (predicate(item)) found.push(item); visit(item.props?.children); };
  visit(node); return found;
}
const baseSettings = {
  ...repositoryFixture().api.DEFAULT_SITE_SETTINGS,
  splash_logo_url: "/unchanged-alpha-logo.gif?original=1",
  bio_text: "Preserved original biography", menu_color: "#123456", gallery_item_order: { artworks: ["original-a", "original-b"] },
};
baseSettings.menu_items = ["navigate", "fashion", "featured", "bio", "jewelry", "artworks", "horlogerie", "sketches"].map((id) => ({
  ...baseSettings.menu_items.find((item) => item.id === id), label: `Original ${id}`, image_url: `/original-alpha-${id}.png?signature=UNCHANGED`, visible: id !== "navigate",
}));
function homeFixture({ available = false, editing = false, seen = true, featuredVisible = true } = {}) {
  const settings = plain(baseSettings), navigations = [], enableCalls = [], slots = [], refs = [], sessionWrites = [];
  settings.menu_items.find((item) => item.id === "featured").visible = featuredVisible;
  const before = plain(settings);
  let stateIndex = 0, refIndex = 0;
  const require = (id) => {
    if (id === "react") return {
      useState(initial) { const index = stateIndex++; if (!(index in slots)) slots[index] = typeof initial === "function" ? initial() : initial; return [slots[index], (value) => { slots[index] = typeof value === "function" ? value(slots[index]) : value; }]; },
      useRef(current) { return refs[refIndex++] ??= { current }; }, useCallback: (callback) => callback,
    };
    if (id === "react/jsx-runtime") return jsx;
    if (id === "react-router-dom") return { useNavigate: () => (path) => navigations.push(path) };
    if (id === "@/components/SiteEditControl") return { default: "SiteEditControl", useInlineSiteEditing: () => ({ editing, settings, draft: settings, update: () => forbidden("rewrite saved settings while presenting Home") }) };
    if (id === "@/components/LoadingLogo") return { default: "LoadingLogo" };
    if (id === "@/hooks/useSiteContent") return { useSiteContent: () => ({ loading: false }), usePublishedFeaturedAvailability: (enabled) => { enableCalls.push(enabled); return available; } };
    if (id === "@/lib/siteMenu") return helpers[id];
    if (id === "@/services/siteContentRepository") return { uploadSiteAsset: () => forbidden("upload an asset from Home rendering") };
    if (id === "@/components/books/bookSession") return { BOOK_INTRO_RETURN_KEY: "book-intro" };
    if (id.endsWith(".gif")) return { default: "/default-logo.gif" };
    if (id.endsWith(".css")) return {};
    return forbidden(`import ${id} into Home (including a catalogue or 3D dependency)`);
  };
  const api = compile(read("src/pages/PortfolioHome.tsx"), require, { sessionStorage: { getItem: () => seen ? "true" : null, setItem: (...values) => sessionWrites.push(values), removeItem: (...values) => sessionWrites.push(values) } });
  return { settings, before, navigations, enableCalls, sessionWrites, render() { stateIndex = refIndex = 0; return api.default(); } };
}
const entries = (tree) => nodes(tree, (node) => node.props?.["data-menu-entry"]);
const entryIds = (tree) => entries(tree).map((node) => node.props["data-menu-entry"]);
const normalIds = baseSettings.menu_items.filter((item) => item.id !== "fashion" && item.visible).map((item) => item.id);
for (const available of [false, true]) {
  const fixture = homeFixture({ available }), tree = fixture.render();
  assert.deepEqual(entryIds(tree), normalIds.filter((id) => available || id !== "featured"));
  assert.deepEqual(plain(fixture.settings), fixture.before, "hiding/restoring Featured is presentation only, preserving every saved row, label, order, image and unrelated setting");
  assert.deepEqual(fixture.sessionWrites, [], "checking availability never saves menu or route state");
  assert.deepEqual(fixture.enableCalls, [true]);
  if (available) {
    const featured = entries(tree).find((node) => node.props["data-menu-entry"] === "featured");
    const image = nodes(featured, (node) => node.type === "img")[0];
    assert.equal(image.props.src, "/original-alpha-featured.png?signature=UNCHANGED");
    assert.equal(image.props.alt, "Original featured");
    nodes(featured, (node) => node.type === "button")[0].props.onClick();
    assert.deepEqual(fixture.navigations, ["/featured-in"]);
  }
}
for (const seen of [false, true]) {
  const fixture = homeFixture({ available: null, seen }), tree = fixture.render();
  assert.equal(entries(tree).length, 0, "unresolved availability never mounts an entry which then disappears, including return visits after splash dismissal");
  if (seen) assert.equal(nodes(tree, (node) => node.props?.["aria-label"] === "Caricamento").length, 1);
  else {
    assert.equal(tree.type, "LoadingLogo", "the original splash starts on time while presence loads in parallel");
    tree.props.onComplete();
    const waiting = fixture.render();
    assert.equal(entries(waiting).length, 0);
    assert.equal(nodes(waiting, (node) => node.props?.["aria-label"] === "Caricamento").length, 1, "after splash dismissal, unknown presence still gates the first menu paint");
  }
}
{
  const fixture = homeFixture({ available: false, seen: false }), splash = fixture.render();
  assert.equal(splash.type, "LoadingLogo");
  assert.equal(splash.props.logoUrl, fixture.settings.splash_logo_url);
  splash.props.onComplete();
  assert.deepEqual(entryIds(fixture.render()), normalIds.filter((id) => id !== "featured"), "first menu paint after the original splash already excludes the empty section");
}
for (const available of [false, null]) {
  const fixture = homeFixture({ available, editing: true }), tree = fixture.render();
  assert.deepEqual(entryIds(tree), normalIds, "owner editing preserves Featured title, PNG and reorder controls even with no published articles");
  assert.deepEqual(fixture.enableCalls, [false]);
  assert.equal(nodes(tree, (node) => node.props?.["aria-label"] === "Titolo featured").length, 1);
  assert.equal(nodes(tree, (node) => node.props?.["aria-label"] === "Immagine titolo featured").length, 1);
  assert.deepEqual(plain(fixture.settings), fixture.before);
}
for (const editing of [false, true]) {
  const fixture = homeFixture({ available: null, featuredVisible: false, editing }), tree = fixture.render();
  assert.equal(entryIds(tree).includes("featured"), false, "automatic presence never overrides an explicit saved visibility choice");
  assert.deepEqual(fixture.enableCalls, [false]);
  assert.ok(entries(tree).length > 0, "an explicitly hidden entry does not block the rest of Home on an unnecessary query");
}

console.log("PASS: Featured menu follows published presence; local drafts, tiny remote reads, reactive cached/fail-open hook, splash, editor access and original settings/media are preserved (no network or writes).");
