import type { ComponentType } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { cn } from './ui/utils';
import type { Locale } from '../../i18n/types';

function FlagBR({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 16" aria-hidden>
      <rect width="22" height="16" fill="#009c3b" rx="1" />
      <path fill="#ffdf00" d="M11 2.2 18.2 8 11 13.8 3.8 8Z" />
      <circle cx="11" cy="8" r="3.1" fill="#002776" />
    </svg>
  );
}

function FlagUS({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 16" aria-hidden>
      <rect width="22" height="16" fill="#b22234" rx="1" />
      <rect y="2.29" width="22" height="1.14" fill="#fff" />
      <rect y="4.57" width="22" height="1.14" fill="#fff" />
      <rect y="6.86" width="22" height="1.14" fill="#fff" />
      <rect y="9.14" width="22" height="1.14" fill="#fff" />
      <rect y="11.43" width="22" height="1.14" fill="#fff" />
      <rect width="9.5" height="8" fill="#3c3b6e" />
    </svg>
  );
}

function FlagES({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 16" aria-hidden>
      <rect width="22" height="4" fill="#aa151b" />
      <rect y="4" width="22" height="8" fill="#f1bf00" />
      <rect y="12" width="22" height="4" fill="#aa151b" />
    </svg>
  );
}

const flags: Record<Locale, ComponentType<{ className?: string }>> = {
  pt: FlagBR,
  en: FlagUS,
  es: FlagES,
};

const options: { locale: Locale; short: string }[] = [
  { locale: 'pt', short: 'PT' },
  { locale: 'en', short: 'EN' },
  { locale: 'es', short: 'ES' },
];

export type LanguageSwitcherProps = {
  className?: string;
  /** Dentro da pílula do header: fundo segmentado único, sem “caixa” extra. */
  embedded?: boolean;
  /** Header fundido ao hero: trilho mais discreto. */
  mergeWithHeroBg?: boolean;
};

export function LanguageSwitcher({
  className,
  embedded = false,
  mergeWithHeroBg = false,
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t('language.switchLabel')}
      className={cn(
        'flex shrink-0 items-center gap-0.5 rounded-xl p-1',
        embedded
          ? mergeWithHeroBg
            ? 'bg-black/[0.12] dark:bg-white/[0.06] ring-1 ring-[var(--border)]/40'
            : 'bg-[var(--muted)]/50 ring-1 ring-[var(--border)]/60'
          : 'border px-1 py-1',
        !embedded && 'border-[var(--border)] bg-[var(--surface)]',
        className
      )}
    >
      {options.map((o) => {
        const Flag = flags[o.locale];
        const active = locale === o.locale;
        return (
          <button
            key={o.locale}
            type="button"
            onClick={() => setLocale(o.locale)}
            className={cn(
              'relative flex flex-col items-center justify-center gap-0.5 rounded-lg px-2 py-1.5 min-h-[40px] min-w-[44px] sm:min-h-[44px] sm:min-w-[48px] transition-all duration-200 ease-out',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
              active
                ? 'bg-[var(--background)] text-[var(--foreground)] shadow-md ring-1 ring-[var(--border-strong)] scale-[1.02] z-[1]'
                : 'text-[var(--foreground-muted)] opacity-75 hover:opacity-100 hover:bg-[var(--surface-hover)]/80'
            )}
            aria-pressed={active}
            aria-label={t(`language.${o.locale}`)}
            title={t(`language.${o.locale}`)}
          >
            <Flag className="h-[13px] w-[18px] sm:h-[14px] sm:w-[20px] shadow-sm rounded-[2px]" />
            <span className="text-[10px] font-bold leading-none tracking-wide sm:text-[11px]">{o.short}</span>
          </button>
        );
      })}
    </div>
  );
}
