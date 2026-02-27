import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { heroTexts } from '../../config/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { openWhatsApp } from '../../utils/whatsapp';
import { stats } from '../../config/content';
import DarkVeil from './DarkVeil';

interface HeroProps {
  /** Quando true, o conteúdo do hero faz a animação de entrada (surgir) após o preloader */
  preloaderDone?: boolean;
}

const heroEntrance = {
  hidden: { opacity: 0, y: 42, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const heroContainerVariants = {
  hidden: {},
  visible: (reduceMotion: boolean) => ({
    transition: {
      staggerChildren: reduceMotion ? 0 : 0.07,
      delayChildren: reduceMotion ? 0 : 0.25,
    },
  }),
};

export function Hero({ preloaderDone = true }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const projectsCount = stats.find((s) => s.label === 'Projetos Concluídos')?.value ?? 29;
  const shouldReveal = preloaderDone;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-10 sm:pt-24 sm:pb-12 md:pt-28 md:pb-12 lg:pt-32"
    >
      <div
        className="absolute inset-0 z-0 min-h-full"
        style={{ width: '100%', height: '100%' }}
        aria-hidden
      >
        <DarkVeil
          hueShift={33}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.9}
          scanlineFrequency={1.7}
          warpAmount={0}
        />
      </div>
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-5 md:px-6">
        <motion.div
          className="space-y-6 md:space-y-8 text-left"
          initial="hidden"
          animate={shouldReveal ? 'visible' : 'hidden'}
          variants={heroContainerVariants}
          custom={reduceMotion}
          transition={{ duration: 0.5 }}
        >
          {/* Chip: disponível / projetos */}
          <motion.div variants={heroEntrance} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium border"
              style={{
                color: 'var(--accent-primary)',
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--accent-primary-muted)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" aria-hidden />
              Disponível para novos projetos · +{projectsCount} entregas com sucesso
            </span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            variants={heroEntrance}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base uppercase tracking-[0.2em]"
            style={{ color: 'var(--foreground-muted)' }}
          >
            {heroTexts.greeting}
          </motion.p>

          {/* Desktop: coluna esquerda (h1 + subheadline + CTAs) | coluna direita (foto). Mobile: foto, depois h1, depois texto+CTAs */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
            {/* Coluna do texto: h1 e logo abaixo subheadline + CTAs */}
            <div className="flex-1 min-w-0 w-full order-2 lg:order-1 flex flex-col gap-2 md:gap-3">
              <motion.h1
                variants={heroEntrance}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-bold leading-[1.15] tracking-tight"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {heroTexts.headline}
              </motion.h1>
              {/* Subheadline e CTAs logo abaixo do h1 */}
              <div className="pt-1 md:pt-2 space-y-4 max-w-2xl">
            <motion.p
              variants={heroEntrance}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: 'var(--foreground-muted)' }}
            >
              {heroTexts.subheadline}
            </motion.p>

            <motion.div
              variants={heroEntrance}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3 sm:gap-4"
            >
            <button
              type="button"
              onClick={() => openWhatsApp()}
              className="group inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base text-[var(--primary-foreground)] transition-all duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] min-h-[44px]"
              style={{ backgroundColor: 'var(--accent-primary)' }}
            >
              Solicitar orçamento
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <a
              href="#work"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base border transition-all duration-200 hover:bg-[var(--surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] min-h-[44px]"
              style={{ borderColor: 'var(--border-strong)', color: 'var(--foreground)' }}
            >
              Ver cases
            </a>
            </motion.div>
              </div>
            </div>

            {/* Foto à direita (desktop) ou em cima (mobile) */}
            <motion.div
              className="flex justify-center lg:justify-end flex-shrink-0 order-1 lg:order-2"
              variants={heroEntrance}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="relative rounded-2xl overflow-hidden border-2 w-[min(280px,85vw)] lg:w-72 xl:w-80"
                style={{
                  aspectRatio: '1',
                  borderColor: 'var(--border-strong)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
                }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(34, 211, 238, 0.15) 100%)',
                  }}
                  aria-hidden
                />
                <img
                  src="/eu.png"
                  alt="Bruno Souza"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
