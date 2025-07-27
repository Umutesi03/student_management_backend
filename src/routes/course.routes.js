import { Router } from 'express';
import {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  assignCourseToStudent,
} from '../controllers/course.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import {
  getStudentsInCourse,
  getCoursesForStudent,
} from '../controllers/course.controller.js';

const router = Router();

router.use(authenticate, authorize(['admin']));

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

router.post('/assign', assignCourseToStudent); 

router.get('/:id/students', getStudentsInCourse); 


router.get('/student/:id', getCoursesForStudent);

export default router;
