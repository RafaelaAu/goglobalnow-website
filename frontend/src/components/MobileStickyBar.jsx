import { Link } from "react-router-dom";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import { useI18n } from "../i18n";

export default function MobileStickyBar() {
  const { lang } = useI18n();
  const isPt = lang === "pt";

  return (
    <div
      data-testid="mobile-sticky-bar"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-[#E7E5E4] shadow-2xl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-3 gap-1 p-2 pr-44 sm:pr-2">
        <a
          href="tel:+61401864097"
          data-testid="mobile-call"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl text-[#003B5C] hover:bg-[#F3F2EE]"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">{isPt ? "Ligar" : "Call"}</span>
        </a>
        <a
          href="https://wa.me/61401864097"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="mobile-wa"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-[#25D366] text-white"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">WhatsApp</span>
        </a>
        <Link
          to="/contact"
          data-testid="mobile-book"
          className="flex flex-col items-center justify-center gap-1 py-2 rounded-xl bg-[#003B5C] text-white"
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] font-medium uppercase tracking-wider">{isPt ? "Agendar" : "Book"}</span>
        </Link>
      </div>
    </div>
  );
}
