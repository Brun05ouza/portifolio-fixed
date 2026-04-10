import { motion } from 'motion/react';
import { Code2, Database, Palette, Zap } from 'lucide-react';
import { GlitchText } from './GlitchText';
import TiltedCard from './TiltedCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useI18n } from '../../contexts/I18nContext';

const valueIcons = [
  <Zap className="w-6 h-6" key="z" />,
  <Code2 className="w-6 h-6" key="c" />,
  <Palette className="w-6 h-6" key="p" />,
  <Database className="w-6 h-6" key="d" />,
];

const timelineUrls = [
  'https://genesisempreendimentos.com.br',
  'https://alterdata.com.br',
  'https://unifeso.edu.br',
  undefined,
] as const;

export function About() {
  const reduceMotion = useReducedMotion();
  const { bundle } = useI18n();
  const a = bundle.about;

  return (
    <section id="about" className="relative py-16 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6">
      <motion.div
        className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-10"
        animate={reduceMotion ? false : { y: [0, 8, 0] }}
        transition={reduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-9 md:w-7 md:h-11 rounded-full border-2 border-foreground/40 flex items-start justify-center pt-2 md:pt-2.5 pb-1 flex-shrink-0 overflow-visible">
          <motion.div
            className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground/70 rounded-full flex-shrink-0"
            animate={reduceMotion ? false : { y: [0, 10, 0] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <span className="text-xs text-foreground/50 hidden md:inline">{a.scroll}</span>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text={a.title} />
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <TiltedCard
              imageSrc="/eu.png"
              altText={a.photoAlt}
              captionText={a.caption}
              containerHeight="min(280px, 75vw)"
              containerWidth="min(280px, 75vw)"
              imageHeight="min(280px, 75vw)"
              imageWidth="min(280px, 75vw)"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              reduceMotion={reduceMotion}
              displayOverlayContent
              overlayContent={<p className="tilted-card-demo-text">{a.caption}</p>}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{a.bio1}</p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{a.bio2}</p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">{a.bio3}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-20"
        >
          {a.values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-4 sm:p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div
                className="w-14 h-14 rounded-lg mb-4 flex items-center justify-center text-white"
                style={{
                  background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                }}
              >
                {valueIcons[index]}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">{a.trajectory}</h3>
          <div className="space-y-6 sm:space-y-8">
            {a.timeline.map((item, index) => {
              const url = timelineUrls[index];
              return (
                <motion.div
                  key={`${item.year}-${item.title}`}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                      }}
                    />
                    {index < a.timeline.length - 1 && (
                      <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-[var(--color-beam-end)] to-transparent" />
                    )}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="text-sm text-muted-foreground mb-1">{item.year}</div>
                    <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                    <div className="text-primary mb-2">
                      {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
