"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      // Store the path they were trying to access to redirect back after login
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [loading, user, router, pathname]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-[var(--muted)]" />
            <div className="absolute inset-0 rounded-full border-4 border-t-[var(--primary)] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          </div>
          <p className="text-sm font-semibold text-[var(--muted-foreground)] animate-pulse">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  return children;
}
