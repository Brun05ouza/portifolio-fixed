import { getSql } from './_lib/db.js';

function cleanText(value, limit) {
  return String(value || '').trim().slice(0, limit);
}

function getBody(request) {
  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body);
    } catch {
      return {};
    }
  }
  return request.body || {};
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.status(405).json({ error: 'Metodo nao permitido.' });
    return;
  }

  const sql = getSql();
  if (!sql) {
    response.status(503).json({ error: 'DATABASE_URL nao configurada.' });
    return;
  }

  const body = getBody(request);
  const name = cleanText(body.name, 120);
  const email = cleanText(body.email, 180);
  const description = cleanText(body.description, 4000);

  if (!name || !email || !description) {
    response.status(400).json({ error: 'Preencha nome, e-mail e descricao do projeto.' });
    return;
  }

  await sql`
    insert into public.project_requests (name, email, description)
    values (${name}, ${email}, ${description})
  `;

  response.status(200).json({ ok: true });
}
