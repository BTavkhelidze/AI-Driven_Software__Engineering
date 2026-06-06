import { Router } from 'express';
import { ProductsController } from './products.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
const router = Router();

router.get('/', ProductsController.getProducts);
router.get('/:id', ProductsController.getProductById);
router.post('/', authenticate, ProductsController.createProduct);
router.put('/:id', authenticate, ProductsController.updateProduct);
router.delete('/:id', authenticate, ProductsController.deleteProduct);

export default router;