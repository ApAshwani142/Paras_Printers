import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { CompanyStats } from "@/components/features/home/CompanyStats";
import { CTASection } from "@/components/features/home/CTASection";
import { COMPANY_INFO } from "@/lib/data";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Paras Printers | Printing & Packaging Manufacturer North Guwahati",
  description: "Learn about Paras Printers history, flexo label printing plant in Guwahati, ISO & GST credentials, and B2B label manufacturing capabilities.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-20 bg-[var(--muted)]/40 border-b border-[var(--border)]">
        <Container size="xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Badge variant="cyan" size="md">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" /> GST Verified B2B Press • 10+ Years Trust
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--foreground)] tracking-tight">
              About Paras Printers
            </h1>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              Based in North Guwahati, Assam, Paras Printers is a leading manufacturer of PVC Labels, PE Barcode Label Stickers, Water Bottle Wraps, Pharmaceutical Vials, and Commercial Packaging for B2B buyers across India.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-[var(--background)]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <SectionTitle
                badge="Our Legacy"
                title="A Decade of Precision Label Engineering in Northeast India"
                align="left"
                className="mb-4"
              />
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Founded in 2014, Paras Printers has grown from a local print shop into a full-scale industrial label manufacturing facility equipped with high-speed multi-color rotary flexographic presses and computerized slitting machines.
              </p>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                We specialize in solving critical labeling challenges for pharmaceutical cleanrooms, beverage bottling lines, cosmetic brands, and high-turnover logistics warehouses.
              </p>

              <div className="space-y-2 pt-2 text-xs font-semibold text-[var(--foreground)]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                  <span>GST Registered Supplier (GSTIN: {COMPANY_INFO.gstin})</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                  <span>IndiaMART Verified Rating: {COMPANY_INFO.indiamartRating} (10+ Years)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />
                  <span>Automated Roll-to-Roll Inspection & Barcode Scan Testing</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden border border-[var(--border)] shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                  alt="Paras Printers Manufacturing Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CompanyStats />
      <CTASection />
    </>
  );
}
