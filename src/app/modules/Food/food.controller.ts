/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FoodService } from './food.service';

const createFood = catchAsync(async (req, res) => {
  const result = await FoodService.addFood(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Food created successfully',
    data: result,
  });
});
const getAllFoods = catchAsync(async (req, res) => {
  const { filter = {} } = (req as any).filterData || {};
  const result = await FoodService.getAllFoods(filter);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Food Fetched successfully',
    data: result,
  });
});

//

export const FoodController = {
  createFood,
  getAllFoods,
};
