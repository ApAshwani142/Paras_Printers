import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/Button";
import { FEATURED_PRODUCTS } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const FeaturedProducts = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--background)]">
      <Container size="xl">
        <SectionTitle
          badge="Featured Products"
          title="Top Demanded Label Specifications"
          subtitle="Explore our most popular roll labels, barcode thermal transfer ribbons, and mineral water wrap sleeves."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All 50+ Label Specifications
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};
