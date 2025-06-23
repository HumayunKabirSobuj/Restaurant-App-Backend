import mongoose from 'mongoose';
import { Topic } from './topics.model';
import { TTopic } from './topics.interface';
import { Lesson } from '../Lession/lession.model';
import AppError from '../../errors/AppError';
import { HttpStatus } from 'http-status-ts';

const createTopic = async (payload: TTopic) => {
  const { lessonId, title } = payload;

  // Check if topic already exists for same course & lesson
  const existingTopic = await Topic.findOne({ title, lessonId });
  if (existingTopic) {
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      'Topic already exists for this course and lesson',
    );
  }

  const findLesson = await Lesson.findById(lessonId);
  if (!findLesson) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Lesson not found');
  }

  const topicData = {
    ...payload,
    courseId: findLesson.courseId, // ensure correct courseId
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const result = await Topic.create([topicData], { session });
    const topicId = result[0]._id;

    const updatedLesson = await Lesson.findByIdAndUpdate(
      lessonId,
      { $addToSet: { topics: topicId } },
      { new: true, session },
    );

    if (!updatedLesson) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Failed to update lesson');
    }

    await session.commitTransaction(); // ✅ commit the transaction
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction(); // ❗ rollback if error
    throw new AppError(
      HttpStatus.BAD_REQUEST,
      error.message || 'Operation Failed',
    );
  } finally {
    session.endSession(); // ✅ always close the session
  }
};

const getAllTopics = async () => {
  const result = await Topic.find()
    .populate('courseId', 'title description')
    .populate('lessonId', 'title description');
  return result;
};

const getSingleTopic = async (topicId: string) => {
  const result = await Topic.findById({_id:topicId})
    .populate('courseId', 'title description')
    .populate('lessonId', 'title description');
  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Topic not found');
  }
  return result;
};

const UpdateTopic = async (id: string, payload: Partial<TTopic>) => {
  const result = await Topic.findOneAndUpdate({ _id: id }, payload);
  if (!result) {
    throw new AppError(HttpStatus.NOT_FOUND, 'Topic not found');
  }
  return result;
};

// delete single Topic
const deleteSingleTopic = async (id: string) => {
  // create session
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // find topic
    const topic = await Topic.findById(id).session(session);
    if (!topic) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Topic not found');
    }
    // delete topic
    const result = await Topic.deleteOne({ _id: id }).session(session);

    // Delete all quiz with this topic
    // await Quiz.deleteMany({ topicId: id }).session(session);

    // Remove topic id from the lesson's topics array
    await Lesson.findByIdAndUpdate(
      topic.lessonId,
      { $pull: { topics: id } },
      { session },
    );

    // Commit transaction
    await session.commitTransaction();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(HttpStatus.BAD_REQUEST, err.message || 'Operation Faid');
  } finally {
    session.endSession();
  }
};

export const TopicServices = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  UpdateTopic,
  deleteSingleTopic,
};
