import { describe, expect, it } from "vitest";
import { buildEnquiryMessage, buildWhatsappChatUrl, buildWhatsappUrl, validateEnquiry, type Enquiry } from "@/lib/enquiry";
import { BUSINESS } from "@/config/business";

const ok: Enquiry = {
  name: "Asha",
  phone: "98765 43210",
  email: "asha@example.com",
  service: "Technical Mentoring",
  domain: "Internet of Things",
  description: "Need help with an IoT sensor project",
  timeline: "2–4 weeks",
};

describe("enquiry", () => {
  it("accepts a complete enquiry", () => expect(validateEnquiry(ok)).toEqual({}));
  it("rejects bad email", () => expect(validateEnquiry({ ...ok, email: "a@b" }).email).toBeTruthy());
  it("rejects short phone", () => expect(validateEnquiry({ ...ok, phone: "12345" }).phone).toBeTruthy());
  it("no WhatsApp URL when number unconfigured", () => expect(buildWhatsappUrl("", "hi")).toBeNull());
  it("rejects number with plus sign", () => expect(buildWhatsappUrl("+919876543210", "hi")).toBeNull());
  it("builds wa.me URL with encoded text", () =>
    expect(buildWhatsappUrl("919876543210", "a b")).toBe("https://wa.me/919876543210?text=a%20b"));

  it("opens WhatsApp to the configured ZENVIX number with the enquiry prefilled", () => {
    const url = buildWhatsappUrl(BUSINESS.whatsappNumber, buildEnquiryMessage(ok));
    expect(url).toBe("https://wa.me/919600311386?text=" + encodeURIComponent(buildEnquiryMessage(ok)));
    expect(url).toContain("Name%3A%20Asha");
  });

  it("exposes the official phone and email as dialable/writable links", () => {
    expect(BUSINESS.phoneHref).toBe("tel:+919600311386");
    expect(BUSINESS.officialEmail).toBe("zenvix2610@gmail.com");
    expect(validateEnquiry({ ...ok, email: BUSINESS.officialEmail }).email).toBeUndefined();
  });

  it("plain chat link uses https://wa.me/919600311386", () =>
    expect(buildWhatsappChatUrl(BUSINESS.whatsappNumber)).toBe("https://wa.me/919600311386"));

  it("prefilled message includes name, contact, service and description", () => {
    const msg = buildEnquiryMessage(ok);
    for (const s of ["Asha", "98765 43210", "asha@example.com", "Technical Mentoring", "IoT sensor project"]) expect(msg).toContain(s);
  });
});
