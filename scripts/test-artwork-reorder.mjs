// Isolated pointer/DOM regressions: no browser, storage, network or real writes.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

class Events {
  listeners = new Map();
  addEventListener(type, callback) { const callbacks = this.listeners.get(type) ?? new Set(); callbacks.add(callback); this.listeners.set(type, callbacks); }
  removeEventListener(type, callback) { this.listeners.get(type)?.delete(callback); if (!this.listeners.get(type)?.size) this.listeners.delete(type); }
  emit(type, event = {}) { for (const callback of [...(this.listeners.get(type) ?? [])]) callback(event); }
  get listenerCount() { return [...this.listeners.values()].reduce((sum, entries) => sum + entries.size, 0); }
}
class Classes {
  constructor(...values) { this.values = new Set(values); }
  add(...values) { values.forEach((value) => this.values.add(value)); }
  remove(...values) { values.forEach((value) => this.values.delete(value)); }
  contains(value) { return this.values.has(value); }
}
class Style {
  values = new Map();
  setProperty(key, value) { this.values.set(key, value); }
  removeProperty(key) { this.values.delete(key); }
  getPropertyValue(key) { return this.values.get(key) ?? ""; }
}
function hooks() {
  const states = [], refs = [], effects = [];
  let stateIndex = 0, refIndex = 0, effectIndex = 0, pending = [];
  return {
    react: {
      useId: () => "reorder-instructions",
      useState(initial) { const index = stateIndex++; if (!(index in states)) states[index] = typeof initial === "function" ? initial() : initial; return [states[index], (value) => { states[index] = typeof value === "function" ? value(states[index]) : value; }]; },
      useRef(initial) { return refs[refIndex++] ??= { current: initial }; },
      useEffect(callback, dependencies) {
        const index = effectIndex++, old = effects[index];
        if (!old || dependencies.some((value, position) => !Object.is(value, old.dependencies[position]))) pending.push(() => { old?.cleanup?.(); effects[index] = { dependencies, cleanup: callback() }; });
      },
    },
    render(callback) { stateIndex = refIndex = effectIndex = 0; pending = []; const tree = callback(); pending.forEach((run) => run()); return tree; },
    unmount() { effects.forEach((effect) => effect?.cleanup?.()); },
  };
}
const jsx = { Fragment: "Fragment", jsx: (type, props) => ({ type, props }), jsxs: (type, props) => ({ type, props }) };
const source = fs.readFileSync(new URL("../src/components/artworks/ArtworkReorderHandle.tsx", import.meta.url), "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText;
function nodes(node, predicate) {
  const result = [];
  const visit = (item) => { if (Array.isArray(item)) return item.forEach(visit); if (!item || typeof item !== "object") return; if (predicate(item)) result.push(item); visit(item.props?.children); };
  visit(node); return result;
}
const text = (node) => typeof node === "string" ? node : Array.isArray(node) ? node.map(text).join("") : node?.props ? text(node.props.children) : "";
const control = (tree) => nodes(tree, (node) => node.type === "button")[0];
const status = (tree) => text(nodes(tree, (node) => node.props?.role === "status")[0]);
function event(changes = {}) {
  return { pointerId: 1, button: 0, isPrimary: true, clientX: 75, clientY: 90, prevented: 0, stopped: 0, preventDefault() { this.prevented++; }, stopPropagation() { this.stopped++; }, ...changes };
}

function fixture({ id = "a", year = 2026, disabled = false, cardSpecs } = {}) {
  const harness = hooks();
  const view = new Events(), document = new Events();
  let nextFrame = 0;
  const frames = new Map();
  view.requestAnimationFrame = (callback) => { const id = ++nextFrame; frames.set(id, callback); return id; };
  view.cancelAnimationFrame = (id) => frames.delete(id);
  document.defaultView = view;
  const root = { classList: new Classes("artworks-scroll"), scrollTop: 0, scrollHeight: 1800, clientHeight: 600, getBoundingClientRect: () => ({ left: 0, right: 800, top: 0, bottom: 600, width: 800, height: 600 }) };
  const specs = cardSpecs ?? [
    { id: "a", year: 2026, left: 40, top: 60 },
    { id: "b", year: 2026, left: 280, top: 60 },
    { id: "c", year: 2026, left: 40, top: 340 },
    { id: "d", year: 2025, left: 280, top: 340 },
  ];
  const cards = specs.map((item) => ({
    dataset: { artworkId: item.id, year: String(item.year) }, classList: new Classes("artwork-card"), style: new Style(),
    getBoundingClientRect() { const width = item.width ?? 200, height = item.height ?? 220, top = item.top - root.scrollTop; return { left: item.left, right: item.left + width, top, bottom: top + height, width, height }; },
  }));
  root.querySelectorAll = (selector) => { assert.equal(selector, ".artwork-card[data-artwork-id][data-year]"); return cards; };
  const button = new Events();
  const captured = new Set();
  button.ownerDocument = document;
  button.style = new Style();
  button.focuses = 0;
  button.focus = () => { button.focuses++; };
  button.setPointerCapture = (id) => captured.add(id);
  button.hasPointerCapture = (id) => captured.has(id);
  button.releasePointerCapture = (id) => captured.delete(id);
  button.closest = (selector) => selector.startsWith(".artwork-card") ? cards.find((card) => card.dataset.artworkId === props.id) : selector === ".artworks-scroll" ? root : null;
  const moves = [];
  let props = { id, year, disabled, label: "Original title", onMove: (source, target) => moves.push([source, target]) };
  const api = {};
  vm.runInNewContext(code, { exports: api, require: (name) => { if (name === "react") return harness.react; if (name === "react/jsx-runtime") return jsx; if (name.endsWith(".css")) return {}; throw new Error(`Unexpected dependency: ${name}`); } });
  const render = (changes = {}) => { props = { ...props, ...changes }; return harness.render(() => api.default(props)); };
  const start = (changes = {}) => { const pointer = event({ currentTarget: button, ...changes }); control(render()).props.onPointerDown(pointer); return pointer; };
  const move = (x, y, changes = {}) => { const pointer = event({ clientX: x, clientY: y, ...changes }); document.emit("pointermove", pointer); return pointer; };
  const up = (x, y, changes = {}) => { const pointer = event({ clientX: x, clientY: y, ...changes }); document.emit("pointerup", pointer); return pointer; };
  return {
    document, view, root, cards, button, captured, moves, render, start, move, up,
    frame(time) { const pending = [...frames.values()]; frames.clear(); pending.forEach((callback) => callback(time)); },
    get frameCount() { return frames.size; }, unmount: () => harness.unmount(),
  };
}
function clean(fixture) {
  assert.equal(fixture.document.listenerCount, 0, "document pointer/keyboard listeners are released");
  assert.equal(fixture.view.listenerCount, 0, "window blur listener is released");
  assert.equal(fixture.button.listenerCount, 0, "lost-capture listener is released");
  assert.equal(fixture.frameCount, 0, "the owning scroll animation frame is cancelled");
  assert.equal(fixture.captured.size, 0, "pointer capture is released");
  assert.equal(fixture.root.classList.contains("has-artwork-reorder"), false);
  for (const card of fixture.cards) {
    assert.deepEqual([...card.classList.values], ["artwork-card"], "temporary source/target outlines never persist");
    assert.equal(card.style.values.size, 0, "the handle never writes card transforms, opacity or row spacing");
  }
  assert.equal(fixture.button.style.values.size, 0, "the grip lift resets after every termination");
}

{
  const f = fixture();
  const tree = f.render(), button = control(tree);
  assert.equal(button.props.type, "button"); assert.equal(button.props.draggable, false);
  assert.ok(button.props["aria-label"].includes("Original title")); assert.ok(button.props["aria-label"].includes("2026"));
  assert.equal(Object.hasOwn(button.props, "title"), false, "the handle does not introduce native tooltips");
  const click = event(); button.props.onClick(click);
  assert.equal(click.prevented, 1); assert.equal(click.stopped, 1, "clicking the dedicated handle never opens/closes the artwork image");
  assert.equal(f.document.listenerCount, 0, "images and text fields do not acquire document drag listeners");
  const css = fs.readFileSync(new URL("../src/components/artworks/ArtworkReorderHandle.css", import.meta.url), "utf8");
  assert.match(css, /width:44px; height:44px; min-width:44px; min-height:44px/);
  assert.match(css, /touch-action:none/); assert.doesNotMatch(css, /opacity\s*:/, "reordering never fades source images/cards");
}
{
  const f = fixture(); f.start();
  assert.equal(f.captured.has(1), true);
  f.move(78, 94); // Exactly five pixels: below the six-pixel drag threshold.
  assert.equal(f.frameCount, 0); assert.equal(f.cards[0].classList.contains("is-artwork-reordering"), false);
  f.up(78, 94); assert.deepEqual(f.moves, []); clean(f);
}
for (const pointerType of ["mouse", "touch", "pen"]) {
  const f = fixture();
  const start = f.start({ pointerType }); assert.equal(start.prevented, 1); assert.equal(start.stopped, 1);
  f.move(350, 150);
  assert.equal(f.cards[0].classList.contains("is-artwork-reordering"), true);
  assert.equal(f.cards[1].classList.contains("is-artwork-reorder-target"), true);
  assert.equal(control(f.render()).props["aria-pressed"], true);
  f.up(350, 150);
  assert.deepEqual(f.moves, [["a", "b"]], `${pointerType} uses pointer capture, not HTML5 drag events`); clean(f);
  assert.deepEqual(f.cards.map((card) => card.dataset.artworkId), ["a", "b", "c", "d"], "the component emits intent without reordering DOM nodes");
}
{
  const f = fixture(); f.start(); f.move(100, 430); f.up(100, 430);
  assert.deepEqual(f.moves, [["a", "c"]], "2D targeting reaches a same-year card in the next responsive row"); clean(f);
}
{
  const f = fixture(); f.start(); f.move(270, 150); f.up(270, 150);
  assert.deepEqual(f.moves, [["a", "b"]], "the grid gap selects the geometrically nearest destination, not a horizontal-only index"); clean(f);
}
{
  const f = fixture(); f.start(); f.move(350, 430);
  assert.equal(f.cards[3].classList.contains("is-artwork-reorder-invalid"), true);
  assert.ok(f.cards.every((card) => !card.classList.contains("is-artwork-reorder-target")));
  f.up(350, 430); assert.deepEqual(f.moves, []);
  assert.match(status(f.render()), /solo tra opere del 2026/, "cross-year release has visible feedback and never calls onMove"); clean(f);
}
{
  const f = fixture(); f.start(); f.move(350, 150); f.cards[1].dataset.year = "2025"; f.up(350, 150);
  assert.deepEqual(f.moves, [], "a target-year change just before release is revalidated"); clean(f);
}
{
  const f = fixture(); f.start(); f.move(350, 150); f.cards[0].dataset.year = "2025"; f.up(350, 150);
  assert.deepEqual(f.moves, [], "a stale source year cannot bypass the same-year rule"); clean(f);
}
{
  const f = fixture(); f.start();
  f.move(350, 150, { pointerId: 99 }); f.up(350, 150, { pointerId: 99 });
  assert.deepEqual(f.moves, []); assert.equal(f.captured.has(1), true, "unrelated pointers cannot finish the active gesture");
  f.move(350, 150); f.move(920, 150); f.up(920, 150);
  assert.deepEqual(f.moves, [], "releasing outside the owning scroll surface cancels the drop"); clean(f);
}
{
  const f = fixture(); const unrelatedScroll = { scrollTop: 123 };
  f.start(); f.move(100, 590); f.frame(0); f.frame(16); f.frame(32);
  assert.ok(f.root.scrollTop > 0, "a held pointer near the lower edge auto-scrolls the gallery without further move events");
  assert.equal(unrelatedScroll.scrollTop, 123);
  const below = f.root.scrollTop; f.move(100, 8); f.frame(48); f.frame(64);
  assert.ok(f.root.scrollTop < below, "the upper edge scrolls the same owning surface back up");
  f.document.emit("pointercancel", event()); clean(f); assert.deepEqual(f.moves, []);
}
for (const reason of ["pointercancel", "lostpointercapture", "blur", "Escape", "unmount", "disabled", "year-change"]) {
  const f = fixture(); f.start(); f.move(350, 150);
  const focusBefore = f.button.focuses;
  if (reason === "pointercancel") f.document.emit("pointercancel", event());
  else if (reason === "lostpointercapture") { f.captured.delete(1); f.button.emit(reason, event()); }
  else if (reason === "blur") f.view.emit("blur");
  else if (reason === "Escape") { const key = event({ key: "Escape" }); f.document.emit("keydown", key); assert.equal(key.prevented, 1); assert.equal(key.stopped, 1); assert.equal(f.button.focuses, focusBefore + 1); }
  else if (reason === "unmount") f.unmount();
  else if (reason === "disabled") f.render({ disabled: true });
  else f.render({ year: 2025 });
  assert.deepEqual(f.moves, [], `${reason} cannot commit an unfinished reorder`); clean(f);
  if (reason === "blur") assert.equal(f.button.focuses, focusBefore, "window blur cleanup never steals focus back");
  f.document.emit("pointerup", event({ clientX: 350, clientY: 150 }));
  assert.deepEqual(f.moves, [], "a release queued after cancellation cannot commit stale intent");
}
{
  const f = fixture({ disabled: true }); f.start();
  const key = event({ currentTarget: f.button, key: "ArrowRight" }); control(f.render()).props.onKeyDown(key);
  assert.deepEqual(f.moves, []); clean(f);
}
for (const [id, key, expected] of [["b", "ArrowLeft", "a"], ["b", "ArrowUp", "a"], ["b", "ArrowRight", "c"], ["b", "ArrowDown", "c"], ["b", "Home", "a"], ["b", "End", "c"]]) {
  const f = fixture({ id });
  const keyEvent = event({ currentTarget: f.button, key }); control(f.render()).props.onKeyDown(keyEvent);
  assert.deepEqual(f.moves, [[id, expected]], "keyboard order follows previous/next same-year DOM peers across rows");
  assert.equal(keyEvent.prevented, 1); assert.equal(keyEvent.stopped, 1); clean(f);
}
{
  const f = fixture({ id: "c" });
  const key = event({ currentTarget: f.button, key: "ArrowRight" }); control(f.render()).props.onKeyDown(key);
  assert.deepEqual(f.moves, [], "keyboard cannot cross into the next chronological year");
  assert.match(status(f.render()), /Nessun'altra opera del 2026/); clean(f);
}
for (const invalid of [{ button: 2 }, { isPrimary: false }]) {
  const f = fixture(); f.start(invalid); assert.deepEqual(f.moves, []); clean(f);
}
console.log("PASS: dedicated 44px artwork handle supports mouse/touch/pen, threshold/capture, responsive 2D same-year drops, own-scroll auto-scroll and keyboard order; all cancellation/disabled/year-change/blur/unmount paths clean listeners, capture, RAF and visual state (no network/storage writes).");
