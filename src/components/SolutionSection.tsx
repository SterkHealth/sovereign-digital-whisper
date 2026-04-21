import { CloudRain, Sprout, Brain, Download, Cpu, Shield, Zap, BarChart3, Globe, Layers } from "lucide-react";
import DashboardSection from "./DashboardSection";

const modules = [
  {
    icon: CloudRain,
    number: "01",
    title: "Climate Risk Intelligence",
    description:
      "Hyper-local climate analytics, early warning systems, and risk indices purpose-built for parametric insurance, disaster risk finance, and government planning across the Global South.",
    capabilities: [
      "Sub-national climate risk scoring",
      "Parametric trigger indices",
      "Early warning alerts",
      "Disaster risk finance models",
    ],
  },
  {
    icon: Sprout,
    number: "02",
    title: "Agri Data Intelligence",
    description:
      "Plot-level agricultural datasets covering crop health, soil quality, yield forecasts, and farmer profiles — structured for credit, insurance, and supply chain decisions.",
    capabilities: [
      "Plot-level yield forecasting",
      "Crop health monitoring",
      "Soil & moisture indices",
      "Farmer profile datasets",
    ],
  },
  {
    icon: Brain,
    number: "03",
    title: "Sovereign AI",
    description:
      "An end-to-end AI infrastructure with local model deployment and national data governance. Country-specific intelligence built from the ground up — no foreign cloud dependency.",
    capabilities: [
      "In-country model deployment",
      "National data governance",
      "Sovereign compute infrastructure",
      "Country-specific AI training",
    ],
  },
];

const pipeline = [
  {
    icon: Download,
    step: "01",
    title: "Ingest & Aggregate",
    description: "Satellite imagery, weather station feeds, IoT sensors, and government datasets ingested, validated, and harmonised in real time.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "Validate & Process",
    description: "ML models produce crop health indices, climate risk scores, and yield forecasts at plot-level resolution, localised for each country.",
  },
  {
    icon: Shield,
    step: "03",
    title: "Govern & Store",
    description: "Data is stored and processed within national borders on sovereign infrastructure. Auditable, policy-controlled, and compliant with national data frameworks.",
  },
  {
    icon: BarChart3,
    step: "04",
    title: "AI-Powered Analytics",
    description: "Country-specific models surface risk scores, yield predictions, and climate indices calibrated to local conditions — not imported assumptions.",
  },
  {
    icon: Globe,
    step: "05",
    title: "API-First Integration",
    description: "Decision-ready APIs, dashboards, and real-time alerts that plug directly into the workflows of governments, insurers, and development organisations.",
  },
  {
    icon: Zap,
    step: "06",
    title: "Actionable Intelligence",
    description: "From parametric insurance triggers to food security dashboards — intelligence that enables institutions to act with confidence, not guesswork.",
  },
];

const differentiators = [
  {
    icon: Layers,
    title: "Global South-first",
    description: "Built for the data realities of Africa and emerging markets — not adapted from tools designed elsewhere.",
  },
  {
    icon: Shield,
    title: "End-to-end sovereign stack",
    description: "From raw satellite data to decision-ready intelligence, entirely within national borders.",
  },
  {
    icon: Brain,
    title: "Real-world deployment",
    description: "Infrastructure already operating at scale across East and Southern Africa.",
  },
  {
    icon: Globe,
    title: "Seamless integration",
    description: "API-first architecture connects directly with existing government and enterprise systems.",
  },
];

const SolutionSection = () => {
  const Icon0 = modules[0].icon;
  const Icon1 = modules[1].icon;
  const Icon2 = modules[2].icon;

  return (
    <section
      id="solutions"
      className="section-padding relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 15% 0%, rgba(74,222,128,0.50) 0%, rgba(74,222,128,0.15) 30%, #030303 60%)"
      }}
    >

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#4ade80" }}>
            The Platform
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            1 Platform. 3 Modules.
          </h2>
          <p className="mt-4 text-base" style={{ color: "rgba(255,255,255,0.50)" }}>
            A single platform that powers climate risk decisions, unlocks agricultural finance, and gives
            nations sovereignty over their own data.
          </p>
        </div>

        {/* Module cards — 3 equal columns */}
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {[
            { icon: Icon0, mod: modules[0], num: "01" },
            { icon: Icon1, mod: modules[1], num: "02" },
            { icon: Icon2, mod: modules[2], num: "03" },
          ].map(({ icon: Icon, mod, num }) => (
            <div
              key={num}
              className="card-hover flex flex-col rounded-2xl p-8 transition-all"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.18)" }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(74,222,128,0.45)";
                e.currentTarget.style.boxShadow = "0 0 30px rgba(74,222,128,0.10)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(74,222,128,0.18)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="mb-5 flex items-center justify-between">
                <span
                  className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-widest"
                  style={{ border: "1px solid rgba(74,222,128,0.30)", color: "#4ade80" }}
                >
                  Module {num}
                </span>
                <div
                  className="inline-flex rounded-xl p-2.5"
                  style={{ background: "rgba(74,222,128,0.10)", border: "1px solid rgba(74,222,128,0.15)" }}
                >
                  <Icon size={18} style={{ color: "#4ade80" }} />
                </div>
              </div>
              <h3 className="font-display text-xl font-bold text-white">{mod.title}</h3>
              <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.50)" }}>{mod.description}</p>
              <ul className="mt-6 space-y-2">
                {mod.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#4ade80" }} />
                    <span className="leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.18)" }}>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#4ade80" }}>Countries covered</p>
            <div className="mt-4">
              <p className="font-display text-5xl font-bold text-white">40+</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>Across Africa, SE Asia &amp; MENA</p>
            </div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.18)" }}>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#4ade80" }}>Hectares monitored</p>
            <div className="mt-4">
              <p className="font-display text-5xl font-bold text-white">3.2M</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>Plot-level resolution</p>
            </div>
          </div>
          <div className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(74,222,128,0.18)" }}>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "#4ade80" }}>Data sources</p>
            <div className="mt-4">
              <p className="font-display text-5xl font-bold text-white">15+</p>
              <p className="mt-1 text-sm" style={{ color: "rgba(255,255,255,0.40)" }}>Satellite &amp; ground truth feeds</p>
            </div>
          </div>
        </div>

        {/* Interactive Dashboard Preview */}
        <DashboardSection />

        {/* Pipeline */}
        <div id="what-we-build" className="mt-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#4ade80" }}>
              How the platform works
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
              From raw data to decision-ready intelligence.
            </h3>
            <p className="mt-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              End-to-end sovereign infrastructure — ingesting raw earth observation and climate data and
              delivering actionable intelligence entirely within national borders.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl p-7 transition-all"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.20)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center font-mono text-xs font-bold text-white rounded-lg"
                    style={{ background: "#4ade80" }}
                  >
                    {p.step}
                  </div>
                  <p.icon size={18} style={{ color: "rgba(255,255,255,0.30)" }} />
                </div>
                <h4 className="font-display text-base font-bold text-white">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Aixatech */}
        <div className="mt-20">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#4ade80" }}>
            Why Aixatech
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
            Infrastructure built for the Global South.
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl p-6 transition-all"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(74,222,128,0.20)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
              >
                <div
                  className="mb-4 inline-flex rounded-xl p-2.5"
                  style={{ background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.12)" }}
                >
                  <d.icon size={18} style={{ color: "#4ade80" }} />
                </div>
                <h4 className="font-display text-sm font-bold text-white">{d.title}</h4>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{d.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolutionSection;
