import { useEffect, useState, type FormEvent, type MouseEvent } from "react";
import { AlertCircle, CheckCircle2, Copy, ExternalLink, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BUSINESS, DOMAINS, SERVICES, TIMELINES } from "@/config/business";
import { buildEnquiryMessage, buildWhatsappChatUrl, buildWhatsappUrl, openInNewTab, validateEnquiry, type Enquiry, type EnquiryErrors } from "@/lib/enquiry";
import { SectionHead, btn } from "./ui";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const EMPTY: Enquiry = { name: "", phone: "", email: "", service: "", domain: "", description: "", timeline: "" };
type Status = { kind: "success" | "error" | "info"; text: string } | null;

const field = "mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/15";

export function Contact({ preset, presetKey }: { preset: string; presetKey: number }) {
  const [v, setV] = useState<Enquiry>(EMPTY);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>(null);
  const [fallbackUrl, setFallbackUrl] = useState<string | null>(null);
  const waChat = buildWhatsappChatUrl(BUSINESS.whatsappNumber);
  const waConfigured = waChat !== null;
  const enquiryUrl = buildWhatsappUrl(BUSINESS.whatsappNumber, buildEnquiryMessage(v));

  useEffect(() => {
    if (preset) setV((p) => ({ ...p, service: preset }));
  }, [preset, presetKey]);

  const set = (k: keyof Enquiry) => (e: { target: { value: string } }) => {
    setV((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
    setStatus(null);
    setFallbackUrl(null);
  };

  const check = () => {
    const errs = validateEnquiry(v);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      document.getElementById(`f-${first}`)?.focus();
      setStatus({ kind: "error", text: "Please fix the highlighted fields." });
      return false;
    }
    return true;
  };

  const copy = async () => {
    if (!check()) return;
    try {
      await navigator.clipboard.writeText(buildEnquiryMessage(v));
      setStatus({ kind: "success", text: "Enquiry message copied. Paste it into WhatsApp, email or SMS to send it to ZENVIX." });
    } catch {
      setStatus({ kind: "error", text: "Couldn't access the clipboard. Please select and copy the preview below manually." });
    }
  };

  const prepare = () => {
    if (!check()) return null;
    if (!enquiryUrl) {
      setStatus({ kind: "info", text: "WhatsApp isn't set up yet for this site. Copy your enquiry message to contact ZENVIX directly." });
      return null;
    }
    setFallbackUrl(enquiryUrl);
    setStatus({ kind: "info", text: "Continue in WhatsApp and tap Send there. If the new tab doesn't open, use the link below to continue in this tab. Nothing has been sent or stored by this website." });
    return enquiryUrl;
  };

  // A real anchor lets the browser handle navigation without window.open.
  const followEnquiry = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!prepare()) e.preventDefault();
  };

  // Preserve keyboard/native form submission; no await or delayed popup.
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const url = prepare();
    if (url) openInNewTab(url);
  };

  const err = (k: keyof Enquiry) =>
    errors[k] && <p id={`e-${k}`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-destructive"><AlertCircle className="h-3.5 w-3.5" />{errors[k]}</p>;
  const a11y = (k: keyof Enquiry) => ({
    id: `f-${k}`, name: k, required: true, value: v[k], onChange: set(k),
    "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined,
    className: cn(field, errors[k] ? "border-destructive" : "border-input"),
  });
  const label = (k: keyof Enquiry, t: string) => <label htmlFor={`f-${k}`} className="text-sm font-semibold text-heading">{t} <span className="text-destructive" aria-hidden="true">*</span></label>;

  return (
    <section id="contact" className="border-t border-border bg-card py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHead eyebrow="Start a project" title="Tell us about your idea" intro="Share a few details and we'll get back to you to discuss scope, approach and timeline." />
          <ul className="mt-8 space-y-4 text-sm">
            <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span><strong className="block text-heading">Location</strong>{BUSINESS.location}</span></li>
            <li className="flex items-start gap-3"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span><strong className="block text-heading">Email</strong><a className="hover:text-primary" href={`mailto:${BUSINESS.officialEmail}`}>{BUSINESS.officialEmail}</a></span></li>
            <li className="flex items-start gap-3"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span><strong className="block text-heading">Phone</strong><a className="hover:text-primary" href={BUSINESS.phoneHref}>{BUSINESS.officialPhone}</a></span></li>
            {waChat && <li className="flex items-start gap-3"><MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /><span><strong className="block text-heading">WhatsApp</strong><a className="hover:text-primary" href={waChat} target="_blank" rel="noopener noreferrer">Chat on {BUSINESS.officialPhone}</a></span></li>}
          </ul>
          {!waConfigured && (
            <div className="mt-8 rounded-2xl border border-dashed border-primary/40 bg-accent p-4 text-sm text-navy">
              <strong>Note:</strong> WhatsApp sending isn't configured yet. You can still fill the form and copy your enquiry message.
            </div>
          )}
        </div>

        <form noValidate onSubmit={submit} className="rounded-3xl border border-border bg-background p-6 shadow-soft sm:p-8" aria-label="Project enquiry form">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>{label("name", "Name")}<input type="text" autoComplete="name" placeholder="Your full name" {...a11y("name")} />{err("name")}</div>
            <div>{label("phone", "Phone number")}<input type="tel" autoComplete="tel" inputMode="tel" placeholder="e.g. 98765 43210" {...a11y("phone")} />{err("phone")}</div>
            <div className="sm:col-span-2">{label("email", "Email")}<input type="email" autoComplete="email" placeholder="you@example.com" {...a11y("email")} />{err("email")}</div>
            <div>{label("service", "Service required")}<select {...a11y("service")}><option value="">Select a service</option>{SERVICES.map((s) => <option key={s}>{s}</option>)}</select>{err("service")}</div>
            <div>{label("domain", "Project domain")}<select {...a11y("domain")}><option value="">Select a domain</option>{DOMAINS.map((s) => <option key={s}>{s}</option>)}</select>{err("domain")}</div>
            <div className="sm:col-span-2">{label("description", "Project description")}<textarea rows={4} placeholder="What are you trying to build? Any requirements, tools or deadlines?" {...a11y("description")} />{err("description")}</div>
            <div className="sm:col-span-2">{label("timeline", "Expected timeline")}<select {...a11y("timeline")}><option value="">Select a timeline</option>{TIMELINES.map((s) => <option key={s}>{s}</option>)}</select>{err("timeline")}</div>
          </div>

          <div role="status" aria-live="polite">
            {status && (
              <div className={cn("mt-6 flex gap-2 rounded-xl p-4 text-sm",
                status.kind === "success" && "bg-success/10 text-success",
                status.kind === "error" && "bg-destructive/10 text-destructive",
                status.kind === "info" && "bg-accent text-navy")}>
                {status.kind === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
                <span>{status.text}</span>
              </div>
            )}
            {fallbackUrl && (
              <p className="mt-3 text-sm text-muted-foreground">
                WhatsApp didn't open?{" "}
                <a href={fallbackUrl} target="_top" className="inline-flex items-center gap-1 font-semibold text-primary hover:text-navy">Open WhatsApp in this tab<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {waConfigured ? (
              <Button asChild className={cn(btn.primary, "h-auto")}><a href={enquiryUrl ?? undefined} target="_blank" rel="noopener noreferrer" onClick={followEnquiry}><MessageCircle className="h-4 w-4" />Send via WhatsApp</a></Button>
            ) : (
              <Button type="button" onClick={copy} className={cn(btn.primary, "h-auto")}><Copy className="h-4 w-4" />Copy enquiry message</Button>
            )}
            {waConfigured && <Button type="button" variant="outline" onClick={copy} className={cn(btn.outline, "h-auto")}><Copy className="h-4 w-4" />Copy enquiry message</Button>}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Your details aren't stored on this website. They're only placed into a message you choose to send.</p>
        </form>
      </div>
    </section>
  );
}
