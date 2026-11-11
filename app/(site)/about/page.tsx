import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon";

export const metadata: Metadata = { title: "About" };

// Placeholder — replace with the real About page later.
export default function Page() {
  return <ComingSoon page="about" />;
}
