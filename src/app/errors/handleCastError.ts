import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources = [
    {
      path: err.path || 'Unknown Path', // Ensure 'path' has a fallback
      message: err.message || 'Invalid ID Format', // More descriptive message
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID Format', // More specific message
    errorSources,
  };
};

export default handleCastError;
