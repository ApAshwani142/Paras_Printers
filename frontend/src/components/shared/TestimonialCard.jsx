import React from "react";
import { Card } from "@/components/ui/Card";
import { Star, ShieldCheck, Quote } from "lucide-react";

export const TestimonialCard = ({ testimonial }) => {
  return (
    <Card className="p-6 flex flex-col justify-between space-y-4 h-full relative">
      <Quote className="w-8 h-8 text-[var(--primary)]/20 absolute top-4 right-4 pointer-events-none" />

      <div className="space-y-3">
        <div className="flex items-center space-x-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-[var(--foreground)]/90 italic leading-relaxed">
          &ldquo;{testimonial.content}&rdquo;
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-[var(--foreground)]">
            {testimonial.clientName}
          </h4>
          <p className="text-[11px] text-[var(--muted-foreground)]">
            {testimonial.designation}, <span className="font-semibold">{testimonial.company}</span>
          </p>
        </div>

        {testimonial.verifiedSupplierBadge && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
            <ShieldCheck className="w-3 h-3" /> VERIFIED
          </span>
        )}
      </div>
    </Card>
  );
};
