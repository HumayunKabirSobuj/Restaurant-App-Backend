import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  },
);

// Exporting the model
export const Category = model<TCategory>('Category', categorySchema);
