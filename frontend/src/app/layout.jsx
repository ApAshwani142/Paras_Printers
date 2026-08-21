import "./globals.css";
import { Suspense } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { StructuredData } from "@/components/shared/StructuredData";
import TransitionLoader from "@/components/shared/TransitionLoader";

import { COMPANY_INFO } from "@/lib/data";

import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: {
    default: `${COMPANY_INFO.name} | Manufacturer of PVC & Barcode Labels Guwahati`,
    template: `%s | ${COMPANY_INFO.name}`,
  },

  description: `${COMPANY_INFO.name} is a premier manufacturer of PVC Labels, PE Barcode Label Stickers, Water Bottle Wraps, and Pharmaceutical Labels in North Guwahati, Assam.`,

  keywords: [
    "PVC Labels Guwahati",
    "PE Barcode Label Stickers Assam",
    "Water Bottle Labels Manufacturer",
    "Pharmaceutical Labels Guwahati",
    "Barcode Thermal Ribbon Supplier",
    "Printing Press North Guwahati",
    "Packaging Labels India",
  ],

  authors: [
    {
      name: COMPANY_INFO.name,
    },
  ],

  creator: COMPANY_INFO.name,

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://parasprinters.com",

    title: `${COMPANY_INFO.name} | Premium B2B Label Manufacturer`,

    description: COMPANY_INFO.tagline,

    siteName: COMPANY_INFO.name,

    images: [
      {
        url: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: COMPANY_INFO.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: COMPANY_INFO.name,

    description: COMPANY_INFO.tagline,

    images: [
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200",
    ],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children}) {
  return (
    <html lang="en" suppressHydrationWarning >
      <head>
        <StructuredData />
      </head>

      <body className="min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <Suspense fallback={null}>
            <TransitionLoader />
          </Suspense>

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}