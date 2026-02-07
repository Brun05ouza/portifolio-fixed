import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProjectCard } from './ProjectCard';
import { GlitchText } from './GlitchText';
import { fetchUserRepos } from '../services/githubService';
import type { ProjectFromRepo } from '../services/githubService';
import { Loader2 } from 'lucide-react';

export function Projects() {
  const [projects, setProjects] = useState<ProjectFromRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserRepos(50).then((repos) => {
      setProjects(repos);
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
            href="https://github.com/Brun05ouza"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 rounded-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-semibold"
          >
            Ver Meus Projetos
          </a>
        </motion.div>
      </div>
    </section>
  );
}