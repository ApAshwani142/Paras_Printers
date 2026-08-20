"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

// Sub-components
import AccountSidebar from "./components/AccountSidebar";
import ProfileOverview from "./components/ProfileOverview";
import SecuritySettings from "./components/SecuritySettings";
import ActivityHistory from "./components/ActivityHistory";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  // Tab State: "overview" | "security" | "activity"
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--muted)]" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[var(--primary)] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-sm font-semibold text-[var(--muted-foreground)] animate-pulse">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Welcome Header Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent border border-[var(--border)] p-6 sm:p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[var(--primary)]/5 blur-3xl -z-10" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary)] text-white text-xl font-bold shadow-md shadow-sky-500/20">
                {getInitials(user.name)}
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active Account
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-[var(--foreground)] tracking-tight mt-1">
                  Welcome back, {user.name.split(" ")[0]}!
                </h1>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Manage your business profile, quotes, and security settings
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4" />}
              onClick={async () => {
                await logout();
                router.replace("/login");
              }}
              className="self-start sm:self-center border-red-500/20 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400"
            >
              Sign Out
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Card */}
          <div className="lg:col-span-4">
            <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
          </div>

          {/* Right Main Content Tabs (Animated) */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <ProfileOverview user={user} formatDate={formatDate} />
              )}
              {activeTab === "security" && (
                <SecuritySettings />
              )}
              {activeTab === "activity" && (
                <ActivityHistory user={user} formatDate={formatDate} />
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </main>
  );
}