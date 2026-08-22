export interface PlaceRecommendation {
  id: string;
  name: string;
  category: "Heritage & History" | "Food & Markets" | "Nature & Parks" | "Cultural & Spiritual" | "Hidden Gem" | "Nightlife & Views";
  rating: number;
  reviewCount: string;
  description: string;
  bestTime: string;
  timing: string;
  entryFee: string;
  address: string;
  highlights: string[];
  imageUrl?: string;
  tags: string[];
}

export interface LocalGuruResponse {
  id: string;
  role: "assistant";
  content: string;
  city: string;
  timestamp: string;
  recommendations?: PlaceRecommendation[];
  audioText?: string; // Text optimized for SpeechSynthesis
}

export interface CityInfo {
  name: string;
  stateOrCountry: string;
  tagline: string;
  badge: string;
  description: string;
  places: PlaceRecommendation[];
}

export const CITIES_DATABASE: Record<string, CityInfo> = {
  "Ahmedabad": {
    name: "Ahmedabad",
    stateOrCountry: "Gujarat, India",
    tagline: "India's First UNESCO World Heritage City",
    badge: "Heritage & Culture",
    description: "Famous for textile heritage, Gandhi Ashram, vibrant night markets, and architectural stepwells.",
    places: [
      {
        id: "ahd-1",
        name: "Sabarmati Ashram",
        category: "Heritage & History",
        rating: 4.8,
        reviewCount: "42k+",
        description: "Historical residence of Mahatma Gandhi along the banks of Sabarmati River. Peaceful atmosphere with freedom movement archives.",
        bestTime: "8:30 AM – 11:00 AM (Cool morning breeze)",
        timing: "8:30 AM – 6:30 PM",
        entryFee: "Free Entry",
        address: "Ashram Road, Old Wadaj, Ahmedabad",
        highlights: ["Hridaya Kunj", "Gandhi Heritage Museum", "Riverfront Promenade Walk"],
        tags: ["UNESCO", "Peaceful", "History", "Must Visit"]
      },
      {
        id: "ahd-2",
        name: "Adalaj Stepwell (Adalaj ni Vav)",
        category: "Heritage & History",
        rating: 4.7,
        reviewCount: "28k+",
        description: "5-storey deep intricate Indo-Islamic architectural marvel built in 1498. Unique octagonal opening keeps temperature 5 degrees cooler.",
        bestTime: "9:00 AM – 12:00 PM",
        timing: "8:00 AM – 6:00 PM",
        entryFee: "Free Entry",
        address: "Adalaj, Gandhinagar Highway, Ahmedabad",
        highlights: ["Intricate Carvings", "5-Level Underground Structure", "Photography Hotspot"],
        tags: ["Architecture", "Heritage", "Instagrammable"]
      },
      {
        id: "ahd-3",
        name: "Manek Chowk Street Food Market",
        category: "Food & Markets",
        rating: 4.6,
        reviewCount: "35k+",
        description: "Jewelry market by day, vegetable market by evening, and a bustling street food haven from 8:30 PM to midnight!",
        bestTime: "9:00 PM – 11:30 PM",
        timing: "8:30 PM – 1:30 AM",
        entryFee: "₹200 - ₹500 for food",
        address: "Old City, Near Bhadra Fort, Ahmedabad",
        highlights: ["Gwalior Dosa", "Pineapple Cheese Sandwich", "Kulfi & Rabdi"],
        tags: ["Street Food", "Nightlife", "Iconic"]
      },
      {
        id: "ahd-4",
        name: "Kankaria Lake & Entertainment Zone",
        category: "Nature & Parks",
        rating: 4.5,
        reviewCount: "50k+",
        description: "Circular lake built in the 15th century by Sultan Qutb-ud-Din. Features toy train, balloon safari, Nagina Wadi island, and zoo.",
        bestTime: "5:00 PM – 9:00 PM (Laser show)",
        timing: "9:00 AM – 10:00 PM (Closed Mondays)",
        entryFee: "₹20 (Adults), ₹10 (Kids)",
        address: "Maninagar, Ahmedabad",
        highlights: ["Nagina Wadi Musical Fountain", "Atal Express Toy Train", "Hot Air Balloon Ride"],
        tags: ["Family", "Lake View", "Evening Hangout"]
      },
      {
        id: "ahd-5",
        name: "Agashiye – Terrace Dining",
        category: "Cultural & Spiritual",
        rating: 4.8,
        reviewCount: "12k+",
        description: "Heritage rooftop restaurant serving authentic multi-course Gujarati Thali inside The House of MG heritage hotel.",
        bestTime: "12:30 PM (Lunch) or 7:30 PM (Dinner)",
        timing: "12:00 PM - 3:30 PM, 7:00 PM - 11:00 PM",
        entryFee: "₹950 – ₹1,200 per thali",
        address: "Opposite Sidi Saiyyed Mosque, Lal Darwaja, Ahmedabad",
        highlights: ["Bronze & Silver Thali Service", "Heritage Haveli Ambience", "Unlimited Seasonal Delicacies"],
        tags: ["Fine Dining", "Authentic Thali", "Luxury"]
      }
    ]
  },
  "Jaipur": {
    name: "Jaipur",
    stateOrCountry: "Rajasthan, India",
    tagline: "The Pink City of Forts & Palaces",
    badge: "Royalty & Culture",
    description: "Capital of Rajasthan, famous for royal palaces, vibrant bazaars, Rajput heritage, and mouth-watering Pyaz Kachori.",
    places: [
      {
        id: "jpr-1",
        name: "Amber Palace (Amer Fort)",
        category: "Heritage & History",
        rating: 4.8,
        reviewCount: "65k+",
        description: "Majestic hilltop fort featuring Sheesh Mahal (Mirror Palace), grand courtyards, and panoramic Maota Lake views.",
        bestTime: "8:00 AM – 10:30 AM or 6:30 PM Light Show",
        timing: "8:00 AM – 5:30 PM, 6:30 PM – 9:15 PM",
        entryFee: "₹100 (Indian), ₹500 (Foreigner)",
        address: "Devisingh Pura, Amer, Jaipur",
        highlights: ["Sheesh Mahal Mirror Work", "Diwan-e-Aam", "Sound & Light Evening Show"],
        tags: ["Fort", "Unesco", "Royal"]
      },
      {
        id: "jpr-2",
        name: "Hawa Mahal (Palace of Breeze)",
        category: "Heritage & History",
        rating: 4.7,
        reviewCount: "58k+",
        description: "Five-story pink sandstone palace with 953 jharokhas (windows) designed like Lord Krishna's crown.",
        bestTime: "8:30 AM – 11:00 AM (Best sunlight on façade)",
        timing: "9:00 AM – 5:00 PM",
        entryFee: "₹50 (Indian), ₹200 (Foreigner)",
        address: "Hawa Mahal Rd, Badi Choupad, Jaipur",
        highlights: ["Tattoo Cafe Rooftop View", "Honeycomb Lattice Architecture", "Stained Glass Windows"],
        tags: ["Iconic", "Photography", "Pink Sandstone"]
      },
      {
        id: "jpr-3",
        name: "Rawat Mishthan Bhandar",
        category: "Food & Markets",
        rating: 4.6,
        reviewCount: "38k+",
        description: "World-famous legendary sweet shop best known for inventor-grade Pyaz Ki Kachori, Mirchi Bada, and Ghevar.",
        bestTime: "8:00 AM – 11:00 AM (Fresh hot morning batch)",
        timing: "6:00 AM – 10:30 PM",
        entryFee: "₹50 - ₹200",
        address: "Opposite Bus Stand, Station Road, Jaipur",
        highlights: ["Crispy Pyaz Kachori", "Mawa Ghevar", "Lassi in Kulhad"],
        tags: ["Legendary Food", "Local Must-Try", "Breakfast"]
      },
      {
        id: "jpr-4",
        name: "Nahargarh Fort & Padao Sunset Spot",
        category: "Nightlife & Views",
        rating: 4.7,
        reviewCount: "40k+",
        description: "Perched on the edge of the Aravalli Hills, offering the single best sunset and night view of the illuminated Pink City.",
        bestTime: "5:00 PM – 7:30 PM (Sunset & City Lights)",
        timing: "10:00 AM – 10:00 PM",
        entryFee: "₹50 (Indian), ₹200 (Foreigner)",
        address: "Krishna Nagar, Brahampuri, Jaipur",
        highlights: ["Padao Open Air Restaurant", "Jaipur Skyline View", "Stepwell Location"],
        tags: ["Sunset View", "Romantic", "Panoramic"]
      }
    ]
  },
  "Mumbai": {
    name: "Mumbai",
    stateOrCountry: "Maharashtra, India",
    tagline: "The City of Dreams & Coastal Breeze",
    badge: "Metropolis & Ocean",
    description: "Financial hub of India, home to Bollywood, Colonial heritage, Marine Drive sunset promenades, and Vada Pav stalls.",
    places: [
      {
        id: "bom-1",
        name: "Gateway of India & Elephanta Ferry",
        category: "Heritage & History",
        rating: 4.7,
        reviewCount: "90k+",
        description: "Colonial Indo-Saracenic monument overlooking the Arabian Sea, standing next to the iconic Taj Mahal Palace Hotel.",
        bestTime: "6:30 AM (Sunrise) or 5:00 PM",
        timing: "Open 24 hours",
        entryFee: "Free Entry (Ferry ₹200)",
        address: "Apollo Bunder, Colaba, Mumbai",
        highlights: ["Ferry Ride to Elephanta Caves", "Taj Mahal Palace View", "Pigeon Square"],
        tags: ["Iconic", "Sea Front", "Heritage"]
      },
      {
        id: "bom-2",
        name: "Marine Drive (Queen's Necklace)",
        category: "Nightlife & Views",
        rating: 4.8,
        reviewCount: "110k+",
        description: "3.6 km long C-shaped boulevard along Nariman Point. The streetlights resemble a string of pearls at night.",
        bestTime: "6:00 PM – 10:00 PM",
        timing: "Open 24 hours",
        entryFee: "Free",
        address: "Marine Drive Promenade, South Mumbai",
        highlights: ["Chai & Chana Shopping", "Sea Breeze", "Night Streetlight Glow"],
        tags: ["Night Walk", "Sea View", "Vibe"]
      },
      {
        id: "bom-3",
        name: "Chhatrapati Shivaji Maharaj Terminus (CSMT)",
        category: "Heritage & History",
        rating: 4.8,
        reviewCount: "45k+",
        description: "UNESCO World Heritage Victorian Gothic railway terminal. Breathtakingly illuminated in gold and purple at night.",
        bestTime: "7:00 PM – 9:00 PM (Night Illumination)",
        timing: "Open 24 hours",
        entryFee: "Free Entry",
        address: "Fort, Mumbai",
        highlights: ["Gothic Gargoyles & Domes", "UNESCO Heritage", "Night Photography"],
        tags: ["UNESCO", "Architecture", "Night Lighting"]
      },
      {
        id: "bom-4",
        name: "Aram Vada Pav & Kyani & Co. Bakery",
        category: "Food & Markets",
        rating: 4.6,
        reviewCount: "25k+",
        description: "Relish Mumbai's ultimate local soul food: spicy garlic-chutney Vada Pav at Aram and Bun Maska Irani Chai at Kyani & Co.",
        bestTime: "4:00 PM – 6:30 PM (Evening Snacking)",
        timing: "7:30 AM – 9:00 PM",
        entryFee: "₹20 - ₹150",
        address: "Opp. CST Station & Dhobi Talao, Mumbai",
        highlights: ["Mumbai Vada Pav", "Irani Bun Maska Chai", "Vintage Heritage Bakery"],
        tags: ["Local Food", "Irani Cafe", "Street Food"]
      }
    ]
  },
  "Varanasi": {
    name: "Varanasi",
    stateOrCountry: "Uttar Pradesh, India",
    tagline: "The Spiritual Capital of India",
    badge: "Spiritual & Ancient",
    description: "One of the oldest continuously inhabited cities in the world, renowned for sacred Ganga Ghats, Ganga Aarti, and Banarasi Silk.",
    places: [
      {
        id: "vns-1",
        name: "Dashashwamedh Ghat & Evening Ganga Aarti",
        category: "Cultural & Spiritual",
        rating: 4.9,
        reviewCount: "85k+",
        description: "The most prominent Ganga ghat where priests perform the grand synchronized evening light & incense Aarti ceremony.",
        bestTime: "6:00 PM – 7:30 PM (Reach by 5:30 PM for seat)",
        timing: "Ganga Aarti starts around 6:45 PM",
        entryFee: "Free Entry (Boat seats ₹200 - ₹500)",
        address: "Dashashwamedh Ghat Road, Varanasi",
        highlights: ["Synchronized Brass Lamp Ceremony", "Ganga River Boat View", "Chanting & Conch Sounds"],
        tags: ["Must See", "Spiritual", "Ganga Aarti"]
      },
      {
        id: "vns-2",
        name: "Assi Ghat Subah-e-Banaras",
        category: "Cultural & Spiritual",
        rating: 4.8,
        reviewCount: "35k+",
        description: "Southernmost ghat famous for morning musical ragas, sunrise yoga, boat rides, and the famous Pizzeria Vaatika.",
        bestTime: "5:00 AM – 7:00 AM (Sunrise Subah-e-Banaras)",
        timing: "Open 24 hours",
        entryFee: "Free",
        address: "Assi Ghat, Shivala, Varanasi",
        highlights: ["Classical Morning Ragas", "Sunrise Boat Ride to Manikarnika", "Apple Pie at Vaatika"],
        tags: ["Sunrise", "Peaceful", "Morning Vibe"]
      },
      {
        id: "vns-3",
        name: "Kashi Vishwanath Temple Corridor",
        category: "Cultural & Spiritual",
        rating: 4.9,
        reviewCount: "70k+",
        description: "Sacred Jyotirlinga shrine dedicated to Lord Shiva, recently renovated into a grand heritage corridor connecting directly to the Ganga.",
        bestTime: "4:00 AM (Mangala Aarti) or 11:00 AM",
        timing: "3:00 AM – 11:00 PM",
        entryFee: "Free (Sugam Darshan extra)",
        address: "Lahori Tola, Varanasi",
        highlights: ["Golden Temple Spire", "Ganga Corridor View", "Spiritual Sanctum"],
        tags: ["Jyotirlinga", "Sacred", "Heritage Corridor"]
      },
      {
        id: "vns-4",
        name: "Blue Lassi Shop & Tamatar Chaat",
        category: "Food & Markets",
        rating: 4.7,
        reviewCount: "22k+",
        description: "Iconic 90-year-old narrow alley lassi shop serving 80+ varieties of hand-churned fruit lassis topped with rabdi & nuts.",
        bestTime: "12:00 PM – 5:00 PM",
        timing: "8:00 AM – 10:00 PM",
        entryFee: "₹100 - ₹200",
        address: "Kachauri Gali, Near Manikarnika Ghat, Varanasi",
        highlights: ["Earthen Kulhad Lassi", "Pomegranate Rabdi Lassi", "Kashi Chaat Bhandar Tamatar Chaat"],
        tags: ["Iconic Food", "Street Treat", "Kulhad"]
      }
    ]
  },
  "Udaipur": {
    name: "Udaipur",
    stateOrCountry: "Rajasthan, India",
    tagline: "The City of Lakes & Venice of the East",
    badge: "Lakes & Romance",
    description: "Famous for serene Lake Pichola, island palaces, Mewar fortresses, and sunset boat cruises.",
    places: [
      {
        id: "udr-1",
        name: "City Palace Complex & Museum",
        category: "Heritage & History",
        rating: 4.8,
        reviewCount: "50k+",
        description: "Monumental granite & marble palace complex built over 400 years by Mewar rulers with panoramic views of Lake Pichola.",
        bestTime: "9:30 AM – 12:30 PM",
        timing: "9:00 AM – 5:30 PM",
        entryFee: "₹300 (Adults), ₹100 (Children)",
        address: "Old City, Udaipur",
        highlights: ["Mor Chowk Glass Mosaics", "Zenana Mahal", "Lake Pichola View"],
        tags: ["Palace", "Mewar", "Royal"]
      },
      {
        id: "udr-2",
        name: "Lake Pichola Sunset Boat Cruise",
        category: "Nightlife & Views",
        rating: 4.8,
        reviewCount: "42k+",
        description: "Tranquil boat ride sailing past Jag Mandir Island Palace, Taj Lake Palace, and the glowing City Palace shoreline.",
        bestTime: "5:15 PM – 6:30 PM (Golden Hour Sunset)",
        timing: "10:00 AM – 6:00 PM",
        entryFee: "₹400 - ₹800 (Includes Jag Mandir stop)",
        address: "Rameshwar Ghat, City Palace Jetty, Udaipur",
        highlights: ["Jag Mandir Palace Island", "Taj Lake Palace View", "Golden Hour Sunset"],
        tags: ["Boat Cruise", "Romantic", "Must Do"]
      },
      {
        id: "udr-3",
        name: "Sajjangarh Monsoon Palace",
        category: "Nightlife & Views",
        rating: 4.6,
        reviewCount: "30k+",
        description: "Hilltop castle 3,100 ft above sea level offering the highest 360-degree viewpoint over Fateh Sagar Lake and the Aravalli hills.",
        bestTime: "4:30 PM – 6:45 PM (Sunset Point)",
        timing: "9:00 AM – 6:30 PM",
        entryFee: "₹100 (Entry + Eco-jeep transport extra)",
        address: "Bansdara Peak, Udaipur",
        highlights: ["360 Degree View", "Monsoon Cloud Sea", "Wildlife Sanctuary Drive"],
        tags: ["Hilltop", "Sunset", "Scenic"]
      }
    ]
  },
  "Goa": {
    name: "Goa",
    stateOrCountry: "India",
    tagline: "Sun, Sand, Portuguese Heritage & Spice Plantations",
    badge: "Beaches & Heritage",
    description: "Tropical coastal paradise known for golden beaches, Latin Quarter (Fontainhas), historic cathedrals, and seafood curries.",
    places: [
      {
        id: "goa-1",
        name: "Fontainhas Latin Quarter (Panjim)",
        category: "Hidden Gem",
        rating: 4.7,
        reviewCount: "26k+",
        description: "Charming UNESCO heritage district with colorful Portuguese villas, narrow cobblestone streets, and vintage art cafes.",
        bestTime: "8:00 AM – 10:30 AM or 4:30 PM – 6:30 PM",
        timing: "Open 24 hours",
        entryFee: "Free",
        address: "Fontainhas, Panaji, Goa",
        highlights: ["Bright Pastel Architecture", "Confeitaria 31 De Janeiro", "Azulejos Hand-painted Tiles"],
        tags: ["Portuguese", "Heritage Walk", "Instagrammable"]
      },
      {
        id: "goa-2",
        name: "Basilica of Bom Jesus",
        category: "Heritage & History",
        rating: 4.7,
        reviewCount: "40k+",
        description: "16th-century UNESCO World Heritage Baroque church holding the mortal remains of St. Francis Xavier.",
        bestTime: "9:00 AM – 12:00 PM",
        timing: "9:00 AM – 6:30 PM (Sundays 10:30 AM onwards)",
        entryFee: "Free",
        address: "Old Goa Road, Velha Goa",
        highlights: ["Mortal Remains of St. Francis Xavier", "Baroque Architecture", "Gold-carved Altar"],
        tags: ["UNESCO", "Colonial History", "Spiritual"]
      },
      {
        id: "goa-3",
        name: "Palolem Beach & Butterfly Island Boat",
        category: "Nature & Parks",
        rating: 4.8,
        reviewCount: "38k+",
        description: "Crescent-shaped serene beach in South Goa flanked by coconut palms, calm swimming waters, and dolphin boat trips.",
        bestTime: "7:00 AM (Dolphin Spotting) or 5:00 PM (Sunset)",
        timing: "Open 24 hours",
        entryFee: "Free",
        address: "Palolem, Canacona, South Goa",
        highlights: ["Dolphin Sightseeing Boat", "Silent Noise Headphone Party", "Calm Kayaking"],
        tags: ["South Goa", "Beach", "Dolphins"]
      }
    ]
  }
};

// Available city list for user selection
export const SUPPORTED_CITIES = Object.keys(CITIES_DATABASE);

export const DEFAULT_CITY = "Ahmedabad";

/**
 * Service logic for Local Guru Chatbot recommendations
 */
export const localGuruService = {
  getCityInfo(cityName: string): CityInfo {
    const matchedKey = Object.keys(CITIES_DATABASE).find(
      (key) => key.toLowerCase() === cityName.toLowerCase()
    );
    if (matchedKey) {
      return CITIES_DATABASE[matchedKey];
    }
    // Generic fallback for non-preconfigured cities
    return {
      name: cityName,
      stateOrCountry: "Custom Location",
      tagline: `Explore the hidden treasures of ${cityName}`,
      badge: "Local Explorer",
      description: `Curated local recommendations and famous sights in ${cityName}.`,
      places: [
        {
          id: `custom-1`,
          name: `${cityName} Heritage Center & Old Town`,
          category: "Heritage & History",
          rating: 4.7,
          reviewCount: "15k+",
          description: `The heart of ${cityName}'s historic architecture, traditional handicraft shops, and authentic local street food markets.`,
          bestTime: "9:00 AM – 11:30 AM",
          timing: "8:00 AM – 7:00 PM",
          entryFee: "Free",
          address: `Central City District, ${cityName}`,
          highlights: ["Historic Monuments", "Local Market Walks", "Traditional Artisan Shops"],
          tags: ["Must Visit", "Heritage", "Photography"]
        },
        {
          id: `custom-2`,
          name: `${cityName} Famous Food Street & Local Delicacies`,
          category: "Food & Markets",
          rating: 4.8,
          reviewCount: "20k+",
          description: `Vibrant food lane offering ${cityName}'s iconic local street snacks, fresh sweets, and traditional recipes passed through generations.`,
          bestTime: "6:00 PM – 9:30 PM",
          timing: "5:00 PM – 11:30 PM",
          entryFee: "₹150 - ₹400 for food",
          address: `Main Bazaar Road, ${cityName}`,
          highlights: ["Authentic Local Flavors", "Evening Street Vibes", "Dessert Stalls"],
          tags: ["Street Food", "Local Choice", "Night Market"]
        },
        {
          id: `custom-3`,
          name: `${cityName} Botanical Park & Sunset Viewpoint`,
          category: "Nature & Parks",
          rating: 4.6,
          reviewCount: "12k+",
          description: `Sprawling green park offering scenic walking trails, peaceful lake view, and panoramic golden-hour sunsets.`,
          bestTime: "5:00 PM – 7:00 PM",
          timing: "6:00 AM – 8:00 PM",
          entryFee: "₹30 - ₹50",
          address: `Lakeview Drive, ${cityName}`,
          highlights: ["Sunset Spot", "Nature Trail", "Peaceful Atmosphere"],
          tags: ["Nature", "Sunset", "Relaxing"]
        }
      ]
    };
  },

  async queryLocalGuru(userPrompt: string, selectedCity: string): Promise<LocalGuruResponse> {
    // Simulate smart AI response delay
    await new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));

    const lowerPrompt = userPrompt.toLowerCase();
    const cityData = this.getCityInfo(selectedCity);

    let filteredPlaces = cityData.places;
    let replyText = "";
    let speechAudioText = "";

    // Intent detection
    if (lowerPrompt.includes("food") || lowerPrompt.includes("eat") || lowerPrompt.includes("restaurant") || lowerPrompt.includes("street food")) {
      filteredPlaces = cityData.places.filter((p) => p.category === "Food & Markets");
      if (filteredPlaces.length === 0) filteredPlaces = cityData.places;

      replyText = `Namaste traveller! Here are the absolute best local food joints & street markets in **${cityData.name}** that every foodie must try:`;
      speechAudioText = `Here are the top local food spots and street food markets you must try in ${cityData.name}. ${filteredPlaces.map(p => p.name).join(', ')}.`;
    } else if (lowerPrompt.includes("heritage") || lowerPrompt.includes("fort") || lowerPrompt.includes("history") || lowerPrompt.includes("palace") || lowerPrompt.includes("museum")) {
      filteredPlaces = cityData.places.filter((p) => p.category === "Heritage & History");
      if (filteredPlaces.length === 0) filteredPlaces = cityData.places;

      replyText = `Step back in time! Here are the iconic historical monuments & heritage landmarks of **${cityData.name}**:`;
      speechAudioText = `Here are the iconic historical fort and heritage spots in ${cityData.name}. ${filteredPlaces.map(p => p.name).join(', ')}.`;
    } else if (lowerPrompt.includes("sunset") || lowerPrompt.includes("night") || lowerPrompt.includes("view") || lowerPrompt.includes("evening")) {
      filteredPlaces = cityData.places.filter((p) => p.category === "Nightlife & Views" || p.category === "Nature & Parks");
      if (filteredPlaces.length === 0) filteredPlaces = cityData.places;

      replyText = `Looking for stunning views? Here are the prime evening and sunset spots in **${cityData.name}**:`;
      speechAudioText = `For sunset and evening views in ${cityData.name}, I recommend ${filteredPlaces.map(p => p.name).join(', ')}.`;
    } else if (lowerPrompt.includes("hidden") || lowerPrompt.includes("gem") || lowerPrompt.includes("offbeat") || lowerPrompt.includes("secret")) {
      filteredPlaces = cityData.places.filter((p) => p.category === "Hidden Gem" || p.category === "Cultural & Spiritual");
      if (filteredPlaces.length === 0) filteredPlaces = cityData.places;

      replyText = `Here are unique local gems and authentic cultural spots in **${cityData.name}** away from typical tourist crowds:`;
      speechAudioText = `Here are secret local gems and cultural highlights in ${cityData.name}. ${filteredPlaces.map(p => p.name).join(', ')}.`;
    } else {
      // Default general request
      replyText = `Welcome to **${cityData.name}** (${cityData.stateOrCountry})! As your Travel Guru, here are the top famous places you simply cannot miss in ${cityData.name}:`;
      speechAudioText = `Welcome to ${cityData.name}! Here are the top famous places to visit: ${filteredPlaces.slice(0, 3).map(p => p.name).join(', ')}.`;
    }

    return {
      id: `guru-msg-${Date.now()}`,
      role: "assistant",
      content: replyText,
      city: selectedCity,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      recommendations: filteredPlaces,
      audioText: speechAudioText
    };
  }
};
