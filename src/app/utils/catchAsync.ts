import { NextFunction, Request, RequestHandler, Response } from 'express';

// for try catch handle by one time calling for all function
const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => next(error));
  };
};

export default catchAsync;
