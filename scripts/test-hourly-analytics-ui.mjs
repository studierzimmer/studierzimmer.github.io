// Admin-only hourly UI regressions. All requests/clipboard operations are mocks.
// No credentials, network, real telemetry, database writes or browser are used.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const jsx = { jsx: (type, props, key) => ({ type, props: props ?? {}, key }), jsxs: (type, props, key) => ({ type, props: props ?? {}, key }) };
const compile = (path, require = () => { throw new Error("Unexpected runtime dependency"); }, globals = {}, extra = "") => {
  const api = {};
  const js = ts.transpileModule(read(path), { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  vm.runInNewContext(`${js}\n${extra}`, { exports: api, require, console, Intl, Error, ...globals });
  return api;
};
const plain = (value) => JSON.parse(JSON.stringify(value));
const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };
const flush = async () => { for (let i = 0; i < 20; i++) await Promise.resolve(); };
const nodes = (tree, predicate) => {
  if (!tree || typeof tree !== "object") return [];
  if (Array.isArray(tree)) return tree.flatMap((child) => nodes(child, predicate));
  return [...(predicate(tree) ? [tree] : []), ...nodes(tree.props?.children, predicate)];
};
const text = (tree) => {
  if (tree === null || tree === undefined || typeof tree === "boolean") return "";
  if (typeof tree !== "object") return String(tree);
  return Array.isArray(tree) ? tree.map(text).join(" ") : text(tree.props?.children);
};

function hooks() {
  const slots = [], effects = new Map(); let cursor = 0, writes = 0;
  const same = (left, right) => left && right && left.length === right.length && left.every((value, index) => Object.is(value, right[index]));
  const react = {
    useState(initial) {
      const index = cursor++;
      if (!(index in slots)) slots[index] = typeof initial === "function" ? initial() : initial;
      return [slots[index], (value) => { writes++; slots[index] = typeof value === "function" ? value(slots[index]) : value; }];
    },
    useRef(initial) { const index = cursor++; return slots[index] ??= { current: initial }; },
    useMemo(factory, dependencies) { const index = cursor++; if (!slots[index] || !same(slots[index].dependencies, dependencies)) slots[index] = { dependencies, value: factory() }; return slots[index].value; },
    useCallback(callback, dependencies) { return react.useMemo(() => callback, dependencies); },
    useEffect(callback, dependencies) {
      const index = cursor++, previous = effects.get(index);
      if (!previous || !same(previous.dependencies, dependencies)) effects.set(index, { dependencies, callback, cleanup: previous?.cleanup, pending: true });
    },
  };
  return {
    react,
    render(callback) {
      cursor = 0; const result = callback();
      for (const effect of effects.values()) if (effect.pending) {
        effect.cleanup?.(); effect.pending = false;
        // Cosmetic admin entry animation is not a data request/test clock.
        if (!String(effect.callback).includes("window.requestAnimationFrame")) effect.cleanup = effect.callback();
      }
      return result;
    },
    unmount() { effects.forEach((effect) => effect.cleanup?.()); },
    get writes() { return writes; },
  };
}

const helper = compile("src/lib/hourlyAnalytics.ts");
const hourly = (day, arrivals = 4, instagram = 2) => {
  const empty = helper.buildHourlyAnalyticsReport(day, []);
  empty.hours[0].arrivals = arrivals; empty.hours[0].instagram = instagram;
  return { ...empty, arrivals, instagram };
};
function panel(properties = {}, clipboard) {
  const harness = hooks(), copied = [], changes = [], refreshes = [];
  const api = compile("src/components/admin/AdminHourlyTraffic.tsx", (id) => {
    if (id === "react") return harness.react;
    if (id === "react/jsx-runtime") return jsx;
    throw new Error(`The presentational hourly component must not fetch: ${id}`);
  }, { navigator: clipboard ? { clipboard: { writeText: (url) => { copied.push(url); return clipboard(url); } } } : {} });
  let props = { day: "2026-11-25", report: hourly("2026-11-25"), loading: false, error: null, onDayChange: (day) => changes.push(day), onRefresh: () => refreshes.push(true), ...properties };
  return { copied, changes, refreshes, exclusion: (props) => api.AnalyticsTrafficExclusionControl(props), render(patch = {}) { props = { ...props, ...patch }; return harness.render(() => api.default(props)); }, unmount: () => harness.unmount(), get writes() { return harness.writes; } };
}

for (const [day, count] of [["2026-03-29", 23], ["2026-11-25", 24], ["2026-10-25", 25]]) {
  const report = hourly(day), fixture = panel({ day, report }), tree = fixture.render();
  const body = nodes(tree, (node) => node.type === "tbody")[0];
  const rows = nodes(body, (node) => node.type === "tr");
  assert.equal(rows.length, count, "the UI must not fabricate a fixed24-hour array across DST");
  assert.equal(new Set(rows.map((row) => row.key)).size, count, "ISO instants, not repeated labels, own each hourly row");
  assert.match(text(tree), /50\s*%/);
  assert.match(text(tree), /sessioni.*non persone uniche/i);
  assert.match(text(tree), /referrer mancanti.*non possono essere recuperati/i);
  if (count === 25) {
    assert.match(text(body), /02:00 \(UTC\+02:00\)/);
    assert.match(text(body), /02:00 \(UTC\+01:00\)/);
  }
  assert.equal(nodes(tree, (node) => node.type === "th" && node.props["aria-label"] === "Instagram")[0].props.children, "IG", "compact accessible header fits narrow mobile tables");
}
{
  const fixture = panel({ report: hourly("2026-11-25", 0, 0) });
  const tree = fixture.render();
  assert.doesNotMatch(text(tree), /QUOTA INSTAGRAM|\d%/);
  assert.match(text(tree), /Nessuna sessione con consenso/);
  assert.equal(nodes(tree, (node) => node.type === "article").length, 2);
}
{
  const fixture = panel({ report: null, loading: false, error: "offline" });
  const tree = fixture.render();
  assert.equal(nodes(tree, (node) => node.props.role === "alert")[0].props.children, "offline");
  const metrics = nodes(tree, (node) => node.type === "article");
  assert.ok(metrics.every((metric) => text(metric).includes("—")), "errors are unavailable, never fabricated zero visits");
  assert.equal(nodes(tree, (node) => node.type === "table").length, 0);
}
{
  const fixture = panel({ day: "2026-11-26", report: hourly("2026-11-25", 8, 2), loading: true });
  let tree = fixture.render();
  assert.match(text(tree), /Sono ancora visibili i dati del\s+2026-11-25/);
  assert.match(text(tree), /Dati del\s+2026-11-25/);
  assert.equal(nodes(tree, (node) => node.type === "button" && text(node).startsWith("Aggiornamento"))[0].props.disabled, true);
  tree = fixture.render({ loading: false, error: "New day unavailable" });
  assert.match(text(tree), /New day unavailable/); assert.match(text(tree), /Dati del\s+2026-11-25/);
  const date = nodes(tree, (node) => node.type === "input" && node.props.type === "date")[0];
  date.props.onChange({ currentTarget: { value: "" } }); assert.equal(fixture.changes.length, 0);
  date.props.onChange({ currentTarget: { value: "2026-11-27" } }); assert.deepEqual(fixture.changes, ["2026-11-27"]);
  nodes(tree, (node) => node.type === "button" && text(node) === "Aggiorna ore")[0].props.onClick(); assert.equal(fixture.refreshes.length, 1);
}
{
  const fixture = panel({}, async () => {});
  let tree = fixture.render();
  const link = nodes(tree, (node) => node.type === "input" && node.props.readOnly)[0];
  assert.equal(link.props.value, "https://www.studierzimmer.ch/?utm_source=instagram");
  assert.equal(link.props.style.userSelect, "text"); let selected = 0; link.props.onFocus({ currentTarget: { select: () => selected++ } }); assert.equal(selected, 1);
  nodes(tree, (node) => node.type === "button" && text(node) === "Copia link Instagram")[0].props.onClick(); await flush();
  assert.deepEqual(fixture.copied, [link.props.value]); tree = fixture.render(); assert.match(text(tree), /Link copiato/);
  assert.equal(nodes(panel().render(), (node) => node.type === "button" && text(node) === "Copia link Instagram").length, 0, "unsupported clipboard keeps the selectable manual-copy field");
}
{
  const pending = deferred(), fixture = panel({}, () => pending.promise);
  nodes(fixture.render(), (node) => node.type === "button" && text(node) === "Copia link Instagram")[0].props.onClick();
  fixture.unmount(); const before = fixture.writes; pending.resolve(); await flush(); assert.equal(fixture.writes, before, "clipboard completion cannot update an unmounted panel");
}
{
  const fixture = panel(), changes = [];
  const base = { excluded: false, automatic: false, persisted: true, reason: null, onChange: (value) => changes.push(value) };
  let tree = fixture.exclusion(base);
  assert.match(text(tree), /Esclusione disattivata/);
  assert.match(text(tree), /solo per gli eventi futuri/);
  assert.match(text(tree), /Non elimina né corregge i dati passati/);
  assert.match(text(tree), /non modifica il consenso/);
  nodes(tree, (node) => node.type === "input")[0].props.onChange({ currentTarget: { checked: true } }); assert.deepEqual(changes, [true]);
  tree = fixture.exclusion({ ...base, excluded: true, automatic: true, reason: "development" });
  const control = nodes(tree, (node) => node.type === "input")[0]; assert.equal(control.props.checked, true); assert.equal(control.props.disabled, true);
  control.props.onChange({ currentTarget: { checked: false } }); assert.deepEqual(changes, [true], "automatic development/local exclusion cannot be overridden through the UI");
  assert.match(text(tree), /ambiente di sviluppo/);
  tree = fixture.exclusion({ ...base, excluded: true, persisted: false }); assert.match(text(tree), /solo in questa scheda/);
}

// Execute the real container with deferred independent daily/hourly requests.
{
  const harness = hooks(), hourlyRequests = [], dailyRequests = [], exclusionWrites = [], listeners = new Map();
  let exclusion = { excluded: false, automatic: false, reason: null, persisted: true };
  const browser = { addEventListener(name, callback) { if (!listeners.has(name)) listeners.set(name, new Set()); listeners.get(name).add(callback); }, removeEventListener(name, callback) { listeners.get(name)?.delete(callback); } };
  const daily = { summary: { visits: 17, events: 20, pageViews: 18, clicks: 1, bookOpens: 0, modelOpens: 0 }, daily: [], breakdown: { devices: [], referrers: [], topTargets: [] } };
  class FixedDate extends Date { constructor(...args) { super(...(args.length ? args : ["2026-11-25T23:30:00.000Z"])); } }
  const api = compile("src/components/admin/AdminAnalyticsInfo.tsx", (id) => {
    if (id === "react") return { ...harness.react, default: harness.react };
    if (id === "react/jsx-runtime") return jsx;
    if (id === "./AdminHourlyTraffic") return { default: "AdminHourlyTraffic", AnalyticsTrafficExclusionControl: "AnalyticsTrafficExclusionControl" };
    if (id === "@/services/analyticsTracker") return { ANALYTICS_TRAFFIC_EXCLUSION_EVENT: "exclusion-changed", readAnalyticsTrafficExclusion: () => ({ ...exclusion }), setAnalyticsTrafficExcluded: (value) => { exclusionWrites.push(value); exclusion = { ...exclusion, excluded: value, reason: value ? "browser" : null }; } };
    if (id === "@/services/analyticsRepository") return {
      loadAnalyticsReport: async (range) => { dailyRequests.push(range); return daily; },
      loadHourlyAnalyticsReport: (day) => { const request = deferred(); hourlyRequests.push({ day, ...request }); return request.promise; },
    };
    throw new Error(`Unexpected container dependency: ${id}`);
  }, { Date: FixedDate, window: browser }, "exports.todayInRome = todayInRome;");
  assert.equal(api.todayInRome(), "2026-11-26", "default selected day is Rome, not the UTC date or browser locale");
  const render = () => harness.render(() => api.default());
  const hourlyProps = (tree) => nodes(tree, (node) => node.type === "AdminHourlyTraffic")[0].props;
  let tree = render(); assert.deepEqual(dailyRequests, [30]); assert.equal(hourlyRequests[0].day, "2026-11-26");
  const exclusionProps = () => nodes(tree, (node) => node.type === "AnalyticsTrafficExclusionControl")[0].props;
  assert.equal(exclusionProps().excluded, false); exclusionProps().onChange(true); tree = render();
  assert.deepEqual(exclusionWrites, [true]); assert.equal(exclusionProps().excluded, true, "the private panel stages only the browser-local preference");
  exclusion = { ...exclusion, excluded: false, reason: null }; listeners.get("storage").forEach((callback) => callback()); tree = render(); assert.equal(exclusionProps().excluded, false, "cross-tab storage updates refresh the visible preference");
  hourlyRequests[0].resolve(hourly("2026-11-26", 6, 2)); await flush(); tree = render();
  assert.equal(hourlyProps(tree).report.arrivals, 6);
  hourlyProps(tree).onDayChange("2026-11-27"); tree = render();
  hourlyProps(tree).onDayChange("2026-11-28"); tree = render();
  assert.equal(hourlyRequests.length, 3);
  hourlyRequests[2].resolve(hourly("2026-11-28", 9, 3)); await flush(); tree = render();
  hourlyRequests[1].resolve(hourly("2026-11-27", 999, 999)); await flush(); tree = render();
  assert.equal(hourlyProps(tree).report.day, "2026-11-28"); assert.equal(hourlyProps(tree).report.arrivals, 9, "an older day's response never replaces the selected day's report");
  hourlyProps(tree).onDayChange("2026-11-29"); tree = render(); hourlyRequests[3].reject(new Error("offline")); await flush(); tree = render();
  assert.match(hourlyProps(tree).error, /offline/); assert.equal(hourlyProps(tree).report.day, "2026-11-28", "an hourly error preserves the last successful report");
  assert.equal(dailyRequests.length, 1, "hourly controls/errors do not reload or clear the existing daily report");
  assert.equal(tree.props["aria-busy"], false, "the unchanged daily UI has its own settled loading state");
  hourlyProps(tree).onRefresh(); tree = render(); assert.equal(hourlyRequests[4].day, "2026-11-29");
  hourlyRequests[4].resolve(hourly("2026-11-29", 12, 4)); await flush(); tree = render();
  assert.equal(hourlyProps(tree).report.day, "2026-11-29"); assert.equal(hourlyProps(tree).error, null);
  hourlyProps(tree).onRefresh(); render(); const late = hourlyRequests[5]; harness.unmount(); const writes = harness.writes;
  late.resolve(hourly("2026-11-29", 500, 300)); await flush(); assert.equal(harness.writes, writes, "late responses cannot commit after leaving analytics");
  assert.equal([...listeners.values()].reduce((sum, callbacks) => sum + callbacks.size, 0), 0, "the optout panel removes both same-tab and cross-tab listeners on exit");
  assert.deepEqual(plain(daily), { summary: { visits: 17, events: 20, pageViews: 18, clicks: 1, bookOpens: 0, modelOpens: 0 }, daily: [], breakdown: { devices: [], referrers: [], topTargets: [] } });
}

console.log("PASS: hourly23/24/25-hour UI and Rome date, stable keys/real errors/retained reports, independent stale-safe requests, unchanged daily state, selectable Instagram link and browser-local/automatic exclusion controls+cleanup; synthetic mocks, no network/DBwrites.");
