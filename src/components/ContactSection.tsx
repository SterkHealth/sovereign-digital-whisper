import { ArrowRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

const ContactSection = () => {
  return (
    <section id="contact" className="section-padding relative overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(74,222,128,0.50) 0%, rgba(74,222,128,0.16) 35%, #030303 65%)" }}
    >

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#4ade80" }}>
          Start the Conversation
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Ready to turn data into decisions?
        </h2>

        <p className="mt-4 text-base" style={{ color: "rgba(255,255,255,0.50)" }}>
          Schedule a confidential discovery call with our team. We'll assess your current landscape
          and outline a practical path to climate intelligence and agri data infrastructure.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-bold"
          >
            Book a Discovery Call
            <ArrowRight size={16} />
          </a>

          <a
            href="#solutions"
            className="inline-flex items-center gap-2 rounded-lg px-8 py-3.5 text-sm font-semibold transition-colors hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.65)" }}
          >
            Our Platform
          </a>
        </div>

        <p className="mt-8 font-mono text-[10px] tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.20)" }}>
          All discovery calls are confidential and subject to NDA upon request.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
