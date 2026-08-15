import React from "react";
import { Container } from "@/components/ui/Container";
import { StatsCard } from "@/components/shared/StatsCard";
import { Award, Package, ShieldCheck, Clock } from "lucide-react";

export const CompanyStats = () => {
  return (
    <section className="py-12 bg-[var(--card)] border-b border-[var(--border)]">
      <Container size="xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            value="10+ Yrs"
            label="Industry Experience"
            sublabel="Serving B2B Clients Since 2014"
            icon={<Award className="w-6 h-6 text-[var(--primary)]" />}
          />
          <StatsCard
            value="150K+"
            label="Daily Label Capacity"
            sublabel="Multi-Color Flexographic Press Line"
            icon={<Package className="w-6 h-6 text-emerald-500" />}
          />
          <StatsCard
            value="3.7 ⭐"
            label="IndiaMART Rating"
            sublabel="10+ Years Trust Verified Supplier"
            icon={<ShieldCheck className="w-6 h-6 text-amber-500" />}
          />
          <StatsCard
            value="61%"
            label="Quick Response Rate"
            sublabel="Fast Wholesale Quote Processing"
            icon={<Clock className="w-6 h-6 text-sky-500" />}
          />
        </div>
      </Container>
    </section>
  );
};
