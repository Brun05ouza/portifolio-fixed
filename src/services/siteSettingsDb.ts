import type { SiteSettings } from '../types/siteSettings';

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  return null;
}

export async function saveSiteSettings(
  _data: SiteSettings,
  _uid: string
): Promise<{ ok: boolean; error?: string }> {
  return {
    ok: false,
    error: 'Banco desativado no frontend. Crie uma API/backend para salvar configuracoes no Neon.',
  };
}
