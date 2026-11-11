"use client";

import Section from "./Section";
import FeatureIcon from "./FeatureIcon";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";

export default function Highlights() {
  const { highlights } = useCollege();
  const { t, pick } = useLanguage();
  if (highlights.length === 0) return null;

  return (
    <Section id="features" title={t.highlights.title} subtitle={t.highlights.subtitle}>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {highlights.map((h) => (
          <li key={h.en} className="flex items-start gap-4 rounded-xl bg-primary-light p-5 sm:p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
              <FeatureIcon name={h.icon} className="h-6 w-6" />
            </span>
            <span className="pt-2.5 text-gray-900">{pick(h)}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
