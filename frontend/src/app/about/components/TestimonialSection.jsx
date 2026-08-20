"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { 
  Star, Quote, ChevronLeft, ChevronRight, Sparkles, Medal, ShieldCheck 
} from "lucide-react";

const INDIAMART_REVIEWS = [
  {
    id: 1,
    rating: 4,
    content: "We've been sourcing our PE barcode label rolls and thermal transfer ribbons from Paras Printers for over 3 years. The print accuracy is high and barcodes scan perfectly every time. Reliable supplier in North Guwahati.",
    author: "Production Manager",
    company: "Guwahati Pharma & Logistics",
    location: "Guwahati, Assam",
    date: "May 2026",
    product: "PE Barcode Label Stickers"
  },
  {
    id: 2,
    rating: 5,
    content: "Highly impressed with their PVC water bottle wrap labels. The print quality is vibrant and the shrink wrap fits perfectly on our automated assembly lines. Great wholesale rates and direct communication. Keep it up!",
    author: "Procurement Lead",
    company: "Northeast Beverages Ltd.",
    location: "Guwahati, Assam",
    date: "March 2026",
    product: "PVC Water Bottle Labels"
  },
  {
    id: 3,
    rating: 4,
    content: "Paras Printers delivers outstanding pharmaceutical vial and bottle labels. Their materials hold up perfectly in cold storage and meet all our cleanroom standards. Recommended for B2B wholesale orders.",
    author: "Quality Inspector",
    company: "Assam BioLabs & Cosmetics",
    location: "Guwahati, Assam",
    date: "January 2026",
    product: "PVC Pharmaceutical Labels"
  }
];

export default function TestimonialSection() {
  const [currentReview, setCurrentReview] = useState(0);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % INDIAMART_REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + INDIAMART_REVIEWS.length) % INDIAMART_REVIEWS.length);
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: IndiaMart Verified Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-500/20 p-8 shadow-xl">
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-orange-500/5 blur-2xl -z-10" />
              
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                  <Medal className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider">IndiaMART Trust Profile</span>
                  <h3 className="text-lg font-black text-[var(--foreground)] mt-0.5">Verified B2B Member</h3>
                </div>
              </div>

              <div className="mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-black text-[var(--foreground)] tracking-tight">3.7</span>
                <span className="text-sm font-bold text-[var(--muted-foreground)]">/ 5.0 Rating</span>
              </div>

              <div className="flex items-center gap-1 mt-2">
                {[1, 2, 3].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
                <Star className="w-5 h-5 fill-amber-400/40 text-amber-400/60" />
                <Star className="w-5 h-5 text-slate-300 dark:text-slate-700" />
                <span className="text-xs text-[var(--muted-foreground)] font-semibold ml-2">(3 customer reviews)</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[var(--border)]">
                <div>
                  <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Response Rate</p>
                  <p className="text-lg font-black text-emerald-500 mt-1">61%</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider">Membership</p>
                  <p className="text-lg font-black text-[var(--primary)] mt-1">10 Years +</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>GSTIN Status Checked & Approved</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Slide/Fading Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <Badge variant="cyan" size="md" className="mb-2">
                <Sparkles className="w-3 h-3 mr-1 text-sky-500" /> Customer Reviews
              </Badge>
              <h2 className="text-3xl font-black text-[var(--foreground)] tracking-tight">
                What Clients Say About Paras Printers
              </h2>
            </div>

            <div className="relative min-h-[220px] rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-lg flex flex-col justify-between">
              <div className="absolute right-6 top-6 text-[var(--muted-foreground)]/10">
                <Quote className="w-16 h-16 transform rotate-180" />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentReview}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star 
                        key={idx} 
                        className={`w-4 h-4 ${
                          idx < INDIAMART_REVIEWS[currentReview].rating 
                            ? "fill-amber-400 text-amber-400" 
                            : "text-slate-300 dark:text-slate-700"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-[var(--foreground)] italic leading-relaxed font-medium">
                    "{INDIAMART_REVIEWS[currentReview].content}"
                  </p>

                  <div className="pt-2 border-t border-[var(--border)] flex items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xs font-black text-[var(--foreground)]">
                        {INDIAMART_REVIEWS[currentReview].author}
                      </h4>
                      <p className="text-[10px] text-[var(--muted-foreground)] font-semibold mt-0.5">
                        {INDIAMART_REVIEWS[currentReview].company} • {INDIAMART_REVIEWS[currentReview].location}
                      </p>
                    </div>
                    <span className="inline-flex rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[9px] font-bold text-[var(--primary)] tracking-wide">
                      {INDIAMART_REVIEWS[currentReview].product}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center gap-2.5 mt-6 self-end">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg shrink-0 border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]"
                  onClick={prevReview}
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4 text-[var(--foreground)]" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-8 w-8 rounded-lg shrink-0 border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--muted)]"
                  onClick={nextReview}
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4 text-[var(--foreground)]" />
                </Button>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
