import { model, Schema } from 'mongoose';
import { TQuiz } from './quiz.interface';

const quizSchema = new Schema<TQuiz>(
  {
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic', required: true },
    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export const Quiz = model<TQuiz>('Quiz', quizSchema);
