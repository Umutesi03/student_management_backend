import { Router } from 'express';
import {
  getOwnProfile,
  updateOwnProfile,
} from '../controllers/student.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate, authorize(['student']));
router.get('/me', getOwnProfile);
router.put('/me', updateOwnProfile);

export default router;
