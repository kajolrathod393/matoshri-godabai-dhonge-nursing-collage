"use client";

import Section from "./Section";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { isFilled, telLink } from "@/lib/content";

/** Course details and documents needed for admission. Hidden when admissions are closed. */
export default function AdmissionInfo() {
  const { courses, documents, admissions, contact } = useCollege();
  const { t, pick } = useLanguage();
  if (!admissions.open) return null;

  return (
    <Section id="admission" title={t.admission.title} subtitle={t.admission.subtitle} tinted>
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        <div className="space-y-6">
          {courses.map((c) => (
            <div key={c.name.en} className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
              <h3 className="text-xl font-bold text-primary-dark">{pick(c.name)}</h3>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-sm text-gray-600">{t.hero.duration}</dt>
                  <dd className="mt-1 font-semibold">{pick(c.duration)}</dd>
                </div>
                {isFilled(c.seats) && (
                  <div>
                    <dt className="text-sm text-gray-600">{t.hero.seats}</dt>
                    <dd className="mt-1 font-semibold">{c.seats}</dd>
                  </div>
                )}
                <div className="sm:col-span-2">
                  <dt className="text-sm text-gray-600">{t.hero.eligibility}</dt>
                  <dd className="mt-1 font-semibold">{pick(c.eligibility)}</dd>
                </div>
              </dl>
            </div>
          ))}
          <a
            href={telLink(contact.phone)}
            className="inline-flex min-h-12 items-center rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
          >
            {t.admission.enquire}: {contact.phoneDisplay}
          </a>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-bold text-primary-dark">{t.admission.documents}</h3>
          <ul className="mt-5 space-y-3">
            {documents.map((d) => (
              <li key={d.en} className="flex gap-3 text-gray-900">
                <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                {pick(d)}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-600">{t.admission.documentsNote}</p>
        </div>
      </div>
    </Section>
  );
}
