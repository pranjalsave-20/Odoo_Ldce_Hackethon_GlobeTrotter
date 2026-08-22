"use client";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { ArrowLeft, KeyRound } from "lucide-react";

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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="w-full max-w-md bg-white rounded-[28px] p-8 sm:p-10 shadow-2xl border border-slate-200 space-y-6">
        
        <Link href="/login" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={14} /> Back to login
        </Link>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-900 mx-auto mb-3">
            <KeyRound size={22} />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Forgot Password?</h1>
          <p className="text-xs text-slate-500">No worries, input your email and we'll send reset instructions.</p>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl p-4">
              Reset instructions have been sent to <span className="font-bold text-slate-900">{email}</span>.
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full transition-colors"
            >
              Try another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input your email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm text-slate-900 placeholder:text-slate-400 bg-slate-50/50"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 bg-[#18181b] hover:bg-[#09090b] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-150 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
