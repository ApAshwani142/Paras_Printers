import { z } from "zod";

export const quoteSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  productType: z.string().min(1, "Please select a product category"),
  quantity: z.coerce.number().min(100, "Minimum quantity is 100 units"),
  material: z.string().optional(),
  dimensions: z.string().optional(),
  customNotes: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
