import { en } from "./en";
import { st } from "./st";

export const translations = {
  en,
  st,
  // Add other language imports here
};

export type SupportedLanguages = keyof typeof translations;
