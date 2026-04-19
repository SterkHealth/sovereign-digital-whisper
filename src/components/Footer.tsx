const CALENDLY_URL = "https://calendly.com/eshani-aixatech/30min";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <span className="font-display text-lg font-bold text-foreground">
            AIXA<span className="text-muted-foreground">TECH</span>
          </span>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            Agri Data · Climate Risk Intelligence · Sovereign AI
          </p>
        </div>

        <div className="flex gap-8">
          <a href="mailto:eshani@aixatech.co" className="font-mono text-[11px] text-muted-foreground hover:text-foreground">
            eshani@aixatech.co
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground"
          >
            Book a Call
          </a>
        </div>

        <p className="font-mono text-[10px] text-muted-foreground">
          © {new Date().getFullYear()} Aixa Tech
        </p>
      </div>
    </footer>
  );
};

export default Footer;
