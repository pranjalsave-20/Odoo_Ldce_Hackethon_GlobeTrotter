"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-amber-50/10 border border-amber-200/30 p-0.5 shadow-sm shrink-0 flex items-center justify-center">
                <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black text-teal-400 tracking-tight leading-none font-serif">
                  भारत परिक्रमा
                </span>
                <span className="text-[10px] font-black text-slate-200 tracking-[0.18em] uppercase mt-1">
                  BHARAT PARIKRAMA
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pan-India Travel & Itinerary Optimization Platform powered by real-time multi-modal route intelligence.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">Navigation</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/explore" className="hover:text-white transition-colors">Route Intelligence</Link></li>
              <li><Link href="/community" className="hover:text-white transition-colors">Community Yatras</Link></li>
              <li><Link href="/plan" className="hover:text-white transition-colors">Plan Itinerary</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-100 mb-3">Transit Modes</h4>
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
              Access live route telemetry and adaptive itinerary options.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 underline"
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
