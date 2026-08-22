"use client";

import { useEffect, useState, use } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTrips } from "@/lib/context/TripsContext";
import Link from "next/link";
import { 
  Calendar, MapPin, Wallet, Sparkles, Navigation, 
  Info, FileDown, BookOpen, Car, Share2 
} from "lucide-react";
import type { Trip } from "@/lib/types";
import { generateTripPDF } from "@/lib/services/pdfGenerator";
import { useToast } from "@/components/ui/Toast";

export default function TripWorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { getTrip } = useTrips();
  const { addToast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const t = getTrip(resolvedParams.id);
    if (!t) {
      router.push("/trips");
    } else {
      setTrip(t);
    }
  }, [resolvedParams.id, getTrip, router]);

  if (!trip) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Info, path: `/trips/${trip.id}/overview` },
    { id: "itinerary", label: "Itinerary & Routine", icon: Calendar, path: `/trips/${trip.id}/itinerary` },
    { id: "services", label: "Local Cabs & Guides", icon: Car, path: `/trips/${trip.id}/services` },
    { id: "budget", label: "Budget Planner", icon: Wallet, path: `/trips/${trip.id}/budget` },
    { id: "emergency", label: "Emergency Assist", icon: Navigation, path: `/trips/${trip.id}/emergency` },
    { id: "memories", label: "Memories & Journal", icon: BookOpen, path: `/trips/${trip.id}/memories` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* ── HIGH-CONTRAST WORKSPACE HEADER BANNER ────────────────────── */}
      <div className="relative p-6 sm:p-8 rounded-3xl overflow-hidden bg-[#0a1128] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 border border-slate-800 shadow-2xl">
        
        {/* Cover image with strong dark gradients for 100% text readability */}
        {trip.coverImage && (
          <img 
            src={trip.coverImage} 
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none filter brightness-75 contrast-125" 
            alt="" 
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1128] via-[#0a1128]/95 to-[#0a1128]/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-[#0a1128]/60 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-amber-50/15 border border-amber-400/50 p-1 shadow-xl shrink-0 backdrop-blur-md flex items-center justify-center">
            <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="bg-blue-600 text-white text-[11px] px-3 py-0.5 rounded-full font-black uppercase tracking-wider shadow-md">
                {trip.purpose}
              </span>
              <span className="text-xs text-amber-300 font-bold drop-shadow">
                📍 {trip.from} → {trip.stops.map(s => s.city).join(" → ")}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-snug drop-shadow-md">
              {trip.name}
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 flex items-center gap-2 font-medium drop-shadow">
              <Calendar size={14} className="text-blue-400" /> {trip.startDate} to {trip.endDate} ({trip.duration})
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="relative z-10 flex items-center gap-3 shrink-0 flex-wrap">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                addToast("success", "Parikrama link copied to clipboard!");
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all shadow-sm"
          >
            <Share2 size={14} /> Share Link
          </button>

          <button
            onClick={() => generateTripPDF(trip)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
          >
            <FileDown size={14} /> Export PDF Report
          </button>
        </div>

      </div>

      {/* ── WORKSPACE TABS WITH HIGH-CONTRAST SELECTION ──────────────── */}
      <div className="flex border-b border-slate-200 overflow-x-auto pb-2 gap-2 sm:gap-3 bg-white p-2 rounded-2xl shadow-xs">
        {tabs.map((tab) => {
          const isSelected = pathname === tab.path || pathname.endsWith(tab.id);
          return (
            <Link key={tab.id} href={tab.path} className="shrink-0">
              <span className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 font-black"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}>
                <tab.icon size={15} /> {tab.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="pt-2">{children}</div>

    </div>
  );
}
