import {
  getAllCoursesService,
  getCourseByIdService,
  createCourseService,
  updateCourseService,
  deleteCourseService,
  assignCourseToStudentService,
  getStudentsInCourseService,
  getCoursesForStudentService,
} from '../services/course.service.js';
export const getStudentsInCourse = async (req, res) => {
  try {
    const students = await getStudentsInCourseService(req.params.id);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCoursesForStudent = async (req, res) => {
  try {
    const courses = await getCoursesForStudentService(req.params.id);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await getAllCoursesService();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await getCourseByIdService(req.params.id);
    if (!course) return res.status(404).json({ error: 'Not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const course = await createCourseService(req.body);
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const course = await updateCourseService(req.params.id, req.body);
    res.json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    await deleteCourseService(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const assignCourseToStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const updated = await assignCourseToStudentService(studentId, courseId);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
