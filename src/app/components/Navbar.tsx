import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from './ui/utils';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { navItems } from '../../config/content';
import { getActiveNavId } from '../../utils/navScroll';
import { useI18n } from '../../contexts/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';

/** Tempo aproximado até o hero terminar o stagger de entrada (motion). */
const HERO_INTRO_MS = 1150;

interface NavbarProps {
  onScheduleCall?: () => void;
  /** Quando true, após a animação do hero o header “derrete” no fundo até rolar a página. */
  preloaderDone?: boolean;
}

export function Navbar({ onScheduleCall, preloaderDone = false }: NavbarProps) {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroIntroComplete, setHeroIntroComplete] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!preloaderDone) {
      setHeroIntroComplete(false);
      return;
    }
    if (reduceMotion) {
      setHeroIntroComplete(true);
      return;
    }
    const id = window.setTimeout(() => setHeroIntroComplete(true), HERO_INTRO_MS);
    return () => window.clearTimeout(id);
  }, [preloaderDone, reduceMotion]);

  /** No topo do hero: barra quase invisível; ao rolar, vidro de novo para contraste. */
  const mergeWithHeroBg = preloaderDone && heroIntroComplete && !scrolled;

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;
    const sync = () => {
      setScrolled(window.scrollY > 50);
      setActiveId(getActiveNavId(navItems, 140));
    };
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        sync();
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    sync();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const linkClass = (isActive: boolean) =>
    `relative z-10 px-4 py-3 text-base md:text-lg font-medium transition-colors block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
      isActive ? '' : 'hover:bg-[var(--surface-hover)]'
    }`;

  return (
    <>
      <motion.nav
        className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        aria-label={t('navbar.ariaMain')}
      >
        <div
          className={cn(
            'flex justify-end md:justify-center items-center w-full md:w-fit md:mx-auto md:px-3 md:py-2.5 md:rounded-2xl md:border md:backdrop-blur-xl',
            !reduceMotion && 'transition-[background-color,box-shadow,backdrop-filter,border-color] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
            mergeWithHeroBg
              ? 'md:border-transparent md:bg-transparent md:shadow-none md:backdrop-blur-none'
              : 'md:border-[var(--nav-glass-border)] md:bg-[var(--nav-glass-bg)] md:shadow-[var(--nav-glass-shadow)]'
          )}
        >
          {/* Desktop: links + divisor + idiomas na mesma pílula do header */}
          <div className="hidden md:flex items-stretch gap-1">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleClick(e, item.href, item.id)}
                    className={linkClass(activeId === item.id)}
                    style={{
                      color: activeId === item.id ? 'var(--accent-primary)' : 'var(--foreground-muted)',
                    }}
                    aria-current={activeId === item.id ? 'page' : undefined}
                  >
                    {t(`nav.${item.id}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div
              className={cn(
                'w-px shrink-0 self-stretch my-2.5',
                mergeWithHeroBg ? 'bg-[var(--border)]/35' : 'bg-[var(--border)]/80'
              )}
              aria-hidden
            />
            <div className="flex items-center pl-0.5">
              <LanguageSwitcher embedded mergeWithHeroBg={mergeWithHeroBg} />
            </div>
          </div>

          {/* Mobile: pílula com hamburger; desktop: oculto (não entra no flex da barra) */}
          <div
            className={cn(
              'flex md:hidden items-center gap-2 ml-auto rounded-xl sm:rounded-2xl px-2 py-2 border backdrop-blur-xl justify-end',
              !reduceMotion &&
                'transition-[background-color,backdrop-filter,border-color] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
              mergeWithHeroBg
                ? 'border-transparent bg-transparent shadow-none backdrop-blur-none'
                : 'border-[var(--nav-mobile-pill-border)] bg-[var(--nav-mobile-pill-bg)]'
            )}
          >
            <LanguageSwitcher embedded mergeWithHeroBg={mergeWithHeroBg} />
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex md:hidden items-center justify-center min-w-[48px] min-h-[48px] w-12 h-12 rounded-xl border transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label={t('navbar.openMenu')}
                >
                  <Menu className="w-6 h-6" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(280px,85vw)] border-[var(--border)]"
                style={{ backgroundColor: 'var(--card)' }}
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                    {t('navbar.menuTitle')}
                  </SheetTitle>
                  <SheetDescription className="sr-only">{t('navbar.menuDesc')}</SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1.5 mt-6" aria-label={t('navbar.mobileNav')}>
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href, item.id)}
                      className="px-4 py-3.5 rounded-lg text-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      style={{
                        color: activeId === item.id ? 'var(--accent-primary)' : 'var(--foreground)',
                        backgroundColor: activeId === item.id ? 'var(--accent-primary-muted)' : 'transparent',
                      }}
                      aria-current={activeId === item.id ? 'true' : undefined}
                    >
                      {t(`nav.${item.id}`)}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
