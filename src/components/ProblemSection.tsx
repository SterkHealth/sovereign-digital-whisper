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
    <section
      id="problem"
      className="section-padding relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(74,222,128,0.40) 0%, rgba(74,222,128,0.12) 35%, #030303 62%)" }}
    >

      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#4ade80" }}>
            The Problem
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
            $90B lost.{" "}
            <span style={{ color: "rgba(255,255,255,0.35)" }}>The data to fix it barely exists.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {problems.map((p) => (
            <div
              key={p.title}
              className="group rounded-2xl p-6 transition-all"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.18)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
            >
              <div
                className="mb-4 inline-flex rounded-xl p-3"
                style={{ background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.12)" }}
              >
                <p.icon size={20} style={{ color: "#4ade80" }} />
              </div>
              <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mt-12 rounded-2xl p-5"
          style={{
            background: "rgba(74,222,128,0.04)",
            border: "1px solid rgba(74,222,128,0.12)",
            borderLeft: "3px solid rgba(74,222,128,0.5)",
          }}
        >
          <p className="text-base text-white">
            Aixatech builds the intelligence infrastructure that changes that.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
