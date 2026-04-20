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
  return (
    <section
      id="solutions"
      className="section-padding"
      style={{ background: "radial-gradient(ellipse at 30% 10%, rgba(22,163,74,0.22) 0%, rgba(20,83,45,0.12) 35%, #030503 65%, #000000 100%)" }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            The Platform
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            1 Platform. 3 Modules.
          </h2>
          <p className="mt-4 font-body text-base text-white/55">
            A single platform that powers climate risk decisions, unlocks agricultural finance, and gives
            nations sovereignty over their own data.
          </p>
        </div>

        {/* Bento module grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-3">

          {/* Card 01 — featured green fill, spans 2 cols */}
          <div
            className="card-hover relative overflow-hidden rounded-2xl p-8 lg:col-span-2"
            style={{ background: "linear-gradient(135deg, #0a2e14 0%, #14532d 50%, #166534 100%)" }}
          >
            {/* subtle inner glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{ background: "radial-gradient(ellipse at 20% 20%, rgba(74,222,128,0.18) 0%, transparent 60%)" }} />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-full border border-white/20 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                  Module 01
                </span>
                <div className="inline-flex rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.12)" }}>
                  <modules[0].icon size={18} className="text-white" />
                </div>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">{modules[0].title}</h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-white/70">{modules[0].description}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2">
                {modules[0].capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-white/65">
                    <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400/80" />
                    <span className="font-body leading-relaxed">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 02 — dark */}
          <div
            className="card-hover flex flex-col rounded-2xl border border-white/[0.10] p-8 transition-colors hover:border-green-500/30"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                Module 02
              </span>
              <div className="inline-flex rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.07)" }}>
                <modules[1].icon size={18} className="text-white/70" />
              </div>
            </div>
            <h3 className="font-display text-xl font-bold text-white">{modules[1].title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/55 flex-1">{modules[1].description}</p>
            <ul className="mt-5 space-y-2">
              {modules[1].capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "hsl(33,65%,50%)" }} />
                  <span className="font-body leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats row — 3 bento tiles */}
          <div className="rounded-2xl border border-white/[0.10] p-6 flex flex-col justify-between"
            style={{ background: "rgba(255,255,255,0.04)" }}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Countries covered</p>
            <div>
              <p className="font-display text-5xl font-bold text-white">40+</p>
              <p className="mt-1 text-sm text-white/45">Across Africa, SE Asia &amp; MENA</p>
            </div>
          </div>

          <div
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{ background: "linear-gradient(135deg, #1a4d2e 0%, #166534 100%)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-green-300/60">Hectares monitored</p>
            <div>
              <p className="font-display text-5xl font-bold text-white">3.2M</p>
              <p className="mt-1 text-sm text-green-200/50">Plot-level resolution</p>
            </div>
          </div>

          {/* Card 03 — Sovereign AI, spans 1 col */}
          <div
            className="card-hover flex flex-col rounded-2xl border border-white/[0.10] p-8 transition-colors hover:border-green-500/30"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <div className="mb-5 flex items-center justify-between">
              <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                Module 03
              </span>
              <div className="inline-flex rounded-lg p-2.5" style={{ background: "rgba(255,255,255,0.07)" }}>
                <modules[2].icon size={18} className="text-white/70" />
              </div>
            </div>
            <h3 className="font-display text-xl font-bold text-white">{modules[2].title}</h3>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/55 flex-1">{modules[2].description}</p>
            <ul className="mt-5 space-y-2">
              {modules[2].capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="mt-[6px] h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "hsl(33,65%,50%)" }} />
                  <span className="font-body leading-relaxed">{c}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Interactive Dashboard Preview */}
        <DashboardSection />

        {/* Pipeline */}
        <div id="what-we-build" className="mt-20">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              How the platform works
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
              From raw data to decision-ready intelligence.
            </h3>
            <p className="mt-3 font-body text-sm text-white/55">
              End-to-end sovereign infrastructure — ingesting raw earth observation and climate data and
              delivering actionable intelligence entirely within national borders.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-white/[0.10] p-7 transition-colors hover:border-green-500/25"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-9 w-9 items-center justify-center font-mono text-xs font-bold text-white"
                    style={{ background: "hsl(33,65%,50%)" }}
                  >
                    {p.step}
                  </div>
                  <p.icon size={18} className="text-white/40" />
                </div>
                <h4 className="font-display text-base font-bold text-white">{p.title}</h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/55">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Aixatech */}
        <div className="mt-20">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Why Aixatech
          </p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-white">
            Infrastructure built for the Global South.
          </h3>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-white/[0.10] p-6 transition-colors hover:border-green-500/25"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <div className="mb-4 inline-flex rounded-xl border border-white/[0.10] p-2.5" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <d.icon size={18} className="text-white/70" />
                </div>
                <h4 className="font-display text-sm font-bold text-white">{d.title}</h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-white/55">{d.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SolutionSection;
