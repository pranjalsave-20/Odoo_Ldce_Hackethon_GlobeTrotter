"use client";
import { useAuth } from "@/lib/auth/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TripsProviderWrapper from "./TripsProviderWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F7F4] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#E85D26] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-[#6B7280]">Loading SafarSet...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <TripsProviderWrapper>{children}</TripsProviderWrapper>;
}
