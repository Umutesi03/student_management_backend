import { db as dbPromise } from '../config.js';
import { courses } from '../schema.js';

const seedCourses = async () => {
  try {
    const db = await dbPromise;
    await db.insert(courses).values([
      {
        name: 'Computer Science',
        code: 'CS101',
        description: 'Introduction to Computer Science',
        credits: 3,
      },
      {
        name: 'Software Engineering',
        code: 'SE201',
        description: 'Principles of Software Engineering',
        credits: 4,
      },
      {
        name: 'Data Structures',
        code: 'CS102',
        description: 'Study of data structures',
        credits: 3,
      },
    ]);
    console.log('✅ Courses seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed courses:', err.message);
    process.exit(1);
  }
};

seedCourses();
