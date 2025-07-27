import { db as dbPromise } from '../config.js';
import { users } from '../schema.js';
import bcrypt from 'bcrypt';

const seed = async () => {
  try {
    const db = await dbPromise; // WAIT for the drizzle connection
    const hashed = await bcrypt.hash('admin123', 10);

    await db.insert(users).values([
      {
        fullName: 'Admin User',
        email: 'admin@example.com',
        phone: '1234567890',
        password: hashed,
        role: 'admin',
      },
      {
        fullName: 'Student One',
        email: 'student1@example.com',
        phone: '9876543210',
        password: await bcrypt.hash('student123', 10),
        role: 'student',
        course: 'Computer Science',
        enrollmentYear: 2022,
      },
      {
        fullName: 'Student Two',
        email: 'student2@example.com',
        phone: '8765432109',
        password: await bcrypt.hash('student123', 10),
        role: 'student',
        course: 'Software Engineering',
        enrollmentYear: 2023,
      },
    ]);

    console.log('✅ Seed data inserted successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed data:', err.message);
    process.exit(1);
  }
};

seed();
