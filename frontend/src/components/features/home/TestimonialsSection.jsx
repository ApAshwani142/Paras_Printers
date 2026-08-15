import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { TESTIMONIALS } from "@/lib/data";

export const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--muted)]/30 border-y border-[var(--border)]">
      <Container size="xl">
        <SectionTitle
          badge="Client Testimonials"
          title="Trusted by 200+ Manufacturers Across Northeast & India"
          subtitle="Read what supply chain managers and plant heads say about our print accuracy, delivery speed, and pricing."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </section>
  );
};
