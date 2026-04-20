import { useEffect, useRef } from "react";

const DEG = Math.PI / 180;

function project(
  lat: number, lon: number,
  vcLat: number, vcLon: number,
  R: number, cx: number, cy: number
) {
  const φ  = lat * DEG;
  const λd = (lon - vcLon) * DEG;
  const φ0 = vcLat * DEG;
  const cosC = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λd);
  return {
    x: cx + R * Math.cos(φ) * Math.sin(λd),
    y: cy - R * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λd)),
    visible: cosC > 0.05,
    cosC,
  };
}

function arcPoints(a: [number, number], b: [number, number], steps = 80): [number, number][] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t] as [number, number];
  });
}

const CITIES: { ll: [number, number]; label: string; dy?: number }[] = [
  { ll: [ 37.8, -122.4], label: "San Francisco" },
  { ll: [ 19.4,  -99.1], label: "Mexico"        },
  { ll: [-15.8,  -47.9], label: "Brazil"         },
  { ll: [ 14.5,  -14.5], label: "Senegal"        },
  { ll: [ 51.5,   -0.1], label: "London",  dy: -10 },
  { ll: [-26.2,   28.0], label: "South Africa"   },
  { ll: [ -1.3,   36.8], label: "Kenya"          },
  { ll: [ 25.2,   55.3], label: "Dubai",   dy:  -9 },
  { ll: [ 20.6,   78.9], label: "India"          },
  { ll: [  1.4,  103.8], label: "Singapore"      },
  { ll: [ 35.7,  139.7], label: "Tokyo"          },
  { ll: [-33.9,  151.2], label: "Sydney",  dy:   9 },
  { ll: [ 21.3, -157.8], label: "Hawaii"         },
  { ll: [  4.7,  -74.1], label: "Colombia"       },
  { ll: [-34.6,  -58.4], label: "Argentina"      },
];

const ARC_PAIRS: [number, number][] = [
  [ 0,  4],
  [ 1,  0],
  [13,  1],
  [13,  2],
  [14,  2],
  [14,  4],
  [ 2,  3],
  [ 3,  4],
  [ 2,  4],
  [ 5,  7],
  [ 6,  7],
  [ 6,  4],
  [ 5,  4],
  [ 7,  8],
  [ 7,  4],
  [ 8,  9],
  [ 8,  4],
  [ 9, 10],
  [10, 11],
  [11,  9],
  [12,  0],
];

const ARCS = ARC_PAIRS.map(([i, j], idx) => ({
  from: CITIES[i].ll,
  to:   CITIES[j].ll,
  pts:  arcPoints(CITIES[i].ll, CITIES[j].ll, 80),
  phase: idx / ARC_PAIRS.length,
}));

const BG_LABELS: { ll: [number, number]; label: string }[] = [
  { ll: [  0.0,  20.0], label: "AFRICA"       },
  { ll: [ 48.0,  10.0], label: "EUROPE"        },
  { ll: [ 35.0,  90.0], label: "ASIA"          },
  { ll: [-28.0, 135.0], label: "AUSTRALIA"     },
  { ll: [  0.0,  70.0], label: "INDIAN OCEAN"  },
  { ll: [ 15.0, -90.0], label: "AMERICAS"      },
  { ll: [  5.0, 170.0], label: "PACIFIC"       },
];

export default function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function draw(ts: number) {
      const dpr = window.devicePixelRatio || 1;
      const W   = canvas!.clientWidth;
      const H   = canvas!.clientHeight;
      if (canvas!.width !== Math.round(W * dpr) || canvas!.height !== Math.round(H * dpr)) {
        canvas!.width  = Math.round(W * dpr);
        canvas!.height = Math.round(H * dpr);
      }
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, W, H);

      const R  = Math.min(W, H) * 0.43;
      const cx = W / 2;
      const cy = H / 2;

      const vcLon = 25 - (ts / 70000) * 360;
      const vcLat = 15;

      // Sphere
      const grad = ctx!.createRadialGradient(cx - R * 0.25, cy - R * 0.2, R * 0.05, cx, cy, R);
      grad.addColorStop(0,   "#0d2b12");
      grad.addColorStop(0.5, "#061508");
      grad.addColorStop(1,   "#020904");
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = grad; ctx!.fill();

      // Atmosphere
      const atm = ctx!.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.22);
      atm.addColorStop(0,   "rgba(74,222,128,0.20)");
      atm.addColorStop(0.5, "rgba(74,222,128,0.06)");
      atm.addColorStop(1,   "rgba(0,0,0,0)");
      ctx!.beginPath(); ctx!.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx!.fillStyle = atm; ctx!.fill();

      // Grid
      ctx!.save();
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2); ctx!.clip();
      ctx!.strokeStyle = "rgba(74,222,128,0.10)"; ctx!.lineWidth = 0.5;
      for (let lat = -75; lat <= 75; lat += 15) {
        ctx!.beginPath(); let s = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon, vcLat, vcLon, R, cx, cy);
          if (!p.visible) { s = false; continue; }
          if (!s) { ctx!.moveTo(p.x, p.y); s = true; } else ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }
      for (let lon = -180; lon < 180; lon += 15) {
        ctx!.beginPath(); let s = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = project(lat, lon, vcLat, vcLon, R, cx, cy);
          if (!p.visible) { s = false; continue; }
          if (!s) { ctx!.moveTo(p.x, p.y); s = true; } else ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }
      ctx!.restore();

      // Background region labels
      ctx!.textAlign = "center"; ctx!.textBaseline = "middle";
      BG_LABELS.forEach(({ ll, label }) => {
        const p = project(ll[0], ll[1], vcLat, vcLon, R, cx, cy);
        if (!p.visible) return;
        ctx!.font = `500 9px 'Space Grotesk', sans-serif`;
        ctx!.fillStyle = "rgba(255,255,255,0.10)";
        ctx!.fillText(label, p.x, p.y);
      });

      // Animated arcs
      const speed = ts * 0.00030;
      ARCS.forEach(({ pts, phase }) => {
        const head    = (speed + phase) % 1;
        const tailLen = 0.28;
        const headIdx = Math.floor(head * (pts.length - 1));
        const tailIdx = Math.max(0, Math.floor((head - tailLen) * (pts.length - 1)));

        for (let j = tailIdx; j < headIdx; j++) {
          const p1 = project(pts[j][0],   pts[j][1],   vcLat, vcLon, R, cx, cy);
          const p2 = project(pts[j+1]?.[0] ?? pts[j][0], pts[j+1]?.[1] ?? pts[j][1], vcLat, vcLon, R, cx, cy);
          if (!p1.visible || !p2.visible) continue;
          const frac = (j - tailIdx) / Math.max(1, headIdx - tailIdx);
          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y); ctx!.lineTo(p2.x, p2.y);
          ctx!.strokeStyle = `rgba(210,130,48,${frac * 0.9})`;
          ctx!.lineWidth = 1.8;
          ctx!.stroke();
        }
        if (headIdx < pts.length) {
          const hp = project(pts[headIdx][0], pts[headIdx][1], vcLat, vcLon, R, cx, cy);
          if (hp.visible) {
            const hg = ctx!.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 5);
            hg.addColorStop(0, "rgba(210,130,48,1)");
            hg.addColorStop(1, "rgba(210,130,48,0)");
            ctx!.beginPath(); ctx!.arc(hp.x, hp.y, 5, 0, Math.PI * 2);
            ctx!.fillStyle = hg; ctx!.fill();
          }
        }
      });

      // City dots + labels
      CITIES.forEach(({ ll, label, dy = 0 }) => {
        const p = project(ll[0], ll[1], vcLat, vcLon, R, cx, cy);
        if (!p.visible) return;

        const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0025 + ll[0]);

        // Pulse ring
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 3.5 + pulse * 4, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(74,222,128,${0.35 * pulse})`;
        ctx!.lineWidth = 1; ctx!.stroke();

        // Core dot
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = "#4ade80"; ctx!.fill();

        const labelAlpha = Math.min(1, Math.max(0, (p.cosC - 0.15) / 0.13));
        if (labelAlpha > 0) {
          const onLeft = p.x < cx;
          ctx!.globalAlpha  = labelAlpha;
          ctx!.font         = `600 11px 'Space Grotesk', sans-serif`;
          ctx!.fillStyle    = "rgba(74,222,128,0.90)";
          ctx!.textAlign    = onLeft ? "right" : "left";
          ctx!.textBaseline = "middle";
          ctx!.fillText(label, p.x + (onLeft ? -8 : 8), p.y + dy);
          ctx!.globalAlpha  = 1;
        }
      });

      // Globe rim
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(74,222,128,0.18)"; ctx!.lineWidth = 1; ctx!.stroke();

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <section
      id="data-flow"
      className="section-padding relative overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 75% 50%, rgba(74,222,128,0.48) 0%, rgba(74,222,128,0.14) 35%, #030303 65%)"
      }}
    >

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Text */}
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#4ade80" }}>
              Data Flow
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Raw Data To{" "}
              <span style={{ color: "rgba(255,255,255,0.40)" }}>Decision-Ready Intelligence</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>
              The intelligence infrastructure that digitises, unifies, and activates
              agricultural and climate data at the source — so you can make decisions
              in real time.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {[
                "Fragmented data unified into a single intelligence layer",
                "Processed within national borders, owned by the originating nation",
                "Decision-ready outputs built for the institutions that need them most",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div
                    className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                    style={{ background: "#4ade80" }}
                  />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.50)" }}>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full" style={{ background: "#4ade80" }} />
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Data nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-6 rounded" style={{ background: "rgba(210,130,48,0.7)" }} />
                <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>Data flows</span>
              </div>
            </div>
          </div>

          {/* Globe */}
          <div className="flex items-center justify-center">
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ maxWidth: 540, aspectRatio: "1 / 1" }}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
