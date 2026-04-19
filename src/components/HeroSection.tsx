import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

// ── Seeded PRNG so stars are always in the same positions ─────
function lcg(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}
const rng = lcg(0x5a3f9c2e);
const STARS = Array.from({ length: 300 }, () => ({
  x:      rng(),
  y:      rng(),
  r:      rng() * 1.4 + 0.2,
  phase:  rng() * Math.PI * 2,
  speed:  rng() * 1.8 + 0.3,
  bright: rng() > 0.88,
  green:  rng() > 0.78,
}));

// Static nebula blob definitions (x/y/r are 0–1 of canvas size)
const NEBULAS = [
  { x: 0.30, y: 0.45, r: 0.80, a: 0.20, g: [0,  90, 35] },
  { x: 0.65, y: 0.75, r: 0.50, a: 0.15, g: [0, 115, 48] },
  { x: 0.08, y: 0.65, r: 0.42, a: 0.11, g: [0,  70, 28] },
  { x: 0.85, y: 0.20, r: 0.38, a: 0.09, g: [0,  85, 32] },
  { x: 0.50, y: 0.85, r: 0.35, a: 0.08, g: [0,  60, 22] },
];

// ── Satellite SVG ─────────────────────────────────────────────
function Satellite() {
  return (
    <svg
      viewBox="0 0 380 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <defs>
        <filter id="bodyGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="panelGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="signalGlow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7a9aae" />
          <stop offset="100%" stopColor="#3a5a6e" />
        </linearGradient>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0e2236" />
          <stop offset="100%" stopColor="#071422" />
        </linearGradient>
      </defs>

      {/* ── Left solar panel ── */}
      <g filter="url(#panelGlow)">
        <rect x="8" y="88" width="108" height="52" rx="3" fill="url(#panelGrad)" stroke="#2a4a70" strokeWidth="1.5" />
        {/* Cell columns */}
        {[0,1,2,3].map((c) => (
          <rect key={c} x={12 + c * 26} y="92" width="22" height="44" rx="1"
            fill="#091d35" stroke="#183555" strokeWidth="0.5" />
        ))}
        {/* Horizontal cell dividers */}
        {[104, 116].map((y) => (
          <line key={y} x1="10" y1={y} x2="114" y2={y} stroke="#183555" strokeWidth="0.5" />
        ))}
        {/* Reflective highlights on a few cells */}
        <rect x="12" y="92" width="22" height="10" rx="1" fill="rgba(120,200,255,0.09)" />
        <rect x="64" y="104" width="22" height="12" rx="1" fill="rgba(120,200,255,0.07)" />
        {/* Top edge sheen */}
        <rect x="8" y="88" width="108" height="2.5" rx="1" fill="rgba(255,255,255,0.18)" />
        {/* Blue cell glow overlay */}
        <rect x="8" y="88" width="108" height="52" rx="3"
          fill="none" stroke="rgba(80,160,255,0.25)" strokeWidth="0.6" />
      </g>

      {/* Left arm */}
      <rect x="116" y="107" width="34" height="14" rx="2.5" fill="#8a9faf" stroke="#aabece" strokeWidth="0.8" />
      <line x1="133" y1="107" x2="133" y2="121" stroke="#9ab0c0" strokeWidth="0.6" />

      {/* ── Main body ── */}
      <g filter="url(#bodyGlow)">
        {/* Shadow */}
        <rect x="150" y="57" width="88" height="118" rx="5" fill="rgba(0,0,0,0.4)" transform="translate(3,3)" />
        {/* Body */}
        <rect x="150" y="57" width="88" height="118" rx="5" fill="url(#bodyGrad)" stroke="#8ab0c8" strokeWidth="1.2" />
        {/* Top instrument panel */}
        <rect x="155" y="62" width="78" height="34" rx="3" fill="#122a3e" stroke="#1e4460" strokeWidth="0.8" />
        {/* Earth-obs sensor window */}
        <rect x="160" y="67" width="32" height="20" rx="2" fill="#061420" stroke="#1a4060" strokeWidth="0.6" />
        <rect x="161" y="68" width="30" height="18" rx="1.5" fill="#030c18" />
        {/* Lens */}
        <circle cx="176" cy="77" r="6" fill="#060f1e" stroke="#1e5078" strokeWidth="0.8" />
        <circle cx="176" cy="77" r="3.5" fill="#030c18" />
        <circle cx="176" cy="77" r="1.5" fill="#00ff88" opacity="0.55" />
        <circle cx="176" cy="77" r="7" fill="rgba(0,255,136,0.05)" />
        {/* Status LEDs */}
        <circle cx="202" cy="70" r="2" fill="#00ff88" opacity="0.8" />
        <circle cx="210" cy="70" r="2" fill="#ffaa00" opacity="0.6" />
        <circle cx="218" cy="70" r="2" fill="#00aaff" opacity="0.5" />
        {/* Label strip */}
        <rect x="155" y="99" width="78" height="8" rx="1" fill="#0e2030" />
        <rect x="157" y="101" width="40" height="4" rx="1" fill="rgba(0,200,100,0.2)" />
        {/* Mid panel */}
        <rect x="155" y="110" width="78" height="36" rx="3" fill="#1a3246" />
        {/* Mid panel details */}
        <rect x="159" y="114" width="34" height="6" rx="1" fill="#0e2030" />
        <rect x="197" y="114" width="32" height="6" rx="1" fill="#0e2030" />
        <rect x="159" y="124" width="70" height="4" rx="1" fill="#0e2030" />
        <rect x="159" y="132" width="50" height="4" rx="1" fill="#0e2030" />
        {/* Stripe */}
        <rect x="150" y="148" width="88" height="5" fill="#6a8ea4" />
        {/* Lower thruster panel */}
        <rect x="155" y="155" width="78" height="14" rx="2" fill="#0e2030" stroke="#1e3a52" strokeWidth="0.6" />
        {/* Thruster nozzles */}
        {[162, 176, 190, 204, 218].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="162" r="4" fill="#0a1828" stroke="#3a6080" strokeWidth="0.7" />
            <circle cx={cx} cy="162" r="2" fill="#071020" />
          </g>
        ))}
        {/* Body top sheen */}
        <rect x="150" y="57" width="88" height="3" rx="2" fill="rgba(255,255,255,0.3)" />
        {/* Body side highlight */}
        <rect x="150" y="57" width="3" height="118" rx="1.5" fill="rgba(255,255,255,0.12)" />
      </g>

      {/* Right arm */}
      <rect x="238" y="107" width="34" height="14" rx="2.5" fill="#8a9faf" stroke="#aabece" strokeWidth="0.8" />
      <line x1="255" y1="107" x2="255" y2="121" stroke="#9ab0c0" strokeWidth="0.6" />

      {/* ── Right solar panel ── */}
      <g filter="url(#panelGlow)">
        <rect x="272" y="88" width="108" height="52" rx="3" fill="url(#panelGrad)" stroke="#2a4a70" strokeWidth="1.5" />
        {[0,1,2,3].map((c) => (
          <rect key={c} x={276 + c * 26} y="92" width="22" height="44" rx="1"
            fill="#091d35" stroke="#183555" strokeWidth="0.5" />
        ))}
        {[104, 116].map((y) => (
          <line key={y} x1="274" y1={y} x2="378" y2={y} stroke="#183555" strokeWidth="0.5" />
        ))}
        <rect x="276" y="92" width="22" height="10" rx="1" fill="rgba(120,200,255,0.09)" />
        <rect x="328" y="104" width="22" height="12" rx="1" fill="rgba(120,200,255,0.07)" />
        <rect x="272" y="88" width="108" height="2.5" rx="1" fill="rgba(255,255,255,0.18)" />
        <rect x="272" y="88" width="108" height="52" rx="3"
          fill="none" stroke="rgba(80,160,255,0.25)" strokeWidth="0.6" />
      </g>

      {/* ── Antenna dish ── */}
      <g>
        {/* Mast */}
        <line x1="216" y1="57" x2="232" y2="28" stroke="#8a9faf" strokeWidth="1.8" strokeLinecap="round" />
        {/* Dish */}
        <ellipse cx="237" cy="22" rx="20" ry="11"
          fill="rgba(160,190,220,0.07)" stroke="#aabece" strokeWidth="1.5" />
        {/* Dish support lines */}
        <line x1="217" y1="22" x2="237" y2="22" stroke="#7a9ab0" strokeWidth="0.6" />
        <line x1="237" y1="11" x2="237" y2="33" stroke="#7a9ab0" strokeWidth="0.6" />
        {/* Feed horn */}
        <line x1="232" y1="28" x2="237" y2="22" stroke="#8a9faf" strokeWidth="1.2" />
        <circle cx="237" cy="22" r="2.5" fill="#5a8aaa" />
        {/* Signal arcs */}
        <path d="M 252 14 Q 266 22 252 30" stroke="rgba(74,222,128,0.45)" strokeWidth="1.2" fill="none" strokeDasharray="3 2" />
        <path d="M 258 9 Q 276 22 258 35"  stroke="rgba(74,222,128,0.22)" strokeWidth="1"   fill="none" strokeDasharray="3 3" />
        <path d="M 264 4 Q 286 22 264 40"  stroke="rgba(74,222,128,0.10)" strokeWidth="0.8" fill="none" strokeDasharray="2 4" />
      </g>

      {/* ── Bottom sensor pod ── */}
      <g>
        <rect x="170" y="175" width="24" height="20" rx="3" fill="#0e1e2e" stroke="#2a5070" strokeWidth="0.8" />
        <circle cx="182" cy="187" r="6" fill="#071020" stroke="#1e4a6a" strokeWidth="0.8" />
        <circle cx="182" cy="187" r="3.5" fill="#040c18" />
        <circle cx="182" cy="187" r="1.5" fill="#00ff88" opacity="0.7" />
        <circle cx="182" cy="187" r="8" fill="rgba(0,255,136,0.06)" />
        {/* Data beam — dashed line downward */}
        <line x1="182" y1="195" x2="182" y2="230"
          stroke="rgba(0,255,136,0.25)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="182" cy="230" r="2" fill="rgba(0,255,136,0.2)" />
      </g>

      {/* ── Overall satellite green-tint atmosphere ── */}
      <ellipse cx="194" cy="114" rx="140" ry="80"
        fill="none" stroke="rgba(0,255,136,0.04)" strokeWidth="30" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);

  const goToSolutions = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.hash !== "#solutions") {
      window.history.pushState(null, "", "#solutions");
    }
    const el = document.getElementById("solutions");
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw(ts: number) {
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas!.clientWidth;
      const H   = canvas!.clientHeight;
      if (canvas!.width  !== Math.round(W * dpr) ||
          canvas!.height !== Math.round(H * dpr)) {
        canvas!.width  = Math.round(W * dpr);
        canvas!.height = Math.round(H * dpr);
      }
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Black base
      ctx!.fillStyle = "#000000";
      ctx!.fillRect(0, 0, W, H);

      // Nebula blobs
      NEBULAS.forEach(({ x, y, r, a, g }) => {
        const gx = x * W, gy = y * H, gr = r * Math.max(W, H);
        const grad = ctx!.createRadialGradient(gx, gy, 0, gx, gy, gr);
        grad.addColorStop(0,   `rgba(${g[0]},${g[1]},${g[2]},${a})`);
        grad.addColorStop(0.45,`rgba(${g[0]},${Math.round(g[1]*0.55)},${Math.round(g[2]*0.55)},${a * 0.28})`);
        grad.addColorStop(1,   "rgba(0,0,0,0)");
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, W, H);
      });

      // Stars
      STARS.forEach(({ x, y, r, phase, speed, bright, green }) => {
        const sx = x * W, sy = y * H;
        const t  = 0.4 + 0.6 * Math.sin(ts * 0.001 * speed + phase);
        const col = green
          ? `rgba(100,255,160,${0.75 * t})`
          : `rgba(255,255,255,${0.85 * t})`;

        if (bright) {
          // 4-pointed cross highlight
          const arm = r * 5 * t;
          ctx!.strokeStyle = green
            ? `rgba(100,255,160,${0.5 * t})`
            : `rgba(255,255,255,${0.4 * t})`;
          ctx!.lineWidth = 0.5;
          ctx!.beginPath();
          ctx!.moveTo(sx - arm, sy); ctx!.lineTo(sx + arm, sy);
          ctx!.moveTo(sx, sy - arm); ctx!.lineTo(sx, sy + arm);
          ctx!.stroke();
        }

        ctx!.beginPath();
        ctx!.arc(sx, sy, r * (bright ? t * 1.1 : t), 0, Math.PI * 2);
        ctx!.fillStyle = col;
        ctx!.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden text-white" style={{ background: "#000" }}>
      {/* Animated starfield / nebula canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      />

      {/* Content layer */}
      <div className="relative z-10 container mx-auto flex min-h-screen items-center px-6 py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">

          {/* ── Left: text ── */}
          <div>
            {/* Label */}
            <div className="mb-6">
              <span className="border border-white/20 px-4 py-2 text-xs tracking-widest uppercase text-white/70">
                Intelligence Infrastructure
              </span>
            </div>

            {/* Headline */}
            <h1 className="max-w-xl text-5xl md:text-6xl font-semibold leading-tight">
              Real-time Climate and Agriculture{" "}
              <span className="text-white/55">Risk Intelligence.</span>
            </h1>

            {/* Subtext */}
            <p className="mt-6 max-w-lg text-lg text-white/65 leading-relaxed">
              We turn raw data into the risk scores, trigger indices, and yield
              forecasts that enterprises, insurers, and governments need to deploy
              capital with confidence.
            </p>

            {/* Module tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              {["Agri Data", "Climate Risk Intelligence", "Sovereign AI"].map((tag) => (
                <span
                  key={tag}
                  className="border border-[hsl(33_65%_50%/0.4)] text-[hsl(33,65%,65%)] px-3 py-1 text-xs tracking-widest uppercase font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-7 py-3.5 font-display text-sm font-semibold text-white transition-opacity hover:opacity-85"
                style={{ background: "hsl(33,65%,50%)" }}
              >
                Book a Discovery Call →
              </a>
              <a
                href="#solutions"
                onClick={goToSolutions}
                className="inline-flex items-center px-7 py-3.5 font-display text-sm font-semibold text-white/70 border border-white/20 transition-colors hover:bg-white/10 hover:text-white"
              >
                Our Platform
              </a>
            </div>

            {/* Trust line */}
            <div className="mt-14 text-xs tracking-wide text-white/35 uppercase">
              Built for governments, insurers, and development institutions across the Global South.
            </div>
          </div>

          {/* ── Right: satellite ── */}
          <div className="hidden lg:flex items-center justify-center">
            <div
              className="w-full"
              style={{
                maxWidth: 500,
                animation: "satelliteFloat 7s ease-in-out infinite",
                filter: "drop-shadow(0 0 24px rgba(0,200,80,0.18)) drop-shadow(0 0 8px rgba(0,200,80,0.10))",
              }}
            >
              <Satellite />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
