import { Types } from "mongoose";

export type TLesson ={
  courseId: Types.ObjectId;
  title: string;
  description?: string;
  topics?:Types.ObjectId[],
}
