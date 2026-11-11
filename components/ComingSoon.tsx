"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import type { Dictionary } from "@/i18n";

/** Temporary content for pages that are not built yet. */
export default function ComingSoon({ page }: { page: keyof Dictionary["nav"] }) {
  const { t } = useLanguage();
  return (
    <section className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
      <h1 className="text-3xl font-bold text-primary-dark sm:text-4xl">{t.nav[page]}</h1>
      <p className="mt-5 text-lg text-gray-700">{t.comingSoon.body}</p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-12 items-center rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
      >
        {t.comingSoon.back}
      </Link>
    </section>
  );
}
