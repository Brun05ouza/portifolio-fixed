/** Ordem deve ser a mesma de `navItems` em content.ts (fluxo de scroll na página). */
export function getActiveNavId(
  idsInScrollOrder: readonly { id: string }[],
  viewportOffsetPx: number
): string {
  const scrollLine = window.scrollY + viewportOffsetPx;
  let current = idsInScrollOrder[0]?.id ?? 'home';
  for (const { id } of idsInScrollOrder) {
    const el = document.getElementById(id);
    if (!el) continue;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    if (scrollLine >= sectionTop - 32) {
      current = id;
    }
  }
  return current;
}
