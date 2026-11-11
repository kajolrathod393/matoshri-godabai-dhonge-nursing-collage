"use client";

import { useEffect, useState } from "react";
import Section from "./Section";
import { useLanguage } from "./LanguageProvider";
import type { Notice } from "@/lib/notices";

const NEW_DAYS = 7;
const DAY_MS = 24 * 60 * 60 * 1000;

export default function Notices({ notices }: { notices: Notice[] }) {
  const { t, lang } = useLanguage();
  // "Now" is read in the browser so the "New" badge stays correct on a static page.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === "mr" ? "mr-IN" : "en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <Section id="notices" title={t.notices.title} tinted>
      {notices.length === 0 ? (
        <p className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center text-gray-700">
          {t.notices.empty}
        </p>
      ) : (
        <ul className="mx-auto max-w-3xl divide-y divide-gray-200 rounded-xl bg-white shadow-sm">
          {notices.map((n) => {
            const isNew = now !== null && now - Date.parse(n.date) < NEW_DAYS * DAY_MS;
            const title = lang === "mr" && n.titleMr ? n.titleMr : n.title;
            return (
              <li key={`${n.date}-${n.title}`} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:gap-4">
                <time dateTime={n.date} className="shrink-0 text-sm font-medium text-gray-600 sm:w-32">
                  {formatDate(n.date)}
                </time>
                <span className="flex-1">
                  {n.link ? (
                    <a href={n.link} className="font-medium text-primary-dark underline-offset-2 hover:underline">
                      {title}
                    </a>
                  ) : (
                    <span className="font-medium">{title}</span>
                  )}
                  {isNew && (
                    <span className="ml-2 rounded bg-accent px-2 py-0.5 align-middle text-xs font-bold text-white">
                      {t.notices.new}
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Section>
  );
}
