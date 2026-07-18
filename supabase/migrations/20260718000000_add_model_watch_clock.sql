-- Enables local-time watch hand animation for GLB models whose Blender
-- hierarchy contains the three supported pivot Empty nodes.

alter table public.models_3d
  add column if not exists is_watch boolean not null default false;

notify pgrst, 'reload schema';
