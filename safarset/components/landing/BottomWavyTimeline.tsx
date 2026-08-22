"use client";

import React from "react";

export default function BottomWavyTimeline() {
  return (
    <div className="relative w-full overflow-hidden pt-8 pb-10 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-36 flex items-center justify-between">

          {/* SVG Wavy Line Ribbon Background */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Dark Blue Base Wavy Ribbon Line */}
            <path
              d="M 0 60 C 150 110, 300 10, 450 60 C 600 110, 750 10, 900 60 C 1050 110, 1150 40, 1200 60"
              stroke="#1e3a8a"
              strokeWidth="5"
              strokeLinecap="round"
            />
            {/* Lighter Sky Blue Accent Parallel Line */}
            <path
              d="M 0 68 C 150 118, 300 18, 450 68 C 600 118, 750 18, 900 68 C 1050 118, 1150 48, 1200 68"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeDasharray="6 4"
              opacity="0.7"
            />
          </svg>

          {/* Checkpoint Nodes along the Wavy Ribbon with Icons & Illustrations */}
          <div className="relative z-10 w-full grid grid-cols-4 items-center gap-4">

            {/* Checkpoint 1: Heritage Temple */}
            <div className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-white border border-amber-200 shadow-md flex items-center justify-center text-3xl mb-2 group-hover:shadow-lg transition-shadow">
                🏛️
              </div>
              <div className="w-4 h-4 rounded-full bg-amber-600 border-2 border-white shadow-sm" />
              <span className="text-xs font-bold text-slate-800 mt-1">Devotional & Heritage</span>
              <span className="text-[10px] text-slate-500">Kashi, Kedarnath, Hampi</span>
            </div>

            {/* Checkpoint 2: Train Station */}
            <div className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-white border border-blue-200 shadow-md flex items-center justify-center text-3xl mb-2 group-hover:shadow-lg transition-shadow">
                🚉
              </div>
              <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
              <span className="text-xs font-bold text-slate-800 mt-1">Vande Bharat Rail</span>
              <span className="text-[10px] text-slate-500">High Speed Corridor</span>
            </div>

            {/* Checkpoint 3: Cultural Heritage & Arts */}
            <div className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-white border border-orange-200 shadow-md flex items-center justify-center text-3xl mb-2 group-hover:shadow-lg transition-shadow">
                💃
              </div>
              <div className="w-4 h-4 rounded-full bg-orange-600 border-2 border-white shadow-sm" />
              <span className="text-xs font-bold text-slate-800 mt-1">Cultural Expeditions</span>
              <span className="text-[10px] text-slate-500">Festivals & Traditions</span>
            </div>

            {/* Checkpoint 4: Airport Terminal */}
            <div className="flex flex-col items-center group cursor-pointer transform hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 rounded-2xl bg-white border border-sky-200 shadow-md flex items-center justify-center text-3xl mb-2 group-hover:shadow-lg transition-shadow">
                🛫
              </div>
              <div className="w-4 h-4 rounded-full bg-sky-600 border-2 border-white shadow-sm" />
              <span className="text-xs font-bold text-slate-800 mt-1">Airway & Maritime Hub</span>
              <span className="text-[10px] text-slate-500">Multi-Modal Transfer</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
