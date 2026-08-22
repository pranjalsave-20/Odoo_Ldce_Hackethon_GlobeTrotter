"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plane, Train, Bus, Car, ArrowRight, MapPin, Calendar, Sparkles, 
  Briefcase, Compass, ShieldCheck, FileDown, CheckCircle2, Star, Clock,
  UserCheck, Zap, Phone, Award, Play, ChevronRight, Navigation, RefreshCw,
  Video
} from "lucide-react";
import { POPULAR_DESTINATIONS, MOCK_LOCAL_CABS, MOCK_GUIDES } from "@/lib/data/mockData";

export default function Home() {
  const router = useRouter();
  const [fromCity, setFromCity] = useState("Mumbai");
  const [toCity, setToCity] = useState("Delhi");
  const [purpose, setPurpose] = useState("business");

  const handleQuickPlan = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/plan?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&purpose=${purpose}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased overflow-x-hidden">
      
      {/* ── CLEAN CINEMATIC HERO SECTION WITH LOOPING VIDEO BACKGROUND ── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950 text-white py-12 sm:py-16">
        
        {/* Full-Bleed High-Definition Looping Video in Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover scale-105 filter brightness-90 contrast-105"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradients to guarantee 100% crystal clear readability without square patterns */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Logo Emblem & Pill Badge */}
              <div className="flex items-center gap-3.5">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-amber-50/15 border border-amber-400/40 p-1 shadow-xl flex items-center justify-center shrink-0 backdrop-blur-md">
                  <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-200 text-[11px] font-black uppercase tracking-wider backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <span>MARITIME VOYAGE INTELLIGENCE</span>
                </div>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="text-5xl sm:text-6xl font-black text-white tracking-tight leading-[1.05] drop-shadow-md">
                  BHARAT PARIKRAMA
                </h1>
                
                <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight drop-shadow">
                  Pan-India Travel & Itinerary Optimization
                </h2>
                
                <p className="text-base sm:text-lg text-slate-200 font-medium pt-1 max-w-lg leading-relaxed drop-shadow">
                  Smarter journeys. Seamless experiences. Adaptive travel plans.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30 transition-all hover:scale-105"
                >
                  PLAN YOUR PARIKRAMA <ArrowRight size={16} />
                </Link>

                <a
                  href="#approach"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all"
                >
                  EXPLORE HOW IT WORKS
                </a>
              </div>

              {/* Quick Trip Planner Form Floating Over Video */}
              <form onSubmit={handleQuickPlan} className="bg-white/95 backdrop-blur-xl p-4 sm:p-5 rounded-3xl border border-white/20 shadow-2xl space-y-3 mt-4 text-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Logo" className="w-5 h-5 object-contain" />
                    <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Sparkles size={14} className="text-blue-600" /> Instant Route Planner
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    28 States + Islands
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">From (Origin)</label>
                    <input
                      type="text"
                      value={fromCity}
                      onChange={e => setFromCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900"
                      placeholder="e.g. Mumbai"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">To (Destination)</label>
                    <input
                      type="text"
                      value={toCity}
                      onChange={e => setToCity(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900"
                      placeholder="e.g. Delhi, Srinagar, Varanasi, Udaipur"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                >
                  <Navigation size={14} /> Calculate Optimal Route & Transit
                </button>
              </form>

            </div>

            {/* Right Hero: Picture-In-Picture Showcase Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="w-full rounded-3xl overflow-hidden bg-slate-900/80 backdrop-blur-xl border border-white/20 shadow-2xl p-4 sm:p-5 space-y-3.5 text-white">
                
                {/* Header with Emblem */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <img src="/logo.png" alt="Bharat Parikrama" className="w-5 h-5 object-contain" />
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      Live Voyage Stream
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                    HD Reel
                  </span>
                </div>

                {/* Looping Video Showcase Window */}
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-white/15 bg-black group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/hero.mp4" type="video/mp4" />
                    <source src="/hero.mp4" type="video/mp4" />
                  </video>

                  <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                    <img src="/logo.png" alt="Logo" className="w-3.5 h-3.5 object-contain" />
                    Bharat Parikrama Live Reel
                  </div>
                </div>

                {/* Telemetry info */}
                <div className="space-y-1.5 text-xs text-slate-300">
                  <p className="font-bold text-white">Seamless Pan-India Transit</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Compare multi-modal transit, schedule meetings with buffer time, and book verified local cabs and guides.
                  </p>
                </div>

                <Link
                  href="/plan"
                  className="block text-center w-full py-2.5 bg-white hover:bg-slate-100 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-md transition-all hover:scale-102"
                >
                  Start Custom Itinerary Now
                </Link>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── THE PROBLEM & APPROACH SECTION ──────────────────────── */}
      <section id="problem" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              The Problem & Our Solution
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Fragmented Travel Planning Across India
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Travelers currently juggle separate apps for flights, trains, cabs, stays, meeting calendars, and tourist guides. Bharat Parikrama solves this with end-to-end multi-modal routing, automatic buffer calculation, and verified local marketplace.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl">
                🔄
              </div>
              <h3 className="font-bold text-lg text-slate-900">Multi-Modal Transit Intelligence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare Flights, Vande Bharat Express, Intercity Buses, Coastal Ferries, and Expressways side-by-side with real durations and fares.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xl">
                💼
              </div>
              <h3 className="font-bold text-lg text-slate-900">Business & Meeting Scheduler</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lock your client reviews and appointments with automatic travel buffer calculation and free-time sights exploration.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl">
                🚖
              </div>
              <h3 className="font-bold text-lg text-slate-900">Uber-Style Cabs & Verified Guides</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Book commercial drivers (Sedan, SUV, EV, Auto) with phone contact or certified local heritage guides instantly.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── LOCAL TAXIS & LOCAL TOUR GUIDES MARKETPLACE ──────────── */}
      <section id="approach" className="py-16 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                Community & Local Mobility
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Local Drivers & Certified Tour Guides
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                Empowering local taxi drivers and licensed tour guides with direct traveler bookings, fair fares, and verified ratings.
              </p>
            </div>
            
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all"
            >
              Book in Your Itinerary <ArrowRight size={14} />
            </Link>
          </div>

          {/* Cabs Preview */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_LOCAL_CABS.slice(0, 4).map(cab => (
              <div key={cab.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200">
                    {cab.vehicleType}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <Zap size={11} className="fill-current" /> {cab.etaMinutes}m away
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <img src={cab.driverPhoto} alt={cab.driverName} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{cab.driverName}</h4>
                    <p className="text-xs text-slate-500 font-medium">⭐ {cab.rating} ({cab.tripsCount} trips)</p>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                  <p className="font-bold text-slate-800">{cab.vehicleModel}</p>
                  <p className="text-[11px] text-slate-500">{cab.vehicleNumber} • ₹{cab.pricePerKm}/km</p>
                </div>

                <Link
                  href="/plan"
                  className="block text-center w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Instant Book Ride
                </Link>
              </div>
            ))}
          </div>

          {/* Guides Preview */}
          <div className="grid sm:grid-cols-3 gap-6 pt-2">
            {MOCK_GUIDES.slice(0, 3).map(guide => (
              <div key={guide.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200" />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-sm text-slate-900">{guide.name}</h4>
                      <Award size={14} className="text-blue-700 fill-blue-100" />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">📍 {guide.city} • {guide.experience} yrs exp</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{guide.bio}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="font-black text-slate-900">₹{guide.pricePerHour}/hr</span>
                  <span className="font-bold text-amber-600">⭐ {guide.rating} ({guide.reviewCount})</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── POPULAR TRAVEL CIRCUITS IN INDIA ─────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                Pan-India Yatra Circuits
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Top Destinations Across India
              </h2>
            </div>
            <Link href="/explore" className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1">
              Explore All Destinations <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {POPULAR_DESTINATIONS.slice(0, 8).map(dest => (
              <Link 
                key={dest.city} 
                href={`/plan?to=${encodeURIComponent(dest.city)}`}
                className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-xs hover:shadow-lg transition-all"
              >
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-3.5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">{dest.tag}</span>
                  <p className="font-extrabold text-sm leading-tight">{dest.city}</p>
                  <p className="text-[10px] text-slate-300 font-medium">{dest.state}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ────────────────────────────────── */}
      <section className="py-16 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <div className="w-20 h-20 mx-auto rounded-3xl overflow-hidden bg-amber-50/15 border border-amber-400/40 p-1.5 shadow-xl backdrop-blur-md">
            <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Begin Your Bharat Parikrama?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Create an intelligent, budget-friendly, multi-modal travel itinerary with meetings, stays, local cabs, and downloadable PDF report.
          </p>
          <div className="pt-2">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-105"
            >
              <Sparkles size={16} /> Plan Your Parikrama Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
