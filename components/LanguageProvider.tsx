"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Bilingual } from "@/config/types";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  dictionaries,
  type Dictionary,
  type Lang,
} from "@/i18n";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** UI strings from i18n/en.json or i18n/mr.json. */
  t: Dictionary;
  /** Picks the current language from a { en, mr } config value. */
  pick: (text: Bilingual) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Restore the saved choice after hydration.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "mr") setLangState(saved);
    } catch {
      // localStorage unavailable (private mode etc.) — keep the default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const pick = useCallback((text: Bilingual) => text[lang] || text.en, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang], pick }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
