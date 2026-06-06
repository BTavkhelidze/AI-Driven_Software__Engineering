import { prisma } from '../../config/database.config.js';

export default class CategoryService {
  static async getAll() {
    return await prisma.category.findMany({
 
  include: {
    products: true // This triggers the database to find all matching products
  }
});
  }

  static async create(name) {
    return await prisma.category.create({ data: { name } });
  }

  static async delete(id) {
    return await prisma.category.delete({ where: { id } });
  }
}