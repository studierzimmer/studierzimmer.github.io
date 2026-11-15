-- STUDIER ZIMMER — AGGIORNAMENTO COMPLETO DEL PROGETTO ESISTENTE
-- Generato da scripts/build-supabase-update.mjs; non modificare questa copia a mano.
-- Dashboard del progetto originale > SQL Editor > New query > incollare TUTTO > Run.
-- Prima: backup verificato del database E dei file Storage. Non e' un backup.
-- Confrontare il Project URL con VITE_SUPABASE_URL: config.toml potrebbe puntare altrove.
-- Nessun reset, DROP TABLE, cancellazione dati, modifica utenti, password o assegnazione admin.
-- Prerequisiti: books/book_pages/models_3d e is_admin() originali. Se mancano, si ferma.
-- Modifiche in unica transazione: se falliscono sono annullate (ROLLBACK).
-- In fondo un report in sola lettura, dopo il commit.
-- Non registra migrazioni nella history Supabase e non pubblica il frontend.
-- site-assets/book-pages sono pubblici: un file noto puo' essere letto anche se la
-- relativa scheda e' una bozza. NON caricarvi originali riservati, segreti o CAD.
-- models-3d/characters-3d diventano/restano privati; lettura pubblica solo via
-- signed URL per anteprime/HDRI/figure pubblicate, non per sorgenti STEP/CAD.
-- Nuovi controlli non correggono silenziosamente righe vecchie non conformi:
-- leggere WARNING e risultati finali. Non equivale a un audit di tutta Supabase.

begin;
set local lock_timeout = '5s';
set local statement_timeout = '120s';
select pg_advisory_xact_lock(193701, 20261115);

-- ===== 001_schema.sql =====
-- Project-specific UPDATE, not an installer for an empty database.
-- Existing account ownership is deliberately not recreated or inferred.
do $preflight$
declare r record;
begin
  if to_regprocedure('public.is_admin()') is null or not exists (
    select 1 from pg_proc where oid = to_regprocedure('public.is_admin()')
      and prorettype = 'boolean'::regtype and not proretset and prokind = 'f'
  ) then
    raise exception 'Manca public.is_admin() con risultato boolean: aggiornamento annullato.'
      using hint = 'Usa il progetto originale Studier Zimmer. Non creare un nuovo admin o sostituire is_admin con un semplice controllo login.';
  end if;
  if not exists (select 1 from pg_roles where rolname = 'anon')
     or not exists (select 1 from pg_roles where rolname = 'authenticated')
     or to_regclass('auth.users') is null
     or to_regclass('storage.buckets') is null
     or to_regclass('storage.objects') is null
     or to_regprocedure('auth.uid()') is null then
    raise exception 'Non e'' un progetto Supabase compatibile: nessuna modifica eseguita.';
  end if;
  if not has_function_privilege('authenticated', 'public.is_admin()', 'EXECUTE') then
    raise exception 'Il ruolo authenticated non puo'' richiamare is_admin(): verifica la configurazione originale.';
  end if;
  if not (select relrowsecurity from pg_class where oid = 'storage.objects'::regclass) then
    raise exception 'RLS di storage.objects non attivo: verificare la piattaforma prima di continuare.';
  end if;
  for r in select * from (values
    ('books', 'id', 'uuid'), ('books', 'is_published', 'boolean'),
    ('book_pages', 'id', 'uuid'), ('book_pages', 'book_id', 'uuid'),
    ('book_pages', 'storage_path', 'text'),
    ('models_3d', 'id', 'uuid'), ('models_3d', 'is_published', 'boolean'),
    ('models_3d', 'storage_path', 'text')
  ) as required(table_name, column_name, type_name) loop
    if not exists (
      select 1 from pg_attribute a join pg_class c on c.oid = a.attrelid
      join pg_namespace n on n.oid = c.relnamespace
      where n.nspname = 'public' and c.relname = r.table_name and c.relkind in ('r', 'p')
        and a.attname = r.column_name and a.atttypid = to_regtype(r.type_name)
        and a.attnum > 0 and not a.attisdropped
    ) then
      raise exception 'Schema originale non compatibile: public.%.% deve esistere ed essere %.', r.table_name, r.column_name, r.type_name
        using hint = 'Nessuna tabella originale viene ricreata. Verifica il progetto e conserva il messaggio completo.';
    end if;
  end loop;
  for r in select c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public' and c.relname in ('site_settings', 'artworks', 'book_comments', 'characters_3d')
      and c.relkind not in ('r', 'p') loop
    raise exception 'public.% esiste ma non e'' una tabella: aggiornamento annullato.', r.relname;
  end loop;
end;
$preflight$;

-- Add missing UI fields only. Never normalize/overwrite saved values.
alter table public.books
  add column if not exists background_r smallint not null default 255,
  add column if not exists background_g smallint not null default 255,
  add column if not exists background_b smallint not null default 255,
  add column if not exists page_format text not null default 'a4_long_edge';

alter table public.models_3d
  add column if not exists plaster_color text not null default '#EEEAE1',
  add column if not exists is_watch boolean not null default false,
  add column if not exists source_file_name text,
  add column if not exists source_storage_path text,
  add column if not exists source_format text,
  add column if not exists hdri_file_name text,
  add column if not exists hdri_storage_path text;

create table if not exists public.site_settings (
  id text primary key default 'main' check (id = 'main'),
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  updated_at timestamptz not null default now()
);
-- Ocean text, labels, colours, camera-independent water settings, menu, BIO,
-- splash and model categories use this JSON. Never overwrite it with defaults.
insert into public.site_settings(id, data) values ('main', '{}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(btrim(title)) > 0),
  year integer not null default extract(year from current_date)::integer check (year between 0 and 9999),
  kind text not null default 'image' check (kind in ('image', 'video', 'model')),
  media_url text not null default '', poster_url text,
  model_id uuid references public.models_3d(id) on delete set null,
  is_fashion boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.artworks
  add column if not exists is_featured_in boolean not null default false,
  add column if not exists external_url text,
  add column if not exists additional_images text[] not null default '{}'::text[],
  add column if not exists is_jewelry boolean not null default false;

create table if not exists public.book_comments (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  book_page_id uuid not null references public.book_pages(id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 600),
  anchor_x double precision not null check (anchor_x between 0 and 1),
  anchor_y double precision not null check (anchor_y between 0 and 1),
  created_by uuid references auth.users(id) on delete set null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.book_comments
  add column if not exists background_color text not null default '#DDE2E5',
  add column if not exists text_color text not null default '#414A51',
  add column if not exists background_opacity double precision not null default 0.75,
  add column if not exists font_size double precision not null default 14,
  add column if not exists title text,
  add column if not exists rich_content jsonb;

create table if not exists public.characters_3d (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(btrim(name)) > 0),
  description text not null default '', file_name text not null,
  asset_source text not null default 'storage', storage_path text, bundled_path text,
  model_scale numeric not null default 10,
  camera_distance numeric not null default 70,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- No seed replaces a selected figure or auto-publishes an existing draft.
-- The frontend already includes the original bundled figures as fallback.

-- Existing tables must actually match the known legacy schema, not merely
-- share its name. An incompatible partial/manual table rolls back the update.
do $contracts$
declare r record;
begin
  for r in select * from (values
    ('site_settings','id','text'), ('site_settings','data','jsonb'), ('site_settings','updated_at','timestamptz'),
    ('artworks','id','uuid'), ('artworks','title','text'), ('artworks','year','integer'),
    ('artworks','kind','text'), ('artworks','media_url','text'), ('artworks','poster_url','text'),
    ('artworks','model_id','uuid'), ('artworks','is_fashion','boolean'), ('artworks','is_published','boolean'),
    ('artworks','sort_order','integer'), ('artworks','description','text'), ('artworks','updated_at','timestamptz'),
    ('artworks','is_featured_in','boolean'), ('artworks','external_url','text'), ('artworks','additional_images','text[]'), ('artworks','is_jewelry','boolean'),
    ('book_comments','id','uuid'), ('book_comments','book_id','uuid'), ('book_comments','book_page_id','uuid'),
    ('book_comments','body','text'), ('book_comments','anchor_x','double precision'), ('book_comments','anchor_y','double precision'),
    ('book_comments','created_by','uuid'), ('book_comments','is_visible','boolean'), ('book_comments','updated_at','timestamptz'),
    ('book_comments','background_color','text'), ('book_comments','text_color','text'),
    ('book_comments','background_opacity','double precision'), ('book_comments','font_size','double precision'),
    ('book_comments','title','text'), ('book_comments','rich_content','jsonb'),
    ('characters_3d','id','uuid'), ('characters_3d','name','text'), ('characters_3d','description','text'),
    ('characters_3d','file_name','text'), ('characters_3d','asset_source','text'), ('characters_3d','storage_path','text'),
    ('characters_3d','bundled_path','text'), ('characters_3d','model_scale','numeric'), ('characters_3d','camera_distance','numeric'),
    ('characters_3d','is_published','boolean'), ('characters_3d','is_featured','boolean'), ('characters_3d','sort_order','integer'),
    ('characters_3d','created_at','timestamptz'), ('characters_3d','updated_at','timestamptz'),
    ('books','page_format','text'), ('books','background_r','smallint'), ('books','background_g','smallint'), ('books','background_b','smallint'),
    ('models_3d','source_storage_path','text'), ('models_3d','source_file_name','text'), ('models_3d','source_format','text'),
    ('models_3d','hdri_storage_path','text'), ('models_3d','hdri_file_name','text'), ('models_3d','plaster_color','text'), ('models_3d','is_watch','boolean')
  ) as expected(table_name, column_name, type_name) loop
    if not exists (select 1 from pg_attribute where attrelid = to_regclass('public.' || r.table_name)
      and attname = r.column_name and atttypid = to_regtype(r.type_name) and attnum > 0 and not attisdropped) then
      raise exception 'Schema non compatibile: public.%.% deve avere tipo %. Nessun contenuto modificato.', r.table_name, r.column_name, r.type_name;
    end if;
  end loop;
end;
$contracts$;

-- A prior partial column addition may not have installed its empty-list default.
-- This changes only future omitted values, never an existing image array.
alter table public.artworks
  alter column additional_images set default '{}'::text[],
  alter column is_jewelry set default false;

-- NOT VALID protects new writes without silently rewriting malformed legacy
-- rows. Validate when possible; report any remaining legacy exceptions.
do $checks$
declare r record;
begin
  for r in select * from (values
    ('site_settings','sz_settings_shape','id = ''main'' and data is not null and jsonb_typeof(data) = ''object'''),
    ('books','sz_books_rgb','background_r between 0 and 255 and background_g between 0 and 255 and background_b between 0 and 255'),
    ('books','sz_books_page_format','page_format in (''a4_long_edge'',''a4_short_edge'',''square'')'),
    ('models_3d','sz_models_colour','plaster_color ~* ''^#[0-9a-f]{6}$'''),
    ('models_3d','sz_models_source','(source_format is null and source_file_name is null and source_storage_path is null) or (source_format is not distinct from ''step'' and source_file_name is not null and source_storage_path is not null)'),
    ('models_3d','sz_models_hdri','(hdri_file_name is null and hdri_storage_path is null) or (hdri_file_name is not null and hdri_storage_path is not null)'),
    ('artworks','sz_artworks_content','title is not null and char_length(btrim(title)) > 0 and year between 0 and 9999 and kind in (''image'',''video'',''model'')'),
    ('artworks','sz_artworks_external_url','external_url is null or external_url ~* ''^https?://[^[:space:]]+$'''),
    ('artworks','sz_artworks_additional_images','additional_images is not null and case when cardinality(additional_images) = 0 then true when array_ndims(additional_images) = 1 then array_position(additional_images, null) is null else false end'),
    ('book_comments','sz_comments_body_anchor','body is not null and char_length(btrim(body)) between 1 and 600 and anchor_x between 0 and 1 and anchor_y between 0 and 1'),
    ('book_comments','sz_comments_colours','background_color ~* ''^#[0-9a-f]{6}$'' and text_color ~* ''^#[0-9a-f]{6}$'''),
    ('book_comments','sz_comments_opacity','background_opacity between 0.15 and 1'),
    ('book_comments','sz_comments_font','font_size between 10 and 48'),
    ('book_comments','sz_comments_title','title is null or char_length(btrim(title)) between 1 and 120'),
    ('book_comments','sz_comments_rich','rich_content is null or case when jsonb_typeof(rich_content) = ''object'' and rich_content->''version'' = ''1''::jsonb and jsonb_typeof(rich_content->''paragraphs'') = ''array'' then jsonb_array_length(rich_content->''paragraphs'') between 1 and 601 and octet_length(rich_content::text) <= 100000 else false end'),
    ('characters_3d','sz_characters_source','(asset_source = ''storage'' and storage_path is not null and bundled_path is null) or (asset_source = ''bundled'' and bundled_path is not null and storage_path is null)'),
    ('characters_3d','sz_characters_size','model_scale > 0 and model_scale <= 100 and camera_distance between 10 and 500')
  ) as checks(table_name, constraint_name, expression) loop
    if not exists (select 1 from pg_constraint where conrelid = to_regclass('public.' || r.table_name) and conname = r.constraint_name) then
      execute format('alter table public.%I add constraint %I check ((%s) is true) not valid', r.table_name, r.constraint_name, r.expression);
    end if;
    begin
      execute format('alter table public.%I validate constraint %I', r.table_name, r.constraint_name);
    exception when check_violation then
      raise warning 'Righe preesistenti da verificare in %.%: conservate intatte; nuovi inserimenti/modifiche sono protetti.', r.table_name, r.constraint_name;
    end;
  end loop;
end;
$checks$;

create index if not exists artworks_public_order_idx on public.artworks(sort_order, year desc) where is_published;
create index if not exists artworks_fashion_order_idx on public.artworks(sort_order) where is_published and is_fashion;
create index if not exists artworks_featured_order_idx on public.artworks(sort_order, year desc) where is_published and is_featured_in;
create index if not exists artworks_jewelry_order_idx on public.artworks(sort_order, year desc) where is_published and is_jewelry;
create index if not exists book_comments_book_idx on public.book_comments(book_id, created_at);
create index if not exists book_comments_page_idx on public.book_comments(book_page_id, created_at);
create index if not exists characters_3d_public_order on public.characters_3d(is_published, sort_order, created_at);
do $featured_indexes$
begin
  begin
    create unique index if not exists characters_3d_one_featured on public.characters_3d(is_featured) where is_featured = true;
  exception when unique_violation then
    raise warning 'Piu'' personaggi featured preesistenti: conservati. Scegliere un solo default dal backend e rieseguire.';
  end;
  begin
    create unique index if not exists models_3d_one_featured_idx on public.models_3d(is_featured) where is_featured = true;
  exception when unique_violation then
    raise warning 'Piu'' modelli featured preesistenti: conservati. Verificare i default dal backend e rieseguire.';
  end;
end;
$featured_indexes$;

create or replace function public.sz_touch_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin new.updated_at = pg_catalog.now(); return new; end;
$$;
revoke all on function public.sz_touch_updated_at() from public, anon, authenticated;
do $triggers$
declare t text;
begin
  foreach t in array array['site_settings','artworks','book_comments','characters_3d'] loop
    execute format('drop trigger if exists sz_touch_updated_at on public.%I', t);
    execute format('create trigger sz_touch_updated_at before update on public.%I for each row execute function public.sz_touch_updated_at()', t);
  end loop;
end;
$triggers$;

-- Public image/video buckets are required by the existing getPublicUrl client.
-- Never change an existing private media bucket into a public one silently.
insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types) values
  ('site-assets','site-assets',true,52428800,array['image/png','image/jpeg','image/gif','image/webp','image/avif','video/mp4','video/webm','video/quicktime','model/gltf-binary','model/gltf+json','application/octet-stream']),
  ('book-pages','book-pages',true,52428800,array['image/png','image/jpeg','image/gif','image/webp','image/avif']),
  ('models-3d','models-3d',false,104857600,array['model/gltf-binary','model/stl','application/sla','application/octet-stream','application/step','application/x-step','model/step','image/vnd.radiance','image/x-exr']),
  ('characters-3d','characters-3d',false,104857600,array['model/gltf-binary','model/gltf+json','application/octet-stream'])
on conflict (id) do nothing;
do $bucket_check$
begin
  if exists (select 1 from storage.buckets where id in ('site-assets','book-pages') and not public) then
    raise exception 'Un bucket media e'' privato: lo script non lo rende pubblico automaticamente.'
      using hint = 'Il frontend corrente usa URL pubblici per site-assets/book-pages. Verificare prima riservatezza e strategia di caricamento.';
  end if;
end;
$bucket_check$;
-- Tighten these existing buckets to the privacy model already used by the
-- application (short-lived signed URLs); files themselves are not modified.
update storage.buckets set public = false where id in ('models-3d','characters-3d') and public;

-- Add the current uploader's known MIME types to legacy allow-lists. Preserve
-- custom types, existing file-size limits and NULL (= already unrestricted).
-- No HTML/SVG/script types are added; only these four application buckets change.
do $mime_compatibility$
declare r record;
begin
  for r in select * from (values
    ('site-assets', array['image/png','image/jpeg','image/gif','image/webp','image/avif','video/mp4','video/webm','video/quicktime','model/gltf-binary','model/gltf+json','application/octet-stream']),
    ('book-pages', array['image/png','image/jpeg','image/gif','image/webp','image/avif']),
    ('models-3d', array['model/gltf-binary','model/stl','application/sla','application/octet-stream','application/step','application/x-step','model/step','image/vnd.radiance','image/x-exr']),
    ('characters-3d', array['model/gltf-binary','model/gltf+json','application/octet-stream'])
  ) as required(bucket_id, mime_types) loop
    update storage.buckets b set allowed_mime_types = (
      select array_agg(distinct mime order by mime) from unnest(b.allowed_mime_types || r.mime_types) as required_mime(mime)
    ) where b.id = r.bucket_id and b.allowed_mime_types is not null
      and not (b.allowed_mime_types @> r.mime_types);
  end loop;
end;
$mime_compatibility$;

-- ===== 002_security.sql =====
-- Security fragment of update_studierzimmer_complete.sql.
-- Run the complete updater, whose preflight and outer transaction cover this
-- fragment. No content, accounts, admin membership, or function definitions are
-- changed here. The existing trusted public.is_admin() remains authoritative.
--
-- A permissive policy is OR'ed with other permissive policies. Therefore the
-- allow policies below are paired with role/command-specific RESTRICTIVE
-- guards: an older permissive policy cannot reopen these app-owned resources.
-- Unknown policies are preserved; an unknown restrictive policy can still deny
-- a request and must be reviewed rather than silently removed.

do $app_security$
declare
  target record;
  policy_name text;
  admin_check constant text := 'coalesce((select public.is_admin()), false)';
  authenticated_read text;
  insert_check text;
  update_check text;
  delete_check text;
begin
  for target in
    select * from (values
      ('books', 'is_published = true', false),
      ('book_pages', $predicate$
        exists (
          select 1 from public.books as published_book
          where published_book.id = book_pages.book_id
            and published_book.is_published = true
        )
      $predicate$, false),
      ('models_3d', 'is_published = true', false),
      ('characters_3d', 'is_published = true', false),
      ('site_settings', 'id = ''main''', false),
      ('artworks', 'is_published = true', false),
      ('book_comments', $predicate$
        is_visible = true
        and exists (
          select 1 from public.books as published_book
          where published_book.id = book_comments.book_id
            and published_book.is_published = true
        )
        and exists (
          select 1 from public.book_pages as matching_page
          where matching_page.id = book_comments.book_page_id
            and matching_page.book_id = book_comments.book_id
        )
      $predicate$, false),
      ('archive_sections', 'is_visible = true', true),
      ('analytics_events', 'false', true)
    ) as resources(table_name, public_read, optional_table)
  loop
    if to_regclass(format('public.%I', target.table_name)) is null then
      if target.optional_table then
        continue;
      end if;
      raise exception 'Required app table public.% is missing.', target.table_name;
    end if;

    execute format('alter table public.%I enable row level security', target.table_name);
    -- RLS does not protect TRUNCATE. Reset privileges for these browser roles,
    -- then grant only the operations the current app needs. Table REVOKE also
    -- revokes corresponding column privileges.
    -- Owner/service-role privileges and privileges on other tables are intact.
    execute format('revoke all privileges on table public.%I from public, anon, authenticated', target.table_name);

    if target.table_name = 'analytics_events' then
      -- Existing analytics RPCs use SECURITY DEFINER and retain their existing
      -- owners/EXECUTE grants. No direct client INSERT/UPDATE/DELETE is allowed.
      execute 'grant select on table public.analytics_events to authenticated';
      authenticated_read := admin_check;
      insert_check := 'false';
      update_check := 'false';
      delete_check := 'false';
    else
      execute format('grant select on table public.%I to anon, authenticated', target.table_name);
      execute format('grant insert, update, delete on table public.%I to authenticated', target.table_name);
      authenticated_read := format('(%s) or (%s)', target.public_read, admin_check);
      insert_check := admin_check;
      update_check := admin_check;
      delete_check := admin_check;
      if target.table_name = 'book_comments' then
        update_check := format($predicate$
          (%s) and exists (
            select 1 from public.book_pages as matching_page
            where matching_page.id = book_comments.book_page_id
              and matching_page.book_id = book_comments.book_id
          )
        $predicate$, admin_check);
        insert_check := format('(%s) and created_by = (select auth.uid())', update_check);
      end if;
    end if;

    foreach policy_name in array array[
      'sz_allow_select_anon', 'sz_allow_select_authenticated',
      'sz_allow_insert_authenticated', 'sz_allow_update_authenticated',
      'sz_allow_delete_authenticated', 'sz_guard_select_anon',
      'sz_guard_select_authenticated', 'sz_guard_insert_anon',
      'sz_guard_update_anon', 'sz_guard_delete_anon',
      'sz_guard_insert_authenticated', 'sz_guard_update_authenticated',
      'sz_guard_delete_authenticated'
    ] loop
      execute format('drop policy if exists %I on public.%I', policy_name, target.table_name);
    end loop;

    -- Separate anon/auth policies ensure anonymous requests do not need to
    -- execute is_admin() as a consequence of any policy installed here.
    execute format('create policy sz_allow_select_anon on public.%I for select to anon using (%s)', target.table_name, target.public_read);
    execute format('create policy sz_guard_select_anon on public.%I as restrictive for select to anon using (%s)', target.table_name, target.public_read);
    execute format('create policy sz_allow_select_authenticated on public.%I for select to authenticated using (%s)', target.table_name, authenticated_read);
    execute format('create policy sz_guard_select_authenticated on public.%I as restrictive for select to authenticated using (%s)', target.table_name, authenticated_read);

    execute format('create policy sz_allow_insert_authenticated on public.%I for insert to authenticated with check (%s)', target.table_name, insert_check);
    execute format('create policy sz_guard_insert_authenticated on public.%I as restrictive for insert to authenticated with check (%s)', target.table_name, insert_check);
    execute format('create policy sz_allow_update_authenticated on public.%I for update to authenticated using (%s) with check (%s)', target.table_name, delete_check, update_check);
    execute format('create policy sz_guard_update_authenticated on public.%I as restrictive for update to authenticated using (%s) with check (%s)', target.table_name, delete_check, update_check);
    execute format('create policy sz_allow_delete_authenticated on public.%I for delete to authenticated using (%s)', target.table_name, delete_check);
    execute format('create policy sz_guard_delete_authenticated on public.%I as restrictive for delete to authenticated using (%s)', target.table_name, delete_check);

    -- Also fail closed if a legacy column grant or future grant gives anon a
    -- write privilege. These guards never call the admin function.
    execute format('create policy sz_guard_insert_anon on public.%I as restrictive for insert to anon with check (false)', target.table_name);
    execute format('create policy sz_guard_update_anon on public.%I as restrictive for update to anon using (false) with check (false)', target.table_name);
    execute format('create policy sz_guard_delete_anon on public.%I as restrictive for delete to anon using (false)', target.table_name);
  end loop;
end;
$app_security$;

-- Storage is a shared Supabase system table: DO NOT replace its global grants,
-- change its owner/RLS setting, or remove policies for unrelated buckets.
-- The enclosing schema fragment preserves public book/site downloads, while
-- keeping models-3d and characters-3d private.
--
-- Public buckets bypass download RLS: a known book/site asset URL is public,
-- even for an unpublished row. The policies below deny anonymous object
-- metadata/listing for these public buckets, not their public URL downloads.
do $storage_security$
declare
  policy_name text;
  managed_bucket constant text := $predicate$
    storage.objects.bucket_id in ('book-pages', 'site-assets', 'models-3d', 'characters-3d')
  $predicate$;
  published_private_asset constant text := $predicate$
    (
      storage.objects.bucket_id = 'models-3d'
      and exists (
        select 1 from public.models_3d as published_model
        where published_model.is_published = true
          and (
            published_model.storage_path = storage.objects.name
            or published_model.hdri_storage_path = storage.objects.name
          )
      )
    ) or (
      storage.objects.bucket_id = 'characters-3d'
      and exists (
        select 1 from public.characters_3d as published_character
        where published_character.is_published = true
          and published_character.asset_source = 'storage'
          and published_character.storage_path = storage.objects.name
      )
    )
  $predicate$;
  admin_check constant text := 'coalesce((select public.is_admin()), false)';
  authenticated_read text;
  admin_managed_asset text;
  anonymous_read_guard text;
  authenticated_read_guard text;
  anonymous_write_guard text;
  authenticated_write_guard text;
begin
  authenticated_read := format('(%s) and ((%s) or (%s))', managed_bucket, admin_check, published_private_asset);
  admin_managed_asset := format('(%s) and (%s)', managed_bucket, admin_check);
  anonymous_read_guard := format('not (%s) or (%s)', managed_bucket, published_private_asset);
  authenticated_read_guard := format('not (%s) or (%s) or (%s)', managed_bucket, admin_check, published_private_asset);
  anonymous_write_guard := format('not (%s)', managed_bucket);
  authenticated_write_guard := format('not (%s) or (%s)', managed_bucket, admin_check);

  foreach policy_name in array array[
    'sz_assets_allow_select_anon', 'sz_assets_allow_select_authenticated',
    'sz_assets_allow_insert_authenticated', 'sz_assets_allow_update_authenticated',
    'sz_assets_allow_delete_authenticated', 'sz_assets_guard_select_anon',
    'sz_assets_guard_select_authenticated', 'sz_assets_guard_insert_anon',
    'sz_assets_guard_update_anon', 'sz_assets_guard_delete_anon',
    'sz_assets_guard_insert_authenticated', 'sz_assets_guard_update_authenticated',
    'sz_assets_guard_delete_authenticated'
  ] loop
    execute format('drop policy if exists %I on storage.objects', policy_name);
  end loop;

  execute format('create policy sz_assets_allow_select_anon on storage.objects for select to anon using (%s)', published_private_asset);
  execute format('create policy sz_assets_allow_select_authenticated on storage.objects for select to authenticated using (%s)', authenticated_read);
  execute format('create policy sz_assets_allow_insert_authenticated on storage.objects for insert to authenticated with check (%s)', admin_managed_asset);
  execute format('create policy sz_assets_allow_update_authenticated on storage.objects for update to authenticated using (%s) with check (%s)', admin_managed_asset, admin_managed_asset);
  execute format('create policy sz_assets_allow_delete_authenticated on storage.objects for delete to authenticated using (%s)', admin_managed_asset);

  execute format('create policy sz_assets_guard_select_anon on storage.objects as restrictive for select to anon using (%s)', anonymous_read_guard);
  execute format('create policy sz_assets_guard_select_authenticated on storage.objects as restrictive for select to authenticated using (%s)', authenticated_read_guard);
  execute format('create policy sz_assets_guard_insert_anon on storage.objects as restrictive for insert to anon with check (%s)', anonymous_write_guard);
  execute format('create policy sz_assets_guard_update_anon on storage.objects as restrictive for update to anon using (%s) with check (%s)', anonymous_write_guard, anonymous_write_guard);
  execute format('create policy sz_assets_guard_delete_anon on storage.objects as restrictive for delete to anon using (%s)', anonymous_write_guard);
  execute format('create policy sz_assets_guard_insert_authenticated on storage.objects as restrictive for insert to authenticated with check (%s)', authenticated_write_guard);
  execute format('create policy sz_assets_guard_update_authenticated on storage.objects as restrictive for update to authenticated using (%s) with check (%s)', authenticated_write_guard, authenticated_write_guard);
  execute format('create policy sz_assets_guard_delete_authenticated on storage.objects as restrictive for delete to authenticated using (%s)', authenticated_write_guard);
end;
$storage_security$;

-- SECURITY LIMITS: table owners and service_role/BYPASSRLS roles bypass RLS.
-- They must remain server-side. Existing signed URLs may work until expiry;
-- publicly delivered files cannot be made uncopyable. Unknown restrictive
-- policies can still deny access. Other schemas, custom roles/inherited ACLs,
-- existing SECURITY DEFINER RPC bodies, auth configuration, and unrelated
-- buckets are not a complete security audit and are not rewritten here.

notify pgrst, 'reload schema';
commit;

-- ===== 003_report.sql =====
-- Read-only post-commit report: no rows, private paths, keys or emails printed.
-- OK on these rows verifies installation, not every platform setting/RPC body.
with table_report as (
  select 'Tabelle / RLS'::text as area, c.relname::text as componente,
    case when c.relrowsecurity and (
      select count(*) from pg_policies p where p.schemaname = 'public'
        and p.tablename = c.relname and p.policyname like 'sz_guard_%'
        and p.permissive = 'RESTRICTIVE'
    ) = 8 then 'OK' else 'VERIFICARE' end as stato,
    'Lettura secondo pubblicazione; scritture browser riservate all''admin originale.'::text as dettaglio
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname in (
    'books','book_pages','models_3d','characters_3d','site_settings','artworks','book_comments','archive_sections','analytics_events'
  ) and c.relkind in ('r','p')
), bucket_report as (
  select 'Storage'::text as area, id::text as componente,
    case when id in ('models-3d','characters-3d') and public then 'VERIFICARE' else 'OK' end as stato,
    case when public then 'PUBBLICO: gli URL dei file restano leggibili anche se la scheda e'' una bozza.'
      else 'PRIVATO: accesso ai file tramite policy e URL firmati; le sorgenti CAD non sono anteprime pubbliche.' end as dettaglio
  from storage.buckets where id in ('book-pages','site-assets','models-3d','characters-3d')
), legacy_checks as (
  select 'Dati preesistenti'::text as area, conrelid::regclass::text || '.' || conname as componente,
    'VERIFICARE'::text as stato,
    'Vincolo non validato su righe vecchie: nessun valore cancellato/corretto automaticamente; nuovi salvataggi controllati.'::text as dettaglio
  from pg_constraint where connamespace = 'public'::regnamespace
    and conname like 'sz_%' and contype = 'c' and not convalidated
), rpc_report as (
  select 'Funzioni originali'::text as area, signature as componente,
    case when to_regprocedure(signature) is null then 'MANCANTE'
      else 'DA RIVEDERE' end as stato,
    case when to_regprocedure(signature) is null then 'Definizione non inclusa nel repository: non ricreata e nessun admin inventato.'
      else 'Conservata intatta. Verificare codice, controllo admin, proprietario, EXECUTE e search_path in Security Advisor.' end as dettaglio
  from (values ('public.is_admin()'),('public.set_featured_book(uuid)'),('public.swap_book_pages(uuid,uuid)')) signatures(signature)
), other_restrictive as (
  select 'Policy personalizzate'::text as area, schemaname || '.' || tablename as componente,
    'DA RIVEDERE'::text as stato,
    'Policy restrittive precedenti preservate: possono ancora negare operazioni legittime. Non eliminate automaticamente.'::text as dettaglio
  from pg_policies where schemaname = 'public' and permissive = 'RESTRICTIVE'
    and policyname not like 'sz_%'
    and tablename in ('books','book_pages','models_3d','characters_3d','site_settings','artworks','book_comments','archive_sections','analytics_events')
  group by schemaname, tablename
), storage_guards as (
  select 'Storage / RLS'::text as area, 'storage.objects'::text as componente,
    case when count(*) = 8 then 'OK' else 'VERIFICARE' end as stato,
    'Guardie restrittive limitate ai quattro bucket del sito; policy di altri bucket preservate.'::text as dettaglio
  from pg_policies where schemaname = 'storage' and tablename = 'objects'
    and policyname like 'sz_assets_guard_%' and permissive = 'RESTRICTIVE'
), other_storage_guards as (
  select 'Policy personalizzate'::text as area, 'storage.objects'::text as componente,
    'DA RIVEDERE'::text as stato,
    'Altre policy restrittive Storage preservate: possono negare upload o lettura di file.'::text as dettaglio
  where exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects'
    and permissive = 'RESTRICTIVE' and policyname not like 'sz_assets_%')
), featured_indexes as (
  select 'Default featured'::text as area, expected.index_name as componente,
    case when to_regclass('public.' || expected.index_name) is not null then 'OK' else 'VERIFICARE' end as stato,
    'Un solo default. Eventuali duplicati vecchi non vengono eliminati: correggerli dal backend e rieseguire.'::text as dettaglio
  from (values ('characters_3d_one_featured'),('models_3d_one_featured_idx')) expected(index_name)
)
select * from table_report
union all select * from bucket_report
union all select * from legacy_checks
union all select * from rpc_report
union all select * from other_restrictive
union all select * from storage_guards
union all select * from other_storage_guards
union all select * from featured_indexes
union all select 'Impostazioni', 'Ocean / Featured In / menu / BIO', 'OK',
  'JSON esistente conservato. Featured In e'' un flag di artworks, Ocean non richiede una tabella separata.'
union all select 'Limiti audit', 'Auth / Edge Functions / segreti / altri schemi e ruoli', 'MANUALE',
  'Non riconfigurati. Nessuna service-role nel frontend; MFA admin, rate limit e Advisor vanno verificati nel dashboard.'
order by area, componente;
