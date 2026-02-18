import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes"; // Assuming shared routes are properly set up
import { type InsertInquiry } from "@shared/schema";

// Type definitions for the frontend based on the schema
export interface Package {
  id: number;
  title: string;
  description: string;
  price: number;
  startDate: string | null;
  duration: string | null;
  image: string;
  category: 'domestic' | 'international';
  location: string;
  featured: boolean;
}

export function usePackages(category?: 'domestic' | 'international') {
  return useQuery({
    queryKey: [api.packages.list.path, category],
    queryFn: async () => {
      // Manually constructing URL with query param since buildUrl usually handles path params
      const url = category 
        ? `${api.packages.list.path}?category=${category}` 
        : api.packages.list.path;
        
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch packages");
      return await res.json() as Package[];
    },
  });
}

export function usePackage(id: number) {
  return useQuery({
    queryKey: [api.packages.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.packages.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch package");
      return await res.json() as Package;
    },
    enabled: !!id,
  });
}

export function useCreateInquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const res = await fetch(api.inquiries.create.path, {
        method: api.inquiries.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to send inquiry");
      }
      return await res.json();
    },
    onSuccess: () => {
      // Could invalidate admin inquiry lists here if they existed
    },
  });
}
