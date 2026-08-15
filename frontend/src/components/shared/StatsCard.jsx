import React from "react";
import { Card } from "@/components/ui/Card";

export const StatsCard = ({ value, label, sublabel, icon }) => {
  return (
    <Card className="p-6 text-center space-y-2 hover:border-[var(--primary)] transition-colors">
      {icon && <div className="flex justify-center text-[var(--primary)] mb-2">{icon}</div>}
      <div className="text-3xl sm:text-4xl font-black text-[var(--foreground)] tracking-tight font-mono">
        {value}
      </div>
      <div className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
        {label}
      </div>
      {sublabel && (
        <div className="text-[11px] text-[var(--muted-foreground)]">
          {sublabel}
        </div>
      )}
    </Card>
  );
};
