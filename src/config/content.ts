/**
 * Conteúdo e dados estáticos do portfólio.
 * Edite aqui para alterar textos e configurações sem mexer na lógica de UI.
 */

import type { LucideIcon } from 'lucide-react';
import { Code2, Rocket, Coffee, Clock } from 'lucide-react';

export const siteConfig = {
  githubUser: import.meta.env.VITE_GITHUB_USER || 'Brun05ouza',
  formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
  contactEmail: 'brunosouzagithub2003@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/bruno-souza/',
  githubUrl: 'https://github.com/Brun05ouza',
  /** Número WhatsApp formato internacional sem + (ex: 5521965272231). Usado por openWhatsApp(). */
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '5521965272231',
  /** URL do Calendly para agendamento (ex: https://calendly.com/seu-link). */
  calendlyUrl: import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/SEU_LINK_AQUI',
};

export const navItems = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'services', label: 'Serviços', href: '#services' },
  { id: 'work', label: 'Cases', href: '#work' },
  { id: 'process', label: 'Processo', href: '#process' },
  { id: 'about', label: 'Sobre', href: '#about' },
  { id: 'stack', label: 'Skills', href: '#stack' },
  { id: 'certificados', label: 'Certificados', href: '#certificados' },
  { id: 'contact', label: 'Contato', href: '#contact' },
];

export const stats = [
  { icon: Code2 as LucideIcon, value: 43500, label: 'Linhas de Código', color: '#22c55e' },
  { icon: Rocket as LucideIcon, value: 29, label: 'Projetos Concluídos', color: '#10b981' },
  { icon: Coffee as LucideIcon, value: 350, label: 'Cafés Consumidos', color: '#f59e0b' },
  { icon: Clock as LucideIcon, value: 1200, label: 'Horas de Estudo', color: '#8b5cf6' },
];

export const heroTexts = {
  greeting: 'Olá, eu sou Bruno Souza',
  headline: 'Desenvolvo sistemas web escaláveis e experiências digitais de alto impacto.',
  subheadline: 'Especialista em SaaS, plataformas empresariais e interfaces modernas com foco em performance e conversão.',
  rotating: ['Desenvolvimento', 'Tecnologia', 'Café'],
  prefix: 'Apaixonado por',
  subtitle: 'Estudante de desenvolvimento apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades',
};

export const socialLinks = [
  { name: 'Email', href: 'mailto:brunosouzagithub2003@gmail.com', color: 'from-red-500 to-orange-500' },
  { name: 'GitHub', href: 'https://github.com/Brun05ouza', color: 'from-gray-700 to-gray-900' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/bruno-souza/', color: 'from-green-700 to-green-600' },
];
