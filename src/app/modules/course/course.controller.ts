/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CourseServices } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const user = req.user;
  const data = {
    ...req.body,
    teacherId: user._id,
  };
  // console.log(data);

  // console.log(data);
  const result = await CourseServices.createCourse(data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const { filter = {}, pagination = { page: 1, limit: 10 } } =
    (req as any).filterData || {};
  const result = await CourseServices.getAllCourses(filter, pagination);
  // If result is an array, use it directly; otherwise, adjust as needed
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Courses retrieved successfully',
    data: result, // আসল ডেটা (যেমন: কোর্স লিস্ট)
    meta: {
      total: result.length, // মোট কয়টা ডেটা আছে
      page: pagination.page, // এখন কোন পেজে আছি
      limit: pagination.limit, // প্রতি পেজে কয়টা
      totalPages: Math.ceil(result.length / pagination.limit),
    },
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user =req.user
  const result = await CourseServices.getSingleCourse(id, user._id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course retrieved successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await CourseServices.deleteCourse(id, user._id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course deleted successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const result = await CourseServices.updateCourse(id, user._id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
};
