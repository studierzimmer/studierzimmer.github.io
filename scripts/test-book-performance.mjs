// Deterministic tests: real installed PageFlip in an isolated minimal DOM plus
// original-URL image scheduling. No browser globals are patched in the app,
// no network/assets/credentials are used, and no Supabase writes are possible.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

let clock = 0, nextId = 0;
const frames = new Map(), timers = new Map(), idle = new Map();
const windowListeners = new Map(), documentListeners = new Map();
const listen = (target, name, fn) => { const listeners = target.get(name) ?? new Set(); listeners.add(fn); target.set(name, listeners); };
const unlisten = (target, name, fn) => target.get(name)?.delete(fn);
const countListeners = (target) => [...target.values()].reduce((sum, set) => sum + set.size, 0);
class Element {
  constructor(tag = "div") { this.tagName = tag.toUpperCase(); this.children = []; this.parentElement = null; this.style = {}; this.dataset = {}; this.classes = new Set(); this.listeners = new Map(); this.classList = { add: (...names) => names.forEach((name) => this.classes.add(name)), remove: (...names) => names.forEach((name) => this.classes.delete(name)) }; }
  get isConnected() { return this === body || this === head || Boolean(this.parentElement?.isConnected); }
  get offsetWidth() { return Number.parseFloat(this.style.minWidth) || this.parentElement?.offsetWidth || 1000; } get offsetHeight() { return Number.parseFloat(this.style.minHeight) || this.parentElement?.offsetHeight || 800; }
  appendChild(node) { node.remove(); node.parentElement = this; this.children.push(node); return node; }
  remove() { if (this.parentElement) this.parentElement.children = this.parentElement.children.filter((node) => node !== this); this.parentElement = null; }
  insertAdjacentHTML(position, html) { for (const match of html.matchAll(/<div class="([^"]+)"><\/div>/g)) { const node = new Element(); match[1].split(" ").forEach((name) => node.classes.add(name)); this.appendChild(node); if (position === "afterbegin") this.children.unshift(this.children.pop()); } }
  querySelector(selector) { for (const node of this.children) { if (node.classes.has(selector.slice(1))) return node; const nested = node.querySelector(selector); if (nested) return nested; } return null; }
  set innerHTML(value) { if (!value) { this.children.forEach((node) => { node.parentElement = null; }); this.children = []; } }
  getBoundingClientRect() { return { left: 0, top: 0, right: 1000, bottom: 800, width: 1000, height: 800 }; }
  addEventListener(name, fn) { listen(this.listeners, name, fn); } removeEventListener(name, fn) { unlisten(this.listeners, name, fn); }
  cloneNode() { const node = new Element(); this.classes.forEach((name) => node.classes.add(name)); node.dataset = { ...this.dataset }; return node; }
}
const head = new Element("head"), body = new Element("body");
const documentMock = { hidden: false, head, body, createElement: (tag) => new Element(tag), createTextNode: () => new Element("text"), getElementsByTagName: () => [head], addEventListener: (name, fn) => listen(documentListeners, name, fn), removeEventListener: (name, fn) => unlisten(documentListeners, name, fn) };
const windowMock = {
  document: documentMock, navigator: { userAgent: "Book lifecycle test" },
  requestAnimationFrame: (fn) => { const id = ++nextId; frames.set(id, fn); return id; }, cancelAnimationFrame: (id) => frames.delete(id),
  setTimeout: (fn, delay) => { const id = ++nextId; timers.set(id, { fn, at: clock + delay }); return id; }, clearTimeout: (id) => timers.delete(id),
  requestIdleCallback: (fn) => { const id = ++nextId; idle.set(id, fn); return id; }, cancelIdleCallback: (id) => idle.delete(id),
  addEventListener: (name, fn) => listen(windowListeners, name, fn), removeEventListener: (name, fn) => unlisten(windowListeners, name, fn),
};
const common = { console, window: windowMock, document: documentMock, performance: { now: () => clock }, requestAnimationFrame: windowMock.requestAnimationFrame, cancelAnimationFrame: windowMock.cancelAnimationFrame, setTimeout: windowMock.setTimeout, clearTimeout: windowMock.clearTimeout };
function frame(milliseconds = 16.67, timestampOffset = 0) { clock += milliseconds; for (const [id, timer] of [...timers]) if (timer.at <= clock) { timers.delete(id); timer.fn(); } const pending = [...frames.values()]; frames.clear(); pending.forEach((fn) => fn(clock + timestampOffset)); }
const nativeExports = {};
vm.runInNewContext(fs.readFileSync(new URL("../node_modules/page-flip/dist/js/page-flip.browser.js", import.meta.url), "utf8"), { ...common, exports: nativeExports, module: { exports: nativeExports } });
const modules = new Map();
function load(name) {
  if (modules.has(name)) return modules.get(name);
  const exports = {};
  const source = fs.readFileSync(new URL(`../src/components/books/${name}.ts`, import.meta.url), "utf8");
  const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  vm.runInNewContext(js, { ...common, exports, require: (id) => {
    if (id === "page-flip") return nativeExports;
    if (id.endsWith("package.json?raw")) return { default: fs.readFileSync(new URL("../node_modules/page-flip/package.json", import.meta.url), "utf8") };
    if (id.startsWith("./")) return load(id.slice(2));
    throw new Error(`Unexpected dependency ${id}`);
  } });
  modules.set(name, exports); return exports;
}
const { createOwnedBookEngine } = load("ownedBookEngine");
const { bookSpreadStart, bookSpreadLeaves, bookLeafSide, bookFoldViewOffset, bookViewDragOffset, commitsBookViewDrag, guardBookNativeTap, normalizeBookPointerCoordinates, planBookPageTurn } = load("bookViewMode");
for (let cycle = 0; cycle < 20; cycle++) {
  const root = body.appendChild(new Element());
  const pages = Array.from({ length: 40 }, () => root.appendChild(new Element()));
  const owned = createOwnedBookEngine(root, { width: 400, height: 600, size: "fixed", usePortrait: false, autoSize: false, showCover: true, useMouseEvents: true, flippingTime: 850, showPageCorners: false, disableFlipByClick: true }, pages, () => {});
  frame(); frame();
  assert.equal(frames.size, 0, "native book sleeps at read");
  frame(30000);
  owned.engine.flipNext();
  assert.doesNotThrow(() => frame(0, -2), "RAF timestamp can precede performance.now animation start: native frame index must never be negative");
  assert.equal(owned.engine.getState(), "flipping", "animation clock refreshed after 30s idle");
  const renderer = owned.engine.getRender();
  const lastDraw = renderer.timer;
  assert.doesNotThrow(() => frame(0, -100));
  assert.ok(renderer.timer >= lastDraw, "local renderer clock never runs backwards");
  const replacementStates = [];
  const replacePages = owned.engine.updateFromHtml.bind(owned.engine);
  owned.engine.updateFromHtml = (nextPages) => { replacementStates.push(owned.engine.getState()); replacePages(nextPages); };
  owned.update(pages);
  assert.equal(replacementStates.length, 0, "page replacement waits while native state is flipping");
  const updateRender = renderer.update.bind(renderer);
  let updatesDuringFold = 0;
  renderer.update = () => { updatesDuringFold++; updateRender(); };
  owned.engine.getUI().update();
  assert.equal(updatesDuringFold, 0, "native responsive layout is deferred during a fold");
  for (let index = 0; index < 60; index++) frame();
  assert.equal(owned.engine.getCurrentPageIndex(), 1);
  assert.equal(frames.size, 0, "frames stop after the final flip draw");
  assert.ok(updatesDuringFold > 0, "deferred native layout flushes once read has actually committed");
  assert.deepEqual(replacementStates, ["read"], "queued pages replaced exactly once, after native read state commits and frame returns");
  owned.engine.flipPrev();
  assert.doesNotThrow(() => frame(0, -2), "reverse flip also tolerates an earlier delivered RAF timestamp");
  assert.equal(owned.engine.getState(), "flipping");
  updatesDuringFold = 0;
  owned.engine.getUI().update();
  assert.equal(updatesDuringFold, 0, "reverse-fold resize is deferred too");
  for (let index = 0; index < 60; index++) frame();
  assert.equal(owned.engine.getCurrentPageIndex(), 0);
  assert.ok(updatesDuringFold > 0);
  assert.equal(frames.size, 0);
  owned.dispose(); owned.dispose(); frame();
  assert.equal(frames.size, 0, "disposed engine leaves no RAF");
  assert.equal(countListeners(windowListeners), 0, "all native resize/mouse/touch handlers removed");
  assert.equal(countListeners(documentListeners), 0, "owned visibility handler removed");
  assert.equal(root.isConnected, true, "React-owned root is not removed by native destroy");
  assert.equal(root.children.length, 40, "same page elements restored to their React host");
  pages.forEach((page, index) => assert.equal(root.children[index], page));
  root.remove();
}

// Exercise actual viewer callbacks around the real native mouse lifecycle.
// Native folds start above5px, whereas the viewer intentionally allows8px tap
// jitter; this catches native spring-back canceling an otherwise valid tap.
const viewerSource = fs.readFileSync(new URL("../src/components/books/FoldingBookViewer.tsx", import.meta.url), "utf8");
const viewerAST = ts.createSourceFile("FoldingBookViewer.tsx", viewerSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const viewerCallbacks = new Map(), attributes = new Map();
function visitViewer(node) {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) viewerCallbacks.set(node.name.text, node.initializer);
  if (ts.isJsxAttribute(node) && node.initializer && ts.isJsxExpression(node.initializer)) attributes.set(node.name.getText(viewerAST), node.initializer.expression);
  ts.forEachChild(node, visitViewer);
}
visitViewer(viewerAST);
const flushMicrotasks = async () => { for (let index = 0; index < 8; index++) await Promise.resolve(); };
async function mouseCase(jitter = 0, doubleTap = false, drag = false, mode = "double", startLeaf = 1, forward = true, mirrorAfterPhysical = false) {
  const root = body.appendChild(new Element()), pageNodes = Array.from({ length: 9 }, () => root.appendChild(new Element()));
  let owned, zooms = 0;
  const canvasX = { value: -bookLeafSide(startLeaf, pageNodes.length) * 680, set(value) { this.value = value; } };
  const context = vm.createContext({ ...common, Element, useCallback: (fn) => fn, pages: pageNodes,
    pageTurnIntentRef: { current: 0 }, tapTimerRef: { current: null }, closeTimerRef: { current: null }, activeGestureRef: { current: null }, focusedCommentRef: { current: null }, commentDraftRef: { current: null }, suppressPageFlipRef: { current: false }, magnifierOpenRef: { current: false }, zoomClosingRef: { current: false }, pageFlipBusyRef: { current: false }, currentPageRef: { current: startLeaf }, lastTapRef: { current: { time: 0, x: 0, y: 0, pointerType: "" } },
    pendingNativeLeafRef: { current: null }, initializedEngineRef: { current: null }, viewModeRef: { current: mode }, flipInitializedRef: { current: false },
    canvasX, cameraFrameRef: { current: null }, cameraAnimationRef: { current: null }, pageSize: { width: 680 }, pointerCoordinatesCleanupRef: { current: null }, viewerOwnsNativeTapRef: { current: false }, viewGestureNativeBlockedRef: { current: false }, baseViewScaleRef: { current: 2 },
    bookRef: { current: { pageFlip: () => owned?.engine } }, commentMode: false,
    imageScheduler: { isReadyForPage: () => true, preparePage: () => Promise.resolve(true), setBusy() {} }, prepareZoomImages: () => Promise.resolve(true),
    panX: { get: () => 0 }, panY: { get: () => 0 }, zoomScale: { get: () => 1 }, stopZoomAnimations() {}, setFoldShadowActive() {}, restartCommentIdle() {}, flushPendingResize() {}, clampPan() {}, zoomAroundPoint() {},
    closeMagnifier() {}, openMagnifier() { zooms++; context.magnifierOpenRef.current = true; return { scale: 2, x: 0, y: 0 }; },
    DOUBLE_TAP_DELAY: 360, DOUBLE_TAP_DISTANCE: 42, TAP_MOVEMENT_TOLERANCE: 8,
    clamp: (value, min, max) => Math.min(max, Math.max(min, value)),
    bookSpreadStart, bookSpreadLeaves, bookLeafSide, bookFoldViewOffset, bookViewDragOffset, commitsBookViewDrag, guardBookNativeTap, normalizeBookPointerCoordinates, planBookPageTurn, setCurrentPage() {}, onPageChange() {}, setHorizontalOffset() {}, notifyReadyWhenPaintable() {},
    animateMotion(value, target) { value.set(target); return { stop() {} }; },
  });
  context.window.performance = common.performance;
  const evaluate = (code) => vm.runInContext(ts.transpileModule(code, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText, context);
  for (const name of ["clearTapTimer", "commitPageSelection", "synchronizeSinglePageCenter", "followNativeFold", "adjacentPage", "beginGesture", "schedulePageTurn", "handleGlobalPointerMove", "handleGlobalPointerEnd", "blockNativeViewGesture"]) evaluate(`globalThis.${name} = ${viewerCallbacks.get(name).getText(viewerAST)}`);
  for (const name of ["onInit", "onFlip", "onChangeState", "onMouseDownCapture", "onMouseMoveCapture"]) if (attributes.get(name)) evaluate(`globalThis.${name} = ${attributes.get(name).getText(viewerAST)}`);
  owned = createOwnedBookEngine(root, { width: 680, height: 480, size: "fixed", usePortrait: false, autoSize: false, showCover: true, startPage: bookSpreadStart(startLeaf), useMouseEvents: true, flippingTime: 850, showPageCorners: false, disableFlipByClick: true }, pageNodes, (name, event) => {
    if (name === "changeState") context.onChangeState(event);
    if (name === "flip") context.onFlip(event);
    if (name === "init") context.onInit(event);
  });
  if (mode === "single") {
    const rect = () => ({ left: -180 + canvasX.value * 2, top: 0, width: 2720, height: 960, right: 2540 + canvasX.value * 2, bottom: 960 });
    owned.engine.getUI().getDistElement().getBoundingClientRect = rect;
  }
  frame(); frame();
  if (mode === "single") assert.equal(owned.engine.getUI().getMousePos(1000, 240).x, (1000 + 180 - canvasX.value * 2) / 2, "native single-mode coordinates normalize the real2x scaled and camera-translated page canvas");
  const event = (x, y = 240) => ({ pointerId: 1, pointerType: "mouse", isPrimary: true, button: 0, clientX: x, clientY: y, target: {}, currentTarget: root, prevented: false, stopped: false, preventDefault() { this.prevented = true; }, stopPropagation() { this.stopped = true; } });
  const nativeEvent = (x) => ({ clientX: x, clientY: 240, target: pageNodes[2], preventDefault() {} });
  const emit = (target, name, e) => [...(target.get(name) ?? [])].forEach((fn) => fn(e));
  const emitNativeWindow = (name, x) => {
    const e = { ...nativeEvent(x), type: name, cancelable: true, stopped: false, stopImmediatePropagation() { this.stopped = true; } };
    context.blockNativeViewGesture(e);
    if (!e.stopped) emit(windowListeners, name, e);
  };
  const tapX = forward ? 1000 : 100;
  const down = () => { context.beginGesture(event(tapX)); const capture = event(tapX); context.onMouseDownCapture(capture); if (!capture.stopped) emit(owned.engine.getUI().getDistElement().listeners, "mousedown", nativeEvent(tapX)); };
  const up = (x) => { context.handleGlobalPointerEnd(event(x)); emitNativeWindow("mouseup", x); };
  down();
  if (jitter || drag) {
    for (const x of drag ? forward ? [990, 800, 600, 400, 200, 100] : [110, 300, 500, 700, 900, 1000] : [1000 + jitter]) {
      context.handleGlobalPointerMove(event(x));
      const capture = event(x); context.onMouseMoveCapture?.(capture);
      if (!capture.stopped) emitNativeWindow("mousemove", x);
      if (mode === "single") { frame(); await flushMicrotasks(); }
    }
  }
  up(drag ? forward ? 100 : 1000 : tapX + jitter);
  if (doubleTap) { frame(150); down(); up(tapX); }
  const foldSamples = [];
  for (let index = 0; index < 110; index++) {
    frame(); await flushMicrotasks();
    if (mode === "single" && owned.engine.getState() !== "read") foldSamples.push(canvasX.value);
  }
  if (mode === "single" && foldSamples.length) {
    const expected = -bookLeafSide(context.currentPageRef.current, pageNodes.length) * 680;
    assert.ok(Math.abs(foldSamples.at(-1) - expected) < 48, "camera is already focused on the destination during final native fold frame, never late-corrects after native onFlip");
    if (startLeaf === 2 && forward) assert.ok(foldSamples.some((value) => value > -600 && value < -50), "forward right-to-left camera follows fold progress while the fold is in flight");
    if (startLeaf === 3 && !forward) assert.ok(foldSamples.some((value) => value < -50 && value > -600), "reverse left-to-right camera follows native fold progress too");
  }
  if (mirrorAfterPhysical) {
    assert.equal(context.currentPageRef.current, 2, "first physical previous fold selects the prior RIGHT leaf");
    emitNativeWindow("mousemove", 100); // Real CUA hovers into the page first.
    owned.engine.startUserTouch({ x: 20, y: 120 }); // Stale native snapshot must not steal a view-only gesture.
    down();
    assert.equal(context.activeGestureRef.current.viewOnly, true);
    for (const x of [110, 300, 500, 700, 900, 1000]) {
      context.handleGlobalPointerMove(event(x)); emitNativeWindow("mousemove", x); frame(); await flushMicrotasks();
      assert.equal(owned.engine.getState(), "read", "mirror view drag after physical previous never starts another native fold");
    }
    up(1000);
    for (let index = 0; index < 80; index++) { frame(); await flushMicrotasks(); }
  }
  const result = { page: owned.engine.getCurrentPageIndex(), leaf: context.currentPageRef.current, zooms };
  context.clearTapTimer(); context.pointerCoordinatesCleanupRef.current?.();
  if (context.cameraFrameRef.current !== null) windowMock.cancelAnimationFrame(context.cameraFrameRef.current);
  owned.dispose(); root.remove(); frame();
  return result;
}
assert.equal((await mouseCase()).page, 3, "interior single click advances exactly one spread");
assert.equal((await mouseCase(6)).page, 3, "6px tap jitter must not be swallowed by native fold/spring-back state");
assert.equal((await mouseCase(0, false, true)).page, 3, "real drag remains native and does not double-turn");
assert.deepEqual(await mouseCase(0, true), { page: 1, leaf: 1, zooms: 1 }, "double tap cancels single-page turn and zooms instead");
assert.deepEqual(await mouseCase(0, false, false, "single", 1), { page: 1, leaf: 2, zooms: 0 }, "single-view left to right changes only the selected camera leaf");
assert.deepEqual(await mouseCase(0, false, false, "single", 2), { page: 3, leaf: 3, zooms: 0 }, "single-view right leaf physically flips forward to next left leaf");
assert.deepEqual(await mouseCase(0, false, false, "single", 2, false), { page: 1, leaf: 1, zooms: 0 }, "restored even leaf survives bootstrap and translates back without a fold");
assert.deepEqual(await mouseCase(0, false, false, "single", 3, false), { page: 1, leaf: 2, zooms: 0 }, "single-view left leaf physically flips backward then selects previous right");
assert.deepEqual(await mouseCase(0, false, true, "single", 1), { page: 1, leaf: 2, zooms: 0 }, "single LEFT leaf + RIGHT-half native mousedown/move/up is intercepted: drag is camera-only, engine spread remains1");
assert.deepEqual(await mouseCase(0, false, true, "single", 2, false), { page: 1, leaf: 1, zooms: 0 }, "mirrored RIGHT leaf + LEFT-half drag is also camera-only");
assert.deepEqual(await mouseCase(0, false, true, "single", 2), { page: 3, leaf: 3, zooms: 0 }, "single RIGHT leaf + RIGHT-half drag retains native forward fold and synchronized camera");
assert.deepEqual(await mouseCase(0, true, false, "single", 1), { page: 1, leaf: 1, zooms: 1 }, "single view-only half still reserves double tap for zoom without page turn");
assert.deepEqual(await mouseCase(0, false, true, "single", 3, false, true), { page: 1, leaf: 1, zooms: 0 }, "real2x single physical previous→hover→RIGHT-leaf mirrored view drag never jumps closed to page0");

const { BookImageScheduler } = load("bookImageScheduler");
const originalURLs = Array.from({ length: 40 }, (_, index) => `https://original.invalid/page-${index}.jpg`);
const requested = [], pendingImages = new Set();
let maxNetwork = 0, decoding = 0, maxDecode = 0;
class ImageMock {
  onload = null; onerror = null; value = "";
  set src(value) { this.value = value; if (value) { requested.push(value); pendingImages.add(this); maxNetwork = Math.max(maxNetwork, pendingImages.size); } else pendingImages.delete(this); }
  get src() { return this.value; }
  decode() { decoding++; maxDecode = Math.max(maxDecode, decoding); return Promise.resolve().then(() => { decoding--; }); }
  load() { pendingImages.delete(this); this.onload?.(); }
}
const scheduler = new BookImageScheduler(originalURLs, () => new ImageMock());
async function flushImages() {
  for (let step = 0; step < 40; step++) {
    [...pendingImages].forEach((image) => image.load());
    const callbacks = [...idle.values()]; idle.clear(); callbacks.forEach((fn) => fn());
    for (let turn = 0; turn < 6; turn++) await Promise.resolve();
    if (!pendingImages.size && !idle.size) return;
  }
  throw new Error("Image queue did not settle");
}
scheduler.start(0);
assert.equal(requested.length, 2, "at most two original requests start together");
let coldTargetReady = false;
const coldTarget = scheduler.preparePage(1).then((prepared) => { coldTargetReady = prepared; });
assert.equal(coldTargetReady, false, "cold tap waits for queued full-resolution target pages");
await flushImages();
await coldTarget; assert.equal(coldTargetReady, true);
assert.equal(requested.length, 3, "cover plus next spread, not all 40 originals");
assert.equal(scheduler.isReadyForPage(1), true);
scheduler.setPage(1); await flushImages();
assert.equal(requested.length, 5, "next visible spread adds only its two neighbors");
const beforeRevisit = requested.length; scheduler.setPage(0); await flushImages();
assert.equal(requested.length, beforeRevisit, "visited pages keep stable source activation");
scheduler.setPage(15); await flushImages();
assert.equal(requested.length, 11, "jump window includes only current/next/previous pairs");
assert.ok(requested.every((url) => originalURLs.includes(url)), "URLs unchanged: no transforms/downsampling/recompression");
assert.ok(maxNetwork <= 2); assert.ok(maxDecode <= 2);
scheduler.setPage(31); scheduler.dispose();
assert.equal(pendingImages.size, 0); assert.equal(idle.size, 0); assert.equal(timers.size, 0);
scheduler.start(0); await flushImages(); scheduler.dispose();
assert.equal(pendingImages.size, 0, "StrictMode restart remains disposable");

const slow = new BookImageScheduler(originalURLs.slice(0, 3), () => new ImageMock());
slow.start(0);
let timedOut = false;
let staleIntentFlips = 0;
const timedOutTarget = slow.preparePage(1).then((prepared) => { timedOut = true; if (prepared && slow.isReadyForPage(1)) staleIntentFlips++; return prepared; });
const slowRequests = requested.length;
const liveTransfers = [...pendingImages];
frame(12001);
for (let turn = 0; turn < 6; turn++) await Promise.resolve();
assert.equal(timedOut, true, "timeout settles pending prepare calls, without a forever waiter");
assert.equal(await timedOutTarget, false, "expired intent explicitly returns false, independently of later readiness");
assert.equal(slow.isReadyForPage(1), false, "12s timeout is not successful full-original readiness");
originalURLs.slice(0, 3).forEach((url) => assert.equal(slow.isActive(url), false, "timed-out originals are not activated"));
assert.equal(pendingImages.size, 2, "healthy slow original transfers are not aborted at intent timeout");
liveTransfers.forEach((image) => assert.ok(image.src, "slow transfer keeps its unchanged original src"));
const retry = slow.preparePage(1);
assert.equal(requested.length, slowRequests, "fresh intent joins existing slow transfer rather than restarting its URL");
await flushImages(); assert.equal(await retry, true);
assert.equal(slow.isReadyForPage(1), true, "late onload plus decode grants real readiness after the expired intent");
assert.equal(staleIntentFlips, 0, "late completion never replays an expired tap/flip intent");
slow.dispose();

const failed = new BookImageScheduler(originalURLs.slice(0, 3), () => new ImageMock());
failed.start(0);
const failedTarget = failed.preparePage(1);
while (pendingImages.size) [...pendingImages].forEach((image) => image.onerror?.());
assert.equal(await failedTarget, false);
assert.equal(failed.isReadyForPage(1), false, "network error never grants decoded readiness");
const failedRetry = failed.preparePage(1);
await flushImages(); assert.equal(await failedRetry, true);
assert.equal(failed.isReadyForPage(1), true, "actual network errors remain retryable with a new transfer");
failed.dispose();

const corrupt = new BookImageScheduler(originalURLs.slice(0, 3), () => { const image = new ImageMock(); image.decode = () => Promise.reject(new Error("corrupt original")); return image; });
corrupt.start(0);
const corruptTarget = corrupt.preparePage(1);
await flushImages(); assert.equal(await corruptTarget, false);
assert.equal(corrupt.isReadyForPage(1), false, "failed original decoding never grants readiness");
corrupt.dispose();
assert.equal(pendingImages.size, 0); assert.equal(idle.size, 0); assert.equal(timers.size, 0);
console.log("Book performance: 20 real StPageFlip init/idle/flip/dispose cycles with zero RAF/listener survivors; bounded exact-original image/decode window, revisit identity and StrictMode restart passed.");
