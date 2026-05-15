import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Programs" },
  { to: "/destinations", label: "Destinations" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" data-testid="brand-logo" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-[#003B5C] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Globe className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl font-medium text-[#003B5C]">Go Global Now</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-[#57534E]">Study in Australia</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? "text-[#003B5C] bg-[#F3F2EE]"
                    : "text-[#1C1917] hover:text-[#003B5C] hover:bg-[#F3F2EE]/60"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/contact"
          data-testid="header-cta"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#003B5C] text-white text-sm font-medium hover:bg-[#002940] hover:scale-105 transition-all"
        >
          Free Consultation
        </Link>

        <button
          data-testid="mobile-menu-toggle"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-[#003B5C]"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-white/40">
          <nav className="px-6 py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-${l.label.toLowerCase()}`}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? "bg-[#003B5C] text-white" : "text-[#1C1917]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              data-testid="mobile-cta"
              className="mt-2 px-4 py-3 rounded-xl bg-[#F59E0B] text-[#003B5C] font-medium text-center"
            >
              Free Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
