import { db as dbPromise } from '../config.js';
import { courses } from '../schema.js';
import { eq } from 'drizzle-orm';

const seedCourses = async () => {
  try {
    const db = await dbPromise;
    const courseData = [
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
    ];

    for (const course of courseData) {
      const existing = await db
        .select()
        .from(courses)
        .where(eq(courses.code, course.code));
      if (existing.length === 0) {
        await db.insert(courses).values(course);
      } else {
        console.log(
          `Course with code ${course.code} already exists, skipping.`
        );
      }
    }
    console.log('✅ Courses seeded successfully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Failed to seed courses:', err.message);
    process.exit(1);
  }
};

seedCourses();
