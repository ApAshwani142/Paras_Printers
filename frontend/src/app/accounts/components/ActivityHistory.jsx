"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function ActivityHistory({ user, formatDate }) {
  return (
    <motion.div
      key="activity"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity History</CardTitle>
          <CardDescription>View recent security events on your business account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative border-l border-[var(--border)] pl-6 ml-4 space-y-6">
            
            {/* Event 1 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-500 text-white border-2 border-[var(--card)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <div>
                <span className="text-[10px] font-bold text-sky-500 uppercase tracking-wider">Session Activity</span>
                <h4 className="text-xs font-bold text-[var(--foreground)] mt-0.5">Account Signed In Successfully</h4>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                  Logged in via Desktop browser (Chrome / Windows)
                </p>
                <span className="block text-[9px] text-[var(--muted-foreground)] mt-1 font-semibold">
                  Just now
                </span>
              </div>
            </div>

            {/* Event 2 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white border-2 border-[var(--card)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <div>
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Security Guard</span>
                <h4 className="text-xs font-bold text-[var(--foreground)] mt-0.5">Email Verification Completed</h4>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                  Your corporate account email {user.email} was successfully verified.
                </p>
                <span className="block text-[9px] text-[var(--muted-foreground)] mt-1 font-semibold">
                  {formatDate(user.createdAt)}
                </span>
              </div>
            </div>

            {/* Event 3 */}
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-white border-2 border-[var(--card)]">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              <div>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">Onboarding</span>
                <h4 className="text-xs font-bold text-[var(--foreground)] mt-0.5">Corporate Profile Created</h4>
                <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                  Business profile created successfully under the name "{user.name}".
                </p>
                <span className="block text-[9px] text-[var(--muted-foreground)] mt-1 font-semibold">
                  {formatDate(user.createdAt)}
                </span>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
