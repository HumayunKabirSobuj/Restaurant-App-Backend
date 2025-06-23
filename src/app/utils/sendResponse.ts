

import { Response } from 'express';

// ✅ এখন meta টাইপ সহ
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    data: data.data,
    meta: data.meta, // ✅ optional কিন্তু থাকলে রেসপন্সে যাবে
  });
};

export default sendResponse;
