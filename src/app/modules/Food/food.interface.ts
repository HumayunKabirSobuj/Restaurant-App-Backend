import { Types } from "mongoose";

export type TFood = {
  name: string ;
  category: Types.ObjectId; // referencing Category
  image: string;
  price: number;
};
