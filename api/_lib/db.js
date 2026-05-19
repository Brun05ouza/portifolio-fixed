import { neon } from '@neondatabase/serverless';

export function getSql() {
  const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;
  if (!connectionString) return null;
  return neon(connectionString);
}
