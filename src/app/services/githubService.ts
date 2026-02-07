import { allowedRepos, knownDescriptions } from '../../config/projects';
import { siteConfig } from '../../config/content';

const CACHE_KEY = 'portfolio_github_repos';
const CACHE_TTL_MS = 1000 * 60 * 10; // 10 minutos

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
}

export interface ProjectFromRepo {
  title: string;
  description: string;
  image: string;
  tags: string[];
  role: string;
  demoLink?: string;
  githubLink: string;
}

export interface FetchReposResult {
  projects: ProjectFromRepo[];
  error: string | null;
  fromCache: boolean;
}

const PROJECT_IMAGE = '/background-project.svg';
const GITHUB_USER = siteConfig.githubUser;
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getTags(repo: GitHubRepo): string[] {
  const tags = [...(repo.topics || [])];
  if (repo.language && !tags.includes(repo.language)) {
    tags.unshift(repo.language);
  }
  return tags.slice(0, 5);
}

function getRole(repo: GitHubRepo): string {
  const lang = (repo.language || '').toLowerCase();
  const fullStackLangs = ['javascript', 'typescript', 'python', 'go', 'rust'];
  return fullStackLangs.includes(lang) ? 'Full Stack' : 'Front-end';
}

function parseApiResponse(data: GitHubRepo[]): ProjectFromRepo[] {
  return data
    .filter(
      (repo) =>
        !repo.fork &&
        repo.name !== GITHUB_USER &&
        allowedRepos.some(
          (allowed) =>
            repo.name.toLowerCase() === allowed.toLowerCase() ||
            repo.name.toLowerCase().includes(allowed.toLowerCase())
        )
    )
    .map((repo) => {
      const knownDesc = knownDescriptions[repo.name];
      return {
        title: formatRepoName(repo.name),
        description:
          repo.description ||
          knownDesc ||
          `Projeto desenvolvido com ${repo.language || 'diversas tecnologias'}.`,
        image: PROJECT_IMAGE,
        tags: getTags(repo),
        role: getRole(repo),
        demoLink: repo.homepage || undefined,
        githubLink: repo.html_url,
      };
    });
}

function getCached(): ProjectFromRepo[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { data, expires } = JSON.parse(raw);
    if (Date.now() > expires) return null;
    return data;
  } catch {
    return null;
  }
}

function setCache(projects: ProjectFromRepo[]): void {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data: projects, expires: Date.now() + CACHE_TTL_MS })
    );
  } catch {
    // ignore
  }
}

/** Fallback estático quando a API falha */
function getFallbackProjects(): ProjectFromRepo[] {
  return allowedRepos.slice(0, 6).map((name) => ({
    title: formatRepoName(name),
    description: knownDescriptions[name] || `Projeto ${name}.`,
    image: PROJECT_IMAGE,
    tags: ['Projeto'],
    role: 'Full Stack',
    githubLink: `https://github.com/${GITHUB_USER}/${name}`,
  }));
}

export async function fetchUserRepos(limit = 12): Promise<FetchReposResult> {
  const cached = getCached();
  if (cached && cached.length > 0) {
    return { projects: cached.slice(0, limit), error: null, fromCache: true };
  }

  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(
      `${API_URL}?sort=updated&per_page=${Math.min(limit, 100)}&type=owner`,
      { headers }
    );

    if (res.status === 403) {
      const fallback = getFallbackProjects();
      setCache(fallback);
      return {
        projects: fallback.slice(0, limit),
        error: 'Rate limit da API do GitHub atingido. Exibindo dados em cache.',
        fromCache: false,
      };
    }

    if (res.status === 404) {
      return {
        projects: getFallbackProjects().slice(0, limit),
        error: `Usuário "${GITHUB_USER}" não encontrado no GitHub.`,
        fromCache: false,
      };
    }

    if (!res.ok) {
      const fallback = getFallbackProjects();
      setCache(fallback);
      return {
        projects: fallback.slice(0, limit),
        error: `Erro ao buscar repositórios (${res.status}). Exibindo dados de fallback.`,
        fromCache: false,
      };
    }

    const data: GitHubRepo[] = await res.json();
    const projects = parseApiResponse(data).slice(0, limit);

    if (projects.length > 0) {
      setCache(projects);
    }

    return { projects, error: null, fromCache: false };
  } catch (err) {
    const fallback = getFallbackProjects();
    const cachedForError = getCached();
    const toShow = cachedForError && cachedForError.length > 0 ? cachedForError : fallback;

    return {
      projects: toShow.slice(0, limit),
      error: err instanceof Error ? err.message : 'Falha na conexão. Verifique sua internet.',
      fromCache: false,
    };
  }
}
