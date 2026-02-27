import { motion } from 'motion/react';
import { cn } from '../ui/utils';

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({
  label,
  title,
  subtitle,
  className,
  align = 'center',
}: SectionTitleProps) {
  return (
    <motion.header
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      {label && (
        <p
          className="text-sm font-medium tracking-wide uppercase mb-3"
          style={{ color: 'var(--accent-primary)' }}
        >
          {label}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg max-w-2xl mx-auto px-1 sm:px-0" style={{ color: 'var(--foreground-muted)' }}>
          {subtitle}
        </p>
      )}
    </motion.header>
  );
}
