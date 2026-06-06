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

  static async create(data, userId) {
   
    const validatedData = CreateProductSchema.parse(data);
 
  
  return await prisma.product.create({
  data: {
    name: validatedData.name,
    slug: validatedData.slug,
    description: validatedData.description,
    stock: validatedData.stock,
    price: validatedData.price.toString(),
  
    user: {
      connect: { id: userId }
    },
    // Only connect category if the name is provided
    ...(validatedData.categoryName && {
      category: {
        connectOrCreate: {
        where: { name: validatedData.categoryName },
        create: { name: validatedData.categoryName }
      }
      }
    })
  }
});
  }

  static async update(id, data) {
  
    const validatedData = UpdateProductSchema.parse(data);


    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

   
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