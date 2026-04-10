/** Resolve chaves com pontos, incluindo índices numéricos em arrays (ex.: `a.0.b`). */
export function lookupString(root: unknown, path: string): string | undefined {
  const parts = path.split('.');
  let cur: unknown = root;
  for (const p of parts) {
    if (cur == null || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === 'string' ? cur : undefined;
}

export function createTranslator(dict: Record<string, unknown>) {
  return (key: string) => lookupString(dict, key) ?? key;
}
