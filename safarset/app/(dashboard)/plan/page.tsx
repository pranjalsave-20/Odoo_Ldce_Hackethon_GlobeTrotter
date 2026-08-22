"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTrips } from "@/lib/context/TripsContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, Button, Input, Select } from "@/components/ui/index";
import { MOCK_TRANSPORT, MOCK_HOTELS } from "@/lib/data/mockData";
import { useToast } from "@/components/ui/Toast";
import { MapPin, Sparkles, ArrowLeft, ArrowRight, Wallet, BedDouble, Plane } from "lucide-react";
import type { Trip, TravelPurpose, BudgetTier } from "@/lib/types";

export default function CreateTripWizard() {
  const router = useRouter();
  const { user } = useAuth();
  const { addTrip } = useTrips();
  const { addToast } = useToast();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fromCity, setFromCity] = useState("Mumbai");
  const [toCity, setToCity] = useState("Ahmedabad");
  const [purpose, setPurpose] = useState<TravelPurpose>("business");
  const [startDate, setStartDate] = useState("2024-09-12");
  const [endDate, setEndDate] = useState("2024-09-14");
  const [tripType, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, seniors: 0, groupType: "solo" });
  const [budgetTier, setBudgetTier] = useState<BudgetTier>("comfort");
  const [customBudget, setCustomBudget] = useState("20000");
  const [selectedTransport, setSelectedTransport] = useState(MOCK_TRANSPORT[0]);
  const [selectedHotel, setSelectedHotel] = useState(MOCK_HOTELS[0]);
  const [company, setCompany] = useState("");
  const [meetingName, setMeetingName] = useState("Client Meeting");
  const [meetingDate, setMeetingDate] = useState("2024-09-13");
  const [meetStart, setMeetStart] = useState("14:00");
  const [meetEnd, setMeetEnd] = useState("15:30");
  const [meetLocation, setMeetLocation] = useState("TechCorp Office, Ahmedabad");

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      userId: user?.id || "user-1",
      name: `${fromCity} to ${toCity} – ${purpose.charAt(0).toUpperCase() + purpose.slice(1)}`,
      from: fromCity,
      stops: [{ city: toCity, state: "Gujarat", nights: 2 }],
      purpose, tripType, startDate, endDate,
      duration: "3 Days / 2 Nights",
      travellers: { adults: travellers.adults, children: travellers.children, seniors: travellers.seniors, groupType: travellers.groupType as any },
      budgetTier, budgetAmount: Number(customBudget) || 20000,
      transport: selectedTransport, hotel: selectedHotel,
      meetings: purpose === "business" ? [{ id: "m1", name: meetingName, company, date: meetingDate, startTime: meetStart, endTime: meetEnd, location: meetLocation }] : [],
      itinerary: [
        { day: 1, date: startDate, city: toCity, activities: [
          { id: "a1", name: "Arrival & Check-in", category: "travel", time: "09:15", duration: "1 hr", location: "Airport", city: toCity, estimatedCost: 0, image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80", type: "travel" },
          { id: "a3", name: "Sabarmati Ashram", category: "historical", time: "11:00", duration: "1.5 hrs", location: "Gandhi Ashram Rd", city: toCity, estimatedCost: 0, image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80", type: "activity" },
        ]},
        { day: 2, date: meetingDate, city: toCity, activities: [
          { id: "a5", name: "Sabarmati Riverfront", category: "nature", time: "09:30", duration: "1.5 hrs", location: "Sabarmati", city: toCity, estimatedCost: 0, image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", type: "activity" },
          ...(purpose === "business" ? [{ id: "m1", name: meetingName, category: "entertainment" as const, time: meetStart, duration: "1.5 hrs", location: meetLocation, city: toCity, estimatedCost: 0, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", type: "meeting" as const }] : []),
        ]},
      ],
      budget: {
        total: Number(customBudget) || 20000, estimated: selectedTransport.cost + (selectedHotel.pricePerNight * 2) + 2000, actual: 0,
        remaining: Number(customBudget) || 20000,
        categories: [
          { name: "Transport", planned: 5000, estimated: selectedTransport.cost, actual: 0, color: "#2563eb" },
          { name: "Hotel", planned: 8000, estimated: selectedHotel.pricePerNight * 2, actual: 0, color: "#1e293b" },
          { name: "Food", planned: 3000, estimated: 1500, actual: 0, color: "#f59e0b" },
          { name: "Activities", planned: 2000, estimated: 500, actual: 0, color: "#16a34a" },
        ]
      },
      status: "upcoming", coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80", createdAt: new Date().toISOString()
    };
    addTrip(newTrip);
    setLoading(false);
    addToast("success", "Trip created! 🛫");
    router.push("/dashboard");
  };

  const STEPS = [{ num: 1, label: "Route" }, { num: 2, label: "Purpose" }, { num: 3, label: purpose === "business" ? "Meetings" : "Budget" }, { num: 4, label: "Transport" }, { num: 5, label: "Hotel" }];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Plan Your Trip</h1>
        <p className="text-slate-500 text-sm mt-0.5">Tell us about your journey to get a personalized itinerary.</p>
      </div>

      <div className="flex items-center">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.num}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${step >= s.num ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-500"}`}>{s.num}</div>
              <span className="text-[10px] text-slate-400 mt-1 hidden sm:block">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 mt-[-12px] sm:mt-[-20px] ${step > s.num ? "bg-blue-600" : "bg-slate-200"}`} />}
          </React.Fragment>
        ))}
      </div>

      <Card className="p-6 space-y-5">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2"><MapPin size={16} className="text-blue-600" /> Route & Dates</h2>
            <div className="grid grid-cols-2 gap-4">
              <Input label="From" value={fromCity} onChange={e => setFromCity(e.target.value)} />
              <Input label="To" value={toCity} onChange={e => setToCity(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Start Date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              <Input label="End Date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <Select label="Trip Type" value={tripType} onChange={e => setTripType(e.target.value as any)}>
              <option value="one-way">One Way</option>
              <option value="round-trip">Round Trip</option>
            </Select>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2"><Sparkles size={16} className="text-blue-600" /> Purpose & Travellers</h2>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-2">Purpose</label>
              <div className="grid grid-cols-3 gap-2">
                {([{ id: "business", label: "Business", icon: "💼" }, { id: "devotional", label: "Devotional", icon: "🛕" }, { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" }, { id: "entertainment", label: "Entertainment", icon: "🎪" }, { id: "personal", label: "Personal", icon: "🧘" }, { id: "leisure", label: "Leisure", icon: "⛱️" }] as const).map(p => (
                  <div key={p.id} onClick={() => setPurpose(p.id)} className={`purpose-card card p-3 text-center cursor-pointer ${purpose === p.id ? "selected" : ""}`}>
                    <span className="text-xl">{p.icon}</span>
                    <p className="text-xs font-medium text-slate-800 mt-1">{p.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Adults" type="number" min={1} value={travellers.adults} onChange={e => setTravellers({ ...travellers, adults: Number(e.target.value) })} />
              <Input label="Children" type="number" min={0} value={travellers.children} onChange={e => setTravellers({ ...travellers, children: Number(e.target.value) })} />
              <Select label="Group Type" value={travellers.groupType} onChange={e => setTravellers({ ...travellers, groupType: e.target.value })}>
                <option value="solo">Solo</option><option value="couple">Couple</option><option value="family">Family</option><option value="friends">Friends</option>
              </Select>
            </div>
          </div>
        )}

        {step === 3 && purpose === "business" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900">💼 Meeting Details</h2>
            <p className="text-xs text-slate-400">Schedule will be built around your meetings.</p>
            <div className="grid grid-cols-2 gap-4">
              <Input label="Meeting Name" value={meetingName} onChange={e => setMeetingName(e.target.value)} />
              <Input label="Company" value={company} onChange={e => setCompany(e.target.value)} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Input label="Date" type="date" value={meetingDate} onChange={e => setMeetingDate(e.target.value)} />
              <Input label="Start" type="time" value={meetStart} onChange={e => setMeetStart(e.target.value)} />
              <Input label="End" type="time" value={meetEnd} onChange={e => setMeetEnd(e.target.value)} />
            </div>
            <Input label="Location" value={meetLocation} onChange={e => setMeetLocation(e.target.value)} />
          </div>
        )}

        {step === 3 && purpose !== "business" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2"><Wallet size={16} className="text-blue-600" /> Budget</h2>
            <div className="grid grid-cols-5 gap-2">
              {(["budget", "comfort", "premium", "luxury", "custom"] as const).map(tier => (
                <div key={tier} onClick={() => setBudgetTier(tier)} className={`purpose-card card p-3 text-center cursor-pointer ${budgetTier === tier ? "selected" : ""}`}>
                  <p className="text-xs font-medium text-slate-800 capitalize">{tier}</p>
                </div>
              ))}
            </div>
            <Input label="Total Budget (₹)" type="number" value={customBudget} onChange={e => setCustomBudget(e.target.value)} placeholder="20000" />
            <div className="p-3 bg-slate-50 rounded-lg grid grid-cols-2 gap-3 text-xs">
              {[{ label: "Transport 25%", pct: 0.25 }, { label: "Hotel 40%", pct: 0.4 }, { label: "Food 15%", pct: 0.15 }, { label: "Activities 20%", pct: 0.2 }].map(d => (
                <div key={d.label}><p className="text-slate-400">{d.label}</p><p className="font-semibold text-slate-800">₹{(Number(customBudget) * d.pct).toFixed(0)}</p></div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2"><Plane size={16} className="text-blue-600" /> Choose Transport</h2>
            <div className="space-y-2">
              {MOCK_TRANSPORT.map(t => (
                <div key={t.id} onClick={() => setSelectedTransport(t)} className={`card p-4 flex justify-between items-center cursor-pointer hover:border-blue-400 transition-colors ${selectedTransport.id === t.id ? "border-blue-500 bg-blue-50" : ""}`}>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{t.mode}</span>
                    <h4 className="font-semibold text-slate-900 mt-1 text-sm">{t.provider || "Self Managed"}</h4>
                    <p className="text-xs text-slate-500">{t.duration} · {t.comfort}</p>
                  </div>
                  <div className="text-right"><p className="font-bold text-blue-600">₹{t.cost}</p><p className="text-xs text-slate-400">estimated</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2"><BedDouble size={16} className="text-blue-600" /> Choose Hotel</h2>
            <div className="space-y-2">
              {MOCK_HOTELS.map(h => (
                <div key={h.id} onClick={() => setSelectedHotel(h)} className={`card p-4 flex gap-4 cursor-pointer hover:border-blue-400 transition-colors ${selectedHotel.id === h.id ? "border-blue-500 bg-blue-50" : ""}`}>
                  <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex justify-between">
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">{h.name}</h4>
                      <p className="text-xs text-slate-400">{h.distanceFromCenter} from center</p>
                      <p className="text-xs text-amber-500 font-semibold mt-0.5">★ {h.rating}</p>
                    </div>
                    <div className="text-right"><p className="font-semibold text-sm text-blue-600">₹{h.pricePerNight}/night</p><p className="text-xs text-slate-400">excl. taxes</p></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4 border-t border-slate-200">
          <Button variant="outline" size="md" onClick={() => setStep(s => s - 1)} disabled={step === 1 || loading}>
            <ArrowLeft size={15} /> Back
          </Button>
          {step < 5
            ? <Button variant="primary" size="md" onClick={() => setStep(s => s + 1)}>Next <ArrowRight size={15} /></Button>
            : <Button variant="primary" size="md" onClick={handleSubmit} loading={loading}><Sparkles size={15} /> Generate Trip</Button>
          }
        </div>
      </Card>
    </div>
  );
}
