import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n";
import { Sparkles, ArrowRight, X } from "lucide-react";

// Compute the next major Australian intake (Feb / Jul) dynamically
function getNextIntake() {
  const now = new Date();
  const year = now.getFullYear();
  const intakes = [
    new Date(`${year}-02-09T00:00:00Z`),
    new Date(`${year}-07-13T00:00:00Z`),
    new Date(`${year + 1}-02-09T00:00:00Z`),
  ];
  return intakes.find((d) => d.getTime() > now.getTime());
}

function formatIntake(d, lang) {
  if (!d) return "";
  const months_en = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const months_pt = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  const m = lang === "pt" ? months_pt[d.getUTCMonth()] : months_en[d.getUTCMonth()];
  return `${d.getUTCDate()} ${m} ${d.getUTCFullYear()}`;
}

function getCountdown() {
  const target = getNextIntake();
  if (!target) return null;
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  return { days, hours, target };
}

export default function UrgencyBanner() {
  const { lang } = useI18n();
  const isPt = lang === "pt";
  const [closed, setClosed] = useState(() => sessionStorage.getItem("ggn_banner_closed") === "1");
  const [cd, setCd] = useState(getCountdown());

  useEffect(() => {
    const id = setInterval(() => setCd(getCountdown()), 60000);
    return () => clearInterval(id);
  }, []);

  if (closed || !cd) return null;

  return (
    <div data-testid="urgency-banner" className="bg-[#003B5C] text-white relative z-[60]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2 flex items-center justify-center gap-3 text-xs sm:text-sm">
        <Sparkles className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
        <span className="text-center">
          {isPt ? "Próxima entrada:" : "Next intake:"} {formatIntake(cd.target, lang)} —{" "}
          <strong className="text-[#F59E0B]">
            {cd.days}d {cd.hours}h
          </strong>{" "}
          {isPt ? "restantes" : "remaining"}.{" "}
          <Link to="/contact" className="underline underline-offset-2 hover:text-[#F59E0B] inline-flex items-center gap-1">
            {isPt ? "Garanta sua vaga" : "Secure your spot"} <ArrowRight className="w-3 h-3" />
          </Link>
        </span>
        <button
          onClick={() => { setClosed(true); sessionStorage.setItem("ggn_banner_closed", "1"); }}
          data-testid="urgency-close"
          className="absolute right-3 sm:right-6 p-1 hover:bg-white/10 rounded-full"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
