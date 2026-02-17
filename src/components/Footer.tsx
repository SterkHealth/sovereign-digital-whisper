const Footer = () => {
  return (
    <footer className="border-t border-border bg-background px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <span className="font-display text-lg font-bold text-foreground">
            AIXA<span className="text-muted-foreground">TECH</span>
          </span>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            AI-Native Sovereign Digital Public Infrastructure
          </p>
        </div>

        <div className="flex gap-8">
          {/* If you don't have dedicated pages yet, use anchors.
              IMPORTANT: you must have elements with these ids on the page for scrolling to work. */}
          <a
            href="#privacy"
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#terms"
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground"
          >
            Terms
          </a>
          <a
            href="mailto:contact@aixatech.com"
            className="font-mono text-[11px] text-muted-foreground hover:text-foreground"
          >
            Contact
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


export default Footer;
