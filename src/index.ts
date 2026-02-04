import en from "./messages/en.json";
import es from "./messages/es.json";
import pt from "./messages/pt.json";

export const locales = ["en", "pt", "es"] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = "en";

export const messages = {
  en,
  pt,
  es,
} as const;

export type Messages = typeof en;

export function getMessages(locale: Locale) {
  return messages[locale];
}
