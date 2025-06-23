import express from 'express';
import { FoodController } from './food.controller';
const router = express.Router();

router.get('/', FoodController.getAllFoods);
router.post('/', FoodController.createFood);

export const FoodRoutes = router;
