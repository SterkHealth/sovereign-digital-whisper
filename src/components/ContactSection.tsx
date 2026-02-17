import { ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

const ContactSection = () => {
  return (
    <section id="contact" className="hero-gradient section-padding">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hero-muted">
          Start the Conversation
        </p>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-hero-foreground md:text-4xl">
          Ready to build infrastructure your nation controls?
        </h2>

        <p className="mt-4 font-body text-base text-hero-muted">
          Schedule a confidential discovery call with our team. We&apos;ll assess your
          current landscape and outline a practical path forward.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          
          {/* PRIMARY CTA — FIXED */}
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient inline-flex items-center gap-2 px-8 py-3.5 font-display text-sm font-semibold transition-opacity hover:opacity-80"
          >
            Book a Discovery Call
            <ArrowRight size={16} />
          </a>

          {/* SECONDARY CTA (leave as-is or wire to PDF later) */}
          <a
            href="/capability-deck.pdf"
            className="inline-flex items-center gap-2 border border-hero-foreground/20 px-8 py-3.5 font-display text-sm font-semibold text-hero-foreground transition-colors hover:bg-hero-foreground/5"
          >
            Download Capability Deck
          </a>

        </div>

        <p className="mt-8 font-mono text-[10px] tracking-[0.1em] text-hero-muted/40">
          All discovery calls are confidential and subject to NDA upon request.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;

