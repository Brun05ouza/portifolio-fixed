import { useMemo, type ReactNode } from 'react';
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
  SiExpress,
  SiNextdotjs,
  SiDocker,
  SiFigma,
} from 'react-icons/si';
import { GlitchText } from './GlitchText';
import { AnimatedList, SkillItem } from './AnimatedList';
import { useI18n } from '../../contexts/I18nContext';

type SkillMeta = {
  icon: ReactNode;
  name: string;
  level: number;
};

const feMeta: SkillMeta[] = [
  { icon: <SiHtml5 className="w-6 h-6" color="#E34F26" />, name: 'HTML & CSS', level: 85 },
  { icon: <SiJavascript className="w-6 h-6" color="#F7DF1E" />, name: 'JavaScript', level: 80 },
  { icon: <SiReact className="w-6 h-6" color="#61DAFB" />, name: 'React', level: 78 },
  { icon: <SiTailwindcss className="w-6 h-6" color="#06B6D4" />, name: 'Tailwind CSS', level: 75 },
  { icon: <SiTypescript className="w-6 h-6" color="#3178C6" />, name: 'TypeScript', level: 72 },
  { icon: <SiNextdotjs className="w-6 h-6" color="#FFFFFF" />, name: 'Next.js', level: 65 },
];

const beMeta: SkillMeta[] = [
  { icon: <SiNodedotjs className="w-6 h-6" color="#339933" />, name: 'Node.js', level: 70 },
  { icon: <SiSupabase className="w-6 h-6" color="#3ECF8E" />, name: 'Supabase', level: 70 },
  { icon: <SiExpress className="w-6 h-6" color="#68A063" />, name: 'Express', level: 68 },
  { icon: <SiPostgresql className="w-6 h-6" color="#4169E1" />, name: 'PostgreSQL', level: 65 },
  { icon: <SiMongodb className="w-6 h-6" color="#47A248" />, name: 'MongoDB', level: 60 },
];

const toolsMeta: SkillMeta[] = [
  { icon: <SiGit className="w-6 h-6" color="#F05032" />, name: 'Git', level: 85 },
  { icon: <SiVite className="w-6 h-6" color="#646CFF" />, name: 'Vite', level: 78 },
  { icon: <SiFigma className="w-6 h-6" color="#F24E1E" />, name: 'Figma', level: 70 },
  { icon: <SiSupabase className="w-6 h-6" color="#3ECF8E" />, name: 'Supabase (CMS)', level: 72 },
  { icon: <SiDocker className="w-6 h-6" color="#2496ED" />, name: 'Docker', level: 10 },
];

function zipSkills(meta: SkillMeta[], descriptions: readonly string[]) {
  return meta.map((m, i) => ({
    icon: m.icon,
    name: m.name,
    level: m.level,
    description: descriptions[i] ?? '',
  }));
}

export function Stack() {
  const { bundle } = useI18n();
  const { title, subtitle, continuousTitle, continuousBody, cats, fe, be, tools } = bundle.stack;

  const skillCategories = useMemo(
    () => [
      {
        title: cats[0],
        icon: <Code2 className="w-6 h-6" />,
        skills: zipSkills(feMeta, fe),
      },
      {
        title: cats[1],
        icon: <Database className="w-6 h-6" />,
        skills: zipSkills(beMeta, be),
      },
      {
        title: cats[2],
        icon: <Wrench className="w-6 h-6" />,
        skills: zipSkills(toolsMeta, tools),
      },
    ],
    [cats, fe, be, tools]
  );

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
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  ];

  return (
    <section id="stack" className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-10 sm:mb-14 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <GlitchText text={title} />
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          <div className="w-20 h-1 mx-auto mt-6 rounded-full" style={{ background: 'linear-gradient(to right, var(--color-beam-start), var(--color-beam-end))' }} />
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {techStack.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={tech.name}
                className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 rounded-full font-semibold text-sm sm:text-base shadow-lg flex items-center gap-1.5 sm:gap-2 bg-card border border-border hover:border-primary/50 transition-colors"
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

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-beam-start), var(--color-beam-end))',
                  }}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{category.title}</h3>
              </div>

              <AnimatedList className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skill.name} {...skill} />
                ))}
              </AnimatedList>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 sm:mt-16 p-4 sm:p-6 md:p-8 rounded-2xl bg-card border border-border text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Layers className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-lg sm:text-xl font-bold mb-2">{continuousTitle}</h3>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">{continuousBody}</p>
        </motion.div>
      </div>
    </section>
  );
}
