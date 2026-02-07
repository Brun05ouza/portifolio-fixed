import { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Code2, Rocket, Coffee, Clock } from 'lucide-react';
import { GlitchText } from './GlitchText';

const stats = [
  {
    icon: Code2,
    value: 43500,
    label: 'Linhas de Código',
    color: '#22c55e',
  },
  {
    icon: Rocket,
    value: 29,
    label: 'Projetos Concluídos',
    color: '#10b981',
  },
  {
    icon: Coffee,
    value: 350,
    label: 'Cafés Consumidos',
    color: '#f59e0b',
  },
  {
    icon: Clock,
    value: 1200,
    label: 'Horas de Estudo',
    color: '#8b5cf6',
  },
];

function AnimatedNumber({ value, format = (n) => n.toLocaleString('pt-BR') }: { value: number; format?: (n: number) => string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{format(displayValue)}</span>;
}

export function LiveStats() {
  return (
    <section id="stats" className="relative py-32 px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text="Estatísticas em Tempo Real" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Métricas da minha jornada como desenvolvedor
          </p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0 text-white"
                    style={{ backgroundColor: `${stat.color}25` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-2xl md:text-3xl font-bold tabular-nums"
                      style={{ color: stat.color }}
                    >
                      <AnimatedNumber
                        value={stat.value}
                        format={(n) => n.toLocaleString('pt-BR')}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
