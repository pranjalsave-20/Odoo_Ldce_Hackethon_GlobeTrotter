"use client";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useTrips } from "@/lib/context/TripsContext";
import { Card } from "@/components/ui/index";
import Link from "next/link";
import { Calendar, MapPin, Wallet, Sparkles, Navigation, Info, FileDown, BookOpen } from "lucide-react";
import type { Trip } from "@/lib/types";

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
        <div className="w-8 h-8 border-4 border-[#E85D26] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: Info, path: `/trips/${trip.id}/overview` },
    { id: "itinerary", label: "Itinerary", icon: Calendar, path: `/trips/${trip.id}/itinerary` },
    { id: "budget", label: "Budget Planner", icon: Wallet, path: `/trips/${trip.id}/budget` },
    { id: "emergency", label: "Emergency Assist", icon: Navigation, path: `/trips/${trip.id}/emergency` },
    { id: "memories", label: "Memories & Journal", icon: BookOpen, path: `/trips/${trip.id}/memories` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Trip workspace header banner */}
      <Card className="p-6 relative overflow-hidden bg-[#1A3A5C] text-white flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {trip.coverImage && (
          <img src={trip.coverImage} className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" alt="" />
        )}
        <div className="relative space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#E85D26] text-white text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
              {trip.purpose}
            </span>
            <span className="text-xs text-blue-200">
              {trip.from} → {trip.stops.map(s => s.city).join(" → ")}
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">{trip.name}</h1>
          <p className="text-xs text-blue-200 flex items-center gap-1">
            <Calendar size={14} /> {trip.startDate} to {trip.endDate} ({trip.duration})
          </p>
        </div>

        <div className="relative flex gap-2 flex-wrap">
          <ButtonVariantShare trip={trip} />
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex border-b border-[#E5E0D8] overflow-x-auto pb-1 gap-6">
        {tabs.map((tab) => {
          const isSelected = typeof window !== "undefined" && window.location.pathname.endsWith(tab.id);
          return (
            <Link key={tab.id} href={tab.path} className="block flex-shrink-0">
              <span className={`pb-3 text-sm font-semibold flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                isSelected
                  ? "border-[#E85D26] text-[#E85D26]"
                  : "border-transparent text-[#6B7280] hover:text-[#1C1C1E]"
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

// Inline mini action component
import { useToast } from "@/components/ui/Toast";
function ButtonVariantShare({ trip }: { trip: Trip }) {
  const { addToast } = useToast();
  
  const handleExportPDF = () => {
    addToast("success", "PDF generation started. Preparing trip summary...");
    // Import jsPDF dynamically
    import("jspdf").then(({ jsPDF }) => {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.text("SafarSet Trip Summary", 14, 20);
      doc.setFont("helvetica", "normal");
      doc.text(`Trip Name: ${trip.name}`, 14, 30);
      doc.text(`From: ${trip.from}`, 14, 40);
      doc.text(`Dates: ${trip.startDate} to ${trip.endDate}`, 14, 50);
      doc.text(`Transport: ${trip.transport?.provider || "None"} (${trip.transport?.mode || "N/A"})`, 14, 60);
      doc.text(`Hotel: ${trip.hotel?.name || "None"}`, 14, 70);
      doc.text(`Total Budget: INR ${trip.budget?.total || 0}`, 14, 80);
      doc.save(`SafarSet-${trip.name.replace(/\s+/g, "-")}.pdf`);
      addToast("success", "PDF Downloaded! 🎉");
    }).catch(err => {
      addToast("error", "Error creating PDF document");
    });
  };

  return (
    <>
      <button
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          addToast("success", "Shareable workspace link copied!");
        }}
        className="px-4 py-2 border border-white/20 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors flex items-center gap-1.5"
      >
        Share Workspace
      </button>
      <button
        onClick={handleExportPDF}
        className="px-4 py-2 bg-[#E85D26] hover:bg-[#C44A1A] rounded-xl text-sm font-semibold text-white transition-colors flex items-center gap-1.5"
      >
        <FileDown size={14} /> Export PDF
      </button>
    </>
  );
}
