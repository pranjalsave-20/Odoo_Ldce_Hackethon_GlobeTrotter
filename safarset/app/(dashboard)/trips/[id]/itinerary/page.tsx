"use client";

import React, { useEffect, useState, use } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button, Input, Select } from "@/components/ui/index";
import { useToast } from "@/components/ui/Toast";
import { 
  Clock, MapPin, Sparkles, Check, RefreshCw, Plus, Bell, Briefcase, 
  Compass, FileDown, Trash2, Edit3, Navigation, ArrowRight, ShieldCheck, Star,
  Utensils, Car, Train, Plane, BedDouble, AlertCircle, CheckCircle2
} from "lucide-react";
import type { Trip, ItineraryDay, Activity, Place } from "@/lib/types";
import { generateTripPDF } from "@/lib/services/pdfGenerator";
import { generateSmartItinerary } from "@/lib/services/itineraryEngine";
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
  const [newEventCost, setNewEventCost] = useState("200");

  useEffect(() => {
    const t = getTrip(resolvedParams.id);
    if (t) {
      // If itinerary has no activities or only generic placeholders, generate a real itinerary
      if (!t.itinerary || t.itinerary.length === 0 || t.itinerary[0].activities.length <= 1) {
        const generated = generateSmartItinerary({
          fromCity: t.from,
          toCity: t.stops?.[0]?.city || "Ahmedabad",
          purpose: t.purpose,
          tripType: t.tripType,
          startDate: t.startDate,
          endDate: t.endDate,
          transport: t.transport || {
            id: "tr-default",
            mode: "train" as const,
            from: t.from,
            to: t.stops?.[0]?.city || "Destination",
            duration: "5h 30m",
            cost: 1450,
            comfort: "High" as const,
            provider: "Vande Bharat Express"
          },
          hotel: t.hotel,
          meetings: t.meetings
        });
        updateItinerary(t.id, generated);
        setTrip({ ...t, itinerary: generated });
      } else {
        setTrip(t);
      }
    }
  }, [resolvedParams.id, getTrip, updateItinerary]);

  if (!trip) return null;

  const currentItineraryDay = trip.itinerary.find(d => d.day === selectedDay) || trip.itinerary[0];
  const targetCity = trip.stops?.[0]?.city || "India";

  // AI Smart Reschedule & Buffer Optimizer
  const handleReschedule = async () => {
    setRescheduling(true);
    addToast("success", "AI recalculating optimal route buffers and commitments...");
    await new Promise((r) => setTimeout(r, 800));
    
    const updated = trip.itinerary.map(day => {
      if (day.day === selectedDay) {
        return {
          ...day,
          activities: day.activities.map(act => {
            if (act.type === "free-time") {
              return { 
                ...act, 
                name: `${act.name} (AI Optimized Buffer)`,
                time: "11:00", 
                duration: "1.5 hrs" 
              };
            }
            if (act.type === "meeting") {
              return { 
                ...act, 
                time: "14:30",
                travelTime: "25 min buffer"
              };
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
    addToast("success", "Itinerary optimized! Real-time traffic buffers and meeting alarms updated.");
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
      estimatedCost: Number(newEventCost) || 0,
      category: newEventCategory,
      type: "activity",
      image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80"
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
    addToast("success", `"${newEventName}" added to Day ${selectedDay} routine!`);
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
      location: `${place.name}, ${place.city}`,
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

  const getActivityBadge = (act: Activity) => {
    if (act.type === "meeting" || act.category === "meeting") {
      return { label: "💼 Meeting", color: "bg-blue-600 text-white border-blue-600" };
    }
    if (act.category === "travel" || act.type === "travel") {
      return { label: "🚆 Transit", color: "bg-sky-50 text-sky-800 border-sky-200" };
    }
    if (act.category === "hotel" || act.type === "hotel") {
      return { label: "🏨 Hotel Stay", color: "bg-slate-900 text-white border-slate-900" };
    }
    if (act.category === "food" || act.type === "meal") {
      return { label: "🍽️ Meal / Dining", color: "bg-amber-50 text-amber-800 border-amber-200" };
    }
    if (act.category === "religious") {
      return { label: "🛕 Holy Yatra", color: "bg-orange-50 text-orange-800 border-orange-200" };
    }
    if (act.category === "shopping") {
      return { label: "🛍️ Bazaar", color: "bg-pink-50 text-pink-800 border-pink-200" };
    }
    if (act.type === "free-time") {
      return { label: "⏳ Free Slot", color: "bg-emerald-50 text-emerald-800 border-emerald-200" };
    }
    return { label: "📸 Sightseeing", color: "bg-purple-50 text-purple-800 border-purple-200" };
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      
      {/* ── Top Bar: Day Tabs & Actions ─────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
        
        {/* Day Selector */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {trip.itinerary.map(day => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border shrink-0 ${
                selectedDay === day.day
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              Day {day.day} • {day.date}
            </button>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setShowAddModal(true)} className="rounded-xl">
            <Plus size={14} /> Add Event
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleReschedule} loading={rescheduling} className="rounded-xl">
            <RefreshCw size={14} className={rescheduling ? "animate-spin" : ""} /> AI Reschedule
          </Button>

          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => generateTripPDF(trip)}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 font-bold"
          >
            <FileDown size={14} /> Download Official PDF
          </Button>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ── Left Column: Real-Time Day Timeline ──────────────────── */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 space-y-6 rounded-3xl border border-slate-200">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  {trip.name}
                </span>
                <h3 className="text-xl font-black text-slate-900 mt-1">
                  Day {selectedDay} Routine — {currentItineraryDay?.city}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chronological schedule with automated travel buffers, transit, meals, and meetings.
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  {currentItineraryDay?.activities.length || 0} Events Scheduled
                </span>
              </div>
            </div>

            {/* Timeline Activities List */}
            <div className="relative border-l-2 border-slate-200 pl-6 ml-3 space-y-6">
              {currentItineraryDay?.activities.map((act, idx) => {
                const badge = getActivityBadge(act);
                return (
                  <div 
                    key={act.id || idx} 
                    className={`relative group p-4 sm:p-5 rounded-3xl border transition-all ${
                      act.type === "meeting" 
                        ? "bg-blue-50/50 border-blue-200 ring-2 ring-blue-500/10 shadow-sm" 
                        : "bg-white hover:bg-slate-50/80 border-slate-200 shadow-xs"
                    }`}
                  >
                    
                    {/* Circle Indicator on the left line */}
                    <div className={`absolute -left-[33px] top-5 w-4 h-4 rounded-full border-2 bg-white ${
                      act.type === "meeting" ? "border-blue-700 bg-blue-600 ring-4 ring-blue-100" : "border-blue-600"
                    } shadow-xs`} />
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                      
                      {/* Event Details */}
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-black text-blue-700 flex items-center gap-1 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">
                            <Clock size={12} /> {act.time}
                          </span>
                          
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold uppercase border ${badge.color}`}>
                            {badge.label}
                          </span>

                          {act.duration && (
                            <span className="text-xs text-slate-500 font-semibold">({act.duration})</span>
                          )}
                        </div>

                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                          {act.name}
                        </h4>
                        
                        <p className="text-xs text-slate-600 flex items-center gap-1.5 font-medium">
                          <MapPin size={13} className="text-slate-400 shrink-0" /> {act.location}
                        </p>

                        <div className="flex items-center gap-4 text-xs font-semibold pt-1">
                          {act.estimatedCost > 0 ? (
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Est. Expense: ₹{act.estimatedCost}
                            </span>
                          ) : (
                            <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              Free / Included
                            </span>
                          )}

                          {act.travelTime && (
                            <span className="text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                              🚗 Buffer: {act.travelTime}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right Action & Photo Thumbnail */}
                      <div className="flex sm:flex-col items-end gap-2.5 shrink-0 w-full sm:w-auto justify-between sm:justify-start">
                        {act.image && (
                          <div className="w-24 h-16 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs">
                            <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                          </div>
                        )}
                        <button 
                          onClick={() => handleDeleteActivity(act.id)}
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                          title="Remove event"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

          </Card>
        </div>

        {/* ── Right Column: Reminders & Free Time Explorer ─────────── */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Smart Trigger Reminders Box */}
          <Card className="p-5 space-y-4 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50/60 via-white to-slate-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                  <Bell size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">System Trigger Reminders</h3>
                  <p className="text-[11px] text-slate-500">Live Commitments & Alarms</p>
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
                  <div className="p-3.5 bg-white rounded-2xl border border-blue-200 shadow-xs space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-900 flex items-center gap-1">
                        <Briefcase size={13} /> Meeting Alert Trigger
                      </span>
                      <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                        In 45 Mins
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800">{trip.meetings?.[0]?.name || "Client Review Meeting"}</p>
                    <p className="text-[11px] text-slate-600">📍 {trip.meetings?.[0]?.location || `${targetCity} Business Center`}</p>
                    <p className="text-[11px] text-blue-700 font-bold bg-blue-50 p-1.5 rounded-lg border border-blue-100">
                      🚗 Leave by 1:30 PM to maintain traffic buffer.
                    </p>
                  </div>
                )}

                <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      🏨 Stay Checkout Reminder
                    </span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                      Day {trip.itinerary.length} 11:00 AM
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">Express check-out requested at hotel front desk.</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Trigger reminders disabled. Toggle active to enable.</p>
            )}
          </Card>

          {/* Smart Free-Time Explorer for Destination City */}
          <Card className="p-5 space-y-4 rounded-3xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-blue-700" />
                <h3 className="text-sm font-black text-slate-900">Nearby Sights in {targetCity}</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Free Slots
              </span>
            </div>
            
            <p className="text-xs text-slate-500">Top-rated attractions that fit your open schedule hours:</p>

            <div className="space-y-3">
              {MOCK_PLACES.map(place => (
                <div key={place.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 hover:bg-slate-100 transition-colors">
                  <img src={place.image} alt={place.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{place.name}</p>
                    <p className="text-[11px] text-slate-500">{place.distance} • {place.duration}</p>
                  </div>
                  <button
                    onClick={() => handleAddPlace(place)}
                    className="text-xs font-black text-blue-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-blue-50 shadow-xs shrink-0"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </Card>

        </div>

      </div>

      {/* ── Add Custom Event Modal ─────────────────────────────────── */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-fade-in border border-slate-200">
            <h3 className="text-lg font-black text-slate-900">Add Custom Activity to Day {selectedDay}</h3>
            
            <Input 
              label="Activity / Place Name" 
              value={newEventName} 
              onChange={e => setNewEventName(e.target.value)} 
              placeholder="e.g. Visit Heritage Stepwell / Client Lunch" 
              required 
            />

            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="Scheduled Time" 
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
                <option value="religious">Religious / Temple</option>
                <option value="shopping">Shopping / Bazaar</option>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input 
                label="Venue / Location" 
                value={newEventLocation} 
                onChange={e => setNewEventLocation(e.target.value)} 
                placeholder="e.g. City Center, MG Road" 
              />
              <Input 
                label="Estimated Cost (₹)" 
                type="number"
                value={newEventCost} 
                onChange={e => setNewEventCost(e.target.value)} 
                placeholder="200" 
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setShowAddModal(false)} className="rounded-xl">
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleAddActivity} className="rounded-xl bg-blue-600 font-bold">
                Save to Itinerary
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
