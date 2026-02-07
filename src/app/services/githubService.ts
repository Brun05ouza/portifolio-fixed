const GITHUB_USER = 'Brun05ouza';
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos`;

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

const PROJECT_IMAGE = '/background-project.svg';

const ALLOWED_REPOS = [
  'nexus-flow-web',
  'promopc',
  'blog-pessoal',
  'blogpessoal',
  'gestor-pro',
  'gestor-pro-web',
  'lux',
  'lux-site',
  'e-commerce',
  'ecommerce',
  'cuidar-app',
  'cuidarapp',
];

const KNOWN_DESCRIPTIONS: Record<string, string> = {
  'nexus-flow-web': 'Sistema web em desenvolvimento.',
  promopc: 'Plataforma de promoções.',
  'blog-pessoal': 'Blog pessoal com artigos e projetos.',
  'gestor-pro': 'Sistema de gestão profissional.',
  'gestor-pro-web': 'Sistema de gestão web.',
  lux: 'Site de moda masculina.',
  'lux-site': 'E-commerce de moda masculina.',
  'e-commerce': 'Loja virtual com carrinho de compras.',
  ecommerce: 'E-commerce desenvolvido com React.',
  'cuidar-app': 'Aplicativo de cuidados e gestão.',
  cuidarapp: 'App de cuidados pessoais.',
};

function formatRepoName(name: string): string {
  return name
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getRepoImage(_repo: GitHubRepo): string {
  return PROJECT_IMAGE;
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

export async function fetchUserRepos(limit = 12): Promise<ProjectFromRepo[]> {
  try {
    const res = await fetch(
      `${API_URL}?sort=updated&per_page=${limit}&type=owner`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!res.ok) throw new Error('Falha ao buscar repositórios');

    const data: GitHubRepo[] = await res.json();

    return data
      .filter(
        (repo) =>
          !repo.fork &&
          repo.name !== GITHUB_USER &&
          ALLOWED_REPOS.some(
            (allowed) =>
              repo.name.toLowerCase() === allowed.toLowerCase() ||
              repo.name.toLowerCase().includes(allowed.toLowerCase())
          )
      )
      .map((repo) => {
        const knownDesc = KNOWN_DESCRIPTIONS[repo.name];
        return {
        title: formatRepoName(repo.name),
        description:
          repo.description ||
          knownDesc ||
          `Projeto desenvolvido com ${repo.language || 'diversas tecnologias'}.`,
        image: getRepoImage(repo),
        tags: getTags(repo),
        role: getRole(repo),
        demoLink: repo.homepage || undefined,
        githubLink: repo.html_url,
      };
      });
  } catch (error) {
    console.error('Erro ao buscar repositórios do GitHub:', error);
    return [];
  }
}
