import { useState, useCallback, useEffect, type ReactNode } from "react";
import { type Language, translations } from "./translations";
import { LanguageContext } from "./context";

const STORAGE_KEY = "ai-agent-readiness-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "ja" || saved === "en" || saved === "zh") {
      return saved;
    }
    // Default to browser language or Japanese
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith("ja")) return "ja";
    if (browserLang.startsWith("zh")) return "zh";
    return "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
