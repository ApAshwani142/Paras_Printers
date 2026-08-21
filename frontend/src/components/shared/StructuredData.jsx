import React from "react";
import { COMPANY_INFO } from "@/lib/data";

export const StructuredData = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    url: "https://parasprinters.com",
    logo: "https://parasprinters.com/logo.png",
    description: COMPANY_INFO.tagline,
    telephone: COMPANY_INFO.phonePrimary,
    email: COMPANY_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. 42, Industrial Area",
      addressLocality: "North Guwahati",
      addressRegion: "Assam",
      postalCode: "781030",
      addressCountry: "IN",
    },
    sameAs: ["https://www.indiamart.com/paras-printers-guwahati/"],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: COMPANY_INFO.name,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800",
    telephone: COMPANY_INFO.phonePrimary,
    email: COMPANY_INFO.email,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. 42, Industrial Area, North Guwahati",
      addressLocality: "Guwahati",
      addressRegion: "Assam",
      postalCode: "781030",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.195,
      longitude: 91.73,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:30",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  );
};
