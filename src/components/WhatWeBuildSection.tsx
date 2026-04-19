import { Download, Cpu, Shield, Zap } from "lucide-react";

const steps = [
  {
    icon: Download,
    step: "Ingest",
    description:
      "Satellite imagery, weather station feeds, IoT sensors, and government datasets ingested, validated, and harmonised in real time.",
  },
  {
    icon: Cpu,
    step: "Process",
    description:
      "ML models produce crop health indices, climate risk scores, and yield forecasts at plot-level resolution, localised for each country.",
  },
  {
    icon: Shield,
    step: "Govern",
    description:
      "Data is stored and processed within national borders on sovereign infrastructure. No foreign cloud dependency.",
  },
  {
    icon: Zap,
    step: "Actionable",
    description:
      "Enterprise, governments, insurers, and development organisations receive decision-ready APIs, dashboards, and alerts to act with confidence.",
  },
];

const WhatWeBuildSection = () => {
  return (
    <section id="what-we-build" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            How It Works
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            From Raw Data to Decision-Ready Intelligence.
          </h2>
          <p className="mt-4 font-body text-base text-muted-foreground">
            We're the plumbing system for Africa's agricultural economy. Building the pipes that carry
            climate and land intelligence to the institutions, insurers, and governments that need it to flow.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 grid gap-0 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.step} className="relative pb-10 md:pb-0">
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-12 hidden h-px w-full bg-border md:block" />
              )}
              <div className="relative">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center font-mono text-sm font-bold"
                  style={{ background: "hsl(33,65%,50%)", color: "#fff" }}
                >
                  <s.icon size={20} />
                </div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-lg font-bold text-foreground">{s.step}</h3>
                <p className="mt-2 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities row */}
        <div className="mt-16 border border-border bg-card p-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            What flows through the platform
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Satellite Imagery",
              "IoT Sensor Data",
              "Weather Station Feeds",
              "Soil Chemistry",
              "Crop Health Indices",
              "Yield Forecasts",
              "Climate Risk Scores",
              "Farmer Profiles",
              "Parametric Triggers",
            ].map((t) => (
              <span
                key={t}
                className="border border-border bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground"
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
