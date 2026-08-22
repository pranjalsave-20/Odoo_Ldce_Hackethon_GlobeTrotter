"use client";
import React, { useEffect, useState, use } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button } from "@/components/ui/index";
import { useToast } from "@/components/ui/Toast";
import { Clock, MapPin, Sparkles, Check, RefreshCw, Plus, Bell, Briefcase, Compass, FileDown } from "lucide-react";
import type { Trip, ItineraryDay, Activity } from "@/lib/types";
import { generateTripPDF } from "@/lib/services/pdfGenerator";

export default function TripItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getTrip, updateItinerary } = useTrips();
  const { addToast } = useToast();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [rescheduling, setRescheduling] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  useEffect(() => {
    const t = getTrip(resolvedParams.id);
    if (t) setTrip(t);
  }, [resolvedParams.id, getTrip]);

  if (!trip) return null;

  const currentItineraryDay = trip.itinerary.find(d => d.day === selectedDay) || trip.itinerary[0];

  const handleReschedule = async () => {
    setRescheduling(true);
    addToast("success", "Safar AI analyzing your schedule for optimal free-time & buffer...");
    await new Promise((r) => setTimeout(r, 1200));
    
    const updated = trip.itinerary.map(day => {
      if (day.day === selectedDay) {
        return {
          ...day,
          activities: day.activities.map(act => {
            if (act.type === "free-time") {
              return { ...act, name: "Sabarmati Riverfront Walk (AI Rescheduled)", time: "11:30", duration: "1 hr" };
            }
            if (act.type === "meeting") {
              return { ...act, time: "16:00" }; // Shifted to 4 PM
            }
            return act;
          })
        };
      }
      return day;
    });

    updateItinerary(trip.id, updated);
    setTrip(t => t ? { ...t, itinerary: updated } : null);
    setRescheduling(false);
    addToast("success", "Schedule updated! Free time expanded and meeting set for 4:00 PM.");
  };

  const getActivityBadgeColor = (category: string) => {
    switch (category) {
      case "food": return "bg-amber-100 text-amber-800 border-amber-200";
      case "nature": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "historical": return "bg-purple-100 text-purple-800 border-purple-200";
      case "travel": return "bg-blue-100 text-blue-800 border-blue-200";
      case "meeting": return "bg-indigo-100 text-indigo-800 border-indigo-200 font-bold";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Controls Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {trip.itinerary.map(day => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedDay === day.day
                  ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Day {day.day} – {day.date}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={handleReschedule} loading={rescheduling}>
            <RefreshCw size={14} className={rescheduling ? "animate-spin" : ""} /> AI Reschedule
          </Button>
          <Button variant="primary" size="sm" onClick={() => generateTripPDF(trip)}>
            <FileDown size={14} /> PDF Routine Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Timeline Routine */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Day {selectedDay} Routine — {currentItineraryDay?.city}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Chronological schedule with travel buffer times.</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {currentItineraryDay?.activities.length || 0} Events Scheduled
              </span>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-8">
              {currentItineraryDay?.activities.map((act) => (
                <div key={act.id} className="relative group">
                  {/* Circle Indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-blue-600 group-hover:scale-125 transition-transform shadow-sm" />
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <Clock size={12} /> {act.time}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase border ${getActivityBadgeColor(act.category)}`}>
                          {act.category}
                        </span>
                        {act.duration && (
                          <span className="text-xs text-slate-400 font-semibold">({act.duration})</span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-base">{act.name}</h4>
                      
                      <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <MapPin size={13} className="text-slate-400" /> {act.location}
                      </p>

                      {act.estimatedCost > 0 && (
                        <p className="text-xs font-semibold text-emerald-700">
                          Est. Cost: ₹{act.estimatedCost}
                        </p>
                      )}

                      {act.travelTime && (
                        <p className="text-[11px] font-semibold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md inline-block border border-orange-200/60 mt-1">
                          🚗 Next Transit Buffer: {act.travelTime} ({act.distance})
                        </p>
                      )}
                    </div>

                    {act.image && (
                      <div className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 relative shadow-sm border border-slate-200">
                        <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Trigger Reminders & Free-Time Explorer */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Smart Trigger Reminders System */}
          <Card className="p-5 space-y-4 border-l-4 border-blue-600 bg-gradient-to-br from-blue-50/40 via-white to-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Bell size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">System Trigger Reminders</h3>
                  <p className="text-[11px] text-slate-500">Real-Time Event Triggers</p>
                </div>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remindersEnabled}
                  onChange={e => setRemindersEnabled(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span className="text-xs font-semibold text-slate-600">Active</span>
              </label>
            </div>

            {remindersEnabled ? (
              <div className="space-y-2.5">
                {trip.purpose === "business" && (
                  <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-xs space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-900 flex items-center gap-1">
                        <Briefcase size={12} /> Meeting Trigger Alert
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">In 30 Mins</span>
                    </div>
                    <p className="text-xs text-slate-700">Client Meeting at TechCorp Office scheduled for 2:00 PM.</p>
                    <p className="text-[11px] text-blue-600 font-semibold">📍 Leave by 1:35 PM to accommodate traffic buffer.</p>
                  </div>
                )}

                <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      🏨 Stay Checkout Reminder
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">Tomorrow 11 AM</span>
                  </div>
                  <p className="text-xs text-slate-600">Express check-out requested at hotel front desk.</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Reminders disabled. Toggle active switch to enable triggers.</p>
            )}
          </Card>

          {/* Smart Free-Time Explorer & Tourist Sights */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Compass size={18} className="text-blue-600" />
              <h3 className="text-sm font-black text-slate-900">Free-Time Explorer (Near Venue)</h3>
            </div>
            <p className="text-xs text-slate-500">Top tourist sights & cafes matching your 3-hour free time window:</p>

            <div className="space-y-3">
              {[
                { name: "Sabarmati Ashram", dist: "1.5 km", time: "45 min visit", img: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=300&q=80", tag: "Historical" },
                { name: "Sabarmati Riverfront", dist: "800 m", time: "30 min stroll", img: "https://images.unsplash.com/photo-1548013146-72479768bada?w=300&q=80", tag: "Nature" },
                { name: "Gujarati Thali House", dist: "400 m", time: "40 min lunch", img: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80", tag: "Food" },
              ].map(item => (
                <div key={item.name} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-slate-100/80 transition-colors">
                  <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{item.name}</p>
                    <p className="text-[11px] text-slate-500">{item.dist} away · {item.time}</p>
                  </div>
                  <button
                    onClick={() => addToast("success", `${item.name} added to your free-time routine!`)}
                    className="text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-blue-50"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
