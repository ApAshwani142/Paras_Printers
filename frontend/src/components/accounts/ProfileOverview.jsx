"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Calendar } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function ProfileOverview({ user, formatDate }) {
  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>View your basic contact and registration details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--ring)]/30 transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <User className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--muted-foreground)]">Full Name</p>
                <p className="text-sm font-bold text-[var(--foreground)] truncate mt-0.5">{user.name}</p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--ring)]/30 transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--muted-foreground)]">Email Address</p>
                <p className="text-sm font-bold text-[var(--foreground)] truncate mt-0.5">{user.email}</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--ring)]/30 transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--muted-foreground)]">Phone Number</p>
                <p className="text-sm font-bold text-[var(--foreground)] truncate mt-0.5">{user.phone || "Not provided"}</p>
              </div>
            </div>

            {/* Created Date */}
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--ring)]/30 transition-all">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase font-bold tracking-wider text-[var(--muted-foreground)]">Member Since</p>
                <p className="text-sm font-bold text-[var(--foreground)] truncate mt-0.5">{formatDate(user.createdAt)}</p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
