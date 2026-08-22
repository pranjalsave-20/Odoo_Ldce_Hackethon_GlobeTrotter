import type { Trip, ItineraryDay, Activity, Hotel, TransportOption, Meeting, Restaurant, Place, Guide, LocalCab, BudgetSummary } from "@/lib/types";

// ── Mock Local Cabs (Uber / Ola Style) ───────────────────────────────────────
export const MOCK_LOCAL_CABS: LocalCab[] = [
  {
    id: "cab-1",
    driverName: "Rameshwar Patel",
    driverPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    vehicleModel: "Maruti Suzuki Dzire (AC)",
    vehicleType: "Sedan",
    vehicleNumber: "GJ-01-AB-4821",
    rating: 4.9,
    tripsCount: 1420,
    etaMinutes: 3,
    pricePerKm: 14,
    baseFare: 120,
    city: "Ahmedabad",
    phone: "+91 98250 12345",
    isAvailable: true
  },
  {
    id: "cab-2",
    driverName: "Suresh Sharma",
    driverPhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    vehicleModel: "Toyota Innova Crysta",
    vehicleType: "SUV",
    vehicleNumber: "DL-01-CZ-9912",
    rating: 4.8,
    tripsCount: 2180,
    etaMinutes: 6,
    pricePerKm: 22,
    baseFare: 250,
    city: "Delhi",
    phone: "+91 98110 56789",
    isAvailable: true
  },
  {
    id: "cab-3",
    driverName: "Vikram Rathod",
    driverPhoto: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&q=80",
    vehicleModel: "Bajaj CNG Auto Rickshaw",
    vehicleType: "Auto Rickshaw",
    vehicleNumber: "GJ-01-RX-3341",
    rating: 4.9,
    tripsCount: 3450,
    etaMinutes: 2,
    pricePerKm: 9,
    baseFare: 50,
    city: "Ahmedabad",
    phone: "+91 99040 44556",
    isAvailable: true
  },
  {
    id: "cab-4",
    driverName: "Amitabh Sen",
    driverPhoto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    vehicleModel: "Tata Tigor EV (Green Cab)",
    vehicleType: "Electric Cab",
    vehicleNumber: "MH-02-EV-7721",
    rating: 5.0,
    tripsCount: 890,
    etaMinutes: 4,
    pricePerKm: 16,
    baseFare: 150,
    city: "Mumbai",
    phone: "+91 98200 99887",
    isAvailable: true
  },
  {
    id: "cab-5",
    driverName: "Kailash Gehlot",
    driverPhoto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    vehicleModel: "Hyundai Aura (AC)",
    vehicleType: "Sedan",
    vehicleNumber: "RJ-27-TA-1190",
    rating: 4.9,
    tripsCount: 1750,
    etaMinutes: 5,
    pricePerKm: 15,
    baseFare: 130,
    city: "Udaipur",
    phone: "+91 94140 88990",
    isAvailable: true
  },
  {
    id: "cab-6",
    driverName: "Tenzin Norbu",
    driverPhoto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    vehicleModel: "Mahindra Scorpio 4x4",
    vehicleType: "SUV",
    vehicleNumber: "LA-02-B-9901",
    rating: 5.0,
    tripsCount: 1120,
    etaMinutes: 8,
    pricePerKm: 25,
    baseFare: 400,
    city: "Leh",
    phone: "+91 94190 22334",
    isAvailable: true
  }
];

// ── Mock Local Tour Guides ──────────────────────────────────────────────────
export const MOCK_GUIDES: Guide[] = [
  {
    id: "g1",
    name: "Aarti Dave",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
    languages: ["Hindi", "English", "Gujarati"],
    city: "Ahmedabad",
    specialization: ["Heritage Walks", "Sabarmati Ashram", "Pol Architecture", "Textile History"],
    experience: 8,
    rating: 4.9,
    reviewCount: 312,
    pricePerHour: 450,
    bio: "Certified Gujarat Tourism guide with 8 years of experience showing travelers the UNESCO Old Walled City.",
    verified: true,
    phone: "+91 98790 11223"
  },
  {
    id: "g2",
    name: "Pandit Rajesh Shastri",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    languages: ["Hindi", "Sanskrit", "English"],
    city: "Varanasi",
    specialization: ["Ganga Aarti Significance", "Kashi Vishwanath Yatra", "Vedic Rituals", "Ghats History"],
    experience: 15,
    rating: 5.0,
    reviewCount: 540,
    pricePerHour: 600,
    bio: "Lifelong Kashi resident and Sanskrit scholar guiding pilgrims across 84 holy Ghats.",
    verified: true,
    phone: "+91 94150 77889"
  },
  {
    id: "g3",
    name: "Mahipal Singh Chouhan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    languages: ["Hindi", "English", "Rajasthani"],
    city: "Udaipur",
    specialization: ["City Palace History", "Mewar Royal Dynasty", "Lake Pichola Legends", "Miniature Painting"],
    experience: 11,
    rating: 4.9,
    reviewCount: 428,
    pricePerHour: 550,
    bio: "Mewar heritage storyteller and certified guide in Udaipur City Palace & Jag Mandir.",
    verified: true,
    phone: "+91 98290 44332"
  },
  {
    id: "g4",
    name: "Captain Robert Fernandez",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    languages: ["English", "Hindi", "Bengali"],
    city: "Andaman & Nicobar",
    specialization: ["Scuba & Snorkeling", "Havelock Island Trail", "Coral Reef Ecology", "Cellular Jail History"],
    experience: 10,
    rating: 5.0,
    reviewCount: 490,
    pricePerHour: 700,
    bio: "Certified PADI divemaster and licensed island guide exploring the pristine waters of Swaraj Dweep.",
    verified: true,
    phone: "+91 94342 88776"
  },
  {
    id: "g5",
    name: "Meera Nair",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    languages: ["English", "Hindi", "Malayalam", "Tamil"],
    city: "Kochi",
    specialization: ["Backwaters Culture", "Spice Plantations", "Kathakali Arts", "Culinary Trail"],
    experience: 6,
    rating: 4.8,
    reviewCount: 220,
    pricePerHour: 500,
    bio: "Passionate storyteller and culinary historian guiding experiential journeys in God's Own Country.",
    verified: true,
    phone: "+91 94470 33445"
  }
];

// ── Mock Trips ────────────────────────────────────────────────────────────────
export const MOCK_TRIPS: Trip[] = [
  {
    id: "trip-1",
    userId: "user-1",
    name: "Mumbai to Ahmedabad – Business & Heritage",
    from: "Mumbai",
    stops: [{ city: "Ahmedabad", state: "Gujarat", nights: 2 }],
    purpose: "business",
    tripType: "round-trip",
    startDate: "2026-09-12",
    endDate: "2026-09-14",
    duration: "3 Days / 2 Nights",
    travellers: { adults: 1, children: 0, seniors: 0, groupType: "solo" },
    budgetTier: "comfort",
    budgetAmount: 20000,
    status: "upcoming",
    coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    isPublic: false,
    createdAt: "2026-08-20",
    meetings: [
      { id:"m1", name:"Client Review Meeting – TechCorp", company:"TechCorp India", date:"2026-09-13", startTime:"14:00", endTime:"15:30", location:"TechCorp Office, SG Highway, Ahmedabad", notes:"Q3 Strategy Review" }
    ],
    transport: {
      id:"tr-vb", mode:"train", from:"Mumbai", to:"Ahmedabad", duration:"5h 25m",
      cost:1450, comfort:"High", provider:"Vande Bharat Express (20901)", departure:"06:00", arrival:"11:25"
    },
    hotel: {
      id:"h1", name:"Hyatt Regency Ahmedabad", stars:5, rating:4.6, reviewCount:2340,
      location:"SG Highway", city:"Ahmedabad", distanceFromCenter:"3.2 km",
      pricePerNight:5500, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      amenities:["Free WiFi","Pool","Gym","Restaurant","Airport Shuttle"],
      tags:["Business Friendly","5 Star","Pool"]
    },
    itinerary: [
      {
        day: 1, date: "2026-09-12", city: "Ahmedabad",
        activities: [
          { id:"a1", name:"Departure from Mumbai Central via Vande Bharat Express", category:"travel", time:"06:00", duration:"5h 25m", location:"Mumbai Central Station", city:"Mumbai", estimatedCost:1450, image:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80", type:"travel" },
          { id:"a2", name:"Arrival & Hotel Check-in at Hyatt Regency", category:"hotel", time:"12:00", duration:"45 min", location:"Hyatt Regency, SG Highway", city:"Ahmedabad", estimatedCost:5500, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", type:"hotel" },
          { id:"a3", name:"Authentic Gujarati Thali Lunch", category:"food", time:"13:00", duration:"1 hr", location:"Agashiye, House of MG", city:"Ahmedabad", estimatedCost:600, distance:"4 km", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", type:"meal" },
          { id:"a4", name:"Sabarmati Ashram Visit", category:"historical", time:"15:00", duration:"1.5 hrs", location:"Gandhi Ashram Rd", city:"Ahmedabad", estimatedCost:0, distance:"6 km", travelTime:"20 min", image:"https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80", rating:4.8, type:"activity" },
          { id:"a5", name:"Evening Walk along Sabarmati Riverfront Promenade", category:"nature", time:"17:30", duration:"1.5 hrs", location:"Sabarmati Riverfront", city:"Ahmedabad", estimatedCost:0, distance:"3 km", image:"https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", rating:4.6, type:"activity" },
        ]
      },
      {
        day: 2, date: "2026-09-13", city: "Ahmedabad",
        activities: [
          { id:"a6", name:"Breakfast at Hotel & Work Prep", category:"food", time:"08:00", duration:"1 hr", location:"Hyatt Regency", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80", type:"meal" },
          { id:"a7", name:"Free Time Slot – Adalaj Stepwell Exploration", category:"historical", time:"09:30", duration:"2 hrs", location:"Adalaj, Gandhinagar", city:"Ahmedabad", estimatedCost:20, distance:"12 km", image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80", rating:4.7, type:"free-time" },
          { id:"a8", name:"💼 Client Review Meeting – TechCorp India", category:"meeting", time:"14:00", duration:"1.5 hrs", location:"TechCorp Office, SG Highway", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", type:"meeting" },
          { id:"a9", name:"Law Garden Night Market & Traditional Handicrafts", category:"shopping", time:"18:30", duration:"2 hrs", location:"Law Garden", city:"Ahmedabad", estimatedCost:400, distance:"4 km", image:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", type:"meal" }
        ]
      },
      {
        day: 3, date: "2026-09-14", city: "Ahmedabad",
        activities: [
          { id:"a10", name:"Hotel Checkout & Local Cab to Kalupur Station", category:"travel", time:"10:30", duration:"45 min", location:"Ahmedabad Railway Station", city:"Ahmedabad", estimatedCost:250, image:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80", type:"travel" },
          { id:"a11", name:"Return Vande Bharat Express to Mumbai", category:"travel", time:"14:00", duration:"5h 25m", location:"Mumbai Central", city:"Mumbai", estimatedCost:1450, image:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80", type:"travel" }
        ]
      }
    ],
    budget: {
      total: 20000, estimated: 16500, actual: 2900, remaining: 17100,
      categories: [
        { name: "Transport", planned: 4000, estimated: 2900, actual: 2900, color: "#1e40af" },
        { name: "Hotel Stay", planned: 12000, estimated: 11000, actual: 0, color: "#0f172a" },
        { name: "Meals & Dining", planned: 3000, estimated: 1800, actual: 0, color: "#d97706" },
        { name: "Local Cabs & Guides", planned: 1000, estimated: 800, actual: 0, color: "#10b981" }
      ]
    }
  },
  {
    id: "trip-2",
    userId: "user-1",
    name: "Delhi to Varanasi – Sacred Ganga Aarti & Kashi Yatra",
    from: "Delhi",
    stops: [{ city: "Varanasi", state: "Uttar Pradesh", nights: 3 }],
    purpose: "devotional",
    tripType: "round-trip",
    startDate: "2026-10-05",
    endDate: "2026-10-08",
    duration: "4 Days / 3 Nights",
    travellers: { adults: 2, children: 0, seniors: 0, groupType: "couple" },
    budgetTier: "comfort",
    budgetAmount: 28000,
    status: "upcoming",
    coverImage: "https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=800&q=80",
    isPublic: true,
    createdAt: "2026-08-21",
    meetings: [],
    transport: {
      id:"tr-varanasi-vb", mode:"train", from:"Delhi", to:"Varanasi", duration:"8h 00m",
      cost:1750, comfort:"High", provider:"Vande Bharat Express (22436)", departure:"06:00", arrival:"14:00"
    },
    hotel: {
      id:"h5", name:"BrijRama Palace Varanasi", stars:5, rating:4.9, reviewCount:1420,
      location:"Darbhanga Ghat", city:"Varanasi", distanceFromCenter:"1.2 km",
      pricePerNight:7500, image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
      amenities:["Free WiFi","Ghat View","Vegetarian Fine Dining"],
      tags:["Spiritual","Heritage Palace","Ganga View"]
    },
    itinerary: [
      {
        day: 1, date: "2026-10-05", city: "Varanasi",
        activities: [
          { id:"v1", name:"Vande Bharat Express from New Delhi to Varanasi Junction", category:"travel", time:"06:00", duration:"8 hrs", location:"New Delhi Railway Station", city:"Delhi", estimatedCost:1750, type:"travel", image:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80" },
          { id:"v2", name:"Boat Transfer & Check-in at BrijRama Palace", category:"hotel", time:"14:30", duration:"1 hr", location:"Darbhanga Ghat", city:"Varanasi", estimatedCost:7500, type:"hotel", image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80" },
          { id:"v3", name:"Dashashwamedh Ghat Evening Ganga Maha Aarti", category:"religious", time:"18:30", duration:"2 hrs", location:"Dashashwamedh Ghat", city:"Varanasi", estimatedCost:0, type:"activity", image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80" }
        ]
      }
    ],
    budget: {
      total: 28000, estimated: 22500, actual: 3500, remaining: 24500,
      categories: [
        { name: "Transport", planned: 6000, estimated: 3500, actual: 3500, color: "#1e40af" },
        { name: "Hotel Stay", planned: 15000, estimated: 15000, actual: 0, color: "#0f172a" },
        { name: "Devotional & Meals", planned: 7000, estimated: 4000, actual: 0, color: "#d97706" }
      ]
    }
  },
  {
    id: "trip-3",
    userId: "user-1",
    name: "Delhi to Srinagar & Gulmarg – Kashmir Paradise",
    from: "Delhi",
    stops: [{ city: "Srinagar", state: "Jammu & Kashmir", nights: 3 }],
    purpose: "leisure",
    tripType: "round-trip",
    startDate: "2026-10-18",
    endDate: "2026-10-21",
    duration: "4 Days / 3 Nights",
    travellers: { adults: 2, children: 1, seniors: 0, groupType: "family" },
    budgetTier: "premium",
    budgetAmount: 45000,
    status: "upcoming",
    coverImage: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80",
    isPublic: true,
    createdAt: "2026-08-21",
    meetings: [],
    transport: {
      id:"tr-srinagar-flight", mode:"flight", from:"Delhi", to:"Srinagar", duration:"1h 35m",
      cost:4800, comfort:"High", provider:"Air India AI-825", departure:"08:15", arrival:"09:50"
    },
    hotel: {
      id:"h6", name:"The Lalit Grand Palace Srinagar", stars:5, rating:4.9, reviewCount:980,
      location:"Gupkar Road", city:"Srinagar", distanceFromCenter:"2.8 km",
      pricePerNight:8900, image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
      amenities:["Dal Lake View","Heated Pool","Heritage Palace","Gardens"],
      tags:["Heritage Palace","Dal Lake","Luxury 5 Star"]
    },
    itinerary: [
      {
        day: 1, date: "2026-10-18", city: "Srinagar",
        activities: [
          { id:"s1", name:"Flight to Srinagar Sheikh Ul-Alam International Airport", category:"travel", time:"08:15", duration:"1h 35m", location:"IGI Airport T3", city:"Delhi", estimatedCost:4800, type:"travel", image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80" },
          { id:"s2", name:"Dal Lake Sunset Shikara Ride to Floating Gardens", category:"nature", time:"16:00", duration:"2 hrs", location:"Dal Lake Ghat 7", city:"Srinagar", estimatedCost:800, type:"activity", image:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=500&q=80" }
        ]
      }
    ],
    budget: {
      total: 45000, estimated: 38000, actual: 9600, remaining: 35400,
      categories: [
        { name: "Flights", planned: 12000, estimated: 9600, actual: 9600, color: "#1e40af" },
        { name: "Heritage Hotel", planned: 24000, estimated: 22000, actual: 0, color: "#0f172a" },
        { name: "Sightseeing & Food", planned: 9000, estimated: 6400, actual: 0, color: "#10b981" }
      ]
    }
  }
];

// ── Mock Hotels Across Pan-India & Islands ────────────────────────────────────
export const MOCK_HOTELS: Hotel[] = [
  { 
    id:"h1", name:"Hyatt Regency Ahmedabad", stars:5, rating:4.6, reviewCount:2340, 
    location:"SG Highway, Ahmedabad", city:"Ahmedabad", distanceFromCenter:"3.2 km", 
    pricePerNight:5500, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", 
    amenities:["Free WiFi","Pool","Gym","Restaurant","Airport Shuttle","Spa"], 
    tags:["Business Friendly","5 Star","Pool","Luxury"],
    description:"Luxury 5-star riverfront business hotel with gourmet dining and executive suites."
  },
  { 
    id:"h2", name:"The Grand Bhagwati", stars:4, rating:4.3, reviewCount:1820, 
    location:"S.G. Highway, Ahmedabad", city:"Ahmedabad", distanceFromCenter:"4.1 km", 
    pricePerNight:3800, image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", 
    amenities:["Free WiFi","Restaurant","Banquet","Parking"], 
    tags:["Business Friendly","4 Star","Pure Veg"],
    description:"Renowned 4-star pure vegetarian hotel with expansive event spaces."
  },
  { 
    id:"h3", name:"The Oberoi Udaivilas", stars:5, rating:5.0, reviewCount:3410, 
    location:"Haridas Ji Ki Magri, Udaipur", city:"Udaipur", distanceFromCenter:"2.5 km", 
    pricePerNight:9800, image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", 
    amenities:["Free WiFi","Infinity Pool","Royal Spa","Lakeside Dining","Butler Service"], 
    tags:["Heritage","Luxury 5 Star","Lake Pichola View"],
    description:"World-renowned palace hotel on the shores of Lake Pichola with majestic architecture."
  },
  { 
    id:"h4", name:"Taj Exotica Resort & Spa, Andamans", stars:5, rating:5.0, reviewCount:1890, 
    location:"Radhanagar Beach, Havelock Island", city:"Andaman & Nicobar", distanceFromCenter:"0.2 km from Beach", 
    pricePerNight:12500, image:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80", 
    amenities:["Private Beach Access","Luxury Villas","Scuba Center","Ayurvedic Spa"], 
    tags:["Island Resort","5 Star Luxury","Private Beach"],
    description:"Eco-luxury villa resort spread over 46 acres on the pristine white sands of Radhanagar Beach."
  },
  { 
    id:"h5", name:"The Grand Dragon Ladakh", stars:5, rating:4.9, reviewCount:2140, 
    location:"Old Road Sheynam, Leh", city:"Leh", distanceFromCenter:"1.0 km", 
    pricePerNight:7200, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", 
    amenities:["Oxygen Enriched Rooms","Heated Floors","Mountain View Dining","Solar Powered"], 
    tags:["Eco-Luxury","Himalayan View","Oxygen Fitted"],
    description:"Premier eco-friendly luxury hotel in Leh with panoramic views of the Stok Kangri mountain range."
  },
  { 
    id:"h6", name:"BrijRama Palace Varanasi", stars:5, rating:4.9, reviewCount:1940, 
    location:"Darbhanga Ghat, Varanasi", city:"Varanasi", distanceFromCenter:"1.2 km", 
    pricePerNight:7500, image:"https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80", 
    amenities:["Free WiFi","Ghat View","Vegetarian Fine Dining","Boat Transfer"], 
    tags:["Spiritual","Heritage Palace","Ganga View"],
    description:"Historic 18th-century palace hotel on the holy banks of Ganges."
  }
];

// ── Mock Transport Options ────────────────────────────────────────────────────
export const MOCK_TRANSPORT: TransportOption[] = [
  { id:"tr1", mode:"flight", from:"Mumbai", to:"Ahmedabad", duration:"1h 15m", cost:4500, comfort:"High", provider:"IndiGo 6E-5012", departure:"08:00", arrival:"09:15" },
  { id:"tr2", mode:"train", from:"Mumbai", to:"Ahmedabad", duration:"5h 25m", cost:1450, comfort:"High", provider:"Vande Bharat Express (20901)", departure:"06:00", arrival:"11:25" },
  { id:"tr3", mode:"bus", from:"Mumbai", to:"Ahmedabad", duration:"8h 00m", cost:900, comfort:"Medium", provider:"Zingbus Multi-Axle Sleeper", departure:"22:00", arrival:"06:00" },
  { id:"tr4", mode:"car", from:"Mumbai", to:"Ahmedabad", duration:"8h 30m", cost:3200, comfort:"High", provider:"Expressway Cab / Self Drive", departure:"Flexible", arrival:"Flexible" },
];

// ── Helper to dynamically generate Pan-India transit for any route ───────────
export function getTransportOptionsForRoute(from: string, to: string) {
  const isIsland = to.toLowerCase().includes("andaman") || to.toLowerCase().includes("lakshadweep") || from.toLowerCase().includes("andaman") || from.toLowerCase().includes("lakshadweep");

  return [
    {
      id: `fl-${from}-${to}`,
      mode: "flight" as const,
      from,
      to,
      duration: isIsland ? "2h 45m" : "1h 35m",
      cost: isIsland ? 6800 : 4600,
      comfort: "High" as const,
      provider: `IndiGo / Air India Direct (${from.slice(0,3).toUpperCase()} → ${to.slice(0,3).toUpperCase()})`,
      departure: "07:30",
      arrival: isIsland ? "10:15" : "09:05",
      rating: 4.8,
      tag: "Fastest"
    },
    {
      id: `tr-${from}-${to}`,
      mode: isIsland ? ("flight" as const) : ("train" as const),
      from,
      to,
      duration: isIsland ? "3h 10m" : "6h 15m",
      cost: isIsland ? 5900 : 1450,
      comfort: "High" as const,
      provider: isIsland ? "Akasa Air Island Hopper" : "Vande Bharat Express Corridors",
      departure: "06:00",
      arrival: isIsland ? "09:10" : "12:15",
      rating: 4.9,
      tag: "Best Value"
    },
    {
      id: `bus-${from}-${to}`,
      mode: "bus" as const,
      from,
      to,
      duration: "10h 30m",
      cost: 850,
      comfort: "Medium" as const,
      provider: `Zingbus Luxury Multi-Axle Sleeper`,
      departure: "20:00",
      arrival: "06:30",
      rating: 4.2,
      tag: "Cheapest"
    },
    {
      id: `car-${from}-${to}`,
      mode: "car" as const,
      from,
      to,
      duration: "9h 00m",
      cost: 3100,
      comfort: "High" as const,
      provider: `Expressway Cab / Self Drive`,
      departure: "Flexible",
      arrival: "Flexible",
      rating: 4.5,
      tag: "Flexible"
    }
  ];
}

// ── Mock Places Across Pan-India & Islands ────────────────────────────────────
export const MOCK_PLACES: Place[] = [
  { id:"p1", name:"Sabarmati Ashram", category:"historical", city:"Ahmedabad", rating:4.8, distance:"6 km", duration:"1.5 hrs", estimatedCost:0, openingHours:"8:30 AM – 6:30 PM", image:"https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=500&q=80", description:"Mahatma Gandhi's spiritual center and historic residence on the banks of Sabarmati River.", tags:["Heritage","Free Entry","Must Visit"] },
  { id:"p2", name:"City Palace & Lake Pichola", category:"historical", city:"Udaipur", rating:4.9, distance:"2 km", duration:"2.5 hrs", estimatedCost:300, openingHours:"9:30 AM – 5:30 PM", image:"https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&q=80", description:"Grand royal palace complex overlooking the scenic calm waters of Lake Pichola.", tags:["Palace","Lake View","Royal Heritage"] },
  { id:"p3", name:"Pangong Tso & Khardung La", category:"nature", city:"Leh", rating:5.0, distance:"140 km", duration:"Full Day", estimatedCost:1500, openingHours:"Open All Day", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", description:"High-altitude salt water lake that changes colors throughout the day, nestled at 14,270 ft.", tags:["Himalayas","High Altitude","Adventure"] },
  { id:"p4", name:"Radhanagar Beach & Scuba Diving", category:"nature", city:"Andaman & Nicobar", rating:5.0, distance:"10 km", duration:"3 hrs", estimatedCost:1200, openingHours:"6 AM – 6 PM", image:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&q=80", description:"Crowned Time Magazine's Best Beach in Asia with turquoise waters, powdery sand & coral reefs.", tags:["Beaches","Scuba Diving","Islands"] },
  { id:"p5", name:"Agatti Island Lagoon & Coral Atoll", category:"nature", city:"Lakshadweep", rating:5.0, distance:"2 km", duration:"3 hrs", estimatedCost:800, openingHours:"6 AM – 7 PM", image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80", description:"Breathtaking turquoise lagoon with vibrant coral reefs, sea turtles, and kayak waters.", tags:["Islands","Snorkeling","Coral Reef"] },
  { id:"p6", name:"Kashi Vishwanath Temple & Ganga Ghats", category:"religious", city:"Varanasi", rating:5.0, distance:"2 km", duration:"3 hrs", estimatedCost:0, openingHours:"3 AM – 11 PM", image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80", description:"One of the 12 sacred Jyotirlingas, overlooking the holy River Ganga with evening Aarti.", tags:["Spiritual","Jyotirlinga","Ganga Aarti"] },
  { id:"p7", name:"Harmandir Sahib (Golden Temple)", category:"religious", city:"Amritsar", rating:5.0, distance:"1 km", duration:"2.5 hrs", estimatedCost:0, openingHours:"24 Hours Open", image:"https://images.unsplash.com/photo-1609137144822-4467c6670868?w=500&q=80", description:"Most sacred Sikh shrine gilded in pure gold, offering 24/7 world's largest community Langar.", tags:["Spiritual","Golden Temple","Must Visit"] },
  { id:"p8", name:"Shri Ram Janmabhoomi Mandir", category:"religious", city:"Ayodhya", rating:5.0, distance:"2 km", duration:"3 hrs", estimatedCost:0, openingHours:"6 AM – 10 PM", image:"https://images.unsplash.com/photo-1609137144822-4467c6670868?w=500&q=80", description:"Grand Nagara-style temple consecrated at the birthplace of Lord Shri Ram.", tags:["Spiritual","Ayodhya Yatra","Temple"] },
];

// ── Mock Restaurants ──────────────────────────────────────────────────────────
export const MOCK_RESTAURANTS: Restaurant[] = [
  { id:"r1", name:"Agashiye – House of MG", rating:4.8, reviewCount:3200, distance:"4.2 km", costPerPerson:800, cuisine:"Gujarati", category:["vegetarian","local-cuisine","fine-dining"], popularDishes:["Gujarati Thali","Undhiyu","Fafda Gathiya"], openingHours:"12:00 PM – 3 PM, 7 PM – 10 PM", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", city:"Ahmedabad" },
  { id:"r2", name:"Vishala Village Dining", rating:4.7, reviewCount:2100, distance:"8 km", costPerPerson:600, cuisine:"Gujarati Village Style", category:["vegetarian","local-cuisine","family-restaurant"], popularDishes:["Dal Baati","Bajra Rotla","Kadhi"], openingHours:"7 PM – 11 PM", image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", city:"Ahmedabad" }
];

// ── Mock Community Trips ──────────────────────────────────────────────────────
export const MOCK_COMMUNITY: import("@/lib/types").CommunityTrip[] = [
  { id:"ct1", userId:"u2", userName:"Priya Sharma", userAvatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80", title:"Golden Triangle in 6 Days", route:"Delhi → Agra → Jaipur → Delhi", purpose:"leisure", duration:"6 Days", likes:234, copies:89, coverImage:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", highlights:["Taj Mahal","Amer Fort","Qutub Minar"], budgetTier:"comfort", createdAt:"2024-08-01" },
  { id:"ct2", userId:"u3", userName:"Rahul Verma", title:"Leh-Ladakh Mountain Circuit", route:"Delhi → Leh → Pangong → Nubra", purpose:"adventure", duration:"7 Days", likes:672, copies:240, coverImage:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", highlights:["Pangong Lake","Khardung La","Nubra Valley"], budgetTier:"comfort", createdAt:"2024-07-20" },
  { id:"ct3", userId:"u4", userName:"Anita Patel", userAvatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80", title:"Andaman Island Expedition", route:"Chennai → Port Blair → Havelock", purpose:"leisure", duration:"5 Days", likes:512, copies:198, coverImage:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", highlights:["Radhanagar Beach","Scuba Diving","Cellular Jail"], budgetTier:"premium", createdAt:"2024-07-15" },
];

// ── Popular Destinations ──────────────────────────────────────────────────────
export const POPULAR_DESTINATIONS = [
  { city:"Leh", state:"Ladakh", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", tag:"High Himalayas" },
  { city:"Andaman Islands", state:"Andaman & Nicobar", image:"https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", tag:"Tropical Islands" },
  { city:"Lakshadweep", state:"Lakshadweep", image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", tag:"Coral Lagoons" },
  { city:"Udaipur", state:"Rajasthan", image:"https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=600&q=80", tag:"Royal Lakes & Palaces" },
  { city:"Srinagar", state:"Jammu & Kashmir", image:"https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=600&q=80", tag:"Alpine Valleys" },
  { city:"Varanasi", state:"Uttar Pradesh", image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80", tag:"Spiritual Ghats" },
  { city:"Goa", state:"Goa", image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", tag:"Coastal Beaches" },
  { city:"Jaipur", state:"Rajasthan", image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80", tag:"Heritage Forts" },
];
