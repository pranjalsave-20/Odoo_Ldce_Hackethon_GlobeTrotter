import { jsPDF } from "jspdf";
import type { Trip } from "@/lib/types";

// Helper to convert image URL to base64 for jsPDF
async function getBase64ImageFromUrl(imageUrl: string): Promise<string | null> {
  try {
    const res = await fetch(imageUrl);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateTripPDF(trip: Trip) {
  const doc = new jsPDF();
  
  // Try loading official Bharat Parikrama emblem logo
  const logoBase64 = await getBase64ImageFromUrl("/logo.png");

  // Header Banner: Royal Deep Navy Blue
  doc.setFillColor(15, 23, 42); // #0f172a
  doc.rect(0, 0, 210, 38, "F");

  // Accent Gold Line
  doc.setFillColor(217, 119, 6); // #d97706
  doc.rect(0, 38, 210, 2, "F");

  // Add Official Logo to Header
  if (logoBase64) {
    try {
      doc.addImage(logoBase64, "PNG", 14, 6, 26, 26);
    } catch {
      // fallback if error
    }
  }

  const textStartX = logoBase64 ? 46 : 14;

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("BHARAT PARIKRAMA", textStartX, 17);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text("Pan-India Multi-Modal Travel & Itinerary Optimization Platform", textStartX, 25);
  doc.text("Official Verified Travel Itinerary & Command Report", textStartX, 31);

  // Metadata Box
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(14, 46, 182, 34, 3, 3, "FD");

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(trip.name, 20, 56);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(71, 85, 105);
  doc.text(`Route: ${trip.from} -> ${trip.stops.map(s => s.city).join(" -> ")}`, 20, 64);
  doc.text(`Dates: ${trip.startDate} to ${trip.endDate} (${trip.duration})`, 20, 71);
  doc.text(`Purpose: ${trip.purpose.toUpperCase()}  |  Budget Tier: ${trip.budgetTier.toUpperCase()}`, 110, 64);
  doc.text(`Travellers: ${trip.travellers.adults} Adult(s) (${trip.travellers.groupType})`, 110, 71);

  let y = 88;

  // Selected Transport Section
  if (trip.transport) {
    doc.setFillColor(239, 246, 255);
    doc.roundedRect(14, y, 182, 22, 2, 2, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(29, 78, 216);
    doc.text(`PRIMARY TRANSIT: ${trip.transport.mode.toUpperCase()} (${trip.transport.provider || 'Express Corridor'})`, 20, y + 9);
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
  if (trip.purpose === "business" && trip.meetings && trip.meetings.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text("SCHEDULED BUSINESS MEETINGS & COMMITMENTS", 14, y);
    y += 6;

    trip.meetings.forEach((m) => {
      doc.setFillColor(241, 245, 249);
      doc.roundedRect(14, y, 182, 18, 2, 2, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(29, 78, 216);
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
  doc.text("DAY-BY-DAY ROUTINE & SIGHTSEEING ITINERARY", 14, y);
  y += 8;

  trip.itinerary.forEach((day) => {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    doc.setFillColor(15, 23, 42);
    doc.rect(14, y, 182, 7, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`DAY ${day.day} — ${day.city.toUpperCase()} (${day.date})`, 18, y + 5);
    y += 11;

    day.activities.forEach((act) => {
      if (y > 265) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`[${act.time}] ${act.name}`, 20, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(`Type: ${act.category.toUpperCase()} | Location: ${act.location} | Est. Cost: INR ${act.estimatedCost}`, 20, y + 5);
      y += 11;
    });

    y += 4;
  });

  // Footer Branding on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Bharat Parikrama — Pan-India Multi-Modal Travel & Itinerary Optimization | Page ${i} of ${pageCount}`, 14, 290);
  }

  // Save the PDF
  const sanitizedFilename = `Bharat_Parikrama_${trip.name.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(sanitizedFilename);
}
