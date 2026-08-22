"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Eye, EyeOff, ArrowLeft, Mail, Lock, User, Sparkles, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
  const { signup, loginWithGoogle } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setErrors({});
    const res = await signup(form.name, form.email, form.password);
    if (res.success) {
      addToast("success", "Welcome to Bharat Parikrama! 🎉 Account created.");
      router.push("/dashboard");
    } else {
      setErrors({ general: res.error || "Signup failed" });
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true); setErrors({});
    const res = await loginWithGoogle();
    if (res.success) {
      addToast("success", "Signed up with Google! 🎉");
      router.push("/dashboard");
    } else {
      setErrors({ general: res.error || "Google sign-up failed" });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080d1a] flex items-center justify-center p-3 sm:p-6 lg:p-8 font-sans">
      
      {/* Outer Split Card Container */}
      <div className="w-full max-w-[1050px] bg-[#0c1220] rounded-3xl overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* LEFT PANEL: Travel Intelligence & Heritage Visual */}
        <div className="lg:col-span-5 relative bg-[#0b1326] p-6 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[380px] lg:min-h-full">
          
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1000&q=80" 
              alt="Bharat Parikrama Heritage" 
              className="w-full h-full object-cover opacity-30 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/70 to-[#080d1a]/50" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080d1a]/90 via-transparent to-[#080d1a]" />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <Link href="/" className="flex items-center gap-3 group text-decoration-none">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-amber-50/10 border border-amber-400/30 p-0.5 shadow-md flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm text-teal-400 font-serif leading-none">
                  भारत परिक्रमा
                </span>
                <span className="text-[9px] font-black text-slate-200 tracking-wider uppercase mt-0.5">
                  BHARAT PARIKRAMA
                </span>
              </div>
            </Link>

            <Link href="/" className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={13} /> Back to Home
            </Link>
          </div>

          {/* Left Tagline & Features */}
          <div className="relative z-10 space-y-4 my-auto lg:my-0 pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-wider">
              <Sparkles size={12} /> JOIN BHARAT PARIKRAMA
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Embark on Your Pan-India Journey.
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              Create an account to save custom itineraries, manage business meeting buffers, and book certified local guides & cabs.
            </p>

            <div className="space-y-2 pt-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Save Multi-City Pan-India Yatra Plans</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>One-Click Printable PDF Itinerary Export</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Community Itineraries & Route Sharing</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-slate-800 text-[11px] text-slate-500 hidden sm:block">
            Pan-India Travel & Itinerary Optimization Platform
          </div>

        </div>

        {/* RIGHT PANEL: Signup Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-center items-center w-full">
          
          <div className="w-full max-w-md space-y-5">
            
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Your Account
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Sign up to start planning personalized yatras and business trips across India.
              </p>
            </div>

            {errors.general && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200 font-semibold">
                ⚠️ {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
                    placeholder="e.g. Arjun Patel"
                    required
                  />
                </div>
                {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-[10px] mt-1">{errors.password}</p>}
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-3 text-slate-400" />
                    <input
                      type={showPw ? "text" : "password"}
                      value={form.confirm}
                      onChange={e => setForm({ ...form, confirm: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  {errors.confirm && <p className="text-red-500 text-[10px] mt-1">{errors.confirm}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={e => setAgreeTerms(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  I agree to the Terms of Service
                </label>

                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-[11px] font-bold text-slate-500 hover:text-slate-800"
                >
                  {showPw ? "Hide passwords" : "Show passwords"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || !agreeTerms}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider shadow-lg transition-all hover:scale-[1.01] flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Bharat Parikrama Account"}
              </button>

            </form>

            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                OR
              </span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full py-3 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{googleLoading ? "Connecting..." : "Sign up with Google"}</span>
            </button>

            <p className="text-center text-xs text-slate-500 font-medium">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 underline">
                Log in here
              </Link>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
