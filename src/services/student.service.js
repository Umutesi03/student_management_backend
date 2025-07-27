import { db as dbPromise } from '../database/config.js';
import { users } from '../database/schema.js';
import { eq } from 'drizzle-orm';

export const getProfile = async (userId) => {
  const db = await dbPromise;
  const data = await db.select().from(users).where(eq(users.id, userId));
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
