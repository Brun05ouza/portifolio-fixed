import type { HeroFull } from '../types';
import type { MessageBundle } from './pt';

export const enMessages = {
  heroFull: {
    greeting: "Hi, I'm Bruno Souza",
    headline: 'I build scalable web systems and high-impact digital experiences.',
    subheadline:
      'Specialized in SaaS, enterprise platforms, and modern interfaces focused on performance and conversion.',
    rotating: ['Development', 'Technology', 'Coffee'],
    prefix: 'Passionate about',
    subtitle:
      'Development student passionate about technology, learning and building projects to grow my skills',
  } satisfies HeroFull,

  nav: {
    home: 'Home',
    services: 'Services',
    about: 'About',
    work: 'Projects',
    cursos: 'Courses',
    certificados: 'Certificates',
    stack: 'Skills',
    contact: 'Contact',
  },

  stats: {
    lines: 'Lines of Code',
    projects: 'Completed Projects',
    coffees: 'Coffees Enjoyed',
    hours: 'Study Hours',
  },

  hero: {
    ctaQuote: 'Request a quote',
    ctaProjects: 'View projects',
    ctaCoffee: 'Buy me a coffee',
    photoAlt: 'Bruno Souza',
  },

  language: {
    switchLabel: 'Site language',
    pt: 'Portuguese (Brazil)',
    en: 'English',
    es: 'Spanish',
  },

  navbar: {
    ariaMain: 'Main navigation',
    openMenu: 'Open menu',
    menuTitle: 'Menu',
    menuDesc: 'Site navigation links.',
    mobileNav: 'Mobile navigation',
  },

  footer: {
    tagline:
      'Development student passionate about technology, learning and building projects to grow my skills.',
    linksTitle: 'Links',
    contactTitle: 'Contact',
    country: 'Brazil',
    available: 'Available for new projects',
    rights: '© 2026 Bruno Souza. All rights reserved. Made with',
    andReact: 'and React',
    privacy: 'Privacy',
    terms: 'Terms',
  },

  services: {
    label: 'Services',
    title: 'What I deliver',
    subtitle: 'Tailored solutions for your business, focused on outcomes and maintainability.',
    cta: 'Request a quote →',
    whatsapp: "Hi Bruno, I'm interested in the service: {title}.",
    items: [
      {
        title: 'SaaS development',
        description: 'On-demand platforms with scalable architecture, multi-tenancy, and usage metrics.',
        bullets: ['Scalable, secure architecture', 'REST APIs and integrations', 'Admin dashboards'],
      },
      {
        title: 'Internal enterprise systems',
        description: 'Custom solutions for management, workflows, and process automation.',
        bullets: ['Workflows and automation', 'Reports and dashboards', 'ERP integration'],
      },
      {
        title: 'High-conversion landing pages',
        description: 'Pages focused on conversion, performance, and user experience.',
        bullets: ['Responsive, accessible design', 'SEO and Core Web Vitals', 'Optimized forms and CTAs'],
      },
      {
        title: 'Web performance optimization',
        description: 'Analysis and improvement of existing apps: speed, bundle, and UX.',
        bullets: ['Performance audits', 'Lazy load and code splitting', 'Metrics and monitoring'],
      },
    ],
  },

  process: {
    label: 'How I work',
    title: 'A 4-step process',
    subtitle: 'From discovery to deploy, with clear deliverables in every phase.',
    steps: [
      {
        title: 'Discovery',
        deliverables: ['Brief and goals alignment', 'Competitive analysis and references', 'Scope and timeline'],
      },
      {
        title: 'Design / Architecture',
        deliverables: ['Wireframes and flows', 'Technical architecture and stack', 'Prioritized backlog'],
      },
      {
        title: 'Implementation',
        deliverables: ['Iterative development', 'Code review and best practices', 'CI and automated tests'],
      },
      {
        title: 'Deploy and observability',
        deliverables: ['Production deploy', 'Monitoring and metrics', 'Documentation and handoff'],
      },
    ],
  },

  courses: {
    label: 'Education',
    title: 'Courses',
    subtitle: 'Tracks and courses that form my technical foundation and keep evolving.',
    empty: 'No published courses yet. Add active items in the admin panel.',
    openLink: 'Open link',
  },

  certifications: {
    title: 'Certifications',
    subtitle: 'Completed courses and certifications',
    empty: 'No certifications in the panel yet.',
    verified: 'Verified',
    showLess: 'Show less ←',
    showAll: 'View all certificates →',
  },

  liveStats: {
    title: 'Live statistics',
    subtitle: 'Metrics from my journey as a developer',
  },

  stack: {
    title: 'Interactive skills',
    subtitle: 'Technologies and tools I use in my projects',
    continuousTitle: 'Continuous learning',
    continuousBody:
      'Always exploring new technologies. Leveling up in TypeScript, Next.js, and AI integration to become a well-rounded developer.',
    cats: ['Frontend', 'Backend', 'Tools & learning'],
    fe: [
      'Structure and styling — mobile-first responsiveness',
      'Types, variables, functions, and DOM manipulation',
      'Components, hooks, and interactive apps',
      'Utility-first CSS and design systems',
      'Static typing and type-safe development',
      'React with SSR, SSG, and dynamic routes',
    ],
    be: [
      'RESTful APIs and server-side development',
      'BaaS with PostgreSQL, Auth, and Realtime',
      'Web framework for Node.js',
      'Relational databases',
      'NoSQL database',
    ],
    tools: [
      'Version control and collaborative workflows',
      'Fast, modern build tool',
      'Interface design and prototyping',
      'Auth, Postgres, RLS, and Storage in the portfolio admin',
      'Containerization and orchestration',
    ],
  },

  about: {
    scroll: 'Scroll',
    title: 'About me',
    bio1: 'Web development student with skills in HTML, CSS, JavaScript, React, and databases.',
    bio2:
      "Currently studying and improving my skills in modern technologies. I built EcoSphere as my capstone — a sustainability platform with AI, gamification, and real-time environmental monitoring.",
    bio3:
      'Passionate about technology, learning, and building projects to grow my skills and deliver solutions that matter.',
    photoAlt: 'Bruno Souza — Developer',
    caption: 'Bruno Souza — Front-end developer',
    values: [
      { title: 'Performance', description: 'Constant optimization for fast, smooth experiences' },
      { title: 'Clean code', description: 'Maintainability and scalability as priorities' },
      { title: 'Hybrid UX/UI', description: 'Full product view from design to code' },
      { title: 'Full stack', description: 'End-to-end skills from front-end to databases' },
    ],
    trajectory: 'Journey',
    timeline: [
      {
        year: '2026 - Present',
        title: 'Web developer / Design',
        company: 'Gênesis Empreendimentos',
        description: 'Landing pages and internal applications',
      },
      {
        year: '2023 - 2026',
        title: 'Specialized technical support',
        company: 'Alterdata Software',
        description: 'Specialized support for Alterdata systems',
      },
      {
        year: '2023 - 2026',
        title: 'B.Sc. Computer Science',
        company: 'Unifeso - Universidade Serra dos Órgãos',
        description: 'Systems analysis and programming',
      },
      {
        year: '2022 - 2026',
        title: 'Web development student',
        company: 'Alura courses and self-study',
        description: 'HTML, CSS, JavaScript, React, and databases',
      },
    ],
  },

  projects: {
    label: 'Projects',
    title: 'Featured projects',
    subtitle: 'Problem, technical solution, stack, and outcome for each project.',
    loadError: 'Could not load projects.',
    warning: 'Notice',
    showAll: 'View all projects',
    empty: 'Nothing here yet.',
    githubCta: 'View repositories on GitHub',
  },

  contact: {
    title: "Let's work together?",
    subtitle: "I'm always open to new challenges and opportunities. Let's build something great!",
    name: 'Name',
    email: 'Email',
    message: 'Message',
    phName: 'Your name',
    phEmail: 'you@email.com',
    phMessage: 'Tell me about your project...',
    send: 'Send message',
    sending: 'Sending...',
    successTitle: 'Message sent!',
    successBody: 'Thanks for reaching out. I will reply soon.',
    sendAnother: 'Send another message',
    chatTitle: "Let's talk!",
    chatBody:
      "I'm always interested in hearing about new projects, creative ideas, or opportunities to join great work.",
    availableProjects: 'Available for new projects',
    respond24: 'I reply within 24 hours',
    schedule: 'Schedule a meeting',
    connect: 'Connect with me',
    whatsappSchedule: 'Hi! I would like to schedule a meeting.',
    errNameRequired: 'Please enter your name',
    errNameShort: 'Name must be at least 2 characters',
    errEmailRequired: 'Please enter your email',
    errEmailInvalid: 'Invalid email',
    errMessageRequired: 'Please write your message',
    errMessageShort: 'Message must be at least 10 characters',
    toastSavedWarn: 'Message saved. The email notification may not have been sent.',
    toastSuccess: 'Message sent! I will reply soon.',
    toastConnection: 'Connection failed. Check your internet and try again.',
    errConnection: 'Connection failed.',
  },

  ctaFinal: {
    title: "Let's turn your idea into a professional, scalable system.",
    subtitle: 'Development focused on performance, deadlines, and quality.',
    quote: 'Request a quote',
    schedule: 'Schedule a meeting',
  },

  portfolio: {
    loading: 'Loading...',
    scrollTop: 'Back to top',
    scrollTopTitle: 'Back to top',
  },

  preloader: {
    line1: 'Hi, welcome to my...',
    line2: 'Portfolio',
    phrases: ['Loading my skills...', 'Brewing the coffee...', 'Almost there...'],
  },

  floatingWhatsapp: {
    aria: 'Open WhatsApp chat',
  },

  calendly: {
    iframeTitle: 'Schedule a meeting - Calendly',
  },

  tcc: {
    kicker: 'Capstone project',
    subtitle: 'Environmental monitoring system',
    lead:
      'An innovative platform combining IoT, machine learning, and real-time data analysis for environmental monitoring and preservation.',
    cta: 'View full project →',
    globeLoading: 'Loading...',
    features: [
      { title: 'IoT sensors', description: 'Smart sensors for environmental data collection' },
      { title: 'Machine learning', description: 'Predictive algorithms for environmental analysis' },
      { title: 'Real-time dashboard', description: 'Live data visualization' },
      {
        title: 'AI waste classification',
        description: 'TensorFlow.js + Google Teachable Machine for automatic categorization',
      },
    ],
  },

  caseModal: {
    problem: 'Problem',
    solution: 'Technical solution',
    stack: 'Stack used',
    result: 'Outcome / impact',
    demo: 'View demo',
    github: 'Code on GitHub',
  },
} as const satisfies MessageBundle;
