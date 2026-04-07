/**
 * Configurações do site (tabela site_settings no Supabase).
 * Ausência de linha ou campos vazios → defaults em content.ts
 */
export interface SiteSettings {
  heroGreeting?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  contactEmail?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  whatsappNumber?: string;
  githubUser?: string;
  calendlyUrl?: string;
  statLinesOfCode?: number;
  statProjects?: number;
  statCoffees?: number;
  statStudyHours?: number;
  updatedAt?: string;
  updatedByUid?: string;
}

export const SITE_SETTINGS_ROW_ID = 'portfolio' as const;
