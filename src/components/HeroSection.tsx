import { useEffect, useRef } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

const PARTICLE_COUNT  = 95;
const CONNECT_DIST    = 155;   // px — max distance to draw a line between two particles
const MOUSE_CONNECT   = 200;   // px — max distance to connect cursor to a particle
const MOUSE_REPEL     = 110;   // px — radius within which cursor pushes particles away
const BASE_SPEED      = 0.38;  // natural drift speed

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);
  const mouseRef  = useRef<{ x: number; y: number } | null>(null);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Particle = { x: number; y: number; vx: number; vy: number; r: number };
    const particles: Particle[] = [];
    let W = 0, H = 0;

    function spawn() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd   = (Math.random() * 0.5 + 0.5) * BASE_SPEED;
        particles.push({
          x:  Math.random() * W,
          y:  Math.random() * H,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          r:  Math.random() * 1.8 + 0.8,
        });
      }
    }

    function frame() {
      const dpr  = window.devicePixelRatio || 1;
      const newW = canvas!.clientWidth;
      const newH = canvas!.clientHeight;

      if (newW !== W || newH !== H) {
        W = newW; H = newH;
        canvas!.width  = Math.round(W * dpr);
        canvas!.height = Math.round(H * dpr);
        ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
        spawn();
      }

      // ── Background ─────────────────────────────────────────
      const bg = ctx!.createRadialGradient(W * 0.25, H * 0.6, 0, W * 0.5, H * 0.5, Math.max(W, H) * 0.85);
      bg.addColorStop(0,   "#0d2010");
      bg.addColorStop(0.4, "#051008");
      bg.addColorStop(1,   "#000000");
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      const mouse = mouseRef.current;

      // ── Update positions ───────────────────────────────────
      for (const p of particles) {
        if (mouse) {
          const dx   = p.x - mouse.x;
          const dy   = p.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < MOUSE_REPEL * MOUSE_REPEL && dist2 > 0) {
            const dist  = Math.sqrt(dist2);
            const force = ((MOUSE_REPEL - dist) / MOUSE_REPEL) * 0.18;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Speed cap + gentle damping back to natural speed
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > BASE_SPEED * 3) {
          p.vx = (p.vx / spd) * BASE_SPEED * 3;
          p.vy = (p.vy / spd) * BASE_SPEED * 3;
        } else if (spd > BASE_SPEED) {
          p.vx *= 0.985;
          p.vy *= 0.985;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -5)     p.x = W + 5;
        if (p.x > W + 5)  p.x = -5;
        if (p.y < -5)     p.y = H + 5;
        if (p.y > H + 5)  p.y = -5;
      }

      // ── Particle–particle connections ──────────────────────
      const D2 = CONNECT_DIST * CONNECT_DIST;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < D2) {
            const alpha = (1 - Math.sqrt(d2) / CONNECT_DIST) * 0.45;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(74,222,128,${alpha.toFixed(2)})`;
            ctx!.lineWidth   = 0.75;
            ctx!.stroke();
          }
        }
      }

      // ── Cursor connections ─────────────────────────────────
      if (mouse) {
        const MD2 = MOUSE_CONNECT * MOUSE_CONNECT;
        for (const p of particles) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MD2) {
            const alpha = (1 - Math.sqrt(d2) / MOUSE_CONNECT) * 0.85;
            ctx!.beginPath();
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.strokeStyle = `rgba(74,222,128,${alpha.toFixed(2)})`;
            ctx!.lineWidth   = 1;
            ctx!.stroke();
          }
        }
        // Cursor dot
        ctx!.beginPath();
        ctx!.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(74,222,128,0.9)";
        ctx!.fill();
      }

      // ── Draw particles ─────────────────────────────────────
      for (const p of particles) {
        // Soft glow
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(74,222,128,0.07)";
        ctx!.fill();
        // Core dot
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(74,222,128,0.88)";
        ctx!.fill();
      }

      frameRef.current = requestAnimationFrame(frame);
    }

    // Mouse tracking — canvas fills the section so rect offset matters
    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = null; };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    frameRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden text-white flex items-center justify-center">
      {/* Particle-network canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ zIndex: 0 }}
      />

      {/* Centred content */}
      <div className="relative z-10 container mx-auto px-6 py-28 text-center">

        {/* Label */}
        <div className="mb-8 flex justify-center">
          <span className="border border-white/20 px-4 py-2 text-xs tracking-widest uppercase text-white/70">
            Intelligence Infrastructure
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-5xl text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
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

      </div>
    </section>
  );
}
