import { getSql } from '../_lib/db.js';
import { createSession, sessionCookie, verifyPassword } from '../_lib/auth.js';

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

  const { email, password } = request.body || {};
  if (!email || !password) {
    response.status(400).json({ error: 'Informe e-mail e senha.' });
    return;
  }

  const rows = await sql`select id, email, password_hash from public.admin_users where email = ${email} limit 1`;
  const user = rows[0];
  if (!user || !verifyPassword(password, user.password_hash)) {
    response.status(401).json({ error: 'Credenciais invalidas.' });
    return;
  }

  const token = await createSession(user.id);
  response.setHeader('Set-Cookie', sessionCookie(token));
  response.status(200).json({ user: { id: user.id, email: user.email } });
}
