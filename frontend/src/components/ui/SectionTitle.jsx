import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

export const SectionTitle = ({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}) => {
  const alignment = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  return (
    <div className={cn("flex flex-col max-w-3xl mb-12 space-y-3", alignment[align], className)}>
      {badge && (
        <Badge variant="default" size="md">
          {badge}
        </Badge>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
