import { Link } from "react-router-dom";
import { ArrowRight, Thermometer, Users, Building2 } from "lucide-react";

const cities = [
  {
    name: "Sydney",
    tagline: "Iconic. Multicultural. Endless opportunity.",
    description: "Australia's largest city, home to the Opera House, Bondi Beach, and world-leading universities like UTS, USYD, and UNSW.",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=85",
    stats: { population: "5.3M", climate: "Mild, sunny", institutions: "40+" },
  },
  {
    name: "Melbourne",
    tagline: "Creative. Dynamic. Coffee capital.",
    description: "Voted world's most liveable city. Home to The University of Melbourne, RMIT, and an unmatched cultural scene.",
    image: "https://images.unsplash.com/photo-1545044846-351ba102b6d5?auto=format&fit=crop&w=1600&q=85",
    stats: { population: "5.1M", climate: "Four seasons", institutions: "35+" },
  },
  {
    name: "Brisbane",
    tagline: "Warm. Welcoming. River city.",
    description: "Subtropical climate, vibrant student community and gateway to the Great Barrier Reef. UQ and QUT lead world rankings.",
    image: "https://images.unsplash.com/photo-1566734904496-9309bb1798ae?auto=format&fit=crop&w=1600&q=85",
    stats: { population: "2.5M", climate: "Subtropical", institutions: "25+" },
  },
  {
    name: "Gold Coast",
    tagline: "Beaches. Lifestyle. Surf.",
    description: "Australia's playground — 70km of beaches, year-round sunshine, and Bond University & Griffith University.",
    image: "https://images.unsplash.com/photo-1626070191915-0ae0d9089132?auto=format&fit=crop&w=1600&q=85",
    stats: { population: "700K", climate: "Sunny year-round", institutions: "15+" },
  },
  {
    name: "Perth",
    tagline: "Booming. Beautiful. Best sunsets.",
    description: "Australia's western jewel — mining powerhouse with affordable living and top universities like UWA and Curtin.",
    image: "https://images.unsplash.com/photo-1580014942344-ce423d2b885a?auto=format&fit=crop&w=1600&q=85",
    stats: { population: "2.1M", climate: "Mediterranean", institutions: "20+" },
  },
];

export default function Destinations() {
  return (
    <div>
      <section className="py-20 lg:py-28 bg-[#003B5C] text-white grain relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Destinations</div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight max-w-3xl">
            Five cities. <em className="not-italic text-[#F59E0B]">Infinite</em> futures.
          </h1>
          <p className="mt-8 text-lg text-white/80 max-w-2xl">
            From Sydney's harbour to Perth's sunsets — choose your Australian backdrop.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          {cities.map((c, i) => (
            <div key={i} data-testid={`city-${c.name.toLowerCase()}`} className={`grid lg:grid-cols-12 gap-8 items-center`}>
              <div className={`lg:col-span-7 ${i % 2 ? "lg:order-2" : ""} aspect-[16/10] rounded-3xl overflow-hidden`}>
                <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
                <h2 className="font-display text-5xl sm:text-6xl text-[#003B5C] tracking-tight">{c.name}</h2>
                <div className="text-sm uppercase tracking-[0.2em] text-[#F59E0B] mt-2 mb-6">{c.tagline}</div>
                <p className="text-[#57534E] text-lg leading-relaxed mb-8">{c.description}</p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-[#F3F2EE] rounded-2xl p-4">
                    <Users className="w-4 h-4 text-[#F59E0B] mb-2" />
                    <div className="text-xs uppercase tracking-wider text-[#57534E]">Population</div>
                    <div className="font-medium text-[#003B5C]">{c.stats.population}</div>
                  </div>
                  <div className="bg-[#F3F2EE] rounded-2xl p-4">
                    <Thermometer className="w-4 h-4 text-[#F59E0B] mb-2" />
                    <div className="text-xs uppercase tracking-wider text-[#57534E]">Climate</div>
                    <div className="font-medium text-[#003B5C] text-sm">{c.stats.climate}</div>
                  </div>
                  <div className="bg-[#F3F2EE] rounded-2xl p-4">
                    <Building2 className="w-4 h-4 text-[#F59E0B] mb-2" />
                    <div className="text-xs uppercase tracking-wider text-[#57534E]">Institutions</div>
                    <div className="font-medium text-[#003B5C]">{c.stats.institutions}</div>
                  </div>
                </div>
                <Link to="/contact" className="inline-flex items-center gap-2 text-[#003B5C] font-medium hover:text-[#F59E0B]" data-testid={`city-cta-${c.name.toLowerCase()}`}>
                  Study in {c.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
