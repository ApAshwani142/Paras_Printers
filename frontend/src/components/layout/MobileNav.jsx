"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { X, Phone, Mail, ShieldCheck, FileText } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export const MobileNav = ({ links, onClose }) => {
  const { user, loading: authLoading, logout } = useAuth();
  const pathname = usePathname();

  const getInitials = (name = "") => {
    return name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden flex justify-end">
      <div className="w-full max-w-xs bg-[var(--card)] h-full p-6 flex flex-col justify-between overflow-y-auto animate-slideLeft">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
            <span className="text-base font-black text-[var(--foreground)] tracking-tight">
              PARAS PRINTERS
            </span>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close menu">
              <X className="w-5 h-5 text-[var(--foreground)]" />
            </Button>
          </div>

          <nav className="py-6 space-y-1.5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm font-bold text-[var(--foreground)] rounded-lg hover:bg-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-[var(--border)] space-y-4">
          {/* Auth Section at the bottom of menu */}
          {!authLoading && !["/login", "/signup", "/verify-email", "/verify-mfa", "/forgot-password", "/reset-password"].includes(pathname) && (
            <div className="border-b border-[var(--border)] pb-4">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <Link
                    href="/accounts"
                    onClick={onClose}
                    className="flex items-center gap-3 min-w-0"
                  >
                    {/* Avatar */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[var(--primary)] text-sm font-bold text-white">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        getInitials(user.name) || "U"
                      )}
                    </div>
                    {/* User Details */}
                    <div className="flex flex-col leading-tight min-w-0">
                      <span className="truncate text-xs font-bold text-[var(--foreground)]">
                        {user.name}
                      </span>
                      <span className="text-[10px] text-[var(--muted-foreground)]">
                        My Account
                      </span>
                    </div>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs font-bold text-red-500 hover:bg-red-500/10 px-2.5 py-1.5 h-auto rounded-lg"
                    onClick={async () => {
                      onClose();
                      await logout();
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/login" onClick={onClose} className="w-full">
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold py-2">
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={onClose} className="w-full">
                    <Button variant="primary" size="sm" className="w-full text-xs font-bold py-2">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          <Link href="/request-quote" onClick={onClose} className="block w-full">
            <Button variant="primary" size="md" className="w-full" leftIcon={<FileText className="w-4 h-4" />}>
              Request Instant Quote
            </Button>
          </Link>

          <div className="space-y-2 text-xs text-[var(--muted-foreground)]">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
              <span>{COMPANY_INFO.phonePrimary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
              <span>{COMPANY_INFO.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>GST Verified Manufacturer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
