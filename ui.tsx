import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BUSINESS } from "@/config/business";
import logoFullAsset from "@/assets/zenvix-logo.png.asset.json";
import logoHeaderAsset from "@/assets/zenvix-logo-header.png.asset.json";

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift active:translate-y-0 disabled:opacity-60",
  outline:
    "inline-flex items-center justify-center gap-2 rounded-full border border-input bg-card px-6 py-3 text-sm font-semibold text-heading transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary",
  ghost:
    "inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-navy",
};

/**
 * The uploaded ZENVIX artwork carries the name, description and tagline inside
 * the image, so nothing is rendered beside it.
 *  - "header": emblem + ZENVIX (the two small lines drop below navbar legibility)
 *  - "full":   emblem + ZENVIX + description + tagline
 */
const LOGOS = {
  header: { src: logoHeaderAsset.url, width: 1041, height: 737 },
  full: { src: logoFullAsset.url, width: 1041, height: 887 },
} as const;

export function Logo({ variant = "full", className }: { variant?: keyof typeof LOGOS; className?: string }) {
  const logo = LOGOS[variant];
  return (
    <img
      src={logo.src}
      alt={`${BUSINESS.fullName}. ${BUSINESS.tagline}`}
      width={logo.width}
      height={logo.height}
      decoding="async"
      className={cn("block w-auto", className)}
    />
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && (setShown(true), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-shown={shown} className={cn("reveal", className)} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, intro, center }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <Reveal className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <p className="eyebrow"><span className="h-px w-6 bg-primary" aria-hidden="true" />{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>}
    </Reveal>
  );
}

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
