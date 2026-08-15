import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FileText, MessageSquareText, ShieldCheck } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--secondary)] text-[var(--foreground)] relative overflow-hidden border-y border-[var(--border)]">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[var(--primary)]/10 blur-[120px] pointer-events-none rounded-full" />

      <Container size="xl">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> GST Verified Supplier • North Guwahati Factory
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight">
            Ready to Upgrade Your Packaging & Barcode Label Quality?
          </h2>

          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed max-w-2xl mx-auto">
            Get instant factory-direct pricing for custom roll labels, PE barcode stickers, and water bottle shrink wraps with fast dispatch across India.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/request-quote">
              <Button variant="primary" size="lg" leftIcon={<FileText className="w-4 h-4" />}>
                Request Instant Price Quote
              </Button>
            </Link>
            <a
              href={`https://wa.me/919876543210?text=Hello%20Paras%20Printers,%20I%20want%20a%20price%20quote.`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--accent)]"
                leftIcon={<MessageSquareText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              >
                WhatsApp Sales Desk
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
};
