import {
  getProfile,
  updateProfile,
  getStudentEnrolledCourses,
  getStudentRecentActivities,
} from '../services/student.service.js';

export const getOwnProfile = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOwnProfile = async (req, res) => {
  try {
    const updated = await updateProfile(req.user.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEnrolledCourses = async (req, res) => {
  try {
    const courses = await getStudentEnrolledCourses(req.user.id);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecentActivities = async (req, res) => {
  try {
    const activities = await getStudentRecentActivities(req.user.id);
    res.json(activities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
