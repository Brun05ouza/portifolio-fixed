import { motion } from 'motion/react';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { useI18n } from '../../contexts/I18nContext';

interface CTAFinalProps {
  onScheduleMeeting: () => void;
}

export function CTAFinal({ onScheduleMeeting }: CTAFinalProps) {
  const { openSiteWhatsApp } = useSiteContent();
  const { bundle } = useI18n();
  const { title, subtitle, quote, schedule } = bundle.ctaFinal;

  return (
    <motion.section
      className="relative py-14 sm:py-20 md:py-24 px-4 sm:px-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => openSiteWhatsApp()}
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[var(--primary-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          >
            {quote}
          </button>
          <button
            type="button"
            onClick={onScheduleMeeting}
            className="w-full sm:w-auto min-h-[44px] px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base border transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2"
            style={{ borderColor: 'var(--border-strong)', color: 'var(--foreground)' }}
          >
            {schedule}
          </button>
        </div>
      </div>
    </motion.section>
  );
}
