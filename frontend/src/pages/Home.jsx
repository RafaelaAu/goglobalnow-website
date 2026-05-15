import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Award, CheckCircle2, GraduationCap, Globe2, Heart, Sparkles, Star } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const programs = [
  {
    title: "English Courses",
    subtitle: "ELICOS",
    description: "General English, Academic Purposes, IELTS/Cambridge Prep, Business English.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Vocational",
    subtitle: "VET",
    description: "Career-focused training in Business, IT, Nursing, Engineering & Design.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "High School",
    subtitle: "Years 7–12",
    description: "Public & private schools for international students aged 12–18.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Higher Education",
    subtitle: "University",
    description: "Bachelors, Masters, PhDs & Graduate Diplomas at top Australian universities.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    span: "md:col-span-2",
  },
];

const destinations = [
  { name: "Sydney", tag: "Iconic & Multicultural", image: "https://images.unsplash.com/photo-1687443105981-69e550f59fea?auto=format&fit=crop&w=800&q=80" },
  { name: "Melbourne", tag: "Creative & Dynamic", image: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&w=800&q=80" },
  { name: "Brisbane", tag: "Warm & Welcoming", image: "https://images.unsplash.com/photo-1572125675722-238a4f1f8ea3?auto=format&fit=crop&w=800&q=80" },
  { name: "Gold Coast", tag: "Beaches & Lifestyle", image: "https://images.unsplash.com/photo-1626070191915-0ae0d9089132?auto=format&fit=crop&w=800&q=80" },
  { name: "Perth", tag: "Booming & Beautiful", image: "https://images.unsplash.com/photo-1592538910490-7cbb01d31b69?auto=format&fit=crop&w=800&q=80" },
];

const testimonials = [
  {
    quote: "Go Global Now made my dream of studying in Sydney real. From visa to enrolment, everything was handled with care.",
    name: "Mariana S.",
    role: "Bachelor of Business, UTS Sydney",
  },
  {
    quote: "Their QEAC agents found me a scholarship I didn't even know existed. Best decision of my life.",
    name: "Lucas F.",
    role: "Master of IT, Melbourne",
  },
  {
    quote: "Friendly, ethical, and incredibly knowledgeable. They felt like family from day one.",
    name: "Camila R.",
    role: "ELICOS + VET Nursing, Brisbane",
  },
];

const faqs = [
  { q: "How much does it cost to study in Australia?", a: "Tuition ranges from AUD $7,000 (ELICOS) to AUD $35,000+/year (university). Living costs average AUD $24,500/year. We help you find scholarships and affordable pathways." },
  { q: "Can I work while studying?", a: "Yes — student visa (Subclass 500) allows up to 48 hours per fortnight during term and unlimited hours during scheduled breaks." },
  { q: "What is QEAC certification?", a: "Qualified Education Agent Counsellor — an Australian government-recognised credential ensuring ethical, expert advice. All our agents are QEAC certified." },
  { q: "Do I need IELTS?", a: "Most programs require IELTS, but we offer pathways including direct entry through ELICOS courses if your English needs strengthening." },
  { q: "How long does the visa process take?", a: "Typically 4–8 weeks once you have your Confirmation of Enrolment (CoE). We guide you end-to-end." },
];

export default function Home() {
  const [stats, setStats] = useState({ students_helped: 1200, partner_institutions: 85, years_experience: 7, success_rate: 98 });

  useEffect(() => {
    axios.get(`${API}/stats`).then((r) => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center -mt-20 pt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2400&q=85"
            alt="Sydney skyline at sunset"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-32 grid lg:grid-cols-12 gap-8 items-end w-full">
          <div className="lg:col-span-8 text-white animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs tracking-[0.2em] uppercase mb-8">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              QEAC Certified • Brazil to Australia
            </div>
            <h1 className="font-display font-medium text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.95] tracking-tight text-balance">
              Study & Work in <em className="gradient-text not-italic">Australia.</em>
              <br />Your global journey<br />starts here.
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-white/80 max-w-2xl font-light leading-relaxed">
              World-class education, vibrant cities and unforgettable experiences — guided by certified agents who treat your dream like their own.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                data-testid="hero-book-consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#F59E0B] text-[#003B5C] font-semibold hover:bg-[#fbbf24] hover:scale-105 transition-all"
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/61280029276"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/20 transition-all"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-4 animate-fade-up delay-300">
            {[
              { num: `${stats.students_helped}+`, label: "Students Placed" },
              { num: `${stats.partner_institutions}+`, label: "Partner Institutions" },
              { num: `${stats.years_experience}+`, label: "Years of Expertise" },
              { num: `${stats.success_rate}%`, label: "Visa Success Rate" },
            ].map((s, i) => (
              <div key={i} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-5 text-white">
                <div className="font-display text-4xl text-[#F59E0B] font-medium">{s.num}</div>
                <div className="text-xs uppercase tracking-wider text-white/70 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-xs tracking-[0.3em] uppercase animate-float">
          Scroll
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-24 lg:py-32 bg-[#F9F8F6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="font-display text-5xl text-[#F59E0B] mb-6">"</div>
          <p className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#003B5C] leading-tight text-balance">
            The world is like a book, and those who do not travel read only one page.
          </p>
          <div className="mt-8 text-sm uppercase tracking-[0.3em] text-[#57534E]">— Saint Augustine</div>
        </div>
      </section>

      {/* PROGRAMS BENTO */}
      <section className="py-24 bg-[#F3F2EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Our Programs</div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#003B5C] tracking-tight max-w-2xl">
                Choose your path to a global future.
              </h2>
            </div>
            <Link to="/programs" className="inline-flex items-center gap-2 text-[#003B5C] font-medium hover:text-[#F59E0B]" data-testid="programs-link">
              All programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-4 md:auto-rows-[280px] gap-4">
            {programs.map((p, i) => (
              <div
                key={i}
                data-testid={`program-card-${i}`}
                className={`relative rounded-3xl overflow-hidden group card-hover ${p.span || ""}`}
              >
                <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C] via-[#003B5C]/30 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#F59E0B] mb-2">{p.subtitle}</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium mb-2">{p.title}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Why Go Global Now</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#003B5C] tracking-tight mb-6">
              Your success is our <em className="text-[#F59E0B] not-italic">obsession.</em>
            </h2>
            <p className="text-lg text-[#57534E] leading-relaxed mb-10">
              We don't just place students — we craft journeys. With QEAC certified agents and a Brazil-to-Australia network, we walk with you every step.
            </p>
            <div className="space-y-5">
              {[
                { icon: Award, title: "QEAC Certified Agents", desc: "Government-recognised qualifications for ethical, expert advice." },
                { icon: Heart, title: "Personalised Support", desc: "One agent, end-to-end — from course selection to your arrival in Australia." },
                { icon: CheckCircle2, title: "Ethical Guidance", desc: "We recommend what's right for you, not what pays us most." },
              ].map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#003B5C] flex items-center justify-center flex-shrink-0">
                    <f.icon className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                  <div>
                    <h4 className="font-medium text-lg text-[#003B5C]">{f.title}</h4>
                    <p className="text-sm text-[#57534E] mt-1">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85"
                alt="Diverse international students"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl shadow-2xl p-6 max-w-xs hidden sm:block">
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />)}
              </div>
              <p className="text-sm text-[#1C1917] leading-relaxed">"They turned my Sydney dream into reality. Forever grateful."</p>
              <div className="mt-3 text-xs text-[#57534E]">— Pedro M., Student</div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="py-24 bg-[#003B5C] text-white grain">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Top 5 Destinations</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight max-w-2xl mx-auto">
              Find your Australian home.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {destinations.map((d, i) => (
              <div
                key={i}
                data-testid={`destination-${d.name.toLowerCase().replace(' ', '-')}`}
                className={`relative rounded-3xl overflow-hidden group card-hover ${i === 0 ? "lg:col-span-2 lg:row-span-2 aspect-square lg:aspect-auto" : "aspect-[4/5]"}`}
              >
                <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative h-full flex flex-col justify-end p-5">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#F59E0B] mb-1">{d.tag}</div>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium">{d.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Success Stories</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#003B5C] tracking-tight max-w-3xl">
              Real students. Real journeys. Real outcomes.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white border border-[#E7E5E4] rounded-3xl p-8 card-hover" data-testid={`testimonial-${i}`}>
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />)}
                </div>
                <p className="font-display text-xl text-[#1C1917] leading-snug mb-6">"{t.quote}"</p>
                <div>
                  <div className="font-medium text-[#003B5C]">{t.name}</div>
                  <div className="text-xs text-[#57534E] mt-1">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-[#F3F2EE]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Frequently Asked</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#003B5C] tracking-tight">Questions, answered.</h2>
          </div>
          <FAQAccordion faqs={faqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-[#003B5C] rounded-3xl p-12 lg:p-20 text-center text-white relative overflow-hidden grain">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B] rounded-full blur-3xl opacity-20" />
            <Globe2 className="w-12 h-12 text-[#F59E0B] mx-auto mb-6" />
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-6">
              Your future in Australia<br /> is one conversation away.
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
              Book a free consultation with a QEAC certified agent and find your perfect pathway.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                data-testid="cta-book-consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#F59E0B] text-[#003B5C] font-semibold hover:bg-[#fbbf24] hover:scale-105 transition-all"
              >
                Book Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+61280029276"
                data-testid="cta-call"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-medium hover:bg-white/20"
              >
                Call +61 280029276
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <div key={i} className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden" data-testid={`faq-${i}`}>
          <button
            onClick={() => setOpen(open === i ? -1 : i)}
            data-testid={`faq-trigger-${i}`}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#F9F8F6] transition-colors"
          >
            <span className="font-medium text-[#003B5C] text-lg pr-4">{f.q}</span>
            <span className={`text-[#F59E0B] text-2xl flex-shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-[#57534E] leading-relaxed text-sm animate-fade-in">
              {f.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
