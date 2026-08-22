"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plane, Train, Bus, Car, ArrowRight, MapPin, Calendar, Sparkles, 
  Briefcase, Compass, ShieldCheck, FileDown, CheckCircle2, Star, Clock
} from "lucide-react";
import BharatParikramaHeroMap from "@/components/maps/BharatParikramaHeroMap";
import { POPULAR_DESTINATIONS, MOCK_COMMUNITY } from "@/lib/data/mockData";

export default function Home() {
  const router = useRouter();
  const [fromCity, setFromCity] = useState("Mumbai");
  const [toCity, setToCity] = useState("Delhi");
  const [startDate, setStartDate] = useState("2024-09-12");
  const [purpose, setPurpose] = useState("business");

  const handleQuickPlan = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/plan?from=${encodeURIComponent(fromCity)}&to=${encodeURIComponent(toCity)}&purpose=${purpose}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-20 overflow-hidden bg-white border-b border-slate-200">
        
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/60 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-50/40 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Pan-India Smart Travel & Itinerary Optimizer</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
                  Plan Your <span className="text-blue-700">Parikrama</span> Across India
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 font-medium mt-3 leading-relaxed">
                  Compare multi-modal transport (Flight, Vande Bharat, Bus, Car), discover budget stays, schedule meetings, explore free-time attractions, and download a complete day-by-day travel routine.
                </p>
              </div>

              {/* Quick Search & Plan Box right in Hero */}
              <form onSubmit={handleQuickPlan} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">From</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        type="text" 
                        value={fromCity} 
                        onChange={e => setFromCity(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                        placeholder="e.g. Mumbai"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">To Destination</label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        type="text" 
                        value={toCity} 
                        onChange={e => setToCity(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                        placeholder="e.g. Delhi, Ahmedabad"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Start Date</label>
                    <div className="relative">
                      <Calendar size={15} className="absolute left-3 top-3 text-slate-400" />
                      <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Purpose</label>
                    <select 
                      value={purpose} 
                      onChange={e => setPurpose(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 font-medium"
                    >
                      <option value="business">💼 Business (Meetings & Work)</option>
                      <option value="devotional">🛕 Devotional / Yatra (Pilgrimage)</option>
                      <option value="personal">🧘 Personal / Solo Travel</option>
                      <option value="family">👨‍👩‍👧‍👦 Family Vacation</option>
                      <option value="adventure">🏕️ Adventure & Picnic</option>
                      <option value="entertainment">🎪 Entertainment & Leisure</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-sm font-black uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles size={16} /> Plan My Parikrama Journey <ArrowRight size={16} />
                </button>
              </form>

              {/* Trust Specs */}
              <div className="flex items-center gap-6 pt-1 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Multi-Modal Transit</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Meeting Scheduler</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Free PDF Export</span>
              </div>

            </div>

            {/* Right Hero Visual Map */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <BharatParikramaHeroMap />
            </div>

          </div>
        </div>
      </section>

      {/* ── HOW BHARAT PARIKRAMA WORKS ──────────────────────────── */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
              Complete Travel Orchestration
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Everything for Your Journey in 4 Simple Steps
            </h2>
            <p className="text-sm text-slate-500">
              No need to switch between five different apps for transport, hotels, meetings, and sightseeing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: "✈️",
                title: "Compare Multi-Modal Transit",
                desc: "Compare Flights, Vande Bharat Trains, Buses, and Cars with fares, durations, and best-value recommendations."
              },
              {
                step: "02",
                icon: "🏨",
                title: "Select Verified Stays",
                desc: "Discover budget-friendly and top-rated hotels close to your planned destination or meeting location."
              },
              {
                step: "03",
                icon: "💼",
                title: "Schedule & Free-Slots",
                desc: "Add business meetings or pooja timings. Our engine identifies free gaps and recommends nearby attractions."
              },
              {
                step: "04",
                icon: "📄",
                title: "Get PDF Travel Routine",
                desc: "Export a day-wise itinerary with time slots, transit buffers, budget estimates, and live trigger reminders."
              },
            ].map(card => (
              <div key={card.step} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-2xl">{card.icon}</span>
                  <span className="text-xs font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{card.step}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── POPULAR TRAVEL CIRCUITS IN INDIA ─────────────────────── */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
                Popular Yatra Circuits
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">
                Top Pan-India Routes & Itineraries
              </h2>
            </div>
            <Link href="/explore" className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1">
              Explore All Destinations <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_DESTINATIONS.map(dest => (
              <Link 
                key={dest.city} 
                href={`/plan?to=${encodeURIComponent(dest.city)}`}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-900 shadow-xs hover:shadow-lg transition-all"
              >
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3.5 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">{dest.tag}</span>
                  <p className="font-extrabold text-sm">{dest.city}</p>
                  <p className="text-[10px] text-slate-300">{dest.state}</p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ────────────────────────────────── */}
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-900/50 px-3.5 py-1.5 rounded-full border border-blue-700">
            Start Planning in Seconds
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Begin Your Bharat Parikrama?
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Create an intelligent, budget-friendly, multi-modal travel itinerary with meetings, stays, and downloadable PDF report.
          </p>
          <div className="pt-2">
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs font-black uppercase tracking-wider text-slate-950 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-105"
            >
              <Sparkles size={16} /> Plan Your Parikrama Now <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
