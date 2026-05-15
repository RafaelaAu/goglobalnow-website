import { useI18n } from "../i18n";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, FileText, Plane, GraduationCap, MessageCircle } from "lucide-react";

export default function Pathway() {
  const { lang } = useI18n();
  const isPt = lang === "pt";
  const [active, setActive] = useState(0);

  const steps = [
    {
      icon: MessageCircle,
      week: isPt ? "Semana 1" : "Week 1",
      title: isPt ? "Consultoria gratuita" : "Free consultation",
      desc: isPt
        ? "Conversa com agente certificado QEAC para entender seus objetivos, orçamento e perfil."
        : "Chat with a QEAC certified agent to map your goals, budget, and profile.",
    },
    {
      icon: Search,
      week: isPt ? "Semanas 2–3" : "Weeks 2–3",
      title: isPt ? "Escolha do curso & escola" : "Course & school selection",
      desc: isPt
        ? "Selecionamos as melhores opções de cursos e instituições parceiras pra você."
        : "We hand-pick the best courses and partner institutions for your goals.",
    },
    {
      icon: FileText,
      week: isPt ? "Semanas 4–6" : "Weeks 4–6",
      title: isPt ? "Inscrição & CoE" : "Application & CoE",
      desc: isPt
        ? "Cuidamos de toda a aplicação, documentos e obtemos sua Carta de Confirmação (CoE)."
        : "We handle the full application, documents and obtain your Confirmation of Enrolment (CoE).",
    },
    {
      icon: Plane,
      week: isPt ? "Semanas 7–14" : "Weeks 7–14",
      title: isPt ? "Visto & preparação" : "Visa & pre-departure",
      desc: isPt
        ? "Aplicação do Subclass 500, seguro saúde (OSHC), acomodação e checklist de embarque."
        : "Subclass 500 visa lodgement, OSHC health cover, accommodation and pre-departure checklist.",
    },
    {
      icon: GraduationCap,
      week: isPt ? "Dia 1" : "Day 1",
      title: isPt ? "Chegada & integração" : "Arrival & onboarding",
      desc: isPt
        ? "Recepção no aeroporto, abertura de conta, SIM card e suas primeiras aulas. Bem-vindo(a)!"
        : "Airport pickup, bank account setup, SIM card and your first day at school. Welcome to Australia!",
    },
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#003B5C] text-white grain" data-testid="pathway">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">
            {isPt ? "Sua Jornada" : "Your Journey"}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-3xl mx-auto">
            {isPt ? "Do sonho à chegada — em poucos meses." : "From dream to arrival — in just a few months."}
          </h2>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute left-0 right-0 top-12 h-0.5 bg-white/10" />
          <div className="grid grid-cols-5 gap-4 relative">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                data-testid={`pathway-step-${i}`}
                className="text-left group"
              >
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                  active === i ? "bg-[#F59E0B] scale-110" : "bg-white/5 group-hover:bg-white/10"
                }`}>
                  <s.icon className={`w-8 h-8 ${active === i ? "text-[#003B5C]" : "text-[#F59E0B]"}`} />
                </div>
                <div className={`text-center transition-opacity ${active === i ? "opacity-100" : "opacity-50 group-hover:opacity-80"}`}>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#F59E0B] mb-1">{s.week}</div>
                  <div className="font-display text-xl mb-2">{s.title}</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-12 max-w-2xl mx-auto text-center min-h-[80px]">
            <p className="text-lg text-white/80 leading-relaxed animate-fade-in" key={active}>
              {steps[active].desc}
            </p>
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden space-y-6 max-w-md mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#F59E0B] flex items-center justify-center flex-shrink-0">
                  <s.icon className="w-6 h-6 text-[#003B5C]" />
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-white/20 my-2" />}
              </div>
              <div className="pb-6">
                <div className="text-xs uppercase tracking-[0.2em] text-[#F59E0B] mb-1">{s.week}</div>
                <div className="font-display text-xl mb-1">{s.title}</div>
                <p className="text-sm text-white/70 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            data-testid="pathway-cta"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F59E0B] text-[#003B5C] font-semibold hover:bg-[#fbbf24] hover:scale-105 transition-all"
          >
            {isPt ? "Comece sua jornada" : "Start your journey"} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
