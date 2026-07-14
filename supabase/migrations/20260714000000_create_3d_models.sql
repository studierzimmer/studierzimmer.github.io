-- Run this migration in the Supabase SQL editor (or with `supabase db push`).
-- It creates the public model catalogue and a private GLB bucket.

create table if not exists public.models_3d (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) > 0),
  description text not null default '',
  file_name text not null,
  storage_path text not null unique,
  is_published boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists models_3d_one_featured_idx
  on public.models_3d (is_featured)
  where is_featured = true;

create or replace function public.touch_models_3d_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists models_3d_touch_updated_at on public.models_3d;
create trigger models_3d_touch_updated_at
before update on public.models_3d
for each row execute function public.touch_models_3d_updated_at();

alter table public.models_3d enable row level security;

grant select on public.models_3d to anon, authenticated;
grant insert, update, delete on public.models_3d to authenticated;

drop policy if exists "Published 3D models are public" on public.models_3d;
create policy "Published 3D models are public"
on public.models_3d for select
using (is_published = true);

drop policy if exists "Admins can read every 3D model" on public.models_3d;
create policy "Admins can read every 3D model"
on public.models_3d for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can insert 3D models" on public.models_3d;
create policy "Admins can insert 3D models"
on public.models_3d for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update 3D models" on public.models_3d;
create policy "Admins can update 3D models"
on public.models_3d for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete 3D models" on public.models_3d;
create policy "Admins can delete 3D models"
on public.models_3d for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'models-3d',
  'models-3d',
  false,
  104857600,
  array['model/gltf-binary', 'application/octet-stream']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

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

drop policy if exists "Admins can upload GLBs" on storage.objects;
create policy "Admins can upload GLBs"
on storage.objects for insert
to authenticated
with check (bucket_id = 'models-3d' and public.is_admin());

drop policy if exists "Admins can update GLBs" on storage.objects;
create policy "Admins can update GLBs"
on storage.objects for update
to authenticated
using (bucket_id = 'models-3d' and public.is_admin())
with check (bucket_id = 'models-3d' and public.is_admin());

drop policy if exists "Admins can delete GLBs" on storage.objects;
create policy "Admins can delete GLBs"
on storage.objects for delete
to authenticated
using (bucket_id = 'models-3d' and public.is_admin());

-- Ask PostgREST to expose the new table without waiting for its cache timeout.
notify pgrst, 'reload schema';
