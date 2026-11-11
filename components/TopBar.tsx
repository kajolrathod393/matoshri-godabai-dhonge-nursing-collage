"use client";

import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { telLink } from "@/lib/content";
import LanguageToggle from "./LanguageToggle";

export const ANTI_RAGGING_PHONE = "1800-180-5522";

/**
 * Phones: row 1 = phone + language button, row 2 = anti-ragging helpline.
 * Tablets and up: everything on one line (the language button moves into the header).
 */
export default function TopBar() {
  const { contact } = useCollege();
  const { t } = useLanguage();

  return (
    <div className="bg-primary-dark text-sm text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-4 py-2 sm:px-5">
        <div className="flex items-center gap-x-5">
          <a href={telLink(contact.phone)} className="whitespace-nowrap hover:underline">
            <span className="opacity-90">{t.topbar.phone}:</span> {contact.phoneDisplay}
          </a>
          <a href={`mailto:${contact.email}`} className="hidden break-all hover:underline lg:inline">
            <span className="opacity-90">{t.topbar.email}:</span> {contact.email}
          </a>
        </div>
        <LanguageToggle className="inline-flex min-h-9 border-white bg-white px-3 text-sm !text-primary-dark sm:order-last md:hidden" />
        <a
          href={telLink(`91${ANTI_RAGGING_PHONE}`)}
          className="w-full font-semibold hover:underline sm:w-auto"
        >
          {t.topbar.antiRagging}: {ANTI_RAGGING_PHONE}
        </a>
      </div>
    </div>
  );
}
