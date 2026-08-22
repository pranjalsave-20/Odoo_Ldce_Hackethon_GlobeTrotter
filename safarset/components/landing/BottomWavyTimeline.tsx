"use client";

import React from "react";
import { Landmark, Train, Sparkles, PlaneTakeoff, ChevronRight } from "lucide-react";

export default function BottomWavyTimeline() {
  const checkpoints = [
    {
      title: "Devotional & Heritage",
      subtitle: "Kashi, Kedarnath, Hampi",
      icon: Landmark,
      badge: "Spiritual",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 border-amber-200 text-amber-900",
      dotColor: "bg-amber-600",
    },
    {
      title: "Vande Bharat Rail",
      subtitle: "High-Speed Corridors",
      icon: Train,
      badge: "Express Rail",
      color: "from-blue-600 to-indigo-700",
      bgColor: "bg-blue-50 border-blue-200 text-blue-900",
      dotColor: "bg-blue-600",
    },
    {
      title: "Cultural Expeditions",
      subtitle: "Festivals & Traditions",
      icon: Sparkles,
      badge: "Arts & Culture",
      color: "from-orange-500 to-rose-600",
      bgColor: "bg-orange-50 border-orange-200 text-orange-900",
      dotColor: "bg-orange-600",
    },
    {
      title: "Airway & Maritime Hub",
      subtitle: "Multi-Modal Transfer",
      icon: PlaneTakeoff,
      badge: "Port & Airport",
      color: "from-sky-500 to-cyan-600",
      bgColor: "bg-sky-50 border-sky-200 text-sky-900",
      dotColor: "bg-sky-600",
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-slate-50 via-slate-100/70 to-white py-12 border-y border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full border border-blue-200">
              Integrated Travel Modalities
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-2 tracking-tight">
              Four Core Pillars of Bharat Parikrama
            </h3>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
            <span>Seamless Waypoint Synchronization</span>
          </div>
        </div>

        {/* 4 Checkpoint Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          
          {checkpoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Header inside Card */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border ${item.bgColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* Bottom Node Indicator */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.dotColor} animate-pulse`} />
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      Pillar 0{index + 1}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
}
