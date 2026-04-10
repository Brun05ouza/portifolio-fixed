import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ComponentType, CSSProperties } from 'react';
import { stats as defaultStats, siteConfig as defaultSite } from '../config/content';
import { fetchSiteSettings } from '../services/siteSettingsDb';
import { openWhatsApp as openWhatsAppRaw } from '../utils/whatsapp';
import type { SiteSettings } from '../types/siteSettings';
import type { HeroFull, Locale } from '../i18n/types';
import { ptMessages } from '../i18n/messages/pt';
import { messages } from '../i18n/messages';
import { useI18n } from './I18nContext';

export type MergedSiteConfig = typeof defaultSite;
export type MergedHeroTexts = HeroFull;

/** Ícone das métricas (lucide-animated: `size` + estilo no wrapper). */
export type StatIconComponent = ComponentType<{
  className?: string;
  style?: CSSProperties;
  size?: number;
}>;

export type StatItem = {
  id: string;
  icon: StatIconComponent;
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

function mergeFromRemote(
  remote: SiteSettings | null,
  locale: Locale,
  t: (key: string) => string
): {
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

  const heroTexts: MergedHeroTexts =
    locale === 'pt'
      ? {
          ...ptMessages.heroFull,
          ...(remote?.heroGreeting != null && remote.heroGreeting.trim() !== ''
            ? { greeting: remote.heroGreeting }
            : {}),
          ...(remote?.heroHeadline != null && remote.heroHeadline.trim() !== ''
            ? { headline: remote.heroHeadline }
            : {}),
          ...(remote?.heroSubheadline != null && remote.heroSubheadline.trim() !== ''
            ? { subheadline: remote.heroSubheadline }
            : {}),
        }
      : { ...messages[locale].heroFull };

  const stats: StatItem[] = defaultStats.map((s) => {
    let value = s.value;
    if (s.id === 'lines' && remote?.statLinesOfCode != null) {
      value = remote.statLinesOfCode;
    }
    if (s.id === 'projects' && remote?.statProjects != null) {
      value = remote.statProjects;
    }
    if (s.id === 'coffees' && remote?.statCoffees != null) {
      value = remote.statCoffees;
    }
    if (s.id === 'hours' && remote?.statStudyHours != null) {
      value = remote.statStudyHours;
    }
    return {
      id: s.id,
      icon: s.icon as StatIconComponent,
      value,
      color: s.color,
      label: t(`stats.${s.id}`),
    };
  });

  return { siteConfig, heroTexts, stats };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { locale, t } = useI18n();
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

  const { siteConfig, heroTexts, stats } = useMemo(
    () => mergeFromRemote(remote, locale, t),
    [remote, locale, t]
  );

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
