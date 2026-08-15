import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, PackageCheck } from "lucide-react";

export const ProductCard = ({ product }) => {
  return (
    <Card className="group flex flex-col overflow-hidden h-full">
      <div className="relative h-48 sm:h-56 w-full bg-[var(--muted)] overflow-hidden">
        <Image
          src={product.images[0] || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant="cyan" size="sm">
            {product.categoryName}
          </Badge>
          {product.isFeatured && (
            <Badge variant="warning" size="sm">
              Featured
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)]">
            {product.name}
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
            {product.subtitle || product.description}
          </p>

          <ul className="pt-2 space-y-1.5 text-xs text-[var(--foreground)]/80">
            {product.features.slice(0, 2).map((feat, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between gap-3">
          <div className="text-[11px] text-[var(--muted-foreground)] flex items-center gap-1 font-medium">
            <PackageCheck className="w-3.5 h-3.5 text-[var(--primary)]" />
            <span>MOQ: {product.minOrderQty.toLocaleString()} units</span>
          </div>

          <Link href={`/products/${product.slug}`}>
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
