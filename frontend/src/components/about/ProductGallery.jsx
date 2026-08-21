"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

const GALLERY_PRODUCTS = [
  {
    id: 1,
    title: "PVC Pharmaceutical Labels",
    desc: "Precision labels designed for vials, ampoules, and medicine bottles with high-adhesion backing that resists moisture and low temperatures.",
    image: "/images/catalog_pvc_labels.jpg",
    badge: "Pharma Grade"
  },
  {
    id: 2,
    title: "PE Barcode Label Stickers",
    desc: "Durable Polyethylene roll labels optimized for warehouse logistics, serial numbering, and clear barcode scan readability.",
    image: "/images/catalog_barcode_stickers.jpg",
    badge: "Industrial"
  },
  {
    id: 3,
    title: "PVC Water Bottle Labels",
    desc: "High-shrink wrap labels for mineral water bottles, customized with premium flexo color-fast printing and easy perforation lines.",
    image: "/images/catalog_bottle_stickers.jpg",
    badge: "FMCG Wrap"
  },
  {
    id: 4,
    title: "PP Customizable Bottle Labels",
    desc: "Polypropylene packaging labels with gloss or matte finishes, designed for cosmetics, oils, and chemical product containers.",
    image: "/images/catalog_pp_labels.jpg",
    badge: "Premium Matte"
  },
  {
    id: 5,
    title: "Thermal Transfer Resin Ribbons",
    desc: "Premium quality wax-resin and resin thermal ribbons for printing high-density labels that resist scratch and chemical exposure.",
    image: "/images/catalog_resin_ribbon.jpg",
    badge: "Printing Consumables"
  },
  {
    id: 6,
    title: "Adhesive Fabric & Metal Labels",
    desc: "Heavy-duty label substrates suitable for machinery serialization plates, metallic tags, and textured fabric assets.",
    image: "/images/catalog_printing_services.jpg",
    badge: "Specialty Substrates"
  }
];

export default function ProductGallery() {
  return (
    <section className="py-16 md:py-24 bg-[var(--muted)]/20 border-y border-[var(--border)]">
      <Container size="xl">
        <SectionTitle
          badge="Product Catalogue Gallery"
          title="Premium B2B Substrates & Label Formats"
          subtitle="View our primary range of direct-factory labels and print consumables sourced by manufacturing units."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {GALLERY_PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="overflow-hidden group h-full flex flex-col justify-between hover:shadow-xl hover:border-[var(--ring)]/50 transition-all border border-[var(--border)] bg-[var(--card)] rounded-2xl">
                <div>
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={prod.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider border border-white/10">
                      {prod.badge}
                    </div>
                    
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Link href="/request-quote">
                        <Button variant="primary" size="sm" className="shadow-lg">
                          Request Quote <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {prod.title}
                    </h4>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {prod.desc}
                    </p>
                  </div>
                </div>
                
                <div className="px-5 pb-5 pt-0 mt-auto">
                  <Link
                    href="/request-quote"
                    className="text-xs font-bold text-[var(--primary)] hover:underline inline-flex items-center gap-1 group-hover:gap-1.5 transition-all"
                  >
                    Configure Specs <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
