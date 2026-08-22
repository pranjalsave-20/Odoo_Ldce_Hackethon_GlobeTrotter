"use client";

import React, { useState } from "react";
import { LocalGuruChatbot } from "@/components/ai/LocalGuruChatbot";
import { SUPPORTED_CITIES, CITIES_DATABASE } from "@/lib/services/localGuruService";
import { Compass, Mic, MapPin, Sparkles, Volume2, ShieldCheck, Heart } from "lucide-react";

export default function LocalGuruPage() {
  const [selectedCity, setSelectedCity] = useState("Ahmedabad");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* HERO BANNER */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" /> AI-Powered Local Tourism Guide
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200">Travel Guru</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Discover famous tourist spots, iconic local food joints, cultural heritage, and hidden gems in any selected city. Speak to Travel Guru directly using voice input and listen to recommendations hands-free!
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400 pt-2">
            <div className="flex items-center gap-1.5 text-amber-400">
              <Mic className="w-4 h-4" /> Voice Input & Speech Output
            </div>
            <div className="flex items-center gap-1.5 text-indigo-400">
              <MapPin className="w-4 h-4" /> Selected City Sights
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> Verified Tourist Spots
            </div>
          </div>
        </div>
      </div>

      {/* QUICK CITY SELECTION GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" /> Popular Destinations
          </h2>
          <span className="text-xs text-slate-400">Click a city to load local recommendations</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {SUPPORTED_CITIES.map((city) => {
            const info = CITIES_DATABASE[city];
            const isSelected = selectedCity === city;

            return (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-gradient-to-br from-amber-950/80 to-orange-950/80 border-amber-500/60 shadow-lg shadow-amber-950/40 text-white ring-2 ring-amber-500/30 scale-105"
                    : "bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400">{info?.badge || "Destination"}</span>
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? "text-amber-400" : "text-slate-500"}`} />
                </div>
                <h3 className="text-sm font-bold mt-1 text-white">{city}</h3>
                <p className="text-[10px] text-slate-400 truncate mt-0.5">{info?.stateOrCountry}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* MAIN LOCAL GURU CHATBOT CONTAINER */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" /> Travel Guru Workspace ({selectedCity})
        </h2>

        <LocalGuruChatbot initialCity={selectedCity} key={selectedCity} />
      </div>
    </div>
  );
}
