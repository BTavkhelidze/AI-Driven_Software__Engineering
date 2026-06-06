import { z } from 'zod';

export const CreateProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  imageUrl: z.string().url().optional(),
  categoryName: z.string(),
});

export const UpdateProductSchema = CreateProductSchema.partial();