-- Adds a saved RGB background to every book and converts the existing model
-- bucket from permanent public URLs to private, short-lived signed previews.

alter table public.books
  add column if not exists background_r smallint not null default 255
    check (background_r between 0 and 255),
  add column if not exists background_g smallint not null default 255
    check (background_g between 0 and 255),
  add column if not exists background_b smallint not null default 255
    check (background_b between 0 and 255);

update storage.buckets
set public = false
where id = 'models-3d';

drop policy if exists "Public can read published GLBs" on storage.objects;
drop policy if exists "Published GLB previews can be signed" on storage.objects;
create policy "Published GLB previews can be signed"
on storage.objects for select
to anon, authenticated
using (
  bucket_id = 'models-3d'
  and exists (
    select 1
    from public.models_3d as model
    where model.storage_path = storage.objects.name
      and model.is_published = true
  )
);

drop policy if exists "Admins can read every GLB" on storage.objects;
create policy "Admins can read every GLB"
on storage.objects for select
to authenticated
using (bucket_id = 'models-3d' and public.is_admin());

notify pgrst, 'reload schema';
