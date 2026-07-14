-- Stores the private backend choice that controls each public book's page proportions.

alter table public.books
  add column if not exists page_format text not null default 'a4_long_edge';

alter table public.books
  alter column page_format set default 'a4_long_edge';

update public.books
set page_format = 'a4_long_edge'
where page_format is null
   or page_format not in ('a4_long_edge', 'a4_short_edge', 'square');

alter table public.books
  alter column page_format set not null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'books_page_format_allowed'
      and conrelid = 'public.books'::regclass
  ) then
    alter table public.books
      add constraint books_page_format_allowed
      check (page_format in ('a4_long_edge', 'a4_short_edge', 'square'));
  end if;
end
$$;

notify pgrst, 'reload schema';
