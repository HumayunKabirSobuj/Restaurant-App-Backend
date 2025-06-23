import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { CourseRoutes } from '../modules/course/course.route';
import { LessionRoutes } from '../modules/Lession/lession.route';
import { TopicRoutes } from '../modules/Topics/topic.route';
import { EnrollmentRoutes } from '../modules/Enrollment/enrollment.route';
import { QuizRoutes } from '../modules/Quiz/quiz.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/lession',
    route: LessionRoutes,
  },
  {
    path: '/topic',
    route: TopicRoutes,
  },
  {
    path: '/enrollment',
    route: EnrollmentRoutes,
  },
  {
    path: '/quiz',
    route: QuizRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
