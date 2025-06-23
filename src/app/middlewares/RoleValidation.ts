/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/Auth/auth.model";

const RoleValidation = (...roles: string[]): RequestHandler => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
        return;
      }

      const verifiedUser = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;

      // optional: console.log({ verifiedUser });

      if (roles.length && !roles.includes(verifiedUser.role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden! You don't have access.",
        });
        return;
      }

      const user = await User.findOne(
        { email: verifiedUser.email },
        { _id: 1, name: 1, email: 1, role: 1 }
      );

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found!",
        });
        return;
      }

      req.user = user;
      next();
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access!",
        error: error?.message || "Something went wrong",
      });
    }
  };
};

export default RoleValidation;
