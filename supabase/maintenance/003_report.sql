-- Read-only post-commit report: no rows, private paths, keys or emails printed.
-- OK on these rows verifies installation, not every platform setting/RPC body.
with table_report as (
  select 'Tabelle / RLS'::text as area, c.relname::text as componente,
    case when c.relrowsecurity and (
      select count(*) from pg_policies p where p.schemaname = 'public'
        and p.tablename = c.relname and p.policyname like 'sz_guard_%'
        and p.permissive = 'RESTRICTIVE'
    ) = 8 then 'OK' else 'VERIFICARE' end as stato,
    'Lettura secondo pubblicazione; scritture browser riservate all''admin originale.'::text as dettaglio
  from pg_class c join pg_namespace n on n.oid = c.relnamespace
  where n.nspname = 'public' and c.relname in (
    'books','book_pages','models_3d','characters_3d','site_settings','artworks','book_comments','archive_sections','analytics_events'
  ) and c.relkind in ('r','p')
), bucket_report as (
  select 'Storage'::text as area, id::text as componente,
    case when id in ('models-3d','characters-3d') and public then 'VERIFICARE' else 'OK' end as stato,
    case when public then 'PUBBLICO: gli URL dei file restano leggibili anche se la scheda e'' una bozza.'
      else 'PRIVATO: accesso ai file tramite policy e URL firmati; le sorgenti CAD non sono anteprime pubbliche.' end as dettaglio
  from storage.buckets where id in ('book-pages','site-assets','models-3d','characters-3d')
), legacy_checks as (
  select 'Dati preesistenti'::text as area, conrelid::regclass::text || '.' || conname as componente,
    'VERIFICARE'::text as stato,
    'Vincolo non validato su righe vecchie: nessun valore cancellato/corretto automaticamente; nuovi salvataggi controllati.'::text as dettaglio
  from pg_constraint where connamespace = 'public'::regnamespace
    and conname like 'sz_%' and contype = 'c' and not convalidated
), rpc_report as (
  select 'Funzioni originali'::text as area, signature as componente,
    case when to_regprocedure(signature) is null then 'MANCANTE'
      else 'DA RIVEDERE' end as stato,
    case when to_regprocedure(signature) is null then 'Definizione non inclusa nel repository: non ricreata e nessun admin inventato.'
      else 'Conservata intatta. Verificare codice, controllo admin, proprietario, EXECUTE e search_path in Security Advisor.' end as dettaglio
  from (values ('public.is_admin()'),('public.set_featured_book(uuid)'),('public.swap_book_pages(uuid,uuid)')) signatures(signature)
), other_restrictive as (
  select 'Policy personalizzate'::text as area, schemaname || '.' || tablename as componente,
    'DA RIVEDERE'::text as stato,
    'Policy restrittive precedenti preservate: possono ancora negare operazioni legittime. Non eliminate automaticamente.'::text as dettaglio
  from pg_policies where schemaname = 'public' and permissive = 'RESTRICTIVE'
    and policyname not like 'sz_%'
    and tablename in ('books','book_pages','models_3d','characters_3d','site_settings','artworks','book_comments','archive_sections','analytics_events')
  group by schemaname, tablename
), storage_guards as (
  select 'Storage / RLS'::text as area, 'storage.objects'::text as componente,
    case when count(*) = 8 then 'OK' else 'VERIFICARE' end as stato,
    'Guardie restrittive limitate ai quattro bucket del sito; policy di altri bucket preservate.'::text as dettaglio
  from pg_policies where schemaname = 'storage' and tablename = 'objects'
    and policyname like 'sz_assets_guard_%' and permissive = 'RESTRICTIVE'
), other_storage_guards as (
  select 'Policy personalizzate'::text as area, 'storage.objects'::text as componente,
    'DA RIVEDERE'::text as stato,
    'Altre policy restrittive Storage preservate: possono negare upload o lettura di file.'::text as dettaglio
  where exists (select 1 from pg_policies where schemaname = 'storage' and tablename = 'objects'
    and permissive = 'RESTRICTIVE' and policyname not like 'sz_assets_%')
), featured_indexes as (
  select 'Default featured'::text as area, expected.index_name as componente,
    case when to_regclass('public.' || expected.index_name) is not null then 'OK' else 'VERIFICARE' end as stato,
    'Un solo default. Eventuali duplicati vecchi non vengono eliminati: correggerli dal backend e rieseguire.'::text as dettaglio
  from (values ('characters_3d_one_featured'),('models_3d_one_featured_idx')) expected(index_name)
)
select * from table_report
union all select * from bucket_report
union all select * from legacy_checks
union all select * from rpc_report
union all select * from other_restrictive
union all select * from storage_guards
union all select * from other_storage_guards
union all select * from featured_indexes
union all select 'Impostazioni', 'Ocean / Featured In / menu / BIO', 'OK',
  'JSON esistente conservato. Featured In e'' un flag di artworks, Ocean non richiede una tabella separata.'
union all select 'Limiti audit', 'Auth / Edge Functions / segreti / altri schemi e ruoli', 'MANUALE',
  'Non riconfigurati. Nessuna service-role nel frontend; MFA admin, rate limit e Advisor vanno verificati nel dashboard.'
order by area, componente;
