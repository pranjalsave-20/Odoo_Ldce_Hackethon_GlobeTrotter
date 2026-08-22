"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import IndiaMapSimple from "@/components/maps/IndiaMapSimple";
import { POPULAR_DESTINATIONS, MOCK_COMMUNITY } from "@/lib/data/mockData";
import Navbar from "@/components/layout/Navbar";


/* ─── Static page data ──────────────────────────────────── */

const STATS = [
  { value: "28+",  label: "States Covered" },
  { value: "4",    label: "Travel Modes" },
  { value: "100+", label: "Destinations" },
  { value: "AI",   label: "Powered Planning" },
];

const FEATURES = [
  {
    icon: "🗺️",
    title: "Multi-Modal Routing",
    desc: "Plan seamless journeys using flights, trains, roads and maritime routes across India in one intelligent itinerary.",
  },
  {
    icon: "💼",
    title: "Business Travel Mode",
    desc: "Organize professional travel around meetings and available free time. Never miss a client appointment.",
  },
  {
    icon: "₹",
    title: "Smart Budget Planner",
    desc: "Track transportation, accommodation, food and activity expenses with clear visual breakdowns.",
  },
  {
    icon: "📅",
    title: "Smart Itinerary",
    desc: "Create organized day-wise travel plans tailored to your purpose, schedule, and preferences.",
  },
  {
    icon: "📍",
    title: "Explore Nearby",
    desc: "Discover places that fit your available time slots. Make the most of every free hour on the road.",
  },
  {
    icon: "🤖",
    title: "AI Travel Assistant",
    desc: "Get contextual help with your journey. Reschedule, reroute, and adapt plans on the go with Parikrama AI.",
  },
];

const CIRCUITS = [
  {
    name: "Ganga Heritage & Deccan Corridor",
    route: "New Delhi → Varanasi → Prayagraj → Ayodhya → Mumbai",
    duration: "8 Days / 7 Nights",
    price: "₹24,999",
    modes: ["✈ Flight", "🚆 Vande Bharat", "🚗 Private Cab", "⛴ River Cruise"],
    img1: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80",
    img2: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
    tag: "Heritage",
  },
  {
    name: "Rajasthan Royal Circuit",
    route: "Delhi → Jaipur → Jodhpur → Udaipur → Delhi",
    duration: "7 Days / 6 Nights",
    price: "₹19,999",
    modes: ["🚆 Express Train", "🚗 Private Cab", "✈ Return Flight"],
    img1: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
    img2: "https://images.unsplash.com/photo-1587295656906-b09049e6f74d?w=600&q=80",
    tag: "Royal",
  },
  {
    name: "South India Coastal Trail",
    route: "Chennai → Pondicherry → Madurai → Kochi → Goa",
    duration: "10 Days / 9 Nights",
    price: "₹32,999",
    modes: ["✈ Flight", "🚆 Overnight Train", "⛴ Backwater Ferry"],
    img1: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    img2: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    tag: "Coastal",
  },
];

const TESTIMONIALS = [
  {
    quote: "Bharat Parikrama made my multi-city journey so much easier to organize. The AI itinerary was spot on.",
    name: "Priya Sharma",
    city: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80",
  },
  {
    quote: "The business travel mode is exactly what I needed. It blocked my meeting times and planned everything around them.",
    name: "Vikram Nair",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
  },
  {
    quote: "Planned our entire Rajasthan trip end-to-end. Clean, professional, and the family loved every moment.",
    name: "Anjali Kapoor",
    city: "Delhi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80",
  },
];

const WHY_ITEMS = [
  "Dynamic Multi-Modal Transit Optimization (Air, Rail, Ferry, Road)",
  "Autonomous Rerouting with Buffer Time Guarantee",
  "Verified Cultural & Heritage Waypoints Across 28 States",
  "Integrated Emergency Assistance & AI Travel Companion",
];

/* ─── Page ──────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#FAFAF8" }}>

      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "80px", paddingBottom: "80px", borderBottom: "1px solid #E4E4DF" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="hero-grid">

            {/* Left: Text */}
            <div>
              <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#C8922A", marginBottom: "20px" }}>
                AI-POWERED INDIA TRAVEL PLANNING
              </span>

              <h1 style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.05, color: "#0F2D52", letterSpacing: "-0.02em", marginBottom: "12px" }}>
                भारत परिक्रमा
              </h1>

              <h2 style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 700, color: "#1E5EAA", marginBottom: "20px", lineHeight: 1.35 }}>
                Pan-India Travel &amp; Itinerary Optimization
              </h2>

              <p style={{ fontSize: "17px", color: "#4A5568", lineHeight: 1.7, marginBottom: "36px", maxWidth: "440px" }}>
                Smarter journeys across India — from Himalayan peaks to coastal shores. Plan multi-modal trips, manage budgets, and get AI-powered recommendations.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  href="/plan"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "48px", padding: "0 28px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, background: "#1E5EAA", color: "#fff", textDecoration: "none", transition: "all 0.18s ease" }}
                >
                  Plan Your Parikrama <ArrowRight size={16} />
                </Link>
                <Link
                  href="/explore"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "48px", padding: "0 24px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, background: "#fff", color: "#0F2D52", border: "1.5px solid #E4E4DF", textDecoration: "none" }}
                >
                  Explore Bharat
                </Link>
              </div>
            </div>

            {/* Right: India Map */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <IndiaMapSimple style={{ maxWidth: "500px", width: "100%" }} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 860px) {
            .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ── 2. STATS BAR ────────────────────────────────────── */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E4E4DF" }}>
        <div className="container" style={{ paddingTop: "28px", paddingBottom: "28px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", textAlign: "center" }} className="stats-grid">
            {STATS.map((s, i) => (
              <div key={s.label} style={{ padding: "0 24px", borderRight: i < STATS.length - 1 ? "1px solid #E4E4DF" : "none" }}>
                <p style={{ fontSize: "30px", fontWeight: 800, color: "#1E5EAA", lineHeight: 1.1 }}>{s.value}</p>
                <p style={{ fontSize: "13px", color: "#718096", marginTop: "4px", fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .stats-grid > div { border-right: none !important; border-bottom: 1px solid #E4E4DF; padding: 16px 0 !important; }
          }
        `}</style>
      </div>

      {/* ── 3. FEATURES ─────────────────────────────────────── */}
      <section style={{ background: "#FAFAF8", paddingTop: "96px", paddingBottom: "96px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C8922A", marginBottom: "12px" }}>What We Offer</span>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 800, color: "#0F2D52", letterSpacing: "-0.01em" }}>Everything You Need for Your Journey</h2>
            <p style={{ fontSize: "17px", color: "#4A5568", marginTop: "12px", maxWidth: "540px", margin: "12px auto 0", lineHeight: 1.7 }}>
              From planning your route to managing your stay, Bharat Parikrama keeps your entire journey organized.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="features-grid">
            {FEATURES.map((f) => (
              <div key={f.title} style={{ background: "#fff", border: "1px solid #E4E4DF", borderRadius: "16px", padding: "28px", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
              >
                <div style={{ width: "44px", height: "44px", background: "#EEF3FA", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "20px" }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#0F2D52", marginBottom: "10px" }}>{f.title}</h3>
                <p style={{ fontSize: "15px", color: "#4A5568", lineHeight: 1.65, marginBottom: "20px" }}>{f.desc}</p>
                <Link href="/plan" style={{ fontSize: "13px", fontWeight: 600, color: "#1E5EAA", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Learn more <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px) { .features-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 4. WHY BHARAT PARIKRAMA (approach) ─────────────── */}
      <section style={{ background: "#fff", paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #E4E4DF" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }} className="approach-grid">
            {/* Left */}
            <div>
              <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C8922A", marginBottom: "16px" }}>Why Us</span>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0F2D52", marginBottom: "16px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                Unified Planning Engine for Pan-India Travel
              </h2>
              <p style={{ fontSize: "16px", color: "#4A5568", lineHeight: 1.7, marginBottom: "32px" }}>
                Bharat Parikrama synthesizes transit data from air corridors, rail networks, and maritime sea lanes into one continuous, adaptive itinerary.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "36px" }}>
                {WHY_ITEMS.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <CheckCircle2 size={18} style={{ color: "#1E5EAA", flexShrink: 0, marginTop: "2px" }} />
                    <span style={{ fontSize: "15px", fontWeight: 500, color: "#0F2D52" }}>{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/signup" style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "48px", padding: "0 28px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, background: "#1E5EAA", color: "#fff", textDecoration: "none" }}>
                Start Planning <ArrowRight size={16} />
              </Link>
            </div>

            {/* Right: live route card */}
            <div style={{ background: "#fff", border: "1px solid #E4E4DF", borderRadius: "20px", padding: "28px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "20px", borderBottom: "1px solid #F0F0EC", marginBottom: "20px" }}>
                <div>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F2D52" }}>AI Route Matrix</p>
                  <p style={{ fontSize: "12px", color: "#718096" }}>Active Monitoring</p>
                </div>
                <span style={{ padding: "4px 12px", borderRadius: "20px", background: "#ECFDF5", border: "1px solid #A7F3D0", fontSize: "12px", fontWeight: 700, color: "#065F46" }}>● Operational</span>
              </div>
              {[
                { icon: "✈️", name: "Flight Leg #BP-402", route: "Delhi (DEL) → Kochi (COK)", status: "On Time", statusColor: "#1E5EAA", statusBg: "#EEF3FA" },
                { icon: "🚢", name: "Maritime Ferry #MF-12", route: "Kochi → Kavaratti (Lakshadweep)", status: "Smooth Sea", statusColor: "#1E5EAA", statusBg: "#EEF3FA" },
                { icon: "🚆", name: "Vande Bharat #VB-208", route: "Varanasi → New Delhi", status: "Reserved", statusColor: "#065F46", statusBg: "#ECFDF5" },
              ].map((leg) => (
                <div key={leg.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px", borderRadius: "10px", background: "#FAFAF8", border: "1px solid #E4E4DF", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ fontSize: "18px" }}>{leg.icon}</span>
                    <div>
                      <p style={{ fontSize: "12px", fontWeight: 700, color: "#0F2D52" }}>{leg.name}</p>
                      <p style={{ fontSize: "11px", color: "#718096" }}>{leg.route}</p>
                    </div>
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: leg.statusColor, background: leg.statusBg, padding: "3px 10px", borderRadius: "5px" }}>{leg.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 860px) { .approach-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 5. CURATED CIRCUITS ──────────────────────────────── */}
      <section style={{ background: "#FAFAF8", paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #E4E4DF" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
            <div>
              <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C8922A", marginBottom: "12px" }}>Ready-Made Plans</span>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0F2D52", letterSpacing: "-0.01em" }}>Curated Bharat Circuits</h2>
              <p style={{ fontSize: "16px", color: "#4A5568", marginTop: "8px", maxWidth: "460px", lineHeight: 1.65 }}>Thoughtfully planned journeys connecting India's culture, cities and experiences.</p>
            </div>
            <Link href="/explore" style={{ fontSize: "14px", fontWeight: 600, color: "#1E5EAA", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              View all circuits <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="circuits-grid">
            {CIRCUITS.map((c) => (
              <div key={c.name} style={{ background: "#fff", border: "1px solid #E4E4DF", borderRadius: "20px", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 28px rgba(0,0,0,0.09)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
              >
                {/* Dual image */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", height: "180px" }}>
                  <img src={c.img1} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <img src={c.img2} alt={c.route} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", borderLeft: "3px solid #FAFAF8" }} />
                </div>

                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#C8922A" }}>{c.tag}</span>
                    <span style={{ fontSize: "12px", color: "#718096" }}>• {c.duration}</span>
                    <span style={{ fontSize: "11px", background: "#EEF3FA", color: "#1E5EAA", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>Instant Itinerary</span>
                  </div>

                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0F2D52", marginBottom: "6px" }}>{c.name}</h3>
                  <p style={{ fontSize: "13px", color: "#4A5568", marginBottom: "20px" }}>{c.route}</p>

                  <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#718096", marginBottom: "8px" }}>Integrated Modes of Transit</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "24px" }}>
                    {c.modes.map(m => (
                      <span key={m} style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 10px", background: "#F0F4FA", border: "1px solid #D0DCF0", borderRadius: "6px", fontSize: "11px", fontWeight: 600, color: "#0F2D52" }}>{m}</span>
                    ))}
                  </div>

                  <hr style={{ border: "none", borderTop: "1px solid #E4E4DF", margin: "0 0 20px" }} />

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "#718096", fontWeight: 500 }}>Starting from</p>
                      <p style={{ fontSize: "22px", fontWeight: 800, color: "#0F2D52", lineHeight: 1.1 }}>{c.price}</p>
                      <p style={{ fontSize: "11px", color: "#718096" }}>/per person</p>
                    </div>
                    <Link href="/plan" style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "40px", padding: "0 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, background: "#1E5EAA", color: "#fff", textDecoration: "none" }}>
                      Explore <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 1000px) { .circuits-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 640px)  { .circuits-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 6. EXPLORE BHARAT ────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #E4E4DF" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C8922A", marginBottom: "12px" }}>Destinations</span>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0F2D52", letterSpacing: "-0.01em" }}>Explore Bharat</h2>
            <p style={{ fontSize: "16px", color: "#4A5568", marginTop: "8px", lineHeight: 1.65 }}>From mountains and heritage cities to coastlines and spiritual destinations.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }} className="dest-grid">
            {POPULAR_DESTINATIONS.map((d) => (
              <Link
                key={d.city}
                href={`/explore?city=${d.city}`}
                style={{ display: "block", aspectRatio: "3/4", position: "relative", borderRadius: "12px", overflow: "hidden", textDecoration: "none" }}
              >
                <img src={d.image} alt={d.city} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.04)")}
                  onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(10,25,50,0.85) 0%, transparent 100%)", padding: "20px 12px 14px" }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>{d.city}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.72)", marginTop: "2px" }}>{d.tag}</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/explore" style={{ display: "inline-flex", alignItems: "center", gap: "6px", height: "44px", padding: "0 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, background: "#fff", color: "#0F2D52", border: "1.5px solid #E4E4DF", textDecoration: "none" }}>
              View all 100+ destinations <ChevronRight size={15} />
            </Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) { .dest-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 580px)  { .dest-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </section>

      {/* ── 7. COMMUNITY TRIPS ───────────────────────────────── */}
      <section style={{ background: "#FAFAF8", paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #E4E4DF" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
            <div>
              <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C8922A", marginBottom: "12px" }}>Community</span>
              <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0F2D52", letterSpacing: "-0.01em" }}>Community Trips</h2>
              <p style={{ fontSize: "16px", color: "#4A5568", marginTop: "8px", lineHeight: 1.65 }}>Browse itineraries shared by fellow travellers.</p>
            </div>
            <Link href="/community" style={{ fontSize: "14px", fontWeight: 600, color: "#1E5EAA", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              See all <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="community-grid">
            {MOCK_COMMUNITY.slice(0, 3).map((t) => (
              <div key={t.id} style={{ background: "#fff", border: "1px solid #E4E4DF", borderRadius: "16px", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.transform = "none"; }}
              >
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <img src={t.coverImage} alt={t.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>

                <div style={{ padding: "20px" }}>
                  <p style={{ fontSize: "11px", color: "#C8922A", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{t.purpose} • {t.duration}</p>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#0F2D52", marginBottom: "6px" }}>{t.title}</h3>
                  <p style={{ fontSize: "13px", color: "#4A5568", marginBottom: "16px" }}>{t.route}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {t.userAvatar
                        ? <img src={t.userAvatar} alt={t.userName} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
                        : <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#1E5EAA", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.userName[0]}</div>
                      }
                      <span style={{ fontSize: "13px", color: "#4A5568", fontWeight: 500 }}>{t.userName}</span>
                    </div>
                    <span style={{ fontSize: "13px", color: "#718096" }}>♡ {t.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px)  { .community-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 580px)  { .community-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 8. TESTIMONIALS ──────────────────────────────────── */}
      <section style={{ background: "#fff", paddingTop: "96px", paddingBottom: "96px", borderTop: "1px solid #E4E4DF" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#C8922A", marginBottom: "12px" }}>Travellers Say</span>
            <h2 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 800, color: "#0F2D52", letterSpacing: "-0.01em" }}>Travellers Love Bharat Parikrama</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} style={{ background: "#FAFAF8", border: "1px solid #E4E4DF", borderRadius: "16px", padding: "28px" }}>
                <div style={{ marginBottom: "16px", fontSize: "16px", color: "#F0B84A" }}>★★★★★</div>
                <p style={{ fontSize: "15px", color: "#4A5568", lineHeight: 1.7, marginBottom: "24px" }}>"{t.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F2D52" }}>{t.name}</p>
                    <p style={{ fontSize: "12px", color: "#718096" }}>{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px)  { .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 580px)  { .testimonials-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 9. CTA ───────────────────────────────────────────── */}
      <section style={{ background: "#0F2D52", paddingTop: "96px", paddingBottom: "96px" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "20px" }}>
            START YOUR JOURNEY
          </span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
            Start Planning Your Parikrama
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", marginBottom: "40px", maxWidth: "440px", margin: "0 auto 40px", lineHeight: 1.7 }}>
            One journey. Multiple destinations. One intelligent travel companion.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/signup"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "50px", padding: "0 32px", borderRadius: "8px", fontSize: "15px", fontWeight: 700, background: "#fff", color: "#0F2D52", textDecoration: "none" }}
            >
              Plan Your Trip <ArrowRight size={16} />
            </Link>
            <Link
              href="/explore"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", height: "50px", padding: "0 28px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", textDecoration: "none" }}
            >
              Explore India
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer style={{ background: "#0A1E38" }}>
        <div className="container" style={{ paddingTop: "64px", paddingBottom: "64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "48px" }} className="footer-grid">

            {/* Brand col */}
            <div>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "18px", fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>भारत परिक्रमा</p>
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "#C8922A" }}>BHARAT PARIKRAMA</p>
              </div>
              <p style={{ fontSize: "14px", color: "#8BA8C8", lineHeight: 1.7, maxWidth: "280px" }}>
                India's AI-powered travel planning platform. Multi-modal journeys, smart itineraries, and seamless experiences across 28 states.
              </p>
            </div>

            {/* Platform */}
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C8D8EC", marginBottom: "20px" }}>Platform</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[{ l: "Plan a Trip", h: "/plan" }, { l: "Explore India", h: "/explore" }, { l: "Community Trips", h: "/community" }, { l: "AI Assistant", h: "/dashboard" }].map(({ l, h }) => (
                  <li key={l} style={{ marginBottom: "4px" }}>
                    <Link href={h} style={{ fontSize: "14px", color: "#8BA8C8", textDecoration: "none", display: "block", padding: "3px 0", transition: "color 0.15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#8BA8C8")}
                    >{l}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Travel */}
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C8D8EC", marginBottom: "20px" }}>Travel</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Hotels", "Transport", "Local Guides", "Emergency Help"].map(l => (
                  <li key={l} style={{ marginBottom: "4px" }}>
                    <Link href="#" style={{ fontSize: "14px", color: "#8BA8C8", textDecoration: "none", display: "block", padding: "3px 0" }}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#C8D8EC", marginBottom: "20px" }}>Support</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {["Contact", "Help Center", "Privacy Policy", "Terms of Service"].map(l => (
                  <li key={l} style={{ marginBottom: "4px" }}>
                    <Link href="#" style={{ fontSize: "14px", color: "#8BA8C8", textDecoration: "none", display: "block", padding: "3px 0" }}>{l}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ marginTop: "56px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
            <p style={{ fontSize: "13px", color: "#5A7A9A" }}>© 2026 Bharat Parikrama. Made for journeys across India.</p>
            <div style={{ display: "flex", gap: "24px" }}>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <Link key={l} href="#" style={{ fontSize: "12px", color: "#5A7A9A", textDecoration: "none" }}>{l}</Link>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; } }
          @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </footer>

    </div>
  );
}
