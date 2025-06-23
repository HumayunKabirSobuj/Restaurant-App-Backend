/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from 'http-status-ts';
import AppError from '../../errors/AppError';
import { TLesson } from './lession.interface';
import { Lesson } from './lession.model';
import { Course } from '../course/course.model';
import mongoose from 'mongoose';

const createLession = async (payload: TLesson) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { courseId, title, description } = payload;

    const isCourseExist = await Course.findById({ _id: courseId }).session(
      session,
    );

    if (!isCourseExist) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Course not found');
    }

    const isLessonExist = await Lesson.findOne({ courseId, title }).session(
      session,
    );

    if (isLessonExist) {
      throw new AppError(HttpStatus.CONFLICT, 'Lesson already exists');
    }

    const lessonData = {
      courseId,
      title,
      description,
    };

    const [lessionPost] = await Lesson.create([lessonData], { session });

    await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { lessons: lessionPost._id } },
      { new: true, session },
    );

    await session.commitTransaction();
    return lessionPost;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(500, err.message || 'Operation Failed');
  } finally {
    session.endSession();
  }
};

const getAllLessonFromDB = async (
  filter: any,
  pagination: {
    skip: number;
    limit: number;
  },
) => {
  const result = await Lesson.find(filter)
    .skip(pagination.skip)
    .limit(pagination.limit);
  return result;
};

const getSingleLesson = async (id: string) => {
  const result = await Lesson.findById(id).populate(
    'courseId',
    'title description',
  );
  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Lesson not found');
  }
  return result;
};

const updateLession = async (id: string, payload: Partial<TLesson>) => {
  try {
    const isLessonExist = await Lesson.findById(id);
    if (!isLessonExist) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Lesson not found');
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(id, payload, {
      new: true,
    });

    return updatedLesson;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    throw new AppError(500, err.message || 'Operation Failed');
  }
};

const deleteLession = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const isLessonExist = await Lesson.findById(id);
    if (!isLessonExist) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Lesson not found');
    }

    const deletedLesson = await Lesson.findByIdAndDelete(id);
    if (!deletedLesson) {
      throw new AppError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        'Failed to delete lesson',
      );
    }

    await Course.findByIdAndUpdate(
      isLessonExist.courseId,
      { $pull: { lessons: id } },
      { new: true },
    );

    await session.commitTransaction();
    return deletedLesson;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(500, err.message || 'Operation Failed');
  } finally {
    session.endSession();
  }
};

export const LessionService = {
  createLession,
  getAllLessonFromDB,
  getSingleLesson,
  updateLession,
  deleteLession,
};
