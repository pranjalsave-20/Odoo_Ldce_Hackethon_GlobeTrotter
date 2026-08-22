"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Moon, Sun, ArrowRight, User, LogOut, Map, Plus, Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const navItems = [
    { label: "The problem", href: "/#problem" },
    { label: "Approach", href: "/#approach" },
    { label: "Route intelligence", href: "/explore" },
    { label: "Adaptive rerouting", href: "/community" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left: Brand Logo & Title from reference design */}
          <Link href="/" className="flex items-center gap-3.5 group text-decoration-none">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-amber-50/50 border border-amber-200/80 p-0.5 shadow-sm shrink-0 flex items-center justify-center">
              <img src="/logo.png" alt="Bharat Parikrama" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-[#10606e] tracking-tight leading-none font-serif">
                भारत परिक्रमा
              </span>
              <span className="text-[11px] font-black text-slate-900 tracking-[0.18em] uppercase mt-1">
                BHARAT PARIKRAMA
              </span>
            </div>
          </Link>

          {/* Middle: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-semibold text-slate-600 hover:text-blue-700 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-5">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors py-1 px-2"
            >
              {darkMode ? <Sun size={15} className="text-amber-500" /> : <Moon size={15} />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-blue-200 bg-blue-50/80 hover:bg-blue-100/80 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                    {user.name[0]}
                  </div>
                  <span className="text-xs font-bold text-blue-900">{user.name.split(" ")[0]}</span>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-11 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-xs font-bold text-slate-900">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Map size={13} /> Dashboard
                    </Link>
                    <Link
                      href="/plan"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Plus size={13} /> Plan New Trip
                    </Link>
                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); router.push("/"); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 text-left"
                    >
                      <LogOut size={13} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/plan"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                COMMAND ROOM <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-slate-700 hover:text-blue-700 py-1.5"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/plan"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase text-white bg-blue-600"
            >
              COMMAND ROOM <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
