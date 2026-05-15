import { useI18n } from "../i18n";

// Partner universities & top Australian institutions
const partners = [
  "University of Sydney",
  "UNSW Sydney",
  "University of Melbourne",
  "Monash University",
  "University of Queensland",
  "RMIT University",
  "UTS Sydney",
  "University of Western Australia",
  "Griffith University",
  "Bond University",
  "Macquarie University",
  "Deakin University",
  "Curtin University",
  "QUT Brisbane",
];

export default function PartnerMarquee() {
  const { lang } = useI18n();
  const label = lang === "pt"
    ? "Parceiros — universidades e instituições de elite"
    : "Trusted partners — Australia's leading institutions";

  return (
    <section className="py-10 bg-white border-y border-[#E7E5E4]" data-testid="partner-marquee">
      <div className="text-center text-[10px] uppercase tracking-[0.3em] text-[#57534E] mb-6">
        {label}
      </div>
      <div className="overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="mx-6 sm:mx-10 flex-shrink-0 font-display text-xl sm:text-2xl text-[#003B5C]/70 hover:text-[#003B5C] transition-colors"
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
