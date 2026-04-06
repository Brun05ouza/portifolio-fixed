import { supabase } from '../../config/supabase';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Guarda a mensagem na tabela contacts (Supabase).
 * RLS: insert permitido a anon/authenticated; leitura só admin.
 */
export async function submitContact(
  data: ContactFormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!supabase) {
    return {
      ok: false,
      error: 'Supabase não configurado. Defina VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no .env.',
    };
  }

  try {
    const { error } = await supabase.from('contacts').insert({
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    });
    if (error) {
      return { ok: false, error: error.message };
    }
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Erro ao salvar mensagem. Tente novamente.';
    return { ok: false, error: message };
  }
}
