/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import mongoose from 'mongoose';
import { TQuiz } from './quiz.interface';
import { Topic } from '../Topics/topics.model';
import AppError from '../../errors/AppError';
import { HttpStatus } from 'http-status-ts';
import { Quiz } from './quiz.model';

const createQuiz = async (payload: TQuiz) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const isTopicExists = await Topic.findById(payload.topicId).session(
      session,
    );

    if (!isTopicExists) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Topic not found');
    }

    const isQuizExists = await Quiz.findOne({
      topicId: payload.topicId,
    }).session(session);

    if (isQuizExists) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'Quiz already exists for this topic',
      );
    }

    const result = await Quiz.create([payload], { session });

    const quizId = result[0]._id;

    await Topic.findByIdAndUpdate(
      payload.topicId,
      { quiz: quizId },
      { session, new: true },
    );

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllQuizzes = async () => {
  const quizzes = await Quiz.find().populate('topicId', 'title content');
  return quizzes;
};

const getSingleQuiz = async (quizId: string) => {
  const result = await Quiz.findById(quizId).populate(
    'topicId',
    'title content',
  );
  return result;
};

const updateQuiz = async (quizId: string, payload: Partial<TQuiz>) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const isQuizExists = await Quiz.findById(quizId).session(session);
    if (!isQuizExists) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Quiz not found');
    }
    const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, payload, {
      new: true,
      session,
    });
    await session.commitTransaction();
    session.endSession();
    return updatedQuiz;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const deleteQuiz = async (quizId: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const isQuizExists = await Quiz.findById(quizId).session(session);
    if (!isQuizExists) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Quiz not found');
    }
    const deletedQuiz = await Quiz.findByIdAndDelete(quizId, {
      session,
    });
    await Topic.findOneAndUpdate(
      { quiz: quizId },
      { $unset: { quiz: '' } },
      { session, new: true },
    );
    await session.commitTransaction();
    session.endSession();
    return deletedQuiz;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const QuizService = {
  createQuiz,
  getAllQuizzes,
  getSingleQuiz,
  updateQuiz,
  deleteQuiz
};
