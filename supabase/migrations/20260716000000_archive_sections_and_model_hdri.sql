-- Adds editable archive section names and one private HDRI per 3D model.
-- Keep this local until the UI has been approved, then run it in SQL Editor.

create table if not exists public.archive_sections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  name text not null check (char_length(trim(name)) > 0),
  code text not null check (char_length(trim(code)) between 1 and 8),
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.archive_sections (slug, name, code, sort_order)
values
  ('objects', 'Objects', 'OBJ', 0),
  ('graphics', 'Graphics', 'GRPH', 1),
  ('concepts', 'Concepts', 'CNCP', 2)
on conflict (slug) do nothing;

insert into public.archive_sections (slug, name, code, sort_order)
select
  categories.category,
  initcap(replace(categories.category, '-', ' ')),
  upper(left(categories.category, 4)),
  100 + row_number() over (order by categories.category)
from (
  select distinct category
  from public.books
  where category is not null and trim(category) <> ''
) as categories
on conflict (slug) do nothing;

create or replace function public.touch_archive_sections_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists archive_sections_touch_updated_at on public.archive_sections;
create trigger archive_sections_touch_updated_at
before update on public.archive_sections
for each row execute function public.touch_archive_sections_updated_at();

alter table public.books
  drop constraint if exists books_category_archive_section_fkey;

alter table public.books
  add constraint books_category_archive_section_fkey
  foreign key (category)
  references public.archive_sections (slug)
  on update cascade
  on delete restrict;

alter table public.archive_sections enable row level security;
grant select on public.archive_sections to anon, authenticated;
grant insert, update, delete on public.archive_sections to authenticated;

drop policy if exists "Visible archive sections are public" on public.archive_sections;
create policy "Visible archive sections are public"
on public.archive_sections for select
using (is_visible = true);

drop policy if exists "Admins can read archive sections" on public.archive_sections;
create policy "Admins can read archive sections"
on public.archive_sections for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can insert archive sections" on public.archive_sections;
create policy "Admins can insert archive sections"
on public.archive_sections for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update archive sections" on public.archive_sections;
create policy "Admins can update archive sections"
on public.archive_sections for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete archive sections" on public.archive_sections;
create policy "Admins can delete archive sections"
on public.archive_sections for delete
to authenticated
using (public.is_admin());

alter table public.models_3d
  add column if not exists hdri_file_name text,
  add column if not exists hdri_storage_path text;

create unique index if not exists models_3d_hdri_storage_path_idx
  on public.models_3d (hdri_storage_path)
  where hdri_storage_path is not null;

alter table public.models_3d
  drop constraint if exists models_3d_hdri_fields_check;

alter table public.models_3d
  add constraint models_3d_hdri_fields_check
  check (
    (hdri_file_name is null and hdri_storage_path is null)
    or
    (hdri_file_name is not null and hdri_storage_path is not null)
  );

update storage.buckets
set allowed_mime_types = array[
  'model/gltf-binary',
  'model/stl',
  'application/sla',
  'application/octet-stream',
  'application/step',
  'application/x-step',
  'model/step',
  'image/vnd.radiance',
  'image/x-exr'
]
where id = 'models-3d';

drop policy if exists "Published GLB previews can be signed" on storage.objects;
drop policy if exists "Published model assets can be signed" on storage.objects;
create policy "Published model assets can be signed"
on storage.objects for select
to anon, authenticated
using (
  bucket_id = 'models-3d'
  and exists (
    select 1
    from public.models_3d as model
    where model.is_published = true
      and (
        model.storage_path = storage.objects.name
        or model.hdri_storage_path = storage.objects.name
      )
  )
);

notify pgrst, 'reload schema';
