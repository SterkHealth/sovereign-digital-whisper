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
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(3,3,3,0.92)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#" className="font-display text-lg font-bold tracking-tight text-white">
          AIXA<span style={{ color: "#4ade80" }}>TECH</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {/* Platform */}
          <a
            href="#solutions"
            className="font-mono text-[11px] uppercase tracking-[0.1em] transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
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
              className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors"
              style={{ color: "rgba(255,255,255,0.45)" }}
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
                className="absolute left-1/2 top-full mt-3 w-60 -translate-x-1/2 rounded-xl py-1.5 shadow-2xl"
                style={{
                  background: "rgba(8,12,9,0.98)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(74,222,128,0.12)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(74,222,128,0.06)",
                }}
                onMouseEnter={showDrop}
                onMouseLeave={hideDrop}
              >
                {/* small arrow */}
                <div
                  className="absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45"
                  style={{ background: "rgba(8,12,9,0.98)", border: "1px solid rgba(74,222,128,0.12)", borderBottom: "none", borderRight: "none" }}
                />
                {productDropdown.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setDropOpen(false)}
                    className="block px-5 py-3 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = "#4ade80";
                      e.currentTarget.style.background = "rgba(74,222,128,0.06)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = "rgba(255,255,255,0.40)";
                      e.currentTarget.style.background = "transparent";
                    }}
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
            className="font-mono text-[11px] uppercase tracking-[0.1em] transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            How It Works
          </a>

          <a
            href="#contact"
            className="btn-neon rounded-lg px-5 py-2 font-display text-sm font-bold"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t px-6 py-6 md:hidden"
          style={{ background: "rgba(3,3,3,0.98)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col gap-4">
            <a
              href="#solutions"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-[0.1em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              Platform
            </a>

            {/* Mobile Products with sub-items */}
            <div>
              <button
                onClick={() => setMobileDropOpen(!mobileDropOpen)}
                className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.1em]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Products
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${mobileDropOpen ? "rotate-180" : ""}`}
                />
              </button>
              {mobileDropOpen && (
                <div className="mt-2 flex flex-col gap-2 pl-4" style={{ borderLeft: "1px solid rgba(74,222,128,0.15)" }}>
                  {productDropdown.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => { setOpen(false); setMobileDropOpen(false); }}
                      className="font-mono text-[10px] uppercase tracking-[0.1em]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
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
              className="font-mono text-[11px] uppercase tracking-[0.1em]"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              How It Works
            </a>

            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn-neon mt-2 rounded-lg px-5 py-2 text-center font-display text-sm font-bold"
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
