import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL;

export default async function handler(request, response) {
  if (!connectionString) {
    response.status(503).json({ error: 'DATABASE_URL nao configurada.' });
    return;
  }

  try {
    const sql = neon(connectionString);
    const rows = await sql`
      select
        id,
        title,
        description,
        image_url,
        tags,
        role,
        demo_link,
        github_link,
        hide_github_link,
        hide_image_overlay,
        case_problem,
        case_solution,
        case_result,
        active,
        sort_order,
        repo_name
      from public.projects
      where active = true
      order by sort_order asc, created_at desc
    `;
    response.status(200).json({ data: rows });
  } catch (error) {
    response.status(500).json({ error: error instanceof Error ? error.message : 'Erro ao buscar projetos.' });
  }
}
