import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS } from "@/lib/data";

export const FAQSection = () => {
  const accordionItems = FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: <p>{faq.answer}</p>,
  }));

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <Container size="lg">
        <SectionTitle
          badge="Frequently Asked Questions"
          title="Everything You Need to Know About B2B Label Orders"
          subtitle="Answers to common questions regarding minimum order quantities, materials, die lines, and delivery lead times."
        />

        <Accordion items={accordionItems} defaultOpenId="faq-1" />
      </Container>
    </section>
  );
};
