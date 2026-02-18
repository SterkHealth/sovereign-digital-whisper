import {
  Server,
  ShieldCheck,
  Zap,
  Users,
  Layers,
  Fingerprint,
  Wallet,
  ArrowLeftRight,
  Sparkles,
  Boxes,
  Workflow,
  CheckCircle2,
} from "lucide-react";

const pillars = [
  {
    icon: Server,
    title: "Core modules (deploy what you need)",
    description:
      "Identity, wallet, payments, registries, and data exchange ship as independent modules. Start small and expand without replatforming.",
  },
  {
    icon: ShieldCheck,
    title: "Sovereign by design",
    description:
      "Government-owned controls: in-country hosting options, encryption key ownership, auditability, and consent built into the infrastructure layer.",
  },
  {
    icon: Zap,
    title: "Fast implementation, phased rollout",
    description:
      "A proven delivery playbook takes deployments from years to months—then activates services in phases, integrating with existing systems as you go.",
  },
  {
    icon: Users,
    title: "Built to transfer, not to lock in",
    description:
      "We build with your teams. Each deployment includes training, documentation, and handover milestones so the platform can be owned and operated locally.",
  },
];

const blueprint = [
  {
    icon: Fingerprint,
    title: "Identity & Consent",
    description:
      "Digital ID, verification, consent, and permissions—so services can trust who the user is and what they’ve approved.",
    bullets: ["Identity issuance & verification", "Consent & permissions", "Audit trails & policy controls"],
  },
  {
    icon: Wallet,
    title: "Wallets & Payments",
    description:
      "Government-to-person and citizen payments rails with programmable rules—ready for benefits, fees, and subsidies.",
    bullets: ["Digital wallet layer", "Payment integration", "Rules, limits & reconciliation"],
  },
  {
    icon: ArrowLeftRight,
    title: "Data Exchange",
    description:
      "Secure interoperability across ministries and systems—share only what’s necessary, with governance built in.",
    bullets: ["API gateway & integrations", "Data minimization", "Access governance & logging"],
  },
  {
    icon: Sparkles,
    title: "AI-Native Service Layer",
    description:
      "Assistants and workflows that help teams operate services—case triage, onboarding, fraud signals, and support.",
    bullets: ["Operational copilots", "Workflow automation", "Monitoring & insights"],
  },
];

const delivery = [
  {
    icon: Boxes,
    title: "Phase 1: Foundation",
    description:
      "Set governance, choose modules, connect core systems, and launch a first production capability quickly.",
  },
  {
    icon: Workflow,
    title: "Phase 2: Integrate & Scale",
    description:
      "Expand modules across agencies, integrate payments/registries, harden operations, and standardize rollout.",
  },
  {
    icon: CheckCircle2,
    title: "Phase 3: Operate & Transfer",
    description:
      "Train local teams, document everything, hand over runbooks, and ensure long-term national ownership.",
  },
];

const standards = [
  "Open APIs",
  "Modular architecture",
  "Audit logging",
  "Consent & permissions",
  "Encryption & key ownership",
  "Interoperability-ready",
];

const SolutionSection = () => {
  return (
    <section id="solutions" className="section-padding bg-section-alt">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Platform
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            The sovereign platform for a government that runs at software speed
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            Aixa Tech delivers modular digital public infrastructure—deployed on your terms—so governments can
            launch services quickly and evolve them independently over time.
          </p>
        </div>

        {/* Pillars */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="card-hover border border-border bg-card p-8">
              <div className="mb-5 inline-flex bg-primary p-3">
                <p.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-card-foreground">{p.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>

        {/* System Blueprint */}
        <div className="mt-20">
          <div className="flex items-center gap-3">
            <div className="inline-flex bg-primary p-3">
              <Layers size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground">System blueprint</h3>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                A modular stack you can deploy in parts—starting with the capability that matters most.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {blueprint.map((b) => (
              <div key={b.title} className="card-hover border border-border bg-card p-8">
                <div className="mb-5 inline-flex bg-primary p-3">
                  <b.icon size={20} className="text-primary-foreground" />
                </div>
                <h4 className="font-display text-xl font-bold text-card-foreground">{b.title}</h4>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{b.description}</p>

                <ul className="mt-5 space-y-2">
                  {b.bullets.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                      <span className="font-body leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Model */}
        <div className="mt-20">
          <h3 className="font-display text-2xl font-bold text-foreground">How we implement</h3>
          <p className="mt-2 max-w-2xl font-body text-sm text-muted-foreground">
            Governments don’t need a “big bang.” We ship a first production capability fast, then expand safely.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {delivery.map((d) => (
              <div key={d.title} className="card-hover border border-border bg-card p-8">
                <div className="mb-5 inline-flex bg-primary p-3">
                  <d.icon size={20} className="text-primary-foreground" />
                </div>
                <h4 className="font-display text-lg font-bold text-card-foreground">{d.title}</h4>
                <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">{d.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Standards / Interop chips */}
        <div className="mt-16">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Interoperability
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {standards.map((s) => (
              <span
                key={s}
                className="border border-border bg-card px-3 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;

