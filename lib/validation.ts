import { z } from "zod";
import { EnquiryStatus } from "@/lib/generated/prisma/enums";

const ENQUIRY_STATUSES = Object.values(EnquiryStatus) as [EnquiryStatus, ...EnquiryStatus[]];

/** Indian mobile number: 10 digits starting 6-9, optional +91 / 0 prefix. */
const indianMobile = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, "").replace(/^(\+91|91|0)(?=\d{10}$)/, ""))
  .pipe(z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"));

export const enquiryInput = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  phone: indianMobile,
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(200)]).default(""),
  course: z.string().trim().max(100).default("GNM"),
  stream: z.string().trim().max(50).default(""),
  village: z.string().trim().max(120).default(""),
  message: z.string().trim().max(1000).default(""),
  language: z.enum(["en", "mr"]).default("en"),
  /** Honeypot: real visitors never fill this hidden field (checked in the route). */
  website: z.string().max(500).optional(),
});
export type EnquiryInput = z.infer<typeof enquiryInput>;

export const enquiryUpdate = z.object({
  status: z.enum(ENQUIRY_STATUSES).optional(),
  notes: z.string().trim().max(2000).optional(),
});

export const noticeInput = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use the format YYYY-MM-DD"),
  title: z.string().trim().min(3).max(300),
  titleMr: z.string().trim().max(300).default(""),
  link: z.string().trim().max(500).default(""),
  published: z.boolean().default(true),
});
export type NoticeInput = z.infer<typeof noticeInput>;
