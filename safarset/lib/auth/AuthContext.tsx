"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/config";
import type { User } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USERS: User[] = [
  { id: "user-1", name: "Arjun Mehta", email: "arjun@example.com", phone: "+91 98765 43210", homeCity: "Mumbai",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    role: "user", travelPreferences: ["Business", "Weekend Getaways"], foodPreferences: ["North Indian", "Continental"], createdAt: "2024-01-15" },
  { id: "admin-1", name: "Admin User", email: "admin@safarset.com", role: "admin", homeCity: "Delhi", createdAt: "2024-01-01" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Convert Firebase user to app User model
  const mapFirebaseUser = (fbUser: FirebaseUser): User => {
    return {
      id: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split("@")[0] || "User",
      email: fbUser.email || "",
      avatar: fbUser.photoURL || undefined,
      role: "user",
      createdAt: fbUser.metadata.creationTime || new Date().toISOString()
    };
  };

  useEffect(() => {
    // 1. Check local storage fallback first
    try {
      const s = localStorage.getItem("safarset_user");
      if (s) setUser(JSON.parse(s));
    } catch {}

    // 2. Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const mapped = mapFirebaseUser(fbUser);
        setUser(mapped);
        localStorage.setItem("safarset_user", JSON.stringify(mapped));
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Email & Password Sign In
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Check Demo accounts first
    const demo = DEMO_USERS.find(u => u.email === email);
    if (demo && ["password123", "admin123"].includes(password)) {
      setUser(demo);
      localStorage.setItem("safarset_user", JSON.stringify(demo));
      setIsLoading(false);
      return { success: true };
    }

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const mapped = mapFirebaseUser(res.user);
      setUser(mapped);
      localStorage.setItem("safarset_user", JSON.stringify(mapped));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      if (err.code === "auth/invalid-api-key" || err.code === "auth/api-key-not-found" || err.message?.includes("API key")) {
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: email.split("@")[0] || "User",
          email,
          role: "user",
          createdAt: new Date().toISOString()
        };
        setUser(mockUser);
        localStorage.setItem("safarset_user", JSON.stringify(mockUser));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      const errorMsg = err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password"
        ? "Invalid email or password."
        : err.message || "Failed to sign in.";
      return { success: false, error: errorMsg };
    }
  };

  // Email & Password Sign Up
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await updateProfile(res.user, { displayName: name });
      }
      const mapped = mapFirebaseUser({ ...res.user, displayName: name });
      setUser(mapped);
      localStorage.setItem("safarset_user", JSON.stringify(mapped));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      if (err.code === "auth/invalid-api-key" || err.code === "auth/api-key-not-found" || err.message?.includes("API key")) {
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: name || email.split("@")[0] || "User",
          email,
          role: "user",
          createdAt: new Date().toISOString()
        };
        setUser(mockUser);
        localStorage.setItem("safarset_user", JSON.stringify(mockUser));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      const errorMsg = err.code === "auth/email-already-in-use"
        ? "This email address is already registered."
        : err.message || "Signup failed.";
      return { success: false, error: errorMsg };
    }
  };

  // Google Sign In
  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const mapped = mapFirebaseUser(res.user);
      setUser(mapped);
      localStorage.setItem("safarset_user", JSON.stringify(mapped));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      if (err.code === "auth/invalid-api-key" || err.code === "auth/api-key-not-found" || err.message?.includes("API key")) {
        const mockUser: User = {
          id: "google-user-demo",
          name: "Arjun Mehta",
          email: "arjun@example.com",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
          role: "user",
          createdAt: new Date().toISOString()
        };
        setUser(mockUser);
        localStorage.setItem("safarset_user", JSON.stringify(mockUser));
        setIsLoading(false);
        return { success: true };
      }
      setIsLoading(false);
      if (err.code === "auth/popup-closed-by-user") {
        return { success: false, error: "Google sign-in popup was closed." };
      }
      return { success: false, error: err.message || "Google sign-in failed." };
    }
  };

  // Logout
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("safarset_user");
    try {
      await firebaseSignOut(auth);
    } catch {}
  };

  const updateUser = (data: Partial<User>) => {
    if (!user) return;
    const u = { ...user, ...data };
    setUser(u);
    localStorage.setItem("safarset_user", JSON.stringify(u));
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
