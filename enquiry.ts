export type Enquiry = {
  name: string;
  phone: string;
  email: string;
  service: string;
  domain: string;
  description: string;
  timeline: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(e: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (e.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = e.phone.replace(/[\s\-()+]/g, "");
  if (!/^\d{10,15}$/.test(digits)) errors.phone = "Enter a valid phone number (10–15 digits).";
  if (!EMAIL_RE.test(e.email.trim())) errors.email = "Enter a valid email address.";
  if (!e.service) errors.service = "Please choose a service.";
  if (!e.domain) errors.domain = "Please choose a project domain.";
  if (e.description.trim().length < 15)
    errors.description = "Please describe your project in at least 15 characters.";
  if (!e.timeline) errors.timeline = "Please choose an expected timeline.";
  return errors;
}

/** Digits only, 8–15 long (country code + number). */
export function isValidWhatsappNumber(n: string): boolean {
  return /^\d{8,15}$/.test(n);
}

export function buildEnquiryMessage(e: Enquiry): string {
  return [
    "Hello ZENVIX, I would like to enquire about a project.",
    "",
    `Name: ${e.name.trim()}`,
    `Phone: ${e.phone.trim()}`,
    `Email: ${e.email.trim()}`,
    `Service required: ${e.service}`,
    `Project domain: ${e.domain}`,
    `Expected timeline: ${e.timeline}`,
    "",
    "Project description:",
    e.description.trim(),
  ].join("\n");
}

export function buildWhatsappUrl(number: string, message: string): string | null {
  if (!isValidWhatsappNumber(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/** Plain chat link (no prefilled text), e.g. https://wa.me/919600311386 */
export function buildWhatsappChatUrl(number: string): string | null {
  return isValidWhatsappNumber(number) ? `https://wa.me/${number}` : null;
}

/**
 * Call synchronously from a user action. A denied or throwing popup must not
 * interrupt the form; the caller always retains a normal navigation fallback.
 */
export function openInNewTab(url: string): boolean {
  try {
    const w = window.open(url, "_blank", "noopener,noreferrer");
    // With noopener, browsers can return null even when a tab opens.
    // This result is only a hint, never proof WhatsApp opened or sent anything.
    return w !== null;
  } catch {
    return false;
  }
}
