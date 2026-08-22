"use client";
import React, { useState } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Button, Card } from "@/components/ui/index";
import Link from "next/link";
import { Calendar, MapPin, Plus, Trash2, ArrowRight, Share2, FileDown } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function MyTripsPage() {
  const { trips, deleteTrip } = useTrips();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<"upcoming" | "ongoing" | "completed" | "draft">("upcoming");

  const nowStr = new Date().toISOString().split("T")[0];

  const filteredTrips = trips.filter((t) => {
    if (activeTab === "draft") return t.status === "draft";
    if (activeTab === "completed") return t.endDate < nowStr;
    if (activeTab === "ongoing") return t.startDate <= nowStr && t.endDate >= nowStr;
    return t.startDate > nowStr; // upcoming
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteTrip(id);
      addToast("success", `Trip "${name}" deleted successfully.`);
    }
  };

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case "business": return "blue";
      case "devotional": return "yellow";
      case "family": return "green";
      case "entertainment": return "purple";
      case "personal": return "gray";
      default: return "orange";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1C1C1E] tracking-tight">My Safars</h1>
          <p className="text-[#6B7280] text-sm mt-1">Manage and edit your travel itineraries.</p>
        </div>
        <Link href="/plan">
          <Button variant="primary" size="md">
            <Plus size={16} /> Plan New Trip
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E0D8] gap-6">
        {(["upcoming", "ongoing", "completed", "draft"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-semibold capitalize transition-all border-b-2 ${
              activeTab === tab
                ? "border-[#E85D26] text-[#E85D26]"
                : "border-transparent text-[#6B7280] hover:text-[#1C1C1E]"
            }`}
          >
            {tab} ({trips.filter(t => {
              if (tab === "draft") return t.status === "draft";
              if (tab === "completed") return t.endDate < nowStr;
              if (tab === "ongoing") return t.startDate <= nowStr && t.endDate >= nowStr;
              return t.startDate > nowStr;
            }).length})
          </button>
        ))}
      </div>

      {/* Trips list */}
      {filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((t) => (
            <Card key={t.id} className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={t.coverImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80"}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`bg-white text-[#1C1C1E] text-xs px-2.5 py-1 rounded-full font-semibold uppercase shadow-sm`}>
                      {t.purpose}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg text-[#1C1C1E] line-clamp-1">{t.name}</h3>
                  <div className="space-y-1.5">
                    <p className="text-xs text-[#6B7280] flex items-center gap-1.5">
                      <MapPin size={14} /> {t.from} → {t.stops.map((s) => s.city).join(" → ")}
                    </p>
                    <p className="text-xs text-[#6B7280] flex items-center gap-1.5">
                      <Calendar size={14} /> {t.startDate} to {t.endDate} ({t.duration})
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#E5E0D8] mt-4 flex items-center justify-between bg-gray-50/50">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDelete(t.id, t.name)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Delete Trip"
                  >
                    <Trash2 size={16} />
                  </button>
                  <button
                    className="p-2 text-gray-400 hover:text-[#E85D26] rounded-lg hover:bg-gray-100 transition-colors"
                    title="Share Trip"
                    onClick={() => addToast("success", "Link copied to clipboard!")}
                  >
                    <Share2 size={16} />
                  </button>
                </div>
                <Link href={`/trips/${t.id}/overview`}>
                  <Button variant="primary" size="sm">
                    Open Workspace <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 card space-y-4">
          <p className="text-[#6B7280] text-sm">No trips found in this category.</p>
          <Link href="/plan">
            <Button variant="outline" size="sm">
              Create one now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
