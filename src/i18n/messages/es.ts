import type { HeroFull } from '../types';
import type { MessageBundle } from './pt';

export const esMessages = {
  heroFull: {
    greeting: 'Hola, soy Bruno Souza',
    headline: 'Desarrollo sistemas web escalables y experiencias digitales de alto impacto.',
    subheadline:
      'Especialista en SaaS, plataformas empresariales e interfaces modernas enfocadas en rendimiento y conversión.',
    rotating: ['Desarrollo', 'Tecnología', 'Café'],
    prefix: 'Apasionado por',
    subtitle:
      'Estudiante de desarrollo apasionado por la tecnología, aprendiendo y creando proyectos para mejorar mis habilidades',
  } satisfies HeroFull,

  nav: {
    home: 'Inicio',
    services: 'Servicios',
    about: 'Sobre mí',
    work: 'Proyectos',
    cursos: 'Cursos',
    certificados: 'Certificados',
    stack: 'Skills',
    contact: 'Contacto',
  },

  stats: {
    lines: 'Líneas de código',
    projects: 'Proyectos completados',
    coffees: 'Cafés tomados',
    hours: 'Horas de estudio',
  },

  hero: {
    ctaQuote: 'Solicitar presupuesto',
    ctaProjects: 'Ver proyectos',
    ctaCoffee: 'Invitarme un café',
    photoAlt: 'Bruno Souza',
  },

  language: {
    switchLabel: 'Idioma del sitio',
    pt: 'Portugués (Brasil)',
    en: 'Inglés',
    es: 'Español',
  },

  navbar: {
    ariaMain: 'Navegación principal',
    openMenu: 'Abrir menú',
    menuTitle: 'Menú',
    menuDesc: 'Enlaces de navegación del sitio.',
    mobileNav: 'Navegación móvil',
  },

  footer: {
    tagline:
      'Estudiante de desarrollo apasionado por la tecnología, aprendiendo y creando proyectos para mejorar mis habilidades.',
    linksTitle: 'Enlaces',
    contactTitle: 'Contacto',
    country: 'Brasil',
    available: 'Disponible para nuevos proyectos',
    rights: '© 2026 Bruno Souza. Todos los derechos reservados. Hecho con',
    andReact: 'y React',
    privacy: 'Privacidad',
    terms: 'Términos',
  },

  services: {
    label: 'Servicios',
    title: 'Lo que entrego',
    subtitle: 'Soluciones a medida para tu empresa, con foco en resultados y mantenimiento.',
    cta: 'Solicitar presupuesto →',
    whatsapp: 'Hola Bruno, me interesa el servicio: {title}.',
    items: [
      {
        title: 'Desarrollo de SaaS',
        description: 'Plataformas bajo demanda con arquitectura escalable, multi-tenant y métricas de uso.',
        bullets: ['Arquitectura escalable y segura', 'APIs REST e integraciones', 'Paneles administrativos'],
      },
      {
        title: 'Sistemas internos empresariales',
        description: 'Soluciones a medida para gestión, flujos de trabajo y automatización.',
        bullets: ['Flujos y automatización', 'Informes y dashboards', 'Integración con ERPs'],
      },
      {
        title: 'Landing pages de alta conversión',
        description: 'Páginas enfocadas en conversión, rendimiento y experiencia de usuario.',
        bullets: ['Diseño responsive y accesible', 'SEO y Core Web Vitals', 'Formularios y CTAs optimizados'],
      },
      {
        title: 'Optimización y rendimiento web',
        description: 'Análisis y mejora de aplicaciones existentes: velocidad, bundle y UX.',
        bullets: ['Auditoría de rendimiento', 'Lazy load y code splitting', 'Métricas y monitoreo'],
      },
    ],
  },

  process: {
    label: 'Cómo trabajo',
    title: 'Proceso en 4 pasos',
    subtitle: 'Del descubrimiento al deploy, con entregables claros en cada fase.',
    steps: [
      {
        title: 'Descubrimiento',
        deliverables: ['Brief y alineación de objetivos', 'Análisis de competencia y referencias', 'Alcance y cronograma'],
      },
      {
        title: 'Diseño / Arquitectura',
        deliverables: ['Wireframes y flujos', 'Arquitectura técnica y stack', 'Backlog priorizado'],
      },
      {
        title: 'Implementación',
        deliverables: ['Desarrollo iterativo', 'Code review y buenas prácticas', 'CI y pruebas automatizadas'],
      },
      {
        title: 'Deploy y observabilidad',
        deliverables: ['Deploy en producción', 'Monitoreo y métricas', 'Documentación y handoff'],
      },
    ],
  },

  courses: {
    label: 'Formación',
    title: 'Cursos',
    subtitle: 'Trilhas y cursos que forman mi base técnica y siguen evolucionando.',
    empty: 'No hay cursos publicados. Añade ítems activos en el panel administrativo.',
    openLink: 'Abrir enlace',
  },

  certifications: {
    title: 'Certificaciones',
    subtitle: 'Cursos y certificaciones completados',
    empty: 'Aún no hay certificaciones en el panel.',
    verified: 'Verificado',
    showLess: 'Ver menos ←',
    showAll: 'Ver todos los certificados →',
  },

  liveStats: {
    title: 'Estadísticas en tiempo real',
    subtitle: 'Métricas de mi trayectoria como desarrollador',
  },

  stack: {
    title: 'Skills interactivas',
    subtitle: 'Tecnologías y herramientas que uso en mis proyectos',
    continuousTitle: 'Aprendizaje continuo',
    continuousBody:
      'Siempre explorando nuevas tecnologías. Mejorando en TypeScript, Next.js e integración con IA para ser un desarrollador completo.',
    cats: ['Frontend', 'Backend', 'Herramientas y estudio'],
    fe: [
      'Estructura y estilo — responsive mobile-first',
      'Tipos, variables, funciones y manipulación del DOM',
      'Componentes, hooks y apps interactivas',
      'CSS utility-first y design systems',
      'Tipado estático y desarrollo type-safe',
      'React con SSR, SSG y rutas dinámicas',
    ],
    be: [
      'APIs RESTful y desarrollo server-side',
      'BaaS con PostgreSQL, Auth y Realtime',
      'Framework web para Node.js',
      'Bases de datos relacionales',
      'Base de datos NoSQL',
    ],
    tools: [
      'Control de versiones y flujos colaborativos',
      'Build tool rápido y moderno',
      'Diseño de interfaces y prototipado',
      'Auth, Postgres, RLS y Storage en el panel del portafolio',
      'Containerización y orquestación',
    ],
  },

  about: {
    scroll: 'Scroll',
    title: 'Sobre mí',
    bio1: 'Estudiante de desarrollo web con conocimientos en HTML, CSS, JavaScript, React y bases de datos.',
    bio2:
      'Actualmente cursando y mejorando mis habilidades en tecnologías modernas. Desarrollé EcoSphere como TFG — una plataforma de sostenibilidad con IA, gamificación y monitoreo ambiental en tiempo real.',
    bio3:
      'Apasionado por la tecnología, aprendiendo y creando proyectos para evolucionar mis habilidades y aportar soluciones que marquen la diferencia.',
    photoAlt: 'Bruno Souza — Desarrollador',
    caption: 'Bruno Souza — Desarrollador Front End',
    values: [
      { title: 'Rendimiento', description: 'Optimización constante para experiencias rápidas y fluidas' },
      { title: 'Código limpio', description: 'Mantenibilidad y escalabilidad como prioridad' },
      { title: 'UX/UI híbrido', description: 'Visión completa del producto, del diseño al código' },
      { title: 'Full stack', description: 'Dominio desde front-end hasta bases de datos' },
    ],
    trajectory: 'Trayectoria',
    timeline: [
      {
        year: '2026 - Presente',
        title: 'Desarrollador web / Diseño',
        company: 'Gênesis Empreendimentos',
        description: 'Landing pages y aplicaciones internas',
      },
      {
        year: '2023 - 2026',
        title: 'Soporte técnico especializado',
        company: 'Alterdata Software',
        description: 'Soporte especializado en los sistemas Alterdata',
      },
      {
        year: '2023 - 2026',
        title: 'Grado en Ciencias de la Computación',
        company: 'Unifeso - Universidade Serra dos Órgãos',
        description: 'Formación en análisis de sistemas y programación',
      },
      {
        year: '2022 - 2026',
        title: 'Estudiante de desarrollo web',
        company: 'Cursos Alura y estudio autónomo',
        description: 'HTML, CSS, JavaScript, React y bases de datos',
      },
    ],
  },

  projects: {
    label: 'Proyectos',
    title: 'Proyectos destacados',
    subtitle: 'Problema, solución técnica, stack y resultado de cada proyecto.',
    loadError: 'No se pudieron cargar los proyectos.',
    warning: 'Aviso',
    showAll: 'Ver todos los proyectos',
    empty: 'Nada por aquí, por ahora.',
    githubCta: 'Ver repositorios en GitHub',
  },

  contact: {
    title: '¿Trabajamos juntos?',
    subtitle: 'Siempre disponible para nuevos retos y oportunidades. ¡Creemos algo increíble!',
    name: 'Nombre',
    email: 'Correo',
    message: 'Mensaje',
    phName: 'Tu nombre',
    phEmail: 'tu@email.com',
    phMessage: 'Cuéntame sobre tu proyecto...',
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    successTitle: '¡Mensaje enviado!',
    successBody: 'Gracias por contactar. Responderé pronto.',
    sendAnother: 'Enviar otro mensaje',
    chatTitle: '¡Hablemos!',
    chatBody:
      'Siempre interesado en nuevos proyectos, ideas creativas u oportunidades de formar parte de proyectos increíbles.',
    availableProjects: 'Disponible para nuevos proyectos',
    respond24: 'Respondo en hasta 24 horas',
    schedule: 'Agendar reunión',
    connect: 'Conéctate conmigo',
    whatsappSchedule: '¡Hola! Me gustaría agendar una reunión.',
    errNameRequired: 'Indica tu nombre',
    errNameShort: 'El nombre debe tener al menos 2 caracteres',
    errEmailRequired: 'Indica tu correo',
    errEmailInvalid: 'Correo inválido',
    errMessageRequired: 'Escribe tu mensaje',
    errMessageShort: 'El mensaje debe tener al menos 10 caracteres',
    toastSavedWarn: 'Mensaje guardado. Es posible que el aviso por correo no se haya enviado.',
    toastSuccess: '¡Mensaje enviado! Responderé pronto.',
    toastConnection: 'Fallo de conexión. Comprueba tu internet e inténtalo de nuevo.',
    errConnection: 'Fallo de conexión.',
  },

  ctaFinal: {
    title: 'Convirtamos tu idea en un sistema profesional y escalable.',
    subtitle: 'Desarrollo enfocado en rendimiento, plazos y calidad.',
    quote: 'Solicitar presupuesto',
    schedule: 'Agendar reunión',
  },

  portfolio: {
    loading: 'Cargando...',
    scrollTop: 'Volver arriba',
    scrollTopTitle: 'Volver arriba',
  },

  preloader: {
    line1: 'Hola, bienvenido a mi...',
    line2: 'Portafolio',
    phrases: ['Cargando mis conocimientos...', 'Poniendo el café...', 'Casi listo...'],
  },

  floatingWhatsapp: {
    aria: 'Abrir chat de WhatsApp',
  },

  calendly: {
    iframeTitle: 'Agendar reunión - Calendly',
  },

  tcc: {
    kicker: 'TCC — Trabajo de fin de curso',
    subtitle: 'Sistema de monitoreo ambiental',
    lead:
      'Plataforma innovadora que integra IoT, Machine Learning y análisis de datos en tiempo real para monitoreo y preservación ambiental.',
    cta: 'Ver proyecto completo →',
    globeLoading: 'Cargando...',
    features: [
      { title: 'Sensores IoT', description: 'Sensores inteligentes para datos ambientales' },
      { title: 'Machine Learning', description: 'Algoritmos predictivos para análisis ambiental' },
      { title: 'Dashboard en tiempo real', description: 'Visualización de datos en vivo' },
      {
        title: 'Clasificación de residuos con IA',
        description: 'TensorFlow.js + Google Teachable Machine para categorización automática',
      },
    ],
  },

  caseModal: {
    problem: 'Problema',
    solution: 'Solución técnica',
    stack: 'Stack utilizada',
    result: 'Resultado / impacto',
    demo: 'Ver demo',
    github: 'Código en GitHub',
  },
} as const satisfies MessageBundle;
