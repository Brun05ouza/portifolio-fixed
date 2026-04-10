import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { CaseModal } from './CaseModal';
import { Container } from './ds/Container';
import { SectionTitle } from './ds/SectionTitle';
import { Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { useI18n } from '../../contexts/I18nContext';
import { listProjectsPublic } from '../../services/portfolioDb';
import { toPortfolioProjectView } from '../../types/portfolio';
import type { PortfolioProjectView } from '../../types/portfolio';

const MOBILE_BREAKPOINT = 640;

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

export function Projects() {
  const { siteConfig } = useSiteContent();
  const { bundle } = useI18n();
  const p = bundle.projects;
  const [projects, setProjects] = useState<PortfolioProjectView[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [selectedCase, setSelectedCase] = useState<PortfolioProjectView | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setLoadFailed(false);
      try {
        const list = await listProjectsPublic();
        if (!cancelled) {
          setProjects(list.map(toPortfolioProjectView));
        }
      } catch {
        if (!cancelled) setLoadFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="work" className="relative py-14 sm:py-20 md:py-28 border-t border-[var(--border)]">
      <Container>
        <SectionTitle label={p.label} title={p.title} subtitle={p.subtitle} />

        {loadFailed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl flex items-start gap-3 border"
            style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)' }}
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: 'var(--accent-secondary)' }} />
            <div>
              <p className="font-medium text-foreground">{p.warning}</p>
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{p.loadError}</p>
            </div>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin" style={{ color: 'var(--accent-primary)' }} />
          </div>
        ) : projects.length > 0 ? (
          <>
            {isMobile && !showAllProjects ? (
              <div className="flex flex-col items-center gap-6 py-8">
                <button
                  type="button"
                  onClick={() => setShowAllProjects(true)}
                  className="inline-flex items-center justify-center gap-2 w-full min-h-[48px] px-6 py-3.5 rounded-xl font-semibold text-base border-2 transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  style={{ borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}
                >
                  {p.showAll}
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
                    key={project.id}
                    className="flex"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      image={project.image}
                      tags={project.tags}
                      role={project.role}
                      demoLink={project.demoLink}
                      githubLink={project.githubLink}
                      repoName={project.repoName}
                      hideGithubLink={project.hideGithubLink}
                      hideImageOverlay={project.hideImageOverlay}
                      onSelect={() => setSelectedCase(project)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <p className="text-center py-12" style={{ color: 'var(--foreground-muted)' }}>
            {p.empty}
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
              {p.githubCta}
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
