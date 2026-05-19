import { getSql } from '../_lib/db.js';
import { requireAdmin } from '../_lib/auth.js';

function cleanProject(input) {
  return {
    title: String(input.title || ''),
    description: String(input.description || ''),
    imageUrl: String(input.imageUrl || ''),
    tags: Array.isArray(input.tags) ? input.tags.map(String) : [],
    role: String(input.role || ''),
    demoLink: String(input.demoLink || ''),
    githubLink: String(input.githubLink || ''),
    hideGithubLink: Boolean(input.hideGithubLink),
    hideImageOverlay: Boolean(input.hideImageOverlay),
    caseProblem: String(input.caseProblem || ''),
    caseSolution: String(input.caseSolution || ''),
    caseResult: String(input.caseResult || ''),
    active: input.active !== false,
    order: Number(input.order || 0),
    repoName: input.repoName ? String(input.repoName) : null,
    collaborators: Array.isArray(input.collaborators)
      ? input.collaborators
          .map((item) => ({
            name: String(item.name || '').trim(),
            platform: item.platform === 'instagram' || item.platform === 'site' ? item.platform : 'github',
            url: String(item.url || '').trim(),
          }))
          .filter((item) => item.name && item.url)
      : [],
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
      select
        id, title, description, image_url, tags, role, demo_link, github_link,
        hide_github_link, hide_image_overlay, case_problem, case_solution, case_result,
        active, sort_order, repo_name, collaborators
      from public.projects
      order by sort_order asc, created_at desc
    `;
    response.status(200).json({ data: rows });
    return;
  }

  if (request.method === 'POST') {
    const item = cleanProject(request.body || {});
    const rows = await sql`
      insert into public.projects (
        title, description, image_url, tags, role, demo_link, github_link, hide_github_link,
        hide_image_overlay, case_problem, case_solution, case_result, active, sort_order,
        repo_name, collaborators
      )
      values (
        ${item.title}, ${item.description}, ${item.imageUrl}, ${item.tags}, ${item.role},
        ${item.demoLink}, ${item.githubLink}, ${item.hideGithubLink}, ${item.hideImageOverlay},
        ${item.caseProblem}, ${item.caseSolution}, ${item.caseResult}, ${item.active},
        ${item.order}, ${item.repoName}, ${JSON.stringify(item.collaborators)}
      )
      returning id
    `;
    response.status(200).json({ ok: true, id: rows[0].id });
    return;
  }

  if (request.method === 'PUT') {
    const id = request.query.id;
    const item = cleanProject(request.body || {});
    await sql`
      update public.projects set
        title = ${item.title},
        description = ${item.description},
        image_url = ${item.imageUrl},
        tags = ${item.tags},
        role = ${item.role},
        demo_link = ${item.demoLink},
        github_link = ${item.githubLink},
        hide_github_link = ${item.hideGithubLink},
        hide_image_overlay = ${item.hideImageOverlay},
        case_problem = ${item.caseProblem},
        case_solution = ${item.caseSolution},
        case_result = ${item.caseResult},
        active = ${item.active},
        sort_order = ${item.order},
        repo_name = ${item.repoName},
        collaborators = ${JSON.stringify(item.collaborators)},
        updated_at = now()
      where id = ${id}
    `;
    response.status(200).json({ ok: true });
    return;
  }

  if (request.method === 'DELETE') {
    await sql`delete from public.projects where id = ${request.query.id}`;
    response.status(200).json({ ok: true });
    return;
  }

  response.status(405).json({ error: 'Metodo nao permitido.' });
}
