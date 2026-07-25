-- Public page comments with administrator-only creation and deletion.
-- Safe to paste into the Supabase SQL editor.
-- Requires the existing public.is_admin() function.

create table if not exists public.book_comments (
  id uuid primary key default gen_random_uuid(),
  book_id uuid not null references public.books(id) on delete cascade,
  book_page_id uuid not null references public.book_pages(id) on delete cascade,
  body text not null check (
    char_length(trim(body)) between 1 and 600
  ),
  anchor_x double precision not null check (
    anchor_x between 0 and 1
  ),
  anchor_y double precision not null check (
    anchor_y between 0 and 1
  ),
  created_by uuid references auth.users(id) on delete set null,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists book_comments_book_idx
  on public.book_comments (book_id, created_at);

create index if not exists book_comments_page_idx
  on public.book_comments (book_page_id, created_at);

create or replace function public.touch_book_comment_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists book_comments_touch_updated_at
  on public.book_comments;
create trigger book_comments_touch_updated_at
before update on public.book_comments
for each row execute function public.touch_book_comment_updated_at();

alter table public.book_comments enable row level security;

grant select on public.book_comments to anon, authenticated;
grant insert, update, delete on public.book_comments to authenticated;

drop policy if exists "Published book comments are public"
  on public.book_comments;
create policy "Published book comments are public"
on public.book_comments
for select
to anon, authenticated
using (
  is_visible = true
  and exists (
    select 1
    from public.books
    where books.id = book_comments.book_id
      and books.is_published = true
  )
  and exists (
    select 1
    from public.book_pages
    where book_pages.id = book_comments.book_page_id
      and book_pages.book_id = book_comments.book_id
  )
);

drop policy if exists "Admins can read every book comment"
  on public.book_comments;
create policy "Admins can read every book comment"
on public.book_comments
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create book comments"
  on public.book_comments;
create policy "Admins can create book comments"
on public.book_comments
for insert
to authenticated
with check (
  public.is_admin()
  and created_by = auth.uid()
  and exists (
    select 1
    from public.book_pages
    where book_pages.id = book_comments.book_page_id
      and book_pages.book_id = book_comments.book_id
  )
);

drop policy if exists "Admins can update book comments"
  on public.book_comments;
create policy "Admins can update book comments"
on public.book_comments
for update
to authenticated
using (public.is_admin())
with check (
  public.is_admin()
  and exists (
    select 1
    from public.book_pages
    where book_pages.id = book_comments.book_page_id
      and book_pages.book_id = book_comments.book_id
  )
);

drop policy if exists "Admins can delete book comments"
  on public.book_comments;
create policy "Admins can delete book comments"
on public.book_comments
for delete
to authenticated
using (public.is_admin());

notify pgrst, 'reload schema';
