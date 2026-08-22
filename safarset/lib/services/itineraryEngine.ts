import type { ItineraryDay, Activity, TravelPurpose, TransportOption, Hotel, Meeting } from "@/lib/types";

export interface ItineraryGenerationOptions {
  fromCity: string;
  toCity: string;
  purpose: TravelPurpose;
  tripType: "one-way" | "round-trip";
  startDate: string;
  endDate: string;
  transport: TransportOption;
  hotel?: Hotel;
  meetings?: Meeting[];
}

export function generateSmartItinerary(opts: ItineraryGenerationOptions): ItineraryDay[] {
  const { fromCity, toCity, purpose, tripType, startDate, endDate, transport, hotel, meetings = [] } = opts;
  const cityKey = toCity.toLowerCase().trim();

  // Helper to get formatted dates
  const start = new Date(startDate || "2024-09-12");
  const end = new Date(endDate || "2024-09-14");
  const diffDays = Math.max(2, Math.min(5, Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1));

  const days: ItineraryDay[] = [];

  for (let i = 1; i <= diffDays; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(start.getDate() + (i - 1));
    const dateStr = dayDate.toISOString().split("T")[0];

    const activities: Activity[] = [];

    // ── DAY 1: DEPARTURE, ARRIVAL, CHECK-IN & EVENING EXPLORATION ──
    if (i === 1) {
      activities.push({
        id: `act-1-1`,
        name: `Departure from ${fromCity} via ${transport.provider}`,
        time: transport.departure || "06:30",
        duration: transport.duration,
        location: `${fromCity} Terminal`,
        city: fromCity,
        category: "travel",
        type: "travel",
        estimatedCost: transport.cost,
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80"
      });

      activities.push({
        id: `act-1-2`,
        name: hotel ? `Arrival in ${toCity} & Hotel Check-in at ${hotel.name}` : `Arrival in ${toCity} & Settle-in`,
        time: "12:30",
        duration: "45 min",
        location: hotel ? hotel.location : toCity,
        city: toCity,
        category: "hotel",
        type: "hotel",
        estimatedCost: hotel ? hotel.pricePerNight : 0,
        image: hotel ? hotel.image : "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&q=80"
      });

      activities.push(getDay1Lunch(cityKey, toCity));
      activities.push(getDay1Afternoon(cityKey, toCity, purpose));
      activities.push(getDay1Evening(cityKey, toCity, purpose));
    }

    // ── INTERMEDIATE DAYS: FULL DAY ITINERARY / MEETINGS / SIGHTS ──
    else if (i < diffDays) {
      activities.push({
        id: `act-${i}-1`,
        name: `Breakfast & Daily Preparation in ${toCity}`,
        time: "08:00",
        duration: "1 hr",
        location: hotel ? hotel.name : toCity,
        city: toCity,
        category: "food",
        type: "meal",
        estimatedCost: 300,
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&q=80"
      });

      // Insert Scheduled Business Meeting if applicable
      const dayMeeting = meetings.find(m => m.date === dateStr) || (i === 2 && meetings[0]);
      if (purpose === "business" && dayMeeting) {
        activities.push({
          id: `act-${i}-free-morning`,
          name: `Free Time Slot – Quick Sightseeing & Heritage Exploration`,
          time: "09:30",
          duration: "2 hrs",
          location: toCity,
          city: toCity,
          category: "historical",
          type: "free-time",
          estimatedCost: 150,
          image: getCityImage(cityKey, 1)
        });

        activities.push({
          id: `act-${i}-meeting`,
          name: `💼 ${dayMeeting.name} (${dayMeeting.company})`,
          time: dayMeeting.startTime || "14:00",
          duration: "2 hrs",
          location: dayMeeting.location || `${toCity} Business Center`,
          city: toCity,
          category: "meeting",
          type: "meeting",
          estimatedCost: 0,
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80"
        });
      } else {
        // Full Day Sightseeing & Yatra
        activities.push(getDay2Morning(cityKey, toCity, purpose, i));
        activities.push(getDay2Afternoon(cityKey, toCity, purpose, i));
      }

      activities.push(getDay2Evening(cityKey, toCity, purpose, i));
      activities.push(getDay2Dinner(cityKey, toCity));
    }

    // ── FINAL DAY: CHECKOUT, SOUVENIRS & RETURN JOURNEY ───────────
    else {
      activities.push({
        id: `act-${i}-1`,
        name: `Breakfast & Hotel Checkout`,
        time: "08:30",
        duration: "1.5 hrs",
        location: hotel ? hotel.name : toCity,
        city: toCity,
        category: "hotel",
        type: "hotel",
        estimatedCost: 0,
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500&q=80"
      });

      activities.push(getFinalDayShopping(cityKey, toCity));

      activities.push({
        id: `act-${i}-return`,
        name: tripType === "round-trip" 
          ? `Return Journey to ${fromCity} via ${transport.provider}` 
          : `Journey Conclusion in ${toCity}`,
        time: "15:00",
        duration: transport.duration,
        location: `${toCity} Terminal`,
        city: toCity,
        category: "travel",
        type: "travel",
        estimatedCost: tripType === "round-trip" ? transport.cost : 0,
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=500&q=80"
      });
    }

    days.push({
      day: i,
      date: dateStr,
      city: toCity,
      activities
    });
  }

  return days;
}

// ── CITY-SPECIFIC ACTIVITY GENERATORS ─────────────────────────────

function getDay1Lunch(key: string, city: string): Activity {
  if (key.includes("ahmedabad")) {
    return {
      id: "d1-lunch",
      name: "Authentic Gujarati Thali Lunch at Agashiye (House of MG)",
      time: "13:30",
      duration: "1 hr",
      location: "Opposite Sidi Saiyyed Mosque, Ahmedabad",
      city,
      category: "food",
      type: "meal",
      estimatedCost: 750,
      image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80"
    };
  }
  if (key.includes("udaipur")) {
    return {
      id: "d1-lunch",
      name: "Lakeside Mewari Thali & Dal Baati at Ambrai",
      time: "13:30",
      duration: "1 hr",
      location: "Amet Haveli, Lake Pichola, Udaipur",
      city,
      category: "food",
      type: "meal",
      estimatedCost: 850,
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80"
    };
  }
  if (key.includes("varanasi")) {
    return {
      id: "d1-lunch",
      name: "Traditional Banarasi Satvik Thali & Lassi at Keshari",
      time: "13:30",
      duration: "1 hr",
      location: "Near Vishwanath Gali, Godowlia, Varanasi",
      city,
      category: "food",
      type: "meal",
      estimatedCost: 400,
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80"
    };
  }
  if (key.includes("srinagar") || key.includes("kashmir")) {
    return {
      id: "d1-lunch",
      name: "Authentic Kashmiri Wazwan / Nadru Yakhni at Ahdoos",
      time: "13:30",
      duration: "1 hr",
      location: "Residency Road, Srinagar",
      city,
      category: "food",
      type: "meal",
      estimatedCost: 800,
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&q=80"
    };
  }
  if (key.includes("leh") || key.includes("ladakh")) {
    return {
      id: "d1-lunch",
      name: "Tibetan Butter Tea & Steamed Momos at Tibetan Kitchen",
      time: "13:30",
      duration: "1 hr",
      location: "Fort Road, Leh",
      city,
      category: "food",
      type: "meal",
      estimatedCost: 450,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80"
    };
  }
  if (key.includes("goa")) {
    return {
      id: "d1-lunch",
      name: "Coastal Goan Fish Curry Thali / Curry Meal at Fisherman's Wharf",
      time: "13:30",
      duration: "1 hr",
      location: "Panaji / Calangute, Goa",
      city,
      category: "food",
      type: "meal",
      estimatedCost: 650,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80"
    };
  }
  if (key.includes("andaman")) {
    return {
      id: "d1-lunch",
      name: "Island Fresh Seafood / Coastal Cuisine at Full Moon Cafe",
      time: "13:30",
      duration: "1 hr",
      location: "Havelock Island Beach 5, Andamans",
      city,
      category: "food",
      type: "meal",
      estimatedCost: 700,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80"
    };
  }

  // Generic fallback
  return {
    id: "d1-lunch",
    name: `Local Specialties Lunch in ${city}`,
    time: "13:30",
    duration: "1 hr",
    location: `${city} City Center`,
    city,
    category: "food",
    type: "meal",
    estimatedCost: 500,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&q=80"
  };
}

function getDay1Afternoon(key: string, city: string, purpose: TravelPurpose): Activity {
  if (key.includes("ahmedabad")) {
    return {
      id: "d1-afternoon",
      name: "Sabarmati Ashram (Hriday Kunj) & Gandhi Memorial Museum",
      time: "15:30",
      duration: "1.5 hrs",
      location: "Gandhi Smarak Sangrahalaya, Ashram Road",
      city,
      category: "historical",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=500&q=80"
    };
  }
  if (key.includes("udaipur")) {
    return {
      id: "d1-afternoon",
      name: "City Palace Complex & Crystal Gallery Tour",
      time: "15:00",
      duration: "2.5 hrs",
      location: "Old City, Lake Pichola, Udaipur",
      city,
      category: "historical",
      type: "activity",
      estimatedCost: 350,
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80"
    };
  }
  if (key.includes("varanasi")) {
    return {
      id: "d1-afternoon",
      name: "Shri Kashi Vishwanath Jyotirlinga Darshan & Corridor",
      time: "15:30",
      duration: "2 hrs",
      location: "Lahori Tola, Varanasi",
      city,
      category: "religious",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80"
    };
  }
  if (key.includes("srinagar") || key.includes("kashmir")) {
    return {
      id: "d1-afternoon",
      name: "Dal Lake Shikara Cruise & Floating Post Office",
      time: "15:30",
      duration: "2 hrs",
      location: "Ghat No. 1, Boulevard Road, Srinagar",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 600,
      image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&q=80"
    };
  }
  if (key.includes("delhi")) {
    return {
      id: "d1-afternoon",
      name: "Qutub Minar Complex & Iron Pillar UNESCO Heritage",
      time: "15:30",
      duration: "2 hrs",
      location: "Mehrauli, South Delhi",
      city,
      category: "historical",
      type: "activity",
      estimatedCost: 50,
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=80"
    };
  }
  if (key.includes("leh") || key.includes("ladakh")) {
    return {
      id: "d1-afternoon",
      name: "Acclimatization Walk & Shanti Stupa Sunset View",
      time: "16:00",
      duration: "1.5 hrs",
      location: "Shanti Stupa Hill, Leh",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80"
    };
  }
  if (key.includes("andaman")) {
    return {
      id: "d1-afternoon",
      name: "Historic Cellular Jail National Memorial & Museum Tour",
      time: "15:30",
      duration: "2 hrs",
      location: "Atlanta Point, Port Blair",
      city,
      category: "historical",
      type: "activity",
      estimatedCost: 100,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80"
    };
  }

  return {
    id: "d1-afternoon",
    name: `Top Heritage Landmark Tour in ${city}`,
    time: "15:30",
    duration: "2 hrs",
    location: city,
    city,
    category: "historical",
    type: "activity",
    estimatedCost: 200,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80"
  };
}

function getDay1Evening(key: string, city: string, purpose: TravelPurpose): Activity {
  if (key.includes("ahmedabad")) {
    return {
      id: "d1-evening",
      name: "Evening Sunset Stroll along Sabarmati Riverfront Promenade",
      time: "17:45",
      duration: "1.5 hrs",
      location: "Sabarmati Riverfront Walkway",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80"
    };
  }
  if (key.includes("udaipur")) {
    return {
      id: "d1-evening",
      name: "Sunset Boat Cruise on Lake Pichola to Jag Mandir Palace",
      time: "17:30",
      duration: "1.5 hrs",
      location: "Lake Pichola Jetty",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 450,
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80"
    };
  }
  if (key.includes("varanasi")) {
    return {
      id: "d1-evening",
      name: "Grand Evening Ganga Maha Aarti at Dashashwamedh Ghat",
      time: "18:30",
      duration: "1.5 hrs",
      location: "Dashashwamedh Ghat, Varanasi",
      city,
      category: "religious",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80"
    };
  }
  if (key.includes("goa")) {
    return {
      id: "d1-evening",
      name: "Sunset at Calangute Beach & Shacks Chill",
      time: "17:30",
      duration: "2 hrs",
      location: "Calangute Beach Coast",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80"
    };
  }
  if (key.includes("andaman")) {
    return {
      id: "d1-evening",
      name: "Cellular Jail Sound & Light Show (Veer Savarkar Legend)",
      time: "18:00",
      duration: "1 hr",
      location: "Cellular Jail Complex",
      city,
      category: "entertainment",
      type: "activity",
      estimatedCost: 150,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80"
    };
  }

  return {
    id: "d1-evening",
    name: `Evening Scenic Promenade & Cultural Spot in ${city}`,
    time: "17:30",
    duration: "1.5 hrs",
    location: city,
    city,
    category: "nature",
    type: "activity",
    estimatedCost: 0,
    image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80"
  };
}

function getDay2Morning(key: string, city: string, purpose: TravelPurpose, dayIndex: number): Activity {
  if (key.includes("ahmedabad")) {
    return {
      id: `d${dayIndex}-morning`,
      name: "Adalaj Stepwell (5-Story 15th Century Carved Architecture)",
      time: "09:30",
      duration: "2 hrs",
      location: "Adalaj, Gandhinagar Highway",
      city,
      category: "historical",
      type: "activity",
      estimatedCost: 20,
      image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&q=80"
    };
  }
  if (key.includes("udaipur")) {
    return {
      id: `d${dayIndex}-morning`,
      name: "Sajjangarh (Monsoon Palace) Panoramic Hilltop View",
      time: "09:30",
      duration: "2.5 hrs",
      location: "Monsoon Palace Hill, Udaipur",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 200,
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80"
    };
  }
  if (key.includes("varanasi")) {
    return {
      id: `d${dayIndex}-morning`,
      name: "Subah-e-Banaras Dawn Boat Ride from Assi to Manikarnika Ghat",
      time: "05:45",
      duration: "2 hrs",
      location: "Assi Ghat Riverfront",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 350,
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80"
    };
  }
  if (key.includes("leh") || key.includes("ladakh")) {
    return {
      id: `d${dayIndex}-morning`,
      name: "Drive across Khardung La Pass (17,982 ft) to Nubra Valley",
      time: "08:30",
      duration: "4 hrs",
      location: "Khardung La, Ladakh",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 1500,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80"
    };
  }
  if (key.includes("andaman")) {
    return {
      id: `d${dayIndex}-morning`,
      name: "Radhanagar Beach Pristine White Sands & Lagoon Swim",
      time: "09:00",
      duration: "3 hrs",
      location: "Havelock Beach No. 7",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80"
    };
  }

  return {
    id: `d${dayIndex}-morning`,
    name: `Morning Highlights & Architectural Wonders of ${city}`,
    time: "09:30",
    duration: "2.5 hrs",
    location: city,
    city,
    category: "historical",
    type: "activity",
    estimatedCost: 100,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80"
  };
}

function getDay2Afternoon(key: string, city: string, purpose: TravelPurpose, dayIndex: number): Activity {
  if (key.includes("ahmedabad")) {
    return {
      id: `d${dayIndex}-afternoon`,
      name: "Sidi Saiyyed Mosque (Tree of Life Jali) & Old Walled City Pols",
      time: "14:30",
      duration: "2 hrs",
      location: "Bhadra, Old City, Ahmedabad",
      city,
      category: "historical",
      type: "activity",
      estimatedCost: 0,
      image: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=500&q=80"
    };
  }
  if (key.includes("udaipur")) {
    return {
      id: `d${dayIndex}-afternoon`,
      name: "Saheliyon Ki Bari (Garden of Maidens) & Vintage Car Museum",
      time: "14:30",
      duration: "2 hrs",
      location: "Saheli Marg, Udaipur",
      city,
      category: "historical",
      type: "activity",
      estimatedCost: 250,
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80"
    };
  }
  if (key.includes("varanasi")) {
    return {
      id: `d${dayIndex}-afternoon`,
      name: "Sarnath Buddhist Deer Park & Dhamek Stupa Pilgrimage",
      time: "14:00",
      duration: "2.5 hrs",
      location: "Sarnath (10 km from Varanasi)",
      city,
      category: "religious",
      type: "activity",
      estimatedCost: 100,
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80"
    };
  }

  return {
    id: `d${dayIndex}-afternoon`,
    name: `Afternoon Cultural Experience & Museums in ${city}`,
    time: "14:30",
    duration: "2 hrs",
    location: city,
    city,
    category: "historical",
    type: "activity",
    estimatedCost: 150,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80"
  };
}

function getDay2Evening(key: string, city: string, purpose: TravelPurpose, dayIndex: number): Activity {
  if (key.includes("ahmedabad")) {
    return {
      id: `d${dayIndex}-evening`,
      name: "Law Garden Traditional Night Market (Bandhani & Street Food)",
      time: "18:00",
      duration: "2 hrs",
      location: "Law Garden, Ellisbridge",
      city,
      category: "shopping",
      type: "activity",
      estimatedCost: 500,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80"
    };
  }
  if (key.includes("udaipur")) {
    return {
      id: `d${dayIndex}-evening`,
      name: "Dharohar Rajasthani Folk Dance & Puppet Show at Bagore Ki Haveli",
      time: "19:00",
      duration: "1 hr",
      location: "Gangaur Ghat, Udaipur",
      city,
      category: "entertainment",
      type: "activity",
      estimatedCost: 150,
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80"
    };
  }
  if (key.includes("varanasi")) {
    return {
      id: `d${dayIndex}-evening`,
      name: "Walking Tour of 84 Ghats & Banarasi Paan Experience",
      time: "18:00",
      duration: "1.5 hrs",
      location: "Kashi Ghats Corridor",
      city,
      category: "nature",
      type: "activity",
      estimatedCost: 100,
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80"
    };
  }

  return {
    id: `d${dayIndex}-evening`,
    name: `Evening Bazaar, Local Sweets & Handicrafts in ${city}`,
    time: "18:00",
    duration: "2 hrs",
    location: `${city} Main Market`,
    city,
    category: "shopping",
    type: "activity",
    estimatedCost: 400,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80"
  };
}

function getDay2Dinner(key: string, city: string): Activity {
  return {
    id: "d2-dinner",
    name: `Gourmet Dinner & Local Flavors Experience in ${city}`,
    time: "20:30",
    duration: "1.5 hrs",
    location: `${city} City Center`,
    city,
    category: "food",
    type: "meal",
    estimatedCost: 600,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80"
  };
}

function getFinalDayShopping(key: string, city: string): Activity {
  if (key.includes("ahmedabad")) {
    return {
      id: "final-shopping",
      name: "Manek Chowk Heritage Sweets & Gujarati Khakhra Fafda Packing",
      time: "10:30",
      duration: "1.5 hrs",
      location: "Manek Chowk, Old City",
      city,
      category: "shopping",
      type: "activity",
      estimatedCost: 400,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80"
    };
  }
  if (key.includes("udaipur")) {
    return {
      id: "final-shopping",
      name: "Hathi Pol Bazaar Rajasthani Miniature Paintings & Souvenirs",
      time: "10:30",
      duration: "1.5 hrs",
      location: "Hathi Pol, Udaipur",
      city,
      category: "shopping",
      type: "activity",
      estimatedCost: 600,
      image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80"
    };
  }
  if (key.includes("varanasi")) {
    return {
      id: "final-shopping",
      name: "Banarasi Silk Saree Weavers Colony & Pure Gangajal Packing",
      time: "10:30",
      duration: "1.5 hrs",
      location: "Chowk & Thatheri Bazaar, Varanasi",
      city,
      category: "shopping",
      type: "activity",
      estimatedCost: 800,
      image: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80"
    };
  }

  return {
    id: "final-shopping",
    name: `Local Souvenirs, Handicrafts & Treat Shopping in ${city}`,
    time: "10:30",
    duration: "1.5 hrs",
    location: city,
    city,
    category: "shopping",
    type: "activity",
    estimatedCost: 500,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80"
  };
}

function getCityImage(key: string, index: number): string {
  if (key.includes("udaipur")) return "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80";
  if (key.includes("varanasi")) return "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80";
  if (key.includes("srinagar")) return "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&q=80";
  if (key.includes("leh") || key.includes("ladakh")) return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80";
  if (key.includes("andaman")) return "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80";
  if (key.includes("delhi")) return "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&q=80";
  return "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=500&q=80";
}
