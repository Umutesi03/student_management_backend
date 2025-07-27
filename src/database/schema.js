import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 10 }).notNull().default('student'),
  profilePicture: text('profile_picture'),
  course: text('course'),
  enrollmentYear: integer('enrollment_year'),
  status: varchar('status', { length: 20 }).default('Active'),
});
