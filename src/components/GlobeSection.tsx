import { useEffect, useRef } from "react";

const DEG = Math.PI / 180;

// Orthographic projection.
// viewCenterLon: the longitude that appears at the centre of the canvas.
function project(
  lat: number, lon: number,
  viewCenterLat: number, viewCenterLon: number,
  R: number, cx: number, cy: number
) {
  const φ  = lat * DEG;
  const λd = (lon - viewCenterLon) * DEG;   // difference from view centre
  const φ0 = viewCenterLat * DEG;

  const cosC = Math.sin(φ0) * Math.sin(φ) + Math.cos(φ0) * Math.cos(φ) * Math.cos(λd);
  const x = R * Math.cos(φ) * Math.sin(λd);
  const y = R * (Math.cos(φ0) * Math.sin(φ) - Math.sin(φ0) * Math.cos(φ) * Math.cos(λd));

  return { x: cx + x, y: cy - y, visible: cosC > 0.05 };
}

// Linearly interpolate along a great circle (sufficient for arcs up to ~120°).
function arcPoints(
  a: [number, number], b: [number, number], steps = 80
): [number, number][] {
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t] as [number, number];
  });
}

// ── Data ─────────────────────────────────────────────────────────────────────

const ORIGINS: { ll: [number, number]; label: string }[] = [
  { ll: [-1.29,  36.82], label: "Kenya"         },
  { ll: [ 6.37,  -2.38], label: "Ghana"         },
  { ll: [-26.2,  28.04], label: "South Africa"  },
  { ll: [ 9.14,  40.49], label: "Ethiopia"      },
  { ll: [14.47, -14.45], label: "Senegal"       },
  { ll: [ 0.34,  32.58], label: "Uganda"        },
  { ll: [-3.38,  29.36], label: "Burundi"       },
  { ll: [12.36,  -1.53], label: "Burkina Faso"  },
];

const DESTINATIONS: { ll: [number, number]; label: string }[] = [
  { ll: [51.5,   -0.12], label: "London"   },
  { ll: [48.85,   2.35], label: "Paris"    },
  { ll: [40.71, -74.01], label: "New York" },
  { ll: [52.52,  13.4 ], label: "Berlin"   },
  { ll: [45.42, -75.69], label: "Ottawa"   },
];

// Additional country labels shown on the globe surface
const COUNTRY_LABELS: { ll: [number, number]; label: string }[] = [
  { ll: [ 9.0,   8.0], label: "Nigeria"     },
  { ll: [-6.4,  34.9], label: "Tanzania"    },
  { ll: [-4.0,  21.8], label: "DR Congo"    },
  { ll: [15.0,  30.0], label: "Sudan"       },
  { ll: [-18.7, 35.5], label: "Mozambique"  },
  { ll: [-11.2, 17.9], label: "Angola"      },
  { ll: [12.4,   2.3], label: "Niger"       },
  { ll: [54.0,  -2.0], label: "UK"          },
  { ll: [46.2,   2.2], label: "France"      },
  { ll: [37.1, -95.7], label: "USA"         },
  { ll: [51.2,  10.5], label: "Germany"     },
];

const ARCS = ORIGINS.map((o, i) => ({
  from: o.ll,
  to: DESTINATIONS[i % DESTINATIONS.length].ll,
  pts: arcPoints(o.ll, DESTINATIONS[i % DESTINATIONS.length].ll, 80),
}));

// ── Component ─────────────────────────────────────────────────────────────────

export default function GlobeSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const arcPhases = ARCS.map((_, i) => i / ARCS.length);

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

      const R  = Math.min(W, H) * 0.42;
      const cx = W / 2;
      const cy = H / 2;

      // Oscillate view centre: lon swings between –40° and +20°
      // so Africa is always visible, and sometimes New York comes into view.
      const PERIOD = 12000; // ms per full oscillation
      const phase  = (ts / PERIOD) * 2 * Math.PI;
      const vcLon  = -10 + 30 * Math.sin(phase);   // –40 … +20 degrees
      const vcLat  = 8;                              // slight north tilt

      // ── Globe sphere ────────────────────────────────────────────
      const grad = ctx!.createRadialGradient(cx - R * 0.25, cy - R * 0.2, R * 0.05, cx, cy, R);
      grad.addColorStop(0,   "#1e4422");
      grad.addColorStop(0.5, "#0b1d0d");
      grad.addColorStop(1,   "#040d05");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.fillStyle = grad;
      ctx!.fill();

      // Atmosphere glow
      const atm = ctx!.createRadialGradient(cx, cy, R * 0.88, cx, cy, R * 1.22);
      atm.addColorStop(0,   "rgba(30,100,40,0.28)");
      atm.addColorStop(0.5, "rgba(15,60,22,0.10)");
      atm.addColorStop(1,   "rgba(0,0,0,0)");
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 1.22, 0, Math.PI * 2);
      ctx!.fillStyle = atm;
      ctx!.fill();

      // ── Lat/lon grid (clipped to sphere) ────────────────────────
      ctx!.save();
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.clip();
      ctx!.strokeStyle = "rgba(60,150,70,0.16)";
      ctx!.lineWidth   = 0.5;

      for (let lat = -75; lat <= 75; lat += 15) {
        ctx!.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = project(lat, lon, vcLat, vcLon, R, cx, cy);
          if (!p.visible) { started = false; continue; }
          if (!started) { ctx!.moveTo(p.x, p.y); started = true; }
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }
      for (let lon = -180; lon < 180; lon += 15) {
        ctx!.beginPath();
        let started = false;
        for (let lat = -90; lat <= 90; lat += 2) {
          const p = project(lat, lon, vcLat, vcLon, R, cx, cy);
          if (!p.visible) { started = false; continue; }
          if (!started) { ctx!.moveTo(p.x, p.y); started = true; }
          else ctx!.lineTo(p.x, p.y);
        }
        ctx!.stroke();
      }
      ctx!.restore();

      // ── Animated arcs ───────────────────────────────────────────
      const speed = ts * 0.00035;
      ARCS.forEach(({ pts }, i) => {
        const head    = (speed + arcPhases[i]) % 1;
        const tailLen = 0.30;
        const headIdx = Math.floor(head * (pts.length - 1));
        const tailIdx = Math.max(0, Math.floor((head - tailLen) * (pts.length - 1)));

        for (let j = tailIdx; j < headIdx; j++) {
          const p1 = project(pts[j][0],     pts[j][1],     vcLat, vcLon, R, cx, cy);
          const p2 = project(pts[j+1]?.[0] ?? pts[j][0], pts[j+1]?.[1] ?? pts[j][1], vcLat, vcLon, R, cx, cy);
          if (!p1.visible || !p2.visible) continue;

          const frac = (j - tailIdx) / Math.max(1, headIdx - tailIdx);
          ctx!.beginPath();
          ctx!.moveTo(p1.x, p1.y);
          ctx!.lineTo(p2.x, p2.y);
          ctx!.strokeStyle = `rgba(210,130,48,${frac * 0.9})`;
          ctx!.lineWidth   = 2;
          ctx!.stroke();
        }

        // Head glow
        if (headIdx < pts.length) {
          const hp = project(pts[headIdx][0], pts[headIdx][1], vcLat, vcLon, R, cx, cy);
          if (hp.visible) {
            const hg = ctx!.createRadialGradient(hp.x, hp.y, 0, hp.x, hp.y, 6);
            hg.addColorStop(0, "rgba(210,130,48,1)");
            hg.addColorStop(1, "rgba(210,130,48,0)");
            ctx!.beginPath();
            ctx!.arc(hp.x, hp.y, 6, 0, Math.PI * 2);
            ctx!.fillStyle = hg;
            ctx!.fill();
          }
        }
      });

      // ── Background country labels ────────────────────────────────
      ctx!.textAlign    = "center";
      ctx!.textBaseline = "middle";
      COUNTRY_LABELS.forEach(({ ll, label }) => {
        const p = project(ll[0], ll[1], vcLat, vcLon, R, cx, cy);
        if (!p.visible) return;
        ctx!.font      = `500 10px 'Space Grotesk', sans-serif`;
        ctx!.fillStyle = "rgba(255,255,255,0.22)";
        ctx!.fillText(label.toUpperCase(), p.x, p.y);
      });

      // ── Origin dots + labels ─────────────────────────────────────
      ORIGINS.forEach(({ ll, label }) => {
        const p = project(ll[0], ll[1], vcLat, vcLon, R, cx, cy);
        if (!p.visible) return;

        const pulse = 0.5 + 0.5 * Math.sin(ts * 0.0025 + ll[0]);

        // Pulse ring
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 4 + pulse * 5, 0, Math.PI * 2);
        ctx!.strokeStyle = `rgba(74,222,128,${0.35 * pulse})`;
        ctx!.lineWidth   = 1;
        ctx!.stroke();

        // Core dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx!.fillStyle = "#4ade80";
        ctx!.fill();

        // Label
        ctx!.font         = `600 11px 'Space Grotesk', sans-serif`;
        ctx!.fillStyle    = "rgba(74,222,128,0.9)";
        ctx!.textAlign    = "left";
        ctx!.textBaseline = "middle";
        ctx!.fillText(label, p.x + 8, p.y);
      });

      // ── Destination dots + labels ────────────────────────────────
      DESTINATIONS.forEach(({ ll, label }) => {
        const p = project(ll[0], ll[1], vcLat, vcLon, R, cx, cy);
        if (!p.visible) return;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(210,130,48,0.85)";
        ctx!.fill();

        ctx!.font         = `500 10px 'Space Grotesk', sans-serif`;
        ctx!.fillStyle    = "rgba(210,130,48,0.8)";
        ctx!.textAlign    = "left";
        ctx!.textBaseline = "middle";
        ctx!.fillText(label, p.x + 7, p.y);
      });

      // ── Globe rim ────────────────────────────────────────────────
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.strokeStyle = "rgba(50,120,60,0.3)";
      ctx!.lineWidth   = 1;
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
              <span className="text-white/55">
                Intelligence doesn't flow back.
              </span>
            </h2>
            <p className="mt-5 font-body text-base leading-relaxed text-white/60">
              Agricultural and climate data from the Global South flows to
              servers in the Global North — processed, packaged, and sold back
              at prices the originating nations cannot afford or govern.
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-white/45">
              Aixatech closes the loop. We keep data sovereign, process it
              within national borders, and return decision-ready intelligence to
              the governments, insurers, and institutions that need it most.
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

            {/* Legend */}
            <div className="mt-8 flex gap-6">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#4ade80]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Data origins</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#d28230]" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">Destinations</span>
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
