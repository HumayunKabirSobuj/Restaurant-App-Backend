import { Types } from 'mongoose';
export type TTopic = {
  courseId: Types.ObjectId;
  lessonId: Types.ObjectId;
  title: string;
  content: string;
  quiz?: Types.ObjectId;
};
