export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * A gravacao direta em banco foi removida do frontend. Use EmailJS ou uma API
 * server-side para persistir contatos no Neon.
 */
export async function submitContact(
  _data: ContactFormData
): Promise<{ ok: true } | { ok: false; error: string }> {
  return {
    ok: false,
    error: 'Banco desativado no frontend. Envie por EmailJS ou crie uma API para o Neon.',
  };
}
