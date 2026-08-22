"use client";
import React from "react";
import { TripsProvider } from "@/lib/context/TripsContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SafarAI from "@/components/ai/SafarAI";
import { LocalGuruFloatingWidget } from "@/components/ai/LocalGuruFloatingWidget";

export default function TripsProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TripsProvider>
      <div className="min-h-screen flex flex-col bg-[#F9F7F4]">
        <Navbar />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <SafarAI />
        <LocalGuruFloatingWidget />
      </div>
    </TripsProvider>
  );
}
