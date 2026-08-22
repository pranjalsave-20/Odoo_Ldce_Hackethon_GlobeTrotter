"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useToast } from "@/components/ui/Toast";
import { Button, Input } from "@/components/ui/index";
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react";

export default function SignupPage() {
  const { signup } = useAuth();
  const { addToast } = useToast();
  const router = useRouter();
  const [form, setForm] = useState({ name:"", email:"", password:"", confirm:"" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});

  const validate = () => {
    const e: Record<string,string> = {};
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
    setLoading(true);
    const res = await signup(form.name, form.email, form.password);
    if (res.success) {
      addToast("success", "Account created! Welcome to SafarSet 🎉");
      router.push("/dashboard");
    } else {
      setErrors({ general: res.error || "Signup failed" });
      setLoading(false);
    }
  };

  const strength = form.password.length >= 12 ? "Strong" : form.password.length >= 8 ? "Good" : form.password.length > 0 ? "Weak" : "";
  const strengthColor = strength === "Strong" ? "text-green-500" : strength === "Good" ? "text-yellow-500" : "text-red-500";

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#E85D26] to-[#C44A1A] relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80" alt="Rajasthan" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="relative flex flex-col justify-between p-12 h-full">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#E85D26] text-sm font-bold">S</div>
            SafarSet
          </Link>
          <div>
            <h2 className="text-4xl font-bold text-white mb-4">Start Your<br />Safar Today</h2>
            <p className="text-orange-100 mb-8">Join 50,000+ travellers who plan smarter with AI.</p>
            <div className="space-y-3">
              {["AI-powered itinerary generation","Business meeting scheduler","Smart budget tracking","Free-time explorer near venues"].map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0"><Check size={10} className="text-white" /></div>
                  <span className="text-sm text-orange-100">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-orange-200">Free to use • No credit card required</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#E85D26] mb-8">
            <ArrowLeft size={14} /> Back to home
          </Link>
          <div className="card p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-[#1C1C1E] mb-1">Create your account</h1>
              <p className="text-sm text-[#6B7280]">Start planning smarter trips today</p>
            </div>
            {errors.general && <div className="bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">{errors.general}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Full Name" type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Arjun Mehta" error={errors.name} required />
              <Input label="Email address" type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="arjun@example.com" error={errors.email} required />
              <div className="relative">
                <Input label="Password" type={showPw ? "text" : "password"} value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="Minimum 8 characters" error={errors.password} required />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-9 text-gray-400"><EyeOff size={15}/></button>
                {strength && <span className={`text-xs font-medium ${strengthColor} mt-0.5 block`}>{strength} password</span>}
              </div>
              <Input label="Confirm Password" type="password" value={form.confirm} onChange={e => setForm({...form, confirm:e.target.value})} placeholder="Re-enter password" error={errors.confirm} required />
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">Create Account</Button>
            </form>
            <button className="mt-4 w-full border border-[#E5E0D8] rounded-xl py-2.5 text-sm font-medium text-[#1C1C1E] hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <span className="text-base">G</span> Sign up with Google
            </button>
            <p className="text-center text-sm text-[#6B7280] mt-6">
              Already have an account? <Link href="/login" className="text-[#E85D26] font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
