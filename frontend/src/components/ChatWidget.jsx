import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function getSessionId() {
  let id = localStorage.getItem("ggn_chat_session");
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem("ggn_chat_session", id);
  }
  return id;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "G'day! 👋 I'm Aussie, your AI study advisor. Ask me anything about studying in Australia — courses, visas, cities, costs!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: text }]);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/chat`, {
        session_id: getSessionId(),
        message: text,
      });
      setMessages((m) => [...m, { role: "assistant", content: res.data.response }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Sorry, I'm having trouble right now. Please WhatsApp us at +61 401 864 097." }]);
    }
    setLoading(false);
  };

  return (
    <>
      {!open && (
        <button
          data-testid="chat-toggle"
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-6 z-[9999] flex items-center gap-2 px-5 py-3 rounded-full bg-[#003B5C] text-white shadow-2xl hover:scale-105 transition-all"
        >
          <Sparkles className="w-4 h-4 text-[#F59E0B]" />
          <span className="text-sm font-medium">Ask Aussie AI</span>
        </button>
      )}

      {open && (
        <div
          data-testid="chat-widget"
          className="fixed bottom-24 right-6 z-[9999] w-[92vw] sm:w-[400px] h-[560px] max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#E7E5E4] animate-fade-up"
        >
          <div className="bg-[#003B5C] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#003B5C]" />
              </div>
              <div>
                <div className="font-medium">Aussie AI</div>
                <div className="text-xs text-white/70">Study advisor • Online</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} data-testid="chat-close" className="p-1 hover:bg-white/10 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F9F8F6]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    m.role === "user"
                      ? "bg-[#003B5C] text-white rounded-br-sm"
                      : "bg-white text-[#1C1917] rounded-bl-sm border border-[#E7E5E4]"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#E7E5E4] px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                  <span className="w-2 h-2 bg-[#003B5C] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#003B5C] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#003B5C] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-[#E7E5E4] bg-white">
            <div className="flex gap-2">
              <input
                data-testid="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about courses, visas, cities..."
                className="flex-1 px-4 py-2.5 rounded-full bg-[#F3F2EE] text-sm focus:outline-none focus:ring-2 focus:ring-[#003B5C]/30"
              />
              <button
                onClick={send}
                disabled={loading}
                data-testid="chat-send"
                className="w-10 h-10 rounded-full bg-[#003B5C] text-white hover:bg-[#002940] flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
