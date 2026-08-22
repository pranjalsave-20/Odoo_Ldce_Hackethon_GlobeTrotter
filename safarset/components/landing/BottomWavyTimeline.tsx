"use client";

import React from "react";
import Link from "next/link";

export default function BottomWavyTimeline() {
  const milestones = [
    {
      id: "temple",
      title: "Sacred Heritage",
      desc: "Kashi & Ayodhya Yatra",
      icon: "🛕",
      xPercent: 12,
      yOffset: 35,
    },
    {
      id: "train",
      title: "Rail Corridors",
      desc: "Vande Bharat Express",
      icon: "🚆",
      xPercent: 34,
      yOffset: 25,
    },
    {
      id: "dance",
      title: "Cultural Roots",
      desc: "Arts & Local Traditions",
      icon: "💃",
      xPercent: 55,
      yOffset: 45,
    },
    {
      id: "airport",
      title: "Sky Gateways",
      desc: "Pan-India Multi-Modal",
      icon: "🛫",
      xPercent: 88,
      yOffset: 20,
    }
  ];

  return (
    <div className="relative w-full overflow-hidden pt-8 pb-4">
      
      {/* SVG Continuous Wavy Dual Ribbon */}
      <div className="relative w-full h-24 sm:h-28">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Saffron / Gold Upper Wave */}
          <path
            d="
              M 0 60
              C 150 90, 280 30, 420 50
              C 560 70, 700 110, 850 85
              C 1000 60, 1100 40, 1200 45
            "
            fill="none"
            stroke="#c2410c"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Deep Navy Blue Lower Wave */}
          <path
            d="
              M 0 75
              C 160 105, 300 45, 440 65
              C 580 85, 720 125, 870 100
              C 1020 75, 1110 55, 1200 60
            "
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Milestone circular dots on the wave */}
          <circle cx="144" cy="70" r="7" fill="#c2410c" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="408" cy="50" r="7" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="660" cy="98" r="7" fill="#c2410c" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx="1056" cy="50" r="7" fill="#1e3a8a" stroke="#ffffff" strokeWidth="2.5" />
        </svg>

        {/* Milestone floating Badges */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 pointer-events-none flex items-center justify-between">
          
          {/* Milestone 1: Ancient Temple */}
          <div className="pointer-events-auto flex flex-col items-center -translate-y-5">
            <div className="w-14 h-14 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center justify-center text-2xl hover:scale-110 transition-transform">
              🛕
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">Heritage Yatra</span>
          </div>

          {/* Milestone 2: Train Station */}
          <div className="pointer-events-auto flex flex-col items-center -translate-y-7">
            <div className="w-14 h-14 rounded-2xl bg-white border border-blue-200 shadow-md flex items-center justify-center text-2xl hover:scale-110 transition-transform">
              🚆
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">Vande Bharat</span>
          </div>

          {/* Milestone 3: Classical Dancer */}
          <div className="pointer-events-auto flex flex-col items-center -translate-y-2">
            <div className="w-14 h-14 rounded-2xl bg-white border border-orange-200 shadow-md flex items-center justify-center text-2xl hover:scale-110 transition-transform">
              💃
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">Culture & Guides</span>
          </div>

          {/* Milestone 4: Modern Airport */}
          <div className="pointer-events-auto flex flex-col items-center -translate-y-8">
            <div className="w-14 h-14 rounded-2xl bg-white border border-sky-200 shadow-md flex items-center justify-center text-2xl hover:scale-110 transition-transform">
              🛫
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">Air & Sea Hubs</span>
          </div>

        </div>
      </div>

    </div>
  );
}
