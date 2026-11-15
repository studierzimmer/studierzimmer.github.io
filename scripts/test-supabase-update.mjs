// Supabase update verification. Static checks need no extra dependencies.
// SQL execution uses an EXTERNAL temporary @electric-sql/pglite installation:
// node scripts/test-supabase-update.mjs --pglite=/absolute/path/dist/index.js
// Never imports credentials, connects to Supabase or writes application data.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = fs.readFileSync(path.join(root, 'supabase/sql/update_studierzimmer_complete.sql'), 'utf8');
const check = spawnSync(process.execPath, [path.join(root, 'scripts/build-supabase-update.mjs'), '--check'], { encoding: 'utf8' });
assert.equal(check.status, 0, check.stderr);
assert.equal((source.match(/^begin;$/gim) || []).length, 1);
assert.equal((source.match(/^commit;$/gim) || []).length, 1);
assert.ok(source.indexOf('commit;') < source.indexOf('-- ===== 003_report.sql ====='));
assert.doesNotMatch(source, /^\s*(?:drop\s+table|truncate|delete\s+from|alter\s+(?:user|role))\b/im);
assert.doesNotMatch(source, /create\s+(?:or\s+replace\s+)?function\s+public\.is_admin\s*\(/i);
assert.match(source, /as restrictive/i);
console.log('PASS static: generated artifact matches fragments; one transaction, preserved owner predicate and no data-reset statements.');
const argument = process.argv.find((value) => value.startsWith('--pglite='));
const runtimePath = argument?.slice('--pglite='.length) || process.env.PGLITE_MODULE_PATH;
if (!runtimePath) {
  console.log('SKIP PostgreSQL execution: provide --pglite=/absolute/path/to/@electric-sql/pglite/dist/index.js (external temporary install; no project dependency).');
  process.exit(0);
}
assert.ok(path.isAbsolute(runtimePath) && fs.existsSync(runtimePath), 'PGlite runtime must be an existing absolute local file');
const { PGlite } = await import(pathToFileURL(runtimePath).href);
// The embedded engine loads its WASM through local Node filesystem access.
// Any accidental HTTP request from this harness is an immediate test failure.
const previousFetch = globalThis.fetch;
globalThis.fetch = () => { throw new Error('Network is disabled in SQL regression tests'); };
const uid = (number) => `00000000-0000-4000-8000-${String(number).padStart(12, '0')}`;
const OWNER = uid(1), MEMBER = uid(2);
const quote = (value) => `'${String(value).replaceAll("'", "''")}'`;
const identifier = (value) => `"${String(value).replaceAll('"', '""')}"`;
const readMigration = (name) => fs.readFileSync(path.join(root, 'supabase/migrations', name), 'utf8');
const rows = async (db, sql, params) => (await db.query(sql, params)).rows;
const scalar = async (db, sql) => Object.values((await rows(db, sql))[0])[0];

async function role(db, name, userId, operation) {
  assert.ok(['anon', 'authenticated', 'service_role'].includes(name));
  await db.exec(`begin; set local role ${name}; select set_config('request.jwt.claim.sub', ${quote(userId || '')}, true), set_config('request.jwt.claim.role', ${quote(name)}, true);`);
  try { return await operation(); }
  finally { await db.exec('rollback;'); }
}
async function denied(db, name, userId, sql) {
  await role(db, name, userId, async () => {
    try {
      const result = await db.query(sql);
      assert.equal(/^\s*select\b/i.test(sql) ? result.rows.length : result.affectedRows ?? 0, 0, `unauthorized operation unexpectedly succeeded: ${sql}`);
    } catch (error) {
      if (error instanceof assert.AssertionError) throw error;
      assert.ok(['42501', '23503', '23514'].includes(error.code), `unexpected denial ${error.code}: ${error.message}`);
    }
  });
}
async function bootstrap(db) {
  await db.exec(`
    create role anon nologin;
    create role authenticated nologin;
    create role service_role nologin bypassrls;
    create schema auth; create schema storage;
    create table auth.users(id uuid primary key);
    insert into auth.users values (${quote(OWNER)}),(${quote(MEMBER)});
    create function auth.uid() returns uuid language sql stable as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
    create function auth.role() returns text language sql stable as $$ select nullif(current_setting('request.jwt.claim.role', true), '') $$;
    create function public.is_admin() returns boolean language sql stable security definer set search_path = pg_catalog as $$ select coalesce(auth.uid() = '${OWNER}'::uuid, false) $$;
    grant usage on schema public,auth,storage to anon,authenticated,service_role;
    grant execute on function auth.uid(),auth.role(),public.is_admin() to anon,authenticated,service_role;
    create table storage.buckets(id text primary key,name text not null,public boolean not null default false,file_size_limit bigint,allowed_mime_types text[]);
    create table storage.objects(id uuid primary key default gen_random_uuid(),bucket_id text not null references storage.buckets(id),name text not null,owner uuid,metadata jsonb default '{}',unique(bucket_id,name));
    alter table storage.objects enable row level security;
    grant select,insert,update,delete on storage.objects to anon,authenticated;
    create policy fixture_legacy_storage_open on storage.objects for all to anon,authenticated using(true) with check(true);
    create table public.books(id uuid primary key default gen_random_uuid(),title text not null,slug text not null unique,storage_folder text not null,category text not null,description text not null default '',is_published boolean not null default false,is_featured boolean not null default false,sort_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
    create table public.book_pages(id uuid primary key default gen_random_uuid(),book_id uuid not null references public.books(id) on delete cascade,storage_path text not null,file_name text not null,page_number integer not null,created_at timestamptz not null default now());
    create table public.models_3d(id uuid primary key default gen_random_uuid(),name text not null,description text not null default '',file_name text not null,storage_path text not null unique,is_published boolean not null default false,is_featured boolean not null default false,sort_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
    insert into public.books(id,title,slug,storage_folder,category,is_published,created_at,updated_at) values
      ('${uid(10)}','Published book','published','published','sketches',true,'2026-01-01','2026-01-02'),
      ('${uid(11)}','Draft book','draft','draft','sketches',false,'2026-01-01','2026-01-02');
    insert into public.book_pages(id,book_id,storage_path,file_name,page_number,created_at) values
      ('${uid(20)}','${uid(10)}','published/0001.jpg','one.jpg',1,'2026-01-01'),
      ('${uid(21)}','${uid(11)}','draft/0001.jpg','private.jpg',1,'2026-01-01');
    insert into public.models_3d(id,name,file_name,storage_path,is_published,created_at,updated_at) values
      ('${uid(40)}','Published model','model.glb','published/model.glb',true,'2026-01-01','2026-01-02'),
      ('${uid(41)}','Draft model','model.glb','draft/model.glb',false,'2026-01-01','2026-01-02');
  `);
}

async function installLegacy(db) {
  // Real historical migrations expose the signed-in-but-not-admin character
  // flaw. New restrictive policies must close it without deleting old rules.
  for (const file of ['20260714000000_create_3d_models.sql', '20260715000000_book_backgrounds_and_private_models.sql', '20260715010000_book_page_format.sql', '20260715020000_add_step_model_sources.sql', '20260716000000_archive_sections_and_model_hdri.sql', '20260725000000_create_book_comments.sql', '20260726000000_create_3d_characters.sql', '20261112000000_site_content.sql', '20261114010000_comment_colors.sql', '20261115010000_comment_rich_content.sql']) await db.exec(readMigration(file));
  await db.exec(`
    update public.books set background_r=17,background_g=42,background_b=98,page_format='square' where id='${uid(10)}';
    update public.models_3d set source_format='step',source_file_name='source.step',source_storage_path='published/source.step',hdri_file_name='light.hdr',hdri_storage_path='published/light.hdr' where id='${uid(40)}';
    update public.models_3d set source_format='step',source_file_name='source.step',source_storage_path='draft/source.step',hdri_file_name='light.hdr',hdri_storage_path='draft/light.hdr' where id='${uid(41)}';
    insert into public.book_comments(id,book_id,book_page_id,body,anchor_x,anchor_y,created_by,is_visible,title,background_color,text_color,background_opacity,font_size,rich_content,created_at,updated_at) values
      ('${uid(30)}','${uid(10)}','${uid(20)}','preservato',.2,.3,'${OWNER}',true,'Titolo','#abcdef','#123456',.6,22,'{"version":1,"paragraphs":[{"align":"justify","runs":[{"text":"preservato","bold":true}]}]}','2026-01-01','2026-01-02'),
      ('${uid(31)}','${uid(10)}','${uid(20)}','hidden',.3,.4,'${OWNER}',false,null,'#DDE2E5','#414A51',.75,14,null,'2026-01-01','2026-01-02'),
      ('${uid(32)}','${uid(11)}','${uid(21)}','draft',.3,.4,'${OWNER}',true,null,'#DDE2E5','#414A51',.75,14,null,'2026-01-01','2026-01-02');
    update public.site_settings set data='{"ocean_title":"","ocean_about":"testo preservato","ocean_labels":{"exit":"Esci","start":""},"ocean_environment":{"waterColor":"#123456"},"unknown_existing":{"keep":true}}',updated_at='2026-01-02' where id='main';
    alter table public.site_settings drop constraint site_settings_id_check;
    insert into public.site_settings(id,data,updated_at) values('legacy-private','{"fixture_only":"not real private data"}','2026-01-02');
    insert into public.artworks(id,title,year,kind,media_url,is_fashion,is_published,description,created_at,updated_at) values
      ('${uid(60)}','Published art',2026,'image','https://example.invalid/art.jpg',true,true,'keep this','2026-01-01','2026-01-02'),
      ('${uid(61)}','Draft art',2025,'image','https://example.invalid/draft.jpg',false,false,'draft keep','2026-01-01','2026-01-02');
    insert into public.characters_3d(id,name,description,file_name,asset_source,storage_path,model_scale,camera_distance,is_published,is_featured,sort_order,created_at,updated_at) values
      ('${uid(50)}','Published figure','','pub.glb','storage','published/figure.glb',3.4,105,true,false,4,'2026-01-01','2026-01-02'),
      ('${uid(51)}','Draft figure','','draft.glb','storage','draft/figure.glb',3.6,100,false,false,5,'2026-01-01','2026-01-02');
    create table public.analytics_events(id uuid primary key,marker text);
    insert into public.analytics_events values('${uid(70)}','private analytics');
    insert into public.archive_sections(id,slug,name,code,is_visible) values('${uid(71)}','hidden-section','Hidden','HID',false);
  `);
  // Deliberately stronger than historical grants: prove old wide policies and
  // privileges cannot reopen managed resources after the combined update.
  for (const table of ['books', 'book_pages', 'models_3d', 'characters_3d', 'site_settings', 'artworks', 'book_comments', 'archive_sections', 'analytics_events']) await db.exec(`alter table public.${table} enable row level security; grant all privileges on public.${table} to anon,authenticated; create policy fixture_legacy_open on public.${table} for all to anon,authenticated using(true) with check(true);`);
  await db.exec(`
    insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values ('book-pages','book-pages',true,12345678,array['image/jpeg']),('unrelated','unrelated',false,987654,array['text/plain']) on conflict(id) do nothing;
    update storage.buckets set public=true where id in('models-3d','characters-3d');
    update storage.buckets set allowed_mime_types=null where id='site-assets';
    update storage.buckets set allowed_mime_types=array_append(allowed_mime_types,'application/x-studierzimmer-fixture') where id='models-3d';
    insert into storage.objects(bucket_id,name) values
      ('book-pages','published/0001.jpg'),('book-pages','draft/0001.jpg'),('site-assets','draft-art.jpg'),
      ('models-3d','published/model.glb'),('models-3d','published/light.hdr'),('models-3d','published/source.step'),
      ('models-3d','draft/model.glb'),('models-3d','draft/light.hdr'),('models-3d','draft/source.step'),
      ('characters-3d','published/figure.glb'),('characters-3d','draft/figure.glb'),('unrelated','keep.txt');
  `);
}

async function snapshot(db) {
  const tables = await rows(db, "select table_schema,table_name from information_schema.tables where table_type='BASE TABLE' and table_schema in('public','auth') order by table_schema,table_name");
  const output = [];
  for (const table of tables) {
    const columns = (await rows(db, 'select column_name from information_schema.columns where table_schema=$1 and table_name=$2 order by ordinal_position', [table.table_schema, table.table_name])).map((column) => column.column_name);
    const sql = `select ${columns.map(identifier).join(',')} from ${identifier(table.table_schema)}.${identifier(table.table_name)} order by id`;
    output.push({ sql, rows: JSON.stringify(await rows(db, sql)) });
  }
  return output;
}
async function preserve(db, snapshots) { for (const before of snapshots) assert.equal(JSON.stringify(await rows(db, before.sql)), before.rows, `existing data changed: ${before.sql}`); }
async function install(db) {
  const results = await db.exec(source);
  const report = results.at(-1).rows;
  assert.ok(Array.isArray(report) && report.some((entry) => entry.componente === 'Ocean / Featured In / menu / BIO'));
  return report;
}

let databases = 0;
async function database(operation) {
  const db = new PGlite(); databases++;
  try { await bootstrap(db); await operation(db); }
  finally { await db.close(); }
}

try {
  await database(async (db) => {
    const before = await snapshot(db), predicate = await scalar(db, "select pg_get_functiondef('public.is_admin()'::regprocedure)");
    await install(db); await install(db); await preserve(db, before);
    assert.equal(await scalar(db, "select pg_get_functiondef('public.is_admin()'::regprocedure)"), predicate);
    for (const table of ['site_settings', 'artworks', 'book_comments', 'characters_3d']) assert.equal(await scalar(db, `select to_regclass('public.${table}') is not null`), true);
    assert.equal(await scalar(db, "select count(*)::int from public.site_settings where id='main' and data='{}'::jsonb"), 1);
    assert.equal(await scalar(db, "select to_regprocedure('public.set_featured_book(uuid)') is null"), true, 'missing original RPC is audited, never fabricated');
    console.log('PASS PostgreSQL: fresh legacy-base update/rerun, original rows/admin predicate and missing-RPC semantics.');
  });
  await database(async (db) => {
    await installLegacy(db);
    await role(db, 'authenticated', MEMBER, async () => assert.ok((await db.query(`update public.characters_3d set name='legacy breach' where id='${uid(51)}'`)).affectedRows > 0, 'fixture actually reproduces the historical nonadmin character-write vulnerability'));
    const before = await snapshot(db), objects = JSON.stringify(await rows(db, 'select * from storage.objects order by id'));
    const buckets = await rows(db, 'select * from storage.buckets order by id');
    const predicate = await scalar(db, "select pg_get_functiondef('public.is_admin()'::regprocedure)");
    await install(db); await install(db); await preserve(db, before);
    assert.equal(await scalar(db, "select pg_get_functiondef('public.is_admin()'::regprocedure)"), predicate);
    assert.equal(JSON.stringify(await rows(db, 'select * from storage.objects order by id')), objects);
    for (const bucket of buckets) {
      const actual = (await rows(db, 'select * from storage.buckets where id=$1', [bucket.id]))[0];
      if (bucket.id === 'unrelated') assert.deepEqual(actual, bucket, 'unrelated bucket configuration is byte-for-byte unchanged');
      else {
        assert.deepEqual({ ...actual, allowed_mime_types: null }, { ...bucket, allowed_mime_types: null, public: ['models-3d', 'characters-3d'].includes(bucket.id) ? false : bucket.public });
        if (bucket.allowed_mime_types === null) assert.equal(actual.allowed_mime_types, null, 'unrestricted preexisting MIME configuration stays unrestricted');
        else for (const type of bucket.allowed_mime_types) assert.ok(actual.allowed_mime_types.includes(type), 'additive MIME support never removes an existing/custom MIME');
        if (bucket.id === 'book-pages') assert.ok(actual.allowed_mime_types.includes('image/webp'), 'new supported book image MIME is added without dropping old entries');
      }
    }
    const expected = { books: [uid(10)], book_pages: [uid(20)], models_3d: [uid(40)], artworks: [uid(60)], book_comments: [uid(30)] };
    for (const [roleName, userId] of [['anon', null], ['authenticated', MEMBER]]) {
      await role(db, roleName, userId, async () => {
        for (const [table, ids] of Object.entries(expected)) assert.deepEqual((await rows(db, `select id from public.${table} order by id`)).map((row) => row.id), ids, `${roleName} sees only published valid ${table} despite legacy allow-all`);
        assert.equal(await scalar(db, `select count(*)::int from public.characters_3d where id='${uid(51)}'`), 0);
        assert.equal(await scalar(db, "select count(*)::int from public.archive_sections where slug='hidden-section'"), 0);
        assert.equal(await scalar(db, 'select count(*)::int from public.site_settings'), 1);
        const visible = (await rows(db, "select bucket_id,name from storage.objects order by bucket_id,name")).map((row) => `${row.bucket_id}:${row.name}`);
        assert.deepEqual(visible, ['characters-3d:published/figure.glb', 'models-3d:published/light.hdr', 'models-3d:published/model.glb', 'unrelated:keep.txt']);
      });
      for (const table of ['books', 'book_pages', 'models_3d', 'characters_3d', 'artworks', 'book_comments']) {
        await denied(db, roleName, userId, `delete from public.${table}`);
        await denied(db, roleName, userId, `update public.${table} set id=id`);
      }
      await denied(db, roleName, userId, "update public.site_settings set data='{}'");
      await denied(db, roleName, userId, "insert into public.site_settings(id,data) values('main','{}') on conflict(id) do update set data=excluded.data");
      await denied(db, roleName, userId, "insert into public.artworks(title,year,kind,media_url) values('Unauthorized',2026,'image','x')");
      await denied(db, roleName, userId, "insert into public.characters_3d(name,file_name,asset_source,bundled_path) values('Unauthorized','x.glb','bundled','x.glb')");
      for (const bucket of ['book-pages', 'site-assets', 'models-3d', 'characters-3d']) {
        await denied(db, roleName, userId, `insert into storage.objects(bucket_id,name) values('${bucket}','unauthorized.bin')`);
        await denied(db, roleName, userId, `update storage.objects set name='unauthorized.bin' where bucket_id='${bucket}'`);
        await denied(db, roleName, userId, `delete from storage.objects where bucket_id='${bucket}'`);
      }
      await denied(db, roleName, userId, "update storage.objects set bucket_id='characters-3d' where bucket_id='unrelated' and name='keep.txt'");
    }
    await denied(db, 'authenticated', MEMBER, 'select * from public.analytics_events');
    await denied(db, 'anon', null, 'select * from public.analytics_events');
    await denied(db, 'authenticated', OWNER, "insert into public.book_comments(book_id,book_page_id,body,anchor_x,anchor_y,created_by) values('" + uid(10) + "','" + uid(21) + "','mismatch',.2,.3,'" + OWNER + "')");
    await denied(db, 'authenticated', OWNER, `insert into public.book_comments(book_id,book_page_id,body,anchor_x,anchor_y,created_by) values('${uid(10)}','${uid(20)}','forged',.2,.3,'${MEMBER}')`);
    for (const [column, value] of [['background_color', "'invalid'"], ['background_opacity', '0.1'], ['font_size', '99'], ['title', "'   '"], ['rich_content', "'[]'::jsonb"]]) await denied(db, 'authenticated', OWNER, `insert into public.book_comments(book_id,book_page_id,body,anchor_x,anchor_y,created_by,${column}) values('${uid(10)}','${uid(20)}','bad metadata',.2,.3,'${OWNER}',${value})`);
    await role(db, 'authenticated', OWNER, async () => {
      assert.equal(await scalar(db, 'select count(*)::int from public.books'), 2);
      assert.equal(await scalar(db, 'select count(*)::int from public.book_comments'), 3);
      assert.equal(await scalar(db, 'select count(*)::int from public.analytics_events'), 1);
      await db.exec(`insert into public.books(id,title,slug,storage_folder,category) values('${uid(93)}','Owner book','owner-test','owner-test','sketches'); insert into public.book_pages(id,book_id,storage_path,file_name,page_number) values('${uid(94)}','${uid(93)}','owner-test/0001.jpg','original.jpg',1); update public.books set title='Owner edited' where id='${uid(93)}'; update public.book_pages set page_number=2 where id='${uid(94)}'; delete from public.book_pages where id='${uid(94)}'; delete from public.books where id='${uid(93)}';`);
      await db.exec(`insert into public.models_3d(id,name,file_name,storage_path) values('${uid(95)}','Owner model','original.glb','owner/original.glb'); update public.models_3d set is_watch=true,plaster_color='#abcdef' where id='${uid(95)}'; delete from public.models_3d where id='${uid(95)}';`);
      await db.exec(`insert into public.artworks(id,title,year,kind,media_url,is_fashion,is_featured_in,external_url) values('${uid(90)}','Owner art',2026,'video','https://example.invalid/original.mp4',true,true,'https://example.invalid/article'); update public.artworks set description='edited' where id='${uid(90)}'; delete from public.artworks where id='${uid(90)}';`);
      await db.exec(`insert into public.book_comments(id,book_id,book_page_id,body,anchor_x,anchor_y,created_by,title,background_color,text_color,background_opacity,font_size,rich_content) values('${uid(91)}','${uid(10)}','${uid(20)}','Owner note',.2,.3,'${OWNER}','Title','#abcdef','#123456',.5,22,'{"version":1,"paragraphs":[{"runs":[{"text":"Owner note","italic":true}]}]}'); update public.book_comments set anchor_x=.9,is_visible=false,body='Moved' where id='${uid(91)}'; delete from public.book_comments where id='${uid(91)}';`);
      await db.exec("update public.site_settings set data=jsonb_set(data,'{ocean_labels}', '{\"exit\":\"\",\"start\":\"Avvia\"}') where id='main'");
      await db.exec(`insert into public.characters_3d(id,name,file_name,asset_source,storage_path,model_scale,camera_distance) values('${uid(92)}','Owner character','own.glb','storage','own/own.glb',3.6,100); update public.characters_3d set name='Owner edited' where id='${uid(92)}'; delete from public.characters_3d where id='${uid(92)}';`);
      for (const bucket of ['book-pages', 'site-assets', 'models-3d', 'characters-3d']) await db.exec(`insert into storage.objects(bucket_id,name) values('${bucket}','owner-test.bin'); update storage.objects set name='owner-renamed.bin' where bucket_id='${bucket}' and name='owner-test.bin'; delete from storage.objects where bucket_id='${bucket}' and name='owner-renamed.bin';`);
    });
    await role(db, 'authenticated', MEMBER, async () => {
      await db.exec("insert into storage.objects(bucket_id,name) values('unrelated','still-allowed.txt'); update storage.objects set name='still-allowed-edited.txt' where bucket_id='unrelated' and name='still-allowed.txt'; delete from storage.objects where bucket_id='unrelated' and name='still-allowed-edited.txt';");
    });
    assert.equal(await scalar(db, "select count(*)::int from pg_policies where policyname='fixture_legacy_open'"), 9, 'unrelated legacy policy definitions are preserved while restrictive gates close their bypass');
    await preserve(db, before);
    console.log('PASS PostgreSQL: legacy wide-policy bypass closed; anon/member publication + owner CRUD; comment validation; private previews/HDRI versus CAD/draft paths; unrelated storage preserved.');
  });
  await database(async (db) => {
    await installLegacy(db);
    await db.exec("alter table public.artworks add column external_url text; update public.artworks set external_url='javascript:legacy-invalid' where id='" + uid(60) + "'");
    const before = await snapshot(db), report = await install(db);
    await install(db); await preserve(db, before);
    assert.ok(report.some((entry) => entry.componente.endsWith('.sz_artworks_external_url') && entry.stato === 'VERIFICARE'), 'malformed old content is preserved and honestly reported');
    assert.equal(await scalar(db, "select convalidated from pg_constraint where conname='sz_artworks_external_url'"), false);
    await denied(db, 'authenticated', OWNER, "insert into public.artworks(title,year,kind,media_url,external_url) values('Invalid new link',2026,'image','x','javascript:blocked')");
    console.log('PASS PostgreSQL: malformed legacy content preserved byte-for-byte and reported; NOT VALID still blocks invalid new writes.');
  });
  for (const failure of ['missing-books', 'missing-admin', 'wrong-admin-return', 'admin-not-executable', 'storage-rls-off', 'private-public-media', 'wrong-existing-column']) await database(async (db) => {
    if (failure === 'missing-books') await db.exec('drop table public.book_pages; drop table public.books;');
    if (failure === 'wrong-admin-return') await db.exec('drop function public.is_admin(); create function public.is_admin() returns text language sql as $$select \'bad\'::text$$;');
    if (failure === 'missing-admin') await db.exec('drop function public.is_admin()');
    if (failure === 'admin-not-executable') await db.exec('revoke all on function public.is_admin() from public,authenticated');
    if (failure === 'storage-rls-off') await db.exec('alter table storage.objects disable row level security');
    if (failure === 'private-public-media') await db.exec("insert into storage.buckets(id,name,public) values('site-assets','site-assets',false)");
    if (failure === 'wrong-existing-column') await db.exec("create table public.site_settings(id text primary key,data text,updated_at timestamptz);insert into public.site_settings values('main','keep','2026-01-01')");
    const before = await snapshot(db);
    await assert.rejects(() => db.exec(source));
    await db.exec('rollback;');
    await preserve(db, before);
    assert.equal(await scalar(db, "select to_regclass('public.artworks') is null"), true, `${failure} must roll back every earlier DDL change`);
  });
  console.log(`PASS PostgreSQL: ${databases} isolated in-memory databases; one-script repeatability/data/JSON/admin preservation, role security, storage scoping and atomic preflight rollback. No real Supabase, files or credentials accessed.`);
  console.log('LIMIT: storage HTTP downloads, signed-URL/CDN expiry, actual JWT/auth configuration and existing SECURITY DEFINER RPC bodies require separate platform review; public book/site URLs remain public by design.');
} finally {
  globalThis.fetch = previousFetch;
}
