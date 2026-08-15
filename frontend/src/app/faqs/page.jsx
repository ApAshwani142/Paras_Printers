import React from "react";
import { FAQSection } from "@/components/features/home/FAQSection";
import { CTASection } from "@/components/features/home/CTASection";

export const metadata = {
  title: "Frequently Asked Questions | Paras Printers FAQs",
  description: "Find answers regarding minimum order quantities, label material choices, shipping lead times, and quote requests.",
};

export default function FAQPage() {
  return (
    <>
      <FAQSection />
      <CTASection />
    </>
  );
}
