"use client";
import React, { useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card, Button, Input } from "@/components/ui/index";
import { User, Shield, Sparkles, Check, Save, KeyRound } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<"profile" | "preferences" | "settings">("profile");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [homeCity, setHomeCity] = useState(user?.homeCity || "");
  const [saving, setSaving] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser({ name, email, phone, homeCity });
    setSaving(false);
    addToast("success", "Profile updated!");
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) { addToast("error", "Passwords don't match!"); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setPwForm({ current: "", next: "", confirm: "" });
    addToast("success", "Password updated!");
  };

  const TABS = [
    { id: "profile" as const, label: "Personal Info", icon: User },
    { id: "preferences" as const, label: "Preferences", icon: Sparkles },
    { id: "settings" as const, label: "Security", icon: Shield },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage your profile, preferences and security settings.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 items-start">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-2 space-y-0.5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === id ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">

          {activeTab === "profile" && (
            <Card className="p-6">
              <div className="pb-4 mb-5 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-400 mt-0.5">Update your basic contact info.</p>
              </div>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  {user?.avatar
                    ? <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full object-cover" />
                    : <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">{user?.name[0]}</div>
                  }
                  <div>
                    <Button variant="outline" size="sm" type="button">Change Photo</Button>
                    <p className="text-xs text-slate-400 mt-1">JPG or PNG. Max 1MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full Name" value={name} onChange={e => setName(e.target.value)} required />
                  <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                  <Input label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                  <Input label="Home City" value={homeCity} onChange={e => setHomeCity(e.target.value)} placeholder="Mumbai, Delhi..." />
                </div>
                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <Button type="submit" variant="primary" loading={saving}><Save size={14} /> Save Changes</Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card className="p-6">
              <div className="pb-4 mb-5 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Travel Preferences</h3>
                <p className="text-xs text-slate-400 mt-0.5">Customize AI recommendations to your tastes.</p>
              </div>
              <div className="space-y-5">
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Travel Style</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Devotional", "Adventure", "Leisure", "Heritage", "Shopping", "Wildlife", "Beaches"].map(style => {
                      const active = user?.travelPreferences?.includes(style);
                      return (
                        <button
                          key={style}
                          onClick={() => {
                            const current = user?.travelPreferences || [];
                            updateUser({ travelPreferences: current.includes(style) ? current.filter(x => x !== style) : [...current, style] });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-colors ${active ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-slate-300 text-slate-600 hover:border-slate-400"}`}
                        >
                          {active && <Check size={11} />} {style}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-700 mb-2">Food Choices</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Vegetarian", "Vegan", "Halal", "Jain Food", "North Indian", "South Indian", "Gujarati Thali", "Street Food"].map(food => {
                      const active = user?.foodPreferences?.includes(food);
                      return (
                        <button
                          key={food}
                          onClick={() => {
                            const current = user?.foodPreferences || [];
                            updateUser({ foodPreferences: current.includes(food) ? current.filter(x => x !== food) : [...current, food] });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border flex items-center gap-1.5 transition-colors ${active ? "bg-blue-50 border-blue-500 text-blue-600" : "bg-white border-slate-300 text-slate-600 hover:border-slate-400"}`}
                        >
                          {active && <Check size={11} />} {food}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === "settings" && (
            <div className="space-y-5">
              <Card className="p-6">
                <div className="pb-4 mb-5 border-b border-slate-200">
                  <h3 className="font-semibold text-slate-900">Update Password</h3>
                </div>
                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <Input label="Current Password" type="password" value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} required />
                    <Input label="New Password" type="password" value={pwForm.next} onChange={e => setPwForm({ ...pwForm, next: e.target.value })} required />
                    <Input label="Confirm Password" type="password" value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} required />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" loading={saving}><KeyRound size={14} /> Update Password</Button>
                  </div>
                </form>
              </Card>

              <Card className="p-6 border-red-200 bg-red-50">
                <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
                <p className="text-sm text-slate-600 mb-4">Permanently delete your account and all itineraries.</p>
                <Button variant="danger" size="md" onClick={() => { if (confirm("Delete your account? This is irreversible.")) addToast("error", "Demo: Account deletion simulated."); }}>
                  Delete Account
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
