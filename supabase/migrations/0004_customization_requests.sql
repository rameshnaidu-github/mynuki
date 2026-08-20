-- MyNuki · customization_requests ("Make It Yours" quote form)
-- Run in Supabase → SQL Editor after the earlier migrations.

create table if not exists public.customization_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  category text,
  budget text,
  details text not null,
  created_at timestamptz not null default now()
);

alter table public.customization_requests enable row level security;

-- Anyone (guest or signed-in) may submit a request.
create policy "Anyone can submit a request"
  on public.customization_requests for insert
  with check (true);

-- Only the signed-in author can read their own submissions.
create policy "Owner can view own requests"
  on public.customization_requests for select
  using (auth.uid() = user_id);
