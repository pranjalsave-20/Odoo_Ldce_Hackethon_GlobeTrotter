export default function IndiaMapSVG({ highlightedCities = [], className = "" }: { highlightedCities?: string[]; className?: string; }) {
  // Simplified India outline with major city dots
  const cities: Record<string, { cx: number; cy: number }> = {
    "Mumbai": { cx: 118, cy: 210 }, "Delhi": { cx: 158, cy: 118 }, "Ahmedabad": { cx: 118, cy: 170 },
    "Jaipur": { cx: 152, cy: 140 }, "Kolkata": { cx: 260, cy: 180 }, "Chennai": { cx: 200, cy: 270 },
    "Bangalore": { cx: 185, cy: 285 }, "Hyderabad": { cx: 195, cy: 245 }, "Pune": { cx: 140, cy: 220 },
    "Udaipur": { cx: 142, cy: 155 }, "Goa": { cx: 148, cy: 255 }, "Kerala": { cx: 175, cy: 310 },
    "Varanasi": { cx: 215, cy: 155 }, "Shimla": { cx: 160, cy: 95 }, "Agra": { cx: 178, cy: 138 },
  };

  return (
    <svg viewBox="0 0 340 420" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* India outline (simplified path) */}
      <path
        d="M 155 30 L 200 28 L 240 50 L 265 75 L 280 100 L 285 130 L 275 155 L 295 170 L 300 195 L 280 220 L 295 245 L 290 265 L 270 285 L 255 305 L 245 330 L 230 355 L 210 375 L 195 390 L 180 385 L 168 370 L 158 350 L 148 325 L 140 300 L 128 275 L 115 255 L 105 235 L 95 210 L 90 185 L 80 165 L 85 145 L 75 125 L 80 105 L 90 88 L 100 70 L 110 55 L 130 40 Z"
        fill="#EBF8F5" stroke="#93C5FD" strokeWidth="1.5" opacity="0.8"
      />
      {/* Kashmir region */}
      <path d="M 155 30 L 130 40 L 120 28 L 130 15 L 145 10 L 165 12 L 180 20 L 175 28 Z" fill="#EBF8F5" stroke="#93C5FD" strokeWidth="1" opacity="0.7" />
      {/* Northeast */}
      <path d="M 265 75 L 285 65 L 305 70 L 310 90 L 295 100 L 280 100 Z" fill="#EBF8F5" stroke="#93C5FD" strokeWidth="1" opacity="0.7" />
      {/* Sri Lanka */}
      <ellipse cx="210" cy="400" rx="10" ry="14" fill="#EBF8F5" stroke="#93C5FD" strokeWidth="1" opacity="0.5" />

      {/* Route lines between highlighted cities */}
      {highlightedCities.length >= 2 && highlightedCities.map((city, i) => {
        if (i === 0) return null;
        const from = cities[highlightedCities[i-1]];
        const to = cities[city];
        if (!from || !to) return null;
        return (
          <line key={`route-${i}`} x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
            stroke="#E85D26" strokeWidth="2" strokeDasharray="5,4" opacity="0.8" />
        );
      })}

      {/* City dots */}
      {Object.entries(cities).map(([name, { cx, cy }]) => {
        const isHighlighted = highlightedCities.includes(name);
        return (
          <g key={name}>
            {isHighlighted && <circle cx={cx} cy={cy} r="10" fill="#E85D26" opacity="0.15" />}
            <circle cx={cx} cy={cy} r={isHighlighted ? 5 : 3} fill={isHighlighted ? "#E85D26" : "#93C5FD"} stroke="white" strokeWidth="1.5" />
            {isHighlighted && (
              <text x={cx + 7} y={cy + 4} fontSize="9" fill="#E85D26" fontWeight="600">{name}</text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
