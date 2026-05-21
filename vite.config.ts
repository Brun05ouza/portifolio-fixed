import { defineConfig, loadEnv, type ViteDevServer } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { neon } from '@neondatabase/serverless'
import crypto from 'node:crypto'

type DevResponse = Parameters<ViteDevServer['middlewares']['use']>[1] extends (...args: infer Args) => unknown
  ? Args[1]
  : never

function sendJson(res: DevResponse, status: number, payload: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function readBody(req: Parameters<ViteDevServer['middlewares']['use']>[1] extends (...args: infer Args) => unknown ? Args[0] : never): Promise<any> {
  return new Promise((resolve) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        resolve({})
      }
    })
  })
}

function parseCookies(cookieHeader: string | undefined) {
  return Object.fromEntries(
    String(cookieHeader || '')
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const index = part.indexOf('=')
        return [part.slice(0, index), decodeURIComponent(part.slice(index + 1))]
      })
  )
}

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

function cleanText(value: unknown, limit: number) {
  const clean = String(value || '').trim()
  return (clean === '/' ? 'Hero' : clean).slice(0, limit)
}

function getClientIp(req: Parameters<ViteDevServer['middlewares']['use']>[1] extends (...args: infer Args) => unknown ? Args[0] : never) {
  const forwarded = String(req.headers['x-forwarded-for'] || '')
  return forwarded.split(',')[0]?.trim() || req.socket.remoteAddress || ''
}

function anonymousVisitorHash(req: Parameters<ViteDevServer['middlewares']['use']>[1] extends (...args: infer Args) => unknown ? Args[0] : never) {
  const source = `${getClientIp(req)}|${req.headers['user-agent'] || ''}`
  return crypto.createHash('sha256').update(source).digest('hex')
}

function verifyPassword(password: string, stored: string) {
  const [algorithm, iterations, salt, expected] = String(stored).split('$')
  if (algorithm !== 'pbkdf2_sha256' || !iterations || !salt || !expected) return false
  const hash = crypto.pbkdf2Sync(password, salt, Number(iterations), 32, 'sha256').toString('base64url')
  return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expected))
}

async function getAdminUser(sql: ReturnType<typeof neon>, req: Parameters<ViteDevServer['middlewares']['use']>[1] extends (...args: infer Args) => unknown ? Args[0] : never) {
  const token = parseCookies(req.headers.cookie).portfolio_admin_session
  if (!token) return null
  const rows = await sql`
    select admin_users.id, admin_users.email
    from public.admin_sessions
    join public.admin_users on admin_users.id = admin_sessions.user_id
    where admin_sessions.token_hash = ${hashToken(token)}
      and admin_sessions.expires_at > now()
    limit 1
  `
  return rows[0] || null
}

function cleanProject(input: any) {
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
    companyId: input.companyId ? String(input.companyId) : null,
    collaborators: Array.isArray(input.collaborators)
      ? input.collaborators
          .map((item: any) => ({
            name: String(item.name || '').trim(),
            platform: item.platform === 'instagram' || item.platform === 'site' ? item.platform : 'github',
            url: String(item.url || '').trim(),
          }))
          .filter((item: any) => item.name && item.url)
      : [],
  }
}

function cleanCompany(input: any) {
  return {
    name: String(input.name || '').trim(),
    iconUrl: String(input.iconUrl || '').trim(),
    websiteUrl: String(input.websiteUrl || '').trim(),
    active: input.active !== false,
  }
}

function neonDevApi(connectionString: string | undefined) {
  return {
    name: 'neon-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/auth/me', async (req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }
        const sql = neon(connectionString)
        const user = await getAdminUser(sql, req)
        if (!user) {
          sendJson(res, 401, { error: 'Login necessario.' })
          return
        }
        sendJson(res, 200, { user })
      })

      server.middlewares.use('/api/auth/login', async (req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }
        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'Metodo nao permitido.' })
          return
        }
        const body = await readBody(req)
        const sql = neon(connectionString)
        const rows = await sql`select id, email, password_hash from public.admin_users where email = ${body.email} limit 1`
        const user = rows[0]
        if (!user || !verifyPassword(String(body.password || ''), user.password_hash)) {
          sendJson(res, 401, { error: 'Credenciais invalidas.' })
          return
        }
        const token = crypto.randomBytes(32).toString('base64url')
        await sql`
          insert into public.admin_sessions (token_hash, user_id, expires_at)
          values (${hashToken(token)}, ${user.id}, now() + interval '7 days')
        `
        res.setHeader('Set-Cookie', `portfolio_admin_session=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`)
        sendJson(res, 200, { user: { id: user.id, email: user.email } })
      })

      server.middlewares.use('/api/auth/logout', async (req, res) => {
        if (connectionString) {
          const token = parseCookies(req.headers.cookie).portfolio_admin_session
          if (token) {
            const sql = neon(connectionString)
            await sql`delete from public.admin_sessions where token_hash = ${hashToken(token)}`
          }
        }
        res.setHeader('Set-Cookie', 'portfolio_admin_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0')
        sendJson(res, 200, { ok: true })
      })

      server.middlewares.use('/api/track', async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'Metodo nao permitido.' })
          return
        }
        if (!connectionString) {
          sendJson(res, 200, { ok: false })
          return
        }
        try {
          const body = await readBody(req)
          const sql = neon(connectionString)
          await sql`
            insert into public.page_views (path, referrer, user_agent, visitor_hash)
            values (
              ${cleanText(body.path || '/', 240)},
              ${cleanText(body.referrer || '', 500)},
              ${cleanText(req.headers['user-agent'] || body.userAgent || '', 500)},
              ${anonymousVisitorHash(req)}
            )
          `
          sendJson(res, 200, { ok: true })
        } catch {
          sendJson(res, 200, { ok: false })
        }
      })

      server.middlewares.use('/api/project-requests', async (req, res) => {
        if (req.method !== 'POST') {
          sendJson(res, 405, { error: 'Metodo nao permitido.' })
          return
        }
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }
        const body = await readBody(req)
        const name = cleanText(body.name, 120)
        const email = cleanText(body.email, 180)
        const description = cleanText(body.description, 4000)
        if (!name || !email || !description) {
          sendJson(res, 400, { error: 'Preencha nome, e-mail e descricao do projeto.' })
          return
        }
        const sql = neon(connectionString)
        await sql`
          insert into public.project_requests (name, email, description)
          values (${name}, ${email}, ${description})
        `
        sendJson(res, 200, { ok: true })
      })

      server.middlewares.use('/api/admin/project-requests', async (req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }
        if (req.method !== 'GET') {
          sendJson(res, 405, { error: 'Metodo nao permitido.' })
          return
        }
        const sql = neon(connectionString)
        const user = await getAdminUser(sql, req)
        if (!user) {
          sendJson(res, 401, { error: 'Login necessario.' })
          return
        }
        try {
          const [summary] = await sql`
            select
              count(*)::int as total,
              count(*) filter (where status = 'new')::int as new_count,
              count(*) filter (where created_at >= now() - interval '7 days')::int as last_7d
            from public.project_requests
          `
          const latest = await sql`
            select id, name, email, description, status, created_at
            from public.project_requests
            order by created_at desc
            limit 5
          `
          sendJson(res, 200, {
            data: {
              total: summary?.total ?? 0,
              newCount: summary?.new_count ?? 0,
              last7d: summary?.last_7d ?? 0,
              latest,
            },
          })
        } catch {
          sendJson(res, 200, { data: { total: 0, newCount: 0, last7d: 0, latest: [] } })
        }
      })

      server.middlewares.use('/api/admin/analytics', async (req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }
        if (req.method !== 'GET') {
          sendJson(res, 405, { error: 'Metodo nao permitido.' })
          return
        }
        const sql = neon(connectionString)
        const user = await getAdminUser(sql, req)
        if (!user) {
          sendJson(res, 401, { error: 'Login necessario.' })
          return
        }
        try {
          const [summary] = await sql`
            select
              count(*)::int as total_views,
              count(*) filter (where created_at >= current_date)::int as views_today,
              count(*) filter (where created_at >= now() - interval '7 days')::int as views_7d,
              count(distinct visitor_hash)::int as unique_visitors
            from public.page_views
          `
          const topPages = await sql`
            select
              case when path = '/' then 'Hero' else path end as path,
              count(*)::int as views
            from public.page_views
            where created_at >= now() - interval '30 days'
            group by case when path = '/' then 'Hero' else path end
            order by views desc, 1 asc
            limit 5
          `
          sendJson(res, 200, {
            data: {
              totalViews: summary?.total_views ?? 0,
              viewsToday: summary?.views_today ?? 0,
              views7d: summary?.views_7d ?? 0,
              uniqueVisitors: summary?.unique_visitors ?? 0,
              topPages,
            },
          })
        } catch {
          sendJson(res, 200, {
            data: {
              totalViews: 0,
              viewsToday: 0,
              views7d: 0,
              uniqueVisitors: 0,
              topPages: [],
            },
          })
        }
      })

      server.middlewares.use('/api/admin/projects', async (req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }
        const sql = neon(connectionString)
        const user = await getAdminUser(sql, req)
        if (!user) {
          sendJson(res, 401, { error: 'Login necessario.' })
          return
        }

        if (req.method === 'GET') {
          const rows = await sql`
            select p.id, p.title, p.description, p.image_url, p.tags, p.role, p.demo_link, p.github_link,
              p.hide_github_link, p.hide_image_overlay, p.case_problem, p.case_solution, p.case_result,
              p.active, p.sort_order, p.repo_name, p.company_id, p.collaborators,
              c.name as company_name, c.icon_url as company_icon_url, c.website_url as company_website_url
            from public.projects p
            left join public.companies c on c.id = p.company_id
            order by p.sort_order asc, p.created_at desc
          `
          sendJson(res, 200, { data: rows })
          return
        }

        const requestUrl = new URL(req.url || '', 'http://localhost')
        const body = await readBody(req)
        const item = cleanProject(body)

        if (req.method === 'POST') {
          const rows = await sql`
            insert into public.projects (
              title, description, image_url, tags, role, demo_link, github_link, hide_github_link,
              hide_image_overlay, case_problem, case_solution, case_result, active, sort_order,
              repo_name, company_id, collaborators
            )
            values (
              ${item.title}, ${item.description}, ${item.imageUrl}, ${item.tags}, ${item.role},
              ${item.demoLink}, ${item.githubLink}, ${item.hideGithubLink}, ${item.hideImageOverlay},
              ${item.caseProblem}, ${item.caseSolution}, ${item.caseResult}, ${item.active},
              ${item.order}, ${item.repoName}, ${item.companyId}, ${JSON.stringify(item.collaborators)}
            )
            returning id
          `
          sendJson(res, 200, { ok: true, id: rows[0].id })
          return
        }

        if (req.method === 'PUT') {
          const id = requestUrl.searchParams.get('id')
          await sql`
            update public.projects set
              title = ${item.title}, description = ${item.description}, image_url = ${item.imageUrl},
              tags = ${item.tags}, role = ${item.role}, demo_link = ${item.demoLink}, github_link = ${item.githubLink},
              hide_github_link = ${item.hideGithubLink}, hide_image_overlay = ${item.hideImageOverlay},
              case_problem = ${item.caseProblem}, case_solution = ${item.caseSolution}, case_result = ${item.caseResult},
              active = ${item.active}, sort_order = ${item.order}, repo_name = ${item.repoName},
              company_id = ${item.companyId}, collaborators = ${JSON.stringify(item.collaborators)}, updated_at = now()
            where id = ${id}
          `
          sendJson(res, 200, { ok: true })
          return
        }

        if (req.method === 'DELETE') {
          await sql`delete from public.projects where id = ${new URL(req.url || '', 'http://localhost').searchParams.get('id')}`
          sendJson(res, 200, { ok: true })
          return
        }

        sendJson(res, 405, { error: 'Metodo nao permitido.' })
      })

      server.middlewares.use('/api/admin/companies', async (req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }
        const sql = neon(connectionString)
        const user = await getAdminUser(sql, req)
        if (!user) {
          sendJson(res, 401, { error: 'Login necessario.' })
          return
        }

        if (req.method === 'GET') {
          const rows = await sql`
            select id, name, icon_url, website_url, active
            from public.companies
            order by active desc, name asc
          `
          sendJson(res, 200, { data: rows })
          return
        }

        if (req.method === 'POST') {
          const body = await readBody(req)
          const item = cleanCompany(body)
          if (!item.name) {
            sendJson(res, 400, { error: 'Informe o nome da empresa.' })
            return
          }
          const rows = await sql`
            insert into public.companies (name, icon_url, website_url, active)
            values (${item.name}, ${item.iconUrl}, ${item.websiteUrl}, ${item.active})
            returning id
          `
          sendJson(res, 200, { ok: true, id: rows[0].id })
          return
        }

        sendJson(res, 405, { error: 'Metodo nao permitido.' })
      })

      server.middlewares.use('/api/projects', async (_req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }

        try {
          const sql = neon(connectionString)
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
          `
          sendJson(res, 200, { data: rows })
        } catch (error) {
          sendJson(res, 500, { error: error instanceof Error ? error.message : 'Erro ao buscar projetos.' })
        }
      })

      server.middlewares.use('/api/courses', async (_req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }

        try {
          const sql = neon(connectionString)
          const rows = await sql`
            select id, title, description, provider, url, image_url, active, sort_order
            from public.courses
            where active = true
            order by sort_order asc, created_at desc
          `
          sendJson(res, 200, { data: rows })
        } catch (error) {
          sendJson(res, 500, { error: error instanceof Error ? error.message : 'Erro ao buscar cursos.' })
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const connectionString = env.DATABASE_URL || env.NEON_DATABASE_URL

  return {
    plugins: [
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used - do not remove them
      react(),
      tailwindcss(),
      neonDevApi(connectionString),
    ],
    server: {
      port: 5173,
      strictPort: false,
    },
    preview: {
      port: 5173,
      strictPort: false,
    },
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
  }
})
