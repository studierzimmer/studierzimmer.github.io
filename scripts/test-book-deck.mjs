// Deck/session/gesture/async regressions without a browser, real downloads,
// credentials, page-engine mutation, or remote writes.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
function compile(source, globals = {}) {
  const exported = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText, { exports: exported, AbortController, DOMException, console, ...globals });
  return exported;
}
const state = compile(read("src/components/books/bookDeckState.ts"));
const a = { id: "a", slug: "alpha", title: "Alpha" };
const b = { id: "b", slug: "beta", title: "Beta" };
const c = { id: "c", slug: "gamma", title: "Gamma" };
const books = [a, b, c];
assert.equal(state.adjacentDeckBook(books, "a", -1), null);
assert.equal(state.adjacentDeckBook(books, "b", -1), a);
assert.equal(state.adjacentDeckBook(books, "b", 1), c);
assert.equal(state.adjacentDeckBook(books, "c", 1), null);
assert.equal(state.adjacentDeckBook([a], "a", 1), null, "one backend book remains selectable without fake neighbours");
const stored = new Map();
const storage = { getItem: (key) => stored.get(key), setItem: (key, value) => stored.set(key, value) };
let memory = state.readBookPageMemory({ slug: "alpha", pageIndex: 7 }, storage);
assert.equal(memory.alpha, 7, "legacy single-book session migrates without losing page");
memory = state.rememberBookPage(memory, "beta", 11, storage);
memory = state.rememberBookPage(memory, "gamma", 0, storage);
const restored = state.readBookPageMemory(null, storage);
assert.equal(restored.alpha, 7); assert.equal(restored.beta, 11);
assert.equal(state.bookDeckEntry(restored, "beta", 30).page, 11);
assert.equal(state.bookDeckEntry(restored, "beta", 4).page, 3, "removed pages clamp remembered position");
assert.equal(state.bookDeckEntry(restored, "gamma", 10).autoOpen, false, "a visited closed book stays closed");
assert.equal(state.bookDeckEntry(restored, "new", 10).page, 0);
assert.equal(state.bookDeckEntry(restored, "new", 10).autoOpen, true, "unseen book first arrives closed, eligible only for later activation");
assert.equal(state.bookDeckEntry(restored, "new", 1).autoOpen, false);
const rightLeafMemory = state.rememberBookPage(restored, "right-leaf", 6, storage);
assert.equal(state.bookDeckEntry(rightLeafMemory, "right-leaf", 10).page, 6, "single-page right/even leaf is not rounded down to its spread start");
assert.equal(state.readBookPageMemory(null, storage)["right-leaf"], 6, "exact right leaf survives session reload");
assert.doesNotThrow(() => state.rememberBookPage(memory, "alpha", 9, { setItem() { throw new Error("private storage"); } }));
{
  const blockedWindow = {};
  Object.defineProperty(blockedWindow, "sessionStorage", { get() { throw new Error("blocked storage getter"); } });
  const blocked = compile(read("src/components/books/bookDeckState.ts"), { window: blockedWindow });
  assert.doesNotThrow(() => blocked.readBookPageMemory(null));
  assert.doesNotThrow(() => blocked.rememberBookPage({}, "alpha", 1));
}
assert.equal(state.commitsBookDeckSwipe(-80, 390), true);
assert.equal(state.commitsBookDeckSwipe(20, 390, 0), false);
assert.equal(state.commitsBookDeckSwipe(30, 390, .8), true);
assert.equal(state.commitsBookDeckSwipe(30, 390, -.8), false);
assert.ok(state.bookDeckReleaseVelocity(-.8, 390, 0) < 0);
assert.ok(Math.abs(state.bookDeckReleaseVelocity(-.8, 390, 600)) < .02, "a held finger loses stale last-segment momentum");
const freshMomentum = { direction: 1, velocity: -2, releasedAt: 100 };
assert.ok(state.bookDeckResumeVelocity(freshMomentum, 1, 150) < -1);
assert.equal(state.bookDeckResumeVelocity(freshMomentum, 1, 900), 0, "long asynchronous image preparation resumes from rest");
assert.equal(state.bookDeckResumeVelocity(freshMomentum, -1, 150), 0);
{
  const once = { current: false };
  assert.equal(state.consumeBookDeckBeckon(once, false, true, false, false), false);
  assert.equal(state.consumeBookDeckBeckon(once, true, false, false, false), false);
  assert.equal(state.consumeBookDeckBeckon(once, true, true, false, false), true);
  assert.equal(state.consumeBookDeckBeckon(once, true, true, false, false), false, "edge beckon never repeats across book changes");
  for (const [reduced, hidden] of [[true, false], [false, true]]) assert.equal(state.consumeBookDeckBeckon({ current: false }, true, true, reduced, hidden), false);
}
const rects = [{ left: 90, right: 300, top: 110, bottom: 700 }];
assert.equal(state.bookDeckHit({ x: 180, y: 300 }, rects), "page");
assert.equal(state.bookDeckHit({ x: 30, y: 300 }, rects), "previous");
assert.equal(state.bookDeckHit({ x: 350, y: 300 }, rects), "next");
assert.equal(state.bookDeckHit({ x: 180, y: 40 }, rects), "outside", "blank above a page is not a page-flip target");
{
  const window = { left: 200, right: 320, top: 100, bottom: 700 };
  const leftLeaf = { left: 80, right: 200, top: 100, bottom: 700 };
  const rightLeaf = { left: 200, right: 320, top: 100, bottom: 700 };
  const visible = [leftLeaf, rightLeaf].map((page) => state.clipBookPageRect(page, [window])).filter(Boolean);
  assert.equal(visible.length, 1, "the off-clipped leaf contributes no hit rectangle");
  assert.equal(state.bookDeckHit({ x: 150, y: 300 }, visible), "previous", "blank space over an off-clipped page belongs to the book gutter");
  assert.equal(state.bookDeckHit({ x: 250, y: 300 }, visible), "page");
  const partial = state.clipBookPageRect(rightLeaf, [window, { left: 230, right: 310, top: 150, bottom: 600 }]);
  assert.equal(partial.left, 230); assert.equal(partial.right, 310); assert.equal(partial.top, 150); assert.equal(partial.bottom, 600);
}

const prepare = compile(read("src/components/books/prepareBookDeck.ts")).prepareBookDeckPages;
const originals = Array.from({ length: 8 }, (_, index) => ({ public_url: `https://original.invalid/full-page-${index}.jpg?unchanged=1` }));
const images = []; let maxActive = 0; let active = 0;
class ImageStub {
  onload = null; onerror = null; value = "";
  set src(value) { this.value = value; if (value) { active++; maxActive = Math.max(maxActive, active); images.push(this); } }
  get src() { return this.value; }
  decode() { return Promise.resolve(); }
  load() { active--; this.onload?.(); }
}
const flush = async () => { for (let index = 0; index < 8; index++) await Promise.resolve(); };
{
  let ready = false;
  const pending = prepare(originals, 0, undefined, () => new ImageStub()).then(() => { ready = true; });
  assert.equal(images.length, 2);
  await flush(); assert.equal(ready, false, "a healthy slow original never falsely times out/activates");
  images[0].load(); images[1].load(); await flush();
  assert.equal(images.length, 3, "closed opening prewarms the exact cover/first spread only");
  images[2].load(); await pending;
  assert.equal(ready, true); assert.ok(maxActive <= 2);
  assert.ok(images.every((image) => originals.some((page) => page.public_url === image.src)), "no thumbnail transforms or URL rewriting");
}
{
  const controller = new AbortController();
  const first = images.length;
  const pending = prepare(originals, 5, controller.signal, () => new ImageStub());
  const canceled = assert.rejects(pending, /cancelled/);
  controller.abort(); await canceled;
  assert.ok(images.slice(first).every((image) => image.src === ""), "context cancellation releases speculative sources");
}
{
  const pending = prepare(originals, 1, undefined, () => { const image = new ImageStub(); image.decode = () => Promise.reject(new Error("corrupt")); return image; });
  const failed = assert.rejects(pending, /non è leggibile/);
  images.at(-2).load(); images.at(-1).load(); await failed;
}

class ElementStub { closest() { return null; } }
function deck({ disabled = false, zoomed = false, reduced = false, next = c, activeBook = b, incomingBook = null, incomingDirection = 1, locked = false, panes = [], pageRects = rects, clipRect = null, viewportRect = null, viewMode = "double", denyClaim = false, previousBookId = activeBook.id, progressValue = 0 } = {}) {
  let x; let captures = 0; let clock = 0;
  const selected = []; const effects = []; const layouts = []; const claims = []; const animations = [];
  const root = { clientWidth: 390, setPointerCapture() { captures++; }, dispatchEvent(event) { claims.push(event); if (denyClaim) event.preventDefault(); return !event.defaultPrevented; }, querySelectorAll: () => panes, querySelector(selector) { return selector.startsWith("[data-book-deck-id") ? { querySelectorAll: () => pageRects.map((rect) => ({ style: { display: "block" }, getBoundingClientRect: () => rect, closest: (selector) => { const bounds = selector === "[data-book-page-clip]" ? clipRect : viewportRect; return bounds ? { dataset: { bookViewMode: viewMode }, getBoundingClientRect: () => bounds } : null; } })) } : null; } };
  let refIndex = 0;
  const hooks = {
    forwardRef: (render) => render,
    useRef: (value) => { const index = refIndex++; return { current: index === 0 ? root : index === 1 ? previousBookId : value }; },
    useState: (value) => [typeof value === "function" ? value() : value, () => {}],
    useCallback: (callback) => callback,
    useEffect: (effect) => effects.push(effect), useLayoutEffect: (effect) => layouts.push(effect),
    useImperativeHandle: (ref, callback) => { ref.current = callback(); },
  };
  const jsx = { jsx: (type, props, key) => ({ type, props, key }), jsxs: (type, props, key) => ({ type, props, key }) };
  const component = compile(read("src/components/books/BookDeckViewport.tsx"), {
    window: { innerWidth: 390, innerHeight: 844 }, document: { hidden: false, querySelector: () => zoomed ? {} : null, addEventListener() {}, removeEventListener() {} }, Element: ElementStub, CSS: { escape: (id) => id }, performance: { now: () => (clock += 16) },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; this.cancelable = options.cancelable; this.defaultPrevented = false; } preventDefault() { if (this.cancelable) this.defaultPrevented = true; } },
    ResizeObserver: class { observe() {} disconnect() {} },
    require: (id) => {
      if (id === "react") return hooks;
      if (id === "react/jsx-runtime") return jsx;
      if (id.endsWith("bookDeckState")) return state;
      if (id.endsWith(".css")) return {};
      if (id === "framer-motion") return {
        motion: { div: "motion.div", button: "motion.button", span: "motion.span" }, useReducedMotion: () => reduced,
        useMotionValue: () => (x = { value: progressValue, set(next) { this.value = next; } }),
        useTransform: (value, map) => ({ get: () => map(value.value), set() {} }),
        animate: (value, target, options) => { animations.push(options); value.set(target); queueMicrotask(options.onComplete); return { stop() {} }; },
      };
      throw new Error(id);
    },
  });
  const ref = { current: null };
  const choice = (book) => book ? { book, previewUrls: [] } : null;
  const tree = component.default({ active: choice(activeBook), previous: choice(a), next: choice(next), incoming: incomingBook ? { choice: choice(incomingBook), direction: incomingDirection, content: "incoming-book" } : null, children: "active-book", disabled, locked, onSelect: (book, direction) => selected.push([book.id, direction]) }, ref);
  layouts.forEach((effect) => effect());
  const event = (clientX, clientY, extras = {}) => ({ clientX, clientY, pointerId: 1, isPrimary: true, button: 0, target: new ElementStub(), currentTarget: root, prevented: false, stopped: false, preventDefault() { this.prevented = true; }, stopPropagation() { this.stopped = true; }, ...extras });
  const progress = x;
  return { tree, ref, progress, root, animations, claims, advanceTime: (milliseconds) => { clock += milliseconds; }, x: { get value() { return progress.value * 390; } }, selected, event, get captures() { return captures; }, handlers: tree.props };
}
{
  const fixture = deck(); const event = fixture.event(180, 300);
  fixture.handlers.onPointerDownCapture(event); assert.equal(event.prevented, false, "page pointer-down still reaches Folding's custom tap/double-tap handler");
  const up = fixture.event(180, 300); fixture.handlers.onPointerUp(up);
  assert.equal(up.prevented, false); assert.equal(fixture.selected.length, 0, "a page TAP is not a book change");
  assert.equal(fixture.captures, 0, "visible page starts no deck candidate or capture");
  const mouse = fixture.event(180, 300); fixture.handlers.onMouseDownCapture(mouse); assert.equal(mouse.prevented, false, "native page fold mousedown is preserved");
  const touch = fixture.event(180, 300, { touches: [{ clientX: 180, clientY: 300 }] }); fixture.handlers.onTouchStartCapture(touch); assert.equal(touch.prevented, false, "native page fold touchstart is preserved");
}
{
  const fixture = deck(); const event = fixture.event(180, 40);
  fixture.handlers.onPointerDownCapture(event); assert.equal(event.prevented, true); assert.equal(fixture.selected.length, 0);
  fixture.handlers.onPointerUp(fixture.event(180, 40));
  assert.equal(fixture.selected.length, 0, "a blank-area tap is neutral, not an implicit previous-book action");
}
{
  const geometry = { pageRects: [{ left: 80, right: 200, top: 100, bottom: 700 }, { left: 200, right: 320, top: 100, bottom: 700 }], clipRect: { left: 200, right: 320, top: 100, bottom: 700 }, viewportRect: { left: 190, right: 310, top: 110, bottom: 690 } };
  const hiddenLeaf = deck(geometry);
  hiddenLeaf.handlers.onPointerDownCapture(hiddenLeaf.event(150, 300)); hiddenLeaf.handlers.onPointerUp(hiddenLeaf.event(150, 300));
  assert.deepEqual(hiddenLeaf.selected[0], ["a", -1], "outer viewport in double view clips invisible page pixels");
  const visibleLeaf = deck(geometry); const pointer = visibleLeaf.event(250, 300);
  visibleLeaf.handlers.onPointerDownCapture(pointer);
  assert.equal(pointer.prevented, false, "visible paper belongs to Folding");
  const outsideViewport = deck(geometry);
  outsideViewport.handlers.onPointerDownCapture(outsideViewport.event(315, 300)); outsideViewport.handlers.onPointerUp(outsideViewport.event(315, 300));
  assert.deepEqual(outsideViewport.selected[0], ["c", 1], "outer viewport clipping also excludes invisible page pixels");
  const single = deck({ ...geometry, viewMode: "single" });
  const adjacent = single.event(150, 300);
  single.handlers.onPointerDownCapture(adjacent);
  single.handlers.onPointerMove(single.event(250, 300)); single.handlers.onPointerUp(single.event(250, 300));
  assert.equal(adjacent.prevented, false); assert.equal(single.captures, 0); assert.equal(single.claims.length, 0); assert.equal(single.selected.length, 0, "in unmasked single view the visible adjacent leaf keeps native-page priority beyond BOTH former clip and centered viewport");
  const singleOutside = deck({ ...geometry, viewMode: "single" });
  singleOutside.handlers.onPointerDownCapture(singleOutside.event(150, 790)); singleOutside.handlers.onPointerMove(singleOutside.event(250, 790)); singleOutside.handlers.onPointerUp(singleOutside.event(250, 790));
  assert.deepEqual(singleOutside.selected[0], ["a", -1], "white below real paper still changes book in unmasked single view");
}
for (const [start, end, expected] of [[350, 350, ["c", 1]], [30, 30, ["a", -1]], [350, 250, ["c", 1]], [30, 130, ["a", -1]]]) {
  const fixture = deck(); fixture.handlers.onPointerDownCapture(fixture.event(start, 300));
  if (start !== end) { fixture.handlers.onPointerMove(fixture.event(end, 300)); assert.ok(Math.abs(fixture.x.value - (end - start)) < .000001, "gutter deck follows the finger with translation"); }
  fixture.handlers.onPointerUp(fixture.event(end, 300)); assert.deepEqual(fixture.selected[0], expected);
}
for (const [start, end] of [[180, 80], [180, 280], [180, 350], [180, 30]]) {
  const fixture = deck(); fixture.handlers.onPointerDownCapture(fixture.event(start, 300));
  const move = fixture.event(end, 300), up = fixture.event(end, 300);
  fixture.handlers.onPointerMove(move); fixture.handlers.onPointerUp(up);
  assert.equal(fixture.selected.length, 0, "a drag begun ON the page is exclusively an internal native page fold, even after crossing its edge");
  assert.equal(fixture.claims.length, 0); assert.equal(fixture.captures, 0);
  assert.equal(move.prevented, false); assert.equal(move.stopped, false); assert.equal(up.prevented, false);
}
for (const y of [40, 790]) {
  for (const [end, expected] of [[80, ["c", 1]], [280, ["a", -1]]]) {
    const fixture = deck(); fixture.handlers.onPointerDownCapture(fixture.event(180, y));
    fixture.handlers.onPointerMove(fixture.event(end, y)); fixture.handlers.onPointerUp(fixture.event(end, y));
    assert.deepEqual(fixture.selected[0], expected, "horizontal drag above/below the book works even inside its horizontal page bounds");
    assert.equal(fixture.claims.length, 1);
  }
}
{
  const fixture = deck(); fixture.handlers.onPointerDownCapture(fixture.event(350, 300));
  fixture.handlers.onPointerMove(fixture.event(180, 300)); fixture.handlers.onPointerUp(fixture.event(180, 300));
  assert.deepEqual(fixture.selected[0], ["c", 1], "a drag begun outside remains a book gesture when it travels over the page");
  const mouse = fixture.event(350, 300); fixture.handlers.onMouseDownCapture(mouse); assert.equal(mouse.prevented, true);
  const touch = fixture.event(350, 300, { touches: [{ clientX: 350, clientY: 300 }] }); fixture.handlers.onTouchStartCapture(touch); assert.equal(touch.prevented, true);
}
{
  const fixture = deck({ denyClaim: true }); fixture.handlers.onPointerDownCapture(fixture.event(350, 300));
  const move = fixture.event(250, 300); fixture.handlers.onPointerMove(move); fixture.handlers.onPointerUp(fixture.event(250, 300));
  assert.equal(move.prevented, false); assert.equal(move.stopped, false); assert.equal(fixture.selected.length, 0); assert.equal(fixture.x.value, 0, "double-tap zoom/pan can veto a deck claim and keep its pointer stream");
}
for (const wait of [0, 1200]) {
  const fixture = deck({ incomingBook: c }); fixture.handlers.onPointerDownCapture(fixture.event(350, 300)); fixture.handlers.onPointerMove(fixture.event(250, 300)); fixture.handlers.onPointerUp(fixture.event(250, 300));
  fixture.advanceTime(wait); await fixture.ref.current.commit(1);
  const velocity = fixture.animations.at(-1).velocity;
  assert.equal(wait ? velocity === 0 : velocity < 0, true, "commit carries fresh release momentum but never stale post-load velocity");
}
{
  const fixture = deck(); fixture.handlers.onPointerDownCapture(fixture.event(350, 300)); fixture.handlers.onPointerMove(fixture.event(330, 300)); fixture.handlers.onPointerUp(fixture.event(330, 300));
  await flush(); assert.equal(fixture.selected.length, 0); assert.equal(fixture.x.value, 0, "under-threshold swipe snaps back");
}
{
  const fixture = deck(); fixture.handlers.onPointerDownCapture(fixture.event(30, 300)); fixture.handlers.onPointerMove(fixture.event(31, 350)); fixture.handlers.onPointerUp(fixture.event(31, 350));
  await flush(); assert.equal(fixture.selected.length, 0, "vertical/scroll gesture never selects a book");
}
for (const options of [{ disabled: true }, { zoomed: true }]) {
  const fixture = deck(options); fixture.handlers.onPointerDownCapture(fixture.event(350, 300)); fixture.handlers.onPointerUp(fixture.event(350, 300));
  assert.equal(fixture.selected.length, 0, "zoom/editor/transition owns its existing gestures");
}
{
  const fixture = deck(); const target = new ElementStub(); target.closest = () => ({});
  fixture.handlers.onPointerDownCapture(fixture.event(350, 300, { target }));
  assert.equal(fixture.captures, 0, "comment and interactive UI are not captured");
  fixture.handlers.onKeyDown(fixture.event(0, 0, { key: "ArrowRight" })); assert.deepEqual(fixture.selected[0], ["c", 1]);
}
{
  const fixture = deck({ next: null }); fixture.handlers.onPointerDownCapture(fixture.event(350, 300)); fixture.handlers.onPointerMove(fixture.event(250, 300));
  assert.ok(Math.abs(fixture.x.value + 18) < .000001, "end-of-deck has bounded resistance");
  fixture.handlers.onPointerUp(fixture.event(250, 300)); await flush(); assert.equal(fixture.selected.length, 0); assert.equal(fixture.x.value, 0);
}
{
  const fixture = deck({ reduced: true }); assert.equal(await fixture.ref.current.commit(1), true); assert.equal(fixture.x.value, -390); await fixture.ref.current.reset(); assert.equal(fixture.x.value, 0);
}
for (const direction of [1, -1]) {
  const fixture = deck({ incomingBook: c, incomingDirection: direction });
  const panes = fixture.tree.props.children[0];
  const activeX = panes[0].props.style.x; const incomingX = panes[1].props.style.x;
  const pending = fixture.ref.current.commit(direction);
  assert.equal(fixture.progress.value, -direction, "commit targets a normalized endpoint, not an obsolete pixel width");
  for (const resizedWidth of [820, 320, 1720]) {
    fixture.root.clientWidth = resizedWidth;
    const outgoingPixels = parseFloat(activeX.get()) / 100 * resizedWidth;
    const incomingPixels = parseFloat(incomingX.get()) / 100 * resizedWidth;
    assert.equal(outgoingPixels, -direction * resizedWidth);
    assert.equal(incomingPixels, 0, "incoming is centered after orientation/resize during the same awaited animation");
  }
  assert.equal(await pending, true, "resize preserves the existing commit completion promise");
}
{
  // The JSX/motion stub never invokes external callback refs: this mirrors
  // useMotionRef's stable callback on a retained DOM element during promotion.
  const outgoing = { dataset: { bookDeckId: "b" }, inert: false };
  const incoming = { dataset: { bookDeckId: "c" }, inert: false };
  deck({ activeBook: b, incomingBook: c, panes: [outgoing, incoming] });
  assert.equal(outgoing.inert, false); assert.equal(incoming.inert, true);
  deck({ activeBook: c, panes: [incoming], locked: true });
  assert.equal(incoming.inert, true, "promotion remains locked until transition completion");
  deck({ activeBook: c, panes: [incoming], locked: false });
  assert.equal(incoming.inert, false, "the same promoted pane becomes interactive without a motion-ref callback");
}
{
  const fixture = deck({ activeBook: c, previousBookId: "b", progressValue: -1 });
  const promotedPane = fixture.tree.props.children[0][0];
  assert.equal(promotedPane.props.style.x, "0%", "FIRST promotion render cannot bind the old -100% progress before a MotionValue frame flush");
  assert.equal(fixture.progress.value, 0, "promotion synchronizes normalized position before repaint");
}

// Execute the real switch callback with stubbed UI/data: old content must stay
// selected through fetch/preparation/readiness/translation; errors keep it.
const library = read("src/components/books/PublicBookLibrary.tsx");
const ast = ts.createSourceFile("PublicBookLibrary.tsx", library, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
let switchNode;
let routeEffect;
function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name.getText(ast) === "switchToBook") switchNode = node.initializer.arguments[0];
  if (ts.isCallExpression(node) && node.expression.getText(ast) === "useEffect" && node.arguments[0]?.getText(ast).includes("const routeChanged = observedRouteSlugRef.current")) routeEffect = node.arguments[0];
  ts.forEachChild(node, visit);
}
visit(ast); assert.ok(switchNode);
assert.ok(routeEffect);
{
  const observedRouteSlugRef = { current: "beta" }; const requests = []; const initial = [];
  const run = (slug, selected, loading = false, busy = false) => compile(`exports.run = ${routeEffect.getText(ast)};`, {
    observedRouteSlugRef, initialSlug: slug, selectedBookId: selected, loadingBooks: loading, books,
    savedBookSessionRef: { current: null }, transitionBusyRef: { current: busy },
    loadFirstVisibleBook: (book) => initial.push(book.id), switchToBook: (book, updateRoute) => requests.push([book.id, updateRoute]),
  }).run();
  run("beta", "a"); run("beta", "a", false, true);
  assert.equal(requests.length, 0, "promoting Alpha must not reselect outgoing Beta while the route prop is stale");
  run("alpha", "a"); assert.equal(requests.length, 0, "route acknowledgement does not start another book transition");
  run("beta", "a"); assert.deepEqual(requests.at(-1), ["b", false], "real Back/Forward slug change remains authoritative");
  run("gamma", "b", false, true); assert.deepEqual(requests.at(-1), ["c", false], "new external slug enters the pending-switch path even while busy");
  const count = requests.length;
  run("alpha", "b", true); assert.equal(requests.length, count);
  run("alpha", "b", false); assert.deepEqual(requests.at(-1), ["a", false], "catalogue loading must not acknowledge and lose a route request");
  run(null, null); assert.equal(initial.length, 1, "first-book bootstrap is independent from route-change detection");
}
function switchFixture({ fail = false, visited = false, pauseData = false } = {}) {
  const events = []; const incoming = { value: null }; const selected = { value: "a" }; const deferred = [];
  const selectedBookIdRef = { current: "a" }; const transitionBusyRef = { current: false };
  const viewerReadyBookIdRef = { current: "a" }; const pendingBookSwitchRef = { current: null };
  const switchToBookRef = { current: null }; const deckLoadAbortRef = { current: null }; const deckLoadBookRef = { current: null };
  const globals = {
    mountedRef: { current: true }, selectedBookIdRef, transitionBusyRef, pendingBookSwitchRef, switchToBookRef, deckLoadAbortRef, deckLoadBookRef,
    navigationMode: "sketches", books, viewerReadyBookIdRef, viewerReadyWaiterRef: { current: null },
    bookPageMemoryRef: { current: visited ? { beta: 5 } : {} }, savedBookSessionRef: { current: null }, bookPagesCacheRef: { current: new Map() },
    setBookBalloonOpen() {}, setTransitionBusy() {}, setLoadingPages() {}, setError() {}, setViewerFastMotion() {}, setViewerMotion() {}, setPages() {}, setBookComments() {}, setViewerPage() {},
    setAutoOpenBookId(id) { events.push(["auto", id]); },
    setIncomingDeckBook(value) { incoming.value = value; events.push(["incoming", value?.book.id]); },
    setSelectedBookId(id) { selected.value = id; events.push(["selected", id]); },
    setServiceNotice(message) { events.push(["error", message]); }, messageFrom: (error) => error.message,
    listBookPages: async () => { events.push(["fetch", selected.value]); if (fail) throw new Error("API unavailable"); if (pauseData) await new Promise((resolve) => deferred.push(resolve)); return originals; },
    loadComments: async () => [],
    prepareBookDeckPages: async (_pages, page, signal) => { events.push(["prepare", selected.value, page]); if (signal.aborted) throw new DOMException("cancelled", "AbortError"); },
    bookDeckEntry: state.bookDeckEntry, rememberBookPage: (memory, slug, page) => ({ ...memory, [slug]: page }),
    writeBookSession(slug, page) { events.push(["session", slug, page]); },
    flushSync: (callback) => callback(), onBookChange: (slug) => events.push(["route", slug]),
    waitForViewerReady: async (id) => { await Promise.resolve(); assert.equal(incoming.value.book.id, id); assert.equal(selected.value, "a"); viewerReadyBookIdRef.current = id; },
    deckRef: { current: { commit: async () => { events.push(["commit", selected.value]); assert.equal(incoming.value.book.id, "b"); return true; }, reset: async () => { events.push(["reset"]); return true; } } },
    window: { setTimeout: (callback) => deferred.push(callback) },
  };
  const fn = compile(`exports.switchBook = ${switchNode.getText(ast)};`, globals).switchBook;
  switchToBookRef.current = fn;
  return { fn, events, selected, incoming, globals, deferred };
}
{
  const fixture = switchFixture(); await fixture.fn(b, true, 1);
  assert.equal(fixture.selected.value, "b");
  assert.deepEqual(fixture.events.find(([event]) => event === "commit"), ["commit", "a"], "old book is still mounted until translation commits");
  const commit = fixture.events.findIndex(([event]) => event === "commit");
  assert.ok(fixture.events.findIndex(([event, id]) => event === "auto" && id === "b") > commit, "unseen auto-opening is armed only after release/entry completes");
}
{
  const fixture = switchFixture({ visited: true }); await fixture.fn(b, true, -1);
  assert.ok(fixture.events.some(([event, slug, page]) => event === "session" && slug === "beta" && page === 5));
  assert.ok(!fixture.events.some(([event, id]) => event === "auto" && id === "b"), "visited books restore their page without auto-opening");
}
{
  const fixture = switchFixture({ fail: true }); await fixture.fn(b, true, 1);
  assert.equal(fixture.selected.value, "a"); assert.equal(fixture.incoming.value, null);
  assert.ok(fixture.events.some(([event, message]) => event === "error" && message)); assert.ok(!fixture.events.some(([event]) => event === "commit"), "API failure never blanks/unmounts outgoing book");
}
{
  const fixture = switchFixture({ pauseData: true });
  const first = fixture.fn(b, true, 1);
  assert.equal(fixture.selected.value, "a");
  await fixture.fn(c, true, 1);
  assert.equal(fixture.globals.pendingBookSwitchRef.current.book.id, "c", "latest selection is retained during async preparation");
  assert.equal(fixture.globals.deckLoadAbortRef.current.signal.aborted, true, "superseding selection cancels the obsolete preload context");
  fixture.deferred.shift()(); await first;
  assert.equal(fixture.selected.value, "a", "canceled preparation cannot promote a stale book");
  assert.equal(fixture.incoming.value, null);
  assert.equal(fixture.deferred.length, 1, "queued switch is scheduled only after rollback/reset");
}
assert.match(library, /sketches_book_list_label/);
assert.match(library, /richContent: input\.richContent/);
assert.match(library, /controlsActive=\{book\.id === selectedBookId\}/, "only the active book owns viewport-portal controls, incoming promotion keeps the viewer key");
assert.doesNotMatch(library, /Preparo \{/);
assert.match(read("src/components/books/BookDeckViewport.tsx"), /key=\{pane\.id\}/, "incoming native viewer key survives promotion");
assert.doesNotMatch(read("src/components/books/BookDeckViewport.css"), /opacity|fade/);
assert.match(read("src/components/books/BookDeckViewport.tsx"), /book-deck-edge-paper/);
assert.doesNotMatch(read("src/components/books/BookDeckViewport.tsx"), /AudioContext|Oscillator|<audio/);
assert.match(read("src/components/books/BookDeckViewport.tsx"), /\[hiddenX, 0, -edge\.direction \* 5, edge\.direction \* 2, hiddenX\]/, "one-shot paper peek returns entirely beyond the clipped edge");
assert.match(read("src/components/books/BookDeckViewport.tsx"), /y: beckoning \? \[18, 0, -4, 1, 18\]/, "initial beckon is diagonal, not a permanent side border");
assert.match(read("src/components/books/BookDeckViewport.tsx"), /cornerRotation = edge\.direction \* 24/);
assert.match(read("src/components/books/BookDeckViewport.tsx"), /rotate: cornerRotation/);
assert.match(read("src/components/books/BookDeckViewport.css"), /width: 260px; height: 360px/);
assert.match(read("src/components/books/BookDeckViewport.css"), /\.book-deck-edge \{[^\n]*pointer-events: none/, "visual-only peek cannot steal page gestures, keyboard buttons remain focusable");
for (const edgeWidth of [44, 56]) {
  for (const buttonHeight of [208, 253, 280]) {
    // Previous-book paper rotates -24deg about its lower-right corner;
    // next is its exact horizontal mirror. One vertex inside gives a triangle.
    const angle = -24 * Math.PI / 180;
    const tip = { x: edgeWidth - 2, y: buttonHeight * .68 };
    const corners = [[0, 0], [-260, 0], [0, -360], [-260, -360]].map(([x, y]) => ({ x: tip.x + x * Math.cos(angle) - y * Math.sin(angle), y: tip.y + x * Math.sin(angle) + y * Math.cos(angle) }));
    for (const [overshoot, rise] of [[0, 0], [5, -4], [-2, 1]]) {
      assert.equal(corners.filter((point) => point.x + overshoot > 0).length, 1, "exactly one corner crosses the screen edge throughout the spring jiggle");
      const projected = corners.map((point) => ({ x: point.x + overshoot, y: point.y + rise }));
      for (const neighbor of [projected[1], projected[2]]) {
        const fraction = projected[0].x / (projected[0].x - neighbor.x);
        const edgeY = projected[0].y + (neighbor.y - projected[0].y) * fraction;
        assert.ok(edgeY > 0 && edgeY < buttonHeight, "both triangle edges meet the viewport edge within the preview window, not a clipped rectangular band");
      }
    }
    assert.ok(corners.every((point) => point.x - 72 < 0), "retraction hides every paper vertex completely");
  }
}
assert.match(read("src/components/books/BookDeckViewport.tsx"), /matches\(":focus-visible"\)/, "only keyboard focus can reveal a temporary contextual edge cue");
assert.match(read("src/components/books/BookDeckViewport.css"), /\.book-deck-viewport \{ position: fixed; inset: 0;/, "deck gestures include the full blank screen above/below its padded main");
assert.match(read("src/components/books/BookDeckViewport.css"), /\.public-book-shell\.is-sketches \.public-book-surface:not\(\.is-login-muted\) \{ filter: none; \}/, "blur(0) must not trap the fixed deck inside a smaller containing block");
assert.match(read("src/components/books/BookDeckViewport.css"), /\.book-deck-viewport \.public-book-viewport:not\(\.is-magnified\).*88px/, "mobile deck reserves real gutters without altering the magnifier");
assert.match(read("src/components/books/BookDeckViewport.css"), /max-width: calc\(100vw[^\n]*112px\)/, "tablet/desktop arrows also remain outside real page bounds");
assert.match(read("src/components/books/BookDeckViewport.css"), /--book-edge-width: 44px/, "phone corner preview is larger, without an invisible pointer hitbox");
console.log("PASS: backend neighbours, per-book session pages, exclusive native-page vs full-screen outside-book drag arbitration, taps/keyboard, one-shot diagonal retracting preview, momentum, snap, scroll/zoom exclusion, reduced motion, original-only warmup, cancellation, activation, stable promotion and API errors (fully mocked, no network).");
