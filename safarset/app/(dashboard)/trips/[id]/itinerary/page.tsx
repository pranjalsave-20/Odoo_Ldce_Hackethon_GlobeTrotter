"use client";
import React, { useEffect, useState, use } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button, Input, Select } from "@/components/ui/index";
import { useToast } from "@/components/ui/Toast";
import { 
  Clock, MapPin, Sparkles, Check, RefreshCw, Plus, Bell, Briefcase, 
  Compass, FileDown, Trash2, Edit3, Navigation, ArrowRight, ShieldCheck, Star
} from "lucide-react";
import type { Trip, ItineraryDay, Activity, Place } from "@/lib/types";
import { generateTripPDF } from "@/lib/services/pdfGenerator";
import { MOCK_PLACES, MOCK_RESTAURANTS } from "@/lib/data/mockData";

export default function TripItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getTrip, updateItinerary } = useTrips();
  const { addToast } = useToast();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [rescheduling, setRescheduling] = useState(false);
  const [remindersEnabled, setRemindersEnabled] = useState(true);

  // New Event Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventTime, setNewEventTime] = useState("15:00");
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventCategory, setNewEventCategory] = useState<any>("activity");

  useEffect(() => {
    const t = getTrip(resolvedParams.id);
    if (t) setTrip(t);
  }, [resolvedParams.id, getTrip]);

  if (!trip) return null;

  const currentItineraryDay = trip.itinerary.find(d => d.day === selectedDay) || trip.itinerary[0];

  // AI Smart Reschedule
  const handleReschedule = async () => {
    setRescheduling(true);
    addToast("success", "Safar AI re-optimizing your schedule for maximum free-time buffer...");
    await new Promise((r) => setTimeout(r, 1000));
    
    const updated = trip.itinerary.map(day => {
      if (day.day === selectedDay) {
        return {
          ...day,
          activities: day.activities.map(act => {
            if (act.type === "free-time") {
              return { ...act, name: "Sabarmati Heritage Walk (AI Optimized)", time: "11:30", duration: "1.5 hrs" };
            }
            if (act.type === "meeting") {
              return { ...act, time: "15:30" };
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
    addToast("success", "Schedule optimized! Free-time slot expanded with buffer.");
  };

  // Add custom activity
  const handleAddActivity = () => {
    if (!newEventName) return;
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      name: newEventName,
      time: newEventTime,
      duration: "1 hr",
      location: newEventLocation || currentItineraryDay.city,
      city: currentItineraryDay.city,
      estimatedCost: 200,
      category: newEventCategory,
      type: "activity",
      image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=300&q=80"
    };

    const updated = trip.itinerary.map(day => {
      if (day.day === selectedDay) {
        return {
          ...day,
          activities: [...day.activities, newAct].sort((a, b) => a.time.localeCompare(b.time))
        };
      }
      return day;
    });

    updateItinerary(trip.id, updated);
    setTrip(t => t ? { ...t, itinerary: updated } : null);
    setShowAddModal(false);
    setNewEventName("");
    addToast("success", "New event added to your routine!");
  };

  // Remove Activity
  const handleDeleteActivity = (actId: string) => {
    const updated = trip.itinerary.map(day => {
      if (day.day === selectedDay) {
        return {
          ...day,
          activities: day.activities.filter(a => a.id !== actId)
        };
      }
      return day;
    });

    updateItinerary(trip.id, updated);
    setTrip(t => t ? { ...t, itinerary: updated } : null);
    addToast("success", "Event removed from routine.");
  };

  // Add nearby place to day
  const handleAddPlace = (place: Place) => {
    const newAct: Activity = {
      id: `place-${Date.now()}`,
      name: place.name,
      time: "16:30",
      duration: place.duration,
      location: place.city,
      city: place.city,
      estimatedCost: place.estimatedCost,
      category: place.category,
      type: "activity",
      image: place.image
    };

    const updated = trip.itinerary.map(day => {
      if (day.day === selectedDay) {
        return {
          ...day,
          activities: [...day.activities, newAct].sort((a, b) => a.time.localeCompare(b.time))
        };
      }
      return day;
    });

    updateItinerary(trip.id, updated);
    setTrip(t => t ? { ...t, itinerary: updated } : null);
    addToast("success", `${place.name} added to Day ${selectedDay}!`);
  };

  const getActivityBadgeColor = (category: string) => {
    switch (category) {
      case "food": return "bg-amber-50 text-amber-800 border-amber-200";
      case "nature": return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "historical": return "bg-purple-50 text-purple-800 border-purple-200";
      case "travel": return "bg-blue-50 text-blue-800 border-blue-200";
      case "meeting": return "bg-blue-600 text-white border-blue-600 font-black";
      default: return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* ── Top Bar: Day Tabs & Actions ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {trip.itinerary.map(day => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedDay === day.day
                  ? "bg-blue-700 border-blue-700 text-white shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Day {day.day} – {day.date}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setShowAddModal(true)}>
            <Plus size={14} /> Add Event
          </Button>
          <Button variant="outline" size="sm" onClick={handleReschedule} loading={rescheduling}>
            <RefreshCw size={14} className={rescheduling ? "animate-spin" : ""} /> AI Reschedule
          </Button>
          <Button variant="primary" size="sm" onClick={() => generateTripPDF(trip)}>
            <FileDown size={14} /> Download PDF Itinerary
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ── Left Column: Real-Time Day Timeline ──────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Day {selectedDay} Routine — {currentItineraryDay?.city}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Chronological itinerary with route buffers & commitments.</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                {currentItineraryDay?.activities.length || 0} Events Scheduled
              </span>
            </div>

            {/* Timeline Activities */}
            <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-6">
              {currentItineraryDay?.activities.map((act) => (
                <div key={act.id} className="relative group bg-slate-50/70 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/80 transition-all">
                  
                  {/* Circle Indicator */}
                  <div className={`absolute -left-[32px] top-4 w-4 h-4 rounded-full border-2 bg-white ${
                    act.type === "meeting" ? "border-blue-700 bg-blue-600" : "border-blue-600"
                  } shadow-xs`} />
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-between items-start">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black text-blue-700 flex items-center gap-1 bg-white px-2 py-0.5 rounded border border-blue-200">
                          <Clock size={12} /> {act.time}
                        </span>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase border ${getActivityBadgeColor(act.category)}`}>
                          {act.category}
                        </span>
                        {act.duration && (
                          <span className="text-xs text-slate-400 font-medium">({act.duration})</span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm sm:text-base">{act.name}</h4>
                      
                      <p className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <MapPin size={13} className="text-slate-400" /> {act.location}
                      </p>

                      {act.estimatedCost > 0 && (
                        <p className="text-xs font-semibold text-emerald-700">
                          Est. Expense: ₹{act.estimatedCost}
                        </p>
                      )}

                      {act.travelTime && (
                        <p className="text-[11px] font-semibold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-md inline-block border border-orange-200/60 mt-1">
                          🚗 Transit Buffer to Next Venue: {act.travelTime} ({act.distance})
                        </p>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-end gap-2">
                      {act.image && (
                        <div className="w-20 h-14 rounded-xl overflow-hidden flex-shrink-0 relative border border-slate-200">
                          <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <button 
                        onClick={() => handleDeleteActivity(act.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        title="Remove event"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </Card>
        </div>

        {/* ── Right Column: Reminders & Free Time Explorer ─────────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Smart Trigger Reminders Box */}
          <Card className="p-5 space-y-4 border-l-4 border-blue-700 bg-gradient-to-br from-blue-50/40 via-white to-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Bell size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">System Trigger Reminders</h3>
                  <p className="text-[11px] text-slate-500">Live Commitments & Alerts</p>
                </div>
              </div>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remindersEnabled}
                  onChange={e => setRemindersEnabled(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600"
                />
                <span className="text-xs font-bold text-slate-600">Active</span>
              </label>
            </div>

            {remindersEnabled ? (
              <div className="space-y-2.5">
                {trip.purpose === "business" && (
                  <div className="p-3 bg-white rounded-xl border border-blue-200 shadow-xs space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-900 flex items-center gap-1">
                        <Briefcase size={13} /> Meeting Alert Trigger
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">In 30 Mins</span>
                    </div>
                    <p className="text-xs text-slate-700">Client Meeting at TechCorp Venue scheduled for 2:00 PM.</p>
                    <p className="text-[11px] text-blue-700 font-bold">📍 Leave by 1:35 PM to avoid traffic delays.</p>
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
              <p className="text-xs text-slate-400 italic">Trigger reminders disabled. Toggle active to enable.</p>
            )}
          </Card>

          {/* Smart Free-Time Explorer */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-blue-700" />
                <h3 className="text-sm font-black text-slate-900">Nearby Sights For Free Slots</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Gaps Identified
              </span>
            </div>
            
            <p className="text-xs text-slate-500">Top-rated spots in {currentItineraryDay?.city} that fit your free hours:</p>

            <div className="space-y-3">
              {MOCK_PLACES.slice(0, 4).map(place => (
                <div key={place.id} className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-slate-100 transition-colors">
                  <img src={place.image} alt={place.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{place.name}</p>
                    <p className="text-[11px] text-slate-500">{place.distance} • {place.duration}</p>
                  </div>
                  <button
                    onClick={() => handleAddPlace(place)}
                    className="text-xs font-bold text-blue-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:bg-blue-50 shadow-xs"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

      {/* ── Add Event Modal ────────────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-fade-in">
            <h3 className="text-base font-bold text-slate-900">Add Event to Day {selectedDay}</h3>
            
            <Input 
              label="Event / Place Name" 
              value={newEventName} 
              onChange={e => setNewEventName(e.target.value)} 
              placeholder="e.g. Visit Stepwell / Client Lunch" 
              required 
            />

            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="Time" 
                type="time" 
                value={newEventTime} 
                onChange={e => setNewEventTime(e.target.value)} 
              />
              <Select 
                label="Category" 
                value={newEventCategory} 
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewEventCategory(e.target.value)}
              >
                <option value="activity">Sightseeing</option>
                <option value="food">Meal / Dining</option>
                <option value="meeting">Business Meeting</option>
                <option value="travel">Transit</option>
              </Select>
            </div>

            <Input 
              label="Venue / Location" 
              value={newEventLocation} 
              onChange={e => setNewEventLocation(e.target.value)} 
              placeholder="e.g. Connaught Place, Central Delhi" 
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleAddActivity}>
                Save to Itinerary
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
