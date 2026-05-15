import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useI18n } from "../i18n";
import { trackEvent } from "../lib/analytics";
import { Calculator, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Living costs per city (AUD/year) based on Study Australia (studyaustralia.gov.au)
// = average weekly rent + other expenses (food, transport, utilities, etc.) × 52
const CITY_DATA = {
  "Sydney":     { weekly_rent: [235, 440], rent_avg: 340, other_weekly: 250, label: "Sydney" },
  "Melbourne":  { weekly_rent: [220, 420], rent_avg: 320, other_weekly: 250, label: "Melbourne" },
  "Brisbane":   { weekly_rent: [195, 390], rent_avg: 290, other_weekly: 230, label: "Brisbane" },
  "Gold Coast": { weekly_rent: [195, 380], rent_avg: 285, other_weekly: 225, label: "Gold Coast" },
  "Perth":      { weekly_rent: [200, 385], rent_avg: 290, other_weekly: 220, label: "Perth" },
};

// Tuition estimates per program (AUD/year) — Study Australia ranges
const PROGRAM_COSTS = {
  "ELICOS":      { tuition: 20000, label_en: "English (ELICOS)",   label_pt: "Inglês (ELICOS)" },
  "VET":         { tuition: 12000, label_en: "Vocational (VET)",   label_pt: "Profissionalizante (VET)" },
  "High School": { tuition: 17000, label_en: "High School",        label_pt: "Ensino Médio" },
  "University":  { tuition: 32000, label_en: "University",         label_pt: "Universidade" },
};

const DURATIONS = [
  { val: 0.5, en: "6 months", pt: "6 meses" },
  { val: 1, en: "1 year", pt: "1 ano" },
  { val: 2, en: "2 years", pt: "2 anos" },
  { val: 3, en: "3+ years", pt: "3+ anos" },
];

const AUD_TO_BRL = 3.4;

export default function CostQuiz() {
  const { lang, t } = useI18n();
  const isPt = lang === "pt";
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ program: "", city: "", duration: 0, english: "", email: "", name: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const tuition = data.program ? PROGRAM_COSTS[data.program].tuition * data.duration : 0;
  const cityInfo = data.city ? CITY_DATA[data.city] : null;
  const livingWeekly = cityInfo ? cityInfo.rent_avg + cityInfo.other_weekly : 0;
  const living = Math.round(livingWeekly * 52 * data.duration);
  const totalAUD = tuition + living;
  const totalBRL = totalAUD * AUD_TO_BRL;

  const labels = {
    eyebrow: isPt ? "Calculadora de Custos" : "Cost Calculator",
    title: isPt ? "Quanto custa estudar na Austrália?" : "How much does it cost to study in Australia?",
    subtitle: isPt
      ? "Descubra em 4 passos. Valores baseados no governo australiano (studyaustralia.gov.au)."
      : "Find out in 4 quick steps. Figures based on the Australian government (studyaustralia.gov.au).",
    step1: isPt ? "Qual curso te interessa?" : "Which program interests you?",
    step2: isPt ? "Em qual cidade?" : "Which city?",
    step3: isPt ? "Por quanto tempo?" : "For how long?",
    step4: isPt ? "Seu nível de inglês?" : "Your English level?",
    step5: isPt ? "Receba sua estimativa" : "Get your estimate",
    name: isPt ? "Nome" : "Name",
    email: isPt ? "E-mail" : "Email",
    cta: isPt ? "Ver minha estimativa" : "See my estimate",
    sending: isPt ? "Enviando..." : "Sending...",
    next: isPt ? "Próximo" : "Next",
    back: isPt ? "Voltar" : "Back",
    estimate: isPt ? "Estimativa Total" : "Total Estimate",
    tuition: isPt ? "Mensalidades" : "Tuition",
    living: isPt ? "Custo de Vida" : "Living Costs",
    success: isPt ? "Estimativa enviada!" : "Estimate sent!",
    success_body: isPt
      ? "Enviamos sua estimativa completa + bolsas disponíveis pro seu e-mail. Um agente também entrará em contato."
      : "We've emailed your full estimate + available scholarships. An agent will also reach out shortly.",
    again: isPt ? "Fazer outra estimativa" : "Run another estimate",
    source: isPt
      ? "Dados de custos baseados no calculador oficial do governo australiano (studyaustralia.gov.au). Valores aproximados — câmbio AUD→BRL: 3,4."
      : "Cost data based on the official Australian government calculator (studyaustralia.gov.au). Approximate values — AUD→BRL rate: 3.4.",
    official_link: isPt ? "Veja o calculador oficial detalhado" : "View the official detailed calculator",
    rent_label: isPt ? "Aluguel (média semanal)" : "Rent (avg weekly)",
    other_label: isPt ? "Outras despesas/semana" : "Other expenses/week",
    weekly_total: isPt ? "Total semanal" : "Weekly total",
  };

  const englishLevels = isPt
    ? ["Iniciante", "Intermediário", "Avançado", "Nativo"]
    : ["Beginner", "Intermediate", "Advanced", "Native"];

  const submit = async () => {
    if (!data.name || !data.email) {
      toast.error(isPt ? "Preencha nome e e-mail" : "Please add your name and email");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, {
        full_name: data.name,
        email: data.email,
        phone: "Quiz lead",
        country: "Brazil",
        program_interest: data.program,
        preferred_destination: data.city,
        english_level: data.english,
        intake_date: `${data.duration} year(s)`,
        message: `[QUIZ] Estimated cost: AUD $${totalAUD.toLocaleString()} (BRL R$ ${Math.round(totalBRL).toLocaleString()})`,
      });
      trackEvent("quiz_complete", {
        program: data.program,
        city: data.city,
        duration: data.duration,
        value: totalAUD,
        currency: "AUD",
      });
      setSubmitted(true);
      toast.success(labels.success);
    } catch (e) {
      toast.error(isPt ? "Erro. Tente novamente." : "Something went wrong.");
    }
    setLoading(false);
  };

  const reset = () => {
    setSubmitted(false);
    setStep(0);
    setData({ program: "", city: "", duration: 0, english: "", email: "", name: "" });
  };

  const canNext = [
    () => !!data.program,
    () => !!data.city,
    () => !!data.duration,
    () => !!data.english,
  ];

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-[#F9F8F6] to-[#F3F2EE]" data-testid="cost-quiz">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F59E0B]/10 text-[#003B5C] text-xs tracking-[0.2em] uppercase font-semibold mb-4">
            <Calculator className="w-3 h-3" /> {labels.eyebrow}
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#003B5C] tracking-tight max-w-3xl mx-auto text-balance">
            {labels.title}
          </h2>
          <p className="mt-5 text-lg text-[#57534E] max-w-2xl mx-auto">{labels.subtitle}</p>
        </div>

        <div className="bg-white border border-[#E7E5E4] rounded-3xl shadow-xl overflow-hidden">
          {!submitted ? (
            <>
              <div className="px-6 sm:px-10 pt-6 flex items-center gap-2">
                {[0, 1, 2, 3, 4].map((s) => (
                  <div key={s} className={`flex-1 h-1.5 rounded-full transition-all ${s <= step ? "bg-[#F59E0B]" : "bg-[#E7E5E4]"}`} />
                ))}
              </div>

              <div className="p-6 sm:p-10 lg:p-12 min-h-[340px]">
                {step === 0 && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-3xl text-[#003B5C] mb-6">{labels.step1}</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {Object.keys(PROGRAM_COSTS).map((p) => (
                        <button
                          key={p}
                          data-testid={`quiz-program-${p.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => { update("program", p); setStep(1); }}
                          className={`text-left p-5 rounded-2xl border-2 transition-all ${
                            data.program === p
                              ? "border-[#003B5C] bg-[#003B5C] text-white"
                              : "border-[#E7E5E4] hover:border-[#F59E0B] bg-[#F9F8F6]"
                          }`}
                        >
                          <div className="font-medium text-lg">{isPt ? PROGRAM_COSTS[p].label_pt : PROGRAM_COSTS[p].label_en}</div>
                          <div className={`text-xs mt-1 ${data.program === p ? "text-white/70" : "text-[#57534E]"}`}>
                            ~AUD ${PROGRAM_COSTS[p].tuition.toLocaleString()}/{isPt ? "ano" : "year"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-3xl text-[#003B5C] mb-6">{labels.step2}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {Object.keys(CITY_DATA).map((c) => (
                        <button
                          key={c}
                          data-testid={`quiz-city-${c.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => { update("city", c); setStep(2); }}
                          className={`p-4 rounded-2xl border-2 transition-all text-left ${
                            data.city === c
                              ? "border-[#003B5C] bg-[#003B5C] text-white"
                              : "border-[#E7E5E4] hover:border-[#F59E0B] bg-[#F9F8F6]"
                          }`}
                        >
                          <div className="font-medium">{c}</div>
                          <div className={`text-[11px] mt-1 ${data.city === c ? "text-white/70" : "text-[#57534E]"}`}>
                            AUD ${CITY_DATA[c].weekly_rent[0]}–${CITY_DATA[c].weekly_rent[1]}/wk {isPt ? "aluguel" : "rent"}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-3xl text-[#003B5C] mb-6">{labels.step3}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {DURATIONS.map((d) => (
                        <button
                          key={d.val}
                          data-testid={`quiz-duration-${d.val}`}
                          onClick={() => { update("duration", d.val); setStep(3); }}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            data.duration === d.val
                              ? "border-[#003B5C] bg-[#003B5C] text-white"
                              : "border-[#E7E5E4] hover:border-[#F59E0B] bg-[#F9F8F6]"
                          }`}
                        >
                          <div className="font-medium">{isPt ? d.pt : d.en}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-3xl text-[#003B5C] mb-6">{labels.step4}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {englishLevels.map((l) => (
                        <button
                          key={l}
                          data-testid={`quiz-english-${l.toLowerCase()}`}
                          onClick={() => { update("english", l); setStep(4); }}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            data.english === l
                              ? "border-[#003B5C] bg-[#003B5C] text-white"
                              : "border-[#E7E5E4] hover:border-[#F59E0B] bg-[#F9F8F6]"
                          }`}
                        >
                          <div className="font-medium">{l}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="animate-fade-in">
                    <h3 className="font-display text-3xl text-[#003B5C] mb-2">{labels.step5}</h3>
                    <div className="bg-gradient-to-br from-[#003B5C] to-[#002940] rounded-3xl p-6 mb-4 text-white">
                      <div className="flex items-center gap-2 text-[#F59E0B] text-xs uppercase tracking-[0.2em] mb-3">
                        <Sparkles className="w-3 h-3" /> {labels.estimate}
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-xs text-white/60 uppercase tracking-wider">{labels.tuition}</div>
                          <div className="font-display text-2xl">AUD ${tuition.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-xs text-white/60 uppercase tracking-wider">{labels.living}</div>
                          <div className="font-display text-2xl">AUD ${living.toLocaleString()}</div>
                        </div>
                        <div className="sm:border-l sm:border-white/20 sm:pl-4">
                          <div className="text-xs text-[#F59E0B] uppercase tracking-wider">Total</div>
                          <div className="font-display text-3xl text-[#F59E0B]">AUD ${totalAUD.toLocaleString()}</div>
                          <div className="text-xs text-white/60 mt-1">≈ BRL R$ {Math.round(totalBRL).toLocaleString()}</div>
                        </div>
                      </div>
                      {cityInfo && (
                        <div className="pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-[11px]">
                          <div>
                            <span className="text-white/50 uppercase tracking-wider block">{labels.rent_label}</span>
                            <span className="font-medium">${cityInfo.rent_avg}/wk</span>
                          </div>
                          <div>
                            <span className="text-white/50 uppercase tracking-wider block">{labels.other_label}</span>
                            <span className="font-medium">${cityInfo.other_weekly}/wk</span>
                          </div>
                          <div>
                            <span className="text-[#F59E0B] uppercase tracking-wider block">{labels.weekly_total}</span>
                            <span className="font-medium">${livingWeekly}/wk</span>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-[#57534E] mb-2 leading-relaxed">
                      {labels.source}
                    </p>
                    <a
                      href="https://costofliving.studyaustralia.gov.au"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="quiz-official-link"
                      className="inline-flex items-center gap-1 text-[11px] text-[#003B5C] hover:text-[#F59E0B] underline underline-offset-2 mb-4"
                    >
                      {labels.official_link} <ArrowRight className="w-3 h-3" />
                    </a>
                    <div className="space-y-3">
                      <input
                        data-testid="quiz-name"
                        value={data.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder={labels.name}
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#E7E5E4] focus:outline-none focus:border-[#003B5C]"
                      />
                      <input
                        data-testid="quiz-email"
                        type="email"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder={labels.email}
                        className="w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#E7E5E4] focus:outline-none focus:border-[#003B5C]"
                      />
                      <button
                        onClick={submit}
                        disabled={loading}
                        data-testid="quiz-submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F59E0B] text-[#003B5C] font-semibold hover:bg-[#fbbf24] disabled:opacity-60 transition-all"
                      >
                        {loading ? labels.sending : labels.cta} <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {step > 0 && step < 4 && (
                <div className="px-6 sm:px-10 pb-6">
                  <button
                    onClick={() => setStep(step - 1)}
                    data-testid="quiz-back"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#57534E] hover:bg-[#F3F2EE]"
                  >
                    <ArrowLeft className="w-4 h-4" /> {labels.back}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="p-12 text-center animate-fade-in" data-testid="quiz-success">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#F59E0B] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#003B5C]" />
              </div>
              <h3 className="font-display text-3xl text-[#003B5C] mb-3">{labels.success}</h3>
              <p className="text-[#57534E] mb-2 max-w-lg mx-auto">{labels.success_body}</p>
              <div className="my-6 inline-block bg-[#F3F2EE] rounded-2xl px-6 py-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#57534E]">{labels.estimate}</div>
                <div className="font-display text-3xl text-[#003B5C]">AUD ${totalAUD.toLocaleString()}</div>
                <div className="text-xs text-[#57534E]">≈ BRL R$ {Math.round(totalBRL).toLocaleString()}</div>
              </div>
              <div>
                <button onClick={reset} className="text-sm text-[#003B5C] underline hover:text-[#F59E0B]">{labels.again}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
