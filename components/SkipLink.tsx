"use client";

import { useLanguage } from "./LanguageProvider";

export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow"
    >
      {t.common.skipToContent}
    </a>
  );
}
