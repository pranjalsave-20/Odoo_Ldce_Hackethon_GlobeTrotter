"use client";
import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Trip, ItineraryDay } from "@/lib/types";
import { MOCK_TRIPS } from "@/lib/data/mockData";

interface TripsContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, data: Partial<Trip>) => void;
  deleteTrip: (id: string) => void;
  getTrip: (id: string) => Trip | undefined;
  updateItinerary: (tripId: string, itinerary: ItineraryDay[]) => void;
}

const TripsContext = createContext<TripsContextType | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);

  const addTrip = useCallback((trip: Trip) => setTrips(t => [trip, ...t]), []);
  const updateTrip = useCallback((id: string, data: Partial<Trip>) =>
    setTrips(t => t.map(x => x.id === id ? { ...x, ...data } : x)), []);
  const deleteTrip = useCallback((id: string) => setTrips(t => t.filter(x => x.id !== id)), []);
  const getTrip = useCallback((id: string) => trips.find(x => x.id === id), [trips]);
  const updateItinerary = useCallback((tripId: string, itinerary: ItineraryDay[]) =>
    setTrips(t => t.map(x => x.id === tripId ? { ...x, itinerary } : x)), []);

  return (
    <TripsContext.Provider value={{ trips, addTrip, updateTrip, deleteTrip, getTrip, updateItinerary }}>
      {children}
    </TripsContext.Provider>
  );
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error("useTrips must be inside TripsProvider");
  return ctx;
}
