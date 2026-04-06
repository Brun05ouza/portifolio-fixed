/**
 * Abre o WhatsApp (app ou web) com mensagem opcional.
 * `whatsappNumber`: internacional sem +; se omitido, usa VITE_WHATSAPP_NUMBER ou fallback.
 */

const DEFAULT_MESSAGE =
  'Olá Bruno, vim pelo seu portfólio e gostaria de falar sobre um projeto.';

export function openWhatsApp(message?: string, whatsappNumber?: string): void {
  const raw =
    whatsappNumber?.trim() ||
    import.meta.env.VITE_WHATSAPP_NUMBER ||
    '5521965272231';
  const text = encodeURIComponent(message ?? DEFAULT_MESSAGE);
  const url = `https://wa.me/${raw.replace(/\D/g, '')}?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
