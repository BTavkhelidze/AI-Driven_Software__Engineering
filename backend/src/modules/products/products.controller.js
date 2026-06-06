import ProductsService from './products.service.js';

export class ProductsController {
  static async getProducts(req, res) {
    try {
      const products = await ProductsService.getAll();
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Failed to retrieve products' });
    }
  }

  static async getProductById(req, res) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : '';
      const product = await ProductsService.getById(id);
      
      res.status(200).json({ success: true, data: product });
    } catch (error) {
      res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
  }

 static async createProduct(req, res) {
    try {
      console.log("User ID from token:", req.user);
      // Get the userId from the authenticated request
      const userId = req.user.userId; 

      
      // Pass the userId to the service
      const newProduct = await ProductsService.create(req.body, userId);
      
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.log("Error creating product:", error);
      res.status(400).json({ success: false, error: error.message || 'Invalid input' });
    }
  }

  static async updateProduct(req, res) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : '';
      const updatedProduct = await ProductsService.update(id, req.body);
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(error.statusCode || 400).json({ success: false, error: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const id = typeof req.params.id === 'string' ? req.params.id : '';
      await ProductsService.delete(id);
      res.status(200).json({ success: true, data: { message: 'Product archived successfully' } });
    } catch (error) {
      res.status(error.statusCode || 500).json({ success: false, error: error.message });
    }
  }
}