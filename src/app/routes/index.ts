import { Router } from 'express';
import { CategoryRoutes } from '../modules/Category/category.route';
import { FoodRoutes } from '../modules/Food/food.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/food',
    route: FoodRoutes,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
