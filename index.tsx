import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About, Domains, Process, Services, WhyUs } from "@/components/site/Sections";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { FloatingWhatsApp } from "@/components/site/FloatingWhatsApp";
import { scrollToId } from "@/components/site/ui";

const TITLE = "ZENVIX — Project Development & Technology Solutions Centre";
const DESC = "ZENVIX in Salem, Tamil Nadu helps students, innovators and businesses turn ideas into working software, AI, hardware and IoT solutions. Build Ideas. Engineer the Future.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [preset, setPreset] = useState("");
  const [key, setKey] = useState(0);
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Services onEnquire={(s) => { setPreset(s); setKey((k) => k + 1); scrollToId("contact"); setTimeout(() => document.getElementById("f-name")?.focus({ preventScroll: true }), 600); }} />
        <Domains />
        <Process />
        <WhyUs />
        <Contact preset={preset} presetKey={key} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
