const steps = [
  {
    phase: "01",
    title: "Assess & Align",
    duration: "Weeks 1–4",
    description:
      "Joint assessment of institutional readiness, existing infrastructure, regulatory requirements, and priority use cases.",
  },
  {
    phase: "02",
    title: "Architect & Configure",
    duration: "Weeks 5–12",
    description:
      "Co-design system architecture with your technical team. Select modules, define data flows, and configure for local regulatory compliance.",
  },
  {
    phase: "03",
    title: "Build & Test",
    duration: "Weeks 13–24",
    description:
      "Deploy in a sovereign cloud or on-premise environment. Rigorous security testing, load testing, and pilot rollout with real users.",
  },
  {
    phase: "04",
    title: "Train & Transfer",
    duration: "Weeks 25–32",
    description:
      "Structured knowledge transfer to local engineering teams. Complete documentation, runbooks, and ongoing support SLAs.",
  },
];

const DeliverySection = () => {
  return (
    <section id="delivery" className="section-padding bg-section-alt">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
            How We Deliver
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            From assessment to handover in under 8 months.
          </h2>
        </div>

        <div className="mt-14 grid gap-0 md:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.phase} className="relative pb-10 md:pb-0">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-12 hidden h-px w-full bg-border md:block" />
              )}

              <div className="relative">
                {/* Phase number */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {step.phase}
                </div>
                <p className="mb-1 font-body text-xs font-medium uppercase tracking-wider text-gold">
                  {step.duration}
                </p>
                <h3 className="font-display text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliverySection;
