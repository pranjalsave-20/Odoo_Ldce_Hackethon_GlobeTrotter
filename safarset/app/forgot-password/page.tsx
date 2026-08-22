"use client";

import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { ArrowLeft, KeyRound, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const { addToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    addToast("success", "Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 space-y-6">
        
        <div className="flex items-center justify-between">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft size={14} /> Back to login
          </Link>
          <div className="w-8 h-8 rounded-xl overflow-hidden bg-amber-50/20 border border-amber-400/30 p-0.5 shadow-sm">
            <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-blue-200">
            <KeyRound size={22} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Forgot Password?</h1>
          <p className="text-xs text-slate-500 font-medium">Enter your email and we will send you instructions to reset your Bharat Parikrama account password.</p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-2xl p-4 font-semibold">
              Reset instructions have been sent to <span className="font-bold text-slate-900">{email}</span>.
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl transition-colors"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 bg-slate-50"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-md transition-all duration-150 disabled:opacity-50"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
