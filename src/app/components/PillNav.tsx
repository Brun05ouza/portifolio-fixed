import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { ThemeToggle } from './ThemeToggle';
import { navItems } from '../../config/content';

export function PillNav() {
  const [activeId, setActiveId] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);

        const sections = navItems.map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }));

        const currentSection = sections.find((section) => {
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveId(currentSection.id);
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveId(id);
    setMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const navStyle = {
    borderRadius: '9999px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
  };

  const navBaseClass = `fixed top-4 z-50 transition-all duration-300 backdrop-blur-xl ${
    scrolled ? 'bg-background/95' : 'bg-background/85'
  }`;

  const linkClass = (isActive: boolean) =>
    `relative z-10 px-4 py-2 text-sm transition-colors duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded-full ${
      isActive ? 'font-semibold' : ''
    }`;

  return (
    <>
      {/* Mobile: barra com logo + hamburger */}
      <motion.nav
        className={`${navBaseClass} left-4 right-4 flex md:hidden justify-between items-center px-4 py-2.5`}
        style={navStyle}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home', 'home')}
          className="text-sm font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-lg"
        >
          Portfolio
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <button
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-white/20 hover:bg-white/10 active:bg-white/15 transition-colors touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Abrir menu de navegação"
            >
              <Menu className="w-6 h-6 text-foreground" strokeWidth={2} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[min(280px,85vw)] sm:w-[320px] border-border bg-card/95 backdrop-blur-xl"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-foreground">Navegação</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 mt-6" aria-label="Navegação principal">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href, item.id)}
                  className={`px-4 py-3.5 rounded-xl text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    activeId === item.id
                      ? 'bg-primary/20 text-primary'
                      : 'text-foreground hover:bg-muted'
                  }`}
                  aria-current={activeId === item.id ? 'true' : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        </div>
      </motion.nav>

      {/* Desktop: pill nav completo */}
      <motion.nav
        className={`${navBaseClass} left-1/2 -translate-x-1/2 hidden md:block`}
        style={navStyle}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        aria-label="Navegação principal"
      >
        <ul className="flex items-center gap-1 px-3 py-2 relative">
          {navItems.map((item) => (
            <li key={item.id} className="relative">
              <a
                href={item.href}
                onClick={(e) => handleClick(e, item.href, item.id)}
                className={linkClass(activeId === item.id)}
                style={{
                  color: activeId === item.id ? 'var(--primary-foreground)' : 'var(--foreground)',
                }}
                aria-current={activeId === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
              {activeId === item.id && (
                <motion.div
                  layoutId="pill-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </li>
          ))}
          <li className="flex items-center pl-2 ml-1 border-l border-border">
            <ThemeToggle />
          </li>
        </ul>
      </motion.nav>
    </>
  );
}
