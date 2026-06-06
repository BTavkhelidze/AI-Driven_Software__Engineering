import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters" })
    .max(100, { message: "Product name must not exceed 100 characters" }),
  
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters" })
    .max(100, { message: "Slug must not exceed 100 characters" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: "Slug must be lowercase alphanumeric with hyphens only",
    }),
  
  description: z
    .string()
    .max(1000, { message: "Description must not exceed 1000 characters" })
    .optional()
    .or(z.literal("")),
  
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .min(0.01, { message: "Price must be at least 0.01" })
    .max(999999.99, { message: "Price must not exceed 999,999.99" }),
  
  stock: z
    .number({
      required_error: "Stock is required",
      invalid_type_error: "Stock must be a number",
    })
    .int({ message: "Stock must be a whole number" })
    .min(0, { message: "Stock cannot be negative" })
    .max(999999, { message: "Stock must not exceed 999,999" }),
  
  categoryId: z
    .number({
      required_error: "Category is required",
      invalid_type_error: "Please select a valid category",
    })
    .int()
    .positive({ message: "Please select a valid category" }),
});
