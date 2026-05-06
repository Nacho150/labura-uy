create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  city text,
  department text,
  age integer,
  experience_text text,
  skills_text text,
  education_level text,
  availability text,
  has_transport boolean default false,
  has_driver_license boolean default false,
  desired_work_type text,
  interested_categories jsonb default '[]'::jsonb,
  recommended_jobs jsonb default '[]'::jsonb,
  whatsapp_message text,
  mini_cv text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table profiles add column if not exists user_id uuid references auth.users(id) on delete cascade;
create unique index if not exists profiles_user_id_unique on profiles(user_id);

create table if not exists companies_interest (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_name text,
  email text,
  phone text,
  city text,
  hiring_needs text,
  created_at timestamptz default now()
);

create table if not exists admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table companies_interest enable row level security;
alter table admin_users enable row level security;

drop policy if exists "allow_public_profile_insert" on profiles;
drop policy if exists "profiles_insert_own" on profiles;
drop policy if exists "profiles_select_own" on profiles;
drop policy if exists "profiles_update_own" on profiles;
drop policy if exists "profiles_delete_own" on profiles;
drop policy if exists "profiles_admin_select_all" on profiles;
drop policy if exists "admin_users_select_own" on admin_users;

create policy "profiles_insert_own"
on profiles for insert
to authenticated
with check (auth.uid() = user_id);

create policy "profiles_select_own"
on profiles for select
to authenticated
using (auth.uid() = user_id);

create policy "profiles_admin_select_all"
on profiles for select
to authenticated
using (
  exists (
    select 1
    from admin_users
    where admin_users.user_id = auth.uid()
  )
);

create policy "profiles_update_own"
on profiles for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "profiles_delete_own"
on profiles for delete
to authenticated
using (auth.uid() = user_id);

create policy "admin_users_select_own"
on admin_users for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "allow_public_company_interest_insert" on companies_interest;

create policy "allow_public_company_interest_insert"
on companies_interest for insert
to anon
with check (true);

-- Para convertir tu usuario en admin:
-- 1. Cambia el email por el email de tu cuenta de Labura UY.
-- 2. Ejecuta solo estas lineas en Supabase SQL Editor.
--
-- insert into admin_users (user_id)
-- select id from auth.users
-- where email = 'tu-email@ejemplo.com'
-- on conflict (user_id) do nothing;
