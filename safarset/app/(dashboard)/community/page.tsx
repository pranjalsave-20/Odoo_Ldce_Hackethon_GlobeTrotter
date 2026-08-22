"use client";
import React, { useState } from "react";
import { MOCK_COMMUNITY } from "@/lib/data/mockData";
import { Card, Button } from "@/components/ui/index";
import { Search, Heart, Copy, Compass } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function CommunityPage() {
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState<string>("all");
  const [tripsList, setTripsList] = useState(MOCK_COMMUNITY);

  const purposes = [
    { id: "all", label: "All" },
    { id: "leisure", label: "Leisure" },
    { id: "business", label: "Business" },
    { id: "devotional", label: "Devotional" },
    { id: "adventure", label: "Adventure" },
  ];

  const handleLike = (id: string) => {
    setTripsList(list => list.map(t => {
      if (t.id === id) { addToast("success", "Liked!"); return { ...t, likes: t.likes + 1 }; }
      return t;
    }));
  };

  const filteredTrips = tripsList.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.route.toLowerCase().includes(search.toLowerCase());
    const matchesPurpose = purpose === "all" || t.purpose === purpose;
    return matchesSearch && matchesPurpose;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Community Trips</h1>
        <p className="text-slate-500 text-sm mt-0.5">Discover itineraries shared by fellow travellers.</p>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search trips, destinations..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          />
        </div>
        <div className="flex gap-2">
          {purposes.map(p => (
            <button
              key={p.id}
              onClick={() => setPurpose(p.id)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${purpose === p.id ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-slate-300 text-slate-600 hover:text-slate-900"}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trips grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTrips.map(t => (
          <Card key={t.id} className="overflow-hidden flex flex-col hover:shadow transition-shadow">
            <div className="h-44 overflow-hidden relative">
              <img src={t.coverImage} alt={t.title} className="w-full h-full object-cover" />
              <div className="absolute top-2.5 right-2.5">
                <span className="bg-white/90 text-xs px-2.5 py-1 rounded-full font-medium text-slate-700 capitalize">{t.purpose}</span>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-900 line-clamp-1 mb-1">{t.title}</h3>
                <p className="text-sm text-blue-600 font-medium flex items-center gap-1 mb-2">
                  <Compass size={13} /> {t.route}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {t.highlights.map((h, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">{h}</span>
                  ))}
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-2">
                  {t.userAvatar
                    ? <img src={t.userAvatar} alt={t.userName} className="w-5 h-5 rounded-full object-cover" />
                    : <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">{t.userName[0]}</div>
                  }
                  <span className="text-xs text-slate-500">{t.userName}</span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">Duration: {t.duration}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleLike(t.id)}
                    className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-500 border border-slate-200 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Heart size={12} /> {t.likes}
                  </button>
                  <Button variant="outline" size="sm" onClick={() => addToast("success", `"${t.title}" copied to drafts!`)}>
                    <Copy size={12} /> Copy
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
