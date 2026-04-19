import { CloudRain, Sprout, Brain } from "lucide-react";

const modules = [
  {
    icon: CloudRain,
    number: "01",
    title: "Climate Risk Intelligence",
    description:
      "Hyper-local climate analytics, early warning systems, and risk indices for parametric insurance, disaster risk finance, and government planning.",
    tags: ["Early Warning Systems", "Risk Indices", "Parametric Insurance"],
  },
  {
    icon: Sprout,
    number: "02",
    title: "Agri Data Intelligence",
    description:
      "Plot-level agricultural datasets covering crop health, soil, yield forecasts, and farmer profiles structured for credit, insurance, and supply chain decisions.",
    tags: ["Yield Forecasts", "Farmer Profiles", "Crop Health"],
  },
  {
    icon: Brain,
    number: "03",
    title: "Sovereign AI",
    description:
      "An end-to-end AI infrastructure. Local model deployment. National data governance. Country-specific intelligence built from the ground up.",
    tags: ["Local Deployment", "National Governance", "Country-Specific AI"],
  },
];

const SolutionSection = () => {
  return (
    <section id="solutions" className="section-padding bg-section-alt">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            The Solution
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            1 Platform. 3 Modules.
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            A single platform that powers climate risk decisions, unlocks agricultural finance, and gives
            nations sovereignty over their own data.
          </p>
        </div>

        {/* Modules */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {modules.map((m) => (
            <div key={m.title} className="card-hover border border-border bg-card p-8">
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex bg-primary p-3">
                  <m.icon size={20} className="text-primary-foreground" />
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Module {m.number}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-card-foreground">{m.title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                {m.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {m.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Market stats */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 border border-border bg-card p-8">
          {[
            { stat: "$1.5T", label: "Total Addressable Market in climate risk analytics and agri data infrastructure across the Global South by 2030" },
            { stat: "65%", label: "of the world's uncultivated arable land sits in Africa — less than 3% of it is insured" },
            { stat: "$90B", label: "lost annually across Sub-Saharan Africa to climate-related agricultural disruption" },
          ].map((item) => (
            <div key={item.stat} className="text-center">
              <p className="font-display text-4xl font-bold text-foreground" style={{ color: "hsl(33,65%,50%)" }}>
                {item.stat}
              </p>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
