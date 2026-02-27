import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ThemeToggle } from './ThemeToggle';
import { navItems } from '../../config/content';

interface NavbarProps {
  onScheduleCall?: () => void;
}

export function Navbar({ onScheduleCall }: NavbarProps) {
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
        const sections = navItems.map((item) => ({ id: item.id, element: document.getElementById(item.id) }));
        const current = sections.find((s) => s.element && s.element.getBoundingClientRect().top <= 120 && s.element.getBoundingClientRect().bottom >= 120);
        if (current) setActiveId(current.id);
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
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const linkClass = (isActive: boolean) =>
    `relative z-10 px-4 py-2.5 text-sm font-medium transition-colors block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
      isActive ? '' : 'hover:bg-[var(--surface-hover)]'
    }`;

  return (
    <>
      <motion.nav
        className="fixed top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        aria-label="Navegação principal"
      >
        {/* Desktop: barra única centralizada; mobile: conteúdo à direita */}
        <div
          className="flex justify-end md:justify-center items-center w-full md:max-w-6xl md:mx-auto md:px-4 md:py-2 md:rounded-2xl md:border md:border-white/10 md:bg-[rgba(10,10,15,0.55)] md:backdrop-blur-xl md:shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        >
          {/* Links — visíveis só no desktop, centralizados junto ao tema */}
          <ul className="hidden md:flex items-center gap-1">
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
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Direita: tema + menu mobile — no desktop sem fundo próprio (integra à barra) */}
          <div className="flex items-center gap-2 ml-auto md:ml-0 rounded-xl sm:rounded-2xl px-1.5 py-1.5 bg-[rgba(10,10,15,0.45)] border border-white/[0.06] backdrop-blur-xl md:rounded-none md:px-0 md:py-0 md:bg-transparent md:border-0 md:backdrop-blur-none">
            <ThemeToggle />
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <button
                  className="flex md:hidden items-center justify-center min-w-[44px] min-h-[44px] w-11 h-11 rounded-lg border transition-colors hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                  style={{ borderColor: 'var(--border)' }}
                  aria-label="Abrir menu"
                >
                  <Menu className="w-5 h-5" style={{ color: 'var(--foreground)' }} strokeWidth={2} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[min(280px,85vw)] border-[var(--border)]"
                style={{ backgroundColor: 'var(--card)' }}
              >
                <SheetHeader>
                  <SheetTitle className="text-left" style={{ color: 'var(--foreground)' }}>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-6" aria-label="Navegação móvel">
                  {navItems.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href, item.id)}
                      className="px-4 py-3 rounded-lg text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                      style={{
                        color: activeId === item.id ? 'var(--accent-primary)' : 'var(--foreground)',
                        backgroundColor: activeId === item.id ? 'var(--accent-primary-muted)' : 'transparent',
                      }}
                      aria-current={activeId === item.id ? 'true' : undefined}
                    >
                      {item.label}
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
