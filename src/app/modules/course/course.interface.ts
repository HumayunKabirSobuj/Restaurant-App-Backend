import { Types } from 'mongoose';

export type TCourse = {
  title: string;
  description: string;
  subject?: string;
  level?: string;
  teacherId: Types.ObjectId;
  lessons?: Types.ObjectId[];
  views: number;
  enrollment: number;
  like: number;
  viewedBy?: Types.ObjectId[];
};
