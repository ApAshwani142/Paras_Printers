"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/data";
import { CheckCircle2, Send, Building2, User, Mail, Phone, Package, Tag, Layers, Ruler } from "lucide-react";

export const QuoteForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: { quantity: 1000},
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 900));
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Failed to submit quote request:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-fadeIn">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-[var(--foreground)]">Quote Request Submitted!</h3>
        <p className="text-xs text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
          Our technical estimator will review your dimensions and roll specifications and deliver a custom wholesale quotation via email and WhatsApp shortly.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Submit Another Quote Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-2">
          <Building2 className="w-4 h-4" /> 1. Contact & Company Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Company Name *"
            placeholder="e.g. Northeast BioPharma Ltd."
            leftIcon={<Building2 className="w-4 h-4" />}
            error={errors.companyName?.message}
            {...register("companyName")}
          />
          <Input
            label="Contact Person Name *"
            placeholder="e.g. Amit Verma"
            leftIcon={<User className="w-4 h-4" />}
            error={errors.contactPerson?.message}
            {...register("contactPerson")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Corporate Email *"
            type="email"
            placeholder="e.g. purchasing@biopharma.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Phone / Mobile Number *"
            type="tel"
            placeholder="+91 98765 43210"
            leftIcon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--border)]">
        <h3 className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-2">
          <Tag className="w-4 h-4" /> 2. Label & Packaging Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[var(--foreground)] tracking-wide">
              Product Category *
            </label>
            <select
              className="w-full h-10 px-3 py-2 text-sm bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
              {...register("productType")}
            >
              <option value="">Select a Category</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.productType && <p className="text-xs text-red-500 font-medium">{errors.productType.message}</p>}
          </div>

          <Input
            label="Required Quantity (units / rolls) *"
            type="number"
            placeholder="e.g. 5000"
            leftIcon={<Package className="w-4 h-4" />}
            error={errors.quantity?.message}
            {...register("quantity")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Substrate Material (Optional)"
            placeholder="e.g. Polyethylene (PE), PVC, Paper"
            leftIcon={<Layers className="w-4 h-4" />}
            {...register("material")}
          />
          <Input
            label="Dimensions (W x H in mm or inches) (Optional)"
            placeholder="e.g. 100mm x 50mm"
            leftIcon={<Ruler className="w-4 h-4" />}
            {...register("dimensions")}
          />
        </div>

        <Textarea
          label="Custom Notes / Core Size / Special Instructions"
          placeholder="Specify thermal printer model, roll winding direction, laminate finish (gloss/matte), or custom die-cut shape details..."
          {...register("customNotes")}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full" rightIcon={<Send className="w-4 h-4" />} >
        Request Custom Price Quote
      </Button>
    </form>
  );
};
