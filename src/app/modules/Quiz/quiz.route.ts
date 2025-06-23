import { EnumUserRole } from '../Auth/auth.interface';
import express from 'express';
import RoleValidation from '../../middlewares/RoleValidation';
import { QuizController } from './quiz.controller';

const router = express.Router();


router.get(
  '/',
  RoleValidation(EnumUserRole.TEACHER, EnumUserRole.STUDENT),
  QuizController.getAllQuizzes,
);

router.get(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER, EnumUserRole.STUDENT),
  QuizController.getSingleQuiz,
);

router.post(
  '/',
  RoleValidation(EnumUserRole.TEACHER),
  QuizController.createQuiz,
);

router.patch(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER),
  QuizController.updateQuiz,
);

router.delete(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER),
  QuizController.deleteQuiz,
);



export const QuizRoutes = router;
