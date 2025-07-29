import { db as dbPromise } from '../database/config.js';
import { users } from '../database/schema.js';
import { eq } from 'drizzle-orm';
import { hashPassword, comparePasswords } from '../util/password-util.js';

export const registerUser = async ({ fullName, email, phone, password, otp, otpVerified }) => {
  const db = await dbPromise;

  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) {
    throw new Error('Email already in use');
  }

  const hashed = await hashPassword(password);

  const result = await db
    .insert(users)
    .values({
      fullName,
      email,
      phone,
      password: hashed,
      role: 'student',
      otp,          // Save OTP here
      otpVerified,  // Save otpVerified here
    })
    .returning();

  return result[0];
};


export const loginUser = async ({ email, password }) => {
  const db = await dbPromise;

  const found = await db.select().from(users).where(eq(users.email, email));
  if (found.length === 0) throw new Error('User not found');

  const user = found[0];
  if (!user.otpVerified)
    throw new Error(
      'Please verify your email with the OTP sent before logging in.'
    );
  const match = await comparePasswords(password, user.password);
  if (!match) throw new Error('Invalid password');

  return user;
};
