import express from 'express';

import cookieParser from 'cookie-parser';
import 'dotenv/config';


import productRoutes from '../modules/products/products.routes.js'; 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/products', productRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, data: { status: 'healthy' } });
});



app.listen(PORT, () => {
  console.log(`🚀 API server online and listening on http://localhost:${PORT}`);
});