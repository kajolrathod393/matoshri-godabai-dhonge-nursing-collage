import type { FeatureIcon as IconName } from "@/config/types";

/** Line icons for the "College Features" cards. Decorative only. */
const PATHS: Record<IconName, React.ReactNode> = {
  teacher: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a5 5 0 0 1 5-5h2a5 5 0 0 1 5 5v2" />
      <path d="M15 4h6v8h-5" />
    </>
  ),
  hospital: (
    <>
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M12 8v6M9 11h6" />
      <path d="M9 21v-4h6v4" />
    </>
  ),
  hostel: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v11h14V10" />
      <path d="M10 21v-6h4v6" />
    </>
  ),
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
      <path d="M4 19V5M9 7h6" />
    </>
  ),
  sports: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3.5 9h17M3.5 15h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  scholarship: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7" />
    </>
  ),
};

export default function FeatureIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}
