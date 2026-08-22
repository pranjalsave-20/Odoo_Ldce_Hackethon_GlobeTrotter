export type TravelPurpose = "business"|"devotional"|"family"|"entertainment"|"personal"|"leisure"|"adventure";
export type TripType = "one-way"|"round-trip";
export type BudgetTier = "budget"|"comfort"|"premium"|"luxury"|"custom";
export type TransportMode = "flight"|"train"|"bus"|"car";
export type GroupType = "solo"|"couple"|"family"|"friends"|"corporate";
export type TripStatus = "draft"|"upcoming"|"ongoing"|"completed";
export type ActivityCategory = "historical"|"adventure"|"nature"|"shopping"|"religious"|"food"|"entertainment"|"museums"|"photography"|"hidden-gems"|"travel"|"hotel"|"meeting"|"free-time";
export type FoodCategory = "vegetarian"|"non-vegetarian"|"local-cuisine"|"street-food"|"fine-dining"|"budget-food"|"family-restaurant"|"cafe";

export interface User { id:string; name:string; email:string; phone?:string; homeCity?:string; avatar?:string; role:"user"|"admin"; travelPreferences?:string[]; foodPreferences?:string[]; createdAt:string; }
export interface TripStop { city:string; state:string; nights:number; }
export interface TransportOption { id:string; mode:TransportMode; from:string; to:string; duration:string; cost:number; comfort:"Low"|"Medium"|"High"; provider?:string; departure?:string; arrival?:string; }
export interface Hotel { id:string; name:string; stars:number; rating:number; reviewCount:number; location:string; city:string; distanceFromCenter:string; pricePerNight:number; image:string; amenities:string[]; tags:string[]; description?:string; }
export interface Meeting { id:string; name:string; company?:string; date:string; startTime:string; endTime:string; location:string; notes?:string; }
export interface Activity { id:string; name:string; category:ActivityCategory; time:string; duration:string; location:string; city:string; estimatedCost:number; distance?:string; travelTime?:string; image:string; description?:string; openingHours?:string; rating?:number; type:"activity"|"meal"|"travel"|"hotel"|"meeting"|"free-time"; }
export interface ItineraryDay { day:number; date:string; city:string; activities:Activity[]; }
export interface Restaurant { id:string; name:string; rating:number; reviewCount:number; distance:string; costPerPerson:number; cuisine:string; category:FoodCategory[]; popularDishes:string[]; openingHours:string; image:string; city:string; }
export interface Guide { id:string; name:string; avatar:string; languages:string[]; city:string; specialization:string[]; experience:number; rating:number; reviewCount:number; pricePerHour:number; bio?:string; }
export interface BudgetCategory { name:string; planned:number; estimated:number; actual:number; color:string; }
export interface BudgetSummary { total:number; estimated:number; actual:number; remaining:number; categories:BudgetCategory[]; }
export interface TripTravellers { adults:number; children:number; seniors:number; groupType:GroupType; }
export interface TravelMemory { id:string; title:string; description:string; imageUrl:string; date:string; likes:number; }
export interface Trip { id:string; userId:string; name:string; from:string; stops:TripStop[]; purpose:TravelPurpose; tripType:TripType; startDate:string; endDate:string; duration:string; travellers:TripTravellers; budgetTier:BudgetTier; budgetAmount:number; transport?:TransportOption; hotel?:Hotel; itinerary:ItineraryDay[]; meetings:Meeting[]; budget:BudgetSummary; status:TripStatus; coverImage?:string; isPublic?:boolean; memories?:TravelMemory[]; createdAt:string; }
export interface ChatMessage { id:string; role:"user"|"assistant"; content:string; timestamp:string; proposedChanges?:{ description:string; }; }
export interface Place { id:string; name:string; category:ActivityCategory; city:string; rating:number; distance?:string; duration:string; estimatedCost:number; openingHours:string; image:string; description:string; tags:string[]; }
export interface CommunityTrip { id:string; userId:string; userName:string; userAvatar?:string; title:string; route:string; purpose:TravelPurpose; duration:string; likes:number; copies:number; coverImage:string; highlights:string[]; budgetTier:BudgetTier; createdAt:string; }
export interface Memory { id:string; tripId:string; day:number; city:string; caption:string; imageUrl:string; createdAt:string; }
