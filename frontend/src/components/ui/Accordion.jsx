"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export const Accordion = ({ items, defaultOpenId, className }) => {
  const [openId, setOpenId] = useState(defaultOpenId || null);

  const toggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="border border-[var(--border)] rounded-xl bg-[var(--card)] overflow-hidden" >
            <button
              onClick={() => toggle(item.id)}
              className="w-full px-5 py-4 text-left flex items-center justify-between font-semibold text-sm sm:text-base text-[var(--foreground)] hover:bg-[var(--muted)]/50 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[var(--muted-foreground)] transition-transform duration-200 shrink-0 ml-3",
                  isOpen && "transform rotate-180 text-[var(--primary)]"
                )}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--muted-foreground)] border-t border-[var(--border)]/50 leading-relaxed animate-fadeIn">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
