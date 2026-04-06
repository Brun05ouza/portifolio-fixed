-- Portfólio: tabelas + RLS + Storage
-- Execute no SQL Editor do Supabase (Dashboard → SQL → New query).
-- Depois crie o utilizador admin em Authentication → Users (e-mail/senha).

-- ---------------------------------------------------------------------------
-- Tabelas
-- ---------------------------------------------------------------------------

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

insert into public.site_settings (id) values ('portfolio') on conflict (id) do nothing;

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

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------

alter table public.site_settings enable row level security;
alter table public.courses enable row level security;
alter table public.certificates enable row level security;
alter table public.projects enable row level security;
alter table public.contacts enable row level security;

-- Ajuste o e-mail se for outro utilizador admin.
-- Substitua também em políticas de storage abaixo, se necessário.
-- ---------------------------------------------------------------------------

create policy site_settings_select_public
  on public.site_settings for select using (true);

create policy site_settings_write_admin
  on public.site_settings for all to authenticated
  using ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com');

create policy courses_select_public
  on public.courses for select using (true);

create policy courses_write_admin
  on public.courses for all to authenticated
  using ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com');

create policy certificates_select_public
  on public.certificates for select using (true);

create policy certificates_write_admin
  on public.certificates for all to authenticated
  using ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com');

create policy projects_select_public
  on public.projects for select using (true);

create policy projects_write_admin
  on public.projects for all to authenticated
  using ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com');

create policy contacts_insert_anon
  on public.contacts for insert to anon, authenticated
  with check (true);

create policy contacts_no_read_public
  on public.contacts for select to authenticated
  using ((auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com');

-- ---------------------------------------------------------------------------
-- Storage: bucket público para leitura, escrita só admin
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

create policy portfolio_objects_select_public
  on storage.objects for select using (bucket_id = 'portfolio');

create policy portfolio_objects_insert_admin
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'portfolio'
    and (auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com'
  );

create policy portfolio_objects_update_admin
  on storage.objects for update to authenticated
  using (
    bucket_id = 'portfolio'
    and (auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com'
  );

create policy portfolio_objects_delete_admin
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'portfolio'
    and (auth.jwt() ->> 'email') = 'brunosouzagithub2003@gmail.com'
  );
