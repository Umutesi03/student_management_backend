import { db as dbPromise } from '../config.js';
import { users, courses } from '../schema.js';
import bcrypt from 'bcrypt';

const seed = async () => {
  try {
    const db = await dbPromise; 
    const hashed = await bcrypt.hash('admin123', 10);

    const cs = await db.query.courses.findFirst({
      where: (c) => c.code === 'CS101',
    });
    const se = await db.query.courses.findFirst({
      where: (c) => c.code === 'SE201',
    });

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
        courseId: cs?.id,
        enrollmentYear: 2022,
      },
      {
        fullName: 'Student Two',
        email: 'student2@example.com',
        phone: '8765432109',
        password: await bcrypt.hash('student123', 10),
        role: 'student',
        courseId: se?.id,
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
