import mongoose, { Schema } from 'mongoose';
import { TCourse } from './course.interface';

const courseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    subject: { type: String },
    level: { type: String },
    teacherId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lessons: [{ type: Schema.Types.ObjectId, ref: 'Lesson' }],
    views: { type: Number, default: 0, required: true },
    enrollment: { type: Number, default: 0, required: true },
    like: { type: Number, default: 0, required: true },
    // 👇 নতুন ফিল্ড
    viewedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

//parcel model
export const Course = mongoose.model<TCourse>('Course', courseSchema);
