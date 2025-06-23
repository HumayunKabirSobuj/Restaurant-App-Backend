import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TopicServices } from './topics.service';
import { HttpStatus } from 'http-status-ts';

const createTopic = catchAsync(async (req, res) => {
  const result = await TopicServices.createTopic(req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Topic Added successfully',
    data: result,
  });
});

const getAllTopics = catchAsync(async (req, res) => {
  
  const result = await TopicServices.getAllTopics();

  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Topics retrieved successfully',
    data: result,
  });
});
const getSingleTopic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TopicServices.getSingleTopic(id);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Topic retrieved successfully',
    data: result,
  });
});

const updateTopic = catchAsync(async (req, res) => {
  const { id } = req.params;

  // console.log(id);

  const result = await TopicServices.UpdateTopic(id, req.body);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Topic updated successfully',
    data: result,
  });
});

const deleteTopic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TopicServices.deleteSingleTopic(id);
  sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Topic deleted successfully',
    data: result,
  });
});

export const TopicControllers = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  deleteTopic,
  updateTopic,
};
