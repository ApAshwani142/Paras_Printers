import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { QuoteForm } from "@/components/shared/QuoteForm";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Phone, Mail, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export const metadata = {
  title: "Request Instant Wholesale Quote | Paras Printers",
  description: "Fill out your custom label specifications (material, dimensions, roll core size, quantity) to receive factory-direct wholesale pricing.",
};

export default function RequestQuotePage() {
  return (
    <div className="py-12 md:py-20 bg-[var(--background)] min-h-screen">
      <Container size="lg">
        <SectionTitle
          badge="Instant B2B Quotation"
          title="Request Custom Factory-Direct Price Quote"
          subtitle="Complete the form below with your required roll dimensions, substrate material, and quantity to receive a formal B2B proposal."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 bg-[var(--card)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-xl">
            <QuoteForm />
          </div>

          <div className="lg:col-span-4 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs border-b border-[var(--border)] pb-3">
                <ShieldCheck className="w-4 h-4" /> GST VERIFIED MANUFACTURER
              </div>

              <div className="space-y-3 text-xs text-[var(--foreground)]">
                <h4 className="font-bold text-sm">Need Direct Sales Assistance?</h4>
                <p className="text-[var(--muted-foreground)] leading-relaxed">
                  Have urgent roll specs or technical questions? Speak directly with our print estimators in North Guwahati.
                </p>

                <div className="space-y-2 pt-2 text-[var(--muted-foreground)]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span>{COMPANY_INFO.phonePrimary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span>{COMPANY_INFO.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--primary)] shrink-0" />
                    <span>{COMPANY_INFO.operatingHours}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
