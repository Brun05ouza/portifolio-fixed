/**
 * Registros Supabase (tabelas courses, certificates, projects).
 */

export interface CourseDoc {
  title: string;
  description: string;
  provider: string;
  url: string;
  imageUrl: string;
  active: boolean;
  order: number;
}

export interface CertificateDoc {
  title: string;
  provider: string;
  year: string;
  /** Cor do ícone (hex), ex: #F7DF1E */
  color: string;
  /** Chave em CERT_ICON_MAP (config/certIcons.ts) */
  iconId: string;
  imageUrl: string;
  active: boolean;
  order: number;
}

export interface ProjectDoc {
  title: string;
  description: string;
  /** Obrigatório para exibir no site público */
  imageUrl: string;
  tags: string[];
  role: string;
  demoLink: string;
  githubLink: string;
  hideGithubLink: boolean;
  hideImageOverlay: boolean;
  caseProblem: string;
  caseSolution: string;
  caseResult: string;
  active: boolean;
  order: number;
  /** Opcional: fallback para texto do case em config/cases.ts */
  repoName?: string;
}

export type CourseWithId = CourseDoc & { id: string };
export type CertificateWithId = CertificateDoc & { id: string };
export type ProjectWithId = ProjectDoc & { id: string };

/** Formato consumido por ProjectCard + CaseModal no site */
export interface PortfolioProjectView {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  role: string;
  demoLink?: string;
  githubLink?: string;
  hideGithubLink?: boolean;
  hideImageOverlay?: boolean;
  caseProblem: string;
  caseSolution: string;
  caseResult: string;
  repoName?: string;
}

export function toPortfolioProjectView(p: ProjectWithId): PortfolioProjectView {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.imageUrl,
    tags: Array.isArray(p.tags) ? p.tags : [],
    role: p.role,
    demoLink: p.demoLink || undefined,
    githubLink: p.githubLink || undefined,
    hideGithubLink: p.hideGithubLink,
    hideImageOverlay: p.hideImageOverlay,
    caseProblem: p.caseProblem,
    caseSolution: p.caseSolution,
    caseResult: p.caseResult,
    repoName: p.repoName,
  };
}
