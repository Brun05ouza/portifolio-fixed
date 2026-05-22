import type { CertificateDoc, CompanyDoc, CourseDoc, ProjectDoc } from '../types/portfolio';
import type { CourseWithId, CertificateWithId, CompanyWithId, ProjectCollaborator, ProjectCompany, ProjectWithId } from '../types/portfolio';
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

function normalizeCompany(row: Record<string, unknown>): CompanyWithId {
  return {
    id: String(row.id),
    name: String(row.name ?? ''),
    iconUrl: String(row.iconUrl ?? row.icon_url ?? ''),
    websiteUrl: String(row.websiteUrl ?? row.website_url ?? ''),
    active: toBoolean(row.active ?? true),
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

  const rawCompany = typeof row.company === 'object' && row.company ? row.company as Record<string, unknown> : {};
  const companyId = String(row.companyId ?? row.company_id ?? rawCompany.id ?? '') || undefined;
  const companyName = String(row.companyName ?? row.company_name ?? rawCompany.name ?? '');
  const company = companyId && companyName
    ? ({
        id: companyId,
        name: companyName,
        iconUrl: String(row.companyIconUrl ?? row.company_icon_url ?? rawCompany.iconUrl ?? rawCompany.icon_url ?? ''),
        websiteUrl: String(row.companyWebsiteUrl ?? row.company_website_url ?? rawCompany.websiteUrl ?? rawCompany.website_url ?? ''),
      } satisfies ProjectCompany)
    : null;

  return {
    id: String(row.id),
    title: String(row.title ?? ''),
    description: String(row.description ?? ''),
    imageUrl: String(row.imageUrl ?? row.image_url ?? '').trim() || '/background-project.svg',
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
    companyId,
    company,
    collaborators: Array.isArray(row.collaborators)
      ? row.collaborators.map((item): ProjectCollaborator => {
          const collaborator = item as Record<string, unknown>;
          const platform = collaborator.platform === 'instagram' || collaborator.platform === 'site'
            ? collaborator.platform
            : 'github';
          return {
            name: String(collaborator.name ?? ''),
            platform,
            url: String(collaborator.url ?? ''),
          };
        }).filter((item) => item.name && item.url)
      : [],
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

function projectKey(project: ProjectWithId): string {
  return [
    project.id,
    project.repoName ?? '',
    project.githubLink ?? '',
  ].map((value) => value.trim().toLowerCase()).find(Boolean) ?? project.title.trim().toLowerCase();
}

function mergeProjects(primary: ProjectWithId[], extras: ProjectWithId[]): ProjectWithId[] {
  const merged = [...primary];
  const indexByKey = new Map(merged.map((project, index) => [projectKey(project), index]));
  for (const project of extras) {
    const key = projectKey(project);
    const existingIndex = indexByKey.get(key);
    if (existingIndex !== undefined) {
      const current = merged[existingIndex];
      merged[existingIndex] = {
        ...current,
        imageUrl: project.imageUrl || current.imageUrl || '/background-project.svg',
        tags: project.tags.length > 0 ? project.tags : current.tags,
        order: project.order || current.order,
        repoName: project.repoName ?? current.repoName,
      };
      continue;
    }
    indexByKey.set(key, merged.length);
    merged.push(project);
  }
  return merged.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function listCoursesPublic(): Promise<CourseWithId[]> {
  return fetchCollection('/api/courses', normalizeCourse, csvCourses.filter((course) => course.active));
}

export async function listCertificatesPublic(): Promise<CertificateWithId[]> {
  return [];
}

export async function listProjectsPublic(): Promise<ProjectWithId[]> {
  const localProjects = csvProjects.filter((project) => project.active);
  const apiProjects = await fetchCollection('/api/projects', normalizeProject, localProjects);
  return mergeProjects(apiProjects, localProjects);
}

export async function listCoursesAll(): Promise<CourseWithId[]> {
  return listCoursesPublic();
}

export async function listCertificatesAll(): Promise<CertificateWithId[]> {
  return [];
}

export async function listProjectsAll(): Promise<ProjectWithId[]> {
  const apiProjects = await fetchCollection('/api/admin/projects', normalizeProject, csvProjects);
  return mergeProjects(apiProjects, csvProjects);
}

export async function listCompaniesAll(): Promise<CompanyWithId[]> {
  return fetchCollection('/api/admin/companies', normalizeCompany, []);
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
  return writeJson('/api/admin/projects', 'POST', _data);
}

export async function updateProject(_id: string, _data: ProjectDoc): Promise<WriteResult> {
  return writeJson(`/api/admin/projects?id=${encodeURIComponent(_id)}`, 'PUT', _data);
}

export async function deleteProject(_id: string): Promise<WriteResult> {
  return writeJson(`/api/admin/projects?id=${encodeURIComponent(_id)}`, 'DELETE');
}

export async function createCompany(_data: CompanyDoc): Promise<WriteResult & { id?: string }> {
  return writeJson('/api/admin/companies', 'POST', _data);
}

async function writeJson(endpoint: string, method: string, data?: unknown): Promise<WriteResult & { id?: string }> {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: data ? { 'Content-Type': 'application/json' } : undefined,
      body: data ? JSON.stringify(data) : undefined,
    });
    const payload = await response.json().catch(() => ({})) as { id?: string; error?: string };
    if (!response.ok) return { ok: false, error: payload.error || DB_DISABLED_ERROR };
    return { ok: true, id: payload.id };
  } catch {
    return { ok: false, error: DB_DISABLED_ERROR };
  }
}
