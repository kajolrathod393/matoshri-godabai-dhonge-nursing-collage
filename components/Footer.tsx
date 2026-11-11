"use client";

import Link from "next/link";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { NAV_ITEMS } from "./Header";
import { ANTI_RAGGING_PHONE } from "./TopBar";
import { directionsLink, isFilled, telLink } from "@/lib/content";

const ANTI_RAGGING_EMAIL = "helpline@antiragging.in";
const ANTI_RAGGING_SITE = "https://www.antiragging.in";

export default function Footer() {
  const college = useCollege();
  const { t, pick } = useLanguage();
  const { contact } = college;
  const year = new Date().getFullYear();
  const link = "underline-offset-4 hover:underline";

  return (
    <footer id="contact" className="bg-gray-900 text-gray-200">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-5 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="text-lg font-bold text-white">{pick(college.name)}</p>
          <p className="mt-2 text-sm text-gray-300">{pick(college.affiliation)}</p>
          <h2 className="mt-8 font-semibold text-white">{t.footer.contact}</h2>
          <address className="mt-3 space-y-2 text-sm not-italic">
            <p>{pick(contact.address)}</p>
            <p>
              {t.topbar.phone}:{" "}
              <a href={telLink(contact.phone)} className={link}>
                {contact.phoneDisplay}
              </a>
            </p>
            <p>
              {t.topbar.email}:{" "}
              <a href={`mailto:${contact.email}`} className={`${link} break-all`}>
                {contact.email}
              </a>
            </p>
            <p>
              <a href={directionsLink(contact.mapsQuery)} target="_blank" rel="noopener noreferrer" className={`${link} font-semibold text-white`}>
                {t.footer.directions}
              </a>
            </p>
            {isFilled(contact.whatsappChannel) && (
              <p>
                <a href={contact.whatsappChannel} target="_blank" rel="noopener noreferrer" className={`${link} font-semibold text-white`}>
                  {t.footer.whatsappChannel}
                </a>
              </p>
            )}
          </address>
        </div>

        <nav aria-label={t.footer.quickLinks}>
          <h2 className="font-semibold text-white">{t.footer.quickLinks}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.key}>
                <Link href={item.href} className={`inline-block py-1.5 ${link}`}>
                  {t.nav[item.key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-semibold text-white">{t.footer.antiRagging}</h2>
          <p className="mt-3 text-sm">{t.footer.antiRaggingText}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={telLink(`91${ANTI_RAGGING_PHONE}`)} className={link}>
                {ANTI_RAGGING_PHONE}
              </a>
            </li>
            <li>
              <a href={`mailto:${ANTI_RAGGING_EMAIL}`} className={link}>
                {ANTI_RAGGING_EMAIL}
              </a>
            </li>
            <li>
              <a href={ANTI_RAGGING_SITE} target="_blank" rel="noopener noreferrer" className={link}>
                www.antiragging.in
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-gray-300">
          © {year} {pick(college.name)}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
