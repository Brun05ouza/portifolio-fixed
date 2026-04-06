import { supabase } from '../config/supabase';

const BUCKET = 'portfolio';

export async function uploadPortfolioFile(
  path: string,
  file: File
): Promise<{ url: string } | { error: string }> {
  if (!supabase) {
    return { error: 'Supabase não configurado (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).' };
  }
  try {
    const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
      upsert: true,
      contentType: file.type || undefined,
    });
    if (upErr) {
      return { error: upErr.message };
    }
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    if (!data?.publicUrl) {
      return { error: 'Não foi possível obter a URL pública do ficheiro.' };
    }
    return { url: data.publicUrl };
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Falha no upload.';
    return { error: msg };
  }
}
