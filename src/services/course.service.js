import { db as dbPromise } from '../database/config.js';
import { courses, users, studentCourses } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const getAllCoursesService = async () => {
  const db = await dbPromise;
  return await db.select().from(courses);
};

export const getCourseByIdService = async (id) => {
  const db = await dbPromise;
  const result = await db.select().from(courses).where(eq(courses.id, id));
  return result[0];
};

export const createCourseService = async (data) => {
  const db = await dbPromise;
  const [course] = await db.insert(courses).values(data).returning();
  return course;
};

export const updateCourseService = async (id, updates) => {
  const db = await dbPromise;
  const [course] = await db
    .update(courses)
    .set(updates)
    .where(eq(courses.id, id))
    .returning();
  return course;
};

export const deleteCourseService = async (id) => {
  const db = await dbPromise;
  await db.delete(courses).where(eq(courses.id, id));
};

export const assignCourseToStudentService = async (studentId, courseId) => {
  const db = await dbPromise;

  const exists = await db
    .select()
    .from(studentCourses)
    .where(eq(studentCourses.studentId, studentId))
    .where(eq(studentCourses.courseId, courseId));
  if (exists.length > 0) {
    throw new Error('Student already assigned to this course');
  }
  const [assignment] = await db
    .insert(studentCourses)
    .values({ studentId, courseId })
    .returning();
  return assignment;
};

export const getStudentsInCourseService = async (courseId) => {
  const db = await dbPromise;
  return await db
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
    .from(studentCourses)
    .leftJoin(users, eq(studentCourses.studentId, users.id))
    .where(eq(studentCourses.courseId, courseId));
};

export const getCoursesForStudentService = async (studentId) => {
  const db = await dbPromise;
  return await db
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
};
