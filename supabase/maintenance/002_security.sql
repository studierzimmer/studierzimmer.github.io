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
