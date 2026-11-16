// Pure presentation ordering: no credentials, database, DOM or network.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/lib/artworkOrder.ts", import.meta.url), "utf8");
const api = {};
vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: api });
const plain = (value) => JSON.parse(JSON.stringify(value));
const ids = (items) => Array.from(items, (item) => item.id);
const item = (id, year) => Object.freeze({ id, year, title: `Original ${id}`, media_url: `/original/${id}.png`, description: "Original description", sort_order: 900, is_published: true });
const works = Object.freeze([item("old", 2000), item("a", 2024), item("new", 2026), item("b", 2024), item("c", 2024)]);
const baseline = plain(works);
assert.deepEqual(ids(api.orderGalleryArtworks(works)), ["new", "a", "b", "c", "old"]);
assert.deepEqual(ids(api.orderGalleryArtworks(works, ["old", "c", "a", "new", "b"])), ["new", "c", "a", "b", "old"], "year always wins, regardless of the saved ID sequence");
assert.deepEqual(ids(api.orderGalleryArtworks(works, ["b", "unknown"])), ["new", "b", "a", "c", "old"], "new or unranked peers retain their backend order after configured peers");
let moved = api.reorderGalleryArtwork(works, ["old", "hidden-unpublished", "new"], "c", "a");
assert.equal(moved.changed, true);
assert.deepEqual(ids(api.orderGalleryArtworks(works, moved.order)), ["new", "c", "a", "b", "old"]);
assert.ok(moved.order.includes("hidden-unpublished"), "hidden or unpublished IDs are retained, not interpreted as catalogue deletions");
moved = api.reorderGalleryArtwork(works, moved.order, "c", "b");
assert.deepEqual(ids(api.orderGalleryArtworks(works, moved.order)), ["new", "a", "b", "c", "old"], "downward and upward moves land in the intended same-year position");
for (const [sourceId, targetId, reason] of [["a", "old", "different-year"], ["new", "b", "different-year"], ["missing", "a", "missing"]]) {
  const order = Object.freeze(["b", "a", "hidden-unpublished"]);
  const result = api.reorderGalleryArtwork(works, order, sourceId, targetId);
  assert.equal(result.changed, false); assert.equal(result.reason, reason);
  assert.deepEqual(plain(result.order), plain(order), "a forbidden move cannot alter manual preferences");
}
assert.equal(api.reorderGalleryArtwork(works, [], "a", "a").changed, false);
assert.deepEqual(plain(works), baseline, "no operation mutates a title, year, ID, original image, publication state or backend sort_order");
assert.ok(api.orderGalleryArtworks(works).every((work) => works.includes(work)), "original record references survive ordering");
assert.deepEqual(plain(api.normalizeGalleryItemOrder({ artworks: ["a", "a", null, "", 42, " b "], jewelry: [], other: ["ignore"] })), { artworks: ["a", "b"], jewelry: [] });
for (const value of [undefined, null, [], 5, "order"]) assert.deepEqual(plain(api.normalizeGalleryItemOrder(value)), {});
assert.deepEqual(plain(api.normalizeGalleryItemOrder({ artworks: "invalid" })), {});
for (let length = 2; length <= 25; length++) {
  const catalogue = Array.from({ length }, (_, index) => item(`work-${index}`, 2026 - index % 4));
  let order = [];
  for (const year of [2026, 2025, 2024, 2023]) {
    const peers = catalogue.filter((work) => work.year === year);
    if (peers.length > 1) order = api.reorderGalleryArtwork(catalogue, order, peers.at(-1).id, peers[0].id).order;
  }
  const ordered = api.orderGalleryArtworks(catalogue, order);
  assert.equal(new Set(ids(ordered)).size, length);
  assert.equal(ordered.length, catalogue.length);
  assert.ok(ordered.every((work, index) => index === 0 || ordered[index - 1].year >= work.year));
}
console.log("PASS: manual order remains a within-year tie-break, guarded same-year moves, stable new-item fallback, hidden-ID retention and unchanged product originals; no writes/network.");
