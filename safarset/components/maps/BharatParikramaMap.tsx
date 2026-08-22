"use client";

import React, { useState } from "react";
import { Plane, Navigation, Compass, Train, Car, ShieldAlert, Sparkles, MapPin, Anchor } from "lucide-react";

export type TransitMode = "ALL" | "FLIGHT" | "MARITIME" | "RAIL" | "ROAD";

interface CityNode {
  id: string;
  name: string;
  state: string;
  cx: number;
  cy: number;
  type: "HUB" | "PORT" | "METRO" | "ISLAND" | "HIMALAYAN";
  modes: ("FLIGHT" | "MARITIME" | "RAIL" | "ROAD")[];
  info: string;
}

const CITIES: CityNode[] = [
  { id: "delhi", name: "New Delhi", state: "NCR", cx: 270, cy: 175, type: "HUB", modes: ["FLIGHT", "RAIL", "ROAD"], info: "Capital AI Transit Hub • Indira Gandhi Int'l Airport" },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", cx: 200, cy: 345, type: "PORT", modes: ["FLIGHT", "MARITIME", "RAIL", "ROAD"], info: "JNPT & Mumbai Port • Western Gateway Terminal" },
  { id: "goa", name: "Goa (Mormugao)", state: "Goa", cx: 220, cy: 430, type: "PORT", modes: ["MARITIME", "FLIGHT", "ROAD"], info: "Mormugao Cruise Terminal • Konkan Maritime Route" },
  { id: "kochi", name: "Kochi", state: "Kerala", cx: 260, cy: 520, type: "PORT", modes: ["MARITIME", "FLIGHT", "RAIL"], info: "International Cruise Terminal • Malabar Sea Route" },
  { id: "portblair", name: "Port Blair", state: "Andaman & Nicobar", cx: 550, cy: 470, type: "ISLAND", modes: ["MARITIME", "FLIGHT"], info: "Haldia & Chennai Bay Line • Veer Savarkar Airport" },
  { id: "lakshadweep", name: "Kavaratti", state: "Lakshadweep", cx: 185, cy: 515, type: "ISLAND", modes: ["MARITIME"], info: "Coral Island Cruise Route • Kochi Ferry Link" },
  { id: "kolkata", name: "Kolkata (Haldia)", state: "West Bengal", cx: 450, cy: 285, type: "PORT", modes: ["MARITIME", "FLIGHT", "RAIL"], info: "Syama Prasad Mookerjee Port • Eastern Hub" },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", cx: 330, cy: 445, type: "PORT", modes: ["MARITIME", "FLIGHT", "RAIL"], info: "Coromandel Sea Route • Chennai Int'l Port" },
  { id: "srinagar", name: "Srinagar", state: "J&K", cx: 235, cy: 90, type: "HIMALAYAN", modes: ["FLIGHT", "ROAD"], info: "Himalayan Air Corridor • Trans-J&K Transit" },
  { id: "leh", name: "Leh", state: "Ladakh", cx: 275, cy: 75, type: "HIMALAYAN", modes: ["FLIGHT", "ROAD"], info: "High-Altitude Pass • Ladakh Overland Route" },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", cx: 245, cy: 215, type: "METRO", modes: ["FLIGHT", "RAIL", "ROAD"], info: "Pink City Rail Line • Desert Highway Link" },
  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", cx: 375, cy: 240, type: "HUB", modes: ["RAIL", "FLIGHT"], info: "National Waterway 1 • Vande Bharat Express Hub" },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", cx: 190, cy: 270, type: "METRO", modes: ["RAIL", "FLIGHT", "ROAD"], info: "Bullet Train Terminal • Sabarmati Riverfront" },
  { id: "vizag", name: "Visakhapatnam", state: "Andhra Pradesh", cx: 380, cy: 370, type: "PORT", modes: ["MARITIME", "FLIGHT"], info: "Vizag Port Trust • Eastern Fleet Base" },
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", cx: 290, cy: 460, type: "HUB", modes: ["FLIGHT", "RAIL"], info: "Silicon Valley Hub • Kempegowda Int'l Airport" }
];

export default function BharatParikramaMap() {
  const [selectedMode, setSelectedMode] = useState<TransitMode>("ALL");
  const [hoveredCity, setHoveredCity] = useState<CityNode | null>(null);
  const [activeRoute, setActiveRoute] = useState<string | null>("mumbai-goa-lakshadweep");

  // Filter helper
  const showFlight = selectedMode === "ALL" || selectedMode === "FLIGHT";
  const showMaritime = selectedMode === "ALL" || selectedMode === "MARITIME";
  const showRail = selectedMode === "ALL" || selectedMode === "RAIL";
  const showRoad = selectedMode === "ALL" || selectedMode === "ROAD";

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-slate-950 border border-amber-500/30 shadow-2xl">
      {/* Top Bar / Controls */}
      <div className="relative z-20 flex flex-wrap items-center justify-between p-4 bg-slate-900/90 backdrop-blur-md border-b border-amber-500/20">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
          <span className="text-xs font-bold tracking-widest text-amber-400 uppercase">
            Bharat Parikrama • Dynamic Multi-Modal Map
          </span>
        </div>

        {/* Transit Mode Filters */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedMode("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === "ALL"
                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            ✨ All Voyages
          </button>
          <button
            onClick={() => setSelectedMode("FLIGHT")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedMode === "FLIGHT"
                ? "bg-sky-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Plane size={13} /> Air
          </button>
          <button
            onClick={() => setSelectedMode("MARITIME")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedMode === "MARITIME"
                ? "bg-teal-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Anchor size={13} /> Maritime & Ferries
          </button>
          <button
            onClick={() => setSelectedMode("RAIL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedMode === "RAIL"
                ? "bg-amber-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Train size={13} /> Express Rail
          </button>
          <button
            onClick={() => setSelectedMode("ROAD")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedMode === "ROAD"
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Car size={13} /> Highways
          </button>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-gradient-to-b from-slate-950 via-slate-900 to-[#0A1120]">
        <svg
          viewBox="0 0 640 600"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="oceanGrid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0B132B" />
              <stop offset="100%" stopColor="#070C1B" />
            </linearGradient>

            <linearGradient id="indiaSaffron" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#9A3412" />
            </linearGradient>

            <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#818CF8" />
            </linearGradient>

            <linearGradient id="maritimeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2DD4BF" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            <radialGradient id="glowGradiant" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </radialGradient>

            {/* Glow Filters */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="subtleGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Grid Lines */}
          <rect width="640" height="600" fill="url(#oceanGrid)" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 50}
              x2="640"
              y2={i * 50}
              stroke="#1E293B"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              opacity="0.4"
            />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="600"
              stroke="#1E293B"
              strokeWidth="0.8"
              strokeDasharray="4 6"
              opacity="0.4"
            />
          ))}

          {/* Latitude / Longitude ticks */}
          <text x="15" y="40" fill="#475569" fontSize="9" fontFamily="monospace">8°N 77°E</text>
          <text x="15" y="160" fill="#475569" fontSize="9" fontFamily="monospace">20°N 73°E</text>
          <text x="15" y="320" fill="#475569" fontSize="9" fontFamily="monospace">28°N 77°E</text>
          <text x="560" y="585" fill="#475569" fontSize="9" fontFamily="monospace">BAY OF BENGAL</text>
          <text x="40" y="585" fill="#475569" fontSize="9" fontFamily="monospace">ARABIAN SEA</text>

          {/* Compass Rose Graphic */}
          <g transform="translate(580, 70)" opacity="0.3">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 3" />
            <polygon points="0,-20 5,-5 0,0 -5,-5" fill="#F59E0B" />
            <polygon points="0,20 5,5 0,0 -5,5" fill="#94A3B8" />
            <polygon points="20,0 5,5 0,0 5,-5" fill="#94A3B8" />
            <polygon points="-20,0 -5,5 0,0 -5,-5" fill="#94A3B8" />
            <text x="-4" y="-23" fill="#F59E0B" fontSize="9" fontWeight="bold">N</text>
          </g>

          {/* INDIA LANDMASS VISUAL (Rich Saffron/Orange vector contour) */}
          <g filter="url(#glow)">
            {/* Mainland India Contour */}
            <path
              d="M 235 60
                 L 260 55 L 285 70 L 290 100 L 270 120 L 295 135 L 340 145 L 375 140
                 L 410 160 L 445 180 L 460 220 L 440 250 L 470 270 L 490 260 L 520 275
                 L 535 300 L 500 320 L 460 300 L 420 340 L 390 380 L 350 430 L 310 480
                 L 280 540 L 270 560 L 255 540 L 235 480 L 210 440 L 195 400 L 180 340
                 L 165 310 L 150 280 L 175 250 L 190 220 L 210 190 L 225 150 L 215 110 Z"
              fill="url(#indiaSaffron)"
              stroke="#F97316"
              strokeWidth="2"
              opacity="0.85"
            />
            {/* Gujarat Peninsula Detail */}
            <path
              d="M 175 250 L 140 265 L 145 285 L 170 290 L 190 280 Z"
              fill="url(#indiaSaffron)"
              stroke="#F97316"
              strokeWidth="1.5"
              opacity="0.9"
            />
            {/* J&K / Ladakh Himalayan extension */}
            <path
              d="M 235 60 L 230 40 L 250 30 L 280 35 L 285 70 Z"
              fill="url(#indiaSaffron)"
              stroke="#FBBF24"
              strokeWidth="1.5"
              opacity="0.9"
            />
            {/* Andaman & Nicobar Islands */}
            <g opacity="0.95">
              <ellipse cx="545" cy="450" rx="6" ry="12" fill="#F97316" stroke="#FBBF24" strokeWidth="1" />
              <ellipse cx="552" cy="475" rx="5" ry="10" fill="#F97316" stroke="#FBBF24" strokeWidth="1" />
              <ellipse cx="556" cy="505" rx="4" ry="8" fill="#F97316" stroke="#FBBF24" strokeWidth="1" />
              <text x="565" y="475" fill="#FDBA74" fontSize="9" fontWeight="bold">Andaman & Nicobar</text>
            </g>
            {/* Lakshadweep Islands */}
            <g opacity="0.95">
              <circle cx="185" cy="495" r="4" fill="#2DD4BF" stroke="#5EEAD4" strokeWidth="1" />
              <circle cx="180" cy="515" r="5" fill="#2DD4BF" stroke="#5EEAD4" strokeWidth="1" />
              <circle cx="190" cy="530" r="4" fill="#2DD4BF" stroke="#5EEAD4" strokeWidth="1" />
              <text x="110" y="520" fill="#5EEAD4" fontSize="9" fontWeight="bold">Lakshadweep</text>
            </g>
            {/* Sri Lanka Contour */}
            <path
              d="M 320 545 C 335 550, 340 575, 325 580 C 310 575, 305 555, 320 545 Z"
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="1"
              opacity="0.6"
            />
          </g>

          {/* State / Zone Glow Accents */}
          <path
            d="M 235 60 L 285 70 L 340 145 M 190 220 L 375 240 M 200 345 L 390 380 M 235 480 L 330 445"
            stroke="#FEF3C7"
            strokeWidth="0.8"
            strokeDasharray="2 4"
            opacity="0.35"
          />

          {/* MARITIME SEA LANES & CRUISE VOYAGES 🚢 */}
          {showMaritime && (
            <g>
              {/* West Coast & Island Shipping Route: Mumbai -> Goa -> Lakshadweep -> Kochi */}
              <path
                id="maritimeRouteWest"
                d="M 200 345 Q 190 390, 220 430 Q 180 470, 185 515 Q 220 540, 260 520"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="3"
                strokeDasharray="6 6"
                className="animate-dash"
                opacity="0.9"
              />
              {/* East Coast & Andaman Trans-Bay Sea Line: Kolkata -> Vizag -> Chennai -> Port Blair */}
              <path
                id="maritimeRouteEast"
                d="M 450 285 Q 400 330, 380 370 Q 350 410, 330 445 Q 440 460, 550 470"
                fill="none"
                stroke="#14B8A6"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="animate-dash-fast"
                opacity="0.85"
              />
              {/* Ship Vessel Icon 1 (Sailing West Coast) */}
              <g transform="translate(195, 410)">
                <circle cx="0" cy="0" r="11" fill="#06B6D4" opacity="0.3" className="animate-ping" />
                <circle cx="0" cy="0" r="8" fill="#0E7490" stroke="#67E8F9" strokeWidth="1.5" />
                <text x="-4" y="3" fill="#FFFFFF" fontSize="9">🚢</text>
              </g>
              {/* Ship Vessel Icon 2 (Sailing Bay of Bengal to Port Blair) */}
              <g transform="translate(440, 455)">
                <circle cx="0" cy="0" r="10" fill="#14B8A6" opacity="0.3" className="animate-ping" />
                <circle cx="0" cy="0" r="8" fill="#0F766E" stroke="#5EEAD4" strokeWidth="1.5" />
                <text x="-4" y="3" fill="#FFFFFF" fontSize="9">🚢</text>
              </g>
            </g>
          )}

          {/* FLIGHT AIRWAYS ✈️ (Curved glowing air corridors) */}
          {showFlight && (
            <g>
              {/* Air Corridor 1: Delhi -> Kochi */}
              <path
                d="M 270 175 Q 180 330, 260 520"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                className="animate-dash"
                opacity="0.85"
              />
              {/* Air Corridor 2: Delhi -> Port Blair */}
              <path
                d="M 270 175 Q 420 300, 550 470"
                fill="none"
                stroke="#60A5FA"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="animate-dash-fast"
                opacity="0.85"
              />
              {/* Air Corridor 3: Mumbai -> Kolkata */}
              <path
                d="M 200 345 Q 320 260, 450 285"
                fill="none"
                stroke="#818CF8"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-dash"
                opacity="0.75"
              />
              {/* Air Corridor 4: Delhi -> Srinagar */}
              <path
                d="M 270 175 Q 250 130, 235 90"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="animate-dash"
                opacity="0.8"
              />

              {/* Animated Airplane 1 (En Route Delhi to Port Blair) */}
              <g transform="translate(425, 340) rotate(45)">
                <circle cx="0" cy="0" r="12" fill="#38BDF8" opacity="0.25" className="animate-ping" />
                <circle cx="0" cy="0" r="8" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1.5" />
                <text x="-4" y="3" fill="#FFFFFF" fontSize="9">✈️</text>
              </g>
              {/* Animated Airplane 2 (En Route Delhi to Srinagar) */}
              <g transform="translate(250, 125) rotate(-30)">
                <text x="-4" y="3" fill="#FFFFFF" fontSize="11">✈️</text>
              </g>
            </g>
          )}

          {/* HIGH-SPEED EXPRESS RAIL (Vande Bharat Lines 🚆) */}
          {showRail && (
            <g>
              {/* Rail Line 1: Delhi -> Varanasi -> Kolkata */}
              <path
                d="M 270 175 L 375 240 L 450 285"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeDasharray="7 5"
                className="animate-dash"
                opacity="0.9"
              />
              {/* Rail Line 2: Mumbai -> Ahmedabad */}
              <path
                d="M 200 345 L 190 270"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-dash-fast"
                opacity="0.9"
              />
              {/* Rail Line 3: Bengaluru -> Chennai */}
              <path
                d="M 290 460 L 330 445"
                fill="none"
                stroke="#FBBF24"
                strokeWidth="3"
                strokeDasharray="5 5"
                className="animate-dash"
                opacity="0.9"
              />
              {/* Train Icon */}
              <g transform="translate(325, 208)">
                <rect x="-7" y="-7" width="14" height="14" rx="4" fill="#D97706" stroke="#FDE68A" strokeWidth="1.5" />
                <text x="-5" y="4" fill="#FFFFFF" fontSize="9">🚆</text>
              </g>
            </g>
          )}

          {/* HIGHWAYS / OVERLAND EXPEDITIONS 🚗 */}
          {showRoad && (
            <g>
              {/* Highway 1: Leh -> Srinagar */}
              <path
                d="M 275 75 L 235 90"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-dash"
              />
              {/* Highway 2: Jaipur -> Delhi */}
              <path
                d="M 245 215 L 270 175"
                fill="none"
                stroke="#10B981"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                className="animate-dash"
              />
              {/* Vehicle Icon */}
              <g transform="translate(255, 82)">
                <text x="-4" y="3" fill="#FFFFFF" fontSize="9">🚗</text>
              </g>
            </g>
          )}

          {/* INTERACTIVE CITY NODES */}
          {CITIES.map((city) => {
            const isHovered = hoveredCity?.id === city.id;
            return (
              <g
                key={city.id}
                transform={`translate(${city.cx}, ${city.cy})`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredCity(city)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => setActiveRoute(`${city.id}-voyage`)}
              >
                {/* Outer Glow Pulse */}
                <circle
                  cx="0"
                  cy="0"
                  r={isHovered ? "18" : "10"}
                  fill={city.type === "PORT" ? "#06B6D4" : city.type === "ISLAND" ? "#2DD4BF" : "#F97316"}
                  opacity={isHovered ? "0.4" : "0.2"}
                  className="animate-pulse-glow"
                />

                {/* Core Dot */}
                <circle
                  cx="0"
                  cy="0"
                  r={isHovered ? "7" : "5"}
                  fill={city.type === "PORT" ? "#0891B2" : city.type === "ISLAND" ? "#0D9488" : "#EA580C"}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  filter="url(#subtleGlow)"
                />

                {/* City Label */}
                <text
                  x="9"
                  y="4"
                  fill={isHovered ? "#FEF08A" : "#F1F5F9"}
                  fontSize={isHovered ? "11" : "9.5"}
                  fontWeight={isHovered ? "800" : "600"}
                  fontFamily="sans-serif"
                  className="drop-shadow-md transition-all"
                >
                  {city.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* FLOATING DECORATIVE TELEMETRY CARDS (SAGAR SETU style overlay) */}

        {/* Top Left Card: AI Maritime & Air Voyage Status */}
        <div className="absolute top-4 left-4 z-10 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-teal-500/30 shadow-xl max-w-xs animate-float-slow hidden sm:block">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-teal-500/20 text-teal-300">
              <Anchor size={14} />
            </span>
            <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              Coastal Maritime Route
            </span>
          </div>
          <p className="text-sm font-semibold text-white">Mumbai → Goa → Lakshadweep</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-300">
            <span className="text-teal-400 font-medium">🚢 Luxury Ferry</span>
            <span>• Sea Wave: 2.1m (Smooth)</span>
          </div>
        </div>

        {/* Top Right Card: Air Corridor */}
        <div className="absolute top-4 right-4 z-10 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-sky-500/30 shadow-xl max-w-xs animate-float-delayed hidden sm:block">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-sky-500/20 text-sky-300">
              <Plane size={14} />
            </span>
            <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              Airway Express
            </span>
          </div>
          <p className="text-sm font-semibold text-white">Delhi → Port Blair (Andaman)</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-300">
            <span className="text-sky-400 font-medium">⚡ 3h 40m Direct Flight</span>
            <span>• On Time</span>
          </div>
        </div>

        {/* Bottom Left Card: Vande Bharat Express */}
        <div className="absolute bottom-4 left-4 z-10 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-amber-500/30 shadow-xl max-w-xs hidden md:block">
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded-lg bg-amber-500/20 text-amber-300">
              <Train size={14} />
            </span>
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              High-Speed Vande Bharat
            </span>
          </div>
          <p className="text-sm font-semibold text-white">Varanasi → Ayodhya → New Delhi</p>
          <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-300">
            <span className="text-amber-400 font-medium">🚆 160 km/h Track</span>
            <span>• Meeting-Aware Schedule</span>
          </div>
        </div>

        {/* Hovered City Info Popup Overlay */}
        {hoveredCity && (
          <div className="absolute bottom-16 right-4 z-30 p-4 bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-amber-400/50 shadow-2xl max-w-xs animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-400" />
                <h4 className="text-base font-bold text-white">{hoveredCity.name}</h4>
              </div>
              <span className="text-[10px] uppercase font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                {hoveredCity.state}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">{hoveredCity.info}</p>
            <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 font-medium">Modes:</span>
              {hoveredCity.modes.map((m) => (
                <span
                  key={m}
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 uppercase border border-slate-700"
                >
                  {m === "FLIGHT" ? "✈️ Air" : m === "MARITIME" ? "🚢 Ship" : m === "RAIL" ? "🚆 Rail" : "🚗 Road"}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Live Status Banner */}
      <div className="relative z-20 flex flex-wrap items-center justify-between px-6 py-3 bg-slate-950 border-t border-amber-500/20 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Sparkles size={14} /> AI Route Intelligence Active
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:inline">Covering 28 States & 8 Union Territories of India</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-300">Transit Types:</span>
          <span className="text-sky-400 font-medium">Flights ✈️</span>
          <span className="text-teal-400 font-medium">Cruises & Ferries 🚢</span>
          <span className="text-amber-400 font-medium">Vande Bharat 🚆</span>
        </div>
      </div>
    </div>
  );
}
