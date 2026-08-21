-- Dabble & Dahlia · orders table
-- Run this in Supabase → SQL Editor after 0001_profiles.sql.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  status text not null default 'pending',           -- pending | paid | failed
  total_amount integer not null,                    -- whole INR (rupees)
  currency text not null default 'INR',
  items jsonb not null,                             -- [{ slug, name, price, qty }]
  shipping jsonb not null,                          -- { fullName, phone, line1, line2, city, state, pincode }
  payment_id text,                                  -- Razorpay payment id (test mode)
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

-- A user can read and create only their own orders.
create policy "Orders are viewable by owner"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

create index if not exists orders_user_created_idx
  on public.orders (user_id, created_at desc);
