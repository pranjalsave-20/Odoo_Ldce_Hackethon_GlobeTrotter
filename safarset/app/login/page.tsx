"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button, Input } from "@/components/ui/index";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("arjun@example.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill all fields"); return; }
    setLoading(true); setError("");
    const res = await login(email, password);
    if (res.success) {
      addToast("success", "Welcome back! 🎉");
      router.push("/dashboard");
    } else {
      setError(res.error || "Login failed");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true); setError("");
    const res = await loginWithGoogle();
    if (res.success) {
      addToast("success", "Signed in with Google! 🎉");
      router.push("/dashboard");
    } else {
      setError(res.error || "Google sign-in failed");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1A3A5C] relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80" alt="India travel" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="relative flex flex-col justify-between p-12 h-full">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-[#E85D26] rounded-lg flex items-center justify-center text-sm">S</div>
            Safar<span className="text-[#E85D26]">Set</span>
          </Link>
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Plan Karo.<br />Safar Set Karo.</h2>
            <p className="text-blue-200">India's AI-powered travel planning platform. From transport to meetings to hidden gems — all in one place.</p>
          </div>
          <div className="flex gap-6">
            {[["50K+","Trips Planned"],["200+","Destinations"],["4.9★","Rating"]].map(([n,l]) => (
              <div key={l}><p className="text-2xl font-bold text-white">{n}</p><p className="text-xs text-blue-300">{l}</p></div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#E85D26] mb-8">
            <ArrowLeft size={14} /> Back to home
          </Link>
          <div className="card p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#1C1C1E] mb-1">Welcome back</h1>
              <p className="text-sm text-[#6B7280]">Sign in to your SafarSet account</p>
            </div>
            {/* Demo hint */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-6">
              <p className="text-xs text-orange-700 font-medium">🎯 Demo Account / Firebase Auth</p>
              <p className="text-xs text-orange-600 mt-0.5">Demo Email: arjun@example.com | Password: password123</p>
            </div>
            {error && <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Email address" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
              <div className="relative">
                <Input label="Password" type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-9 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#6B7280] cursor-pointer">
                  <input type="checkbox" className="rounded" /> Remember me
                </label>
                <Link href="/forgot-password" className="text-sm text-[#E85D26] hover:underline">Forgot password?</Link>
              </div>
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">Sign In</Button>
            </form>
            <div className="mt-4 flex items-center gap-3">
              <hr className="flex-1 border-[#E5E0D8]" />
              <span className="text-xs text-[#6B7280]">or continue with</span>
              <hr className="flex-1 border-[#E5E0D8]" />
            </div>
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="mt-4 w-full border border-[#E5E0D8] rounded-xl py-2.5 text-sm font-medium text-[#1C1C1E] hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </button>
            <p className="text-center text-sm text-[#6B7280] mt-6">
              Don't have an account? <Link href="/signup" className="text-[#E85D26] font-medium hover:underline">Sign up free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
