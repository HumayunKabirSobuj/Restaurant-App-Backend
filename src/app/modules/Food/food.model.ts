import { model, Schema } from 'mongoose';
import { TFood } from './food.interface';

const foodSchema = new Schema<TFood>({
  name: { type: String, required: true, unique: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

// Exporting the model
export const Food = model<TFood>('Food', foodSchema);
