import { defineConfig, loadEnv, type ViteDevServer } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { neon } from '@neondatabase/serverless'

type DevResponse = Parameters<ViteDevServer['middlewares']['use']>[1] extends (...args: infer Args) => unknown
  ? Args[1]
  : never

function sendJson(res: DevResponse, status: number, payload: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function neonDevApi(connectionString: string | undefined) {
  return {
    name: 'neon-dev-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/projects', async (_req, res) => {
        if (!connectionString) {
          sendJson(res, 503, { error: 'DATABASE_URL nao configurada.' })
          return
        }

        try {
          const sql = neon(connectionString)
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
