import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const style = { fontFamily: "Portfolio Font", fontWeight: "650", fontStyle: "italic", fontSize: "14px", letterSpacing: ".21px" };
const textNode = (data, x, y, columns = 100) => ({ data, parentElement: { style }, x, y, columns });
const fromTitle = textNode("Il segno", 120, 208);
const toTitle = textNode("Il segno", 250, 100);
const fromBody = textNode("Una memoria 𝄞vive", 110, 245, 6);
const toBody = textNode("Una memoria 𝄞vive", 40, 170);
const root = (title, body) => ({ querySelector: (query) => ({ nodes: [query === ".book-rich-text" ? body : title] }) });
let probes = 0, removals = 0;
const document = {
  createTreeWalker: (element) => { let index = 0; return { nextNode: () => element.nodes[index++] ?? null }; },
  createElement: () => ({ style: {}, textContent: "", getBoundingClientRect: () => ({ top: 0 }), remove: () => removals++ }),
  body: { appendChild: () => probes++ },
  createRange: () => {
    let node, start = 0, end = 0, probe;
    return {
      setStart: (next, offset) => { node = next; start = offset; },
      setEnd: (_, offset) => { end = offset; },
      selectNodeContents: (next) => { probe = next; },
      getClientRects: () => Array.from({ length: Math.floor((end - 1) / node.columns) - Math.floor(start / node.columns) + 1 }, () => ({})),
      getBoundingClientRect: () => probe ? { top: 2 } : ({ left: node.x + start % node.columns * 8, top: node.y + Math.floor(start / node.columns) * 22, width: (end - start) * 8, height: 18 }),
    };
  },
};
const api = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync("src/components/books/commentTextMorph.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: api, document, NodeFilter: { SHOW_TEXT: 4 }, getComputedStyle: (element) => element.style });
const words = api.measureCommentWords(root(fromTitle, fromBody), root(toTitle, toBody), { left: 100, top: 200 }, { left: 0, top: 0 });
assert.ok(words.length > 10, "small and narrow-line words split, with no intermediate reflow");
assert.equal(words[0].text, "I");
assert.equal(words[0].fromX, 20);
assert.equal(words[0].fromY, 6, "font baseline probe reconciles absolute spans with native text ranges");
assert.equal(words[0].toX, 250);
assert.equal(words[0].toY, 98);
assert.equal(words[0].fontWeight, "650");
assert.equal(words[0].fontStyle, "italic");
assert.equal(probes, 1, "font metrics measured once per distinct style, not per glyph/frame");
assert.equal(removals, probes, "no probe DOM retained");
assert.equal(new Set(words.map(word => word.key)).size, words.length);
assert.ok(words.some(word => word.text.includes("𝄞")), "astral text kept intact rather than splitting surrogate halves");
for (const text of ["❤️", "e\u0301", "👩‍🎨", "🇮🇹"]) assert.deepEqual([...api.commentMorphGraphemes(text)], [text], "complete grapheme stays intact");
for (const word of words) {
  for (const coordinate of [[word.fromX, word.toX], [word.fromY, word.toY]]) {
    assert.equal(api.commentMorphPosition(...coordinate, 0), coordinate[0]);
    assert.equal(api.commentMorphPosition(...coordinate, 1), coordinate[1]);
    assert.equal(api.commentMorphPosition(...coordinate, .5), (coordinate[0] + coordinate[1]) / 2);
    assert.ok(Number.isFinite(api.commentMorphPosition(...coordinate, 1.03)), "elastic overshoot remains finite");
  }
}
const focus = fs.readFileSync("src/components/books/BookCommentFocusView.tsx", "utf8");
const css = fs.readFileSync("src/components/books/BookCommentFocusView.css", "utf8");
assert.doesNotMatch(focus + css, /\bopacity\s*[:=]|dangerouslySetInnerHTML/);
assert.match(focus, /progress\.get\(\) >= \.999\) measure\(\)/, "closing a scrolled reader starts from its real current text layout");
assert.match(focus, /animation\.current !== currentAnimation/, "interrupted/reversed animations cannot fire stale completion");
assert.match(focus, /visibility: reading \? "visible" : "hidden"/, "semantic text handoff, not a duplicate visible text/fade");
assert.match(css, /book-comment-focus-scroll[^}]*padding:32px/, "reader keeps its final layout throughout the morph");
console.log("PASS: stable word/glyph layouts, exact reversible endpoints, Unicode, marks, baseline metrics, shared progress, cleanup, no fading/HTML injection (mock DOM, no network).");
