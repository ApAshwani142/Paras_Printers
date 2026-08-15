import React from "react";
import { ShieldCheck, Phone, Mail, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export const StickyHeader = () => {
  return (
    <div className="bg-[var(--secondary)] text-[var(--secondary-foreground)] text-[11px] font-medium py-2 border-b border-[var(--border)] hidden sm:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            GST Verified Manufacturer ({COMPANY_INFO.indiamartTrustYears})
          </span>
          <span className="flex items-center gap-1.5 text-[var(--muted-foreground)]">
            <Clock className="w-3.5 h-3.5 text-[var(--primary)]" />
            {COMPANY_INFO.operatingHours}
          </span>
        </div>
        <div className="flex items-center space-x-5 text-[var(--foreground)] font-medium">
          <a href={`tel:${COMPANY_INFO.phonePrimary}`} className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors">
            <Phone className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>{COMPANY_INFO.phonePrimary}</span>
          </a>
          <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-1.5 hover:text-[var(--primary)] transition-colors">
            <Mail className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>{COMPANY_INFO.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
