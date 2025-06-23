import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategories();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Categories retrieved successfully',
        data: result,
    });
}
);

export const CategoryController = {
  createCategory,
  getAllCategories
};
