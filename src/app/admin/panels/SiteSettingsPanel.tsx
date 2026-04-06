import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { supabase } from '../../../config/supabase';
import { heroTexts, siteConfig, stats as defaultStats } from '../../../config/content';
import { fetchSiteSettings, saveSiteSettings } from '../../../services/siteSettingsDb';
import type { SiteSettings } from '../../../types/siteSettings';
import { useSiteContent } from '../../../contexts/SiteContentContext';

function buildFormState(remote: SiteSettings | null): Record<string, string | number> {
  return {
    heroGreeting: remote?.heroGreeting ?? heroTexts.greeting,
    heroHeadline: remote?.heroHeadline ?? heroTexts.headline,
    heroSubheadline: remote?.heroSubheadline ?? heroTexts.subheadline,
    contactEmail: remote?.contactEmail ?? siteConfig.contactEmail,
    linkedinUrl: remote?.linkedinUrl ?? siteConfig.linkedinUrl,
    githubUrl: remote?.githubUrl ?? siteConfig.githubUrl,
    whatsappNumber: remote?.whatsappNumber ?? siteConfig.whatsappNumber,
    githubUser: remote?.githubUser ?? siteConfig.githubUser,
    calendlyUrl: remote?.calendlyUrl ?? siteConfig.calendlyUrl,
    statLinesOfCode:
      remote?.statLinesOfCode ?? defaultStats.find((s) => s.label === 'Linhas de Código')!.value,
    statProjects:
      remote?.statProjects ?? defaultStats.find((s) => s.label === 'Projetos Concluídos')!.value,
    statCoffees: remote?.statCoffees ?? defaultStats.find((s) => s.label === 'Cafés Consumidos')!.value,
    statStudyHours:
      remote?.statStudyHours ?? defaultStats.find((s) => s.label === 'Horas de Estudo')!.value,
  };
}

export function SiteSettingsPanel() {
  const { reload: reloadSiteContent } = useSiteContent();
  const [loading, setLoading] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [form, setForm] = useState<Record<string, string | number>>(() => buildFormState(null));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await fetchSiteSettings();
      if (!cancelled) setForm(buildFormState(remote));
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    if (!supabase) return;
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    setSaveMsg('');
    setLoading(true);
    const payload: SiteSettings = {
      heroGreeting: String(form.heroGreeting),
      heroHeadline: String(form.heroHeadline),
      heroSubheadline: String(form.heroSubheadline),
      contactEmail: String(form.contactEmail),
      linkedinUrl: String(form.linkedinUrl),
      githubUrl: String(form.githubUrl),
      whatsappNumber: String(form.whatsappNumber).replace(/\D/g, ''),
      githubUser: String(form.githubUser).trim(),
      calendlyUrl: String(form.calendlyUrl),
      statLinesOfCode: Number(form.statLinesOfCode) || 0,
      statProjects: Number(form.statProjects) || 0,
      statCoffees: Number(form.statCoffees) || 0,
      statStudyHours: Number(form.statStudyHours) || 0,
    };
    const res = await saveSiteSettings(payload, user.id);
    setLoading(false);
    if (res.ok) {
      setSaveMsg('Salvo. O site público atualiza ao recarregar.');
      await reloadSiteContent();
    } else {
      setSaveMsg(res.error || 'Erro ao salvar.');
    }
  };

  const field = (key: string, label: string, type: 'text' | 'email' | 'number' | 'url' = 'text') => (
    <div key={key}>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
        {label}
      </label>
      <input
        type={type}
        value={form[key] ?? ''}
        onChange={(e) =>
          setForm((f) => ({
            ...f,
            [key]: type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value,
          }))
        }
        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-cyan-600/50 focus:outline-none focus:ring-1 focus:ring-cyan-600/30"
      />
    </div>
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">Configurações do site</h1>
        <p className="mt-1 text-sm text-zinc-400">Hero, contato, links e números da seção Trust.</p>
      </div>

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-sm font-semibold text-zinc-200">Hero</h2>
        {field('heroGreeting', 'Saudação')}
        {field('heroHeadline', 'Título principal')}
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Subtítulo
          </label>
          <textarea
            value={String(form.heroSubheadline ?? '')}
            onChange={(e) => setForm((f) => ({ ...f, heroSubheadline: e.target.value }))}
            rows={3}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-cyan-600/50 focus:outline-none focus:ring-1 focus:ring-cyan-600/30"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-sm font-semibold text-zinc-200">Contato e links</h2>
        {field('contactEmail', 'E-mail de contato', 'email')}
        {field('whatsappNumber', 'WhatsApp (só números)')}
        {field('linkedinUrl', 'LinkedIn', 'url')}
        {field('githubUrl', 'GitHub', 'url')}
        {field('calendlyUrl', 'Calendly', 'url')}
      </section>

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-sm font-semibold text-zinc-200">GitHub</h2>
        {field('githubUser', 'Usuário GitHub (legado / referência)')}
      </section>

      <section className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-sm font-semibold text-zinc-200">Números (Trust)</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('statLinesOfCode', 'Linhas de código', 'number')}
          {field('statProjects', 'Projetos concluídos', 'number')}
          {field('statCoffees', 'Cafés', 'number')}
          {field('statStudyHours', 'Horas de estudo', 'number')}
        </div>
      </section>

      {saveMsg && (
        <p
          className={`text-sm ${saveMsg.includes('Salvo') ? 'text-emerald-400' : 'text-red-400'}`}
        >
          {saveMsg}
        </p>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-cyan-900/40 disabled:opacity-50 disabled:hover:translate-y-0"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        Salvar no Supabase
      </button>
    </div>
  );
}
