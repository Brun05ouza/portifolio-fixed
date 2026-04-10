/**
 * Conteúdo e dados estáticos do portfólio.
 * Edite aqui para alterar textos e configurações sem mexer na lógica de UI.
 */

import { ClockIcon, CoffeeIcon, FolderCodeIcon, RocketIcon } from 'lucide-animated';

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

/** Itens do header; ordem segue o scroll na página (há seções só no corpo, sem link no menu). */
export const navItems = [
  { id: 'home', href: '#home' },
  { id: 'services', href: '#services' },
  { id: 'about', href: '#about' },
  { id: 'work', href: '#work' },
  { id: 'cursos', href: '#cursos' },
  { id: 'certificados', href: '#certificados' },
  { id: 'stack', href: '#stack' },
  { id: 'contact', href: '#contact' },
] as const;

/** Valores padrão das métricas; rótulos vêm do i18n (`stats.${id}`). */
export const stats = [
  { id: 'lines', icon: FolderCodeIcon, value: 43500, color: '#22c55e' },
  { id: 'projects', icon: RocketIcon, value: 29, color: '#10b981' },
  { id: 'coffees', icon: CoffeeIcon, value: 350, color: '#f59e0b' },
  { id: 'hours', icon: ClockIcon, value: 1200, color: '#8b5cf6' },
] as const;

export const socialLinks = [
  { name: 'Email', href: 'mailto:brunosouzagithub2003@gmail.com', color: 'from-red-500 to-orange-500' },
  { name: 'GitHub', href: 'https://github.com/Brun05ouza', color: 'from-gray-700 to-gray-900' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/bruno-souza/', color: 'from-green-700 to-green-600' },
];
