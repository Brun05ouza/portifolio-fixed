import { motion } from 'motion/react';
import { GlitchText } from '../components/GlitchText';
import { Quote, CheckCircle2 } from 'lucide-react';

const testimonials = [
  {
    quote: 'Profissional comprometido e entrega no prazo. O sistema superou nossas expectativas.',
    author: 'Cliente A',
    role: 'Gestor de TI',
  },
  {
    quote: 'Comunicação clara e solução técnica alinhada ao negócio. Recomendo.',
    author: 'Cliente B',
    role: 'Fundador, Startup X',
  },
  {
    quote: 'Desenvolvimento ágil e foco em performance. Parceria que vale a pena.',
    author: 'Cliente C',
    role: 'Product Owner',
  },
];

const stats = [
  { value: '+29', label: 'projetos entregues' },
  { value: '+15', label: 'sistemas desenvolvidos' },
  { value: '100%', label: 'foco em performance' },
];

/** Exibir depoimentos (comentários). Ative quando tiver depoimentos reais. */
const SHOW_TESTIMONIALS = false;

export function SocialProof() {
  return (
    <section id="social-proof" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text="Prova social" />
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Depoimentos e números que refletem o compromisso com resultados
          </p>
          <div
            className="w-20 h-1 mx-auto mt-6 rounded-full"
            style={{
              background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))',
            }}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((item, index) => (
            <div
              key={item.label}
              className="text-center p-4 sm:p-6 rounded-xl bg-card/80 border border-border"
            >
              <div
                className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1"
                style={{ color: 'var(--color-glow)' }}
              >
                {item.value}
              </div>
              <div className="text-sm text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </motion.div>

        {SHOW_TESTIMONIALS && (
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-6 rounded-xl bg-card/80 border border-border flex flex-col"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{t.author}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
