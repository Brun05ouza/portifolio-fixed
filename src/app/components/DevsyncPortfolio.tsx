import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import {
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react';
import { siteConfig } from '../../config/content';
import { openWhatsApp } from '../../utils/whatsapp';
import { Toaster } from './ui/sonner';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import './DevsyncPortfolio.css';

const socials = [
  { label: 'LinkedIn', href: siteConfig.linkedinUrl, icon: Linkedin },
  { label: 'GitHub', href: siteConfig.githubUrl, icon: Github },
  { label: 'Email', href: `mailto:${siteConfig.contactEmail}`, icon: Mail },
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

const projects = [
  {
    title: 'EcoSphere',
    description:
      'Plataforma de sustentabilidade com IA, gamificacao e monitoramento ambiental em tempo real.',
    tags: ['React', 'IA', 'IoT', 'Dashboard'],
    image: '/background-project.svg',
    href: siteConfig.githubUrl,
  },
  {
    title: 'Residencial Nature',
    description:
      'Site institucional responsivo para empreendimento residencial, focado em presenca digital e conversao.',
    tags: ['React', 'TypeScript', 'Responsivo'],
    image: '/nature-preview.jpeg',
    href: 'https://residencialnature.com.br/',
  },
  {
    title: 'Nexus Flow Web',
    description:
      'Sistema web para organizar fluxos, interfaces administrativas e jornadas operacionais.',
    tags: ['Full Stack', 'API', 'UI'],
    image: '/background-project.svg',
    href: `${siteConfig.githubUrl}/nexus-flow-web`,
  },
  {
    title: 'Gestor Pro',
    description:
      'Experimento de gestao profissional com foco em produtividade, dados e experiencia clara.',
    tags: ['React', 'Gestao', 'PostgreSQL'],
    image: '/background-project.svg',
    href: `${siteConfig.githubUrl}/gestor-pro`,
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

export function DevsyncPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[number] | null>(null);

  const nav = useMemo(
    () => [
      { label: 'Inicio', href: '#home' },
      { label: 'Skills', href: '#skills' },
      { label: 'Projetos', href: '#projects' },
      { label: 'Servicos', href: '#services' },
      { label: 'Contato', href: '#contact' },
    ],
    []
  );

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="dv-page">
      <header className="dv-header">
        <a className="dv-brand" href="#home" onClick={(event) => { event.preventDefault(); handleNav('#home'); }}>
          Bruno Souza
        </a>
        <nav className="dv-nav" aria-label="Main navigation">
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
              <p className="dv-eyebrow">Hey,</p>
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
              <span className="dv-portrait-tag">Full Stack Developer</span>
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
            <span>SCROLL</span>
            <ArrowDown size={16} />
          </div>

        </section>

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

        <section className="dv-stats" aria-label="Portfolio stats">
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

          <div className="dv-project-list">
            {projects.map((project, index) => (
              <motion.button
                key={project.title}
                type="button"
                className="dv-project-card"
                onClick={() => setSelectedProject(project)}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <div className="dv-project-image">
                  <img src={project.image} alt="" loading="lazy" />
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
              </motion.button>
            ))}
          </div>
        </section>

        <section id="services" className="dv-section dv-services">
          <div className="dv-section-head">
            <SectionKicker>// Servicos</SectionKicker>
            <h2>Desenvolvimento web de ponta a ponta</h2>
          </div>

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

        <section id="contact" className="dv-contact">
          <SectionKicker>// Contact</SectionKicker>
          <h2>Tem uma ideia? Vamos construir algo profissional.</h2>
          <p>
            Estou disponivel para projetos, sistemas internos, landing pages e experiencias digitais com
            performance de verdade.
          </p>
          <div className="dv-contact-actions">
            <a href={`mailto:${siteConfig.contactEmail}`}>
              <Mail size={18} />
              <RollingText>Send Email</RollingText>
            </a>
            <button type="button" onClick={() => openWhatsApp('Ola Bruno! Quero falar sobre um projeto.')}>
              <Phone size={18} />
              <RollingText>WhatsApp</RollingText>
            </button>
          </div>
        </section>
      </main>

      <footer className="dv-footer">
        <span>Bruno Souza</span>
        <span>Portfolio de desenvolvedor</span>
        <a href="#home" onClick={(event) => { event.preventDefault(); handleNav('#home'); }}>
          Voltar ao topo
        </a>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="dv-project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="dv-project-modal-panel"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                className="dv-modal-close"
                onClick={() => setSelectedProject(null)}
                aria-label="Fechar projeto"
              >
                <X size={18} />
              </button>
              <div className="dv-modal-image">
                <img src={selectedProject.image} alt="" />
              </div>
              <div className="dv-modal-copy">
                <p>// Projeto selecionado</p>
                <h3 id="project-modal-title">{selectedProject.title}</h3>
                <span>{selectedProject.description}</span>
                <div>
                  {selectedProject.tags.map((tag) => (
                    <em key={tag}>{tag}</em>
                  ))}
                </div>
                <a href={selectedProject.href} target="_blank" rel="noopener noreferrer">
                  <RollingText>Abrir projeto</RollingText>
                  <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster />
      <FloatingWhatsApp />
    </div>
  );
}
