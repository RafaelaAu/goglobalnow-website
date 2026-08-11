import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useI18n } from "../i18n";
import { trackEvent } from "../lib/analytics";
import {
  Mail, Phone, MapPin, MessageCircle, ArrowRight, ArrowLeft, CheckCircle2, Calendar as CalIcon,
} from "lucide-react";

const programs = ["English (ELICOS)", "Vocational (VET)", "High School", "Higher Education", "Not sure yet"];
const destinations = ["Sydney", "Melbourne", "Brisbane", "Gold Coast", "Perth", "No preference"];
const englishLevels = ["Beginner", "Intermediate", "Advanced", "Native"];

const GOOGLE_BOOKING_LINK = "https://calendar.app.google/kJ4wYfHWQ9FpPJEL8";

export default function Contact() {
  const { t } = useI18n();
  return (
    <div>
      <section className="py-20 lg:py-28 bg-[#F3F2EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">{t("contact.eyebrow")}</div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#003B5C] tracking-tight max-w-3xl">
            {t("contact.title_1")} <em className="not-italic text-[#F59E0B]">{t("contact.title_2")}</em>
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <ContactCard
              icon={MapPin}
              title={t("contact.visit")}
              lines={["Aitken Street", "Williamstown VIC 3016, Australia"]}
            />
            <ContactCard
              icon={Phone}
              title={t("contact.call")}
              lines={["+61 401 864 097 (Australia)", "+55 2199501-6925 (Brazil)"]}
            />
            <ContactCard
              icon={Mail}
              title={t("contact.email")}
              lines={["contact@goglobalnow.com.au", "support@goglobalnow.com.au"]}
            />
            
              href="https://wa.me/61401864097"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp"
              className="flex items-center justify-between p-6 bg-[#25D366] hover:bg-[#1da851] rounded-3xl text-white transition-all hover:-translate-y-1"
            >
              <div className="flex gap-4 items-center">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <div className="font-medium">{t("contact.whatsapp_label")}</div>
                  <div className="text-sm text-white/80">{t("contact.whatsapp_sub")}</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <InquiryForm />
            <ConsultationBooking />
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon: Icon, title, lines }) {
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6">
      <Icon className="w-6 h-6 text-[#F59E0B] mb-4" />
      <div className="text-xs uppercase tracking-[0.2em] text-[#57534E] mb-2">{title}</div>
      {lines.map((l, i) => (
        <div key={i} className="text-[#003B5C] font-medium">{l}</div>
      ))}
    </div>
  );
}

function InquiryForm() {
  const { t } = useI18n();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    full_name: "",
    email: "",
    phone: "",
    country: "Brazil",
    program_interest: "",
    preferred_destination: "",
    english_level: "",
    intake_date: "",
    message: "",
  });

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const submit = async () => {
    if (!data.full_name || !data.email || !data.phone || !data.program_interest) {
      toast.error("Please complete all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("https://formspree.io/f/mdajodjg", {
        _subject: `New Student Inquiry — ${data.full_name}`,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        country: data.country,
        program_interest: data.program_interest,
        preferred_destination: data.preferred_destination,
        english_level: data.english_level,
        intake_date: data.intake_date,
        message: data.message,
      }, { headers: { Accept: "application/json" } });
      trackEvent("inquiry_submit", { program: data.program_interest, destination: data.preferred_destination });
      setSubmitted(true);
      toast.success("Inquiry submitted! We'll be in touch within 24 hours.");
    } catch (e) {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-white border border-[#E7E5E4] rounded-3xl p-12 text-center" data-testid="inquiry-success">
