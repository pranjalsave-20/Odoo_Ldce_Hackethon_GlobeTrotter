"use client";
import React, { useState, use } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button, Input, Badge } from "@/components/ui/index";
import { useToast } from "@/components/ui/Toast";
import { 
  Car, UserCheck, Star, MapPin, Phone, ShieldCheck, Clock, CheckCircle2, 
  Navigation, Sparkles, Award, Zap, ArrowRight, DollarSign 
} from "lucide-react";
import { MOCK_LOCAL_CABS, MOCK_GUIDES } from "@/lib/data/mockData";
import type { LocalCab, Guide } from "@/lib/types";

export default function LocalServicesPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { getTrip } = useTrips();
  const { addToast } = useToast();
  const trip = getTrip(resolvedParams.id);

  // Cab Booking States
  const [pickup, setPickup] = useState("Sardar Vallabhbhai Patel Airport (AMD)");
  const [dropoff, setDropoff] = useState("Hyatt Regency, SG Highway");
  const [selectedCab, setSelectedCab] = useState<LocalCab>(MOCK_LOCAL_CABS[0]);
  const [bookedCab, setBookedCab] = useState<LocalCab | null>(null);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Guide Booking States
  const [hiredGuide, setHiredGuide] = useState<Guide | null>(null);
  const [selectedHours, setSelectedHours] = useState(3);

  const handleBookCab = async () => {
    setBookingLoading(true);
    addToast("success", `Connecting with nearest driver: ${selectedCab.driverName}...`);
    await new Promise(r => setTimeout(r, 1200));
    setBookedCab(selectedCab);
    setBookingLoading(false);
    addToast("success", `Ride Confirmed! ${selectedCab.driverName} is arriving in ${selectedCab.etaMinutes} mins in ${selectedCab.vehicleModel} (${selectedCab.vehicleNumber})! 🚖`);
  };

  const handleHireGuide = (guide: Guide) => {
    setHiredGuide(guide);
    addToast("success", `Guide Booked! ${guide.name} has been reserved for ${selectedHours} hours (₹${guide.pricePerHour * selectedHours}). Contact details sent via SMS/WhatsApp! 📜`);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6 rounded-3xl shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-black uppercase tracking-wider bg-blue-500/30 text-blue-200 px-3 py-1 rounded-full border border-blue-400/30">
            Local Transport & Guides Marketplace
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Book Trusted Local Cabs & Heritage Guides
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Support local livelihoods in {trip?.stops[0]?.city || "India"}. Book verified drivers with guaranteed meter rates and certified local guides for customized walks.
          </p>
        </div>
      </div>

      {/* ── SECTION 1: INSTANT LOCAL CAB BOOKING (UBER STYLE) ─────── */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              <Car size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Instant Local Cab Booking</h3>
              <p className="text-xs text-slate-500">Real-time local drivers ready for instant pickup</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <Zap size={13} className="fill-current" /> Instant Dispatch Active
          </span>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          
          {/* Left: Pickup & Vehicle Selection */}
          <div className="lg:col-span-7 space-y-4">
            
            <Card className="p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Set Route</h4>
              <div className="space-y-2.5">
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={pickup}
                    onChange={e => setPickup(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Enter pickup point"
                  />
                </div>
                <div className="relative">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={dropoff}
                    onChange={e => setDropoff(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl"
                    placeholder="Enter destination"
                  />
                </div>
              </div>
            </Card>

            {/* Vehicle Options Grid */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Choose Ride Type</h4>
              
              {MOCK_LOCAL_CABS.map(cab => {
                const isSelected = selectedCab.id === cab.id;
                const estFare = cab.baseFare + (cab.pricePerKm * 10);
                return (
                  <div
                    key={cab.id}
                    onClick={() => setSelectedCab(cab)}
                    className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/70 shadow-sm ring-2 ring-blue-500/20"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden relative flex-shrink-0 border border-slate-200">
                        <img src={cab.driverPhoto} alt={cab.driverName} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-slate-900">{cab.vehicleModel}</h5>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {cab.vehicleType}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">
                          Driver: <span className="font-semibold text-slate-800">{cab.driverName}</span> • ⭐ {cab.rating} ({cab.tripsCount} trips)
                        </p>
                        <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                          <Clock size={12} /> {cab.etaMinutes} mins away ({cab.vehicleNumber})
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-black text-slate-900">₹{estFare}</p>
                      <p className="text-[10px] text-slate-400">Est. Total</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleBookCab}
              loading={bookingLoading}
              className="w-full py-3.5 text-sm font-black uppercase tracking-wider bg-blue-700 hover:bg-blue-800 rounded-2xl shadow-md"
            >
              Confirm & Book {selectedCab.vehicleType} Now
            </Button>

          </div>

          {/* Right: Live Ride Status & Safety Guarantee */}
          <div className="lg:col-span-5 space-y-4">
            
            {bookedCab ? (
              <Card className="p-6 space-y-4 border-2 border-emerald-500 bg-emerald-50/20">
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-600" />
                    <h4 className="font-black text-sm text-emerald-950">Ride Confirmed!</h4>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold">
                    Arriving in {bookedCab.etaMinutes} Mins
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <img src={bookedCab.driverPhoto} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-emerald-400" />
                  <div>
                    <h5 className="font-black text-base text-slate-900">{bookedCab.driverName}</h5>
                    <p className="text-xs text-slate-600 font-semibold">{bookedCab.vehicleModel} • {bookedCab.vehicleNumber}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-bold">
                      <Phone size={12} className="text-emerald-700" /> {bookedCab.phone}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs space-y-1">
                  <p className="text-slate-500">Route: <span className="font-bold text-slate-800">{pickup} → {dropoff}</span></p>
                  <p className="text-slate-500">Meter Rate: <span className="font-bold text-slate-800">₹{bookedCab.pricePerKm}/km (Cash / UPI to driver)</span></p>
                </div>

                <Button variant="outline" size="sm" onClick={() => setBookedCab(null)} className="w-full">
                  Cancel Booking
                </Button>
              </Card>
            ) : (
              <Card className="p-6 space-y-4 bg-slate-50 border border-slate-200">
                <h4 className="font-black text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-blue-700" /> Bharat Parikrama Safe Ride Promise
                </h4>
                <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>100% Verified local commercial drivers with valid background checks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Zero surge pricing guarantee during festival / peak business hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Pay directly to driver via UPI QR or Cash upon reaching destination.</span>
                  </li>
                </ul>
              </Card>
            )}

          </div>

        </div>

      </div>

      {/* ── SECTION 2: VERIFIED LOCAL TOUR GUIDES ─────────────────── */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              <UserCheck size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">Certified Local Tour Guides</h3>
              <p className="text-xs text-slate-500">Certified storytellers, historians & temple priests</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 hidden sm:inline">Booking Duration:</span>
            <select
              value={selectedHours}
              onChange={e => setSelectedHours(Number(e.target.value))}
              className="text-xs font-bold bg-white border border-slate-300 rounded-xl px-3 py-1.5"
            >
              <option value={2}>2 Hours Tour</option>
              <option value={3}>3 Hours (Half Day)</option>
              <option value={6}>6 Hours (Full Day)</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_GUIDES.map(guide => {
            const isHired = hiredGuide?.id === guide.id;
            const totalFee = guide.pricePerHour * selectedHours;
            return (
              <Card key={guide.id} className="p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-all border border-slate-200">
                <div className="space-y-3">
                  
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden relative border border-slate-200 flex-shrink-0">
                      <img src={guide.avatar} alt={guide.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-black text-sm text-slate-900">{guide.name}</h4>
                        {guide.verified && (
                          <span title="Verified Tour Guide">
                            <Award size={15} className="text-blue-700 fill-blue-100" />
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium">📍 {guide.city} • {guide.experience} yrs exp</p>
                      <p className="text-xs font-bold text-amber-600 mt-0.5">
                        ⭐ {guide.rating} ({guide.reviewCount} reviews)
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{guide.bio}</p>

                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Languages</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.languages.map(lang => (
                        <span key={lang} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {guide.specialization.map(spec => (
                        <span key={spec} className="text-[10px] bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded font-semibold">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-base font-black text-slate-900">₹{totalFee}</span>
                    <span className="text-[11px] text-slate-400"> / {selectedHours} hrs</span>
                  </div>

                  {isHired ? (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 size={13} /> Reserved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleHireGuide(guide)}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                    >
                      Hire Guide
                    </button>
                  )}
                </div>

              </Card>
            );
          })}
        </div>

      </div>

    </div>
  );
}
