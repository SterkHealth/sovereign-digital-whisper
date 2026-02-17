import { ArrowRight } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="hero-gradient section-padding">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
          Start the Conversation
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-hero-foreground md:text-4xl">
          Ready to build infrastructure your nation controls?
        </h2>
        <p className="mt-4 font-body text-lg text-hero-muted">
          Schedule a confidential briefing with our team. We&apos;ll assess your
          current landscape and outline a practical path forward.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:contact@aixatech.com"
            className="gold-gradient inline-flex items-center gap-2 rounded-md px-8 py-3.5 font-display text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Request a Briefing
            <ArrowRight size={16} />
          </a>
          <a
            href="mailto:contact@aixatech.com"
            className="inline-flex items-center gap-2 rounded-md border border-hero-foreground/15 px-8 py-3.5 font-display text-sm font-semibold text-hero-foreground transition-colors hover:bg-hero-foreground/5"
          >
            Download Capability Deck
          </a>
        </div>

        <p className="mt-8 font-body text-xs text-hero-muted/50">
          All briefings are confidential and subject to NDA upon request.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
