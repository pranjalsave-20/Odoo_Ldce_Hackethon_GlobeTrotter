"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrips } from "@/lib/context/TripsContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, Button, Input, Select, Badge, Stars } from "@/components/ui/index";
import { MOCK_TRANSPORT, MOCK_HOTELS, MOCK_PLACES } from "@/lib/data/mockData";
import { useToast } from "@/components/ui/Toast";
import { 
  MapPin, Sparkles, ArrowLeft, ArrowRight, Wallet, BedDouble, Plane, Train, Bus, Car, 
  Briefcase, Clock, CheckCircle2, AlertCircle, Compass, Star, FileDown
} from "lucide-react";
import type { Trip, TravelPurpose, BudgetTier, TransportOption, Hotel, Place } from "@/lib/types";
import { generateTripPDF } from "@/lib/services/pdfGenerator";

export default function CreateTripWizard() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTrip } = useTrips();
  const { addToast } = useToast();

  // Wizard Step (1 to 6)
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1: Origin, Destination, Type, Dates
  const [fromCity, setFromCity] = useState("Mumbai");
  const [toCity, setToCity] = useState("Delhi");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("round-trip");
  const [startDate, setStartDate] = useState("2024-09-12");
  const [endDate, setEndDate] = useState("2024-09-14");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, seniors: 0, groupType: "solo" });
  const [targetBudget, setTargetBudget] = useState("25000");

  // Step 2: Trip Purpose
  const [purpose, setPurpose] = useState<TravelPurpose>("business");

  // Step 3: Transport Comparison & Selection
  const [transportSort, setTransportSort] = useState<"recommended" | "cheapest" | "fastest" | "rating">("recommended");
  const [selectedTransport, setSelectedTransport] = useState<TransportOption>({
    id: "tr-vb",
    mode: "train",
    from: fromCity,
    to: toCity,
    duration: "6h 15m",
    cost: 1450,
    comfort: "High",
    provider: "Vande Bharat Express (20901)",
    departure: "06:00",
    arrival: "12:15"
  });

  // Step 4: Hotel Discovery & Comparison
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(MOCK_HOTELS[0]);
  const [hotelFilter, setHotelFilter] = useState<"all" | "cheapest" | "top-rated">("all");

  // Step 5: Business Meeting Scheduler & Free Slot Identification
  const [meetingName, setMeetingName] = useState("Q3 Business Review Meeting");
  const [company, setCompany] = useState("TechCorp India");
  const [meetingDate, setMeetingDate] = useState("2024-09-13");
  const [meetStart, setMeetStart] = useState("11:00");
  const [meetEnd, setMeetEnd] = useState("13:00");
  const [meetLocation, setMeetLocation] = useState("Connaught Place, Central Delhi");

  // Step 6: Free-Time & Nearby Exploration
  const [selectedAttractions, setSelectedAttractions] = useState<Place[]>([
    MOCK_PLACES[0],
    MOCK_PLACES[2]
  ]);

  // Transport options customized for selected route
  const transportList: (TransportOption & { tag?: string; rating: number })[] = [
    {
      id: "tr-flight",
      mode: "flight",
      from: fromCity,
      to: toCity,
      duration: "2h 10m",
      cost: 4800,
      comfort: "High",
      provider: "IndiGo 6E-5012",
      departure: "07:30",
      arrival: "09:40",
      rating: 4.6,
      tag: "Fastest"
    },
    {
      id: "tr-vb",
      mode: "train",
      from: fromCity,
      to: toCity,
      duration: "6h 15m",
      cost: 1450,
      comfort: "High",
      provider: "Vande Bharat Express (20901)",
      departure: "06:00",
      arrival: "12:15",
      rating: 4.9,
      tag: "Best Value"
    },
    {
      id: "tr-bus",
      mode: "bus",
      from: fromCity,
      to: toCity,
      duration: "14h 00m",
      cost: 950,
      comfort: "Medium",
      provider: "Zingbus Luxury Multi-Axle",
      departure: "18:00",
      arrival: "08:00",
      rating: 4.2,
      tag: "Cheapest"
    },
    {
      id: "tr-car",
      mode: "car",
      from: fromCity,
      to: toCity,
      duration: "15h 30m",
      cost: 3400,
      comfort: "High",
      provider: "Expressway Self-Drive / Cab",
      departure: "Flexible",
      arrival: "Flexible",
      rating: 4.4,
      tag: "Flexible"
    }
  ];

  // Sorting transport
  const sortedTransport = [...transportList].sort((a, b) => {
    if (transportSort === "cheapest") return a.cost - b.cost;
    if (transportSort === "fastest") return parseInt(a.duration) - parseInt(b.duration);
    if (transportSort === "rating") return b.rating - a.rating;
    return (a.tag === "Best Value" ? -1 : 1);
  });

  // Calculate Budget
  const transportTotal = tripType === "round-trip" ? selectedTransport.cost * 2 : selectedTransport.cost;
  const hotelTotal = selectedHotel.pricePerNight * 2;
  const activitiesTotal = selectedAttractions.reduce((sum, a) => sum + a.estimatedCost, 0) + 1200; // includes food
  const totalEstimatedCost = transportTotal + hotelTotal + activitiesTotal;
  const targetBudgetNum = Number(targetBudget) || 25000;
  const isOverBudget = totalEstimatedCost > targetBudgetNum;

  const toggleAttraction = (place: Place) => {
    if (selectedAttractions.some(p => p.id === place.id)) {
      setSelectedAttractions(selectedAttractions.filter(p => p.id !== place.id));
    } else {
      setSelectedAttractions([...selectedAttractions, place]);
    }
  };

  const handleGenerateTrip = async () => {
    setLoading(true);
    addToast("success", "Generating your Bharat Parikrama Itinerary...");
    await new Promise(r => setTimeout(r, 1200));

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      userId: user?.id || "user-1",
      name: `${fromCity} to ${toCity} – ${purpose.charAt(0).toUpperCase() + purpose.slice(1)} Parikrama`,
      from: fromCity,
      stops: [{ city: toCity, state: "India", nights: 2 }],
      purpose,
      tripType,
      startDate,
      endDate,
      duration: "3 Days / 2 Nights",
      travellers: {
        adults: travellers.adults,
        children: travellers.children,
        seniors: travellers.seniors,
        groupType: travellers.groupType as any
      },
      budgetTier: "comfort",
      budgetAmount: targetBudgetNum,
      transport: selectedTransport,
      hotel: selectedHotel,
      meetings: purpose === "business" ? [
        {
          id: "m-1",
          name: meetingName,
          company,
          date: meetingDate,
          startTime: meetStart,
          endTime: meetEnd,
          location: meetLocation,
          notes: "Scheduled agenda review"
        }
      ] : [],
      itinerary: [
        {
          day: 1,
          date: startDate,
          city: toCity,
          activities: [
            {
              id: "act-1",
              name: `Departure from ${fromCity} via ${selectedTransport.provider}`,
              category: "travel",
              time: selectedTransport.departure || "07:00",
              duration: selectedTransport.duration,
              location: `${fromCity} Transit Hub`,
              city: fromCity,
              estimatedCost: selectedTransport.cost,
              image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80",
              type: "travel"
            },
            {
              id: "act-2",
              name: `Arrival & Check-in at ${selectedHotel.name}`,
              category: "travel",
              time: "14:00",
              duration: "45 min",
              location: selectedHotel.location,
              city: toCity,
              estimatedCost: selectedHotel.pricePerNight,
              image: selectedHotel.image,
              type: "hotel"
            },
            {
              id: "act-3",
              name: selectedAttractions[0]?.name || "Historic City Walk",
              category: "historical",
              time: "16:30",
              duration: "1.5 hrs",
              location: toCity,
              city: toCity,
              estimatedCost: selectedAttractions[0]?.estimatedCost || 0,
              image: selectedAttractions[0]?.image || "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80",
              type: "activity"
            }
          ]
        },
        {
          day: 2,
          date: meetingDate,
          city: toCity,
          activities: [
            {
              id: "act-4",
              name: "Free-Time Morning Sights & Local Breakfast",
              category: "food",
              time: "08:30",
              duration: "1.5 hrs",
              location: "Nearby Center",
              city: toCity,
              estimatedCost: 350,
              image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80",
              type: "free-time"
            },
            ...(purpose === "business" ? [{
              id: "act-m",
              name: `💼 ${meetingName} (${company})`,
              category: "meeting" as const,
              time: meetStart,
              duration: "2 hrs",
              location: meetLocation,
              city: toCity,
              estimatedCost: 0,
              image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
              type: "meeting" as const
            }] : []),
            {
              id: "act-5",
              name: selectedAttractions[1]?.name || "Cultural Sunset Visit",
              category: "nature",
              time: "16:00",
              duration: "2 hrs",
              location: toCity,
              city: toCity,
              estimatedCost: selectedAttractions[1]?.estimatedCost || 0,
              image: selectedAttractions[1]?.image || "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80",
              type: "activity"
            }
          ]
        },
        {
          day: 3,
          date: endDate,
          city: toCity,
          activities: [
            {
              id: "act-6",
              name: `Hotel Check-out & Return Journey to ${fromCity}`,
              category: "travel",
              time: "11:00",
              duration: selectedTransport.duration,
              location: `${toCity} Central Terminal`,
              city: toCity,
              estimatedCost: tripType === "round-trip" ? selectedTransport.cost : 0,
              image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
              type: "travel"
            }
          ]
        }
      ],
      budget: {
        total: targetBudgetNum,
        estimated: totalEstimatedCost,
        actual: 0,
        remaining: targetBudgetNum - totalEstimatedCost,
        categories: [
          { name: "Transport", planned: targetBudgetNum * 0.35, estimated: transportTotal, actual: 0, color: "#2563eb" },
          { name: "Accommodation", planned: targetBudgetNum * 0.40, estimated: hotelTotal, actual: 0, color: "#1e293b" },
          { name: "Activities & Food", planned: targetBudgetNum * 0.25, estimated: activitiesTotal, actual: 0, color: "#f59e0b" },
        ]
      },
      status: "upcoming",
      coverImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
      createdAt: new Date().toISOString()
    };

    addTrip(newTrip);
    setLoading(false);
    addToast("success", "Bharat Parikrama plan created successfully! 🎉");
    router.push(`/trips/${newTrip.id}/itinerary`);
  };

  const STEPS = [
    { num: 1, label: "Route & Dates" },
    { num: 2, label: "Trip Purpose" },
    { num: 3, label: "Transport Compare" },
    { num: 4, label: "Stay Selection" },
    { num: 5, label: purpose === "business" ? "Meetings & Free Slot" : "Free Slot Explorer" },
    { num: 6, label: "Review & Itinerary" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <span className="text-xs font-black text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200">
          Bharat Parikrama Journey Engine
        </span>
        <h1 className="text-3xl font-black text-slate-950 mt-2 tracking-tight">Plan Your Pan-India Journey</h1>
        <p className="text-slate-500 text-sm mt-0.5">End-to-end multi-modal routing, stay discovery, meeting scheduler & budget optimization.</p>
      </div>

      {/* Stepper Wizard Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.num}>
            <div 
              onClick={() => s.num < step && setStep(s.num)}
              className={`flex items-center gap-2 flex-shrink-0 cursor-pointer ${s.num === step ? "opacity-100" : "opacity-60"}`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num 
                  ? "bg-blue-600 text-white ring-4 ring-blue-100" 
                  : step > s.num 
                    ? "bg-emerald-600 text-white" 
                    : "bg-slate-200 text-slate-600"
              }`}>
                {step > s.num ? "✓" : s.num}
              </div>
              <span className={`text-xs font-bold hidden sm:inline ${step === s.num ? "text-blue-900" : "text-slate-600"}`}>
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="w-4 sm:w-8 h-0.5 bg-slate-200 flex-shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      {/* STEP 1: ROUTE & DATES */}
      {step === 1 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin size={18} className="text-blue-600" />
            <h2 className="text-lg font-black text-slate-900">Step 1: Origin, Destination & Dates</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input 
              label="Origin City (Where are you travelling from?)" 
              value={fromCity} 
              onChange={e => setFromCity(e.target.value)} 
              placeholder="e.g. Mumbai" 
              required 
            />
            <Input 
              label="Destination City (Where are you travelling to?)" 
              value={toCity} 
              onChange={e => setToCity(e.target.value)} 
              placeholder="e.g. Delhi, Ahmedabad, Varanasi" 
              required 
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Select label="Trip Type" value={tripType} onChange={e => setTripType(e.target.value as any)}>
              <option value="round-trip">Round Trip (Return Included)</option>
              <option value="one-way">One Way</option>
            </Select>

            <Input 
              label="Departure Date" 
              type="date" 
              value={startDate} 
              onChange={e => setStartDate(e.target.value)} 
              required 
            />

            {tripType === "round-trip" && (
              <Input 
                label="Return Date" 
                type="date" 
                value={endDate} 
                onChange={e => setEndDate(e.target.value)} 
                required 
              />
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <Input 
              label="Target Approximate Budget (₹)" 
              type="number" 
              value={targetBudget} 
              onChange={e => setTargetBudget(e.target.value)} 
              placeholder="25000" 
            />
            <div className="flex gap-3">
              <Input 
                label="Adults" 
                type="number" 
                min={1} 
                value={travellers.adults} 
                onChange={e => setTravellers({ ...travellers, adults: Number(e.target.value) })} 
              />
              <Select 
                label="Group Style" 
                value={travellers.groupType} 
                onChange={e => setTravellers({ ...travellers, groupType: e.target.value })}
              >
                <option value="solo">Solo</option>
                <option value="couple">Couple</option>
                <option value="family">Family</option>
                <option value="corporate">Corporate</option>
              </Select>
            </div>
          </div>
        </Card>
      )}

      {/* STEP 2: TRIP PURPOSE */}
      {step === 2 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles size={18} className="text-blue-600" />
            <h2 className="text-lg font-black text-slate-900">Step 2: Purpose of Your Journey</h2>
          </div>
          <p className="text-xs text-slate-500">The selected purpose directly guides routing, stays, meetings & free-time recommendations.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: "business", label: "Business Trip", icon: "💼", desc: "Client meetings, schedules & work corridors" },
              { id: "devotional", label: "Devotional / Yatra", icon: "🛕", desc: "Pilgrimage, temples & spiritual heritage" },
              { id: "personal", label: "Personal / Solo", icon: "🧘", desc: "Relaxation, cafes & self-discovery" },
              { id: "family", label: "Family Holiday", icon: "👨‍👩‍👧‍👦", desc: "Comfortable pacing & safe attractions" },
              { id: "adventure", label: "Picnic & Adventure", icon: "🏕️", desc: "Outdoors, scenic routes & experiences" },
              { id: "entertainment", label: "Entertainment & Leisure", icon: "🎪", desc: "Shopping, events & night markets" },
            ].map(p => (
              <div 
                key={p.id} 
                onClick={() => setPurpose(p.id as any)} 
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  purpose === p.id 
                    ? "border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20" 
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <span className="text-2xl">{p.icon}</span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">{p.label}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* STEP 3: MULTI-MODAL TRANSPORT COMPARISON */}
      {step === 3 && (
        <Card className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Step 3: Multi-Modal Transport Comparison</h2>
              <p className="text-xs text-slate-500">Compare Flight, Train, Bus & Expressway for {fromCity} → {toCity}</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
              {[
                { id: "recommended", label: "Best Value" },
                { id: "cheapest", label: "Cheapest" },
                { id: "fastest", label: "Fastest" },
                { id: "rating", label: "Best Rated" }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTransportSort(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    transportSort === f.id ? "bg-white text-blue-700 shadow-xs" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {sortedTransport.map(t => {
              const isSelected = selectedTransport.id === t.id;
              return (
                <div 
                  key={t.id} 
                  onClick={() => setSelectedTransport(t)}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all ${
                    isSelected 
                      ? "border-blue-600 bg-blue-50/70 shadow-md ring-2 ring-blue-500/20" 
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-blue-100/80 text-blue-800 flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {t.mode === "flight" && <Plane size={22} />}
                      {t.mode === "train" && <Train size={22} />}
                      {t.mode === "bus" && <Bus size={22} />}
                      {t.mode === "car" && <Car size={22} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-slate-900">{t.provider}</h4>
                        {t.tag && (
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                            t.tag === "Best Value" ? "bg-emerald-100 text-emerald-800" :
                            t.tag === "Fastest" ? "bg-blue-100 text-blue-800" :
                            t.tag === "Cheapest" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"
                          }`}>
                            {t.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Duration: <span className="font-semibold text-slate-700">{t.duration}</span> • Comfort: {t.comfort} • ⭐ {t.rating}
                      </p>
                      <p className="text-[11px] text-slate-400">Departure: {t.departure} | Arrival: {t.arrival}</p>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <div className="text-right">
                      <p className="text-lg font-black text-blue-700">₹{t.cost}</p>
                      <p className="text-[11px] text-slate-400">per person</p>
                    </div>
                    <div className="mt-1">
                      {isSelected ? (
                        <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                          <CheckCircle2 size={14} /> Selected
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">Click to Select</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* STEP 4: HOTEL RECOMMENDATIONS */}
      {step === 4 && (
        <Card className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Step 4: Stay & Accommodation in {toCity}</h2>
              <p className="text-xs text-slate-500">Verified stays near key hubs & meeting locations.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Sorted by value & proximity</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {MOCK_HOTELS.map(h => {
              const isSelected = selectedHotel.id === h.id;
              return (
                <div 
                  key={h.id} 
                  onClick={() => setSelectedHotel(h)}
                  className={`rounded-2xl border overflow-hidden cursor-pointer transition-all ${
                    isSelected 
                      ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20" 
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="h-36 w-full relative">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[11px] px-2 py-0.5 rounded-md backdrop-blur-xs font-bold">
                      ⭐ {h.rating} ({h.reviewCount})
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{h.name}</h4>
                        <p className="text-xs text-slate-500">{h.location} • {h.distanceFromCenter} from Center</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {h.amenities.slice(0, 3).map(a => (
                        <span key={a} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                          {a}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
                      <div>
                        <span className="text-base font-black text-slate-900">₹{h.pricePerNight}</span>
                        <span className="text-xs text-slate-500"> / night</span>
                      </div>
                      {isSelected ? (
                        <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                          <CheckCircle2 size={13} /> Selected
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">Select Stay</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* STEP 5: BUSINESS MEETINGS & FREE-SLOT IDENTIFICATION */}
      {step === 5 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase size={18} className="text-blue-600" />
            <h2 className="text-lg font-black text-slate-900">
              {purpose === "business" ? "Step 5: Business Meeting Scheduler & Free Time Slots" : "Step 5: Free-Time Slot Explorer"}
            </h2>
          </div>

          {purpose === "business" ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-3">
                <h3 className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                  <Clock size={16} className="text-blue-700" /> Add Your Meeting Schedule
                </h3>
                
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input label="Meeting Agenda / Name" value={meetingName} onChange={e => setMeetingName(e.target.value)} />
                  <Input label="Client / Company" value={company} onChange={e => setCompany(e.target.value)} />
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <Input label="Date" type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} />
                  <Input label="Start Time" type="time" value={meetStart} onChange={e => setMeetStart(e.target.value)} />
                  <Input label="End Time" type="time" value={meetEnd} onChange={e => setMeetEnd(e.target.value)} />
                </div>

                <Input label="Meeting Venue Location" value={meetLocation} onChange={e => setMeetLocation(e.target.value)} />
              </div>

              {/* Identified Free Time Slot Box */}
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={14} /> AI Free Time Gap Identified
                  </span>
                  <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">
                    3.5 Hours Free Slot
                  </span>
                </div>
                <p className="text-xs text-slate-700">
                  After checking into <span className="font-semibold">{selectedHotel.name}</span> at 14:00, you have free time in the morning/evening around your meeting at {meetStart}.
                </p>
                <p className="text-xs text-emerald-700 font-semibold">
                  💡 Recommendation: Visit nearby cultural sights with guaranteed buffer to reach {meetLocation} on time!
                </p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200">
              <p className="text-sm font-semibold text-blue-900">
                Your journey duration is 3 Days. We have identified morning and evening free exploration windows in {toCity}.
              </p>
            </div>
          )}

          {/* Sights to add during free slots */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Compass size={16} className="text-blue-600" /> Recommended Nearby Sights For Your Free Slots
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {MOCK_PLACES.map(place => {
                const isSelected = selectedAttractions.some(p => p.id === place.id);
                return (
                  <div 
                    key={place.id}
                    onClick={() => toggleAttraction(place)}
                    className={`p-3 rounded-xl border flex gap-3 cursor-pointer transition-all ${
                      isSelected ? "border-blue-600 bg-blue-50/70" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <img src={place.image} alt={place.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-xs text-slate-900">{place.name}</h4>
                        <span className="text-[10px] text-amber-600 font-bold">⭐ {place.rating}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{place.distance} • {place.duration}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[11px] font-semibold text-slate-700">
                          {place.estimatedCost > 0 ? `₹${place.estimatedCost}` : "Free Entry"}
                        </span>
                        <span className={`text-[10px] font-bold ${isSelected ? "text-blue-700" : "text-slate-400"}`}>
                          {isSelected ? "✓ Added" : "+ Add"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      )}

      {/* STEP 6: REVIEW ITINERARY & BUDGET */}
      {step === 6 && (
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900">Step 6: Review Itinerary & Budget Summary</h2>
          </div>

          {/* Journey Summary Strip */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl grid sm:grid-cols-4 gap-4">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Route</span>
              <p className="font-bold text-sm">{fromCity} → {toCity}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Dates</span>
              <p className="font-bold text-sm">{startDate} to {endDate}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Transport</span>
              <p className="font-bold text-sm">{selectedTransport.provider}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Hotel</span>
              <p className="font-bold text-sm">{selectedHotel.name}</p>
            </div>
          </div>

          {/* Budget Overview Card */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-bold text-sm text-slate-900">Estimated Total Trip Cost</h4>
                <p className="text-xs text-slate-500">Target Budget: ₹{targetBudgetNum}</p>
              </div>
              <div className="text-right">
                <p className={`text-xl font-black ${isOverBudget ? "text-red-600" : "text-emerald-700"}`}>
                  ₹{totalEstimatedCost}
                </p>
                <p className="text-xs font-medium text-slate-500">
                  {isOverBudget ? "⚠️ Exceeds Target" : `Remaining: ₹${targetBudgetNum - totalEstimatedCost}`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200 text-xs">
              <div>
                <p className="text-slate-500">Transport</p>
                <p className="font-bold text-slate-800">₹{transportTotal}</p>
              </div>
              <div>
                <p className="text-slate-500">Accommodation</p>
                <p className="font-bold text-slate-800">₹{hotelTotal}</p>
              </div>
              <div>
                <p className="text-slate-500">Activities & Meals</p>
                <p className="font-bold text-slate-800">₹{activitiesTotal}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Bottom Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <Button 
          variant="outline" 
          size="md" 
          onClick={() => setStep(s => s - 1)} 
          disabled={step === 1 || loading}
        >
          <ArrowLeft size={16} /> Previous Step
        </Button>

        {step < 6 ? (
          <Button 
            variant="primary" 
            size="md" 
            onClick={() => setStep(s => s + 1)}
          >
            Next: {STEPS[step].label} <ArrowRight size={16} />
          </Button>
        ) : (
          <Button 
            variant="primary" 
            size="md" 
            onClick={handleGenerateTrip} 
            loading={loading}
          >
            <Sparkles size={16} /> Generate & View Final Parikrama Plan
          </Button>
        )}
      </div>

    </div>
  );
}
