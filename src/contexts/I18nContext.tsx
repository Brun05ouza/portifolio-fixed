import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale } from '../i18n/types';
import { messages, type MessageBundle } from '../i18n/messages';
import { createTranslator } from '../i18n/translate';

const STORAGE_KEY = 'portfolio-locale';

const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' };

/** Tag BCP 47 para `Intl` / `toLocaleString`. */
export const intlLocaleTag: Record<Locale, string> = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

function readInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  const s = localStorage.getItem(STORAGE_KEY);
  if (s === 'pt' || s === 'en' || s === 'es') return s;
  const n = navigator.language.toLowerCase();
  if (n.startsWith('es')) return 'es';
  if (n.startsWith('en')) return 'en';
  return 'pt';
}

export type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
  localeTag: string;
  bundle: MessageBundle;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readInitialLocale());

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const bundle = messages[locale];
  const t = useMemo(
    () => createTranslator(bundle as unknown as Record<string, unknown>),
    [bundle]
  );

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t,
      localeTag: intlLocaleTag[locale],
      bundle,
    }),
    [locale, setLocale, t, bundle]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n deve ser usado dentro de I18nProvider');
  }
  return ctx;
}
