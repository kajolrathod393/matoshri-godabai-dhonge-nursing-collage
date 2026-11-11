/** Text in both site languages. */
export type Bilingual = { en: string; mr: string };

/** Drawings available in components/Illustrations.tsx. */
export type IllustrationName =
  | "nurse"
  | "lab"
  | "hospital"
  | "library"
  | "computer"
  | "hostel"
  | "sports"
  | "classroom";

/** Small icons for the "College Features" cards (components/FeatureIcon.tsx). */
export type FeatureIcon = "teacher" | "hospital" | "hostel" | "book" | "sports" | "scholarship";

export type Course = {
  name: Bilingual;
  duration: Bilingual;
  seats: string;
  eligibility: Bilingual;
};

export type Person = { name: Bilingual; phone: string };

export type CollegeConfig = {
  /** Matches the COLLEGE env variable, and the folder names in data/ and public/. */
  id: string;
  name: Bilingual;
  shortName: string;
  tagline: Bilingual;
  /** Trust / society that runs the college. */
  trust: Bilingual;
  collegeCode: string;
  /** One-line text shown under the college name in the header. */
  affiliation: Bilingual;
  /** Shown as text badges in the hero. */
  approvals: Bilingual[];
  courses: Course[];
  contact: {
    /** Digits only, with country code, e.g. "919321368463". Used for tel: links. */
    phone: string;
    phoneDisplay: string;
    /**
     * WhatsApp number, digits only with country code (e.g. "919876543210").
     * Leave "" to just open the WhatsApp app with an enquiry message.
     */
    whatsapp: string;
    /** WhatsApp channel / group invite link. Leave "" if none. */
    whatsappChannel: string;
    email: string;
    address: Bilingual;
    /** Google Maps "Embed a map" iframe src. Leave "" to build the map from mapsQuery. */
    mapEmbedUrl: string;
    /** Used to build the "Directions" link. */
    mapsQuery: string;
    officeHours: Bilingual;
    people: Person[];
  };
  theme: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    accent: string;
  };
  /** Path under /public. */
  logo: string;
  /** Public site URL, used for metadata and JSON-LD. */
  siteUrl: string;
  /** Admissions card in the hero: set open to false to hide it. */
  admissions: { open: boolean; year: string; course: Bilingual };
  /** Documents usually needed for admission (shown with a "confirm with office" note). */
  documents: Bilingual[];
  /** Home-page introduction block (like the reference site): intro, purpose, objectives, approved by. */
  intro: {
    paragraphs: Bilingual[];
    purpose: Bilingual;
    objectives: Bilingual[];
    /** Full names of approving / affiliating bodies. */
    approvedBy: Bilingual[];
  };
  /** "College features" shown on the home page (from official material only). */
  highlights: (Bilingual & { icon: FeatureIcon })[];
  /**
   * Campus gallery on the home page. Each item shows a drawing until a real photo is added:
   * put the photo in public/mgdcon/ and set e.g. photo: "/mgdcon/lab.jpg".
   */
  gallery: { illustration: IllustrationName; caption: Bilingual; photo: string }[];
  /** Photo next to the "Welcome" text (e.g. "/mgdcon/students.jpg"). Empty = nurse drawing. */
  introPhoto: string;
};
