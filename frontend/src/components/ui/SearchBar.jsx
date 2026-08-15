"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const SearchBar = ({
  value,
  onChange,
  onClear,
  placeholder = "Search products...",
  className,
}) => {
  return (
    <div className={cn("relative flex items-center w-full", className)}>
      <Search className="absolute left-3 w-4 h-4 text-[var(--muted-foreground)] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-9 pr-9 text-sm bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--ring)] transition-all placeholder:text-[var(--muted-foreground)]"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 p-1 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
