"use client";

import React from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
import { ArrowRight, Tag, QrCode, Utensils, Pill, Sparkles, Factory, Package, ShieldAlert } from "lucide-react";

const ICON_MAP = {
  Tag: <Tag className="w-5 h-5 text-sky-500" />,
  QrCode: <QrCode className="w-5 h-5 text-cyan-500" />,
  Utensils: <Utensils className="w-5 h-5 text-emerald-500" />,
  Pill: <Pill className="w-5 h-5 text-purple-500" />,
  Sparkles: <Sparkles className="w-5 h-5 text-pink-500" />,
  Factory: <Factory className="w-5 h-5 text-amber-500" />,
  Package: <Package className="w-5 h-5 text-indigo-500" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5 text-red-500" />,
};

export const MegaMenu = ({ onClose }) => {
  return (
    <div className="absolute top-full left-0 w-full bg-[var(--card)] border-b border-[var(--border)] shadow-2xl py-8 animate-fadeIn z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border)]">
          <div>
            <h3 className="text-base font-bold text-[var(--foreground)]">Product Categories Catalogue</h3>
            <p className="text-xs text-[var(--muted-foreground)]">Explore our enterprise label & packaging solutions</p>
          </div>
          <Link
            href="/products"
            onClick={onClose}
            className="text-xs font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
          >
            View All Products Catalogue <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              onClick={onClose}
              className="group p-3 rounded-xl border border-transparent hover:border-[var(--border)] hover:bg-[var(--muted)]/50 transition-all flex items-start space-x-3"
            >
              <div className="p-2 rounded-lg bg-[var(--muted)] shrink-0 group-hover:scale-105 transition-transform">
                {ICON_MAP[cat.iconName] || <Tag className="w-5 h-5 text-[var(--primary)]" />}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                  {cat.name}
                </h4>
                <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
