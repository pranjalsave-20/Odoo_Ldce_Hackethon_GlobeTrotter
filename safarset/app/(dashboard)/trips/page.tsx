"use client";
import React, { useState } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Button, Card } from "@/components/ui/index";
import Link from "next/link";
import { Calendar, MapPin, Plus, Trash2, ArrowRight, Share2 } from "lucide-react";
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
    return t.startDate > nowStr;
  });

  const tabCount = (tab: typeof activeTab) =>
    trips.filter(t => {
      if (tab === "draft") return t.status === "draft";
      if (tab === "completed") return t.endDate < nowStr;
      if (tab === "ongoing") return t.startDate <= nowStr && t.endDate >= nowStr;
      return t.startDate > nowStr;
    }).length;

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"?`)) {
      deleteTrip(id);
      addToast("success", `"${name}" deleted.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Trips</h1>
          <p className="text-slate-500 text-sm mt-0.5">Manage and view your travel itineraries.</p>
        </div>
        <Link href="/plan">
          <Button variant="primary" size="md"><Plus size={15} /> Plan New Trip</Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-5">
        {(["upcoming", "ongoing", "completed", "draft"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab} <span className="ml-1 text-xs text-slate-400">({tabCount(tab)})</span>
          </button>
        ))}
      </div>

      {/* Trip grid */}
      {filteredTrips.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTrips.map(t => (
            <Card key={t.id} className="overflow-hidden flex flex-col">
              <div className="h-40 overflow-hidden relative">
                <img
                  src={t.coverImage || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80"}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2.5 right-2.5">
                  <span className="bg-white text-slate-700 text-xs px-2 py-0.5 rounded-full font-medium capitalize shadow-sm">
                    {t.purpose}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 line-clamp-1 mb-2">{t.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
                    <MapPin size={12} /> {t.from} → {t.stops.map(s => s.city).join(" → ")}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <Calendar size={12} /> {t.startDate} – {t.endDate} ({t.duration})
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDelete(t.id, t.name)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-md hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                    <button
                      onClick={() => addToast("success", "Link copied!")}
                      className="p-1.5 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                      title="Share"
                    >
                      <Share2 size={14} />
                    </button>
                  </div>
                  <Link href={`/trips/${t.id}/overview`}>
                    <Button variant="primary" size="sm">Open <ArrowRight size={13} /></Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="card text-center py-16">
          <p className="text-slate-400 text-sm mb-4">No trips in this category.</p>
          <Link href="/plan"><Button variant="outline" size="sm">Create one now</Button></Link>
        </div>
      )}
    </div>
  );
}
