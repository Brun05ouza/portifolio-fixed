import { useEffect, useState, type ReactNode } from 'react';
import {
  Award,
  BarChart3,
  BookOpen,
  ClipboardList,
  FolderKanban,
  Loader2,
  MousePointerClick,
  Settings,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  countActiveCertificates,
  countActiveCourses,
  countActiveProjects,
} from '../../../services/portfolioDb';
import { fetchSiteSettings } from '../../../services/siteSettingsDb';
import { fetchAnalyticsSummary, type AnalyticsSummary } from '../../../services/analyticsDb';
import { fetchProjectRequestSummary, type ProjectRequestSummary } from '../../../services/projectRequestsDb';

export function DashboardPanel() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(0);
  const [certificates, setCertificates] = useState(0);
  const [projects, setProjects] = useState(0);
  const [settingsUpdated, setSettingsUpdated] = useState<string | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [requests, setRequests] = useState<ProjectRequestSummary | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [c, ce, p, settings, analyticsData, requestData] = await Promise.all([
        countActiveCourses(),
        countActiveCertificates(),
        countActiveProjects(),
        fetchSiteSettings(),
        fetchAnalyticsSummary(),
        fetchProjectRequestSummary(),
      ]);
      if (cancelled) return;
      setCourses(c);
      setCertificates(ce);
      setProjects(p);
      setAnalytics(analyticsData);
      setRequests(requestData);
      const ts = settings?.updatedAt;
      if (typeof ts === 'string' && ts.length > 0) {
        try {
          setSettingsUpdated(new Date(ts).toLocaleString('pt-BR'));
        } catch {
          setSettingsUpdated(null);
        }
      } else {
        setSettingsUpdated(null);
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const statCard = (
    icon: ReactNode,
    label: string,
    value: string | number,
    hint?: string
  ) => (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="rounded-lg bg-zinc-800/80 p-2 text-cyan-400">{icon}</div>
        {hint && <span className="text-[10px] uppercase tracking-wide text-zinc-600">{hint}</span>}
      </div>
      <p className="mt-4 text-3xl font-semibold tabular-nums text-white">{value}</p>
      <p className="mt-1 text-sm text-zinc-400">{label}</p>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-400">Visão geral do conteúdo publicado no portfólio.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statCard(<FolderKanban className="h-5 w-5" />, 'Projetos ativos', projects)}
          {statCard(<BookOpen className="h-5 w-5" />, 'Cursos ativos', courses)}
          {statCard(<Award className="h-5 w-5" />, 'Certificados ativos', certificates)}
          {statCard(<BarChart3 className="h-5 w-5" />, 'Acessos totais', analytics?.totalViews ?? 0)}
          {statCard(<MousePointerClick className="h-5 w-5" />, 'Acessos hoje', analytics?.viewsToday ?? 0)}
          {statCard(<Users className="h-5 w-5" />, 'Visitantes únicos', analytics?.uniqueVisitors ?? 0, 'hash anônimo')}
          {statCard(<ClipboardList className="h-5 w-5" />, 'Pedidos de projeto', requests?.total ?? 0)}
          {statCard(<ClipboardList className="h-5 w-5" />, 'Novos pedidos', requests?.newCount ?? 0)}
          {statCard(<ClipboardList className="h-5 w-5" />, 'Pedidos em 7 dias', requests?.last7d ?? 0)}
        </div>
      )}

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <div className="flex items-center gap-3">
          <Settings className="h-5 w-5 text-zinc-500" />
          <div>
            <h2 className="text-sm font-semibold text-zinc-200">Configurações do site</h2>
            <p className="text-sm text-zinc-500">
              {settingsUpdated
                ? `Última atualização: ${settingsUpdated}`
                : 'Nenhuma data de atualização registrada ainda.'}
            </p>
          </div>
          <Link to="/admin/configuracao" className="ml-auto text-sm font-medium text-cyan-400 hover:text-cyan-300">
            Editar
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">
          <div className="flex items-center gap-2 text-zinc-500">
            <BarChart3 className="h-5 w-5" />
            <h2 className="text-sm font-semibold text-zinc-400">Acessos dos últimos 7 dias</h2>
          </div>
          <p className="mt-3 text-4xl font-semibold tabular-nums text-white">{analytics?.views7d ?? 0}</p>
          <p className="mt-1 text-sm text-zinc-500">Registrado no Neon por abertura do site público.</p>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">
          <div className="flex items-center gap-2 text-zinc-500">
            <MousePointerClick className="h-5 w-5" />
            <h2 className="text-sm font-semibold text-zinc-400">Seções mais vistas</h2>
          </div>
          {analytics?.topPages.length ? (
            <div className="mt-4 space-y-3">
              {analytics.topPages.map((item) => (
                <div key={item.path} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate text-zinc-300">{item.path}</span>
                  <strong className="tabular-nums text-cyan-400">{item.views}</strong>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">Nenhum acesso registrado ainda.</p>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-6">
        <div className="flex items-center gap-2 text-zinc-500">
          <ClipboardList className="h-5 w-5" />
          <h2 className="text-sm font-semibold text-zinc-400">Análise geral dos formulários</h2>
        </div>

        {requests?.latest.length ? (
          <div className="mt-5 grid gap-3">
            {requests.latest.map((item) => (
              <article key={item.id} className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-white">{item.name}</h3>
                    <a className="text-xs text-cyan-400" href={`mailto:${item.email}`}>{item.email}</a>
                  </div>
                  <span className="text-xs text-zinc-500">
                    {item.createdAt ? new Date(item.createdAt).toLocaleString('pt-BR') : 'Sem data'}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">Nenhum formulário enviado ainda.</p>
        )}
      </div>
    </div>
  );
}
