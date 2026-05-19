import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'motion/react';
import Lenis from 'lenis';
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { siteConfig } from '../../config/content';
import { listCoursesPublic, listProjectsPublic } from '../../services/portfolioDb';
import type { CourseWithId, ProjectWithId } from '../../types/portfolio';
import { openWhatsApp } from '../../utils/whatsapp';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { Toaster } from './ui/sonner';
import './DevsyncPortfolio.css';

const socials = [
  { label: 'LinkedIn', href: siteConfig.linkedinUrl, icon: Linkedin },
  { label: 'GitHub', href: siteConfig.githubUrl, icon: Github },
  { label: 'E-mail', href: `mailto:${siteConfig.contactEmail}`, icon: Mail },
];

const skillGroups = [
  {
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'APIs REST', 'PostgreSQL', 'Neon'],
  },
  {
    title: 'Ferramentas',
    items: ['Git', 'GitHub', 'Vite', 'Figma', 'Docker', 'Deploy'],
  },
];

const services = [
  {
    number: '01',
    title: 'Desenvolvimento Web Sob Medida',
    description:
      'Aplicacoes web completas, do front-end ao backend, otimizadas para velocidade, seguranca e escalabilidade.',
  },
  {
    number: '02',
    title: 'Engenharia Frontend',
    description:
      'Interfaces responsivas, acessiveis e bem animadas, com foco em usabilidade e performance real.',
  },
  {
    number: '03',
    title: 'APIs e Logica de Servidor',
    description:
      'APIs, integracoes e banco de dados estruturados para sustentar produtos que crescem.',
  },
  {
    number: '04',
    title: 'Landing Pages',
    description:
      'Paginas de conversao com direcao visual, copy objetiva e carregamento rapido.',
  },
];

const stats = [
  { value: 3, suffix: '+', label: 'Anos aprendendo e construindo' },
  { value: 29, suffix: '+', label: 'Projetos concluidos' },
  { value: 43, suffix: 'k+', label: 'Linhas de codigo' },
];

const clients = ['Neon', 'React', 'Vite', 'GitHub', 'Supabase', 'Figma', 'TypeScript', 'Node'];

const processSteps = [
  {
    number: '01',
    title: 'Planejar e Arquitetar',
    text: 'Antes de escrever codigo, entendo objetivos, necessidades do usuario e limites tecnicos do projeto.',
  },
  {
    number: '02',
    title: 'Construir e Desenvolver',
    text: 'Crio interfaces bem acabadas e sistemas robustos em paralelo, mantendo UI, API e dados organizados.',
  },
  {
    number: '03',
    title: 'Lancar e Sustentar',
    text: 'Depois da entrega, acompanho ajustes, performance e melhorias para manter o produto evoluindo.',
  },
];

function RollingText({ children }: { children: string }) {
  return (
    <span className="dv-roll" aria-label={children}>
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

function SectionKicker({ children }: { children: string }) {
  return (
    <motion.p
      className="dv-kicker"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.p>
  );
}

function AnimatedName() {
  const words = ['Bruno', 'Souza'];
  return (
    <h1 className="dv-animated-name" aria-label="Bruno Souza">
      {words.map((word, wordIndex) => (
        <span className="dv-name-word" key={word}>
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={`${word}-${letterIndex}`}
              aria-hidden
              initial={{ opacity: 0, y: 80, rotateX: -70 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.25 + wordIndex * 0.18 + letterIndex * 0.045,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const duration = 1300;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <strong>
        {display}
        {suffix}
      </strong>
      <span>{label}</span>
    </motion.div>
  );
}

function CursorDot() {
  const [position, setPosition] = useState({ x: -80, y: -80 });

  useEffect(() => {
    const onPointerMove = (event: globalThis.PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('pointermove', onPointerMove);
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, []);

  return (
    <motion.span
      className="dv-cursor-dot"
      aria-hidden
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 520, damping: 38, mass: 0.45 }}
    />
  );
}

function CodeDivider() {
  return (
    <div className="dv-code-divider" aria-hidden>
      <span>&lt;/</span>
      <i />
      <span>&gt;</span>
    </div>
  );
}

function getProjectHref(project: ProjectWithId): string {
  return project.demoLink || project.githubLink || siteConfig.githubUrl;
}

function RotatingDeck({ projects }: { projects: ProjectWithId[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const trackX = useTransform(scrollYProgress, [0, 1], ['42vw', '-112vw']);
  const deckRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 0, 4]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-24%']);

  return (
    <section ref={sectionRef} className="dv-deck-stage" aria-label="Destaques visuais do portfolio">
      <div className="dv-deck-sticky">
        <motion.div className="dv-name-marquee" style={{ x: marqueeX }} aria-hidden>
          <span>MEUS PROJETOS * MEUS PROJETOS * MEUS PROJETOS *</span>
          <span>MEUS PROJETOS * MEUS PROJETOS * MEUS PROJETOS *</span>
        </motion.div>
        <motion.div className="dv-floating-deck" style={{ x: trackX, rotate: deckRotate }}>
          {projects.slice(0, 6).map((project, index) => (
            <motion.article
              key={project.id}
              className="dv-deck-card"
              style={{ '--deck-index': index } as CSSProperties}
              initial={{ opacity: 0.2, y: 50, scale: 0.86 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={project.imageUrl || '/background-project.svg'} alt="" />
              <div>
                <strong>{project.title}</strong>
                <span>{project.role || 'Projeto web'}</span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FooterCTA({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [buttonOffset, setButtonOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.18;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.18;
    setButtonOffset({ x, y });
  };

  const handleStartProject = () => {
    openWhatsApp('Ola Bruno! Quero tirar uma ideia do papel e iniciar um projeto.');
  };

  return (
    <section id="contact" className="dv-final-footer">
      <div className="dv-final-heading">
        <h2>
          <span>PRONTO PARA LEVAR SUA</span>
          <span>
            IDEIA AO
            <motion.button
              type="button"
              className="dv-start-project"
              onPointerMove={handlePointerMove}
              onPointerLeave={() => setButtonOffset({ x: 0, y: 0 })}
              onClick={handleStartProject}
              animate={buttonOffset}
              transition={{ type: 'spring', stiffness: 240, damping: 18, mass: 0.5 }}
            >
              Iniciar projeto
            </motion.button>
          </span>
          <span>PROXIMO NIVEL?</span>
        </h2>
      </div>

      <div className="dv-footer-divider" aria-hidden>
        <span>&lt;/</span>
        <span>&gt;</span>
      </div>

      <div className="dv-footer-columns">
        <div>
          <h3>Links rapidos</h3>
          <button type="button" onClick={() => onNavigate('#home')}><RollingText>INICIO</RollingText></button>
          <button type="button" onClick={() => onNavigate('#skills')}><RollingText>SOBRE</RollingText></button>
          <button type="button" onClick={() => onNavigate('#projects')}><RollingText>PROJETOS</RollingText></button>
          <button type="button" onClick={() => onNavigate('#courses')}><RollingText>CURSOS</RollingText></button>
          <button type="button" onClick={() => onNavigate('#services')}><RollingText>SERVICOS</RollingText></button>
          <button type="button" onClick={() => onNavigate('#contact')}><RollingText>CONTATO</RollingText></button>
        </div>

        <div>
          <h3>Portfolio</h3>
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer"><RollingText>GITHUB</RollingText></a>
          <a href={`${siteConfig.githubUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer"><RollingText>PROJETOS</RollingText></a>
          <a href={`mailto:${siteConfig.contactEmail}`}><RollingText>E-MAIL</RollingText></a>
        </div>

        <div>
          <h3>Redes sociais</h3>
          <a href={siteConfig.linkedinUrl} target="_blank" rel="noopener noreferrer"><RollingText>LINKEDIN</RollingText></a>
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer"><RollingText>GITHUB</RollingText></a>
          <a href={`mailto:${siteConfig.contactEmail}`}><RollingText>E-MAIL</RollingText></a>
        </div>
      </div>

      <div className="dv-footer-contact">
        <a href={`mailto:${siteConfig.contactEmail}`} aria-label="Enviar e-mail">
          <Mail size={18} />
          <RollingText>E-MAIL</RollingText>
        </a>
        <a href={`https://wa.me/${siteConfig.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp">
          <Phone size={18} />
          <RollingText>WHATSAPP</RollingText>
        </a>
      </div>

      <div className="dv-footer-bottom">
        <span>2026</span>
        <span>BRUNO SOUZA</span>
        <button type="button" onClick={() => onNavigate('#home')}>VOLTAR AO TOPO</button>
      </div>
    </section>
  );
}

export function DevsyncPortfolio() {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [portfolioProjects, setPortfolioProjects] = useState<ProjectWithId[]>([]);
  const [courses, setCourses] = useState<CourseWithId[]>([]);

  const nav = useMemo(
    () => [
      { label: 'Inicio', href: '#home' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projetos', href: '#projects' },
      { label: 'Cursos', href: '#courses' },
      { label: 'Servicos', href: '#services' },
      { label: 'Contato', href: '#contact' },
    ],
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
    });
    lenisRef.current = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      if (lenisRef.current === lenis) lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([listProjectsPublic(), listCoursesPublic()]).then(([projectList, courseList]) => {
      if (cancelled) return;
      setPortfolioProjects(projectList);
      setCourses(courseList);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'auto' });
  };

  return (
    <div className="dv-page">
      <CursorDot />
      <header className="dv-header">
        <a className="dv-brand" href="#home" onClick={(event) => { event.preventDefault(); handleNav('#home'); }}>
          Bruno Souza
        </a>
        <nav className="dv-nav" aria-label="Navegacao principal">
          {nav.map((item) => (
            <button key={item.href} type="button" onClick={() => handleNav(item.href)}>
              <RollingText>{item.label}</RollingText>
            </button>
          ))}
        </nav>
        <button className="dv-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Menu">
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <motion.div
          className="dv-mobile-menu"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
        >
          {nav.map((item) => (
            <button key={item.href} type="button" onClick={() => handleNav(item.href)}>
              {item.label}
            </button>
          ))}
        </motion.div>
      )}

      <main>
        <section id="home" className="dv-hero">
          <div className="dv-hero-grid">
            <motion.div
              className="dv-hero-copy"
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="dv-eyebrow">Ola,</p>
              <p className="dv-role">sou desenvolvedor Full Stack</p>
              <AnimatedName />
              <p className="dv-lead">
                Eu crio sistemas web rapidos, escalaveis e bem desenhados, combinando React no front-end
                com APIs e bancos de dados robustos no backend.
              </p>
            </motion.div>

            <motion.div
              className="dv-hero-portrait"
              initial={{ opacity: 0, scale: 0.9, rotate: 4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            >
              <div className="dv-portrait-card dv-portrait-card-back" />
              <div className="dv-portrait-card">
                <img src="/eu.jpeg" alt="" />
              </div>
              <span className="dv-portrait-tag">Desenvolvedor Full Stack</span>
            </motion.div>

            <motion.aside
              className="dv-contact-rail"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div>
                <Mail size={16} />
                <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
              </div>
              <div>
                <Phone size={16} />
                <a href={`https://wa.me/${siteConfig.whatsappNumber}`}>+55 21 96527-2231</a>
              </div>
              <div className="dv-social-stack">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                    <Icon size={16} />
                    <RollingText>{label}</RollingText>
                  </a>
                ))}
              </div>
            </motion.aside>
          </div>

          <div className="dv-scroll-cue">
            <span>ROLAR</span>
            <ArrowDown size={16} />
          </div>

        </section>

        <RotatingDeck projects={portfolioProjects} />

        <section id="skills" className="dv-section dv-skills-section">
          <div className="dv-skill-showcase">
            <div className="dv-skill-sticky">
              <SectionKicker>// Skills</SectionKicker>
              <h2>Minha caixa de ferramentas.</h2>
              <p>Role a pagina e veja as tecnologias entrando por area.</p>
            </div>

            <div className="dv-skill-reveal-list">
              {skillGroups.map((group, groupIndex) => (
                <motion.article
                  key={group.title}
                  className="dv-skill-reveal"
                  initial={{ opacity: 0, y: 80, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: false, margin: '-20% 0px -20% 0px' }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                  <h3>{group.title}</h3>
                  <div>
                    {group.items.map((item, itemIndex) => (
                      <motion.em
                        key={item}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.42, delay: itemIndex * 0.05 }}
                      >
                        {item}
                      </motion.em>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <motion.div
            className="dv-about-strip"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src="/eu.jpeg" alt="Bruno Souza" />
            <p>
              Sou estudante de desenvolvimento web e transformo aprendizado em projetos reais. Gosto de
              resolver problemas, estruturar interfaces claras e criar experiencias que parecem simples porque
              foram bem pensadas.
            </p>
            <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
              <RollingText>Meu GitHub</RollingText>
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </section>

        <section className="dv-stats" aria-label="Metricas do portfolio">
          {stats.map((item) => (
            <CountUpStat key={item.label} {...item} />
          ))}
        </section>

        <section id="projects" className="dv-section">
          <div className="dv-section-head dv-split-head">
            <div>
              <SectionKicker>// Projetos</SectionKicker>
              <h2>Uma vitrine dos meus projetos recentes</h2>
            </div>
            <a className="dv-outline-link" href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
              <RollingText>Ver mais projetos</RollingText>
              <ArrowUpRight size={18} />
            </a>
          </div>
          <CodeDivider />

          <div className="dv-project-list">
            {portfolioProjects.map((project, index) => (
              <motion.a
                key={project.id}
                className="dv-project-card"
                href={getProjectHref(project)}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className="dv-project-image">
                  <img src={project.imageUrl || '/background-project.svg'} alt="" loading="lazy" />
                </div>
                <div className="dv-project-copy">
                  <div className="dv-project-topline">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <ArrowUpRight className="dv-project-arrow" size={24} />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="dv-project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="courses" className="dv-section dv-courses">
          <div className="dv-section-head dv-split-head">
            <div>
              <SectionKicker>// Cursos</SectionKicker>
              <h2>Estudos recentes que fortalecem meus projetos</h2>
            </div>
          </div>
          <CodeDivider />

          <div className="dv-course-grid">
            {courses.map((course, index) => (
              <motion.a
                key={course.id}
                className="dv-course-card"
                href={course.url || siteConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <span>{course.provider || 'Curso'}</span>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div>
                  <RollingText>Ver curso</RollingText>
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>
            ))}
          </div>
        </section>

        <section id="services" className="dv-section dv-services">
          <div className="dv-section-head">
            <SectionKicker>// Servicos</SectionKicker>
            <h2>Desenvolvimento web de ponta a ponta</h2>
          </div>
          <CodeDivider />

          <div className="dv-service-board">
            <div className="dv-service-preview">
              <AnimatePresence mode="wait">
                <motion.div
                  key={services[activeService].title}
                  initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span>{services[activeService].number}</span>
                  <h3>{services[activeService].title}</h3>
                  <p>{services[activeService].description}</p>
                  <button
                    type="button"
                    onClick={() => openWhatsApp(`Ola Bruno, tenho interesse em: ${services[activeService].title}.`)}
                  >
                    <RollingText>Contratar</RollingText>
                    <Send size={16} />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="dv-service-list">
              {services.map((service, index) => (
                <motion.button
                  key={service.title}
                  type="button"
                  className={activeService === index ? 'is-active' : ''}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  initial={{ opacity: 0, x: 34 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8 }}
                >
                  <span>({service.number})</span>
                  <strong>{service.title}</strong>
                  <ArrowUpRight size={20} />
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="dv-clients dv-section" aria-label="Tecnologias e parceiros">
          <div className="dv-section-head dv-split-head">
            <div>
              <SectionKicker>// Ecossistema</SectionKicker>
              <h2>Ferramentas que aparecem nos bastidores</h2>
            </div>
          </div>
          <CodeDivider />
          <div className="dv-client-grid">
            {clients.map((client, index) => (
              <motion.span
                key={client}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                {client}
              </motion.span>
            ))}
          </div>
        </section>

        <section className="dv-process dv-section">
          <div className="dv-section-head dv-split-head">
            <div>
              <SectionKicker>// Processo</SectionKicker>
              <h2>Meu fluxo de desenvolvimento</h2>
            </div>
          </div>
          <CodeDivider />
          <div className="dv-process-grid">
            {processSteps.map((step) => (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 46 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <FooterCTA onNavigate={handleNav} />
      </main>

      <Toaster />
    </div>
  );
}
