import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { COMPANY_INFO, CATEGORIES } from "@/lib/data";
import { Printer, MapPin, Phone, Mail, Clock, ShieldCheck, Star } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[var(--card)] text-[var(--foreground)] border-t border-[var(--border)] pt-16 pb-8">
      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border)]">
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[var(--primary)] text-white flex items-center justify-center font-black text-xl shadow-md">
                <Printer className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[var(--foreground)]">
                  PARAS PRINTERS
                </span>
                <span className="text-[10px] font-semibold text-[var(--muted-foreground)] tracking-widest uppercase">
                  Packaging & Labels Press
                </span>
              </div>
            </Link>

            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-sm">
              Paras Printers is a GST-verified premier manufacturer of PVC Labels, PE Barcode Label Stickers, Pharmaceutical Vials, Water Bottle Wraps, and Commercial Offset Packaging based in North Guwahati, Assam.
            </p>

            <div className="p-4 rounded-xl bg-[var(--muted)] border border-[var(--border)] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[var(--foreground)]">
                <span className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {COMPANY_INFO.indiamartRating}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> GST VERIFIED
                </span>
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)]">
                {COMPANY_INFO.indiamartTrustYears} • {COMPANY_INFO.responseRate} Response Rate
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs text-[var(--muted-foreground)]">
              <li>
                <Link href="/about" className="hover:text-[var(--primary)]">About Paras Printers</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[var(--primary)]">Printing Services</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Label Solutions</h4>
            <ul className="space-y-2 text-xs text-[var(--muted-foreground)]">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link href={`/products?category=${cat.slug}`} className="hover:text-[var(--primary)]">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[var(--foreground)] uppercase tracking-wider">Contact Manufacturing Unit</h4>
            <ul className="space-y-3 text-xs text-[var(--muted-foreground)]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <a href={`tel:${COMPANY_INFO.phonePrimary}`} className="hover:text-[var(--primary)]">
                  {COMPANY_INFO.phonePrimary}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[var(--primary)]">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[var(--primary)] shrink-0" />
                <span>{COMPANY_INFO.operatingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--muted-foreground)] gap-4">
          <p>© {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. North Guwahati, Assam, India.</p>
          <div className="flex items-center space-x-6">
            <Link href="/request-quote" className="hover:text-[var(--primary)]">Instant Quote</Link>
            <Link href="/contact" className="hover:text-[var(--primary)]">Location Map</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
