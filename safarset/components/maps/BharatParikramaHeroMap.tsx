"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plane, Train, Bus, Car, Anchor, MapPin, Sparkles, ArrowRight, 
  CheckCircle2, Compass, Star, Navigation, ShieldCheck, Users
} from "lucide-react";

export interface IndiaLocation {
  id: string;
  name: string;
  state: string;
  region: "North" | "West" | "South" | "East" | "Central";
  x: number;
  y: number;
  mode: "flight" | "train" | "ferry" | "road";
  labelPos: "left" | "right" | "top" | "bottom";
  tag: string;
  highlights: string[];
  bestTime: string;
  avgBudgetPerDay: number;
  rating: number;
  image: string;
}

export const INDIA_LOCATIONS: IndiaLocation[] = [
  {
    id: "srinagar",
    name: "Srinagar",
    state: "Jammu & Kashmir",
    region: "North",
    x: 185,
    y: 65,
    mode: "flight",
    labelPos: "right",
    tag: "Dal Lake & Shikara",
    highlights: ["Dal Lake", "Mughal Gardens", "Gulmarg Meadow"],
    bestTime: "Apr – Oct",
    avgBudgetPerDay: 3500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80"
  },
  {
    id: "delhi",
    name: "New Delhi",
    state: "NCR",
    region: "North",
    x: 215,
    y: 160,
    mode: "train",
    labelPos: "right",
    tag: "Capital Transit Hub",
    highlights: ["Red Fort", "Qutub Minar", "India Gate", "Connaught Place"],
    bestTime: "Oct – Mar",
    avgBudgetPerDay: 2800,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80"
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "West",
    x: 175,
    y: 195,
    mode: "road",
    labelPos: "left",
    tag: "Pink City Heritage",
    highlights: ["Amer Fort", "Hawa Mahal", "City Palace"],
    bestTime: "Oct – Mar",
    avgBudgetPerDay: 2400,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80"
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "North",
    x: 300,
    y: 215,
    mode: "train",
    labelPos: "top",
    tag: "Spiritual Kashi Yatra",
    highlights: ["Kashi Vishwanath", "Ganga Aarti", "Assi Ghat"],
    bestTime: "Oct – Mar",
    avgBudgetPerDay: 1800,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=400&q=80"
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    region: "West",
    x: 145,
    y: 250,
    mode: "road",
    labelPos: "left",
    tag: "UNESCO Walled City & Business",
    highlights: ["Sabarmati Ashram", "Adalaj Stepwell", "Riverfront"],
    bestTime: "Nov – Feb",
    avgBudgetPerDay: 2200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80"
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    region: "West",
    x: 155,
    y: 325,
    mode: "ferry",
    labelPos: "left",
    tag: "Financial & Coastal Gateway",
    highlights: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
    bestTime: "All Year",
    avgBudgetPerDay: 3800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80"
  },
  {
    id: "goa",
    name: "Goa",
    state: "Goa",
    region: "West",
    x: 170,
    y: 385,
    mode: "ferry",
    labelPos: "left",
    tag: "Coastal Beaches & Heritage",
    highlights: ["Baga Beach", "Old Goa Churches", "Dudhsagar Falls"],
    bestTime: "Nov – Feb",
    avgBudgetPerDay: 3200,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80"
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    region: "East",
    x: 355,
    y: 260,
    mode: "train",
    labelPos: "right",
    tag: "City of Joy & Culture",
    highlights: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar"],
    bestTime: "Oct – Mar",
    avgBudgetPerDay: 2000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80"
  },
  {
    id: "guwahati",
    name: "Guwahati",
    state: "Assam",
    region: "East",
    x: 420,
    y: 195,
    mode: "flight",
    labelPos: "right",
    tag: "Northeast Gateway & Brahmaputra",
    highlights: ["Kamakhya Temple", "Brahmaputra Cruise", "Kaziranga"],
    bestTime: "Oct – Apr",
    avgBudgetPerDay: 2500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571498664957-fde3c36c28f1?w=400&q=80"
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    region: "South",
    x: 215,
    y: 415,
    mode: "flight",
    labelPos: "left",
    tag: "Garden City & Tech Hub",
    highlights: ["Lalbagh Botanical Garden", "Bangalore Palace", "Cubbon Park"],
    bestTime: "Sep – Mar",
    avgBudgetPerDay: 3000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80"
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    region: "South",
    x: 265,
    y: 410,
    mode: "ferry",
    labelPos: "right",
    tag: "Dravidian Temples & Marina Beach",
    highlights: ["Marina Beach", "Kapaleeshwarar Temple", "Mahabalipuram"],
    bestTime: "Nov – Feb",
    avgBudgetPerDay: 2200,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80"
  },
  {
    id: "kochi",
    name: "Kochi",
    state: "Kerala",
    region: "South",
    x: 200,
    y: 460,
    mode: "ferry",
    labelPos: "bottom",
    tag: "Backwaters & Maritime Port",
    highlights: ["Fort Kochi", "Chinese Fishing Nets", "Alleppey Houseboat"],
    bestTime: "Sep – Mar",
    avgBudgetPerDay: 2900,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80"
  }
];

export default function BharatParikramaHeroMap() {
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<string>("delhi");
  const [regionFilter, setRegionFilter] = useState<string>("All");

  const selectedLocation = INDIA_LOCATIONS.find(loc => loc.id === selectedCityId) || INDIA_LOCATIONS[1];

  const filteredLocations = regionFilter === "All" 
    ? INDIA_LOCATIONS 
    : INDIA_LOCATIONS.filter(loc => loc.region === regionFilter);

  const handleLaunchTrip = (cityName: string) => {
    router.push(`/plan?to=${encodeURIComponent(cityName)}`);
  };

  return (
    <div className="w-full select-none space-y-4">
      
      {/* Outer Card Container */}
      <div className="relative rounded-3xl bg-white border border-slate-200 shadow-xl p-4 sm:p-6 overflow-hidden">
        
        {/* Header Ribbon & Region Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-800">
              Interactive Pan-India Yatra Map
            </span>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-bold overflow-x-auto">
            {["All", "North", "West", "South", "East"].map(r => (
              <button
                key={r}
                onClick={() => setRegionFilter(r)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  regionFilter === r 
                    ? "bg-white text-blue-700 shadow-xs" 
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Map Canvas Surface */}
        <div className="relative w-full aspect-[4/3.8] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 overflow-hidden shadow-inner border border-slate-800">
          
          {/* Subtle Grid */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Map Canvas */}
          <svg
            viewBox="0 0 500 510"
            className="w-full h-full relative z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="indiaRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>

              <linearGradient id="seaRouteGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.3" />
              </linearGradient>

              <filter id="indiaMapGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* India Boundary Shape */}
            <g filter="url(#indiaMapGlow)">
              <path
                d="
                  M 185 45
                  C 200 35, 220 40, 235 55
                  C 250 70, 270 85, 285 105
                  C 295 120, 325 125, 345 135
                  C 370 145, 400 155, 430 170
                  C 445 180, 445 200, 425 210
                  C 405 220, 375 225, 360 240
                  C 350 255, 345 285, 325 310
                  C 305 335, 285 370, 270 410
                  C 255 450, 235 470, 205 480
                  C 195 475, 185 440, 175 410
                  C 165 375, 150 340, 145 310
                  C 135 280, 125 260, 135 235
                  C 145 210, 155 180, 150 155
                  C 145 130, 160 100, 175 75
                  Z
                "
                fill="#0f172a"
                fillOpacity="0.9"
                stroke="#1e40af"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <path
                d="
                  M 185 45
                  C 200 35, 220 40, 235 55
                  C 250 70, 270 85, 285 105
                  C 295 120, 325 125, 345 135
                  C 370 145, 400 155, 430 170
                  C 445 180, 445 200, 425 210
                  C 405 220, 375 225, 360 240
                  C 350 255, 345 285, 325 310
                  C 305 335, 285 370, 270 410
                  C 255 450, 235 470, 205 480
                  C 195 475, 185 440, 175 410
                  C 165 375, 150 340, 145 310
                  C 135 280, 125 260, 135 235
                  C 145 210, 155 180, 150 155
                  C 145 130, 160 100, 175 75
                  Z
                "
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />

              {/* Northeast Wing */}
              <path
                d="M 345 135 C 375 120, 425 125, 450 150 C 460 165, 445 190, 420 195 Z"
                fill="#0f172a"
                fillOpacity="0.85"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
            </g>

            {/* Connecting Parikrama Corridors */}
            <path
              d="
                M 185 65 L 215 160
                M 215 160 L 175 195 L 145 250 L 155 325 L 170 385 L 215 415 L 200 460 L 265 410 L 355 260 L 300 215 L 215 160
                M 355 260 L 420 195
              "
              fill="none"
              stroke="url(#indiaRouteGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Interactive Selectable City Nodes */}
            {INDIA_LOCATIONS.map((loc) => {
              const isSelected = selectedCityId === loc.id;
              
              let dx = 12;
              let dy = 4;
              let anchorPos: "start" | "end" | "middle" = "start";
              if (loc.labelPos === "left") {
                dx = -12;
                anchorPos = "end";
              } else if (loc.labelPos === "top") {
                dx = 0;
                dy = -14;
                anchorPos = "middle";
              } else if (loc.labelPos === "bottom") {
                dx = 0;
                dy = 18;
                anchorPos = "middle";
              }

              return (
                <g
                  key={loc.id}
                  transform={`translate(${loc.x}, ${loc.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedCityId(loc.id)}
                >
                  {/* Ping Animation on Selected */}
                  {isSelected && (
                    <circle cx="0" cy="0" r="16" fill="#38bdf8" fillOpacity="0.3" className="animate-ping" />
                  )}

                  {/* Outer Ring */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? "9" : "5"}
                    fill={isSelected ? "#fb923c" : "#38bdf8"}
                    stroke="#ffffff"
                    strokeWidth={isSelected ? "2.5" : "1.5"}
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* City Label */}
                  <text
                    x={dx}
                    y={dy}
                    textAnchor={anchorPos}
                    fontSize={isSelected ? "12" : "10"}
                    fontWeight={isSelected ? "900" : "600"}
                    fill={isSelected ? "#ffffff" : "#cbd5e1"}
                    fontFamily="Inter, system-ui, sans-serif"
                    className="transition-colors duration-200 group-hover:fill-amber-300"
                  >
                    {loc.name}
                  </text>
                </g>
              );
            })}
          </svg>

        </div>

        {/* ── SELECTED CITY DETAIL & 1-CLICK LAUNCHER ─────────────── */}
        <div className="mt-4 p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-14 h-14 rounded-xl overflow-hidden relative flex-shrink-0 border border-slate-700">
              <img src={selectedLocation.image} alt={selectedLocation.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-black text-white">{selectedLocation.name}, {selectedLocation.state}</h4>
                <span className="text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full font-bold">
                  {selectedLocation.region} Hub
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{selectedLocation.tag}</p>
              <p className="text-[11px] text-amber-400 font-bold mt-0.5">
                ⭐ {selectedLocation.rating} • Best: {selectedLocation.bestTime} • Avg: ₹{selectedLocation.avgBudgetPerDay}/day
              </p>
            </div>
          </div>

          <button
            onClick={() => handleLaunchTrip(selectedLocation.name)}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all whitespace-nowrap hover:scale-105"
          >
            <Sparkles size={14} /> Plan Yatra to {selectedLocation.name} <ArrowRight size={14} />
          </button>

        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-3 text-[11px] text-slate-500 font-semibold">
          <span className="flex items-center gap-1">📍 Click any city node on the map to inspect & plan</span>
          <span className="text-blue-700 font-bold">28 States & UTs Connected</span>
        </div>

      </div>
    </div>
  );
}
