import { useI18n } from "../i18n";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight, Sparkles } from "lucide-react";

export default function ScholarshipSpotlight() {
  const { lang } = useI18n();
  const isPt = lang === "pt";

  const scholarships = [
    {
      tag: isPt ? "Bolsa Universitária" : "University Scholarship",
      title: isPt ? "Bolsa de Excelência Acadêmica" : "Academic Excellence Scholarship",
      amount: "25%",
      desc: isPt
        ? "Para alunos com excelente histórico acadêmico em cursos de Bacharelado e Mestrado em universidades parceiras."
        : "For students with strong academic records pursuing Bachelor's or Master's at our partner universities.",
      bg: "from-[#003B5C] to-[#002940]",
      tagColor: "text-[#F59E0B]",
    },
    {
      tag: isPt ? "Bolsa Profissionalizante" : "Vocational Scholarship",
      title: isPt ? "Programa VET Pathway" : "VET Pathway Program",
      amount: "AUD $3,000",
      desc: isPt
        ? "Desconto direto em cursos VET de Negócios, TI, Hospitalidade e Saúde com nossas escolas parceiras."
        : "Direct discount on VET courses in Business, IT, Hospitality and Health with partner schools.",
      bg: "from-[#F59E0B] to-[#D97706]",
      tagColor: "text-[#003B5C]",
    },
    {
      tag: isPt ? "Bolsa de Inglês" : "English Scholarship",
      title: isPt ? "Programa ELICOS Brasil" : "ELICOS Brazil Program",
      amount: isPt ? "Até 4 semanas grátis" : "Up to 4 weeks free",
      desc: isPt
        ? "Estudantes brasileiros que matricularem 24+ semanas de inglês ganham até 4 semanas extras gratuitas."
        : "Brazilian students enrolling 24+ weeks of English get up to 4 bonus weeks free of charge.",
      bg: "from-[#0EA5E9] to-[#0369A1]",
      tagColor: "text-white",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#F9F8F6]" data-testid="scholarship-spotlight">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-end">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">
              <Trophy className="w-3 h-3" /> {isPt ? "Bolsas em Destaque" : "Scholarship Spotlight"}
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#003B5C] tracking-tight">
              {isPt ? "Pague menos. Sonhe mais alto." : "Pay less. Dream bigger."}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#57534E] text-lg leading-relaxed">
              {isPt
                ? "Trabalhamos com instituições que oferecem bolsas exclusivas. Aqui estão 3 das nossas favoritas — fale com um agente para descobrir todas as opções."
                : "We work with institutions offering exclusive scholarships. Here are 3 favourites — talk to an agent to unlock the full list."}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {scholarships.map((s, i) => (
            <div
              key={i}
              data-testid={`scholarship-${i}`}
              className={`relative rounded-3xl overflow-hidden card-hover bg-gradient-to-br ${s.bg} p-8 text-white min-h-[340px] flex flex-col justify-between`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className={`text-[10px] uppercase tracking-[0.25em] font-bold mb-3 ${s.tagColor}`}>{s.tag}</div>
                <h3 className="font-display text-2xl sm:text-3xl mb-3 leading-tight">{s.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{s.desc}</p>
              </div>
              <div className="relative pt-4 border-t border-white/20 flex items-end justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider opacity-70 mb-1">
                    {isPt ? "Benefício" : "Benefit"}
                  </div>
                  <div className="font-display text-3xl">{s.amount}</div>
                </div>
                <Sparkles className="w-6 h-6 opacity-60" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            data-testid="scholarship-cta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#003B5C] text-white hover:bg-[#002940] hover:scale-105 transition-all"
          >
            {isPt ? "Veja todas as bolsas" : "See all scholarships"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
