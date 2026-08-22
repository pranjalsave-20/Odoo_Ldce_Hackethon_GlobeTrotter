"use client";

import Link from "next/link";
import { ArrowRight, Compass, Shield, Zap, RefreshCw, Layers, CheckCircle2, MapPin, Anchor, Plane, Train, Sparkles } from "lucide-react";
import BharatParikramaHeroMap from "@/components/maps/BharatParikramaHeroMap";
import BottomWavyTimeline from "@/components/landing/BottomWavyTimeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* HERO SECTION matching user image */}
      <section className="relative pt-10 pb-16 overflow-hidden bg-grid-pattern border-b border-slate-200">
        
        {/* Subtle radial glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-transparent to-slate-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Text Column */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/90 border border-blue-200 text-blue-800 text-xs font-extrabold tracking-wider uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                MARITIME VOYAGE INTELLIGENCE
              </div>

              {/* Main Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.05] uppercase">
                  BHARAT PARIKRAMA
                </h1>
                
                <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mt-2 tracking-tight">
                  Pan–India Travel & Itinerary Optimization
                </h2>

                <p className="text-base sm:text-lg text-slate-600 font-medium mt-3 leading-relaxed">
                  Smarter journeys. Seamless experiences. Adaptive travel plans.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 shadow-lg shadow-blue-900/20 hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  PLAN YOUR PARIKRAMA <ArrowRight size={16} />
                </Link>

                <Link
                  href="#approach"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full text-xs font-bold uppercase tracking-wider text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 hover:border-slate-400 shadow-sm transition-all"
                >
                  EXPLORE HOW IT WORKS
                </Link>
              </div>

              {/* Quick Specs / Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200/80">
                <div>
                  <p className="text-lg font-black text-slate-900">28+ States</p>
                  <p className="text-xs text-slate-500 font-medium">Pan-India Network</p>
                </div>
                <div>
                  <p className="text-lg font-black text-blue-800">Multi-Modal</p>
                  <p className="text-xs text-slate-500 font-medium">Air, Rail, Sea & Road</p>
                </div>
                <div>
                  <p className="text-lg font-black text-slate-900">Real-Time</p>
                  <p className="text-xs text-slate-500 font-medium">Adaptive Rerouting</p>
                </div>
              </div>

            </div>

            {/* Right Hero Map Column */}
            <div className="lg:col-span-6 flex justify-center">
              <BharatParikramaHeroMap />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Wavy Timeline Ribbon */}
      <BottomWavyTimeline />

      {/* SECTION: THE PROBLEM */}
      <section id="problem" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-extrabold text-blue-700 tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Current Challenges
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-4 tracking-tight">
              The Problem with Multi-Modal Travel in India
            </h2>
            <p className="text-slate-600 mt-3 text-base">
              Navigating multiple transport systems across states often leads to fragmentation, delays, and unexpected route disruptions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-900">Fragmented Schedules</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Flights, Vande Bharat trains, and coastal ferries operate on isolated schedules without synchronized transfer windows.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-900">Unpredictable Delays</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Weather shifts, rail maintenance, or ocean wave surges often cause cascading delays across connecting legs of a trip.
              </p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xl">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-900">Manual Re-Planning</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Travelers are forced to manually re-book accommodation and transit when a single leg fails, causing stress and financial loss.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: APPROACH */}
      <section id="approach" className="py-20 bg-slate-50 border-b border-slate-200 bg-grid-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-extrabold text-blue-700 tracking-widest uppercase bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
                Institutional Approach
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Unified Command Engine for Pan-India Travel
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Bharat Parikrama synthesizes real-time transit telemetry from air corridors, rail networks, and maritime sea lanes into one continuous, adaptive itinerary.
              </p>

              <div className="space-y-4 pt-2">
                {[
                  "Dynamic Multi-Modal Transit Optimization (Air, Rail, Ferry, Road)",
                  "Autonomous Rerouting with Buffer Time Guarantee",
                  "Verified Cultural & Heritage Waypoints Across 28 States",
                  "Integrated Emergency Assistance & Weather Telemetry",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-blue-700 shrink-0" />
                    <span className="text-sm font-semibold text-slate-800">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-extrabold uppercase text-white bg-blue-700 hover:bg-blue-800 shadow-md transition-all"
                >
                  ENTER COMMAND ROOM <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Visual Card Stack */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">AI Route Matrix</h4>
                    <p className="text-xs text-slate-500">Active Monitoring</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  ● Operational
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">✈️</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Flight Leg #BP-402</p>
                      <p className="text-[11px] text-slate-500">Delhi (DEL) → Kochi (COK)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">On Time</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🚢</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Maritime Ferry #MF-12</p>
                      <p className="text-[11px] text-slate-500">Kochi → Kavaratti (Lakshadweep)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700">Smooth Sea</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🚆</span>
                    <div>
                      <p className="text-xs font-bold text-slate-800">Vande Bharat #VB-208</p>
                      <p className="text-[11px] text-slate-500">Varanasi → New Delhi</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">Reserved</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Plan Your Bharat Parikrama?
          </h2>
          <p className="text-blue-200 max-w-2xl mx-auto text-base">
            Create optimized multi-modal travel itineraries across India with real-time route intelligence.
          </p>
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-black uppercase tracking-wider text-blue-950 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-[1.03]"
            >
              LAUNCH COMMAND ROOM <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
