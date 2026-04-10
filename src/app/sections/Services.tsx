import { motion } from 'motion/react';
import { Container } from '../components/ds/Container';
import { SectionTitle } from '../components/ds/SectionTitle';
import { useSiteContent } from '../../contexts/SiteContentContext';
import { useI18n } from '../../contexts/I18nContext';
import { Cloud, Building2, LayoutTemplate, Gauge } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const serviceIcons = [Cloud, Building2, LayoutTemplate, Gauge] as const;

export function Services() {
  const { openSiteWhatsApp } = useSiteContent();
  const { bundle } = useI18n();
  const reduceMotion = useReducedMotion();
  const { label, title, subtitle, items, cta, whatsapp } = bundle.services;

  return (
    <section id="services" className="relative py-14 sm:py-20 md:py-28">
      <Container>
        <SectionTitle label={label} title={title} subtitle={subtitle} />

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.article
                key={service.title}
                className="group relative rounded-2xl border p-4 sm:p-6 md:p-8 h-full flex flex-col transition-all duration-300 hover:border-[var(--border-strong)] focus-within:ring-2 focus-within:ring-[var(--ring)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]"
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: index * 0.06 }}
                whileHover={reduceMotion ? undefined : { y: -4, boxShadow: 'var(--shadow-md)' }}
              >
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--accent-primary-muted), transparent 40%)',
                  }}
                  aria-hidden
                />
                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: 'var(--accent-primary-muted)', color: 'var(--accent-primary)' }}
                  >
                    <Icon className="w-6 h-6" aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--foreground-muted)' }}>
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                        <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[var(--accent-primary)]" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => openSiteWhatsApp(whatsapp.replace('{title}', service.title))}
                    className="text-sm font-semibold transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 rounded-lg px-4 py-2 -ml-2"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    {cta}
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
