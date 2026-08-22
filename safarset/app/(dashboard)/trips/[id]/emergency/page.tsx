"use client";
import React, { useState } from "react";
import { Card, Button, Input } from "@/components/ui/index";
import { AlertOctagon, Phone, ShieldAlert, HeartHandshake, Navigation, Compass } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function TripEmergencyPage() {
  const { addToast } = useToast();
  const [taxiDestination, setTaxiDestination] = useState("");
  const [taxiType, setTaxiType] = useState("mini");
  const [taxiLoading, setTaxiLoading] = useState(false);

  const emergencyContacts = [
    { title: "National Emergency Number", number: "112", icon: Phone, color: "bg-red-50 text-red-600" },
    { title: "Police Help Desk", number: "100", icon: ShieldAlert, color: "bg-blue-50 text-blue-600" },
    { title: "Medical Ambulance Help", number: "108", icon: HeartHandshake, color: "bg-emerald-50 text-emerald-600" },
    { title: "Tourist Helpline", number: "1363", icon: Compass, color: "bg-purple-50 text-purple-600" },
  ];

  const handleTaxiBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taxiDestination) return;
    setTaxiLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setTaxiLoading(false);
    setTaxiDestination("");
    addToast("success", "🚖 Cab booked! Driver Ramesh (MH-02-AB-1234) is arriving in 8 minutes.");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
      {/* Left Column: Direct Call Numbers & Maps */}
      <div className="lg:col-span-8 space-y-6">
        {/* National Helpline numbers */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
            <AlertOctagon size={18} className="text-red-500" /> National Emergency Services (India)
          </h3>
          <p className="text-xs text-[#6B7280]">Click to dial standard national assistance lines during an emergency.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts.map((contact, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${contact.color} flex items-center justify-center flex-shrink-0`}>
                    <contact.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-[#1C1C1E]">{contact.title}</h4>
                    <p className="text-sm font-black text-gray-800 mt-0.5">{contact.number}</p>
                  </div>
                </div>
                <a
                  href={`tel:${contact.number}`}
                  className="px-3 py-1.5 bg-[#E85D26]/10 text-[#E85D26] hover:bg-[#E85D26] hover:text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Call Now
                </a>
              </div>
            ))}
          </div>
        </Card>

        {/* SOS Location sharing & nearby */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-[#1C1C1E] flex items-center gap-2">
            <Navigation size={18} className="text-[#E85D26]" /> SOS Quick Share Location
          </h3>
          <p className="text-xs text-[#6B7280]">Send your live coordinates directly to your family or business contact.</p>
          <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-xs text-orange-700 font-bold">📍 Current Coordinates (Simulated)</p>
              <p className="text-sm text-orange-900 mt-0.5 font-semibold">23.0225° N, 72.5714° E (Ahmedabad, Gujarat)</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => addToast("success", "Live location link copied to clipboard & sent to emergency contacts.")}>
              Copy SOS Link
            </Button>
          </div>
        </Card>
      </div>

      {/* Right Column: Local Cab Booking / Medical */}
      <div className="lg:col-span-4 space-y-6">
        {/* Instant Cab / Taxi booking */}
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Instant Cab Booking</h3>
          <p className="text-xs text-[#6B7280]">Book a verified taxi instantly for transit or airport runs.</p>
          <form onSubmit={handleTaxiBook} className="space-y-4">
            <Input
              label="Drop Location"
              value={taxiDestination}
              onChange={e => setTaxiDestination(e.target.value)}
              placeholder="e.g. SVPI Airport, Ahmedabad"
              required
            />
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">Taxi Category</label>
              <select
                value={taxiType}
                onChange={e => setTaxiType(e.target.value)}
                className="w-full border border-[#E5E0D8] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#E85D26] focus:outline-none"
              >
                <option value="mini">SafarMini (Hatchback) – ₹12/km</option>
                <option value="sedan">SafarSedan (Prime) – ₹15/km</option>
                <option value="suv">SafarSUV (Large Group) – ₹20/km</option>
              </select>
            </div>
            <Button type="submit" variant="primary" size="md" className="w-full" loading={taxiLoading}>
              Book Taxi Now
            </Button>
          </form>
        </Card>

        {/* Nearby Medicals & Police station coordinates info */}
        <Card className="p-6 space-y-3">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Nearby Safety Landmarks</h3>
          <div className="space-y-3 text-xs">
            <div className="border-b border-gray-100 pb-2">
              <p className="font-semibold text-gray-800">🏥 Apollo City Hospital</p>
              <p className="text-gray-500">1.8 km away • Open 24 Hours</p>
              <p className="text-[#E85D26] font-medium mt-0.5">📞 +91 79 1234 5678</p>
            </div>
            <div className="pb-1">
              <p className="font-semibold text-gray-800">👮 Navrangpura Police Station</p>
              <p className="text-gray-500">2.1 km away • Help Desk Active</p>
              <p className="text-[#E85D26] font-medium mt-0.5">📞 +91 79 9876 5432</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
