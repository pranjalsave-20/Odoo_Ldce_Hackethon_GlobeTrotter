"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

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
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.includes("@")) e.email = "Valid email required";
    if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setErrors({});
    const res = await signup(form.name, form.email, form.password);
    if (res.success) {
      addToast("success", "Account created! Welcome to SafarSet 🎉");
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
    <div className="min-h-screen bg-[#080d1a] flex items-center justify-center p-4 sm:p-8 font-sans">
      
      {/* Outer Browser Window Mockup Container matching exact screenshot */}
      <div className="w-full max-w-[1100px] bg-[#0c1220] rounded-[24px] overflow-hidden shadow-2xl border border-slate-800 grid grid-cols-1 lg:grid-cols-2 min-h-[640px]">
        
        {/* LEFT PANEL: Geometric Dark Architecture Graphic + Brand Info */}
        <div className="relative bg-[#0b1326] p-8 sm:p-12 flex flex-col justify-between overflow-hidden min-h-[500px]">
          
          {/* Architectural Faceted Glass Background Layer */}
          <div className="absolute inset-0 z-0">
            {/* High definition architectural glass pattern */}
            <svg className="w-full h-full object-cover opacity-25" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0f172a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                </linearGradient>
                <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <rect width="800" height="800" fill="#090d16" />
              <polygon points="0,0 400,200 200,600 0,400" fill="url(#grad1)" />
              <polygon points="400,200 800,0 800,500 500,800" fill="url(#grad2)" />
              <polygon points="200,600 500,800 0,800" fill="#030712" />
              <polygon points="400,200 500,800 200,600" fill="url(#grad1)" opacity="0.6" />
              <polygon points="0,0 800,0 400,200" fill="#1e293b" opacity="0.2" />
              <line x1="0" y1="0" x2="800" y2="800" stroke="#38bdf8" strokeWidth="1" opacity="0.15" />
              <line x1="800" y1="0" x2="0" y2="800" stroke="#38bdf8" strokeWidth="1" opacity="0.15" />
            </svg>
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?q=80&w=1200&auto=format&fit=crop" 
              alt="Architecture" 
              className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-overlay" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a] via-[#080d1a]/50 to-transparent" />
          </div>

          {/* Top Header Row */}
          <div className="relative z-10 flex items-center justify-between w-full">
            <Link href="/" className="flex items-center gap-2.5 text-white group text-decoration-none">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="font-bold text-lg text-white font-sans tracking-tight">
                SafarSet
              </span>
            </Link>

            <Link href="/" className="flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors">
              <ArrowLeft size={13} /> Back to Website
            </Link>
          </div>

          {/* Bottom Left Content Area */}
          <div className="relative z-10 space-y-3.5 max-w-md my-auto lg:my-0 pt-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight font-sans">
              Create Smarter. Export<br />Faster. Work Anywhere.
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal opacity-90">
              From quick project clips to full-length itineraries, our powerful platform lets you work seamlessly across devices.
            </p>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2 pt-2">
              <span className="w-6 h-1 rounded-full bg-white" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: Clean White Card Container */}
        <div className="bg-white p-8 sm:p-12 flex flex-col justify-center items-center w-full">
          
          <div className="w-full max-w-md space-y-5">
            
            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create Account!
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">
                Sign up to start creating with ease.
              </p>
            </div>

            {/* Error Banner */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3">
                {errors.general}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Input your full name"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                  required
                />
                {errors.name && <p className="text-[11px] text-red-600">{errors.name}</p>}
              </div>

              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Input your email"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                  required
                />
                {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Input your password"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm text-slate-900 placeholder:text-slate-400 bg-white pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-600">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Confirm Password</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm text-slate-900 placeholder:text-slate-400 bg-white"
                  required
                />
                {errors.confirm && <p className="text-[11px] text-red-600">{errors.confirm}</p>}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-xs text-slate-600 font-medium">I agree to Terms & Conditions</span>
                </label>
              </div>

              {/* Primary Black Signup Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-[#18181b] hover:bg-[#09090b] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md transition-all duration-150 disabled:opacity-50 mt-1"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Or Continue With Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="border-t border-slate-200 w-full" />
              <span className="bg-white px-3 text-[11px] text-slate-400 font-medium whitespace-nowrap uppercase tracking-wider">
                Or continue with:
              </span>
              <div className="border-t border-slate-200 w-full" />
            </div>

            {/* Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-full flex items-center justify-center gap-2.5 transition-colors shadow-sm disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>{googleLoading ? "Connecting..." : "Continue with Google"}</span>
            </button>

            {/* Bottom Login Link */}
            <p className="text-center text-xs text-slate-500 pt-1">
              Already have an account?{" "}
              <Link href="/login" className="font-bold text-slate-900 hover:underline">
                Sign in here
              </Link>
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}
