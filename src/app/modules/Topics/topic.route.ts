import { EnumUserRole } from '../Auth/auth.interface';
import express from 'express';
import RoleValidation from '../../middlewares/RoleValidation';
import { TopicControllers } from './topics.controller';
import { queryHelper } from '../../middlewares/queryHelper';

const router = express.Router();

router.get('/', TopicControllers.getAllTopics);
router.get(
  '/:id',
  queryHelper(['title','content']),
  RoleValidation(EnumUserRole.TEACHER, EnumUserRole.STUDENT),
  TopicControllers.getSingleTopic,
);

router.post(
  '/',
  RoleValidation(EnumUserRole.TEACHER),
  TopicControllers.createTopic,
);

router.patch(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER),
  TopicControllers.updateTopic,
);
router.delete(
  '/:id',
  RoleValidation(EnumUserRole.TEACHER),
  TopicControllers.deleteTopic,
);

export const TopicRoutes = router;
