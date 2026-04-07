import { useEffect, useState } from 'react';
import {
  BookOpen,
  Award,
  FolderKanban,
  BarChart3,
  MousePointerClick,
  Settings,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  countActiveCertificates,
  countActiveCourses,
  countActiveProjects,
} from '../../../services/portfolioDb';
import { fetchSiteSettings } from '../../../services/siteSettingsDb';

export function DashboardPanel() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(0);
  const [certificates, setCertificates] = useState(0);
  const [projects, setProjects] = useState(0);
  const [settingsUpdated, setSettingsUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const [c, ce, p, settings] = await Promise.all([
        countActiveCourses(),
        countActiveCertificates(),
        countActiveProjects(),
        fetchSiteSettings(),
      ]);
      if (cancelled) return;
      setCourses(c);
      setCertificates(ce);
      setProjects(p);
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
    icon: React.ReactNode,
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
          <Link
            to="/admin/configuracao"
            className="ml-auto text-sm font-medium text-cyan-400 hover:text-cyan-300"
          >
            Editar
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 p-6">
          <div className="flex items-center gap-2 text-zinc-500">
            <BarChart3 className="h-5 w-5" />
            <h2 className="text-sm font-semibold text-zinc-400">Acessos</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Em breve: integração com Google Analytics (ou similar) para métricas reais de visitas.
          </p>
        </div>
        <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-950/50 p-6">
          <div className="flex items-center gap-2 text-zinc-500">
            <MousePointerClick className="h-5 w-5" />
            <h2 className="text-sm font-semibold text-zinc-400">Interações</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600">
            Em breve: eventos de cliques, formulário e CTAs agregados neste painel.
          </p>
        </div>
      </div>
    </div>
  );
}
