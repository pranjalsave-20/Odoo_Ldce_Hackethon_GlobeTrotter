"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary"|"secondary"|"ghost"|"danger"|"outline";
  size?: "sm"|"md"|"lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({ variant="primary", size="md", loading, icon, children, className="", disabled, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = { sm:"px-3 py-1.5 text-sm", md:"px-5 py-2.5 text-sm", lg:"px-7 py-3.5 text-base" };
  const variants = {
    primary: "bg-[#E85D26] text-white hover:bg-[#C44A1A] shadow-sm hover:shadow focus-visible:outline-[#E85D26]",
    secondary: "bg-[#1A3A5C] text-white hover:bg-[#2A5280] shadow-sm",
    ghost: "bg-transparent text-[#E85D26] hover:bg-orange-50",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
    outline: "border border-[#E5E0D8] bg-white text-[#1C1C1E] hover:bg-[#F3F1EE]",
  };
  return (
    <button {...props} disabled={disabled || loading} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : icon}
      {children}
    </button>
  );
}

interface BadgeProps { label: string; color?: string; className?: string; }
export function Badge({ label, color="orange", className="" }: BadgeProps) {
  const colors: Record<string, string> = {
    orange: "bg-orange-100 text-orange-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[color]||colors.gray} ${className}`}>{label}</span>;
}

export function Stars({ rating, size=14 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5" style={{ fontSize: size }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? "#FBBF24" : "#E5E7EB" }}>★</span>
      ))}
    </span>
  );
}

export function Skeleton({ className="" }: { className?: string }) {
  return <div className={`skeleton ${className}`} />;
}

export function Card({ children, className="", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div onClick={onClick} className={`card ${onClick?"cursor-pointer card-hover":""} ${className}`}>
      {children}
    </div>
  );
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title?: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-[#E5E0D8]">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 text-gray-500">✕</button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function Input({ label, error, className="", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#1C1C1E]">{label}</label>}
      <input {...props} className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26] focus:border-transparent transition-all ${error?"border-red-400":"border-[#E5E0D8]"} ${className}`} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

export function Select({ label, error, children, className="", ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#1C1C1E]">{label}</label>}
      <select {...props} className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26] focus:border-transparent bg-white ${error?"border-red-400":"border-[#E5E0D8]"} ${className}`}>{children}</select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
