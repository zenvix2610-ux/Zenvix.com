import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Contact } from "@/components/site/Contact";
import { openInNewTab, buildEnquiryMessage, type Enquiry } from "@/lib/enquiry";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

const enquiry: Enquiry = {
  name: "Asha & Kumar", phone: "9876543210", email: "asha@example.com",
  service: "Technical Mentoring", domain: "Internet of Things",
  description: "Sensors & monitoring / தமிழ்?", timeline: "2–4 weeks",
};

function fillEnquiry() {
  for (const [name, value] of Object.entries(enquiry)) {
    const field = document.getElementById(`f-${name}`);
    if (!field) throw new Error(`Missing field ${name}`);
    fireEvent.change(field, { target: { value } });
  }
}

describe("WhatsApp enquiry navigation", () => {
  it("blocks an empty enquiry before navigation", () => {
    render(<Contact preset="" presetKey={0} />);
    const allowed = fireEvent.click(screen.getByRole("link", { name: "Send via WhatsApp" }));
    expect(allowed).toBe(false);
    expect(document.querySelectorAll('[aria-invalid="true"]')).toHaveLength(7);
  });

  it("uses native navigation without window.open and preserves encoded customer details", () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    render(<Contact preset="" presetKey={0} />);
    fillEnquiry();
    const link = screen.getByRole("link", { name: "Send via WhatsApp" });
    expect(link.getAttribute("href")).toBe("https://wa.me/919600311386?text=" + encodeURIComponent(buildEnquiryMessage(enquiry)));
    expect(fireEvent.click(link)).toBe(true);
    expect(open).not.toHaveBeenCalled();
    const fallback = screen.getByRole("link", { name: "Open WhatsApp in this tab" });
    expect(fallback.getAttribute("href")).toBe(link.getAttribute("href"));
    expect(fallback.getAttribute("target")).toBe("_top");
  });

  it("retains the fallback after a keyboard submit encounters a thrown popup error", () => {
    const open = vi.spyOn(window, "open").mockImplementation(() => { throw new Error("Denied"); });
    render(<Contact preset="" presetKey={0} />);
    fillEnquiry();
    fireEvent.submit(screen.getByRole("form", { name: "Project enquiry form" }));
    expect(open).toHaveBeenCalledWith(expect.stringContaining("https://wa.me/919600311386?text="), "_blank", "noopener,noreferrer");
    expect(screen.getByRole("link", { name: "Open WhatsApp in this tab" }).getAttribute("href")).toContain("Name%3A%20Asha%20%26%20Kumar");
  });

  it("treats a blocked popup as a recoverable outcome", () => {
    vi.spyOn(window, "open").mockReturnValue(null);
    expect(openInNewTab("https://wa.me/919600311386")).toBe(false);
  });
});