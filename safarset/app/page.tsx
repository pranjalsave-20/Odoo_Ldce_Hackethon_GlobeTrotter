"use client";

import Link from "next/link";
import { ArrowRight, Compass, Shield, Zap, Layers, CheckCircle2, MapPin, Sparkles, Navigation, Globe, ArrowUpRight } from "lucide-react";
import BharatParikramaHeroMap from "@/components/maps/BharatParikramaHeroMap";
import BottomWavyTimeline from "@/components/landing/BottomWavyTimeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden bg-white border-b border-slate-200">
        
        {/* Subtle grid pattern & glow */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#1e3a8a 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-100/40 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Hero Text */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-black tracking-wider uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>MARITIME VOYAGE & TRANSIT INTELLIGENCE</span>
              </div>

              {/* Main Headlines */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.05] uppercase">
                  BHARAT PARIKRAMA
                </h1>
                
                <h2 className="text-xl sm:text-2xl font-extrabold text-blue-900 tracking-tight">
                  Pan–India Travel & Itinerary Optimization
                </h2>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed pt-2">
                  Smarter journeys. Seamless multi-modal experiences. Real-time adaptive travel plans across air, rail, sea, and roads.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-white bg-blue-900 hover:bg-blue-950 shadow-lg shadow-blue-900/20 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  PLAN YOUR PARIKRAMA <ArrowRight size={16} />
                </Link>

                <Link
                  href="#problem"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 shadow-xs transition-all duration-200"
                >
                  EXPLORE HOW IT WORKS
                </Link>
              </div>

              {/* Stat Cards Grid */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-200/80">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <p className="text-xl font-black text-slate-900">28+ States</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Pan-India Network</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/70">
                  <p className="text-xl font-black text-blue-900">Multi-Modal</p>
                  <p className="text-xs text-blue-700/80 font-medium mt-0.5">Air, Rail, Sea & Road</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <p className="text-xl font-black text-slate-900">Real-Time</p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Adaptive Rerouting</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Interactive Map */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <BharatParikramaHeroMap />
            </div>

          </div>
        </div>
      </section>

      {/* Bottom Timeline Ribbon Section */}
      <BottomWavyTimeline />

      {/* SECTION: THE PROBLEM */}
      <section id="problem" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold text-blue-800 tracking-widest uppercase bg-blue-100/80 px-3.5 py-1.5 rounded-full border border-blue-200">
              Current Challenges
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              The Problem with Multi-Modal Travel in India
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Navigating multiple transport systems across states often leads to fragmentation, delays, and unexpected route disruptions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
                01
              </div>
              <h3 className="text-lg font-bold text-slate-950">Fragmented Schedules</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Flights, Vande Bharat trains, and coastal ferries operate on isolated schedules without synchronized transfer windows.
              </p>
            </div>

            <div className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
                02
              </div>
              <h3 className="text-lg font-bold text-slate-950">Unpredictable Delays</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Weather shifts, rail maintenance, or ocean wave surges often cause cascading delays across connecting legs of a trip.
              </p>
            </div>

            <div className="bg-slate-50/80 p-8 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
                03
              </div>
              <h3 className="text-lg font-bold text-slate-950">Manual Re-Planning</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Travelers are forced to manually re-book accommodation and transit when a single leg fails, causing stress and financial loss.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION: APPROACH */}
      <section id="approach" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-extrabold text-blue-800 tracking-widest uppercase bg-blue-100 px-3.5 py-1.5 rounded-full border border-blue-200">
                Institutional Approach
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                Unified Command Engine for Pan-India Travel
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Bharat Parikrama synthesizes real-time transit telemetry from air corridors, rail networks, and maritime sea lanes into one continuous, adaptive itinerary.
              </p>

              <div className="space-y-3.5 pt-2">
                {[
                  "Dynamic Multi-Modal Transit Optimization (Air, Rail, Ferry, Road)",
                  "Autonomous Rerouting with Buffer Time Guarantee",
                  "Verified Cultural & Heritage Waypoints Across 28 States",
                  "Integrated Emergency Assistance & Weather Telemetry",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-blue-700 shrink-0" />
                    <span className="text-sm font-bold text-slate-800">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-black uppercase text-white bg-blue-900 hover:bg-blue-950 shadow-md transition-all"
                >
                  ENTER COMMAND ROOM <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Visual Card Stack */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold">
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
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">✈️</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Flight Leg #BP-402</p>
                      <p className="text-[11px] text-slate-500">Delhi (DEL) → Kochi (COK)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">On Time</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🚢</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Maritime Ferry #MF-12</p>
                      <p className="text-[11px] text-slate-500">Kochi → Kavaratti (Lakshadweep)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Smooth Sea</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">🚆</span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Vande Bharat #VB-208</p>
                      <p className="text-[11px] text-slate-500">Varanasi → New Delhi</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Reserved</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 bg-blue-950 text-white relative overflow-hidden">
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-[1.02]"
            >
              LAUNCH COMMAND ROOM <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
