"use client";

import React from "react";

export default function BharatParikramaHeroMap() {
  const cities = [
    { name: "Srinagar", x: 230, y: 55, icon: "✈️" },
    { name: "Delhi", x: 235, y: 155, icon: "🚆" },
    { name: "Jaipur", x: 195, y: 195, icon: "🚗" },
    { name: "Varanasi", x: 295, y: 205, icon: "🚆" },
    { name: "Kolkata", x: 350, y: 245, icon: "⛴️" },
    { name: "Guwahati", x: 385, y: 185, icon: "✈️" },
    { name: "Ahmedabad", x: 165, y: 245, icon: "🚗" },
    { name: "Mumbai", x: 175, y: 315, icon: "⛴️" },
    { name: "Bengaluru", x: 240, y: 405, icon: "✈️" },
    { name: "Chennai", x: 275, y: 395, icon: "⛴️" },
  ];

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[1.1/1] max-w-[560px] mx-auto select-none">
      
      {/* Background Blueprint Grid Box */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-3xl border border-blue-200/80 shadow-xl overflow-hidden bg-grid-pattern">
        
        {/* Subtle radial light highlight in center */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/50 via-transparent to-sky-100/40 pointer-events-none" />

        <svg
          viewBox="0 0 460 480"
          className="w-full h-full relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main India Outer Contour (vector paths) */}
          <g filter="drop-shadow(0 2px 8px rgba(30, 58, 138, 0.08))">
            {/* Mainland */}
            <path
              d="
                M 195 25
                L 210 20 L 230 35 L 245 45 L 260 55
                L 270 75 L 280 95
                L 290 110 L 310 115 L 325 125
                L 345 135 L 360 150 L 375 160
                L 395 170 L 405 185 L 390 200
                L 370 205 L 350 215 L 345 235
                L 355 250 L 340 265 L 330 280
                L 310 300 L 295 330
                L 280 360 L 265 390
                L 250 420 L 235 435
                L 220 425 L 205 405
                L 190 380 L 175 350
                L 165 320 L 155 290
                L 145 265 L 130 245
                L 125 220 L 135 200
                L 145 180 L 155 160
                L 148 135 L 152 110
                L 162 90 L 172 70
                L 182 50 L 190 35 Z
              "
              fill="#ffffff"
              stroke="#1e3a8a"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Kashmir */}
            <path
              d="M 195 25 L 180 15 L 192 8 L 210 10 L 220 20 Z"
              fill="#ffffff"
              stroke="#1e3a8a"
              strokeWidth="1.8"
            />

            {/* Northeast */}
            <path
              d="M 345 135 L 370 125 L 395 130 L 415 145 L 420 165 L 395 170 Z"
              fill="#ffffff"
              stroke="#1e3a8a"
              strokeWidth="1.8"
            />
          </g>

          {/* Connected Curved Route Lines */}
          <path
            d="
              M 230 55 Q 232 100 235 155
              M 235 155 Q 210 175 195 195
              M 235 155 Q 265 180 295 205
              M 235 155 Q 195 200 165 245
              M 295 205 Q 320 225 350 245
              M 350 245 Q 370 215 385 185
              M 165 245 Q 170 280 175 315
              M 175 315 Q 210 360 240 405
              M 240 405 Q 260 400 275 395
              M 175 315 Q 240 340 350 245
            "
            fill="none"
            stroke="#c2410c"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            opacity="0.8"
            className="animate-dash"
          />

          {/* Secondary Curved Sea / Air Route Connections */}
          <path
            d="M 175 315 Q 220 440 275 395"
            fill="none"
            stroke="#2563eb"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Transport Mode Floating Badges along routes */}
          <g transform="translate(305, 120)">
            <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="11">⛴️</text>
          </g>

          <g transform="translate(268, 172)">
            <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="11">🚆</text>
          </g>

          <g transform="translate(265, 275)">
            <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="11">🚗</text>
          </g>

          <g transform="translate(220, 360)">
            <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="11">⛴️</text>
          </g>

          <g transform="translate(345, 365)">
            <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="11">✈️</text>
          </g>

          {/* Floating Ships on Ocean Water Lines */}
          <g transform="translate(195, 290)">
            <circle cx="0" cy="0" r="13" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="11">⛴️</text>
          </g>

          {/* City Location Pins */}
          {cities.map((c) => (
            <g key={c.name} transform={`translate(${c.x}, ${c.y})`} className="cursor-pointer group">
              {/* Pin shadow */}
              <ellipse cx="0" cy="11" rx="5" ry="2" fill="#0f172a" opacity="0.2" />
              {/* Location Pin Icon */}
              <path
                d="M 0 10 C -4 10 -7 6 -7 0 C -7 -6 -4 -9 0 -9 C 4 -9 7 -6 7 0 C 7 6 4 10 0 10 Z"
                fill="#1e3a8a"
                stroke="#ffffff"
                strokeWidth="1.5"
              />
              <circle cx="0" cy="-1" r="2.5" fill="#ffffff" />
              
              {/* City Label */}
              <text
                x="11"
                y="3"
                fontSize="11"
                fontWeight="700"
                fill="#0f172a"
                fontFamily="Inter, sans-serif"
                className="group-hover:fill-blue-700 transition-colors"
              >
                {c.name}
              </text>
            </g>
          ))}

          {/* Decorative Plant / Environment Illustrations in Water */}
          {/* Plant Icon on right */}
          <g transform="translate(350, 310)">
            <text fontSize="22">🌱</text>
          </g>
          {/* Indian Classical Dancer Illustration */}
          <g transform="translate(195, 370)">
            <text fontSize="26">💃</text>
          </g>
          {/* Water waves */}
          <path d="M 340 335 Q 355 330 370 335 T 400 335" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <path d="M 330 345 Q 345 340 360 345 T 390 345" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />

          {/* Ship floating top right */}
          <g transform="translate(320, 75)">
            <circle cx="0" cy="0" r="14" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="0" y="4" textAnchor="middle" fontSize="12">🚢</text>
          </g>
        </svg>

      </div>
    </div>
  );
}
