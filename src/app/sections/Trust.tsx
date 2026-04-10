import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { useI18n } from '../../contexts/I18nContext';

const techLogos = ['React', 'TypeScript', 'Node', 'Tailwind', 'Vite', 'Supabase'];

export function Trust() {
  const { stats } = useSiteContent();
  const { localeTag } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <section id="trust" className="relative py-12 sm:py-16 md:py-24 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Metrics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.5, staggerChildren: reduceMotion ? 0 : 0.08 }}
        >
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                className="text-center"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="flex justify-center mb-2 [&>div]:flex [&>div]:items-center [&>div]:justify-center">
                  <Icon size={24} className="shrink-0" style={{ color: item.color }} aria-hidden />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                  {typeof item.value === 'number' && item.value >= 1000
                    ? (item.value / 1000).toFixed(1) + 'k'
                    : item.value.toLocaleString(localeTag)}
                </div>
                <div className="text-sm mt-0.5" style={{ color: 'var(--foreground-muted)' }}>
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tech stack strip */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-10 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {techLogos.map((name) => (
            <span
              key={name}
              className="text-sm font-medium px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)] transition-colors"
              style={{ color: 'var(--foreground-muted)' }}
            >
              {name}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
