"use client";
import { useEffect, useState, use } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card } from "@/components/ui/index";
import { Calendar, MapPin, Wallet, Briefcase, Star, Plane, BedDouble, HelpCircle } from "lucide-react";
import type { Trip } from "@/lib/types";

export default function TripOverview({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getTrip } = useTrips();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const t = getTrip(resolvedParams.id);
    if (t) setTrip(t);
  }, [resolvedParams.id, getTrip]);

  if (!trip) return null;


  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Summary Cards */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main highlights */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E]">Safar Overview</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your {trip.duration} trip to {trip.stops.map(s => s.city).join(" & ")} has been planned successfully. 
              The trip starts on {trip.startDate} and ends on {trip.endDate}.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
              <div>
                <p className="text-[#6B7280] text-xs">Total Stops</p>
                <p className="font-bold text-gray-800 mt-0.5">{trip.stops.length} Stop</p>
              </div>
              <div>
                <p className="text-[#6B7280] text-xs">Travel Purpose</p>
                <p className="font-bold text-gray-800 capitalize mt-0.5">{trip.purpose}</p>
              </div>
              <div>
                <p className="text-[#6B7280] text-xs">Travellers</p>
                <p className="font-bold text-gray-800 mt-0.5">
                  {trip.travellers.adults} Adult(s) {trip.travellers.children > 0 && `, ${trip.travellers.children} Child`}
                </p>
              </div>
              <div>
                <p className="text-[#6B7280] text-xs">Budget Tier</p>
                <p className="font-bold text-gray-800 capitalize mt-0.5">{trip.budgetTier}</p>
              </div>
            </div>
          </Card>

          {/* Transport Info */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
              <Plane size={18} className="text-[#E85D26]" /> Selected Transport
            </h3>
            {trip.transport ? (
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50 p-4 rounded-xl">
                <div>
                  <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-semibold uppercase tracking-wider">
                    {trip.transport.mode}
                  </span>
                  <h4 className="font-bold text-gray-800 mt-2">{trip.transport.provider || "Self Directed Route"}</h4>
                  <p className="text-xs text-gray-500">Duration: {trip.transport.duration} | Quality: {trip.transport.comfort}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg text-[#E85D26]">₹{trip.transport.cost}</p>
                  <p className="text-xs text-gray-400">Estimated Fare</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">No transport option selected.</p>
            )}
          </Card>

          {/* Accommodation Info */}
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
              <BedDouble size={18} className="text-[#E85D26]" /> Stay Accommodations
            </h3>
            {trip.hotel ? (
              <div className="flex flex-col sm:flex-row gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img src={trip.hotel.image} className="w-full h-full object-cover" alt={trip.hotel.name} />
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h4 className="font-bold text-gray-800">{trip.hotel.name}</h4>
                    <p className="text-xs text-gray-500">{trip.hotel.location} | {trip.hotel.distanceFromCenter} from Center</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-amber-500">
                      <Star size={12} className="fill-current" /> {trip.hotel.rating} ⭐ ({trip.hotel.reviewCount} reviews)
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-[#E85D26]">₹{trip.hotel.pricePerNight}/night</p>
                    <p className="text-xs text-gray-400">Base Room Rate</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl">No hotel selected.</p>
            )}
          </Card>
        </div>

        {/* Right Side: Quick Stats / Meetings */}
        <div className="lg:col-span-4 space-y-6">
          {trip.purpose === "business" && trip.meetings.length > 0 && (
            <Card className="p-6 border-l-4 border-blue-500 bg-blue-50/10">
              <h3 className="text-lg font-bold text-[#1C1C1E] mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-blue-500" /> Planned Meetings
              </h3>
              <div className="space-y-4">
                {trip.meetings.map(m => (
                  <div key={m.id} className="space-y-1 bg-white p-3 rounded-lg border border-gray-100">
                    <h4 className="font-bold text-sm text-[#1C1C1E]">{m.name}</h4>
                    <p className="text-xs text-gray-500">🏢 {m.company || "Self"}</p>
                    <p className="text-xs text-gray-500">📅 {m.date} | {m.startTime} - {m.endTime}</p>
                    <p className="text-xs text-gray-500">📍 {m.location}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Quick Checklist */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-[#1C1C1E] mb-3">Pre-Travel Checklist</h3>
            <div className="space-y-2 text-sm">
              {[
                "Download offline Google Maps of destination",
                "Keep emergency numbers written/saved",
                "Ensure hotel check-in ID matches booking details",
                "Pack business formal files / presentation copy"
              ].map((c, i) => (
                <label key={i} className="flex items-start gap-2.5 cursor-pointer py-1">
                  <input type="checkbox" className="rounded mt-1 border-gray-300 text-[#E85D26] focus:ring-[#E85D26]" />
                  <span className="text-xs text-[#6B7280]">{c}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
