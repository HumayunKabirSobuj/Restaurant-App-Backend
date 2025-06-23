import { HttpStatus } from 'http-status-ts';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { EnrollmentService } from './enrollment.service';

const createEnrollment = catchAsync(async (req, res) => {
  const enrollData = {
    studentId: req.user._id, // Assuming req.user is populated with the authenticated user's data
    courseId: req.body.courseId, // Course ID should be provided in the request body
  };

  const result = await EnrollmentService.createEnrollment(enrollData);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Enrollment create successfully',
    data: result,
  });
});
const getAllEnrollments = catchAsync(async (req, res) => {
  const result = await EnrollmentService.getAllEnrollments();
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: ' All enrollments retrieved successfully',
    data: result,
  });
});

const GetMySelfEnrollment = catchAsync(async (req, res) => {
  const studentId = req.user._id; // Assuming req.user is populated with the authenticated user's data
  const result = await EnrollmentService.GetMySelfEnrollment(studentId);
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'My enrollment retrieved successfully',
    data: result,
  });
});
export const EnrollmentController = {
  createEnrollment,
  getAllEnrollments,
  GetMySelfEnrollment
};
