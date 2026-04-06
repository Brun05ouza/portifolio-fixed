import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Lottie from 'lottie-react';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import preloaderCodeIcon from '../../assets/preloader-code-icon.json';

interface PreloaderProps {
  onComplete: () => void;
}

const PHRASE_LINE1 = 'Olá, seja bem-vindo ao meu...';
const PHRASE_LINE2 = 'Portfólio';

const LOADING_PHRASES = [
  'Carregando meus conhecimentos...',
  'Colocando o café na cafeteira...',
  'Quase lá...',
];

const PHRASE_DURATION_MS = 650;
const TOTAL_PHRASES_TIME_MS = LOADING_PHRASES.length * PHRASE_DURATION_MS;
const WELCOME_TIME_MS = 700;
const CURTAIN_DURATION_MS = 420;

export function Preloader({ onComplete }: PreloaderProps) {
  const [curtainUp, setCurtainUp] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Ciclo das frases de carregamento
  useEffect(() => {
    if (reduceMotion) return;
    const t = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % LOADING_PHRASES.length);
    }, PHRASE_DURATION_MS);
    return () => clearInterval(t);
  }, [reduceMotion]);

  // Depois da mensagem de boas-vindas + todas as frases, sobe a cortina
  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return;
    }
    const t = setTimeout(() => {
      setCurtainUp(true);
    }, WELCOME_TIME_MS + TOTAL_PHRASES_TIME_MS);
    return () => clearTimeout(t);
  }, [onComplete, reduceMotion]);

  // Quando a cortina terminar de subir, avisa o App
  useEffect(() => {
    if (!curtainUp || reduceMotion) return;
    const t = setTimeout(() => {
      onComplete();
    }, CURTAIN_DURATION_MS);
    return () => clearTimeout(t);
  }, [curtainUp, onComplete, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black px-4 sm:px-6"
      initial={false}
      animate={{ y: curtainUp ? '-100%' : 0 }}
      transition={{ duration: CURTAIN_DURATION_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: curtainUp ? 'transform' : 'auto' }}
    >
      <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div
            className="rounded-2xl flex items-center justify-center"
            style={{
              width: 72,
              height: 72,
              backgroundColor: 'rgba(34, 211, 238, 0.2)',
              color: 'var(--accent-primary)',
            }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(34, 211, 238, 0.25)',
                '0 0 0 16px rgba(34, 211, 238, 0)',
              ],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              repeatDelay: 0.2,
            }}
          >
            <Lottie
              animationData={preloaderCodeIcon}
              loop
              style={{ width: 44, height: 44 }}
              aria-hidden
            />
          </motion.div>
        </motion.div>

        <div className="text-center max-w-md">
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 mb-2 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
          >
            {PHRASE_LINE1}
          </motion.p>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.35 }}
            style={{ color: '#22d3ee' }}
          >
            {PHRASE_LINE2}
          </motion.p>
        </div>

        {/* Ícone de carregamento + frase que alterna */}
        <div className="flex flex-col items-center gap-4 min-h-[80px]">
          <Loader2
          className="w-8 h-8 animate-spin text-white/80"
          style={{ color: '#22d3ee' }}
          strokeWidth={2}
          aria-hidden
        />
        <AnimatePresence mode="wait">
          <motion.p
            key={phraseIndex}
            className="text-sm md:text-base text-white/70 text-center max-w-xs"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
          >
            {LOADING_PHRASES[phraseIndex]}
          </motion.p>
        </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
