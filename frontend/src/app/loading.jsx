import React from "react";

export default function RootLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
      <div className="relative flex flex-col items-center p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent rounded-2xl blur-xl -z-10 animate-pulse" />
        
        {/* Spinner & Logo container */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
          {/* Track */}
          <div className="absolute inset-0 rounded-full border-4 border-[var(--border)]" />
          {/* Animated Spinner ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[var(--primary)] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          
          {/* Brand Icon (Lucide Printer SVG) */}
          <div className="w-11 h-11 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 animate-pulse"
            >
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <path d="M6 9V2h12v7" />
              <rect x="6" y="14" width="12" height="8" rx="1" />
            </svg>
          </div>
        </div>

        {/* Brand Text */}
        <h3 className="text-[17px] font-black tracking-tight text-[var(--foreground)]">
          PARAS PRINTERS
        </h3>
        
        <p className="mt-1 text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--muted-foreground)]">
          Packaging & Labels
        </p>

        {/* Loading status text */}
        <p className="mt-4 text-xs font-semibold text-[var(--muted-foreground)] animate-pulse">
          Loading page content...
        </p>
      </div>
    </div>
  );
}
