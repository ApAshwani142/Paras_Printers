"use client";

import { Chrome } from "lucide-react";

export default function SocialAuthButtons() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        className="
          flex h-11 items-center justify-center gap-2
          rounded-xl border border-slate-200
          bg-white text-sm font-semibold text-slate-700
          transition-all
          hover:border-slate-300
          hover:bg-slate-50

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
          dark:hover:bg-slate-800
        "
      >
        <Chrome size={18} />
        Google
      </button>

      <button
        type="button"
        className="
          flex h-11 items-center justify-center gap-2
          rounded-xl border border-slate-200
          bg-white text-sm font-semibold text-slate-700
          transition-all
          hover:border-slate-300
          hover:bg-slate-50

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-slate-200
          dark:hover:bg-slate-800
        "
      >
        <span className="text-base font-bold">in</span>
        LinkedIn
      </button>
    </div>
  );
}