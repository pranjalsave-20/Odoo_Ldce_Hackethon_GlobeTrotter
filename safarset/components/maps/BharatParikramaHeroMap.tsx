"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Plane, Train, Bus, Car, Anchor, MapPin, Sparkles, ArrowRight, 
  CheckCircle2, Compass, Star, Navigation, ShieldCheck
} from "lucide-react";

export interface HeroMapCity {
  id: string;
  name: string;
  state: string;
  x: number;
  y: number;
  labelPos: "left" | "right" | "top" | "bottom";
  mode: "flight" | "train" | "ferry" | "road";
  tag: string;
  avgBudget: number;
  rating: number;
  image: string;
}

export const HERO_MAP_CITIES: HeroMapCity[] = [
  {
    id: "srinagar",
    name: "Srinagar",
    state: "Jammu & Kashmir",
    x: 210,
    y: 60,
    labelPos: "right",
    mode: "flight",
    tag: "Dal Lake & High Passes",
    avgBudget: 3500,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=400&q=80"
  },
  {
    id: "delhi",
    name: "Delhi",
    state: "NCR",
    x: 230,
    y: 155,
    labelPos: "right",
    mode: "train",
    tag: "National Multi-Modal Hub",
    avgBudget: 2800,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80"
  },
  {
    id: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    x: 185,
    y: 195,
    labelPos: "left",
    mode: "road",
    tag: "Pink City Heritage Corridor",
    avgBudget: 2400,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80"
  },
  {
    id: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    x: 305,
    y: 215,
    labelPos: "bottom",
    mode: "train",
    tag: "Spiritual Kashi Yatra",
    avgBudget: 1800,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=400&q=80"
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    x: 150,
    y: 260,
    mode: "road",
    labelPos: "left",
    tag: "Sabarmati & Expressways",
    avgBudget: 2200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80"
  },
  {
    id: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    x: 165,
    y: 335,
    labelPos: "left",
    mode: "ferry",
    tag: "Western Sea Terminal",
    avgBudget: 3800,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80"
  },
  {
    id: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    x: 370,
    y: 265,
    labelPos: "right",
    mode: "ferry",
    tag: "Eastern Maritime Port",
    avgBudget: 2000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80"
  },
  {
    id: "guwahati",
    name: "Guwahati",
    state: "Assam",
    x: 435,
    y: 195,
    mode: "flight",
    labelPos: "right",
    tag: "Northeast Gateway & Brahmaputra",
    avgBudget: 2600,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1571498664957-fde3c36c28f1?w=400&q=80"
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    x: 225,
    y: 430,
    labelPos: "left",
    mode: "flight",
    tag: "Southern Tech & Air Hub",
    avgBudget: 3000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80"
  },
  {
    id: "chennai",
    name: "Chennai",
    state: "Tamil Nadu",
    x: 275,
    y: 425,
    labelPos: "right",
    mode: "ferry",
    tag: "Coromandel Maritime Port",
    avgBudget: 2300,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80"
  }
];

export default function BharatParikramaHeroMap() {
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<string>("delhi");

  const selectedCity = HERO_MAP_CITIES.find(c => c.id === selectedCityId) || HERO_MAP_CITIES[1];

  const handleLaunchPlan = (cityName: string) => {
    router.push(`/plan?to=${encodeURIComponent(cityName)}`);
  };

  return (
    <div className="relative w-full max-w-[620px] mx-auto select-none">
      
      {/* Outer Clean Container with subtle blueprint grid */}
      <div className="relative rounded-3xl bg-white/70 backdrop-blur-xs p-2 sm:p-4 overflow-visible">
        
        {/* SVG Canvas Matching the Reference Image Exactly */}
        <div className="relative w-full aspect-[4/3.9] overflow-visible">
          
          {/* Square Grid Pattern in Background */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none rounded-3xl"
            style={{
              backgroundImage: `linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />

          <svg
            viewBox="0 0 540 520"
            className="w-full h-full relative z-10 overflow-visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* ── INDIA MAINLAND VECTOR OUTLINE (White Fill with Dark Border) ── */}
            <g filter="url(#softShadow)">
              {/* Outer Boundary */}
              <path
                d="
                  M 210 25
                  C 225 20, 240 30, 245 50
                  C 250 65, 265 80, 280 100
                  C 295 115, 325 130, 355 140
                  C 380 148, 410 152, 440 148
                  C 455 160, 455 185, 445 205
                  C 425 220, 395 230, 385 220
                  C 375 240, 370 260, 360 268
                  C 350 282, 345 305, 335 315
                  C 315 340, 295 375, 270 415
                  C 255 440, 250 465, 250 475
                  C 240 485, 225 495, 215 495
                  C 205 490, 195 465, 185 425
                  C 175 385, 165 350, 165 330
                  C 155 300, 140 280, 125 260
                  C 115 245, 115 215, 140 195
                  C 155 175, 165 155, 170 130
                  C 175 105, 185 75, 195 55
                  Z
                "
                fill="#ffffff"
                stroke="#1e293b"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />

              {/* Northeast Wing */}
              <path
                d="M 355 140 C 385 130, 425 135, 450 155 C 460 175, 450 200, 420 200 C 400 200, 385 185, 365 170 Z"
                fill="#ffffff"
                stroke="#1e293b"
                strokeWidth="1.8"
              />

              {/* Internal State Dividing Lines (Subtle) */}
              <g stroke="#cbd5e1" strokeWidth="0.9" fill="none" strokeDasharray="2 2">
                <path d="M 195 95 Q 230 115 265 110" />
                <path d="M 180 160 Q 220 180 270 175" />
                <path d="M 165 210 Q 210 240 290 230" />
                <path d="M 140 270 Q 200 285 320 270" />
                <path d="M 175 320 Q 240 335 300 330" />
                <path d="M 190 380 Q 235 390 265 405" />
                <path d="M 205 440 Q 230 450 245 460" />
              </g>
            </g>

            {/* ── SOLID GOLD/BROWN CORRIDOR ROUTE (Matching Reference) ─── */}
            <path
              d="
                M 210 60 L 230 155
                M 230 155 L 185 195 L 150 260 L 165 335 L 225 430 L 275 425 L 370 265 L 305 215 L 230 155
                M 370 265 L 435 195
              "
              fill="none"
              stroke="#ca8a04"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* ── DASHED AERIAL & MARITIME LOOPS (Matching Reference) ─── */}
            <path
              d="M 165 335 C 130 385, 160 460, 225 430"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.4"
              strokeDasharray="4 4"
            />
            <path
              d="M 275 425 C 330 410, 390 340, 370 265"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.4"
              strokeDasharray="4 4"
            />
            <path
              d="M 230 155 C 320 120, 420 150, 435 195"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.4"
              strokeDasharray="4 4"
            />

            {/* ── VEHICLE & CULTURAL ICONS FLOATING ON MAP (From Reference Image) ─── */}
            
            {/* Train Icon near Delhi / Varanasi Corridor */}
            <g transform="translate(265, 175)" className="cursor-pointer">
              <rect x="-14" y="-12" width="28" height="24" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="13">🚆</text>
            </g>

            {/* Car Icon on Central Highway */}
            <g transform="translate(245, 275)" className="cursor-pointer">
              <rect x="-14" y="-12" width="28" height="24" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="13">🚗</text>
            </g>

            {/* Ship / Ferry in Arabian Sea (Off Mumbai Coast) */}
            <g transform="translate(105, 325)" className="cursor-pointer">
              <rect x="-16" y="-13" width="32" height="26" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="14">🚢</text>
            </g>

            {/* Ship / Ferry in Arabian Sea (Farther West) */}
            <g transform="translate(75, 335)" className="cursor-pointer">
              <rect x="-14" y="-11" width="28" height="22" rx="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fontSize="12">🛳️</text>
            </g>

            {/* Airplane in Flight Arc (South-West) */}
            <g transform="translate(160, 445)" className="cursor-pointer">
              <rect x="-14" y="-12" width="28" height="24" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="13">✈️</text>
            </g>

            {/* Ship in Bay of Bengal (Off Kolkata) */}
            <g transform="translate(400, 290)" className="cursor-pointer">
              <rect x="-15" y="-12" width="30" height="24" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="13">🚢</text>
            </g>

            {/* Ship in Bay of Bengal (Off North-East) */}
            <g transform="translate(380, 130)" className="cursor-pointer">
              <rect x="-14" y="-12" width="28" height="24" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="13">🚢</text>
            </g>

            {/* Airplane in Flight Arc (East) */}
            <g transform="translate(375, 415)" className="cursor-pointer">
              <rect x="-14" y="-12" width="28" height="24" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="13">✈️</text>
            </g>

            {/* Ship off Southern Coast */}
            <g transform="translate(330, 480)" className="cursor-pointer">
              <rect x="-14" y="-12" width="28" height="24" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" filter="url(#softShadow)" />
              <text x="0" y="4.5" textAnchor="middle" fontSize="13">⛴️</text>
            </g>

            {/* Cultural Elements in Bay of Bengal: Plant/Tea Leaves */}
            <g transform="translate(420, 380)">
              <text x="0" y="0" textAnchor="middle" fontSize="18">🌱</text>
            </g>

            {/* Cultural Elements in Bay of Bengal: Clay Pot / Heritage Dish */}
            <g transform="translate(480, 290)">
              <text x="0" y="0" textAnchor="middle" fontSize="18">🍲</text>
            </g>

            {/* ── CITY LOCATION PINS & LABELS (Exact Match to Image) ─── */}
            {HERO_MAP_CITIES.map((city) => {
              const isSelected = selectedCityId === city.id;
              
              let dx = 12;
              let dy = 4;
              let anchorPos: "start" | "end" | "middle" = "start";
              if (city.labelPos === "left") {
                dx = -12;
                anchorPos = "end";
              } else if (city.labelPos === "top") {
                dx = 0;
                dy = -14;
                anchorPos = "middle";
              } else if (city.labelPos === "bottom") {
                dx = 0;
                dy = 18;
                anchorPos = "middle";
              }

              return (
                <g
                  key={city.id}
                  transform={`translate(${city.x}, ${city.y})`}
                  className="cursor-pointer group"
                  onClick={() => setSelectedCityId(city.id)}
                >
                  {/* Ping effect when active */}
                  {isSelected && (
                    <circle cx="0" cy="-6" r="16" fill="#3b82f6" fillOpacity="0.25" className="animate-ping" />
                  )}

                  {/* SVG Blue Location Pin Marker */}
                  <g transform="translate(-10, -22)">
                    <path
                      d="M 10 0 C 4.5 0 0 4.5 0 10 C 0 16 10 24 10 24 C 10 24 20 16 20 10 C 20 4.5 15.5 0 10 0 Z"
                      fill={isSelected ? "#1d4ed8" : "#2563eb"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      filter="url(#softShadow)"
                    />
                    <circle cx="10" cy="9" r="3.5" fill="#ffffff" />
                  </g>

                  {/* City Name Label with White Shadow for crystal clear reading */}
                  <text
                    x={dx}
                    y={dy}
                    textAnchor={anchorPos}
                    fontSize="11"
                    fontWeight={isSelected ? "900" : "700"}
                    fill={isSelected ? "#1d4ed8" : "#0f172a"}
                    stroke="#ffffff"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    paintOrder="stroke fill"
                    fontFamily="Plus Jakarta Sans, Inter, sans-serif"
                    className="transition-colors duration-200 group-hover:fill-blue-700 pointer-events-none"
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}
          </svg>

        </div>

        {/* ── INTERACTIVE SELECTED CITY CARD ─────────────────────── */}
        <div className="mt-2 p-3 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden relative flex-shrink-0 border border-slate-200">
              <img src={selectedCity.image} alt={selectedCity.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-black text-slate-900">{selectedCity.name}, {selectedCity.state}</p>
              <p className="text-[11px] text-slate-500 font-medium">{selectedCity.tag} • ⭐ {selectedCity.rating}</p>
            </div>
          </div>

          <button
            onClick={() => handleLaunchPlan(selectedCity.name)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 shrink-0"
          >
            Plan Trip <ArrowRight size={13} />
          </button>
        </div>

      </div>
    </div>
  );
}
