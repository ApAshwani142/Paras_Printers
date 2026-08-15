import React from "react";
import { TestimonialsSection } from "@/components/features/home/TestimonialsSection";
import { BrandLogos } from "@/components/features/home/BrandLogos";
import { CTASection } from "@/components/features/home/CTASection";

export const metadata = {
  title: "B2B Clients & Case Studies | Paras Printers",
  description: "Trusted by over 200+ pharmaceutical, packaged water, FMCG, and logistics companies across Northeast India.",
};

export default function ClientsPage() {
  return (
    <>
      <BrandLogos />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
