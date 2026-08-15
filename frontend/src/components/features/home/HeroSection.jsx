"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { ShieldCheck, Star, ArrowRight, Printer, CheckCircle2 } from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";

export const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-b from-[var(--accent)]/40 via-[var(--background)] to-[var(--background)]">
      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              GST Verified Manufacturer • {COMPANY_INFO.indiamartTrustYears}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] tracking-tight leading-[1.15]">
              High-Precision <span className="text-[var(--primary)]">PVC & Barcode Labels</span> Manufacturer in Guwahati
            </h1>

            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-2xl">
              Paras Printers operates state-of-the-art flexographic and rotary label presses in North Guwahati, Assam. We deliver custom roll barcode stickers, pharmaceutical vial labels, food container shrink sleeves, and commercial packaging.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-medium text-[var(--foreground)]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <span>Multi-Color Flexo Press</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <span>Precision Automated Slitting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <span>Water & Chemical Proof</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <span>Pan-India Logistics</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/request-quote">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Request Wholesale Quote
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg" leftIcon={<Printer className="w-4 h-4 text-[var(--primary)]" />}>
                  Explore Product Catalogue
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t border-[var(--border)] flex items-center space-x-6 text-xs text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-[var(--foreground)]">{COMPANY_INFO.indiamartRating}</span>
                <span>IndiaMART Rating</span>
              </div>
              <div className="h-4 w-px bg-[var(--border)]" />
              <div>
                <span className="font-bold text-[var(--foreground)]">{COMPANY_INFO.responseRate}</span> Quick Response Rate
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-2xl">
              <div className="relative h-72 sm:h-96 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop"
                  alt="Paras Printers High Speed Flexographic Press"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <Badge variant="cyan" className="w-fit mb-2">North Guwahati Press Unit</Badge>
                  <h3 className="text-lg font-bold">150,000+ Labels Daily Output</h3>
                  <p className="text-xs text-slate-300">Roll-to-roll continuous barcode & pharmaceutical label manufacturing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
