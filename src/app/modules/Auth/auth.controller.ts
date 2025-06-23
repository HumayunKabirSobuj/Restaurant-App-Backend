import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const createRegisterUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Registration successfully',
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken } = result;
  // console.log(accessToken);

  res.cookie('accessToken', accessToken)

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'logged in successfully!',
    data: result,
  });
});

export const AuthController = {
  createRegisterUser,
  loginUser,
};
