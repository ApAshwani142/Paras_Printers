import React from "react";
import { cn } from "@/lib/utils";

export const Container = ({ children, className, size = "xl", ...props }) => {
  const sizes = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-6xl",
    xl: "max-w-7xl",
  };

  return (
    <div className={cn("mx-auto px-4 sm:px-6 lg:px-8 w-full", sizes[size], className)} {...props}>
      {children}
    </div>
  );
};
