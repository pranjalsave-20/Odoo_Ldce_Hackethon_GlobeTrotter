"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Map, Compass, Users, BookOpen, Home, Menu, X, Bell, User, LogOut, Settings, Plus } from "lucide-react";

const NAV_LINKS = [
  { href:"/", label:"Home", icon:Home },
  { href:"/explore", label:"Explore", icon:Compass },
  { href:"/community", label:"Community", icon:Users },
  { href:"/about", label:"About", icon:BookOpen },
];

const DASH_LINKS = [
  { href:"/dashboard", label:"Dashboard", icon:Home },
  { href:"/trips", label:"My Trips", icon:Map },
  { href:"/explore", label:"Explore", icon:Compass },
  { href:"/community", label:"Community", icon:Users },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const isDash = pathname.startsWith("/dashboard") || pathname.startsWith("/trips") || pathname.startsWith("/plan") || pathname.startsWith("/profile") || pathname.startsWith("/memories") || pathname.startsWith("/community");
  const links = user && isDash ? DASH_LINKS : NAV_LINKS;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 font-bold text-xl">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-sm font-black shadow-md">
              भारत
            </div>
            <span className="text-[#1C1C1E] tracking-tight">Bharat<span className="text-[#E85D26]">Parikrama</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname===href ? "bg-orange-50 text-[#E85D26]" : "text-[#6B7280] hover:text-[#1C1C1E] hover:bg-gray-50"}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <button className="hidden md:flex items-center gap-2 bg-[#E85D26] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#C44A1A] transition-colors" onClick={() => router.push("/plan")}>
                  <Plus size={14} /> Plan Trip
                </button>
                <button className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 relative">
                  <Bell size={18} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E85D26] rounded-full" />
                </button>
                <div className="relative">
                  <button onClick={() => setShowUser(!showUser)} className="flex items-center gap-2 hover:bg-gray-50 rounded-xl px-2 py-1.5 transition-colors">
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                      : <div className="w-8 h-8 rounded-full bg-[#E85D26] flex items-center justify-center text-white text-sm font-bold">{user.name[0]}</div>
                    }
                    <span className="hidden md:block text-sm font-medium text-[#1C1C1E]">{user.name.split(" ")[0]}</span>
                  </button>
                  {showUser && (
                    <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-[#E5E0D8] overflow-hidden z-50 animate-fade-in">
                      <div className="p-4 border-b border-[#E5E0D8]">
                        <p className="font-semibold text-sm">{user.name}</p>
                        <p className="text-xs text-[#6B7280]">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <button onClick={() => { router.push("/profile"); setShowUser(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#1C1C1E] hover:bg-gray-50">
                          <User size={15} /> Profile
                        </button>
                        <button onClick={() => { router.push("/trips"); setShowUser(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#1C1C1E] hover:bg-gray-50">
                          <Map size={15} /> My Trips
                        </button>
                        <button onClick={() => { router.push("/profile?tab=settings"); setShowUser(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#1C1C1E] hover:bg-gray-50">
                          <Settings size={15} /> Settings
                        </button>
                        <hr className="my-1 border-[#E5E0D8]" />
                        <button onClick={() => { logout(); router.push("/"); setShowUser(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-50">
                          <LogOut size={15} /> Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden md:block px-4 py-2 text-sm font-medium text-[#1C1C1E] hover:text-[#E85D26] transition-colors">Login</Link>
                <Link href="/signup" className="bg-[#E85D26] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#C44A1A] transition-colors">Get Started</Link>
              </>
            )}
            <button className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100" onClick={() => setOpen(!open)}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-[#E5E0D8] py-3 space-y-1 animate-fade-in">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${pathname===href ? "bg-orange-50 text-[#E85D26]" : "text-[#6B7280]"}`}>
                <Icon size={16} /> {label}
              </Link>
            ))}
            {user ? (
              <button onClick={() => { router.push("/plan"); setOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-[#E85D26] text-white mt-2">
                <Plus size={16} /> Plan New Trip
              </button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-[#E85D26]">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
