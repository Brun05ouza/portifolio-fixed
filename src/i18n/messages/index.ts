import type { Locale } from '../types';
import { ptMessages, type MessageBundle } from './pt';
import { enMessages } from './en';
import { esMessages } from './es';

export type { MessageBundle };

export const messages: Record<Locale, MessageBundle> = {
  pt: ptMessages,
  en: enMessages,
  es: esMessages,
};
