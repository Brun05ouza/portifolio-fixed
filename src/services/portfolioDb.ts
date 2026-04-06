import { supabase } from '../config/supabase';
import type { CertificateDoc, CourseDoc, ProjectDoc } from '../types/portfolio';
import type { CourseWithId, CertificateWithId, ProjectWithId } from '../types/portfolio';

function permissionHint(): string {
  return 'Confirme RLS no Supabase e faça login com o e-mail autorizado no /admin.';
}

function mapWriteError(e: { message?: string; code?: string } | unknown): string {
  const msg = e && typeof e === 'object' && 'message' in e ? String((e as { message: string }).message) : 'Falha ao salvar.';
  const code = e && typeof e === 'object' && 'code' in e ? String((e as { code?: string }).code) : '';
  if (code === '42501' || msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('policy')) {
    return `Permissão negada. ${permissionHint()}`;
  }
  return msg;
}

type CourseRow = {
  id: string;
  title: string;
  description: string;
  provider: string;
  url: string;
  image_url: string;
  active: boolean;
  sort_order: number;
};

type CertificateRow = {
  id: string;
  title: string;
  provider: string;
  year: string;
  color: string;
  icon_id: string;
  image_url: string;
  active: boolean;
  sort_order: number;
};

type ProjectRow = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tags: string[] | null;
  role: string;
  demo_link: string;
  github_link: string;
  hide_github_link: boolean;
  hide_image_overlay: boolean;
  case_problem: string;
  case_solution: string;
  case_result: string;
  active: boolean;
  sort_order: number;
  repo_name: string | null;
};

function rowToCourse(r: CourseRow): CourseWithId {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    provider: r.provider,
    url: r.url,
    imageUrl: r.image_url,
    active: r.active,
    order: r.sort_order,
  };
}

function rowToCertificate(r: CertificateRow): CertificateWithId {
  return {
    id: r.id,
    title: r.title,
    provider: r.provider,
    year: r.year,
    color: r.color,
    iconId: r.icon_id,
    imageUrl: r.image_url,
    active: r.active,
    order: r.sort_order,
  };
}

function rowToProject(r: ProjectRow): ProjectWithId {
  return {
    id: r.id,
    title: r.title,
    description: r.description,
    imageUrl: r.image_url,
    tags: Array.isArray(r.tags) ? r.tags : [],
    role: r.role,
    demoLink: r.demo_link,
    githubLink: r.github_link,
    hideGithubLink: r.hide_github_link,
    hideImageOverlay: r.hide_image_overlay,
    caseProblem: r.case_problem,
    caseSolution: r.case_solution,
    caseResult: r.case_result,
    active: r.active,
    order: r.sort_order,
    repoName: r.repo_name ?? undefined,
  };
}

function courseToInsert(d: CourseDoc) {
  return {
    title: d.title,
    description: d.description,
    provider: d.provider,
    url: d.url,
    image_url: d.imageUrl,
    active: d.active,
    sort_order: d.order,
    updated_at: new Date().toISOString(),
  };
}

function certificateToInsert(d: CertificateDoc) {
  return {
    title: d.title,
    provider: d.provider,
    year: d.year,
    color: d.color,
    icon_id: d.iconId,
    image_url: d.imageUrl,
    active: d.active,
    sort_order: d.order,
    updated_at: new Date().toISOString(),
  };
}

function projectToInsert(d: ProjectDoc) {
  return {
    title: d.title,
    description: d.description,
    image_url: d.imageUrl,
    tags: d.tags,
    role: d.role,
    demo_link: d.demoLink,
    github_link: d.githubLink,
    hide_github_link: d.hideGithubLink,
    hide_image_overlay: d.hideImageOverlay,
    case_problem: d.caseProblem,
    case_solution: d.caseSolution,
    case_result: d.caseResult,
    active: d.active,
    sort_order: d.order,
    repo_name: d.repoName?.trim() ? d.repoName.trim() : null,
    updated_at: new Date().toISOString(),
  };
}

export async function listCoursesPublic(): Promise<CourseWithId[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as CourseRow[]).map(rowToCourse);
  } catch {
    return [];
  }
}

export async function listCertificatesPublic(): Promise<CertificateWithId[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('certificates')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as CertificateRow[]).map(rowToCertificate);
  } catch {
    return [];
  }
}

export async function listProjectsPublic(): Promise<ProjectWithId[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('active', true)
      .order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as ProjectRow[])
      .map(rowToProject)
      .filter((p) => typeof p.imageUrl === 'string' && p.imageUrl.trim().length > 0);
  } catch {
    return [];
  }
}

export async function listCoursesAll(): Promise<CourseWithId[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('courses').select('*').order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as CourseRow[]).map(rowToCourse);
  } catch {
    return [];
  }
}

export async function listCertificatesAll(): Promise<CertificateWithId[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('certificates').select('*').order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as CertificateRow[]).map(rowToCertificate);
  } catch {
    return [];
  }
}

export async function listProjectsAll(): Promise<ProjectWithId[]> {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase.from('projects').select('*').order('sort_order', { ascending: true });
    if (error || !data) return [];
    return (data as ProjectRow[]).map(rowToProject);
  } catch {
    return [];
  }
}

export async function countActiveCourses(): Promise<number> {
  const list = await listCoursesPublic();
  return list.length;
}

export async function countActiveCertificates(): Promise<number> {
  const list = await listCertificatesPublic();
  return list.length;
}

export async function countActiveProjects(): Promise<number> {
  if (!supabase) return 0;
  try {
    const { data, error } = await supabase.from('projects').select('id').eq('active', true);
    if (error || !data) return 0;
    return data.length;
  } catch {
    return 0;
  }
}

type WriteResult = { ok: true } | { ok: false; error: string };

export async function createCourse(data: CourseDoc): Promise<WriteResult & { id?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { data: row, error } = await supabase.from('courses').insert(courseToInsert(data)).select('id').single();
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true, id: row?.id as string };
}

export async function updateCourse(id: string, data: CourseDoc): Promise<WriteResult> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { error } = await supabase.from('courses').update(courseToInsert(data)).eq('id', id);
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true };
}

export async function deleteCourse(id: string): Promise<WriteResult> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { error } = await supabase.from('courses').delete().eq('id', id);
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true };
}

export async function createCertificate(data: CertificateDoc): Promise<WriteResult & { id?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { data: row, error } = await supabase
    .from('certificates')
    .insert(certificateToInsert(data))
    .select('id')
    .single();
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true, id: row?.id as string };
}

export async function updateCertificate(id: string, data: CertificateDoc): Promise<WriteResult> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { error } = await supabase.from('certificates').update(certificateToInsert(data)).eq('id', id);
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true };
}

export async function deleteCertificate(id: string): Promise<WriteResult> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { error } = await supabase.from('certificates').delete().eq('id', id);
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true };
}

export async function createProject(data: ProjectDoc): Promise<WriteResult & { id?: string }> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { data: row, error } = await supabase.from('projects').insert(projectToInsert(data)).select('id').single();
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true, id: row?.id as string };
}

export async function updateProject(id: string, data: ProjectDoc): Promise<WriteResult> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { error } = await supabase.from('projects').update(projectToInsert(data)).eq('id', id);
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true };
}

export async function deleteProject(id: string): Promise<WriteResult> {
  if (!supabase) return { ok: false, error: 'Supabase não configurado.' };
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) return { ok: false, error: mapWriteError(error) };
  return { ok: true };
}
