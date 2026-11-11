"use client";

import Section from "./Section";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { directionsLink, isFilled, mapEmbedLink, telLink } from "@/lib/content";

/** Address, map and contact persons. */
export default function FindUs() {
  const { contact } = useCollege();
  const { t, pick } = useLanguage();
  const link = "font-medium text-primary-dark underline underline-offset-4";
  const mapSrc = contact.mapEmbedUrl || mapEmbedLink(contact.mapsQuery);

  return (
    <Section id="find-us" title={t.findUs.title} tinted>
      <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
          <iframe
            src={mapSrc}
            title={t.findUs.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block aspect-[4/3] w-full"
          />
        </div>

        <div>
          <dl className="space-y-5">
            <div>
              <dt className="text-sm font-semibold text-gray-600">{t.findUs.address}</dt>
              <dd className="mt-1 text-gray-900">{pick(contact.address)}</dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-gray-600">{t.findUs.phone}</dt>
              <dd className="mt-1">
                <a href={telLink(contact.phone)} className={link}>
                  {contact.phoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-gray-600">{t.findUs.email}</dt>
              <dd className="mt-1">
                <a href={`mailto:${contact.email}`} className={`${link} break-all`}>
                  {contact.email}
                </a>
              </dd>
            </div>
            {isFilled(contact.officeHours.en) && (
              <div>
                <dt className="text-sm font-semibold text-gray-600">{t.findUs.officeHours}</dt>
                <dd className="mt-1 text-gray-900">{pick(contact.officeHours)}</dd>
              </div>
            )}
          </dl>

          <a
            href={directionsLink(contact.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-12 items-center rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
          >
            {t.findUs.directions}
          </a>

          {contact.people.length > 0 && (
            <>
              <h3 className="mt-10 font-semibold text-primary-dark">{t.findUs.people}</h3>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {contact.people.map((p) => (
                  <li key={p.phone} className="rounded-lg bg-white p-4 shadow-sm">
                    <span className="block text-sm text-gray-800">{pick(p.name)}</span>
                    <a href={telLink(`91${p.phone}`)} className={link}>
                      {p.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Section>
  );
}
