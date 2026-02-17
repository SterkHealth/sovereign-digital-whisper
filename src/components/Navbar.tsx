import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Problem", href: "#problem" },
  { label: "Solutions", href: "#solutions" },
  { label: "What We Build", href: "#what-we-build" },
  { label: "Delivery", href: "#delivery" },
  { label: "Why Aixa", href: "#differentiators" },
  { label: "Team", href: "#team" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-hero-foreground/10 bg-hero/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="font-display text-xl font-bold tracking-tight text-hero-foreground">
          Aixa<span className="text-gold">Tech</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-sm text-hero-muted transition-colors hover:text-hero-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="gold-gradient rounded-md px-5 py-2 font-display text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-hero-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-hero-foreground/10 bg-hero px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-body text-sm text-hero-muted transition-colors hover:text-hero-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="gold-gradient mt-2 rounded-md px-5 py-2 text-center font-display text-sm font-semibold text-accent-foreground"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
