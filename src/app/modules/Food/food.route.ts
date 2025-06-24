import express from 'express';
import { FoodController } from './food.controller';
import { queryHelper } from '../../middlewares/queryHelper';
const router = express.Router();

router.get('/', queryHelper(['name']), FoodController.getAllFoods);
router.post('/', FoodController.createFood);

export const FoodRoutes = router;
