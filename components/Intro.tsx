"use client";

import Section from "./Section";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { NurseIllustration } from "./Illustrations";
import Image from "next/image";
import { isFilled } from "@/lib/content";

/** Home-page introduction: about, purpose, objectives and approvals. */
export default function Intro() {
  const { intro, introPhoto } = useCollege();
  const { t, pick } = useLanguage();

  return (
    <Section id="intro" title={t.intro.title}>
      <div className="mx-auto max-w-5xl space-y-12 text-base leading-relaxed text-gray-800 sm:text-lg">
        <div
          className={`grid items-center gap-8 lg:gap-12 ${
            isFilled(introPhoto) ? "md:grid-cols-2" : "md:grid-cols-[1fr_15rem] lg:grid-cols-[1fr_18rem]"
          }`}
        >
          <div className="space-y-5">
            {intro.paragraphs.map((p, i) => (
              <p key={i}>{pick(p)}</p>
            ))}
          </div>
          {isFilled(introPhoto) ? (
            <Image
              src={introPhoto}
              alt={t.intro.photoAlt}
              width={640}
              height={427}
              sizes="(min-width: 1024px) 500px, (min-width: 768px) 50vw, 100vw"
              className="aspect-[3/2] w-full rounded-2xl object-cover shadow-md md:order-last"
            />
          ) : (
            <NurseIllustration className="mx-auto w-48 sm:w-56 md:w-full" />
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary-dark">{t.intro.purpose}</h3>
          <p className="mt-3">{pick(intro.purpose)}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-primary-dark">{t.intro.objectives}</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            {intro.objectives.map((o, i) => (
              <li key={i}>{pick(o)}</li>
            ))}
          </ol>
        </div>

        <div className="rounded-xl bg-primary-light p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-primary-dark">{t.intro.approvedBy}</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            {intro.approvedBy.map((a) => (
              <li key={a.en}>{pick(a)}</li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
