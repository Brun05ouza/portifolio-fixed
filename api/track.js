import crypto from 'node:crypto';
import { getSql } from './_lib/db.js';

function getClientIp(request) {
  const forwarded = String(request.headers['x-forwarded-for'] || '');
  return forwarded.split(',')[0]?.trim() || String(request.socket?.remoteAddress || '');
}

function anonymousVisitorHash(request) {
  const source = `${getClientIp(request)}|${request.headers['user-agent'] || ''}`;
  return crypto.createHash('sha256').update(source).digest('hex');
}

function cleanText(value, limit) {
  const clean = String(value || '').trim();
  return (clean === '/' ? 'Hero' : clean).slice(0, limit);
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
    response.status(200).json({ ok: false });
    return;
  }

  try {
    const body = getBody(request);
    await sql`
      insert into public.page_views (path, referrer, user_agent, visitor_hash)
      values (
        ${cleanText(body.path || '/', 240)},
        ${cleanText(body.referrer || '', 500)},
        ${cleanText(request.headers['user-agent'] || body.userAgent || '', 500)},
        ${anonymousVisitorHash(request)}
      )
    `;
    response.status(200).json({ ok: true });
  } catch {
    response.status(200).json({ ok: false });
  }
}
