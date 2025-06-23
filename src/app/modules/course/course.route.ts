import { EnumUserRole } from '../Auth/auth.interface';
import express from 'express';
import RoleValidation from '../../middlewares/RoleValidation';
import { CourseController } from './course.controller';
import { queryHelper } from '../../middlewares/queryHelper';

const router = express.Router();

router.get(
  '/',
  queryHelper(['title', 'description', 'subject', 'level']),
  CourseController.getAllCourses,
);
router.get(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER, EnumUserRole.STUDENT),
  CourseController.getSingleCourse,
  RoleValidation(EnumUserRole.TEACHER, EnumUserRole.STUDENT),
);

router.patch(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER),
  CourseController.updateCourse,
);
router.post(
  '/',
  RoleValidation(EnumUserRole.TEACHER),
  CourseController.createCourse,
);

router.delete(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER),
  CourseController.deleteCourse,
);

export const CourseRoutes = router;
