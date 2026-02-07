import { useEffect, useState } from 'react';
import { PillNav } from './components/PillNav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TccEcoSphere } from './components/TccEcoSphere';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { LiveStats } from './components/LiveStats';
import { Stack } from './components/Stack';
import { GitCommands } from './components/GitCommands';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import Squares from './components/Squares';

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {/* Global unified background - same grid across entire site */}
      <div className="fixed inset-0 z-0">
        <Squares
          speed={0.8}
          squareSize={48}
          direction="down"
          borderColor="rgba(30, 64, 175, 0.25)"
          hoverFillColor="rgba(26, 26, 36, 0.6)"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 10, 15, 0.35) 0%, rgba(10, 10, 15, 0.55) 50%, rgba(10, 10, 15, 0.45) 100%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <PillNav />
        <main>
          <Hero />
          <About />
          <LiveStats />
          <TccEcoSphere />
          <Projects />
          <Certifications />
          <Stack />
          <GitCommands />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Scroll to top button */}
      {scrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
          }}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
}
