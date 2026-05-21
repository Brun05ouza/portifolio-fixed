import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react';
import { siteConfig } from '../config/content';
import { TechnologyIcon } from '../config/technologies';
import { listProjectsPublic } from '../services/portfolioDb';
import type { ProjectWithId } from '../types/portfolio';
import './ProjectDetailPage.css';

function collaboratorLabel(platform: string): string {
  if (platform === 'instagram') return 'Instagram';
  if (platform === 'site') return 'Site';
  return 'GitHub';
}

function RollingText({ children }: { children: string }) {
  return (
    <span className="project-roll" aria-label={children}>
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
}

function fallbackText(project: ProjectWithId | null, type: 'problem' | 'solution' | 'result') {
  if (!project) return '';
  if (type === 'problem') return project.caseProblem || project.description;
  if (type === 'solution') {
    return project.caseSolution || 'Estruturei a interface, organizei o fluxo visual e conectei as partes principais para entregar uma experiência clara, rápida e responsiva.';
  }
  return project.caseResult || 'O projeto ficou pronto para apresentação pública, com navegação objetiva, boa leitura visual e base preparada para evoluir.';
}

export function ProjectDetailPage() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const unlockTimer = window.setTimeout(() => {
      document.documentElement.classList.remove('dv-transition-lock');
      document.body.classList.remove('dv-transition-lock');
    }, location.state?.fromProjectTransition ? 760 : 80);

    return () => {
      window.clearTimeout(unlockTimer);
      document.documentElement.classList.remove('dv-transition-lock');
      document.body.classList.remove('dv-transition-lock');
    };
  }, [location.state]);

  useEffect(() => {
    let cancelled = false;
    listProjectsPublic()
      .then((rows) => {
        if (cancelled) return;
        setProjects(rows);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setReady(false);
    const timer = window.setTimeout(() => setReady(true), 80);
    return () => window.clearTimeout(timer);
  }, [projectId]);

  const project = useMemo(
    () => projects.find((item) => item.id === projectId) || null,
    [projectId, projects]
  );

  const related = useMemo(
    () => projects.filter((item) => item.id !== project?.id).slice(0, 2),
    [project?.id, projects]
  );

  const openRelatedProject = (id: string) => {
    setReady(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    window.setTimeout(() => {
      navigate(`/projetos/${encodeURIComponent(id)}`, { state: { fromRelatedProject: true } });
    }, 260);
  };

  if (loading) {
    return <main className="project-detail-page" aria-busy="true" />;
  }

  if (!project) {
    return (
      <main className="project-detail-page project-detail-page--empty">
        <div className="project-detail-shell">
          <Link className="project-back-link" to="/">
            <ArrowLeft size={18} />
            <RollingText>Voltar ao portfólio</RollingText>
          </Link>
          <h1>Projeto não encontrado</h1>
          <p>Esse projeto pode ter sido removido ou desativado.</p>
        </div>
      </main>
    );
  }

  return (
    <main className={`project-detail-page${ready ? ' is-ready' : ''}${location.state?.fromRelatedProject ? ' is-related-transition' : ''}`}>
      {location.state?.fromProjectTransition ? <div className="project-detail-reveal" aria-hidden /> : null}
      <div className="project-detail-shell">
        <header className="project-detail-header">
          <Link className="project-back-link" to="/">
            <ArrowLeft size={18} />
            <RollingText>Portfolio</RollingText>
          </Link>
          <div className="project-detail-kicker">// Projeto</div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div className="project-detail-actions">
            {project.demoLink ? (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <RollingText>Ver projeto</RollingText>
                <ArrowUpRight size={18} />
              </a>
            ) : null}
            {project.githubLink && !project.hideGithubLink ? (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <RollingText>Código</RollingText>
                <Github size={18} />
              </a>
            ) : null}
          </div>
        </header>

        <section className="project-detail-meta" aria-label="Resumo do projeto">
          <div>
            <span>Cliente</span>
            {project.company ? (
              <strong className="project-detail-company">
                {project.company.iconUrl ? <img src={project.company.iconUrl} alt="" /> : null}
                {project.company.name}
              </strong>
            ) : (
              <strong>{project.repoName || 'Projeto próprio'}</strong>
            )}
          </div>
          <div>
            <span>Area</span>
            <strong>{project.role || 'Desenvolvimento web'}</strong>
          </div>
          <div>
            <span>Stack</span>
            <div className="project-detail-techs">
              {project.tags.map((tag) => (
                <i key={tag} title={tag} aria-label={tag}>
                  <TechnologyIcon name={tag} size={18} />
                </i>
              ))}
            </div>
          </div>
        </section>

        <section className="project-detail-hero-image">
          <img src={project.imageUrl || '/background-project.svg'} alt="" decoding="async" />
        </section>

        <section className="project-detail-content">
          <article>
            <span>01</span>
            <h2>Visão geral</h2>
            <p>{project.description}</p>
          </article>
          <article>
            <span>02</span>
            <h2>Desafio</h2>
            <p>{fallbackText(project, 'problem')}</p>
          </article>
          <article>
            <span>03</span>
            <h2>Solução</h2>
            <p>{fallbackText(project, 'solution')}</p>
          </article>
          <article>
            <span>04</span>
            <h2>Resultado</h2>
            <p>{fallbackText(project, 'result')}</p>
          </article>
        </section>

        {project.collaborators.length > 0 ? (
          <section className="project-detail-collaborators">
            <h2>Com apoio de</h2>
            <div>
              {project.collaborators.map((collaborator) => (
                <a key={collaborator.url} href={collaborator.url} target="_blank" rel="noopener noreferrer">
                  <strong><RollingText>{collaborator.name}</RollingText></strong>
                  <span>{collaboratorLabel(collaborator.platform)}</span>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {related.length > 0 ? (
          <section className="project-detail-more">
            <div className="project-detail-divider" aria-hidden>
              <span>&lt;/</span>
              <span>&gt;</span>
            </div>
            <h2>Mais projetos</h2>
            <div>
              {related.map((item) => (
                <button key={item.id} type="button" onClick={() => openRelatedProject(item.id)}>
                  <img src={item.imageUrl || '/background-project.svg'} alt="" loading="lazy" decoding="async" />
                  <span><RollingText>{item.title}</RollingText></span>
                  <em>{item.tags.slice(0, 3).join(', ') || 'Projeto web'}</em>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <footer className="project-detail-footer">
          <span>BRUNO SOUZA</span>
          <a href={siteConfig.githubUrl} target="_blank" rel="noopener noreferrer">
            <RollingText>GitHub</RollingText>
            <ArrowUpRight size={16} />
          </a>
        </footer>
      </div>
    </main>
  );
}
