import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { Cpu, Brain, LayoutDashboard, Sparkles } from 'lucide-react';
import { GlobeAnimation } from './GlobeAnimation';
import Galaxy from './Galaxy';

export function TccEcoSphere() {
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
    <section id="tcc" className="relative py-32 px-6 overflow-hidden">
      {/* Galaxy background - apenas nesta seção */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={200}
          twinkleIntensity={0.3}
          rotationSpeed={0.08}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
          mouseInteraction
          mouseRepulsion
          transparent
        />
      </div>
      <div className="absolute inset-0 z-[1] bg-background/40 pointer-events-none" />
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
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
          <div className="w-20 h-1 mx-auto mt-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
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
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlobeAnimation size={160} className="rounded-full overflow-hidden border-2 border-primary/40 shadow-lg shadow-primary/20 ring-2 ring-primary/10" />
        </motion.div>
      </div>
    </section>
  );
}
