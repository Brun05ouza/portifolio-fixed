import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { Cpu, Brain, LayoutDashboard, Sparkles } from 'lucide-react';
import { GlobeAnimation } from './GlobeAnimation';

export function TccEcoSphere() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => setIsInView(e.isIntersecting));
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Só monta o globo após a seção estar em view + pequeno delay para não travar o scroll
  useEffect(() => {
    if (!isInView) {
      setGlobeReady(false);
      return;
    }
    const t = setTimeout(() => setGlobeReady(true), 300);
    return () => clearTimeout(t);
  }, [isInView]);

  const features = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'IoT Sensors',
      description: 'Sensores inteligentes para coleta de dados ambientais',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Machine Learning',
      description: 'Algoritmos preditivos para análise ambiental',
    },
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: 'Dashboard Real-time',
      description: 'Visualização de dados em tempo real',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Classificação de Resíduos com IA',
      description: 'TensorFlow.js + Google Teachable Machine para categorização automática',
    },
  ];

  return (
    <section ref={sectionRef} id="tcc" className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-sm font-medium tracking-wide uppercase mb-3"
            style={{ color: 'var(--accent-primary)' }}
          >
            TCC — Trabalho de conclusão de curso
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text="EcoSphere" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            Sistema de Monitoramento Ambiental
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Plataforma inovadora que integra IoT, Machine Learning e análise de dados em tempo real 
            para monitoramento e preservação ambiental.
          </p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div
                className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://github.com/Brun05ouza/Tcc-EcoSphere"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white"
            style={{
              background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
            }}
          >
            Ver Projeto Completo →
          </a>
        </motion.div>

        <motion.div
          className="flex justify-center mt-8 min-h-[220px] items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {globeReady ? (
            <GlobeAnimation size={220} light className="rounded-full overflow-hidden border-2 border-primary/40 shadow-lg shadow-primary/20 ring-2 ring-primary/10" />
          ) : (
            <div className="w-[220px] h-[220px] rounded-full border-2 border-primary/20 bg-card/50 flex items-center justify-center" aria-hidden>
              <span className="text-sm text-muted-foreground">Carregando...</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
