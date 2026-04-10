import { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './sections/Services';

const ComputersCanvas = lazy(() =>
  import('./components/ComputersCanvas').then((m) => ({ default: m.default }))
);
import { Trust } from './sections/Trust';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Courses } from './components/Courses';

const TccEcoSphere = lazy(() =>
  import('./components/TccEcoSphere').then((m) => ({ default: m.TccEcoSphere }))
);
import { Process } from './sections/Process';
import { Certifications } from './components/Certifications';
import { LiveStats } from './components/LiveStats';
import { Stack } from './components/Stack';
import { Contact } from './components/Contact';
import { CTAFinal } from './sections/CTAFinal';
import { Footer } from './components/Footer';
import { BackgroundPremium } from './components/BackgroundPremium';
import { Preloader } from './components/Preloader';
import { Toaster } from './components/ui/sonner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CalendlyModal } from './components/CalendlyModal';
import { useI18n } from '../contexts/I18nContext';

export function PortfolioView() {
  const { bundle } = useI18n();
  const pv = bundle.portfolio;
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);
  const [calendlyOpen, setCalendlyOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [siteReady, setSiteReady] = useState(false);
  const [pcSectionInView, setPcSectionInView] = useState(false);
  const pcSectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!preloaderDone) return;
    if (document.readyState === 'complete') {
      setSiteReady(true);
      return;
    }
    const onLoad = () => setSiteReady(true);
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, [preloaderDone]);

  useEffect(() => {
    const el = pcSectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setPcSectionInView(true);
      },
      { rootMargin: '100px', threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shouldLoadPc3d = siteReady && pcSectionInView;

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
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}
      <BackgroundPremium />

      <div className="relative z-10">
        <Navbar preloaderDone={preloaderDone} onScheduleCall={() => setCalendlyOpen(true)} />
        <main>
          <Hero preloaderDone={preloaderDone} />
          <section
            ref={pcSectionRef}
            className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden bg-background"
            aria-hidden
          >
            {shouldLoadPc3d ? (
              <>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse 80% 70% at 50% 45%, rgba(34, 211, 238, 0.12) 0%, rgba(34, 211, 238, 0.04) 40%, transparent 70%)',
                  }}
                  aria-hidden
                />
                <Suspense
                  fallback={
                    <div
                      className="relative z-[1] w-full h-full flex items-center justify-center"
                      style={{ color: 'var(--accent-primary)' }}
                    >
                      <Loader2 className="w-10 h-10 animate-spin opacity-60" aria-hidden />
                    </div>
                  }
                >
                  <ComputersCanvas className="relative z-[1] w-full h-full" />
                </Suspense>
              </>
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ color: 'var(--foreground-muted)' }}
              >
                <Loader2 className="w-8 h-8 animate-spin opacity-40" aria-hidden />
              </div>
            )}
          </section>
          <Trust />
          <Services />
          <About />
          <LiveStats />
          <Suspense
            fallback={
              <div
                className="min-h-[50vh] flex items-center justify-center"
                style={{ color: 'var(--foreground-muted)' }}
              >
                {pv.loading}
              </div>
            }
          >
            <TccEcoSphere />
          </Suspense>
          <Projects />
          <Courses />
          <Process />
          <Certifications />
          <Stack />
          <Contact />
          <CTAFinal onScheduleMeeting={() => setCalendlyOpen(true)} />
        </main>
        <Footer />
        <Toaster />
        <FloatingWhatsApp />
        <CalendlyModal open={calendlyOpen} onOpenChange={setCalendlyOpen} />
      </div>

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
            aria-label={pv.scrollTop}
            title={pv.scrollTopTitle}
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
