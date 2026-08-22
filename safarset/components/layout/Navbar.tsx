"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Map, Compass, Users, Home, Menu, X, Bell, User, LogOut, Settings, Plus } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/community", label: "Community", icon: Users },
];

const DASH_LINKS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/trips", label: "My Trips", icon: Map },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/community", label: "Community", icon: Users },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const isDash =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/trips") ||
    pathname.startsWith("/plan") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/community");
  const links = user && isDash ? DASH_LINKS : NAV_LINKS;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 font-semibold text-slate-900">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">BP</div>
            <span>BharatParikrama</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button
                  className="hidden md:flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700"
                  onClick={() => router.push("/plan")}
                >
                  <Plus size={14} /> Plan Trip
                </button>
                <div className="relative">
                  <button
                    onClick={() => setShowUser(!showUser)}
                    className="flex items-center gap-2 hover:bg-slate-50 rounded-md px-2 py-1 transition-colors"
                  >
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                      : <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">{user.name[0]}</div>
                    }
                    <span className="hidden md:block text-sm text-slate-900">{user.name.split(" ")[0]}</span>
                  </button>
                  {showUser && (
                    <div className="absolute right-0 top-10 w-52 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                        <p className="font-medium text-sm text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <button onClick={() => { router.push("/profile"); setShowUser(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50">
                          <User size={14} /> Profile
                        </button>
                        <button onClick={() => { router.push("/trips"); setShowUser(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50">
                          <Map size={14} /> My Trips
                        </button>
                        <button onClick={() => { router.push("/profile?tab=settings"); setShowUser(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50">
                          <Settings size={14} /> Settings
                        </button>
                        <hr className="my-1 border-slate-100" />
                        <button onClick={() => { logout(); router.push("/"); setShowUser(false); }} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50">
                          <LogOut size={14} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden md:block px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900">Login</Link>
                <Link href="/signup" className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700">Get Started</Link>
              </>
            )}
            <button className="md:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100" onClick={() => setOpen(!open)}>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-200 py-2 space-y-0.5">
            {links.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium ${
                  pathname === href ? "bg-blue-50 text-blue-600" : "text-slate-600"
                }`}
              >
                <Icon size={15} /> {label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { router.push("/plan"); setOpen(false); }} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-sm font-medium bg-blue-600 text-white mt-1">
                <Plus size={15} /> Plan New Trip
              </button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="block px-3 py-2.5 rounded-md text-sm font-medium text-blue-600">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
