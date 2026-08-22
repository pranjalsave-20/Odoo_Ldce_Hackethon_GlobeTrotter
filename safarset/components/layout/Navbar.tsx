"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Menu, X, Plus, User, LogOut, Settings, Map, Bell } from "lucide-react";

const NAV_LINKS = [
  { href: "/",          label: "Home" },
  { href: "/explore",   label: "Explore" },
  { href: "/community", label: "Community" },
  { href: "/about",     label: "How It Works" },
];

const DASH_LINKS = [
  { href: "/dashboard",  label: "Dashboard" },
  { href: "/trips",      label: "My Trips" },
  { href: "/explore",    label: "Explore" },
  { href: "/community",  label: "Community" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname  = usePathname();
  const router    = useRouter();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [userOpen,  setUserOpen]  = useState(false);

  const isDash  = ["/dashboard", "/trips", "/plan", "/profile", "/memories", "/community"].some(p => pathname.startsWith(p));
  const links   = user && isDash ? DASH_LINKS : NAV_LINKS;
  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[var(--border)]">
      <nav
        className="container"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "76px" }}
      >
        {/* Logo */}
        <Link href={user ? "/dashboard" : "/"} style={{ textDecoration: "none", display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span style={{ fontSize: "18px", fontWeight: 800, color: "var(--navy)", letterSpacing: "-0.01em" }}>
            भारत परिक्रमा
          </span>
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>
            BHARAT PARIKRAMA
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "32px" }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`nav-link${isActive(href) ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "12px" }}>
          {user ? (
            <>
              <button
                className="btn btn-primary"
                style={{ height: "40px", padding: "0 20px", fontSize: "14px" }}
                onClick={() => router.push("/plan")}
              >
                <Plus size={15} /> Plan Trip
              </button>
              <button
                style={{ position: "relative", width: "36px", height: "36px", borderRadius: "50%", border: "none", background: "#F0F4FA", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}
              >
                <Bell size={16} />
                <span style={{ position: "absolute", top: "6px", right: "6px", width: "7px", height: "7px", borderRadius: "50%", background: "var(--gold)" }} />
              </button>
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserOpen(!userOpen)}
                  style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", border: "none", background: "none", padding: "4px" }}
                >
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} style={{ width: "34px", height: "34px", borderRadius: "50%", objectFit: "cover" }} />
                    : <div style={{ width: "34px", height: "34px", borderRadius: "50%", background: "var(--blue)", color: "#fff", fontWeight: 700, fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>{user.name[0]}</div>
                  }
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--navy)" }}>{user.name.split(" ")[0]}</span>
                </button>
                {userOpen && (
                  <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: "220px", background: "#fff", border: "1px solid var(--border)", borderRadius: "12px", boxShadow: "var(--shadow)", overflow: "hidden", zIndex: 100 }}>
                    <div style={{ padding: "16px", borderBottom: "1px solid var(--border)" }}>
                      <p style={{ fontWeight: 600, fontSize: "14px", color: "var(--navy)" }}>{user.name}</p>
                      <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{user.email}</p>
                    </div>
                    <div style={{ padding: "8px" }}>
                      {[
                        { icon: User, label: "Profile", action: "/profile" },
                        { icon: Map, label: "My Trips", action: "/trips" },
                        { icon: Settings, label: "Settings", action: "/profile?tab=settings" },
                      ].map(({ icon: Icon, label, action }) => (
                        <button key={label} onClick={() => { router.push(action); setUserOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", border: "none", background: "none", cursor: "pointer", fontSize: "14px", color: "var(--navy)", textAlign: "left" }}>
                          <Icon size={14} /> {label}
                        </button>
                      ))}
                      <hr style={{ margin: "6px 0", border: "none", borderTop: "1px solid var(--border)" }} />
                      <button onClick={() => { logout(); router.push("/"); setUserOpen(false); }} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "8px", border: "none", background: "none", cursor: "pointer", fontSize: "14px", color: "#DC2626", textAlign: "left" }}>
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" style={{ fontSize: "14px", fontWeight: 500, color: "var(--text-secondary)", textDecoration: "none", padding: "8px" }}>Login</Link>
              <Link href="/signup" className="btn btn-primary" style={{ height: "42px", padding: "0 22px", fontSize: "14px" }}>
                Plan Your Parikrama →
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ border: "none", background: "none", cursor: "pointer", padding: "8px", color: "var(--navy)" }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden" style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: "24px 20px", display: "flex", flexDirection: "column", gap: "4px" }}>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ padding: "13px 0", fontSize: "16px", fontWeight: 500, color: isActive(href) ? "var(--blue)" : "var(--navy)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}
            >
              {label}
            </Link>
          ))}
          <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {user ? (
              <button onClick={() => { router.push("/plan"); setMenuOpen(false); }} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                + Plan New Trip
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="btn btn-secondary" style={{ width: "100%", justifyContent: "center" }}>Login</Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)} className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Plan Your Parikrama →</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
