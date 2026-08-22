"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrips } from "@/lib/context/TripsContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, Button, Input, Select } from "@/components/ui/index";
import { MOCK_TRANSPORT, MOCK_HOTELS } from "@/lib/data/mockData";
import { useToast } from "@/components/ui/Toast";
import { Calendar, MapPin, Sparkles, ArrowLeft, ArrowRight, UserCheck, Wallet, BedDouble, Plane } from "lucide-react";
import type { Trip, TripStop, TravelPurpose, BudgetTier } from "@/lib/types";

export default function CreateTripWizard() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTrip } = useTrips();
  const { addToast } = useToast();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [fromCity, setFromCity] = useState("Mumbai");
  const [toCity, setToCity] = useState("Ahmedabad");
  const [purpose, setPurpose] = useState<TravelPurpose>("business");
  const [startDate, setStartDate] = useState("2024-09-12");
  const [endDate, setEndDate] = useState("2024-09-14");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, seniors: 0, groupType: "solo" });
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("comfort");
  const [customBudget, setCustomBudget] = useState("20000");

  // Selection states
  const [selectedTransport, setSelectedTransport] = useState(MOCK_TRANSPORT[0]);
  const [selectedHotel, setSelectedHotel] = useState(MOCK_HOTELS[0]);

  // Business Meeting states
  const [company, setCompany] = useState("");
  const [meetingName, setMeetingName] = useState("Client Meeting – TechCorp");
  const [meetingDate, setMeetingDate] = useState("2024-09-13");
  const [meetStart, setMeetStart] = useState("14:00");
  const [meetEnd, setMeetEnd] = useState("15:30");
  const [meetLocation, setMeetLocation] = useState("TechCorp Office, SG Highway, Ahmedabad");

  const durationText = "3 Days / 2 Nights";

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // Simulate AI generating itinerary

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      userId: user?.id || "user-1",
      name: `${fromCity} to ${toCity} – ${purpose.charAt(0).toUpperCase() + purpose.slice(1)}`,
      from: fromCity,
      stops: [{ city: toCity, state: "Gujarat", nights: 2 }],
      purpose,
      tripType,
      startDate,
      endDate,
      duration: durationText,
      travellers: {
        adults: travellers.adults,
        children: travellers.children,
        seniors: travellers.seniors,
        groupType: travellers.groupType as any
      },
      budgetTier,
      budgetAmount: Number(customBudget) || 20000,
      transport: selectedTransport,
      hotel: selectedHotel,
      meetings: purpose === "business" ? [
        {
          id: "m1",
          name: meetingName,
          company,
          date: meetingDate,
          startTime: meetStart,
          endTime: meetEnd,
          location: meetLocation
        }
      ] : [],
      itinerary: [
        {
          day: 1, date: startDate, city: toCity,
          activities: [
            { id: "a1", name: `Arrival at SVPI Airport via ${selectedTransport.provider || "Flight"}`, category: "travel", time: "09:15", duration: "30 min", location: "Airport", city: toCity, estimatedCost: 0, image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80", type: "travel" },
            { id: "a2", name: `Check-in at ${selectedHotel.name}`, category: "historical", time: "10:00", duration: "30 min", location: selectedHotel.location, city: toCity, estimatedCost: 0, image: selectedHotel.image, type: "hotel" },
            { id: "a3", name: "Sabarmati Ashram", category: "historical", time: "11:00", duration: "1.5 hrs", location: "Gandhi Ashram Rd", city: toCity, estimatedCost: 0, distance: "6 km", travelTime: "20 min", image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80", type: "activity" },
            { id: "a4", name: "Gujarati Thali Lunch", category: "food", time: "13:00", duration: "1 hr", location: "Agashiye Restaurant", city: toCity, estimatedCost: 600, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", type: "meal" }
          ]
        },
        {
          day: 2, date: meetingDate, city: toCity,
          activities: [
            { id: "a5", name: "Sabarmati Riverfront", category: "nature", time: "09:30", duration: "1.5 hrs", location: "Sabarmati Riverfront", city: toCity, estimatedCost: 0, distance: "5 km", image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", type: "activity" },
            { id: "a6", name: "Local Café - Work Prep", category: "food", time: "11:30", duration: "1.5 hrs", location: "Café near S.G Highway", city: toCity, estimatedCost: 350, image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", type: "free-time" },
            ...(purpose === "business" ? [{ id: "m-act-1", name: meetingName, category: "entertainment" as const, time: meetStart, duration: "1.5 hrs", location: meetLocation, city: toCity, estimatedCost: 0, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", type: "meeting" as const }] : []),
            { id: "a7", name: "Kankaria Lake walk", category: "nature", time: "17:00", duration: "1.5 hrs", location: "Kankaria", city: toCity, estimatedCost: 20, image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", type: "activity" }
          ]
        }
      ],
      budget: {
        total: Number(customBudget) || 20000,
        estimated: selectedTransport.cost + (selectedHotel.pricePerNight * 2) + 2000,
        actual: 0,
        remaining: Number(customBudget) || 20000,
        categories: [
          { name: "Transport", planned: 5000, estimated: selectedTransport.cost, actual: 0, color: "#E85D26" },
          { name: "Hotel", planned: 8000, estimated: selectedHotel.pricePerNight * 2, actual: 0, color: "#1A3A5C" },
          { name: "Food", planned: 3000, estimated: 1500, actual: 0, color: "#F5C842" },
          { name: "Activities", planned: 2000, estimated: 500, actual: 0, color: "#10B981" }
        ]
      },
      status: "upcoming",
      coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
      createdAt: new Date().toISOString()
    };

    addTrip(newTrip);
    setLoading(false);
    addToast("success", "Safar Set! Your itinerary is ready. 🛫");
    router.push("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 animate-fade-in">
      {/* Wizard Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-[#1C1C1E] tracking-tight">Plan Your Safar</h1>
        <p className="text-[#6B7280] text-sm">Tell Safar AI about your journey to get a personalized itinerary.</p>
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between px-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step >= i ? "bg-[#E85D26] text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {i}
              </div>
            </div>
            {i < 5 && (
              <div className={`flex-1 h-0.5 mx-2 transition-all ${
                step > i ? "bg-[#E85D26]" : "bg-gray-200"
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Wizard Step Containers */}
      <Card className="p-6 md:p-8 space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1C1C1E] flex items-center gap-2">
              <MapPin size={20} className="text-[#E85D26]" /> Step 1: Route & Dates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Leaving From" value={fromCity} onChange={(e) => setFromCity(e.target.value)} required />
              <Input label="Destination" value={toCity} onChange={(e) => setToCity(e.target.value)} required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>

            <Select label="Trip Type" value={tripType} onChange={(e) => setTripType(e.target.value as any)}>
              <option value="one-way">One Way</option>
              <option value="round-trip">Round Trip</option>
            </Select>

            <div className="text-right text-xs text-[#6B7280]">
              Calculated Trip Duration: <span className="font-semibold text-[#E85D26]">{durationText}</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1C1C1E] flex items-center gap-2">
              <Sparkles size={20} className="text-[#E85D26]" /> Step 2: Purpose & Travellers
            </h2>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">What's the purpose of your trip?</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {([
                  { id: "business", label: "Business", desc: "Work, meetings", icon: "💼" },
                  { id: "devotional", label: "Devotional", desc: "Pilgrimage, Temple yatra", icon: "🛕" },
                  { id: "family", label: "Family", desc: "Vacation with kids/parents", icon: "👨‍👩‍👧‍👦" },
                  { id: "entertainment", label: "Entertainment", desc: "Sightseeing, events", icon: "🎪" },
                  { id: "personal", label: "Personal", desc: "Solo relaxation", icon: "🧘" },
                  { id: "leisure", label: "Leisure", desc: "General holidays", icon: "⛱️" }
                ] as const).map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setPurpose(p.id)}
                    className={`purpose-card card p-4 flex flex-col justify-between text-left ${
                      purpose === p.id ? "selected" : ""
                    }`}
                  >
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <p className="font-bold text-sm text-[#1C1C1E] mt-2">{p.label}</p>
                      <p className="text-xs text-[#6B7280]">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Adults (18+)" type="number" min={1} value={travellers.adults} onChange={(e) => setTravellers({ ...travellers, adults: Number(e.target.value) })} />
              <Input label="Children" type="number" min={0} value={travellers.children} onChange={(e) => setTravellers({ ...travellers, children: Number(e.target.value) })} />
              <Select label="Group Type" value={travellers.groupType} onChange={(e) => setTravellers({ ...travellers, groupType: e.target.value })}>
                <option value="solo">Solo Traveller</option>
                <option value="couple">Couple</option>
                <option value="family">Family Group</option>
                <option value="friends">Friends Group</option>
                <option value="corporate">Corporate Group</option>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && purpose === "business" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1C1C1E] flex items-center gap-2">
              💼 Business Travel Mode
            </h2>
            <p className="text-xs text-[#6B7280]">Add your meeting details. The itinerary will be created around them to avoid scheduling conflicts.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Meeting / Event Name" value={meetingName} onChange={(e) => setMeetingName(e.target.value)} required />
              <Input label="Company / Org Name (optional)" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input label="Date" type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)} required />
              <Input label="Start Time" type="time" value={meetStart} onChange={(e) => setMeetStart(e.target.value)} required />
              <Input label="End Time" type="time" value={meetEnd} onChange={(e) => setMeetEnd(e.target.value)} required />
            </div>

            <Input label="Location (e.g. Corporate Park, Hotel lobby)" value={meetLocation} onChange={(e) => setMeetLocation(e.target.value)} required />
          </div>
        )}

        {step === 3 && purpose !== "business" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1C1C1E] flex items-center gap-2">
              <Wallet size={20} className="text-[#E85D26]" /> Step 3: Budget
            </h2>
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">What's your approx budget?</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {(["budget", "comfort", "premium", "luxury", "custom"] as const).map((tier) => (
                  <div
                    key={tier}
                    onClick={() => setBudgetTier(tier)}
                    className={`purpose-card card p-4 text-center capitalize ${
                      budgetTier === tier ? "selected" : ""
                    }`}
                  >
                    <p className="font-bold text-sm text-[#1C1C1E]">{tier}</p>
                  </div>
                ))}
              </div>
            </div>

            <Input
              label="Approx Budget (₹)"
              type="number"
              value={customBudget}
              onChange={(e) => setCustomBudget(e.target.value)}
              placeholder="e.g. 20000"
            />

            {/* Spending distribution estimate */}
            <div className="space-y-2 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Estimated Distribution</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div>
                  <p className="text-[#6B7280]">Transport (25%)</p>
                  <p className="font-bold text-gray-800">₹{(Number(customBudget)*0.25).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-[#6B7280]">Accommodation (40%)</p>
                  <p className="font-bold text-gray-800">₹{(Number(customBudget)*0.4).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-[#6B7280]">Food & Drinks (15%)</p>
                  <p className="font-bold text-gray-800">₹{(Number(customBudget)*0.15).toFixed(0)}</p>
                </div>
                <div>
                  <p className="text-[#6B7280]">Sightseeing & local (20%)</p>
                  <p className="font-bold text-gray-800">₹{(Number(customBudget)*0.2).toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1C1C1E] flex items-center gap-2">
              <Plane size={20} className="text-[#E85D26]" /> Transport Recommendation
            </h2>
            <div className="space-y-3">
              {MOCK_TRANSPORT.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTransport(t)}
                  className={`card p-4 flex justify-between items-center cursor-pointer transition-all hover:border-[#E85D26] ${
                    selectedTransport.id === t.id ? "border-[#E85D26] bg-orange-50/20" : ""
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-orange-700 px-2 py-0.5 bg-orange-100 rounded-md">
                      {t.mode}
                    </span>
                    <h4 className="font-bold text-gray-800 mt-2">{t.provider || "Self Managed Route"}</h4>
                    <p className="text-xs text-[#6B7280]">Duration: {t.duration} | Comfort: {t.comfort}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-lg text-[#E85D26]">₹{t.cost}</p>
                    <p className="text-xs text-[#6B7280]">estimated cost</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-[#1C1C1E] flex items-center gap-2">
              <BedDouble size={20} className="text-[#E85D26]" /> Hotel Discovery
            </h2>
            <div className="space-y-3">
              {MOCK_HOTELS.map((h) => (
                <div
                  key={h.id}
                  onClick={() => setSelectedHotel(h)}
                  className={`card p-4 flex gap-4 cursor-pointer transition-all hover:border-[#E85D26] ${
                    selectedHotel.id === h.id ? "border-[#E85D26] bg-orange-50/20" : ""
                  }`}
                >
                  <div className="w-24 h-20 rounded-lg overflow-hidden relative flex-shrink-0">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#1C1C1E]">{h.name}</h4>
                      <p className="text-xs text-[#6B7280]">{h.distanceFromCenter} from city center</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-amber-500 font-bold">★ {h.rating}</span>
                        <span className="text-[10px] text-gray-400">({h.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm text-[#E85D26]">₹{h.pricePerNight}/night</p>
                      <p className="text-[10px] text-gray-400">Excl. taxes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-6 border-t border-[#E5E0D8] mt-6">
          <Button
            variant="outline"
            size="md"
            onClick={handleBack}
            disabled={step === 1 || loading}
          >
            <ArrowLeft size={16} /> Back
          </Button>

          {step < 5 ? (
            <Button variant="primary" size="md" onClick={handleNext}>
              Next <ArrowRight size={16} />
            </Button>
          ) : (
            <Button variant="primary" size="md" onClick={handleSubmit} loading={loading}>
              <Sparkles size={16} /> Generate Safar Set
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
