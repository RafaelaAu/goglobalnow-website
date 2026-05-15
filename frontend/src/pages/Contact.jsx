import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Mail, Phone, MapPin, MessageCircle, ArrowRight, ArrowLeft, CheckCircle2,
} from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const programs = ["English (ELICOS)", "Vocational (VET)", "High School", "Higher Education", "Not sure yet"];
const destinations = ["Sydney", "Melbourne", "Brisbane", "Gold Coast", "Perth", "No preference"];
const englishLevels = ["Beginner", "Intermediate", "Advanced", "Native"];
const times = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

export default function Contact() {
  return (
    <div>
      <section className="py-20 lg:py-28 bg-[#F3F2EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-xs uppercase tracking-[0.3em] text-[#F59E0B] mb-3">Get in Touch</div>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#003B5C] tracking-tight max-w-3xl">
            Let's start your <em className="not-italic text-[#F59E0B]">journey.</em>
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <div className="space-y-6">
            <ContactCard
              icon={MapPin}
              title="Visit"
              lines={["Kurrajong Street", "2232 Sydney, Australia"]}
            />
            <ContactCard
              icon={Phone}
              title="Call"
              lines={["+61 280029276 (Australia)", "+51 2199501-6925 (Brazil)"]}
            />
            <ContactCard
              icon={Mail}
              title="Email"
              lines={["contact@goglobalnow.com.au", "support@goglobalnow.com.au"]}
            />
            <a
              href="https://wa.me/61280029276"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp"
              className="flex items-center justify-between p-6 bg-[#25D366] hover:bg-[#1da851] rounded-3xl text-white transition-all hover:-translate-y-1"
            >
              <div className="flex gap-4 items-center">
                <MessageCircle className="w-6 h-6" />
                <div>
                  <div className="font-medium">WhatsApp</div>
                  <div className="text-sm text-white/80">Instant reply</div>
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
      await axios.post(`${API}/inquiries`, data);
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
        <div className="w-16 h-16 mx-auto rounded-full bg-[#F59E0B] flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-[#003B5C]" />
        </div>
        <h3 className="font-display text-3xl text-[#003B5C] mb-3">You're all set, {data.full_name.split(" ")[0]}!</h3>
        <p className="text-[#57534E] mb-6">A QEAC certified agent will contact you within 24 hours.</p>
        <a href="https://wa.me/61280029276" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#1da851]">
          WhatsApp us for instant chat <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 lg:p-12" data-testid="inquiry-form">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#F59E0B] mb-2">Step {step} of 3</div>
          <h2 className="font-display text-3xl text-[#003B5C]">Student inquiry</h2>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-8 h-1 rounded-full ${s <= step ? "bg-[#F59E0B]" : "bg-[#E7E5E4]"}`} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 animate-fade-in">
          <Field label="Full name *">
            <input data-testid="inquiry-name-input" value={data.full_name} onChange={(e) => update("full_name", e.target.value)} className={inputClass} placeholder="Maria Silva" />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email *">
              <input data-testid="inquiry-email-input" type="email" value={data.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="you@email.com" />
            </Field>
            <Field label="Phone *">
              <input data-testid="inquiry-phone-input" value={data.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass} placeholder="+55 11 ..." />
            </Field>
          </div>
          <Field label="Country">
            <input data-testid="inquiry-country-input" value={data.country} onChange={(e) => update("country", e.target.value)} className={inputClass} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5 animate-fade-in">
          <Field label="Program of interest *">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {programs.map((p) => (
                <button
                  key={p}
                  type="button"
                  data-testid={`inquiry-program-${p.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => update("program_interest", p)}
                  className={`px-3 py-2.5 rounded-xl text-sm transition-all ${
                    data.program_interest === p
                      ? "bg-[#003B5C] text-white"
                      : "bg-[#F3F2EE] text-[#1C1917] hover:bg-[#E7E5E4]"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Preferred destination">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {destinations.map((d) => (
                <button
                  key={d}
                  type="button"
                  data-testid={`inquiry-destination-${d.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => update("preferred_destination", d)}
                  className={`px-3 py-2.5 rounded-xl text-sm transition-all ${
                    data.preferred_destination === d
                      ? "bg-[#003B5C] text-white"
                      : "bg-[#F3F2EE] text-[#1C1917] hover:bg-[#E7E5E4]"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </Field>
          <Field label="English level">
            <div className="grid grid-cols-4 gap-2">
              {englishLevels.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => update("english_level", l)}
                  className={`px-3 py-2.5 rounded-xl text-sm transition-all ${
                    data.english_level === l
                      ? "bg-[#003B5C] text-white"
                      : "bg-[#F3F2EE] text-[#1C1917] hover:bg-[#E7E5E4]"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 animate-fade-in">
          <Field label="Preferred intake">
            <input data-testid="inquiry-intake-input" value={data.intake_date} onChange={(e) => update("intake_date", e.target.value)} className={inputClass} placeholder="e.g. February 2026" />
          </Field>
          <Field label="Anything else we should know?">
            <textarea data-testid="inquiry-message-input" value={data.message} onChange={(e) => update("message", e.target.value)} rows={4} className={inputClass + " resize-none"} placeholder="Goals, budget, questions..." />
          </Field>
        </div>
      )}

      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button onClick={() => setStep(step - 1)} data-testid="inquiry-back" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[#003B5C] hover:bg-[#F3F2EE]">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        ) : <span />}
        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            data-testid="inquiry-next"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#003B5C] text-white hover:bg-[#002940] transition-all"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={loading}
            data-testid="inquiry-submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F59E0B] text-[#003B5C] font-semibold hover:bg-[#fbbf24] transition-all disabled:opacity-60"
          >
            {loading ? "Sending..." : "Submit inquiry"} <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function ConsultationBooking() {
  const [date, setDate] = useState();
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ full_name: "", email: "", phone: "", topic: "", notes: "" });

  const submit = async () => {
    if (!data.full_name || !data.email || !data.phone || !date || !time) {
      toast.error("Please complete all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/consultations`, {
        ...data,
        preferred_date: format(date, "yyyy-MM-dd"),
        preferred_time: time,
      });
      setSubmitted(true);
      toast.success("Consultation booked!");
    } catch (e) {
      toast.error("Booking failed. Please try again.");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-[#003B5C] text-white rounded-3xl p-12 text-center" data-testid="consultation-success">
        <CheckCircle2 className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
        <h3 className="font-display text-3xl mb-3">See you on {date && format(date, "MMMM d")} at {time}!</h3>
        <p className="text-white/80">We'll send confirmation details to {data.email}.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 lg:p-12" data-testid="consultation-form">
      <div className="text-xs uppercase tracking-[0.2em] text-[#F59E0B] mb-2">Free Consultation</div>
      <h2 className="font-display text-3xl text-[#003B5C] mb-8">Book a 30-minute call</h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#57534E] mb-3">Pick a date</div>
          <div className="rounded-2xl border border-[#E7E5E4] p-2 bg-[#F9F8F6]">
            <Calendar
              data-testid="consultation-calendar"
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0}
              className="rounded-md"
            />
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#57534E] mb-3">Pick a time (AEST)</div>
          <div className="grid grid-cols-2 gap-2">
            {times.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTime(t)}
                data-testid={`consultation-time-${t}`}
                className={`px-3 py-2.5 rounded-xl text-sm transition-all ${
                  time === t
                    ? "bg-[#003B5C] text-white"
                    : "bg-[#F3F2EE] text-[#1C1917] hover:bg-[#E7E5E4]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            <input data-testid="consultation-name" value={data.full_name} onChange={(e) => setData({ ...data, full_name: e.target.value })} className={inputClass} placeholder="Full name *" />
            <input data-testid="consultation-email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className={inputClass} placeholder="Email *" />
            <input data-testid="consultation-phone" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} className={inputClass} placeholder="Phone *" />
            <input data-testid="consultation-topic" value={data.topic} onChange={(e) => setData({ ...data, topic: e.target.value })} className={inputClass} placeholder="Topic (optional)" />
          </div>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        data-testid="consultation-submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#F59E0B] text-[#003B5C] font-semibold hover:bg-[#fbbf24] disabled:opacity-60"
      >
        {loading ? "Booking..." : "Book free consultation"} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

const inputClass = "w-full px-4 py-3 rounded-xl bg-[#F9F8F6] border border-[#E7E5E4] focus:outline-none focus:border-[#003B5C] text-[#1C1917] placeholder:text-[#A8A29E]";

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.2em] text-[#57534E] mb-2">{label}</label>
      {children}
    </div>
  );
}
