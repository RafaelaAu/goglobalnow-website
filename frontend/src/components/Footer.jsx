import { Link } from "react-router-dom";
import { Globe, Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="bg-[#003B5C] text-white mt-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 grid lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#003B5C]" />
            </div>
            <div>
              <div className="font-display text-xl font-medium">Go Global Now</div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-[#F59E0B]">Australia</div>
            </div>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            QEAC certified education agents connecting Brazilian students with world-class study opportunities in Australia.
          </p>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-[#F59E0B]">Programs</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/programs" className="hover:text-[#F59E0B]">English (ELICOS)</Link></li>
            <li><Link to="/programs" className="hover:text-[#F59E0B]">Vocational Education (VET)</Link></li>
            <li><Link to="/programs" className="hover:text-[#F59E0B]">High School</Link></li>
            <li><Link to="/programs" className="hover:text-[#F59E0B]">Higher Education</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-[#F59E0B]">Destinations</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/destinations" className="hover:text-[#F59E0B]">Sydney</Link></li>
            <li><Link to="/destinations" className="hover:text-[#F59E0B]">Melbourne</Link></li>
            <li><Link to="/destinations" className="hover:text-[#F59E0B]">Brisbane</Link></li>
            <li><Link to="/destinations" className="hover:text-[#F59E0B]">Gold Coast</Link></li>
            <li><Link to="/destinations" className="hover:text-[#F59E0B]">Perth</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-[#F59E0B]">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> Kurrajong Street, 2232 Sydney, Australia</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 flex-shrink-0 mt-0.5" /> +61 280029276 (AU)<br />+51 2199501-6925 (BR)</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 flex-shrink-0 mt-0.5" /> contact@goglobalnow.com.au</li>
          </ul>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-[#003B5C] flex items-center justify-center transition-colors" data-testid="social-facebook"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-[#003B5C] flex items-center justify-center transition-colors" data-testid="social-instagram"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-[#003B5C] flex items-center justify-center transition-colors" data-testid="social-youtube"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-white/60">
          <div>© {new Date().getFullYear()} Go Global Now. All rights reserved.</div>
          <div>QEAC Certified • Registered Education Agents</div>
        </div>
      </div>
    </footer>
  );
}
