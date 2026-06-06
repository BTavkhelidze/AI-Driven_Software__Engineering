const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const productService = {
  /**
   * Fetch all categories
   */
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to fetch categories");
    }

    const result = await response.json();
    return result.data;
  },

  /**
   * Create a new product
   */
  async createProduct(productData) {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to create product");
    }

    const result = await response.json();
    return result.data;
  },
};
