import SkipLink from "@/components/SkipLink";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";

/** Public website pages: top bar, header, footer and the mobile action bar. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16 lg:pb-0">
      <SkipLink />
      <TopBar />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <MobileActionBar />
    </div>
  );
}
