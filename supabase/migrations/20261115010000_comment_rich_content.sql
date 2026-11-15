-- Optional structured comment formatting. Existing plain bodies/RLS stay intact.
-- Run locally prepared SQL only after approval; this file does not execute it.
begin;
set local lock_timeout = '5s';
set local statement_timeout = '30s';
alter table public.book_comments add column if not exists rich_content jsonb;
do $$
begin
  if not exists (select 1 from pg_constraint where conrelid = 'public.book_comments'::regclass and conname = 'book_comments_rich_content_shape') then
    alter table public.book_comments add constraint book_comments_rich_content_shape check (
      rich_content is null or case
        when jsonb_typeof(rich_content) = 'object'
          and rich_content->'version' = '1'::jsonb
          and jsonb_typeof(rich_content->'paragraphs') = 'array'
        then jsonb_array_length(rich_content->'paragraphs') between 1 and 601
          and octet_length(rich_content::text) <= 100000
        else false
      end
    );
  end if;
end;
$$;
notify pgrst, 'reload schema';
commit;
