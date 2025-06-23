import mongoose from 'mongoose';
import { Enrollment } from './enrollment.model';
import { TEnrollment } from './enrollment.interface';
import AppError from '../../errors/AppError';
import { HttpStatus } from 'http-status-ts';
import { Course } from '../course/course.model';

const createEnrollment = async (payload: TEnrollment) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isCourseExists = await Course.findById(payload.courseId).session(
      session,
    );
    if (!isCourseExists) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Course not found');
    }

    const isAlreadyEnrolled = await Enrollment.findOne({
      studentId: payload.studentId,
      courseId: payload.courseId,
    }).session(session);

    if (isAlreadyEnrolled) {
      throw new AppError(
        HttpStatus.CONFLICT,
        'You are already enrolled in this course',
      );
    }

    const enrollment = await Enrollment.create([payload], { session });

    await Course.findByIdAndUpdate(
      payload.courseId,
      { $inc: { enrollment: 1 } },
      { session },
    );

    await session.commitTransaction();
    return enrollment[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    throw new AppError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message || 'Something went wrong during enrollment',
    );
  } finally {
    session.endSession(); // Always close the session
  }
};

const getAllEnrollments = async () => {
  const result = await Enrollment.find()
    .populate('studentId', 'name email')
    .populate('courseId', 'title description');
  return result;
};

const GetMySelfEnrollment = async (studentId: string) => {
  const result = await Enrollment.find({ studentId })
    .populate('studentId', 'name email')
    .populate('courseId', 'title description');
  return result;
};

export const EnrollmentService = {
  createEnrollment,
  getAllEnrollments,
  GetMySelfEnrollment
};
