"use client";
import React, { useState } from "react";
import { MOCK_COMMUNITY } from "@/lib/data/mockData";
import { Card, Button } from "@/components/ui/index";
import { Search, Heart, Copy, Share2, Compass, Filter } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function CommunityPage() {
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState<string>("all");
  const [tripsList, setTripsList] = useState(MOCK_COMMUNITY);

  const purposes = [
    { id: "all", label: "All Yatras" },
    { id: "leisure", label: "Leisure" },
    { id: "business", label: "Business" },
    { id: "devotional", label: "Devotional" },
    { id: "adventure", label: "Adventure" },
  ];

  const handleLike = (id: string) => {
    setTripsList(list => list.map(t => {
      if (t.id === id) {
        addToast("success", "Liked trip!");
        return { ...t, likes: t.likes + 1 };
      }
      return t;
    }));
  };

  const handleCopy = (title: string) => {
    addToast("success", `"${title}" has been copied into your drafts! You can edit it now.`);
  };

  const filteredTrips = tripsList.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.route.toLowerCase().includes(search.toLowerCase());
    const matchesPurpose = purpose === "all" || t.purpose === purpose;
    return matchesSearch && matchesPurpose;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1C1C1E] tracking-tight">Safar Community</h1>
        <p className="text-[#6B7280] text-sm mt-1">Discover popular itineraries curated by fellow travellers across Bharat.</p>
      </div>

      {/* Filter and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search community trips (e.g. Goa, Golden Triangle...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-[#E5E0D8] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#E85D26] focus:border-transparent bg-white shadow-sm"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {purposes.map((p) => (
            <button
              key={p.id}
              onClick={() => setPurpose(p.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors border ${
                purpose === p.id
                  ? "bg-[#E85D26] border-[#E85D26] text-white"
                  : "bg-white border-[#E5E0D8] text-[#6B7280] hover:text-[#1C1C1E]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Trips list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((t) => (
          <Card key={t.id} className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="h-48 overflow-hidden relative">
                <img src={t.coverImage} alt={t.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur text-xs px-2.5 py-1 rounded-full font-semibold text-[#1C1C1E] capitalize">
                    {t.purpose}
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-[#1C1C1E] line-clamp-1">{t.title}</h3>
                <p className="text-sm text-[#E85D26] font-semibold flex items-center gap-1">
                  <Compass size={14} /> {t.route}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {t.highlights.map((h, i) => (
                    <span key={i} className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md font-medium">
                      {h}
                    </span>
                  ))}
                </div>
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                  {t.userAvatar ? (
                    <img src={t.userAvatar} alt={t.userName} className="w-6 h-6 rounded-full object-cover" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold">
                      {t.userName[0]}
                    </div>
                  )}
                  <span className="text-xs text-[#6B7280]">{t.userName}</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-[#E5E0D8] mt-3 flex justify-between items-center bg-gray-50/50">
              <span className="text-xs text-[#6B7280]">Duration: {t.duration}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLike(t.id)}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 bg-white border border-gray-200 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  <Heart size={12} className="fill-current" /> {t.likes}
                </button>
                <Button variant="outline" size="sm" onClick={() => handleCopy(t.title)}>
                  <Copy size={12} /> Copy
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
