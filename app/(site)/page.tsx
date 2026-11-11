import Hero from "@/components/Hero";
import Notices from "@/components/Notices";
import Intro from "@/components/Intro";
import AdmissionInfo from "@/components/AdmissionInfo";
import EnquiryForm from "@/components/EnquiryForm";
import Highlights from "@/components/Highlights";
import Gallery from "@/components/Gallery";
import FindUs from "@/components/FindUs";
import { getCollege } from "@/config";
import { getLatestNotices } from "@/lib/notices";

// Re-build the page at most once a minute so new notices from the database appear
// (adding or editing a notice in /admin also refreshes it straight away).
export const revalidate = 60;

/** Home page. Top bar, header, footer and the mobile action bar come from app/(site)/layout.tsx. */
export default async function HomePage() {
  const college = getCollege();
  const notices = await getLatestNotices(college.id, 5);

  return (
    <>
      <Hero />
      <Notices notices={notices} />
      <Intro />
      <AdmissionInfo />
      <EnquiryForm />
      <Highlights />
      <Gallery />
      <FindUs />
    </>
  );
}
