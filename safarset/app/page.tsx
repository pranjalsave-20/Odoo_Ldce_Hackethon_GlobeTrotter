"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Map, Calendar, Users, Shield, Star, ChevronRight, Plane, Anchor, Train, Car, Compass } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BharatParikramaMap from "@/components/maps/BharatParikramaMap";
import { POPULAR_DESTINATIONS, MOCK_COMMUNITY } from "@/lib/data/mockData";

const MULTI_MODAL_MODES = [
  {
    title: "Maritime & Coastal Voyages",
    desc: "Optimized sea routes, coastal shipping & island ferries connecting Mumbai, Goa, Kochi, Lakshadweep & Andaman.",
    icon: "🚢",
    color: "bg-teal-50 text-teal-600 border-teal-100",
    badge: "Sea & Ferries"
  },
  {
    title: "Airway Express Corridors",
    desc: "Intelligent flight routing linking Tier-1 & Tier-2 Indian hubs with flight delay buffers and seat optimization.",
    icon: "✈️",
    color: "bg-sky-50 text-sky-600 border-sky-100",
    badge: "Aviation AI"
  },
  {
    title: "Vande Bharat Express Rail",
    desc: "Meeting-aware train schedules, high-speed rail corridors, and conflict-free booking for business & leisure.",
    icon: "🚆",
    color: "bg-amber-50 text-amber-600 border-amber-100",
    badge: "Indian Railways"
  },
  {
    title: "Scenic Overland Highways",
    desc: "High-altitude mountain passes in Ladakh, Konkan coast highway drives, and royal Rajasthan road expeditions.",
    icon: "🚗",
    color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    badge: "Highways & Passes"
  },
];

const FEATURES = [
  { title: "Business Travel Mode", desc: "Schedule meetings, block conflict-free time, explore near your venue during free hours.", icon: "💼", color: "bg-blue-50 text-blue-600" },
  { title: "Smart Free-Time Explorer", desc: "Given your meeting at 2 PM, we suggest what you can visit in the time you have.", icon: "⏱", color: "bg-orange-50 text-orange-600" },
  { title: "Budget Intelligence", desc: "Track spending across transport, hotels, food and activities with visual dashboards.", icon: "₹", color: "bg-green-50 text-green-600" },
  { title: "Parikrama AI Assistant", desc: "Ask anything — reschedule meetings, find regional food, handle emergencies.", icon: "🤖", color: "bg-purple-50 text-purple-600" },
  { title: "Multi-City Routes", desc: "Mumbai → Ahmedabad → Udaipur → Jaipur, all in one intelligent plan.", icon: "🗺️", color: "bg-yellow-50 text-yellow-600" },
  { title: "PDF Trip Report", desc: "Download a professional trip report with itinerary, budget and memories.", icon: "📄", color: "bg-red-50 text-red-600" },
];

const HOW_IT_WORKS = [
  { step: "01", title: "Select Destination & Transit", desc: "Pick your Indian destination, dates, purpose and transit modes (Air, Sea, Rail, Road).", icon: "🇮🇳" },
  { step: "02", title: "AI Multi-Modal Routing", desc: "Bharat Parikrama crafts a day-by-day itinerary connecting transport, stays & local gems.", icon: "✨" },
  { step: "03", title: "Adaptive Navigation", desc: "Use Parikrama AI to adapt your schedule, discover hidden spots & track weather.", icon: "🧳" },
];

const TESTIMONIALS = [
  { name: "Aarav Sharma", city: "Mumbai", text: "The coastal maritime and flight routing saved me 8 hours on my trip to Lakshadweep and Kochi. Bharat Parikrama is unmatched!", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80" },
  { name: "Priya Nair", city: "Kochi", text: "Vande Bharat train schedules synced directly with my client meetings in Varanasi and Delhi. Exceptional experience!", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80" },
  { name: "Karan Mehta", city: "Ahmedabad", text: "Planned our complete Rajasthan road trip and Andaman ferry voyage using one single AI platform. Top notch UI!", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-12 md:py-16">
        {/* Subtle Background Glow Elements */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Title Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-center mb-10">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-amber-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                🇮🇳 BHARAT PARIKRAMA • MULTI-MODAL TRAVEL INTELLIGENCE
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                BHARAT <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">PARIKRAMA</span>
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-slate-200">
                Dynamic Multi-Modal Voyage Optimization for India
              </p>

              <p className="text-base text-slate-400 leading-relaxed max-w-xl">
                Smarter routes. Coastal maritime & ferry voyages. High-speed Vande Bharat rail & highway passes. Purpose-aware AI itineraries designed specifically for Indian travel.
              </p>

              {/* Action CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500 to-amber-600 text-white px-7 py-3.5 rounded-xl font-bold hover:from-orange-600 hover:to-amber-700 transition-all shadow-lg shadow-orange-500/25 text-base"
                >
                  PLAN YOUR VOYAGE <ArrowRight size={18} />
                </Link>
                <Link
                  href="/explore"
                  className="inline-flex items-center gap-2.5 bg-slate-800/80 border border-slate-700 text-slate-200 hover:bg-slate-800 px-7 py-3.5 rounded-xl font-semibold transition-all text-base hover:text-white"
                >
                  <Compass size={18} className="text-amber-400" /> EXPLORE ROUTE INTELLIGENCE
                </Link>
              </div>

              {/* Multi-modal Badge Tags */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Multi-Modal Transit:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-950/60 border border-sky-800/50 text-sky-300 text-xs font-semibold">
                  <Plane size={13} /> Air ✈️
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-950/60 border border-teal-800/50 text-teal-300 text-xs font-semibold">
                  <Anchor size={13} /> Maritime & Ferries 🚢
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/60 border border-amber-800/50 text-amber-300 text-xs font-semibold">
                  <Train size={13} /> Vande Bharat 🚆
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-300 text-xs font-semibold">
                  <Car size={13} /> Highways 🚗
                </span>
              </div>
            </div>

            {/* Right Column: Hero Visual Stats & Stats Cards */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl">
                <div className="text-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-2xl sm:text-3xl font-extrabold text-orange-400">28</p>
                  <p className="text-xs text-slate-400 font-medium">Indian States</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-2xl sm:text-3xl font-extrabold text-teal-400">4-in-1</p>
                  <p className="text-xs text-slate-400 font-medium">Transit Modes</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-400">4.9★</p>
                  <p className="text-xs text-slate-400 font-medium">Voyage Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Visualization Container */}
          <div className="mt-6">
            <BharatParikramaMap />
          </div>
        </div>
      </section>

      {/* Multi-Modal Travel Modes */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-14">
          <div className="section-badge mx-auto mb-4">Unified Ecosystem</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1C1C1E]">
            Connected Indian Transit Intelligence
          </h2>
          <p className="text-[#6B7280] mt-3 text-lg max-w-2xl mx-auto">
            Switch effortlessly between flights, coastal sea voyages, Vande Bharat trains, and road expeditions in one seamless itinerary.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MULTI_MODAL_MODES.map((m, i) => (
            <div key={i} className="card p-6 card-hover border border-[#E5E0D8] bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{m.icon}</span>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${m.color}`}>
                    {m.badge}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-[#1C1C1E] mb-2">{m.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{m.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#F3F1EE] flex items-center text-xs font-semibold text-[#E85D26] group cursor-pointer">
                Explore Routes <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Across India */}
      <section className="py-16 bg-white border-y border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="section-badge mb-3">Popular Destinations</div>
              <h2 className="text-3xl font-bold text-[#1C1C1E]">Explore Iconic Indian Places</h2>
              <p className="text-[#6B7280] mt-1">From coastal islands to Himalayan peaks</p>
            </div>
            <Link href="/explore" className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-[#E85D26] font-semibold text-sm hover:gap-2 transition-all">
              View All 200+ Destinations <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {POPULAR_DESTINATIONS.map((d) => (
              <Link key={d.city} href={`/explore?city=${d.city}`} className="group relative overflow-hidden rounded-2xl aspect-[3/4] card-hover cursor-pointer shadow-sm">
                <img src={d.image} alt={d.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3.5">
                  <p className="text-white font-bold text-base mb-0.5">{d.city}</p>
                  <p className="text-amber-300 text-xs font-medium">{d.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto mb-4">Simple Workflow</div>
            <h2 className="text-3xl font-bold text-[#1C1C1E]">How Bharat Parikrama Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((h, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white border border-[#E5E0D8] relative shadow-sm hover:shadow-md transition-shadow">
                <div className="text-5xl mb-4">{h.icon}</div>
                <div className="absolute top-4 right-4 text-5xl font-black text-[#F3F1EE]">{h.step}</div>
                <h3 className="text-lg font-bold text-[#1C1C1E] mb-2">{h.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white border-t border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center mb-14">
            <div className="section-badge mx-auto mb-4">Features</div>
            <h2 className="text-3xl font-bold text-[#1C1C1E]">Everything You Need for Indian Voyages</h2>
            <p className="text-[#6B7280] mt-2">Intelligent tools designed for every type of traveller</p>
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
        </div>
      </section>

      {/* Community Trips */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="section-badge mb-3">Community</div>
              <h2 className="text-3xl font-bold text-[#1C1C1E]">Parikrama Expeditions</h2>
            </div>
            <Link href="/community" className="hidden md:flex items-center gap-1 text-[#E85D26] text-sm font-medium hover:gap-2 transition-all">
              See all <ChevronRight size={16} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MOCK_COMMUNITY.slice(0, 4).map((t) => (
              <div key={t.id} className="card card-hover overflow-hidden cursor-pointer">
                <div className="h-40 overflow-hidden">
                  <img src={t.coverImage} alt={t.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-[#1C1C1E] mb-1">{t.title}</p>
                  <p className="text-xs text-[#6B7280] mb-2">{t.route}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {t.userAvatar ? (
                        <img src={t.userAvatar} alt={t.userName} className="w-5 h-5 rounded-full object-cover" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                          {t.userName[0]}
                        </div>
                      )}
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
            <div className="inline-flex items-center gap-2 bg-white/10 text-blue-200 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
              Testimonials
            </div>
            <h2 className="text-3xl font-bold text-white">Travellers Love Bharat Parikrama</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} fill="#FBBF24" className="text-yellow-400" />
                  ))}
                </div>
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
      <section className="py-20 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🛫</div>
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin Your Bharat Parikrama?</h2>
          <p className="text-orange-100 mb-8">Join thousands of smart travellers across India planning journeys with AI.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/signup" className="bg-white text-[#E85D26] px-8 py-3.5 rounded-xl font-bold hover:bg-orange-50 transition-all shadow-md text-base inline-flex items-center gap-2">
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
