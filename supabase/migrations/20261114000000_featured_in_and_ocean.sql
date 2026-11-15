-- Studier Zimmer: Featured In. Apply after 20261112000000_site_content.sql.
-- Additive and rerunnable; existing artworks and settings are preserved.
begin;
set local lock_timeout = '5s';
set local statement_timeout = '30s';

alter table public.artworks
  add column if not exists is_featured_in boolean not null default false,
  add column if not exists external_url text;

do $$
begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.artworks'::regclass and conname = 'artworks_external_url_http') then
    alter table public.artworks add constraint artworks_external_url_http
      check (external_url is null or external_url ~* '^https?://[^[:space:]]+$') not valid;
  end if;
end;
$$;

create index if not exists artworks_featured_order_idx
  on public.artworks (sort_order, year desc) where is_published and is_featured_in;

-- Ocean text is stored in the existing site_settings.data JSON object.
-- Runtime defaults supply ocean_title/ocean_subtitle/ocean_about when absent.
-- Menu normalization converts the former Models slot into Featured In without
-- changing model category assignments or overwriting existing site settings.
notify pgrst, 'reload schema';
commit;
