"use client";

import React, { useState } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Button, Card } from "@/components/ui/index";
import Link from "next/link";
import { 
  Calendar, MapPin, Plus, Trash2, ArrowRight, Share2, 
  Sparkles, Train, Plane, Hotel, Briefcase, FileDown,
  Navigation, ShieldCheck, CheckCircle2, Clock
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { generateTripPDF } from "@/lib/services/pdfGenerator";

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTrips();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "ongoing" | "completed">("all");

  const nowStr = new Date().toISOString().split("T")[0];

  const filteredTrips = trips.filter((t) => {
    if (activeTab === "all") return true;
    if (activeTab === "completed") return t.endDate < nowStr;
    if (activeTab === "ongoing") return t.startDate <= nowStr && t.endDate >= nowStr;
    return t.startDate > nowStr;
  });

  const tabCount = (tab: typeof activeTab) => {
    if (tab === "all") return trips.length;
    return trips.filter(t => {
      if (tab === "completed") return t.endDate < nowStr;
      if (tab === "ongoing") return t.startDate <= nowStr && t.endDate >= nowStr;
      return t.startDate > nowStr;
    }).length;
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteTrip(id);
      addToast("success", `"${name}" removed from your parikramas.`);
    }
  };

  const totalBudget = trips.reduce((acc, t) => acc + (t.budgetAmount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">

      {/* ── TOP STATS & ACTIONS HEADER ─────────────────────────────── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-amber-50/30 border border-amber-400/40 p-1 shadow-md flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-[10px] font-black uppercase tracking-wider border border-blue-200">
              <Sparkles size={12} className="text-blue-600" /> ACTIVE YATRA WORKSPACE
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
              My Parikramas & Itineraries
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Manage multi-modal transit corridors, hotel bookings, business meetings, and local services.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <Link href="/explore">
            <Button variant="outline" size="md" className="rounded-2xl font-bold">
              <Navigation size={15} /> Explore Map
            </Button>
          </Link>

          <Link href="/plan">
            <Button variant="primary" size="md" className="rounded-2xl bg-blue-600 hover:bg-blue-700 font-black shadow-lg shadow-blue-500/20">
              <Plus size={16} /> Plan New Parikrama
            </Button>
          </Link>
        </div>

      </div>

      {/* ── STATS SUMMARY BAR ───────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Parikramas</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{trips.length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Upcoming Departures</span>
          <span className="text-2xl font-black text-blue-600 mt-1 block">{tabCount("upcoming")}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">States Connected</span>
          <span className="text-2xl font-black text-emerald-600 mt-1 block">6 States</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Budget Planned</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">₹{totalBudget.toLocaleString("en-IN")}</span>
        </div>
      </div>

      {/* ── FILTER TABS ────────────────────────────────────────────── */}
      <div className="flex border-b border-slate-200 gap-2 sm:gap-4 overflow-x-auto pb-1">
        {(["all", "upcoming", "ongoing", "completed"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border shrink-0 ${
              activeTab === tab
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {tab === "all" ? "All Yatras" : tab} <span className="ml-1 opacity-70">({tabCount(tab)})</span>
          </button>
        ))}
      </div>

      {/* ── TRIPS CARDS GRID ───────────────────────────────────────── */}
      {filteredTrips.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(t => (
            <Card key={t.id} className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between bg-white group">
              
              {/* Card Image Banner */}
              <div className="h-48 overflow-hidden relative bg-slate-900">
                <img
                  src={t.coverImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80"}
                  alt={t.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider shadow-sm">
                    {t.purpose}
                  </span>
                  
                  <span className="bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                    {t.duration}
                  </span>
                </div>

                {/* Bottom City Route */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                    <MapPin size={12} /> {t.from} → {t.stops.map(s => s.city).join(" → ")}
                  </p>
                  <h3 className="font-extrabold text-base text-white line-clamp-1 mt-0.5">
                    {t.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                {/* Transit & Hotel Badges */}
                <div className="space-y-2 text-xs">
                  
                  {/* Dates */}
                  <div className="flex items-center justify-between text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar size={13} className="text-blue-600" /> {t.startDate} – {t.endDate}
                    </span>
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Active
                    </span>
                  </div>

                  {/* Mode & Accommodation Info */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                    {t.transport && (
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                        <Train size={13} className="text-blue-600 shrink-0" />
                        <span>{t.transport.provider} ({t.transport.duration})</span>
                      </p>
                    )}
                    {t.hotel && (
                      <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5 truncate">
                        <Hotel size={13} className="text-amber-600 shrink-0" />
                        <span>{t.hotel.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Budget preview */}
                  <div className="flex items-center justify-between text-xs font-bold pt-1">
                    <span className="text-slate-500">Est. Budget</span>
                    <span className="text-slate-900 font-black">₹{t.budgetAmount?.toLocaleString("en-IN") || "20,000"}</span>
                  </div>

                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => generateTripPDF(t)}
                      className="p-2 text-slate-500 hover:text-blue-700 rounded-xl hover:bg-blue-50 transition-colors"
                      title="Download PDF Itinerary"
                    >
                      <FileDown size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                      title="Delete Parikrama"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <Link href={`/trips/${t.id}/overview`} className="flex-1 max-w-[140px]">
                    <Button variant="primary" size="sm" className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-black uppercase">
                      Open Workspace <ArrowRight size={13} />
                    </Button>
                  </Link>
                </div>

              </div>

            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <Sparkles size={28} />
          </div>
          <h3 className="text-lg font-black text-slate-900">No Parikramas Found</h3>
          <p className="text-xs text-slate-500">
            You don&apos;t have any trips in this category. Launch the trip planner to generate an optimized itinerary.
          </p>
          <Link href="/plan" className="inline-block pt-2">
            <Button variant="primary" size="md" className="rounded-2xl bg-blue-600 font-bold">
              Plan Your First Parikrama
            </Button>
          </Link>
        </div>
      )}

    </div>
  );
}
