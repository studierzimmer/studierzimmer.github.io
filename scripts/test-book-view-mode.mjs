// Pure page-view plans plus the actual viewer's cancellable deck ownership.
// No browser/network/assets or real comments are touched.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const helperSource = fs.readFileSync(new URL("../src/components/books/bookViewMode.ts", import.meta.url), "utf8");
const exports = {}, store = new Map(), events = [];
const scope = { exports, window: { localStorage: { getItem: (key) => store.get(key), setItem: (key, value) => store.set(key, value) }, dispatchEvent: (event) => events.push(event) }, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } } };
vm.runInNewContext(ts.transpileModule(helperSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, scope);
const { bookSpreadStart, bookSpreadLeaves, bookLeafSide, bookFoldViewOffset, bookViewDragOffset, commitsBookViewDrag, normalizeBookPointerCoordinates, guardBookNativeTap, bookSingleViewScale, planBookPageTurn, readBookViewMode, saveBookViewMode, BOOK_VIEW_MODE_KEY, BOOK_VIEW_MODE_EVENT } = exports;
assert.equal(readBookViewMode(), "double");
saveBookViewMode("single");
assert.equal(store.get(BOOK_VIEW_MODE_KEY), "single"); assert.equal(readBookViewMode(), "single");
assert.equal(events.at(-1).type, BOOK_VIEW_MODE_EVENT); assert.equal(events.at(-1).detail, "single");
scope.window.localStorage.getItem = () => { throw new Error("blocked private storage"); };
assert.equal(readBookViewMode(), "single", "blocked storage retains the last session preference");
scope.window.localStorage.setItem = () => { throw new Error("blocked private storage"); };
assert.doesNotThrow(() => saveBookViewMode("single"));
assert.equal(events.at(-1).detail, "single", "session event is still emitted when persistence is blocked");
const freshPreference = (width, stored) => {
  const freshExports = {}, viewport = { innerWidth: width, localStorage: { getItem: () => stored } };
  vm.runInNewContext(ts.transpileModule(helperSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: freshExports, window: viewport });
  return { preference: freshExports.readBookViewMode, viewport };
};
const mobile = freshPreference(390); assert.equal(mobile.preference(), "single");
mobile.viewport.innerWidth = 1440; assert.equal(mobile.preference(), "single", "initial adaptive mode is not reset on resize/rotation");
assert.equal(freshPreference(767).preference(), "single"); assert.equal(freshPreference(768).preference(), "double");
assert.equal(freshPreference(390, "double").preference(), "double", "explicit desktop-like preference overrides mobile default");
assert.equal(freshPreference(1440, "single").preference(), "single", "explicit single preference overrides desktop default");
for (const count of [1, 2, 8, 9, 40]) {
  for (let leaf = 0; leaf < count; leaf++) {
    assert.ok(bookSpreadLeaves(leaf, count).includes(leaf));
    const next = planBookPageTurn(leaf, true, count, "single");
    const previous = planBookPageTurn(leaf, false, count, "single");
    assert.equal(next.leaf, Math.min(count - 1, leaf + 1));
    assert.equal(previous.leaf, Math.max(0, leaf - 1));
    if (next.action === "view") assert.equal(bookSpreadStart(next.leaf), bookSpreadStart(leaf));
    if (previous.action === "view") assert.equal(bookSpreadStart(previous.leaf), bookSpreadStart(leaf));
    assert.equal(bookLeafSide(leaf, count), count === 1 ? 0 : leaf === 0 || leaf % 2 === 0 ? 1 : 0);
  }
}
assert.equal(planBookPageTurn(1, true, 9, "double").leaf, 3);
assert.equal(planBookPageTurn(2, true, 9, "double").leaf, 3, "even leaf memory normalizes only its physical spread for a new turn");
assert.equal(planBookPageTurn(3, false, 9, "single").leaf, 2);
assert.equal(planBookPageTurn(0, false, 9, "single").action, "none");
assert.equal(planBookPageTurn(8, true, 9, "single").action, "none");
assert.equal(bookSingleViewScale({ width: 150, height: 210 }, { width: 300, height: 720 }), 2);
assert.equal(bookSingleViewScale({ width: 150, height: 210 }, { width: 900, height: 420 }), 2);
assert.equal(bookFoldViewOffset(2, 9, 400, true, 0), -400);
assert.equal(bookFoldViewOffset(2, 9, 400, true, 50), -200);
assert.equal(bookFoldViewOffset(2, 9, 400, true, 100), 0);
assert.equal(bookFoldViewOffset(3, 9, 400, false, 50), -200);
assert.equal(bookFoldViewOffset(3, 9, 400, false, 100), -400);
assert.equal(bookViewDragOffset(0, -400, -200, 2).value, -100);
assert.equal(bookViewDragOffset(0, -400, 200, 2).progress, 0, "wrong-way drag never moves away from source");
assert.equal(commitsBookViewDrag(.26, 0, -400), true);
assert.equal(commitsBookViewDrag(.08, -.4, -400), true);
assert.equal(commitsBookViewDrag(.08, .4, -400), false);
assert.equal(commitsBookViewDrag(.02, -.8, -400), false, "tiny jitter never commits on velocity alone");
const originalCoordinates = () => ({ x: -1, y: -1 });
const ui = { getMousePos: originalCoordinates, getDistElement: () => ({ offsetWidth: 400, offsetHeight: 600, getBoundingClientRect: () => ({ left: 100, top: 50, width: 800, height: 1200 }) }) };
const restore = normalizeBookPointerCoordinates(ui);
assert.equal(ui.getMousePos(500, 650).x, 200); assert.equal(ui.getMousePos(500, 650).y, 300);
restore(); assert.equal(ui.getMousePos, originalCoordinates);
let nativeSwipe = null, nativeState = "read";
const engine = { userStop: (_point, swipe) => { nativeSwipe = swipe; }, getState: () => nativeState };
const originalStop = engine.userStop, restoreTap = guardBookNativeTap(engine, () => true);
engine.userStop({ x: 0, y: 0 }); assert.equal(nativeSwipe, true, "custom page tap cannot trigger native corner tap as well");
nativeState = "user_fold"; engine.userStop({ x: 0, y: 0 }); assert.equal(nativeSwipe, false, "real native drag/spring-back is never suppressed");
restoreTap(); assert.equal(engine.userStop, originalStop);

const viewerSource = fs.readFileSync(new URL("../src/components/books/FoldingBookViewer.tsx", import.meta.url), "utf8");
const ast = ts.createSourceFile("FoldingBookViewer.tsx", viewerSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const variables = new Map();
function visit(node) { if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) variables.set(node.name.text, node.initializer); ts.forEachChild(node, visit); }
visit(ast);
let clears = 0;
const context = vm.createContext({
  book: { id: "active" }, commentMode: false,
  activeGestureRef: { current: { pointerId: 7, mode: "page" } },
  magnifierOpenRef: { current: false }, zoomClosingRef: { current: false }, focusedCommentRef: { current: null }, commentDraftRef: { current: null },
  lastTapRef: { current: { time: 99 } }, pageTurnIntentRef: { current: 12 }, suppressPageFlipRef: { current: false }, clearTapTimer: () => clears++,
});
vm.runInContext(`globalThis.claim = ${ts.transpileModule(variables.get("claimBookDrag").getText(ast), { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText}`, context);
const claim = (bookId = "active", pointerId = 7) => ({ detail: { bookId, pointerId }, defaultPrevented: false, preventDefault() { this.defaultPrevented = true; } });
const accepted = claim(); context.claim(accepted);
assert.equal(accepted.defaultPrevented, false); assert.equal(context.activeGestureRef.current, null);
assert.equal(context.pageTurnIntentRef.current, 13); assert.equal(context.lastTapRef.current.time, 0); assert.equal(context.suppressPageFlipRef.current, true); assert.equal(clears, 1);
for (const mode of ["pan", "zoom-slider"]) {
  context.activeGestureRef.current = { pointerId: 7, mode };
  const denied = claim(); context.claim(denied);
  assert.equal(denied.defaultPrevented, true); assert.equal(context.activeGestureRef.current.mode, mode, "doubletap zoom/pan retains pointer ownership");
}
context.activeGestureRef.current = { pointerId: 7, mode: "page" };
context.focusedCommentRef.current = "focus";
const focused = claim(); context.claim(focused); assert.equal(focused.defaultPrevented, true);
context.focusedCommentRef.current = null;
context.claim(claim("incoming")); assert.notEqual(context.activeGestureRef.current, null, "inactive book does not cancel another book's gesture");
context.claim(claim("active", 99)); assert.notEqual(context.activeGestureRef.current, null, "unrelated pointer is ignored");
const faces = variables.get("pageFaces").getText(ast);
assert.doesNotMatch(faces, /viewMode|currentPage|focusedComment/, "page view selection must not rebuild native page children");
assert.match(viewerSource, /data-book-page-clip="true"/);
assert.match(viewerSource, /aria-label="Esci dallo zoom"/);
assert.match(viewerSource, /event\.key !== "Escape" \|\| !magnifierOpenRef\.current/);
console.log("Book view mode: covers/even-leaf sequence, physical/view-only plans, session preference, clipping, explicit zoom exit and cancellable deck drag ownership passed.");
