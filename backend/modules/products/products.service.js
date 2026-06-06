import { prisma } from '../../config/database.config.js';
import { CreateProductSchema, UpdateProductSchema } from './products.schema.js';

export default class ProductsService {
  static async getAll() {
    return await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getById(id) {
    const product = await prisma.product.findUnique({
      where: { id }
    });
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  static async create(data) {
    // 1. Validate incoming data
    console.log(data,'<-- Data received for product creation');
    const validatedData = CreateProductSchema.parse(data);

    // 2. Format and save to database
    return await prisma.product.create({
      data: {
        ...validatedData,
        price: validatedData.price.toString()
      }
    });
  }

  static async update(id, data) {
    // 1. Validate update data
    const validatedData = UpdateProductSchema.parse(data);

    // 2. Check if product exists before updating
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    // 3. Prepare data for update
    const updateData = { ...validatedData };
    if (updateData.price !== undefined) {
      updateData.price = updateData.price.toString();
    }

    return await prisma.product.update({
      where: { id },
      data: updateData
    });
  }

  static async delete(id) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    
    return await prisma.product.update({
      where: { id },
      data: { isActive: false }
    });
  }
}