-- MyNuki · wishlists table
-- Run in Supabase → SQL Editor after the earlier migrations.

create table if not exists public.wishlists (
  user_id uuid not null references auth.users (id) on delete cascade,
  product_slug text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, product_slug)
);

alter table public.wishlists enable row level security;

create policy "Wishlist is viewable by owner"
  on public.wishlists for select
  using (auth.uid() = user_id);

create policy "Users can add to own wishlist"
  on public.wishlists for insert
  with check (auth.uid() = user_id);

create policy "Users can remove from own wishlist"
  on public.wishlists for delete
  using (auth.uid() = user_id);
