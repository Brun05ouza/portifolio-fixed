create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id text primary key default 'portfolio',
  hero_greeting text,
  hero_headline text,
  hero_subheadline text,
  contact_email text,
  linkedin_url text,
  github_url text,
  whatsapp_number text,
  github_user text,
  calendly_url text,
  stat_lines_of_code integer,
  stat_projects integer,
  stat_coffees integer,
  stat_study_hours integer,
  updated_at timestamptz default now(),
  updated_by_uid text
);

insert into public.site_settings (id)
values ('portfolio')
on conflict (id) do nothing;

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text not null default '',
  provider text not null default '',
  url text not null default '',
  image_url text not null default '',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  provider text not null default '',
  year text not null default '',
  color text not null default '#F7DF1E',
  icon_id text not null default 'javascript',
  image_url text not null default '',
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text not null default '',
  image_url text not null default '',
  tags text[] not null default '{}',
  role text not null default '',
  demo_link text not null default '',
  github_link text not null default '',
  hide_github_link boolean not null default false,
  hide_image_overlay boolean not null default false,
  case_problem text not null default '',
  case_solution text not null default '',
  case_result text not null default '',
  active boolean not null default true,
  sort_order integer not null default 0,
  repo_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

create index if not exists courses_active_sort_order_idx on public.courses (active, sort_order);
create index if not exists certificates_active_sort_order_idx on public.certificates (active, sort_order);
create index if not exists projects_active_sort_order_idx on public.projects (active, sort_order);
create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
