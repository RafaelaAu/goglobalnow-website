import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useI18n } from "../i18n";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useI18n();

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/programs", label: t("nav.programs") },
    { to: "/destinations", label: t("nav.destinations") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ];

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
      <UrgencyBanner />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" data-testid="brand-logo" className="flex items-center gap-3 group">
          <img src="/assets/logo.jpeg" alt="Go Global Now" className="w-12 h-12 rounded-full object-cover ring-2 ring-white/60 shadow-sm group-hover:scale-105 transition-transform" />
          <div className="leading-tight hidden sm:block">
            <div className="font-display text-xl font-medium text-[#003B5C]">Go Global Now</div>
            <div className="text-[10px] tracking-[0.25em] uppercase text-[#F59E0B] font-semibold">Intercâmbio</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`nav-${l.to.replace('/', '') || 'home'}`}
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

        <div className="hidden lg:flex items-center gap-3">
          <div className="flex items-center bg-[#F3F2EE] rounded-full p-1 text-xs font-semibold" data-testid="language-switcher">
            <button
              data-testid="lang-en"
              onClick={() => setLang("en")}
              className={`px-3 py-1 rounded-full transition-all ${lang === "en" ? "bg-[#003B5C] text-white" : "text-[#57534E]"}`}
            >EN</button>
            <button
              data-testid="lang-pt"
              onClick={() => setLang("pt")}
              className={`px-3 py-1 rounded-full transition-all ${lang === "pt" ? "bg-[#003B5C] text-white" : "text-[#57534E]"}`}
            >PT</button>
          </div>
          <Link
            to="/contact"
            data-testid="header-cta"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#003B5C] text-white text-sm font-medium hover:bg-[#002940] hover:scale-105 transition-all"
          >
            {t("cta.free_consultation")}
          </Link>
        </div>

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
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium ${
                    isActive ? "bg-[#003B5C] text-white" : "text-[#1C1917]"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <div className="flex items-center justify-center gap-2 my-2">
              <button onClick={() => setLang("en")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${lang === "en" ? "bg-[#003B5C] text-white" : "bg-[#F3F2EE]"}`}>EN</button>
              <button onClick={() => setLang("pt")} className={`px-4 py-1.5 rounded-full text-xs font-semibold ${lang === "pt" ? "bg-[#003B5C] text-white" : "bg-[#F3F2EE]"}`}>PT</button>
            </div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-xl bg-[#F59E0B] text-[#003B5C] font-medium text-center"
            >
              {t("cta.free_consultation")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
