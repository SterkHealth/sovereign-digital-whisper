import { CloudLightning, Database, Globe } from "lucide-react";

const problems = [
  {
    icon: CloudLightning,
    title: "Climate Shocks",
    description:
      "Sub-Saharan Africa loses up to 15% of GDP to climate-related disasters yearly. Yet fewer than 20% of smallholder farmers have access to actionable early warning data.",
  },
  {
    icon: Database,
    title: "Data Gaps",
    description:
      "Enterprises, governments, and insurers rely on outdated, foreign-hosted datasets. Real-time agri and climate data is locked behind expensive proprietary systems built for developed markets.",
  },
  {
    icon: Globe,
    title: "Data Sovereignty",
    description:
      "Critical national agricultural data flows to servers outside Africa. Nations cannot govern, monetize, or act on their own resources — undermining food security planning.",
  },
];

const ProblemSection = () => {
  return (
    <section id="problem" className="section-padding bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            The Problem
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            $90B lost.{" "}
            <span className="text-muted-foreground">The data to fix it barely exists.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {problems.map((p) => (
            <div key={p.title} className="group">
              <div className="mb-4 inline-flex border border-border bg-secondary p-3">
                <p.icon size={20} className="text-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{p.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 border-l-2 border-[hsl(33,65%,50%)] pl-5">
          <p className="font-body text-base text-foreground">
            Aixatech builds the intelligence infrastructure that changes that.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
