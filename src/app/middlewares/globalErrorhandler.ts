import { ErrorRequestHandler } from 'express';
import { TErrorSources } from '../interface/error';
import config from '../config';
import { ZodError } from 'zod';
import AppError from '../errors/AppError';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // setting default value
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode ?? 400; // Set default if undefined
    message = simplifiedError?.message ?? 'Validation Error';
    errorSources = simplifiedError?.errorSources ?? [
      { path: '', message: 'Validation error occurred' },
    ];
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? 'Validation Error';
    errorSources = simplifiedError?.errorSources ?? [
      { path: '', message: 'Validation error occurred' },
    ];
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? 'Invalid ID format';
    errorSources = simplifiedError?.errorSources ?? [
      { path: '', message: 'Invalid ID' },
    ];
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode ?? 400;
    message = simplifiedError?.message ?? 'Duplicate Key Error';
    errorSources = simplifiedError?.errorSources ?? [
      { path: '', message: 'Duplicate key found' },
    ];
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode ?? 500;
    message = error.message ?? 'Unknown application error';
    errorSources = [
      {
        path: '',
        message: error?.message ?? 'Unknown error occurred',
      },
    ];
  } else if (error instanceof Error) {
    message = error.message ?? 'Unknown error';
    errorSources = [
      {
        path: '',
        message: error?.message ?? 'Unknown error occurred',
      },
    ];
  }

  //ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // error,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
};
export default globalErrorHandler;
