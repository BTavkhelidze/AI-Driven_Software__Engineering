import { prisma } from '../../config/database.config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default class UserService {
  static async register(data) {
    // 1. Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);
    console.log(hashedPassword);
    // 2. Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name
      }
    });
    console.log(user);
    return user;
  }

  static async login(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    // 3. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET environment variable is not set');

const token = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '1h' });
  
    
    return { user, token };
  }

  static async getProfile(userEmail) {
    
  return await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true, name: true, email: true,products: true },

  });
}
}