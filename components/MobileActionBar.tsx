"use client";

import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { directionsLink, telLink, whatsappLink } from "@/lib/content";

/** Sticky bottom bar on phones: Call | WhatsApp | Directions. */
export default function MobileActionBar() {
  const { contact } = useCollege();
  const { t } = useLanguage();
  const item =
    "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 text-xs font-semibold";

  return (
    <nav
      aria-label={t.mobileBar.label}
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_8px_rgba(0,0,0,0.06)] lg:hidden"
    >
      <a href={telLink(contact.phone)} className={`${item} text-primary-dark`}>
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
        {t.mobileBar.call}
      </a>
      <a
        href={whatsappLink(contact.whatsapp, t.hero.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} border-x border-gray-200 text-[#166534]`}
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 21l1.7-5A9 9 0 1 1 8 19.3z" />
        </svg>
        {t.mobileBar.whatsapp}
      </a>
      <a
        href={directionsLink(contact.mapsQuery)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} text-primary-dark`}
      >
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        {t.mobileBar.directions}
      </a>
    </nav>
  );
}
