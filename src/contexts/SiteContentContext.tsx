import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { heroTexts as defaultHero, siteConfig as defaultSite, stats as defaultStats } from '../config/content';
import { fetchSiteSettings } from '../services/siteSettingsDb';
import { openWhatsApp as openWhatsAppRaw } from '../utils/whatsapp';
import type { SiteSettings } from '../types/siteSettings';

export type MergedSiteConfig = typeof defaultSite;
export type MergedHeroTexts = typeof defaultHero;

export type StatItem = {
  icon: LucideIcon;
  value: number;
  label: string;
  color: string;
};

type SiteContentContextValue = {
  siteConfig: MergedSiteConfig;
  heroTexts: MergedHeroTexts;
  stats: StatItem[];
  /** Carregando override do Supabase (site público continua com defaults até terminar). */
  remoteLoading: boolean;
  reload: () => Promise<void>;
  openSiteWhatsApp: (message?: string) => void;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

function mergeFromRemote(remote: SiteSettings | null): {
  siteConfig: MergedSiteConfig;
  heroTexts: MergedHeroTexts;
  stats: StatItem[];
} {
  const siteConfig: MergedSiteConfig = {
    ...defaultSite,
    ...(remote?.contactEmail != null && remote.contactEmail !== '' ? { contactEmail: remote.contactEmail } : {}),
    ...(remote?.linkedinUrl != null && remote.linkedinUrl !== '' ? { linkedinUrl: remote.linkedinUrl } : {}),
    ...(remote?.githubUrl != null && remote.githubUrl !== '' ? { githubUrl: remote.githubUrl } : {}),
    ...(remote?.whatsappNumber != null && remote.whatsappNumber !== ''
      ? { whatsappNumber: remote.whatsappNumber }
      : {}),
    ...(remote?.githubUser != null && remote.githubUser !== '' ? { githubUser: remote.githubUser } : {}),
    ...(remote?.calendlyUrl != null && remote.calendlyUrl !== '' ? { calendlyUrl: remote.calendlyUrl } : {}),
  };

  const heroTexts: MergedHeroTexts = {
    ...defaultHero,
    ...(remote?.heroGreeting != null && remote.heroGreeting !== '' ? { greeting: remote.heroGreeting } : {}),
    ...(remote?.heroHeadline != null && remote.heroHeadline !== '' ? { headline: remote.heroHeadline } : {}),
    ...(remote?.heroSubheadline != null && remote.heroSubheadline !== ''
      ? { subheadline: remote.heroSubheadline }
      : {}),
  };

  const stats: StatItem[] = defaultStats.map((s) => {
    if (s.label === 'Linhas de Código' && remote?.statLinesOfCode != null) {
      return { ...s, value: remote.statLinesOfCode };
    }
    if (s.label === 'Projetos Concluídos' && remote?.statProjects != null) {
      return { ...s, value: remote.statProjects };
    }
    if (s.label === 'Cafés Consumidos' && remote?.statCoffees != null) {
      return { ...s, value: remote.statCoffees };
    }
    if (s.label === 'Horas de Estudo' && remote?.statStudyHours != null) {
      return { ...s, value: remote.statStudyHours };
    }
    return { ...s, icon: s.icon };
  });

  return { siteConfig, heroTexts, stats };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [remote, setRemote] = useState<SiteSettings | null>(null);
  const [remoteLoading, setRemoteLoading] = useState(true);

  const load = useCallback(async () => {
    setRemoteLoading(true);
    const data = await fetchSiteSettings();
    setRemote(data);
    setRemoteLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const { siteConfig, heroTexts, stats } = useMemo(() => mergeFromRemote(remote), [remote]);

  const openSiteWhatsApp = useCallback(
    (message?: string) => {
      openWhatsAppRaw(message, siteConfig.whatsappNumber);
    },
    [siteConfig.whatsappNumber]
  );

  const value = useMemo<SiteContentContextValue>(
    () => ({
      siteConfig,
      heroTexts,
      stats,
      remoteLoading,
      reload: load,
      openSiteWhatsApp,
    }),
    [siteConfig, heroTexts, stats, remoteLoading, load, openSiteWhatsApp]
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent(): SiteContentContextValue {
  const ctx = useContext(SiteContentContext);
  if (!ctx) {
    throw new Error('useSiteContent deve ser usado dentro de SiteContentProvider');
  }
  return ctx;
}
