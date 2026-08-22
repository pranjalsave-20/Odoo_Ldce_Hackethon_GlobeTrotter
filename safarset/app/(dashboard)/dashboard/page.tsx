"use client";
import { useAuth } from "@/lib/auth/AuthContext";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button } from "@/components/ui/index";
import IndiaMapSVG from "@/components/maps/IndiaMapSVG";
import Link from "next/link";
import { Plus, Calendar, MapPin, Sparkles, Compass, History, ExternalLink, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { Trip } from "@/lib/types";

export default function UserDashboard() {
  const { user } = useAuth();
  const { trips } = useTrips();
  const [greeting, setGreeting] = useState("Good Morning");
  const [upcomingTrip, setUpcomingTrip] = useState<Trip | null>(null);
  const [currentTrip, setCurrentTrip] = useState<Trip | null>(null);
  const [recentTrips, setRecentTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const hr = new Date().getHours();
    if (hr >= 12 && hr < 17) setGreeting("Good Afternoon");
    else if (hr >= 17) setGreeting("Good Evening");
    else setGreeting("Good Morning");

    const nowStr = new Date().toISOString().split("T")[0];
    const upcoming = trips.find(t => t.startDate > nowStr);
    const active = trips.find(t => t.startDate <= nowStr && t.endDate >= nowStr);
    const completed = trips.filter(t => t.endDate < nowStr);

    setUpcomingTrip(upcoming || null);
    setCurrentTrip(active || null);
    setRecentTrips(completed);
  }, [trips]);

  const mapCities = upcomingTrip
    ? [upcomingTrip.from, ...upcomingTrip.stops.map(s => s.city)]
    : currentTrip
      ? [currentTrip.from, ...currentTrip.stops.map(s => s.city)]
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{greeting}, {user?.name.split(" ")[0]}!</h1>
          <p className="text-slate-500 text-sm mt-0.5">Ready to explore? Plan your next trip.</p>
        </div>
        <Link href="/plan">
          <Button variant="primary" size="md">
            <Plus size={15} /> Plan New Trip
          </Button>
        </Link>
      </div>

      {/* Ongoing trip banner */}
      {currentTrip && (
        <div className="card p-4 border-l-4 border-green-500 bg-green-50">
          <div className="flex justify-between items-start gap-4">
            <div>
              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full uppercase">Happening Now</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1.5">{currentTrip.name}</h3>
              <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-0.5">
                <Calendar size={13} /> {currentTrip.startDate} – {currentTrip.endDate}
              </p>
            </div>
            <Link href={`/trips/${currentTrip.id}/overview`}>
              <Button variant="outline" size="sm">Enter Workspace <ArrowRight size={13} /></Button>
            </Link>
          </div>
        </div>
      )}

      {/* Main grid */}
      <div className="grid lg:grid-cols-12 gap-6">

        {/* India Map */}
        <div className="lg:col-span-5">
          <Card className="p-5 h-full">
            <div className="flex items-center gap-2 mb-3">
              <Compass size={16} className="text-blue-600" />
              <h2 className="font-semibold text-slate-900 text-sm">Your Travel Map</h2>
            </div>
            <p className="text-xs text-slate-400 mb-4">Showing routes of your next planned trip.</p>
            <div className="flex items-center justify-center">
              <IndiaMapSVG highlightedCities={mapCities.length > 0 ? mapCities : ["Mumbai"]} className="max-h-[260px]" />
            </div>
          </Card>
        </div>

        {/* Right side */}
        <div className="lg:col-span-7 space-y-5">

          {/* Upcoming trip */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={16} className="text-blue-600" />
              <h3 className="font-semibold text-slate-900 text-sm">Next Trip</h3>
            </div>
            {upcomingTrip ? (
              <div className="flex flex-col sm:flex-row gap-4">
                {upcomingTrip.coverImage && (
                  <div className="w-full sm:w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={upcomingTrip.coverImage} alt={upcomingTrip.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full capitalize">{upcomingTrip.purpose}</span>
                    <span className="text-xs text-slate-400">{upcomingTrip.budgetTier}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900">{upcomingTrip.name}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                    <MapPin size={12} /> {upcomingTrip.from} → {upcomingTrip.stops.map(s => s.city).join(" → ")}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Calendar size={12} /> {upcomingTrip.startDate} – {upcomingTrip.endDate}
                  </p>
                  <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-center">
                    <p className="text-xs text-slate-400">{upcomingTrip.meetings.length} meetings scheduled</p>
                    <Link href={`/trips/${upcomingTrip.id}/overview`}>
                      <Button variant="primary" size="sm">Open Workspace <ExternalLink size={12} /></Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400 text-sm mb-3">No upcoming trips planned yet.</p>
                <Link href="/plan"><Button variant="outline" size="sm">+ Create Itinerary</Button></Link>
              </div>
            )}
          </Card>

          {/* Quick actions */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { href: "/plan", label: "Plan Trip", icon: "➕", bg: "bg-blue-50 text-blue-600" },
              { href: "/trips", label: "My Trips", icon: "🗺️", bg: "bg-slate-50 text-slate-600" },
              { href: "/explore", label: "Explore", icon: "📍", bg: "bg-green-50 text-green-600" },
              { href: "#", label: "Ask AI", icon: "✨", bg: "bg-purple-50 text-purple-600" },
            ].map(a => (
              <Link key={a.label} href={a.href}>
                <Card className="p-3 text-center hover:shadow transition-shadow cursor-pointer">
                  <div className={`w-9 h-9 ${a.bg} rounded-lg flex items-center justify-center mx-auto text-lg mb-1.5`}>{a.icon}</div>
                  <p className="text-xs font-medium text-slate-700">{a.label}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Recommended */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Compass size={16} className="text-blue-600" />
            <h3 className="font-semibold text-slate-900 text-sm">Recommended for You</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { img: "https://images.unsplash.com/photo-1587295656906-b09049e6f74d?w=400&q=80", label: "Udaipur, Rajasthan" },
              { img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", label: "Kerala Backwaters" },
            ].map(d => (
              <div key={d.label} className="relative rounded-lg overflow-hidden aspect-[4/3]">
                <img src={d.img} alt={d.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/45 flex items-end p-2.5">
                  <p className="text-white text-xs font-semibold">{d.label}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent trips */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <History size={16} className="text-blue-600" />
            <h3 className="font-semibold text-slate-900 text-sm">Recent Trips</h3>
          </div>
          {recentTrips.length > 0 ? (
            <div className="space-y-3">
              {recentTrips.map(t => (
                <div key={t.id} className="flex justify-between items-center pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium text-sm text-slate-900">{t.name}</h4>
                    <p className="text-xs text-slate-400">{t.startDate} – {t.endDate}</p>
                  </div>
                  <Link href={`/trips/${t.id}/overview`}>
                    <Button variant="outline" size="sm">View</Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-6">No completed trips yet.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
