import { Server, ShieldCheck, Zap, Users } from "lucide-react";

const pillars = [
  {
    icon: Server,
    title: "Modular architecture",
    description:
      "Every component — identity, consent, payments, data exchange — is a standalone module. Deploy what you need, when you need it. No monoliths.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    description:
      "Data residency, consent management, and encryption are embedded at the infrastructure layer. Compliance is structural, not an afterthought.",
  },
  {
    icon: Zap,
    title: "Accelerated delivery",
    description:
      "Pre-built, field-tested modules reduce deployment from years to months. AI-native tooling accelerates configuration and testing.",
  },
  {
    icon: Users,
    title: "Knowledge transfer",
    description:
      "We build with your engineers, not for them. Every engagement includes structured training, documentation, and handover milestones.",
  },
];

const SolutionSection = () => {
  return (
    <section id="solutions" className="section-padding bg-section-alt">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
           Platform
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Infrastructure that stays when we leave.
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            Aixa Tech builds sovereign digital public infrastructure that governments
            own, operate, and evolve — independently.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="card-hover border border-border bg-card p-8"
            >
              <div className="mb-5 inline-flex bg-primary p-3">
                <p.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold text-card-foreground">
                {p.title}
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
