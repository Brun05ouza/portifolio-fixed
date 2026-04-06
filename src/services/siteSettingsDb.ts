import { supabase } from '../config/supabase';
import type { SiteSettings } from '../types/siteSettings';
import { SITE_SETTINGS_ROW_ID } from '../types/siteSettings';

type SiteSettingsRow = {
  id: string;
  hero_greeting: string | null;
  hero_headline: string | null;
  hero_subheadline: string | null;
  contact_email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  whatsapp_number: string | null;
  github_user: string | null;
  calendly_url: string | null;
  stat_lines_of_code: number | null;
  stat_projects: number | null;
  stat_coffees: number | null;
  stat_study_hours: number | null;
  updated_at: string | null;
  updated_by_uid: string | null;
};

function rowToSettings(row: SiteSettingsRow): SiteSettings {
  return {
    heroGreeting: row.hero_greeting ?? undefined,
    heroHeadline: row.hero_headline ?? undefined,
    heroSubheadline: row.hero_subheadline ?? undefined,
    contactEmail: row.contact_email ?? undefined,
    linkedinUrl: row.linkedin_url ?? undefined,
    githubUrl: row.github_url ?? undefined,
    whatsappNumber: row.whatsapp_number ?? undefined,
    githubUser: row.github_user ?? undefined,
    calendlyUrl: row.calendly_url ?? undefined,
    statLinesOfCode: row.stat_lines_of_code ?? undefined,
    statProjects: row.stat_projects ?? undefined,
    statCoffees: row.stat_coffees ?? undefined,
    statStudyHours: row.stat_study_hours ?? undefined,
    updatedAt: row.updated_at ?? undefined,
    updatedByUid: row.updated_by_uid ?? undefined,
  };
}

function settingsToRow(data: SiteSettings, uid: string): Partial<SiteSettingsRow> {
  return {
    id: SITE_SETTINGS_ROW_ID,
    hero_greeting: data.heroGreeting ?? null,
    hero_headline: data.heroHeadline ?? null,
    hero_subheadline: data.heroSubheadline ?? null,
    contact_email: data.contactEmail ?? null,
    linkedin_url: data.linkedinUrl ?? null,
    github_url: data.githubUrl ?? null,
    whatsapp_number: data.whatsappNumber ?? null,
    github_user: data.githubUser ?? null,
    calendly_url: data.calendlyUrl ?? null,
    stat_lines_of_code: data.statLinesOfCode ?? null,
    stat_projects: data.statProjects ?? null,
    stat_coffees: data.statCoffees ?? null,
    stat_study_hours: data.statStudyHours ?? null,
    updated_by_uid: uid,
  };
}

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', SITE_SETTINGS_ROW_ID)
      .maybeSingle();
    if (error || !data) return null;
    return rowToSettings(data as SiteSettingsRow);
  } catch {
    return null;
  }
}

export async function saveSiteSettings(
  data: SiteSettings,
  uid: string
): Promise<{ ok: boolean; error?: string }> {
  if (!supabase) {
    return { ok: false, error: 'Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.' };
  }
  try {
    const row = {
      ...settingsToRow(data, uid),
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('site_settings').upsert(row, { onConflict: 'id' });
    if (error) {
      if (error.message.includes('permission') || error.code === '42501') {
        return {
          ok: false,
          error:
            'Permissão negada. Confirme o e-mail em RLS (supabase/migrations), crie o utilizador em Auth e faça login no /admin.',
        };
      }
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Falha ao salvar.';
    return { ok: false, error: msg };
  }
}
