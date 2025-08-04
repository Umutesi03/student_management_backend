import { Router } from 'express';
import {
  getOwnProfile,
  updateOwnProfile,
  getEnrolledCourses,
  getRecentActivities,
} from '../controllers/student.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate, authorize(['student']));

router.get('/me', getOwnProfile);
router.put('/me', updateOwnProfile);
router.get('/me/courses', getEnrolledCourses);
router.get('/me/activities', getRecentActivities);

export default router;
