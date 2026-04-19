import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from "recharts";
import {
  AlertTriangle, CheckCircle, XCircle,
  TrendingUp, TrendingDown, Activity,
  Droplets, Wheat, Users, Thermometer,
  Wifi, Clock,
} from "lucide-react";

// ── Climate Risk data ─────────────────────────────────────────
const rainfallData = [
  { month: "Jan", actual: 45, avg: 62 },
  { month: "Feb", actual: 38, avg: 55 },
  { month: "Mar", actual: 72, avg: 80 },
  { month: "Apr", actual: 95, avg: 110 },
  { month: "May", actual: 88, avg: 105 },
  { month: "Jun", actual: 42, avg: 60 },
  { month: "Jul", actual: 28, avg: 35 },
  { month: "Aug", actual: 31, avg: 38 },
  { month: "Sep", actual: 65, avg: 85 },
  { month: "Oct", actual: 112, avg: 130 },
  { month: "Nov", actual: 98, avg: 115 },
  { month: "Dec", actual: 55, avg: 70 },
];

const regionRisks = [
  { name: "Kenya",     score: 72, level: "HIGH" },
  { name: "Nigeria",   score: 65, level: "HIGH" },
  { name: "Ethiopia",  score: 58, level: "MED"  },
  { name: "Tanzania",  score: 51, level: "MED"  },
  { name: "Ghana",     score: 41, level: "MED"  },
  { name: "Uganda",    score: 28, level: "LOW"  },
];

const triggers = [
  { name: "Drought Index",     value: 72, threshold: 75, status: "warning" },
  { name: "Flood Probability", value: 34, threshold: 60, status: "ok"      },
  { name: "Heat Stress Index", value: 58, threshold: 65, status: "warning" },
  { name: "Vegetation Loss",   value: 81, threshold: 75, status: "breach"  },
];

const alerts = [
  { region: "Northern Kenya",  type: "Drought",    severity: "HIGH", time: "2h ago"  },
  { region: "Sahel Belt",      type: "Heat Stress", severity: "MED", time: "6h ago"  },
  { region: "Horn of Africa",  type: "Crop Loss",   severity: "HIGH", time: "1d ago" },
  { region: "Lake Victoria",   type: "Flood Risk",  severity: "LOW",  time: "2d ago" },
];

// ── Agri Data data ────────────────────────────────────────────
const yieldData = [
  { crop: "Maize",   forecast: 3.2, historical: 2.8 },
  { crop: "Rice",    forecast: 4.1, historical: 3.7 },
  { crop: "Cassava", forecast: 8.4, historical: 7.2 },
  { crop: "Wheat",   forecast: 2.1, historical: 2.4 },
  { crop: "Sorghum", forecast: 1.8, historical: 1.5 },
  { crop: "Coffee",  forecast: 0.9, historical: 1.1 },
];

const soilData = [
  { week: "W1", moisture: 38, optimal: 45 },
  { week: "W2", moisture: 42, optimal: 45 },
  { week: "W3", moisture: 35, optimal: 45 },
  { week: "W4", moisture: 29, optimal: 45 },
  { week: "W5", moisture: 33, optimal: 45 },
  { week: "W6", moisture: 40, optimal: 45 },
  { week: "W7", moisture: 44, optimal: 45 },
  { week: "W8", moisture: 47, optimal: 45 },
];

const ndviDistribution = [
  { label: "Excellent", range: "NDVI 0.7+",   pct: 23, color: "#4ade80" },
  { label: "Good",      range: "0.5 – 0.7",   pct: 41, color: "#86efac" },
  { label: "Fair",      range: "0.3 – 0.5",   pct: 28, color: "#f59e0b" },
  { label: "Poor",      range: "< 0.3",        pct:  8, color: "#ef4444" },
];

// Generate a 12×10 NDVI plot grid (0=excellent, 1=good, 2=fair, 3=poor)
const NDVI_GRID = Array.from({ length: 120 }, () => {
  const r = Math.random();
  if (r > 0.77) return 0;
  if (r > 0.36) return 1;
  if (r > 0.08) return 2;
  return 3;
});
const NDVI_COLORS = ["#4ade80", "#86efac", "#f59e0b", "#ef4444"];

// ── Helpers ───────────────────────────────────────────────────
function riskColor(level: string) {
  if (level === "HIGH") return "text-red-400";
  if (level === "MED")  return "text-amber-400";
  return "text-green-400";
}
function riskBg(level: string) {
  if (level === "HIGH") return "bg-red-500/20 text-red-400";
  if (level === "MED")  return "bg-amber-500/20 text-amber-400";
  return "bg-green-500/20 text-green-400";
}
function triggerColor(status: string) {
  if (status === "breach")  return "#ef4444";
  if (status === "warning") return "#f59e0b";
  return "#4ade80";
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded border border-white/10 bg-[#0d1f10] px-3 py-2 text-xs">
      <p className="mb-1 font-mono font-bold text-white/70">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

// ── Climate Dashboard ─────────────────────────────────────────
function ClimateRiskDashboard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-400/60">Module 01</p>
          <h3 className="font-display text-sm font-bold text-white">Climate Risk Intelligence</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-green-400">
            📍 Sub-Saharan Africa
          </span>
          <span className="flex items-center gap-1 font-mono text-[9px] text-white/30">
            <Wifi size={9} /> Live
          </span>
          <span className="flex items-center gap-1 font-mono text-[9px] text-white/30">
            <Clock size={9} /> Updated 4m ago
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Drought Risk Score", value: "72 / 100", sub: "↑ 8 pts this week",  icon: Thermometer, trend: "up",   accent: "#ef4444" },
          { label: "Flood Probability",  value: "34%",       sub: "↓ Stable",            icon: Droplets,   trend: "down", accent: "#4ade80" },
          { label: "Farmers at Risk",    value: "2.4M",      sub: "3 active advisories", icon: Users,      trend: "up",   accent: "#f59e0b" },
          { label: "Active Alerts",      value: "8",         sub: "4 HIGH severity",     icon: AlertTriangle, trend: "up", accent: "#ef4444" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded border border-white/[0.06] bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">{kpi.label}</p>
              <kpi.icon size={12} style={{ color: kpi.accent }} />
            </div>
            <p className="font-display text-lg font-bold leading-none text-white">{kpi.value}</p>
            <p className="mt-1 font-mono text-[9px]" style={{ color: kpi.accent }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Middle: chart + regional risk */}
      <div className="grid gap-3 lg:grid-cols-5">
        {/* Rainfall chart */}
        <div className="rounded border border-white/[0.06] bg-white/[0.03] p-3 lg:col-span-3">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
            Seasonal Rainfall vs Historical Average (mm)
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={rainfallData} margin={{ top: 2, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="avgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}    />
                </linearGradient>
                <linearGradient id="actGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#d28230" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#d28230" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="avg"    name="Historical avg" stroke="#4ade80" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#avgGrad)" dot={false} />
              <Area type="monotone" dataKey="actual" name="This season"     stroke="#d28230" strokeWidth={2}   fill="url(#actGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="mt-2 flex gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/40">
              <span className="inline-block h-px w-4 border-t border-dashed border-green-400" />Historical avg
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/40">
              <span className="inline-block h-0.5 w-4 rounded bg-[#d28230]" />This season
            </span>
          </div>
        </div>

        {/* Regional risk */}
        <div className="rounded border border-white/[0.06] bg-white/[0.03] p-3 lg:col-span-2">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">Regional Risk Index</p>
          <div className="space-y-2.5">
            {regionRisks.map((r) => (
              <div key={r.name}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-white/70">{r.name}</span>
                  <span className={`rounded px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase ${riskBg(r.level)}`}>{r.level}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${r.score}%`,
                      background: r.level === "HIGH" ? "#ef4444" : r.level === "MED" ? "#f59e0b" : "#4ade80",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: triggers + alerts */}
      <div className="grid gap-3 lg:grid-cols-5">
        {/* Parametric triggers */}
        <div className="rounded border border-white/[0.06] bg-white/[0.03] p-3 lg:col-span-3">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">Parametric Trigger Indices</p>
          <div className="space-y-3">
            {triggers.map((t) => (
              <div key={t.name} className="flex items-center gap-3">
                <span className="w-32 flex-shrink-0 font-mono text-[9px] text-white/60">{t.name}</span>
                <div className="relative flex-1">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${t.value}%`, background: triggerColor(t.status) }}
                    />
                  </div>
                  {/* threshold marker */}
                  <div
                    className="absolute top-0 h-2 w-px bg-white/40"
                    style={{ left: `${t.threshold}%` }}
                    title={`Trigger threshold: ${t.threshold}`}
                  />
                </div>
                <span className="w-8 text-right font-mono text-[10px] font-bold" style={{ color: triggerColor(t.status) }}>
                  {t.value}
                </span>
                <span className="w-14 text-right">
                  {t.status === "breach"  && <span className="flex items-center gap-0.5 font-mono text-[8px] text-red-400"><XCircle size={9}/>Breached</span>}
                  {t.status === "warning" && <span className="flex items-center gap-0.5 font-mono text-[8px] text-amber-400"><AlertTriangle size={9}/>Near</span>}
                  {t.status === "ok"      && <span className="flex items-center gap-0.5 font-mono text-[8px] text-green-400"><CheckCircle size={9}/>OK</span>}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-2 font-mono text-[8px] text-white/25">Vertical markers indicate payout trigger thresholds</p>
        </div>

        {/* Alert feed */}
        <div className="rounded border border-white/[0.06] bg-white/[0.03] p-3 lg:col-span-2">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">Early Warning Feed</p>
          <div className="space-y-2">
            {alerts.map((a) => (
              <div key={a.region} className="flex items-start gap-2 rounded bg-white/[0.03] p-2">
                <span className={`mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full ${a.severity === "HIGH" ? "bg-red-400" : a.severity === "MED" ? "bg-amber-400" : "bg-green-400"}`} />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] font-bold text-white/80 truncate">{a.region}</p>
                  <p className="font-mono text-[8px] text-white/40">{a.type}</p>
                </div>
                <span className={`flex-shrink-0 rounded px-1 py-0.5 font-mono text-[7px] font-bold ${riskBg(a.severity)}`}>{a.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Agri Data Dashboard ───────────────────────────────────────
function AgriDataDashboard() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-400/60">Module 02</p>
          <h3 className="font-display text-sm font-bold text-white">Agri Data Intelligence</h3>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-green-500/15 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-green-400">
            🌾 East Africa
          </span>
          <span className="flex items-center gap-1 font-mono text-[9px] text-white/30">
            <Wifi size={9} /> Live
          </span>
          <span className="flex items-center gap-1 font-mono text-[9px] text-white/30">
            <Clock size={9} /> Season: Mar–Jun 2025
          </span>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Crop Health (NDVI)", value: "0.68",   sub: "↑ Good condition",        icon: Wheat,      accent: "#4ade80" },
          { label: "Avg Soil Moisture",  value: "42%",    sub: "↓ 3pts below optimal",    icon: Droplets,   accent: "#f59e0b" },
          { label: "Yield Forecast",     value: "+12% YoY", sub: "vs 5yr avg",             icon: TrendingUp, accent: "#4ade80" },
          { label: "Active Plot Records",value: "847K",   sub: "Across 6 countries",       icon: Activity,   accent: "#4ade80" },
        ].map((kpi) => (
          <div key={kpi.label} className="rounded border border-white/[0.06] bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">{kpi.label}</p>
              <kpi.icon size={12} style={{ color: kpi.accent }} />
            </div>
            <p className="font-display text-lg font-bold leading-none text-white">{kpi.value}</p>
            <p className="mt-1 font-mono text-[9px]" style={{ color: kpi.accent }}>{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Middle: yield chart + NDVI distribution */}
      <div className="grid gap-3 lg:grid-cols-5">
        {/* Yield forecast bar chart */}
        <div className="rounded border border-white/[0.06] bg-white/[0.03] p-3 lg:col-span-3">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
            Yield Forecast vs Historical (t/ha)
          </p>
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={yieldData} margin={{ top: 2, right: 4, left: -28, bottom: 0 }} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="crop" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 9 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="historical" name="Historical avg" fill="rgba(255,255,255,0.10)" radius={[2,2,0,0]} />
              <Bar dataKey="forecast"   name="Forecast"       radius={[2,2,0,0]}>
                {yieldData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={entry.forecast >= entry.historical ? "#4ade80" : "#f59e0b"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-2 flex gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/40">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-white/10" />Historical avg
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/40">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-green-400" />Forecast (above avg)
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[9px] text-white/40">
              <span className="inline-block h-2.5 w-2.5 rounded-sm bg-amber-400" />Forecast (below avg)
            </span>
          </div>
        </div>

        {/* NDVI distribution */}
        <div className="rounded border border-white/[0.06] bg-white/[0.03] p-3 lg:col-span-2">
          <p className="mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">Crop Health Distribution</p>
          <div className="space-y-3">
            {ndviDistribution.map((n) => (
              <div key={n.label}>
                <div className="mb-1 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] font-bold" style={{ color: n.color }}>{n.label}</span>
                    <span className="ml-2 font-mono text-[8px] text-white/30">{n.range}</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-white/60">{n.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${n.pct * 2}%`, background: n.color, opacity: 0.85 }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-white/[0.06] pt-3">
            <p className="font-mono text-[9px] text-white/40">Soil Moisture Trend (8 weeks)</p>
            <ResponsiveContainer width="100%" height={48}>
              <AreaChart data={soilData} margin={{ top: 2, right: 0, left: -40, bottom: 0 }}>
                <defs>
                  <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#4ade80" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <ReferenceLine y={45} stroke="rgba(255,255,255,0.2)" strokeDasharray="3 2" />
                <Area type="monotone" dataKey="moisture" stroke="#4ade80" strokeWidth={1.5} fill="url(#soilGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="font-mono text-[8px] text-white/25">Dashed line = optimal (45%). Current: 47%</p>
          </div>
        </div>
      </div>

      {/* NDVI plot grid */}
      <div className="rounded border border-white/[0.06] bg-white/[0.03] p-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">
            Plot-Level Health Monitor — 847,000 active plots (sample grid)
          </p>
          <div className="flex gap-3">
            {ndviDistribution.map((n) => (
              <span key={n.label} className="flex items-center gap-1 font-mono text-[8px] text-white/35">
                <span className="inline-block h-2 w-2 rounded-sm" style={{ background: n.color }} />
                {n.label}
              </span>
            ))}
          </div>
        </div>
        <div
          className="grid gap-0.5 rounded"
          style={{ gridTemplateColumns: "repeat(20, 1fr)" }}
        >
          {NDVI_GRID.map((v, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm opacity-80 transition-opacity hover:opacity-100"
              style={{ background: NDVI_COLORS[v] }}
              title={ndviDistribution[v].label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────
export default function DashboardSection() {
  const [tab, setTab] = useState<"climate" | "agri">("climate");

  return (
    <div className="mt-16 overflow-hidden rounded-xl border border-white/[0.08]" style={{ background: "#060f07" }}>
      {/* Tab bar */}
      <div className="flex items-center gap-0 border-b border-white/[0.06] bg-white/[0.02]">
        <button
          onClick={() => setTab("climate")}
          className={`flex items-center gap-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
            tab === "climate"
              ? "border-b-2 border-[#d28230] text-white"
              : "text-white/35 hover:text-white/60"
          }`}
        >
          <Thermometer size={11} />
          Climate Risk Intelligence
        </button>
        <button
          onClick={() => setTab("agri")}
          className={`flex items-center gap-2 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
            tab === "agri"
              ? "border-b-2 border-[#d28230] text-white"
              : "text-white/35 hover:text-white/60"
          }`}
        >
          <Wheat size={11} />
          Agri Data Intelligence
        </button>
        <div className="ml-auto flex items-center gap-2 px-4">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <span className="font-mono text-[8px] uppercase tracking-widest text-green-400/60">Platform Preview</span>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-4 sm:p-5">
        {tab === "climate" ? <ClimateRiskDashboard /> : <AgriDataDashboard />}
      </div>
    </div>
  );
}
