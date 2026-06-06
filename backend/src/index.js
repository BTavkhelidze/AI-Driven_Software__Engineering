import express from 'express';

import cookieParser from 'cookie-parser';
import 'dotenv/config';


import productRoutes from './modules/products/products.routes.js'; 
import userRoutes from './modules/users/user.routes.js'; 
import categoryRoutes from './modules/categories/category.routes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, data: { status: 'healthy' } });
});



app.listen(PORT, () => {
  console.log(`🚀 API server online and listening on http://localhost:${PORT}`);
});