import type { MouseEvent as ReactMouseEvent } from "react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

function HeroMockup() {
  return (
    <div className="relative mt-16 mx-auto max-w-4xl">
      {/* Amber/green glow bloom behind the mockup */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 mx-auto rounded-full"
        style={{
          width: "60%",
          left: "20%",
          top: "20%",
          height: "60%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(180,100,20,0.18) 0%, rgba(20,83,45,0.14) 50%, transparent 80%)",
          filter: "blur(40px)",
        }}
      />

      {/* Browser chrome frame */}
      <div
        className="overflow-hidden rounded-lg border border-white/[0.12]"
        style={{ background: "rgba(8,10,9,0.95)", boxShadow: "0 24px 80px -16px rgba(0,0,0,0.7)" }}
      >
        {/* Browser top bar */}
        <div
          className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
          <div
            className="ml-4 flex-1 rounded px-3 py-1 text-[10px] text-white/25"
            style={{ background: "rgba(255,255,255,0.04)", maxWidth: 220 }}
          >
            app.aixatech.io/dashboard
          </div>
        </div>

        {/* Dashboard body */}
        <div className="flex" style={{ minHeight: 220 }}>
          {/* Sidebar */}
          <div
            className="flex w-40 flex-shrink-0 flex-col gap-1 border-r border-white/[0.08] p-3"
            style={{ background: "rgba(255,255,255,0.015)" }}
          >
            <div className="mb-2 px-2 pt-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white/30">
              Aixatech
            </div>
            {["Dashboard", "Climate Risk", "Agri Data", "Sovereign AI", "Reports"].map((item, i) => (
              <div
                key={item}
                className="rounded px-2 py-1.5 text-[10px] font-medium"
                style={{
                  background: i === 0 ? "rgba(180,100,20,0.18)" : "transparent",
                  color: i === 0 ? "hsl(33,65%,60%)" : "rgba(255,255,255,0.35)",
                }}
              >
                {item}
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 p-5">
            <div className="mb-4 text-[11px] font-semibold text-white/50 uppercase tracking-widest">
              Overview
            </div>

            {/* KPI tiles */}
            <div className="mb-5 grid grid-cols-3 gap-3">
              {[
                { label: "Risk Score", value: "74.2", unit: "/100", delta: "+2.1" },
                { label: "Yield Forecast", value: "3.8T", unit: "/ha", delta: "+0.4T" },
                { label: "Active Alerts", value: "12", unit: "", delta: "-3" },
              ].map(({ label, value, unit, delta }) => (
                <div
                  key={label}
                  className="rounded border border-white/[0.08] p-3 transition-colors hover:border-white/20"
                  style={{ background: "rgba(255,255,255,0.04)" }}
                >
                  <div className="text-[9px] uppercase tracking-widest text-white/35">{label}</div>
                  <div className="mt-1 font-mono text-lg font-bold text-white leading-none">
                    {value}
                    <span className="text-xs font-normal text-white/40">{unit}</span>
                  </div>
                  <div
                    className="mt-1 text-[9px] font-mono"
                    style={{ color: delta.startsWith("+") ? "hsl(33,65%,55%)" : "rgba(255,255,255,0.4)" }}
                  >
                    {delta} vs last mo.
                  </div>
                </div>
              ))}
            </div>

            {/* Mini bar chart */}
            <div
              className="rounded border border-white/[0.08] p-3"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="mb-3 text-[9px] uppercase tracking-widest text-white/35">
                Climate Risk Index — 6 months
              </div>
              <div className="flex items-end gap-1.5" style={{ height: 48 }}>
                {[55, 68, 72, 61, 74, 70].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{
                    height: `${(h / 100) * 100}%`,
                    background: i === 4
                      ? "hsl(33,65%,50%)"
                      : "rgba(255,255,255,0.12)",
                  }} />
                ))}
              </div>
              <div className="mt-2 flex justify-between">
                {["Nov", "Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => (
                  <span key={m} className="text-[8px] text-white/25">{m}</span>
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
      style={{ background: "radial-gradient(ellipse at 50% 25%, rgba(22,163,74,0.55) 0%, rgba(16,120,50,0.30) 35%, #050d06 65%, #000000 100%)" }}
    >

      {/* Centred content */}
      <div className="relative z-10 container mx-auto px-6 py-28 text-center">

        {/* Label — pill style */}
        <div className="mb-8 flex justify-center">
          <span className="rounded-full border border-white/20 px-4 py-1.5 text-xs tracking-widest uppercase text-white/70">
            Intelligence Infrastructure
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-5xl text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          Real-time Climate and Agriculture{" "}
          <span className="text-white/55">Risk Intelligence.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 mx-auto max-w-2xl text-lg text-white/65 leading-relaxed">
          We turn raw data into the risk scores, trigger indices, and yield forecasts that enterprises, insurers, and governments need to deploy capital with confidence.
        </p>

        {/* Module tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {["Agri Data", "Climate Risk Intelligence", "Sovereign AI"].map((tag) => (
            <span
              key={tag}
              className="border border-[hsl(33_65%_50%/0.4)] text-[hsl(33,65%,65%)] px-3 py-1 text-xs tracking-widest uppercase font-mono"
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
            className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: "hsl(33,65%,50%)" }}
          >
            Book a Discovery Call →
          </a>
          <a
            href="#solutions"
            onClick={goToSolutions}
            className="inline-flex items-center justify-center px-8 py-3.5 font-display text-sm font-semibold text-white/70 border border-white/20 transition-colors hover:bg-white/10 hover:text-white"
          >
            Our Platform
          </a>
        </div>

        {/* Trust line */}
        <div className="mt-16 text-xs tracking-wide text-white/35 uppercase">
          Built for governments, insurers, and development institutions across the Global South.
        </div>

        {/* Product dashboard mockup */}
        <HeroMockup />

      </div>
    </section>
  );
}
