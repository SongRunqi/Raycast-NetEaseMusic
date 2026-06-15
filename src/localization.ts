import { getPreferenceValues } from "@raycast/api";

export type Language = "auto" | "en" | "zh";

export interface Preferences {
  language?: Language;
}

export interface BilingualText {
  en: string;
  zh: string;
}

export function getLanguage(): Exclude<Language, "auto"> {
  const preference = getPreferenceValues<Preferences>().language ?? "auto";

  if (preference === "en" || preference === "zh") {
    return preference;
  }

  const systemLocale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
  return systemLocale.startsWith("zh") ? "zh" : "en";
}

export function t(text: BilingualText): string {
  return text[getLanguage()];
}

export function bilingual(en: string, zh: string): BilingualText {
  return { en, zh };
}
