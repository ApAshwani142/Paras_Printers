import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BlogCard } from "@/components/shared/BlogCard";
import { BLOGS } from "@/lib/data";

export const LatestBlogs = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--muted)]/20 border-t border-[var(--border)]">
      <Container size="xl">
        <SectionTitle
          badge="Technical Printing Knowledge"
          title="Latest Insights on Label Engineering & Compliance"
          subtitle="Expert articles on barcode barcode scanner readability, pharmaceutical GMP compliance, and film selection."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOGS.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </Container>
    </section>
  );
};
