import { neon } from '@neondatabase/serverless';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hashPassword } from '../api/_lib/auth.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

for (const fileName of ['.env.local', '.env']) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) continue;
  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
}

const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!connectionString || !email || !password) {
  console.error('Defina DATABASE_URL, ADMIN_EMAIL e ADMIN_PASSWORD para criar o admin.');
  process.exit(1);
}

const sql = neon(connectionString);
await sql`create extension if not exists pgcrypto`;
await sql`alter table public.projects add column if not exists collaborators jsonb not null default '[]'::jsonb`;
await sql`
  create table if not exists public.admin_users (
    id uuid primary key default gen_random_uuid(),
    email text not null unique,
    password_hash text not null,
    created_at timestamptz default now()
  )
`;
await sql`
  create table if not exists public.admin_sessions (
    token_hash text primary key,
    user_id uuid not null references public.admin_users(id) on delete cascade,
    expires_at timestamptz not null,
    created_at timestamptz default now()
  )
`;
await sql`
  insert into public.admin_users (email, password_hash)
  values (${email}, ${hashPassword(password)})
  on conflict (email) do update set password_hash = excluded.password_hash
`;

console.log(`Admin criado/atualizado: ${email}`);
