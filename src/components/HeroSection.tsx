import type { MouseEvent } from "react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

export default function HeroSection() {
  const goToSolutions = (e: MouseEvent<HTMLAnchorElement>) => {
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
      className="relative min-h-screen flex items-center justify-center text-white"
      style={{ background: "radial-gradient(ellipse at 25% 60%, #0d2010 0%, #051008 40%, #000000 75%)" }}
    >
      <div className="container mx-auto px-6 py-28 text-center">

        {/* Label */}
        <div className="mb-8 flex justify-center">
          <span className="border border-white/20 px-4 py-2 text-xs tracking-widest uppercase text-white/70">
            Intelligence Infrastructure
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-3xl text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight">
          Real-time Climate and Agriculture{" "}
          <span className="text-white/55">Risk Intelligence.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 mx-auto max-w-xl text-lg text-white/65 leading-relaxed">
          We turn raw data into the risk scores, trigger indices, and yield
          forecasts that enterprises, insurers, and governments need to deploy
          capital with confidence.
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
