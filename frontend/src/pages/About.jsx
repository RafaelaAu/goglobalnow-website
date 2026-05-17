import { Link } from "react-router-dom";
import { Award, Heart, Shield, Globe2, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="py-20 lg:py-28 bg-[#F3F2EE]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">About Us</div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#003B5C] tracking-tight">
            Connecting Brazil to Australia, one student at a time.
          </h1>
          <p className="mt-8 text-lg text-[#57534E] max-w-3xl leading-relaxed">
            Go Global Now is an Australian-based education agency dedicated to connecting Brazilian students with world-class study opportunities in Australia. Our mission is to make your dream of studying abroad a reality through personalised, ethical and comprehensive support.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85" alt="Team" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-[#003B5C] tracking-tight mb-6">Our story</h2>
            <p className="text-[#57534E] leading-relaxed mb-4 text-lg">
              Founded by passionate education professionals who have lived the immigrant student experience firsthand, Go Global Now bridges two cultures — Brazilian warmth meets Australian opportunity.
            </p>
            <p className="text-[#57534E] leading-relaxed mb-4 text-lg">
              With QEAC certified expertise and a Brazil-to-Australia network, we provide truly personalised, 1:1 guidance to every student — from the first English lesson to their first day at school in Australia.
            </p>
            <p className="text-[#57534E] leading-relaxed text-lg">
              We don't process applications at scale. We mentor, guide, advocate and celebrate every milestone with you — from your first course choice to your graduation walk.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#003B5C] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3 text-center">Our Values</div>
          <h2 className="font-display text-4xl sm:text-5xl text-center tracking-tight mb-16">What we stand for.</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: "Excellence", desc: "QEAC certified expertise in every interaction." },
              { icon: Heart, title: "Personalised", desc: "One agent, end-to-end — never a call centre." },
              { icon: Shield, title: "Ethical", desc: "We recommend what's right, not what pays us most." },
              { icon: Globe2, title: "Global", desc: "Brazil-to-Australia roots, worldwide ambitions." },
            ].map((v, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">
                <v.icon className="w-8 h-8 text-[#F59E0B] mb-4" />
                <h3 className="font-display text-2xl mb-2">{v.title}</h3>
                <p className="text-white/70 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl sm:text-5xl text-[#003B5C] tracking-tight mb-6">
            Ready to write your chapter?
          </h2>
          <Link to="/contact" data-testid="about-cta" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#003B5C] text-white hover:bg-[#002940] hover:scale-105 transition-all">
            Talk to an Agent <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
