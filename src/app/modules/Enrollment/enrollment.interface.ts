import { Types } from "mongoose";

export type TEnrollment =  {
  studentId: Types.ObjectId;
  courseId: Types.ObjectId;
  progress?: Types.ObjectId;
}