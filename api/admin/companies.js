import { getSql } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';

function cleanCompany(input) {
  return {
    name: String(input.name || '').trim(),
    iconUrl: String(input.iconUrl || '').trim(),
    websiteUrl: String(input.websiteUrl || '').trim(),
    active: input.active !== false,
  };
}

export default async function handler(request, response) {
  const sql = getSql();
  if (!sql) {
    response.status(503).json({ error: 'DATABASE_URL nao configurada.' });
    return;
  }

  const user = await requireAdmin(request, response);
  if (!user) return;

  if (request.method === 'GET') {
    const rows = await sql`
      select id, name, icon_url, website_url, active
      from public.companies
      order by active desc, name asc
    `;
    response.status(200).json({ data: rows });
    return;
  }

  if (request.method === 'POST') {
    const item = cleanCompany(request.body || {});
    if (!item.name) {
      response.status(400).json({ error: 'Informe o nome da empresa.' });
      return;
    }

    const rows = await sql`
      insert into public.companies (name, icon_url, website_url, active)
      values (${item.name}, ${item.iconUrl}, ${item.websiteUrl}, ${item.active})
      returning id
    `;
    response.status(200).json({ ok: true, id: rows[0].id });
    return;
  }

  response.status(405).json({ error: 'Metodo nao permitido.' });
}
