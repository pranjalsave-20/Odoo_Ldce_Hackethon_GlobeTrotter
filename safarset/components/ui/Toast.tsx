"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

interface Toast { id: string; type: "success"|"error"|"info"|"warning"; message: string; }
const ToastContext = createContext<{ addToast: (type: Toast["type"], message: string) => void } | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((type: Toast["type"], message: string) => {
    const id = Date.now().toString();
    setToasts(t => [...t, { id, type, message }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  const colors: Record<Toast["type"], string> = {
    success: "bg-green-500", error: "bg-red-500", info: "bg-blue-500", warning: "bg-amber-500"
  };
  const icons: Record<Toast["type"], string> = { success:"✓", error:"✕", info:"i", warning:"⚠" };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className={`${colors[t.type]} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 pointer-events-auto animate-fade-in min-w-[260px] max-w-[360px]`}>
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">{icons[t.type]}</span>
            <span className="text-sm font-medium">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be inside ToastProvider");
  return ctx;
}
