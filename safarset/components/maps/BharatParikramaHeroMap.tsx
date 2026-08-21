"use client";

import React, { useState } from "react";
import { Plane, Train, Anchor, Navigation, ShieldCheck, Activity, Compass } from "lucide-react";

interface CityHub {
  id: string;
  name: string;
  state: string;
  x: number;
  y: number;
  mode: "flight" | "train" | "ferry" | "road";
  labelPos: "left" | "right" | "top" | "bottom";
  hubType: string;
}

export default function BharatParikramaHeroMap() {
  const [activeHub, setActiveHub] = useState<string | null>("delhi");

  const hubs: CityHub[] = [
    { id: "srinagar", name: "Srinagar", state: "J&K", x: 200, y: 75, mode: "flight", labelPos: "right", hubType: "North Terminal" },
    { id: "delhi", name: "New Delhi", state: "NCR", x: 215, y: 165, mode: "train", labelPos: "right", hubType: "Central Multi-Modal" },
    { id: "jaipur", name: "Jaipur", state: "Rajasthan", x: 175, y: 200, mode: "road", labelPos: "left", hubType: "Heritage Corridor" },
    { id: "varanasi", name: "Varanasi", state: "UP", x: 290, y: 215, mode: "train", labelPos: "top", hubType: "Devotional Terminal" },
    { id: "kolkata", name: "Kolkata", state: "West Bengal", x: 350, y: 255, mode: "ferry", labelPos: "right", hubType: "Maritime Port" },
    { id: "guwahati", name: "Guwahati", state: "Assam", x: 410, y: 195, mode: "flight", labelPos: "top", hubType: "NE Transit Gateway" },
    { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", x: 145, y: 250, mode: "road", labelPos: "left", hubType: "Western Expressway" },
    { id: "mumbai", name: "Mumbai", state: "Maharashtra", x: 155, y: 325, mode: "ferry", labelPos: "left", hubType: "Western Sea Terminal" },
    { id: "bengaluru", name: "Bengaluru", state: "Karnataka", x: 220, y: 415, mode: "flight", labelPos: "left", hubType: "Tech & Air Hub" },
    { id: "chennai", name: "Chennai", state: "Tamil Nadu", x: 265, y: 405, mode: "ferry", labelPos: "right", hubType: "Southern Maritime Hub" },
    { id: "kochi", name: "Kochi", state: "Kerala", x: 205, y: 445, mode: "ferry", labelPos: "bottom", hubType: "Coastal Ferry Hub" },
  ];

  return (
    <div className="relative w-full max-w-[560px] mx-auto select-none">
      
      {/* Outer Card Container */}
      <div className="relative rounded-3xl bg-white border border-slate-200/90 shadow-2xl p-4 sm:p-6 overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Pan-India Route Telemetry
            </span>
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/60">
            Live 28 States Connected
          </span>
        </div>

        {/* Map Surface */}
        <div className="relative w-full aspect-[4/4.2] rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 overflow-hidden shadow-inner border border-slate-800">
          
          {/* High-Tech Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }}
          />

          {/* Radial Center Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(37,99,235,0.25),transparent_70%)] pointer-events-none" />

          {/* SVG Map Canvas */}
          <svg
            viewBox="0 0 500 520"
            className="w-full h-full relative z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#fb923c" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>

              <linearGradient id="seaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
              </linearGradient>

              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <g filter="url(#glow)">
              <path
                d="
                  M 200 45
                  C 215 35, 230 40, 245 55
                  C 260 70, 275 85, 285 105
                  C 295 120, 320 125, 340 135
                  C 365 145, 395 155, 420 170
                  C 435 180, 440 200, 425 210
                  C 405 220, 375 225, 360 240
                  C 350 255, 345 285, 325 310
                  C 305 335, 285 370, 270 410
                  C 255 450, 235 470, 220 480
                  C 210 475, 195 440, 185 410
                  C 170 375, 150 340, 145 310
                  C 135 280, 125 260, 135 235
                  C 145 210, 155 180, 150 155
                  C 145 130, 160 100, 175 75
                  Z
                "
                fill="#0f172a"
                fillOpacity="0.85"
                stroke="#1e3a8a"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              <path
                d="
                  M 200 45
                  C 215 35, 230 40, 245 55
                  C 260 70, 275 85, 285 105
                  C 295 120, 320 125, 340 135
                  C 365 145, 395 155, 420 170
                  C 435 180, 440 200, 425 210
                  C 405 220, 375 225, 360 240
                  C 350 255, 345 285, 325 310
                  C 305 335, 285 370, 270 410
                  C 255 450, 235 470, 220 480
                  C 210 475, 195 440, 185 410
                  C 170 375, 150 340, 145 310
                  C 135 280, 125 260, 135 235
                  C 145 210, 155 180, 150 155
                  C 145 130, 160 100, 175 75
                  Z
                "
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeOpacity="0.6"
              />

              <path
                d="M 340 135 C 370 120, 420 125, 445 150 C 455 165, 440 190, 410 195 Z"
                fill="#0f172a"
                fillOpacity="0.8"
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
            </g>

            {/* Maritime Routes */}
            <path
              d="M 155 325 C 130 380, 160 450, 205 445"
              fill="none"
              stroke="url(#seaGradient)"
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />
            <path
              d="M 205 445 C 235 470, 280 440, 265 405"
              fill="none"
              stroke="url(#seaGradient)"
              strokeWidth="2.5"
              strokeDasharray="5 4"
            />
            <path
              d="M 265 405 C 310 370, 360 310, 350 255"
              fill="none"
              stroke="url(#seaGradient)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />

            {/* Parikrama Routes */}
            <path
              d="
                M 200 75 L 215 165
                M 215 165 L 175 200 L 145 250 L 155 325 L 220 415 L 265 405 L 350 255 L 290 215 L 215 165
                M 350 255 L 410 195
              "
              fill="none"
              stroke="url(#routeGradient)"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Transport Badges */}
            <g transform="translate(190, 285)">
              <rect x="-14" y="-12" width="28" height="24" rx="12" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fontSize="12" fill="#ffffff">🚗</text>
            </g>
            <g transform="translate(250, 190)">
              <rect x="-14" y="-12" width="28" height="24" rx="12" fill="#1e293b" stroke="#fb923c" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fontSize="12" fill="#ffffff">🚆</text>
            </g>
            <g transform="translate(320, 330)">
              <rect x="-14" y="-12" width="28" height="24" rx="12" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fontSize="12" fill="#ffffff">🚢</text>
            </g>
            <g transform="translate(380, 225)">
              <rect x="-14" y="-12" width="28" height="24" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1" />
              <text x="0" y="4" textAnchor="middle" fontSize="12" fill="#ffffff">✈️</text>
            </g>

            {/* City Hub Nodes */}
            {hubs.map((hub) => {
              const isActive = activeHub === hub.id;
              
              let dx = 12;
              let dy = 4;
              let anchorPos: "start" | "end" | "middle" = "start";
              if (hub.labelPos === "left") {
                dx = -12;
                anchorPos = "end";
              } else if (hub.labelPos === "top") {
                dx = 0;
                dy = -14;
                anchorPos = "middle";
              } else if (hub.labelPos === "bottom") {
                dx = 0;
                dy = 18;
                anchorPos = "middle";
              }

              return (
                <g
                  key={hub.id}
                  transform={`translate(${hub.x}, ${hub.y})`}
                  className="cursor-pointer group"
                  onClick={() => setActiveHub(hub.id)}
                >
                  {isActive && (
                    <circle cx="0" cy="0" r="14" fill="#38bdf8" fillOpacity="0.25" className="animate-ping" />
                  )}

                  <circle
                    cx="0"
                    cy="0"
                    r={isActive ? "7" : "5"}
                    fill={isActive ? "#fb923c" : "#38bdf8"}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  <text
                    x={dx}
                    y={dy}
                    textAnchor={anchorPos}
                    fontSize="11"
                    fontWeight={isActive ? "800" : "600"}
                    fill={isActive ? "#ffffff" : "#cbd5e1"}
                    fontFamily="Inter, system-ui, sans-serif"
                    className="transition-colors duration-200 group-hover:fill-sky-300"
                  >
                    {hub.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Active Hub Tooltip Overlay Card */}
          {activeHub && (
            <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700/80 shadow-lg flex items-center justify-between text-white transition-all">
              {(() => {
                const current = hubs.find((h) => h.id === activeHub);
                if (!current) return null;
                return (
                  <>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-sky-400 font-bold text-sm">
                        {current.mode === "flight" && <Plane size={16} />}
                        {current.mode === "train" && <Train size={16} />}
                        {current.mode === "ferry" && <Anchor size={16} />}
                        {current.mode === "road" && <Navigation size={16} />}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-black tracking-wide text-white">{current.name}, {current.state}</p>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold">
                            Connected
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">{current.hubType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-sky-400 block uppercase tracking-wider">Mode</span>
                      <span className="text-xs font-semibold capitalize text-slate-200">{current.mode}</span>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between pt-3 mt-1 text-[11px] text-slate-600 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-sky-400 rounded-full inline-block" />
            <span>Air Corridors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-orange-400 rounded-full inline-block" />
            <span>Vande Bharat Rail</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-blue-500 rounded-full inline-block" />
            <span>Coastal Ferries</span>
          </div>
        </div>

      </div>
    </div>
  );
}
