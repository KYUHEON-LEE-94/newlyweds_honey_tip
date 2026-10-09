create table public.articles (
 id text primary key check (id ~ '^[a-z0-9-]+$'),
 content jsonb not null check (jsonb_typeof(content) = 'object'),
 published boolean not null default false,
 updated_at timestamptz not null default now()
);
alter table public.articles enable row level security;
revoke all on public.articles from anon, authenticated;
grant select on public.articles to anon, authenticated;
create policy "Published articles are public" on public.articles for select to anon, authenticated using (published);
create table public.bookmarks (
 user_id uuid not null references auth.users(id) on delete cascade,
 article_id text not null references public.articles(id) on delete cascade,
 created_at timestamptz not null default now(),
 primary key(user_id,article_id)
);
create index bookmarks_article_idx on public.bookmarks(article_id);
alter table public.bookmarks enable row level security;
revoke all on public.bookmarks from anon, authenticated;
grant select, insert, delete on public.bookmarks to authenticated;
create policy "Read own bookmarks" on public.bookmarks for select to authenticated using ((select auth.uid()) = user_id);
create policy "Add own bookmarks" on public.bookmarks for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Delete own bookmarks" on public.bookmarks for delete to authenticated using ((select auth.uid()) = user_id);

-- Dashboard automatic RLS event trigger must not be callable by API clients.
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
