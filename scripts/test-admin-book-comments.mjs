// Isolated component regression checks. Repository writes and React effects are
// mocked: running this script never reads auth, browser drafts or remote data.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import ts from "typescript";
import React from "react";

const require = createRequire(import.meta.url);
const richExports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL("../src/lib/bookRichText.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: richExports });
const source = fs.readFileSync(new URL("../src/components/admin/AdminBookCommentsManager.tsx", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
const comments = [
  { id: "c1", book_id: "b1", book_page_id: "p1", body: "Commento visibile", is_visible: true, created_at: "2026-11-14T10:00:00Z", updated_at: "", anchor_x: .2, anchor_y: .3, created_by: null },
  { id: "c2", book_id: "b2", book_page_id: "p2", title: "Titolo ricercabile", body: "Commento nascosto", is_visible: false, created_at: "2026-11-14T11:00:00Z", updated_at: "", anchor_x: .2, anchor_y: .3, created_by: null },
];
const states = [comments, {}, false, null, "all", "all", "", null, {}, {}, { p2: { page_number: 7, file_name: "07.jpg" } }, false];
let stateIndex = 0;
let refIndex = 0;
const refs = [];
const calls = { save: [], delete: [] };
let confirmed = false;
let failSave = false;
const hooks = {
  ...React,
  useState(initial) {
    const index = stateIndex++;
    if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial;
    return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value; }];
  },
  useMemo: (fn) => fn(),
  useCallback: (fn) => fn,
  useEffect: () => {},
  useRef(initial) { const index = refIndex++; return refs[index] ??= { current: initial }; },
};
const exported = {};
vm.runInNewContext(js, {
  exports: exported,
  window: { confirm: () => confirmed },
  require: (id) => {
    if (id === "react") return hooks;
    if (id === "react/jsx-runtime") return require("react/jsx-runtime");
    if (id.endsWith(".css")) return {};
    if (id.endsWith("/BookRichTextEditor")) return { default: function RichEditorMock(props) { return React.createElement("textarea", { value: props.body, disabled: props.disabled, "aria-label": props.label, onChange: (event) => props.onChange(event.target.value, richExports.bookRichFromText(event.target.value)) }); } };
    if (id.endsWith("/BookRichText")) return { default: (props) => React.createElement("p", { "data-rich": props.value }, props.body) };
    if (id.endsWith("/bookRepository")) return { listBookPages: async () => [] };
    if (id.endsWith("/bookCommentRepository")) return {
      listAdminBookComments: async () => comments,
      updateBookComment: async (id, input) => {
        calls.save.push({ id, input });
        if (failSave) throw new Error("Connessione interrotta");
        const old = states[0].find((item) => item.id === id);
        return { ...old, ...(input.title === undefined ? {} : { title: input.title }), ...(input.richContent === undefined ? {} : { rich_content: input.richContent }), body: input.body.trim(), background_color: input.backgroundColor, background_opacity: input.backgroundOpacity, font_size: input.fontSize, text_color: input.textColor, is_visible: input.isVisible };
      },
      deleteBookComment: async (id) => { calls.delete.push(id); },
    };
    throw new Error(`Unexpected dependency: ${id}`);
  },
});
const props = { books: [{ id: "b1", title: "Alfa" }, { id: "b2", title: "Beta" }], selectedBookId: "b1", selectedPages: [{ id: "p1", book_id: "b1", page_number: 3, file_name: "03.jpg" }] };
function render() { stateIndex = refIndex = 0; return exported.default(props); }
function nodes(node, predicate) {
  const result = [];
  function visit(item) {
    if (Array.isArray(item)) return item.forEach(visit);
    if (!item || typeof item !== "object") return;
    if (predicate(item)) result.push(item);
    visit(item.props?.children);
    if (typeof item.type === "function") visit(item.type(item.props));
  }
  visit(node);
  return result;
}
const cards = (tree) => nodes(tree, (node) => node.type === "details" && node.props.className.includes("admin-comment-card"));
const card = (tree, id) => cards(tree).find((node) => node.key === id);
const control = (tree, type) => nodes(tree, (node) => node.type === type)[0];
const text = (node) => typeof node === "string" ? node : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";
const flush = async () => { for (let i = 0; i < 5; i++) await Promise.resolve(); };

let tree = render();
assert.equal(cards(tree).length, 2, "all comments include hidden records");
assert.ok(text(tree).includes("Alfa · Pagina 3"));
assert.ok(text(tree).includes("Beta · Pagina 7"));
assert.equal(nodes(card(tree, "c1"), (node) => node.type === "input" && node.props.type === "text")[0].props.value, "", "legacy comments have no title");
assert.equal(nodes(card(tree, "c1"), (node) => node.type === "h3").length, 0, "optional title does not reserve a heading");
nodes(tree, (node) => node.type === "input" && node.props.type === "search")[0].props.onChange({ target: { value: "ricercabile" } });
assert.equal(cards(render()).length, 1, "search includes saved comment titles");
nodes(render(), (node) => node.type === "input" && node.props.type === "search")[0].props.onChange({ target: { value: "" } });
tree = render();
assert.equal(nodes(card(tree, "c1"), (node) => node.type === "input" && node.props.type === "range")[0].props.value, 75, "legacy comments default to 75% background opacity");
assert.equal(nodes(card(tree, "c1"), (node) => node.props?.["aria-label"] === "Dimensione testo commento")[0].props.value, 14, "legacy comments default to 14px text");
nodes(tree, (node) => node.type === "select")[0].props.onChange({ target: { value: "selected" } });
assert.equal(cards(render()).length, 1);
nodes(render(), (node) => node.type === "select")[0].props.onChange({ target: { value: "all" } });
nodes(render(), (node) => node.type === "select")[1].props.onChange({ target: { value: "visible" } });
tree = render();
assert.equal(cards(tree).length, 1);
nodes(card(tree, "c1"), (node) => node.type === "input" && node.props.type === "range")[0].props.onChange({ target: { value: "35" } });
nodes(card(render(), "c1"), (node) => node.props?.["aria-label"] === "Dimensione testo commento")[0].props.onChange({ target: { value: "28" } });
nodes(card(render(), "c1"), (node) => node.type === "input" && node.props.type === "text")[0].props.onChange({ target: { value: "  Titolo personale  " } });
tree = render();
const preview = nodes(card(tree, "c1"), (node) => node.props?.className === "admin-comment-preview")[0];
assert.ok(preview.props.style.backgroundColor.endsWith(", 0.35)"));
assert.equal(preview.props.style.color, "#414A51");
assert.equal(preview.props.style.opacity, undefined, "background alpha never fades the text");
assert.equal(preview.props.style.fontSize, 28);
assert.equal(text(control(preview, "h3")), "  Titolo personale  ");
nodes(card(tree, "c1"), (node) => node.type === "input" && node.props.type === "checkbox")[0].props.onChange({ target: { checked: false } });
tree = render();
assert.equal(cards(tree).length, 1, "staged visibility keeps Save reachable");
assert.equal(calls.save.length, 0, "staging never autosaves");
control(card(tree, "c1"), "form").props.onSubmit({ preventDefault() {} });
await flush();
assert.equal(calls.save.length, 1);
assert.equal(calls.save[0].input.isVisible, false);
assert.equal(calls.save[0].input.backgroundOpacity, .35);
assert.equal(calls.save[0].input.fontSize, 28);
assert.equal(calls.save[0].input.title, "Titolo personale");
assert.equal(cards(render()).length, 0, "saved visibility updates filters");
nodes(render(), (node) => node.type === "select")[1].props.onChange({ target: { value: "all" } });
control(card(render(), "c2"), "textarea").props.onChange({ target: { value: "Bozza da annullare" } });
nodes(card(render(), "c2"), (node) => node.type === "input" && node.props.type === "text")[0].props.onChange({ target: { value: "Titolo da annullare" } });
nodes(card(render(), "c2"), (node) => node.type === "input" && node.props.type === "range")[0].props.onChange({ target: { value: "50" } });
nodes(card(render(), "c2"), (node) => node.props?.["aria-label"] === "Dimensione testo commento")[0].props.onChange({ target: { value: "42" } });
nodes(card(render(), "c2"), (node) => node.type === "button" && text(node) === "Annulla")[0].props.onClick();
assert.equal(control(card(render(), "c2"), "textarea").props.value, "Commento nascosto");
assert.equal(nodes(card(render(), "c2"), (node) => node.type === "input" && node.props.type === "text")[0].props.value, "Titolo ricercabile");
assert.equal(nodes(card(render(), "c2"), (node) => node.type === "input" && node.props.type === "range")[0].props.value, 75, "cancel restores opacity");
assert.equal(nodes(card(render(), "c2"), (node) => node.props?.["aria-label"] === "Dimensione testo commento")[0].props.value, 14, "cancel restores font size");
control(card(render(), "c2"), "textarea").props.onChange({ target: { value: "Bozza da conservare" } });
nodes(card(render(), "c2"), (node) => node.type === "input" && node.props.type === "text")[0].props.onChange({ target: { value: "Titolo da conservare" } });
failSave = true;
control(card(render(), "c2"), "form").props.onSubmit({ preventDefault() {} });
await flush();
assert.equal(control(card(render(), "c2"), "textarea").props.value, "Bozza da conservare");
assert.equal(nodes(card(render(), "c2"), (node) => node.type === "input" && node.props.type === "text")[0].props.value, "Titolo da conservare");
assert.ok(text(card(render(), "c2")).includes("Connessione interrotta"));
const remove = () => nodes(card(render(), "c2"), (node) => node.type === "button" && text(node) === "Elimina")[0].props.onClick();
remove();
await flush();
assert.equal(calls.delete.length, 0, "delete requires confirmation");
confirmed = true;
remove();
await flush();
assert.deepEqual(calls.delete, ["c2"]);
assert.equal(cards(render()).length, 1);
failSave = false;
nodes(card(render(), "c1"), (node) => node.type === "input" && node.props.type === "text")[0].props.onChange({ target: { value: "" } });
control(card(render(), "c1"), "form").props.onSubmit({ preventDefault() {} });
await flush();
assert.equal(calls.save.at(-1).input.title, null, "existing titles can be cleared");
assert.equal(nodes(card(render(), "c1"), (node) => node.type === "h3").length, 0);
nodes(card(render(), "c1"), (node) => node.props?.["aria-label"] === "Dimensione testo commento")[0].props.onChange({ target: { value: "29" } });
control(card(render(), "c1"), "form").props.onSubmit({ preventDefault() {} });
await flush();
assert.equal(Object.hasOwn(calls.save.at(-1).input, "title"), false, "unchanged blank titles stay omitted for legacy compatibility");
const formatted = richExports.alignBookRichSelection(richExports.markBookRichSelection(richExports.bookRichFromText("Testo scelto\nSecondo paragrafo"), { start: 0, end: 5 }, "bold"), { start: 13, end: 13 }, "right");
const editor = nodes(card(render(), "c1"), (node) => node.props?.body !== undefined && typeof node.props?.onChange === "function")[0];
const beforeFormatSave = calls.save.length;
editor.props.onChange(richExports.bookRichText(formatted), formatted);
assert.equal(calls.save.length, beforeFormatSave, "rich formatting stays staged until Save");
control(card(render(), "c1"), "form").props.onSubmit({ preventDefault() {} });
await flush();
assert.equal(calls.save.at(-1).input.richContent.paragraphs[0].runs[0].bold, true);
assert.equal(calls.save.at(-1).input.richContent.paragraphs[1].align, "right");
nodes(card(render(), "c1"), (node) => node.props?.["aria-label"] === "Dimensione testo commento")[0].props.onChange({ target: { value: "30" } });
control(card(render(), "c1"), "form").props.onSubmit({ preventDefault() {} });
await flush();
assert.equal(Object.hasOwn(calls.save.at(-1).input, "richContent"), false, "unrelated edits preserve existing rich JSON unchanged");
states[0] = Array.from({ length: 35 }, (_, index) => ({ ...comments[0], id: `more-${index}`, body: `Commento ${index}` }));
assert.equal(cards(render()).length, 30, "long lists render in mobile-friendly batches");
nodes(render(), (node) => node.type === "button" && node.props.className === "admin-comments-more")[0].props.onClick();
assert.equal(cards(render()).length, 35, "every loaded comment remains accessible");
console.log("PASS: admin comment optional titles/search/clear, filters, page labels, opacity/font, staged saves, cancel/error recovery, confirmed delete and long-list paging (all writes mocked).");
