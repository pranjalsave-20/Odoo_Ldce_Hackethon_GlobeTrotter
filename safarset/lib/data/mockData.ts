import type { Trip, ItineraryDay, Activity, Hotel, TransportOption, Meeting, Restaurant, Place, BudgetSummary } from "@/lib/types";

// ── Mock Trips ────────────────────────────────────────────────────────────────
export const MOCK_TRIPS: Trip[] = [
  {
    id: "trip-1",
    userId: "user-1",
    name: "Mumbai to Ahmedabad – Business",
    from: "Mumbai",
    stops: [{ city: "Ahmedabad", state: "Gujarat", nights: 2 }],
    purpose: "business",
    tripType: "one-way",
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
      { id:"m1", name:"Client Meeting – TechCorp", company:"TechCorp Ltd.", date:"2024-09-13", startTime:"14:00", endTime:"15:30", location:"TechCorp Office, SG Highway, Ahmedabad", notes:"Q3 review" }
    ],
    transport: {
      id:"t1", mode:"flight", from:"Mumbai", to:"Ahmedabad", duration:"1h 15m",
      cost:4500, comfort:"High", provider:"IndiGo", departure:"08:00", arrival:"09:15"
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
        day:1, date:"2024-09-12", city:"Ahmedabad",
        activities: [
          { id:"a1", name:"Arrival – Sardar Vallabhbhai Patel International Airport", category:"travel", time:"09:15", duration:"30 min", location:"Airport", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80", type:"travel" },
          { id:"a2", name:"Hotel Check-in", category:"historical", time:"10:00", duration:"30 min", location:"Hyatt Regency, SG Highway", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80", type:"hotel" },
          { id:"a3", name:"Sabarmati Ashram", category:"historical", time:"11:00", duration:"1.5 hrs", location:"Gandhi Ashram Rd", city:"Ahmedabad", estimatedCost:0, distance:"6 km", travelTime:"20 min", image:"https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80", rating:4.8, openingHours:"8:30 AM – 6:30 PM", type:"activity" },
          { id:"a4", name:"Gujarati Thali Lunch", category:"food", time:"13:00", duration:"1 hr", location:"Agashiye Restaurant", city:"Ahmedabad", estimatedCost:600, distance:"4 km", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", type:"meal" },
          { id:"a5", name:"Adalaj Stepwell", category:"historical", time:"15:00", duration:"1 hr", location:"Adalaj, Gandhinagar", city:"Ahmedabad", estimatedCost:20, distance:"19 km", travelTime:"35 min", image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80", rating:4.7, openingHours:"6 AM – 6 PM", type:"activity" },
          { id:"a6", name:"Dinner at Hotel", category:"food", time:"20:00", duration:"1 hr", location:"Hyatt Regency", city:"Ahmedabad", estimatedCost:1500, image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", type:"meal" },
        ]
      },
      {
        day:2, date:"2024-09-13", city:"Ahmedabad",
        activities: [
          { id:"a7", name:"Breakfast at Hotel", category:"food", time:"08:00", duration:"45 min", location:"Hyatt Regency", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80", type:"meal" },
          { id:"a8", name:"Sabarmati Riverfront", category:"nature", time:"09:30", duration:"1.5 hrs", location:"Sabarmati Riverfront", city:"Ahmedabad", estimatedCost:0, distance:"5 km", image:"https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", rating:4.5, type:"activity" },
          { id:"a9", name:"Free Time / Work Prep", category:"entertainment", time:"11:30", duration:"2 hrs", location:"Hotel", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", type:"free-time" },
          { id:"a10", name:"Lunch – Nearby Café", category:"food", time:"13:00", duration:"45 min", location:"Local Café, SG Highway", city:"Ahmedabad", estimatedCost:400, distance:"1 km", image:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", type:"meal" },
          { id:"a11", name:"CLIENT MEETING – TechCorp", category:"entertainment", time:"14:00", duration:"1.5 hrs", location:"TechCorp Office, SG Highway", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80", type:"meeting" },
          { id:"a12", name:"Kankaria Lake", category:"nature", time:"17:00", duration:"1.5 hrs", location:"Kankaria, Ahmedabad", city:"Ahmedabad", estimatedCost:25, distance:"8 km", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", rating:4.3, type:"activity" },
          { id:"a13", name:"Dinner – Law Garden Night Market", category:"food", time:"20:00", duration:"1.5 hrs", location:"Law Garden", city:"Ahmedabad", estimatedCost:500, distance:"4 km", image:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", type:"meal" },
        ]
      },
      {
        day:3, date:"2024-09-14", city:"Ahmedabad",
        activities: [
          { id:"a14", name:"Breakfast & Checkout", category:"hotel", time:"09:00", duration:"1 hr", location:"Hyatt Regency", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&q=80", type:"hotel" },
          { id:"a15", name:"Manek Chowk & Old City Walk", category:"historical", time:"10:30", duration:"1.5 hrs", location:"Manek Chowk, Old Ahmedabad", city:"Ahmedabad", estimatedCost:200, distance:"6 km", image:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80", rating:4.6, type:"activity" },
          { id:"a16", name:"Departure – Airport", category:"travel", time:"15:00", duration:"30 min", location:"SVPI Airport", city:"Ahmedabad", estimatedCost:0, image:"https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80", type:"travel" },
        ]
      }
    ],
    budget: {
      total: 20000, estimated: 18500, actual: 7200, remaining: 11500,
      categories: [
        { name:"Transport", planned:5000, estimated:4500, actual:4500, color:"#E85D26" },
        { name:"Hotel", planned:8000, estimated:11000, actual:0, color:"#1A3A5C" },
        { name:"Food", planned:3000, estimated:3000, actual:2700, color:"#F5C842" },
        { name:"Activities", planned:1000, estimated:245, actual:0, color:"#10B981" },
        { name:"Taxi/Local", planned:2000, estimated:1500, actual:0, color:"#8B5CF6" },
        { name:"Other", planned:1000, estimated:255, actual:0, color:"#6B7280" },
      ]
    }
  },
  {
    id: "trip-2",
    userId: "user-1",
    name: "Rajasthan Heritage Tour",
    from: "Delhi",
    stops: [{ city:"Jaipur", state:"Rajasthan", nights:2 }, { city:"Udaipur", state:"Rajasthan", nights:2 }],
    purpose: "leisure",
    tripType: "round-trip",
    startDate: "2024-10-18",
    endDate: "2024-10-23",
    duration: "6 Days / 5 Nights",
    travellers: { adults:2, children:0, seniors:0, groupType:"couple" },
    budgetTier: "premium",
    budgetAmount: 60000,
    status: "upcoming",
    coverImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    meetings: [],
    itinerary: [],
    budget: { total:60000, estimated:54000, actual:0, remaining:60000, categories:[] },
    createdAt: "2024-08-15",
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
  { id:"tr3", mode:"train", from:"Mumbai", to:"Ahmedabad", duration:"6h 00m", cost:1200, comfort:"Medium", provider:"Shatabdi Express", departure:"06:25", arrival:"12:25" },
  { id:"tr4", mode:"train", from:"Mumbai", to:"Ahmedabad", duration:"7h 30m", cost:850, comfort:"Medium", provider:"Rajdhani Express", departure:"22:05", arrival:"05:35" },
  { id:"tr5", mode:"bus", from:"Mumbai", to:"Ahmedabad", duration:"8h 00m", cost:900, comfort:"Low", provider:"VRL Travels" },
  { id:"tr6", mode:"car", from:"Mumbai", to:"Ahmedabad", duration:"9h 00m", cost:3000, comfort:"High", provider:"Self Drive" },
];

// ── Mock Restaurants ──────────────────────────────────────────────────────────
export const MOCK_RESTAURANTS: Restaurant[] = [
  { id:"r1", name:"Agashiye – House of MG", rating:4.8, reviewCount:3200, distance:"4.2 km", costPerPerson:800, cuisine:"Gujarati", category:["vegetarian","local-cuisine","fine-dining"], popularDishes:["Gujarati Thali","Undhiyu","Fafda Gathiya"], openingHours:"12:00 PM – 3 PM, 7 PM – 10 PM", image:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", city:"Ahmedabad" },
  { id:"r2", name:"Vishala Village Restaurant", rating:4.7, reviewCount:2100, distance:"8 km", costPerPerson:600, cuisine:"Gujarati Village Style", category:["vegetarian","local-cuisine","family-restaurant"], popularDishes:["Dal Baati","Bajra Rotla","Kadhi"], openingHours:"7 PM – 11 PM", image:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80", city:"Ahmedabad" },
  { id:"r3", name:"Green House Café", rating:4.4, reviewCount:890, distance:"0.8 km", costPerPerson:350, cuisine:"Multi-cuisine", category:["vegetarian","cafe","budget-food"], popularDishes:["Cold Coffee","Sandwiches","Pasta"], openingHours:"8 AM – 10 PM", image:"https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80", city:"Ahmedabad" },
  { id:"r4", name:"Mirch Masala", rating:4.2, reviewCount:1560, distance:"2.1 km", costPerPerson:400, cuisine:"North Indian & Street Food", category:["non-vegetarian","street-food","budget-food"], popularDishes:["Butter Chicken","Naan","Pav Bhaji"], openingHours:"11 AM – 11 PM", image:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", city:"Ahmedabad" },
];

// ── Mock Places ───────────────────────────────────────────────────────────────
export const MOCK_PLACES: Place[] = [
  { id:"p1", name:"Sabarmati Ashram", category:"historical", city:"Ahmedabad", rating:4.8, distance:"6 km", duration:"1.5 hrs", estimatedCost:0, openingHours:"8:30 AM – 6:30 PM", image:"https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=400&q=80", description:"Mahatma Gandhi's residence and spiritual center on the banks of Sabarmati River.", tags:["Heritage","Free Entry","Must Visit"] },
  { id:"p2", name:"Adalaj Stepwell", category:"historical", city:"Ahmedabad", rating:4.7, distance:"19 km", duration:"1 hr", estimatedCost:20, openingHours:"6 AM – 6 PM", image:"https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80", description:"Magnificent 5-story stepwell built in 1499, a masterpiece of Indo-Islamic architecture.", tags:["Heritage","Architecture","Photography"] },
  { id:"p3", name:"Sabarmati Riverfront", category:"nature", city:"Ahmedabad", rating:4.5, distance:"5 km", duration:"1.5 hrs", estimatedCost:0, openingHours:"6 AM – 10 PM", image:"https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80", description:"Beautiful waterfront promenade perfect for evening walks, cycling and street food.", tags:["Riverfront","Free Entry","Evening Spot"] },
  { id:"p4", name:"Kankaria Lake", category:"entertainment", city:"Ahmedabad", rating:4.3, distance:"8 km", duration:"2 hrs", estimatedCost:25, openingHours:"9 AM – 9 PM", image:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", description:"Iconic 15th-century lake with zoo, toy train, water rides and amusement facilities.", tags:["Family","Boating","Zoo"] },
  { id:"p5", name:"Old City Heritage Walk", category:"historical", city:"Ahmedabad", rating:4.6, distance:"4 km", duration:"2 hrs", estimatedCost:50, openingHours:"7 AM – 7 PM", image:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&q=80", description:"Explore the UNESCO-listed walled city with its pol houses, mosques and temples.", tags:["UNESCO","Heritage","Walking Tour"] },
  { id:"p6", name:"Law Garden Night Market", category:"shopping", city:"Ahmedabad", rating:4.2, distance:"4.5 km", duration:"1.5 hrs", estimatedCost:500, openingHours:"5 PM – 11 PM", image:"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80", description:"Vibrant night market selling traditional Gujarati clothes, handicrafts and street food.", tags:["Shopping","Street Food","Handicrafts"] },
  { id:"p7", name:"Amer Fort", category:"historical", city:"Jaipur", rating:4.8, distance:"11 km", duration:"2.5 hrs", estimatedCost:200, openingHours:"8 AM – 5:30 PM", image:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80", description:"Majestic Rajput fort perched on a hilltop with stunning views and intricate architecture.", tags:["Fort","UNESCO","Rajasthan"] },
  { id:"p8", name:"City Palace Udaipur", category:"historical", city:"Udaipur", rating:4.7, distance:"2 km", duration:"2 hrs", estimatedCost:300, openingHours:"9:30 AM – 5:30 PM", image:"https://images.unsplash.com/photo-1587295656906-b09049e6f74d?w=400&q=80", description:"Grand palace complex on the shores of Lake Pichola, showcasing Rajput architecture.", tags:["Palace","Lake View","Royal"] },
];

// ── Mock Community Trips ──────────────────────────────────────────────────────
export const MOCK_COMMUNITY: import("@/lib/types").CommunityTrip[] = [
  { id:"ct1", userId:"u2", userName:"Priya Sharma", userAvatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80", title:"Golden Triangle in 6 Days", route:"Delhi → Agra → Jaipur → Delhi", purpose:"leisure", duration:"6 Days", likes:234, copies:89, coverImage:"https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", highlights:["Taj Mahal","Amer Fort","Qutub Minar"], budgetTier:"comfort", createdAt:"2024-08-01" },
  { id:"ct2", userId:"u3", userName:"Rahul Verma", title:"Mumbai Weekend Escape to Goa", route:"Mumbai → Goa", purpose:"leisure", duration:"3 Days", likes:456, copies:178, coverImage:"https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80", highlights:["Baga Beach","Old Goa Churches","Spice Plantation"], budgetTier:"budget", createdAt:"2024-07-20" },
  { id:"ct3", userId:"u4", userName:"Anita Patel", userAvatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80", title:"Varanasi – Spiritual Journey", route:"Delhi → Varanasi → Prayagraj", purpose:"devotional", duration:"4 Days", likes:189, copies:67, coverImage:"https://images.unsplash.com/photo-1561361058-c24cecae35ca?w=600&q=80", highlights:["Ganga Aarti","Kashi Vishwanath","Morning Boat Ride"], budgetTier:"budget", createdAt:"2024-07-15" },
  { id:"ct4", userId:"u5", userName:"Vikram Singh", title:"Leh-Ladakh Bike Trip", route:"Delhi → Manali → Leh → Pangong", purpose:"adventure", duration:"10 Days", likes:892, copies:312, coverImage:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", highlights:["Pangong Lake","Khardung La","Magnetic Hill"], budgetTier:"comfort", createdAt:"2024-06-10" },
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
