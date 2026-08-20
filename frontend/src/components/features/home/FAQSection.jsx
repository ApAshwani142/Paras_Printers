import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FAQS } from "@/lib/data";
import { HelpCircle, MessageSquare, Mail, Phone } from "lucide-react";

export const FAQSection = () => {
  const accordionItems = FAQS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--background)] to-[var(--muted)]/20 border-t border-[var(--border)]">
      <Container size="xl">
        <SectionTitle
          badge="Frequently Asked Questions"
          title="Everything You Need to Know About B2B Label Orders"
          subtitle="Answers to common questions regarding minimum order quantities, materials, die lines, and delivery lead times."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          {/* Left Support Info */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 relative overflow-hidden bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent border border-[var(--border)] rounded-2xl shadow-md">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-[var(--primary)]/5 blur-xl -z-10" />
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] mb-4">
                <HelpCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">Still Have Questions?</h3>
              <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
                Can't find the specific answers you're looking for? Reach out directly to our commercial printing press team in Guwahati. We offer custom material consultations and free physical proofing checks.
              </p>
              
              <div className="mt-6 space-y-3">
                <Link href="/contact" className="block w-full">
                  <Button variant="primary" size="md" className="w-full justify-center">
                    Contact Commercial Sales
                  </Button>
                </Link>
                <a href="https://wa.me/917948218863" target="_blank" rel="noopener noreferrer" className="block w-full">
                  <Button variant="outline" size="md" className="w-full justify-center gap-2 border-[var(--border)] hover:bg-[var(--muted)]">
                    <MessageSquare className="w-4 h-4 text-emerald-500" /> Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
                <Phone className="w-5 h-5 mx-auto text-[var(--primary)]" />
                <span className="block text-[10px] font-bold text-[var(--muted-foreground)] uppercase mt-2">Call Sales</span>
                <span className="block text-xs font-bold text-[var(--foreground)] mt-0.5">+91 7948218863</span>
              </div>
              <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-center">
                <Mail className="w-5 h-5 mx-auto text-[var(--primary)]" />
                <span className="block text-[10px] font-bold text-[var(--muted-foreground)] uppercase mt-2">Email Us</span>
                <span className="block text-xs font-bold text-[var(--foreground)] mt-0.5 truncate">info@parasprinters.com</span>
              </div>
            </div>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-7 bg-[var(--card)] rounded-2xl p-4 sm:p-6 border border-[var(--border)] shadow-md">
            <Accordion items={accordionItems} defaultOpenId="faq-1" />
          </div>
        </div>
      </Container>
    </section>
  );
};
