"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTrips } from "@/lib/context/TripsContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, Button, Input, Select } from "@/components/ui/index";
import { MOCK_HOTELS, MOCK_PLACES, MOCK_GUIDES, getTransportOptionsForRoute } from "@/lib/data/mockData";
import { generateSmartItinerary } from "@/lib/services/itineraryEngine";
import { useToast } from "@/components/ui/Toast";
import { 
  MapPin, Sparkles, ArrowLeft, ArrowRight, Wallet, BedDouble, Plane, Train, Bus, Car, 
  Briefcase, Clock, CheckCircle2, Compass, Star, Phone, UserCheck, ShieldCheck
} from "lucide-react";
import type { Trip, TravelPurpose, TransportOption, Hotel, Place, Guide } from "@/lib/types";

export default function CreateTripWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  // Pre-fill query parameters if navigated from map or hero search
  useEffect(() => {
    const qFrom = searchParams.get("from");
    const qTo = searchParams.get("to");
    const qPurpose = searchParams.get("purpose");
    if (qFrom) setFromCity(qFrom);
    if (qTo) setToCity(qTo);
    if (qPurpose) setPurpose(qPurpose as TravelPurpose);
  }, [searchParams]);

  // Step 2: Trip Purpose
  const [purpose, setPurpose] = useState<TravelPurpose>("business");

  // Step 3: Transport Comparison & Selection (Dynamic for all India routes)
  const [transportSort, setTransportSort] = useState<"recommended" | "cheapest" | "fastest" | "rating">("recommended");
  const routeTransportOptions = getTransportOptionsForRoute(fromCity, toCity);
  const [selectedTransport, setSelectedTransport] = useState<TransportOption>(routeTransportOptions[1]);

  useEffect(() => {
    const opts = getTransportOptionsForRoute(fromCity, toCity);
    setSelectedTransport(opts[1]);
  }, [fromCity, toCity]);

  // Step 4: Hotel Discovery, Comparison & Skip Option
  const [skipHotel, setSkipHotel] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel>(MOCK_HOTELS[0]);

  // Step 5: Business Meeting & Local Guide / Free Slots
  const [meetingName, setMeetingName] = useState("Client Strategy Review");
  const [company, setCompany] = useState("Enterprise India");
  const [meetingDate, setMeetingDate] = useState("2024-09-13");
  const [meetStart, setMeetStart] = useState("11:00");
  const [meetEnd, setMeetEnd] = useState("13:00");
  const [meetLocation, setMeetLocation] = useState("Central Business District");

  // Local Guide Selection & Skip Option
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  // Step 6: Free-Time Attractions
  const [selectedAttractions, setSelectedAttractions] = useState<Place[]>([
    MOCK_PLACES[0],
    MOCK_PLACES[1]
  ]);

  // Sorting transport options
  const sortedTransport = [...routeTransportOptions].sort((a, b) => {
    if (transportSort === "cheapest") return a.cost - b.cost;
    if (transportSort === "fastest") return parseInt(a.duration) - parseInt(b.duration);
    if (transportSort === "rating") return (b.rating || 4.5) - (a.rating || 4.5);
    return (a.tag === "Best Value" ? -1 : 1);
  });

  // Dynamic Budget Calculation
  const transportTotal = tripType === "round-trip" ? selectedTransport.cost * 2 : selectedTransport.cost;
  const hotelTotal = skipHotel ? 0 : selectedHotel.pricePerNight * 2;
  const guideTotal = selectedGuide ? selectedGuide.pricePerHour * 3 : 0;
  const activitiesTotal = selectedAttractions.reduce((sum, a) => sum + a.estimatedCost, 0) + 1200 + guideTotal;
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
    addToast("success", `Generating custom Parikrama itinerary for ${fromCity} → ${toCity}...`);
    await new Promise(r => setTimeout(r, 800));

    // Generate comprehensive real city-tailored itinerary
    const generatedItinerary = generateSmartItinerary({
      fromCity,
      toCity,
      purpose,
      tripType,
      startDate,
      endDate,
      transport: selectedTransport,
      hotel: skipHotel ? undefined : selectedHotel,
      meetings: purpose === "business" ? [
        {
          id: "m-1",
          name: meetingName,
          company,
          date: meetingDate,
          startTime: meetStart,
          endTime: meetEnd,
          location: meetLocation,
          notes: "Scheduled business agenda"
        }
      ] : []
    });

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      userId: user?.id || "user-1",
      name: `${fromCity} to ${toCity} – ${purpose.charAt(0).toUpperCase() + purpose.slice(1)} Yatra`,
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
      hotel: skipHotel ? undefined : selectedHotel,
      meetings: purpose === "business" ? [
        {
          id: "m-1",
          name: meetingName,
          company,
          date: meetingDate,
          startTime: meetStart,
          endTime: meetEnd,
          location: meetLocation,
          notes: "Scheduled business agenda"
        }
      ] : [],
      itinerary: generatedItinerary,
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
      coverImage: selectedHotel?.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
      createdAt: new Date().toISOString()
    };

    addTrip(newTrip);
    setLoading(false);
    addToast("success", `Bharat Parikrama itinerary for ${toCity} generated successfully! 🎉`);
    router.push(`/trips/${newTrip.id}/itinerary`);
  };

  const STEPS = [
    { num: 1, label: "Route & Dates" },
    { num: 2, label: "Trip Purpose" },
    { num: 3, label: "Transport Compare" },
    { num: 4, label: "Hotel / Stay" },
    { num: 5, label: purpose === "business" ? "Meetings & Guides" : "Guides & Free Slots" },
    { num: 6, label: "Review Itinerary" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      
      {/* Header */}
      <div>
        <span className="text-xs font-black text-blue-700 bg-blue-100/80 px-3 py-1 rounded-full uppercase tracking-wider border border-blue-200">
          Bharat Parikrama Journey Engine
        </span>
        <h1 className="text-3xl font-black text-slate-950 mt-2 tracking-tight">Plan Your Pan-India Journey</h1>
        <p className="text-slate-500 text-sm mt-0.5">Configure multi-modal transport, stays, meetings, and local guides across India.</p>
      </div>

      {/* Stepper Wizard Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.num}>
            <div 
              onClick={() => s.num < step && setStep(s.num)}
              className={`flex items-center gap-2 flex-shrink-0 cursor-pointer ${s.num === step ? "opacity-100" : "opacity-60"}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num 
                  ? "bg-blue-700 text-white ring-4 ring-blue-100 shadow-sm" 
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
        <Card className="p-6 space-y-6 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin size={18} className="text-blue-600" />
            <h2 className="text-lg font-black text-slate-900">Step 1: Origin, Destination & Dates</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Input 
              label="Origin City (Starting From)" 
              value={fromCity} 
              onChange={e => setFromCity(e.target.value)} 
              placeholder="e.g. Mumbai, Delhi, Bengaluru" 
              required 
            />
            <Input 
              label="Destination City (Traveling To)" 
              value={toCity} 
              onChange={e => setToCity(e.target.value)} 
              placeholder="e.g. Ahmedabad, Udaipur, Srinagar, Varanasi" 
              required 
            />
          </div>

          {/* Popular Route Quick Chips */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-slate-400 font-bold">Quick Routes:</span>
            {[
              { from: "Mumbai", to: "Ahmedabad" },
              { from: "Delhi", to: "Srinagar" },
              { from: "Delhi", to: "Varanasi" },
              { from: "Ahmedabad", to: "Udaipur" },
              { from: "Mumbai", to: "Goa" }
            ].map(r => (
              <button
                key={`${r.from}-${r.to}`}
                type="button"
                onClick={() => { setFromCity(r.from); setToCity(r.to); }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-slate-600 font-semibold border border-slate-200 transition-colors"
              >
                {r.from} → {r.to}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <Select label="Trip Type" value={tripType} onChange={(e: any) => setTripType(e.target.value)}>
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
                onChange={(e: any) => setTravellers({ ...travellers, groupType: e.target.value })}
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
        <Card className="p-6 space-y-6 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Sparkles size={18} className="text-blue-600" />
            <h2 className="text-lg font-black text-slate-900">Step 2: Purpose of Your Journey</h2>
          </div>
          <p className="text-xs text-slate-500">Guides routing, stay recommendations, meeting buffer times, and free-time sights.</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { id: "business", label: "Business Trip", icon: "💼", desc: "Meetings, work schedules & corporate hubs" },
              { id: "devotional", label: "Devotional / Yatra", icon: "🛕", desc: "Pilgrimage, temples & spiritual heritage" },
              { id: "personal", label: "Personal / Solo", icon: "🧘", desc: "Relaxation, cafes & self-discovery" },
              { id: "family", label: "Family Holiday", icon: "👨‍👩‍👧‍👦", desc: "Comfortable pacing & safe attractions" },
              { id: "adventure", label: "Picnic & Adventure", icon: "🏕️", desc: "Outdoors, scenic routes & experiences" },
              { id: "entertainment", label: "Entertainment & Leisure", icon: "🎪", desc: "Shopping, events & night markets" },
            ].map(p => (
              <div 
                key={p.id} 
                onClick={() => setPurpose(p.id as any)} 
                className={`p-4 rounded-3xl border cursor-pointer transition-all ${
                  purpose === p.id 
                    ? "border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20" 
                    : "border-slate-200 bg-white hover:bg-slate-50"
                }`}
              >
                <span className="text-3xl">{p.icon}</span>
                <h4 className="font-bold text-sm text-slate-900 mt-2">{p.label}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* STEP 3: MULTI-MODAL TRANSPORT COMPARISON */}
      {step === 3 && (
        <Card className="p-6 space-y-6 rounded-3xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Step 3: Multi-Modal Transport Comparison</h2>
              <p className="text-xs text-slate-500">Live options for {fromCity} → {toCity}</p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              {[
                { id: "recommended", label: "Best Value" },
                { id: "cheapest", label: "Cheapest" },
                { id: "fastest", label: "Fastest" },
                { id: "rating", label: "Best Rated" }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setTransportSort(f.id as any)}
                  className={`px-3 py-1.5 rounded-xl transition-colors ${
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
                  className={`p-4 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer transition-all ${
                    isSelected 
                      ? "border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20" 
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100/80 text-blue-800 flex items-center justify-center font-bold text-xl flex-shrink-0">
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
                      <p className="text-[11px] text-slate-400">per passenger</p>
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

      {/* STEP 4: HOTEL RECOMMENDATIONS & SKIP OPTION */}
      {step === 4 && (
        <Card className="p-6 space-y-6 rounded-3xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-lg font-black text-slate-900">Step 4: Stay Accommodations in {toCity}</h2>
              <p className="text-xs text-slate-500">Verified stays near key hubs & meeting locations.</p>
            </div>
            
            {/* Skip Hotel Option */}
            <button
              onClick={() => { setSkipHotel(!skipHotel); addToast("info", skipHotel ? "Hotel selection enabled." : "Hotel skipped (Self-arranged)."); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                skipHotel ? "bg-slate-900 text-white border-slate-900" : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
              }`}
            >
              {skipHotel ? "✓ Accommodation Skipped" : "Skip Hotel (Self Arranged)"}
            </button>
          </div>

          {skipHotel ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-2">
              <p className="text-sm font-bold text-slate-800">You have opted to arrange your own stay.</p>
              <p className="text-xs text-slate-500">No hotel accommodation charges will be added to your trip budget.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {MOCK_HOTELS.map(h => {
                const isSelected = selectedHotel.id === h.id;
                return (
                  <div 
                    key={h.id} 
                    onClick={() => setSelectedHotel(h)}
                    className={`rounded-3xl border overflow-hidden cursor-pointer transition-all ${
                      isSelected 
                        ? "border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20" 
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="h-40 w-full relative">
                      <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                      <div className="absolute top-2.5 right-2.5 bg-black/60 text-white text-[11px] px-2.5 py-0.5 rounded-lg backdrop-blur-xs font-bold">
                        ⭐ {h.rating} ({h.reviewCount})
                      </div>
                    </div>

                    <div className="p-4 space-y-2">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{h.name}</h4>
                        <p className="text-xs text-slate-500">{h.location} • {h.distanceFromCenter} from Center</p>
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
                            <CheckCircle2 size={14} /> Selected
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
          )}
        </Card>
      )}

      {/* STEP 5: BUSINESS MEETINGS & LOCAL GUIDES */}
      {step === 5 && (
        <Card className="p-6 space-y-6 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Briefcase size={18} className="text-blue-600" />
            <h2 className="text-lg font-black text-slate-900">
              {purpose === "business" ? "Step 5: Business Meetings & Local Tour Guides" : "Step 5: Local Tour Guides & Sights"}
            </h2>
          </div>

          {purpose === "business" && (
            <div className="p-5 bg-blue-50/70 rounded-3xl border border-blue-200/80 space-y-3">
              <h3 className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                <Clock size={16} className="text-blue-700" /> Add Your Meeting Schedule
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-3">
                <Input label="Meeting Agenda" value={meetingName} onChange={e => setMeetingName(e.target.value)} />
                <Input label="Client / Company" value={company} onChange={e => setCompany(e.target.value)} />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <Input label="Date" type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} />
                <Input label="Start Time" type="time" value={meetStart} onChange={e => setMeetStart(e.target.value)} />
                <Input label="End Time" type="time" value={meetEnd} onChange={e => setMeetEnd(e.target.value)} />
              </div>

              <Input label="Venue / Office Location" value={meetLocation} onChange={e => setMeetLocation(e.target.value)} />
            </div>
          )}

          {/* Local Tour Guide Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <UserCheck size={16} className="text-blue-600" /> Certified Local Tour Guides
                </h3>
                <p className="text-xs text-slate-500">Hire a verified local guide or skip to explore independently.</p>
              </div>

              {selectedGuide && (
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="text-xs font-bold text-slate-500 hover:text-red-600"
                >
                  ✕ Remove Guide
                </button>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {MOCK_GUIDES.map(guide => {
                const isSelected = selectedGuide?.id === guide.id;
                return (
                  <div
                    key={guide.id}
                    onClick={() => setSelectedGuide(isSelected ? null : guide)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      isSelected ? "border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={guide.avatar} alt={guide.name} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{guide.name}</h4>
                        <p className="text-[10px] text-slate-500">📍 {guide.city} • {guide.experience} yrs</p>
                        <p className="text-[10px] font-bold text-amber-600">⭐ {guide.rating}</p>
                      </div>
                    </div>
                    
                    <p className="text-[11px] text-slate-600 line-clamp-2">{guide.specialization.join(", ")}</p>

                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                      <span className="font-black text-slate-900">₹{guide.pricePerHour}/hr</span>
                      <span className={`font-bold ${isSelected ? "text-blue-700" : "text-slate-400"}`}>
                        {isSelected ? "✓ Hired" : "+ Hire"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sights to add during free slots */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Compass size={16} className="text-blue-600" /> Nearby Sights For Free Slots
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {MOCK_PLACES.slice(0, 4).map(place => {
                const isSelected = selectedAttractions.some(p => p.id === place.id);
                return (
                  <div 
                    key={place.id}
                    onClick={() => toggleAttraction(place)}
                    className={`p-3 rounded-2xl border flex gap-3 cursor-pointer transition-all ${
                      isSelected ? "border-blue-600 bg-blue-50/70 shadow-xs" : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <img src={place.image} alt={place.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
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
        <Card className="p-6 space-y-6 rounded-3xl border border-slate-200">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <CheckCircle2 size={18} className="text-emerald-600" />
            <h2 className="text-lg font-black text-slate-900">Step 6: Review Itinerary & Budget Summary</h2>
          </div>

          {/* Journey Summary Strip */}
          <div className="p-5 bg-slate-900 text-white rounded-3xl grid sm:grid-cols-4 gap-4">
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
              <p className="font-bold text-sm truncate">{selectedTransport.provider}</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Accommodation</span>
              <p className="font-bold text-sm">{skipHotel ? "Self Arranged" : selectedHotel.name}</p>
            </div>
          </div>

          {/* Budget Overview Card */}
          <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 space-y-3">
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
                <p className="text-slate-500">Activities, Guides & Food</p>
                <p className="font-bold text-slate-800">₹{activitiesTotal}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Navigation Bottom Controls */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-slate-200 shadow-xs">
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
