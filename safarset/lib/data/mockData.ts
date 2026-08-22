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
    startDate: "2024-09-12",
    endDate: "2024-09-14",
    duration: "3 Days / 2 Nights",
    travellers: { adults: 1, children: 0, seniors: 0, groupType: "solo" },
    budgetTier: "comfort",
    budgetAmount: 20000,
    status: "upcoming",
    coverImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    isPublic: false,
    createdAt: "2024-08-20",
    meetings: [
      { id:"m1", name:"Client Review Meeting – TechCorp", company:"TechCorp India", date:"2024-09-13", startTime:"14:00", endTime:"15:30", location:"TechCorp Office, SG Highway, Ahmedabad", notes:"Q3 Strategy Review" }
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
        day: 1, date: "2024-09-12", city: "Ahmedabad",
        activities: [
          { id:"a1", name:"Departure from Mumbai Central via Vande Bharat Express", category:"travel", time:"06:00", duration:"5h 25m", location:"Mumbai Central Station", city:"Mumbai", estimatedCost:1450, image:"https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80", type:"travel" },
          { id:"a2", name:"Arrival & Hotel Check-in at Hyatt Regency", category:"hotel", time:"12:00", duration:"45 min", location:"Hyatt Regency, SG Highway", city:"Ahmedabad", estimatedCost:5500, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", type:"hotel" },
          { id:"a3", name:"Authentic Gujarati Thali Lunch", category:"food", time:"13:00", duration:"1 hr", location:"Agashiye, House of MG", city:"Ahmedabad", estimatedCost:600, distance:"4 km", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", type:"meal" },
          { id:"a4", name:"Sabarmati Ashram Visit", category:"historical", time:"15:00", duration:"1.5 hrs", location:"Gandhi Ashram Rd", city:"Ahmedabad", estimatedCost:0, distance:"6 km", travelTime:"20 min", image:"https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80", rating:4.8, type:"activity" },
          { id:"a5", name:"Evening Walk along Sabarmati Riverfront Promenade", category:"nature", time:"17:30", duration:"1.5 hrs", location:"Sabarmati Riverfront", city:"Ahmedabad", estimatedCost:0, distance:"3 km", image:"https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", rating:4.6, type:"activity" },
        ]
      },
      {
        day: 2, date: "2024-09-13", city: "Ahmedabad",
        activities: [
          { id:"a6", name:"Breakfast at Hotel & Work Prep", category:"food", time:"08:00", duration:"1 hr", location:"Hyatt Regency", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80", type:"meal" },
          { id:"a7", name:"Free Time Slot – Adalaj Stepwell Exploration", category:"historical", time:"09:30", duration:"2 hrs", location:"Adalaj, Gandhinagar", city:"Ahmedabad", estimatedCost:20, distance:"12 km", image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80", rating:4.7, type:"free-time" },
          { id:"a8", name:"💼 Client Review Meeting – TechCorp India", category:"meeting", time:"14:00", duration:"1.5 hrs", location:"TechCorp Office, SG Highway", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", type:"meeting" },
          { id:"a9", name:"Law Garden Night Market & Traditional Handicrafts", category:"shopping", time:"18:30", duration:"2 hrs", location:"Law Garden", city:"Ahmedabad", estimatedCost:400, distance:"4 km", image:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", type:"meal" }
        ]
      },
      {
        day: 3, date: "2024-09-14", city: "Ahmedabad",
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
  }
];

// ── Mock Hotels ───────────────────────────────────────────────────────────────
export const MOCK_HOTELS: Hotel[] = [
  { id:"h1", name:"Hyatt Regency Ahmedabad", stars:5, rating:4.6, reviewCount:2340, location:"SG Highway, Ahmedabad", city:"Ahmedabad", distanceFromCenter:"3.2 km", pricePerNight:5500, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80", amenities:["Free WiFi","Pool","Gym","Restaurant","Airport Shuttle","Spa"], tags:["Business Friendly","5 Star","Pool","Luxury"] },
  { id:"h2", name:"The Grand Bhagwati", stars:4, rating:4.3, reviewCount:1820, location:"S.G. Highway, Ahmedabad", city:"Ahmedabad", distanceFromCenter:"4.1 km", pricePerNight:3800, image:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80", amenities:["Free WiFi","Restaurant","Banquet","Bar","Parking"], tags:["Business Friendly","4 Star","Wedding Venue"] },
  { id:"h3", name:"Hotel Klassik Radiance", stars:3, rating:4.0, reviewCount:856, location:"Paldi, Ahmedabad", city:"Ahmedabad", distanceFromCenter:"2.8 km", pricePerNight:1800, image:"https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=600&q=80", amenities:["Free WiFi","Restaurant","Parking","AC"], tags:["Budget Friendly","3 Star","City Center"] },
  { id:"h4", name:"Courtyard by Marriott", stars:4, rating:4.4, reviewCount:2100, location:"Ramdev Nagar, Ahmedabad", city:"Ahmedabad", distanceFromCenter:"3.8 km", pricePerNight:4200, image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", amenities:["Free WiFi","Pool","Gym","Restaurant","Business Center"], tags:["Business Friendly","4 Star","Pool","Corporate"] },
];

// ── Mock Transport Options ────────────────────────────────────────────────────
export const MOCK_TRANSPORT: TransportOption[] = [
  { id:"tr1", mode:"flight", from:"Mumbai", to:"Ahmedabad", duration:"1h 15m", cost:4500, comfort:"High", provider:"IndiGo", departure:"08:00", arrival:"09:15" },
  { id:"tr2", mode:"flight", from:"Mumbai", to:"Ahmedabad", duration:"1h 20m", cost:5200, comfort:"High", provider:"Air India", departure:"11:00", arrival:"12:20" },
  { id:"tr3", mode:"train", from:"Mumbai", to:"Ahmedabad", duration:"5h 25m", cost:1450, comfort:"High", provider:"Vande Bharat Express", departure:"06:00", arrival:"11:25" },
  { id:"tr4", mode:"train", from:"Mumbai", to:"Ahmedabad", duration:"6h 30m", cost:850, comfort:"Medium", provider:"Karnavati Express", departure:"13:40", arrival:"20:10" },
  { id:"tr5", mode:"bus", from:"Mumbai", to:"Ahmedabad", duration:"8h 00m", cost:900, comfort:"Low", provider:"VRL Travels Multi-Axle" },
  { id:"tr6", mode:"car", from:"Mumbai", to:"Ahmedabad", duration:"8h 30m", cost:3200, comfort:"High", provider:"Expressway Cab" },
];

// ── Mock Places ───────────────────────────────────────────────────────────────
export const MOCK_PLACES: Place[] = [
  { id:"p1", name:"Sabarmati Ashram", category:"historical", city:"Ahmedabad", rating:4.8, distance:"6 km", duration:"1.5 hrs", estimatedCost:0, openingHours:"8:30 AM – 6:30 PM", image:"https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=500&q=80", description:"Mahatma Gandhi's spiritual center and historic residence on the banks of Sabarmati River.", tags:["Heritage","Free Entry","Must Visit"] },
  { id:"p2", name:"Adalaj Stepwell", category:"historical", city:"Ahmedabad", rating:4.7, distance:"12 km", duration:"1 hr", estimatedCost:20, openingHours:"6 AM – 6 PM", image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&q=80", description:"5-story intricate carved subterranean stepwell built in 1499, an architectural wonder.", tags:["Heritage","Architecture","Photography"] },
  { id:"p3", name:"Sabarmati Riverfront Promenade", category:"nature", city:"Ahmedabad", rating:4.5, distance:"3 km", duration:"1.5 hrs", estimatedCost:0, openingHours:"6 AM – 10 PM", image:"https://images.unsplash.com/photo-1548013146-72479768bada?w=500&q=80", description:"Beautiful waterfront walkway perfect for evening strolls, cycling, and cool breeze.", tags:["Riverfront","Free Entry","Evening Spot"] },
  { id:"p4", name:"Kankaria Lake & Entertainment Hub", category:"entertainment", city:"Ahmedabad", rating:4.3, distance:"7 km", duration:"2 hrs", estimatedCost:25, openingHours:"9 AM – 9 PM", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80", description:"Historic circular lake with zoo, toy train, water rides and street food stalls.", tags:["Family","Boating","Zoo"] },
  { id:"p5", name:"Law Garden Traditional Night Market", category:"shopping", city:"Ahmedabad", rating:4.2, distance:"4 km", duration:"1.5 hrs", estimatedCost:400, openingHours:"5 PM – 11 PM", image:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80", description:"Vibrant marketplace for authentic Gujarati chaniya cholis, bandhani, and street chaat.", tags:["Shopping","Street Food","Handicrafts"] },
  { id:"p6", name:"Kashi Vishwanath Temple & Ganga Ghats", category:"religious", city:"Varanasi", rating:5.0, distance:"2 km", duration:"3 hrs", estimatedCost:0, openingHours:"3 AM – 11 PM", image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=500&q=80", description:"One of the 12 sacred Jyotirlingas, overlooking the holy River Ganga with evening Aarti.", tags:["Spiritual","Jyotirlinga","Ganga Aarti"] },
  { id:"p7", name:"Amer Fort & Palace", category:"historical", city:"Jaipur", rating:4.8, distance:"11 km", duration:"2.5 hrs", estimatedCost:200, openingHours:"8 AM – 5:30 PM", image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=500&q=80", description:"Majestic hilltop Rajput fort with grand courtyards and Sheesh Mahal mirror palace.", tags:["Fort","UNESCO","Rajasthan"] },
  { id:"p8", name:"City Palace & Lake Pichola", category:"historical", city:"Udaipur", rating:4.7, distance:"2 km", duration:"2 hrs", estimatedCost:300, openingHours:"9:30 AM – 5:30 PM", image:"https://images.unsplash.com/photo-1587295656906-b09049e6f74d?w=500&q=80", description:"Grand royal palace complex overlooking the scenic calm waters of Lake Pichola.", tags:["Palace","Lake View","Royal"] },
];

// ── Mock Restaurants ──────────────────────────────────────────────────────────
export const MOCK_RESTAURANTS: Restaurant[] = [
  { id:"r1", name:"Agashiye – House of MG", rating:4.8, reviewCount:3200, distance:"4.2 km", costPerPerson:800, cuisine:"Gujarati", category:["vegetarian","local-cuisine","fine-dining"], popularDishes:["Gujarati Thali","Undhiyu","Fafda Gathiya"], openingHours:"12:00 PM – 3 PM, 7 PM – 10 PM", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", city:"Ahmedabad" },
  { id:"r2", name:"Vishala Village Dining", rating:4.7, reviewCount:2100, distance:"8 km", costPerPerson:600, cuisine:"Gujarati Village Style", category:["vegetarian","local-cuisine","family-restaurant"], popularDishes:["Dal Baati","Bajra Rotla","Kadhi"], openingHours:"7 PM – 11 PM", image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", city:"Ahmedabad" }
];

// ── Mock Community Trips ──────────────────────────────────────────────────────
export const MOCK_COMMUNITY: import("@/lib/types").CommunityTrip[] = [
  { id:"ct1", userId:"u2", userName:"Priya Sharma", userAvatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80", title:"Golden Triangle in 6 Days", route:"Delhi → Agra → Jaipur → Delhi", purpose:"leisure", duration:"6 Days", likes:234, copies:89, coverImage:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", highlights:["Taj Mahal","Amer Fort","Qutub Minar"], budgetTier:"comfort", createdAt:"2024-08-01" },
  { id:"ct2", userId:"u3", userName:"Rahul Verma", title:"Mumbai Weekend Escape to Goa", route:"Mumbai → Goa", purpose:"leisure", duration:"3 Days", likes:456, copies:178, coverImage:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", highlights:["Baga Beach","Old Goa Churches","Spice Plantation"], budgetTier:"budget", createdAt:"2024-07-20" },
  { id:"ct3", userId:"u4", userName:"Anita Patel", userAvatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80", title:"Varanasi – Spiritual Yatra", route:"Delhi → Varanasi → Prayagraj", purpose:"devotional", duration:"4 Days", likes:189, copies:67, coverImage:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80", highlights:["Ganga Aarti","Kashi Vishwanath","Morning Boat Ride"], budgetTier:"budget", createdAt:"2024-07-15" },
];

// ── Popular Destinations ──────────────────────────────────────────────────────
export const POPULAR_DESTINATIONS = [
  { city:"Goa", state:"Goa", image:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80", tag:"Beaches" },
  { city:"Jaipur", state:"Rajasthan", image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80", tag:"Heritage" },
  { city:"Udaipur", state:"Rajasthan", image:"https://images.unsplash.com/photo-1587295656906-b09049e6f74d?w=400&q=80", tag:"Royal Lakes" },
  { city:"Shimla", state:"Himachal Pradesh", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", tag:"Hills" },
  { city:"Varanasi", state:"Uttar Pradesh", image:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=400&q=80", tag:"Spiritual" },
  { city:"Kerala", state:"Kerala", image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", tag:"Backwaters" },
];
