"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Hide loader once the new page is loaded and path/search parameters have updated
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    window.addEventListener("routeTransitionStart", handleStart);
    return () => {
      window.removeEventListener("routeTransitionStart", handleStart);
    };
  }, []);

  useEffect(() => {
    const handleAnchorClick = (event) => {
      // Find the closest anchor tag
      const anchor = event.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      
      // Ignore external links, mailto, tel, anchor hashes, same page, target="_blank", or download links
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        anchor.getAttribute("target") === "_blank" ||
        anchor.hasAttribute("download")
      ) {
        return;
      }

      // Check if it navigates to a new page
      try {
        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        if (
          targetUrl.pathname !== currentUrl.pathname ||
          targetUrl.search !== currentUrl.search
        ) {
          setLoading(true);
        }
      } catch (err) {
        // Fallback for relative paths
        if (href !== pathname) {
          setLoading(true);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)] animate-fadeIn">
      <div className="relative flex flex-col items-center p-8 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl max-w-sm w-full mx-4 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent rounded-2xl blur-xl -z-10 animate-pulse" />
        
        {/* Spinner & Logo container */}
        <div className="relative flex items-center justify-center w-20 h-20 mb-6">
          {/* Track */}
          <div className="absolute inset-0 rounded-full border-4 border-[var(--border)]" />
          {/* Animated Spinner ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[var(--primary)] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          
          {/* Brand Icon (Lucide Printer SVG) */}
          <div className="w-11 h-11 rounded-xl bg-[var(--accent)] text-[var(--accent-foreground)] flex items-center justify-center shadow-inner">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 animate-pulse"
            >
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <path d="M6 9V2h12v7" />
              <rect x="6" y="14" width="12" height="8" rx="1" />
            </svg>
          </div>
        </div>

        {/* Brand Text */}
        <h3 className="text-[17px] font-black tracking-tight text-[var(--foreground)]">
          PARAS PRINTERS
        </h3>
        
        <p className="mt-1 text-[9px] font-bold tracking-[0.16em] uppercase text-[var(--muted-foreground)]">
          Packaging & Labels
        </p>

        {/* Loading status text */}
        <p className="mt-4 text-xs font-semibold text-[var(--muted-foreground)] animate-pulse">
          Loading page content...
        </p>
      </div>
    </div>
  );
}
