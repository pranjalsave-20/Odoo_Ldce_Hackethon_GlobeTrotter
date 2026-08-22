// Clean, simple India map — light background, subtle outline, restrained route lines, simple city dots
// No dark command-center, no complex animations, no overlapping elements
import React from "react";

interface CityDot {
  name: string;
  x: number;
  y: number;
  mode?: "flight" | "rail" | "road" | "ship";
}

const CITIES: CityDot[] = [
  { name: "Srinagar",  x: 134, y: 68,  mode: "flight" },
  { name: "Delhi",     x: 176, y: 140, mode: "rail" },
  { name: "Jaipur",   x: 158, y: 172, mode: "road" },
  { name: "Ahmedabad",x: 128, y: 210, mode: "rail" },
  { name: "Varanasi", x: 240, y: 175, mode: "rail" },
  { name: "Kolkata",  x: 290, y: 208, mode: "ship" },
  { name: "Guwahati", x: 318, y: 150, mode: "flight" },
  { name: "Mumbai",   x: 132, y: 260, mode: "flight" },
  { name: "Chennai",  x: 215, y: 322, mode: "ship" },
  { name: "Bengaluru",x: 195, y: 342, mode: "flight" },
];

// Route connections: [from, to]
const ROUTES: [string, string][] = [
  ["Srinagar", "Delhi"],
  ["Delhi", "Jaipur"],
  ["Delhi", "Varanasi"],
  ["Delhi", "Ahmedabad"],
  ["Varanasi", "Kolkata"],
  ["Kolkata", "Guwahati"],
  ["Ahmedabad", "Mumbai"],
  ["Mumbai", "Chennai"],
  ["Chennai", "Bengaluru"],
];

const modeIcon: Record<string, string> = {
  flight: "✈",
  rail:   "🚆",
  road:   "🚗",
  ship:   "⛴",
};

export default function IndiaMapSimple({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  const cityMap = Object.fromEntries(CITIES.map(c => [c.name, c]));

  return (
    <svg
      viewBox="0 0 420 450"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="India route map"
    >
      {/* Light background */}
      <rect width="420" height="450" fill="#F0F5FC" rx="16" />

      {/* Decorative subtle grid */}
      {[90, 180, 270, 360].map(x => (
        <line key={`gv-${x}`} x1={x} y1="20" x2={x} y2="430" stroke="#DDE6F0" strokeWidth="0.8" />
      ))}
      {[90, 180, 270, 360].map(y => (
        <line key={`gh-${y}`} x1="20" y1={y} x2="400" y2={y} stroke="#DDE6F0" strokeWidth="0.8" />
      ))}

      {/* India mainland outline — simplified, clean */}
      <path
        d="
          M 148 28
          L 170 22 L 200 30 L 220 46 L 238 58
          L 248 78 L 255 100
          L 268 112 L 285 118 L 300 132
          L 320 148 L 330 168 L 325 190
          L 340 210 L 345 232
          L 330 252 L 340 272 L 330 290
          L 315 308 L 298 330
          L 278 355 L 258 378
          L 242 396 L 228 408
          L 212 400 L 200 388
          L 188 368 L 175 345
          L 160 318 L 148 295
          L 135 270 L 122 250
          L 112 228 L 108 205
          L 100 182 L 108 160
          L 100 140 L 102 118
          L 110 98 L 118 78
          L 128 58 L 136 42 Z
        "
        fill="#EBF2FA"
        stroke="#94B4D8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Kashmir / J&K region */}
      <path
        d="M 148 28 L 136 16 L 148 8 L 162 10 L 174 18 L 170 28 Z"
        fill="#EBF2FA"
        stroke="#94B4D8"
        strokeWidth="1.2"
      />

      {/* Northeast region */}
      <path
        d="M 300 132 L 318 122 L 336 128 L 348 140 L 350 158 L 332 165 L 320 148 Z"
        fill="#EBF2FA"
        stroke="#94B4D8"
        strokeWidth="1.2"
      />

      {/* Route lines */}
      {ROUTES.map(([fromName, toName]) => {
        const from = cityMap[fromName];
        const to   = cityMap[toName];
        if (!from || !to) return null;
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2 - 18;
        return (
          <path
            key={`${fromName}-${toName}`}
            d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
            fill="none"
            stroke="#1E5EAA"
            strokeWidth="1.5"
            strokeDasharray="5 4"
            opacity="0.55"
          />
        );
      })}

      {/* City dots + labels + mode icon */}
      {CITIES.map(city => (
        <g key={city.name}>
          {/* Outer ring */}
          <circle cx={city.x} cy={city.y} r="8" fill="#1E5EAA" opacity="0.12" />
          {/* Inner dot */}
          <circle cx={city.x} cy={city.y} r="4.5" fill="#1E5EAA" stroke="#fff" strokeWidth="1.5" />
          {/* City name */}
          <text
            x={city.x + 10}
            y={city.y + 4}
            fontSize="9.5"
            fontWeight="600"
            fill="#0F2D52"
            fontFamily="Inter, sans-serif"
          >
            {city.name}
          </text>
          {/* Transport mode icon */}
          {city.mode && (
            <text x={city.x - 6} y={city.y - 11} fontSize="9" textAnchor="middle">
              {modeIcon[city.mode]}
            </text>
          )}
        </g>
      ))}

      {/* Legend */}
      <g transform="translate(16, 400)">
        <rect width="165" height="36" rx="6" fill="#fff" opacity="0.9" stroke="#DDE6F0" strokeWidth="1" />
        <text x="10" y="14" fontSize="9" fontWeight="700" fill="#4A5568" letterSpacing="0.5" fontFamily="Inter, sans-serif">TRAVEL MODES</text>
        {["✈ Flight", "🚆 Train", "🚗 Road", "⛴ Ferry"].map((t, i) => (
          <text key={t} x={10 + i * 38} y="28" fontSize="8.5" fill="#0F2D52" fontFamily="Inter, sans-serif">{t}</text>
        ))}
      </g>
    </svg>
  );
}
