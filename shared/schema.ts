import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Storing as integer (e.g. cents or whole currency)
  startDate: timestamp("start_date"),
  duration: text("duration"), // e.g. "5 Days / 4 Nights"
  image: text("image").notNull(),
  category: text("category").notNull(), // 'domestic' or 'international'
  location: text("location").notNull(),
  featured: boolean("featured").default(false),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").references(() => packages.id),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPackageSchema = createInsertSchema(packages).omit({ id: true });
export const insertInquirySchema = createInsertSchema(inquiries).omit({ id: true, createdAt: true });

export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
