-- Additional full-resolution images belong to the same artwork/title/caption.
-- The existing media_url remains the primary image. No rows/assets are moved.
-- Jewelry is an artwork flag, independent from the existing 3D model catalogue.
begin;
set local lock_timeout = '5s';
set local statement_timeout = '30s';

alter table public.artworks
  add column if not exists additional_images text[] not null default '{}'::text[],
  add column if not exists is_jewelry boolean not null default false;

do $images_type$
begin
  if not exists (
    select 1 from pg_catalog.pg_attribute
    where attrelid = 'public.artworks'::regclass
      and attname = 'additional_images'
      and atttypid = 'text[]'::regtype
      and attnum > 0 and not attisdropped
  ) then
    raise exception 'public.artworks.additional_images deve avere tipo text[]: nessun dato modificato.';
  end if;
  if not exists (
    select 1 from pg_catalog.pg_attribute
    where attrelid = 'public.artworks'::regclass
      and attname = 'is_jewelry'
      and atttypid = 'boolean'::regtype
      and attnum > 0 and not attisdropped
  ) then
    raise exception 'public.artworks.is_jewelry deve avere tipo boolean: nessun dato modificato.';
  end if;
end;
$images_type$;

-- Also repair an interrupted/manual addition without rewriting saved arrays.
alter table public.artworks
  alter column additional_images set default '{}'::text[],
  alter column is_jewelry set default false;

do $images_check$
begin
  if not exists (
    select 1 from pg_catalog.pg_constraint
    where conrelid = 'public.artworks'::regclass
      and conname = 'sz_artworks_additional_images'
  ) then
    alter table public.artworks add constraint sz_artworks_additional_images
      check (
        additional_images is not null and case
          when cardinality(additional_images) = 0 then true
          when array_ndims(additional_images) = 1 then array_position(additional_images, null) is null
          else false
        end
      ) not valid;
  end if;
  begin
    alter table public.artworks validate constraint sz_artworks_additional_images;
  exception when check_violation then
    raise warning 'Immagini aggiuntive preesistenti da verificare: dati conservati intatti; nuovi salvataggi controllati.';
  end;
end;
$images_check$;

create index if not exists artworks_jewelry_order_idx
  on public.artworks (sort_order, year desc) where is_published and is_jewelry;

notify pgrst, 'reload schema';
commit;
