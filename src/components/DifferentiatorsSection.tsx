import { Check } from "lucide-react";

const differentiators = [
  {
    title: "Sovereign by architecture",
    points: [
      "Deploy on national cloud or on-premise",
      "No foreign data dependencies",
      "Full source code access and audit rights",
    ],
  },
  {
    title: "AI-native, not AI-bolted",
    points: [
      "AI accelerates configuration and testing",
      "Intelligent monitoring and anomaly detection",
      "No black boxes — explainable, auditable AI",
    ],
  },
  {
    title: "Built for the public sector",
    points: [
      "Experience with procurement frameworks",
      "Multi-stakeholder governance models",
      "Regulatory compliance as a first-class feature",
    ],
  },
];

const DifferentiatorsSection = () => {
  return (
    <section id="differentiators" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Why Aixa Tech
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What sets us apart.
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {differentiators.map((d) => (
            <div
              key={d.title}
              className="border border-border bg-card p-8"
            >
              <h3 className="font-display text-xl font-bold text-card-foreground">
                {d.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {d.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center bg-foreground/10">
                      <Check size={12} className="text-foreground" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;
