import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { FileSearch, Palette, Printer, Scissors, CheckCircle, Truck } from "lucide-react";

export const ManufacturingProcess = () => {
  const steps = [
    {
      num: "01",
      title: "Design & Proofing",
      desc: "Pre-press file verification, barcode scan compliance check, and digital proofing.",
      icon: <FileSearch className="w-5 h-5 text-sky-500" />,
    },
    {
      num: "02",
      title: "Plate & Polymer Making",
      desc: "High-resolution polymer plate creation for exact registration flexo printing.",
      icon: <Palette className="w-5 h-5 text-purple-500" />,
    },
    {
      num: "03",
      title: "Flexo & Rotary Press",
      desc: "Multi-color UV rotary press printing on PE, BOPP, PVC, or paper substrates.",
      icon: <Printer className="w-5 h-5 text-emerald-500" />,
    },
    {
      num: "04",
      title: "Die-Cutting & Slitting",
      desc: "Automated precision slitting into rolls or sheet packs specified by the buyer.",
      icon: <Scissors className="w-5 h-5 text-amber-500" />,
    },
    {
      num: "05",
      title: "Quality Assurance",
      desc: "Barcode verification, peel test, and batch number tracking tag application.",
      icon: <CheckCircle className="w-5 h-5 text-indigo-500" />,
    },
    {
      num: "06",
      title: "Dispatch & Shipping",
      desc: "Moisture-sealed shrink packaging and express shipping to your factory floor.",
      icon: <Truck className="w-5 h-5 text-pink-500" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--muted)]/40 border-y border-[var(--border)]">
      <Container size="xl">
        <SectionTitle
          badge="Manufacturing Process"
          title="From Concept to Factory Floor Dispatch"
          subtitle="Our 6-step quality-controlled workflow ensures zero defects and exact color matching for every batch."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card key={step.num} className="p-6 space-y-3 relative overflow-hidden hover:border-[var(--primary)] transition-all">
              <span className="text-3xl font-black text-[var(--muted-foreground)]/30 font-mono absolute top-4 right-4 pointer-events-none">
                {step.num}
              </span>
              <div className="w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center">
                {step.icon}
              </div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{step.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{step.desc}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
