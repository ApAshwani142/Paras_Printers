"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { CompanyStats } from "@/components/features/home/CompanyStats";
import { CTASection } from "@/components/features/home/CTASection";
import { COMPANY_INFO } from "@/lib/data";
import { ShieldCheck, CheckCircle2 } from "lucide-react";

// Sub-components
import ProductGallery from "../../components/about/ProductGallery";
import CompanyAlbum from "../../components/about/CompanyAlbum";
import TestimonialSection from "../../components/about/TestimonialSection";

export default function AboutPageClient() {
  return (
    <>
      {/* Page Hero Header */}
      <section className="py-16 md:py-24 bg-[var(--muted)]/40 border-b border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 via-transparent to-transparent -z-10" />
        <Container size="xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Badge variant="cyan" size="md">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" /> GST Verified B2B Press • 10+ Years Trust
              </Badge>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-black text-[var(--foreground)] tracking-tight"
            >
              About Paras Printers
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed"
            >
              Based in North Guwahati, Assam, Paras Printers is a leading manufacturer of PVC Labels, PE Barcode Label Stickers, Water Bottle Wraps, Pharmaceutical Vials, and Commercial Packaging for B2B buyers across India.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Legacy and Printing Plant Section */}
      <section className="py-16 md:py-24 bg-[var(--background)]">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 space-y-5"
            >
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

              <div className="space-y-2.5 pt-2 text-xs font-semibold text-[var(--foreground)]">
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
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-[var(--border)] shadow-xl group">
                <Image
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
                  alt="Paras Printers Manufacturing Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Product Gallery Section */}
      <ProductGallery />

      {/* Real IndiaMart Company Album */}
      <CompanyAlbum />

      {/* Split-Layout Testimonials & IndiaMart Ratings */}
      <TestimonialSection />

      <CompanyStats />
      <CTASection />
    </>
  );
}
