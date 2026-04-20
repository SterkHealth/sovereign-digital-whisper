const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden px-6 py-14 lg:px-8"
      style={{ background: "#030303", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      {/* subtle glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 200,
          background: "radial-gradient(ellipse at 50% 100%, rgba(74,222,128,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <span className="font-display text-lg font-bold text-white">
            AIXA<span style={{ color: "#4ade80" }}>TECH</span>
          </span>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.30)" }}>
            Agri Data · Climate Risk Intelligence · Sovereign AI
          </p>
        </div>

        <div className="flex gap-8">
          <a
            href="mailto:eshani@aixatech.co"
            className="font-mono text-[11px] transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#4ade80")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            eshani@aixatech.co
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#4ade80")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            Book a Call
          </a>
        </div>

        <p className="font-mono text-[10px]" style={{ color: "rgba(255,255,255,0.20)" }}>
          © {new Date().getFullYear()} Aixa Tech
        </p>
      </div>
    </footer>
  );
};

export default Footer;
