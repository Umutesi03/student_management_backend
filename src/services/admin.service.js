import { db as dbPromise } from '../database/config.js';
import { users } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const listStudents = async () => {
  const db = await dbPromise;
  return await db.select().from(users).where(eq(users.role, 'student'));
};

export const getStudentById = async (id) => {
  const db = await dbPromise;
  const result = await db.select().from(users).where(eq(users.id, id));
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
