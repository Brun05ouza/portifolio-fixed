export interface AnalyticsSummary {
  totalViews: number;
  viewsToday: number;
  views7d: number;
  uniqueVisitors: number;
  topPages: Array<{
    path: string;
    views: number;
  }>;
}

const emptyAnalytics: AnalyticsSummary = {
  totalViews: 0,
  viewsToday: 0,
  views7d: 0,
  uniqueVisitors: 0,
  topPages: [],
};

const trackedSections = new Set<string>();

export async function trackPortfolioSection(section: string): Promise<void> {
  if (typeof window === 'undefined') return;
  if (window.location.pathname.startsWith('/admin')) return;

  const cleanSection = section.trim() || 'Hero';
  if (trackedSections.has(cleanSection)) return;
  trackedSections.add(cleanSection);

  const payload = {
    path: cleanSection,
    referrer: document.referrer || '',
  };

  if ('sendBeacon' in navigator) {
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
    return;
  }

  await fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => null);
}

export const trackPageView = trackPortfolioSection;

export async function fetchAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    const response = await fetch('/api/admin/analytics', { headers: { Accept: 'application/json' } });
    if (!response.ok) return emptyAnalytics;
    const json = await response.json();
    const data = json?.data ?? {};
    return {
      totalViews: Number(data.totalViews) || 0,
      viewsToday: Number(data.viewsToday) || 0,
      views7d: Number(data.views7d) || 0,
      uniqueVisitors: Number(data.uniqueVisitors) || 0,
      topPages: Array.isArray(data.topPages)
        ? data.topPages.map((item: Record<string, unknown>) => ({
            path: String(item.path || '/'),
            views: Number(item.views) || 0,
          }))
        : [],
    };
  } catch {
    return emptyAnalytics;
  }
}
