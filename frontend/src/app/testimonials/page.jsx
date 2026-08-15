import React from "react";
import { TestimonialsSection } from "@/components/features/home/TestimonialsSection";
import { CTASection } from "@/components/features/home/CTASection";

export const metadata = {
  title: "Client Testimonials & Reviews | Paras Printers Guwahati",
  description: "Read verified B2B client reviews and ratings for Paras Printers label manufacturing.",
};

export default function TestimonialsPage() {
  return (
    <>
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
