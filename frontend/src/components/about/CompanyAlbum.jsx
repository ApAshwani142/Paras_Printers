"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";

const ALBUM_IMAGES = [
  {
    id: 1,
    title: "Factory Entrance",
    desc: "Paras Printers workshop gate in North Guwahati.",
    url: "/images/company_album_1.jpg",
  },
  {
    id: 2,
    title: "Business Card",
    desc: "Visiting card detail showing Hitesh Jha.",
    url: "/images/company_album_2.jpg",
  },
  {
    id: 3,
    title: "Workshop Office",
    desc: "B2B order processing and team operations desk.",
    url: "/images/company_album_3.jpg",
  },
  {
    id: 4,
    title: "Label Assembly",
    desc: "Active processing workstation inside the plant.",
    url: "/images/company_album_4.jpg",
  },
  {
    id: 5,
    title: "Machinery Workshop",
    desc: "Computerized label processing machine lines.",
    url: "/images/company_album_5.jpg",
  },
  {
    id: 6,
    title: "Rotary Flexo Press",
    desc: "High-speed multi-color printing roll unit.",
    url: "/images/company_album_6.jpg",
  },
  {
    id: 7,
    title: "Slitting Workstation",
    desc: "Automated precision slitting & finishing line.",
    url: "/images/company_album_7.jpg",
  }
];

export default function CompanyAlbum() {
  return (
    <section className="py-16 md:py-24 bg-[var(--muted)]/10 border-b border-[var(--border)]">
      <Container size="xl">
        <SectionTitle
          badge="Company Album"
          title="Official Plant & Facility Photos"
          subtitle="View real factory photos and business registration records extracted from our verified B2B catalog profile."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mt-12">
          {ALBUM_IMAGES.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <Card className="overflow-hidden h-full group border border-[var(--border)] bg-[var(--card)] rounded-xl shadow hover:shadow-lg transition-all flex flex-col justify-between">
                <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                  <Image
                    src={img.url}
                    alt={img.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 15vw"
                  />
                </div>
                <div className="p-3 space-y-0.5 mt-auto">
                  <h4 className="text-xs font-bold text-[var(--foreground)] leading-tight truncate">
                    {img.title}
                  </h4>
                  <p className="text-[10px] text-[var(--muted-foreground)] leading-tight line-clamp-2">
                    {img.desc}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
