// Repository contract checks with a fully mocked Supabase client. This script
// does not use environment credentials, contact a server or execute migrations.
import fs from "node:fs";
import vm from "node:vm";
import assert from "node:assert/strict";
import ts from "typescript";

const source = fs.readFileSync(new URL("../src/services/bookCommentRepository.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const base = { id: "c1", book_id: "b1", book_page_id: "p1", body: "Testo", anchor_x: .2, anchor_y: .3, is_visible: true, created_by: "owner", created_at: "2026-11-14T10:00:00Z", updated_at: "" };
const style = { backgroundColor: "#dde2e5", textColor: "#414a51", backgroundOpacity: .75, fontSize: 14 };
const missingFont = { code: "PGRST204", message: "Could not find the 'font_size' column of 'book_comments' in the schema cache" };
const missingTitle = { code: "PGRST204", message: "Could not find the 'title' column of 'book_comments' in the schema cache" };
let responses = [];
let user = { id: "owner" };
let authCalls = 0;
let fromCalls = 0;
const queries = [];
const events = [];
function reset() { responses = []; user = { id: "owner" }; authCalls = fromCalls = 0; queries.length = events.length = 0; }
const supabase = {
  auth: { getUser: async () => { authCalls++; return { data: { user }, error: null }; } },
  from(table) {
    fromCalls++;
    assert.equal(table, "book_comments");
    let operation = "select";
    let payload;
    let range;
    const filters = [];
    const finish = () => { queries.push({ operation, payload, range, filters: [...filters] }); return responses.shift() ?? { data: { ...base }, error: null }; };
    const chain = {
      insert(value) { operation = "insert"; payload = value; return chain; },
      update(value) { operation = "update"; payload = value; return chain; },
      delete() { operation = "delete"; return chain; },
      select() { return chain; },
      eq(field, value) { filters.push([field, value]); return chain; },
      order() { return chain; },
      range(start, end) { range = [start, end]; return chain; },
      abortSignal() { return Promise.resolve(finish()); },
      single() { return Promise.resolve(finish()); },
      then(resolve, reject) { return Promise.resolve(finish()).then(resolve, reject); },
    };
    return chain;
  },
};
const exported = {};
const richExports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync(new URL("../src/lib/bookRichText.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: richExports });
vm.runInNewContext(js, {
  exports: exported,
  AbortController,
  setTimeout,
  clearTimeout,
  console,
  window: { dispatchEvent: (event) => events.push(event) },
  CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options?.detail; } },
  require: (id) => {
    if (id === "@/lib/supabase") return { supabase };
    if (id === "@/services/bookRepository") return { isBuiltInBook: (bookId) => bookId.startsWith("local-") };
    if (id === "@/lib/bookRichText") return richExports;
    throw new Error(`Unexpected dependency: ${id}`);
  },
});

reset();
await exported.updateBookComment("c1", { body: "  Spostato  ", fontSize: 28, anchorX: 2, anchorY: -.4 });
assert.equal(authCalls, 1);
assert.equal(queries.length, 1);
assert.equal(queries[0].payload.body, "Spostato");
assert.equal(queries[0].payload.font_size, 28);
assert.equal(queries[0].payload.anchor_x, 1);
assert.equal(queries[0].payload.anchor_y, 0);
assert.equal(queries[0].filters[0][0], "id");
assert.equal(queries[0].filters[0][1], "c1");
assert.equal(events[0].type, "book-comments-changed");

reset();
await exported.updateBookComment("c1", { body: "Testo", title: "  Titolo personale  " });
assert.equal(queries[0].payload.title, "Titolo personale");
for (const title of [null, "", "   "]) {
  reset();
  await exported.updateBookComment("c1", { body: "Testo", title });
  assert.equal(queries[0].payload.title, null, "explicit empty title clears a saved heading");
}
for (const create of [false, true]) {
  reset();
  const input = { body: "Testo", title: "A".repeat(121), bookId: "b1", bookPageId: "p1", anchorX: .2, anchorY: .3 };
  await assert.rejects(() => create ? exported.createBookComment(input) : exported.updateBookComment("c1", input), /120 caratteri/);
  assert.equal(fromCalls, 0, "oversized titles never reach the table");
}
for (const title of [undefined, null, "   "]) {
  reset();
  await exported.createBookComment({ bookId: "b1", bookPageId: "p1", body: "Testo", title, anchorX: .2, anchorY: .3 });
  assert.equal(Object.hasOwn(queries[0].payload, "title"), false, "blank create title is omitted");
}
reset();
await exported.createBookComment({ bookId: "b1", bookPageId: "p1", body: "Testo", title: "  Creato  ", anchorX: .2, anchorY: .3 });
assert.equal(queries[0].payload.title, "Creato");
for (const error of [missingTitle, missingFont]) {
  for (const create of [false, true]) {
    reset();
    responses = [{ data: null, error }];
    const input = { body: "Titolo non perdibile", title: "Titolo", ...style, bookId: "b1", bookPageId: "p1", anchorX: .2, anchorY: .3 };
    await assert.rejects(() => create ? exported.createBookComment(input) : exported.updateBookComment("c1", input), /20261114010000_comment_colors.sql/);
    assert.equal(queries.length, 1, "fallback never drops a nonempty title");
  }
}
reset();
responses = [{ data: null, error: missingTitle }, { data: { ...base }, error: null }];
await exported.updateBookComment("c1", { body: "Legacy", title: " ", ...style, anchorX: .4 });
assert.equal(queries.length, 2);
assert.equal(Object.hasOwn(queries[1].payload, "title"), false);
assert.equal(queries[1].payload.anchor_x, .4);

for (const fontSize of [9, 49, NaN, Infinity]) {
  reset();
  await assert.rejects(() => exported.updateBookComment("c1", { body: "Testo", fontSize }), /10 e 48/);
  assert.equal(fromCalls, 0);
}
for (const anchorX of [NaN, Infinity]) {
  reset();
  await assert.rejects(() => exported.updateBookComment("c1", { body: "Testo", anchorX }), /posizione valida/);
  assert.equal(fromCalls, 0);
}

reset();
responses = [{ data: null, error: missingFont }, { data: { ...base, is_visible: false, anchor_x: .4, anchor_y: .6 }, error: null }];
await exported.updateBookComment("c1", { body: "Legacy", ...style, anchorX: .4, anchorY: .6, isVisible: false });
assert.equal(queries.length, 2, "exact default style can retry old schemas");
for (const field of ["font_size", "background_color", "text_color", "background_opacity"]) assert.equal(Object.hasOwn(queries[1].payload, field), false, field);
assert.equal(queries[1].payload.anchor_x, .4);
assert.equal(queries[1].payload.anchor_y, .6);
assert.equal(queries[1].payload.is_visible, false);

for (const custom of [{ fontSize: 22 }, { backgroundColor: "#ff0000" }, { backgroundOpacity: .5 }]) {
  reset();
  responses = [{ data: null, error: missingFont }];
  await assert.rejects(() => exported.updateBookComment("c1", { body: "Custom", ...style, ...custom }), /20261114010000_comment_colors.sql/);
  assert.equal(queries.length, 1, "custom styles must not be silently discarded");
}
for (const error of [
  { code: "PGRST204", message: "Could not find the 'body' column of 'book_comments' in the schema cache" },
  { code: "42501", message: "new row violates row-level security policy" },
]) {
  reset();
  responses = [{ data: null, error }];
  await assert.rejects(() => exported.updateBookComment("c1", { body: "Testo", ...style }), new RegExp(error.code === "42501" ? "row-level security" : "body"));
  assert.equal(queries.length, 1, "permission/core-schema errors must not trigger style fallback");
}

reset();
responses = [{ data: null, error: missingFont }, { data: { ...base }, error: null }];
await exported.createBookComment({ bookId: "b1", bookPageId: "p1", body: "Creato", anchorX: -.2, anchorY: 1.7 });
assert.equal(authCalls, 1);
assert.equal(queries[0].payload.font_size, 14);
assert.equal(queries[0].payload.background_opacity, .75);
assert.equal(queries[1].payload.created_by, "owner");
assert.equal(queries[1].payload.anchor_x, 0);
assert.equal(queries[1].payload.anchor_y, 1);
assert.equal(Object.hasOwn(queries[1].payload, "font_size"), false);

reset();
await exported.createBookComment({ bookId: "b1", bookPageId: "p1", body: "Grande", anchorX: .2, anchorY: .3, fontSize: 48 });
assert.equal(queries[0].payload.font_size, 48);
reset();
responses = [{ data: null, error: missingFont }];
await assert.rejects(() => exported.createBookComment({ bookId: "b1", bookPageId: "p1", body: "Grande", anchorX: .2, anchorY: .3, fontSize: 24 }), /20261114010000_comment_colors.sql/);
assert.equal(queries.length, 1);

for (const action of [
  () => exported.updateBookComment("c1", { body: "Testo", fontSize: 14, anchorX: .5 }),
  () => exported.createBookComment({ bookId: "b1", bookPageId: "p1", body: "Testo", anchorX: .2, anchorY: .3 }),
  () => exported.listAdminBookComments(),
]) {
  reset();
  user = null;
  await assert.rejects(action, /login required/);
  assert.equal(fromCalls, 0, "unauthenticated admin writes/listing never reach the table");
}

reset();
await exported.updateBookComment("c1", { body: "Old caller" });
assert.equal(Object.hasOwn(queries[0].payload, "font_size"), false, "existing calls do not force metadata changes");
assert.equal(Object.hasOwn(queries[0].payload, "anchor_x"), false);
assert.equal(Object.hasOwn(queries[0].payload, "title"), false);

reset();
const rows = Array.from({ length: 1001 }, (_, index) => ({ ...base, id: `c-${index}`, is_visible: index % 2 === 0 }));
responses = [0, 500, 1000].map((start) => ({ data: rows.slice(start, start + 500), error: null }));
const all = await exported.listAdminBookComments("b1");
assert.equal(all.length, 1001);
assert.ok(all.some((comment) => !comment.is_visible));
assert.deepEqual(queries.map((query) => query.range), [[0, 499], [500, 999], [1000, 1499]]);
assert.ok(queries.every((query) => !query.filters.some(([field]) => field === "is_visible")));
assert.ok(queries.every((query) => query.filters.some(([field, value]) => field === "book_id" && value === "b1")));

reset();
responses = [{ data: null, error: { code: "42501", message: "row-level security rejected delete" } }];
await assert.rejects(() => exported.deleteBookComment("c1"), /row-level security/);
assert.equal(queries[0].filters[0][1], "c1", "delete remains scoped to one comment and honors RLS errors");

const migration = fs.readFileSync(new URL("../supabase/migrations/20261114010000_comment_colors.sql", import.meta.url), "utf8");
assert.match(migration, /add column if not exists font_size double precision not null default 14/i);
assert.match(migration, /font_size >= 10 and font_size <= 48/i);
assert.match(migration, /if not exists \(select 1 from pg_constraint[^\n]*book_comments_font_size_range/i);
assert.match(migration, /add column if not exists title text/i);
assert.match(migration, /title is null or char_length\(btrim\(title\)\) between 1 and 120/i);
assert.match(migration, /if not exists \(select 1 from pg_constraint[^\n]*book_comments_title_length/i);
assert.doesNotMatch(migration, /\bdrop\b|disable row level security/i);
const rich = { version: 1, paragraphs: [{ align: "center", runs: [{ text: "Testo", bold: true, italic: true }] }] };
const missingRich = { code: "PGRST204", message: "Could not find the 'rich_content' column of 'book_comments' in the schema cache" };
reset();
await exported.updateBookComment("c1", { body: "Testo", richContent: rich });
assert.equal(queries[0].payload.rich_content.paragraphs[0].runs[0].bold, true);
assert.equal(queries[0].payload.rich_content.paragraphs[0].align, "center");
for (const create of [false, true]) {
  reset(); responses = [{ data: null, error: missingRich }];
  const input = { body: "Testo", richContent: rich, bookId: "b1", bookPageId: "p1", anchorX: .2, anchorY: .3 };
  await assert.rejects(() => create ? exported.createBookComment(input) : exported.updateBookComment("c1", input), /20261115010000_comment_rich_content.sql/);
  assert.equal(queries.length, 1, "rich formatting is never silently dropped on an older schema");
}
reset(); responses = [{ data: null, error: missingRich }, { data: { ...base }, error: null }];
await exported.updateBookComment("c1", { body: "Testo", richContent: null, backgroundColor: "#112233", fontSize: 22 });
assert.equal(queries.length, 2);
assert.equal(Object.hasOwn(queries[1].payload, "rich_content"), false);
assert.equal(queries[1].payload.background_color, "#112233", "missing optional rich column never discards valid style changes");
reset(); responses = [{ data: null, error: missingFont }, { data: { ...base }, error: null }];
await exported.updateBookComment("c1", { body: "Testo", richContent: rich, ...style });
assert.equal(queries[1].payload.rich_content.paragraphs[0].runs[0].italic, true, "style-schema fallback preserves rich content");
reset();
await exported.createBookComment({ bookId: "b1", bookPageId: "p1", body: "Testo", richContent: richExports.bookRichFromText("Testo"), anchorX: .2, anchorY: .3 });
assert.equal(Object.hasOwn(queries[0].payload, "rich_content"), false, "default plain/justified comments stay legacy-compatible");
for (const value of [ { version: 1, paragraphs: [{ runs: [{ text: "Testo", html: "<script>" }] }] }, { version: 1, paragraphs: [{ align: "url(javascript:1)", runs: [{ text: "Testo" }] }] }, { version: 1, paragraphs: [{ runs: [{ text: "Diverso" }] }] } ]) {
  reset();
  await assert.rejects(() => exported.updateBookComment("c1", { body: "Testo", richContent: value }), /formattazione|formattato/);
  assert.equal(fromCalls, 0, "invalid or mismatched structured text never reaches the table");
}
reset();
await exported.updateBookComment("c1", { body: "Testo", anchorX: .4 });
assert.equal(Object.hasOwn(queries[0].payload, "rich_content"), false, "moving an existing comment preserves rich formatting");
const richMigration = fs.readFileSync(new URL("../supabase/migrations/20261115010000_comment_rich_content.sql", import.meta.url), "utf8");
assert.match(richMigration, /add column if not exists rich_content jsonb/i);
assert.match(richMigration, /book_comments_rich_content_shape/);
assert.doesNotMatch(richMigration, /\bdrop\b|disable row level security|\bupdate\s+public\.book_comments/i);
console.log("PASS: comment title/font/anchor contracts, title-safe legacy fallback, validation, auth/RLS errors, >1000-row admin pagination and additive migration shape (Supabase fully mocked).");
