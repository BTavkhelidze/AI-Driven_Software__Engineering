import CategoryService from './category.service.js';

export class CategoryController {
  static async getAll(req, res) {
    const categories = await CategoryService.getAll();
    res.status(200).json({ success: true, data: categories });
  }

  static async create(req, res) {
    try {
      const { name } = req.body;
      const category = await CategoryService.create(name);
      res.status(201).json({ success: true, data: category });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Category already exists' });
    }
  }
}