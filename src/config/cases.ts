/**
 * Detalhes de cases (problema, solução, resultado) por repositório.
 * Chave = repoName (ex: nexus-flow-web). Substitua pelos dados reais quando tiver.
 */

const DEFAULT_RESULT =
  'Melhoria significativa na experiência e estrutura técnica do projeto.';

export interface CaseDetails {
  problem: string;
  solution: string;
  result: string;
}

/** Mapeamento opcional por nome do repositório. */
export const caseDetailsByRepo: Record<string, CaseDetails> = {
  'residencial-nature': {
    problem: 'Presença digital profissional para o empreendimento residencial Nature.',
    solution: 'Site institucional responsivo com foco em conversão e experiência do usuário.',
    result: 'Site no ar em https://residencialnature.com.br/ com identidade visual e informações do empreendimento.',
  },
  'nexus-flow-web': {
    problem: 'Necessidade de um sistema web centralizado para gestão de fluxos.',
    solution: 'Arquitetura modular com React, APIs REST e autenticação.',
    result: DEFAULT_RESULT,
  },
  promopc: {
    problem: 'Plataforma de promoções exigia alta disponibilidade e clareza para o usuário.',
    solution: 'Front-end responsivo e backend escalável com cache.',
    result: DEFAULT_RESULT,
  },
  'blog-pessoal': {
    problem: 'Compartilhar artigos e projetos de forma organizada.',
    solution: 'Blog estático com MDX, SEO e performance otimizada.',
    result: DEFAULT_RESULT,
  },
  'gestor-pro': {
    problem: 'Sistema de gestão profissional com múltiplos módulos.',
    solution: 'Stack full stack com banco de dados e painel administrativo.',
    result: DEFAULT_RESULT,
  },
  lux: {
    problem: 'E-commerce de moda masculina com boa experiência de compra.',
    solution: 'Loja virtual com carrinho, filtros e integração de pagamento.',
    result: DEFAULT_RESULT,
  },
  'e-commerce': {
    problem: 'Loja virtual com carrinho e gestão de pedidos.',
    solution: 'E-commerce com React, carrinho persistente e checkout.',
    result: DEFAULT_RESULT,
  },
};

export function getCaseDetails(repoName: string | undefined): CaseDetails {
  if (!repoName) {
    return {
      problem: 'Projeto desenvolvido para aplicação prática de tecnologias e boas práticas.',
      solution: 'Desenvolvimento com foco em arquitetura, performance e manutenibilidade.',
      result: DEFAULT_RESULT,
    };
  }
  const key = repoName.toLowerCase();
  return (
    caseDetailsByRepo[key] ?? {
      problem: 'Desafio técnico ou de negócio abordado no projeto.',
      solution: `Solução implementada com as tecnologias do projeto (ver stack).`,
      result: DEFAULT_RESULT,
    }
  );
}
