// Actual analytics source with local mocks only: no credentials, DB, network,
// browser, cookie creation or persisted user data access.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const plain = (value) => JSON.parse(JSON.stringify(value));
function compile(source, require = () => { throw new Error("Unexpected dependency"); }, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports, require, Intl, URL, URLSearchParams, console, ...globals });
  return exports;
}
const helper = compile(read("src/lib/hourlyAnalytics.ts"));
const exclusion = compile(read("src/lib/analyticsTrafficExclusion.ts"));
for (const [day, count] of [["2026-11-25", 24], ["2026-03-29", 23], ["2026-10-25", 25]]) {
  const report = helper.buildHourlyAnalyticsReport(day, []);
  assert.equal(report.hours.length, count);
  assert.equal(report.timeZone, "Europe/Rome");
  assert.equal(new Set(report.hours.map((hour) => hour.start)).size, count);
  assert.equal(new Set(report.hours.map((hour) => hour.label)).size, count, "the repeated DST hour has distinct offset labels/UTC start keys");
  assert.equal(report.arrivals, 0); assert.equal(report.instagram, 0);
}
assert.deepEqual(plain(helper.romeDayInterval("2026-03-29")), { start: "2026-03-28T23:00:00.000Z", end: "2026-03-29T22:00:00.000Z" });
assert.deepEqual(plain(helper.romeDayInterval("2026-10-25")), { start: "2026-10-24T22:00:00.000Z", end: "2026-10-25T23:00:00.000Z" });
for (const day of ["2026-02-30", "2026-13-01", "25/11/2026", "not a date"]) assert.throws(() => helper.romeDayInterval(day));
for (const host of ["instagram.com", "www.instagram.com", "l.instagram.com", "m.instagram.com", "L.INSTAGRAM.COM", "instagram.com:443"]) assert.equal(helper.isInstagramReferrer(host), true);
for (const host of [null, "", "notinstagram.com", "instagram.com.evil.example", "instagram.com@evil.example", "https://instagram.com/path", ".instagram.com", "bad..instagram.com"]) assert.equal(helper.isInstagramReferrer(host), false);
for (const search of ["?utm_source=instagram", "?utm_source=Instagram&utm_campaign=bio", "?utm_source=INSTAGRAM"]) assert.equal(helper.hasDeclaredInstagramSource(search), true);
for (const search of ["", "?utm_source=not-instagram", "?utm_source=instagram.com", "?utm_source=%20instagram", "?utm_source=instagram&utm_source=unknown"]) assert.equal(helper.hasDeclaredInstagramSource(search), false);
const row = (id, session, at, extra = {}) => ({ id, session_id: session, recorded_at: at, referrer_host: null, value_int: null, ...extra });
{
  const rows = [
    row(5, "reload", "2026-10-25T02:15:00Z", { value_int: 1 }),
    row(1, "reload", "2026-10-25T00:15:00Z"),
    row(3, "referrer", "2026-10-25T01:15:00Z", { referrer_host: "l.instagram.com" }),
    row(4, "declared-link", "2026-10-25T01:20:00Z", { referrer_host: "example.org", value_int: 1 }),
    row(6, "spoof", "2026-10-25T01:30:00Z", { referrer_host: "instagram.com.evil.example" }),
    row(7, "outside", "2026-10-25T23:00:00Z", { value_int: 1 }),
  ];
  const before = plain(rows), report = helper.buildHourlyAnalyticsReport("2026-10-25", rows);
  assert.equal(report.arrivals, 4); assert.equal(report.instagram, 2, "one earliest session row per day; later reload source codes cannot reclassify the arrival");
  const repeated = report.hours.filter((hour) => hour.label.startsWith("02:00"));
  assert.equal(repeated[0].arrivals, 1); assert.equal(repeated[1].arrivals, 3);
  assert.deepEqual(plain(rows), before, "aggregation never mutates saved event rows/order");
}

function repositoryFixture({ rows = [], cap = 1000, failureAt = -1, allowed = true, adminError = null, missingCount = false } = {}) {
  const queries = []; let fromCalls = 0;
  const api = compile(read("src/services/analyticsRepository.ts"), (id) => {
    if (id === "@/lib/hourlyAnalytics") return helper;
    if (id !== "@/lib/supabase") throw new Error(`Unexpected ${id}`);
    return { supabase: {
      async rpc(name) { assert.equal(name, "is_admin"); return { data: allowed, error: adminError }; },
      from(table) {
        assert.equal(table, "analytics_events"); fromCalls++;
        const calls = []; queries.push(calls);
        return {
          select(columns, options) { assert.equal(columns, "id,session_id,recorded_at,referrer_host,value_int"); assert.equal(options.count, "exact"); calls.push(["select"]); return this; },
          eq(name, value) { assert.equal(name, "event_name"); assert.equal(value, "session_start"); calls.push(["event", value]); return this; },
          gte(name, value) { assert.equal(name, "recorded_at"); calls.push(["from", value]); return this; },
          lt(name, value) { assert.equal(name, "recorded_at"); calls.push(["to", value]); return this; },
          order(name, options) { assert.equal(options.ascending, true); calls.push(["order", name]); return this; },
          async range(first, last) {
            calls.push(["range", first, last]);
            assert.equal(last - first + 1, 1000);
            if (first === failureAt) return { error: { message: "Page unavailable" }, data: null, count: null };
            return { data: rows.slice(first, Math.min(last + 1, first + cap)), count: missingCount ? null : rows.length, error: null };
          },
        };
      },
    } };
  });
  return { api, queries, get fromCalls() { return fromCalls; } };
}
const many = Array.from({ length: 1501 }, (_, index) => row(index + 1, `session-${index < 1001 ? index : 0}`, new Date(Date.parse("2026-01-15T08:00:00Z") + index * 1000).toISOString(), { referrer_host: index === 0 ? "l.instagram.com" : null }));
for (const cap of [1000, 100]) {
  const fixture = repositoryFixture({ rows: many, cap });
  const result = await fixture.api.loadHourlyAnalyticsReport("2026-01-15");
  assert.equal(result.arrivals, 1001); assert.equal(result.instagram, 1);
  assert.equal(fixture.queries.length, Math.ceil(many.length / cap), "even a server row limit below1000 cannot silently truncate the report");
  assert.deepEqual(fixture.queries[0].filter(([name]) => name === "order"), [["order", "recorded_at"], ["order", "id"]]);
  assert.deepEqual(fixture.queries[1].at(-1), ["range", cap, cap + 999]);
}
assert.equal((await repositoryFixture().api.loadHourlyAnalyticsReport("2026-01-15")).arrivals, 0);
for (const options of [{ rows: many, failureAt: 1000 }, { allowed: false }, { adminError: { message: "No permission" } }, { rows: many, missingCount: true }]) {
  await assert.rejects(repositoryFixture(options).api.loadHourlyAnalyticsReport("2026-01-15"), "failed/unverifiable pages and permissions reject rather than showing fake zero/partial totals");
}

function trackerFixture(search, consent = "analytics") {
  const calls = [], local = new Map(), session = new Map(); let identifiers = 0;
  if (consent) local.set("studierzimmer_analytics_consent_v1", JSON.stringify({ version: 1, choice: consent, expiresAt: "2100-01-01T00:00:00Z" }));
  const storage = (map) => ({ getItem: (key) => map.get(key) ?? null, setItem: (key, value) => map.set(key, value), removeItem: (key) => map.delete(key) });
  const window = { location: { pathname: "/", search }, innerWidth: 390, localStorage: storage(local), sessionStorage: storage(session), dispatchEvent() {} };
  const api = compile(read("src/services/analyticsTracker.ts").replaceAll("import.meta.env.DEV", "false"), (id) => {
    if (id === "@/lib/hourlyAnalytics") return helper;
    if (id === "@/lib/analyticsTrafficExclusion") return exclusion;
    if (id !== "@/lib/supabase") throw new Error(`Unexpected ${id}`);
    return { supabase: { async rpc(name, input) { assert.equal(name, "track_analytics_event"); calls.push(input); return { data: true, error: null }; } } };
  }, {
    window, document: { referrer: "https://example.org/article?original=1" },
    crypto: { randomUUID: () => { identifiers++; return "00000000-0000-4000-8000-000000000001"; } },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
  });
  return { api, window, calls, local, session, get identifiers() { return identifiers; } };
}
for (const consent of [null, "necessary"]) {
  const fixture = trackerFixture("?utm_source=instagram&private=PERSONAL", consent);
  assert.equal(await fixture.api.trackAnalyticsEvent({ eventName: "page_view" }), false);
  assert.equal(fixture.calls.length, 0); assert.equal(fixture.identifiers, 0); assert.equal(fixture.session.size, 0, "denied/pending consent never creates a tracking ID or sends declared source");
}
{
  const fixture = trackerFixture("?utm_source=Instagram&private=PERSONAL", null);
  fixture.window.location.search = ""; fixture.window.location.pathname = "/bio";
  fixture.api.saveAnalyticsConsent("analytics");
  await fixture.api.trackAnalyticsEvent({ eventName: "page_view", path: "/bio?private=PERSONAL#PERSONAL" });
  assert.equal(fixture.calls[0].p_event_name, "session_start"); assert.equal(fixture.calls[0].p_value_int, 1);
  assert.equal(fixture.calls[0].p_referrer_host, "example.org", "declared Instagram UTM never fabricates or replaces the REAL referrer host");
  assert.equal(fixture.calls[0].p_path, "/bio"); assert.equal(fixture.calls[1].p_value_int, null);
  await fixture.api.trackAnalyticsEvent({ eventName: "book_page_view", valueInt: 7 });
  assert.equal(fixture.calls[2].p_value_int, 7, "the source code is scoped only to session_start; other numeric event semantics stay intact");
  assert.equal(fixture.identifiers, 1);
  assert.ok(!JSON.stringify([...fixture.local, ...fixture.session, ...fixture.calls]).includes("PERSONAL"), "full query/UTM text is never sent or persisted");
}
{
  const fixture = trackerFixture(""); fixture.window.location.search = "?utm_source=instagram";
  await fixture.api.trackAnalyticsEvent({ eventName: "page_view" });
  assert.equal(fixture.calls[0].p_value_int, null, "later SPA query changes cannot rewrite the original entry source");
}
console.log("PASS: Rome23/24/25-hour arrivals, earliest-session dedupe/strict Instagram attribution, complete ordered pagination/error handling, entry-only UTM code and unchanged consent/privacy/numeric event semantics (no network/writes).");
