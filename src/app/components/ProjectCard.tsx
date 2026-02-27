import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

const TITLE_MAX_LENGTH = 50;
const DESCRIPTION_MAX_LENGTH = 120;

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  role: string;
  demoLink?: string;
  githubLink?: string;
  repoName?: string;
  /** Oculta o link do GitHub (ex.: projeto sem repositório público). */
  hideGithubLink?: boolean;
  /** Se true, não exibe o overlay escuro sobre a imagem (deixa a imagem do projeto em destaque). */
  hideImageOverlay?: boolean;
  /** Se definido, o card é clicável e abre o modal de case. */
  onSelect?: () => void;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  role,
  demoLink,
  githubLink,
  repoName,
  hideGithubLink = false,
  hideImageOverlay = false,
  onSelect,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (onSelect && !(e.target as HTMLElement).closest('a')) {
      e.preventDefault();
      onSelect();
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border shadow-lg h-full flex flex-col">
        {/* Image */}
        <div className="relative h-44 shrink-0 overflow-hidden">
          <img
            src={image}
            alt={title}
            width={400}
            height={176}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {!hideImageOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
          )}

          {/* Role badge */}
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 text-xs bg-white/20 backdrop-blur-md text-white rounded-full border border-white/30">
              {role}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 min-h-[200px] flex flex-col">
          <div className="flex-1 min-h-0">
            <h3 className="text-xl font-semibold mb-2 line-clamp-2" title={title}>
              {truncateText(title, TITLE_MAX_LENGTH)}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-3" title={description}>
              {truncateText(description, DESCRIPTION_MAX_LENGTH)}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 min-h-[28px]">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs rounded-md truncate max-w-[100px]"
                style={{
                  background: 'linear-gradient(135deg, var(--color-chroma-1), var(--color-chroma-2))',
                  color: 'white',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {demoLink && (
              <>
                <a
                  href={demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visitar site</span>
                </a>
                {repoName === 'residencial-nature' && (
                  <span className="text-sm text-muted-foreground">
                    Landing Page desenvolvido para{' '}
                    <a
                      href="https://moregenesis.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:text-primary transition-colors underline underline-offset-2"
                    >
                      Gênesis Empreendimentos
                    </a>
                  </span>
                )}
              </>
            )}
            {githubLink && !hideGithubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            )}
          </div>
        </div>

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-lg"
          style={{
            background: 'linear-gradient(135deg, var(--color-glow), var(--color-beam-end))',
          }}
          animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
        />
      </div>
    </motion.div>
  );
}
