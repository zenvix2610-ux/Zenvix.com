import {
  ArrowRight, BrainCircuit, CheckCircle2, ClipboardList, Code2, Cpu, FileText, FlaskConical, GraduationCap,
  HeartPulse, Lightbulb, Layers, MonitorSmartphone, Radio, Rocket, SearchCheck, ShieldCheck, Sparkles, Target, Wrench, Eye,
} from "lucide-react";
import { Reveal, SectionHead, btn } from "./ui";
import type { SERVICES } from "@/config/business";

type Service = (typeof SERVICES)[number];

export function About() {
  const values = [
    { t: "Innovation", i: Lightbulb }, { t: "Quality", i: ShieldCheck }, { t: "Transparency", i: Eye },
    { t: "Learning", i: GraduationCap }, { t: "Reliability", i: CheckCircle2 },
  ];
  return (
    <section id="about" className="border-y border-border bg-card py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="About ZENVIX" title="A practical partner for ideas, engineering and innovation." />
          <Reveal delay={100}>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              ZENVIX is a Project Development & Technology Solutions Centre focused on innovation, engineering and practical learning. We work with students, innovators and businesses to shape ideas into well-structured, working solutions — and to make sure the people behind them understand how and why they work.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { t: "Vision", i: Target, d: "To become a trusted technology partner for students, innovators and businesses." },
            { t: "Mission", i: Rocket, d: "To encourage innovation, support practical project development and make technology easier to understand and apply." },
          ].map((c, k) => (
            <Reveal key={c.t} delay={k * 100} className="rounded-2xl border border-border bg-background p-6">
              <c.i className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold">Our {c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
            </Reveal>
          ))}
          <Reveal delay={200} className="rounded-2xl border border-border bg-background p-6 sm:col-span-2">
            <h3 className="text-lg font-semibold">Our Values</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {values.map((v) => (
                <li key={v.t} className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-navy">
                  <v.i className="h-4 w-4 text-primary" aria-hidden="true" />{v.t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const SERVICE_CARDS: { t: Service; i: typeof Code2; d: string; items: string[] }[] = [
  { t: "Academic Project Development", i: GraduationCap, d: "End-to-end support to plan, build and present academic projects with confidence.", items: ["Project planning & problem statements", "Implementation guidance & prototypes", "Testing & documentation support", "Demonstrations"] },
  { t: "AI & Software Solutions", i: BrainCircuit, d: "Intelligent, data-driven software built with the right tools for the job.", items: ["AI & machine learning", "Web applications & dashboards", "Data analytics", "Automation"] },
  { t: "Hardware & IoT Solutions", i: Cpu, d: "Connected devices and embedded systems, from breadboard to working prototype.", items: ["Sensor-based systems", "Embedded prototypes & microcontrollers", "IoT workflows", "Hardware integration"] },
  { t: "Technical Mentoring", i: Sparkles, d: "Clear, patient guidance so you understand your work and can explain it well.", items: ["Programming guidance", "Technical explanations & code reviews", "Project presentations", "Viva preparation"] },
];

export function Services({ onEnquire }: { onEnquire: (s: Service) => void }) {
  return (
    <section id="services" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Services" title="What we help you build" intro="Focused services across software, hardware and learning — scoped clearly from the first conversation." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {SERVICE_CARDS.map((s, k) => (
            <Reveal key={s.t} delay={k * 80}>
              <article className="group flex h-full flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <s.i className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-muted-foreground">{s.d}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />{it}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => onEnquire(s.t)} className={`${btn.ghost} mt-auto pt-6`} aria-label={`Enquire about ${s.t}`}>
                  Enquire about this <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Domains() {
  const d = [
    { t: "Artificial Intelligence and Machine Learning", i: BrainCircuit, c: "e.g. image classification, prediction models, chat assistants" },
    { t: "Web and Application Development", i: MonitorSmartphone, c: "e.g. portals, dashboards, booking or management apps" },
    { t: "Internet of Things", i: Radio, c: "e.g. smart monitoring, remote control, sensor networks" },
    { t: "Embedded Systems and Electronics", i: Cpu, c: "e.g. microcontroller devices, automation circuits" },
    { t: "Biomedical and Healthcare Technology", i: HeartPulse, c: "e.g. health monitoring concepts, signal analysis" },
    { t: "Student Innovation Projects", i: Lightbulb, c: "e.g. hackathon ideas, social-impact prototypes" },
  ];
  return (
    <section id="domains" className="border-y border-border bg-card py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Sample project domains" title="Areas we can explore with you" intro="Illustrative domains and example concepts to spark ideas — not completed client case studies." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.map((x, k) => (
            <Reveal key={x.t} delay={k * 60}>
              <li className="blueprint-grid relative h-full overflow-hidden rounded-2xl border border-border bg-background p-6">
                <span className="absolute right-4 top-4 rounded-full bg-card px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Concept</span>
                <x.i className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-base font-semibold">{x.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{x.c}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  const steps = [
    { t: "Requirement Analysis", i: SearchCheck, d: "Understand the problem, goals, constraints and expected outcome." },
    { t: "Planning and System Design", i: Layers, d: "Choose suitable technology and design the architecture and workflow." },
    { t: "Development and Prototyping", i: Code2, d: "Build iteratively, with working prototypes you can review early." },
    { t: "Testing and Evaluation", i: FlaskConical, d: "Validate functionality, fix issues and measure against requirements." },
    { t: "Documentation and Demonstration", i: FileText, d: "Clear documentation and a confident, well-prepared demonstration." },
  ];
  return (
    <section id="process" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead center eyebrow="How we work" title="A structured path from idea to outcome" />
        <ol className="relative mt-14 grid gap-6 lg:grid-cols-5">
          <span className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent lg:block" aria-hidden="true" />
          {steps.map((s, k) => (
            <Reveal key={s.t} delay={k * 90}>
              <li className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-primary shadow-soft">
                  <s.i className="h-6 w-6" aria-hidden="true" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-navy text-xs font-bold text-primary-foreground">{k + 1}</span>
                </div>
                <div>
                  <h3 className="text-base font-semibold lg:mt-4">{s.t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function WhyUs() {
  const r = [
    { t: "Practical problem-solving", i: Wrench },
    { t: "Structured development", i: ClipboardList },
    { t: "Suitable technology selection", i: Layers },
    { t: "Clear technical guidance", i: GraduationCap },
    { t: "Transparent project scope", i: Eye },
    { t: "Testing and continuous improvement", i: FlaskConical },
  ];
  return (
    <section aria-labelledby="why" className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="rounded-[2rem] bg-navy p-8 sm:p-12">
          <p className="eyebrow text-cyan">Why choose ZENVIX</p>
          <h2 id="why" className="mt-3 max-w-xl text-3xl font-bold text-primary-foreground sm:text-4xl">Engineering you can understand and rely on.</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {r.map((x) => (
              <li key={x.t} className="flex items-center gap-3 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-5 text-primary-foreground">
                <x.i className="h-5 w-5 shrink-0 text-cyan" aria-hidden="true" />
                <span className="font-medium">{x.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
