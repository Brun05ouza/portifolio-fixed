import { motion } from 'motion/react';
import { Code2, Database, Palette, Zap } from 'lucide-react';
import { GlitchText } from './GlitchText';
import TiltedCard from './TiltedCard';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export function About() {
  const reduceMotion = useReducedMotion();
  const values = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Performance',
      description: 'Otimização constante para experiências rápidas e fluidas',
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Código Limpo',
      description: 'Manutenibilidade e escalabilidade como prioridade',
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'UX/UI Híbrido',
      description: 'Visão completa do produto, do design ao código',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Full Stack',
      description: 'Domínio completo desde o front-end até bancos de dados',
    },
  ];

  const timeline = [
    {
      year: '2026 - Presente',
      title: 'Desenvolvedor Web / Design',
      company: 'Gênesis Empreendimentos',
      description: 'Desenvolvimento de landing pages e aplicações internas',
      url: 'https://genesisempreendimentos.com/',
    },
    {
      year: '2023 - 2026',
      title: 'Suporte Técnico Especializado nos Sistemas',
      company: 'Alterdata Software',
      description: 'Suporte especializado nos sistemas da Alterdata',
      url: 'https://alterdata.com.br',
    },
    {
      year: '2023 - 2026',
      title: 'Graduação em Ciência da Computação',
      company: 'Unifeso - Universidade Serra dos Órgãos',
      description: 'Formação em análise de sistemas e programação',
      url: 'https://unifeso.edu.br',
    },
    {
      year: '2022 - 2026',
      title: 'Estudante de Desenvolvimento Web',
      company: 'Cursos Alura e estudos autônomos',
      description: 'Aprimorando habilidades em HTML, CSS, JavaScript, React e bancos de dados',
      url: undefined,
    },
  ];

  return (
    <section id="about" className="relative py-32 px-6">
      {/* Scroll indicator - acima de Sobre Mim */}
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
        <span className="text-xs text-foreground/50 hidden md:inline">Scroll</span>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text="Sobre Mim" />
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        {/* Bio section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            <TiltedCard
              imageSrc="/eu.png"
              altText="Bruno Souza - Desenvolvedor"
              captionText="Bruno Souza - Desenvolvedor Front End"
              containerHeight="320px"
              containerWidth="320px"
              imageHeight="320px"
              imageWidth="320px"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              reduceMotion={reduceMotion}
              displayOverlayContent
              overlayContent={
                <p className="tilted-card-demo-text">
                  Bruno Souza - Desenvolvedor Front End
                </p>
              }
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 flex flex-col justify-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Estudante de desenvolvimento web com conhecimentos em{' '}
              <span className="text-foreground font-semibold">HTML</span>,{' '}
              <span className="text-foreground font-semibold">CSS</span>,{' '}
              <span className="text-foreground font-semibold">JavaScript</span>,{' '}
              <span className="text-foreground font-semibold">React</span> e{' '}
              <span className="text-foreground font-semibold">bancos de dados</span>.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Atualmente cursando e aprimorando minhas habilidades em tecnologias modernas para me tornar
              um desenvolvedor completo. Desenvolvi o EcoSphere como TCC — uma plataforma de sustentabilidade
              com IA, gamificação e monitoramento ambiental em tempo real.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades
              e contribuir com soluções que façam a diferença.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {values.map((value, index) => (
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
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mini Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Trajetória</h3>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
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
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 mt-2 bg-gradient-to-b from-[var(--color-beam-end)] to-transparent" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-sm text-muted-foreground mb-1">{item.year}</div>
                  <h4 className="text-xl font-semibold mb-1">{item.title}</h4>
                  <div className="text-primary mb-2">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.company}
                      </a>
                    ) : (
                      item.company
                    )}
                  </div>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}