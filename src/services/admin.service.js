// Update student info and log activity
export const updateStudent = async (id, updates) => {
  const db = await dbPromise;
  // Exclude 'id' from updates
  const { id: _id, ...safeUpdates } = updates;
  const [user] = await db
    .update(users)
    .set(safeUpdates)
    .where(eq(users.id, id))
    .returning();
  if (!user) return null;

  // Log profile update activity
  await db.insert(recentActivities).values({
    userId: id,
    type: 'profile_update',
    description: `Profile updated for student: ${user.fullName}`,
    visibleTo: 'student',
  });

  return user;
};
import { db as dbPromise } from '../database/config.js';
import {
  users,
  courses,
  studentCourses,
  recentActivities,
} from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const listStudents = async () => {
  const db = await dbPromise;

  const rows = await db
    .select({
      userId: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      role: users.role,
      profilePicture: users.profilePicture,
      enrollmentYear: users.enrollmentYear,
      status: users.status,
      courseId: courses.id,
      courseName: courses.name,
      courseCode: courses.code,
      courseDescription: courses.description,
      courseCredits: courses.credits,
    })
    .from(users)
    .leftJoin(studentCourses, eq(users.id, studentCourses.studentId))
    .leftJoin(courses, eq(studentCourses.courseId, courses.id))
    .where(eq(users.role, 'student'));

  const studentsMap = new Map();
  for (const row of rows) {
    if (!studentsMap.has(row.userId)) {
      studentsMap.set(row.userId, {
        id: row.userId,
        fullName: row.fullName,
        email: row.email,
        phone: row.phone,
        role: row.role,
        profilePicture: row.profilePicture,
        enrollmentYear: row.enrollmentYear,
        status: row.status,
        courses: [],
      });
    }
    if (row.courseId) {
      studentsMap.get(row.userId).courses.push({
        id: row.courseId,
        name: row.courseName,
        code: row.courseCode,
        description: row.courseDescription,
        credits: row.courseCredits,
      });
    }
  }
  return Array.from(studentsMap.values());
};

export const getStudentById = async (id) => {
  const db = await dbPromise;
  // Get user info
  const userRows = await db
    .select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      role: users.role,
      profilePicture: users.profilePicture,
      enrollmentYear: users.enrollmentYear,
      status: users.status,
      courseId: courses.id,
      courseName: courses.name,
      courseCode: courses.code,
      courseDescription: courses.description,
      courseCredits: courses.credits,
    })
    .from(users)
    .leftJoin(studentCourses, eq(users.id, studentCourses.studentId))
    .leftJoin(courses, eq(studentCourses.courseId, courses.id))
    .where(eq(users.id, id));
  if (!userRows.length) return null;
  const user = {
    id: userRows[0].id,
    fullName: userRows[0].fullName,
    email: userRows[0].email,
    phone: userRows[0].phone,
    role: userRows[0].role,
    profilePicture: userRows[0].profilePicture,
    enrollmentYear: userRows[0].enrollmentYear,
    status: userRows[0].status,
    courses: [],
  };
  for (const row of userRows) {
    if (row.courseId) {
      user.courses.push({
        id: row.courseId,
        name: row.courseName,
        code: row.courseCode,
        description: row.courseDescription,
        credits: row.courseCredits,
      });
    }
  }

  return user;
};

export const deleteStudent = async (id) => {
  const db = await dbPromise;

  await db.delete(studentCourses).where(eq(studentCourses.studentId, id));

  await db.delete(users).where(eq(users.id, id));
};

export const changeUserRole = async (id, role) => {
  const db = await dbPromise;
  const result = await db
    .update(users)
    .set({ role })
    .where(eq(users.id, id))
    .returning();
  return result[0];
};
