"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { X, Phone, Mail, MapPin, ShieldCheck, FileText } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export const MobileNav = ({ links, onClose }) => {
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
