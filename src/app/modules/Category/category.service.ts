import AppError from '../../errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (payload: TCategory) => {
  //   console.log({ payload });
  const isCategoryExist = await Category.findOne({ name: payload.name });
  if (isCategoryExist) {
    throw new AppError(400, 'Category already exists');
  }
  const result = await Category.create(payload);
  return result;
};
const getAllCategories = async () => {
  const result = await Category.find();
  return result;
}


export const CategoryServices = {
  createCategory,
  getAllCategories
};


