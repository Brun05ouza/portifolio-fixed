import emailjs from '@emailjs/browser';

const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Envia e-mail via EmailJS (plano gratuito, sem Cloud Functions).
 * Configure VITE_EMAILJS_* no .env. Template deve ter: {{from_name}}, {{reply_to}}, {{message}}.
 */
export async function sendContactEmailJS(data: ContactFormData): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
    return { ok: false, error: 'EmailJS não configurado (VITE_EMAILJS_* no .env).' };
  }

  try {
    emailjs.init({ publicKey: PUBLIC_KEY });
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: data.name,
      reply_to: data.email,
      message: data.message,
    });
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Falha ao enviar e-mail.';
    return { ok: false, error: message };
  }
}

export function isEmailJSConfigured(): boolean {
  return !!(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);
}
