import type { CertificateDoc, CourseDoc, ProjectDoc } from '../types/portfolio';
import type { CourseWithId, CertificateWithId, ProjectWithId } from '../types/portfolio';
import { csvCourses, csvProjects } from '../data/csvPortfolioData';

const DB_DISABLED_ERROR = 'Banco desativado no frontend. Crie uma API/backend para salvar e ler dados do Neon.';

type WriteResult = { ok: true } | { ok: false; error: string };
type ApiCollection<T> = { data?: T[]; error?: string };

function toBoolean(value: unknown): boolean {
  return value === true || String(value).toLowerCase() === 'true';
}

function toNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeCourse(row: Record<string, unknown>): CourseWithId {
  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    provider: String(row.provider ?? ''),
    url: String(row.url ?? ''),
    imageUrl: String(row.imageUrl ?? row.image_url ?? ''),
    active: toBoolean(row.active),
    order: toNumber(row.order ?? row.sort_order),
  };
}

function normalizeProject(row: Record<string, unknown>): ProjectWithId {
  const rawTags = row.tags;
  let tags: string[] = [];
  if (Array.isArray(rawTags)) {
    tags = rawTags.map(String);
  } else if (typeof rawTags === 'string') {
    try {
      const parsed = JSON.parse(rawTags || '[]');
      tags = Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      tags = rawTags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }
  }

  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    imageUrl: String(row.imageUrl ?? row.image_url ?? ''),
    tags,
    role: String(row.role ?? ''),
    demoLink: String(row.demoLink ?? row.demo_link ?? ''),
    githubLink: String(row.githubLink ?? row.github_link ?? ''),
    hideGithubLink: toBoolean(row.hideGithubLink ?? row.hide_github_link),
    hideImageOverlay: toBoolean(row.hideImageOverlay ?? row.hide_image_overlay),
    caseProblem: String(row.caseProblem ?? row.case_problem ?? ''),
    caseSolution: String(row.caseSolution ?? row.case_solution ?? ''),
    caseResult: String(row.caseResult ?? row.case_result ?? ''),
    active: toBoolean(row.active),
    order: toNumber(row.order ?? row.sort_order),
    repoName: String(row.repoName ?? row.repo_name ?? '') || undefined,
  };
}

async function fetchCollection<T>(
  endpoint: string,
  normalize: (row: Record<string, unknown>) => T,
  fallback: T[]
): Promise<T[]> {
  try {
    const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!response.ok) return fallback;
    const payload = (await response.json()) as ApiCollection<Record<string, unknown>>;
    if (!Array.isArray(payload.data)) return fallback;
    return payload.data.map(normalize);
  } catch {
    return fallback;
  }
}

export async function listCoursesPublic(): Promise<CourseWithId[]> {
  return fetchCollection('/api/courses', normalizeCourse, csvCourses.filter((course) => course.active));
}

export async function listCertificatesPublic(): Promise<CertificateWithId[]> {
  return [];
}

export async function listProjectsPublic(): Promise<ProjectWithId[]> {
  return fetchCollection('/api/projects', normalizeProject, csvProjects.filter((project) => project.active));
}

export async function listCoursesAll(): Promise<CourseWithId[]> {
  return listCoursesPublic();
}

export async function listCertificatesAll(): Promise<CertificateWithId[]> {
  return [];
}

export async function listProjectsAll(): Promise<ProjectWithId[]> {
  return listProjectsPublic();
}

export async function countActiveCourses(): Promise<number> {
  return (await listCoursesPublic()).length;
}

export async function countActiveCertificates(): Promise<number> {
  return 0;
}

export async function countActiveProjects(): Promise<number> {
  return (await listProjectsPublic()).length;
}

export async function createCourse(_data: CourseDoc): Promise<WriteResult & { id?: string }> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function updateCourse(_id: string, _data: CourseDoc): Promise<WriteResult> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function deleteCourse(_id: string): Promise<WriteResult> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function createCertificate(_data: CertificateDoc): Promise<WriteResult & { id?: string }> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function updateCertificate(_id: string, _data: CertificateDoc): Promise<WriteResult> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function deleteCertificate(_id: string): Promise<WriteResult> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function createProject(_data: ProjectDoc): Promise<WriteResult & { id?: string }> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function updateProject(_id: string, _data: ProjectDoc): Promise<WriteResult> {
  return { ok: false, error: DB_DISABLED_ERROR };
}

export async function deleteProject(_id: string): Promise<WriteResult> {
  return { ok: false, error: DB_DISABLED_ERROR };
}
