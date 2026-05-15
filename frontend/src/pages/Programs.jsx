import { Link } from "react-router-dom";
import { GraduationCap, Briefcase, BookOpen, School, CheckCircle2, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: BookOpen,
    title: "English Language Courses",
    code: "ELICOS",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
    description: "Build your English foundation with internationally recognised programs.",
    features: ["General English", "Academic Purposes (EAP)", "IELTS & Cambridge Prep", "Business English"],
    duration: "4 weeks – 60 weeks",
    fromPrice: "AUD $350/week",
  },
  {
    icon: Briefcase,
    title: "Vocational Education & Training",
    code: "VET",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85",
    description: "Practical, career-focused training in Australia's top industries.",
    features: ["Business & Management", "Information Technology", "Nursing & Aged Care", "Engineering & Design", "Hospitality & Tourism"],
    duration: "6 months – 2 years",
    fromPrice: "AUD $7,000/year",
  },
  {
    icon: School,
    title: "High School Programs",
    code: "Years 7–12",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=85",
    description: "Public & private school options for international students aged 12–18.",
    features: ["Government Schools", "Private Schools", "Boarding Options", "Pathway to University"],
    duration: "1 term – multiple years",
    fromPrice: "AUD $13,000/year",
  },
  {
    icon: GraduationCap,
    title: "Higher Education",
    code: "University",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=85",
    description: "Globally ranked Australian universities — Bachelors to PhDs.",
    features: ["Bachelor's Degrees", "Master's Degrees", "PhDs & Doctorates", "Graduate Diplomas & Certificates"],
    duration: "1 – 4 years",
    fromPrice: "AUD $20,000/year",
  },
];

export default function Programs() {
  return (
    <div>
      <section className="py-20 lg:py-28 bg-[#F3F2EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Programs</div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#003B5C] tracking-tight max-w-3xl">
            Find the course that fits <em className="not-italic text-[#F59E0B]">your future.</em>
          </h1>
          <p className="mt-8 text-lg text-[#57534E] max-w-2xl">
            From your first English lesson to your PhD graduation, we guide you to the right institution, the right city, and the right pathway.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-20">
          {programs.map((p, i) => (
            <div key={i} data-testid={`program-detail-${i}`} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 ? "lg:flex-row-reverse" : ""}`}>
              <div className={`${i % 2 ? "lg:order-2" : ""} aspect-[5/4] rounded-3xl overflow-hidden`}>
                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className={i % 2 ? "lg:order-1" : ""}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3F2EE] text-xs uppercase tracking-[0.2em] text-[#003B5C] mb-4">
                  <p.icon className="w-3 h-3" /> {p.code}
                </div>
                <h2 className="font-display text-4xl sm:text-5xl text-[#003B5C] tracking-tight mb-4">{p.title}</h2>
                <p className="text-[#57534E] text-lg mb-6">{p.description}</p>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex gap-3 items-start text-[#1C1917]">
                      <CheckCircle2 className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-2 gap-4 mb-8 pt-4 border-t border-[#E7E5E4]">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#57534E] mb-1">Duration</div>
                    <div className="font-medium text-[#003B5C]">{p.duration}</div>
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-[#57534E] mb-1">From</div>
                    <div className="font-medium text-[#003B5C]">{p.fromPrice}</div>
                  </div>
                </div>
                <Link to="/contact" data-testid={`program-cta-${i}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#003B5C] text-white hover:bg-[#002940] transition-all">
                  Get details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
