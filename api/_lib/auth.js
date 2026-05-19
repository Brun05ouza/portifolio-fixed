import crypto from 'node:crypto';
import { getSql } from './db.js';

const SESSION_COOKIE = 'portfolio_admin_session';
const SESSION_DAYS = 7;

function base64Url(bytes) {
  return Buffer.from(bytes).toString('base64url');
}

export function parseCookies(request) {
  return Object.fromEntries(
    String(request.headers.cookie || '')
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf('=');
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))];
      })
  );
}

export function hashToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function hashPassword(password, salt = base64Url(crypto.randomBytes(16))) {
  const hash = crypto.pbkdf2Sync(password, salt, 210000, 32, 'sha256').toString('base64url');
  return `pbkdf2_sha256$210000$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
  const [algorithm, iterations, salt, expected] = String(stored).split('$');
  if (algorithm !== 'pbkdf2_sha256' || !iterations || !salt || !expected) return false;
  const hash = crypto.pbkdf2Sync(password, salt, Number(iterations), 32, 'sha256').toString('base64url');
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected));
}

export function sessionCookie(token) {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}; Secure`;
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Secure`;
}

export async function createSession(userId) {
  const sql = getSql();
  if (!sql) throw new Error('DATABASE_URL nao configurada.');
  const token = base64Url(crypto.randomBytes(32));
  await sql`
    insert into public.admin_sessions (token_hash, user_id, expires_at)
    values (${hashToken(token)}, ${userId}, now() + interval '7 days')
  `;
  return token;
}

export async function getSessionUser(request) {
  const sql = getSql();
  if (!sql) return null;
  const token = parseCookies(request)[SESSION_COOKIE];
  if (!token) return null;
  const rows = await sql`
    select admin_users.id, admin_users.email
    from public.admin_sessions
    join public.admin_users on admin_users.id = admin_sessions.user_id
    where admin_sessions.token_hash = ${hashToken(token)}
      and admin_sessions.expires_at > now()
    limit 1
  `;
  return rows[0] || null;
}

export async function requireAdmin(request, response) {
  const user = await getSessionUser(request);
  if (!user) {
    response.status(401).json({ error: 'Login necessario.' });
    return null;
  }
  return user;
}
