import React from "react";
import { WhyChooseUsSection } from "@/components/features/home/WhyChooseUsSection";
import { CompanyStats } from "@/components/features/home/CompanyStats";
import { CTASection } from "@/components/features/home/CTASection";

export const metadata = {
  title: "Why Choose Paras Printers | B2B Printing Advantages",
  description: "Discover why Paras Printers is the trusted B2B label printing press in Assam with 10+ years IndiaMART trust rating.",
};

export default function WhyChooseUsPage() {
  return (
    <>
      <WhyChooseUsSection />
      <CompanyStats />
      <CTASection />
    </>
  );
}
