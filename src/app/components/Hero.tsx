import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { GlitchText } from './GlitchText';
import RotatingText from './RotatingText';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Avatar/Photo with glow */}
          <motion.div
            className="relative inline-block"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 200 }}
          >
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-full opacity-70 blur-xl animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, var(--color-glow), var(--color-beam-end))',
                }}
              />
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl">
                <img
                  src="/eu.png"
                  alt="Bruno Souza"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Title with glitch effect */}
          <div className="space-y-4">
            <motion.p
              className="text-lg uppercase tracking-widest"
              style={{ color: 'var(--color-glow)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Olá, eu sou Bruno Souza
            </motion.p>
            
            <h1 className="text-5xl md:text-7xl font-bold flex flex-col items-center">
              <GlitchText text="Apaixonado por" className="block mb-2" />
              <span className="flex justify-center w-full">
                <RotatingText
                  texts={['Desenvolvimento', 'Tecnologia', 'Café']}
                  mainClassName="inline-block overflow-hidden min-w-[180px] pb-4 md:pb-6"
                  elementLevelClassName="bg-gradient-to-r from-[var(--color-beam-start)] via-[var(--color-chroma-3)] to-[var(--color-beam-end)] bg-clip-text text-transparent"
                  staggerFrom="last"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-120%' }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-visible"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                  rotationInterval={2500}
                />
              </span>
            </h1>

            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Estudante de desenvolvimento apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <motion.div
            className="flex items-center justify-center gap-4 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="#work"
              className="group relative px-8 py-4 rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                Ver Projetos
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </a>

            <a
              href="#stack"
              className="px-8 py-4 rounded-full overflow-hidden group relative"
              style={{
                background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
              }}
            >
              <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                Dashboard Técnico
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="#contact"
              className="px-8 py-4 rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-semibold flex items-center gap-2"
            >
              Entre em Contato
            </a>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}