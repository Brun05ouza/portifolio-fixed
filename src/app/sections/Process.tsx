import { motion } from 'motion/react';
import { Container } from '../components/ds/Container';
import { SectionTitle } from '../components/ds/SectionTitle';
import { Search, PencilRuler, Code2, Rocket } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const steps = [
  {
    title: 'Descoberta',
    icon: Search,
    deliverables: ['Brief e alinhamento de objetivos', 'Análise de concorrência e referências', 'Escopo e cronograma'],
  },
  {
    title: 'Design / Arquitetura',
    icon: PencilRuler,
    deliverables: ['Wireframes e fluxos', 'Arquitetura técnica e stack', 'Backlog priorizado'],
  },
  {
    title: 'Implementação',
    icon: Code2,
    deliverables: ['Desenvolvimento iterativo', 'Code review e boas práticas', 'CI e testes automatizados'],
  },
  {
    title: 'Deploy e Observabilidade',
    icon: Rocket,
    deliverables: ['Deploy em produção', 'Monitoramento e métricas', 'Documentação e handoff'],
  },
];

export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="process" className="relative py-14 sm:py-20 md:py-28 border-t border-[var(--border)]">
      <Container>
        <SectionTitle
          label="Como eu trabalho"
          title="Processo em 4 etapas"
          subtitle="Da descoberta ao deploy, com entregáveis claros em cada fase."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reduceMotion ? 0 : 0.4, delay: index * 0.08 }}
              >
                <div className="flex flex-col h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--accent-primary-muted)', color: 'var(--accent-primary)' }}
                  >
                    <Icon className="w-5 h-5" aria-hidden />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{step.title}</h3>
                  <ul className="space-y-2 text-sm flex-1" style={{ color: 'var(--foreground-muted)' }}>
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <span className="text-[var(--accent-primary)] mt-1.5 shrink-0">·</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}