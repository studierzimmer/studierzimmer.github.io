import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function compile(source, require = () => { throw new Error("Unexpected dependency"); }, globals = {}) {
  const exports = {};
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(output, { exports, require, Map, Set, URL, console, ...globals });
  return exports;
}
const helpers = compile(fs.readFileSync(new URL("../src/lib/siteMenu.ts", import.meta.url), "utf8"));
const ocean = compile(fs.readFileSync(new URL("../src/types/oceanEnvironment.ts", import.meta.url), "utf8"));
const oceanText = compile(fs.readFileSync(new URL("../src/types/oceanText.ts", import.meta.url), "utf8"));
const modelViews = compile(fs.readFileSync(new URL("../src/lib/modelViewModes.ts", import.meta.url), "utf8"));
let repository = fs.readFileSync(new URL("../src/services/siteContentRepository.ts", import.meta.url), "utf8");
repository = repository.replaceAll("import.meta.env.VITE_SITE_CONTENT_MODE", '"local"').replaceAll("import.meta.env.DEV", "true");
const api = compile(`${repository}\nexport { normalizeSettings };`, (id) => {
  if (id === "@/lib/supabase") return { supabase: {} };
  if (id === "@/lib/siteMenu") return helpers;
  if (id === "@/lib/modelViewModes") return modelViews;
  if (id === "@/types/oceanEnvironment") return ocean;
  if (id === "@/types/oceanText") return oceanText;
  throw new Error(`Unexpected dependency ${id}`);
});
const defaults = api.DEFAULT_SITE_SETTINGS.menu_items;
const ids = (items) => Array.from(items, (item) => item.id);
const moved = helpers.moveMenuItem(defaults, "navigate", 0);
assert.equal(moved[0].id, "navigate");
assert.equal(defaults[0].id, "bio", "Reordering never mutates saved state");
let normalized = api.normalizeSettings({ menu_items: moved });
assert.deepEqual(ids(normalized.menu_items), ids(moved));
normalized = api.normalizeSettings(normalized);
assert.deepEqual(ids(normalized.menu_items), ids(moved), "Reload/save does not restore the old fixed order");
const customized = moved.map((item) => item.id === "navigate" ? { ...item, label: "Mondo", image_url: "/titles/world.png", visible: false } : item);
normalized = api.normalizeSettings({ menu_items: customized });
assert.equal(normalized.menu_items[0].label, "Mondo");
assert.equal(normalized.menu_items[0].image_url, "/titles/world.png");
assert.equal(normalized.menu_items[0].visible, false);
const legacy = api.normalizeSettings({ menu_items: [{ id: "models", visible: false }, { id: "bio" }, { id: "bio" }, { id: "invalid" }] });
assert.equal(legacy.menu_items[0].id, "featured");
assert.equal(legacy.menu_items[0].visible, false);
assert.equal(new Set(ids(legacy.menu_items)).size, defaults.length);
assert.equal(legacy.menu_items.length, defaults.length);
assert.deepEqual(ids(helpers.moveMenuItem(moved, "navigate", 99)), [...ids(moved).slice(1), "navigate"]);
assert.equal(api.normalizeSettings({ sketches_book_list_label: "  Catalogo  " }).sketches_book_list_label, "Catalogo");
assert.equal(api.normalizeSettings({ sketches_book_list_label: "" }).sketches_book_list_label, "Book List");
assert.equal(api.normalizeSettings({ sketches_book_list_label: "x".repeat(100) }).sketches_book_list_label.length, 80);
assert.match(fs.readFileSync(new URL("../src/components/navigation/SectionNavigation.tsx", import.meta.url), "utf8"), /section-index-link">Studierzimmer/);
const plain = (value) => JSON.parse(JSON.stringify(value));
const custom = api.normalizeSettings({
  ...api.DEFAULT_SITE_SETTINGS,
  menu_items: ["navigate", "fashion", "jewelry", "bio", "featured", "artworks", "sketches", "horlogerie"].map((id) => ({
    ...defaults.find((item) => item.id === id),
    label: id === "jewelry" ? "Fashion and Jewelry" : id === "fashion" ? "My previous standalone fashion title" : `Custom ${id}`,
    image_url: `/titles/${id}-original-alpha.png?token=UNCHANGED`, visible: id !== "navigate",
  })),
  splash_logo_url: "/my-original-splash.png?token=UNCHANGED",
  menu_font_family: "Georgia, serif", menu_font_size: 31, menu_color: "#123456", menu_background_color: "#ededed", menu_letter_spacing: 1.3,
  bio_text: "My custom biography\nOriginal paragraph", bio_font_family: "Arial, sans-serif", bio_font_size: 23, bio_color: "#456789", bio_background_color: "#fafafa", bio_line_height: 2.1, bio_text_align: "justify",
  sketches_book_list_label: "Il mio catalogo", model_categories: { "original-watch-id": "horlogerie", "original-model-id": "models" },
  ocean_title: "My custom ocean", ocean_subtitle: "Original subtitle", ocean_about: "Original ocean text", ocean_text_color: "#112233", ocean_background_color: "#ffeeaa",
  ocean_labels: { ...oceanText.DEFAULT_OCEAN_LABELS, start: "Comincia", exit: "Esci" },
});
const beforePresentation = plain(custom);
const active = helpers.activeMenuItems(custom.menu_items);
assert.deepEqual(ids(active), ids(custom.menu_items).filter((id) => id !== "fashion"), "only the standalone Fashion destination is retired from presentation, regardless of its saved title");
assert.ok(active.some((item) => item.id === "navigate" && !item.visible), "presentation filtering preserves visibility values for the settings editor");
assert.deepEqual(plain(custom), beforePresentation, "reading the active menu never rewrites saved settings, order, labels, PNGs or the retired row");
const reordered = helpers.moveActiveMenuItem(custom.menu_items, "jewelry", 0);
assert.deepEqual(ids(helpers.activeMenuItems(reordered)), ["jewelry", ...ids(active).filter((id) => id !== "jewelry")]);
assert.equal(reordered[1].id, "fashion", "active reordering keeps the retired Fashion row in its original saved slot");
assert.deepEqual(plain(reordered[1]), beforePresentation.menu_items[1]);
for (const original of custom.menu_items) assert.deepEqual(plain(reordered.find((item) => item.id === original.id)), plain(original), "moving visible destinations preserves every original menu record");
assert.deepEqual(plain(helpers.moveActiveMenuItem(custom.menu_items, "fashion", 0)), beforePresentation.menu_items, "a retired destination cannot accidentally reorder active entries");
const afterNormalization = plain(api.normalizeSettings({ ...custom, menu_items: reordered }));
const expectedReorder = { ...beforePresentation, menu_items: plain(reordered) };
assert.deepEqual(afterNormalization, expectedReorder, "normalization/save/reload preserves all unrelated typography, splash, BIO, Featured In, model and Ocean settings");
assert.equal(defaults.find((item) => item.id === "jewelry").label, "Fashion and Jewelry");
assert.equal(api.normalizeSettings(custom).menu_items.find((item) => item.id === "jewelry").label, "Fashion and Jewelry", "a new default never overwrites the owner's renamed label");

const layoutSettings = api.normalizeSettings({ ...custom, gallery_row_gap: { artworks: 120, jewelry: 48 }, model_view_modes: { "original-watch-id": ["arctic", "pen"], "original-model-id": ["render"] } });
assert.deepEqual(plain(layoutSettings.gallery_row_gap), { artworks: 120, jewelry: 48 });
assert.deepEqual(plain(layoutSettings.model_view_modes), { "original-watch-id": ["arctic", "pen"], "original-model-id": ["render"] });
assert.deepEqual(plain(api.normalizeSettings(layoutSettings)), plain(layoutSettings), "row spacing and per-model view choices survive normalization without touching the catalogue or other saved settings");
assert.deepEqual(plain(api.normalizeSettings({ gallery_row_gap: { artworks: -100, jewelry: 500 } }).gallery_row_gap), { artworks: 16, jewelry: 240 }, "row spacing always leaves a positive non-overlapping gap");
assert.deepEqual(plain(api.normalizeSettings({ gallery_row_gap: { artworks: Number.NaN, jewelry: "64" } }).gallery_row_gap), {}, "invalid layout values preserve responsive defaults");

function nodes(node, predicate) {
  const found = [];
  const visit = (item) => { if (Array.isArray(item)) return item.forEach(visit); if (!item || typeof item !== "object") return; if (predicate(item)) found.push(item); visit(item.props?.children); };
  visit(node); return found;
}
const text = (node) => typeof node === "string" || typeof node === "number" ? String(node) : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";
const jsx = { jsx: (type, props, key) => ({ type, props, key }), jsxs: (type, props, key) => ({ type, props, key }) };
function componentFixture({ editing = false } = {}) {
  let draft = plain(custom), stateIndex = 0, refIndex = 0;
  const states = [], refs = [], navigations = [], uploads = [];
  const update = (patch) => { draft = { ...draft, ...(typeof patch === "function" ? patch(draft) : patch) }; };
  const hooks = {
    useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial; return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value; }]; },
    useRef(initial) { return refs[refIndex++] ??= { current: initial }; }, useCallback: (callback) => callback, useMemo: (callback) => callback(), useEffect() {}, useLayoutEffect() {},
  };
  const dependencies = (id) => {
    if (id === "react") return hooks;
    if (id === "react/jsx-runtime") return jsx;
    if (id === "react-router-dom") return { useNavigate: () => (path) => navigations.push(path) };
    if (id === "@/components/SiteEditControl") return { default: "SiteEditControl", useInlineSiteEditing: () => ({ editing, settings: custom, draft, update }) };
    if (id === "@/hooks/useSiteContent") return { useSiteContent: () => ({ loading: false }) };
    if (id === "@/lib/siteMenu") return helpers;
    if (id === "@/services/siteContentRepository") return { uploadSiteAsset: (file) => { uploads.push(file); return new Promise((resolve) => { uploads.resolve = resolve; }); } };
    return {};
  };
  const home = compile(fs.readFileSync(new URL("../src/pages/PortfolioHome.tsx", import.meta.url), "utf8"), dependencies, { sessionStorage: { getItem: () => "true", setItem() {}, removeItem() {} } });
  const navigation = compile(fs.readFileSync(new URL("../src/components/navigation/SectionNavigation.tsx", import.meta.url), "utf8"), dependencies);
  const render = (component, props = {}) => { stateIndex = refIndex = 0; return component(props); };
  return { navigations, uploads, update, setEditing: (value) => { editing = value; }, get draft() { return draft; }, home: () => render(home.default), toolbar: (props) => render(navigation.default, props) };
}
{
  const fixture = componentFixture();
  const home = fixture.home();
  const entries = nodes(home, (node) => node.props?.["data-menu-entry"]);
  assert.deepEqual(entries.map((node) => node.props["data-menu-entry"]), ids(custom.menu_items).filter((id) => id !== "fashion" && id !== "navigate"));
  const jewelry = entries.find((node) => node.props["data-menu-entry"] === "jewelry");
  const titleImage = nodes(jewelry, (node) => node.type === "img")[0];
  assert.equal(titleImage.props.src, custom.menu_items.find((item) => item.id === "jewelry").image_url);
  assert.equal(titleImage.props.alt, "Fashion and Jewelry", "the home PNG retains the typed title as its accessible text");
  nodes(jewelry, (node) => node.type === "button")[0].props.onClick();
  assert.deepEqual(fixture.navigations, ["/fashionandjewelry"], "the preserved internal jewelry menu key opens the new canonical public URL");
  const notebooks = entries.find((node) => node.props["data-menu-entry"] === "sketches");
  nodes(notebooks, (node) => node.type === "button")[0].props.onClick();
  assert.equal(fixture.navigations.at(-1), "/notebooks", "the saved sketches menu key is preserved while its public URL becomes notebooks");
  const toolbar = fixture.toolbar({ section: "jewelry" });
  assert.equal(nodes(toolbar, (node) => node.props?.className === "section-navigation-title").map(text).join(), "Fashion and Jewelry");
  assert.equal(nodes(toolbar, (node) => node.type === "img").length, 0, "a menu-title PNG never replaces the toolbar's typed text");
  assert.equal(nodes(fixture.toolbar({ section: "jewelry", title: "Explicit typed section heading" }), (node) => node.props?.className === "section-navigation-title").map(text).join(), "Explicit typed section heading", "a caller-supplied toolbar label also stays textual when a PNG exists");
}
{
  const fixture = componentFixture({ editing: true });
  let home = fixture.home();
  const upload = nodes(home, (node) => node.props?.["aria-label"] === "Immagine titolo jewelry")[0];
  const operation = upload.props.onChange({ target: { files: [{ name: "original-alpha-title.png" }] } });
  const title = nodes(home, (node) => node.props?.["aria-label"] === "Titolo jewelry")[0];
  title.props.onChange({ target: { value: "Latest typed toolbar title" } });
  fixture.update({ menu_items: helpers.moveActiveMenuItem(fixture.draft.menu_items, "jewelry", 0).map((item) => item.id === "artworks" ? { ...item, visible: false } : item), menu_color: "#aabbcc" });
  home = fixture.home();
  const expectedOrder = ids(fixture.draft.menu_items);
  fixture.uploads.resolve("/new-original-alpha-title.png?token=UNCHANGED");
  await operation;
  assert.equal(fixture.draft.menu_items.find((item) => item.id === "jewelry").label, "Latest typed toolbar title", "a late PNG upload cannot overwrite text edited while it was pending");
  assert.deepEqual(ids(fixture.draft.menu_items), expectedOrder, "a late PNG upload preserves concurrent menu reordering");
  assert.equal(fixture.draft.menu_color, "#aabbcc");
  assert.equal(fixture.draft.menu_items.find((item) => item.id === "artworks").visible, false, "a late PNG upload preserves concurrent visibility changes");
  assert.equal(fixture.draft.menu_items.find((item) => item.id === "jewelry").image_url, "/new-original-alpha-title.png?token=UNCHANGED");
  const toolbar = fixture.toolbar({ section: "jewelry" });
  const toolbarInput = nodes(toolbar, (node) => node.props?.["aria-label"] === "Titolo della sezione")[0];
  assert.equal(toolbarInput.props.value, "Latest typed toolbar title");
  toolbarInput.props.onChange({ target: { value: "Toolbar edit remains text" } });
  assert.equal(fixture.draft.menu_items.find((item) => item.id === "jewelry").image_url, "/new-original-alpha-title.png?token=UNCHANGED", "editing toolbar text does not erase or replace the independent home PNG");
  assert.deepEqual(plain(fixture.draft.menu_items.find((item) => item.id === "fashion")), beforePresentation.menu_items[1], "all inline edits preserve the retired Fashion configuration");
}
{
  const fixture = componentFixture({ editing: true });
  const home = fixture.home();
  assert.equal(nodes(home, (node) => node.props?.["data-menu-entry"] === "fashion").length, 0, "inline editing never resurrects the retired standalone Fashion title");
  const upload = nodes(home, (node) => node.props?.["aria-label"] === "Immagine titolo jewelry")[0];
  const operation = upload.props.onChange({ target: { files: [{ name: "cancelled-original.png" }] } });
  const beforeCancel = plain(fixture.draft);
  fixture.setEditing(false); fixture.home();
  fixture.uploads.resolve("/should-not-overwrite-cancelled-title.png");
  await operation;
  assert.deepEqual(plain(fixture.draft), beforeCancel, "finishing a title upload after cancellation cannot rewrite settings or restore edit state");
}
console.log("PASS: Fashion retires from presentation only; active ordering/custom settings survive, menu PNGs and typed toolbar titles stay independent, including concurrent upload/text/order edits (no network/storage writes).");
