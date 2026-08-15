import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Printer, Zap, Award, Layers, Truck } from "lucide-react";

export const WhyChooseUsSection = () => {
  const reasons = [
    {
      title: "10+ Years Trust & GST Verified",
      description: "Established in North Guwahati with a proven track record on IndiaMART as a verified B2B label supplier.",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
    },
    {
      title: "High-Speed Flexo & Rotary Press",
      description: "Multi-color flexo lines capable of continuous roll production up to 150,000 labels per hour.",
      icon: <Printer className="w-6 h-6 text-sky-500" />,
    },
    {
      title: "Precision Die-Cutting Accuracy",
      description: "Laser & rotary slitting ensure exact dimensions for vial labels, water bottle wraps, and box stickers.",
      icon: <Layers className="w-6 h-6 text-purple-500" />,
    },
    {
      title: "Waterproof & Chemical Proof",
      description: "Specialized synthetic PE, BOPP, and PVC films engineered for extreme humidity and cold storage.",
      icon: <Zap className="w-6 h-6 text-amber-500" />,
    },
    {
      title: "Strict Quality Control Lab",
      description: "Every production roll undergoes scanner readability, barcode density, and adhesive peel strength tests.",
      icon: <Award className="w-6 h-6 text-pink-500" />,
    },
    {
      title: "Express Logistics Dispatch",
      description: "Strategic location in Guwahati ensures fast dispatch across Northeast India and Pan-India destinations.",
      icon: <Truck className="w-6 h-6 text-indigo-500" />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[var(--muted)]/30 border-y border-[var(--border)]">
      <Container size="xl">
        <SectionTitle
          badge="Why Choose Paras Printers"
          title="Enterprise Printing Infrastructure Built for B2B Buyers"
          subtitle="Why leading pharmaceutical, FMCG, and water bottling companies choose us as their primary label supplier."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, idx) => (
            <Card key={idx} className="p-6 space-y-3 hover:border-[var(--primary)] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center">
                {r.icon}
              </div>
              <h3 className="text-base font-bold text-[var(--foreground)]">{r.title}</h3>
              <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">{r.description}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
