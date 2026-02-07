import { useState } from 'react';
import { motion } from 'motion/react';
import { GlitchText } from './GlitchText';
import { Award } from 'lucide-react';
import {
  SiJavascript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiTypescript,
  SiExpress,
  SiGit,
} from 'react-icons/si';

const initialCertifications = [
  { title: 'JavaScript: utilizando tipos, variáveis e funções', provider: 'Alura', icon: SiJavascript, color: '#F7DF1E', year: '2024/2025' },
  { title: 'React Basics', provider: 'Alura', icon: SiReact, color: '#61DAFB', year: '2024/2025' },
  { title: 'HTML e CSS: responsividade com mobile-first', provider: 'Alura', icon: SiHtml5, color: '#E34F26', year: '2024/2025' },
  { title: 'HTML e CSS: praticando HTML/CSS', provider: 'Alura', icon: SiCss3, color: '#1572B6', year: '2024/2025' },
];

const expandedCertifications = [
  ...initialCertifications,
  { title: 'HTML5 e CSS3', provider: 'Alura', icon: SiHtml5, color: '#E34F26', year: '2024' },
  { title: 'JavaScript para Backend', provider: 'Alura', icon: SiNodedotjs, color: '#339933', year: '2024' },
  { title: 'Node.js e Express', provider: 'Alura', icon: SiExpress, color: '#68A063', year: '2024' },
  { title: 'TypeScript', provider: 'Alura', icon: SiTypescript, color: '#3178C6', year: '2024' },
  { title: 'Responsive Design', provider: 'Alura', icon: SiCss3, color: '#1572B6', year: '2024' },
  { title: 'Git e GitHub', provider: 'Alura', icon: SiGit, color: '#F05032', year: '2024' },
  { title: 'APIs REST', provider: 'Alura', icon: SiExpress, color: '#68A063', year: '2024' },
];

export function Certifications() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="certificados" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text="Certificações" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Cursos e certificações concluídos
          </p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(isExpanded ? expandedCertifications : initialCertifications).map((cert, index) => {
            const IconComponent = cert.icon;
            return (
              <motion.div
                key={`${cert.title}-${cert.year}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: isExpanded ? index * 0.05 : 0 }}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${cert.color}20` }}
                  >
                    <IconComponent className="w-6 h-6" style={{ color: cert.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm leading-tight">{cert.title}</h3>
                    <p className="text-primary text-sm mt-1">{cert.provider}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.year}</p>
                  </div>
                </div>
                <div className="mt-auto flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                  <Award className="w-4 h-4 flex-shrink-0" />
                  <span>Verificado</span>
                </div>
              </motion.div>
            );
          })}
        </div>

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
            className="inline-block px-6 py-3 rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-semibold"
          >
            {isExpanded ? 'Ver menos ←' : 'Ver Todos os Certificados →'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
