import { motion } from 'motion/react';
import { Code2, Database, Layers, Wrench } from 'lucide-react';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiGit,
  SiMongodb,
  SiPostgresql,
  SiSupabase,
  SiVite,
  SiTailwindcss,
  SiFirebase,
  SiExpress,
  SiNextdotjs,
  SiDocker,
  SiFigma,
} from 'react-icons/si';
import { GlitchText } from './GlitchText';
import { AnimatedList, SkillItem } from './AnimatedList';

export function Stack() {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: <Code2 className="w-6 h-6" />,
      skills: [
        {
          icon: <SiHtml5 className="w-6 h-6" color="#E34F26" />,
          name: 'HTML & CSS',
          level: 85,
          description: 'Estrutura e estilo - responsividade com mobile-first',
        },
        {
          icon: <SiJavascript className="w-6 h-6" color="#F7DF1E" />,
          name: 'JavaScript',
          level: 80,
          description: 'Tipos, variáveis, funções e manipulação do DOM',
        },
        {
          icon: <SiReact className="w-6 h-6" color="#61DAFB" />,
          name: 'React',
          level: 78,
          description: 'Componentes, hooks e aplicações interativas',
        },
        {
          icon: <SiTailwindcss className="w-6 h-6" color="#06B6D4" />,
          name: 'Tailwind CSS',
          level: 75,
          description: 'Utility-first CSS e design systems',
        },
        {
          icon: <SiTypescript className="w-6 h-6" color="#3178C6" />,
          name: 'TypeScript',
          level: 72,
          description: 'Tipagem estática e desenvolvimento type-safe',
        },
        {
          icon: <SiNextdotjs className="w-6 h-6" color="#FFFFFF" />,
          name: 'Next.js',
          level: 65,
          description: 'React com SSR, SSG e rotas dinâmicas',
        },
      ],
    },
    {
      title: 'Backend',
      icon: <Database className="w-6 h-6" />,
      skills: [
        {
          icon: <SiNodedotjs className="w-6 h-6" color="#339933" />,
          name: 'Node.js',
          level: 70,
          description: 'APIs RESTful e desenvolvimento server-side',
        },
        {
          icon: <SiSupabase className="w-6 h-6" color="#3ECF8E" />,
          name: 'Supabase',
          level: 70,
          description: 'BaaS com PostgreSQL, Auth e Realtime',
        },
        {
          icon: <SiExpress className="w-6 h-6" color="#68A063" />,
          name: 'Express',
          level: 68,
          description: 'Framework web para Node.js',
        },
        {
          icon: <SiPostgresql className="w-6 h-6" color="#4169E1" />,
          name: 'PostgreSQL',
          level: 65,
          description: 'Bancos de dados relacionais',
        },
        {
          icon: <SiMongodb className="w-6 h-6" color="#47A248" />,
          name: 'MongoDB',
          level: 60,
          description: 'Banco de dados NoSQL',
        },
      ],
    },
    {
      title: 'Ferramentas & Estudando',
      icon: <Wrench className="w-6 h-6" />,
      skills: [
        {
          icon: <SiGit className="w-6 h-6" color="#F05032" />,
          name: 'Git',
          level: 85,
          description: 'Controle de versão e workflows colaborativos',
        },
        {
          icon: <SiVite className="w-6 h-6" color="#646CFF" />,
          name: 'Vite',
          level: 78,
          description: 'Build tool rápido e moderno',
        },
        {
          icon: <SiFigma className="w-6 h-6" color="#F24E1E" />,
          name: 'Figma',
          level: 70,
          description: 'Design de interfaces e prototipagem',
        },
        {
          icon: <SiFirebase className="w-6 h-6" color="#FFCA28" />,
          name: 'Firebase',
          level: 65,
          description: 'Autenticação, Firestore e serviços em nuvem',
        },
        {
          icon: <SiDocker className="w-6 h-6" color="#2496ED" />,
          name: 'Docker',
          level: 10,
          description: 'Containerização e orquestração',
        },
      ],
    },
  ];

  const techStack = [
    { name: 'HTML', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS', icon: SiCss3, color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'Express', icon: SiExpress, color: '#68A063' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  ];

  return (
    <section id="stack" className="relative py-32 px-6 overflow-hidden">
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
            <GlitchText text="Skills Interativas" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologias e ferramentas que utilizo nos meus projetos
          </p>
          <div className="w-20 h-1 mx-auto mt-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full" />
        </motion.div>

        {/* Tech stack badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {techStack.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={index}
                className="px-5 py-3 rounded-full font-semibold shadow-lg flex items-center gap-2 bg-card border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <IconComponent size={22} color={tech.color} />
                <span className="text-foreground">{tech.name}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Skill categories */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                  }}
                >
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold">{category.title}</h3>
              </div>

              {/* Skills */}
              <AnimatedList className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} {...skill} />
                ))}
              </AnimatedList>
            </motion.div>
          ))}
        </div>

        {/* Additional info */}
        <motion.div
          className="mt-16 p-8 rounded-2xl bg-card border border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Layers className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-xl font-bold mb-2">Aprendizado Contínuo</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sempre explorando novas tecnologias. Aprimorando habilidades em TypeScript, 
            Next.js e integração com IA para me tornar um desenvolvedor completo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}