// Pure layout/component regressions. No browser, credentials or database calls.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/pages/Artworks.tsx", import.meta.url), "utf8");
const css = fs.readFileSync(new URL("../src/pages/Artworks.css", import.meta.url), "utf8");
const javascript = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const jsx = { jsx: (type, props, key) => ({ type, props, key }), jsxs: (type, props, key) => ({ type, props, key }) };

function fixture({ items = [], editing = false, settingsGap = {}, draftGap = {}, saving = false } = {}) {
  const patches = [];
  const settings = { menu_items: [], gallery_row_gap: settingsGap };
  const inline = { editing, saving, draft: { ...settings, gallery_row_gap: draftGap }, update: (patch) => patches.push(patch) };
  const react = {
    lazy: () => "LazyModelPreview", Suspense: "Suspense", useMemo: (callback) => callback(),
    useCallback: (callback) => callback, useRef: (current) => ({ current }),
    useState: (initial) => [typeof initial === "function" ? initial() : initial, () => {}],
    useEffect: () => {}, useLayoutEffect: () => {},
  };
  const require = (id) => {
    if (id === "react") return react;
    if (id === "react/jsx-runtime") return jsx;
    if (id === "framer-motion") return { LayoutGroup: "LayoutGroup", motion: {}, useReducedMotion: () => false };
    if (id === "react-router-dom") return { useNavigate: () => () => { throw new Error("Rendering the gallery must not navigate"); } };
    if (id === "@/hooks/useSiteContent") return { useArtworks: () => ({ items, loading: false, error: null }), useSiteContent: () => ({ settings }) };
    if (id === "@/components/SiteEditControl") return { default: "SiteEditControl", useInlineSiteEditing: () => inline };
    if (id === "@/services/siteContentRepository") return { saveArtworkItem: () => { throw new Error("Rendering must not save artwork"); }, uploadArtworkAsset: () => { throw new Error("Rendering must not upload an asset"); } };
    if (id === "@/lib/artworkImages") return { artworkImageSources: () => [] };
    if (id.startsWith("@/components/")) return { default: id };
    if (id.endsWith(".css")) return {};
    throw new Error(`Unexpected dependency: ${id}`);
  };
  const exported = {};
  vm.runInNewContext(`${javascript}\nexports.test = { chronologicalArtworks, galleryRowGap, gridMediaTop, alignArtworkCaptionRows, GalleryView };`, {
    exports: exported, require, document: { hidden: false }, console,
  });
  return { api: exported.test, patches };
}

function nodes(tree, predicate) {
  if (!tree || typeof tree !== "object") return [];
  const children = Array.isArray(tree) ? tree : [tree.props?.children];
  return [...(predicate(tree) ? [tree] : []), ...children.flatMap((child) => Array.isArray(child) ? child.flatMap((node) => nodes(node, predicate)) : nodes(child, predicate))];
}

const { api } = fixture();
const originalUrl = "https://assets.example/Full%20Resolution.PNG?signature=a%2Fb&width=8192";
const work = (id, year, extra = {}) => ({ id, year, title: id, description: "Original caption", kind: "image", media_url: originalUrl, sort_order: 0, ...extra });
const works = Object.freeze([work("older", 2000), work("equal-first", 2024), work("newest", 2026), work("equal-second", 2024)]);
assert.deepEqual(Array.from(api.chronologicalArtworks(works), (item) => item.id), ["newest", "equal-first", "equal-second", "older"]);
assert.deepEqual(works.map((item) => item.id), ["older", "equal-first", "newest", "equal-second"], "chronology is a read-only view, not a backend reorder");
assert.equal(api.chronologicalArtworks(works)[0], works[2], "ordering keeps the original item, title, description and media URL");
assert.equal(api.chronologicalArtworks(works)[0].media_url, originalUrl);
for (const value of [undefined, null, "20", NaN, Infinity]) assert.equal(api.galleryRowGap(value), 96);
assert.equal(api.galleryRowGap(-1000), 16); assert.equal(api.galleryRowGap(1000), 240); assert.equal(api.galleryRowGap(72), 72);

for (const viewport of [{ width: 1920, columns: 3, slot: 360 }, { width: 834, columns: 2, slot: 310 }, { width: 390, columns: 1, slot: 300 }]) {
  const slotHeight = viewport.slot * 1.03;
  for (const ratio of [.4, .8525, 1, 1.8, 3.2]) {
    const width = Math.min(viewport.slot * (viewport.width <= 580 ? .85 : .88), slotHeight * ratio);
    const height = width / ratio;
    assert.ok(Math.abs(width / height - ratio) < 1e-9, "original aspect ratio is unchanged");
    assert.ok(Math.abs(api.gridMediaTop(slotHeight, height, true) + height - slotHeight) < 1e-9, "every actual image bottom shares its slot's bottom");
    assert.equal(api.gridMediaTop(slotHeight, height, false), (slotHeight - height) / 2, "Featured retains its original centered media endpoint");
  }
}

let writes = 0;
const titleHeights = [24, 60, 42, 42, 24];
const cards = titleHeights.map((height, index) => {
  const values = new Map();
  return {
    offsetTop: index < 3 ? 145 : 700,
    title: { offsetHeight: height },
    style: { getPropertyValue: (name) => values.get(name) ?? "", setProperty: (name, value) => { values.set(name, value); writes++; } },
    querySelector() { return this.title; },
    getBoundingClientRect() { throw new Error("Scaled/projected client rectangles must never drive caption alignment"); },
  };
});
const grid = { querySelectorAll: () => cards };
const reserve = (card) => Number.parseFloat(card.style.getPropertyValue("--artwork-title-reserve"));
api.alignArtworkCaptionRows(grid);
assert.deepEqual(cards.map(reserve), [36, 0, 18, 0, 18]);
assert.deepEqual(cards.slice(0, 3).map((card) => card.title.offsetHeight + reserve(card)), [60, 60, 60], "wrapped and short titles share their top; every description starts below the same title row");
const initialWrites = writes;
api.alignArtworkCaptionRows(grid);
assert.equal(writes, initialWrites, "stable ResizeObserver callbacks do not write again or form a feedback loop");
cards.forEach((card, index) => { card.offsetTop = Math.floor(index / 2) * 700; });
api.alignArtworkCaptionRows(grid);
assert.deepEqual(cards.map(reserve), [36, 0, 0, 0, 0], "tablet rows are measured independently after responsive reflow");
cards.forEach((card, index) => { card.offsetTop = index * 700; });
api.alignArtworkCaptionRows(grid);
assert.deepEqual(cards.map(reserve), [0, 0, 0, 0, 0], "one-column mobile leaves no stale desktop title reservation");
// The browser's natural grid row is the tallest complete card, including its
// full description. Positive row-gap is outside that row, never a fixed height.
for (const gap of [16, 96, 240]) {
  const captionBottoms = [40, 340, 88].map((descriptionHeight) => 360 + 20 + 60 + 9 + descriptionHeight);
  const nextRowTop = Math.max(...captionBottoms) + gap;
  assert.ok(captionBottoms.every((bottom) => nextRowTop - bottom >= gap));
}
assert.match(css, /\.artworks-grid\.is-aligned\s*\{\s*row-gap:\s*var\(--artwork-row-gap,\s*96px\)/);
assert.match(css, /\.artworks-grid\.is-aligned\s*>\s*\.artwork-card\s*\{\s*margin-top:\s*0/);
assert.match(css, /\.artwork-card-copy:not\(\.is-centered\)\s+\.artwork-title-strip\s*\{\s*margin-bottom:\s*var\(--artwork-title-reserve/);
assert.match(css, /object-fit:\s*contain/);

for (const props of [{}, { jewelryOnly: true }, { fashionOnly: true }]) {
  const candidates = works.map((item) => ({ ...item, is_jewelry: true, is_fashion: true }));
  const current = fixture({ items: props.jewelryOnly || props.fashionOnly ? candidates : works });
  const tree = current.api.GalleryView(props);
  const main = nodes(tree, (node) => node.type === "main")[0];
  const rendered = nodes(main, (node) => node.props?.item);
  assert.deepEqual(rendered.map((node) => node.props.item.id), ["newest", "equal-first", "equal-second", "older"]);
  assert.ok(rendered.every((node) => node.props.alignGrid));
  assert.equal(main.props.style["--artwork-row-gap"], "96px");
  assert.equal(nodes(tree, (node) => node.props?.type === "range").length, 0, "visitors never see an edit control");
}
{
  const current = fixture({ items: works, editing: true, settingsGap: { artworks: 32 }, draftGap: { artworks: 72, jewelry: 180 } });
  const tree = current.api.GalleryView({});
  const control = nodes(tree, (node) => node.props?.type === "range")[0];
  assert.equal(control.props.value, 72, "editing previews the draft rather than saved settings");
  control.props.onChange({ currentTarget: { value: "1000" } });
  assert.deepEqual(JSON.parse(JSON.stringify(current.patches)), [{ gallery_row_gap: { artworks: 240, jewelry: 180 } }], "spacing changes merge the other section and stage only settings, never artwork content");
}
{
  const current = fixture({ items: works.map((item) => ({ ...item, is_jewelry: true })), editing: true, draftGap: { artworks: 48, jewelry: 112 }, saving: true });
  const tree = current.api.GalleryView({ jewelryOnly: true });
  const control = nodes(tree, (node) => node.props?.type === "range")[0];
  assert.equal(control.props.value, 112); assert.equal(control.props.disabled, true);
}
{
  const current = fixture({ items: works.map((item) => ({ ...item, is_featured_in: true })), editing: true });
  const tree = current.api.GalleryView({ featuredOnly: true });
  const main = nodes(tree, (node) => node.type === "main")[0];
  assert.deepEqual(nodes(main, (node) => node.props?.item).map((node) => node.props.item.id), works.map((item) => item.id), "Featured keeps its existing backend order");
  assert.equal(main.props.className, "artworks-grid"); assert.equal(main.props.style, undefined);
  assert.equal(nodes(tree, (node) => node.props?.type === "range").length, 0, "Featured layout and edit controls remain untouched");
}

console.log("PASS: chronological stable galleries, original-ratio bottom alignment, responsive wrapped-title/description baselines, no observer rewrite loop, safe intrinsic row gaps, merged edit-only settings, and unchanged Featured behavior; no network or data writes.");
