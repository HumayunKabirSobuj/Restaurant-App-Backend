/* eslint-disable no-unused-vars */
export type UserRole = 'student' | 'teacher';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}
export type ILoginUser = {
  email: string;
  password: string;
};

// src/enums/userRole.ts

export enum EnumUserRole {
  TEACHER = 'teacher',
  STUDENT = 'student',
}
