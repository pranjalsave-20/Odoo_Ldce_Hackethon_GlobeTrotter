import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center text-white text-xs font-bold">BP</div>
              <span className="text-white font-semibold">BharatParikrama</span>
            </div>
            <p className="text-sm leading-relaxed">AI-powered multi-modal India travel planning platform.</p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {["Plan a Trip", "Explore India", "Community Trips", "AI Assistant"].map(l => (
                <li key={l}><Link href="#" className="text-sm hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Travel */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Travel</h4>
            <ul className="space-y-2.5">
              {["Hotels", "Transport", "Local Guides", "Emergency Help"].map(l => (
                <li key={l}><Link href="#" className="text-sm hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm"><Mail size={13} /> hello@safarset.in</li>
              <li className="flex items-center gap-2 text-sm"><Phone size={13} /> +91 98765 00000</li>
              <li className="flex items-center gap-2 text-sm"><MapPin size={13} /> Mumbai, India</li>
            </ul>
            <p className="text-xs text-slate-500 mt-4 bg-slate-800 rounded p-2">⚠️ Demo data only. Prices are illustrative.</p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2024 BharatParikrama. Made with ❤️ in India.</p>
          <div className="flex gap-5">
            {["Privacy Policy", "Terms of Service"].map(l => (
              <Link key={l} href="#" className="text-xs hover:text-white transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
