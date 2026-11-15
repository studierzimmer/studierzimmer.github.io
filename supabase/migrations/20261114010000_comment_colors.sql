-- Safe to run again in the existing Studier Zimmer project's SQL Editor.
-- Additive: existing comment text, anchors, visibility and permissions stay intact.
begin;
set local lock_timeout = '5s';
set local statement_timeout = '30s';

alter table public.book_comments
  add column if not exists background_color text not null default '#DDE2E5',
  add column if not exists text_color text not null default '#414A51',
  add column if not exists background_opacity double precision not null default 0.75,
  add column if not exists font_size double precision not null default 14,
  add column if not exists title text;

do $$
begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.book_comments'::regclass and conname = 'book_comments_background_color_hex') then
    alter table public.book_comments add constraint book_comments_background_color_hex check (background_color ~* '^#[0-9a-f]{6}$');
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.book_comments'::regclass and conname = 'book_comments_text_color_hex') then
    alter table public.book_comments add constraint book_comments_text_color_hex check (text_color ~* '^#[0-9a-f]{6}$');
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.book_comments'::regclass and conname = 'book_comments_background_opacity_range') then
    alter table public.book_comments add constraint book_comments_background_opacity_range check (background_opacity >= 0.15 and background_opacity <= 1);
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.book_comments'::regclass and conname = 'book_comments_font_size_range') then
    alter table public.book_comments add constraint book_comments_font_size_range check (font_size >= 10 and font_size <= 48);
  end if;
  if not exists (select 1 from pg_constraint where conrelid = 'public.book_comments'::regclass and conname = 'book_comments_title_length') then
    alter table public.book_comments add constraint book_comments_title_length check (title is null or char_length(btrim(title)) between 1 and 120);
  end if;
end;
$$;
notify pgrst, 'reload schema';
commit;
