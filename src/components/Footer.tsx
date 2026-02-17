const Footer = () => {
  return (
    <footer className="border-t border-border bg-background px-6 py-12 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <span className="font-display text-lg font-bold text-foreground">
            Aixa<span className="text-gold">Tech</span>
          </span>
          <p className="mt-1 font-body text-xs text-muted-foreground">
            AI-Native Sovereign Digital Public Infrastructure
          </p>
        </div>

        <div className="flex gap-8">
          <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground">
            Privacy Policy
          </a>
          <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground">
            Terms
          </a>
          <a href="mailto:contact@aixatech.com" className="font-body text-sm text-muted-foreground hover:text-foreground">
            Contact
          </a>
        </div>

        <p className="font-body text-xs text-muted-foreground">
          © {new Date().getFullYear()} Aixa Tech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
