import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#solutions" },
  { label: "How It Works", href: "#what-we-build" },
];

const productDropdown = [
  { label: "Platform as a Service", href: "/products#paas" },
  { label: "Data as a Service",     href: "/products#daas" },
  { label: "Sovereign AI Infrastructure", href: "/products#sovereign" },
];

const Navbar = () => {
  const [open, setOpen]             = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const [mobileDropOpen, setMobileDropOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showDrop = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setDropOpen(true);
  };
  const hideDrop = () => {
    hideTimer.current = setTimeout(() => setDropOpen(false), 120);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-hero-foreground/10 bg-hero/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="font-display text-lg font-bold tracking-tight text-hero-foreground">
          AIXA<span className="text-hero-muted">TECH</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Platform */}
          <a
            href="#solutions"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
          >
            Platform
          </a>

          {/* Products with dropdown */}
          <div
            className="relative"
            onMouseEnter={showDrop}
            onMouseLeave={hideDrop}
          >
            <Link
              to="/products"
              className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
            >
              Products
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`}
              />
            </Link>

            {/* Dropdown panel */}
            {dropOpen && (
              <div
                className="absolute left-1/2 top-full mt-3 w-56 -translate-x-1/2 border border-white/10 py-1 shadow-xl"
                style={{ background: "rgba(5,16,8,0.97)", backdropFilter: "blur(12px)" }}
                onMouseEnter={showDrop}
                onMouseLeave={hideDrop}
              >
                {/* small arrow */}
                <div
                  className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-l border-t border-white/10"
                  style={{ background: "rgba(5,16,8,0.97)" }}
                />
                {productDropdown.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setDropOpen(false)}
                    className="block px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* How It Works */}
          <a
            href="#what-we-build"
            className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
          >
            How It Works
          </a>

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
            <a
              href="#solutions"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
            >
              Platform
            </a>

            {/* Mobile Products with sub-items */}
            <div>
              <button
                onClick={() => setMobileDropOpen(!mobileDropOpen)}
                className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
              >
                Products
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${mobileDropOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileDropOpen && (
                <div className="mt-2 flex flex-col gap-2 pl-4 border-l border-white/10">
                  {productDropdown.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => { setOpen(false); setMobileDropOpen(false); }}
                      className="font-mono text-[10px] uppercase tracking-[0.1em] text-white/40 transition-colors hover:text-white/70"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#what-we-build"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.1em] text-hero-muted transition-colors hover:text-hero-foreground"
            >
              How It Works
            </a>

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
