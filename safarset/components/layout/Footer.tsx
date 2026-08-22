import Link from "next/link";
import { Map, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A3A5C] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center font-black text-sm">भारत</div>
              <span className="text-xl font-bold">Bharat<span className="text-[#E85D26]">Parikrama</span></span>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed mb-4">Explore India. Intelligently Planned.<br />Multi-modal flight, maritime, rail & road travel ecosystem.</p>
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E85D26] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </button>
              <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E85D26] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </button>
              <button className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#E85D26] transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-200">Platform</h4>
            <ul className="space-y-2.5">
              {["Plan a Trip","Explore India","Community Trips","Travel Memories","AI Assistant"].map(l => (
                <li key={l}><Link href="#" className="text-sm text-blue-200 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Travel */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-200">Travel</h4>
            <ul className="space-y-2.5">
              {["Hotels","Transport","Local Guides","Taxi Booking","Food Discovery","Emergency Help"].map(l => (
                <li key={l}><Link href="#" className="text-sm text-blue-200 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-blue-200">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-blue-200"><Mail size={14} /> hello@safarset.in</li>
              <li className="flex items-center gap-2 text-sm text-blue-200"><Phone size={14} /> +91 98765 00000</li>
              <li className="flex items-center gap-2 text-sm text-blue-200"><Map size={14} /> Mumbai, India</li>
            </ul>
            <p className="mt-4 text-xs text-blue-300 bg-white/5 rounded-lg p-3">⚠️ Demo data is used for display. Prices and availability are illustrative only.</p>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-blue-300">© 2024 SafarSet. Made with ❤️ in India.</p>
          <div className="flex gap-6">
            {["Privacy Policy","Terms of Service","Cookie Policy"].map(l => (
              <Link key={l} href="#" className="text-xs text-blue-300 hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
