"use client";

import Link from "next/link";
import { ArrowRight, Map, Compass, Users, Sparkles, Star, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BharatParikramaMap from "@/components/maps/BharatParikramaMap";
import { POPULAR_DESTINATIONS, MOCK_COMMUNITY } from "@/lib/data/mockData";

const FEATURES = [
  { title: "Multi-Modal Routing", desc: "Plan trips across flights, trains, ferries and road in one itinerary.", icon: "🗺️" },
  { title: "Business Travel Mode", desc: "Schedule meetings, find venues, explore during free hours.", icon: "💼" },
  { title: "Budget Tracker", desc: "Track spending across transport, hotels, food and activities.", icon: "₹" },
  { title: "Parikrama AI", desc: "Ask anything — reschedule, find food, handle emergencies.", icon: "🤖" },
  { title: "Community Trips", desc: "Browse and copy itineraries shared by fellow travellers.", icon: "👥" },
  { title: "Trip Reports", desc: "Download professional reports with itinerary and budget.", icon: "📄" },
];

const TESTIMONIALS = [
  { name: "Aarav Sharma", city: "Mumbai", text: "Saved 8 hours on my Lakshadweep trip. Best travel platform for India!", rating: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80" },
  { name: "Priya Nair", city: "Kochi", text: "Vande Bharat schedules synced perfectly with my client meetings.", rating: 5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80" },
  { name: "Karan Mehta", city: "Ahmedabad", text: "Planned our Rajasthan road trip and Andaman ferry voyage seamlessly.", rating: 5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold border border-blue-100">
                🇮🇳 AI-Powered India Travel Planning
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                Bharat Parikrama
              </h1>
              <p className="text-xl text-slate-500 font-medium">Dynamic Multi-Modal Voyage Optimization for India</p>
              <p className="text-slate-500 leading-relaxed">
                Plan flights, maritime voyages, Vande Bharat trains and road trips in one intelligent AI-powered platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/plan" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Plan Your Trip <ArrowRight size={16} />
                </Link>
                <Link href="/explore" className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                  <Compass size={16} /> Explore India
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {["✈️ Air", "🚢 Maritime", "🚆 Rail", "🚗 Road"].map(m => (
                  <span key={m} className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">{m}</span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { val: "28", label: "States Covered" },
                  { val: "4-in-1", label: "Transit Modes" },
                  { val: "4.9★", label: "Avg Rating" },
                ].map(k => (
                  <div key={k.label} className="card p-4 text-center">
                    <p className="text-2xl font-bold text-blue-600">{k.val}</p>
                    <p className="text-xs text-slate-500 mt-1">{k.label}</p>
                  </div>
                ))}
              </div>
              {/* India Map */}
              <div className="card p-4">
                <p className="text-xs font-semibold text-slate-500 mb-3 flex items-center gap-1.5"><Map size={13} /> Interactive India Map</p>
                <BharatParikramaMap />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900">Everything You Need</h2>
          <p className="text-slate-500 mt-2 text-sm">Intelligent tools for every type of traveller</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div key={i} className="card p-5 card-hover">
              <span className="text-2xl">{f.icon}</span>
              <h3 className="font-semibold text-slate-900 mt-3 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Popular Destinations</h2>
              <p className="text-slate-500 text-sm mt-1">From coastal islands to Himalayan peaks</p>
            </div>
            <Link href="/explore" className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700">
              View all <ChevronRight size={15} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {POPULAR_DESTINATIONS.map((d) => (
              <Link key={d.city} href={`/explore?city=${d.city}`} className="group relative overflow-hidden rounded-xl aspect-[3/4] cursor-pointer">
                <img src={d.image} alt={d.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-semibold text-sm">{d.city}</p>
                  <p className="text-white/70 text-xs">{d.tag}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Community Trips */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Community Trips</h2>
            <p className="text-slate-500 text-sm mt-1">Browse itineraries shared by fellow travellers</p>
          </div>
          <Link href="/community" className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700">
            See all <ChevronRight size={15} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_COMMUNITY.slice(0, 4).map((t) => (
            <div key={t.id} className="card card-hover overflow-hidden cursor-pointer">
              <div className="h-36 overflow-hidden">
                <img src={t.coverImage} alt={t.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm text-slate-900 mb-1 line-clamp-1">{t.title}</p>
                <p className="text-xs text-slate-500 mb-3">{t.route}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {t.userAvatar
                      ? <img src={t.userAvatar} alt={t.userName} className="w-5 h-5 rounded-full object-cover" />
                      : <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">{t.userName[0]}</div>
                    }
                    <span className="text-xs text-slate-500">{t.userName}</span>
                  </div>
                  <span className="text-xs text-slate-400">♥ {t.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Travellers Love Bharat Parikrama</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={13} fill="#f59e0b" className="text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Start Planning Today</h2>
          <p className="text-blue-100 mb-8">Join thousands of smart travellers planning Indian journeys with AI.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/signup" className="bg-white text-blue-600 px-7 py-2.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-2">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link href="/explore" className="border border-white/30 text-white px-7 py-2.5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
