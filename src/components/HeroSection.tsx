import { Button } from "@/components/ui/button";
import type { MouseEvent } from "react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

export default function HeroSection() {
  const goToSolutions = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (window.location.hash !== "#solutions") {
      window.history.pushState(null, "", "#solutions");
    }
    const el = document.getElementById("solutions");
    if (!el) return;
    const yOffset = -90;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="relative bg-black text-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-24">
        {/* Label */}
        <div className="mb-6">
          <span className="border border-white/20 px-4 py-2 text-xs tracking-widest uppercase text-white/70">
            Intelligence Infrastructure
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-4xl text-5xl md:text-6xl font-semibold leading-tight">
          Intelligence Infrastructure{" "}
          <span className="text-white/60">For A Climate Resilient Global South</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          We build the data infrastructure that powers climate risk decisions, unlocks agricultural
          finance, and gives nations sovereignty over their own data.
        </p>

        {/* Module tags */}
        <div className="mt-8 flex flex-wrap gap-3">
          {["Agri Data", "Climate Risk Intelligence", "Sovereign AI"].map((tag) => (
            <span
              key={tag}
              className="border border-[hsl(33_65%_50%/0.4)] text-[hsl(33,65%,65%)] px-3 py-1 text-xs tracking-widest uppercase font-mono"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="gold-gradient hover:opacity-90">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Book a Discovery Call →
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white/70 border border-white/20 hover:bg-white/15 hover:text-white"
          >
            <a href="#solutions" onClick={goToSolutions}>
              Our Platform
            </a>
          </Button>
        </div>

        {/* Trust Line */}
        <div className="mt-16 text-xs tracking-wide text-white/40 uppercase">
          Deployed with the African Development Bank, Aon, and governments across East and Southern Africa.
        </div>
      </div>
    </section>
  );
}
