import express from 'express';
import { CategoryController } from './category.controller.js';


const router = express.Router();

router.get('/', CategoryController.getAll);


export default router;