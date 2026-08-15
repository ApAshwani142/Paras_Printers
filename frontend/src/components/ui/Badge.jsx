import React from "react";
import { cn } from "@/lib/utils";

export const Badge = ({
  children,
  className,
  variant = "default",
  size = "md",
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full border";

  const variants = {
    default: "bg-[var(--primary)]/10 text-[var(--primary)] border-[var(--primary)]/20",
    secondary: "bg-[var(--muted)] text-[var(--muted-foreground)] border-[var(--border)]",
    outline: "bg-transparent border-[var(--border)] text-[var(--foreground)]",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    cyan: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/20",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
