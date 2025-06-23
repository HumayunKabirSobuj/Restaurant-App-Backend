import { CategoryController } from './category.controller';
import express from 'express';
const router = express.Router();

router.post('/', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

export const CategoryRoutes = router;
