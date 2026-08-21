"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/lib/validations";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, User, Mail, Phone, MessageSquare, Send } from "lucide-react";

export const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 800));
      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Failed to send contact inquiry:", err);
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
        <h3 className="text-xl font-bold text-[var(--foreground)]">Inquiry Received!</h3>
        <p className="text-xs text-[var(--muted-foreground)] max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to Paras Printers. Our print consultants will contact you within 2 business hours.
        </p>
        <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Name *"
          placeholder="e.g. Rahul Sharma"
          leftIcon={<User className="w-4 h-4" />}
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="e.g. rahul@company.com"
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone / Mobile *"
          type="tel"
          placeholder="+91 98765 43210"
          leftIcon={<Phone className="w-4 h-4" />}
          error={errors.phone?.message}
          {...register("phone")}
        />
        <Input
          label="Subject / Label Type *"
          placeholder="e.g. PE Barcode Labels Inquiry"
          leftIcon={<MessageSquare className="w-4 h-4" />}
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      <Textarea
        label="Detailed Requirements / Specifications *"
        placeholder="Please specify label dimensions, material type, application (bottle, box, vial), roll core size, and estimated order quantity..."
        error={errors.message?.message}
        {...register("message")}
      />

      <Button type="submit" variant="primary" size="lg" isLoading={loading} className="w-full sm:w-auto" rightIcon={<Send className="w-4 h-4" />} >
        Submit Contact Inquiry
      </Button>
    </form>
  );
};
