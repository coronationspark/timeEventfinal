import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.packages.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const packages = await storage.getPackages(category);
    res.json(packages);
  });

  app.get(api.packages.get.path, async (req, res) => {
    const pkg = await storage.getPackage(Number(req.params.id));
    if (!pkg) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(pkg);
  });

  app.post(api.packages.create.path, async (req, res) => {
    try {
      const input = api.packages.create.input.parse(req.body);
      const pkg = await storage.createPackage(input);
      res.status(201).json(pkg);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPackages = await storage.getPackages();
  if (existingPackages.length === 0) {
    const domesticPackages = [
      {
        title: "Kashmir Paradise",
        description: "Discover the heaven on earth with our comprehensive Kashmir tour package. Visit Srinagar, Gulmarg, and Pahalgam.",
        price: 25000,
        startDate: new Date("2024-05-15"),
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&q=80",
        category: "domestic",
        location: "Kashmir, India",
        featured: true
      },
      {
        title: "Goa Beach Vibes",
        description: "Experience the sun, sand, and sea in Goa. Includes water sports and party cruises.",
        price: 18000,
        startDate: new Date("2024-04-20"),
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80",
        category: "domestic",
        location: "Goa, India",
        featured: true
      },
      {
        title: "Sikkim Explorer",
        description: "Explore the mystic mountains and monasteries of Sikkim. Visit Gangtok, Nathula Pass, and Tsomgo Lake.",
        price: 22000,
        startDate: new Date("2024-06-10"),
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&q=80",
        category: "domestic",
        location: "Sikkim, India",
        featured: false
      },
      {
        title: "Kerala Backwaters",
        description: "Relax in the serene backwaters of Kerala using our houseboats. Visit Alleppey and Munnar.",
        price: 28000,
        startDate: new Date("2024-08-05"),
        duration: "6 Days / 5 Nights",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80",
        category: "domestic",
        location: "Kerala, India",
        featured: false
      }
    ];

    const internationalPackages = [
      {
        title: "Thailand Getaway",
        description: "Experience the vibrant culture and beaches of Thailand. Bangkok and Pattaya tour.",
        price: 45000,
        startDate: new Date("2024-07-15"),
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&q=80",
        category: "international",
        location: "Thailand",
        featured: true
      },
      {
        title: "Singapore Cityscape",
        description: "Explore the modern marvels of Singapore including Marina Bay Sands and Sentosa Island.",
        price: 55000,
        startDate: new Date("2024-09-10"),
        duration: "4 Days / 3 Nights",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80",
        category: "international",
        location: "Singapore",
        featured: true
      },
      {
        title: "Dubai Luxury",
        description: "Witness the grandeur of Dubai. Burj Khalifa, Desert Safari, and Dhow Cruise included.",
        price: 60000,
        startDate: new Date("2024-10-01"),
        duration: "5 Days / 4 Nights",
        image: "https://images.unsplash.com/photo-1512453979798-5ea904ac6605?auto=format&fit=crop&q=80",
        category: "international",
        location: "Dubai, UAE",
        featured: true
      },
       {
        title: "European Dream",
        description: "A grand tour of Europe's finest cities. Paris, Swiss Alps, and Rome.",
        price: 150000,
        startDate: new Date("2024-11-15"),
        duration: "10 Days / 9 Nights",
        image: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?auto=format&fit=crop&q=80",
        category: "international",
        location: "Europe",
        featured: true
      }
    ];

    for (const pkg of domesticPackages) {
      await storage.createPackage(pkg);
    }
    for (const pkg of internationalPackages) {
      await storage.createPackage(pkg);
    }
  }
}
