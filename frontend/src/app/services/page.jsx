import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { CTASection } from "@/components/features/home/CTASection";
import { Printer, Cpu, Scissors, Palette, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Printing & Packaging Services | Paras Printers Guwahati",
  description: "Flexographic roll label printing, offset box packaging, laser die-cutting, rotogravure shrink sleeves, and barcode ribbon supplying services.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "Rotary Flexographic Roll Printing",
      desc: "High-speed multi-color continuous roll printing up to 8 colors with inline UV curing for PE barcode stickers and PVC labels.",
      icon: <Printer className="w-6 h-6 text-sky-500" />,
      specs: ["Up to 8 Colors", "UV & Hot Air Curing", "150,000 labels/hr"],
    },
    {
      title: "Commercial Offset Printing & Box Packaging",
      desc: "Sheet-fed offset printing for pharmaceutical drug cartons, corporate brochures, product catalogs, and folding boxes.",
      icon: <Palette className="w-6 h-6 text-purple-500" />,
      specs: ["High GSM Paper Stock", "Spot UV & Foil Stamping", "15,000 sheets/hr"],
    },
    {
      title: "Automated Precision Die-Cutting & Slitting",
      desc: "Computerized laser & rotary die-cutting ensuring micron-exact dimensions for bottle labels and custom container stickers.",
      icon: <Scissors className="w-6 h-6 text-amber-500" />,
      specs: ["± 0.1 mm Accuracy", "Custom Core Winding", "Roll & Sheet formats"],
    },
    {
      title: "Barcode Thermal Ribbon Supply & Testing",
      desc: "Wholesale supply of Premium Wax, Wax-Resin, and Full Resin barcode thermal ribbons for thermal transfer barcode printers.",
      icon: <Cpu className="w-6 h-6 text-emerald-500" />,
      specs: ["Zebra / TSC Compatible", "Anti-Static Coating", "Scratch Proof"],
    },
  ];

  return (
    <>
      <section className="py-16 md:py-20 bg-[var(--background)] min-h-screen">
        <Container size="xl">
          <SectionTitle
            badge="Printing Capabilities"
            title="Comprehensive Label & Packaging Printing Services"
            subtitle="Equipped with high-volume flexo lines, offset sheet presses, and finishing machinery in North Guwahati."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {services.map((s, idx) => (
              <Card key={idx} className="p-8 space-y-4 hover:border-[var(--primary)] transition-all">
                <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--foreground)]">{s.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">{s.desc}</p>

                <div className="pt-4 border-t border-[var(--border)] flex flex-wrap gap-2">
                  {s.specs.map((spec, i) => (
                    <span key={i} className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--primary)] bg-[var(--accent)] px-2.5 py-1 rounded-md">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {spec}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
