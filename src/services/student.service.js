import { db as dbPromise } from '../database/config.js';
import { users, courses } from '../database/schema.js';
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
