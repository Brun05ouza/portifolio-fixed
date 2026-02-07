import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'about', label: 'Sobre', href: '#about' },
  { id: 'work', label: 'Projetos', href: '#work' },
  { id: 'certificados', label: 'Certificados', href: '#certificados' },
  { id: 'stack', label: 'Skills', href: '#stack' },
  { id: 'git-commands', label: 'Terminal', href: '#git-commands' },
  { id: 'contact', label: 'Contato', href: '#contact' },
];

export function PillNav() {
  const [activeId, setActiveId] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveId(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveId(id);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 backdrop-blur-xl ${
        scrolled
          ? 'bg-black/90'
          : 'bg-black/75'
      }`}
      style={{
        borderRadius: '9999px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <ul className="flex items-center gap-1 px-3 py-2 relative">
        {navItems.map((item) => (
          <li key={item.id} className="relative">
            <a
              href={item.href}
              onClick={(e) => handleClick(e, item.href, item.id)}
              className="relative z-10 px-4 py-2 text-sm transition-colors duration-200 block"
              style={{
                color: activeId === item.id ? 'var(--primary-foreground)' : 'var(--foreground)',
              }}
            >
              {item.label}
            </a>
            {activeId === item.id && (
              <motion.div
                layoutId="pill-indicator"
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
