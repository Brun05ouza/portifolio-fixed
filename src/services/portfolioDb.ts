import type { CertificateDoc, CourseDoc, ProjectDoc } from '../types/portfolio';
import type { CourseWithId, CertificateWithId, ProjectWithId } from '../types/portfolio';

const DB_DISABLED_ERROR = 'Banco desativado no frontend. Crie uma API/backend para salvar e ler dados do Neon.';

type WriteResult = { ok: true } | { ok: false; error: string };

export async function listCoursesPublic(): Promise<CourseWithId[]> {
  return [];
}

export async function listCertificatesPublic(): Promise<CertificateWithId[]> {
  return [];
}

export async function listProjectsPublic(): Promise<ProjectWithId[]> {
  return [];
}

export async function listCoursesAll(): Promise<CourseWithId[]> {
  return [];
}

export async function listCertificatesAll(): Promise<CertificateWithId[]> {
  return [];
}

export async function listProjectsAll(): Promise<ProjectWithId[]> {
  return [];
}

export async function countActiveCourses(): Promise<number> {
  return 0;
}

export async function countActiveCertificates(): Promise<number> {
  return 0;
}

export async function countActiveProjects(): Promise<number> {
  return 0;
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
