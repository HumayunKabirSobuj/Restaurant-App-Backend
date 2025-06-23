import mongoose, { Schema } from "mongoose";
import { TLesson } from "./lession.interface";

const lessonSchema = new Schema<TLesson>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String },
    topics: [{ type:Schema.Types.ObjectId, ref: 'Topic' }],
  },
  { timestamps: true }
);

export const Lesson = mongoose.model<TLesson>('Lesson', lessonSchema);