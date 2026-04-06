/**
 * Exemplos para popular o Supabase manualmente (SQL ou Table Editor).
 * Tabelas: projects, certificates, courses.
 * Ajuste `active`, `order` e imagens conforme necessário.
 */

import type { CertificateDoc, CourseDoc, ProjectDoc } from '../types/portfolio';

/** Projeto equivalente ao antigo FEATURED_PROJECT (Residencial Nature). */
export const EXAMPLE_PROJECT_NATURE: ProjectDoc = {
  title: 'Residencial Nature',
  description:
    'Site institucional do empreendimento residencial Nature — presença digital e experiência do usuário.',
  imageUrl: '/nature-preview.jpeg',
  tags: ['React', 'TypeScript', 'Responsivo'],
  role: 'Front-end',
  demoLink: 'https://residencialnature.com.br/',
  githubLink: 'https://residencialnature.com.br/',
  hideGithubLink: true,
  hideImageOverlay: true,
  caseProblem: 'Presença digital profissional para o empreendimento residencial Nature.',
  caseSolution: 'Site institucional responsivo com foco em conversão e experiência do usuário.',
  caseResult:
    'Site no ar em https://residencialnature.com.br/ com identidade visual e informações do empreendimento.',
  active: true,
  order: 0,
  repoName: 'residencial-nature',
};

/** Lista espelhando os certificados que estavam hardcoded em Certifications.tsx (trecho inicial). */
export const EXAMPLE_CERTIFICATES: CertificateDoc[] = [
  {
    title: 'JavaScript: utilizando tipos, variáveis e funções',
    provider: 'Alura',
    iconId: 'javascript',
    color: '#F7DF1E',
    year: '2024/2025',
    imageUrl: '',
    active: true,
    order: 0,
  },
  {
    title: 'React Basics',
    provider: 'Alura',
    iconId: 'react',
    color: '#61DAFB',
    year: '2024/2025',
    imageUrl: '',
    active: true,
    order: 1,
  },
  {
    title: 'HTML e CSS: responsividade com mobile-first',
    provider: 'Alura',
    iconId: 'html5',
    color: '#E34F26',
    year: '2024/2025',
    imageUrl: '',
    active: true,
    order: 2,
  },
  {
    title: 'HTML e CSS: praticando HTML/CSS',
    provider: 'Alura',
    iconId: 'css3',
    color: '#1572B6',
    year: '2024/2025',
    imageUrl: '',
    active: true,
    order: 3,
  },
];

/** Curso de exemplo para a seção Cursos. */
export const EXAMPLE_COURSE: CourseDoc = {
  title: 'Exemplo de curso',
  description: 'Substitua por um curso real no painel admin.',
  provider: 'Alura',
  url: 'https://www.alura.com.br',
  imageUrl: '',
  active: true,
  order: 0,
};
