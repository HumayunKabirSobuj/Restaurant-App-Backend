/* eslint-disable @typescript-eslint/no-explicit-any */
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourse = async (payload: TCourse) => {
  //   console.log({ payload });

  const isCourseExist = await Course.findOne({
    title: payload.title,
  });

  if (isCourseExist) {
    throw new Error('Course with this title already exists');
  }
  const result = await Course.create(payload);
  return result;
};

const getAllCourses = async (
  filter: any,
  pagination: {
    skip: number;
    limit: number;
  },
) => {
  return Course.find(filter)
    .skip(pagination.skip)
    .limit(pagination.limit)
    .populate('teacherId', 'name email role').populate('lessons', 'title description');;
};

const getSingleCourse = async (id: string, studentId: string) => {
  // console.log(studentId);

  const result = await Course.findById(id).populate(
    'teacherId',
    'name email role',
  );

  const hasViewed = result?.viewedBy?.some(
    (id) => id.toString() === studentId.toString(),
  );


  if (!hasViewed) {
    await Course.findByIdAndUpdate(result?._id, { $inc: { views: 1 } });
    await Course.findByIdAndUpdate(result?._id, {
      $push: { viewedBy: studentId },
    });
  }

  return result;
};

// export const getSingleCourse = async (id: string, userId: string) => {
//   const course = await Course.findById(id)
//     .populate('createdBy', 'name email role')
//     .populate('likes', 'name email')
//     .populate('feedbacks.user', 'name email');

//   if (!course) {
//     throw new Error('Course not found');
//   }

//   // Check if user already viewed
//   const alreadyViewed = course.views?.some(
//     (viewedUserId: Types.ObjectId) => viewedUserId.toString() === userId,
//   );

//   if (!alreadyViewed) {
//     course.views?.push(new Types.ObjectId(userId));
//     await course.save();
//   }

//   return course;
// };

// const updateCourse = async (
//   id: string,
//   userId: string,
//   payload: Partial<ICourse>,
// ) => {
//   const foundCourse = await Course.findOne({ _id: id, createdBy: userId });
//   if (!foundCourse) {
//     throw new AppError(
//       HttpStatus.UNAUTHORIZED,
//       'You are not authorized to update this course',
//     );
//   }
//   // console.log(foundCourse);
//   const result = await Course.findByIdAndUpdate(
//     id,
//     { $set: payload },
//     { new: true },
//   );
//   return result;
// };

const deleteCourse = async (id: string, userId: string) => {
  const foundCourse = await Course.findOne({ _id: id, teacherId: userId });
  if (!foundCourse) {
    throw new Error('You are not authorized to delete this course');
  }
  const result = await Course.findByIdAndDelete(id);
  return result;
};

const updateCourse = async (
  id: string,
  userId: string,
  payload: Partial<TCourse>,
) => {
  const foundCourse = await Course.findOne({ _id: id, teacherId: userId });
  if (!foundCourse) {
    throw new Error('You are not authorized to update this course');
  }
  const result = await Course.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true },
  );
  return result;
};

export const CourseServices = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
};
