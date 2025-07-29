import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  role: varchar('role', { length: 10 }).notNull().default('student'),
  profilePicture: text('profile_picture').default(null),
  enrollmentYear: integer('enrollment_year').default(null),
  status: varchar('status', { length: 20 }).default('Active'),
  otp: varchar('otp', { length: 10 }),
  otpVerified: integer('otp_verified').default(0),
});

export const studentCourses = pgTable('student_courses', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id')
    .references(() => users.id)
    .notNull(),
  courseId: integer('course_id')
    .references(() => courses.id)
    .notNull(),
});

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  description: text('description'),
  credits: integer('credits').notNull(),
});