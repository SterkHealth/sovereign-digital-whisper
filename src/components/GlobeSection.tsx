import { useEffect, useRef, useState, useCallback } from "react";

// Data flows FROM Global South origins TO Global North destinations
const arcsData = [
  { startLat: -1.29, startLng: 36.82, endLat: 51.5, endLng: -0.12 },    // Nairobi → London
  { startLat: 6.37, startLng: -2.38, endLat: 48.85, endLng: 2.35 },     // Accra → Paris
  { startLat: -26.2, startLng: 28.04, endLat: 40.71, endLng: -74.01 },  // Johannesburg → New York
  { startLat: 9.14, startLng: 40.49, endLat: 52.52, endLng: 13.4 },     // Addis Ababa → Berlin
  { startLat: 14.47, startLng: -14.45, endLat: 45.42, endLng: -75.69 }, // Dakar → Ottawa
  { startLat: 0.34, startLng: 32.58, endLat: 51.5, endLng: -0.12 },     // Kampala → London
  { startLat: -3.38, startLng: 29.36, endLat: 48.85, endLng: 2.35 },    // Bujumbura → Paris
  { startLat: 12.36, startLng: -1.53, endLat: 40.71, endLng: -74.01 },  // Ouagadougou → New York
];

const originPoints = [
  { lat: -1.29, lng: 36.82 },
  { lat: 6.37, lng: -2.38 },
  { lat: -26.2, lng: 28.04 },
  { lat: 9.14, lng: 40.49 },
  { lat: 14.47, lng: -14.45 },
  { lat: 0.34, lng: 32.58 },
  { lat: -3.38, lng: 29.36 },
  { lat: 12.36, lng: -1.53 },
];

export default function GlobeSection() {
  const globeEl = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [Globe, setGlobe] = useState<any>(null);
  const [size, setSize] = useState(480);

  // Lazy-load the globe library (it's ~2MB)
  useEffect(() => {
    import("react-globe.gl").then((m) => setGlobe(() => m.default));
  }, []);

  // Responsive sizing
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(() => {
      const w = containerRef.current?.clientWidth ?? 480;
      setSize(Math.min(w, 560));
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [Globe]);

  const onGlobeReady = useCallback(() => {
    const g = globeEl.current;
    if (!g) return;
    // Centre on Africa
    g.pointOfView({ lat: 5, lng: 20, altitude: 2.0 });
    const controls = g.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = false;
    controls.enablePan = false;
    // Override globe material to dark green
    import("three").then(({ MeshPhongMaterial, Color }) => {
      g.globeMaterial?.(
        new MeshPhongMaterial({
          color: new Color(0x0a1a0c),
          emissive: new Color(0x040d05),
          shininess: 10,
        })
      );
    });
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
          </div>

          {/* Globe */}
          <div ref={containerRef} className="flex items-center justify-center">
            {Globe ? (
              <Globe
                ref={globeEl}
                onGlobeReady={onGlobeReady}
                width={size}
                height={size}
                backgroundColor="rgba(0,0,0,0)"
                showGraticules
                atmosphereColor="#1f5c28"
                atmosphereAltitude={0.2}
                arcsData={arcsData}
                arcColor={() => "rgba(200,125,48,0.9)"}
                arcAltitude={0.35}
                arcStroke={0.6}
                arcDashLength={0.35}
                arcDashGap={0.15}
                arcDashAnimateTime={1800}
                pointsData={originPoints}
                pointColor={() => "#4ade80"}
                pointAltitude={0.015}
                pointRadius={0.4}
              />
            ) : (
              // Placeholder while the library loads
              <div
                className="rounded-full"
                style={{
                  width: size,
                  height: size,
                  background:
                    "radial-gradient(circle at 35% 38%, #0d2010, #040d05)",
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
