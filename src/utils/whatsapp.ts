/**
 * Utilitário para abrir WhatsApp com mensagem pré-preenchida.
 * Número configurado em config/content.ts (siteConfig.whatsappNumber).
 */

const DEFAULT_MESSAGE =
  'Olá Bruno, vim pelo seu portfólio e gostaria de falar sobre um projeto.';

/**
 * Abre o WhatsApp (app ou web) com mensagem opcional.
 * Se não passar mensagem, usa a mensagem padrão de portfólio.
 * O número deve estar no formato internacional sem + (ex: 5521999999999).
 */
export function openWhatsApp(message?: string): void {
  const num = import.meta.env.VITE_WHATSAPP_NUMBER || '5521965272231';
  const text = encodeURIComponent(message ?? DEFAULT_MESSAGE);
  const url = `https://wa.me/${num.replace(/\D/g, '')}?text=${text}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
