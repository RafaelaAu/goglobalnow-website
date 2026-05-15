import { useI18n } from "../i18n";
import { Briefcase, Clock, TrendingUp, ArrowRight } from "lucide-react";

export default function WorkingStudying() {
  const { lang } = useI18n();
  const isPt = lang === "pt";

  const content = {
    eyebrow: isPt ? "Trabalhe enquanto estuda" : "Work while you study",
    title: isPt ? "Estude. Trabalhe. Conquiste." : "Study. Work. Thrive.",
    subtitle: isPt
      ? "O visto de estudante australiano (Subclass 500) permite que você trabalhe legalmente — e ganhe em dólar australiano."
      : "Your Australian student visa (Subclass 500) lets you work legally — and earn in Australian dollars.",
    cards: [
      {
        icon: Clock,
        stat: "48",
        unit: isPt ? "horas/quinzena" : "hrs/fortnight",
        title: isPt ? "Trabalho durante o semestre" : "Work during semester",
        desc: isPt ? "Até 48 horas a cada duas semanas durante o período letivo." : "Up to 48 hours every two weeks while classes are in session.",
      },
      {
        icon: Briefcase,
        stat: "∞",
        unit: isPt ? "férias" : "holidays",
        title: isPt ? "Trabalho ilimitado nas férias" : "Unlimited work in breaks",
        desc: isPt ? "Durante as férias escolares, você pode trabalhar quantas horas quiser." : "During scheduled breaks, work as many hours as you'd like.",
      },
      {
        icon: TrendingUp,
        stat: "AUD $24.95",
        unit: isPt ? "salário mínimo/hora" : "min wage/hour",
        title: isPt ? "Salário mínimo nacional" : "National minimum wage",
        desc: isPt ? "Um dos maiores do mundo — equivalente a R$ 85+/hora." : "Among the highest globally — equal to BRL R$85+/hour.",
      },
    ],
    footnote: isPt
      ? "Após formado, você ainda pode aplicar para o Temporary Graduate Visa (Subclass 485) e trabalhar de 2 a 4 anos na Austrália."
      : "After graduation you can apply for the Temporary Graduate Visa (Subclass 485) and work in Australia for 2–4 more years.",
  };

  return (
    <section className="py-24 lg:py-32 bg-white" data-testid="working-studying">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">{content.eyebrow}</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#003B5C] tracking-tight mb-6">
              {content.title}
            </h2>
            <p className="text-lg text-[#57534E] leading-relaxed mb-6">{content.subtitle}</p>
            <p className="text-sm text-[#57534E] leading-relaxed bg-[#F3F2EE] p-4 rounded-2xl border-l-4 border-[#F59E0B]">
              {content.footnote}
            </p>
          </div>
          <div className="lg:col-span-7 space-y-4">
            {content.cards.map((c, i) => (
              <div
                key={i}
                data-testid={`work-card-${i}`}
                className="bg-[#F9F8F6] border border-[#E7E5E4] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 card-hover"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-[#003B5C] flex items-center justify-center mb-3">
                    <c.icon className="w-6 h-6 text-[#F59E0B]" />
                  </div>
                  <div className="font-display text-4xl text-[#003B5C] leading-none">{c.stat}</div>
                  <div className="text-xs uppercase tracking-wider text-[#57534E] mt-1">{c.unit}</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-2xl text-[#003B5C] mb-2">{c.title}</h3>
                  <p className="text-[#57534E] leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
