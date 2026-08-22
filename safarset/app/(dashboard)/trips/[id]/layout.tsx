"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useTrips } from "@/lib/context/TripsContext";
import { Card } from "@/components/ui/index";
import Link from "next/link";
import { Calendar, MapPin, Wallet, Sparkles, Navigation, Info, FileDown, BookOpen } from "lucide-react";
import type { Trip } from "@/lib/types";
import { generateTripPDF } from "@/lib/services/pdfGenerator";
import { useToast } from "@/components/ui/Toast";

export default function TripWorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { getTrip } = useTrips();
  const router = useRouter();
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    const t = getTrip(resolvedParams.id);
    if (!t) {
      router.push("/trips");
    } else {
      setTrip(t);
    }
  }, [resolvedParams.id, getTrip, router]);

  if (!trip) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Info, path: `/trips/${trip.id}/overview` },
    { id: "itinerary", label: "Itinerary & Routine", icon: Calendar, path: `/trips/${trip.id}/itinerary` },
    { id: "budget", label: "Budget Planner", icon: Wallet, path: `/trips/${trip.id}/budget` },
    { id: "emergency", label: "Emergency Assist", icon: Navigation, path: `/trips/${trip.id}/emergency` },
    { id: "memories", label: "Memories & Journal", icon: BookOpen, path: `/trips/${trip.id}/memories` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Trip workspace header banner */}
      <Card className="p-6 relative overflow-hidden bg-slate-900 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-slate-800 shadow-xl">
        {trip.coverImage && (
          <img src={trip.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" alt="" />
        )}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-blue-600 text-white text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              {trip.purpose}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {trip.from} → {trip.stops.map(s => s.city).join(" → ")}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">{trip.name}</h1>
          <p className="text-xs text-slate-300 flex items-center gap-1">
            <Calendar size={14} className="text-blue-400" /> {trip.startDate} to {trip.endDate} ({trip.duration})
          </p>
        </div>

        <div className="relative flex gap-2.5 flex-wrap">
          <ButtonVariantShare trip={trip} />
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto pb-1 gap-6">
        {tabs.map((tab) => {
          const isSelected = typeof window !== "undefined" && window.location.pathname.endsWith(tab.id);
          return (
            <Link key={tab.id} href={tab.path} className="block flex-shrink-0">
              <span className={`pb-3 text-sm font-bold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-900"
              }`}>
                <tab.icon size={16} /> {tab.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div>{children}</div>
    </div>
  );
}

function ButtonVariantShare({ trip }: { trip: Trip }) {
  const { addToast } = useToast();
  
  const handleExportPDF = () => {
    addToast("success", "Generating full PDF report...");
    try {
      generateTripPDF(trip);
      addToast("success", "PDF Report downloaded successfully! 📄");
    } catch (err) {
      addToast("error", "Failed to generate PDF. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          addToast("success", "Workspace link copied to clipboard!");
        }}
        className="px-4 py-2 border border-slate-700 bg-slate-800/80 rounded-xl text-xs font-bold hover:bg-slate-700 transition-colors flex items-center gap-1.5"
      >
        Share Link
      </button>
      <button
        onClick={handleExportPDF}
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold text-white transition-all shadow-md flex items-center gap-1.5"
      >
        <FileDown size={15} /> Export PDF Report
      </button>
    </>
  );
}
