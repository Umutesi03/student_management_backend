import { db as dbPromise } from '../database/config.js';
import { users, courses } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const listStudents = async () => {
  const db = await dbPromise;
  // Join users with courses to get course info
  const result = await db
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
    .where(eq(users.role, 'student'));
  return result;
};

export const getStudentById = async (id) => {
  const db = await dbPromise;
  const result = await db
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
    .where(eq(users.id, id));
  return result[0];
};

export const updateStudent = async (id, updates) => {
  const db = await dbPromise;
  const result = await db
    .update(users)
    .set(updates)
    .where(eq(users.id, id))
    .returning();
  return result[0];
};

export const deleteStudent = async (id) => {
  const db = await dbPromise;
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
