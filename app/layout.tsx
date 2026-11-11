import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari } from "next/font/google";
import { getCollege } from "@/config";
import { CollegeProvider } from "@/components/CollegeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const devanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

const college = getCollege();

export const metadata: Metadata = {
  metadataBase: new URL(college.siteUrl),
  title: { default: college.name.en, template: `%s | ${college.shortName}` },
  icons: { icon: college.logo },
};

export const viewport: Viewport = {
  themeColor: college.theme.primary,
};

/** Root layout: fonts, theme colours and providers. Page chrome lives in app/(site)/layout.tsx. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeVars = {
    "--primary": college.theme.primary,
    "--primary-dark": college.theme.primaryDark,
    "--primary-light": college.theme.primaryLight,
    "--accent": college.theme.accent,
  } as React.CSSProperties;

  return (
    <html lang="en" style={themeVars} className={`${inter.variable} ${devanagari.variable}`}>
      <body className="font-sans antialiased">
        <CollegeProvider college={college}>
          <LanguageProvider>{children}</LanguageProvider>
        </CollegeProvider>
      </body>
    </html>
  );
}
