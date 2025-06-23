import { Types } from 'mongoose';
export type TQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};
export type TQuiz = {
  topicId: Types.ObjectId;
  questions: TQuestion[];
};
