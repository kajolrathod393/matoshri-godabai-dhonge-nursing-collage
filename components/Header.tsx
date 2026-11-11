"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCollege } from "./CollegeProvider";
import { useLanguage } from "./LanguageProvider";
import type { Dictionary } from "@/i18n";
import LanguageToggle from "./LanguageToggle";

type NavItem = { key: keyof Dictionary["nav"]; href: string };

/** Each menu item is its own page. Add a folder in app/ for every new page. */
export const NAV_ITEMS: NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "courses", href: "/courses" },
  { key: "admissions", href: "/admissions" },
  { key: "muhsMandate", href: "/muhs-mandate" },
  { key: "contact", href: "/contact" },
];

export default function Header() {
  const college = useCollege();
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const otherLang = lang === "en" ? "mr" : "en";

  return (
    <header className="z-40 lg:sticky lg:top-0 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5 sm:py-5">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-3 sm:gap-5">
          <Image
            src={college.logo}
            alt={t.common.logoAlt}
            width={96}
            height={96}
            priority
            className="h-14 w-14 shrink-0 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
          />
          <span className="min-w-0">
            <span className="block text-[0.95rem] font-bold leading-snug text-primary sm:text-xl md:text-2xl lg:text-[1.7rem]">
              {college.name[lang]}
            </span>
            <span lang={otherLang} className="mt-0.5 block text-[0.8rem] leading-snug text-gray-800 sm:text-base md:text-lg">
              {college.name[otherLang]}
            </span>
            <span className="mt-0.5 hidden text-sm leading-snug text-gray-600 sm:block">
              {college.affiliation[lang]}
            </span>
          </span>
        </Link>

        <LanguageToggle className="hidden md:inline-flex" />

        <button
          type="button"
          className="shrink-0 rounded-md border border-gray-300 p-2.5 text-primary md:hidden"
          aria-expanded={open}
          aria-controls="main-menu"
          aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      <nav aria-label={t.nav.label} className="border-t border-gray-100">
        <ul
          id="main-menu"
          className={`${open ? "block" : "hidden"} mx-auto max-w-6xl px-3 pb-3 md:flex md:flex-wrap md:gap-1 md:px-5 md:pb-0 lg:gap-2`}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.key}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === item.href ? "page" : undefined}
                className="block rounded px-3 py-3 font-medium text-gray-800 hover:bg-primary-light hover:text-primary aria-[current=page]:text-primary aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8 md:px-2.5 lg:px-3"
              >
                {t.nav[item.key]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
