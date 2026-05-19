import type { CourseWithId, ProjectWithId } from '../types/portfolio';
import projectsRowsCsv from './projects_rows.csv?raw';
import coursesRowsCsv from './courses_rows.csv?raw';

function parseCsv(source: string): Record<string, string>[] {
  const rows: string[][] = [];
  let field = '';
  let row: string[] = [];
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
    headers.reduce<Record<string, string>>((acc, header, index) => {
      acc[header.trim()] = dataRow[index] ?? '';
      return acc;
    }, {})
  );
}

function toBoolean(value: string | boolean | null | undefined): boolean {
  return value === true || String(value).toLowerCase() === 'true';
}

function toTags(value: string | string[] | null | undefined): string[] {
  if (Array.isArray(value)) return value;
  if (!value) return [];

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean);
  }
}

export const csvProjects: ProjectWithId[] = parseCsv(projectsRowsCsv)
  .map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    imageUrl: row.image_url,
    tags: toTags(row.tags),
    role: row.role,
    demoLink: row.demo_link,
    githubLink: row.github_link,
    hideGithubLink: toBoolean(row.hide_github_link),
    hideImageOverlay: toBoolean(row.hide_image_overlay),
    caseProblem: row.case_problem,
    caseSolution: row.case_solution,
    caseResult: row.case_result,
    active: toBoolean(row.active),
    order: Number(row.sort_order || 0),
    repoName: row.repo_name || undefined,
  }))
  .sort((a, b) => a.order - b.order);

export const csvCourses: CourseWithId[] = parseCsv(coursesRowsCsv)
  .map((row) => ({
    id: row.id,
    title: row.title,
    description: row.description,
    provider: row.provider,
    url: row.url,
    imageUrl: row.image_url,
    active: toBoolean(row.active),
    order: Number(row.sort_order || 0),
  }))
  .sort((a, b) => a.order - b.order);
