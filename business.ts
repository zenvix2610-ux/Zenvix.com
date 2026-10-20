/**
 * Central business configuration — the ONLY place owner values should be edited.
 *
 * WHATSAPP_NUMBER: country code + number, digits only. No "+", spaces or dashes.
 *   Example format: 91XXXXXXXXXX (India).
 * PHONE_HREF: full tel: link, kept explicit so the dialling code is never guessed.
 */
export const BUSINESS = {
  name: "ZENVIX",
  fullName: "ZENVIX — Project Development & Technology Solutions Centre",
  tagline: "Build Ideas. Engineer the Future.",
  location: "Salem, Tamil Nadu, India",
  whatsappNumber: "919600311386",
  officialEmail: "zenvix2610@gmail.com",
  officialPhone: "+91 96003 11386",
  phoneHref: "tel:+919600311386",
} as const;

export const SERVICES = [
  "Academic Project Development",
  "AI & Software Solutions",
  "Hardware & IoT Solutions",
  "Technical Mentoring",
] as const;

export const DOMAINS = [
  "Artificial Intelligence and Machine Learning",
  "Web and Application Development",
  "Internet of Things",
  "Embedded Systems and Electronics",
  "Biomedical and Healthcare Technology",
  "Student Innovation Projects",
  "Other / Not sure yet",
] as const;

export const TIMELINES = [
  "Less than 2 weeks",
  "2–4 weeks",
  "1–2 months",
  "More than 2 months",
  "Flexible / Not sure",
] as const;
