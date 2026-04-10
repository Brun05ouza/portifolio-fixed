import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import type { PortfolioProjectView } from '../../types/portfolio';
import { getCaseDetails } from '../../config/cases';
import { toAbsoluteHttpUrl } from '../../utils/externalUrl';
import { useI18n } from '../../contexts/I18nContext';

interface CaseModalProps {
  project: PortfolioProjectView | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CaseModal({ project, open, onOpenChange }: CaseModalProps) {
  const { bundle } = useI18n();
  const cm = bundle.caseModal;

  if (!project) return null;

  const fallback = getCaseDetails(project.repoName);
  const problem = project.caseProblem?.trim() || fallback.problem;
  const solution = project.caseSolution?.trim() || fallback.solution;
  const result = project.caseResult?.trim() || fallback.result;

  const showGithub =
    Boolean(project.githubLink?.trim()) &&
    !project.hideGithubLink &&
    project.repoName !== 'residencial-nature';

  const hasHero = Boolean(project.image?.trim());

  const detailSections = (
    <div className="space-y-4 text-sm sm:space-y-6">
      <div>
        <h4 className="mb-1 font-semibold text-foreground">{cm.problem}</h4>
        <p className="text-muted-foreground">{problem}</p>
      </div>
      <div>
        <h4 className="mb-1 font-semibold text-foreground">{cm.solution}</h4>
        <p className="text-muted-foreground">{solution}</p>
      </div>
      <div>
        <h4 className="mb-2 font-semibold text-foreground">{cm.stack}</h4>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs"
              style={{
                background: 'linear-gradient(135deg, var(--color-chroma-1), var(--color-chroma-2))',
                color: 'white',
                border: 'none',
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-1 font-semibold text-foreground">{cm.result}</h4>
        <p className="text-muted-foreground">{result}</p>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-border pt-2">
        {project.demoLink && (
          <a
            href={toAbsoluteHttpUrl(project.demoLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            {cm.demo}
          </a>
        )}
        {showGithub && (
          <a
            href={toAbsoluteHttpUrl(project.githubLink ?? '')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-primary hover:underline"
          >
            <Github className="h-4 w-4" />
            {cm.github}
          </a>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={
          hasHero
            ? 'flex max-h-[92vh] w-[95vw] max-w-2xl flex-col gap-0 overflow-hidden rounded-xl border-border p-0 shadow-2xl ring-1 ring-black/5 sm:max-h-[90vh] dark:ring-white/[0.08]'
            : 'max-h-[85vh] w-[95vw] max-w-lg overflow-y-auto p-4 sm:max-h-[90vh] sm:p-6'
        }
      >
        {hasHero ? (
          <>
            <div className="relative shrink-0">
              <div className="relative h-[min(42vh,320px)] w-full overflow-hidden sm:h-[min(44vh,360px)]">
                <img
                  src={project.image}
                  alt=""
                  width={672}
                  height={378}
                  className="absolute inset-0 h-full w-full scale-105 object-cover motion-safe:transition-transform motion-safe:duration-700"
                  loading="eager"
                  decoding="async"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(34,211,238,0.26)_0%,transparent_42%,transparent_100%)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background from-[18%] via-background/60 via-55% to-transparent"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--accent-primary)]/55 to-transparent"
                  aria-hidden
                />
                <DialogHeader className="absolute inset-x-0 bottom-0 z-[1] space-y-2 border-0 p-5 text-left sm:p-7 sm:pb-6">
                  {project.role?.trim() ? (
                    <p
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--accent-primary)] sm:text-xs"
                      style={{ textShadow: '0 1px 10px rgba(0,0,0,0.75)' }}
                    >
                      {project.role}
                    </p>
                  ) : null}
                  <DialogTitle className="pr-10 text-left text-2xl leading-tight font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:pr-12 sm:text-3xl">
                    {project.title}
                  </DialogTitle>
                </DialogHeader>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-6">
              {detailSections}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="pr-8 text-lg break-words sm:text-xl md:text-2xl">
                {project.title}
              </DialogTitle>
            </DialogHeader>
            {detailSections}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
