import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full bg-black text-white">
      <div className="container mx-auto px-6 py-28">

        {/* Tagline */}
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
          payments, and secure data exchange — deployed on your terms, with
          full knowledge transfer.
        </p>

        {/* Primary CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <a
              href="https://calendly.com/eshani-aixatech/30min"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Discovery Call →
            </a>
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-white/30 text-white hover:bg-white hover:text-black"
          >
            See Our Approach
          </Button>
        </div>

        {/* Trust Line */}
        <div className="mt-16 text-xs tracking-wide text-white/40 uppercase">
          Trusted by government agencies across Africa, the Middle East,
          and Southeast Asia.
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className="border-t border-white/10">
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

          <div className="flex justify-center">
            <Button asChild size="lg">
              <a
                href="https://calendly.com/eshani-aixatech/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a Discovery Call →
              </a>
            </Button>
          </div>

          <div className="mt-6 text-xs text-white/40">
            All briefings are confidential and subject to NDA upon request.
          </div>
        </div>
      </div>
    </section>
  );
}


