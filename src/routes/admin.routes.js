import { Router } from 'express';
import {
  getStudents,
  getStudent,
  updateStudentData,
  removeStudent,
  promoteDemoteUser,
} from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(authenticate, authorize(['admin']));

router.get('/students', getStudents);
router.get('/students/:id', getStudent);
router.put('/students/:id', updateStudentData);
router.delete('/students/:id', removeStudent);
router.patch('/students/:id/role', promoteDemoteUser);

export default router;
