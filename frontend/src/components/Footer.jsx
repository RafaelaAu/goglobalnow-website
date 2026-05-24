import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#003B5C] text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-xl font-bold mb-3">GoGlobalNow</h3>
          <p className="text-blue-200 text-sm leading-relaxed">Your trusted partner for studying and migrating to Australia.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[#F59E0B]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/programs" className="hover:text-white">Programs</Link></li>
            <li><Link to="/destinations" className="hover:text-white">Destinations</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[#F59E0B]">Get in Touch</h4>
          <ul className="space-y-2 text-sm text-blue-200">
            <li><a href="https://wa.me/61401864097" target="_blank" rel="noopener noreferrer" className="hover:text-white">📱 WhatsApp Us</a></li>
            <li><Link to="/contact" className="hover:text-white">📧 Send a Message</Link></li>
            <li className="pt-2">🇦🇺 Based in Australia</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-blue-800 px-6 py-4 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} GoGlobalNow. All rights reserved.
      </div>
    </footer>
  );
}
