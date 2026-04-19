import { useEffect, useRef } from "react";

const DEG = Math.PI / 180;

// [lat, lon] in degrees
const ORIGINS: [number, number][] = [
  [-1.29, 36.82],   // Nairobi
  [6.37, -2.38],    // Accra
  [-26.2, 28.04],   // Johannesburg
  [9.14, 40.49],    // Addis Ababa
  [14.47, -14.45],  // Dakar
  [0.34, 32.58],    // Kampala
  [-3.38, 29.36],   // Bujumbura
  [12.36, -1.53],   // Ouagadougou
];

const DESTINATIONS: [number, number][] = [
  [51.5, -0.12],    // London
  [48.85, 2.35],    // Paris
  [40.71, -74.01],  // New York
  [52.52, 13.4],    // Berlin
  [45.42, -75.69],  // Ottawa
];

const ARCS: [[number, number], [number, number]][] = [
  [ORIGINS[0], DESTINATIONS[0]],
  [ORIGINS[1], DESTINATIONS[1]],
  [ORIGINS[2], DESTINATIONS[2]],
  [ORIGINS[3], DESTINATIONS[3]],
  [ORIGINS[4], DESTINATIONS[4]],
  [ORIGINS[5], DESTINATIONS[0]],
  [ORIGINS[6], DESTINATIONS[1]],
  [ORIGINS[7], DESTINATIONS[2]],
];

// Orthographic projection centred on (lat0, lon0) with lon offset for rotation
function project(
  lat: number, lon: number,
  lat0: number, lonOffset: number,
  R: number, cx: number, cy: number
): { x: number; y: number; visible: boolean } {
  const φ = lat * DEG;
  const λ = (lon + lonOffset) * DEG;
  const φ0 = lat0 * DEG;

  const cosC =
    Math.sin(φ0) * Math.sin(φ) +
    Math.cos(φ0) * Math.cos(φ) * Math.cos(λ);

  const x = R * Math.cos(φ) * Math.sin(λ);
  const y = R * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λ));

  return { x: cx + x, y: cy - y, visible: cosC > 0 };
}

// Interpolate points along a great circle arc
function greatCirclePoints(
  a: [number, number], b: [number, number], steps = 60
): [number, number][] {
  const [lat1, lon1] = a.map(v => v * DEG);
  const [lat2, lon2] = b.map(v => v * DEG);
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const A = Math.sin((1 - t) * Math.PI) / Math.sin(Math.PI); // dummy slerp weight
    // Linear interpolation on sphere (simplified)
    const lat = lat1 + (lat2 - lat1) * t;
    const lon = lon1 + (lon2 - lon1) * t;
    pts.push([lat / DEG, lon / DEG]);
  }
  return pts;
}

export default function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const rotRef = useRef(20); // starting lon offset (centre Africa)

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Arc animation offsets — stagger each arc's phase
    const arcPhases = ARCS.map((_, i) => (i / ARCS.length) * 2 * Math.PI);
    const arcPts = ARCS.map(([a, b]) => greatCirclePoints(a, b, 80));

    function draw(ts: number) {
      const dpr = window.devicePixelRatio || 1;
      const W = canvas!.clientWidth;
      const H = canvas!.clientHeight;
      if (canvas!.width !== W * dpr || canvas!.height !== H * dpr) {
        canvas!.width = W * dpr;
        canvas!.height = H * dpr;
        ctx!.scale(dpr, dpr);
      }

      ctx!.clearRect(0, 0, W, H);

      const R = Math.min(W, H) * 0.42;
      const cx = W / 2;
      const cy = H / 2;
      const lat0 = 10; // tilt view slightly north
      const lon0 = rotRef.current;

      // Slow rotation
      rotRef.current += 0.08;

      // ── Globe sphere ──────────────────────────────────────────
      const grad = ctx!.createRadialGradient(cx - R * 0.2, cy - R * 0.2, R * 0.05, cx, cy, R);
      grad.addColorStop(0, "#1a3d1e");
      grad.addColorStop(0.5, "#0a1a0c");
      grad.addColorStop(1, "#040d05");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = grad;
      ctx!.fill();

      // Outer glow
      const glow = ctx!.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.18);
      glow.addColorStop(0, "rgba(30,90,35,0.3)");
      glow.addColorStop(0.5, "rgba(15,50,20,0.12)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.18, 0, Math.PI * 2);
      ctx!.fillStyle = glow;
      ctx!.fill();

      // ── Lat/lon grid ─────────────────────────────────────────
      ctx!.save();
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.clip();
      ctx!.strokeStyle = "rgba(60,140,70,0.18)";
      ctx!.lineWidth = 0.5;

      // Parallels
      for (let lat = -75; lat <= 75; lat += 15) {
        const pts: { x: number; y: number; visible: boolean }[] = [];
        for (let lon = -180; lon <= 180; lon += 3) {
          pts.push(project(lat, lon, lat0, lon0, R, cx, cy));
        }
        ctx!.beginPath();
        let started = false;
        for (const p of pts) {
          if (!p.visible) { started = false; continue; }
          if (!started) { ctx!.moveTo(p.x, p.y); started = true; }
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }

      // Meridians
      for (let lon = -180; lon < 180; lon += 15) {
        const pts: { x: number; y: number; visible: boolean }[] = [];
        for (let lat = -90; lat <= 90; lat += 2) {
          pts.push(project(lat, lon, lat0, lon0, R, cx, cy));
        }
        ctx!.beginPath();
        let started = false;
        for (const p of pts) {
          if (!p.visible) { started = false; continue; }
          if (!started) { ctx!.moveTo(p.x, p.y); started = true; }
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }
      ctx!.restore();

      // ── Animated arcs ─────────────────────────────────────────
      const speed = ts * 0.0004; // 0–1 progress over time
      ARCS.forEach((_, i) => {
        const pts = arcPts[i];
        const phase = arcPhases[i];
        // head position (0–1) advances with time
        const head = ((speed + phase / (2 * Math.PI)) % 1);
        const tailLen = 0.28; // fraction of arc shown as tail

        const headIdx = Math.floor(head * (pts.length - 1));
        const tailIdx = Math.max(0, Math.floor((head - tailLen) * (pts.length - 1)));

        // Draw tail with gradient opacity
        for (let j = tailIdx; j < headIdx; j++) {
          const p1 = project(pts[j][0], pts[j][1], lat0, lon0, R, cx, cy);
          const p2 = project(pts[j + 1]?.[0] ?? pts[j][0], pts[j + 1]?.[1] ?? pts[j][1], lat0, lon0, R, cx, cy);
          if (!p1.visible || !p2.visible) continue;

          const frac = (j - tailIdx) / (headIdx - tailIdx);
          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.strokeStyle = `rgba(200,125,48,${frac * 0.85})`;
          ctx!.lineWidth = 1.5;
          ctx!.stroke();
        }

        // Head glow dot
        if (headIdx < pts.length) {
          const hp = project(pts[headIdx][0], pts[headIdx][1], lat0, lon0, R, cx, cy);
          if (hp.visible) {
            const hg = ctx!.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 5);
            hg.addColorStop(0, "rgba(200,125,48,0.95)");
            hg.addColorStop(1, "rgba(200,125,48,0)");
            ctx!.beginPath();
            ctx!.arc(hp.x, hp.y, 5, 0, Math.PI * 2);
            ctx!.fillStyle = hg;
            ctx!.fill();
          }
        }
      });

      // ── Origin pulsing dots ───────────────────────────────────
      ORIGINS.forEach(([lat, lon]) => {
        const p = project(lat, lon, lat0, lon0, R, cx, cy);
        if (!p.visible) return;
        const pulse = 0.5 + 0.5 * Math.sin(ts * 0.003 + lat);
        // Outer ring
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3 + pulse * 3, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(74,222,128,${0.4 * pulse})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
        // Core dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(74,222,128,0.9)";
        ctx!.fill();
      });

      // ── Globe edge ────────────────────────────────────────────
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(50,110,55,0.35)";
      ctx!.lineWidth = 1;
      ctx!.stroke();

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <section
      id="data-flow"
      className="section-padding overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 25% 60%, #0d2010 0%, #051008 40%, #000000 75%)",
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Text */}
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              The Data Problem
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Data flows out.{" "}
              <span className="text-white/55">Intelligence doesn't flow back.</span>
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-white/60">
              Agricultural and climate data from the Global South flows to servers
              in the Global North — processed, packaged, and sold back at prices
              the originating nations cannot afford or govern.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-white/45">
              Aixatech closes the loop. We keep data sovereign, process it within
              national borders, and return decision-ready intelligence to the
              governments, insurers, and institutions that need it most.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              {[
                "Data processed within national borders",
                "No foreign cloud dependency",
                "Intelligence owned by the originating nation",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div
                    className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: "hsl(33,65%,50%)" }}
                  />
                  <span className="font-body text-sm text-white/60">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Globe canvas */}
          <div className="flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ maxWidth: 520, aspectRatio: "1 / 1" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
