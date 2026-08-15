"use client";

import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

export const MapComponent = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] flex flex-col justify-center items-center">
      {isClient ? (
        <iframe
          title="Paras Printers North Guwahati Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.openstreetmap.org/export/embed.html?bbox=91.700000%2C26.180000%2C91.760000%2C26.220000&amp;layer=mapnik&amp;marker=26.195000%2C91.730000"
        />
      ) : (
        <div className="flex flex-col items-center justify-center p-6 space-y-2 text-[var(--muted-foreground)]">
          <MapPin className="w-8 h-8 animate-bounce text-[var(--primary)]" />
          <p className="text-xs">Loading Plant Location Map...</p>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[var(--card)]/95 backdrop-blur-md p-3.5 rounded-xl border border-[var(--border)] shadow-xl z-20 text-xs space-y-1">
        <div className="flex items-center gap-1.5 font-bold text-[var(--foreground)]">
          <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0" />
          <span>Paras Printers Factory</span>
        </div>
        <p className="text-[11px] text-[var(--muted-foreground)] leading-tight">
          North Guwahati, Kamrup, Assam - 781030, India
        </p>
      </div>
    </div>
  );
};
