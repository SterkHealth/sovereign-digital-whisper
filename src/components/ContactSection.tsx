import { ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding" style={{ background: "radial-gradient(ellipse at 25% 60%, #0d2010 0%, #051008 40%, #000000 75%)" }}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-hero-muted">
          Start the Conversation
        </p>

        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-hero-foreground md:text-4xl">
          Ready to build the infrastructure your nation controls?
        </h2>

        <p className="mt-4 font-body text-base text-hero-muted">
          Schedule a confidential discovery call with our team. We'll assess your current landscape
          and outline a practical path to climate intelligence and agri data infrastructure.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient inline-flex items-center gap-2 px-8 py-3.5 font-display text-sm font-semibold transition-opacity hover:opacity-80"
          >
            Book a Discovery Call
            <ArrowRight size={16} />
          </a>

          <a
            href="mailto:eshani@aixatech.co"
            className="inline-flex items-center gap-2 border border-hero-foreground/20 px-8 py-3.5 font-display text-sm font-semibold text-hero-foreground transition-colors hover:bg-hero-foreground/5"
          >
            eshani@aixatech.co
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
