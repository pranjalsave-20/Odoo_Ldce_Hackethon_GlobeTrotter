"use client";
import React, { useState } from "react";
import { POPULAR_DESTINATIONS, MOCK_PLACES } from "@/lib/data/mockData";
import { Card, Button } from "@/components/ui/index";
import { Compass, MapPin, Search } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ExplorePage() {
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [selectedPlace, setSelectedPlace] = useState<typeof MOCK_PLACES[0] | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "historical", label: "Historical" },
    { id: "nature", label: "Nature" },
    { id: "religious", label: "Devotional" },
    { id: "shopping", label: "Shopping" },
    { id: "entertainment", label: "Entertainment" },
  ];

  const filteredPlaces = MOCK_PLACES.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Explore India</h1>
        <p className="text-slate-500 text-sm mt-0.5">Discover attractions, temples, and places across India.</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by city or attraction..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                category === c.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-300 text-slate-600 hover:text-slate-900"
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
          <Card key={p.id} className="overflow-hidden flex flex-col hover:shadow transition-shadow">
            <div className="h-40 overflow-hidden relative">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2">
                <span className="bg-white/90 text-xs px-2 py-0.5 rounded-md font-medium text-slate-700 capitalize">{p.category}</span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-semibold text-sm text-slate-900 line-clamp-1">{p.name}</h3>
                  <span className="text-xs text-amber-500 font-semibold shrink-0">★ {p.rating}</span>
                </div>
                <p className="text-xs text-slate-500 flex items-center gap-1 mb-1"><MapPin size={11} /> {p.city}</p>
                <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
              </div>
              <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs font-semibold text-blue-600">
                  {p.estimatedCost === 0 ? "Free Entry" : `₹${p.estimatedCost}`}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedPlace(p)}>Details</Button>
                  <Button variant="primary" size="sm" onClick={() => addToast("success", `${p.name} added!`)}>+ Add</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Popular destinations */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Compass size={18} className="text-blue-600" /> Popular Destinations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {POPULAR_DESTINATIONS.map(d => (
            <div key={d.city} className="card overflow-hidden cursor-pointer relative aspect-[3/4] group">
              <img src={d.image} alt={d.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
              <div className="absolute bottom-2.5 left-2.5 text-white">
                <p className="font-semibold text-sm">{d.city}</p>
                <p className="text-white/70 text-xs">{d.tag}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Place detail modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPlace(null)} />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="h-52 relative">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center"
              >✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <span className="text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full capitalize">{selectedPlace.category}</span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">{selectedPlace.name}</h2>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5"><MapPin size={13} /> {selectedPlace.city}</p>
              </div>
              <div className="flex gap-6 border-y border-slate-100 py-3 text-sm">
                <div><p className="text-xs text-slate-400">Rating</p><p className="font-semibold text-amber-500 mt-0.5">★ {selectedPlace.rating}</p></div>
                <div><p className="text-xs text-slate-400">Duration</p><p className="font-semibold text-slate-800 mt-0.5">{selectedPlace.duration}</p></div>
                <div><p className="text-xs text-slate-400">Cost</p><p className="font-semibold text-slate-800 mt-0.5">{selectedPlace.estimatedCost === 0 ? "Free" : `₹${selectedPlace.estimatedCost}`}</p></div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{selectedPlace.description}</p>
              <div className="flex flex-wrap gap-2">
                {selectedPlace.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-md">{tag}</span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="md" className="flex-1" onClick={() => setSelectedPlace(null)}>Close</Button>
                <Button variant="primary" size="md" className="flex-1" onClick={() => { addToast("success", `${selectedPlace.name} added!`); setSelectedPlace(null); }}>
                  Add to Itinerary
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
