import { ArrowRight, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-gradient relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(220 15% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 15% 60%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-hero-foreground/10 bg-hero-foreground/5 px-4 py-1.5">
            <Shield size={14} className="text-gold" />
            <span className="font-body text-xs tracking-wide text-hero-muted">
              Sovereign Digital Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-balance font-display text-4xl font-800 leading-[1.1] tracking-tight text-hero-foreground md:text-5xl lg:text-6xl">
            Build digital public infrastructure your nation{" "}
            <span className="text-gold">owns and controls.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-hero-muted md:text-xl">
            Aixa Tech delivers modular, privacy-by-design platforms for
            identity, payments, and data exchange — deployed on your
            terms, with full knowledge transfer.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="gold-gradient inline-flex items-center justify-center gap-2 rounded-md px-7 py-3 font-display text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
            >
              Request a Briefing
              <ArrowRight size={16} />
            </a>
            <a
              href="#solutions"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-hero-foreground/15 px-7 py-3 font-display text-sm font-semibold text-hero-foreground transition-colors hover:bg-hero-foreground/5"
            >
              See Our Approach
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-12 font-body text-xs tracking-wide text-hero-muted/60">
            Trusted by government agencies across Africa, the Middle East, and Southeast Asia.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
