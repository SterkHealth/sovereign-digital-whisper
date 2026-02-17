import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 50%) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-md border border-hero-foreground/20 px-4 py-1.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-muted">
              Sovereign Digital Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight text-hero-foreground md:text-6xl lg:text-7xl">
            Build digital public infrastructure your nation{" "}
            <span className="text-hero-muted">
              owns and controls.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-hero-muted md:text-lg">
            Aixa Tech delivers modular, privacy-by-design platforms for identity,
            payments, and data exchange — deployed on your terms, with full
            knowledge transfer.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {/* Primary CTA (White) */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-7 py-3 font-display text-sm font-semibold tracking-wide text-black transition-all duration-200 hover:bg-neutral-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Book a Discovery Call
              <ArrowRight size={16} />
            </a>

            {/* Secondary CTA (Grey) */}
            <a
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-neutral-700 bg-neutral-900 px-7 py-3 font-display text-sm font-semibold tracking-wide text-neutral-300 transition-all duration-200 hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40"
            >
              See Our Approach
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.15em] text-hero-muted/40">
            Trusted by government agencies across Africa, the Middle East, and Southeast Asia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

