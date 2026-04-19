import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

// ── Visual Mockups ────────────────────────────────────────────────────────────

function DashboardMockup() {
  const bars = [30, 45, 62, 80, 70, 55, 42, 68, 85, 73, 58, 44];
  const metrics = [
    { label: "Risk Index",  value: "74.2",   color: "hsl(33,65%,50%)" },
    { label: "Yield Score", value: "88 %",   color: "#4ade80" },
    { label: "Coverage",    value: "3.2 M ha", color: "#4ade80" },
    { label: "Active Alerts", value: "12",   color: "#f87171" },
  ];
  return (
    <div
      className="w-full rounded-none border border-white/10 p-5"
      style={{ background: "rgba(255,255,255,0.03)" }}
    >
      {/* Header bar */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          Live Platform Dashboard
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
          <span className="font-mono text-[9px] text-white/30">LIVE</span>
        </span>
      </div>

      {/* KPI grid */}
      <div className="mb-4 grid grid-cols-2 gap-2">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="border border-white/10 p-3"
            style={{ background: "rgba(0,0,0,0.35)" }}
          >
            <div className="font-mono text-[9px] uppercase tracking-wider text-white/35">
              {m.label}
            </div>
            <div className="mt-1.5 text-xl font-bold" style={{ color: m.color }}>
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Mini bar chart */}
      <div
        className="border border-white/10 p-3"
        style={{ background: "rgba(0,0,0,0.35)" }}
      >
        <div className="mb-2 font-mono text-[9px] uppercase tracking-wider text-white/35">
          Seasonal Risk Trend
        </div>
        <div className="flex h-14 items-end gap-[3px]">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 transition-all"
              style={{
                height: `${h}%`,
                background: i === 8 ? "hsl(33,65%,50%)" : "rgba(74,222,128,0.38)",
              }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between">
          <span className="font-mono text-[8px] text-white/25">Jan</span>
          <span className="font-mono text-[8px] text-white/25">Dec</span>
        </div>
      </div>
    </div>
  );
}

function JsonTerminal() {
  return (
    <div
      className="w-full border border-white/10 p-0 overflow-hidden"
      style={{ background: "rgba(0,0,0,0.6)" }}
    >
      {/* Window bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10"
        style={{ background: "rgba(255,255,255,0.04)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
        <span className="ml-3 font-mono text-[10px] text-white/30">
          GET /v2/risk-index
        </span>
      </div>

      {/* Code body */}
      <pre className="p-4 font-mono text-[11px] leading-relaxed overflow-x-auto">
        <span className="text-white/30">{"// Aixatech Data API — v2"}</span>
        {"\n"}
        <span className="text-green-400">{"{"}</span>
        {"\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"location"</span>
        {": "}<span className="text-green-300">"Mwanza, TZ"</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"date"</span>
        {": "}<span className="text-green-300">"2025-03-14"</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"risk_index"</span>
        {": "}<span className="text-white/80">74.2</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"drought_prob"</span>
        {": "}<span className="text-white/80">0.61</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"yield_forecast_t_ha"</span>
        {": "}<span className="text-white/80">2.34</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"ndvi"</span>
        {": "}<span className="text-white/80">0.48</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"trigger_breached"</span>
        {": "}<span className="text-red-400">true</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"confidence"</span>
        {": "}<span className="text-white/80">0.92</span>{",\n"}
        {"  "}<span className="text-[hsl(33,65%,65%)]">"sovereign_hosted"</span>
        {": "}<span className="text-green-400">true</span>{"\n"}
        <span className="text-green-400">{"}"}</span>
      </pre>
    </div>
  );
}

function SovereignDiagram() {
  const nodes = [
    { x: 120, y: 28,  label: "Satellite",    sub: "Raw EO",         col: "#4ade80" },
    { x: 30,  y: 100, label: "Weather API",  sub: "WMO feeds",      col: "#4ade80" },
    { x: 210, y: 100, label: "IoT Sensors",  sub: "Ground truth",   col: "#4ade80" },
    { x: 120, y: 165, label: "Ingest Layer", sub: "In-country",     col: "hsl(33,65%,50%)" },
    { x: 120, y: 242, label: "Sovereign AI", sub: "Local model",    col: "hsl(33,65%,50%)" },
    { x: 30,  y: 315, label: "Gov Portal",   sub: "Ministry",       col: "#60a5fa" },
    { x: 120, y: 315, label: "Risk API",     sub: "Insurers",       col: "#60a5fa" },
    { x: 210, y: 315, label: "Dashboards",   sub: "DFIs",           col: "#60a5fa" },
  ];
  const edges = [
    [0, 3], [1, 3], [2, 3],
    [3, 4],
    [4, 5], [4, 6], [4, 7],
  ];
  return (
    <div
      className="w-full border border-white/10 p-4"
      style={{ background: "rgba(255,255,255,0.02)" }}
    >
      <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35">
        Sovereign Infrastructure Stack
      </div>
      <svg viewBox="0 -10 240 360" className="w-full" style={{ maxHeight: 340 }}>
        {/* Dashed border box around AI layer */}
        <rect
          x="8" y="145" width="224" height="116"
          rx="2" fill="none"
          stroke="rgba(74,222,128,0.12)" strokeWidth="1" strokeDasharray="4 3"
        />
        <text x="12" y="157" fontSize="7" fontFamily="monospace" fill="rgba(74,222,128,0.3)">
          NATIONAL BORDER
        </text>

        {/* Edges */}
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y + 12}
            x2={nodes[b].x} y2={nodes[b].y - 12}
            stroke="rgba(74,222,128,0.2)" strokeWidth="1"
          />
        ))}

        {/* Nodes */}
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x},${n.y})`}>
            <rect
              x="-36" y="-13" width="72" height="26"
              rx="1"
              fill="rgba(0,0,0,0.55)"
              stroke={n.col}
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <text
              x="0" y="-2"
              textAnchor="middle"
              fontSize="7.5"
              fontFamily="monospace"
              fontWeight="700"
              fill={n.col}
            >
              {n.label}
            </text>
            <text
              x="0" y="8"
              textAnchor="middle"
              fontSize="6"
              fontFamily="monospace"
              fill="rgba(255,255,255,0.3)"
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ── Product data ──────────────────────────────────────────────────────────────

const products = [
  {
    id: "paas",
    number: "01",
    tag: "Platform as a Service",
    audience: "For insurers, reinsurers, DFIs, agri-lenders",
    headline: "The full intelligence stack, ready to deploy.",
    description:
      "Get end-to-end access to Aixatech's climate and agricultural risk platform — hosted, maintained, and updated by us. You focus on decisions; we deliver the data, models, dashboards, and alerts.",
    capabilities: [
      "Climate risk scoring and parametric trigger indices",
      "Plot-level yield forecasting and crop health monitoring",
      "Real-time early warning alerts and API access",
      "Pre-built dashboards for insurers and lenders",
      "Ongoing model recalibration as conditions evolve",
      "SLA-backed uptime with dedicated onboarding",
    ],
    Visual: DashboardMockup,
    flip: false,
  },
  {
    id: "daas",
    number: "02",
    tag: "Data as a Service",
    audience: "For reinsurers, DFIs, governments, researchers",
    headline: "Raw intelligence, on demand.",
    description:
      "Access structured datasets — climate indices, satellite-derived crop health, yield estimates, soil moisture, and farmer profiles — via API or bulk export. Integrate directly into your own models, workflows, and products.",
    capabilities: [
      "Historical and real-time climate risk indices",
      "NDVI, soil moisture, and evapotranspiration data",
      "Plot-level yield and crop health datasets",
      "Parametric trigger indices by location and season",
      "Farmer and field-level profile datasets",
      "Bulk CSV / JSON delivery or streaming API",
    ],
    Visual: JsonTerminal,
    flip: true,
  },
  {
    id: "sovereign",
    number: "03",
    tag: "Sovereign AI",
    audience:
      "For national governments, ministries, national met services, development banks",
    headline: "Your country's data stays in your country.",
    description:
      "An end-to-end AI infrastructure stack deployed entirely within national borders — from raw satellite ingest to decision-ready intelligence. No foreign cloud. No data sovereignty compromises. Built for national ownership from the ground up.",
    capabilities: [
      "In-country deployment on sovereign compute infrastructure",
      "National data governance and auditability frameworks",
      "Country-specific model training on local conditions",
      "Integration with national met services and ministries",
      "Training, handover, and long-term technical partnership",
      "Compliant with national and regional data policy frameworks",
    ],
    Visual: SovereignDiagram,
    flip: false,
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(ellipse at 25% 60%, #0d2010 0%, #051008 40%, #000000 75%)",
      }}
    >
      <Navbar />
      {/* Navbar spacer */}
      <div className="h-[73px]" />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-20 pb-16 text-center md:px-12 lg:px-20">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
          The Platform
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          One platform. Three entry points.
        </h1>
        <p className="mx-auto mt-5 max-w-lg text-base text-white/55">
          One platform. Modular by design. Deployable at any layer.
        </p>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="border-t border-white/10" />
      </div>

      {/* ── Products ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        {products.map((p, idx) => (
          <div key={p.number} id={p.id}>
            <div
              className={`grid items-start gap-12 py-20 lg:grid-cols-2 ${
                p.flip ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Text side */}
              <div className="flex flex-col justify-center">
                {/* Number + tag row */}
                <div className="mb-5 flex items-center gap-3">
                  <span
                    className="inline-flex h-8 w-8 items-center justify-center font-mono text-xs font-bold text-white"
                    style={{ background: "hsl(33,65%,50%)" }}
                  >
                    {p.number}
                  </span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                    {p.tag}
                  </span>
                </div>

                <h2 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
                  {p.headline}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-white/55">
                  {p.description}
                </p>

                {/* Audience tag */}
                <div className="mt-6">
                  <span
                    className="inline-block border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
                    style={{
                      borderColor: "hsl(33 65% 50% / 0.35)",
                      color: "hsl(33 65% 65%)",
                    }}
                  >
                    {p.audience}
                  </span>
                </div>

                {/* Capabilities */}
                <ul className="mt-8 space-y-3">
                  {p.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: "hsl(33,65%,55%)" }}
                      />
                      <span className="text-sm leading-relaxed text-white/65">{c}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-10">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
                    style={{ background: "hsl(33,65%,50%)" }}
                  >
                    Book a Call →
                  </a>
                </div>
              </div>

              {/* Visual side */}
              <div className="flex items-center">
                <p.Visual />
              </div>
            </div>

            {/* Divider between products */}
            {idx < products.length - 1 && (
              <div className="border-t border-white/10" />
            )}
          </div>
        ))}
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
            Get Started
          </p>
          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-white">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base text-white/55">
            Tell us about your use case and we'll recommend the right module — or
            a combination of all three.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "hsl(33,65%,50%)" }}
            >
              Book a Discovery Call →
            </a>
            <Link
              to="/#solutions"
              className="inline-flex items-center justify-center border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Explore the Platform
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── Minimal footer ────────────────────────────────────────────────── */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-8">
          <Link
            to="/"
            className="font-display text-base font-bold tracking-tight text-white"
          >
            AIXA<span className="text-white/40">TECH</span>
          </Link>
          <p className="font-mono text-[10px] text-white/30">
            © {new Date().getFullYear()} Aixatech. All rights reserved.
          </p>
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40 transition-colors hover:text-white/70"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
