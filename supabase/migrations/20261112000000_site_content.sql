-- STUDIER ZIMMER: aggiornamento del progetto Supabase esistente.
-- Supabase Dashboard > progetto corretto > SQL Editor > New query.
-- Incollare TUTTO questo file ed eseguire Run una volta. E' rieseguibile.
-- Non elimina o aggiorna libri, pagine, modelli, utenti o contenuti esistenti.
-- Riutilizza public.is_admin(): non assegna nuovi privilegi ad alcun account.
-- Questo script prepara il backend; non pubblica il nuovo sito su GitHub.

begin;
set local lock_timeout = '5s';
set local statement_timeout = '30s';

do $preflight$
begin
  if to_regprocedure('public.is_admin()') is null then
    raise exception 'Manca public.is_admin(): aggiornamento annullato.'
      using hint = 'Seleziona il progetto originale Studier Zimmer. Questo aggiornamento non inizializza un progetto vuoto.';
  end if;
  if to_regclass('public.models_3d') is null
     or to_regclass('public.books') is null
     or to_regclass('public.book_pages') is null then
    raise exception 'Mancano le tabelle originali di Studier Zimmer: aggiornamento annullato.'
      using hint = 'Controlla il Project URL e che il progetto ripristinato sia quello corretto. Non eseguire reset o eliminazioni.';
  end if;
end;
$preflight$;

create table if not exists public.site_settings (
  id text primary key default 'main' check (id = 'main'),
  data jsonb not null default '{}'::jsonb check (jsonb_typeof(data) = 'object'),
  updated_at timestamptz not null default now()
);

-- {} usa i valori predefiniti inclusi nel sito. Un'impostazione gia' salvata
-- resta intatta, anche eseguendo di nuovo lo script.
insert into public.site_settings (id, data) values ('main', '{}'::jsonb)
on conflict (id) do nothing;

create table if not exists public.artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  year integer not null default extract(year from current_date)::integer check (year between 0 and 9999),
  kind text not null default 'image' check (kind in ('image', 'video', 'model')),
  media_url text not null default '',
  poster_url text,
  model_id uuid references public.models_3d(id) on delete set null,
  is_fashion boolean not null default false,
  is_published boolean not null default false,
  sort_order integer not null default 0,
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists artworks_public_order_idx on public.artworks (sort_order, year desc) where is_published;
create index if not exists artworks_fashion_order_idx on public.artworks (sort_order) where is_published and is_fashion;

create or replace function public.touch_site_content_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists site_settings_touch_updated_at on public.site_settings;
create trigger site_settings_touch_updated_at before update on public.site_settings
for each row execute function public.touch_site_content_updated_at();

drop trigger if exists artworks_touch_updated_at on public.artworks;
create trigger artworks_touch_updated_at before update on public.artworks
for each row execute function public.touch_site_content_updated_at();

alter table public.site_settings enable row level security;
alter table public.artworks enable row level security;

grant select on public.site_settings, public.artworks to anon, authenticated;
grant insert, update, delete on public.site_settings, public.artworks to authenticated;

drop policy if exists "Site settings are public" on public.site_settings;
create policy "Site settings are public" on public.site_settings for select using (true);
drop policy if exists "Admins manage site settings" on public.site_settings;
create policy "Admins manage site settings" on public.site_settings for all to authenticated
using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Published artworks are public" on public.artworks;
create policy "Published artworks are public" on public.artworks for select using (is_published);
drop policy if exists "Admins manage artworks" on public.artworks;
create policy "Admins manage artworks" on public.artworks for all to authenticated
using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'site-assets', 'site-assets', true, 52428800,
  array['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/avif', 'video/mp4', 'video/webm', 'video/quicktime', 'model/gltf-binary', 'model/gltf+json', 'application/octet-stream']
)
-- Un bucket preesistente conserva le proprie impostazioni e i propri file.
on conflict (id) do nothing;

drop policy if exists "Site assets are public" on storage.objects;
create policy "Site assets are public" on storage.objects for select using (bucket_id = 'site-assets');
drop policy if exists "Admins upload site assets" on storage.objects;
create policy "Admins upload site assets" on storage.objects for insert to authenticated
with check (bucket_id = 'site-assets' and public.is_admin());
drop policy if exists "Admins update site assets" on storage.objects;
create policy "Admins update site assets" on storage.objects for update to authenticated
using (bucket_id = 'site-assets' and public.is_admin())
with check (bucket_id = 'site-assets' and public.is_admin());
drop policy if exists "Admins delete site assets" on storage.objects;
create policy "Admins delete site assets" on storage.objects for delete to authenticated
using (bucket_id = 'site-assets' and public.is_admin());

-- La nuova struttura diventa visibile alle API al commit.
notify pgrst, 'reload schema';
commit;

-- Risultato atteso: tre righe con stato OK.
select 'Impostazioni sito' as componente,
       case when exists (select 1 from public.site_settings where id = 'main') then 'OK' else 'VERIFICARE' end as stato
union all
select 'Artworks e Fashion', case when to_regclass('public.artworks') is not null then 'OK' else 'VERIFICARE' end
union all
select 'Upload site-assets', case when exists (select 1 from storage.buckets where id = 'site-assets' and public) then 'OK' else 'VERIFICARE' end;
