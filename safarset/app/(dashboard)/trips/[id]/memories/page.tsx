"use client";
import React, { useEffect, useState } from "react";
import { useTrips } from "@/lib/context/TripsContext";
import { Card, Button, Input } from "@/components/ui/index";
import { useToast } from "@/components/ui/Toast";
import { BookOpen, Camera, Plus, Trash2, Heart } from "lucide-react";
import type { Trip, TravelMemory } from "@/lib/types";

export default function TripMemoriesPage({ params }: { params: { id: string } }) {
  const { getTrip, updateTrip } = useTrips();
  const { addToast } = useToast();
  
  const [trip, setTrip] = useState<Trip | null>(null);
  const [memories, setMemories] = useState<TravelMemory[]>([]);
  const [addingMemory, setAddingMemory] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const t = getTrip(params.id);
    if (t) {
      setTrip(t);
      // Fallback dummy memories if not initialized
      setMemories(t.memories || [
        {
          id: "m1",
          title: "Stunning Sabarmati riverfront walk",
          description: "Had tea at sunset, the riverfront looks incredible and clean. Highly recommended for evening strolls.",
          imageUrl: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
          date: t.startDate,
          likes: 5
        }
      ]);
    }
  }, [params.id, getTrip]);

  if (!trip) return null;

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    const newMemory: TravelMemory = {
      id: `mem-${Date.now()}`,
      title,
      description,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
      date: new Date().toISOString().split("T")[0],
      likes: 0
    };

    const updatedMemories = [newMemory, ...memories];
    setMemories(updatedMemories);

    const updatedTrip = { ...trip, memories: updatedMemories };
    updateTrip(trip.id, updatedTrip);

    setAddingMemory(false);
    setTitle("");
    setDescription("");
    setImageUrl("");
    addToast("success", "Memory added to your trip journal!");
  };

  const handleDelete = (id: string) => {
    const updated = memories.filter(m => m.id !== id);
    setMemories(updated);
    updateTrip(trip.id, { ...trip, memories: updated });
    addToast("success", "Memory removed.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center pb-4 border-b border-[#E5E0D8]">
        <div>
          <h3 className="text-lg font-bold text-[#1C1C1E]">Travel Journal & Memories</h3>
          <p className="text-xs text-[#6B7280] mt-0.5">Capture, upload pictures, and share moments from your Safar.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setAddingMemory(true)}>
          <Plus size={14} /> Add Moment
        </Button>
      </div>

      {/* Grid of memory journals */}
      {memories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((m) => (
            <Card key={m.id} className="overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img src={m.imageUrl} alt={m.title} className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur text-white text-xs px-2.5 py-1 rounded-md font-semibold">
                    {m.date}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h4 className="font-bold text-gray-800 text-sm">{m.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{m.description}</p>
                </div>
              </div>
              <div className="p-5 pt-0 mt-3 flex justify-between items-center border-t border-gray-100 bg-gray-50/50">
                <span className="text-xs text-gray-400">♥ {m.likes} Likes</span>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Remove Memory"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 card space-y-4">
          <BookOpen className="mx-auto text-gray-300" size={48} />
          <p className="text-gray-500 text-sm">No memories recorded yet. Start capturing moments!</p>
          <Button variant="outline" size="sm" onClick={() => setAddingMemory(true)}>
            + Add First Memory
          </Button>
        </div>
      )}

      {/* Adding Memory Modal */}
      {addingMemory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setAddingMemory(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
            <div className="bg-[#E85D26] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold">Record a Memory</h3>
              <button onClick={() => setAddingMemory(false)}>✕</button>
            </div>
            <form onSubmit={handleAddMemory} className="p-6 space-y-4">
              <Input
                label="Memory Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Beautiful sunset at Sabarmati"
                required
              />
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1">Journal Description</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Tell your story..."
                  className="w-full border border-[#E5E0D8] rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-[#E85D26] focus:outline-none h-24"
                  required
                />
              </div>
              <Input
                label="Image URL (optional)"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/... or leave blank"
              />
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="md" className="flex-1" onClick={() => setAddingMemory(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="md" className="flex-1">
                  Save Memory
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
