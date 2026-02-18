import { z } from 'zod';
import { insertPackageSchema, insertInquirySchema, packages, inquiries } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  packages: {
    list: {
      method: 'GET' as const,
      path: '/api/packages' as const,
      input: z.object({
        category: z.enum(['domestic', 'international']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof packages.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/packages/:id' as const,
      responses: {
        200: z.custom<typeof packages.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    // Admin routes for future use
    create: {
      method: 'POST' as const,
      path: '/api/packages' as const,
      input: insertPackageSchema,
      responses: {
        201: z.custom<typeof packages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries' as const,
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PackageResponse = typeof packages.$inferSelect;
export type PackageInput = z.infer<typeof insertPackageSchema>;
