import type { CollegeConfig } from "../types";

/**
 * Matoshri Godabai Dhonge College of Nursing, Khambale (Ghoti).
 *
 * Facts below come from the college's 2026-27 admission pamphlet.
 * Values left empty ("") are hidden on the website until they are filled in.
 * Never add facts (seats, fees, approval numbers, results) that are not confirmed.
 */

const mgdcon: CollegeConfig = {
  id: "mgdcon",
  name: {
    en: "Matoshri Godabai Dhonge College of Nursing, Khambale",
    mr: "मातोश्री गोदाबाई धोंगे कॉलेज ऑफ नर्सिंग, खंबाळे (घोटी)",
  },
  shortName: "MGD College of Nursing",
  tagline: {
    en: "Shaping skilled and caring nurses for a healthier society",
    mr: "निरोगी समाजासाठी कुशल व संवेदनशील परिचारिका घडवणारे महाविद्यालय",
  },
  trust: {
    en: "Kranti Pratishthan, Shenit, Tal. Akole",
    mr: "क्रांती प्रतिष्ठान, शेणित, ता. अकोले संचलित",
  },
  collegeCode: "1431",
  affiliation: {
    en: "Approved by Govt. of Maharashtra · Affiliated to MSBNPE, Mumbai",
    mr: "महाराष्ट्र शासन मान्यता प्राप्त · महाराष्ट्र राज्य शुश्रुषा व परावैद्यक शिक्षण मंडळ, मुंबई संलग्न",
  },
  approvals: [
    { en: "Govt. of Maharashtra approved", mr: "महाराष्ट्र शासन मान्यता प्राप्त" },
    { en: "Affiliated to MSBNPE, Mumbai", mr: "MSBNPE, मुंबई संलग्न" },
  ],
  courses: [
    {
      name: { en: "GNM (General Nursing and Midwifery)", mr: "जी.एन.एम. (GNM)" },
      duration: { en: "3 years", mr: "३ वर्षे" },
      seats: "", // e.g. "40" — hidden on the website until filled in
      eligibility: {
        en: "12th pass (Arts / Commerce / Science)",
        mr: "इ. १२ वी (आर्ट्स / कॉमर्स / सायन्स) उत्तीर्ण",
      },
    },
  ],
  contact: {
    phone: "919321368463",
    phoneDisplay: "93213 68463",
    whatsapp: "", // TODO: add the college WhatsApp number when available
    whatsappChannel: "", // TODO: add the WhatsApp channel link when available
    email: "mgdcnursing@gmail.com",
    address: {
      en: "Shingvij Valley, Ghoti–Vaitarna Road, Khambale (Dahalewadi), Post Ghoti, Tal. Igatpuri, Dist. Nashik – 422402",
      mr: "शिंगवीज् व्हॅली, घोटी–वैतरणा रोड, खंबाळे (डहाळेवाडी), पो. घोटी, ता. इगतपुरी, जि. नाशिक – ४२२४०२",
    },
    // Paste the exact "Embed a map" link from Google Maps here when available.
    mapEmbedUrl: "",
    mapsQuery: "Khambale, Ghoti, Igatpuri, Nashik, Maharashtra 422402",
    // e.g. { en: "Mon–Sat, 10:00 am – 5:00 pm", mr: "सोम–शनि, सकाळी १० ते सायं. ५" } — hidden until filled in
    officeHours: { en: "", mr: "" },
    people: [
      { name: { en: "Shri Ganesh Khandare", mr: "श्री. गणेश खंदारे सर" }, phone: "7822975800" },
      { name: { en: "Shri Namdev Dhonge", mr: "श्री. नामदेव धोंगे सर" }, phone: "7821961504" },
      { name: { en: "Shri Rongte", mr: "श्री. रोंगटे सर" }, phone: "9923919580" },
      { name: { en: "Shri Pandharinath Dhonge", mr: "श्री. पंढरीनाथ धोंगे सर" }, phone: "8108671411" },
    ],
  },
  theme: {
    primary: "#0F766E", // teal-700, 5.5:1 on white
    primaryDark: "#115E59", // teal-800
    primaryLight: "#F0FDFA", // teal-50
    accent: "#B45309", // amber-700, 5.0:1 on white
  },
  // Temporary logo cut from the pamphlet — replace public/mgdcon/logo.png with the original file.
  logo: "/mgdcon/logo.png",
  // Update after the first Vercel deploy / when the real domain is live.
  siteUrl: "https://mgdcon.vercel.app",
  admissions: {
    open: true,
    year: "2026-27",
    course: { en: "GNM course", mr: "GNM कोर्स" },
  },
  documents: [
    { en: "10th and 12th mark sheets and passing certificates", mr: "इ. १० वी व १२ वी गुणपत्रिका व उत्तीर्ण प्रमाणपत्र" },
    { en: "School / College Leaving Certificate", mr: "शाळा / महाविद्यालय सोडल्याचा दाखला" },
    { en: "Aadhaar card", mr: "आधार कार्ड" },
    { en: "Domicile certificate", mr: "अधिवास (डोमिसाईल) प्रमाणपत्र" },
    { en: "Caste certificate and validity (if applicable)", mr: "जातीचे प्रमाणपत्र व वैधता प्रमाणपत्र (लागू असल्यास)" },
    { en: "Medical fitness certificate", mr: "वैद्यकीय तंदुरुस्ती प्रमाणपत्र" },
    { en: "Recent passport-size photographs", mr: "अलीकडील पासपोर्ट आकाराचे फोटो" },
  ],
  intro: {
    paragraphs: [
      {
        en: "Matoshri Godabai Dhonge College of Nursing, Khambale (Ghoti) is run by Kranti Pratishthan, Shenit, Tal. Akole. The college is approved by the Government of Maharashtra and affiliated to the Maharashtra State Board of Nursing and Paramedical Education (MSBNPE), Mumbai.",
        mr: "मातोश्री गोदाबाई धोंगे कॉलेज ऑफ नर्सिंग, खंबाळे (घोटी) हे क्रांती प्रतिष्ठान, शेणित, ता. अकोले संचलित महाविद्यालय आहे. महाविद्यालयास महाराष्ट्र शासनाची मान्यता असून ते महाराष्ट्र राज्य शुश्रुषा व परावैद्यक शिक्षण मंडळ, मुंबई यांच्याशी संलग्न आहे.",
      },
      {
        en: "Located on the Ghoti–Vaitarna Road in Igatpuri taluka, Nashik district, the college offers the three-year GNM (General Nursing and Midwifery) course for students who have passed 12th standard in Arts, Commerce or Science.",
        mr: "नाशिक जिल्ह्यातील इगतपुरी तालुक्यात घोटी–वैतरणा रोडवर असलेल्या या महाविद्यालयात इ. १२ वी (आर्ट्स / कॉमर्स / सायन्स) उत्तीर्ण विद्यार्थ्यांसाठी तीन वर्षांचा GNM (जनरल नर्सिंग अँड मिडवायफरी) अभ्यासक्रम उपलब्ध आहे.",
      },
      {
        en: "Students learn through classroom teaching, well-equipped labs and practical training in government and private hospitals, so that they can serve patients and communities with skill and compassion.",
        mr: "वर्गातील अध्यापन, सुसज्ज प्रयोगशाळा आणि शासकीय व खाजगी रुग्णालयांतील प्रात्यक्षिक प्रशिक्षणातून विद्यार्थी रुग्णांची व समाजाची कौशल्याने आणि संवेदनशीलतेने सेवा करण्यास तयार होतात.",
      },
    ],
    purpose: {
      en: "To prepare competent and caring nurses who can give quality nursing care in hospitals and in the community, especially in rural areas.",
      mr: "रुग्णालयांत तसेच समाजात, विशेषतः ग्रामीण भागात, दर्जेदार शुश्रूषा सेवा देऊ शकतील अशा सक्षम व संवेदनशील परिचारिका घडवणे.",
    },
    objectives: [
      {
        en: "Give safe nursing care to individuals, families and communities, in hospitals and at home.",
        mr: "रुग्णालयात व घरी व्यक्ती, कुटुंब आणि समाजाला सुरक्षित शुश्रूषा सेवा देणे.",
      },
      {
        en: "Provide skilled care to mothers and newborn babies, including midwifery care.",
        mr: "माता व नवजात बालकांना प्रसूतीसह कुशल शुश्रूषा सेवा देणे.",
      },
      {
        en: "Promote good health and help prevent disease through health education.",
        mr: "आरोग्य शिक्षणाद्वारे चांगले आरोग्य वाढवणे व आजार टाळण्यास मदत करणे.",
      },
      {
        en: "Work as a responsible member of the health care team.",
        mr: "आरोग्य सेवा पथकाचा जबाबदार सदस्य म्हणून काम करणे.",
      },
      {
        en: "Follow the ethics and values of the nursing profession.",
        mr: "परिचर्या व्यवसायातील नीतिमूल्ये व मूल्यांचे पालन करणे.",
      },
      {
        en: "Keep learning and growing as a nursing professional.",
        mr: "परिचारिका म्हणून सतत शिकत राहणे व व्यावसायिक प्रगती करणे.",
      },
    ],
    approvedBy: [
      { en: "Government of Maharashtra", mr: "महाराष्ट्र शासन" },
      {
        en: "Maharashtra State Board of Nursing and Paramedical Education (MSBNPE), Mumbai",
        mr: "महाराष्ट्र राज्य शुश्रुषा व परावैद्यक शिक्षण मंडळ, मुंबई",
      },
      // INC and MNC are not on the pamphlet. Once the college office confirms them,
      // remove the "//" in front of the matching line (add the approval letter number if you want to show it):
      // { en: "Indian Nursing Council (INC), New Delhi", mr: "भारतीय परिचर्या परिषद (INC), नवी दिल्ली" },
      // { en: "Maharashtra Nursing Council (MNC), Mumbai", mr: "महाराष्ट्र परिचर्या परिषद (MNC), मुंबई" },
    ],
  },
  // From the "कॉलेजची वैशिष्ट्ये" list on the 2026-27 pamphlet.
  highlights: [
    { en: "Experienced and qualified teaching staff", mr: "अनुभवी व तज्ञ प्राध्यापक", icon: "teacher" },
    {
      en: "Practical training in government and private hospitals, with bus facility",
      mr: "शासकिय व खाजगी रुग्णालयांमध्ये प्रात्यक्षिक प्रशिक्षण, बसची सुविधा",
      icon: "hospital",
    },
    { en: "Free hostel facility for girls", mr: "मुलींसाठी वसतिगृहाची मोफत सोय", icon: "hostel" },
    {
      en: "Well-equipped library, laboratory and computer lab",
      mr: "सुसज्ज ग्रंथालय, प्रयोग शाळा व कॉम्प्युटर लॅब",
      icon: "book",
    },
    { en: "Sports ground and sports equipment", mr: "सुसज्ज क्रिडांगण व खेळाचे साहित्य", icon: "sports" },
    {
      en: "Scholarships for students as per government rules",
      mr: "शासन नियमानुसार विद्यार्थ्यांसाठी शिष्यवृत्तीची सुविधा",
      icon: "scholarship",
    },
  ],
  // Photo next to the "Welcome to our College" text. Empty = nurse drawing.
  // Example: copy students.jpg to public/mgdcon/ and set introPhoto: "/mgdcon/students.jpg"
  introPhoto: "/mgdcon/welcome.webp",
  // Campus gallery: drawings are shown until real photos are added.
  // To use a photo: copy it to public/mgdcon/ (e.g. lab.jpg) and set photo: "/mgdcon/lab.jpg".
  gallery: [
    { illustration: "lab", caption: { en: "Nursing laboratory", mr: "नर्सिंग प्रयोगशाळा" }, photo: "/mgdcon/gallery-lab.jpg" },
    { illustration: "hospital", caption: { en: "Practical training in hospitals", mr: "रुग्णालयातील प्रात्यक्षिक प्रशिक्षण" }, photo: "/mgdcon/gallery-hospital.jpg" },
    { illustration: "classroom", caption: { en: "Classroom teaching", mr: "वर्गातील अध्यापन" }, photo: "/mgdcon/gallery-classroom.jpg" },
    { illustration: "library", caption: { en: "Library", mr: "ग्रंथालय" }, photo: "/mgdcon/gallery-library.jpg" },
    { illustration: "computer", caption: { en: "Computer lab", mr: "कॉम्प्युटर लॅब" }, photo: "/mgdcon/gallery-computer.jpg" },
    { illustration: "hostel", caption: { en: "Girls' hostel", mr: "मुलींचे वसतिगृह" }, photo: "/mgdcon/gallery-hostel.jpg" },
  ],
};

export default mgdcon;
