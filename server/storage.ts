import { db } from "./db";
import {
  packages,
  inquiries,
  type Package,
  type InsertPackage,
  type InsertInquiry,
  type Inquiry
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPackages(category?: string): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class DatabaseStorage implements IStorage {
  async getPackages(category?: string): Promise<Package[]> {
    if (category) {
      return await db.select().from(packages).where(eq(packages.category, category));
    }
    return await db.select().from(packages);
  }

  async getPackage(id: number): Promise<Package | undefined> {
    const [pkg] = await db.select().from(packages).where(eq(packages.id, id));
    return pkg;
  }

  async createPackage(insertPackage: InsertPackage): Promise<Package> {
    const [pkg] = await db.insert(packages).values(insertPackage).returning();
    return pkg;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db.insert(inquiries).values(insertInquiry).returning();
    return inquiry;
  }
}

export const storage = new DatabaseStorage();
