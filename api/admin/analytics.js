import { getSql } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') {
    response.status(405).json({ error: 'Metodo nao permitido.' });
    return;
  }

  const sql = getSql();
  if (!sql) {
    response.status(503).json({ error: 'DATABASE_URL nao configurada.' });
    return;
  }

  const user = await requireAdmin(request, response);
  if (!user) return;

  try {
    const [summary] = await sql`
      select
        count(*)::int as total_views,
        count(*) filter (where created_at >= current_date)::int as views_today,
        count(*) filter (where created_at >= now() - interval '7 days')::int as views_7d,
        count(distinct visitor_hash)::int as unique_visitors
      from public.page_views
    `;

    const topPages = await sql`
      select
        case when path = '/' then 'Hero' else path end as path,
        count(*)::int as views
      from public.page_views
      where created_at >= now() - interval '30 days'
      group by case when path = '/' then 'Hero' else path end
      order by views desc, 1 asc
      limit 5
    `;

    response.status(200).json({
      data: {
        totalViews: summary?.total_views ?? 0,
        viewsToday: summary?.views_today ?? 0,
        views7d: summary?.views_7d ?? 0,
        uniqueVisitors: summary?.unique_visitors ?? 0,
        topPages,
      },
    });
  } catch {
    response.status(200).json({
      data: {
        totalViews: 0,
        viewsToday: 0,
        views7d: 0,
        uniqueVisitors: 0,
        topPages: [],
      },
    });
  }
}
