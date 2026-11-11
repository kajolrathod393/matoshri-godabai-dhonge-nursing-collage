"use client";

import Image from "next/image";
import Section from "./Section";
import { Illustration } from "./Illustrations";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import { isFilled } from "@/lib/content";

/** Campus gallery: real photos when available, drawings until then. */
export default function Gallery() {
  const { gallery } = useCollege();
  const { t, pick } = useLanguage();
  if (gallery.length === 0) return null;

  return (
    <Section id="campus" title={t.gallery.title} subtitle={t.gallery.subtitle} tinted>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
        {gallery.map((g) => (
          <li key={g.caption.en}>
            <figure className="overflow-hidden rounded-xl bg-white shadow-sm">
              {isFilled(g.photo) ? (
                <Image
                  src={g.photo}
                  alt={pick(g.caption)}
                  width={600}
                  height={450}
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <Illustration name={g.illustration} className="block aspect-[4/3] w-full" />
              )}
              <figcaption className="px-3 py-3 text-sm font-medium text-gray-900 sm:px-4 sm:text-base">
                {pick(g.caption)}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
