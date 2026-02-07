/**
 * Configuração de repositórios exibidos na seção Projetos.
 * Permite controle via variável de ambiente VITE_ALLOWED_REPOS (JSON array) ou fallback estático.
 */

const DEFAULT_ALLOWED_REPOS = [
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

function getAllowedRepos(): string[] {
  const envRepos = import.meta.env.VITE_ALLOWED_REPOS;
  if (typeof envRepos === 'string' && envRepos.trim()) {
    try {
      const parsed = JSON.parse(envRepos);
      if (Array.isArray(parsed)) {
        return parsed.map(String);
      }
    } catch {
      console.warn('VITE_ALLOWED_REPOS inválido, usando lista padrão.');
    }
  }
  return DEFAULT_ALLOWED_REPOS;
}

export const allowedRepos = getAllowedRepos();

export const knownDescriptions: Record<string, string> = {
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
