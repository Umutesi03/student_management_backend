import { db as dbPromise } from '../database/config.js';
import { users, courses, studentCourses } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const getProfile = async (userId) => {
  const db = await dbPromise;
  const data = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      role: users.role,
      profilePicture: users.profilePicture,
      enrollmentYear: users.enrollmentYear,
      status: users.status,
      course: {
        id: courses.id,
        name: courses.name,
        code: courses.code,
        description: courses.description,
        credits: courses.credits,
      },
    })
    .from(users)
    .leftJoin(courses, eq(users.courseId, courses.id))
    .where(eq(users.id, userId));
  return data[0];
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
  return data.map((row) => row.courses);
};

// Get recent activities for a student (stub, needs DB support)
export const getStudentRecentActivities = async (studentId) => {
  // This is a stub. You should implement a 'recent_activities' table and log actions there.
  // For now, return an empty array or mock data.
  return [
    // Example:
    // { type: 'profile_update', date: new Date(), description: 'Profile updated.' },
    // { type: 'course_enrollment', date: new Date(), description: 'Enrolled in course XYZ.' },
  ];
};
