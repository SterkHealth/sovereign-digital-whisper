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

// ── All city nodes ─────────────────────────────────────────────────────────
// dy = vertical label offset in px so closely-spaced cities don't stack
const CITIES: { ll: [number, number]; label: string; dy?: number }[] = [
  // Africa (indices 0–6)
  { ll: [-1.29,  36.82], label: "Kenya",         dy:   5 },
  { ll: [ 6.37,  -2.38], label: "Ghana",         dy:  -8 },
  { ll: [-26.2,  28.04], label: "South Africa"           },
  { ll: [ 9.14,  40.49], label: "Ethiopia",      dy:  -6 },
  { ll: [14.47, -14.45], label: "Senegal"                },
  { ll: [ 0.34,  32.58], label: "Uganda",        dy:  -9 },
  { ll: [ 6.37,   3.39], label: "Nigeria",       dy:   8 },
  // Latin America (7–11)
  { ll: [-15.8,  -47.9], label: "Brazil"                 },
  { ll: [  4.7,  -74.1], label: "Colombia"               },
  { ll: [-34.6,  -58.4], label: "Argentina"              },
  { ll: [ 19.4,  -99.1], label: "Mexico"                 },
  { ll: [-12.0,  -77.0], label: "Peru"                   },
  // Europe (12–15)
  { ll: [ 51.5,   -0.12], label: "London",       dy: -20 },
  { ll: [ 48.85,   2.35], label: "Paris",        dy:  -6 },
  { ll: [ 52.52,  13.4 ], label: "Berlin",       dy: -20 },
  { ll: [ 41.9,   12.5 ], label: "Rome",         dy:   6 },
  // North America (16–18)
  { ll: [ 40.71,  -74.01], label: "New York",    dy:   7 },
  { ll: [ 37.8,  -122.4 ], label: "San Francisco"        },
  { ll: [ 45.42,  -75.69], label: "Ottawa",      dy:  -7 },
  // Asia (19–23)
  { ll: [ 20.6,   78.9  ], label: "India"                },
  { ll: [  1.35, 103.82  ], label: "Singapore"           },
  { ll: [ 35.7,  139.7  ], label: "Tokyo",       dy:  -8 },
  { ll: [ 31.2,  121.5  ], label: "Shanghai",    dy:   8 },
  { ll: [ -6.2,  106.8  ], label: "Jakarta"              },
  // Australia / Pacific (24–26)
  { ll: [-33.9,  151.2  ], label: "Sydney"               },
  { ll: [-36.9,  174.8  ], label: "Auckland",    dy:   8 }, // 25 — fills Sydney→Hawaii gap
  { ll: [ 21.3, -157.8  ], label: "Hawaii",      dy:  -7 }, // 26 — fills Asia→US Pacific gap
  // Middle East / Central Asia (27–28) — fills 40°→78° gap
  { ll: [ 25.2,   55.3  ], label: "Dubai",       dy:  -7 },
  { ll: [ 19.1,   72.9  ], label: "Mumbai",      dy:   7 },
  // Extra Americas / Caribbean (29)
  { ll: [ 10.5,  -66.9  ], label: "Venezuela",   dy:  -7 },
  // Central/East Africa (30)
  { ll: [-6.17,   35.74], label: "Tanzania",     dy:   8 },
  // Extra nodes to fill edges of oscillation range
  { ll: [-17.7,  178.4  ], label: "Fiji",        dy:   7 }, // 31 — right edge (130° view)
  { ll: [ 33.9,   35.5  ], label: "Levant",      dy:  -7 }, // 32 — fills 13°→55° gap
  { ll: [-4.3,    15.3  ], label: "Congo",        dy:   7 }, // 33 — Central Africa
  { ll: [ 15.6,   32.5  ], label: "Sudan",        dy:  -7 }, // 34 — NE Africa bridge
];

// Arc pairs [from-index, to-index]
const ARC_PAIRS: [number, number][] = [
  // Africa → Europe
  [ 0, 12], // Kenya → London
  [ 1, 13], // Ghana → Paris
  [ 2, 14], // South Africa → Berlin
  [ 3, 16], // Ethiopia → New York
  [ 4, 13], // Senegal → Paris
  [ 5, 12], // Uganda → London
  [ 6, 15], // Nigeria → Rome
  // Africa → Middle East
  [ 0, 27], // Kenya → Dubai
  [ 3, 27], // Ethiopia → Dubai
  [27, 19], // Dubai → India
  [27, 28], // Dubai → Mumbai
  [28, 20], // Mumbai → Singapore
  // Latin America → Europe / N. America
  [ 7, 14], // Brazil → Berlin
  [ 8, 16], // Colombia → New York
  [ 9, 12], // Argentina → London
  [10, 17], // Mexico → San Francisco
  [11, 17], // Peru → San Francisco
  [29, 16], // Venezuela → New York
  // Europe ↔ Asia
  [19, 12], // India → London
  [15, 19], // Rome → India
  [22, 14], // Shanghai → Berlin
  // Asia internal
  [19, 20], // India → Singapore
  [20, 21], // Singapore → Tokyo
  [20, 23], // Singapore → Jakarta
  [21, 22], // Tokyo → Shanghai
  // Pacific chain: Sydney → Auckland → Hawaii → San Francisco → Tokyo
  [24, 25], // Sydney → Auckland
  [25, 26], // Auckland → Hawaii
  [26, 17], // Hawaii → San Francisco
  [26, 21], // Hawaii → Tokyo
  [24, 20], // Sydney → Singapore
  // Cross-Pacific
  [ 7, 17], // Brazil → San Francisco
  [ 8, 13], // Colombia → Paris
  // Extra connections for new nodes
  [32, 27], // Levant → Dubai
  [32, 15], // Levant → Rome
  [33,  1], // Congo → Ghana
  [33,  0], // Congo → Kenya
  [34,  3], // Sudan → Ethiopia
  [34, 27], // Sudan → Dubai
  [31, 24], // Fiji → Sydney
  [31, 20], // Fiji → Singapore
];

const ARCS = ARC_PAIRS.map(([i, j], idx) => ({
  from: CITIES[i].ll,
  to:   CITIES[j].ll,
  pts:  arcPoints(CITIES[i].ll, CITIES[j].ll, 80),
  phase: idx / ARC_PAIRS.length,
}));

// Faint background country/region labels
const BG_LABELS: { ll: [number, number]; label: string }[] = [
  { ll: [ 0.0,  20.0 ], label: "AFRICA"        },
  { ll: [50.0,  15.0 ], label: "EUROPE"         },
  { ll: [35.0,  90.0 ], label: "ASIA"           },
  { ll: [-25.0, 135.0], label: "AUSTRALIA"      },
  { ll: [ 0.0,  70.0 ], label: "INDIAN OCEAN"   },
  { ll: [30.0,  50.0 ], label: "MIDDLE EAST"    },
];

// ── Component ─────────────────────────────────────────────────────────────────
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

      // Oscillate across Africa → Middle East → SE Asia corridor (never faces empty Pacific)
      // Range: centre 55° ± 75° → swings between -20° (Europe/Africa) and 130° (SE Asia)
      const vcLon = 55 + Math.sin(ts / 22000) * 75;
      const vcLat = 15; // slight north tilt

      // ── Sphere ──────────────────────────────────────────────────
      const grad = ctx!.createRadialGradient(cx - R * 0.25, cy - R * 0.2, R * 0.05, cx, cy, R);
      grad.addColorStop(0,   "#1e4422");
      grad.addColorStop(0.5, "#0b1d0d");
      grad.addColorStop(1,   "#040d05");
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = grad; ctx!.fill();

      // Atmosphere
      const atm = ctx!.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.22);
      atm.addColorStop(0,   "rgba(30,100,40,0.28)");
      atm.addColorStop(0.5, "rgba(15,60,22,0.10)");
      atm.addColorStop(1,   "rgba(0,0,0,0)");
      ctx!.beginPath(); ctx!.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx!.fillStyle = atm; ctx!.fill();

      // ── Grid ────────────────────────────────────────────────────
      ctx!.save();
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2); ctx!.clip();
      ctx!.strokeStyle = "rgba(60,150,70,0.15)"; ctx!.lineWidth = 0.5;
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

      // ── Background region labels ─────────────────────────────────
      ctx!.textAlign = "center"; ctx!.textBaseline = "middle";
      BG_LABELS.forEach(({ ll, label }) => {
        const p = project(ll[0], ll[1], vcLat, vcLon, R, cx, cy);
        if (!p.visible) return;
        ctx!.font = `500 9px 'Space Grotesk', sans-serif`;
        ctx!.fillStyle = "rgba(255,255,255,0.13)";
        ctx!.fillText(label, p.x, p.y);
      });

      // ── Animated arcs ────────────────────────────────────────────
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

      // ── City dots + labels ───────────────────────────────────────
      CITIES.forEach(({ ll, label, dy = 0 }) => {
        const p = project(ll[0], ll[1], vcLat, vcLon, R, cx, cy);
        if (!p.visible) return;

        const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0025 + ll[0]);

        // Pulse ring
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 3.5 + pulse * 4, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(74,222,128,${0.3 * pulse})`;
        ctx!.lineWidth = 1; ctx!.stroke();

        // Core dot
        ctx!.beginPath(); ctx!.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = "#4ade80"; ctx!.fill();

        // Label — fade the WHOLE label in/out based on cosC so no letters
        // get partially clipped as the city approaches the globe rim.
        // cosC < 0.15 → invisible; cosC > 0.28 → fully opaque.
        const labelAlpha = Math.min(1, Math.max(0, (p.cosC - 0.15) / 0.13));
        if (labelAlpha > 0) {
          const onLeft = p.x < cx;
          ctx!.globalAlpha  = labelAlpha;
          ctx!.font         = `600 11px 'Space Grotesk', sans-serif`;
          ctx!.fillStyle    = "rgba(74,222,128,0.88)";
          ctx!.textAlign    = onLeft ? "right" : "left";
          ctx!.textBaseline = "middle";
          ctx!.fillText(label, p.x + (onLeft ? -8 : 8), p.y + dy);
          ctx!.globalAlpha  = 1;
        }
      });

      // ── Globe rim ───────────────────────────────────────────────
      ctx!.beginPath(); ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(50,120,60,0.3)"; ctx!.lineWidth = 1; ctx!.stroke();

      frameRef.current = requestAnimationFrame(draw);
    }

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <section
      id="data-flow"
      className="section-padding overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 25% 60%, #0d2010 0%, #051008 40%, #000000 75%)" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          {/* Text */}
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Raw Data To{" "}
              <span className="text-white/55">Decision-Ready Intelligence</span>
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-white/60">
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
                    style={{ background: "hsl(33,65%,50%)" }}
                  />
                  <span className="font-body text-sm leading-relaxed text-white/60">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Data nodes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-6 rounded" style={{ background: "rgba(210,130,48,0.7)" }} />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Data flows</span>
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
