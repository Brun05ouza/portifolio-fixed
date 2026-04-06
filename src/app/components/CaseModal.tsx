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

interface CaseModalProps {
  project: PortfolioProjectView | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CaseModal({ project, open, onOpenChange }: CaseModalProps) {
  if (!project) return null;

  const fallback = getCaseDetails(project.repoName);
  const problem = project.caseProblem?.trim() || fallback.problem;
  const solution = project.caseSolution?.trim() || fallback.solution;
  const result = project.caseResult?.trim() || fallback.result;

  const showGithub =
    Boolean(project.githubLink?.trim()) &&
    !project.hideGithubLink &&
    project.repoName !== 'residencial-nature';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl md:text-2xl pr-8 break-words">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 text-sm">
          <div>
            <h4 className="font-semibold text-foreground mb-1">Problema</h4>
            <p className="text-muted-foreground">{problem}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">Solução técnica</h4>
            <p className="text-muted-foreground">{solution}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Stack utilizada</h4>
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
            <h4 className="font-semibold text-foreground mb-1">Resultado / Impacto</h4>
            <p className="text-muted-foreground">{result}</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2 border-t border-border">
            {project.demoLink && (
              <a
                href={toAbsoluteHttpUrl(project.demoLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Ver demo
              </a>
            )}
            {showGithub && (
              <a
                href={toAbsoluteHttpUrl(project.githubLink ?? '')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
              >
                <Github className="w-4 h-4" />
                Código no GitHub
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
