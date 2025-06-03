import { createContext, useContext } from "react";

// Define the type for translations
export type Translations = {
  [key: string]: string | Translations;
};

// Create a context for the current language and translations
export const I18nContext = createContext<{
  language: string;
  t: (key: string, params?: Record<string, string>) => string;
  changeLanguage: (lang: string) => void;
}>({
  language: "en",
  t: (key) => key,
  changeLanguage: () => {},
});

// Hook to use translations
export const useTranslation = () => useContext(I18nContext);

// Function to get nested translation values
export const getNestedTranslation = (
  obj: Translations,
  path: string,
): string => {
  const keys = path.split(".");
  let current: any = obj;

  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
    current = current[key];
  }

  if (typeof current !== "string") {
    console.warn(`Translation value is not a string: ${path}`);
    return path;
  }

  return current;
};

// Function to replace parameters in translation strings
export const replaceParams = (
  text: string,
  params?: Record<string, string>,
): string => {
  if (!params) return text;

  return Object.entries(params).reduce((acc, [key, value]) => {
    return acc.replace(new RegExp(`{{${key}}}`, "g"), value);
  }, text);
};
