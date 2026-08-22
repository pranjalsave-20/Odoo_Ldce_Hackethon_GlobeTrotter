"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button } from "@/components/ui/index";
import BharatParikramaHeroMap from "@/components/maps/BharatParikramaHeroMap";
import Link from "next/link";
import { 
  Plus, Calendar, MapPin, Sparkles, Compass, History, 
  ExternalLink, ArrowRight, Train, Plane, Hotel, ShieldCheck, FileDown 
} from "lucide-react";
import { useState, useEffect } from "react";
import type { Trip } from "@/lib/types";
import { generateTripPDF } from "@/lib/services/pdfGenerator";

export default function UserDashboard() {
  const { user } = useAuth();
  const { trips } = useTrips();
  const [greeting, setGreeting] = useState("Good Morning");
  const [upcomingTrip, setUpcomingTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const hr = new Date().getHours();
    if (hr >= 12 && hr < 17) setGreeting("Good Afternoon");
    else if (hr >= 17) setGreeting("Good Evening");
    else setGreeting("Good Morning");

    const nowStr = new Date().toISOString().split("T")[0];
    const upcoming = trips.find(t => t.startDate >= nowStr) || trips[0];
    setUpcomingTrip(upcoming || null);
  }, [trips]);

  const totalBudget = trips.reduce((acc, t) => acc + (t.budgetAmount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">

      {/* ── TOP HEADER WITH LOGO & GREETING ────────────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-amber-50/30 border border-amber-400/40 p-1 shadow-md flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-[10px] font-black uppercase tracking-wider border border-blue-200">
              <Sparkles size={12} className="text-blue-600" /> BHARAT PARIKRAMA COMMAND ROOM
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
              {greeting}, {user?.name.split(" ")[0] || "Traveler"}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Real-time telemetry, active transit corridors, and saved yatra workspaces.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Link href="/trips">
            <Button variant="outline" size="md" className="rounded-2xl font-bold">
              <Calendar size={15} /> My Parikramas
            </Button>
          </Link>
          <Link href="/plan">
            <Button variant="primary" size="md" className="rounded-2xl bg-blue-600 hover:bg-blue-700 font-black shadow-lg shadow-blue-500/20">
              <Plus size={16} /> Plan New Parikrama
            </Button>
          </Link>
        </div>
      </div>

      {/* ── METRIC TILES ───────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Active Parikramas</span>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{trips.length}</p>
          <span className="text-[11px] text-emerald-600 font-bold mt-0.5 block">Across 28 States & UTs</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Total Planned Budget</span>
          <p className="text-2xl sm:text-3xl font-black text-blue-600 mt-1">₹{totalBudget.toLocaleString("en-IN")}</p>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">Estimated across all yatras</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Transit Corridors</span>
          <p className="text-2xl sm:text-3xl font-black text-indigo-600 mt-1">Vande Bharat</p>
          <span className="text-[11px] text-slate-500 font-medium mt-0.5 block">+ Air India Direct</span>
        </div>
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Community Yatras</span>
          <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">1,400+</p>
          <span className="text-[11px] text-amber-700 font-bold mt-0.5 block">Shared by Pilgrims</span>
        </div>
      </div>

      {/* ── MAIN DASHBOARD GRID ────────────────────────────────────── */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Left 7 Cols: Next Active Trip */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                <h2 className="text-lg font-black text-slate-900">Next Scheduled Parikrama</h2>
              </div>
              <span className="text-xs font-black uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Ready for Travel
              </span>
            </div>

            {upcomingTrip ? (
              <div className="space-y-5">
                <div className="relative rounded-2xl overflow-hidden h-48 sm:h-56 bg-slate-900 border border-slate-200">
                  <img
                    src={upcomingTrip.coverImage || "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80"}
                    alt={upcomingTrip.name}
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-black uppercase text-white bg-blue-600 px-3 py-1 rounded-full shadow-md">
                      {upcomingTrip.purpose}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold text-amber-300">
                      📍 {upcomingTrip.from} → {upcomingTrip.stops.map(s => s.city).join(" → ")}
                    </p>
                    <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 drop-shadow">
                      {upcomingTrip.name}
                    </h3>
                  </div>
                </div>

                {/* Quick details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Dates</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{upcomingTrip.startDate}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Transit Mode</span>
                    <span className="font-bold text-slate-900 mt-0.5 block truncate">{upcomingTrip.transport?.provider || "Vande Bharat"}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-slate-400 block font-bold text-[10px] uppercase">Planned Budget</span>
                    <span className="font-black text-emerald-700 mt-0.5 block">₹{upcomingTrip.budgetAmount?.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 gap-3 flex-wrap">
                  <button
                    onClick={() => generateTripPDF(upcomingTrip)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    <FileDown size={14} /> Download PDF Itinerary
                  </button>

                  <Link href={`/trips/${upcomingTrip.id}/overview`}>
                    <Button variant="primary" size="md" className="rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-black uppercase">
                      Open Workspace <ArrowRight size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            ) : null}

          </Card>
        </div>

        {/* Right 5 Cols: Interactive Pan-India Map Mini */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-blue-600" />
                <h2 className="text-base font-black text-slate-900">Pan-India Route Telemetry</h2>
              </div>
              <Link href="/explore" className="text-xs font-bold text-blue-600 hover:underline">
                Full Map →
              </Link>
            </div>
            
            <p className="text-xs text-slate-500 font-medium">
              Click any node to view travel circuits, transit durations, and regional highlights.
            </p>

            <div className="w-full overflow-hidden rounded-2xl border border-slate-100">
              <BharatParikramaHeroMap />
            </div>
          </Card>
        </div>

      </div>

    </div>
  );
}
