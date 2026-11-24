// Pure page-view plans plus the actual viewer's cancellable deck ownership.
// No browser/network/assets or real comments are touched.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";
import postcss from "postcss";
import selectorParser from "postcss-selector-parser";

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
const viewerAttributes = new Map();
function visit(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) variables.set(node.name.text, node.initializer);
  if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer) && node.initializer.expression) {
    const expression = node.initializer.expression;
    if (node.name.text === "onChangeState") viewerAttributes.set("onChangeState", expression);
    if (node.name.text === "className" && expression.getText(ast).includes("public-book-viewport ")) viewerAttributes.set("viewportClass", expression);
  }
  ts.forEachChild(node, visit);
}
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

// Evaluate the real folding callback and CSS together. This is a small
// overflow-only cascade fixture, not a substitute for painted browser QA.
const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
const viewCss = postcss.parse(read("src/components/books/bookViewMode.css"));
const deckCss = postcss.parse(read("src/components/books/BookDeckViewport.css"));
const overflowRules = [];
for (const stylesheet of [viewCss, deckCss]) stylesheet.walkRules((rule) => {
  const declarations = rule.nodes.filter((node) => node.type === "decl" && /^overflow(?:-[xy])?$/.test(node.prop));
  if (declarations.length) overflowRules.push({ selectors: selectorParser().astSync(rule.selector).nodes, declarations });
});
function matchesCompound(nodes, element) {
  return nodes.every((node) => {
    if (node.type === "class") return element.classes.has(node.value);
    if (node.type === "attribute") {
      assert.ok(!node.operator || node.operator === "=", "overflow fixture must support the actual attribute operator");
      return node.operator ? element.attributes[node.attribute] === node.value : node.attribute in element.attributes;
    }
    if (node.type === "pseudo" && node.value === ":not") return !node.nodes.some((selector) => matchesSelector(selector, element));
    if (node.type === "universal") return true;
    throw new Error(`Unsupported selector in overflow fixture: ${node.toString()}`);
  });
}
function matchesSelector(selector, element) {
  const parts = [[]];
  for (const node of selector.nodes) {
    if (node.type !== "combinator") parts.at(-1).push(node);
    else {
      assert.equal(node.value.trim(), "", "overflow fixture only needs descendant combinators");
      parts.push([]);
    }
  }
  const visitPart = (index, target) => {
    if (!target || !matchesCompound(parts[index], target)) return false;
    if (index === 0) return true;
    for (let ancestor = target.parent; ancestor; ancestor = ancestor.parent) if (visitPart(index - 1, ancestor)) return true;
    return false;
  };
  return visitPart(parts.length - 1, element);
}
function specificity(selector) {
  return selector.nodes.reduce((total, node) => total + (node.type === "class" || node.type === "attribute" ? 100 : node.type === "pseudo" && node.value === ":not" ? Math.max(...node.nodes.map(specificity)) : 0), 0);
}
function overflow(element) {
  // The real viewport class expression includes Tailwind's overflow-hidden.
  const axes = { x: "visible", y: "visible" }, priorities = { x: -1, y: -1 };
  if (element.classes.has("overflow-hidden")) { axes.x = axes.y = "hidden"; priorities.x = priorities.y = 100; }
  for (const rule of overflowRules) {
    const matching = rule.selectors.filter((selector) => matchesSelector(selector, element));
    if (!matching.length) continue;
    for (const declaration of rule.declarations) {
      const priority = Math.max(...matching.map(specificity)) + (declaration.important ? 1000000 : 0);
      for (const axis of ["x", "y"]) if ((declaration.prop === "overflow" || declaration.prop === `overflow-${axis}`) && priority >= priorities[axis]) {
        axes[axis] = declaration.value;
        priorities[axis] = priority;
      }
    }
  }
  return [axes.x, axes.y];
}
const element = (classes, parent = null, attributes = {}) => ({ classes: new Set(classes.split(/\s+/)), parent, attributes });
let folded = false;
const foldContext = vm.createContext({
  foldShadowActive: false, magnifierOpen: false, commentMode: false, canManageComments: false,
  commentsIdle: false, zoomCommentsHidden: false, commentDraft: null,
  pageFlipBusyRef: { current: false }, imageScheduler: { setBusy() {} },
  followNativeFold() {}, flushPendingResize() {}, restartCommentIdle() {}, clearTapTimer() {},
  setFoldShadowActive(value) { folded = value; foldContext.foldShadowActive = value; },
});
const evaluateFold = (source) => vm.runInContext(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, foldContext);
evaluateFold(`globalThis.changeState = ${viewerAttributes.get("onChangeState").getText(ast)}`);
const viewportClass = viewerAttributes.get("viewportClass").getText(ast);
for (const mode of ["double", "single"]) for (const magnified of [false, true]) {
  foldContext.magnifierOpen = magnified;
  // Both spring-back and a completed flip must close the masks again at read.
  for (const state of ["read", "fold_corner", "read", "user_fold", "flipping", "read"]) {
    foldContext.changeState({ data: state, object: engine });
    assert.equal(folded, state !== "read", `${state} controls the real visual fold class independently of native busy state`);
    const deck = element("book-deck-viewport");
    const viewport = element(evaluateFold(viewportClass), deck, { "data-book-view-mode": mode });
    const paperWindow = element("book-page-clip", viewport);
    const open = mode === "single" || (!magnified && state !== "read");
    assert.equal(viewport.classes.has("is-page-folding"), folded);
    assert.deepEqual(overflow(viewport), open ? ["visible", "visible"] : ["hidden", "hidden"], `${mode}, magnified=${magnified}, ${state}: outer mask`);
    assert.deepEqual(overflow(paperWindow), open ? ["visible", "visible"] : ["hidden", "hidden"], `${mode}, magnified=${magnified}, ${state}: book rectangle`);
    assert.deepEqual(overflow(deck), ["hidden", "hidden"], "offscreen neighbouring books remain clipped by the deck during every fold state");
  }
}
assert.deepEqual(overflow(element("book-page-clip")), ["hidden", "hidden"], "a clip outside this viewer never receives the folding override");

// The fix opens ancestor overflow only: page-image cropping, native sheet
// polygons, and the independently clipped fold shadows must stay intact.
viewCss.walkDecls(/^(?:clip|clip-path|-webkit-clip-path)$/, (declaration) => assert.fail(`View CSS must not replace native fold clipping: ${declaration.toString()}`));
assert.match(read("node_modules/page-flip/src/Page/HTMLPage.ts"), /clip-path: \$\{polygon\}; -webkit-clip-path: \$\{polygon\};/, "native soft sheets retain their calculated polygon mask");
const nativeRender = read("node_modules/page-flip/src/Render/HTMLRender.ts");
assert.ok((nativeRender.match(/clip-path: \$\{polygon\};/g) ?? []).length >= 4, "both native soft-page shadows retain normal and WebKit polygon clipping");
assert.match(viewerSource, /className="pointer-events-none h-full w-full select-none object-cover object-center"/, "page images keep their existing in-sheet crop");
console.log("Book view mode: covers/even-leaf sequence, view plans, preferences, native folding-state clipping, magnifier/deck masks, native sheet/shadow polygons, zoom exit and deck ownership passed.");
