import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-24 md:py-32 bg-[var(--background)] min-h-[70vh] flex items-center justify-center">
      <Container size="md">
        <div className="text-center space-y-6">
          <span className="text-6xl font-black text-[var(--primary)] font-mono">404</span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
            The packaging or product catalogue page you are looking for does not exist or has been moved.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="md" leftIcon={<Home className="w-4 h-4" />}>
                Return to Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                Browse Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
