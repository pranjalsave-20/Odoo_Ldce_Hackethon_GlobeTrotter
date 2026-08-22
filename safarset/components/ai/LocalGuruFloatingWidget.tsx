"use client";

import React, { useState } from "react";
import { Compass, X, Mic, Sparkles } from "lucide-react";
import { LocalGuruChatbot } from "@/components/ai/LocalGuruChatbot";

interface LocalGuruFloatingWidgetProps {
  initialCity?: string;
}

export function LocalGuruFloatingWidget({ initialCity }: LocalGuruFloatingWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 border border-amber-500/30 text-amber-300 text-xs px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md animate-bounce">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold">Ask Local Guru AI</span>
            <Mic className="w-3.5 h-3.5 text-indigo-400" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Local Guru Chatbot"
          className="relative group w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white flex items-center justify-center shadow-2xl shadow-orange-950/60 hover:scale-110 active:scale-95 transition-all border-2 border-amber-400/40"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <Compass className="w-7 h-7 group-hover:rotate-45 transition-transform duration-300" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Modal / Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Close Button Top Right */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Chatbot Component */}
            <LocalGuruChatbot initialCity={initialCity} />
          </div>
        </div>
      )}
    </>
  );
}
