import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { CaseModal } from './CaseModal';
import { Container } from './ds/Container';
import { SectionTitle } from './ds/SectionTitle';
import { fetchUserRepos } from '../services/githubService';
import type { ProjectFromRepo } from '../services/githubService';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../config/content';

const MOBILE_BREAKPOINT = 640; // sm

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    setIsMobile(mq.matches);
    const fn = () => setIsMobile(mq.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return isMobile;
}

/** Projeto em destaque fixo no topo da lista */
const FEATURED_PROJECT: ProjectFromRepo = {
  title: 'Residencial Nature',
  description: 'Site institucional do empreendimento residencial Nature — presença digital e experiência do usuário.',
  image: '/nature-preview.jpeg',
  tags: ['React', 'TypeScript', 'Responsivo'],
  role: 'Front-end',
  demoLink: 'https://residencialnature.com.br/',
  githubLink: 'https://residencialnature.com.br/',
  repoName: 'residencial-nature',
};

export function Projects() {
  const [projects, setProjects] = useState<ProjectFromRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCase, setSelectedCase] = useState<ProjectFromRepo | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchUserRepos(50).then(({ projects, error }) => {
      setProjects([FEATURED_PROJECT, ...projects]);
      setError(error);
      setLoading(false);
    });
  }, []);

  return (
    <section id="work" className="relative py-14 sm:py-20 md:py-28 border-t border-[var(--border)]">
      <Container>
        <SectionTitle
          label="Cases"
          title="Projetos em destaque"
          subtitle="Problema, solução técnica, stack e resultado de cada projeto."
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl flex items-start gap-3 border"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent-secondary)' }} />
            <div>
              <p className="font-medium text-foreground">Aviso</p>
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{error}</p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin" style={{ color: 'var(--accent-primary)' }} />
          </div>
        ) : projects.length > 0 ? (
          <>
            {/* No mobile: oculta projetos até clicar em "Ver todos" */}
            {isMobile && !showAllProjects ? (
              <div className="flex flex-col items-center gap-6 py-8">
                <button
                  type="button"
                  onClick={() => setShowAllProjects(true)}
                  className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] px-6 py-3.5 rounded-xl font-semibold text-base border-2 transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
                >
                  Ver todos os projetos
                  <ChevronDown className="w-5 h-5" aria-hidden />
                </button>
              </div>
            ) : (
              <motion.div
                key="projects-grid"
                initial={isMobile ? { opacity: 0, y: 12 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch"
              >
                {projects.map((project, index) => (
                    <motion.div
                      key={project.githubLink}
                      className="flex"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                    >
                      <ProjectCard
                        {...project}
                        hideGithubLink={project.repoName === 'residencial-nature'}
                        hideImageOverlay={project.repoName === 'residencial-nature'}
                        onSelect={() => setSelectedCase(project)}
                      />
                    </motion.div>
                  ))}
              </motion.div>
            )}
          </>
        ) : (
          <p className="text-center py-12" style={{ color: 'var(--foreground-muted)' }}>
            Nenhum repositório encontrado. Verifique sua conexão ou o usuário do GitHub.
          </p>
        )}

        {(!isMobile || showAllProjects) && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[44px] px-5 py-3 sm:px-6 rounded-xl font-semibold text-sm sm:text-base border transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--foreground)' }}
            >
              Ver repositórios no GitHub
            </a>
          </motion.div>
        )}

        <CaseModal
          project={selectedCase}
          open={!!selectedCase}
          onOpenChange={(open) => !open && setSelectedCase(null)}
        />
      </Container>
    </section>
  );
}
