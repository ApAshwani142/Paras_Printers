import React from "react";
import { Container } from "@/components/ui/Container";
import { ShieldCheck, Award, Cpu, Zap } from "lucide-react";

export const BrandLogos = () => {
  const certifications = [
    { title: "GST Registered", subtitle: "18AABCP1234F1Z9", icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
    { title: "IndiaMART Verified", subtitle: "10+ Years Supplier", icon: <Award className="w-5 h-5 text-cyan-500" /> },
    { title: "Flexo Rotary Press", subtitle: "Multi-Color Line", icon: <Zap className="w-5 h-5 text-amber-500" /> },
    { title: "Laser Die-Cutting", subtitle: "± 0.1mm Precision", icon: <Cpu className="w-5 h-5 text-sky-500" /> },
  ];

  return (
    <section className="py-8 bg-[var(--muted)]/50 border-y border-[var(--border)]">
      <Container size="xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xs">
              <div className="p-2 rounded-lg bg-[var(--muted)] shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[var(--foreground)]">{item.title}</h4>
                <p className="text-[11px] text-[var(--muted-foreground)]">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
