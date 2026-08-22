"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100/10 border border-amber-400/30 flex items-center justify-center text-sm">
                🏛️
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-serif">
                भारत परिक्रमा
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pan-India Travel & Itinerary Optimization Platform powered by real-time route intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Explore Destinations</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">Community Trips</Link></li>
              <li><Link href="/plan" className="hover:text-white transition-colors">Plan Itinerary</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">Modes</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span>✈️ Flight Corridors</span></li>
              <li><span>🚆 Vande Bharat Express</span></li>
              <li><span>🚢 Coastal Maritime & Cruise</span></li>
              <li><span>🚗 National Highways</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">Command Room</h4>
            <p className="text-xs text-slate-400 mb-3">
              Access active route telemetry and adaptive itinerary options.
            </p>
            <Link
              href="/dashboard"
              className="inline-block text-xs font-bold text-blue-400 hover:text-blue-300 underline"
            >
              Launch Command Room →
            </Link>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BHARAT PARIKRAMA. All rights reserved.</p>
          <p>Pan–India Travel & Itinerary Optimization</p>
        </div>
      </div>
    </footer>
  );
}
