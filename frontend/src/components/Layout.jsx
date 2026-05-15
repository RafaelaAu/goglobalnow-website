import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import ChatWidget from "./ChatWidget";
import MobileStickyBar from "./MobileStickyBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1C1917]">
      <Header />
      <main className="pt-28 pb-20 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatWidget />
      <MobileStickyBar />
    </div>
  );
}
