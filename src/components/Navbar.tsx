import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#solutions" },
  { label: "How It Works", href: "#what-we-build" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-hero-foreground/10 bg-hero/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="font-display text-lg font-bold tracking-tight text-hero-foreground">
          AIXA<span className="text-hero-muted">TECH</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.slice(0, 1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/products"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
          >
            Products
          </Link>
          {navLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="gold-gradient px-5 py-2 font-display text-sm font-semibold transition-opacity hover:opacity-80"
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
            {navLinks.slice(0, 1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/products"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
            >
              Products
            </Link>
            {navLinks.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="gold-gradient mt-2 px-5 py-2 text-center font-display text-sm font-semibold"
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
