create table if not exists public.characters_3d (
  id uuid primary key default gen_random_uuid()
);

alter table public.characters_3d
  add column if not exists name text,
  add column if not exists description text,
  add column if not exists file_name text,
  add column if not exists asset_source text,
  add column if not exists storage_path text,
  add column if not exists bundled_path text,
  add column if not exists model_scale numeric,
  add column if not exists camera_distance numeric,
  add column if not exists is_published boolean,
  add column if not exists is_featured boolean,
  add column if not exists sort_order integer,
  add column if not exists created_at timestamptz,
  add column if not exists updated_at timestamptz;

update public.characters_3d
set name = coalesce(name, 'Character'),
    description = coalesce(description, ''),
    file_name = coalesce(file_name, 'character.glb'),
    asset_source = coalesce(asset_source, 'storage'),
    model_scale = coalesce(model_scale, 10),
    camera_distance = coalesce(camera_distance, 70),
    is_published = coalesce(is_published, false),
    is_featured = coalesce(is_featured, false),
    sort_order = coalesce(sort_order, 0),
    created_at = coalesce(created_at, now()),
    updated_at = coalesce(updated_at, now());

alter table public.characters_3d
  alter column name set not null,
  alter column description set default '',
  alter column description set not null,
  alter column file_name set not null,
  alter column asset_source set default 'storage',
  alter column asset_source set not null,
  alter column model_scale set default 10,
  alter column model_scale set not null,
  alter column camera_distance set default 70,
  alter column camera_distance set not null,
  alter column is_published set default false,
  alter column is_published set not null,
  alter column is_featured set default false,
  alter column is_featured set not null,
  alter column sort_order set default 0,
  alter column sort_order set not null,
  alter column created_at set default now(),
  alter column created_at set not null,
  alter column updated_at set default now(),
  alter column updated_at set not null;

alter table public.characters_3d
  drop constraint if exists characters_3d_asset_source_check,
  drop constraint if exists characters_3d_model_scale_check,
  drop constraint if exists characters_3d_camera_distance_check,
  drop constraint if exists characters_3d_one_asset_source;

alter table public.characters_3d
  add constraint characters_3d_asset_source_check
    check (asset_source in ('storage', 'bundled')),
  add constraint characters_3d_model_scale_check
    check (model_scale > 0 and model_scale <= 100),
  add constraint characters_3d_camera_distance_check
    check (camera_distance >= 10 and camera_distance <= 500),
  add constraint characters_3d_one_asset_source check (
    (asset_source = 'storage' and storage_path is not null and bundled_path is null)
    or
    (asset_source = 'bundled' and bundled_path is not null and storage_path is null)
  );

create unique index if not exists characters_3d_one_featured
  on public.characters_3d (is_featured)
  where is_featured = true;

create index if not exists characters_3d_public_order
  on public.characters_3d (is_published, sort_order, created_at);

create or replace function public.set_characters_3d_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_characters_3d_updated_at on public.characters_3d;
create trigger set_characters_3d_updated_at
before update on public.characters_3d
for each row execute function public.set_characters_3d_updated_at();

alter table public.characters_3d enable row level security;

drop policy if exists "Published characters are readable" on public.characters_3d;
create policy "Published characters are readable"
on public.characters_3d for select
to anon, authenticated
using (
  is_published = true
  or (select auth.role()) = 'authenticated'
);

drop policy if exists "Admins create characters" on public.characters_3d;
create policy "Admins create characters"
on public.characters_3d for insert
to authenticated
with check (true);

drop policy if exists "Admins update characters" on public.characters_3d;
create policy "Admins update characters"
on public.characters_3d for update
to authenticated
using (true)
with check (true);

drop policy if exists "Admins delete characters" on public.characters_3d;
create policy "Admins delete characters"
on public.characters_3d for delete
to authenticated
using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'characters-3d',
  'characters-3d',
  false,
  104857600,
  array['model/gltf-binary', 'model/gltf+json', 'application/octet-stream']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Published character files are downloadable" on storage.objects;
create policy "Published character files are downloadable"
on storage.objects for select
to anon, authenticated
using (
  bucket_id = 'characters-3d'
  and exists (
    select 1
    from public.characters_3d character
    where character.storage_path = name
      and (
        character.is_published = true
        or (select auth.role()) = 'authenticated'
      )
  )
);

drop policy if exists "Admins upload character files" on storage.objects;
create policy "Admins upload character files"
on storage.objects for insert
to authenticated
with check (bucket_id = 'characters-3d');

drop policy if exists "Admins update character files" on storage.objects;
create policy "Admins update character files"
on storage.objects for update
to authenticated
using (bucket_id = 'characters-3d')
with check (bucket_id = 'characters-3d');

drop policy if exists "Admins delete character files" on storage.objects;
create policy "Admins delete character files"
on storage.objects for delete
to authenticated
using (bucket_id = 'characters-3d');

insert into public.characters_3d (
  name,
  description,
  file_name,
  asset_source,
  bundled_path,
  model_scale,
  camera_distance,
  is_published,
  is_featured,
  sort_order
)
select
  'Wolfy',
  'The original Studierzimmer ocean character.',
  'wolfy.glb',
  'bundled',
  'wolfy.glb',
  10,
  70,
  true,
  not exists (
    select 1 from public.characters_3d where is_featured = true
  ),
  0
where not exists (
  select 1 from public.characters_3d where bundled_path = 'wolfy.glb'
);

insert into public.characters_3d (
  name,
  description,
  file_name,
  asset_source,
  bundled_path,
  model_scale,
  camera_distance,
  is_published,
  is_featured,
  sort_order
)
select
  'Pirate sailing ship',
  'A wooden sailing ship with full white sails and a small pirate flag.',
  'pirate-sailing-ship.glb',
  'bundled',
  'pirate-sailing-ship.glb',
  3.4,
  105,
  true,
  false,
  1
where not exists (
  select 1
  from public.characters_3d
  where bundled_path = 'pirate-sailing-ship.glb'
);

insert into public.characters_3d (
  name,
  description,
  file_name,
  asset_source,
  bundled_path,
  model_scale,
  camera_distance,
  is_published,
  is_featured,
  sort_order
)
select
  'Cessna aircraft',
  'A polished light aircraft with a looping animated propeller.',
  'cessna-aircraft.glb',
  'bundled',
  'cessna-aircraft.glb',
  3.6,
  100,
  true,
  false,
  2
where not exists (
  select 1
  from public.characters_3d
  where bundled_path = 'cessna-aircraft.glb'
);

notify pgrst, 'reload schema';
