-- Privacy-friendly, first-party analytics for the private admin portal.
-- Safe to paste into the Supabase SQL editor.
-- Requires the existing public.is_admin() function used by the admin portal.

create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  recorded_at timestamptz not null default now(),
  session_id uuid not null,
  event_name text not null check (
    event_name in (
      'session_start',
      'session_end',
      'page_view',
      'navigation_click',
      'book_open',
      'book_page_view',
      'model_open',
      'model_interaction',
      'archive_filter',
      'outbound_click'
    )
  ),
  path text not null default '/' check (
    char_length(path) between 1 and 160
    and left(path, 1) = '/'
    and position('?' in path) = 0
    and position('#' in path) = 0
  ),
  target_type text check (
    target_type is null
    or target_type in (
      'navigation',
      'book',
      'book_page',
      'model',
      'archive',
      'external',
      'interface'
    )
  ),
  target_id text check (
    target_id is null or char_length(target_id) between 1 and 120
  ),
  referrer_host text check (
    referrer_host is null or char_length(referrer_host) between 1 and 160
  ),
  device_type text not null default 'unknown' check (
    device_type in ('mobile', 'tablet', 'desktop', 'unknown')
  ),
  value_int integer check (
    value_int is null or value_int between 0 and 86400000
  )
);

comment on table public.analytics_events is
  'First-party pseudonymous usage events. Never store IPs, emails, full URLs, free text, or fingerprints here.';
comment on column public.analytics_events.session_id is
  'Per-consented-session random UUID; it must not be reused as a persistent visitor identifier.';
comment on column public.analytics_events.value_int is
  'Optional numeric value such as page number or duration in milliseconds.';

create index if not exists analytics_events_recorded_at_idx
  on public.analytics_events (recorded_at desc);
create index if not exists analytics_events_session_time_idx
  on public.analytics_events (session_id, recorded_at desc);
create index if not exists analytics_events_name_time_idx
  on public.analytics_events (event_name, recorded_at desc);
create index if not exists analytics_events_target_time_idx
  on public.analytics_events (target_type, target_id, recorded_at desc)
  where target_id is not null;

alter table public.analytics_events enable row level security;

revoke all on table public.analytics_events from anon, authenticated;
grant select on table public.analytics_events to authenticated;

drop policy if exists "Admins can read analytics" on public.analytics_events;
create policy "Admins can read analytics"
on public.analytics_events
for select
to authenticated
using (public.is_admin());

-- Public clients cannot insert directly. They can only call this constrained
-- function, which removes query strings/fragments and applies a basic
-- per-session event limit. For stronger abuse prevention, put this RPC behind
-- a rate-limited Supabase Edge Function before a high-traffic launch.
create or replace function public.track_analytics_event(
  p_session_id uuid,
  p_event_name text,
  p_path text default '/',
  p_target_type text default null,
  p_target_id text default null,
  p_referrer_host text default null,
  p_device_type text default 'unknown',
  p_value_int integer default null
)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  normalized_path text;
  normalized_referrer text;
  recent_event_count integer;
begin
  if p_session_id is null then
    return false;
  end if;

  if p_event_name is null or p_event_name not in (
    'session_start',
    'session_end',
    'page_view',
    'navigation_click',
    'book_open',
    'book_page_view',
    'model_open',
    'model_interaction',
    'archive_filter',
    'outbound_click'
  ) then
    return false;
  end if;

  if p_target_type is not null and p_target_type not in (
    'navigation',
    'book',
    'book_page',
    'model',
    'archive',
    'external',
    'interface'
  ) then
    return false;
  end if;

  if p_device_type is not null and p_device_type not in (
    'mobile', 'tablet', 'desktop', 'unknown'
  ) then
    return false;
  end if;

  if p_value_int is not null and (p_value_int < 0 or p_value_int > 86400000) then
    return false;
  end if;

  normalized_path := split_part(split_part(coalesce(p_path, '/'), '?', 1), '#', 1);
  if normalized_path = '' or left(normalized_path, 1) <> '/' then
    normalized_path := '/';
  end if;
  normalized_path := left(normalized_path, 160);

  normalized_referrer := lower(nullif(trim(p_referrer_host), ''));
  if normalized_referrer is not null and normalized_referrer !~
    '^[a-z0-9.-]+(:[0-9]{1,5})?$'
  then
    normalized_referrer := null;
  end if;
  normalized_referrer := left(normalized_referrer, 160);

  select count(*)::integer
  into recent_event_count
  from public.analytics_events
  where session_id = p_session_id
    and recorded_at >= now() - interval '1 minute';

  if recent_event_count >= 120 then
    return false;
  end if;

  insert into public.analytics_events (
    session_id,
    event_name,
    path,
    target_type,
    target_id,
    referrer_host,
    device_type,
    value_int
  ) values (
    p_session_id,
    p_event_name,
    normalized_path,
    p_target_type,
    left(nullif(trim(p_target_id), ''), 120),
    normalized_referrer,
    coalesce(p_device_type, 'unknown'),
    p_value_int
  );

  return true;
end;
$$;

revoke all on function public.track_analytics_event(
  uuid, text, text, text, text, text, text, integer
) from public;
grant execute on function public.track_analytics_event(
  uuid, text, text, text, text, text, text, integer
) to anon, authenticated;

create or replace function public.get_analytics_summary(
  p_from timestamptz default now() - interval '30 days',
  p_to timestamptz default now()
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  result jsonb;
begin
  if not public.is_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;

  select jsonb_build_object(
    'visits', count(distinct session_id),
    'events', count(*),
    'page_views', count(*) filter (where event_name = 'page_view'),
    'clicks', count(*) filter (
      where event_name in (
        'navigation_click',
        'book_open',
        'model_open',
        'model_interaction',
        'archive_filter',
        'outbound_click'
      )
    ),
    'book_opens', count(*) filter (where event_name = 'book_open'),
    'model_opens', count(*) filter (where event_name = 'model_open')
  )
  into result
  from public.analytics_events
  where recorded_at >= coalesce(p_from, now() - interval '30 days')
    and recorded_at < coalesce(p_to, now());

  return result;
end;
$$;

revoke all on function public.get_analytics_summary(timestamptz, timestamptz)
  from public;
grant execute on function public.get_analytics_summary(timestamptz, timestamptz)
  to authenticated;

create or replace function public.get_analytics_daily(
  p_from timestamptz default now() - interval '30 days',
  p_to timestamptz default now()
)
returns table (
  day date,
  visits bigint,
  page_views bigint,
  clicks bigint
)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.is_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;

  return query
  select
    date_trunc('day', recorded_at)::date,
    count(distinct session_id),
    count(*) filter (where event_name = 'page_view'),
    count(*) filter (
      where event_name in (
        'navigation_click',
        'book_open',
        'model_open',
        'model_interaction',
        'archive_filter',
        'outbound_click'
      )
    )
  from public.analytics_events
  where recorded_at >= coalesce(p_from, now() - interval '30 days')
    and recorded_at < coalesce(p_to, now())
  group by 1
  order by 1;
end;
$$;

revoke all on function public.get_analytics_daily(timestamptz, timestamptz)
  from public;
grant execute on function public.get_analytics_daily(timestamptz, timestamptz)
  to authenticated;

create or replace function public.get_analytics_breakdown(
  p_from timestamptz default now() - interval '30 days',
  p_to timestamptz default now()
)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  result jsonb;
begin
  if not public.is_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;

  with filtered as (
    select *
    from public.analytics_events
    where recorded_at >= coalesce(p_from, now() - interval '30 days')
      and recorded_at < coalesce(p_to, now())
  )
  select jsonb_build_object(
    'devices', coalesce((
      select jsonb_agg(to_jsonb(device_rows) order by device_rows.events desc)
      from (
        select device_type as name, count(*) as events
        from filtered
        group by device_type
      ) as device_rows
    ), '[]'::jsonb),
    'top_targets', coalesce((
      select jsonb_agg(to_jsonb(target_rows) order by target_rows.events desc)
      from (
        select target_type, target_id, count(*) as events
        from filtered
        where target_id is not null
        group by target_type, target_id
        order by count(*) desc
        limit 10
      ) as target_rows
    ), '[]'::jsonb),
    'referrers', coalesce((
      select jsonb_agg(to_jsonb(referrer_rows) order by referrer_rows.visits desc)
      from (
        select referrer_host as name, count(distinct session_id) as visits
        from filtered
        where referrer_host is not null
        group by referrer_host
        order by count(distinct session_id) desc
        limit 10
      ) as referrer_rows
    ), '[]'::jsonb)
  ) into result;

  return result;
end;
$$;

revoke all on function public.get_analytics_breakdown(timestamptz, timestamptz)
  from public;
grant execute on function public.get_analytics_breakdown(timestamptz, timestamptz)
  to authenticated;

create or replace function public.purge_old_analytics_events(
  p_retention_days integer default 180
)
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  deleted_count bigint;
begin
  if not public.is_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;

  if p_retention_days < 30 or p_retention_days > 730 then
    raise exception 'Retention must be between 30 and 730 days';
  end if;

  delete from public.analytics_events
  where recorded_at < now() - make_interval(days => p_retention_days);

  get diagnostics deleted_count = row_count;
  return deleted_count;
end;
$$;

revoke all on function public.purge_old_analytics_events(integer) from public;
grant execute on function public.purge_old_analytics_events(integer)
  to authenticated;

notify pgrst, 'reload schema';
