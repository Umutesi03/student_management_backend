import { db as dbPromise } from '../database/config.js';
import {
  users,
  courses,
  studentCourses,
  recentActivities,
} from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const getProfile = async (userId) => {
  const db = await dbPromise;
  // Get user basic info
  const [user] = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      role: users.role,
      profilePicture: users.profilePicture,
      enrollmentYear: users.enrollmentYear,
      status: users.status,
    })
    .from(users)
    .where(eq(users.id, userId));

  if (!user) return null;

  // Get all enrolled courses (many-to-many)
  const enrolledCourses = await db
    .select({
      id: courses.id,
      name: courses.name,
      code: courses.code,
      description: courses.description,
      credits: courses.credits,
    })
    .from(studentCourses)
    .leftJoin(courses, eq(studentCourses.courseId, courses.id))
    .where(eq(studentCourses.studentId, userId));

  return {
    ...user,
    courses: enrolledCourses, // return the array of course objects directly
  };
};

export const updateProfile = async (userId, updates) => {
  const db = await dbPromise;
  const result = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, userId))
    .returning();
  return result[0];
};

// Get all courses a student is enrolled in
export const getStudentEnrolledCourses = async (studentId) => {
  const db = await dbPromise;
  const data = await db
    .select({
      id: courses.id,
      name: courses.name,
      code: courses.code,
      description: courses.description,
      credits: courses.credits,
    })
    .from(studentCourses)
    .leftJoin(courses, eq(studentCourses.courseId, courses.id))
    .where(eq(studentCourses.studentId, studentId));
  return data;
};

// Get recent activities for a student (only visible and relevant types)
export const getStudentRecentActivities = async (studentId) => {
  const db = await dbPromise;
  // Only show activities visible to students and relevant types
  const allowedTypes = [
    'profile_update',
    'course_enrollment',
    'new_student_enrolled',
  ];
  const activities = await db
    .select({
      id: recentActivities.id,
      type: recentActivities.type,
      description: recentActivities.description,
      createdAt: recentActivities.createdAt,
      courseId: recentActivities.courseId,
      userId: recentActivities.userId,
      courseName: courses.name,
      userFullName: users.fullName,
    })
    .from(recentActivities)
    .leftJoin(courses, eq(recentActivities.courseId, courses.id))
    .leftJoin(users, eq(recentActivities.userId, users.id))
    .where(eq(recentActivities.visibleTo, 'student'))
    .where((row) => allowedTypes.includes(row.type))
    .orderBy(recentActivities.createdAt);

  // Filter: show only activities related to this student or global (e.g. new course, new student)
  return activities.filter(
    (act) =>
      (act.type === 'profile_update' && act.userId === studentId) ||
      (act.type === 'course_enrollment' && act.userId === studentId) ||
      act.type === 'new_student_enrolled' ||
      act.type === 'new_course_added'
  );
};
