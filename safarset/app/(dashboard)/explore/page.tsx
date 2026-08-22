"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { POPULAR_DESTINATIONS, MOCK_PLACES, MOCK_GUIDES, MOCK_LOCAL_CABS } from "@/lib/data/mockData";
import { Card, Button } from "@/components/ui/index";
import { Compass, MapPin, Search, Sparkles, ArrowRight, Star, Clock, UserCheck, Car, Award } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import BharatParikramaHeroMap from "@/components/maps/BharatParikramaHeroMap";

export default function ExplorePage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selectedPlace, setSelectedPlace] = useState<typeof MOCK_PLACES[0] | null>(null);

  const categories = [
    { id: "all", label: "All Sights" },
    { id: "historical", label: "Heritage & Palaces" },
    { id: "nature", label: "Nature & Riverfronts" },
    { id: "religious", label: "Devotional & Temples" },
    { id: "shopping", label: "Handicrafts & Markets" },
    { id: "entertainment", label: "Lakes & Recreation" },
  ];

  const filteredPlaces = MOCK_PLACES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handlePlanTripTo = (city: string) => {
    router.push(`/plan?to=${encodeURIComponent(city)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-700 bg-blue-100 px-3 py-1 rounded-full border border-blue-200">
            Pan-India Destination Directory
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 tracking-tight">Explore Bharat</h1>
          <p className="text-slate-500 text-sm mt-0.5">Click any city on the interactive map or browse top sights & local services.</p>
        </div>
      </div>

      {/* ── INTERACTIVE INDIA MAP ─────────────────────────────────── */}
      <div className="grid lg:grid-cols-12 gap-8 items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="lg:col-span-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Interactive Selectable Map Active</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Click Any Region to Inspect Sights & Launch Itinerary
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            Explore 28 connected states. Click any node on the India map to preview top attractions, average daily budget, and instant multi-modal travel options.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase">Transit Corridors</p>
              <p className="font-extrabold text-sm text-slate-800 mt-0.5">Flight • Vande Bharat • Sea</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-400 font-bold uppercase">Local Mobility</p>
              <p className="font-extrabold text-sm text-slate-800 mt-0.5">Uber Cabs & Local Guides</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center w-full">
          <BharatParikramaHeroMap />
        </div>
      </div>

      {/* ── SEARCH & FILTER SIGHTS ─────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by city, monument, temple or riverfront..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-2xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-xs"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition-colors ${
                  category === c.id
                    ? "bg-blue-700 border-blue-700 text-white shadow-xs"
                    : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Places grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredPlaces.map(p => (
            <Card key={p.id} className="overflow-hidden flex flex-col hover:shadow-md transition-shadow rounded-3xl border border-slate-200">
              <div className="h-44 overflow-hidden relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-white/95 backdrop-blur-xs text-[11px] px-2.5 py-1 rounded-lg font-bold text-slate-800 capitalize shadow-xs">
                    {p.category}
                  </span>
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded-md font-bold">
                  ★ {p.rating}
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-base text-slate-900 line-clamp-1">{p.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium"><MapPin size={12} /> {p.city}</p>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">{p.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-black text-blue-700">
                    {p.estimatedCost === 0 ? "Free Entry" : `₹${p.estimatedCost}`}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedPlace(p)}>Details</Button>
                    <Button variant="primary" size="sm" onClick={() => handlePlanTripTo(p.city)}>
                      Plan Yatra <ArrowRight size={12} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Place detail modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setSelectedPlace(null)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in z-10">
            <div className="h-56 relative">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center font-bold"
              >✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-full capitalize">{selectedPlace.category}</span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">{selectedPlace.name}</h2>
                <p className="text-sm text-slate-500 flex items-center gap-1 font-medium mt-0.5"><MapPin size={14} /> {selectedPlace.city}</p>
              </div>
              <div className="flex gap-6 border-y border-slate-100 py-3 text-sm">
                <div><p className="text-xs text-slate-400 font-bold">Rating</p><p className="font-bold text-amber-500 mt-0.5">★ {selectedPlace.rating}</p></div>
                <div><p className="text-xs text-slate-400 font-bold">Duration</p><p className="font-bold text-slate-800 mt-0.5">{selectedPlace.duration}</p></div>
                <div><p className="text-xs text-slate-400 font-bold">Cost</p><p className="font-bold text-slate-800 mt-0.5">{selectedPlace.estimatedCost === 0 ? "Free" : `₹${selectedPlace.estimatedCost}`}</p></div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{selectedPlace.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedPlace.tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-semibold">{tag}</span>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" size="md" className="flex-1" onClick={() => setSelectedPlace(null)}>Close</Button>
                <Button variant="primary" size="md" className="flex-1" onClick={() => { handlePlanTripTo(selectedPlace.city); setSelectedPlace(null); }}>
                  Plan Yatra to {selectedPlace.city}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
