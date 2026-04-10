import { motion } from 'motion/react';
import { Heart, Code2 } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { useI18n } from '../../contexts/I18nContext';

const footerNavLinks = [
  { href: '#home', navKey: 'home' as const },
  { href: '#services', navKey: 'services' as const },
  { href: '#work', navKey: 'work' as const },
  { href: '#about', navKey: 'about' as const },
  { href: '#contact', navKey: 'contact' as const },
];

export function Footer() {
  const { siteConfig } = useSiteContent();
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();
  return (
    <footer className="relative py-10 sm:py-14 md:py-16 px-4 sm:px-6 border-t border-[var(--border)]" style={{ backgroundColor: 'var(--background-elevated)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10 md:mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary-muted)', color: 'var(--accent-primary)' }}>
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-foreground">Bruno Souza</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">{t('footer.linksTitle')}</h4>
            <ul className="space-y-2 text-sm">
              {footerNavLinks.map(({ href, navKey }) => (
                <li key={href}>
                  <a href={href} className="transition-colors hover:opacity-90" style={{ color: 'var(--foreground-muted)' }}>
                    {t(`nav.${navKey}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base">{t('footer.contactTitle')}</h4>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:opacity-90 transition-opacity">
                  {siteConfig.contactEmail}
                </a>
              </li>
              <li>{t('footer.country')}</li>
              <li>{t('footer.available')}</li>
            </ul>
          </div>
        </div>

        <div className="pt-10 sm:pt-12 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-4">
          <p className="text-sm flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-center md:text-left" style={{ color: 'var(--foreground-muted)' }}>
            {t('footer.rights')}{' '}
            <motion.span
              animate={reduceMotion ? { scale: 1 } : { scale: [1, 1.2, 1] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>{' '}
            {t('footer.andReact')}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 text-sm" style={{ color: 'var(--foreground-muted)' }}>
            <a href="#" className="hover:opacity-90 transition-opacity">{t('footer.privacy')}</a>
            <span>·</span>
            <a href="#" className="hover:opacity-90 transition-opacity">{t('footer.terms')}</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
