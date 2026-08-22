"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import { aiService } from "@/lib/services/aiService";
import type { ChatMessage } from "@/lib/types";

const SUGGESTIONS = [
  "What can I eat nearby?",
  "I have 2 hours free. Suggest something.",
  "Reduce my trip budget.",
  "Find vegetarian restaurants.",
  "I need emergency help.",
];

export default function SafarAI() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Namaste! I'm **Parikrama AI**, your intelligent travel companion.\n\nAsk me anything about your trip — food, places, budget, schedule changes, or emergencies.",
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!user) return null;

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;
    setInput("");
    const userMsg: ChatMessage = { id: Date.now().toString(), role: "user", content: msg, timestamp: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setLoading(true);
    const reply = await aiService.chat(msg);
    setMessages(m => [...m, reply]);
    setLoading(false);
  };

  const renderContent = (text: string) =>
    text.split("\n").map((line, i) => {
      const bold = line.replace(/\*\*(.*?)\*\//g, "<strong>$1</strong>"); // Match markdown bold
      const finalLine = bold.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      return (
        <p key={i} className={line.startsWith("⚠️") ? "text-amber-700 font-medium" : ""} dangerouslySetInnerHTML={{ __html: finalLine }} />
      );
    });

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#1E5EAA] text-white rounded-full flex items-center justify-center ai-fab transition-all ${
          open ? "opacity-0 pointer-events-none" : ""
        }`}
        aria-label="Open Parikrama AI"
      >
        <Sparkles size={22} />
      </button>

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-24px)] flex flex-col rounded-2xl shadow-2xl overflow-hidden animate-fade-in"
          style={{ height: 520, border: "1px solid var(--border)", background: "#fff" }}
        >
          {/* Header */}
          <div className="bg-[#0F2D52] text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-amber-300">
                <Sparkles size={16} />
              </div>
              <div>
                <p className="font-semibold text-sm">Parikrama AI</p>
                <p className="text-xs text-slate-300">Your travel companion</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Emergency Banner */}
          <div className="bg-amber-50 border-b border-amber-100 px-3 py-1.5 flex items-center gap-2 flex-shrink-0">
            <AlertTriangle size={12} className="text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-700">For genuine emergencies, always call 100/108 first.</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto bg-[#FAFAF8] p-3 space-y-3">
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-[#1E5EAA] flex items-center justify-center text-white mr-2 flex-shrink-0 mt-1">
                    <Sparkles size={10} />
                  </div>
                )}
                <div className={m.role === "user" ? "chat-user" : "chat-ai"} style={{ maxWidth: "82%" }}>
                  {renderContent(m.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-[#1E5EAA] flex items-center justify-center text-white mr-2 flex-shrink-0">
                  <Sparkles size={10} />
                </div>
                <div className="chat-ai px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Suggestions */}
          <div className="bg-white border-t border-[#E4E4DF] px-3 pt-2 flex gap-1.5 overflow-x-auto pb-1 flex-shrink-0">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => send(s)}
                className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-[#E4E4DF] text-slate-500 hover:border-[#1E5EAA] hover:text-[#1E5EAA] transition-colors whitespace-nowrap"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t border-[#E4E4DF] p-3 flex items-center gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask Parikrama AI anything..."
              className="flex-1 text-sm px-3 py-2 border border-[#E4E4DF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E5EAA] focus:border-transparent"
            />
            <button
              onClick={() => send()}
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-[#1E5EAA] text-white rounded-xl flex items-center justify-center disabled:opacity-40 hover:bg-[#174F90] transition-colors flex-shrink-0"
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
