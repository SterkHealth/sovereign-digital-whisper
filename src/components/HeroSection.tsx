import { Button } from "@/components/ui/button";
import type { MouseEvent } from "react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

export default function HeroSection() {
  const goToSolutions = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Update hash without reloading
    if (window.location.hash !== "#solutions") {
      window.history.pushState(null, "", "#solutions");
    }

    const el = document.getElementById("solutions");
    if (!el) return;

    // Offset for sticky navbar
    const yOffset = -90;
    const y =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

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
          The AI-native operating system{" "}
          <span className="text-white/60">for modern governments</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-2xl text-lg text-white/70">
          We build sovereign digital backbones that power identity, payments, registries, 
          and public services — built to be owned, operated, and evolved by the state.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {/* Primary — WHITE */}
          <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Start a Sovereign Pilot →
            </a>
          </Button>

          {/* Secondary — GREY — SCROLL TO SOLUTIONS SECTION */}
          <Button
            asChild
            size="lg"
            className="bg-white/10 text-white/70 border border-white/20 hover:bg-white/15 hover:text-white"
          >
            <a href="#solutions" onClick={goToSolutions}>
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

