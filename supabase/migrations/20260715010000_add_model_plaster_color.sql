-- Adds a per-model plaster base color for STL files.
-- Run this migration in the Supabase SQL editor (or with `supabase db push`).

alter table public.models_3d
  add column if not exists plaster_color text not null default '#EEEAE1';

update public.models_3d
set plaster_color = '#EEEAE1'
where plaster_color !~ '^#[0-9A-Fa-f]{6}$';

alter table public.models_3d
  drop constraint if exists models_3d_plaster_color_hex;

alter table public.models_3d
  add constraint models_3d_plaster_color_hex
  check (plaster_color ~ '^#[0-9A-Fa-f]{6}$');

notify pgrst, 'reload schema';
