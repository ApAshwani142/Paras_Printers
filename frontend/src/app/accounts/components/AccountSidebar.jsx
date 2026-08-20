"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Lock, Activity, ShieldCheck, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/Card";

export default function AccountSidebar({ activeTab, setActiveTab, user }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      {/* Navigation Card */}
      <Card className="p-6">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--muted-foreground)] mb-4 px-2">
          Navigation
        </h3>
        <nav className="space-y-1.5">
          {[
            { id: "overview", label: "Account Overview", icon: User },
            { id: "security", label: "Password & Security", icon: Lock },
            { id: "activity", label: "Recent Activity", icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--primary)] text-white shadow-lg shadow-sky-500/20"
                    : "text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--primary)]"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </Card>

      {/* Security Checklist Card */}
      <Card className="p-6">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-[var(--muted-foreground)] mb-4">
          Security Checklist
        </h3>
        <div className="space-y-4">
          {/* Email Verified */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)]">Email Verification</h4>
              <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                Verify ownership of your email address
              </p>
            </div>
            {user.emailVerified ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                <ShieldAlert className="w-3.5 h-3.5" /> Pending
              </span>
            )}
          </div>

          {/* MFA Enabled */}
          <div className="flex items-start justify-between gap-3 pt-3 border-t border-[var(--border)]">
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)]">2-Factor Authentication</h4>
              <p className="text-[10px] text-[var(--muted-foreground)] mt-0.5">
                Add an extra layer of login protection
              </p>
            </div>
            {user.mfaEnabled ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" /> Enabled
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">
                <ShieldAlert className="w-3.5 h-3.5" /> Disabled
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
