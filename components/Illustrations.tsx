/**
 * Original flat illustrations for the home page, drawn in the college theme colours.
 * Used until real campus photos are added (see `gallery` in config/colleges/mgdcon.ts).
 * They are decorative, so they are hidden from screen readers.
 */

const SKIN = "fill-[#c98d6b]";
const HAIR = "fill-[#2f2a28]";
const INK = "stroke-[#334155]";

import type { IllustrationName } from "@/config/types";
export type { IllustrationName };

type Props = { className?: string };

/** Nurse with cap, uniform and stethoscope. */
export function NurseIllustration({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" className={className}>
      <circle cx="120" cy="120" r="112" className="fill-primary-light" />
      <circle cx="196" cy="58" r="16" className="fill-white" />
      <path d="M190 58h12M196 52v12" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
      <circle cx="44" cy="150" r="10" className="fill-white" />
      {/* uniform */}
      <path d="M58 236c0-52 22-80 62-84 40 4 62 32 62 84z" className="fill-primary" />
      <path d="M104 152l16 26 16-26z" className="fill-white" />
      <rect x="138" y="190" width="22" height="14" rx="2" className="fill-white" opacity=".9" />
      {/* neck + head */}
      <rect x="110" y="132" width="20" height="24" rx="6" className={SKIN} />
      <circle cx="120" cy="108" r="34" className={SKIN} />
      {/* hair */}
      <path d="M86 112c-4-30 12-48 34-48s38 18 34 48c-6-18-18-26-34-26s-28 8-34 26z" className={HAIR} />
      <circle cx="120" cy="66" r="12" className={HAIR} />
      {/* cap */}
      <path d="M94 82l6-22h40l6 22z" className="fill-white stroke-primary-dark" strokeWidth="2" />
      <path d="M120 64v12M114 70h12" className="stroke-accent" strokeWidth="4" strokeLinecap="round" />
      {/* face */}
      <circle cx="108" cy="110" r="3" className="fill-[#2f2a28]" />
      <circle cx="132" cy="110" r="3" className="fill-[#2f2a28]" />
      <path d="M110 124q10 8 20 0" className="stroke-[#7a3e2b]" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* stethoscope */}
      <path d="M106 154c-6 30 2 46 14 48 12-2 20-18 14-48" className={INK} strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="120" cy="206" r="8" className="fill-[#334155]" />
      <circle cx="120" cy="206" r="4" className="fill-[#94a3b8]" />
    </svg>
  );
}

function Frame({ children, className = "" }: Props & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 200 150" aria-hidden="true" className={className} preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="150" className="fill-primary-light" />
      <circle cx="170" cy="28" r="40" className="fill-white" opacity=".6" />
      <rect y="122" width="200" height="28" className="fill-primary" opacity=".12" />
      {children}
    </svg>
  );
}

/** Microscope and flasks. */
export function LabIllustration(p: Props) {
  return (
    <Frame {...p}>
      <rect x="40" y="114" width="56" height="10" rx="3" className="fill-[#334155]" />
      <path d="M62 114v-16h22l-6-40" className="stroke-[#334155]" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="66" y="34" width="14" height="40" rx="4" transform="rotate(-18 73 54)" className="fill-primary-dark" />
      <rect x="50" y="94" width="34" height="6" rx="2" className="fill-[#94a3b8]" />
      <path d="M124 70h16v18l16 30a5 5 0 0 1-4 7h-40a5 5 0 0 1-4-7l16-30z" className="fill-white stroke-[#334155]" strokeWidth="3" />
      <path d="M113 112l9-16h20l9 16a4 4 0 0 1-3 6h-32a4 4 0 0 1-3-6z" className="fill-primary" />
      <rect x="160" y="84" width="12" height="38" rx="5" className="fill-white stroke-[#334155]" strokeWidth="3" />
      <rect x="162" y="102" width="8" height="18" rx="3" className="fill-accent" />
      <circle cx="140" cy="60" r="4" className="fill-primary" opacity=".5" />
      <circle cx="132" cy="50" r="3" className="fill-primary" opacity=".4" />
    </Frame>
  );
}

/** Hospital building with a cross — practical training. */
export function HospitalIllustration(p: Props) {
  return (
    <Frame {...p}>
      <rect x="44" y="44" width="112" height="80" rx="4" className="fill-white stroke-[#334155]" strokeWidth="3" />
      <rect x="82" y="22" width="36" height="30" rx="4" className="fill-white stroke-[#334155]" strokeWidth="3" />
      <path d="M100 28v18M91 37h18" className="stroke-accent" strokeWidth="6" strokeLinecap="round" />
      {[56, 78, 112, 134].map((x) => (
        <g key={x}>
          <rect x={x} y="58" width="12" height="12" rx="2" className="fill-primary" opacity=".7" />
          <rect x={x} y="80" width="12" height="12" rx="2" className="fill-primary" opacity=".7" />
        </g>
      ))}
      <rect x="88" y="98" width="24" height="26" rx="2" className="fill-primary-dark" />
      <rect x="20" y="104" width="22" height="20" rx="10" className="fill-primary" opacity=".35" />
      <rect x="160" y="100" width="24" height="24" rx="12" className="fill-primary" opacity=".35" />
    </Frame>
  );
}

/** Bookshelf. */
export function LibraryIllustration(p: Props) {
  const books = [
    [52, 22, "fill-primary"],
    [62, 26, "fill-accent"],
    [72, 20, "fill-primary-dark"],
    [82, 24, "fill-[#94a3b8]"],
    [108, 26, "fill-primary-dark"],
    [118, 20, "fill-primary"],
    [128, 24, "fill-accent"],
    [138, 22, "fill-[#94a3b8]"],
  ] as const;
  return (
    <Frame {...p}>
      <rect x="44" y="28" width="112" height="96" rx="4" className="fill-white stroke-[#334155]" strokeWidth="3" />
      <path d="M44 76h112" className="stroke-[#334155]" strokeWidth="3" />
      {books.map(([x, h, c], i) => (
        <rect key={i} x={x} y={76 - h - 2 + (i > 3 ? 0 : 0)} width="9" height={h} rx="1.5" className={c} />
      ))}
      {books.map(([x, h, c], i) => (
        <rect key={`b${i}`} x={x} y={122 - h - 2} width="9" height={h} rx="1.5" className={c} opacity=".85" />
      ))}
      <path d="M96 104l14-8 4 6-14 8z" className="fill-primary" />
    </Frame>
  );
}

/** Desktop computer. */
export function ComputerIllustration(p: Props) {
  return (
    <Frame {...p}>
      <rect x="50" y="30" width="100" height="66" rx="6" className="fill-[#334155]" />
      <rect x="57" y="37" width="86" height="52" rx="3" className="fill-white" />
      <rect x="64" y="45" width="40" height="6" rx="3" className="fill-primary" />
      <rect x="64" y="57" width="70" height="4" rx="2" className="fill-[#cbd5e1]" />
      <rect x="64" y="65" width="60" height="4" rx="2" className="fill-[#cbd5e1]" />
      <rect x="64" y="73" width="30" height="8" rx="2" className="fill-accent" />
      <path d="M92 96h16l4 14H88z" className="fill-[#334155]" />
      <rect x="54" y="112" width="92" height="10" rx="3" className="fill-[#94a3b8]" />
      <rect x="152" y="108" width="14" height="14" rx="7" className="fill-[#94a3b8]" />
    </Frame>
  );
}

/** Hostel building. */
export function HostelIllustration(p: Props) {
  return (
    <Frame {...p}>
      <path d="M36 62l64-36 64 36z" className="fill-primary-dark" />
      <rect x="46" y="62" width="108" height="62" className="fill-white stroke-[#334155]" strokeWidth="3" />
      {[58, 84, 124].map((x) => (
        <g key={x}>
          <rect x={x} y="72" width="18" height="16" rx="2" className="fill-primary" opacity=".7" />
          <rect x={x} y="96" width="18" height="16" rx="2" className="fill-primary" opacity=".7" />
        </g>
      ))}
      <rect x="104" y="96" width="16" height="28" rx="2" className="fill-accent" />
      <circle cx="24" cy="108" r="14" className="fill-primary" opacity=".35" />
      <rect x="22" y="108" width="4" height="16" className="fill-[#7a5a3a]" />
      <circle cx="178" cy="106" r="12" className="fill-primary" opacity=".35" />
      <rect x="176" y="106" width="4" height="18" className="fill-[#7a5a3a]" />
    </Frame>
  );
}

/** Sports ground with ball and net. */
export function SportsIllustration(p: Props) {
  return (
    <Frame {...p}>
      <rect x="20" y="96" width="160" height="28" rx="4" className="fill-primary" opacity=".5" />
      <path d="M100 96v28" className="stroke-white" strokeWidth="3" />
      <circle cx="100" cy="110" r="8" className="fill-none stroke-white" strokeWidth="3" />
      <path d="M40 96V54M160 96V54" className="stroke-[#334155]" strokeWidth="4" />
      <path d="M40 58h120M40 70h120M40 82h120" className="stroke-[#94a3b8]" strokeWidth="2" />
      <path d="M60 58v24M80 58v24M100 58v24M120 58v24M140 58v24" className="stroke-[#94a3b8]" strokeWidth="2" />
      <circle cx="130" cy="38" r="14" className="fill-white stroke-[#334155]" strokeWidth="3" />
      <path d="M118 34q12 6 24 0M124 26q6 12 0 24" className="stroke-accent" strokeWidth="3" fill="none" />
    </Frame>
  );
}

/** Classroom board — teaching. */
export function ClassroomIllustration(p: Props) {
  return (
    <Frame {...p}>
      <rect x="36" y="26" width="128" height="72" rx="4" className="fill-primary-dark" />
      <rect x="36" y="98" width="128" height="6" rx="2" className="fill-[#94a3b8]" />
      <path d="M56 48h40M56 62h60M56 76h30" className="stroke-white" strokeWidth="4" strokeLinecap="round" opacity=".9" />
      <path d="M130 46v24M118 58h24" className="stroke-accent" strokeWidth="6" strokeLinecap="round" />
      <circle cx="70" cy="116" r="8" className={SKIN} />
      <circle cx="100" cy="116" r="8" className={SKIN} />
      <circle cx="130" cy="116" r="8" className={SKIN} />
    </Frame>
  );
}

const MAP: Record<IllustrationName, (p: Props) => React.ReactElement> = {
  nurse: NurseIllustration,
  lab: LabIllustration,
  hospital: HospitalIllustration,
  library: LibraryIllustration,
  computer: ComputerIllustration,
  hostel: HostelIllustration,
  sports: SportsIllustration,
  classroom: ClassroomIllustration,
};

export function Illustration({ name, className }: { name: IllustrationName; className?: string }) {
  const Comp = MAP[name];
  return <Comp className={className} />;
}
