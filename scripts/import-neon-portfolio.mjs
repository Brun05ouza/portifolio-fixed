import { neon } from '@neondatabase/serverless';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function loadLocalEnv(fileName) {
  const filePath = path.join(rootDir, fileName);
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    const value = match[2].replace(/^['"]|['"]$/g, '');
    process.env[match[1]] = value;
  }
}

loadLocalEnv('.env.local');
loadLocalEnv('.env');

const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

if (!connectionString) {
  console.error('Defina DATABASE_URL ou NEON_DATABASE_URL antes de importar.');
  process.exit(1);
}

function parseCsv(source) {
  const rows = [];
  let field = '';
  let row = [];
  let quoted = false;

  for (let i = 0; i < source.length; i += 1) {
    const char = source[i];
    const next = source[i + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === ',' && !quoted) {
      row.push(field);
      field = '';
    } else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(field);
      field = '';
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = [];
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const [headers = [], ...dataRows] = rows;
  return dataRows.map((dataRow) =>
    headers.reduce((acc, header, index) => {
      acc[header.trim()] = dataRow[index] ?? '';
      return acc;
    }, {})
  );
}

function readCsv(filePath) {
  return parseCsv(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
}

function toBool(value) {
  return String(value).toLowerCase() === 'true';
}

const projectsPath = process.argv[2] || path.join(rootDir, 'src', 'data', 'projects_rows.csv');
const coursesPath = process.argv[3] || path.join(rootDir, 'src', 'data', 'courses_rows.csv');
const projects = readCsv(projectsPath);
const courses = readCsv(coursesPath);
const sql = neon(connectionString);

await sql`select 1`;
await sql`alter table public.projects add column if not exists collaborators jsonb not null default '[]'::jsonb`;

for (const row of courses) {
  await sql`
    insert into public.courses (
      id, title, description, provider, url, image_url, active, sort_order, created_at, updated_at
    )
    values (
      ${row.id}, ${row.title}, ${row.description}, ${row.provider}, ${row.url}, ${row.image_url},
      ${toBool(row.active)}, ${Number(row.sort_order || 0)}, ${row.created_at || null}, ${row.updated_at || null}
    )
    on conflict (id) do update set
      title = excluded.title,
      description = excluded.description,
      provider = excluded.provider,
      url = excluded.url,
      image_url = excluded.image_url,
      active = excluded.active,
      sort_order = excluded.sort_order,
      updated_at = coalesce(excluded.updated_at, now())
  `;
}

for (const row of projects) {
  await sql`
    insert into public.projects (
      id, title, description, image_url, tags, role, demo_link, github_link, hide_github_link,
      hide_image_overlay, case_problem, case_solution, case_result, active, sort_order,
      repo_name, created_at, updated_at
    )
    values (
      ${row.id}, ${row.title}, ${row.description}, ${row.image_url}, ${JSON.parse(row.tags || '[]')},
      ${row.role}, ${row.demo_link}, ${row.github_link}, ${toBool(row.hide_github_link)},
      ${toBool(row.hide_image_overlay)}, ${row.case_problem}, ${row.case_solution}, ${row.case_result},
      ${toBool(row.active)}, ${Number(row.sort_order || 0)}, ${row.repo_name || null},
      ${row.created_at || null}, ${row.updated_at || null}
    )
    on conflict (id) do update set
      title = excluded.title,
      description = excluded.description,
      image_url = excluded.image_url,
      tags = excluded.tags,
      role = excluded.role,
      demo_link = excluded.demo_link,
      github_link = excluded.github_link,
      hide_github_link = excluded.hide_github_link,
      hide_image_overlay = excluded.hide_image_overlay,
      case_problem = excluded.case_problem,
      case_solution = excluded.case_solution,
      case_result = excluded.case_result,
      active = excluded.active,
      sort_order = excluded.sort_order,
      repo_name = excluded.repo_name,
      updated_at = coalesce(excluded.updated_at, now())
  `;
}

console.log(`Importados ${projects.length} projetos e ${courses.length} curso(s) para o Neon.`);
