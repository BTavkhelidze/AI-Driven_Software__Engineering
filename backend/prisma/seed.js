import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Create a default user
  const password = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: password,
    },
  });


  await prisma.product.upsert({
    where: { id: 'sample-prod-1' }, 
    update: {},
    create: {
      id: 'sample-prod-1',
      name: 'Initial Product',
      slug: 'initial-product',
      price: '99.99',
      stock: 50,
      userId: user.id,
    },
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });