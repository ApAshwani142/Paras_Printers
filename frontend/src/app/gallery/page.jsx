import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { CTASection } from "@/components/features/home/CTASection";

export const metadata = {
  title: "Factory & Manufactured Product Gallery | Paras Printers",
  description: "View photos of manufactured PVC labels, PE barcode rolls, mineral water shrink wraps, and flexo printing machinery.",
};

export default function GalleryPage() {
  const images = [
    { title: "PE Barcode Label Rolls", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800" },
    { title: "Multi-Color Flexo Press Line", url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800" },
    { title: "PVC Water Bottle Shrink Sleeves", url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800" },
    { title: "Pharmaceutical Vial Labels", url: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800" },
    { title: "Clear Cosmetic Container Stickers", url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800" },
    { title: "Automated Laser Slitting Line", url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800" },
  ];

  return (
    <>
      <div className="py-16 md:py-24 bg-[var(--background)]">
        <Container size="xl">
          <SectionTitle
            badge="Factory Album"
            title="Manufactured Labels & Plant Gallery"
            subtitle="Take a visual tour of our North Guwahati production facility and completed B2B label orders."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
            {images.map((item, idx) => (
              <div key={idx} className="group relative h-64 rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-md">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-sm font-bold text-white tracking-wide">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <CTASection />
    </>
  );
}
