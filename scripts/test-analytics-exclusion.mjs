// Actual tracker/privacy source, all storage/RPC mocked: no network, credentials,
// DB mutations or reads of real browser/session data.
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
function compile(source, require = () => { throw new Error("Unexpected dependency"); }, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports, require, Intl, URL, URLSearchParams, console, ...globals });
  return exports;
}
const hourly = compile(read("src/lib/hourlyAnalytics.ts"));
const exclusion = compile(read("src/lib/analyticsTrafficExclusion.ts"));
const consentKey = "studierzimmer_analytics_consent_v1", sessionKey = "studierzimmer_analytics_session_v1", exclusionKey = exclusion.ANALYTICS_TRAFFIC_EXCLUSION_KEY;
const consentRecord = (choice = "analytics") => JSON.stringify({ version: 1, choice, expiresAt: "2100-01-01T00:00:00Z" });
for (const host of ["localhost", "LOCALHOST.", "preview.localhost", "127.0.0.1", "127.2.3.4", "::1", "[::1]", "0:0:0:0:0:0:0:1", "[::ffff:127.0.0.1]"]) assert.equal(exclusion.automaticAnalyticsTrafficExclusion(false, host), "local", host);
for (const host of ["www.studierzimmer.ch", "localhost.example", "notlocalhost", "128.0.0.1", "127.999.0.1", "192.168.1.10", "::2", undefined]) assert.equal(exclusion.automaticAnalyticsTrafficExclusion(false, host), null, host);
assert.equal(exclusion.automaticAnalyticsTrafficExclusion(true, "www.studierzimmer.ch"), "development");
let counter = 0;
function fixture({ development = false, hostname = "www.studierzimmer.ch", local = new Map([[consentKey, consentRecord()]]), localWriteBlocked = false, sessionRemoveBlocked = false, sessionWriteBlocked = false, pendingStart = null } = {}) {
  const calls = [], session = new Map(), events = []; let identifiers = 0;
  const window = {
    location: { pathname: "/", search: "?utm_source=instagram", hostname }, innerWidth: 390,
    localStorage: { getItem: (key) => local.get(key) ?? null, setItem: (key, value) => { if (localWriteBlocked) throw new Error("blocked"); local.set(key, value); }, removeItem: (key) => local.delete(key) },
    sessionStorage: { getItem: (key) => session.get(key) ?? null, setItem: (key, value) => { if (sessionWriteBlocked) throw new Error("blocked"); session.set(key, value); }, removeItem: (key) => { if (sessionRemoveBlocked) throw new Error("blocked"); session.delete(key); } },
    dispatchEvent: (event) => events.push(event),
  };
  const api = compile(read("src/services/analyticsTracker.ts").replaceAll("import.meta.env.DEV", String(development)), (id) => {
    if (id === "@/lib/hourlyAnalytics") return hourly;
    if (id === "@/lib/analyticsTrafficExclusion") return exclusion;
    assert.equal(id, "@/lib/supabase");
    return { supabase: { rpc(name, input) { assert.equal(name, "track_analytics_event", "no session deletion, end, auth or other RPC is introduced"); calls.push(input); if (input.p_event_name === "session_start" && pendingStart) return pendingStart; return Promise.resolve({ data: true, error: null }); } } };
  }, {
    window, document: { referrer: "https://example.org/" },
    crypto: { randomUUID() { identifiers++; return `00000000-0000-4000-8000-${String(++counter).padStart(12, "0")}`; } },
    CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } },
  });
  return { api, window, local, session, calls, events, get identifiers() { return identifiers; }, track: () => api.trackAnalyticsEvent({ eventName: "page_view" }) };
}
for (const options of [{ development: true }, { hostname: "localhost" }, { hostname: "127.0.0.1" }, { hostname: "[::1]" }]) {
  const f = fixture(options); f.session.set(sessionKey, "previous-id");
  assert.equal(await f.track(), false); assert.equal(f.calls.length, 0); assert.equal(f.identifiers, 0); assert.equal(f.session.has(sessionKey), false);
  const state = f.api.readAnalyticsTrafficExclusion(); assert.equal(state.excluded, true); assert.equal(state.automatic, true);
  f.api.setAnalyticsTrafficExcluded(false);
  assert.equal(await f.track(), false, "manual opt-in cannot override automatic local/development exclusion");
  assert.equal(f.identifiers, 0);
}
{
  const f = fixture(); await f.track();
  const firstId = f.calls[0].p_session_id, originalConsent = f.local.get(consentKey);
  assert.equal(f.calls.length, 2); assert.equal(f.identifiers, 1);
  f.api.setAnalyticsTrafficExcluded(true);
  assert.equal(f.session.has(sessionKey), false);
  assert.equal(f.api.readAnalyticsTrafficExclusion().reason, "browser"); assert.equal(f.api.readAnalyticsTrafficExclusion().persisted, true);
  assert.equal(await f.track(), false); assert.equal(f.calls.length, 2, "exclusion sends neither end/delete nor subsequent event");
  assert.equal(f.local.get(consentKey), originalConsent, "traffic exclusion is independent of existing consent");
  assert.equal(f.events.at(-1).type, f.api.ANALYTICS_TRAFFIC_EXCLUSION_EVENT);
  f.api.setAnalyticsTrafficExcluded(false); await f.track();
  assert.equal(f.calls.length, 4); assert.notEqual(f.calls[2].p_session_id, firstId, "explicit opt-in starts a new future session instead of resurrecting editor traffic");
  assert.equal(f.calls[2].p_value_int, 1, "the existing safe Instagram entry attribution still works for a genuinely enabled future session");
}
{
  const shared = new Map([[consentKey, consentRecord()]]), a = fixture({ local: shared }), b = fixture({ local: shared });
  await a.track(); const before = a.calls.length;
  b.api.setAnalyticsTrafficExcluded(true);
  assert.equal(await a.track(), false, "another tab's stored choice is checked afresh at every send, without relying on an event callback");
  assert.equal(a.calls.length, before); assert.equal(a.session.has(sessionKey), false);
  const fresh = fixture({ local: shared }); assert.equal(await fresh.track(), false); assert.equal(fresh.identifiers, 0, "the production opt-out persists across page loads");
  b.api.setAnalyticsTrafficExcluded(false); await a.track(); assert.equal(a.calls.length, before + 2);
}
{
  const f = fixture({ local: new Map([[consentKey, consentRecord("necessary")], [exclusionKey, "1"]]) });
  f.api.setAnalyticsTrafficExcluded(false); assert.equal(await f.track(), false); assert.equal(f.identifiers, 0, "opting into traffic counting never grants analytics consent");
}
{
  const f = fixture({ localWriteBlocked: true }); f.api.setAnalyticsTrafficExcluded(true);
  assert.equal(f.api.readAnalyticsTrafficExclusion().excluded, true); assert.equal(f.api.readAnalyticsTrafficExclusion().persisted, false);
  assert.equal(await f.track(), false); assert.equal(f.identifiers, 0, "a blocked preference write still immediately excludes this tab in memory");
  f.api.setAnalyticsTrafficExcluded(false); await f.track(); assert.equal(f.calls.length, 2);
  const saved = fixture({ localWriteBlocked: true, local: new Map([[consentKey, consentRecord()], [exclusionKey, "1"]]) });
  saved.api.setAnalyticsTrafficExcluded(false); assert.equal(await saved.track(), false, "a failed opt-in write cannot bypass an already saved opt-out");
}
{
  const f = fixture({ sessionRemoveBlocked: true, sessionWriteBlocked: true }); f.session.set(sessionKey, "stale-editor-id");
  await f.track(); assert.equal(f.calls[0].p_session_id, "stale-editor-id");
  f.api.setAnalyticsTrafficExcluded(true); f.api.setAnalyticsTrafficExcluded(false); await f.track();
  assert.notEqual(f.calls[2].p_session_id, "stale-editor-id", "even failed sessionStorage cleanup cannot revive an excluded ID");
  await f.track(); assert.equal(f.calls[4].p_session_id, f.calls[2].p_session_id, "memory fallback keeps the fresh session stable");
}
for (const optBackIn of [false, true]) {
  let resolve;
  const pendingStart = new Promise((done) => { resolve = done; });
  const f = fixture({ pendingStart }); const operation = f.track(); assert.equal(f.calls.length, 1);
  f.api.setAnalyticsTrafficExcluded(true); if (optBackIn) f.api.setAnalyticsTrafficExcluded(false);
  resolve({ data: true, error: null }); assert.equal(await operation, false);
  assert.equal(f.calls.length, 1, "a pending session_start cannot release a page event after exclusion or an opt-out/opt-in cycle");
}
console.log("PASS: automatic DEV/loopback exclusion, persistent cross-tab browser opt-out, no events/IDs while excluded, fresh consented opt-in, storage fallbacks and async send race protection (no network or DB writes).");
