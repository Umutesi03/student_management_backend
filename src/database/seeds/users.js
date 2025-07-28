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
        email: 'admin@gmail.com',
        phone: '0792361728',
        password: hashed,
        role: 'admin',
      },
      {
        fullName: 'Anne MArie',
        email: 'anne@gmail.com.com',
        phone: '0792365789',
        password: await bcrypt.hash('2003', 10),
        role: 'student',
        courseId: cs?.id,
        enrollmentYear: 2022,
      },
      {
        fullName: 'Uwase Kelline',
        email: 'uwase@gmail.com.com',
        phone: '0789456578',
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
