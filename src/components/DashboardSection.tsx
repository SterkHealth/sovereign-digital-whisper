import { useState } from "react";
import {
  AreaChart, Area, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
  ComposedChart, ErrorBar,
} from "recharts";
import {
  AlertTriangle, CheckCircle, XCircle,
  TrendingUp, TrendingDown, Minus,
  Wheat,
  Thermometer, Wifi, Clock, ArrowRight,
  Info,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Utility components
// ─────────────────────────────────────────────────────────────

function InfoTip({ text }: { text: string }) {
  return (
    <span className="group relative ml-1 inline-block cursor-help align-middle">
      <Info size={9} className="text-white/25 group-hover:text-white/50 transition-colors" />
      <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-50 mb-1.5 w-48 -translate-x-1/2 rounded border border-white/10 bg-[#0e200f] px-2.5 py-2 font-mono text-[8px] leading-relaxed text-white/70 shadow-xl group-hover:visible">
        {text}
      </span>
    </span>
  );
}

function Sparkline({
  data, color = "#4ade80", w = 56, h = 18,
}: { data: number[]; color?: string; w?: number; h?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * w,
    y: h - ((v - min) / range) * (h - 4) - 2,
  }));
  const str = pts.map((p) => `${p.x},${p.y}`).join(" ");
  const last = pts[pts.length - 1];
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      <polyline
        points={str}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.8}
      />
      <circle cx={last.x} cy={last.y} r={2.5} fill={color} />
    </svg>
  );
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean; payload?: { color: string; name: string; value: number }[]; label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-white/10 bg-[#0d1f10] px-3 py-2 text-xs shadow-xl">
      <p className="mb-1 font-mono text-[9px] font-bold text-white/60">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// Africa SVG map helpers
// ─────────────────────────────────────────────────────────────
// Coordinate transform: lat/lon → SVG (viewBox 0 0 240 280)
// x = (lon + 18) / 70 * 240   y = (38 - lat) / 73 * 280
function ll2svg(lat: number, lon: number) {
  return {
    x: ((lon + 18) / 70) * 240,
    y: ((38 - lat) / 73) * 280,
  };
}

// Simplified Africa polygon outline
const AFRICA_PATH =
  "M 56,12 L 97,4 L 148,19 L 174,27 L 188,61 L 209,103 L 222,138 L 206,154 L 199,158 L 199,184 L 182,222 L 171,261 L 123,277 L 116,258 L 103,218 L 103,166 L 89,111 L 72,131 L 58,128 L 44,125 L 27,125 L 14,111 L 3,92 L 3,70 L 17,42 Z";

// ─────────────────────────────────────────────────────────────
// Climate Risk data
// ─────────────────────────────────────────────────────────────

const rainfallData = [
  { month: "Jan", actual: 45, avg: 62, upper: 74,  lower: 50 },
  { month: "Feb", actual: 38, avg: 55, upper: 67,  lower: 43 },
  { month: "Mar", actual: 72, avg: 80, upper: 94,  lower: 66 },
  { month: "Apr", actual: 95, avg: 110, upper: 128, lower: 92 },
  { month: "May", actual: 88, avg: 105, upper: 122, lower: 88 },
  { month: "Jun", actual: 42, avg: 60, upper: 72,  lower: 48 },
  { month: "Jul", actual: 28, avg: 35, upper: 44,  lower: 27 },
  { month: "Aug", actual: 31, avg: 38, upper: 47,  lower: 29 },
  { month: "Sep", actual: 65, avg: 85, upper: 101, lower: 69 },
  { month: "Oct", actual: 112, avg: 130, upper: 152, lower: 108 },
  { month: "Nov", actual: 98, avg: 115, upper: 134, lower: 96 },
  { month: "Dec", actual: 55, avg: 70, upper: 84,  lower: 56 },
];

// Each entry: name, risk 0–100, lat, lon
const CLIMATE_COUNTRIES = [
  { name: "Kenya",        risk: 72, lat:  0.0, lon: 38.0, level: "HIGH" },
  { name: "Nigeria",      risk: 65, lat:  9.0, lon:  8.0, level: "HIGH" },
  { name: "Ethiopia",     risk: 58, lat:  9.0, lon: 40.0, level: "MED"  },
  { name: "Tanzania",     risk: 51, lat: -6.0, lon: 35.0, level: "MED"  },
  { name: "Ghana",        risk: 41, lat:  8.0, lon: -1.0, level: "MED"  },
  { name: "Uganda",       risk: 28, lat:  1.0, lon: 32.0, level: "LOW"  },
  { name: "South Africa", risk: 35, lat:-29.0, lon: 25.0, level: "LOW"  },
  { name: "Zambia",       risk: 44, lat:-13.0, lon: 28.0, level: "MED"  },
];

const climateMetrics = [
  {
    group: "Risk Indices",
    items: [
      {
        label: "Drought Risk Score",
        value: "72",
        unit: "/100",
        ci: "±5",
        horizon: "30-day forecast",
        trend: +8,
        sparkData: [55, 58, 61, 65, 68, 71, 70, 72],
        definition: "Composite index combining SPI, VHI and NDVI anomaly. Scores ≥75 trigger parametric payouts.",
        severity: "HIGH",
      },
      {
        label: "Vegetation Loss Index",
        value: "81",
        unit: "/100",
        ci: "±4",
        horizon: "30-day avg",
        trend: +12,
        sparkData: [60, 65, 68, 71, 74, 78, 80, 81],
        definition: "Percentage of monitored area with NDVI ≥15% below the 5-year baseline.",
        severity: "BREACH",
      },
    ],
  },
  {
    group: "Climate Conditions",
    items: [
      {
        label: "Flood Probability",
        value: "34",
        unit: "%",
        ci: "±7",
        horizon: "7-day forecast",
        trend: -2,
        sparkData: [42, 39, 38, 36, 35, 34, 34, 34],
        definition: "Ensemble model probability of >50mm/24h rainfall causing surface run-off flooding.",
        severity: "LOW",
      },
      {
        label: "Heat Stress Index",
        value: "58",
        unit: "/100",
        ci: "±6",
        horizon: "14-day avg",
        trend: 0,
        sparkData: [52, 54, 55, 55, 57, 58, 57, 58],
        definition: "Wet-bulb temperature anomaly index calibrated to crop stress thresholds for the region.",
        severity: "MED",
      },
    ],
  },
];

const climateTriggers = [
  { name: "Drought Index",     value: 72, threshold: 75, ci: 5,  status: "warning", unit: "/100" },
  { name: "Flood Probability", value: 34, threshold: 60, ci: 7,  status: "ok",      unit: "%"    },
  { name: "Heat Stress",       value: 58, threshold: 65, ci: 6,  status: "warning", unit: "/100" },
  { name: "Vegetation Loss",   value: 81, threshold: 75, ci: 4,  status: "breach",  unit: "/100" },
];

const climateActions = [
  {
    priority: 1,
    severity: "CRITICAL",
    title: "Activate parametric payout — Vegetation Loss breach",
    detail: "Index at 81/100, threshold 75. Notify insurer partners. Est. affected area: 340K ha.",
    horizon: "Action required within 48h",
    color: "#ef4444",
  },
  {
    priority: 2,
    severity: "HIGH",
    title: "Drought early warning — Northern Kenya",
    detail: "30-day SPI at −1.8. Recommend activating food-security alert protocols in 3 counties.",
    horizon: "Action within 7 days",
    color: "#f97316",
  },
  {
    priority: 3,
    severity: "MED",
    title: "Heat stress monitoring — Sahel Belt",
    detail: "Index trending toward threshold. Monitor daily; prepare advisory for smallholder farmers.",
    horizon: "Review in 14 days",
    color: "#f59e0b",
  },
  {
    priority: 4,
    severity: "LOW",
    title: "Routine: Update flood model — Lake Victoria basin",
    detail: "Seasonal rainfall onset ahead of schedule. Re-run inundation model with updated DEM.",
    horizon: "Next weekly cycle",
    color: "#4ade80",
  },
];

// ─────────────────────────────────────────────────────────────
// Agri data
// ─────────────────────────────────────────────────────────────

const yieldData = [
  { crop: "Maize",   forecast: 3.2, historical: 2.8, errorY: 0.3 },
  { crop: "Rice",    forecast: 4.1, historical: 3.7, errorY: 0.4 },
  { crop: "Cassava", forecast: 8.4, historical: 7.2, errorY: 0.7 },
  { crop: "Wheat",   forecast: 2.1, historical: 2.4, errorY: 0.25 },
  { crop: "Sorghum", forecast: 1.8, historical: 1.5, errorY: 0.2 },
  { crop: "Coffee",  forecast: 0.9, historical: 1.1, errorY: 0.15 },
];

const soilData = [
  { week: "W1", moisture: 38, upper: 42, lower: 34, optimal: 45 },
  { week: "W2", moisture: 42, upper: 46, lower: 38, optimal: 45 },
  { week: "W3", moisture: 35, upper: 39, lower: 31, optimal: 45 },
  { week: "W4", moisture: 29, upper: 33, lower: 25, optimal: 45 },
  { week: "W5", moisture: 33, upper: 37, lower: 29, optimal: 45 },
  { week: "W6", moisture: 40, upper: 44, lower: 36, optimal: 45 },
  { week: "W7", moisture: 44, upper: 48, lower: 40, optimal: 45 },
  { week: "W8", moisture: 47, upper: 51, lower: 43, optimal: 45 },
];

const AGRI_COUNTRIES = [
  { name: "Kenya",    ndvi: 0.68, plots: 210, lat:  0.0, lon: 38.0 },
  { name: "Ethiopia", ndvi: 0.61, plots: 180, lat:  9.0, lon: 40.0 },
  { name: "Tanzania", ndvi: 0.72, plots: 165, lat: -6.0, lon: 35.0 },
  { name: "Uganda",   ndvi: 0.64, plots: 130, lat:  1.0, lon: 32.0 },
  { name: "Zambia",   ndvi: 0.55, plots: 85,  lat:-13.0, lon: 28.0 },
  { name: "Ghana",    ndvi: 0.59, plots: 77,  lat:  8.0, lon: -1.0 },
];

const ndviDistribution = [
  { label: "Excellent", range: "NDVI ≥ 0.70", pct: 23, color: "#4ade80",
    definition: "Dense healthy canopy. Low intervention risk." },
  { label: "Good",      range: "0.50 – 0.70", pct: 41, color: "#86efac",
    definition: "Moderate vegetative cover. Standard monitoring." },
  { label: "Fair",      range: "0.30 – 0.50", pct: 28, color: "#f59e0b",
    definition: "Stressed vegetation. Soil moisture check advised." },
  { label: "Poor",      range: "< 0.30",      pct:  8, color: "#ef4444",
    definition: "Severe stress or bare soil. Immediate advisory needed." },
];

const agriMetrics = [
  {
    group: "Crop Health",
    items: [
      {
        label: "Crop Health (NDVI)",
        value: "0.68",
        unit: "",
        ci: "±0.03",
        horizon: "Weekly composite",
        trend: +0.03,
        sparkData: [0.61, 0.63, 0.64, 0.65, 0.66, 0.67, 0.67, 0.68],
        definition: "Mean Normalised Difference Vegetation Index across all active monitored plots. Range: 0–1.",
        severity: "MED",
      },
      {
        label: "Yield Forecast",
        value: "+12%",
        unit: " YoY",
        ci: "±4%",
        horizon: "End-of-season estimate",
        trend: +5,
        sparkData: [2, 4, 6, 7, 9, 10, 11, 12],
        definition: "Projected seasonal yield relative to 5-year average, derived from NDVI trajectory + rainfall model.",
        severity: "LOW",
      },
    ],
  },
  {
    group: "Soil & Field",
    items: [
      {
        label: "Avg Soil Moisture",
        value: "42%",
        unit: "",
        ci: "±4%",
        horizon: "7-day avg",
        trend: -3,
        sparkData: [48, 46, 44, 42, 38, 35, 38, 42],
        definition: "Volumetric water content averaged across plot-level sensor network. Optimal range: 40–55%.",
        severity: "MED",
      },
      {
        label: "Active Plot Records",
        value: "847K",
        unit: "",
        ci: "",
        horizon: "Live count",
        trend: +23,
        sparkData: [780, 795, 800, 810, 820, 830, 840, 847],
        definition: "Unique smallholder plots with active satellite coverage and at least 1 soil/crop reading this season.",
        severity: "LOW",
      },
    ],
  },
];

const agriActions = [
  {
    priority: 1,
    severity: "HIGH",
    title: "Soil moisture deficit — Western Kenya plots",
    detail: "18% of plots in Kisumu county below 30% VWC for 14+ days. Recommend irrigation advisory + insurer notification.",
    horizon: "Action within 3 days",
    color: "#f97316",
  },
  {
    priority: 2,
    severity: "HIGH",
    title: "Wheat yield revision — below historical avg",
    detail: "Wheat forecast at 2.1 t/ha vs 2.4 historical. Consider credit risk flag for wheat-secured loans in affected zones.",
    horizon: "Review credit exposure by EOM",
    color: "#f97316",
  },
  {
    priority: 3,
    severity: "MED",
    title: "NDVI fair-zone monitoring — Zambia",
    detail: "28% of Zambia plots in 'Fair' band (0.3–0.5). Schedule agronomist field verification for 50 sentinel plots.",
    horizon: "Field visit within 2 weeks",
    color: "#f59e0b",
  },
  {
    priority: 4,
    severity: "LOW",
    title: "Expand plot coverage — Southern Ethiopia",
    detail: "Gap in satellite coverage identified. 40K unmonitored smallholder plots in SNNPR. Enrol via mobile data collection.",
    horizon: "Next intake window: May 1",
    color: "#4ade80",
  },
];

const NDVI_GRID = Array.from({ length: 120 }, () => {
  const r = Math.random();
  if (r > 0.77) return 0;
  if (r > 0.36) return 1;
  if (r > 0.08) return 2;
  return 3;
});
const NDVI_COLORS = ["#4ade80", "#86efac", "#f59e0b", "#ef4444"];

// ─────────────────────────────────────────────────────────────
// Shared sub-components
// ─────────────────────────────────────────────────────────────

type Severity = "HIGH" | "MED" | "LOW" | "BREACH" | "CRITICAL";

function severityStyle(s: Severity | string) {
  if (s === "BREACH" || s === "CRITICAL") return { bg: "bg-red-500/20",   text: "text-red-400",   bar: "#ef4444", spark: "#ef4444"  };
  if (s === "HIGH")   return { bg: "bg-orange-500/20", text: "text-orange-400", bar: "#f97316", spark: "#f97316" };
  if (s === "MED")    return { bg: "bg-amber-500/20",  text: "text-amber-400",  bar: "#f59e0b", spark: "#f59e0b" };
  return               { bg: "bg-green-500/20",  text: "text-green-400",  bar: "#4ade80", spark: "#4ade80" };
}

function TrendBadge({ trend, unit = "" }: { trend: number; unit?: string }) {
  if (trend > 0)
    return (
      <span className="flex items-center gap-0.5 font-mono text-[9px] text-orange-400">
        <TrendingUp size={9} />+{trend}{unit}
      </span>
    );
  if (trend < 0)
    return (
      <span className="flex items-center gap-0.5 font-mono text-[9px] text-green-400">
        <TrendingDown size={9} />{trend}{unit}
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 font-mono text-[9px] text-white/30">
      <Minus size={9} />Stable
    </span>
  );
}

function MetricCard({
  label, value, unit, ci, horizon, trend, sparkData, definition, severity,
}: {
  label: string; value: string; unit: string; ci: string; horizon: string;
  trend: number; sparkData: number[]; definition: string; severity: string;
}) {
  const sty = severityStyle(severity);
  return (
    <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3">
      <div className="mb-1 flex items-start justify-between gap-1">
        <span className="font-mono text-[9px] leading-tight text-white/50">
          {label}
          <InfoTip text={definition} />
        </span>
        <span className={`flex-shrink-0 rounded px-1.5 py-0.5 font-mono text-[7px] font-bold ${sty.bg} ${sty.text}`}>
          {severity}
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="font-display text-xl font-bold leading-none text-white">
            {value}<span className="text-xs text-white/40">{unit}</span>
          </p>
          {ci && (
            <p className="mt-0.5 font-mono text-[8px] text-white/25">{ci} · 90% CI</p>
          )}
        </div>
        <Sparkline data={sparkData} color={sty.spark} />
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-white/[0.05] pt-1.5">
        <span className="font-mono text-[8px] text-white/30">{horizon}</span>
        <TrendBadge trend={trend} unit={unit === "/100" ? "pts" : unit === "%" ? "pts" : ""} />
      </div>
    </div>
  );
}

function ActionList({ actions }: { actions: typeof climateActions }) {
  return (
    <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3">
      <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
        Prioritised Actions
        <InfoTip text="Actions ranked by severity × time-sensitivity. CRITICAL items require same-day response." />
      </p>
      <div className="space-y-2.5">
        {actions.map((a) => (
          <div key={a.priority} className="flex gap-2.5 rounded bg-white/[0.03] p-2.5">
            <div
              className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full font-mono text-[9px] font-bold text-black"
              style={{ background: a.color }}
            >
              {a.priority}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="font-mono text-[9px] font-bold text-white/90">{a.title}</p>
                <span
                  className="rounded px-1 py-px font-mono text-[7px] font-bold"
                  style={{ background: `${a.color}25`, color: a.color }}
                >
                  {a.severity}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[8px] leading-relaxed text-white/40">{a.detail}</p>
              <p className="mt-1 flex items-center gap-1 font-mono text-[8px]" style={{ color: a.color }}>
                <ArrowRight size={8} />{a.horizon}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CriticalCallout({ items }: { items: Array<{ title: string; detail: string }> }) {
  return (
    <div className="flex items-start gap-3 rounded border border-red-500/30 bg-red-500/[0.07] p-3">
      <XCircle size={16} className="mt-0.5 flex-shrink-0 text-red-400" />
      <div className="min-w-0 flex-1 space-y-1">
        <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-red-400">
          ⚠ Critical Risk — Immediate Attention Required
        </p>
        {items.map((it) => (
          <p key={it.title} className="font-mono text-[9px] text-white/70">
            <span className="font-bold text-red-300">{it.title}:</span> {it.detail}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Africa SVG Map
// ─────────────────────────────────────────────────────────────
function AfricaMap({
  countries,
  colorKey,
}: {
  countries: Array<{ name: string; risk?: number; ndvi?: number; plots?: number; lat: number; lon: number; level?: string }>;
  colorKey: "risk" | "ndvi";
}) {
  function nodeColor(c: typeof countries[0]) {
    if (colorKey === "risk") {
      const lv = c.level ?? "LOW";
      if (lv === "HIGH" || lv === "BREACH") return "#ef4444";
      if (lv === "MED") return "#f59e0b";
      return "#4ade80";
    }
    const v = c.ndvi ?? 0.5;
    if (v >= 0.7) return "#4ade80";
    if (v >= 0.5) return "#86efac";
    if (v >= 0.3) return "#f59e0b";
    return "#ef4444";
  }

  function nodeRadius(c: typeof countries[0]) {
    if (colorKey === "risk") return 5 + ((c.risk ?? 50) / 100) * 10;
    return 5 + ((c.plots ?? 100) / 250) * 10;
  }

  return (
    <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-white/40">
        {colorKey === "risk" ? "Regional Risk Distribution" : "Plot Coverage by Country"}
        <InfoTip text={colorKey === "risk" ? "Circle size = risk score. Color = severity level." : "Circle size = active monitored plots (K). Color = NDVI health band."} />
      </p>
      <svg
        viewBox="0 0 240 290"
        className="w-full"
        style={{ maxHeight: 220 }}
      >
        {/* ocean background */}
        <rect x="0" y="0" width="240" height="290" fill="rgba(0,30,10,0.4)" rx="4" />
        {/* Africa polygon */}
        <path
          d={AFRICA_PATH}
          fill="rgba(30,80,40,0.35)"
          stroke="rgba(74,222,128,0.18)"
          strokeWidth={1}
        />
        {/* Country nodes */}
        {countries.map((c) => {
          const { x, y } = ll2svg(c.lat, c.lon);
          const r = nodeRadius(c);
          const col = nodeColor(c);
          const label = colorKey === "risk"
            ? `${c.name}: ${c.risk}/100`
            : `${c.name}: NDVI ${c.ndvi?.toFixed(2)} · ${c.plots}K plots`;
          return (
            <g key={c.name}>
              <title>{label}</title>
              {/* Pulse ring */}
              <circle cx={x} cy={y} r={r + 4} fill="none" stroke={col} strokeWidth={0.75} opacity={0.3} />
              {/* Main dot */}
              <circle cx={x} cy={y} r={r} fill={col} opacity={0.85} />
              {/* Label */}
              <text
                x={x + r + 3}
                y={y + 3}
                fontSize={7}
                fill="rgba(255,255,255,0.65)"
                fontFamily="monospace"
              >
                {c.name}
              </text>
            </g>
          );
        })}
        {/* Legend */}
        {colorKey === "risk" && (
          <g>
            {[{ c: "#ef4444", l: "HIGH" }, { c: "#f59e0b", l: "MED" }, { c: "#4ade80", l: "LOW" }].map((it, i) => (
              <g key={it.l} transform={`translate(${4 + i * 52}, 278)`}>
                <circle r={4} cx={4} cy={0} fill={it.c} opacity={0.85} />
                <text x={10} y={3.5} fontSize={6.5} fill="rgba(255,255,255,0.5)" fontFamily="monospace">{it.l}</text>
              </g>
            ))}
          </g>
        )}
        {colorKey === "ndvi" && (
          <g>
            {[{ c: "#4ade80", l: "≥0.70" }, { c: "#86efac", l: "0.50-0.70" }, { c: "#f59e0b", l: "0.30-0.50" }].map((it, i) => (
              <g key={it.l} transform={`translate(${4 + i * 72}, 278)`}>
                <circle r={4} cx={4} cy={0} fill={it.c} opacity={0.85} />
                <text x={10} y={3.5} fontSize={6} fill="rgba(255,255,255,0.5)" fontFamily="monospace">{it.l}</text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Climate Risk Dashboard
// ─────────────────────────────────────────────────────────────
function ClimateRiskDashboard() {
  return (
    <div className="space-y-4">
      {/* Dashboard header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-400/50">Module 01 · Climate Risk Intelligence</p>
          <p className="mt-0.5 font-mono text-[8px] text-white/30">Data sources: ERA5 · CHIRPS · MODIS · GDACS · National met services</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 font-mono text-[9px] text-green-400">📍 Sub-Saharan Africa</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-white/30"><Wifi size={8} />Live</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-white/30"><Clock size={8} />Updated 4m ago</span>
        </div>
      </div>

      {/* Metric groups */}
      <div className="grid gap-4 lg:grid-cols-2">
        {climateMetrics.map((grp) => (
          <div key={grp.group}>
            <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">{grp.group}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {grp.items.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Map + Rainfall chart with CI */}
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <AfricaMap countries={CLIMATE_COUNTRIES} colorKey="risk" />
        </div>
        <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3 lg:col-span-3">
          <div className="mb-2 flex items-center gap-1">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
              Seasonal Rainfall vs Historical (mm)
            </p>
            <InfoTip text="Shaded band = 90% confidence interval from ensemble model (12 members). Current season shown in amber." />
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={rainfallData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="ciGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#4ade80" stopOpacity={0.10} />
                  <stop offset="100%" stopColor="#4ade80" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor="#d28230" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#d28230" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {/* CI upper band */}
              <Area type="monotone" dataKey="upper" name="Upper CI" stroke="none" fill="url(#ciGrad)" legendType="none" />
              {/* CI lower — fills white to cancel upper and show only the band */}
              <Area type="monotone" dataKey="lower" name="Lower CI" stroke="none" fill="#060f07" legendType="none" />
              {/* Historical avg */}
              <Area type="monotone" dataKey="avg"    name="Hist. avg" stroke="#4ade80" strokeWidth={1.5} strokeDasharray="5 3" fill="none" dot={false} />
              {/* Actual */}
              <Area type="monotone" dataKey="actual" name="This season" stroke="#d28230" strokeWidth={2} fill="url(#actGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-1.5 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/35"><span className="inline-block h-px w-5 border-t border-dashed border-green-400/70" />Hist. avg</span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/35"><span className="inline-block h-0.5 w-5 rounded bg-[#d28230]" />This season</span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/35"><span className="inline-block h-3 w-5 rounded" style={{ background: "rgba(74,222,128,0.12)" }} />90% CI band</span>
          </div>
        </div>
      </div>

      {/* Triggers + Actions */}
      <div className="grid gap-3 lg:grid-cols-5">
        {/* Parametric triggers */}
        <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3 lg:col-span-3">
          <div className="mb-3 flex items-center gap-1">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">Parametric Trigger Indices</p>
            <InfoTip text="Vertical marker = payout threshold. Shaded bar width = ±CI. Score must exceed threshold for ≥3 consecutive days to trigger." />
          </div>
          <div className="space-y-3.5">
            {climateTriggers.map((t) => {
              const col = t.status === "breach" ? "#ef4444" : t.status === "warning" ? "#f59e0b" : "#4ade80";
              return (
                <div key={t.name} className="flex items-center gap-3">
                  <span className="w-32 flex-shrink-0 font-mono text-[9px] text-white/55">{t.name}</span>
                  <div className="relative flex-1">
                    {/* CI range bar */}
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                      <div className="h-full rounded-full" style={{ width: `${t.value}%`, background: col }} />
                    </div>
                    {/* CI uncertainty band */}
                    <div
                      className="absolute top-0 h-2.5 rounded-full opacity-30"
                      style={{
                        left: `${Math.max(0, t.value - t.ci)}%`,
                        width: `${t.ci * 2}%`,
                        background: col,
                      }}
                    />
                    {/* Threshold marker */}
                    <div
                      className="absolute top-0 h-2.5 w-px"
                      style={{ left: `${t.threshold}%`, background: "rgba(255,255,255,0.5)" }}
                      title={`Trigger threshold: ${t.threshold}${t.unit}`}
                    />
                  </div>
                  <span className="w-14 flex-shrink-0 text-right font-mono text-[10px] font-bold" style={{ color: col }}>
                    {t.value}<span className="text-[8px] text-white/30">{t.unit}</span>
                  </span>
                  <span className="w-16 flex-shrink-0 text-right">
                    {t.status === "breach"  && <span className="flex items-center justify-end gap-0.5 font-mono text-[8px] text-red-400"><XCircle size={8} />Breached</span>}
                    {t.status === "warning" && <span className="flex items-center justify-end gap-0.5 font-mono text-[8px] text-amber-400"><AlertTriangle size={8} />Near</span>}
                    {t.status === "ok"      && <span className="flex items-center justify-end gap-0.5 font-mono text-[8px] text-green-400"><CheckCircle size={8} />OK</span>}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 font-mono text-[7.5px] text-white/20">Shaded overlap = ±CI (90%). Threshold markers = parametric payout levels.</p>
        </div>

        {/* Prioritised actions */}
        <div className="lg:col-span-2">
          <ActionList actions={climateActions} />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Agri Data Dashboard
// ─────────────────────────────────────────────────────────────
function AgriDataDashboard() {
  return (
    <div className="space-y-4">
      {/* Dashboard header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-400/50">Module 02 · Agri Data Intelligence</p>
          <p className="mt-0.5 font-mono text-[8px] text-white/30">Sources: Sentinel-2 · MODIS · IoT sensors · National extension registries</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 font-mono text-[9px] text-green-400">🌾 East Africa · Season Mar–Jun 2025</span>
          <span className="flex items-center gap-1 font-mono text-[8px] text-white/30"><Wifi size={8} />Live</span>
        </div>
      </div>

      {/* Metric groups */}
      <div className="grid gap-4 lg:grid-cols-2">
        {agriMetrics.map((grp) => (
          <div key={grp.group}>
            <p className="mb-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">{grp.group}</p>
            <div className="grid grid-cols-2 gap-2.5">
              {grp.items.map((m) => (
                <MetricCard key={m.label} {...m} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Map + Yield chart */}
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <AfricaMap countries={AGRI_COUNTRIES} colorKey="ndvi" />
        </div>
        <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3 lg:col-span-3">
          <div className="mb-2 flex items-center gap-1">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
              Yield Forecast vs Historical (t/ha)
            </p>
            <InfoTip text="Error bars show ±1σ model uncertainty. Green = forecast above historical. Amber = below. Based on current NDVI trajectory + seasonal rainfall." />
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <ComposedChart data={yieldData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="crop" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="historical" name="Historical avg" fill="rgba(255,255,255,0.09)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="forecast" name="Forecast" radius={[2, 2, 0, 0]}>
                {yieldData.map((entry, i) => (
                  <Cell key={i} fill={entry.forecast >= entry.historical ? "#4ade80" : "#f59e0b"} />
                ))}
                <ErrorBar dataKey="errorY" width={4} strokeWidth={1.5} stroke="rgba(255,255,255,0.4)" />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-1.5 flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/35"><span className="inline-block h-2.5 w-4 rounded-sm bg-white/10" />Historical avg</span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/35"><span className="inline-block h-2.5 w-4 rounded-sm bg-green-400" />Above avg</span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/35"><span className="inline-block h-2.5 w-4 rounded-sm bg-amber-400" />Below avg</span>
            <span className="flex items-center gap-1.5 font-mono text-[8px] text-white/35"><span className="inline-block h-px w-4 bg-white/40" />±1σ CI</span>
          </div>
        </div>
      </div>

      {/* NDVI + Soil moisture + Actions */}
      <div className="grid gap-3 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-3">
          {/* NDVI distribution */}
          <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="mb-3 flex items-center gap-1">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">Crop Health Distribution (NDVI)</p>
              <InfoTip text="Distribution of all active plot NDVI readings this week. Hover labels for action thresholds." />
            </div>
            <div className="space-y-2.5">
              {ndviDistribution.map((n) => (
                <div key={n.label}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 font-mono text-[9px]" style={{ color: n.color }}>
                      {n.label}
                      <InfoTip text={n.definition} />
                    </span>
                    <span className="font-mono text-[8px] text-white/40">{n.range} · <strong className="text-white/60">{n.pct}%</strong></span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div className="h-full rounded-full" style={{ width: `${n.pct * 2}%`, background: n.color, opacity: 0.85 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Soil moisture with CI */}
          <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="mb-2 flex items-center gap-1">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">Soil Moisture Trend — 8-week</p>
              <InfoTip text="Shaded area = 90% CI across sensor network variance. Dashed line = agronomic optimal (45% VWC)." />
            </div>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={soilData} margin={{ top: 4, right: 4, left: -34, bottom: 0 }}>
                <defs>
                  <linearGradient id="soilCiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#4ade80" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity={0.01} />
                  </linearGradient>
                  <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#4ade80" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }} axisLine={false} tickLine={false} domain={[20, 55]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={45} stroke="rgba(255,255,255,0.3)" strokeDasharray="4 3" label={{ value: "Optimal", position: "right", fill: "rgba(255,255,255,0.3)", fontSize: 7 }} />
                <Area type="monotone" dataKey="upper"    name="Upper CI" stroke="none" fill="url(#soilCiGrad)" legendType="none" />
                <Area type="monotone" dataKey="lower"    name="Lower CI" stroke="none" fill="#060f07"         legendType="none" />
                <Area type="monotone" dataKey="moisture" name="Avg moisture %" stroke="#4ade80" strokeWidth={2} fill="url(#soilGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Actions */}
        <div className="lg:col-span-2">
          <ActionList actions={agriActions} />
        </div>
      </div>

      {/* NDVI plot grid */}
      <div className="rounded border border-white/[0.06] bg-white/[0.025] p-3">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
              Plot-Level Health Monitor — 847K active plots (sample grid)
            </p>
            <InfoTip text="Each tile = a representative plot cluster. Color = NDVI health band. Hover for detail. Updated weekly from Sentinel-2 imagery." />
          </div>
          <div className="flex flex-wrap gap-3">
            {ndviDistribution.map((n) => (
              <span key={n.label} className="flex items-center gap-1 font-mono text-[8px] text-white/35">
                <span className="h-2 w-2 rounded-sm" style={{ background: n.color }} />{n.label}
              </span>
            ))}
          </div>
        </div>
        <div className="grid gap-0.5" style={{ gridTemplateColumns: "repeat(20, 1fr)" }}>
          {NDVI_GRID.map((v, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm opacity-80 transition-opacity hover:opacity-100 cursor-default"
              style={{ background: NDVI_COLORS[v] }}
              title={ndviDistribution[v].label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────────
export default function DashboardSection() {
  const [tab, setTab] = useState<"climate" | "agri">("climate");

  return (
    <div
      className="mt-16 overflow-hidden rounded-xl border border-white/[0.08]"
      style={{ background: "#060f07" }}
    >
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-white/[0.06] bg-white/[0.02]">
        {(
          [
            { key: "climate", icon: Thermometer, label: "Climate Risk Intelligence" },
            { key: "agri",    icon: Wheat,       label: "Agri Data Intelligence"    },
          ] as const
        ).map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
              tab === key
                ? "border-b-2 border-[#4ade80] text-white"
                : "text-white/35 hover:text-white/60"
            }`}
          >
            <Icon size={11} />
            {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2 px-4">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <span className="font-mono text-[8px] uppercase tracking-widest text-green-400/60">
            Platform Preview
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {tab === "climate" ? <ClimateRiskDashboard /> : <AgriDataDashboard />}
      </div>
    </div>
  );
}
