import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedListProps {
  children: ReactNode[];
  className?: string;
  delay?: number;
}

export function AnimatedList({ children, className = '', delay = 0.1 }: AnimatedListProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          className="h-full"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: index * delay,
            ease: 'easeOut',
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

const NAME_MAX_LENGTH = 18;
const DESCRIPTION_MAX_LENGTH = 40;

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

interface SkillItemProps {
  icon: ReactNode;
  name: string;
  level: number;
  description: string;
}

export function SkillItem({ icon, name, level, description }: SkillItemProps) {
  return (
    <div className="h-full flex items-start gap-4 p-5 rounded-xl bg-card/90 backdrop-blur-sm border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-muted/80 border border-border flex items-center justify-center group-hover:bg-muted transition-colors [&>svg]:shrink-0">
        {icon}
      </div>
      
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-medium truncate" title={name}>{truncateText(name, NAME_MAX_LENGTH)}</h4>
          <span className="text-xs text-muted-foreground shrink-0 tabular-nums">{level}%</span>
        </div>
        
        {/* Progress bar */}
        <div className="h-1.5 bg-muted rounded-full overflow-hidden shrink-0">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, var(--color-beam-start), var(--color-beam-end))',
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem] leading-tight" title={description}>
          {truncateText(description, DESCRIPTION_MAX_LENGTH)}
        </p>
      </div>
    </div>
  );
}
