"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button, Input } from "@/components/ui/index";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("arjun@example.com");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
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
              <p className="text-xs text-orange-700 font-medium">🎯 Demo Account</p>
              <p className="text-xs text-orange-600 mt-0.5">Email: arjun@example.com | Password: password123</p>
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
            <button className="mt-4 w-full border border-[#E5E0D8] rounded-xl py-2.5 text-sm font-medium text-[#1C1C1E] hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <span className="text-base">G</span> Continue with Google
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
