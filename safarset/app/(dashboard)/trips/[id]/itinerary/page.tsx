"use client";
import React, { useEffect, useState, use } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button } from "@/components/ui/index";
import { useToast } from "@/components/ui/Toast";
import { Clock, MapPin, Sparkles, Check, RefreshCw, Plus, Edit } from "lucide-react";
import type { Trip, ItineraryDay, Activity } from "@/lib/types";

export default function TripItineraryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getTrip, updateItinerary } = useTrips();
  const { addToast } = useToast();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [rescheduling, setRescheduling] = useState(false);

  useEffect(() => {
    const t = getTrip(resolvedParams.id);
    if (t) setTrip(t);
  }, [resolvedParams.id, getTrip]);

  if (!trip) return null;

  const currentItineraryDay = trip.itinerary.find(d => d.day === selectedDay) || trip.itinerary[0];

  const handleReschedule = async () => {
    setRescheduling(true);
    addToast("success", "Safar AI analyzing your itinerary for optimizing transport & time...");
    await new Promise((r) => setTimeout(r, 1500));
    
    // Simulate AI rescheduling: Shift a few hours, re-arrange
    const updated = trip.itinerary.map(day => {
      if (day.day === selectedDay) {
        return {
          ...day,
          activities: day.activities.map(act => {
            if (act.type === "free-time") {
              return { ...act, name: "Calico Museum Visit (AI rescheduled)", time: "12:00", duration: "1.5 hrs" };
            }
            if (act.type === "meeting") {
              return { ...act, time: "16:00" }; // Meeting moved to 4 PM
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
    addToast("success", "Itinerary updated! Meeting shifted to 4:00 PM.");
  };

  const getActivityBadgeColor = (category: string) => {
    switch (category) {
      case "food": return "bg-yellow-100 text-yellow-800";
      case "nature": return "bg-green-100 text-green-800";
      case "historical": return "bg-purple-100 text-purple-800";
      case "travel": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Day Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {trip.itinerary.map(day => (
            <button
              key={day.day}
              onClick={() => setSelectedDay(day.day)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                selectedDay === day.day
                  ? "bg-[#E85D26] border-[#E85D26] text-white"
                  : "bg-white border-[#E5E0D8] text-[#6B7280] hover:text-[#1C1C1E]"
              }`}
            >
              Day {day.day} – {day.date}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReschedule} loading={rescheduling}>
            <RefreshCw size={14} className={rescheduling ? "animate-spin" : ""} /> AI Reschedule
          </Button>
          <Button variant="primary" size="sm" onClick={() => addToast("success", "Adding activity simulated.")}>
            <Plus size={14} /> Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline Activities List */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-6 space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4">
              <h3 className="text-lg font-bold text-[#1C1C1E]">
                Itinerary details for Day {selectedDay} – {currentItineraryDay?.city}
              </h3>
              <p className="text-xs text-[#6B7280] mt-0.5">Explore the hourly schedule planned for you.</p>
            </div>

            <div className="relative border-l-2 border-gray-200 pl-6 ml-3 space-y-8">
              {currentItineraryDay?.activities.map((act, index) => (
                <div key={act.id} className="relative group">
                  {/* Circle Indicator */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#E85D26] group-hover:scale-110 transition-transform" />
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-[#E85D26] flex items-center gap-1">
                          <Clock size={12} /> {act.time}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getActivityBadgeColor(act.category)}`}>
                          {act.category}
                        </span>
                        {act.duration && (
                          <span className="text-[10px] text-gray-400">({act.duration})</span>
                        )}
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm">{act.name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={12} /> {act.location}
                      </p>
                      {act.travelTime && (
                        <p className="text-[10px] text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md inline-block">
                          🚗 Next Stop Travel: {act.travelTime} ({act.distance})
                        </p>
                      )}
                    </div>

                    {act.image && (
                      <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 relative">
                        <img src={act.image} alt={act.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Side Info: AI Suggestions & Local Guide Booking */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Travel Assistant Prompt Suggestions */}
          <Card className="p-6 space-y-4 bg-orange-50/20 border border-orange-100">
            <h3 className="text-sm font-bold text-[#E85D26] uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={16} /> Safar AI Suggestions
            </h3>
            <p className="text-xs text-gray-600">Got free hours or plans change? Try asking Safar AI:</p>
            <div className="space-y-2">
              {[
                "Suggest food near Sabarmati Riverfront",
                "Move my meeting to 4 PM",
                "Find local handicraft markets nearby",
              ].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    const chatbotBtn = document.querySelector('.ai-fab') as HTMLButtonElement;
                    if (chatbotBtn) chatbotBtn.click();
                  }}
                  className="w-full text-left text-xs p-2.5 bg-white border border-[#E5E0D8] rounded-xl hover:border-[#E85D26] hover:text-[#E85D26] transition-colors"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </Card>

          {/* Local Guide Booking Card */}
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Local Experience Guide</h3>
            <div className="flex gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-[#E85D26] font-bold text-base">
                PM
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#1C1C1E]">Pranav Mehta</h4>
                <p className="text-xs text-gray-500">Gujarati Heritage Specialist</p>
                <div className="flex items-center gap-1 mt-0.5 text-xs text-amber-500">
                  ★ 4.9 <span className="text-gray-400 font-normal">(42 reviews)</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#6B7280] leading-relaxed">Book a certified local guide for exploring Sabarmati Ashram and monuments.</p>
            <Button variant="outline" size="sm" className="w-full" onClick={() => addToast("success", "Guide booking request submitted!")}>
              Book Guide (₹1,500 / Day)
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
