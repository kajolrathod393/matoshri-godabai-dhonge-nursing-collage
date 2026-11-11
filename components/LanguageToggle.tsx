"use client";

import { useLanguage } from "./LanguageProvider";

/** Switches between English and Marathi. The choice is saved in the browser. */
export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLanguage();
  const next = lang === "en" ? "mr" : "en";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={t.lang.switchLabel}
      lang={next}
      className={`min-h-11 shrink-0 items-center justify-center rounded-full border-2 border-primary px-4 font-semibold text-primary-dark hover:bg-primary-light ${className}`}
    >
      {t.lang.switchTo}
    </button>
  );
}
