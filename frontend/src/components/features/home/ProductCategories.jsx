import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { CATEGORIES } from "@/lib/data";
import { ArrowRight, Tag, QrCode, Utensils, Pill, Sparkles, Factory, Package, ShieldAlert } from "lucide-react";

const ICON_MAP = {
  Tag: <Tag className="w-6 h-6 text-sky-500" />,
  QrCode: <QrCode className="w-6 h-6 text-cyan-500" />,
  Utensils: <Utensils className="w-6 h-6 text-emerald-500" />,
  Pill: <Pill className="w-6 h-6 text-purple-500" />,
  Sparkles: <Sparkles className="w-6 h-6 text-pink-500" />,
  Factory: <Factory className="w-6 h-6 text-amber-500" />,
  Package: <Package className="w-6 h-6 text-indigo-500" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6 text-red-500" />,
};

export const ProductCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <Container size="xl">
        <SectionTitle
          badge="Product Portfolio"
          title="Custom B2B Labels & Packaging Solutions"
          subtitle="Engineered for high-volume automated manufacturing lines, moisture resistance, and barcode readability."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/products?category=${cat.slug}`} className="group">
              <Card className="p-6 space-y-4 h-full flex flex-col justify-between hover:border-[var(--primary)]">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--muted)] flex items-center justify-center group-hover:scale-110 transition-transform">
                    {ICON_MAP[cat.iconName] || <Tag className="w-6 h-6 text-[var(--primary)]" />}
                  </div>
                  <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-[var(--primary)]">
                  <span>{cat.productCount}+ Specifications</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};
