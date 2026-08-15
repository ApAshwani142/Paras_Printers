"use client";

import React from "react";
import { MessageSquareText } from "lucide-react";

export const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Paras Printers, I visited your corporate website and would like an instant price quote.`
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
    >
      <MessageSquareText className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pl-0 group-hover:pl-2">
        Instant WhatsApp Quote
      </span>
    </a>
  );
};
