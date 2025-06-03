"use client";

import { ReactNode, useState, useCallback } from "react";
import { I18nContext, getNestedTranslation, replaceParams } from "@/lib/i18n";
import { translations, SupportedLanguages } from "@/lib/i18n/translations";

interface I18nProviderProps {
  children: ReactNode;
  defaultLanguage?: SupportedLanguages;
}

export function I18nProvider({
  children,
  defaultLanguage = "en",
}: I18nProviderProps) {
  const [language, setLanguage] = useState<SupportedLanguages>(
    (typeof window !== "undefined" &&
      (localStorage.getItem("preferredLanguage") as SupportedLanguages)) ||
      defaultLanguage,
  );

  // Translation function
  const t = useCallback(
    (key: string, params?: Record<string, string>) => {
      const currentTranslations = translations[language] || translations.en;
      const translatedText = getNestedTranslation(currentTranslations, key);
      return replaceParams(translatedText, params);
    },
    [language],
  );

  // Change language function
  const changeLanguage = useCallback((lang: string) => {
    if (translations[lang as SupportedLanguages]) {
      setLanguage(lang as SupportedLanguages);
      if (typeof window !== "undefined") {
        localStorage.setItem("preferredLanguage", lang);
        document.documentElement.lang = lang;
      }
    } else {
      console.warn(`Language ${lang} is not supported`);
    }
  }, []);

  return (
    <I18nContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}
