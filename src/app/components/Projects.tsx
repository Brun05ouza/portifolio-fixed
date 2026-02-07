import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { GlitchText } from './GlitchText';
import { fetchUserRepos } from '../services/githubService';
import { Loader2, AlertCircle } from 'lucide-react';
import { siteConfig } from '../../config/content';

export function Projects() {
  const [projects, setProjects] = useState<Awaited<ReturnType<typeof fetchUserRepos>>['projects']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserRepos(50).then(({ projects, error }) => {
      setProjects(projects);
      setError(error);
      setLoading(false);
    });
  }, []);

  return (
    <section id="work" className="relative py-32 px-6 overflow-hidden">
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
            <GlitchText text="Projetos" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Projetos desenvolvidos durante minha jornada de aprendizado
          </p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-xl bg-muted/50 border border-border flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Aviso</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Projects grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {projects.map((project, index) => (
              <motion.div
                key={project.githubLink}
                className="flex"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            Nenhum repositório encontrado. Verifique sua conexão ou o usuário do GitHub.
          </p>
        )}

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Ver Meus Projetos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
