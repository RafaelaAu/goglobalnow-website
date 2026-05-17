import { useI18n } from "../i18n";

export default function PartnerMarquee() {
  const { lang } = useI18n();
  const isPt = lang === "pt";

  const items = isPt
    ? [
        "QEAC Certificado",
        "Especialistas ELICOS",
        "Especialistas VET",
        "Brasil → Austrália",
        "Atendimento Personalizado",
        "100% Taxa de Sucesso de Visto",
        "Orientação Ética",
        "Acesso a Universidades sob demanda",
      ]
    : [
        "QEAC Certified",
        "ELICOS Specialists",
        "VET Pathway Experts",
        "Brazil → Australia",
        "Personalised 1:1 Service",
        "100% Visa Success Rate",
        "Ethical Guidance",
        "University Access on Request",
      ];

  const label = isPt ? "Por que escolher a Go Global Now" : "Why Go Global Now";

  return (
    <section className="py-10 bg-white border-y border-[#E7E5E4]" data-testid="partner-marquee">
      <div className="text-center text-[10px] uppercase tracking-[0.3em] text-[#57534E] mb-6">
        {label}
      </div>
      <div className="overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee whitespace-nowrap">
          {[...items, ...items].map((p, i) => (
            <div
              key={i}
              className="mx-6 sm:mx-10 flex-shrink-0 font-display text-xl sm:text-2xl text-[#003B5C]/70 flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

