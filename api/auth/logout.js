import { clearSessionCookie, hashToken, parseCookies } from '../_lib/auth.js';
import { getSql } from '../_lib/db.js';

export default async function handler(request, response) {
  const sql = getSql();
  const token = parseCookies(request).portfolio_admin_session;
  if (sql && token) {
    await sql`delete from public.admin_sessions where token_hash = ${hashToken(token)}`;
  }
  response.setHeader('Set-Cookie', clearSessionCookie());
  response.status(200).json({ ok: true });
}
