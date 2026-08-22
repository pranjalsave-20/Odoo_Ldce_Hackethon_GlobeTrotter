"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import IndiaMapSimple from "@/components/maps/IndiaMapSimple";
import { POPULAR_DESTINATIONS, MOCK_COMMUNITY } from "@/lib/data/mockData";

/* ─── Data ─────────────────────────────────────────────── */

const STATS = [
  { value: "28+",  label: "States Covered" },
  { value: "4",    label: "Travel Modes" },
  { value: "100+", label: "Destinations" },
  { value: "AI",   label: "Smart Planning" },
];

const FEATURES = [
  {
    icon: "🗺️",
    title: "Multi-Modal Routing",
    desc: "Plan journeys using flights, trains, roads and maritime routes across India in one intelligent itinerary.",
  },
  {
    icon: "💼",
    title: "Business Travel Mode",
    desc: "Organize professional travel around meetings and available free time. Never miss a client appointment.",
  },
  {
    icon: "₹",
    title: "Smart Budget Planner",
    desc: "Track transportation, accommodation, food and activity expenses with clear visual dashboards.",
  },
  {
    icon: "📅",
    title: "Smart Itinerary",
    desc: "Create organized day-wise travel plans tailored to your purpose, schedule, and preferences.",
  },
  {
    icon: "📍",
    title: "Explore Nearby",
    desc: "Discover places that fit your available time slots. Make the most of every free hour.",
  },
  {
    icon: "🤖",
    title: "AI Travel Assistant",
    desc: "Get contextual help with your journey. Reschedule, reroute, and adapt plans on the go.",
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
    rating: 5,
  },
  {
    quote: "The business travel mode is exactly what I needed. It blocked my meeting times and planned everything around them.",
    name: "Vikram Nair",
    city: "Bengaluru",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80",
    rating: 5,
  },
  {
    quote: "Planned our entire Rajasthan trip end-to-end. The PDF report was professional enough to share with family.",
    name: "Anjali Kapoor",
    city: "Delhi",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80",
    rating: 5,
  },
];

/* ─── Page ──────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section style={{ background: "#FAFAF8", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="container">
          {/* Two-column layout: 43% text / 57% map */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "43% 57%",
            gap: "56px",
            alignItems: "center",
          }}
            className="hero-grid"
          >
            {/* Left: Text */}
            <div>
              <span className="eyebrow">AI-POWERED INDIA TRAVEL PLANNING</span>

              <h1 className="heading-xl" style={{ marginBottom: "16px" }}>
                BHARAT<br />
                <span style={{ color: "var(--blue)" }}>PARIKRAMA</span>
              </h1>

              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "var(--navy)", marginBottom: "16px", lineHeight: 1.4 }}>
                Pan-India Travel &amp; Itinerary Optimization
              </h2>

              <p className="body-lg" style={{ marginBottom: "36px", maxWidth: "440px" }}>
                Smarter journeys. Seamless experiences. Adaptive travel plans across India — from Himalayan peaks to coastal shores.
              </p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/plan" className="btn btn-primary">
                  Plan Your Parikrama <ArrowRight size={16} />
                </Link>
                <Link href="/about" className="btn btn-secondary">
                  Explore How It Works
                </Link>
              </div>
            </div>

            {/* Right: India Map */}
            <div>
              <IndiaMapSimple className="w-full" style={{ maxWidth: "520px", display: "block", margin: "0 auto" }} />
            </div>
          </div>
        </div>

        {/* Responsive hero styles */}
        <style>{`
          @media (max-width: 900px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}</style>
      </section>

      {/* ── 2. STATS BAR ────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="container" style={{ paddingTop: "32px", paddingBottom: "32px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            textAlign: "center",
          }}
            className="stats-grid"
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "0 24px",
                  borderRight: i < STATS.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <p style={{ fontSize: "32px", fontWeight: 800, color: "var(--blue)", lineHeight: 1.1 }}>{s.value}</p>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px", fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 600px) {
            .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .stats-grid > div { border-right: none !important; border-bottom: 1px solid var(--border); padding: 16px 0 !important; }
          }
        `}</style>
      </div>

      {/* ── 3. FEATURES ─────────────────────────────────────── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          {/* Section heading */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <span className="section-label">What We Offer</span>
            <h2 className="heading-lg">Everything You Need for Your Journey</h2>
            <p className="body-lg" style={{ marginTop: "12px", maxWidth: "560px", margin: "12px auto 0" }}>
              From planning your route to managing your stay, Bharat Parikrama keeps your entire journey organized.
            </p>
          </div>

          {/* 3-column feature grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px",
          }}
            className="features-grid"
          >
            {FEATURES.map((f) => (
              <div key={f.title} className="card" style={{ padding: "28px" }}>
                <div style={{
                  width: "44px", height: "44px",
                  background: "#EEF3FA",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "20px",
                  marginBottom: "20px",
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--navy)", marginBottom: "10px" }}>{f.title}</h3>
                <p className="body-md" style={{ marginBottom: "20px" }}>{f.desc}</p>
                <Link href="/plan" style={{ fontSize: "13px", fontWeight: 600, color: "var(--blue)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Learn more <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) { .features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 580px) { .features-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── 4. CURATED CIRCUITS ──────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "48px" }}>
            <div>
              <span className="section-label">Ready-Made Plans</span>
              <h2 className="heading-lg">Curated Bharat Circuits</h2>
              <p className="body-lg" style={{ marginTop: "8px", maxWidth: "480px" }}>
                Thoughtfully planned journeys connecting India's culture, cities and experiences.
              </p>
            </div>
            <Link href="/explore" style={{ fontSize: "14px", fontWeight: 600, color: "var(--blue)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              View all circuits <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="circuits-grid">
            {CIRCUITS.map((c) => (
              <div key={c.name} className="journey-card">
                {/* Dual image */}
                <div className="journey-card-images">
                  <img src={c.img1} alt={c.name} />
                  <img src={c.img2} alt={c.route} style={{ borderLeft: "4px solid var(--bg)" }} />
                </div>

                {/* Card body */}
                <div style={{ padding: "24px" }}>
                  {/* Meta */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--gold)" }}>{c.tag}</span>
                    <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>• {c.duration}</span>
                    <span style={{ fontSize: "11px", background: "#EEF5FF", color: "var(--blue)", padding: "2px 8px", borderRadius: "4px", fontWeight: 600 }}>Instant Itinerary</span>
                  </div>

                  {/* Title + Route */}
                  <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--navy)", marginBottom: "6px" }}>{c.name}</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "24px" }}>{c.route}</p>

                  {/* Transport modes */}
                  <div style={{ marginBottom: "8px" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "10px" }}>Integrated Modes of Transit</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {c.modes.map(m => (
                        <span key={m} className="transport-badge">{m}</span>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <hr className="divider" style={{ margin: "24px 0" }} />

                  {/* Price + CTA */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: 500 }}>Starting from</p>
                      <p style={{ fontSize: "24px", fontWeight: 800, color: "var(--navy)" }}>{c.price}</p>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>/per person</p>
                    </div>
                    <Link href="/plan" className="btn btn-primary" style={{ height: "42px", padding: "0 20px", fontSize: "14px" }}>
                      Explore Circuit →
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

      {/* ── 5. EXPLORE BHARAT ────────────────────────────────── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label">Destinations</span>
            <h2 className="heading-lg">Explore Bharat</h2>
            <p className="body-lg" style={{ marginTop: "8px" }}>
              From mountains and heritage cities to coastlines and spiritual destinations.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }} className="dest-grid">
            {POPULAR_DESTINATIONS.map((d) => (
              <Link
                key={d.city}
                href={`/explore?city=${d.city}`}
                className="image-card"
                style={{ aspectRatio: "3/4", display: "block" }}
              >
                <img src={d.image} alt={d.city} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div className="image-card-overlay">
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{d.city}</p>
                  <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)", marginTop: "2px" }}>{d.tag}</p>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/explore" className="btn btn-secondary">
              View all 100+ destinations <ChevronRight size={15} />
            </Link>
          </div>
        </div>
        <style>{`
          @media (max-width: 1024px) { .dest-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 580px)  { .dest-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        `}</style>
      </section>

      {/* ── 6. COMMUNITY TRIPS ───────────────────────────────── */}
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "40px" }}>
            <div>
              <span className="section-label">Community</span>
              <h2 className="heading-lg">Community Trips</h2>
              <p className="body-lg" style={{ marginTop: "8px" }}>Browse itineraries shared by fellow travellers.</p>
            </div>
            <Link href="/community" style={{ fontSize: "14px", fontWeight: 600, color: "var(--blue)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap" }}>
              See all <ChevronRight size={16} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="community-grid">
            {MOCK_COMMUNITY.slice(0, 3).map((t) => (
              <div key={t.id} className="card" style={{ overflow: "hidden" }}>
                {/* 16:9 image */}
                <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                  <img
                    src={t.coverImage}
                    alt={t.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease", display: "block" }}
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>

                <div style={{ padding: "20px" }}>
                  <p style={{ fontSize: "11px", color: "var(--gold)", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "8px" }}>{t.purpose} • {t.duration}</p>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: "var(--navy)", marginBottom: "6px" }}>{t.title}</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>{t.route}</p>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {t.userAvatar
                        ? <img src={t.userAvatar} alt={t.userName} style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
                        : <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--blue)", color: "#fff", fontSize: "12px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{t.userName[0]}</div>
                      }
                      <span style={{ fontSize: "13px", color: "var(--text-secondary)", fontWeight: 500 }}>{t.userName}</span>
                    </div>
                    <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>♡ {t.likes}</span>
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

      {/* ── 7. TESTIMONIALS ──────────────────────────────────── */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <span className="section-label">Travellers Say</span>
            <h2 className="heading-lg">Travellers Love Bharat Parikrama</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }} className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                {/* Stars */}
                <div style={{ marginBottom: "16px", fontSize: "16px", color: "#F0B84A" }}>
                  {"★".repeat(t.rating)}
                </div>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "24px" }}>
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={t.avatar} alt={t.name} style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>{t.name}</p>
                    <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{t.city}</p>
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

      {/* ── 8. CTA ───────────────────────────────────────────── */}
      <section className="cta-section" style={{ padding: "96px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "20px" }}>
            START YOUR JOURNEY
          </span>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#fff", marginBottom: "16px", lineHeight: 1.2 }}>
            Start Planning Your Parikrama
          </h2>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.75)", marginBottom: "40px", maxWidth: "480px", margin: "0 auto 40px" }}>
            One journey. Multiple destinations. One intelligent travel companion.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/signup" className="btn" style={{ background: "#fff", color: "var(--navy)", fontWeight: 700 }}>
              Plan Your Trip <ArrowRight size={16} />
            </Link>
            <Link href="/explore" className="btn" style={{ background: "rgba(255,255,255,0.12)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.3)" }}>
              Explore India
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
