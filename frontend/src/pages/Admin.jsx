import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Globe, Mail, Phone, Calendar as CalIcon, ArrowLeft } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Admin() {
  const [tab, setTab] = useState("inquiries");
  const [inquiries, setInquiries] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    axios.get(`${API}/inquiries`).then((r) => setInquiries(r.data)).catch(() => {});
    axios.get(`${API}/consultations`).then((r) => setConsultations(r.data)).catch(() => {});
    axios.get(`${API}/stats`).then((r) => setStats(r.data)).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6]">
      <header className="bg-[#003B5C] text-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#003B5C]" />
            </div>
            <div>
              <div className="font-display text-xl">Go Global Now</div>
              <div className="text-xs text-[#F59E0B] tracking-[0.2em] uppercase">Admin Dashboard</div>
            </div>
          </div>
          <Link to="/" className="text-sm text-white/80 hover:text-white inline-flex items-center gap-2" data-testid="admin-back-home">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Inquiries" value={stats.total_inquiries ?? 0} />
          <StatCard label="Consultations Booked" value={stats.total_consultations ?? 0} />
          <StatCard label="Students Helped" value={stats.students_helped ?? 0} />
          <StatCard label="Visa Success Rate" value={`${stats.success_rate ?? 0}%`} />
        </div>

        <div className="flex gap-2 mb-6 border-b border-[#E7E5E4]">
          <TabBtn active={tab === "inquiries"} onClick={() => setTab("inquiries")} testid="tab-inquiries">
            Inquiries ({inquiries.length})
          </TabBtn>
          <TabBtn active={tab === "consultations"} onClick={() => setTab("consultations")} testid="tab-consultations">
            Consultations ({consultations.length})
          </TabBtn>
        </div>

        {tab === "inquiries" && <InquiriesTable items={inquiries} />}
        {tab === "consultations" && <ConsultationsTable items={consultations} />}
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl p-5">
      <div className="text-xs uppercase tracking-[0.2em] text-[#57534E] mb-2">{label}</div>
      <div className="font-display text-4xl text-[#003B5C]">{value}</div>
    </div>
  );
}

function TabBtn({ active, onClick, children, testid }) {
  return (
    <button
      onClick={onClick}
      data-testid={testid}
      className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
        active ? "border-[#F59E0B] text-[#003B5C]" : "border-transparent text-[#57534E] hover:text-[#003B5C]"
      }`}
    >
      {children}
    </button>
  );
}

function InquiriesTable({ items }) {
  if (!items.length) return <Empty msg="No inquiries yet." />;
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden" data-testid="inquiries-table">
      <table className="w-full text-sm">
        <thead className="bg-[#F3F2EE] text-left">
          <tr>
            <Th>Name</Th><Th>Contact</Th><Th>Program</Th><Th>Destination</Th><Th>Status</Th><Th>Date</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id} className="border-t border-[#E7E5E4] hover:bg-[#F9F8F6]">
              <td className="px-4 py-4">
                <div className="font-medium text-[#003B5C]">{i.full_name}</div>
                <div className="text-xs text-[#57534E]">{i.country}</div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-1 text-xs"><Mail className="w-3 h-3" /> {i.email}</div>
                <div className="flex items-center gap-1 text-xs"><Phone className="w-3 h-3" /> {i.phone}</div>
              </td>
              <td className="px-4 py-4">{i.program_interest}</td>
              <td className="px-4 py-4">{i.preferred_destination || "-"}</td>
              <td className="px-4 py-4">
                <span className="px-2 py-1 rounded-full bg-[#F59E0B]/20 text-[#003B5C] text-xs">{i.status}</span>
              </td>
              <td className="px-4 py-4 text-xs text-[#57534E]">{new Date(i.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ConsultationsTable({ items }) {
  if (!items.length) return <Empty msg="No consultations booked yet." />;
  return (
    <div className="bg-white border border-[#E7E5E4] rounded-2xl overflow-hidden" data-testid="consultations-table">
      <table className="w-full text-sm">
        <thead className="bg-[#F3F2EE] text-left">
          <tr>
            <Th>Name</Th><Th>Contact</Th><Th>Date & Time</Th><Th>Topic</Th><Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c.id} className="border-t border-[#E7E5E4] hover:bg-[#F9F8F6]">
              <td className="px-4 py-4 font-medium text-[#003B5C]">{c.full_name}</td>
              <td className="px-4 py-4 text-xs">
                <div>{c.email}</div>
                <div>{c.phone}</div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-1 text-[#003B5C] font-medium"><CalIcon className="w-3 h-3" /> {c.preferred_date}</div>
                <div className="text-xs text-[#57534E]">{c.preferred_time}</div>
              </td>
              <td className="px-4 py-4">{c.topic || "-"}</td>
              <td className="px-4 py-4">
                <span className="px-2 py-1 rounded-full bg-[#F59E0B]/20 text-[#003B5C] text-xs">{c.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Th({ children }) {
  return <th className="px-4 py-3 text-xs uppercase tracking-[0.15em] text-[#57534E] font-medium">{children}</th>;
}

function Empty({ msg }) {
  return <div className="bg-white border border-[#E7E5E4] rounded-2xl p-12 text-center text-[#57534E]">{msg}</div>;
}
