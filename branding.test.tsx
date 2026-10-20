import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import logoFull from "@/assets/zenvix-logo.png.asset.json";
import logoHeader from "@/assets/zenvix-logo-header.png.asset.json";

// The uploaded artwork already holds the name, description and tagline, so the
// header and footer must show that image and must not repeat its wording as text.
describe("ZENVIX brand logo", () => {
  it("shows the uploaded artwork in the header", () => {
    const { container } = render(<Header />);

    expect(container.querySelector("img")?.getAttribute("src")).toBe(logoHeader.url);
  });

  it("shows the full lockup in the footer without repeating its wording", () => {
    const { container } = render(<Footer />);

    expect(container.querySelector("img")?.getAttribute("src")).toBe(logoFull.url);
    expect(container.textContent).not.toContain("Build Ideas. Engineer the Future.");
    expect(container.textContent).not.toContain("Project Development & Technology Solutions Centre");
  });
});
