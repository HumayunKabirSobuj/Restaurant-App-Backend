import AppError from '../../errors/AppError';
import { TFood } from './food.interface';
import { Food } from './food.model';

const addFood = async (payload: TFood) => {
  const isFoodExist = await Food.findOne({
    name: payload.name,
  });
  if (isFoodExist) {
    throw new AppError(400, 'Food already exists');
  }

  const result = await Food.create(payload);
  return result;
};

const getAllFoods = async () => {
  const result = await Food.find().populate("category","name");
  return result;
}

export const FoodService = {
  addFood,
  getAllFoods
};
