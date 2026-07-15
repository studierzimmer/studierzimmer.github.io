-- Keeps editable STEP/STP sources private while exposing only converted GLB previews.
-- Run this migration in the Supabase SQL editor (or with `supabase db push`).

alter table public.models_3d
  add column if not exists source_file_name text,
  add column if not exists source_storage_path text,
  add column if not exists source_format text;

create unique index if not exists models_3d_source_storage_path_idx
  on public.models_3d (source_storage_path)
  where source_storage_path is not null;

alter table public.models_3d
  drop constraint if exists models_3d_source_format_check;

alter table public.models_3d
  add constraint models_3d_source_format_check
  check (source_format is null or source_format = 'step');

alter table public.models_3d
  drop constraint if exists models_3d_source_fields_check;

alter table public.models_3d
  add constraint models_3d_source_fields_check
  check (
    (source_format is null and source_file_name is null and source_storage_path is null)
    or
    (source_format = 'step' and source_file_name is not null and source_storage_path is not null)
  );

update storage.buckets
set allowed_mime_types = array[
  'model/gltf-binary',
  'model/stl',
  'application/sla',
  'application/octet-stream',
  'application/step',
  'application/x-step',
  'model/step'
]
where id = 'models-3d';

-- Existing storage policies already allow admins to read every object in the
-- private bucket. Public visitors can sign only models_3d.storage_path, so the
-- source_storage_path remains inaccessible to anonymous users.
notify pgrst, 'reload schema';
