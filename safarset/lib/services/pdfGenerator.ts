import { jsPDF } from "jspdf";
import type { Trip } from "@/lib/types";

export function generateTripPDF(trip: Trip) {
  const doc = new jsPDF();
  
  // Header Banner
  doc.setFillColor(30, 58, 138); // Deep Navy Blue
  doc.rect(0, 0, 210, 36, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("BHARAT PARIKRAMA — SAFARSET", 14, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Pan-India Multi-Modal Itinerary & Command Report", 14, 27);

  // Metadata Box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 42, 182, 34, 3, 3, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(trip.name, 20, 52);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`Route: ${trip.from} -> ${trip.stops.map(s => s.city).join(" -> ")}`, 20, 60);
  doc.text(`Dates: ${trip.startDate} to ${trip.endDate} (${trip.duration})`, 20, 67);
  doc.text(`Purpose: ${trip.purpose.toUpperCase()} | Budget Tier: ${trip.budgetTier.toUpperCase()}`, 110, 60);
  doc.text(`Travellers: ${trip.travellers.adults} Adult(s) (${trip.travellers.groupType})`, 110, 67);

  let y = 84;

  // Selected Transport Section
  if (trip.transport) {
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(14, y, 182, 22, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30, 58, 138);
    doc.text(`PRIMARY TRANSPORTATION: ${trip.transport.mode.toUpperCase()} (${trip.transport.provider || 'Express Corridor'})`, 20, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(`Duration: ${trip.transport.duration}  |  Comfort: ${trip.transport.comfort}  |  Est. Cost: INR ${trip.transport.cost}`, 20, y + 16);
    y += 28;
  }

  // Selected Hotel Section
  if (trip.hotel) {
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(14, y, 182, 22, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(146, 64, 14);
    doc.text(`ACCOMMODATION: ${trip.hotel.name}`, 20, y + 9);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text(`Location: ${trip.hotel.location} (${trip.hotel.distanceFromCenter} from center)  |  Rate: INR ${trip.hotel.pricePerNight}/night  | Rating: ${trip.hotel.rating} Stars`, 20, y + 16);
    y += 28;
  }

  // Business Meetings (if any)
  if (trip.purpose === "business" && trip.meetings.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("SCHEDULED BUSINESS MEETINGS", 14, y);
    y += 6;

    trip.meetings.forEach((m) => {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(14, y, 182, 18, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 58, 138);
      doc.text(`* ${m.name} (${m.company || 'Corporate Client'})`, 20, y + 8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      doc.text(`Date: ${m.date} | Time: ${m.startTime} - ${m.endTime} | Venue: ${m.location}`, 20, y + 14);
      y += 22;
    });
  }

  // Day-Wise Routine Timeline
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("DAY-BY-DAY ROUTINE & FREE-TIME ITINERARY", 14, y);
  y += 8;

  trip.itinerary.forEach((day) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(30, 58, 138);
    doc.rect(14, y, 182, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`DAY ${day.day} — ${day.city.toUpperCase()} (${day.date})`, 18, y + 5);
    y += 11;

    day.activities.forEach((act) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`[${act.time}] ${act.name}`, 20, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`Type: ${act.category.toUpperCase()} | Venue: ${act.location} | Est. Cost: INR ${act.estimatedCost}`, 20, y + 5);
      y += 11;
    });

    y += 4;
  });

  // Footer Branding
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`SafarSet — Plan Karo. Safar Set Karo. | Page ${i} of ${pageCount}`, 14, 290);
  }

  // Save File
  doc.save(`${trip.name.replace(/[^a-zA-Z0-9]/g, "_")}_Itinerary_Report.pdf`);
}
