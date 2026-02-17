import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

export default function HeroSection() {
  return (
    <section className="relative bg-black text-white">
      <div className="container mx-auto px-6 py-28">

        {/* Label */}
        <div className="mb-6">
          <span className="border border-white/20 px-4 py-2 text-xs tracking-widest uppercase text-white/70">
            Sovereign Digital Infrastructure
          </span>
        </div>

        {/* Headline — WHITE + GREY SPLIT */}
        <h1 className="max-w-4xl text-5xl md:text-6xl font-semibold leading-tight">
          Build digital public infrastructure your nation{" "}
          <span className="text-white/60">
            owns and controls.
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          Aixa Tech delivers modular, privacy-by-design platforms for identity,
          payments, and secure data exchange — deployed on your terms, with full
          knowledge transfer.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">

          {/* PRIMARY — WHITE */}
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-white/90"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Discovery Call →
            </a>
          </Button>

          {/* SECONDARY — GREY — LINKS TO SOLUTIONS PAGE */}
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white/70 border border-white/20 hover:bg-white/15 hover:text-white"
          >
            <a href="/solutions">
              See Our Approach
            </a>
          </Button>

        </div>

        {/* Trust Line */}
        <div className="mt-16 text-xs tracking-wide text-white/40 uppercase">
          Trusted by government agencies across Africa, the Middle East, and Southeast Asia.
        </div>

      </div>
    </section>
  );
}

