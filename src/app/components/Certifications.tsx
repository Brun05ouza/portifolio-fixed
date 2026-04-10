import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { Award } from 'lucide-react';
import { listCertificatesPublic } from '../../services/portfolioDb';
import { useI18n } from '../../contexts/I18nContext';
import type { CertificateWithId } from '../../types/portfolio';
import { getCertIcon } from '../../config/certIcons';
import { Loader2 } from 'lucide-react';

const INITIAL_COUNT = 4;

export function Certifications() {
  const { bundle } = useI18n();
  const cert = bundle.certifications;
  const [items, setItems] = useState<CertificateWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const list = await listCertificatesPublic();
      if (!cancelled) {
        setItems(list);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = isExpanded ? items : items.slice(0, INITIAL_COUNT);

  return (
    <section id="certificados" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text={cert.title} />
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {cert.subtitle}
          </p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            {cert.empty}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {visible.map((cert, index) => {
                const IconComponent = cert.imageUrl?.trim()
                  ? null
                  : getCertIcon(cert.iconId);
                return (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: isExpanded ? index * 0.05 : 0 }}
                    className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group flex flex-col"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{
                          backgroundColor: cert.imageUrl?.trim() ? 'transparent' : `${cert.color}20`,
                        }}
                      >
                        {cert.imageUrl?.trim() ? (
                          <img
                            src={cert.imageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                            width={48}
                            height={48}
                          />
                        ) : IconComponent ? (
                          <IconComponent className="w-6 h-6" style={{ color: cert.color }} />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm leading-tight">{cert.title}</h3>
                        <p className="text-primary text-sm mt-1">{cert.provider}</p>
                        <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                      <Award className="w-4 h-4 flex-shrink-0" />
                      <span>{cert.verified}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {items.length > INITIAL_COUNT && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="inline-block w-full sm:w-auto px-6 py-3 rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-semibold text-sm sm:text-base min-h-[44px] sm:min-h-0"
                >
                  {isExpanded ? cert.showLess : cert.showAll}
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
