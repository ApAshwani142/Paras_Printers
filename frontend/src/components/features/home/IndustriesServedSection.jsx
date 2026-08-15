import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { IndustryCard } from "@/components/shared/IndustryCard";
import { INDUSTRIES } from "@/lib/data";

export const IndustriesServedSection = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <Container size="xl">
        <SectionTitle
          badge="Industries Served"
          title="Tailored Label Solutions for Demanding Industries"
          subtitle="From pharmaceutical serialization compliance to beverage shrink wrapping, we understand your industry standards."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((ind) => (
            <IndustryCard key={ind.id} industry={ind} />
          ))}
        </div>
      </Container>
    </section>
  );
};
