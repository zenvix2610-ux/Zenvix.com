import { BUSINESS, SERVICES } from "@/config/business";
import { NAV } from "./Header";
import { Logo } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo className="w-44 sm:w-60" />
          <p className="mt-6 text-sm text-muted-foreground">{BUSINESS.location}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            <a className="hover:text-primary" href={`mailto:${BUSINESS.officialEmail}`}>{BUSINESS.officialEmail}</a>
            <span aria-hidden="true"> · </span>
            <a className="hover:text-primary" href={BUSINESS.phoneHref}>{BUSINESS.officialPhone}</a>
          </p>
        </div>
        <nav aria-label="Footer">
          <h3 className="text-sm font-semibold">Navigate</h3>
          <ul className="mt-4 space-y-2 text-sm">{NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="text-muted-foreground hover:text-primary">{n.label}</a></li>)}</ul>
        </nav>
        <div>
          <h3 className="text-sm font-semibold">Services</h3>
          <ul className="mt-4 space-y-2 text-sm">{SERVICES.map((s) => <li key={s}><a href="#services" className="text-muted-foreground hover:text-primary">{s}</a></li>)}</ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ZENVIX. All rights reserved.
      </div>
    </footer>
  );
}
