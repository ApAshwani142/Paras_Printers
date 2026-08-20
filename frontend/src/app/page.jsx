import React from "react";
import { HeroSection } from "@/components/features/home/HeroSection";
import { BrandLogos } from "@/components/features/home/BrandLogos";
import { ProductCategories } from "@/components/features/home/ProductCategories";
import { WhyChooseUsSection } from "@/components/features/home/WhyChooseUsSection";
import { CompanyStats } from "@/components/features/home/CompanyStats";
import { ManufacturingProcess } from "@/components/features/home/ManufacturingProcess";
import { FeaturedProducts } from "@/components/features/home/FeaturedProducts";
import { TestimonialsSection } from "@/components/features/home/TestimonialsSection";
import { FAQSection } from "@/components/features/home/FAQSection";
import { CTASection } from "@/components/features/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandLogos />
      <ProductCategories />
      <CompanyStats />
      <FeaturedProducts />
      <WhyChooseUsSection />
      <ManufacturingProcess />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
