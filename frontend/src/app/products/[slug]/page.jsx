import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FEATURED_PRODUCTS } from "@/lib/data";
import { CheckCircle2, ShieldCheck, FileText, ArrowLeft, PackageCheck } from "lucide-react";

export async function generateStaticParams() {
  return FEATURED_PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export default async function ProductDetailPage(props) {
  const params = await props.params;
  const product = FEATURED_PRODUCTS.find((p) => p.slug === params.slug) || FEATURED_PRODUCTS[0];

  if (!product) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20 bg-[var(--background)] min-h-screen">
      <Container size="xl">
        <div className="mb-6">
          <Link href="/products">
            <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back to Products Catalogue
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-6 space-y-4">
            <div className="relative h-80 sm:h-[420px] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-lg">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <Badge variant="cyan" size="md">
                {product.categoryName}
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-[var(--card)] border border-[var(--border)]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                Key Performance Features
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--foreground)]/90">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {product.technicalSpecs && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Technical Specifications
                </h3>
                <div className="border border-[var(--border)] rounded-xl overflow-hidden text-xs">
                  {Object.entries(product.technicalSpecs).map(([key, val], idx) => (
                    <div
                      key={key}
                      className={`flex justify-between p-3 ${
                        idx % 2 === 0 ? "bg-[var(--card)]" : "bg-[var(--muted)]/50"
                      }`}
                    >
                      <span className="font-semibold text-[var(--muted-foreground)]">{key}</span>
                      <span className="font-bold text-[var(--foreground)]">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Card className="p-6 space-y-4 bg-[var(--accent)]/30 border-[var(--primary)]/30">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--foreground)] flex items-center gap-1.5">
                  <PackageCheck className="w-4 h-4 text-[var(--primary)]" />
                  MOQ: {product.minOrderQty.toLocaleString()} units / rolls
                </span>
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Direct Press Pricing
                </span>
              </div>

              <Link href={`/request-quote?product=${encodeURIComponent(product.name)}`}>
                <Button variant="primary" size="lg" className="w-full" leftIcon={<FileText className="w-4 h-4" />}>
                  Request Price Quote for {product.name}
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
}
