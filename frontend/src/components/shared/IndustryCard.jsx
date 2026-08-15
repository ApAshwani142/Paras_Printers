import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const IndustryCard = ({ industry }) => {
  return (
    <Card className="group overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full bg-[var(--muted)] overflow-hidden">
        <Image
          src={industry.image}
          alt={industry.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-4">
          <h3 className="text-lg font-bold text-white tracking-tight">
            {industry.title}
          </h3>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
          {industry.description}
        </p>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[var(--foreground)] uppercase tracking-wider block">
            Key Label Specifications:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {industry.keyRequirements.map((req, idx) => (
              <Badge key={idx} variant="secondary" size="sm">
                {req}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-[var(--border)]">
          <Link
            href={`/industries#${industry.slug}`}
            className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
          >
            Explore Industry Solutions <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
};
