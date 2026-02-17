import { Button } from "@/components/ui/button";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

export default function HeroSection() {
  const scrollToApproach = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1) Update URL hash (nice for sharing)
    if (window.location.hash !== "#approach") {
      window.history.pushState(null, "", "#approach");
    }

    // 2) Force-scroll to the section if it exists
    const el = document.getElementById("approach");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // If we can't find it, you *must* add id="approach" to the Approach section wrapper.
    // This fallback at least keeps the hash updated.
    console.warn(
      'No element found with id="approach". Add id="approach" to your Approach section wrapper.'
    );
  };

  return (
    <>
      {/* HERO */}
      <section className="relative bg-black text-white">
        <div className="container mx-auto px-6 py-28">
          {/* Label */}
          <div className="mb-6">
            <span className="border border-white/20 px-4 py-2 text-xs tracking-widest uppercase text-white/70">
              Sovereign Digital Infrastructure
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl text-5xl md:text-6xl font-semibold leading-tight">
            Build digital public infrastructure your nation owns and controls.
          </h1>

          {/* Subtext */}
          <p className="mt-6 max-w-2xl text-lg text-white/70">
            Aixa Tech delivers modular, privacy-by-design platforms for identity,
            payments, and secure data exchange — deployed on your terms, with full
            knowledge transfer.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {/* Primary: Calendly (WHITE) */}
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

            {/* Secondary: Approach (GREY + FORCE SCROLL) */}
            <Button
              size="lg"
              type="button"
              onClick={scrollToApproach}
              className="bg-white/10 text-white/70 border border-white/20 hover:bg-white/15 hover:text-white"
            >
              See Our Approach
            </Button>
          </div>

          {/* Trust Line */}
          <div className="mt-16 text-xs tracking-wide text-white/40 uppercase">
            Trusted by government agencies across Africa, the Middle East, and
            Southeast Asia.
          </div>
        </div>
      </section>

      {/* BOTTOM CTA (the section in your screenshot) */}
      <section className="relative bg-black text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <div className="mb-4 text-xs tracking-widest uppercase text-white/50">
            Start the Conversation
          </div>

          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Ready to build infrastructure your nation controls?
          </h2>

          <p className="max-w-2xl mx-auto text-white/70 mb-10">
            Schedule a confidential briefing with our team. We’ll assess your
            current landscape and outline a practical path forward.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* FIXED: "Request a Briefing" -> "Book a Discovery Call" (WHITE) */}
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

            {/* Keep as-is (wire to PDF later) */}
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white/20 hover:bg-white/5"
            >
              Download Capability Deck
            </Button>
          </div>

          <div className="mt-6 text-xs text-white/40">
            All briefings are confidential and subject to NDA upon request.
          </div>
        </div>
      </section>
    </>
  );
}

