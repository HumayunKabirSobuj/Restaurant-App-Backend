import { EnumUserRole } from '../Auth/auth.interface';
import express from 'express';
import RoleValidation from '../../middlewares/RoleValidation';
import { EnrollmentController } from './enrollment.controller';

const router = express.Router();

router.get(
  '/',
  RoleValidation(EnumUserRole.TEACHER),
  EnrollmentController.getAllEnrollments,
);
router.get(
  '/my-enrollment',
  RoleValidation(EnumUserRole.STUDENT),
  EnrollmentController.GetMySelfEnrollment,
);

router.post(
  '/',
  RoleValidation(EnumUserRole.STUDENT),
  EnrollmentController.createEnrollment,
);

export const EnrollmentRoutes = router;
