import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { productSchema } from "../schemas/productSchema";
import { productService } from "../services/productService";


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../src/components/ui/form";
import { Input } from "../../../src/components/ui/input";
import { Textarea } from "../../../src/components/ui/textarea";
import { Select } from "../../../src/components/ui/select";
import { Button } from "../../../src/components/ui/button";
import { useToast } from "../../../src/components/ui/toast";

/**
 * Utility function to generate a URL-friendly slug from a string
 */
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
};

export const ProductForm = ({ onSuccess }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Initialize form with react-hook-form and Zod validation
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: 0,
    },
    mode: "onChange", // Validate on change for better UX
  });

  // Watch the name field for auto-slug generation
  const nameValue = form.watch("name");

  // Auto-generate slug from name using side effect
  useEffect(() => {
    if (nameValue && !form.formState.dirtyFields.slug) {
      const generatedSlug = generateSlug(nameValue);
      form.setValue("slug", generatedSlug, {
        shouldValidate: true,
        shouldDirty: false, // Don't mark as dirty so it continues auto-generating
      });
    }
  }, [nameValue, form]);

  // Fetch categories using TanStack Query
  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: productService.getCategories,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Create product mutation
  const createProductMutation = useMutation({
    mutationFn: productService.createProduct,
    onSuccess: (data) => {
      // Invalidate and refetch products list
      queryClient.invalidateQueries({ queryKey: ["products"] });

      // Show success toast
      toast({
        title: "Success!",
        description: `Product "${data.name}" has been created successfully.`,
        variant: "success",
      });

      // Reset form
      form.reset();

      // Call optional success callback
      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (error) => {
      // Show error toast
      toast({
        title: "Error",
        description: error.message || "Failed to create product. Please try again.",
        variant: "error",
      });
    },
  });

  // Form submission handler
  const onSubmit = (data) => {
    createProductMutation.mutate(data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New Product</h2>
        <p className="text-sm text-gray-600 mt-1">
          Fill in the details below to add a new product to your catalog
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Product Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter product name"
                    {...field}
                    disabled={createProductMutation.isPending}
                  />
                </FormControl>
                <FormDescription>
                  The display name of your product (min 2 characters)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Slug Field */}
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="product-slug"
                    {...field}
                    disabled={createProductMutation.isPending}
                    onChange={(e) => {
                      // Mark as dirty when manually edited
                      form.setValue("slug", e.target.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                </FormControl>
                <FormDescription>
                  URL-friendly identifier (auto-generated from name)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter product description (optional)"
                    className="min-h-[100px] resize-y"
                    {...field}
                    disabled={createProductMutation.isPending}
                  />
                </FormControl>
                <FormDescription>
                  Detailed description of your product (optional)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price and Stock Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price Field */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0.01"
                      placeholder="0.00"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value) || 0)
                      }
                      disabled={createProductMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>Price in USD (min $0.01)</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Stock Field */}
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min="0"
                      placeholder="0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                      disabled={createProductMutation.isPending}
                    />
                  </FormControl>
                  <FormDescription>Available quantity</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Category Field */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value, 10) || 0)
                    }
                    disabled={
                      isCategoriesLoading || createProductMutation.isPending
                    }
                  >
                    <option value={0} disabled>
                      {isCategoriesLoading
                        ? "Loading categories..."
                        : "Select a category"}
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormDescription>
                  Choose the product category
                </FormDescription>
                <FormMessage />
                {categoriesError && (
                  <p className="text-sm text-red-600 mt-1">
                    Error loading categories: {categoriesError.message}
                  </p>
                )}
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={createProductMutation.isPending}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={createProductMutation.isPending || !form.formState.isValid}
              className="min-w-[120px]"
            >
              {createProductMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
