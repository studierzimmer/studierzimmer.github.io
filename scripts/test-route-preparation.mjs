import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const source = fs.readFileSync(new URL("../src/components/navigation/RouteChoreography.tsx", import.meta.url), "utf8");
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 } }).outputText;
function deferred() { let resolve; const promise = new Promise((done) => { resolve = done; }); return { promise, resolve }; }
const flush = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
function fixture() {
  const effects = [], events = [], animations = [], updates = [];
  const preparation = deferred();
  const displayed = { key: "old", pathname: "/horlogerie" }, next = { key: "new", pathname: "/artworks" };
  const refs = [];
  const stage = { querySelector: () => null, querySelectorAll: () => [{ getBoundingClientRect: () => ({ width: 400, height: 600, top: 0, bottom: 600 }), closest: () => null, animate: () => { const pending = deferred(); const animation = { finished: pending.promise, cancel() {}, finish: pending.resolve }; animations.push(animation); return animation; } }] };
  const exports = {};
  vm.runInNewContext(output, {
    exports, CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init?.detail; } },
    window: { innerHeight: 844, matchMedia: () => ({ matches: false }), dispatchEvent(event) { events.push(event.type); if (event.type === "portfolio:before-exit") event.detail.waitUntil(preparation.promise); } },
    require(id) {
      if (id === "react") return { useEffect: (fn) => effects.push(fn), useState: (value) => [value === next ? displayed : value, (v) => updates.push(v)], useRef: (value) => { const ref = { current: value === null ? stage : value }; refs.push(ref); return ref; } };
      if (id === "react/jsx-runtime") return { jsx: () => null };
      if (id === "react-router-dom") return { useLocation: () => next, useNavigate: () => () => {} };
      if (id === "@/components/SiteEditControl") return { useInlineSiteEditing: () => ({ editing: false, settings: { menu_color: "#000000" } }) };
      throw new Error(id);
    },
  });
  exports.default({ children: () => null });
  const cleanup = effects[1]();
  return { preparation, animations, events, updates, cleanup, refs, displayed };
}
{
  const f = fixture();
  assert.deepEqual(f.events, ["portfolio:before-exit"]);
  assert.equal(f.animations.length, 0, "No canvas/viewport shrinking while camera is returning");
  f.preparation.resolve(); await flush();
  assert.equal(f.animations.length, 1, "Only after camera preparation may route exit start");
  assert.equal(f.updates.filter((v) => v?.pathname === "/artworks").length, 0);
  f.animations[0].finish(); await flush();
  assert.equal(f.updates.filter((v) => v?.pathname === "/artworks").length, 1);
  f.cleanup();
}
{
  const f = fixture();
  f.refs.find((ref) => ref.current?.key === "new").current = f.displayed;
  f.cleanup(); f.preparation.resolve(); await flush();
  assert.equal(f.animations.length, 0, "Canceled camera preparation never launches a stale route exit");
  assert.ok(f.events.includes("portfolio:before-exit-cancel"));
}
console.log("PASS: route exit waits for camera preparation before any shrink, commits after exit completion, and canceled navigation cannot replay stale animations (isolated React/DOM fixtures).");
