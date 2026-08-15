"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProductCard } from "@/components/shared/ProductCard";
import { SearchBar } from "@/components/ui/SearchBar";
import { FEATURED_PRODUCTS, CATEGORIES } from "@/lib/data";
import { Tag } from "lucide-react";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    return FEATURED_PRODUCTS.filter((prod) => {
      const matchesCategory =
        selectedCategory === "all" || prod.categoryId === selectedCategory || prod.categoryName.toLowerCase().includes(selectedCategory.toLowerCase());
      const matchesSearch =
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 md:py-20 bg-[var(--background)] min-h-screen">
      <Container size="xl">
        <SectionTitle
          badge="Product Catalogue"
          title="B2B Label & Packaging Specifications"
          subtitle="Filter by category or search by label material, application, or industry requirement."
        />

        <div className="mb-10 space-y-6">
          <div className="max-w-md mx-auto">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery("")}
              placeholder="Search PE Barcode, PVC shrink, pharma labels..."
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                selectedCategory === "all"
                  ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                  : "bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
              }`}
            >
              All Labels ({FEATURED_PRODUCTS.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-sm"
                    : "bg-[var(--card)] text-[var(--foreground)] border-[var(--border)] hover:bg-[var(--muted)]"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] max-w-md mx-auto space-y-3">
            <Tag className="w-10 h-10 text-[var(--muted-foreground)] mx-auto" />
            <h3 className="text-base font-bold text-[var(--foreground)]">No Matching Specifications Found</h3>
            <p className="text-xs text-[var(--muted-foreground)]">
              Try adjusting your search query or select another category filter.
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
