import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

function compile(source, require = () => { throw new Error("Unexpected dependency"); }) {
  const exports = {};
  const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  vm.runInNewContext(output, { exports, require, Map, Set, URL, console });
  return exports;
}
const helpers = compile(fs.readFileSync(new URL("../src/lib/siteMenu.ts", import.meta.url), "utf8"));
const ocean = compile(fs.readFileSync(new URL("../src/types/oceanEnvironment.ts", import.meta.url), "utf8"));
const oceanText = compile(fs.readFileSync(new URL("../src/types/oceanText.ts", import.meta.url), "utf8"));
let repository = fs.readFileSync(new URL("../src/services/siteContentRepository.ts", import.meta.url), "utf8");
repository = repository.replaceAll("import.meta.env.VITE_SITE_CONTENT_MODE", '"local"').replaceAll("import.meta.env.DEV", "true");
const api = compile(`${repository}\nexport { normalizeSettings };`, (id) => {
  if (id === "@/lib/supabase") return { supabase: {} };
  if (id === "@/lib/siteMenu") return helpers;
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
console.log("PASS: menu ordering survives normalization/save/reload; legacy/unknown/duplicate destinations, labels/images/visibility and editable Book List label are preserved (no network/storage writes).");
