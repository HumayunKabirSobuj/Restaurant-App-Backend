import { TErrorSources, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const match = error.message.match(/"([^"]*)"/);

  const extractedMessage = match ? match[1] : 'Unknown ID'; // Ensure we have a valid message

  const errorSources: TErrorSources = [
    {
      path: '', // You might want to set a more specific path
      message: `${extractedMessage} is already exists`,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Duplicate Entry Error', // More specific error message
    errorSources,
  };
};

export default handleDuplicateError;
