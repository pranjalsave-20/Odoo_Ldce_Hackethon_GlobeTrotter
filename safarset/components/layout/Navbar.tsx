"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Menu, X, ArrowRight, User, LogOut, Map, Plus, Compass, Users } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Plan a Trip", href: "/plan" },
    { label: "Explore India", href: "/explore" },
    { label: "Community Yatras", href: "/community" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center font-black text-base shadow-sm group-hover:bg-blue-800 transition-colors">
              BP
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-black text-slate-900 leading-none tracking-tight">
                Bharat <span className="text-blue-700">Parikrama</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mt-0.5">
                Plan Karo. Safar Set Karo.
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs sm:text-sm font-bold transition-colors ${
                  pathname === item.href ? "text-blue-700" : "text-slate-600 hover:text-blue-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                    {user.name[0]}
                  </div>
                  <span className="text-xs font-bold text-slate-800">{user.name.split(" ")[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-11 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Map size={14} /> Dashboard
                    </Link>
                    <Link
                      href="/plan"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Plus size={14} /> + Plan New Yatra
                    </Link>
                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); router.push("/"); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 shadow-sm transition-all"
                >
                  <Plus size={14} /> Plan Trip
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-bold text-slate-700 hover:text-blue-700 py-1.5"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-700"
            >
              <Plus size={14} /> Plan New Yatra
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
