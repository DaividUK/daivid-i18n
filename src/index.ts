import en from "./messages/en.json";
import es from "./messages/es.json";
import pt from "./messages/pt.json";

export enum I18nLocale {
  EN = "en",
  PT = "pt",
  ES = "es",
}

export const locales = [I18nLocale.EN, I18nLocale.PT, I18nLocale.ES] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = I18nLocale.EN;

export const messages = {
  en,
  pt,
  es,
} as const;

export type Messages = typeof en;

export function getMessages(locale: Locale) {
  return messages[locale];
}
