import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './sections/Services';
import { Trust } from './sections/Trust';
import { About } from './components/About';
import { Projects } from './components/Projects';

const TccEcoSphere = lazy(() =>
  import('./components/TccEcoSphere').then((m) => ({ default: m.TccEcoSphere }))
);
import { Process } from './sections/Process';
import { Certifications } from './components/Certifications';
import { LiveStats } from './components/LiveStats';
import { Stack } from './components/Stack';
import { GitCommands } from './components/GitCommands';
import { Contact } from './components/Contact';
import { CTAFinal } from './sections/CTAFinal';
import { Footer } from './components/Footer';
import { BackgroundPremium } from './components/BackgroundPremium';
import { Preloader } from './components/Preloader';
import { Toaster } from './components/ui/sonner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CalendlyModal } from './components/CalendlyModal';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  useTheme(); // keep for next-themes provider

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const scrolledEnough = y > 80;
        const scrollingUp = y < lastScrollY.current;
        lastScrollY.current = y;
        setShowScrollTop(scrolledEnough && scrollingUp);
        ticking = false;
      });
    };

    lastScrollY.current = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <BackgroundPremium />

      <div className="relative z-10">
        <Navbar onScheduleCall={() => setCalendlyOpen(true)} />
        <main>
          <Hero preloaderDone={preloaderDone} />
          <Trust />
          <Services />
          <About />
          <LiveStats />
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center" style={{ color: 'var(--foreground-muted)' }}>Carregando...</div>}>
            <TccEcoSphere />
          </Suspense>
          <Projects />
          <Process />
          <Certifications />
          <Stack />
          <GitCommands />
          <Contact onScheduleMeeting={() => setCalendlyOpen(true)} />
          <CTAFinal onScheduleMeeting={() => setCalendlyOpen(true)} />
        </main>
        <Footer />
        <Toaster />
        <FloatingWhatsApp />
        <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
      </div>

      {/* Scroll to top button — só aparece ao rolar para cima */}
      <AnimatePresence mode="wait">
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 w-12 h-12 min-w-[48px] min-h-[48px] rounded-full flex items-center justify-center text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{
              background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
            }}
            initial={{ opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 8 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Voltar ao topo da página"
            title="Voltar ao topo"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
