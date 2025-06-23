import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuizService } from './quiz.service';

const createQuiz = catchAsync(async (req, res) => {
  const result = await QuizService.createQuiz(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz created successfully',
    data: result,
  });
});

const getAllQuizzes = catchAsync(async (req, res) => {
  const result = await QuizService.getAllQuizzes();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quizzes retrieved successfully',
    data: result,
  });
});
const getSingleQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuizService.getSingleQuiz(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz retrieved successfully',
    data: result,
  });
});

const updateQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuizService.updateQuiz(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz updated successfully',
    data: result,
  });
});

const deleteQuiz = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuizService.deleteQuiz(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Quiz deleted successfully',
    data: result,
  });
});

export const QuizController = {
  createQuiz,
  getAllQuizzes,
  getSingleQuiz,
  updateQuiz,
  deleteQuiz
};
