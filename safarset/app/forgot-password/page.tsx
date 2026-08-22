"use client";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { Button, Input } from "@/components/ui/index";
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
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
    addToast("success", "Password reset link sent to your email!");
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-[#6B7280] hover:text-[#E85D26] mb-8">
          <ArrowLeft size={14} /> Back to login
        </Link>
        <div className="card p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#E85D26]">
              <KeyRound size={24} />
            </div>
          </div>
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1C1C1E] mb-1">Forgot password?</h1>
            <p className="text-sm text-[#6B7280]">No worries, we'll send you reset instructions.</p>
          </div>

          {submitted ? (
            <div className="text-center space-y-4">
              <div className="bg-green-50 border border-green-100 text-green-700 text-sm rounded-xl px-4 py-3">
                Reset instructions have been sent to <span className="font-semibold">{email}</span>.
              </div>
              <p className="text-xs text-gray-500">Didn't receive the email? Check your spam folder or try again.</p>
              <Button variant="outline" size="md" className="w-full" onClick={() => setSubmitted(false)}>
                Try another email
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
