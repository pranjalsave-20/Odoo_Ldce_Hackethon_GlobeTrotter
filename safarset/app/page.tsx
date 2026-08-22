"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Plane, Train, Bus, Car, ArrowRight, MapPin, Calendar, Sparkles, 
  Briefcase, Compass, ShieldCheck, FileDown, CheckCircle2, Star, Clock,
  UserCheck, Zap, Phone, Award
} from "lucide-react";
import BharatParikramaHeroMap from "@/components/maps/BharatParikramaHeroMap";
import { POPULAR_DESTINATIONS, MOCK_LOCAL_CABS, MOCK_GUIDES } from "@/lib/data/mockData";

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
      <section className="relative pt-6 pb-16 lg:pt-12 lg:pb-20 overflow-hidden bg-white border-b border-slate-200">
        
        {/* Subtle Background Lighting */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/70 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-50/50 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-black uppercase tracking-wider">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span>Pan-India Smart Travel & Itinerary Optimizer</span>
              </div>

              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.08]">
                  Plan Your <span className="text-blue-700">Parikrama</span> Across India
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 font-medium mt-3 leading-relaxed">
                  Compare multi-modal transport (Flight, Vande Bharat, Bus, Cab), book verified local guides & taxis like Uber, schedule meetings, and download a complete day-by-day travel routine.
                </p>
              </div>

              {/* Quick Search & Plan Box right in Hero */}
              <form onSubmit={handleQuickPlan} className="bg-slate-50 p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Origin City</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={fromCity} 
                        onChange={e => setFromCity(e.target.value)} 
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold"
                        placeholder="e.g. Mumbai"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Destination City</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input 
                        type="text" 
                        value={toCity} 
                        onChange={e => setToCity(e.target.value)} 
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold"
                        placeholder="e.g. Delhi, Ahmedabad"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Journey Start Date</label>
                    <div className="relative">
                      <Calendar size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                      <input 
                        type="date" 
                        value={startDate} 
                        onChange={e => setStartDate(e.target.value)} 
                        className="w-full pl-10 pr-3 py-2.5 text-sm bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Purpose of Travel</label>
                    <select 
                      value={purpose} 
                      onChange={e => setPurpose(e.target.value)}
                      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 font-semibold"
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
                  className="w-full py-4 rounded-2xl text-sm font-black uppercase tracking-wider text-white bg-blue-700 hover:bg-blue-800 shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Sparkles size={18} /> Plan My Parikrama Journey <ArrowRight size={18} />
                </button>
              </form>

              {/* Trust Specs */}
              <div className="flex items-center gap-6 pt-1 text-xs font-bold text-slate-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Multi-Modal Transit</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Meeting Scheduler</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 size={15} className="text-emerald-600" /> Local Cabs & Guides</span>
              </div>

            </div>

            {/* Right Hero Visual Map */}
            <div className="lg:col-span-6 flex justify-center w-full">
              <BharatParikramaHeroMap />
            </div>

          </div>
        </div>
      </section>

      {/* ── LOCAL TAXIS & LOCAL TOUR GUIDES MARKETPLACE (UBER STYLE) ── */}
      <section className="py-16 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
                Local Mobility & Guides Marketplace
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Book Local Cabs & Certified Guides in Seconds
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                Just like Uber, local commercial drivers and certified tour guides earn fair wages while giving you safe, meter-based rides and authentic heritage tours.
              </p>
            </div>
            
            <Link
              href="/plan"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-black uppercase tracking-wider shadow-sm transition-all"
            >
              Book in Your Itinerary <ArrowRight size={14} />
            </Link>
          </div>

          {/* Cabs Preview Carousel Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_LOCAL_CABS.map(cab => (
              <div key={cab.id} className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
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

          {/* Certified Guides Showcase */}
          <div className="grid sm:grid-cols-3 gap-6 pt-4">
            {MOCK_GUIDES.map(guide => (
              <div key={guide.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-all space-y-3">
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
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
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
      <section className="py-16 bg-slate-950 text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="text-xs font-black uppercase tracking-widest text-blue-400 bg-blue-900/50 px-3.5 py-1.5 rounded-full border border-blue-700">
            Start Planning in Seconds
          </span>
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
