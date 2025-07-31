import { db as dbPromise } from '../config.js';
import { users, courses, studentCourses } from '../schema.js';
import bcrypt from 'bcrypt';

const seed = async () => {
  try {
    const db = await dbPromise;
    const hashed = await bcrypt.hash('admin123', 10);

    // await db.delete(users);

    // await db.execute(`ALTER SEQUENCE users_id_seq RESTART WITH 1;`);

    const insertedUsers = await db
      .insert(users)
      .values([
        {
          fullName: 'Admin User',
          email: 'admin@gmail.com',
          phone: '0792361728',
          password: hashed,
          role: 'admin',
          enrollmentYear: null,
          profilePicture: null,
          status: null,
          otp: null,
          otpVerified: 1,
        },
        {
          fullName: 'Anne Marie',
          email: 'anne@gmail.com',
          phone: '0792365789',
          password: await bcrypt.hash('2003', 10),
          role: 'student',
          enrollmentYear: 2022,
          profilePicture: null,
          status: null,
          otp: null,
          otpVerified: 1,
        },
        {
          fullName: 'Uwase Kelline',
          email: 'uwase@gmail.com',
          phone: '0789456578',
          password: await bcrypt.hash('student123', 10),
          role: 'student',
          enrollmentYear: 2023,
          profilePicture: null,
          status: null,
          otp: null,
          otpVerified: 1,
        },
      ])
      .returning({ id: users.id, email: users.email });

    const cs = await db.query.courses.findFirst({
      where: (c) => c.code === 'CS101',
    });
    const se = await db.query.courses.findFirst({
      where: (c) => c.code === 'SE201',
    });

    const anneUser = insertedUsers.find((u) => u.email === 'anne@gmail.com');
    const uwaseUser = insertedUsers.find((u) => u.email === 'uwase@gmail.com');

    if (cs && anneUser) {
      await db.insert(studentCourses).values({
        studentId: anneUser.id,
        courseId: cs.id,
      });
    }

    if (se && uwaseUser) {
      await db.insert(studentCourses).values({
        studentId: uwaseUser.id,
        courseId: se.id,
      });
    }

    console.log('✅ Seed data inserted successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed data:', err.message);
    process.exit(1);
  }
};

seed();
