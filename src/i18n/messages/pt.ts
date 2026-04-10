import type { HeroFull } from '../types';

export const ptMessages = {
  heroFull: {
    greeting: 'Olá, eu sou Bruno Souza',
    headline: 'Desenvolvo sistemas web escaláveis e experiências digitais de alto impacto.',
    subheadline:
      'Especialista em SaaS, plataformas empresariais e interfaces modernas com foco em performance e conversão.',
    rotating: ['Desenvolvimento', 'Tecnologia', 'Café'],
    prefix: 'Apaixonado por',
    subtitle:
      'Estudante de desenvolvimento apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades',
  } satisfies HeroFull,

  nav: {
    home: 'Início',
    services: 'Serviços',
    about: 'Sobre',
    work: 'Projetos',
    cursos: 'Cursos',
    certificados: 'Certificados',
    stack: 'Skills',
    contact: 'Contato',
  },

  stats: {
    lines: 'Linhas de Código',
    projects: 'Projetos Concluídos',
    coffees: 'Cafés Consumidos',
    hours: 'Horas de Estudo',
  },

  hero: {
    ctaQuote: 'Solicitar orçamento',
    ctaProjects: 'Ver Projetos',
    ctaCoffee: 'Tomar um Café',
    photoAlt: 'Bruno Souza',
  },

  language: {
    switchLabel: 'Idioma do site',
    pt: 'Português (Brasil)',
    en: 'English',
    es: 'Español',
  },

  navbar: {
    ariaMain: 'Navegação principal',
    openMenu: 'Abrir menu',
    menuTitle: 'Menu',
    menuDesc: 'Links de navegação do site.',
    mobileNav: 'Navegação móvel',
  },

  footer: {
    tagline:
      'Estudante de desenvolvimento apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades.',
    linksTitle: 'Links',
    contactTitle: 'Contato',
    country: 'Brasil',
    available: 'Disponível para novos projetos',
    rights: '© 2026 Bruno Souza. Todos os direitos reservados. Feito com',
    andReact: 'e React',
    privacy: 'Privacidade',
    terms: 'Termos',
  },

  services: {
    label: 'Serviços',
    title: 'O que eu entrego',
    subtitle: 'Soluções sob medida para sua empresa, com foco em resultado e manutenção.',
    cta: 'Solicitar orçamento →',
    whatsapp: 'Olá Bruno, tenho interesse no serviço: {title}.',
    items: [
      {
        title: 'Desenvolvimento de SaaS',
        description:
          'Plataformas sob demanda com arquitetura escalável, multi-tenant e métricas de uso.',
        bullets: ['Arquitetura escalável e segura', 'APIs REST e integrações', 'Painéis administrativos'],
      },
      {
        title: 'Sistemas Internos Empresariais',
        description: 'Soluções sob medida para gestão, fluxos de trabalho e automação de processos.',
        bullets: ['Workflows e automação', 'Relatórios e dashboards', 'Integração com ERPs'],
      },
      {
        title: 'Landing Pages de Alta Conversão',
        description: 'Páginas focadas em conversão, performance e experiência do usuário.',
        bullets: ['Design responsivo e acessível', 'SEO e Core Web Vitals', 'Formulários e CTAs otimizados'],
      },
      {
        title: 'Otimização e Performance Web',
        description: 'Análise e melhoria de aplicações existentes: velocidade, bundle e UX.',
        bullets: ['Auditoria de performance', 'Lazy load e code splitting', 'Métricas e monitoramento'],
      },
    ],
  },

  process: {
    label: 'Como eu trabalho',
    title: 'Processo em 4 etapas',
    subtitle: 'Da descoberta ao deploy, com entregáveis claros em cada fase.',
    steps: [
      {
        title: 'Descoberta',
        deliverables: ['Brief e alinhamento de objetivos', 'Análise de concorrência e referências', 'Escopo e cronograma'],
      },
      {
        title: 'Design / Arquitetura',
        deliverables: ['Wireframes e fluxos', 'Arquitetura técnica e stack', 'Backlog priorizado'],
      },
      {
        title: 'Implementação',
        deliverables: ['Desenvolvimento iterativo', 'Code review e boas práticas', 'CI e testes automatizados'],
      },
      {
        title: 'Deploy e Observabilidade',
        deliverables: ['Deploy em produção', 'Monitoramento e métricas', 'Documentação e handoff'],
      },
    ],
  },

  courses: {
    label: 'Formação',
    title: 'Cursos',
    subtitle: 'Trilhas e cursos que compõem a base técnica e continuam em evolução.',
    empty: 'Nenhum curso publicado. Adicione itens ativos no painel administrativo.',
    openLink: 'Abrir link',
  },

  certifications: {
    title: 'Certificações',
    subtitle: 'Cursos e certificações concluídos',
    empty: 'Nenhuma certificação cadastrada no painel ainda.',
    verified: 'Verificado',
    showLess: 'Ver menos ←',
    showAll: 'Ver Todos os Certificados →',
  },

  liveStats: {
    title: 'Estatísticas em Tempo Real',
    subtitle: 'Métricas da minha jornada como desenvolvedor',
  },

  stack: {
    title: 'Skills Interativas',
    subtitle: 'Tecnologias e ferramentas que utilizo nos meus projetos',
    continuousTitle: 'Aprendizado Contínuo',
    continuousBody:
      'Sempre explorando novas tecnologias. Aprimorando habilidades em TypeScript, Next.js e integração com IA para me tornar um desenvolvedor completo.',
    cats: ['Frontend', 'Backend', 'Ferramentas & Estudando'],
    fe: [
      'Estrutura e estilo - responsividade com mobile-first',
      'Tipos, variáveis, funções e manipulação do DOM',
      'Componentes, hooks e aplicações interativas',
      'Utility-first CSS e design systems',
      'Tipagem estática e desenvolvimento type-safe',
      'React com SSR, SSG e rotas dinâmicas',
    ],
    be: [
      'APIs RESTful e desenvolvimento server-side',
      'BaaS com PostgreSQL, Auth e Realtime',
      'Framework web para Node.js',
      'Bancos de dados relacionais',
      'Banco de dados NoSQL',
    ],
    tools: [
      'Controle de versão e workflows colaborativos',
      'Build tool rápido e moderno',
      'Design de interfaces e prototipagem',
      'Auth, Postgres, RLS e Storage no painel do portfólio',
      'Containerização e orquestração',
    ],
  },

  about: {
    scroll: 'Scroll',
    title: 'Sobre Mim',
    bio1:
      'Estudante de desenvolvimento web com conhecimentos em HTML, CSS, JavaScript, React e bancos de dados.',
    bio2:
      'Atualmente cursando e aprimorando minhas habilidades em tecnologias modernas para me tornar um desenvolvedor completo. Desenvolvi o EcoSphere como TCC — uma plataforma de sustentabilidade com IA, gamificação e monitoramento ambiental em tempo real.',
    bio3:
      'Apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades e contribuir com soluções que façam a diferença.',
    photoAlt: 'Bruno Souza - Desenvolvedor',
    caption: 'Bruno Souza - Desenvolvedor Front End',
    values: [
      { title: 'Performance', description: 'Otimização constante para experiências rápidas e fluidas' },
      { title: 'Código Limpo', description: 'Manutenibilidade e escalabilidade como prioridade' },
      { title: 'UX/UI Híbrido', description: 'Visão completa do produto, do design ao código' },
      { title: 'Full Stack', description: 'Domínio completo desde o front-end até bancos de dados' },
    ],
    trajectory: 'Trajetória',
    timeline: [
      {
        year: '2026 - Presente',
        title: 'Desenvolvedor Web / Design',
        company: 'Gênesis Empreendimentos',
        description: 'Desenvolvimento de landing pages e aplicações internas',
      },
      {
        year: '2023 - 2026',
        title: 'Suporte Técnico Especializado nos Sistemas',
        company: 'Alterdata Software',
        description: 'Suporte especializado nos sistemas da Alterdata',
      },
      {
        year: '2023 - 2026',
        title: 'Graduação em Ciência da Computação',
        company: 'Unifeso - Universidade Serra dos Órgãos',
        description: 'Formação em análise de sistemas e programação',
      },
      {
        year: '2022 - 2026',
        title: 'Estudante de Desenvolvimento Web',
        company: 'Cursos Alura e estudos autônomos',
        description: 'Aprimorando habilidades em HTML, CSS, JavaScript, React e bancos de dados',
      },
    ],
  },

  projects: {
    label: 'Projetos',
    title: 'Projetos em destaque',
    subtitle: 'Problema, solução técnica, stack e resultado de cada projeto.',
    loadError: 'Não foi possível carregar os projetos.',
    warning: 'Aviso',
    showAll: 'Ver todos os projetos',
    empty: 'Nada por aqui, por enquanto.',
    githubCta: 'Ver repositórios no GitHub',
  },

  contact: {
    title: 'Vamos trabalhar juntos?',
    subtitle:
      'Estou sempre disponível para novos desafios e oportunidades. Vamos criar algo incrível!',
    name: 'Nome',
    email: 'Email',
    message: 'Mensagem',
    phName: 'Seu nome',
    phEmail: 'seu@email.com',
    phMessage: 'Conte-me sobre seu projeto...',
    send: 'Enviar Mensagem',
    sending: 'Enviando...',
    successTitle: 'Mensagem enviada!',
    successBody: 'Obrigado pelo contato. Responderei em breve.',
    sendAnother: 'Enviar outra mensagem',
    chatTitle: 'Vamos conversar!',
    chatBody:
      'Estou sempre interessado em ouvir sobre novos projetos, ideias criativas ou oportunidades de fazer parte de projetos incríveis.',
    availableProjects: 'Disponível para novos projetos',
    respond24: 'Respondo em até 24 horas',
    schedule: 'Agendar reunião',
    connect: 'Conecte-se comigo',
    whatsappSchedule: 'Olá! Gostaria de agendar uma reunião.',
    errNameRequired: 'Informe seu nome',
    errNameShort: 'Nome deve ter pelo menos 2 caracteres',
    errEmailRequired: 'Informe seu e-mail',
    errEmailInvalid: 'E-mail inválido',
    errMessageRequired: 'Escreva sua mensagem',
    errMessageShort: 'Mensagem deve ter pelo menos 10 caracteres',
    toastSavedWarn: 'Mensagem salva. O aviso por e-mail pode não ter sido enviado.',
    toastSuccess: 'Mensagem enviada! Responderei em breve.',
    toastConnection: 'Falha na conexão. Verifique sua internet e tente novamente.',
    errConnection: 'Falha na conexão.',
  },

  ctaFinal: {
    title: 'Vamos transformar sua ideia em um sistema profissional e escalável.',
    subtitle: 'Conte com desenvolvimento focado em performance, prazos e qualidade.',
    quote: 'Solicitar orçamento',
    schedule: 'Agendar reunião',
  },

  portfolio: {
    loading: 'Carregando...',
    scrollTop: 'Voltar ao topo da página',
    scrollTopTitle: 'Voltar ao topo',
  },

  preloader: {
    line1: 'Olá, seja bem-vindo ao meu...',
    line2: 'Portfólio',
    phrases: ['Carregando meus conhecimentos...', 'Colocando o café na cafeteira...', 'Quase lá...'],
  },

  floatingWhatsapp: {
    aria: 'Abrir conversa no WhatsApp',
  },

  calendly: {
    iframeTitle: 'Agendar reunião - Calendly',
  },

  tcc: {
    kicker: 'TCC — Trabalho de conclusão de curso',
    subtitle: 'Sistema de Monitoramento Ambiental',
    lead:
      'Plataforma inovadora que integra IoT, Machine Learning e análise de dados em tempo real para monitoramento e preservação ambiental.',
    cta: 'Ver Projeto Completo →',
    globeLoading: 'Carregando...',
    features: [
      {
        title: 'IoT Sensors',
        description: 'Sensores inteligentes para coleta de dados ambientais',
      },
      {
        title: 'Machine Learning',
        description: 'Algoritmos preditivos para análise ambiental',
      },
      {
        title: 'Dashboard Real-time',
        description: 'Visualização de dados em tempo real',
      },
      {
        title: 'Classificação de Resíduos com IA',
        description: 'TensorFlow.js + Google Teachable Machine para categorização automática',
      },
    ],
  },

  caseModal: {
    problem: 'Problema',
    solution: 'Solução técnica',
    stack: 'Stack utilizada',
    result: 'Resultado / Impacto',
    demo: 'Ver demo',
    github: 'Código no GitHub',
  },
} as const;

export type MessageBundle = typeof ptMessages;
