"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/lib/types";

interface AuthContextType {
  user: User | null; isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: User[] = [
  { id:"user-1", name:"Arjun Mehta", email:"arjun@example.com", phone:"+91 98765 43210", homeCity:"Mumbai",
    avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    role:"user", travelPreferences:["Business","Weekend Getaways"], foodPreferences:["North Indian","Continental"], createdAt:"2024-01-15" },
  { id:"admin-1", name:"Admin User", email:"admin@safarset.com", role:"admin", homeCity:"Delhi", createdAt:"2024-01-01" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try { const s = localStorage.getItem("safarset_user"); if (s) setUser(JSON.parse(s)); } catch {}
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const found = DEMO_USERS.find(u => u.email === email);
    if (found && ["password123","admin123"].includes(password)) {
      setUser(found); localStorage.setItem("safarset_user", JSON.stringify(found)); setIsLoading(false);
      return { success: true };
    }
    setIsLoading(false);
    return { success: false, error: "Invalid credentials. Try arjun@example.com / password123" };
  };

  const signup = async (name: string, email: string, _p: string) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900));
    if (DEMO_USERS.find(u => u.email === email)) { setIsLoading(false); return { success:false, error:"Email already exists" }; }
    const nu: User = { id:`user-${Date.now()}`, name, email, role:"user", createdAt: new Date().toISOString() };
    setUser(nu); localStorage.setItem("safarset_user", JSON.stringify(nu)); setIsLoading(false);
    return { success: true };
  };

  const logout = () => { setUser(null); localStorage.removeItem("safarset_user"); };
  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const u = { ...user, ...data }; setUser(u); localStorage.setItem("safarset_user", JSON.stringify(u));
  };

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
