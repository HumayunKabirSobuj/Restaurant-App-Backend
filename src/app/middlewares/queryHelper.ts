/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

export const queryHelper = (searchableFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { search, page = '1', limit = '10', ...rest } = req.query;

    const pageNumber = parseInt(page as string);
    const limitNumber = parseInt(limit as string);
    const skip = (pageNumber - 1) * limitNumber;

    const filter: any = {};

    // 🔍 Search in given fields (regex)
    if (search && searchableFields.length > 0) {
      filter.$or = searchableFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' },
      }));
    }

    // 🎯 Exact match fields (e.g. category=mobile)
    for (const key in rest) {
      // force exact match (also cast to string if needed)
      filter[key] = { $eq: rest[key] };
    }

    // ✅ Attach filter and pagination to req
    (req as any).filterData = {
      filter,
      pagination: {
        skip,
        limit: limitNumber,
        page: pageNumber,
      },
    };

    next();
  };
};
