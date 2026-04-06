/**
 * Evita que o navegador trate o valor como caminho relativo ao site do portfólio
 * (ex.: "meusite.com" → /meusite.com no mesmo domínio). Garante URL absoluta para abrir o site externo.
 */
export function toAbsoluteHttpUrl(raw: string): string {
  const s = raw.trim();
  if (!s) return '';
  if (/^[a-z][-+.a-z0-9]*:/i.test(s)) return s;
  if (s.startsWith('//')) return `https:${s}`;
  if (s.startsWith('/')) return s;
  return `https://${s}`;
}
