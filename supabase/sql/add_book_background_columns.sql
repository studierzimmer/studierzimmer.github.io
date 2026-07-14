begin;

alter table public.books
  add column if not exists background_r smallint not null default 255,
  add column if not exists background_g smallint not null default 255,
  add column if not exists background_b smallint not null default 255;

update public.books
set
  background_r = greatest(0, least(255, coalesce(background_r, 255))),
  background_g = greatest(0, least(255, coalesce(background_g, 255))),
  background_b = greatest(0, least(255, coalesce(background_b, 255)));

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'books_background_r_range'
      and conrelid = 'public.books'::regclass
  ) then
    alter table public.books
      add constraint books_background_r_range
      check (background_r between 0 and 255);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'books_background_g_range'
      and conrelid = 'public.books'::regclass
  ) then
    alter table public.books
      add constraint books_background_g_range
      check (background_g between 0 and 255);
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'books_background_b_range'
      and conrelid = 'public.books'::regclass
  ) then
    alter table public.books
      add constraint books_background_b_range
      check (background_b between 0 and 255);
  end if;
end
$$;

commit;

notify pgrst, 'reload schema';
