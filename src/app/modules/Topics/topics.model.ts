import mongoose, { Schema } from "mongoose";
import { TTopic } from "./topics.interface";


const topicSchema = new Schema<TTopic>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    lessonId: { type: Schema.Types.ObjectId, ref: 'Lesson', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: false },
  },
  { timestamps: true }
);

export const Topic = mongoose.model<TTopic>('Topic', topicSchema);