"use client";

import Image from "next/image";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { telLink, whatsappLink } from "@/lib/content";

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors";

export default function Hero() {
  const college = useCollege();
  const { t, pick } = useLanguage();
  const { contact, admissions } = college;
  const course = college.courses[0];

  return (
    <section id="home" className="bg-gradient-to-b from-primary-light to-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-5 sm:py-16 lg:grid-cols-5 lg:gap-12 lg:py-20">
        <div className="lg:col-span-3">
          <p className="text-sm font-medium text-gray-700">{pick(college.trust)}</p>
          <h1 className="mt-4 text-[1.75rem] font-bold leading-tight text-primary-dark sm:text-4xl md:text-5xl">
            {pick(college.name)}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-800 sm:text-xl">{pick(college.tagline)}</p>

          <ul aria-label={t.hero.approvalsLabel} className="mt-8 flex flex-wrap gap-3">
            {college.approvals.map((a) => (
              <li
                key={a.en}
                className="rounded-full border border-primary/30 bg-white px-4 py-1.5 text-sm text-primary-dark"
              >
                {pick(a)}
              </li>
            ))}
            <li className="rounded-full border border-primary/30 bg-white px-4 py-1.5 text-sm text-primary-dark">
              {t.hero.collegeCode}: {college.collegeCode}
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
            <a href="#enquiry" className={`${btn} bg-primary text-white hover:bg-primary-dark`}>
              {t.hero.admissionEnquiry}
            </a>
            <a
              href={telLink(contact.phone)}
              className={`${btn} border-2 border-primary text-primary-dark hover:bg-primary-light`}
            >
              {t.hero.call}: {contact.phoneDisplay}
            </a>
            <a
              href={whatsappLink(contact.whatsapp, t.hero.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btn} border-2 border-[#15803d] text-[#166534] hover:bg-green-50`}
            >
              {t.hero.whatsapp}
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          {admissions.open && course && (
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-4">
                <Image src={college.logo} alt="" width={72} height={72} className="h-16 w-16" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                    {t.hero.admissionsCard}
                  </p>
                  <p className="text-2xl font-bold text-primary-dark">{admissions.year}</p>
                </div>
              </div>
              <dl className="mt-6 grid gap-5 sm:mt-8 sm:grid-cols-3 lg:grid-cols-1">
                <div>
                  <dt className="text-sm text-gray-600">{t.hero.course}</dt>
                  <dd className="mt-1 font-semibold text-gray-900">{pick(course.name)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">{t.hero.duration}</dt>
                  <dd className="mt-1 font-semibold text-gray-900">{pick(course.duration)}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">{t.hero.eligibility}</dt>
                  <dd className="mt-1 font-semibold text-gray-900">{pick(course.eligibility)}</dd>
                </div>
              </dl>
              <p className="mt-6 inline-block rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-accent">
                {t.hero.limitedSeats}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
