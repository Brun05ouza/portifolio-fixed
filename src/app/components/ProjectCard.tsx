import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
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
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  role,
  demoLink,
  githubLink,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const spotlightBackground = useTransform(
    [mouseXSpring, mouseYSpring],
    ([fx, fy]) =>
      `radial-gradient(600px circle at ${50 + (fx ?? 0) * 100}% ${50 + (fy ?? 0) * 100}%, var(--color-spotlight), transparent 40%)`
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group cursor-pointer w-full"
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden rounded-xl bg-card border border-border shadow-lg h-full flex flex-col">
        {/* Spotlight overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: spotlightBackground }}
        />

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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
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
          <div className="flex gap-3 pt-2">
            {demoLink && (
              <a
                href={demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
              </a>
            )}
            {githubLink && (
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
