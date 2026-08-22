// MOCK MODE: true – replace with real API calls when ready
import type { ChatMessage, Trip } from "@/lib/types";

const MOCK_MODE = true;

const RESPONSES = [
  {
    triggers: ["restaurant","eat","food","lunch","dinner","breakfast"],
    reply: (trip?: Trip) => `Based on your location near ${trip?.stops[0]?.city || "your destination"}, here are my top picks:\n\n🍽 **Agashiye** – Authentic Gujarati Thali (₹800/person, 4.2 km away)\n☕ **Green House Café** – Light bites & coffee (₹350/person, 0.8 km)\n🌮 **Mirch Masala** – Street food & North Indian (₹400/person, 2.1 km)\n\nShall I add any of these to your itinerary?`
  },
  {
    triggers: ["free time","explore","what to do","2 hours","3 hours"],
    reply: (trip?: Trip) => `You have some free time! Near ${trip?.stops[0]?.city || "your location"}, I suggest:\n\n🏛 **Sabarmati Riverfront** – 1.2 km, ~45 min, free entry\n🎨 **Calico Museum** – 3 km, ~1.5 hrs, ₹150\n🛍 **Law Garden** – 4 km, great for shopping, opens 5 PM\n\nAll of these fit comfortably before your next scheduled event.`
  },
  {
    triggers: ["meeting","move","reschedule","4 pm","shift"],
    reply: () => `I can help reschedule that! Moving your meeting to **4:00 PM** gives you an extra 2 hours.\n\n**Proposed changes:**\n- Museum visit → 2:00 PM (fits perfectly)\n- Travel to meeting → 3:30 PM buffer\n- Meeting → 4:00 PM – 5:30 PM\n\nWould you like me to apply these changes to your itinerary?`
  },
  {
    triggers: ["budget","reduce","save","cheaper"],
    reply: () => `Here's how I can reduce your trip cost:\n\n✅ Switch to **Train** (₹1,200 vs ₹4,500 for flight) → saves ₹3,300\n✅ **Hotel Klassik** (₹1,800/night vs ₹5,500) → saves ₹7,400 for 2 nights\n✅ Choose local restaurants → saves ~₹1,000\n\nTotal potential savings: **₹11,700**. Want me to update the plan?`
  },
  {
    triggers: ["vegetarian","veg","plant"],
    reply: () => `Great! Here are the best vegetarian options nearby:\n\n🌿 **Agashiye** – Pure veg Gujarati Thali, rated 4.8 ⭐\n🍃 **Green House Café** – Veg café with healthy options\n🕌 **Vishala** – Traditional Gujarati village-style dining\n\nAll within 5 km from your hotel. Shall I add one to tomorrow's plan?`
  },
  {
    triggers: ["emergency","lost","hospital","police","help"],
    reply: () => `⚠️ **Emergency Assistance**\n\nI'm here to help. Please contact official services first:\n\n🚨 **Police:** 100\n🏥 **Ambulance:** 108\n🔥 **Fire:** 101\n\nNearest locations:\n📍 City Hospital – 2.3 km\n📍 Police Station – 1.8 km\n📍 Your Hotel – 0 km\n\n**Always dial 100/108 for genuine emergencies.**`
  },
];

const DEFAULT = "I'm Travel Guru, your intelligent travel assistant! I can help you:\n\n• Find places to eat & explore nearby\n• Reschedule your itinerary\n• Manage your budget\n• Find local experiences\n• Handle emergencies\n\nWhat can I help you with today?";

export const aiService = {
  async chat(message: string, trip?: Trip): Promise<ChatMessage> {
    if (!MOCK_MODE) {
      // TODO: Replace with real AI API call
      // const res = await fetch('/api/ai/chat', { method:'POST', body: JSON.stringify({ message, tripContext: trip }) });
      // return res.json();
    }

    await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
    const lower = message.toLowerCase();
    const match = RESPONSES.find(r => r.triggers.some(t => lower.includes(t)));
    const content = match ? match.reply(trip) : DEFAULT;

    return {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content,
      timestamp: new Date().toISOString(),
    };
  },

  async generateItinerary(trip: Partial<Trip>) {
    // MOCK: Returns the existing mock itinerary for demo
    await new Promise(r => setTimeout(r, 1500));
    return { success: true, message: "Itinerary generated based on your preferences." };
  }
};
