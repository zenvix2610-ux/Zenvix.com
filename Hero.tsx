import { ArrowRight } from "lucide-react";
import { Reveal, btn } from "./ui";

function BlueprintVisual() {
  const nodes: Array<readonly [number, number]> = [
    [70, 90], [210, 60], [330, 130], [120, 230], [260, 250], [380, 300], [160, 350], [300, 380],
  ];
  const links: Array<readonly [number, number]> = [[0,1],[1,2],[0,3],[3,4],[2,4],[4,5],[3,6],[6,7],[4,7],[5,7]];
  return (
    <svg viewBox="0 0 440 440" role="img" aria-label="Abstract technical blueprint of connected system nodes and interface layers" className="h-full w-full">
      <defs>
        <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="var(--electric)" />
          <stop offset="1" stopColor="var(--cyan)" />
        </linearGradient>
      </defs>
      <g className="stroke-electric/30" fill="none" strokeWidth="1">
        <circle cx="220" cy="220" r="190" strokeDasharray="4 6" />
        <circle cx="220" cy="220" r="130" />
      </g>
      <g stroke="url(#lg)" strokeWidth="1.6" opacity="0.7">
        {links.map(([a, b], i) => {
          const from = nodes[a];
          const to = nodes[b];
          if (!from || !to) return null;
          return <line key={i} x1={from[0]} y1={from[1]} x2={to[0]} y2={to[1]} />;
        })}
      </g>
      {/* interface card */}
      <g transform="translate(150 150)">
        <rect width="150" height="104" rx="14" className="fill-card stroke-border" strokeWidth="1.2" style={{ filter: "drop-shadow(0 18px 30px oklch(0.56 0.24 259 / .2))" }} />
        <rect x="14" y="14" width="56" height="8" rx="4" className="fill-navy" />
        <rect x="14" y="30" width="96" height="6" rx="3" className="fill-muted-foreground/30" />
        <rect x="14" y="58" width="12" height="32" rx="3" className="fill-cyan" />
        <rect x="32" y="48" width="12" height="42" rx="3" className="fill-electric" />
        <rect x="50" y="66" width="12" height="24" rx="3" className="fill-cyan" />
        <rect x="68" y="54" width="12" height="36" rx="3" className="fill-electric" />
        <circle cx="118" cy="72" r="16" fill="none" className="stroke-electric" strokeWidth="5" strokeDasharray="70 100" />
      </g>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="11" className="fill-accent animate-node" style={{ animationDelay: `${i * 0.4}s` }} />
          <circle cx={x} cy={y} r="5" className={i % 2 ? "fill-cyan" : "fill-electric"} />
        </g>
      ))}
    </svg>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="blueprint-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-12 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-28">
        <Reveal>
          <p className="eyebrow rounded-full border border-border bg-card px-3 py-1.5 shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
            Project Development & Technology Solutions Centre
          </p>
          <h1 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Build Ideas.<br />
            <span className="text-primary">Engineer the Future.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            From academic projects to practical software and hardware solutions, ZENVIX helps turn your ideas into clear plans, working prototypes and meaningful outcomes.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className={btn.primary}>Start Your Project <ArrowRight className="h-4 w-4" /></a>
            <a href="#services" className={btn.outline}>Explore Our Services</a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">Software · AI · Hardware & IoT · Mentoring</p>
        </Reveal>
        <Reveal delay={150} className="mx-auto w-full max-w-md lg:max-w-none">
          <div className="aspect-square rounded-[2rem] border border-border bg-card/70 p-4 shadow-soft">
            <BlueprintVisual />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
