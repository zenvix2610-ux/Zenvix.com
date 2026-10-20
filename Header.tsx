import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, btn } from "./ui";
import { cn } from "@/lib/utils";

export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "domains", label: "Domains" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("keydown", esc); };
  }, []);

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-all", scrolled || open ? "border-border bg-card/90 backdrop-blur-md" : "border-transparent bg-background/0")}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-18">
        <a href="#home" aria-label="ZENVIX home" onClick={() => setOpen(false)}>
          <Logo variant="header" className="h-12 sm:h-14" />
        </a>
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <li key={n.id}>
              <a href={`#${n.id}`} className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-primary">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href="#contact" className={cn(btn.primary, "hidden px-5 py-2.5 sm:inline-flex")}>Start a Project</a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-heading lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-border bg-card lg:hidden">
          <ul className="mx-auto max-w-6xl space-y-1 px-5 py-4">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-medium text-heading hover:bg-accent">{n.label}</a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#contact" onClick={() => setOpen(false)} className={cn(btn.primary, "w-full")}>Start a Project</a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
