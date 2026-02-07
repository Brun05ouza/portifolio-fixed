/**
 * Conteúdo e dados estáticos do portfólio.
 * Edite aqui para alterar textos e configurações sem mexer na lógica de UI.
 */

import type { LucideIcon } from 'lucide-react';
import { Code2, Rocket, Coffee, Clock } from 'lucide-react';

export const siteConfig = {
  githubUser: import.meta.env.VITE_GITHUB_USER || 'Brun05ouza',
  contactEmail: 'brunosouzagithub2003@gmail.com',
  linkedinUrl: 'https://www.linkedin.com/in/bruno-souza/',
  githubUrl: 'https://github.com/Brun05ouza',
  formEndpoint: import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '',
};

export const navItems = [
  { id: 'home', label: 'Início', href: '#home' },
  { id: 'about', label: 'Sobre', href: '#about' },
  { id: 'work', label: 'Projetos', href: '#work' },
  { id: 'certificados', label: 'Certificados', href: '#certificados' },
  { id: 'stack', label: 'Skills', href: '#stack' },
  { id: 'git-commands', label: 'Terminal', href: '#git-commands' },
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
  rotating: ['Desenvolvimento', 'Tecnologia', 'Café'],
  prefix: 'Apaixonado por',
  subtitle: 'Estudante de desenvolvimento apaixonado por tecnologia, aprendendo e criando projetos para evoluir minhas habilidades',
};

export const socialLinks = [
  { name: 'Email', href: 'mailto:brunosouzagithub2003@gmail.com', color: 'from-red-500 to-orange-500' },
  { name: 'GitHub', href: 'https://github.com/Brun05ouza', color: 'from-gray-700 to-gray-900' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/bruno-souza/', color: 'from-green-700 to-green-600' },
];
