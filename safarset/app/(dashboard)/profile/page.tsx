"use client";
import React, { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, Button, Input } from "@/components/ui/index";
import { User, Shield, CreditCard, KeyRound, MapPin, Sparkles, Check, Save } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "settings">("profile");

  // Form states
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [homeCity, setHomeCity] = useState(user?.homeCity || "");
  const [saving, setSaving] = useState(false);

  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    updateUser({ name, email, phone, homeCity });
    setSaving(false);
    addToast("success", "Profile updated successfully!");
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) {
      addToast("error", "Passwords do not match!");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setPwForm({ current: "", next: "", confirm: "" });
    addToast("success", "Password updated successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1C1C1E] tracking-tight">Your Account</h1>
        <p className="text-[#6B7280] text-sm mt-1">Manage your travel preferences, profile details and settings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-3">
          <Card className="p-2 space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === "profile" ? "bg-[#E85D26]/10 text-[#E85D26]" : "text-[#6B7280] hover:bg-gray-50"
              }`}
            >
              <User size={16} /> Personal Info
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === "preferences" ? "bg-[#E85D26]/10 text-[#E85D26]" : "text-[#6B7280] hover:bg-gray-50"
              }`}
            >
              <Sparkles size={16} /> Preferences
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                activeTab === "settings" ? "bg-[#E85D26]/10 text-[#E85D26]" : "text-[#6B7280] hover:bg-gray-50"
              }`}
            >
              <Shield size={16} /> Security & Account
            </button>
          </Card>
        </div>

        {/* Tab Contents */}
        <div className="lg:col-span-9">
          {activeTab === "profile" && (
            <Card className="p-6 space-y-6">
              <div className="border-b border-[#E5E0D8] pb-4">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Personal Information</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">Update your basic login and contact info.</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="flex items-center gap-4">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#E85D26] flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name[0]}
                    </div>
                  )}
                  <div>
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-xs text-[#6B7280] mt-1">JPG or PNG. Max 1MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
                  <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input label="Phone number (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <Input label="Home City" value={homeCity} onChange={(e) => setHomeCity(e.target.value)} placeholder="Mumbai, Delhi..." />
                </div>

                <div className="flex justify-end pt-4 border-t border-[#E5E0D8]">
                  <Button type="submit" variant="primary" loading={saving}>
                    <Save size={16} /> Save Changes
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card className="p-6 space-y-6">
              <div className="border-b border-[#E5E0D8] pb-4">
                <h3 className="text-lg font-bold text-[#1C1C1E]">Travel Preferences</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">Let Safar AI customize recommendations based on your tastes.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">Travel Style</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Devotional", "Adventure", "Leisure", "Heritage", "Shopping", "Wildlife", "Beaches"].map((style) => {
                      const active = user?.travelPreferences?.includes(style);
                      return (
                        <button
                          key={style}
                          onClick={() => {
                            const current = user?.travelPreferences || [];
                            const next = current.includes(style) ? current.filter(x => x !== style) : [...current, style];
                            updateUser({ travelPreferences: next });
                            addToast("success", `Preferences updated!`);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                            active ? "bg-orange-50 border-[#E85D26] text-[#E85D26]" : "bg-white border-gray-200 text-gray-600"
                          }`}
                        >
                          {active && <Check size={12} />} {style}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">Food Choices</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Vegetarian", "Vegan", "Halal", "Jain Food", "North Indian", "South Indian", "Gujarati Thali", "Street Food"].map((food) => {
                      const active = user?.foodPreferences?.includes(food);
                      return (
                        <button
                          key={food}
                          onClick={() => {
                            const current = user?.foodPreferences || [];
                            const next = current.includes(food) ? current.filter(x => x !== food) : [...current, food];
                            updateUser({ foodPreferences: next });
                            addToast("success", `Preferences updated!`);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${
                            active ? "bg-orange-50 border-[#E85D26] text-[#E85D26]" : "bg-white border-gray-200 text-gray-600"
                          }`}
                        >
                          {active && <Check size={12} />} {food}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card className="p-6 space-y-6">
                <div className="border-b border-[#E5E0D8] pb-4">
                  <h3 className="text-lg font-bold text-[#1C1C1E]">Update Password</h3>
                </div>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Current Password"
                      type="password"
                      value={pwForm.current}
                      onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                      required
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={pwForm.next}
                      onChange={(e) => setPwForm({ ...pwForm, next: e.target.value })}
                      required
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={pwForm.confirm}
                      onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                      required
                    />
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button type="submit" variant="primary" loading={saving}>
                      <KeyRound size={16} /> Update Password
                    </Button>
                  </div>
                </form>
              </Card>

              <Card className="p-6 border-red-100 bg-red-50/20 space-y-4">
                <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
                <p className="text-sm text-gray-600">Permanently delete your SafarSet account and all your planned itineraries. This action is irreversible.</p>
                <Button variant="danger" size="md" onClick={() => {
                  if (confirm("Are you absolutely sure you want to delete your account? This will wipe your entire travel history.")) {
                    addToast("error", "Demo action: Account deletion simulated.");
                  }
                }}>Delete Account</Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
