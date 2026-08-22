"use client";
import Link from "next/link";
import { ArrowRight, Sparkles, Map, Calendar, Users, Shield, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IndiaMapSVG from "@/components/maps/IndiaMapSVG";
import { POPULAR_DESTINATIONS, MOCK_COMMUNITY } from "@/lib/data/mockData";

const HOW_IT_WORKS = [
  { step:"01", title:"Tell Us Your Plans", desc:"Enter your destination, dates, purpose and budget. Add meetings if it's a business trip.", icon:"🗺️" },
  { step:"02", title:"AI Builds Your Itinerary", desc:"SafarSet intelligently creates a day-by-day plan with transport, hotels, food and activities.", icon:"✨" },
  { step:"03", title:"Travel & Adapt", desc:"Use Safar AI throughout your trip to explore, adjust your schedule and discover hidden gems.", icon:"🧳" },
];

const FEATURES = [
  { title:"Business Travel Mode", desc:"Schedule meetings, block conflict-free time, explore near your venue during free hours.", icon:"💼", color:"bg-blue-50 text-blue-600" },
  { title:"Smart Free-Time Explorer", desc:"Given your meeting at 2 PM, we suggest what you can visit in the time you have.", icon:"⏱", color:"bg-orange-50 text-orange-600" },
  { title:"Budget Intelligence", desc:"Track spending across transport, hotels, food and activities with visual dashboards.", icon:"₹", color:"bg-green-50 text-green-600" },
  { title:"Safar AI Assistant", desc:"Ask anything — reschedule meetings, find vegetarian food, handle emergencies.", icon:"🤖", color:"bg-purple-50 text-purple-600" },
  { title:"Multi-City Routes", desc:"Mumbai → Ahmedabad → Udaipur → Jaipur, all in one intelligent plan.", icon:"✈️", color:"bg-yellow-50 text-yellow-600" },
  { title:"PDF Trip Report", desc:"Download a professional trip report with itinerary, budget and memories.", icon:"📄", color:"bg-red-50 text-red-600" },
];

const TESTIMONIALS = [
  { name:"Riya Desai", city:"Surat", text:"Safar AI rescheduled my entire second day in 10 seconds when my meeting was moved. Incredible!", rating:5, avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80" },
  { name:"Vikram Nair", city:"Bangalore", text:"The business travel mode is exactly what corporate travelers need. Clean, intelligent, practical.", rating:5, avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80" },
  { name:"Anjali Kapoor", city:"Delhi", text:"Planned our family trip to Rajasthan end-to-end. The PDF report impressed everyone!", rating:5, avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="section-badge mb-6">🇮🇳 India's AI Travel Platform</div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1C1C1E] leading-tight mb-6">
                Your Entire <span className="text-[#E85D26]">Safar.</span> Set.
              </h1>
              <p className="text-lg text-[#6B7280] mb-8 leading-relaxed max-w-lg">
                From transport and stays to meetings, food and hidden gems — SafarSet intelligently plans your journey around you.
              </p>
              <div className="flex flex-wrap gap-3 mb-12">
                <Link href="/plan" className="inline-flex items-center gap-2 bg-[#E85D26] text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-[#C44A1A] transition-all shadow-md hover:shadow-lg text-base">
                  Plan My Trip <ArrowRight size={18} />
                </Link>
                <Link href="/explore" className="inline-flex items-center gap-2 border border-[#E5E0D8] bg-white px-7 py-3.5 rounded-xl font-semibold text-[#1C1C1E] hover:bg-gray-50 transition-all text-base">
                  <Map size={18} /> Explore India
                </Link>
              </div>
              {/* Stats */}
              <div className="flex gap-8">
                {[["50K+","Trips Planned"],["200+","Destinations"],["4.9★","User Rating"]].map(([n,l]) => (
                  <div key={l}>
                    <p className="text-2xl font-bold text-[#E85D26]">{n}</p>
                    <p className="text-xs text-[#6B7280]">{l}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* India Map */}
            <div className="hidden lg:flex justify-center relative">
              <div className="relative w-80">
                <IndiaMapSVG highlightedCities={["Mumbai","Ahmedabad","Jaipur","Delhi"]} className="w-full drop-shadow-sm" />
                {/* Floating cards */}
                <div className="absolute top-8 -left-8 card p-3 shadow-lg animate-fade-in" style={{ animationDelay:"0.2s" }}>
                  <p className="text-xs text-[#6B7280] mb-0.5">AI Itinerary</p>
                  <p className="text-sm font-semibold text-[#1C1C1E]">Mumbai → Ahmedabad</p>
                  <p className="text-xs text-[#E85D26]">3 days • ₹18,500 est.</p>
                </div>
                <div className="absolute bottom-20 -right-4 card p-3 shadow-lg animate-fade-in" style={{ animationDelay:"0.4s" }}>
                  <p className="text-xs text-[#6B7280] mb-0.5">Next Activity</p>
                  <p className="text-sm font-semibold text-[#1C1C1E]">Sabarmati Ashram</p>
                  <p className="text-xs text-[#E85D26]">In 30 minutes • 6 km away</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <div className="section-badge mx-auto mb-4">Popular</div>
          <h2 className="text-3xl font-bold text-[#1C1C1E]">Explore India</h2>
          <p className="text-[#6B7280] mt-2">Discover the most loved destinations</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {POPULAR_DESTINATIONS.map(d => (
            <Link key={d.city} href={`/explore?city=${d.city}`} className="group relative overflow-hidden rounded-2xl aspect-[3/4] card-hover cursor-pointer">
              <img src={d.image} alt={d.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-semibold text-sm">{d.city}</p>
                <p className="text-white/70 text-xs">{d.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mx-auto mb-4">Simple Process</div>
            <h2 className="text-3xl font-bold text-[#1C1C1E]">How SafarSet Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((h, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-[#F9F7F4] border border-[#E5E0D8] relative">
                <div className="text-5xl mb-4">{h.icon}</div>
                <div className="absolute top-4 right-4 text-5xl font-black text-[#E5E0D8]">{h.step}</div>
                <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{h.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-12">
          <div className="section-badge mx-auto mb-4">Features</div>
          <h2 className="text-3xl font-bold text-[#1C1C1E]">Everything You Need</h2>
          <p className="text-[#6B7280] mt-2">Intelligent features for every type of traveller</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <div key={i} className="card p-6 card-hover">
              <div className={`w-11 h-11 rounded-xl ${f.color} flex items-center justify-center text-xl mb-4`}>{f.icon}</div>
              <h3 className="font-bold text-[#1C1C1E] mb-2">{f.title}</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Trips */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-badge mb-3">Community</div>
              <h2 className="text-3xl font-bold text-[#1C1C1E]">Trips by Travellers</h2>
            </div>
            <Link href="/community" className="hidden md:flex items-center gap-1 text-[#E85D26] text-sm font-medium hover:gap-2 transition-all">
              See all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_COMMUNITY.slice(0,4).map(t => (
              <div key={t.id} className="card card-hover overflow-hidden cursor-pointer">
                <div className="h-40 overflow-hidden">
                  <img src={t.coverImage} alt={t.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-[#1C1C1E] mb-1">{t.title}</p>
                  <p className="text-xs text-[#6B7280] mb-2">{t.route}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {t.userAvatar ? <img src={t.userAvatar} alt={t.userName} className="w-5 h-5 rounded-full object-cover" /> : <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">{t.userName[0]}</div>}
                      <span className="text-xs text-[#6B7280]">{t.userName}</span>
                    </div>
                    <span className="text-xs text-[#6B7280]">♥ {t.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#1A3A5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">Testimonials</div>
            <h2 className="text-3xl font-bold text-white">Travellers Love SafarSet</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex gap-1 mb-3">{Array.from({length:t.rating}).map((_,j) => <Star key={j} size={14} fill="#FBBF24" className="text-yellow-400" />)}</div>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-blue-300 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#E85D26]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🛫</div>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Plan Your Safar?</h2>
          <p className="text-orange-100 mb-8">Join thousands of smart travellers who plan with SafarSet.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/signup" className="bg-white text-[#E85D26] px-8 py-3.5 rounded-xl font-semibold hover:bg-orange-50 transition-all shadow-md text-base inline-flex items-center gap-2">
              Start Free <ArrowRight size={18} />
            </Link>
            <Link href="/explore" className="border border-white/40 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-all text-base">
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
