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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
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
                {/* Mobile: card com borda e timeline; desktop: layout simples */}
                <div className="flex flex-col h-full rounded-xl p-4 sm:p-0 sm:rounded-none border border-[var(--border)] sm:border-0 min-h-0 bg-[var(--surface)] sm:bg-transparent">
                  <div className="flex items-start gap-4 sm:gap-0 sm:flex-col">
                    <div className="flex items-center gap-3 shrink-0 sm:mb-4">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:hidden"
                        style={{
                          backgroundColor: 'var(--accent-primary)',
                          color: 'var(--background)',
                        }}
                      >
                        {index + 1}
                      </span>
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: 'var(--accent-primary-muted)', color: 'var(--accent-primary)' }}
                      >
                        <Icon className="w-5 h-5" aria-hidden />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5 sm:pt-0">
                      <h3 className="text-base font-semibold text-foreground mb-2.5 sm:text-lg sm:mb-3">
                        {step.title}
                      </h3>
                      <ul className="space-y-2 text-sm flex-1" style={{ color: 'var(--foreground-muted)' }}>
                        {step.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2">
                            <span className="text-[var(--accent-primary)] mt-1.5 shrink-0">·</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}