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
        count(*)::int as total,
        count(*) filter (where status = 'new')::int as new_count,
        count(*) filter (where created_at >= now() - interval '7 days')::int as last_7d
      from public.project_requests
    `;

    const latest = await sql`
      select id, name, email, description, status, created_at
      from public.project_requests
      order by created_at desc
      limit 5
    `;

    response.status(200).json({
      data: {
        total: summary?.total ?? 0,
        newCount: summary?.new_count ?? 0,
        last7d: summary?.last_7d ?? 0,
        latest,
      },
    });
  } catch {
    response.status(200).json({
      data: {
        total: 0,
        newCount: 0,
        last7d: 0,
        latest: [],
      },
    });
  }
}
