create extension if not exists pgcrypto;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
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

alter table profiles enable row level security;
alter table companies_interest enable row level security;

-- MVP sin login: permite crear perfiles desde la web usando la anon key.
-- Antes de mostrar perfiles a empresas, sumar Supabase Auth y politicas por usuario.
create policy "allow_public_profile_insert"
on profiles for insert
to anon
with check (true);

create policy "allow_public_company_interest_insert"
on companies_interest for insert
to anon
with check (true);
