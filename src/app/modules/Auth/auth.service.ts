import { ILoginUser, IUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { User } from './auth.model';
import AppError from '../../errors/AppError';
import { HttpStatus } from 'http-status-ts';
import jwt from 'jsonwebtoken';
import config from '../../config';
const registerUser = async (payload: IUser) => {
  const password = await bcrypt.hash(payload.password, 10);

  const userData = {
    ...payload,
    password,
  };
  // console.log(userData);
  const result = await User.create(userData);
  return result;
};
const loginUser = async (payload: ILoginUser) => {
  // console.log({ payload });

  const isUserExist = await User.findOne({ email: payload.email });
  // console.log(isUserExist);

  if (!isUserExist) {
    throw new AppError(HttpStatus.NOT_FOUND, 'User Not Found!');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    isUserExist.password,
  );
  // console.log(isPasswordMatch);
  if (!isPasswordMatch) {
    throw new AppError(HttpStatus.FORBIDDEN, 'Password Not Match');
  }

  const jwtPayload = {
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
  };
  // console.log(jwtPayload);

  //   const accessToken = jwt.sign(
  //   jwtPayload,
  //   config.jwt_access_secret as string,
  //   config.jwt_access_expires_in as string,
  // );
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });

  // console.log(accessToken);

  return {
    accessToken,
  };
};

export const AuthServices = {
  registerUser,
  loginUser,
};
