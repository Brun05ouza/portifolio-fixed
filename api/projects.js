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
        p.id,
        p.title,
        p.description,
        p.image_url,
        p.tags,
        p.role,
        p.demo_link,
        p.github_link,
        p.hide_github_link,
        p.hide_image_overlay,
        p.case_problem,
        p.case_solution,
        p.case_result,
        p.active,
        p.sort_order,
        p.repo_name,
        p.company_id,
        p.collaborators,
        c.name as company_name,
        c.icon_url as company_icon_url,
        c.website_url as company_website_url
      from public.projects p
      left join public.companies c on c.id = p.company_id
      where p.active = true
      order by p.sort_order asc, p.created_at desc
    `;
    response.status(200).json({ data: rows });
  } catch (error) {
    response.status(500).json({ error: error instanceof Error ? error.message : 'Erro ao buscar projetos.' });
  }
}
