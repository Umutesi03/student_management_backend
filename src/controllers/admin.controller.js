import {
  listStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  changeUserRole,
} from '../services/admin.service.js';

export const getStudents = async (req, res) => {
  try {
    const students = await listStudents();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStudentData = async (req, res) => {
  try {
    const updated = await updateStudent(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeStudent = async (req, res) => {
  try {
    await deleteStudent(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const promoteDemoteUser = async (req, res) => {
  try {
    const updated = await changeUserRole(req.params.id, req.body.role);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
