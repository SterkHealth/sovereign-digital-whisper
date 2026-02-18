import {
  Fingerprint,
  CreditCard,
  Database,
  FolderKanban,
  Bot,
  ShieldCheck,
  Sparkles,
  Siren,
  LineChart,
  Scale,
} from "lucide-react";

const stackLayers = [
  {
    icon: Fingerprint,
    label: "Layer 1",
    title: "Identity Core",
    description:
      "Digital identity, verification APIs, and consent primitives that establish trust across all services.",
  },
  {
    icon: CreditCard,
    label: "Layer 2",
    title: "Wallet & Payments Rail",
    description:
      "Interoperable rails for G2P transfers, fees, subsidies, merchant payments, and settlement workflows.",
  },
  {
    icon: Database,
    label: "Layer 3",
    title: "Data Exchange Layer",
    description:
      "Consent-based, auditable data sharing between ministries and regulated entities with policy controls.",
  },
  {
    icon: FolderKanban,
    label: "Layer 4",
    title: "Registry & Case Management",
    description:
      "Registries, eligibility, and case workflows that power real government operations—not just portals.",
  },
  {
    icon: Bot,
    label: "Layer 5",
    title: "AI Operations Layer",
    description:
      "AI-native workflows, copilots, and monitoring that help agencies run programs with speed and integrity.",
  },
];

const aiCapabilities = [
  {
    icon: Sparkles,
    title: "AI-native workflows",
    description:
      "Automate routine steps across onboarding, verification, eligibility, and service delivery—end to end.",
  },
  {
    icon: ShieldCheck,
    title: "AI-assisted case management",
    description:
      "Triage, queue routing, document understanding, and next-best-action suggestions for caseworkers.",
  },
  {
    icon: Siren,
    title: "Fraud detection across ID + wallet",
    description:
      "Cross-signal anomaly detection to reduce duplicate identities, leakage, and suspicious transfers.",
  },
  {
    icon: Scale,
    title: "AI-powered regulatory monitoring",
    description:
      "Policy guardrails, compliance checks, and alerting embedded into system operations and audit trails.",
  },
];

const categoryCompare = [
  {
    title: "Legacy gov tech",
    bullets: ["Monolithic systems", "Vendor-locked upgrades", "Paper-driven operations", "Slow change cycles"],
  },
  {
    title: "AI-native gov OS",
    bullets: ["Modular by default", "Data-layered + interoperable", "Automated operations", "Self-improving feedback loops"],
  },
];

const WhatWeBuildSection = () => {
  return (
    <section id="what-we-build" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Architecture
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            The AI-native Government Stack
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            A modular, sovereign stack that governments own and operate—layer by layer—starting with the
            highest-impact capability.
          </p>
        </div>

        {/* Stack Layers */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stackLayers.map((l) => (
            <div key={l.title} className="card-hover border border-border bg-card p-7">
              <div className="mb-4 flex items-center gap-3">
                <div className="inline-flex border border-border bg-secondary p-2.5">
                  <l.icon size={18} className="text-foreground" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {l.label}
                </span>
              </div>

              <h3 className="font-display text-base font-bold text-card-foreground">{l.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{l.description}</p>
            </div>
          ))}
        </div>

        {/* AI Layer callout */}
        <div className="mt-16 border border-border bg-card p-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            AI Layer
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-card-foreground">
            AI embedded at the infrastructure layer — not bolted on at the application layer.
          </h3>
          <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
            The platform is designed so AI can operate on verified identity signals, consented data access,
            and payment events—safely, auditable, and policy-controlled.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiCapabilities.map((c) => (
              <div key={c.title} className="border border-border bg-background p-6">
                <div className="mb-4 inline-flex border border-border bg-secondary p-2.5">
                  <c.icon size={18} className="text-foreground" />
                </div>
                <h4 className="font-display text-sm font-bold text-foreground">{c.title}</h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{c.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sovereign framing (replaces “knowledge transfer” vibe) */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          <div className="border border-border bg-card p-7">
            <h4 className="font-display text-base font-bold text-card-foreground">Sovereign deployment model</h4>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              Deploy in-country or on approved cloud infrastructure with policy controls aligned to your state.
            </p>
          </div>
          <div className="border border-border bg-card p-7">
            <h4 className="font-display text-base font-bold text-card-foreground">Full state ownership</h4>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              Government owns the platform configuration, audit trails, and operational controls—built for long-term autonomy.
            </p>
          </div>
          <div className="border border-border bg-card p-7">
            <h4 className="font-display text-base font-bold text-card-foreground">Infrastructure that remains</h4>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
              A durable national capability that keeps running and evolving—without relying on external vendors to function.
            </p>
          </div>
        </div>

        {/* Category Definition */}
        <div className="mt-16">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Category
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
            A New Category: AI-Native Government Infrastructure
          </h3>
          <p className="mt-3 max-w-3xl font-body text-sm leading-relaxed text-muted-foreground">
            This is not another government portal or custom system build. It’s an operating layer for public services:
            modular, interoperable, automated—and designed to improve as it runs.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {categoryCompare.map((col) => (
              <div key={col.title} className="border border-border bg-card p-7">
                <h4 className="font-display text-base font-bold text-card-foreground">{col.title}</h4>
                <ul className="mt-4 space-y-2">
                  {col.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <span className="font-body leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Optional tiny proof-style footer row */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["Modular", "Interoperable", "Auditable", "Policy-controlled", "AI-native operations"].map((t) => (
              <span
                key={t}
                className="border border-border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeBuildSection;

