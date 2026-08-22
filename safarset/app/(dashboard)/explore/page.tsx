"use client";
import React, { useState } from "react";
import { POPULAR_DESTINATIONS, MOCK_PLACES } from "@/lib/data/mockData";
import { Card, Button, Stars } from "@/components/ui/index";
import { Compass, MapPin, Search, Tag, Eye } from "lucide-react";
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

  const filteredPlaces = MOCK_PLACES.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1C1C1E] tracking-tight">Explore Bharat</h1>
        <p className="text-[#6B7280] text-sm mt-1">Discover popular attractions, temples, and places across India.</p>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by city or attraction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#E5E0D8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26] focus:border-transparent bg-white shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                category === c.id
                  ? "bg-[#E85D26] border-[#E85D26] text-white"
                  : "bg-white border-[#E5E0D8] text-[#6B7280] hover:text-[#1C1C1E]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Places grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlaces.map((p) => (
          <Card key={p.id} className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-44 overflow-hidden relative">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="bg-white/90 backdrop-blur text-xs px-2 py-0.5 rounded-md font-semibold text-[#1C1C1E] capitalize">
                    {p.category}
                  </span>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-sm text-[#1C1C1E] line-clamp-1">{p.name}</h3>
                  <div className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold flex-shrink-0">
                    ★ {p.rating}
                  </div>
                </div>
                <p className="text-xs text-[#6B7280] flex items-center gap-1">
                  <MapPin size={12} /> {p.city}
                </p>
                <p className="text-xs text-[#6B7280] line-clamp-2">{p.description}</p>
              </div>
            </div>
            <div className="p-4 pt-0 border-t border-[#E5E0D8] mt-3 flex justify-between items-center bg-gray-50/50">
              <span className="text-xs font-bold text-[#E85D26]">
                {p.estimatedCost === 0 ? "Free Entry" : `Est: ₹${p.estimatedCost}`}
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setSelectedPlace(p)}>
                  <Eye size={12} /> Details
                </Button>
                <Button variant="primary" size="sm" onClick={() => addToast("success", `${p.name} added to your plan!`)}>
                  + Add
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Popular list */}
      <div>
        <h2 className="text-xl font-bold text-[#1C1C1E] mb-4 flex items-center gap-2">
          <Compass size={18} className="text-[#E85D26]" /> Popular Destinations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {POPULAR_DESTINATIONS.map((d) => (
            <Card key={d.city} className="overflow-hidden cursor-pointer relative aspect-[3/4] group">
              <img src={d.image} alt={d.city} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <p className="font-bold text-sm">{d.city}</p>
                <p className="text-white/70 text-xs">{d.tag}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Details modal */}
      {selectedPlace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPlace(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="h-56 relative">
              <img src={selectedPlace.image} alt={selectedPlace.name} className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedPlace(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="section-badge mb-2">{selectedPlace.category}</span>
                <h2 className="text-2xl font-bold text-[#1C1C1E]">{selectedPlace.name}</h2>
                <p className="text-sm text-[#6B7280] flex items-center gap-1 mt-1">
                  <MapPin size={14} /> {selectedPlace.city}
                </p>
              </div>

              <div className="flex gap-4 border-y border-[#E5E0D8] py-3 text-sm">
                <div>
                  <p className="text-[#6B7280] text-xs">Rating</p>
                  <div className="flex items-center gap-1 font-semibold text-amber-500 mt-0.5">
                    ★ {selectedPlace.rating}
                  </div>
                </div>
                <div>
                  <p className="text-[#6B7280] text-xs">Duration</p>
                  <p className="font-semibold text-gray-800 mt-0.5">{selectedPlace.duration}</p>
                </div>
                <div>
                  <p className="text-[#6B7280] text-xs">Est. Cost</p>
                  <p className="font-semibold text-gray-800 mt-0.5">
                    {selectedPlace.estimatedCost === 0 ? "Free" : `₹${selectedPlace.estimatedCost}`}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#1C1C1E]">Description</h4>
                <p className="text-sm text-[#6B7280] leading-relaxed">{selectedPlace.description}</p>
              </div>

              <div className="flex gap-2">
                {selectedPlace.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outline" size="md" className="flex-1" onClick={() => setSelectedPlace(null)}>
                  Close
                </Button>
                <Button variant="primary" size="md" className="flex-1" onClick={() => {
                  addToast("success", `${selectedPlace.name} added to plan!`);
                  setSelectedPlace(null);
                }}>
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
