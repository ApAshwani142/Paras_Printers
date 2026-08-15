import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/shared/ContactForm";
import { MapComponent } from "@/components/shared/MapComponent";
import { Card } from "@/components/ui/Card";
import { COMPANY_INFO } from "@/lib/data";
import { MapPin, Phone, Mail, Clock, ShieldCheck, Star } from "lucide-react";

export const metadata = {
  title: "Contact Manufacturing Unit | Paras Printers Guwahati",
  description: "Get in touch with Paras Printers label plant in North Guwahati, Assam. Phone, email, GST registration, and map location.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-[var(--background)] min-h-screen">
      <Container size="xl">
        <SectionTitle
          badge="Contact Press"
          title="Get in Touch with Paras Printers"
          subtitle="Visit our manufacturing unit in North Guwahati or send an inquiry to our sales team."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <h3 className="text-base font-bold text-[var(--foreground)] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--primary)]" /> Factory Address
                </h3>
                <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> GST VERIFIED
                </span>
              </div>

              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed font-medium">
                {COMPANY_INFO.name}<br />
                Manufacturer & Supplier of PVC & Barcode Labels<br />
                {COMPANY_INFO.address}
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-[var(--foreground)]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <span>{COMPANY_INFO.phonePrimary} / {COMPANY_INFO.phoneSecondary}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                  <span>{COMPANY_INFO.indiamartRating} Rating • {COMPANY_INFO.indiamartTrustYears}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[var(--primary)] shrink-0" />
                  <span>{COMPANY_INFO.operatingHours}</span>
                </div>
              </div>
            </Card>

            <MapComponent />
          </div>

          <div className="lg:col-span-7 bg-[var(--card)] p-6 sm:p-8 rounded-2xl border border-[var(--border)] shadow-xl">
            <h3 className="text-lg font-bold text-[var(--foreground)] border-b border-[var(--border)] pb-4 mb-6">
              Send General Inquiry
            </h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
