import type { MouseEvent as ReactMouseEvent } from "react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

function HeroMockup() {
  return (
    <div className="relative mt-16 mx-auto max-w-4xl">
      {/* Glow behind mockup */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mx-auto"
        style={{
          width: "70%",
          left: "15%",
          top: "10%",
          height: "80%",
          background: "radial-gradient(ellipse at 50% 40%, rgba(74,222,128,0.20) 0%, rgba(74,222,128,0.06) 50%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      {/* Browser chrome frame */}
      <div
        className="overflow-hidden rounded-2xl border"
        style={{
          background: "rgba(6,10,7,0.97)",
          borderColor: "rgba(74,222,128,0.15)",
          boxShadow: "0 32px 80px -16px rgba(0,0,0,0.8), 0 0 0 1px rgba(74,222,128,0.08)",
        }}
      >
        {/* Browser top bar */}
        <div
          className="flex items-center gap-2 border-b px-4 py-3"
          style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(74,222,128,0.08)" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,100,100,0.5)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,200,60,0.4)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(74,222,128,0.4)" }} />
          <div
            className="ml-4 flex-1 rounded-md px-3 py-1 text-[10px]"
            style={{ background: "rgba(255,255,255,0.04)", color: "rgba(74,222,128,0.4)", maxWidth: 220 }}
          >
            app.aixatech.io/dashboard
          </div>
          <div className="ml-auto flex items-center gap-1">
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px]"
              style={{ background: "rgba(74,222,128,0.12)", color: "#4ade80" }}
            >
              ● LIVE
            </span>
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex" style={{ minHeight: 240 }}>
          {/* Sidebar */}
          <div
            className="flex w-44 flex-shrink-0 flex-col gap-0.5 border-r p-3"
            style={{ background: "rgba(255,255,255,0.015)", borderColor: "rgba(74,222,128,0.06)" }}
          >
            <div className="mb-3 px-2 pt-1 font-mono text-[9px] font-bold uppercase tracking-widest" style={{ color: "rgba(74,222,128,0.5)" }}>
              Aixatech
            </div>
            {[
              { label: "Dashboard", active: true },
              { label: "Climate Risk", active: false },
              { label: "Agri Data", active: false },
              { label: "Sovereign AI", active: false },
              { label: "Reports", active: false },
            ].map(({ label, active }) => (
              <div
                key={label}
                className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium"
                style={{
                  background: active ? "rgba(74,222,128,0.12)" : "transparent",
                  color: active ? "#4ade80" : "rgba(255,255,255,0.3)",
                  borderLeft: active ? "2px solid rgba(74,222,128,0.5)" : "2px solid transparent",
                }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
                Overview
              </div>
              <span className="rounded-full px-2 py-0.5 font-mono text-[9px]"
                style={{ background: "rgba(74,222,128,0.08)", color: "rgba(74,222,128,0.6)", border: "1px solid rgba(74,222,128,0.15)" }}>
                East Africa Region
              </span>
            </div>

            {/* KPI tiles */}
            <div className="mb-4 grid grid-cols-3 gap-2.5">
              {[
                { label: "Risk Score", value: "74.2", unit: "/100", delta: "+2.1", up: true },
                { label: "Yield Forecast", value: "3.8T", unit: "/ha", delta: "+0.4T", up: true },
                { label: "Active Alerts", value: "12", unit: "", delta: "-3", up: false },
              ].map(({ label, value, unit, delta, up }) => (
                <div
                  key={label}
                  className="rounded-xl border p-3"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</div>
                  <div className="mt-1 font-mono text-lg font-bold leading-none text-white">
                    {value}
                    <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>{unit}</span>
                  </div>
                  <div className="mt-1 font-mono text-[9px]" style={{ color: up ? "#4ade80" : "rgba(255,255,255,0.35)" }}>
                    {delta} vs last mo.
                  </div>
                </div>
              ))}
            </div>

            {/* Mini bar chart */}
            <div
              className="rounded-xl border p-3"
              style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.07)" }}
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="text-[9px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Climate Risk Index — 6 months
                </div>
                <div className="font-mono text-[9px]" style={{ color: "#4ade80" }}>▲ 2.1%</div>
              </div>
              <div className="flex items-end gap-1.5" style={{ height: 44 }}>
                {[55, 68, 72, 61, 74, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm transition-all"
                    style={{
                      height: `${(h / 100) * 100}%`,
                      background: i === 4
                        ? "rgba(74,222,128,0.85)"
                        : i === 5
                        ? "rgba(74,222,128,0.45)"
                        : "rgba(255,255,255,0.10)",
                    }}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between">
                {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => (
                  <span key={m} className="text-[8px]" style={{ color: "rgba(255,255,255,0.2)" }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const goToSolutions = (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.hash !== "#solutions")
      window.history.pushState(null, "", "#solutions");
    const el = document.getElementById("solutions");
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.pageYOffset - 90,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden text-white flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 50% -5%, rgba(74,222,128,0.55) 0%, rgba(74,222,128,0.18) 30%, #030303 60%)"
      }}
    >

      {/* Centred content */}
      <div className="relative z-10 container mx-auto px-6 py-28 text-center">

        {/* Label pill */}
        <div className="mb-8 flex justify-center">
          <span
            className="rounded-full px-4 py-1.5 text-xs tracking-widest uppercase font-mono"
            style={{
              background: "rgba(74,222,128,0.08)",
              border: "1px solid rgba(74,222,128,0.25)",
              color: "#4ade80",
            }}
          >
            Intelligence Infrastructure
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-5xl text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
          Real-time Climate and Agriculture{" "}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>Risk Intelligence.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
          We turn raw data into the risk scores, trigger indices, and yield forecasts that enterprises, insurers, and governments need to deploy capital with confidence.
        </p>

        {/* Module tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Agri Data", "Climate Risk Intelligence", "Sovereign AI"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs tracking-widest uppercase font-mono"
              style={{
                border: "1px solid rgba(74,222,128,0.25)",
                color: "rgba(74,222,128,0.7)",
                background: "rgba(74,222,128,0.05)",
                borderRadius: 4,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-lg tracking-wide"
          >
            Book a Discovery Call →
          </a>
          <a
            href="#solutions"
            onClick={goToSolutions}
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold rounded-lg transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            Our Platform
          </a>
        </div>

        {/* Trust line */}
        <div className="mt-14 text-xs tracking-wide uppercase font-mono" style={{ color: "rgba(255,255,255,0.25)" }}>
          Built for governments, insurers, and development institutions across the Global South.
        </div>

        {/* Product dashboard mockup */}
        <HeroMockup />
      </div>
    </section>
  );
}
