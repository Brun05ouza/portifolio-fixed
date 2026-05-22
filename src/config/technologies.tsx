import type { ComponentType } from 'react';
import {
  SiCss3,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiSass,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
} from 'react-icons/si';
import { Code2 } from 'lucide-react';

type TechnologyIconComponent = ComponentType<{
  className?: string;
  color?: string;
  size?: number | string;
}>;

export interface TechnologyOption {
  id: string;
  label: string;
  color: string;
  icon: TechnologyIconComponent;
  aliases?: string[];
}

export const TECHNOLOGIES: TechnologyOption[] = [
  { id: 'React', label: 'React', color: '#61DAFB', icon: SiReact },
  { id: 'TypeScript', label: 'TypeScript', color: '#3178C6', icon: SiTypescript, aliases: ['TS'] },
  { id: 'JavaScript', label: 'JavaScript', color: '#F7DF1E', icon: SiJavascript, aliases: ['JS'] },
  { id: 'Next.js', label: 'Next.js', color: '#ffffff', icon: SiNextdotjs, aliases: ['Next'] },
  { id: 'Vite', label: 'Vite', color: '#B671FF', icon: SiVite },
  { id: 'Tailwind CSS', label: 'Tailwind', color: '#38BDF8', icon: SiTailwindcss, aliases: ['Tailwind'] },
  { id: 'HTML', label: 'HTML', color: '#E34F26', icon: SiHtml5, aliases: ['HTML5'] },
  { id: 'CSS', label: 'CSS', color: '#1572B6', icon: SiCss3, aliases: ['CSS3'] },
  { id: 'Sass', label: 'Sass', color: '#CC6699', icon: SiSass, aliases: ['SCSS'] },
  { id: 'Node.js', label: 'Node.js', color: '#5FA04E', icon: SiNodedotjs, aliases: ['Node'] },
  { id: 'Express', label: 'Express', color: '#ffffff', icon: SiExpress, aliases: ['Express.js'] },
  { id: 'PostgreSQL', label: 'PostgreSQL', color: '#4169E1', icon: SiPostgresql, aliases: ['Postgres'] },
  { id: 'MongoDB', label: 'MongoDB', color: '#47A248', icon: SiMongodb },
  { id: 'Prisma', label: 'Prisma', color: '#2D3748', icon: SiPrisma },
  { id: 'Firebase', label: 'Firebase', color: '#FFCA28', icon: SiFirebase },
  { id: 'Vercel', label: 'Vercel', color: '#ffffff', icon: SiVercel },
  { id: 'Figma', label: 'Figma', color: '#F24E1E', icon: SiFigma },
  { id: 'Framer', label: 'Framer', color: '#00A2FF', icon: SiFramer },
  { id: 'Three.js', label: 'Three.js', color: '#ffffff', icon: SiThreedotjs, aliases: ['Three'] },
  { id: 'GSAP', label: 'GSAP', color: '#88CE02', icon: SiGreensock },
  { id: 'Git', label: 'Git', color: '#F05032', icon: SiGit },
  { id: 'GitHub', label: 'GitHub', color: '#ffffff', icon: SiGithub },
];

function normalizeTechnologyName(value: string): string {
  return value.trim().toLowerCase().replace(/[\s._-]+/g, '');
}

export function getTechnology(name: string): TechnologyOption | undefined {
  const normalized = normalizeTechnologyName(name);
  return TECHNOLOGIES.find((technology) => {
    const names = [technology.id, technology.label, ...(technology.aliases ?? [])];
    return names.some((item) => normalizeTechnologyName(item) === normalized);
  });
}

export function TechnologyIcon({ name, size = 18 }: { name: string; size?: number }) {
  const technology = getTechnology(name);
  const Icon = technology?.icon ?? Code2;
  return <Icon aria-hidden="true" color={technology?.color ?? 'currentColor'} size={size} />;
}
