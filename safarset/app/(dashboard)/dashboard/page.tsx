"use client";
import { useAuth } from "@/lib/auth/AuthContext";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button } from "@/components/ui/index";
import IndiaMapSVG from "@/components/maps/IndiaMapSVG";
import Link from "next/link";
import { Plus, Calendar, MapPin, Wallet, Sparkles, Compass, History, ExternalLink, ArrowRight } from "lucide-react";
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

    // Filter trips
    const nowStr = new Date().toISOString().split("T")[0];
    const upcoming = trips.find(t => t.startDate > nowStr);
    const active = trips.find(t => t.startDate <= nowStr && t.endDate >= nowStr);
    const completed = trips.filter(t => t.endDate < nowStr);

    setUpcomingTrip(upcoming || null);
    setCurrentTrip(active || null);
    setRecentTrips(completed);
  }, [trips]);

  // Determine cities to display on India Map
  const mapCities = upcomingTrip 
    ? [upcomingTrip.from, ...upcomingTrip.stops.map(s => s.city)] 
    : currentTrip 
      ? [currentTrip.from, ...currentTrip.stops.map(s => s.city)] 
      : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1C1C1E] tracking-tight">
            {greeting}, {user?.name.split(" ")[0]}!
          </h1>
          <p className="text-[#6B7280] text-sm mt-1">
            Ready to explore? Plan your next business trip, devotional yatra or family holiday.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/plan">
            <Button variant="primary" size="md" className="shadow-sm">
              <Plus size={16} /> Plan New Trip
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: Map & Upcoming Trip info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: India Map SVG */}
        <div className="lg:col-span-5 flex flex-col">
          <Card className="p-6 flex-1 flex flex-col justify-between min-h-[350px]">
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
                <Compass size={18} className="text-[#E85D26]" /> Your Travel Map
              </h2>
              <p className="text-xs text-[#6B7280] mt-1">
                Showing routes of your ongoing or next planned trip.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center p-4">
              <IndiaMapSVG highlightedCities={mapCities.length > 0 ? mapCities : ["Mumbai"]} className="max-h-[280px]" />
            </div>
          </Card>
        </div>

        {/* Right Side: Trips Hub */}
        <div className="lg:col-span-7 space-y-6">
          {/* Ongoing/Current Trip Banner */}
          {currentTrip && (
            <Card className="border-l-4 border-emerald-500 p-5 bg-emerald-50/20">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                    Happening Now
                  </span>
                  <h3 className="text-xl font-bold text-[#1C1C1E] mt-2">{currentTrip.name}</h3>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
                    <Calendar size={14} /> {currentTrip.startDate} to {currentTrip.endDate} ({currentTrip.duration})
                  </p>
                </div>
                <Link href={`/trips/${currentTrip.id}/overview`}>
                  <Button variant="outline" size="sm">
                    Enter Workspace <ArrowRight size={14} />
                  </Button>
                </Link>
              </div>
            </Card>
          )}

          {/* Upcoming Trip Card */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-[#1C1C1E] mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-[#E85D26]" /> Next Adventure
            </h3>

            {upcomingTrip ? (
              <div className="flex flex-col md:flex-row gap-6">
                {upcomingTrip.coverImage && (
                  <div className="w-full md:w-1/3 aspect-[4/3] rounded-xl overflow-hidden relative">
                    <img src={upcomingTrip.coverImage} alt={upcomingTrip.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                        {upcomingTrip.purpose}
                      </span>
                      <span className="text-xs text-[#6B7280]">
                        Budget: {upcomingTrip.budgetTier}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold text-[#1C1C1E]">{upcomingTrip.name}</h4>
                    <p className="text-sm text-[#6B7280] flex items-center gap-1.5">
                      <MapPin size={14} /> {upcomingTrip.from} → {upcomingTrip.stops.map(s=>s.city).join(" → ")}
                    </p>
                    <p className="text-sm text-[#6B7280] flex items-center gap-1.5">
                      <Calendar size={14} /> {upcomingTrip.startDate} to {upcomingTrip.endDate}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#E5E0D8] flex justify-between items-center mt-4">
                    <p className="text-xs text-[#6B7280]">
                      {upcomingTrip.meetings.length} Meetings Scheduled
                    </p>
                    <Link href={`/trips/${upcomingTrip.id}/overview`}>
                      <Button variant="primary" size="sm">
                        Open Workspace <ExternalLink size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <p className="text-[#6B7280] text-sm">No upcoming trips planned yet.</p>
                <Link href="/plan">
                  <Button variant="outline" size="sm">
                    + Create a Smart Itinerary
                  </Button>
                </Link>
              </div>
            )}
          </Card>

          {/* Quick Actions Panel */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link href="/plan" className="block">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 text-center space-y-2">
                <div className="w-10 h-10 bg-orange-100 text-[#E85D26] rounded-xl flex items-center justify-center mx-auto">
                  <Plus size={20} />
                </div>
                <p className="text-xs font-semibold text-[#1C1C1E]">Plan Trip</p>
              </Card>
            </Link>
            <Link href="/trips" className="block">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 text-center space-y-2">
                <div className="w-10 h-10 bg-blue-100 text-[#1A3A5C] rounded-xl flex items-center justify-center mx-auto">
                  <Compass size={20} />
                </div>
                <p className="text-xs font-semibold text-[#1C1C1E]">My Trips</p>
              </Card>
            </Link>
            <Link href="/explore" className="block">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 text-center space-y-2">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mx-auto">
                  <MapPin size={20} />
                </div>
                <p className="text-xs font-semibold text-[#1C1C1E]">Explore India</p>
              </Card>
            </Link>
            <button onClick={() => {
              const chatbotBtn = document.querySelector('.ai-fab') as HTMLButtonElement;
              if (chatbotBtn) chatbotBtn.click();
            }} className="w-full">
              <Card className="p-4 hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5 text-center space-y-2">
                <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mx-auto">
                  <Sparkles size={20} />
                </div>
                <p className="text-xs font-semibold text-[#1C1C1E]">Ask Safar AI</p>
              </Card>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Destinations / Save Section & Recent Trips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recommended Destinations */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
            <Compass size={18} className="text-[#E85D26]" /> Recommended for You
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1587295656906-b09049e6f74d?w=400&q=80" alt="Udaipur" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                <p className="text-white text-xs font-bold">Udaipur, Rajasthan</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
              <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80" alt="Kerala" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-3">
                <p className="text-white text-xs font-bold">Kerala Backwaters</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Trips History */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
            <History size={18} className="text-[#E85D26]" /> Recent Safars
          </h3>
          {recentTrips.length > 0 ? (
            <div className="space-y-3">
              {recentTrips.map(t => (
                <div key={t.id} className="flex justify-between items-center border-b border-[#E5E0D8] pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-semibold text-sm text-[#1C1C1E]">{t.name}</h4>
                    <p className="text-xs text-[#6B7280]">{t.startDate} to {t.endDate}</p>
                  </div>
                  <Link href={`/trips/${t.id}/overview`}>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-[#6B7280]">No completed trips in database history.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
